---
name: motion
description: Motion design principles, smooth scrolling integration, physics-based springs, and parallax choreographies. Use when designing fluid page transitions, Lenis scroll setups, touch responses, and scroll-linked UI transformations.
---

# Motion Design & Scroll Physics Standards

This skill defines the physics, timing, and integration standards for motion design across the application.

## 1. Physics & Easing Foundations

- **Natural Springs**: Prefer spring-based physics over linear transitions. Use gentle damping (`damping: 24, stiffness: 180`) for natural, organic settles.
- **Cubic Bezier Timing**: For duration-based tweens, use luxury ease-out curves such as `cubic-bezier(0.16, 1, 0.3, 1)` for snappy yet silky smooth deceleration.
- **Subtlety & Intent**: Motion must serve a functional purpose—guiding eye direction, establishing spatial depth, or confirming user intent. Avoid gratuitous, disorienting movement.

## 2. Smooth Scroll Orchestration (Lenis)

- **Single Global Controller**: Smooth scrolling is driven by `@studio-freight/lenis` (or `lenis`) wrapped in `SmoothScroll.tsx`.
- **Duration & Friction**: Keep scroll duration balanced (typically `1.2s` with `lerp: 0.1`) so navigation feels responsive and grounded rather than sluggish.
- **Scroll Sync**: When synchronizing Framer Motion `useScroll` with Lenis, target specific element containers or listen to normalized scroll offsets to avoid jank.

## 3. Scroll-Linked Parallax & Depth

- **Visual Velocity Layers**: Background elements should scroll slower (`scale: 1 -> 1.08`, translateY 20-30% of scroll delta) to produce atmospheric depth.
- **Clamp Ranges**: Always clamp scroll transforms (`[0, 1]` mapped to safe bounds) so elements never detach or cause horizontal scrollbars.
- **Will-Change Optimization**: Apply `will-change-transform` selectively to GPU-accelerated layers during scroll sequences and remove when idle to prevent memory bloat.

## 4. Performance & Frame Rates

- **60fps/120fps Mandate**: Never animate layout properties (`width`, `height`, `top`, `left`, `margin`, `padding`). Animate only composite properties: `transform` (`x`, `y`, `scale`, `rotate`) and `opacity`.
- **Reduced Motion Support**: Always respect `prefers-reduced-motion` media queries by disabling intense parallax and replacing it with clean crossfades.
