# Component Inventory — Yellowtooths

## 1. Global / Layout Components

1. **`Navbar` / `Header` (`src/components/layout/Navbar.tsx`)**:
   - Fixed header with transparent blur background.
   - Brand logo (Emblem + Yellowtooths wordmark).
   - Desktop Navigation Menu links: Home, About, Works, Gallery, Careers, Contact.
   - Contact CTA button: "Let's Talk".
   - Mobile menu hamburger trigger with animated full-screen overlay menu.

2. **`Footer` (`src/components/layout/Footer.tsx`)**:
   - Giant brand typography statement: "LET'S BUILD SOMETHING ICONIC".
   - Interactive newsletter email signup with live submission & feedback.
   - Contact Coordinates:
     - Address: Yellowtooths, Palarivattom, Kochi, Kerala 682025
     - Phone: `+91 90483 26777`
     - Email: `info@yellowtooths.in`
   - Social links: Instagram, Behance, YouTube, Facebook.
   - Footer subline with copyright & Privacy Policy route link.

3. **`Preloader` (`src/components/layout/Preloader.tsx`)**:
   - Initial loading state animation consuming `/api/loader-images`.
   - Smooth curtain reveal when ready.

4. **`SmoothScrollProvider` (`src/components/providers/SmoothScroll.tsx`)**:
   - Lenis smooth scroll provider for fluid agency navigation feel.

---

## 2. Shared UI Components

1. **`Button` / `PillButton`**:
   - Primary solid white button with black text.
   - Secondary bordered button with white outline and hover fill.
   - Magnetic / hover scale effect.

2. **`SectionHeader`**:
   - Subtitle badge (e.g. `// SERVICES`, `// SELECTED WORKS`).
   - Large display headline with fluid sizing (`Horas` / `Beckman` font).
   - Optional descriptive paragraph or CTA button.

3. **`WorkCard` / `ProjectCard`**:
   - High-aspect-ratio poster/work imagery.
   - Subtle hover zoom and overlay metadata (Client, Category, Year).
   - Link to detailed project route.

4. **`ServiceCard`**:
   - Numbered index (`01`, `02`, etc.).
   - Service title, excerpt, and link to service-specific showcase route.
   - Hover highlight and arrow indicator.

5. **`ClientTicker`**:
   - Infinite horizontal ticker of prestigious brand and film client logos.

---

## 3. Page-Specific Components

1. **Film Poster Design Catalog & Modal (`src/components/works/PosterModal.tsx`)**:
   - Fullscreen / drawer modal displaying high-res poster details.
   - Direct shareable route `/works/film-poster-design/:posterId`.
   - Previous/Next poster navigation.

2. **Career Application Modal & Form (`src/components/careers/ApplicationForm.tsx`)**:
   - Job selection, Name, Email, Phone, Portfolio Link, Resume upload.
   - API submission to `/api/job-applications`.

3. **Contact Enquiry Form (`src/components/contact/ContactForm.tsx`)**:
   - Name, Email, Phone, Service selection, Message.
   - API submission to `/api/contact-enquiries`.

4. **Gallery Masonry (`src/components/gallery/GalleryGrid.tsx`)**:
   - Responsive masonry layout of studio culture images.
   - Lightbox image viewer.
