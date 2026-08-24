# SpaceShowcase Specification

## Overview

- **Target files:** `src/components/SpaceShowcase.vue`, `src/components/SpaceGalleryDialog.vue`
- **Interaction model:** pointer hover/focus/click for space switching; button-triggered modal carousel; swipe and keyboard navigation
- **Content source:** `src/data/spaces.ts` generated from the supplied POSEENA electronic catalog

## Content and order

1. 入户空间 / Прихожая зона
2. 会客空间 / Гостиная зона
3. 餐厨空间 / Кухня-столовая
4. 睡眠空间 / Спальная зона
5. 衣帽空间 / Гардеробная зона
6. 书茶空间 / Кабинет и чайная зона
7. 卫浴空间 / Ванная зона
8. 阳台空间 / Балконная зона
9. 康乐空间 / Зона отдыха
10. 典藏空间 / Коллекционная зона

POSEENA images appear first. 砚山 and 磐石 images are appended to 会客、餐厨、睡眠、书茶 and retain a visible series label.

## Showcase layout

- Maintain the existing `1.77 / 1` desktop aspect ratio and the existing dark gradient overlays.
- Main image transition: opacity, `0.8s ease-in-out`.
- Heading retains the original hierarchy and typography: Russian title, white rule, Chinese title, circular warm-brown gallery button.
- Both the active main image and the circular plus button open the same space gallery.
- Navigation shows 6 items above 998px, 4 items from 521–998px, and 3 items at 520px and below.
- Navigation is one native horizontally scrollable row with slim arrows matching `/home_decoration_p5`. Arrow, click, and focus selection loops and centers the active item; touch devices use native horizontal swiping.
- Active navigation item uses a `rgb(188 148 128 / 58%)` pill.

## Gallery dialog

- Native full-viewport `<dialog>` teleported to `body` with dark backdrop and body scroll lock.
- Header contains Chinese/Russian space names, source-series label, counter, image-only fullscreen control, and close button.
- Stage uses `object-fit: contain`; only the active full-resolution image is rendered and adjacent images are preloaded.
- Bottom thumbnails use separate 360×220 WebP files and auto-scroll the active item into view.
- Previous/next wraps, with ArrowLeft, ArrowRight, Escape, backdrop/stage click, and horizontal swipe support.
- Closing restores the previous body overflow and focus to whichever main-image/plus trigger opened the gallery.

## Configurable image hotspots

- A main `SpaceGalleryImage` can declare one or more `children` entries in `src/data/spaces.ts`.
- Each child config contains a percentage `position`, visible `label`, `carousel | grid` layout, and nested detail images.
- Nested detail images are excluded from the main counter and thumbnail rail. The entrance gallery therefore shows five main images; its last image opens original images 5 and 6 from the hotspot at `55% / 68%`.
- Hotspot positions are calculated against the rendered image bounds rather than the dialog stage, so `object-fit: contain`, mobile letterboxing, and fullscreen preserve alignment.
- Carousel details wrap and support thumbnails, keyboard arrows, Escape, swipe, and focus return. Grid details use desktop columns and a single mobile column.

## Responsive and motion

- At `≤998px`, compact the header, controls, and thumbnails while respecting `env(safe-area-inset-bottom)`.
- At `≤520px`, keep the Russian title on one truncated line and reduce controls to 36–40px.
- Under `prefers-reduced-motion: reduce`, remove image entrance animation and all gallery/rail transitions.

## Assets

- Full images: `public/assets/spaces/<space>/full/`
- Thumbnails: `public/assets/spaces/<space>/thumbs/`
- Icons: `public/assets/spaces/icons/`
- Extraction audit: `docs/research/space-catalog-assets.json`
