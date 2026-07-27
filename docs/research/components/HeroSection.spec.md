# HeroSection Specification

## Overview

- Target: `src/components/HeroSection.vue`
- Screenshot: `docs/design-references/nydk-hero-desktop-1440.png`, `nydk-hero-mobile.png`
- Interaction model: time-driven video

## Structure

- Section → video layer → single pagination dot.
- Source: `/assets/video/36304d3c-8931-47bd-996e-e6d8721206da.mp4`.
- Poster: matching local video poster from `/assets/backgrounds/`.

## Computed Styles

- Desktop: width 100%, height 100vh (900px at reference), overflow hidden.
- Video: absolute inset 0, width/height 100%, object-fit cover.
- Mobile/tablet ≤998px: height 200px.
- Pagination dot: white circle, approximately 14px desktop and 9px mobile, centered near bottom.

## Behavior

- `muted autoplay loop playsinline`, graceful poster fallback.
- No controls and no extra logical slides.
- Reduced-motion mode keeps the poster/first frame visible.
