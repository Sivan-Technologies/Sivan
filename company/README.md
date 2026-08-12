<div align="center">

<img src="public/sivan-logo.png" alt="Sivan logo" width="220" />

# Sivan

**Service orchestration, coordinated on WhatsApp.**

Sivan bridges content creators, freelancers and agencies with the specific jobs they offer — agreeing on terms, processing payments and tracking delivery, all through WhatsApp. No app download. No setup. No jargon.

[![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff?logo=vite&logoColor=white)](https://vitejs.dev)
[![Build](https://img.shields.io/badge/build-passing-34c77b)](#-production-build)
[![PRs](https://img.shields.io/badge/PRs-welcome-0faec0)](#-contributing)
[![License](https://img.shields.io/badge/license-Pending-9ca3af)](#-license)

</div>

---

## Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Usage / Demo](#-usage--demo)
- [Production Build](#-production-build)
- [Project Structure](#-project-structure)
- [Customization](#-customization)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 About

**Sivan** is a service orchestration platform that runs entirely through **WhatsApp** — the channel millions of creators and freelancers already do business on. It connects content creators, freelancers and agencies with the specific jobs they offer, giving both parties a structured way to:

1. **Define the job** — scope, pricing and delivery expectations are agreed *before* work begins,
2. **Confirm terms** — both sides confirm the orchestration through a simple WhatsApp flow,
3. **Process payment** — payments run through secure third-party payment rails,
4. **Track delivery** — progress and completion updates are recorded step by step,
5. **Close out** — both parties confirm the service is complete, with a structured record to look back on.

This repository contains the **Sivan marketing / pilot-access website** — a premium, responsive single-page React application. The site is currently **Nigeria-first** (NGN bank payouts supported) and built to scale globally.

> 💡 **Scope note:** The product intentionally has no order books, no trading interface and no jargon — a simple, guided flow through WhatsApp. Payments and payouts are routed through secure third-party rails and settled to the seller's bank account.

---

## ✨ Features

- **Hero with a live WhatsApp chat preview** — a realistic chat mockup ("Live preview · Active") showing a full orchestration flow: *Create job for N20,000 → Confirm this service orchestration? → YES → Orchestration created* — with a status tracker (Orchestration · Terms confirmed · Payment · Delivery)
- **Three audience cards** — Content creators, Freelancers and Agencies, with a clear "what's in it for you" summary
- **"What Sivan does"** — three pillars: matching jobs with talent, simplified payment coordination, job delivery tracking
- **"How it works"** — a 5-step guided flow: Create orchestration → Confirm terms → Process payment → Deliver the job → Confirm completion
- **Transparency & Structure** — four record types: service orchestration record, payment reference, delivery update trail, dispute review workflow
- **Current scope** — "Nigeria-first. Built to scale globally" with live-in-Nigeria positioning and built-in dispute resolution
- **Bank payouts (offramp)** — a visual buyer → payment rails → offramp → seller flow, with "Secure payouts · Local bank payouts · NGN supported" badges
- **Pilot access CTA** — "Limited early access" banner inviting early users
- **Lead generation form** — "Tell us about what you do": Full name, Email, Phone (optional), "What do you need?" dropdown and a business description textarea, with the promise *"Every request receives a response within one business day."*
- **Editorial Dribbble-style design** — Inter for UI type, Instrument Serif italic accents, light airy background, rounded cards with subtle shadows
- **Brand-consistent palette** — drawn from the Sivan logo: deep blue `#037BDF`, bright blue `#018EE8`, cyan `#0FAEC0`, green `#34C77B`
- **Sticky navbar with mobile menu** — fully responsive from mobile to widescreen
- **Scroll-reveal animations** — lightweight `IntersectionObserver`-based `Reveal` wrapper, no animation library
- **Bundled local fonts** — Inter + Instrument Serif via Fontsource (works offline, no CDN dependency)
- **Zero runtime dependencies beyond React** — hand-rolled CSS design system, no Tailwind/CSS framework

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **UI** | [React 18](https://react.dev) (function components + hooks) |
| **Build tool** | [Vite 5](https://vitejs.dev) with `@vitejs/plugin-react` |
| **Icons** | [lucide-react](https://lucide.dev) |
| **Fonts** | `@fontsource-variable/inter` · `@fontsource/instrument-serif` (local, offline-capable) |
| **Styling** | Custom CSS design system (`src/index.css`) — CSS variables, gradients, shadows |
| **Animations** | Native `IntersectionObserver` (scroll reveal) |
| **Backend** | None — static site, deploy anywhere |

**Requirements:** Node.js 18+ and npm (or your preferred package manager).

---

## 🚀 Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/Sivan-Technologies/Sivan.git
cd Sivan
npm install
```

Start the development server:

```bash
npm run dev
```

Open the printed local URL — by default **http://localhost:5173**. The page hot-reloads as you edit files under `src/`.

---

## 🔐 Environment Variables

**None required.** This is a fully static front-end — no backend, no API keys, no secrets. The lead form is front-end only (see [Customization](#-customization) to wire it to a form service).

---

## 🖥️ Usage / Demo

The site is a single landing page organized as anchor sections (linked from the sticky navbar):

| Section | Component | Purpose |
|---|---|---|
| Home / Hero | `Hero.jsx` | Value proposition + WhatsApp chat "live preview" mockup |
| What Sivan does | `Services.jsx` | Matching jobs with talent · payment coordination · delivery tracking |
| How it works | `Process.jsx` | 5-step flow from orchestration to confirmed completion |
| Transparency & Structure | `WhyUs.jsx` | Orchestration record, payment reference, delivery trail, dispute review |
| Current scope | `Scope.jsx` | Nigeria-first positioning, built to scale globally |
| Bank payouts | `Payouts.jsx` | Buyer → Payment rails → Offramp → Seller (bank, NGN) |
| Pilot access | `CTA.jsx` | "Limited early access" banner |
| Contact / Lead form | `Contact.jsx` | "Tell us about what you do" form (front-end) + contact details |
| Footer | `Footer.jsx` | Brand, sitemap, contact info, social links |

To try the production bundle locally after building:

```bash
npm run preview
```

---

## 🏗️ Production Build

```bash
npm run build      # outputs an optimized static bundle to dist/
npm run preview    # serve the production build locally
```

---

## 📁 Project Structure

```
Sivan/
├── index.html                  # HTML entry, meta tags, favicon
├── vite.config.js              # Vite config (React plugin, host/port, allowed hosts)
├── package.json
├── public/                     # Static assets (served at site root)
│   ├── sivan-logo.png          #   full logo — light backgrounds
│   ├── sivan-logo-dark.png     #   full logo — dark backgrounds (white wordmark)
│   ├── sivan-mark.png          #   colorful mark only
│   └── sivan-favicon.png       #   browser favicon
├── assets/
│   └── sivan_logo_transparent.png  # source logo asset (transparent background)
└── src/
    ├── main.jsx                # React entry (fonts + root render)
    ├── App.jsx                 # Page composition (all sections in order)
    ├── index.css               # Design system: palette, typography, components
    └── components/
        ├── Navbar.jsx          # Sticky navbar + mobile menu + CTA
        ├── Hero.jsx            # Hero + WhatsApp chat "live preview" mockup
        ├── Services.jsx        # "What Sivan does" (3 pillars)
        ├── Process.jsx         # "How it works" (5 steps)
        ├── WhyUs.jsx           # "Transparency & Structure" (4 records)
        ├── Scope.jsx           # "Current scope" (Nigeria-first)
        ├── Payouts.jsx         # "Bank payouts" offramp flow
        ├── CTA.jsx             # "Pilot access" banner
        ├── Contact.jsx         # "Tell us about what you do" lead form
        ├── Footer.jsx          # Footer with contact + social links
        ├── Logo.jsx            # Reusable logo component (light/dark variants)
        ├── Reveal.jsx          # Scroll-reveal wrapper (IntersectionObserver)
        └── TechStack.jsx       # Standalone "modern stacks" chip section (not yet wired into App)
```

---

## 🎨 Customization

**Update contact details** — open `src/components/Contact.jsx` and `src/components/Footer.jsx`, then replace the placeholder values with your real ones:

- Phone: `+234 913 671 7403`
- Email: `support@sivantech.online`
- Address: `No 4, Olayinka Awo, Byzahin, Kubwa, Abuja, Nigeria`

**Wire up the lead form** — the form currently shows a confirmation message on submit (no backend). To receive real leads, point it at a form service (e.g. Formspree, Getform) or an email API in `Contact.jsx`'s `submit()` handler.

**Change the palette** — all brand tokens (colors, gradients, shadows, radii) live as CSS variables at the top of `src/index.css`.

**Enable the tech-stack section** — `TechStack.jsx` is a ready-made chips section ("Modern tools, proven foundations"); import and render it in `App.jsx` if you want it on the page.

---

## ☁️ Deployment

The build output is fully static (`dist/`), so it deploys anywhere static hosting works:

- **Vercel** — import the repo; framework preset auto-detects **Vite**. Build: `npm run build`, output: `dist`.
- **Netlify** — same: build command `npm run build`, publish directory `dist`.
- **Any static server / CDN** — upload the contents of `dist/`.

No environment variables or serverless functions are required.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork** the repository and create a feature branch (`git checkout -b feat/my-feature`)
2. **Make your changes** — keep components small, use the existing design tokens (CSS variables), and test with `npm run dev`
3. **Verify the build** — run `npm run build` and make sure it completes without errors
4. **Commit** with a clear message (`feat:`, `fix:`, `refactor:`, `style:`, `docs:`)
5. **Open a pull request** against `main` describing what you changed and why

**Guidelines:**
- One logical change per PR
- Prefer the existing design system over new ad-hoc styles
- Keep the site dependency-light (no heavy UI frameworks unless necessary)
- Update this README if you change structure or setup steps

---

## 📄 License

A license has not been specified for this repository yet (no `LICENSE` file is present). If you intend to distribute or reuse this code, please contact the Sivan team to clarify the applicable terms, or add a `LICENSE` file (e.g. MIT) and update this section.

---

<div align="center">

Made with ⚡ by **Sivan Technologies** — [sivantech.online](https://sivantech.online)

</div>
