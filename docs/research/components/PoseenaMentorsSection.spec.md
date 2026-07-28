# PoseenaMentorsSection Specification

- Target: `src/components/poseena/PoseenaMentorsSection.vue`
- Background: `/assets/poseena/pattern-rose.jpg`, centered/cover; title `品牌有依 落地有声` in white with white divider.
- Desktop container: max-width 1440px, 110px top padding; card row margin-top 70px and height 540px.
- Inactive card width 32%; active card 66.6%; transition 0.5s; black background.
- Portrait fixed to 392×540 at the right. Active copy occupies remaining width with 10% left padding and fades to opacity 1 in 1s.
- Mentor data comes from typed props/data: 吴富相 and 李利润, including roles, English line, and two achievement lines.
- Hover/focus changes the active mentor; first mentor is initially active.
- The mentor content container is positioned above the following strategy section while the rose background remains in normal flow. The strategy section keeps its negative margin below the cards, so its light background replaces the lower rose background without covering either black mentor card.
- Mobile (`≤998px`): 40px top padding; both cards full width, auto height, 15px gap; copy is 65%, portrait 35%, all copy visible with 12–16px typography.
