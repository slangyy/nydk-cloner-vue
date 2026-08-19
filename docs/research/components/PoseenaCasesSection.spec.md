# PoseenaCasesSection Specification

- Target: `src/components/poseena/PoseenaCasesSection.vue`
- Title `Комплексные интерьерные проекты — приглашаем оценить`, centered with
  a compact `24-36px` scale, `1.2` line height and `0.03em` letter spacing;
  the 120×2px accent divider sits 16px below. At `≤998px`, the title is
  `16-18px` with `0.02em` letter spacing.
- Section margin-top 140px and margin-bottom 80px; Swiper margin-top 80px and padding-bottom 60px.
- Three typed slides using `/assets/poseena/case-store.jpg`, `case-hyatt.jpg`, and `case-airport.jpg`.
- Swiper 12 receives three rendered copies of the three typed slides as a manual loop buffer and starts at the first slide of the middle copy. Navigation buttons call the Swiper instance directly. After reaching either buffer boundary, the active index is reset without animation to the equivalent slide in the middle copy. The user-visible content remains three cases, while the initial view always has neighbors on both sides.
- Desktop Swiper: loop, centered, `slidesPerView: 1.8`, `spaceBetween: 140` above 1440 and 100 at/below 1440.
- White slide card, shadow `0 20px 40px rgb(0 0 0 / 6%)`; image ratio 1000/505; caption centered with 30px 20px padding and 28px/600/46.67px typography. At `≤1440px`, caption is 24px/40px.
- Swiper clips at desktop and exposes one centered 1.8-width slide plus both neighbors. Prev/next are 50px circles, 2px #bc9480 border, positioned at 19% and vertically offset by `margin-top:-22px`.
- Mobile (`≤998px`): section width 90%, 40px top margin; one full-width slide, 20px spacing; Swiper overflow becomes visible but retains 60px bottom padding. Caption retains 30px 20px padding and uses 16px/26.67px; navigation circles are 30px and positioned 10px from the edges.
- No autoplay. Image scales 1.02 on desktop hover.
