<div align="center" style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(180deg, #000000 0%, #0f0f14 40%, #141416 70%, #1c1c20 100%); padding: 140px 28px 120px; color: #f5f5f7; letter-spacing: -0.02em; line-height: 1.2;">

  <!-- Dark / Light Adaptive Banner with Apple Dark Gradient -->
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,000000,30,0f0f14,60,141416,100,434343&height=300&section=header&text=MANOJ%20AUTOMOBILE&fontSize=72&fontColor=f5f5f7&fontAlignY=42&animation=fadeIn&width=100%" />
    <source media="(prefers-color-scheme: light)" srcset="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,f5f5f7,40,e8e8ed,70,ffffff,100,ebebf0&height=300&section=header&text=MANOJ%20AUTOMOBILE&fontSize=72&fontColor=1d1d1f&fontAlignY=42&animation=fadeIn&width=100%" />
    <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,000000,30,0f0f14,60,141416,100,434343&height=300&section=header&text=MANOJ%20AUTOMOBILE&fontSize=72&fontColor=f5f5f7&fontAlignY=42&animation=fadeIn&width=100%" alt="Apple Dark Gradient Banner" style="width: 100%; max-width: 960px; border-radius: 24px; box-shadow: 0 32px 80px rgba(0,113,227,0.1), 0 12px 32px rgba(0,0,0,0.6); border: 1px solid rgba(255,255,255,0.05); display: block;" />
  </picture>

  <!-- Typing Animation -->
  <div style="margin-top: 36px; min-height: 60px;">
    <img src="https://readme-typing-svg.demolab.com?font=Inter&weight=300&size=24&duration=3800&pause=1200&color=0071e3&center=true&vCenter=true&width=760&height=60&lines=3rd-Year+CSE+Student+%7C+Building+Intelligent+Systems;Full-Stack+Developer+%7C+React+18+%2B+TypeScript+%2B+Vite;Embedded+Admin+Dashboard+for+30-Year+Workshop;AI-Powered+Car+Diagnostics+%7C+Delhi" alt="Typing Animation" style="display: block; margin: 0 auto;" />
  </div>

  <h1 style="font-size: clamp(2.8rem, 6vw, 4.2rem); font-weight: 600; letter-spacing: -0.045em; margin: 40px 0 6px; color: #f5f5f7;">Manoj Automobile</h1>
  <h2 style="font-size: 1.25rem; font-weight: 400; color: #86868b; letter-spacing: -0.015em; margin: 0 0 24px;">Embedded Workshop Intelligence Platform</h2>

  <p style="font-size: 1.05rem; color: #a1a1a6; max-width: 580px; margin: 0 auto; line-height: 1.75; font-weight: 300;">
    This project replaces the original page-level admin interface with a dedicated, secure <span style="color: #0071e3; font-weight: 500;">AdminDashboard</span> module. Built with React 18, TypeScript, and an inline CSS-in-JS architecture, it delivers inventory management, customer query tracking, job card workflows, and an AI-powered diagnostic assistant — all from a single embedded overlay protected by authentication.
  </p>

</div>

<hr style="border: none; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); max-width: 720px; margin: 0 auto;" />

<!-- Philosophy & Origin -->
<div align="center" style="padding: 140px 28px 120px; max-width: 720px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif;">
  <h3 style="font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: #0071e3; margin: 0 0 32px;">The Philosophy</h3>
  <h2 style="font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 600; letter-spacing: -0.035em; color: #f5f5f7; margin: 0 0 28px;">Not just repair. Precision.</h2>

  <p style="font-size: 1.05rem; color: #86868b; line-height: 1.75; margin-bottom: 28px;">
    Manoj Ji has spent over three decades mastering the art of car diagnosis and repair in Dabri and Dwarka, Delhi. This digital platform does not attempt to replace that human expertise — it extends it. The embedded admin panel is designed like a workshop tool: minimal surface, maximum function, zero friction.
  </p>

  <p style="font-size: 1.05rem; color: #86868b; line-height: 1.75; margin-bottom: 28px;">
    Originally, the site contained a basic admin layer embedded directly into the main page layout. That approach created visual and architectural conflict with the customer-facing experience. The solution: extract the management logic into a standalone <code style="background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 6px; font-size: 0.9em; color: #f5f5f7;">AdminDashboard.tsx</code> component that renders as a full-screen overlay (<code style="background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 6px; font-size: 0.9em; color: #f5f5f7;">position: fixed; inset: 0; z-index: 9999</code>), completely decoupled from the marketing pages yet always one click away.
  </p>

  <p style="font-size: 1.05rem; color: #a1a1a6; line-height: 1.75;">
    Every interaction — from editing a stock count to sending a WhatsApp message — is handled with React Hooks (<code style="background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 6px; font-size: 0.9em; color: #f5f5f7;">useState</code>, <code style="background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 6px; font-size: 0.9em; color: #f5f5f7;">useEffect</code>, <code style="background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 6px; font-size: 0.9em; color: #f5f5f7;">useCallback</code>) and synchronized to <code style="background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 6px; font-size: 0.9em; color: #f5f5f7;">localStorage</code> through a lightweight API layer. There is no backend server, no database cluster — just a resilient client-side architecture designed for rapid workshop deployment.
  </p>
</div>

<hr style="border: none; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); max-width: 720px; margin: 0 auto;" />

<!-- Features Deep Dive -->
<div align="center" style="padding: 120px 28px; max-width: 1000px; margin: 0 auto;">
  <h3 style="font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: #0071e3; margin: 0 0 24px;">Architecture</h3>
  <h2 style="font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 600; letter-spacing: -0.035em; color: #f5f5f7; margin: 0 0 16px;">Four Integrated Modules</h2>
  <p style="font-size: 1rem; color: #86868b; max-width: 540px; margin: 0 auto 64px;">Each module carries its own state machine, styling system, and interaction logic while remaining visually cohesive under a single design language.</p>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; text-align: left;">
    <article style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 28px; padding: 36px 32px;">
      <h4 style="font-size: 1.15rem; font-weight: 600; color: #f5f5f7; margin: 0 0 14px; letter-spacing: -0.01em;">About Section</h4>
      <p style="font-size: 0.92rem; color: #86868b; line-height: 1.65; margin: 0 0 14px;">
        Uses a two-column CSS Grid that collapses to a single column below 900px via an embedded media query. The owner card displays a "30+ Years of Mastery" badge with a subtle orange gradient shadow, while the worker row uses placeholder emoji-based image blocks with dark borders.
      </p>
      <p style="font-size: 0.85rem; color: #6e6e73; line-height: 1.6;">
        Typography pairs <span style="color: #0071e3;">Barlow Condensed</span> (display headers) with <span style="color: #0071e3;">Rajdhani</span> (label tracking) to create a mechanical, industrial aesthetic that reflects the workshop environment.
      </p>
    </article>

    <article style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 28px; padding: 36px 32px;">
      <h4 style="font-size: 1.15rem; font-weight: 600; color: #f5f5f7; margin: 0 0 14px; letter-spacing: -0.01em;">Admin Dashboard</h4>
      <p style="font-size: 0.92rem; color: #86868b; line-height: 1.65; margin: 0 0 14px;">
        The core management interface is protected by a password screen (<code style="background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px; font-size: 0.85em;">ADMIN_PASSWORD</code>) and renders four tabs: Dashboard, Inventory, Queries, and Job Cards. The Dashboard aggregates statistics using array <code style="background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px; font-size: 0.85em;">reduce</code> methods on live data.
      </p>
      <p style="font-size: 0.85rem; color: #6e6e73; line-height: 1.6;">
        Each tab is a pure function component (<code style="background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px; font-size: 0.85em;">renderDashboard()</code>, <code style="background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px; font-size: 0.85em;">renderInventory()</code>) that receives state props through closure scope, avoiding prop drilling.
      </p>
    </article>

    <article style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 28px; padding: 36px 32px;">
      <h4 style="font-size: 1.15rem; font-weight: 600; color: #f5f5f7; margin: 0 0 14px; letter-spacing: -0.01em;">AI Query Assistant</h4>
      <p style="font-size: 0.92rem; color: #86868b; line-height: 1.65; margin: 0 0 14px;">
        Integrates Anthropic's Claude Sonnet 4 (<code style="background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px; font-size: 0.85em;">claude-sonnet-4-20250514</code>) via a direct frontend fetch to the <code style="background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px; font-size: 0.85em;">v1/messages</code> endpoint. The system prompt enforces domain boundaries: Indian-market cars only, no luxury brands, 3-5 line responses, INR cost estimates, urgency flags, and a mandatory WhatsApp redirect.
      </p>
      <p style="font-size: 0.85rem; color: #6e6e73; line-height: 1.6;">
        Error boundaries catch network failures gracefully, displaying a fallback message that directs users to WhatsApp rather than leaving them in a broken state.
      </p>
    </article>

    <article style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 28px; padding: 36px 32px;">
      <h4 style="font-size: 1.15rem; font-weight: 600; color: #f5f5f7; margin: 0 0 14px; letter-spacing: -0.01em;">Data Layer</h4>
      <p style="font-size: 0.92rem; color: #86868b; line-height: 1.65; margin: 0 0 14px;">
        Rather than a remote database, the application uses a client-side persistence layer backed by three <code style="background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px; font-size: 0.85em;">localStorage</code> keys: <code style="background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px; font-size: 0.85em;">manoj_inventory</code>, <code style="background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px; font-size: 0.85em;">manoj_queries</code>, and <code style="background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px; font-size: 0.85em;">manoj_jobs</code>. TypeScript interfaces enforce shape consistency across the seed data (<code style="background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px; font-size: 0.85em;">carData.ts</code>) and runtime mutations.
      </p>
    </article>
  </div>
</div>

<hr style="border: none; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); max-width: 720px; margin: 0 auto;" />

<!-- Technical Deep Dive -->
<div align="center" style="padding: 120px 28px; max-width: 780px; margin: 0 auto;">
  <h3 style="font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: #0071e3; margin: 0 0 24px;">Implementation</h3>
  <h2 style="font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 600; letter-spacing: -0.035em; color: #f5f5f7; margin: 0 0 48px;">Under the Hood</h2>

  <div style="text-align: left; color: #a1a1a6; line-height: 1.75; font-size: 1rem;">
    <h4 style="color: #f5f5f7; font-size: 1.15rem; font-weight: 600; margin: 48px 0 16px;">Component Replacement Strategy</h4>
    <p>
      The user's original architecture contained two separate admin interfaces: one embedded within the main marketing site and another standalone module. The solution merges these into a single canonical component. <code style="background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 6px; font-size: 0.9em;">AdminDashboard.tsx</code> now serves as the exclusive management layer. It is imported into the main application and rendered conditionally or as an overlay, ensuring that the customer-facing pages (<code style="background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 6px; font-size: 0.9em;">About.tsx</code>, <code style="background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 6px; font-size: 0.9em;">Hero.tsx</code>, <code style="background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 6px; font-size: 0.9em;">Services.tsx</code>) remain visually intact while the workshop owner accesses full business intelligence through one entry point.
    </p>

    <h4 style="color: #f5f5f7; font-size: 1.15rem; font-weight: 600; margin: 48px 0 16px;">State Management & Persistence</h4>
    <p>
      All interactive data flows through React's built-in hook system. The dashboard calculates aggregate metrics by reducing over the live arrays:
    </p>
    <p style="padding: 16px 20px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; font-family: 'SF Mono', monospace; font-size: 0.85rem; color: #86868b; overflow-x: auto;">
      const openQueries = queries.filter(q => q.status === "new" || q.status === "in-progress").length;<br/>
      const revenue = jobs.filter(j => j.status === "completed" || j.status === "delivered")<br/>
        .reduce((s, j) => s + j.estimatedCost, 0);
    </p>
    <p>
      Updates to inventory are applied immediately through inline editing. When a user modifies stock, the component calls <code style="background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 6px; font-size: 0.9em;">updateStock()</code>, which maps the new value into the array, writes to <code style="background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 6px; font-size: 0.9em;">localStorage</code>, and resets the edit mode. This pattern eliminates the need for external form libraries or database transactions.
    </p>

    <h4 style="color: #f5f5f7; font-size: 1.15rem; font-weight: 600; margin: 48px 0 16px;">Styling Architecture</h4>
    <p>
      The entire visual system is implemented through inline <code style="background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 6px; font-size: 0.9em;">style={{ ... }}</code> objects. There are no external CSS files, no global stylesheets, and no CSS framework dependencies. This approach guarantees that the AdminDashboard overlay carries 100% of its own visual logic, preventing leakage into the customer site. The dark surface palette uses <code style="background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 6px; font-size: 0.9em;">#1a1a1a</code> (surface) and <code style="background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 6px; font-size: 0.9em;">#2c2c2c</code> (cards) with hairline borders at 6-8% white opacity. The workshop brand color (#f47c20) is reserved for interactive highlights, while the README design adheres to Apple's muted blue (#0071e3) for a unified editorial presence.
    </p>

    <h4 style="color: #f5f5f7; font-size: 1.15rem; font-weight: 600; margin: 48px 0 16px;">Responsive Behavior</h4>
    <p>
      The About section uses a CSS Grid that collapses from two columns to one at 900px through an embedded <code style="background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 6px; font-size: 0.9em;">@media</code> query within a <code style="background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 6px; font-size: 0.9em;">&lt;style&gt;</code> tag. Tables inside the inventory module scroll horizontally using <code style="background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 6px; font-size: 0.9em;">overflow-x: auto</code> to prevent layout breakage on narrow screens. All buttons and inputs maintain a minimum touch target of 44px, consistent with mobile usability standards.
    </p>
  </div>
</div>

<hr style="border: none; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); max-width: 720px; margin: 0 auto;" />

<!-- Tech Stack Expanded -->
<div align="center" style="padding: 120px 28px; max-width: 900px; margin: 0 auto;">
  <h3 style="font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: #0071e3; margin: 0 0 16px;">Stack</h3>
  <h2 style="font-size: clamp(1.8rem, 4vw, 2.6rem); font-weight: 600; letter-spacing: -0.035em; color: #f5f5f7; margin: 0 0 64px;">Clean Categories. No Clutter.</h2>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 48px; text-align: left;">
    <div>
      <h4 style="font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; color: #86868b; margin: 0 0 24px;">Frontend</h4>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <a href="https://react.dev" style="display: flex; align-items: center; gap: 14px; text-decoration: none; color: #f5f5f7; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <img src="https://skillicons.dev/icons?i=react" alt="React" width="28" height="28" />
          <span style="font-size: 0.95rem; font-weight: 500;">React 18</span>
        </a>
        <a href="https://www.typescriptlang.org" style="display: flex; align-items: center; gap: 14px; text-decoration: none; color: #f5f5f7; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <img src="https://skillicons.dev/icons?i=typescript" alt="TypeScript" width="28" height="28" />
          <span style="font-size: 0.95rem; font-weight: 500;">TypeScript 5</span>
        </a>
        <a href="https://vitejs.dev" style="display: flex; align-items: center; gap: 14px; text-decoration: none; color: #f5f5f7; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <img src="https://skillicons.dev/icons?i=vite" alt="Vite" width="28" height="28" />
          <span style="font-size: 0.95rem; font-weight: 500;">Vite</span>
        </a>
      </div>
      <p style="font-size: 0.85rem; color: #6e6e73; margin-top: 20px; line-height: 1.6;">
        Functional components only. No class components. Hooks provide all state logic.
      </p>
    </div>

    <div>
      <h4 style="font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; color: #86868b; margin: 0 0 24px;">State & Data</h4>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <a href="#" style="display: flex; align-items: center; gap: 14px; text-decoration: none; color: #f5f5f7; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <img src="https://skillicons.dev/icons?i=github" alt="GitHub" width="28" height="28" />
          <span style="font-size: 0.95rem; font-weight: 500;">localStorage API</span>
        </a>
        <a href="#" style="display: flex; align-items: center; gap: 14px; text-decoration: none; color: #f5f5f7; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <span style="background: #0071e3; color: #fff; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: 700;">JS</span>
          <span style="font-size: 0.95rem; font-weight: 500;">JSON Serialization</span>
        </a>
        <a href="#" style="display: flex; align-items: center; gap: 14px; text-decoration: none; color: #f5f5f7; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <img src="https://skillicons.dev/icons?i=git" alt="Git" width="28" height="28" />
          <span style="font-size: 0.95rem; font-weight: 500;">Git Version Control</span>
        </a>
      </div>
      <p style="font-size: 0.85rem; color: #6e6e73; margin-top: 20px; line-height: 1.6;">
        Zero backend. All persistence is client-side for rapid deployment.
      </p>
    </div>

    <div>
      <h4 style="font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase; color: #86868b; margin: 0 0 24px;">AI & Tools</h4>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <a href="https://www.anthropic.com" style="display: flex; align-items: center; gap: 14px; text-decoration: none; color: #f5f5f7; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <img src="https://skillicons.dev/icons?i=ai" alt="Anthropic" width="28" height="28" />
          <span style="font-size: 0.95rem; font-weight: 500;">Anthropic Claude 4</span>
        </a>
        <a href="https://github.com/features/actions" style="display: flex; align-items: center; gap: 14px; text-decoration: none; color: #f5f5f7; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <img src="https://skillicons.dev/icons?i=githubactions" alt="GitHub Actions" width="28" height="28" />
          <span style="font-size: 0.95rem; font-weight: 500;">Snake Workflow</span>
        </a>
      </div>
      <p style="font-size: 0.85rem; color: #6e6e73; margin-top: 20px; line-height: 1.6;">
        AI responses are constrained to Indian-market vehicles with INR pricing.
      </p>
    </div>
  </div>
</div>

<hr style="border: none; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); max-width: 720px; margin: 0 auto;" />

<!-- Design System -->
<div align="center" style="padding: 120px 28px; max-width: 720px; margin: 0 auto;">
  <h3 style="font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: #0071e3; margin: 0 0 16px;">Design System</h3>
  <h2 style="font-size: clamp(1.6rem, 4vw, 2.4rem); font-weight: 600; letter-spacing: -0.035em; color: #f5f5f7; margin: 0 0 48px;">Muted Tones. Intentional Space.</h2>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; text-align: center;">
    <div style="padding: 24px 16px; background: #000000; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px;">
      <div style="font-size: 1.2rem; font-weight: 600; color: #f5f5f7;">Black</div>
      <div style="font-size: 0.8rem; color: #86868b; margin-top: 6px;">#000000</div>
    </div>
    <div style="padding: 24px 16px; background: #1a1a1a; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px;">
      <div style="font-size: 1.2rem; font-weight: 600; color: #f5f5f7;">Surface</div>
      <div style="font-size: 0.8rem; color: #86868b; margin-top: 6px;">#1a1a1a</div>
    </div>
    <div style="padding: 24px 16px; background: #f5f5f7; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px;">
      <div style="font-size: 1.2rem; font-weight: 600; color: #1d1d1f;">White</div>
      <div style="font-size: 0.8rem; color: #6e6e73; margin-top: 6px;">#f5f5f7</div>
    </div>
    <div style="padding: 24px 16px; background: #0071e3; border: 1px solid rgba(0,113,227,0.3); border-radius: 16px;">
      <div style="font-size: 1.2rem; font-weight: 600; color: #ffffff;">Accent</div>
      <div style="font-size: 0.8rem; color: rgba(255,255,255,0.85); margin-top: 6px;">#0071e3</div>
    </div>
  </div>

  <p style="font-size: 0.9rem; color: #6e6e73; margin-top: 32px; line-height: 1.65;">
    The palette is intentionally restrained. Black and graphite surfaces provide depth without distraction. The Apple blue (#0071e3) is reserved exclusively for interactive links, section headers, and the typing animation — never for decoration. Typography uses a three-tier scale: <strong style="color: #f5f5f7;">Barlow Condensed</strong> for display headlines, <strong style="color: #f5f5f7;">Rajdhani</strong> for mechanical labels and navigation, and <strong style="color: #f5f5f7;">Barlow</strong> for readable body copy.
  </p>
</div>

<hr style="border: none; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); max-width: 720px; margin: 0 auto;" />

<!-- Project Structure -->
<div align="center" style="padding: 120px 28px; max-width: 780px; margin: 0 auto;">
  <h3 style="font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: #0071e3; margin: 0 0 24px;">Structure</h3>
  <h2 style="font-size: clamp(1.6rem, 4vw, 2.4rem); font-weight: 600; letter-spacing: -0.035em; color: #f5f5f7; margin: 0 0 48px;">Every File Has a Purpose</h2>

  <div style="text-align: left; background: #0a0a0a; border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; padding: 32px 36px; overflow-x: auto; font-family: 'SF Mono', Menlo, monospace; font-size: 0.82rem; line-height: 1.7; color: #a1a1a6;">
    manoj-automobile/<br>
    ├── src/<br>
    │   ├── components/<br>
    │   │   ├── About.tsx              <span style="color: #6e6e73;"># Owner & mechanics profile grid</span><br>
    │   │   ├── AdminDashboard.tsx     <span style="color: #0071e3; font-weight: 600;"># Embedded admin overlay (replaced original)</span><br>
    │   │   ├── AskQuery.tsx           <span style="color: #6e6e73;"># Claude AI diagnostic assistant</span><br>
    │   │   ├── Hero.tsx               <span style="color: #6e6e73;"># Landing hero section</span><br>
    │   │   ├── Services.tsx           <span style="color: #6e6e73;"># Service offerings grid</span><br>
    │   │   ├── Contact.tsx            <span style="color: #6e6e73;"># Contact & location info</span><br>
    │   │   └── Footer.tsx             <span style="color: #6e6e73;"># Site footer with closing banner</span><br>
    │   ├── data/<br>
    │   │   └── carData.ts             <span style="color: #6e6e73;"># TypeScript interfaces & seed inventory</span><br>
    │   ├── App.tsx                    <span style="color: #6e6e73;"># Main routing & component assembly</span><br>
    │   └── main.tsx                   <span style="color: #6e6e73;"># Vite entry point</span><br>
    ├── index.html                     <span style="color: #6e6e73;"># Root HTML with font preloads</span><br>
    ├── package.json                   <span style="color: #6e6e73;"># React 18 + TypeScript + Vite</span><br>
    ├── tsconfig.json                  <span style="color: #6e6e73;"># Strict TypeScript config</span><br>
    ├── vite.config.ts                 <span style="color: #6e6e73;"># Build & HMR settings</span><br>
    └── README.md                      <span style="color: #0071e3;"># ← You are here</span>
  </div>

  <p style="font-size: 0.9rem; color: #6e6e73; margin-top: 24px; line-height: 1.65;">
    The <code style="background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 6px; font-size: 0.9em;">AdminDashboard.tsx</code> file is the architectural pivot point. At over 600 lines, it contains its own navigation state, tab rendering logic, form handling, table rendering, and data persistence. By isolating all management logic inside this single component, the rest of the codebase remains a pure presentation layer.
  </p>
</div>

<hr style="border: none; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); max-width: 720px; margin: 0 auto;" />

<!-- Quick Start -->
<div align="center" style="padding: 120px 28px; max-width: 640px; margin: 0 auto;">
  <h3 style="font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: #0071e3; margin: 0 0 24px;">Setup</h3>
  <h2 style="font-size: clamp(1.6rem, 4vw, 2.4rem); font-weight: 600; letter-spacing: -0.035em; color: #f5f5f7; margin: 0 0 48px;">Quick Start</h2>

  <p style="font-size: 0.85rem; color: #86868b; line-height: 1.75; text-align: left; margin-bottom: 24px;">
    Clone the repository and install dependencies. The project uses Vite's default TypeScript template, which provides near-instant Hot Module Replacement (HMR) and native TypeScript compilation without an intermediate Babel step.
  </p>

  <div style="text-align: left; background: #0a0a0a; border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 24px 28px; font-family: 'SF Mono', monospace; font-size: 0.85rem; color: #a1a1a6; line-height: 1.8;">
    git clone https://github.com/manoj-automobile/manoj-automobile.git<br>
    cd manoj-automobile<br>
    npm install<br>
    npm run dev
  </div>

  <p style="font-size: 0.85rem; color: #86868b; line-height: 1.75; text-align: left; margin-top: 24px;">
    The admin dashboard requires no separate build step. It is included in the main bundle and loads immediately upon authentication. Default credentials for development access are embedded in the source (<code style="background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px; font-size: 0.85em;">manoj2024</code>). For production deployment, migrate the password and storage mechanism to a backend-protected environment.
  </p>
</div>

<hr style="border: none; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); max-width: 720px; margin: 0 auto;" />

<!-- Stats & Metrics -->
<div align="center" style="padding: 120px 28px; max-width: 900px; margin: 0 auto;">
  <h3 style="font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: #0071e3; margin: 0 0 16px;">Metrics</h3>
  <h2 style="font-size: clamp(1.6rem, 4vw, 2.4rem); font-weight: 600; letter-spacing: -0.035em; color: #f5f5f7; margin: 0 0 48px;">Transparent Data</h2>

  <p style="font-size: 0.95rem; color: #86868b; max-width: 540px; margin: 0 auto 48px; line-height: 1.65;">
    GitHub statistics are rendered with minimal themes — transparent backgrounds, thin borders, and no decorative clutter. The streak graph measures consistent contribution patterns over time.
  </p>

  <div style="display: flex; justify-content: center; align-items: center; gap: 20px; flex-wrap: wrap;">
    <img src="https://github-readme-stats.vercel.app/api?username=manoj-automobile&show_icons=true&theme=default&bg_color=00000000&border_color=333333&title_color=0071e3&text_color=f5f5f7&icon_color=0071e3&hide=issues,contributions" alt="GitHub Stats" style="border-radius: 14px; border: 1px solid rgba(255,255,255,0.06); max-width: 420px; width: 100%;" />
    <img src="https://github-readme-streak-stats.herokuapp.com/?user=manoj-automobile&theme=black-ice&hide_border=true&background=00000000&stroke=333333&ring=0071e3&fire=0071e3&currStreakLabel=f5f5f7" alt="GitHub Streak" style="border-radius: 14px; border: 1px solid rgba(255,255,255,0.06); max-width: 420px; width: 100%;" />
  </div>

  <p style="font-size: 0.8rem; color: #4a4a4a; margin-top: 32px;">
    Metrics refresh automatically. No manual updates required.
  </p>
</div>

<hr style="border: none; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); max-width: 720px; margin: 0 auto;" />

<!-- Snake Contribution -->
<div align="center" style="padding: 120px 28px; max-width: 820px; margin: 0 auto;">
  <h3 style="font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: #0071e3; margin: 0 0 16px;">Activity</h3>
  <h2 style="font-size: clamp(1.6rem, 4vw, 2.4rem); font-weight: 600; letter-spacing: -0.035em; color: #f5f5f7; margin: 0 0 36px;">A Living Record</h2>

  <p style="font-size: 0.95rem; color: #86868b; max-width: 560px; margin: 0 auto 32px; line-height: 1.65;">
    The contribution snake is generated by a GitHub Action that parses commit history and renders an animated SVG path. It updates automatically on every push, creating a subtle "living" element at the bottom of the profile.
  </p>

  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/manoj-automobile/manoj-automobile/blob/output/github-contribution-grid-snake-dark.svg" />
    <source media="(prefers-color-scheme: light)" srcset="https://github.com/manoj-automobile/manoj-automobile/blob/output/github-contribution-grid-snake.svg" />
    <img src="https://github.com/manoj-automobile/manoj-automobile/blob/output/github-contribution-grid-snake.svg" alt="Contribution Snake" style="width: 100%; max-width: 800px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.06); display: block; margin: 0 auto;" />
  </picture>

  <p style="font-size: 0.8rem; color: #4a4a4a; margin-top: 20px;">
    To activate: add the <code style="background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px;">github-contribution-grid-snake</code> workflow to your repository actions.
  </p>
</div>

<hr style="border: none; height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); max-width: 720px; margin: 0 auto;" />

<!-- Contact & Footer -->
<div align="center" style="padding: 120px 28px 80px; max-width: 700px; margin: 0 auto;">
  <h2 style="font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 600; letter-spacing: -0.03em; color: #f5f5f7; margin: 0 0 16px;">Manoj Automobile</h2>
  <p style="font-size: 1rem; color: #0071e3; font-weight: 500; margin: 0 0 36px;">Dabri / Dwarka · Delhi · Since 1994</p>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 48px;">
    <div style="padding: 20px 16px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px;">
      <div style="font-size: 1.1rem; font-weight: 600; color: #f5f5f7;">Experience</div>
      <div style="font-size: 0.85rem; color: #86868b; margin-top: 6px;">30+ Years of Master Craft</div>
    </div>
    <div style="padding: 20px 16px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px;">
      <div style="font-size: 1.1rem; font-weight: 600; color: #f5f5f7;">Specialization</div>
      <div style="font-size: 0.85rem; color: #86868b; margin-top: 6px;">Clutch & Brake Master</div>
    </div>
    <div style="padding: 20px 16px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px;">
      <div style="font-size: 1.1rem; font-weight: 600; color: #f5f5f7;">Parts Policy</div>
      <div style="font-size: 0.85rem; color: #86868b; margin-top: 6px;">OEM & Genuine Only</div>
    </div>
  </div>

  <p style="font-size: 1.05rem; color: #86868b; line-height: 1.7; margin-bottom: 40px;">
    "We only recommend work your car actually needs. Every vehicle gets personal, attentive care — never a rushed job. The digital dashboard extends that same philosophy: precise data, transparent billing, and direct access to the master behind the workshop."
  </p>

  <div style="display: flex; justify-content: center; gap: 32px; flex-wrap: wrap;">
    <a href="https://github.com/manoj-automobile" style="color: #0071e3; text-decoration: none; font-size: 0.9rem; font-weight: 500; letter-spacing: 0.02em;">GitHub</a>
    <a href="https://wa.me/911234567890" style="color: #0071e3; text-decoration: none; font-size: 0.9rem; font-weight: 500; letter-spacing: 0.02em;">WhatsApp</a>
  </div>

  <div style="margin-top: 80px;">
    <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,0a0a0a,50,141416,100,434343&height=120&section=footer" width="100%" alt="Footer Wave" style="border-radius: 20px; opacity: 0.5; border: 1px solid rgba(255,255,255,0.04);" />
  </div>

  <p style="font-size: 0.7rem; color: #4a4a4a; margin-top: 20px; letter-spacing: 0.05em;">
    MANOJ AUTOMOBILE · EMBEDDED ADMIN DASHBOARD · BUILT WITH REACT 18 + TYPE SCRIPT + VITE
  </p>
</div>
