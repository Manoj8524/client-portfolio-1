# Yellowtooths Website Recreation

High-fidelity, production-grade recreation of [Yellowtooths](https://yellowtooths.in/) built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS.

---

## 🚀 Key Highlights & Implemented Features

1. **Original Brand Typography & Fonts**
   - Direct integration of brand font assets: `Horas` (Medium, SemiBold, Bold, ExtraBold, Black), `Beckman Variable`, and `PPMori` (Extralight, Regular, SemiBold).
   - High-fidelity typography styling and scale.

2. **Every Single Discovered Route Implemented**
   - `/` — Homepage (Cinematic video hero, Dynamic Taglines, Services List, Featured Works preview, Client logos ticker, Editorial collaboration showcase).
   - `/about` — About Us ("We are Yellowtooths", 4 pillars, "15 Years of Cinematic Alchemy" manifesto banner, Vision & Philosophy collage, "Meet the Masters" team photo roster).
   - `/works` — Master Works directory with service cards and selected case study highlights.
   - `/works/film-poster-design` — Complete catalog of movie posters with realtime search and year filtering.
   - `/works/film-poster-design/:posterId` — Deep-linked detailed project showcase with full-res poster presentation, metadata (Language, Year, IMDb score, IMDb/Wikipedia external links), and variants gallery.
   - `/works/film-promotion` — Film promotion campaigns with capabilities grid and editorial callouts.
   - `/works/branding` — Brand architecture, naming, identity design, and brand management solutions.
   - `/works/digital-marketing` — Performance marketing, social strategy, and influencer campaigns.
   - `/works/technology-&-experience-design` — Web and app development, UI/UX, and immersive digital solutions.
   - `/works/video-production` — Commercials, reels, 3D/2D animation, and corporate videos.
   - `/works/merchandising` — Collector apparel, custom packaging, and fan memorabilia.
   - `/works/thinkery` — Creative laboratory and IP incubator.
   - `/works/global-academy-of-artistry` — Creative academy and masterclasses.
   - `/gallery` — Studio moments and culture media grid with category filters and lightbox preview.
   - `/careers` — Open job vacancies with live application form (name, email, mobile, position selector, and resume upload).
   - `/contact` — Office coordinates in Kochi, Kerala, direct phone/email cards, and live project inquiry form with validation.
   - `/privacy-policy` — Complete 13-section data handling policy and terms.
   - `/_not-found` — Branded "Lost in Space" 404 page.

3. **Live Backend API Integrations**
   - Services catalog: `GET /api/services`
   - Featured works: `GET /api/featured-works`
   - Film posters: `GET /api/film-poster-designs/all` & `GET /api/film-poster-designs/:id`
   - Vision & manifesto: `GET /api/vision-images/all`
   - Team members: `GET /api/employee-photos/all`
   - Career opportunities: `GET /api/careers/all`
   - Studio life moments: `GET /api/gallery`
   - Client partners: `GET /api/clients`
   - Project inquiries: `POST /api/contact-enquiries`
   - Job applications: `POST /api/job-applications`
   - Newsletter signups: `POST /api/newsletter-subscribers`

4. **Smooth Interactions & Responsive Polish**
   - Lenis smooth inertial scrolling globally enabled.
   - Responsive navbar with blur background, services dropdown, and mobile navigation drawer.
   - Infinite horizontal client marquee ticker.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ (Node.js 20+ recommended)
- npm or pnpm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
├── docs/
│   ├── website-audit.md
│   ├── routes.md
│   ├── design-system.md
│   ├── components.md
│   ├── functionality-checklist.md
│   └── assets-inventory.md
├── public/
│   ├── assets/       # Original brand fonts (Horas, Beckman, PPMori)
│   ├── video/        # Hero background video
│   └── favicon-02.svg
├── src/
│   ├── app/          # Next.js App Router pages
│   ├── components/   # Modular UI, Layout, and Service components
│   ├── lib/          # Backend API services & helpers
│   └── types/        # TypeScript interfaces
└── README.md
```
