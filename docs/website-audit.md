# Website Audit — Yellowtooths

**Reference Website:** https://yellowtooths.in/  
**Audit Date:** 2026-10-10  
**Technology Detected:** React SPA (Vite / React Router / Tailwind CSS / Framer Motion / GSAP / Lucide Icons / PWA)  
**Backend CMS/API:** Headless REST API hosted at `https://yt.jinskadamthodu.com/public/api/`

---

## 1. Overview and Architecture

Yellowtooths is an Indian multidisciplinary creative agency based in Kerala (Kochi) specializing in:
- Film Poster Design
- Film Promotion
- Branding
- Digital Marketing
- Technology & Experience Design
- Video Production
- Merchandising
- Thinkery (Strategy / IP incubation)
- Global Academy of Artistry

The website is a high-craft, cinematic creative agency portfolio featuring dark aesthetics (pure black `#000000`, neutral dark tones `#0a0a0a`, `#111827`, off-white accents, and gold/yellow brand highlights), custom typography (Horas, Beckman, PPMori, Geist Sans), smooth transitions, rich media galleries, modal detail views, interactive contact inquiries, job applications, and newsletter subscriptions.

---

## 2. Page Hierarchy & Discovered Routes

| Route | Page Name / Component | Key Sections & Features | Status |
|---|---|---|---|
| `/` | Homepage | Preloader / Hero video banner with dynamic tagline, Featured Work showcase cards, Services grid list, Philosophy/About teaser, Clients logo ticker / grid, Footer | 200 OK |
| `/about` | About Us | Company Overview, "The Yellowtooths Story", Vision & Philosophy images, Leadership & Team Member Photo Grid, Creative manifesto | 200 OK |
| `/works` | Works Overview | Master work showcase, Category filters, Featured case studies, links to service specific portfolios | 200 OK |
| `/works/film-poster-design` | Film Poster Design Gallery | Poster grid layout, category filtering, click-to-modal high-resolution preview & detailed project views | 200 OK |
| `/works/film-poster-design/:posterId` | Poster Detail Modal / Route | High-resolution poster presentation, movie credits, creative direction, release year, tags, close & navigation | 200 OK |
| `/works/film-promotion` | Film Promotion Portfolio | Campaign highlights, digital rollout strategies, promotional teasers, video embeds | 200 OK |
| `/works/branding` | Branding Portfolio | Brand identity design, logo marks, typography guides, collateral showcase, brand strategy | 200 OK |
| `/works/digital-marketing` | Digital Marketing Portfolio | Social media campaigns, viral promotions, engagement statistics, performance marketing | 200 OK |
| `/works/technology-&-experience-design` | Tech & Experience Design | Interactive websites, apps, digital installations, 3D experiences, UI/UX showcases | 200 OK |
| `/works/video-production` | Video Production Portfolio | Showreels, TVCs, music videos, promotional video embeds (YouTube / custom video player) | 200 OK |
| `/works/merchandising` | Merchandising Portfolio | Custom branded merchandise, apparel, collector items, packaging | 200 OK |
| `/works/thinkery` | Thinkery | Creative laboratory, intellectual properties, conceptual projects, storytelling studio | 200 OK |
| `/works/global-academy-of-artistry` | Global Academy of Artistry | Educational initiative, creative workshops, mentorship programs | 200 OK |
| `/gallery` | Agency Culture & Moments | Masonry / grid gallery of studio life, behind the scenes, award celebrations, team culture | 200 OK |
| `/careers` | Careers / Job Openings | Current open positions (Design, Motion, Tech, Copy), Job description modals, interactive Job Application Form with resume upload & portfolio URL | 200 OK |
| `/contact` | Contact Us | Office Address (Kochi, Kerala), Google Maps link & embed, Direct email/phone contact cards, Interactive Project Inquiry Form | 200 OK |
| `/privacy-policy` | Privacy Policy | Detailed privacy policy terms, data handling, cookies, contact info | 200 OK |
| `*` | 404 Not Found | Branded 404 page with return home CTA | 200 OK |

---

## 3. Global Components

1. **Header / Navbar:**
   - Responsive floating/fixed transparent header with backdrop blur.
   - Logo: Yellowtooths geometric wordmark & emblem SVG.
   - Desktop Navigation Links: `Home`, `About`, `Works`, `Gallery`, `Careers`, `Contact`.
   - Contact CTA button: "Let's Talk" / "Contact Us".
   - Mobile Fullscreen Hamburger Menu with smooth motion drawer and animated navigation links.

2. **Footer:**
   - Large brand typography / statement banner: "LET'S BUILD SOMETHING ICONIC".
   - Newsletter Subscription Form with email input & submit button.
   - Quick Links (Company, Works, Socials).
   - Social Media Links: Instagram, Behance, YouTube, Facebook.
   - Contact coordinates: Address in Kochi, Kerala; Phone: `+91 90483 26777`, Email: `info@yellowtooths.in`.
   - Copyright notice & Privacy Policy link.

3. **Preloader:**
   - Smooth animated loader displaying dynamic logo / loader images fetched from `/api/loader-images`.
   - Progress animation transitioning cleanly into the hero section.

---

## 4. API Endpoints Inspected & Verified

All endpoints from the live backend `https://yt.jinskadamthodu.com/public` were directly audited:
- `GET /api/loader-images` — Preloader image sequence
- `GET /api/services` — List of agency services, descriptions, position order, and slug
- `GET /api/featured-works` — Curated showcase projects displayed on homepage
- `GET /api/film-poster-designs/all` — Complete catalog of movie posters with titles, images, categories, and IDs
- `GET /api/film-poster-designs/:id` — Single poster detailed record
- `POST /api/page-headers/search` — Dynamic banner headers for sub-pages
- `GET /api/vision-images/all` — Imagery for About Us / Vision section
- `GET /api/employee-photos/all` — Team member photos, roles, names
- `GET /api/careers/all` — Job listings with requirements and openings
- `GET /api/gallery` — Studio moments and photos
- `GET /api/clients` — Client brand logos and partner names
- `POST /api/contact-enquiries` — Submission endpoint for project enquiries
- `POST /api/job-applications` — Submission endpoint for career applications
- `POST /api/newsletter-subscribers` — Email subscription endpoint
