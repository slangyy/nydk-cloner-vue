# PoseenaPursuitSection Specification

- Target: `src/components/poseena/PoseenaPursuitSection.vue`
- White section with 21% top padding and -12% overlap against the strategy background.
- Desktop max-width 1440px split: copy 44%, image 50%, vertically centered.
- Title `颠覆传统 对抗平庸`: 48px bold. Subtitle `定义极致系统家居的五个极致追求`: 36px with 120×2px accent line.
- Body: 18px/#777/line-height 2.6; emphasize `极致设计 / 极致工艺 / 极致用材 / 极致体系 / 极致应用`.
- Image `/assets/poseena/pursuit.jpg`, natural 721×600; scale 1.02 on hover over 0.5s.
- Interaction: one shared IntersectionObserver triggers the copy from `translateX(-60px)` and the image from `translateX(60px)` toward the center over 1s. Mobile uses ±36px; reduced-motion mode shows both immediately.
- Mobile: stacked centered copy then image, 20px gap; title 20px, subtitle/body 14px; divider 60px and centered.
