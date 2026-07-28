# PoseenaStorySection Specification

- Target: `src/components/poseena/PoseenaStorySection.vue`
- Interaction: one-shot reveal; images scale `1.02` on hover in `0.5s`.
- Shared title: #231815, desktop 48px/600, centered; subtitle 36px; 120×2px #bc9480 divider.
- First block: max-width 1440px; 130px top padding; centered description at 78% width, 18px, #777, line-height 2.6; image margin-top 70px.
- Copy: `致敬经典 成为经典`; `致敬贝聿铭大师 / 行走在世界里的东方`; preserve the inspected source text and emphasize `经典/极致/艺术`.
- Image: `/assets/poseena/louvre.png`, natural 1267×321, rendered full content width.
- Second block: `/assets/poseena/pattern-light.jpg` background, -10% overlap, 18% top padding and 130px bottom padding.
- Split layout: text 33%, image 57.91%; text title 48px/700, description 18px/#777/2.6.
- The whole split layout uses one IntersectionObserver. When it enters the viewport, the copy moves from `translateX(-60px)` and the image from `translateX(60px)` to the center while both fade from 0 to 1 over 1s. Mobile uses ±36px. Reduced-motion mode shows both immediately.
- Copy: `意为光芒 成为光芒` and the inspected POSEENA “光的使者” description.
- Image: `/assets/poseena/brand-light.png`, natural 834×366.
- Mobile: titles 20px, subtitle/body 14px; 40px first-block padding; second block stacks centered text above image and uses 40px bottom padding.
