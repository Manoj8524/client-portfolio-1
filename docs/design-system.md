# Design System — Yellowtooths

## 1. Color Palette

- **Background Primary:** `#000000` (Pure Onyx / Pitch Black)
- **Background Secondary / Surface:** `#0a0a0a` / `#0f0f0f` / `#111827`
- **Surface Border:** `rgba(255, 255, 255, 0.1)` / `#262626`
- **Text Primary:** `#ffffff` (White)
- **Text Secondary / Muted:** `#9ca3af` (Gray 400), `#6b7280` (Gray 500)
- **Text Subdued:** `#4b5563` (Gray 600)
- **Brand Accent:** `#fbbf24` (Amber / Yellow) & Golden highlights
- **Hover / Highlight States:** `rgba(255, 255, 255, 0.08)` / `rgba(255, 255, 255, 0.15)`

## 2. Typography

The website uses a signature editorial typographic hierarchy combining high-contrast geometric display fonts and clean modern sans-serifs:

- **Display Headings / Brand Titles:**
  - `Horas` (Medium, SemiBold, Bold, ExtraBold, Black)
  - `Beckman Variable`
- **Primary Body & Interface:**
  - `PPMori` (Extralight, Regular, SemiBold)
  - `Geist Sans` / `Geist Variable`
- **Utility / Monospace:**
  - `Geist Mono Variable`
- **Fallbacks:**
  - `Inter Variable`, `Montserrat Variable`, `Noto Serif Variable`, `sans-serif`

### Fluid Typography Scale (from CSS):
- `.text-h1-sm`: `clamp(1.6rem, 4vw, 3rem)`
- `.text-h2-xs`: `clamp(1.5rem, calc(10vw + 1rem), 5rem)`
- `.text-h2-sm`: `2.2rem` to `5.5rem` with letter-spacing `-0.06rem` to `-0.3rem`
- Body: `1rem` (16px), line-height `1.75`
- Small / Metadata: `0.875rem` (14px) / `0.75rem` (12px)

## 3. Spacing & Container Layout

- **Primary Container Padding:**
  - Mobile: `px-4` / `px-6` (16px - 24px)
  - Tablet: `px-8` / `px-12` (32px - 48px)
  - Desktop: `px-12` to `px-20` (48px - 80px), max container width `1536px`
- **Section Vertical Rhythm:**
  - `py-16` / `py-24` / `py-32`
- **Card Radius:**
  - `rounded-xl` (12px) / `rounded-2xl` (16px) / `rounded-3xl` (24px) / `rounded-full` for pill buttons

## 4. Breakpoints

Standard Tailwind breakpoints matched:
- `sm`: `640px`
- `md`: `768px`
- `lg`: `1024px`
- `xl`: `1280px`
- `2xl`: `1536px`

## 5. Visual Effects & Interaction Design

- **Backdrop Blur:** `backdrop-blur-md` / `backdrop-blur-lg` on fixed navigations and modal backdrops.
- **Micro-interactions:** Smooth scale on hover (`scale-105`), subtle glow borders, card lift transitions.
- **Scroll Smoothness:** Lenis smooth scrolling integration.
- **Animations:** Framer Motion staggered reveals, text split animations, GSAP ticker and pinning effects.
