# PoseenaHero Specification

- Targets: `src/components/InnerPageHero.vue` and `src/components/poseena/PoseenaHero.vue`
- Reference: `docs/design-references/poseena/extreme-system-desktop-1440.png`
- Interaction model: time-driven title dismissal beneath the shared transparent header.
- `InnerPageHero` is the reusable, typed inner-page hero. `PoseenaHero` is a thin adapter that binds the POSEENA configuration from `src/data/poseena.ts`.
- Image: `/assets/poseena/hero.jpg`, natural size 1920×960, `object-fit: cover`.
- Desktop: width `100%`, height `50vw` (960px at the source’s 1920px design); hero begins at document top.
- Mobile (`≤998px`): height `300px`; keep the whole left mountain/right triangular building composition visible with centered cover positioning.
- Center overlay: `/assets/backgrounds/109cddbb-f0ab-4d85-b117-906b3cd928a9.png` at 20% opacity behind `POSEENA普西纳`, a 70×4px white divider, and `极致系统家居`.
- The overlay remains fully visible for 2000ms and then fades to opacity 0 over 600ms. Reduced-motion mode keeps the hold time but removes the transition.
- Breadcrumb: a full-width bottom strip with a 1px `rgba(255,255,255,.1)` top border and 18px vertical padding (10px at `≤1366px`).
- Breadcrumb content uses the shared 1440/80% content width and 90% on mobile. The home icon and `网站首页` are a `RouterLink` to `/`; `POSEENA普西纳` is an inert current-page label with `aria-current="page"`.
- Text and icon are white with a subtle dark shadow for contrast.
