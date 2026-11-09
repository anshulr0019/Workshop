// Scroll-driven 3D story: "Understand the engine. Care for the whole car."
// Real 3D models (glTF/GLB) in one three.js scene, driven by scroll progress p (0–1).
// Units are metres; the car's nose points +X, Y is up, Z runs across the car.

export type Vec3 = [number, number, number];

export const models = {
  engine: {
    url: "/models/engine-artec-i4.glb",
    // The scan's cylinder deck faces -Z; this stands it upright with the crank along Z
    // (across the car, as in a transverse front-wheel-drive engine).
    rotation: [Math.PI / 2, 0, 0] as Vec3,
    credit: { text: "Engine: “Four-cylinder engine” 3D scan by Artec 3D, CC BY 3.0, simplified for the web", href: "https://www.artec3d.com/3d-models/four-cylinder-engine" },
  },
  // Add a licensed car model here (GLB with a separate bonnet/hood node and an open
  // engine bay). Leave url empty to show the engine-only sequence.
  car: {
    url: "",
    length: 3.85, // scaled to this length (m)
    yaw: 0, // rotate so the nose points +X
    hoodNode: "", // name of the bonnet mesh/node in the GLB
    hoodHinge: "back" as "back" | "front", // which end of the bonnet the hinge is at
    hoodOpen: 1.1, // radians
    // Where the engine sits once installed, in car coordinates after scaling.
    engineMount: [1.3, 0.62, 0] as Vec3,
    credit: null as null | { text: string; href: string },
  },
};

// Extra scroll distance (in screen heights) the section stays pinned for.
export const scrollTravel = { mobile: 2, desktop: 2.4 };

// Text panels. Copy reused from the existing site; no new claims.
export const steps = [
  {
    eyebrow: "MANOJ AUTOMOBILE · DABRI",
    title: "Understand the engine.",
    body: "Your car deserves a mechanic who knows it. Warning lights, unusual sounds or performance issues? Let’s find the cause.",
  },
  {
    eyebrow: "EVERYDAY CARE. EXPERT REPAIRS.",
    title: "Every part, in its place.",
    body: "From the regular service to the sound you can’t quite explain. We’ll help you work out what your car needs.",
  },
  {
    eyebrow: "MULTI-BRAND CAR CARE",
    title: "Care for the whole car.",
    body: "Petrol, diesel & CNG. Hindi & English welcome.",
  },
];

// ---- Engine-only sequence (used until a car model is added) ----
// The engine turns a little over half a revolution while the camera eases around it.
export const engineOnly = {
  spin: [-0.9, 2.3] as [number, number], // engine yaw (radians) from p=0 to p=1
  cameraKeys: [
    { p: 0, pos: [0.95, 0.42, 0.95] as Vec3, look: [0, 0.02, 0] as Vec3, fov: 32 },
    { p: 0.5, pos: [1.1, 0.7, 0.55] as Vec3, look: [0, 0, 0] as Vec3, fov: 32 },
    { p: 1, pos: [0.85, 0.28, 1.15] as Vec3, look: [0, 0.02, 0] as Vec3, fov: 32 },
  ],
};

// ---- Full sequence (once a car model is added) ----
export const assembly = {
  engineKeys: [
    { p: 0.0, offset: [0, 0.75, 0] as Vec3, yaw: -1.2 },
    { p: 0.3, offset: [0, 0.75, 0] as Vec3, yaw: 0.6 },
    { p: 0.66, offset: [0, 0, 0] as Vec3, yaw: 0 },
    { p: 1.0, offset: [0, 0, 0] as Vec3, yaw: 0 },
  ],
  reveal: [0.18, 0.42] as [number, number], // car fades in around the engine
  hoodClose: [0.8, 0.95] as [number, number],
  cameraKeys: [
    { p: 0.0, pos: [2.4, 1.85, 1.2] as Vec3, look: [1.3, 1.35, 0] as Vec3, fov: 30 },
    { p: 0.3, pos: [3.3, 2.3, 1.9] as Vec3, look: [1.25, 1.1, 0] as Vec3, fov: 32 },
    { p: 0.62, pos: [4.2, 2.8, 2.7] as Vec3, look: [1.1, 0.7, 0] as Vec3, fov: 34 },
    { p: 0.82, pos: [4.6, 2.4, 3.6] as Vec3, look: [0.7, 0.65, 0] as Vec3, fov: 34 },
    { p: 1.0, pos: [4.6, 1.8, 4.9] as Vec3, look: [0.05, 0.6, 0] as Vec3, fov: 33 },
  ],
};
