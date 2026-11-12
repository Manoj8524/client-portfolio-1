---
name: animations
description: Advanced animation choreography, Framer Motion patterns, and GPU-accelerated CSS animations. Use when building reveal sequences, staggered card entries, infinite marquee loops, hover micro-interactions, and visual storytelling components.
---

# Animation Architecture & Choreography Standards

This skill provides production recipes and architectural patterns for creating high-performance animations with Framer Motion and modern CSS.

## 1. Framer Motion Architecture

### Staggered List / Grid Reveals
```tsx
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};
```

### AnimatePresence for Dynamic Tab Filters
- Always provide unique, stable `key` props (e.g. `item.id`).
- Set `mode="wait"` or `mode="popLayout"` on `<AnimatePresence>` to prevent jumpy layout snapping when filtering between categories.

## 2. Infinite Marquee Tickers (CSS GPU-Accelerated)

- For continuous, frictionless ticker animations (brand logos, film titles), use CSS keyframe animations rather than JavaScript `requestAnimationFrame` loops:
```css
@keyframes marquee {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}

.animate-marquee {
  display: flex;
  width: max-content;
  animation: marquee 35s linear infinite;
  will-change: transform;
}
```
- Duplicate content elements to guarantee seamless infinite wrapping without blank intervals.
- Pause or slow down on `:hover` or focus where helpful for accessibility.

## 3. Micro-Interactions & Hover Physics

- **Button Hover States**: Scale smoothly (`hover:scale-105 active:scale-95 transition-all duration-300`).
- **Card Hover Sheens**: Animate opacity of a top-layer gradient from `0` to `1` over `300ms` rather than recalculating filter properties.
- **Icon Transitions**: Rotate or translate directional arrows (`group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform`).

## 4. Animation Guardrails

- Keep durations under `900ms` for entrances and under `300ms` for hover interactions.
- Avoid cascading multi-second delays that make the UI feel slow or unresponsive.
- Ensure all interactive elements remain clickable throughout their animation states.
