# DesignInstituteSection Specification

## Overview

- Target: `src/components/DesignInstituteSection.vue`
- Screenshot: `docs/design-references/nydk-design-institute-desktop-1440.png`, `nydk-design-institute-mobile.png`
- Interaction model: reveal + hover

## Content

- Su Dan / 苏丹
- Wu Bin / 吴斌
- Meng Jian Guo / 孟建国
- Yu Qiang / 于强
- Yao Jun / 姚君
- Brand tile with “查看更多”.

## Layout

- White section with uncapped 88vw centered content. Its title uses the same
  feature variant, global typography, spacing and N watermark asset as
  HomeSystemsSection.
- Desktop: three columns × two rows; reference image tiles approximately 421 × 253px.
- Mobile: two columns × three rows with equal-width cells.
- Brand tile occupies the final cell.

## Behavior

- Section enters with fadeInUp.
- Person image transform-origin at center bottom.
- Card hover scales image to 1.04 over 0.5s.
