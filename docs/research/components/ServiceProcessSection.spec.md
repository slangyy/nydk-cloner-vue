# ServiceProcessSection Specification

## Overview

- Target: `src/components/products/ServiceProcessSection.vue`
- Interaction model: time-driven + hover/focus-driven.
- Background:
  `/assets/products/service/44b0c0d2-94a4-4c86-a696-9600ab687d34.jpg`

## Desktop structure

- Section padding: `8vw 0`; background centered and covered.
- Orbit container: `740 × 740px`, centered.
- Orbit asset:
  `/assets/products/service/fb659dea-a590-4b44-8b42-9be70e1de1aa.png`
- Central title is absolutely centered, width `30%` of the section.
- Title: `SERVICE / 服务流程`; N watermark opacity `0.2`.
- Add button: `44 × 44px`, round, `#bc9480`, white plus.

## Seven nodes

- Each node is an absolutely positioned `500px` flex row.
- Number and label: `20px / 30px`, `rgba(255,255,255,.5)`.
- Image collapsed state: width `0`, height `100px`, pill radius.
- Active/hover image: `220 × 100px`, transition `0.5s ease-in-out`.
- Positions follow the original seven-point orbit:
  top center, upper right, lower right, bottom right, bottom left,
  lower left, upper left.
- Left nodes 05、06、07 only use reversed rows and retain the flex default
  alignment; the top node uses a vertical layout.

## Behavior

- Start with item 01 active.
- Every 3000ms activate the next item and wrap from 07 to 01.
- Pointer hover or keyboard focus activates that item and pauses the timer.
- Pointer leave or focus out resumes the timer.
- Reduced-motion mode disables timed cycling and removes transitions.

## Mobile

- At `998px`, title returns to document flow and orbit asset is hidden.
- Node list is vertical and centered; each item is static with `15px 0` padding.
- Inactive images collapse to zero height; only the active image is
  `220 × 100px`.
