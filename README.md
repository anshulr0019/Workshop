<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a1a,50:f47c20,100:d96a10&height=220&section=header&text=MANOJ%20AUTOMOBILE&fontSize=60&fontColor=ffffff&fontAlignY=36&desc=Embedded%20Admin%20Panel%20·%2030%2B%20Years%20Mastery%20·%20Delhi&descSize=16&descAlignY=56" width="100%" alt="Header Banner" />

<br/>

<a href="#"><img src="https://img.shields.io/badge/Status-Production_Ready-22c55e?style=for-the-badge&logoColor=white&labelColor=1a1a1a" alt="Status" /></a>
<a href="#"><img src="https://img.shields.io/badge/License-Private-ef4444?style=for-the-badge&logoColor=white&labelColor=1a1a1a" alt="License" /></a>
<a href="#"><img src="https://img.shields.io/badge/Stack-React_18%2B_TypeScript-f47c20?style=for-the-badge&logoColor=white&labelColor=1a1a1a" alt="Stack" /></a>
<a href="#"><img src="https://img.shields.io/badge/Dashboard-Embedded_Admin-fbbf24?style=for-the-badge&logoColor=black&labelColor=1a1a1a" alt="Admin" /></a>
<a href="#"><img src="https://img.shields.io/badge/AI-Powered_Queries-3b82f6?style=for-the-badge&logoColor=white&labelColor=1a1a1a" alt="AI" /></a>

<h1>Manoj Automobile</h1>
<h3>Premium Workshop · 30+ Years of Craftsmanship · Dabri / Dwarka, Delhi</h3>

<p>
This is a unified full-stack platform where the <b>customer-facing website</b> and the <b>embedded admin business dashboard</b> live together. The original main-page admin was replaced with the dedicated <code>AdminDashboard.tsx</code> module for inventory, query tracking, job cards, and revenue stats — all protected behind a secure admin login.
</p>

</div>

<hr style="border: 1px solid rgba(244,124,32,0.25); margin: 40px 0;" />

<div align="center">

## Project Overview

</div>

<p>
Built for <b>Manoj Ji</b> — owner and master mechanic with over three decades of experience. The project now integrates:
</p>

<ul>
<li><b>About Section</b> — Owner & mechanics profile, experience badges, photo placeholders.</li>
<li><b>Embedded Admin Dashboard</b> — Full business control: Dashboard stats, Inventory, Customer Queries, Job Cards.</li>
<li><b>AI Query Assistant</b> — Claude-powered car diagnosis for Indian-market vehicles with cost estimates in INR.</li>
<li><b>Customer Sections</b> — Services, Contact, and transparent workshop philosophy.</li>
</ul>

<div align="center">

## Feature Highlights

</div>

<table>
<thead>
<tr style="background:#222; color:#f47c20;">
<th align="center">Module</th>
<th>Description</th>
<th align="center">Key Capability</th>
</tr>
</thead>
<tbody>
<tr style="background:#1a1a1a;"><td align="center">📊 Admin Dashboard</td><td>Embedded business management panel replacing the original main-page admin</td><td align="center">Password-protected · Real-time stats · Low-stock alerts</td></tr>
<tr style="background:#181818;"><td align="center">📦 Inventory System</td><td>Full stock tracking with categories, thresholds, and value calculation</td><td align="center">Critical / Low / OK indicators · Inline editing</td></tr>
<tr style="background:#1a1a1a;"><td align="center">📨 Queries</td><td>Customer issue tracking with WhatsApp integration</td><td align="center">Status flow: New → In-Progress → Quoted → Done</td></tr>
<tr style="background:#181818;"><td align="center">🔧 Job Cards</td><td>Repair tracking from intake to delivery</td><td align="center">Pending → Progress → Completed → Delivered</td></tr>
<tr style="background:#1a1a1a;"><td align="center">🤖 AI Assistant</td><td>Claude Sonnet 4 trained for Indian cars</td><td align="center">Cost estimates · Urgency check · WhatsApp redirect</td></tr>
</tbody>
</table>

<hr style="border: 1px solid rgba(244,124,32,0.25); margin: 40px 0;" />

<div align="center">

## Architecture

</div>

<div align="center" style="font-family: monospace; background: #111; border: 1px solid rgba(244,124,32,0.2); border-radius: 12px; padding: 24px; max-width: 700px;">

MANOJ AUTOMOBILE PLATFORM
├── Customer Website (About, Hero, Services, Contact)
│   └── Integrated Navigation
└── Embedded Admin Dashboard (Replaced Original)
    ├── Login Screen (manoj2024)
    ├── Dashboard (Stats & Alerts)
    ├── Inventory (Stock Management)
    ├── Queries (Customer Tracking + WhatsApp)
    └── Jobs (Card System + Revenue)
        └── Data Layer (localStorage API)

</div>

<div align="center">

## Tech Stack

</div>

<div align="center">
<img src="https://skillicons.dev/icons?i=react" width="50" height="50" alt="React" title="React" />
<img src="https://skillicons.dev/icons?i=typescript" width="50" height="50" alt="TypeScript" title="TypeScript" />
<img src="https://skillicons.dev/icons?i=vite" width="50" height="50" alt="Vite" title="Vite" />
<img src="https://skillicons.dev/icons?i=css" width="50" height="50" alt="CSS" title="CSS" />
<br/><br/>
<img src="https://img.shields.io/badge/Storage-localStorage_Storage-6b7280?style=flat-square&labelColor=1a1a1a" alt="Storage" />
<img src="https://img.shields.io/badge/AI-Anthropic_Claude_4-3b82f6?style=flat-square&labelColor=1a1a1a" alt="AI" />
</div>

<hr style="border: 1px solid rgba(244,124,32,0.25); margin: 40px 0;" />

<div align="center">

## Design System

</div>

<table>
<thead>
<tr style="background:#222; color:#fff;">
<th>Token</th>
<th>Color / Value</th>
<th>Usage</th>
</tr>
</thead>
<tbody>
<tr style="background:#1a1a1a;"><td>Primary Brand</td><td>#f47c20</td><td>Buttons, badges, accents, highlights</td></tr>
<tr style="background:#181818;"><td>Background</td><td>#1a1a1a</td><td>Page and card background</td></tr>
<tr style="background:#1a1a1a;"><td>Surface</td><td>#222 / #2c2c2c</td><td>Cards, inputs, tables</td></tr>
<tr style="background:#181818;"><td>Success</td><td>#22c55e</td><td>OK stock, completed jobs</td></tr>
<tr style="background:#1a1a1a;"><td>Warning</td><td>#eab308</td><td>Low stock, pending status</td></tr>
<tr style="background:#181818;"><td>Critical</td><td>#ef4444</td><td>Critical stock, errors</td></tr>
<tr style="background:#1a1a1a;"><td>Info / Quoted</td><td>#3b82f6 / #a855f7</td><td>New queries, quoted status</td></tr>
</tbody>
</table>

<div align="center">

## Project Structure

</div>

    manoj-automobile/
    ├── src/
    │   ├── components/
    │   │   ├── About.tsx              # Owner & workers profile section
    │   │   ├── AdminDashboard.tsx     # EMBEDDED admin panel (replaced original)
    │   │   ├── AskQuery.tsx           # AI-powered car diagnostic
    │   │   ├── Hero.tsx               # Landing hero section
    │   │   ├── Services.tsx           # Service offerings
    │   │   ├── Contact.tsx            # Contact & location info
    │   │   └── Footer.tsx             # Site footer
    │   ├── data/
    │   │   └── carData.ts             # Inventory data & types
    │   ├── App.tsx                    # Main app routing
    │   └── main.tsx                   # Entry point
    ├── index.html
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    └── README.md                      # ← You are here

<hr style="border: 1px solid rgba(244,124,32,0.25); margin: 40px 0;" />

<div align="center">

## Quick Start

</div>

    git clone https://github.com/yourusername/manoj-automobile.git
    cd manoj-automobile
    npm install
    npm run dev

<div align="center">
<img src="https://img.shields.io/badge/Dev_Server-localhost:5173-22c55e?style=for-the-badge&labelColor=1a1a1a" />
</div>

<hr style="border: 1px solid rgba(244,124,32,0.25); margin: 40px 0;" />

<div align="center">

## Admin Dashboard Access

</div>

<p>
The embedded admin is protected via a secure login screen. Default password for development:
</p>

<div align="center" style="background:#222; border: 1px solid rgba(244,124,32,0.3); border-radius: 8px; padding: 16px; display: inline-block;">

Password: <code>manoj2024</code>  |  Storage: <code>localStorage</code>  |  API: <code>Anthropic Claude Sonnet 4</code>

</div>

<p>
Once authenticated, navigate through:
</p>

<ul>
<li><b>Dashboard</b> — Open queries, active jobs, low stock alerts, revenue, inventory value.</li>
<li><b>Inventory</b> — Edit stock levels, view critical/low/OK status, reset defaults.</li>
<li><b>Queries</b> — Manage customer issues, change status, open WhatsApp chat.</li>
<li><b>Jobs</b> — Create job cards, track repair status, calculate revenue.</li>
</ul>

<hr style="border: 1px solid rgba(244,124,32,0.25); margin: 40px 0;" />

<div align="center">

## AI Assistant Features

</div>

<ul>
<li>Quick-select chips for common car issues (brake noise, AC failure, overheating, service intervals, CNG mileage).</li>
<li>Answers in 3-5 lines with clear diagnosis, urgency level, and rough cost in INR.</li>
<li>Always ends with a recommendation to WhatsApp Manoj Ji for exact diagnosis.</li>
<li>Trained specifically for Indian-market brands: Maruti Suzuki, Hyundai, Toyota, Tata, Mahindra, Honda, Kia, Renault.</li>
</ul>

<hr style="border: 1px solid rgba(244,124,32,0.25); margin: 40px 0;" />

<div align="center">

## Roadmap

</div>

<table>
<thead>
<tr style="background:#222; color:#fff;">
<th>Phase</th>
<th>Feature</th>
<th>Status</th>
</tr>
</thead>
<tbody>
<tr style="background:#1a1a1a;"><td>Phase 1</td><td>Customer site + embedded admin dashboard</td><td>✅ Done</td></tr>
<tr style="background:#181818;"><td>Phase 2</td><td>Inventory & query tracking systems</td><td>✅ Done</td></tr>
<tr style="background:#1a1a1a;"><td>Phase 3</td><td>Job card management + AI assistant</td><td>✅ Done</td></tr>
<tr style="background:#181818;"><td>Phase 4</td><td>Backend API + database migration</td><td>🔄 Planned</td></tr>
<tr style="background:#1a1a1a;"><td>Phase 5</td><td>WhatsApp automation + SMS notifications</td><td>🔄 Planned</td></tr>
<tr style="background:#181818;"><td>Phase 6</td><td>Customer login portal + invoice PDF</td><td>🔄 Planned</td></tr>
</tbody>
</table>

<hr style="border: 1px solid rgba(244,124,32,0.25); margin: 40px 0;" />

<div align="center">

## Contact & Business Info

</div>

<table>
<thead>
<tr style="background:#222; color:#fff;">
<th>Workshop</th>
<th>Specialization</th>
<th>Connect</th>
</tr>
</thead>
<tbody>
<tr style="background:#1a1a1a;">
<td align="center">
<b>Manoj Automobile</b><br/>
Dabri / Dwarka, Delhi<br/>
<img src="https://img.shields.io/badge/Experience-30%2B_Years-f47c20?style=flat-square&labelColor=1a1a1a" alt="Experience" />
</td>
<td align="center">
Clutch & Brake Master<br/>
OEM & Genuine Parts Only<br/>
Transparent Billing
</td>
<td align="center">
WhatsApp for Quick Queries<br/>
Personal Attention Per Visit<br/>
<img src="https://img.shields.io/badge/WhatsApp-Chat_Now-25d366?style=flat-square&labelColor=1a1a1a" alt="WhatsApp" />
</td>
</tr>
</tbody>
</table>

<br/>

<div align="center">

<p>
<img src="https://img.shields.io/badge/Built_with-❤️_%26_⚙️-f47c20?style=for-the-badge&labelColor=1a1a1a" alt="Built With" /><br/>
<b>Not Just a Mechanic — A Master of His Craft</b><br/>
— Manoj Ji, Owner · 30+ Years of Automotive Excellence
</p>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a1a,50:f47c20,100:d96a10&height=120&section=footer" width="100%" alt="Footer" />

</div>
