# Sivan — Website

A premium, responsive React website for **Sivan**, built with **React 18 + Vite**.

## About

The site mirrors the wording of the main Sivan website (sivantech.online) — **WhatsApp-based
service agreement coordination** for freelancers, agencies and small businesses — with the
crypto-related wordings removed (no stablecoin, Avalanche, USDC/USDT, blockchain) and replaced
by the offramp / bank-payout framing.

## ✨ Features

- **Editorial, Dribbble-style design** — Inter for UI type, Instrument Serif italics for accent words
- **Brand colours drawn from the Sivan logo** — deep blue `#037BDF`, bright blue `#018EE8`, cyan `#0FAEC0`, green `#34C77B` on a light, airy background
- **The actual Sivan logo** (white background removed) in the navbar, footer and browser favicon
- Sections (mirroring sivantech.online): Hero with a chat-style **"Live agreement preview"** · What Sivan does · How it works · Transparency & Structure · Current scope (Nigeria-first) · Bank payouts (offramp flow) · Pilot access · Contact
- Scroll-reveal animations, sticky navbar with mobile menu, fully responsive
- Inter + Instrument Serif fonts bundled locally (works offline, no CDN)

## 🚀 Run locally

```bash
cd sivan-website
npm install
npm run dev
```

Open the printed local URL (default `http://localhost:5173`).

## 🏗️ Production build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the production build
```

## 📁 Project structure

```
sivan-website/
├── index.html
├── vite.config.js
├── public/
│   ├── sivan-logo.png          # full logo — light backgrounds
│   ├── sivan-logo-dark.png     # full logo — dark backgrounds (white wordmark)
│   ├── sivan-mark.png          # colorful mark only
│   └── sivan-favicon.png       # browser favicon
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css               # design system / palette
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx            # hero + chat-style "Live agreement preview" mockup
        ├── Services.jsx        # "What Sivan does"
        ├── Process.jsx         # "How it works" (5 steps)
        ├── WhyUs.jsx           # "Transparency & Structure"
        ├── Scope.jsx           # "Current scope" (Nigeria-first)
        ├── Payouts.jsx         # "Bank payouts" offramp flow
        ├── CTA.jsx             # "Pilot access" banner
        ├── Contact.jsx         # "Request Pilot Access" form (front-end only)
        ├── Footer.jsx
        └── Reveal.jsx          # scroll-reveal wrapper
```

## ✏️ Edit the contact details

Open `src/components/Contact.jsx` and `src/components/Footer.jsx` and replace the
placeholder phone / email / address (currently `+234 (0) 800 000 0000`,
`hello@sivan.dev`, `Suite 14, Crescent Place, Abuja, Nigeria`) with the real ones.

## 🔗 Wire up the contact form

The form currently shows a confirmation message on submit (no backend). To receive real
requests, point it at a form service (e.g. Formspree, Getform) or an email API.
