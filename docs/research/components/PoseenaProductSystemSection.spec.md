# PoseenaProductSystemSection Specification

- Target: `src/components/poseena/PoseenaProductSystemSection.vue`
- Desktop starts 150px after pursuit; full-width 50/50 split with image first and vertically centered copy.
- Image `/assets/poseena/product-system.jpg`, natural 959×600, covers its half; scale 1.02 on hover over 0.5s.
- Copy has 5% left padding. Localized title
  `Вдохновение без границ — движение по миру` uses a compact `24-36px` scale,
  `1.2` line height and `0.03em` letter spacing.
- Subtitle `Продуктовая система 3+1+1` uses `16-28px`, `1.3` line height and
  `0.02em` letter spacing with a 120×2px #bc9480 divider.
- Description: `3大成品家具 / 1个定制中心 / 1个健美用品`, 18px/600.
- Interaction: one shared IntersectionObserver triggers the image from `translateX(-60px)` and the copy from `translateX(60px)` toward the center over 1s. Mobile uses ±36px; reduced-motion mode shows both immediately.
- Mobile: width 90%, margin-top 40px; title `16-18px`, subtitle `12-13px`;
  copy first and centered, image second with 20px top margin.
