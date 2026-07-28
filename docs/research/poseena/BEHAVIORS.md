# ExtremeSystem Behaviors

- Header: transparent white navigation over the hero at the top; the local shared header keeps its existing down-scroll hide/up-scroll solid behavior.
- Reveal: headings, copy and images animate once when entering the viewport. Use the existing `useReveal` observer and honor reduced motion.
- Story, pursuit and product images: scale from `1` to `1.02` over `0.5s` on desktop hover.
- Mentors: desktop hover makes the active card `66.6%` wide while the other remains `32%`; text opacity changes to `1` over `1s`. Mobile removes the state change and stacks both full-width.
- Strategy cards: desktop hover fades in `strategy-hover.jpg`, changes copy to white, and makes the numbered circle white. Mobile keeps the cards readable without requiring hover.
- Cases: looped, centered Swiper; desktop `slidesPerView: 1.8`, `spaceBetween: 100–140`; at `998px` use one slide and `20px` spacing. No autoplay.
- Breakpoints: the target’s structural breakpoint is `998px`; intermediate sizing also changes at `1440px`.

