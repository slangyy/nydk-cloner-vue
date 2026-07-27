# NewsSection Specification

## Overview

- Target: `src/components/NewsSection.vue`
- Screenshot: `docs/design-references/nydk-news-desktop-1440.png`, `nydk-news-mobile.png`
- Interaction model: reveal + hover

## Content

1. 07.10 - 2026 — 领见生活 格调进阶
2. 06.30 - 2026 — 领见生活 再续回响
3. 06.09 - 2026 — 世界斯诺克冠军吴宜泽正式出任南洋迪克全球形象代言人
4. 05.28 - 2026 — 一境入宋 万象归一

Use verbatim excerpts and local images from the extraction manifest.

## Layout

- White section, desktop padding 5% 0 8%.
- Desktop: four 23%-wide columns with staggered image vertical positions.
- Mobile: two columns; title and excerpt clamp to two lines.
- Image container uses padding-top 56% and hidden overflow.

## Behavior

- Image hover scale 1.05 in 0.5s.
- More button: rounded 100px, `#d3d1d0` border, 7px × 55px padding.
- Hover fills from opposite corners with `#bc9480` in 0.6s and changes text to white.
