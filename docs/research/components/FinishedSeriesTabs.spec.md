# FinishedSeriesTabs Specification

## Overview

- **Target:** `src/components/products/FinishedSeriesTabs.vue`
- **Screenshot:** `docs/design-references/original-finished-series-tabs-intro.png`
- **Interaction model:** route-driven.

## DOM Structure

- Full-width neutral wrapper.
- Inner flex row at 80% width.
- One `RouterLink` per series, each wrapping the original 320 × 240 sprite.

## Computed Styles

- Wrapper width: 100%.
- Inner width: 80%; centered.
- Desktop item width: `100% / 6`.
- Each item is `position: relative; overflow: hidden`.
- Visible height equals half the sprite: item aspect ratio 320 / 120.
- Sprite width: 100%; height: auto; position absolute.
- Selected sprite: `top: 0`.
- Unselected sprite: `bottom: 0`.
- Sprite transition: 0.3s.

## States

- Active route exposes the top 120px selected/photo half.
- Inactive routes expose the bottom 120px white/logo half.
- Clicking a tab navigates to its dedicated local Vue Router route.

## Assets

- `fe5763e5-37c8-4222-bf98-d4dba0b0aa02.jpg` — POSEENA
- `925d891b-d589-48d0-a44d-d09b0220e90f.jpg` — 禾气
- `fe82d2e4-ffed-4386-b6d1-0cc7fbb10eab.jpg` — 气质
- `b391778e-6b39-4269-9409-2d888309cb5c.jpg` — 天际
- `4d5335d7-8169-44ef-b025-c8bbe4f33f81.jpg` — 领见
- `053e5c97-7bb9-43a7-88a9-75ee128ca0a5.jpg` — DIKO

## Responsive Behavior

- Desktop: one row at 80vw.
- <=998px: horizontal scrolling is allowed; each item is at least 160px wide.
- Scrollbar is hidden without preventing touch scrolling.
