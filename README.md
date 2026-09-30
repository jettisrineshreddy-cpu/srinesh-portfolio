# J. Srinesh — Portfolio

> **B.Tech Artificial Intelligence Student | Data Analytics · AI · Data Engineering**
> Amrita Vishwa Vidyapeetham, Amaravati Campus (2024 – 2028)

A production-quality, interactive 3D animated personal portfolio built with **React 19 + Vite + TypeScript**, a live **Three.js / R3F** particle environment, and **GSAP ScrollTrigger** scroll animations.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 8 + TypeScript |
| 3D Engine | Three.js · @react-three/fiber · @react-three/drei |
| Animation | GSAP + ScrollTrigger |
| Styling | Vanilla CSS (CSS custom properties) |
| Icons | Lucide React + custom SVG |
| Deployment | Vercel / Netlify (config included) |

---

## Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Install & Run

```bash
# Clone the repository
git clone https://github.com/[ADD GITHUB URL]/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── Navbar.tsx          # Scroll-aware, active-section navbar
│   ├── sections/
│   │   ├── Hero.tsx            # Landing + CTAs
│   │   ├── About.tsx           # Identity + glassmorphic terminal card
│   │   ├── Projects.tsx        # 6 projects (featured get 2-col emphasis)
│   │   ├── Skills.tsx          # Grouped technical capabilities
│   │   ├── Certifications.tsx  # PL-300 + DP-600 credentials
│   │   ├── ResearchCloud.tsx   # Cloud learning + PINNs research
│   │   └── Contact.tsx         # Social links + email + footer
│   ├── three/
│   │   ├── Scene.tsx           # R3F Canvas with WebGL fallback
│   │   ├── ParticleField.tsx   # 1200 instanced particles
│   │   ├── DataGrid.tsx        # Rotating wireframe grid
│   │   ├── FloatingNodes.tsx   # Geometric node network
│   │   └── ScrollRig.tsx       # Scroll-driven camera path
│   └── ui/
│       ├── Button.tsx / Badge.tsx / Icons.tsx / SkipLink.tsx
├── data/
│   ├── profile.ts              # ← FILL IN your real links here
│   ├── projects.ts
│   ├── skills.ts
│   └── certifications.ts       # ← FILL IN credential verification URLs
├── hooks/
│   ├── useGsapAnimations.ts    # All GSAP ScrollTrigger logic
│   ├── useReducedMotion.ts     # prefers-reduced-motion hook
│   └── useDeviceCapabilities.ts # Adaptive particle/DPR scaling
├── lib/utils.ts
└── styles/
    ├── globals.css             # Reset, shared utilities, WebGL layers
    └── variables.css           # Design token CSS custom properties
```

---

## Before Going Live — Checklist

Edit `src/data/profile.ts` and replace the placeholders:

```typescript
links: {
  github:   "[ADD GITHUB URL]",          // → https://github.com/yourusername
  linkedin: "[ADD LINKEDIN URL]",        // → https://linkedin.com/in/yourprofile
  email:    "[ADD PROFESSIONAL EMAIL]",  // → your@email.com
  resume:   "[ADD RESUME URL/PATH]",     // → Google Drive / Notion PDF link
}
```

Edit `src/data/certifications.ts`:
```typescript
verificationUrl: "[ADD CREDENTIAL VERIFICATION URL]"
// → https://learn.microsoft.com/en-us/users/.../credentials/...
```

Optionally add a real `public/favicon.svg` (or `.ico`) to replace the Vite default.

---

## Deployment

### Vercel (Recommended — zero config)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy from project root
vercel

# Or connect GitHub repo at vercel.com → New Project → import repo
```

The `vercel.json` in the project root handles SPA routing + security headers + asset caching automatically.

### Netlify

```bash
# Drag-and-drop the dist/ folder at app.netlify.com
# OR connect GitHub repo at app.netlify.com → Add new site

# Build settings (auto-detected from netlify.toml):
# Build command:  npm run build
# Publish dir:    dist
```

---

## Accessibility

- **Skip-to-content** link for keyboard users (Tab on page load)
- All icon-only links have `aria-label`
- Mobile nav has `aria-expanded` + `aria-controls`
- 3D canvas is `aria-hidden="true"` (decorative)
- `prefers-reduced-motion` respected: animations disabled, opacity fallback applied
- WebGL fallback: polished static gradient if WebGL is unavailable

---

## Performance

- Particles use `InstancedMesh` — one draw call for 1200 particles
- Adaptive quality: mobile gets 300 particles, DPR 1.0, no floating nodes
- Three.js loaded in its own chunk (code-split)
- Google Fonts use `display=swap`
- GSAP + ScrollTrigger only active if `prefers-reduced-motion` is false

---

*Built with React · Three.js · GSAP. Designed for recruiters and internship applications.*
