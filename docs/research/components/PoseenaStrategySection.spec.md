# PoseenaStrategySection Specification

- Target: `src/components/poseena/PoseenaStrategySection.vue`
- Background: `/assets/poseena/pattern-light.jpg`, centered/cover; top overlaps preceding section by 12%, uses 18% top padding, and has no extra bottom padding.
- The section background remains in normal flow. Its transparent content container owns the reveal transform and `z-index:2`, while the following pursuit section stays at `z-index:1`; the pursuit background can replace the lower texture without covering the three cards.
- Heading: `新中有爱 纵横无边`; subtitle `1+1+6品牌战略`; shared centered title/divider styling.
- Heading typography is 48px/80px plus 36px/60px on large desktop; at `≤1440px` it becomes 38px/63.33px plus 30px/50px.
- Desktop: max-width 1440px; three cards at 31.33% width, 5% padding, white background, shadow `0 20px 30px rgb(191 178 172 / 20%)`.
- Number circle: 140×140, 1px #e9e7e7 border, #bc9480, 72px Arial bold.
- Card title: 30px/600/50px, 30px top margin; 60×4px accent with 20px/30px vertical margins; description 16px/#231815, line-height 36px.
- At `≤1440px`, cards use 3% container-relative padding; circle 110px/55px; title 26px/43.33px with 20px top margin; divider margins become 10px/20px; body line-height is 32px.
- Hover: fade `/assets/poseena/strategy-hover.jpg` over the card in 0.3s; title/body/underline become white; numbered circle receives white background.
- Mobile: cards stack full width with 20px padding/gap; number circle 80px/40px font; title 18px/30px; body 14px/1.8.
