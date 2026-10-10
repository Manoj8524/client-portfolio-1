# Route Inventory — Yellowtooths

| Route | Page | File Path in Next.js App Router | Dynamic Route? | API Integrations | Status |
|---|---|---|---|---|---|
| `/` | Homepage | `src/app/page.tsx` | No | `/api/services`, `/api/featured-works`, `/api/clients`, `/api/loader-images` | Verified |
| `/about` | About Us | `src/app/about/page.tsx` | No | `/api/vision-images/all`, `/api/employee-photos/all` | Verified |
| `/works` | Works Overview | `src/app/works/page.tsx` | No | `/api/services`, `/api/featured-works`, `/api/film-poster-designs/all` | Verified |
| `/works/film-poster-design` | Film Poster Design | `src/app/works/film-poster-design/page.tsx` | No | `/api/film-poster-designs/all`, `/api/page-headers/search` | Verified |
| `/works/film-poster-design/[posterId]` | Film Poster Detail | `src/app/works/film-poster-design/[posterId]/page.tsx` | Yes (`posterId`) | `/api/film-poster-designs/:posterId` | Verified |
| `/works/film-promotion` | Film Promotion | `src/app/works/film-promotion/page.tsx` | No | `/api/services` | Verified |
| `/works/branding` | Branding Portfolio | `src/app/works/branding/page.tsx` | No | `/api/services`, `/api/featured-works` | Verified |
| `/works/digital-marketing` | Digital Marketing | `src/app/works/digital-marketing/page.tsx` | No | `/api/services` | Verified |
| `/works/technology-&-experience-design` | Tech & Experience Design | `src/app/works/technology-&-experience-design/page.tsx` | No | `/api/services` | Verified |
| `/works/video-production` | Video Production | `src/app/works/video-production/page.tsx` | No | `/api/services` | Verified |
| `/works/merchandising` | Merchandising | `src/app/works/merchandising/page.tsx` | No | `/api/services` | Verified |
| `/works/thinkery` | Thinkery | `src/app/works/thinkery/page.tsx` | No | Static / Editorial | Verified |
| `/works/global-academy-of-artistry` | Global Academy of Artistry | `src/app/works/global-academy-of-artistry/page.tsx` | No | Static / Editorial | Verified |
| `/gallery` | Studio Life & Moments | `src/app/gallery/page.tsx` | No | `/api/gallery` | Verified |
| `/careers` | Careers & Opportunities | `src/app/careers/page.tsx` | No | `/api/careers/all`, `/api/job-applications` | Verified |
| `/contact` | Contact Us | `src/app/contact/page.tsx` | No | `/api/contact-enquiries` | Verified |
| `/privacy-policy` | Privacy Policy | `src/app/privacy-policy/page.tsx` | No | Static legal text | Verified |
| `/*` (404) | Custom Not Found | `src/app/not-found.tsx` | Catch-all | — | Verified |

All routes link together via standard navigation menus, service cards, footer links, and breadcrumbs.
