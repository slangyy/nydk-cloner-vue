# HomeSystemsSection Specification

## Overview

- Target: `src/components/HomeSystemsSection.vue`
- Screenshot: `docs/design-references/nydk-systems-desktop-1440.png`, `nydk-hero-mobile.png`
- Interaction model: desktop hover, mobile click

## Content

- 设计系统 / Design system
- 生产系统 / Production system
- 工艺系统 / Process system
- 智能系统 / Smart home system
- 成品系统 / Pruduct system
- 材料系统 / Material system
- 整装系统 / Integrated System
- 服务系统 / Service system
- Detail line verbatim: 用户至上，一对一全案专属设计

## Layout

- Section padding: desktop 5% 0.
- Content width: 88%, centered.
- Desktop list: flex wrap, three columns, card width 32.8%, row gap 0.8%.
- 1440px card reference: about 414 × 271px.
- Fifth cell is brand artwork and has no hover detail.
- ≤998px: brand cell removed, two columns, eight equal cards.

## States

- Base card: pale image, centered icon, Chinese title and English subtitle.
- Detail layer: starts width 0, absolute, z-index 5, overflow hidden.
- Desktop mouseenter expands to two-card width in 0.6s; third-column items expand left.
- Detail text moves from translateX(30%) / opacity 0 to neutral / opacity 1.
- Mobile click uses the same expansion; even column expands left; outside click closes.

## Assets

- Use the paired base/detail images and icon backgrounds listed in `original-page-extract.json` and mapped in `public/assets/manifest.json`.
