# FinishedSpaceShowcase Specification

## Overview

- **Target:** `src/components/products/FinishedSpaceShowcase.vue`
- **Screenshot:** `docs/design-references/original-finished-space-gallery.png`
- **Interaction model:** desktop hover/focus-driven space switching, with click/tap
  fallback on touch devices.

## DOM Structure

1. Full-width dark showcase.
2. Stacked space hero images; only current image is visible.
3. Centered English and Chinese space title over the image. There is no plus
   button below the title.
4. Bottom thumbnail/navigation rail with previous and next controls.
5. Optional detail viewer using the current space's `detailImages`.

## Computed Styles

### Main stage

- Desktop aspect ratio: 1920 / 1080.
- Background: `#3c312f`.
- Main image: absolute inset 0, width/height 100%, object-fit cover.
- State change: opacity transition 0.8s ease-in.
- Dark overlay: approximately `rgba(20, 12, 9, 0.45)`.

### Center title

- Vertically centered.
- English: Bank font, 48px, white.
- Chinese: 36px, white, margin-top 12px.
- Text centered.

### Bottom rail

- Absolute left/right 0, bottom 5%, z-index 5.
- Display flex; previous/next controls sit at the far left and right edges.
- At the inspected desktop viewport, rail height is 128px.
- Six items visible where space count allows.
- Active highlight: one absolute pill-shaped moving block,
  `rgba(188,148,128,.4)`, transition
  `transform 0.7s cubic-bezier(0.22,0.61,0.36,1)`.
- Each item: centered icon + Chinese label, white at active and muted white
  otherwise.
- Previous/next controls use the same slim SVG chevron language as the homepage:
  transparent background, no circular outline, rosewood-colored line, and a
  slightly brighter hover state.

## State Behavior

- On desktop, hovering or keyboard-focusing a space immediately cross-fades the
  main image and smoothly moves the shared active rail block.
- Click remains available for touch devices and accessibility, but is not the
  primary desktop interaction.
- Previous/next moves through spaces and wraps at both ends.
- Space navigation does not open an image viewer and the centered title has no
  detail button.

## Responsive Behavior

- <=998px: stage minimum height 560px, rail becomes horizontal scroll, controls
  remain slim edge chevrons, titles reduce to 24px / 20px, and tap switches the
  active space.
- <=520px: stage height approximately 520px and title stays clear of the rail.
- Reduced motion removes cross-fade and moving-highlight animation.
