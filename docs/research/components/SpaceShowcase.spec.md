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
- Main media fills the section with a uniform dark veil plus stronger left and
  bottom gradients.
- The active title is placed at about 20% of the image height on the left with
  the supplied local N
  watermark asset, the active slide's English and Chinese labels, a divider and
  a round plus link.
- Bottom navigation uses the six original 100 × 60px line-art icon assets.
- Desktop reference height 804px; mobile reference height about 318px.

## States

- All main images are layered absolute; inactive opacity 0, active opacity 1/z-index 2.
- Transition: opacity 0.8s ease-in/out.
- Desktop >998px switches on mouseenter.
- ≤998px switches on click or keyboard focus.
- A single warm taupe pill moves between items with a 0.7s eased transform.
- Upper-left copy changes for every active image with a short fade/slide.
- Desktop shows six items; narrow screens use a horizontally scrollable track.
