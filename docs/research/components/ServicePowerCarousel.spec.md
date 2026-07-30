# ServicePowerCarousel Specification

## Overview

- Target: `src/components/products/ServicePowerCarousel.vue`
- Interaction model: autoplay + previous/next buttons + touch drag.
- Content: three local service images and their real titles/descriptions.

## Swiper configuration

- `slidesPerView: 1.6`
- `spaceBetween: 120`
- `centeredSlides: true`
- `loop: true`
- `loopAdditionalSlides: 3`
- 三项真实内容各渲染三组，共 9 张循环项，与原站生成的轮播 DOM 一致，
  避免连续点击下一张时出现空白。
- `autoplay: 3000ms`, continuing after interaction
- Breakpoints:
  - `769–1366px`: 1.6 slides, 90px gap.
  - `≤768px`: 1.1 slides, 10px gap.

## Slide

- Image box uses `padding-top: 62%`.
- Image fills the box with `object-fit: cover`.
- Non-active slides receive `rgba(35,24,21,.7)` overlay.
- Active slide removes the overlay.
- Hover image scale: `1.05` in `0.5s`.
- Caption margin-top: `2%`; hidden on inactive slides.
- Title: `30px / 45px`, `#231815`.
- Description: `16px / 24px`, `#aaa`, margin-top `1%`.
- Heart control: `80 × 80px` circle with local heart image.

## Navigation

- Circular buttons sit at 45% height.
- Desktop: 3.125% diameter, left/right 15%, border `#bc9480`.
- Hover fills `#bc9480` and turns the arrow white.
- `≤768px`: 30px diameter, left/right 7%.

## Motion

- Slides automatically move left and loop without a blank edge.
- Reduced-motion mode disables autoplay and image/caption transitions.
