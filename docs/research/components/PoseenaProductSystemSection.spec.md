# PoseenaProductSystemSection Specification

- Target: `src/components/poseena/PoseenaProductSystemSection.vue`
- Desktop starts 150px after pursuit; full-width 50/50 split with image first and vertically centered copy.
- Image `/assets/poseena/product-system.jpg`, natural 959×600, covers its half; scale 1.02 on hover over 0.5s.
- Copy has 5% left padding. Title `穿越灵感 行走世界` is 48px bold.
- Subtitle `3+1+1产品系统` is 36px with a 120×2px #bc9480 divider.
- Description: `3大成品家具 / 1个定制中心 / 1个健美用品`, 18px/600.
- Interaction: one shared IntersectionObserver triggers the image from `translateX(-60px)` and the copy from `translateX(60px)` toward the center over 1s. Mobile uses ±36px; reduced-motion mode shows both immediately.
- Mobile: width 90%, margin-top 40px; copy first and centered, image second with 20px top margin.
