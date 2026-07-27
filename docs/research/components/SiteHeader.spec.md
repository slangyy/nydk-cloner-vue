# SiteHeader Specification

## Overview

- Target: `src/components/SiteHeader.vue`
- Screenshot: `docs/design-references/nydk-hero-desktop-1440.png`, `nydk-mobile-menu-open.png`
- Interaction model: scroll + desktop hover/focus + mobile click

## Structure

- Fixed header → centered `.header-inner` → Logo + desktop nav + search + mobile menu button.
- Desktop nav groups: 普西纳/Poseena、联系/Contact、产品/Product、案例/Case、商业/Cooperate、关于/Neodko。
- 产品与关于各有子菜单；移动端以 accordion 呈现。

## Computed Styles

- Header: fixed, top 0, left 0, width 100%, z-index 1000, transition 0.3s.
- Desktop inner: width 88%, margin `25px auto`, flex, space-between, center.
- Desktop Logo: 63 × 60px.
- Desktop navigation height 70px；1440px 下单项约 20px 水平 padding。
- Mobile breakpoint: 998px；header padding 10px 0，Logo 32 × 30px，实际高度约 50–54px。
- Solid state background: `#eeeeee`；transparent state uses white foreground.

## States

- Top/home: transparent, light logo/text.
- Scrolled/up: solid, dark logo/text.
- Scrolling down: translateY(-120px).
- Mobile open: full viewport light menu below header; body scroll locked; hamburger becomes X.
- Accordion open: 45px sub-items with 8% left inset.

## Links

- Internal same-site links are normalized to Vue Router paths.
- Kujiale, ICP and technical-support links remain external.
- Search routes to `/globalSearch_1.html`.

## Responsive

- Desktop >998px: horizontal nav and hover submenus.
- Tablet/mobile ≤998px: search pill + hamburger; no horizontal nav.
