# PoseenaPursuitSection Specification

- Target: `src/components/poseena/PoseenaPursuitSection.vue`
- White section with 21% top padding and -12% overlap against the strategy background.
- Desktop max-width 1440px split: copy 44%, image 50%, vertically centered.
- Localized title `Ломая традиции Бросая вызов обыденности` uses a compact
  `24-36px` scale, `1.2` line height and `0.03em` letter spacing. Subtitle
  `Пять вершин совершенства, определяющих систему идеального домашнего интерьера`
  uses `16-28px`, `1.3` line height and `0.02em` letter spacing with a 120×2px
  accent line.
- Body: 18px/#777/line-height 2.6; emphasize `极致设计 / 极致工艺 / 极致用材 / 极致体系 / 极致应用`.
- Image `/assets/poseena/pursuit.jpg`, natural 721×600; scale 1.02 on hover over 0.5s.
- Interaction: one shared IntersectionObserver triggers the copy from `translateX(-60px)` and the image from `translateX(60px)` toward the center over 1s. Mobile uses ±36px; reduced-motion mode shows both immediately.
- Mobile: stacked centered copy then image, 20px gap; title `16-18px`, subtitle
  `12-13px`, body 14px; divider 60px and centered.
