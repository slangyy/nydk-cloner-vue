# FinishedSystemPage Specification

## Overview

- **Target:** `src/components/products/FinishedSystemPage.vue`
- **Original routes:**
  - `/home_decoration_p5.html?p=4` — POSEENA 普西纳
  - `/home_decoration_p1.html?p=4` — 禾气
  - `/home_decoration_p2.html?p=4` — 气质
  - `/home_decoration_p3.html?p=4` — 天际
  - `/home_decoration_p4.html?p=4` — 领见
  - `/home_decoration_p6.html?p=4` — DIKO
- **Reference screenshots:**
  - `docs/design-references/original-finished-series-tabs-intro.png`
  - `docs/design-references/original-finished-space-gallery.png`
- **Interaction model:** series switch is route-driven; space switch is click-driven.

## Page Topology

1. Existing shared `ProductPageShell` / `InnerPageHero`.
2. `FinishedSeriesTabs` using six 320 × 240 sprite images.
3. Centered introduction on the original pale texture.
4. Full-width `FinishedSpaceShowcase`.
5. Existing shared footer.

The six routes must all render the same component and receive only a strict
`variantKey` prop. The active series changes the Hero, introduction and all space
images. Query parameter `p` does not control the variant.

## Introduction

- Background: local `954d088f-9daa-4e97-aa81-0a3bafcfa11c.jpg`, cover.
- Desktop height: 730px at the inspected 2555px viewport.
- Inner padding: 120px 0.
- Main title: 48px, weight 500, line-height 72px, centered, `#231815`.
- Subtitle: 36px, line-height 54px, letter-spacing `0.5em`, margin-top 30px.
- Divider: 120 × 2px, `#bc9480`, centered below the subtitle.
- Chinese copy: width 62.5%, 18px, line-height 54px, `#777`, centered.
- English copy: width 62.5%, 16px, line-height 48px, `#ccc`, centered.
- At <=1366px use 60px vertical padding and reduce copy line-height to 2.
- At <=998px use 90% copy width, smaller title sizes and content-height layout.
- All four text rows reveal once with the existing viewport reveal behavior.

## Per-Variant Content

The verbatim content and local asset paths are stored in
`docs/research/products/finished-pages.raw.json`. Components consume a typed
adapter from `src/data/products/finished.ts`; they never read remote URLs.

## Responsive Behavior

- Desktop: six series tabs in one 80vw row; introduction and showcase remain
  full-width.
- Tablet/mobile: series row scrolls horizontally; each item remains a 4:3
  viewport showing half of its sprite. The showcase keeps a landscape image and
  the space controls become horizontally scrollable.
- Reduced motion: reveal and cross-fade durations become zero.

## Accessibility

- Series navigation uses `RouterLink` and `aria-current="page"`.
- Space controls use a tablist and keyboard-focusable buttons.
- Current space main image has a useful alt string derived from series + space.
- Detail viewer closes with Escape and restores body scrolling.
