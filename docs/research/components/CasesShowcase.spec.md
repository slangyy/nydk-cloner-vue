# CasesShowcase Specification

## Overview

- Target: `src/components/CasesShowcase.vue`
- Screenshot: `docs/design-references/nydk-cases-desktop-1440.png`, `nydk-cases-mobile.png`
- Interaction model: click-driven

## Content

- Five cases from `original-page-extract.json`, including title, full description, image and detail path.
- First state: 普西纳·源邸一号。

## Layout

- Background `#3c312f`.
- A white 72–100px responsive gap separates this section from the design grid.
- Main image ratio about 16:9, full width.
- Dark gradient overlay remains above media.
- Left title at 6% and around 27% vertical position, using the local N watermark,
  large CASE label, divider and Chinese title.
- Bottom overlay: description panel 36% left, thumbnail controls 64% right.
- The description panel starts at the viewport edge and uses a warm rosewood to
  dark transparent horizontal gradient.
- Mobile: title over image; description becomes full-width block followed by thumbnails.

## States

- Main images layered absolute; active opacity 1/z-index 2 with 0.8s transition.
- Clicking a thumbnail updates image, title/description and active thumbnail.
- Thumbnail base opacity 0.2; hover/active opacity 1; active border 2px `#bc9480`.
- Previous/next buttons scroll the thumbnail viewport only; no autoplay.
- Desktop thumbnail rail is 200px high. Both arrows share a 130px dark control
  panel to the left; active thumbnails are large with a 2px warm border, while
  following thumbnails continue to the right at low opacity.
