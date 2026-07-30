# CasePosterWall Specification

## Overview

- Target: `src/components/cases/CasePosterWall.vue`
- Reference: user-provided case poster wall screenshot and the existing South Sea Dico design tokens.
- Interaction model: click-driven; a poster button opens the selected case gallery.

## Structure and layout

- Warm off-white section background with centered bilingual heading.
- Desktop uses a three-column masonry-style poster wall, tablet two columns, mobile one column.
- Cards preserve a per-case landscape or portrait poster ratio.
- Each card contains a cover, location/series badge, title, summary, image count and optional tags.
- Whole-card hover lifts the card, scales the image slightly and reveals a “查看图集” affordance.

## Responsive behavior

- Desktop: three columns within the shared 88% / 1264px site container.
- Tablet below 998px: two columns with reduced gaps.
- Mobile below 640px: one column and compact typography.
- Motion is removed under `prefers-reduced-motion`.

## Data

- All content comes from `caseStudies` in `src/data/cases.ts`.
- No search, filters, pagination, view counts, likes or sharing controls.
