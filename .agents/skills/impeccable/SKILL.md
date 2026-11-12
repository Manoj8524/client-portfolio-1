---
name: impeccable
description: Impeccable engineering excellence, clean-code architecture, and zero-defect quality standards for the codebase. Use when writing, refactoring, or auditing components, ensuring strict SOLID/DRY principles, zero runtime errors, and rock-solid type safety.
---

# Impeccable Engineering Standards

This skill enforces rigorous code craftsmanship, architectural discipline, and zero-defect software engineering throughout the codebase.

## 1. Architectural Integrity & Clean Code

- **Single Responsibility Principle (SRP)**: Each component, hook, and utility must do one thing with absolute clarity.
- **DRY (Don't Repeat Yourself)**: Eliminate duplicated markup, inline styles, and repeated fetch calls. Consolidate into reusable components and typed helper utilities.
- **Zero Dead Code**: Never leave orphaned components, unused imports, leftover test code, or legacy route handlers in the repository.

## 2. Type Safety & Validation

- **No `any`**: Strictly define TypeScript interfaces and types for all entities, component props, and API payloads.
- **Explicit Return Types**: Async functions and data loaders must return typed responses or fallback structures that prevent `undefined` runtime crashes.
- **Defensive Data Handling**: Guard against null/empty arrays in data transformations. Use optional chaining (`?.`) and safe default fallbacks (`|| []`).

## 3. Performance & Stability

- **Zero Layout Shifts (CLS)**: Every image and video element must specify explicit dimensions or aspect ratios with Next.js `<Image />`.
- **Bundle Optimization**: Isolate heavyweight dependencies (e.g. 3D canvas, motion libraries) and lazy-load where appropriate.
- **Strict Server/Client Boundaries**: Keep components server-rendered by default; mark only interactive components with `'use client'`.
- **Suspense Boundaries**: Wrap dynamic route search params (`useSearchParams`) and async client components in `<Suspense>`.

## 4. Security & Sanitization

- **No Exposed Secrets**: Strictly audit code to guarantee that no private API tokens, database URIs, or secret credentials exist in client bundles.
- **Input Sanitization**: Validate all client-side inputs (e.g. contact forms, newsletter subscriptions) before transmission.
- **External Links**: Enforce `rel="noopener noreferrer"` and `target="_blank"` on all outbound external URLs.

## 5. Review Checklist Before Committing

- [ ] Does `next build` succeed with exit code 0?
- [ ] Are all imports used and relevant?
- [ ] Are responsive breakpoints (mobile, tablet, desktop) handled gracefully?
- [ ] Is backward compatibility preserved for existing endpoints and routes?
