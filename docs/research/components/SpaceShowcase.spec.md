# SpaceShowcase Specification

## Overview

- Target: `src/components/SpaceShowcase.vue`
- Screenshot: `docs/design-references/nydk-spaces-desktop-1440.png`, `nydk-spaces-mobile.png`
- Interaction model: desktop hover, mobile click

## Content

- 入户空间 / ENTRANCE SPACE
- 会客空间 / VISITOR SPACE
- 餐厨空间 / ENTRANCE SPACE
- 书茶空间 / ENTRANCE SPACE
- 睡眠空间 / VISITOR SPACE
- 衣帽空间 / VISITOR SPACE

## Layout

- Background `#3c312f`.
- Main media container uses padding-top 56% on desktop.
- Main title is absolute at left 5%, top 8%, white, with left-aligned watermark.
- Thumbnail navigation is absolute at the bottom, full width.
- Desktop reference height 804px; mobile reference height about 318px.

## States

- All main images are layered absolute; inactive opacity 0, active opacity 1/z-index 2.
- Transition: opacity 0.8s ease-in/out.
- Desktop >998px switches on mouseenter.
- ≤998px switches on click.
- Active thumbnail has warm taupe pill background; an indicator follows the item width.
- Swiper visible items: 6 desktop, 5 at ≤1366, 4 at ≤1200, 3 at ≤768.
