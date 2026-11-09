// Loaded on demand (separate chunk). Renders only when progress or size changes.
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { assembly, engineOnly, models, type Vec3 } from "./config";

export interface StoryScene {
  setProgress(p: number): void;
  resize(width: number, height: number, shift?: number, fit?: number): void;
  dispose(): void;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (a: number, b: number, p: number) => {
  const t = clamp01((p - a) / (b - a));
  return t * t * t * (t * (t * 6 - 15) + 10);
};
// Monotone cubic interpolation through keyframes: smooth and never overshoots a key.
function track<K extends { p: number }>(keys: K[], get: (k: K) => readonly number[]) {
  const vals = keys.map(get);
  return (p: number) => {
    let i = 0;
    while (i < keys.length - 2 && p > keys[i + 1].p) i++;
    const h = keys[i + 1].p - keys[i].p;
    const t = clamp01((p - keys[i].p) / h);
    const slope = (k: number, c: number) => (vals[k + 1][c] - vals[k][c]) / (keys[k + 1].p - keys[k].p);
    const tangent = (k: number, c: number) => {
      if (k <= 0 || k >= keys.length - 1) return 0;
      const a = slope(k - 1, c), b = slope(k, c);
      return a * b <= 0 ? 0 : Math.sign(a) * Math.min(Math.abs((a + b) / 2), 3 * Math.abs(a), 3 * Math.abs(b));
    };
    const t2 = t * t, t3 = t2 * t;
    return vals[i].map((v0, c) => (2 * t3 - 3 * t2 + 1) * v0 + (t3 - 2 * t2 + t) * h * tangent(i, c) + (-2 * t3 + 3 * t2) * vals[i + 1][c] + (t3 - t2) * h * tangent(i + 1, c));
  };
}

function fader(root: THREE.Object3D) {
  const mats: { m: THREE.Material; opacity: number; transparent: boolean }[] = [];
  root.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    mesh.material = (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).map((m) => {
      const c = m.clone();
      mats.push({ m: c, opacity: c.opacity, transparent: c.transparent });
      return c;
    }) as never;
    if ((mesh.material as unknown as THREE.Material[]).length === 1) mesh.material = (mesh.material as unknown as THREE.Material[])[0];
  });
  return (o: number) => {
    root.visible = o > 0.003;
    for (const e of mats) {
      const t = e.transparent || o < 0.995;
      if (e.m.transparent !== t) {
        e.m.transparent = t;
        e.m.needsUpdate = true;
      }
      e.m.opacity = e.opacity * o;
    }
  };
}

function shadowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 2, 64, 64, 64);
  g.addColorStop(0, "rgba(0,0,0,0.5)");
  g.addColorStop(0.55, "rgba(0,0,0,0.18)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export async function createStoryScene(canvas: HTMLCanvasElement, onContextLost: () => void): Promise<StoryScene> {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  const coarse = matchMedia("(pointer: coarse)").matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1.5 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap; // soft via shadow.radius

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#f3f2ec");
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = env.texture;
  scene.environmentIntensity = 0.42;
  renderer.toneMappingExposure = 0.92;
  scene.add(new THREE.HemisphereLight("#ffffff", "#8f9184", 0.35));
  const key = new THREE.DirectionalLight("#fff3e4", 2.2);
  key.position.set(2.5, 5, 3);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.radius = 6;
  key.shadow.bias = -0.0004;
  const fill = new THREE.DirectionalLight("#e6eef5", 0.6);
  fill.position.set(-3, 2, -2);
  scene.add(key, key.target, fill);

  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  const castAll = (o: THREE.Object3D) => o.traverse((m) => ((m as THREE.Mesh).isMesh && ((m.castShadow = true), (m.receiveShadow = true))));

  // Engine: oriented, centred on its bounding box
  const engineModel = (await loader.loadAsync(models.engine.url)).scene;
  engineModel.rotation.set(...models.engine.rotation);
  castAll(engineModel);
  // Machined cast iron rather than bright aluminium
  engineModel.traverse((o) => {
    const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
    if (m?.isMeshStandardMaterial) {
      m.color.set("#5b5f61");
      m.metalness = 0.7;
      m.roughness = 0.48;
    }
  });
  const engineBox = new THREE.Box3().setFromObject(engineModel);
  const engineSize = engineBox.getSize(new THREE.Vector3());
  engineModel.position.sub(engineBox.getCenter(new THREE.Vector3()));
  const engine = new THREE.Group();
  engine.add(engineModel);
  scene.add(engine);

  // Optional car: scaled to length, placed on the ground, bonnet re-hinged for animation
  let car: THREE.Group | null = null;
  let hoodPivot: THREE.Group | null = null;
  let fadeCar = (_o: number) => {};
  if (models.car.url) {
    const raw = (await loader.loadAsync(models.car.url)).scene;
    raw.rotation.y = models.car.yaw;
    const box = new THREE.Box3().setFromObject(raw);
    const size = box.getSize(new THREE.Vector3());
    raw.scale.setScalar(models.car.length / Math.max(size.x, size.z));
    const b2 = new THREE.Box3().setFromObject(raw);
    const c2 = b2.getCenter(new THREE.Vector3());
    raw.position.set(-c2.x, -b2.min.y, -c2.z);
    car = new THREE.Group();
    car.add(raw);
    castAll(car);
    scene.add(car);
    car.updateMatrixWorld(true);
    const hood = models.car.hoodNode ? car.getObjectByName(models.car.hoodNode) : undefined;
    if (hood) {
      const hb = new THREE.Box3().setFromObject(hood);
      hoodPivot = new THREE.Group();
      hoodPivot.position.set(models.car.hoodHinge === "back" ? hb.min.x : hb.max.x, hb.max.y, 0);
      car.add(hoodPivot);
      hoodPivot.attach(hood);
    }
    fadeCar = fader(car);
  }

  // Ground: real soft shadow + a contact blob for grounding
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 30).rotateX(-Math.PI / 2), new THREE.ShadowMaterial({ opacity: 0.16 }));
  ground.receiveShadow = true;
  scene.add(ground);
  const blobTex = shadowTexture();
  const blob = new THREE.Mesh(new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ map: blobTex, transparent: true, depthWrite: false, toneMapped: false }));
  scene.add(blob);

  const engineFloor = -engineSize.y / 2; // engine-only: engine rests just above the floor
  if (!car) {
    ground.position.y = blob.position.y = engineFloor - 0.04;
    key.shadow.camera.left = key.shadow.camera.bottom = -0.8;
    key.shadow.camera.right = key.shadow.camera.top = 0.8;
  } else {
    key.shadow.camera.left = key.shadow.camera.bottom = -3;
    key.shadow.camera.right = key.shadow.camera.top = 3;
  }
  key.shadow.camera.updateProjectionMatrix();

  const camKeys = car ? assembly.cameraKeys : engineOnly.cameraKeys;
  const camPos = track(camKeys, (k) => k.pos), camLook = track(camKeys, (k) => k.look), camFov = track(camKeys, (k) => [k.fov]);
  const enginePose = track(assembly.engineKeys, (k) => [...k.offset, k.yaw]);
  const camera = new THREE.PerspectiveCamera(32, 1, 0.02, 80);
  const look = new THREE.Vector3();
  let progress = 0, aspect = 1, fitAspect = 1;
  let view = { w: 1, h: 1, shift: 0 };
  let disposed = false;

  const lost = (e: Event) => {
    e.preventDefault();
    onContextLost();
  };
  canvas.addEventListener("webglcontextlost", lost);

  function apply(p: number) {
    if (car) {
      const [ox, oy, oz, yaw] = enginePose(p);
      const m = models.car.engineMount;
      engine.position.set(m[0] + ox, m[1] + oy, m[2] + oz);
      engine.rotation.set(0, yaw, 0);
      const r = smooth(assembly.reveal[0], assembly.reveal[1], p);
      fadeCar(r);
      if (hoodPivot) hoodPivot.rotation.z = (models.car.hoodHinge === "back" ? 1 : -1) * models.car.hoodOpen * (1 - smooth(assembly.hoodClose[0], assembly.hoodClose[1], p));
      blob.position.set(0, 0.002, 0);
      blob.scale.set(models.car.length * 1.2, 1, 2.4);
      (blob.material as THREE.MeshBasicMaterial).opacity = r * 0.8;
      key.target.position.set(0.5, 0, 0);
    } else {
      const [a, b] = engineOnly.spin;
      engine.position.set(0, 0, 0);
      engine.rotation.set(0, a + (b - a) * smooth(0, 1, p), 0);
      blob.position.set(0, engineFloor - 0.038, 0);
      blob.scale.set(0.8, 1, 0.8);
      (blob.material as THREE.MeshBasicMaterial).opacity = 0.7;
      key.target.position.set(0, 0, 0);
    }
    // Camera; narrow screens get a slightly wider lens and longer distance so things fit
    // (Engine alone is compact, so it only needs this on very narrow screens.)
    const ref = car ? 1.45 : 0.95;
    const k = fitAspect < ref ? ref / fitAspect : 1;
    look.set(...(camLook(p) as Vec3));
    camera.position.set(...(camPos(p) as Vec3)).sub(look).multiplyScalar(Math.pow(k, 0.5)).add(look);
    camera.fov = (2 * Math.atan(Math.tan((camFov(p)[0] * Math.PI) / 360) * Math.pow(k, 0.5)) * 180) / Math.PI;
    camera.aspect = aspect;
    camera.setViewOffset(view.w, view.h, -view.shift * view.w, 0, view.w, view.h);
    camera.updateProjectionMatrix();
    camera.lookAt(look);
  }
  const render = () => !disposed && renderer.render(scene, camera);

  return {
    setProgress(p) {
      if (Math.abs(p - progress) < 1e-4) return;
      progress = p;
      apply(p);
      render();
    },
    resize(width, height, shift = 0, fit = 1) {
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      aspect = width / height;
      fitAspect = (width * fit) / height;
      view = { w: width, h: height, shift };
      apply(progress);
      render();
    },
    dispose() {
      disposed = true;
      canvas.removeEventListener("webglcontextlost", lost);
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh) return;
        mesh.geometry.dispose();
        (Array.isArray(mesh.material) ? mesh.material : [mesh.material]).forEach((m) => m.dispose());
      });
      blobTex.dispose();
      env.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
