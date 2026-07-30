<script setup lang="ts">
import { computed, ref, type ComponentPublicInstance } from "vue";
import { RouterLink } from "vue-router";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

import SectionTitle from "@/components/SectionTitle.vue";
import { useReveal } from "@/composables/useReveal";
import { caseStudies } from "@/data/cases";
import type { CaseStudy } from "@/types/content";

const activeIndex = ref(0);
const swiperInstance = ref<SwiperInstance | null>(null);
const { target, isVisible } = useReveal();

const activeCase = computed<CaseStudy>(
  () => caseStudies[activeIndex.value] ?? caseStudies[0]!,
);

const selectCase = (index: number): void => {
  activeIndex.value = index;
};

const setSwiper = (swiper: SwiperInstance): void => {
  swiperInstance.value = swiper;
};

const scrollPrevious = (): void => {
  swiperInstance.value?.slidePrev();
};

const scrollNext = (): void => {
  swiperInstance.value?.slideNext();
};

const setRevealTarget = (element: Element | ComponentPublicInstance | null): void => {
  target.value = element instanceof HTMLElement ? element : null;
};
</script>

<template>
  <section
    :ref="setRevealTarget"
    class="cases-showcase reveal"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="cases-showcase-title"
  >
    <div class="cases-showcase__media">
      <img
        v-for="(item, index) in caseStudies"
        :key="item.id"
        class="cases-showcase__image"
        :class="{ 'is-active': activeIndex === index }"
        :src="item.cover.src"
        :alt="item.cover.alt"
        width="1920"
        height="1080"
        :loading="index === 0 ? 'eager' : 'lazy'"
        :aria-hidden="activeIndex !== index"
      />
      <div class="cases-showcase__shade" aria-hidden="true"></div>
    </div>

    <div id="cases-showcase-title" class="cases-showcase__heading">
      <SectionTitle
        english="CASE"
        chinese="案例"
        theme="dark"
        align="left"
        watermark-image="/assets/backgrounds/109cddbb-f0ab-4d85-b117-906b3cd928a9.png"
      />
    </div>

    <div class="cases-showcase__controls">
      <article class="cases-showcase__copy" aria-live="polite">
        <h3>{{ activeCase.title }}</h3>
        <p>{{ activeCase.summary }}</p>
        <RouterLink class="cases-showcase__detail" to="/cases">
          查看详情 <span aria-hidden="true">＋</span>
        </RouterLink>
      </article>

      <div class="cases-showcase__rail">
        <button
          type="button"
          class="cases-showcase__arrow"
          aria-label="向前浏览案例缩略图"
          @click="scrollPrevious"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m15 5-7 7 7 7" />
          </svg>
        </button>

        <Swiper
          class="cases-showcase__swiper"
          :slides-per-view="2.35"
          :space-between="10"
          :breakpoints="{
            640: { slidesPerView: 3.2, spaceBetween: 12 },
            1000: { slidesPerView: 3.7, spaceBetween: 14 },
          }"
          :watch-slides-progress="true"
          @swiper="setSwiper"
        >
          <SwiperSlide v-for="(item, index) in caseStudies" :key="item.id">
            <button
              type="button"
              class="cases-showcase__thumb"
              :class="{ 'is-active': activeIndex === index }"
              :aria-label="`查看案例：${item.title}`"
              :aria-pressed="activeIndex === index"
              @click="selectCase(index)"
            >
              <img
                :src="item.cover.src"
                :alt="item.cover.alt"
                width="320"
                height="180"
                loading="lazy"
              />
            </button>
          </SwiperSlide>
        </Swiper>

        <button
          type="button"
          class="cases-showcase__arrow"
          aria-label="向后浏览案例缩略图"
          @click="scrollNext"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cases-showcase {
  position: relative;
  width: 100%;
  aspect-ratio: 1.77 / 1;
  margin-top: clamp(72px, 5vw, 100px);
  overflow: hidden;
  background: var(--nydk-brown);
  color: #fff;
}

.cases-showcase__media,
.cases-showcase__image,
.cases-showcase__shade {
  position: absolute;
  inset: 0;
}

.cases-showcase__image {
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.8s ease-in-out;
}

.cases-showcase__image.is-active {
  z-index: 2;
  opacity: 1;
}

.cases-showcase__shade {
  z-index: 3;
  background:
    linear-gradient(90deg, rgb(35 24 21 / 76%) 0%, rgb(35 24 21 / 32%) 32%, transparent 64%),
    linear-gradient(0deg, rgb(35 24 21 / 82%) 0%, transparent 48%);
  pointer-events: none;
}

.cases-showcase__heading {
  position: absolute;
  z-index: 4;
  top: 27%;
  left: 6%;
  width: min(390px, 30vw);
}

.cases-showcase__heading :deep(.section-title) {
  min-height: 0;
  overflow: visible;
  padding: 0;
}

.cases-showcase__heading :deep(.section-title__watermark--image) {
  left: -4px;
  width: clamp(150px, 10.5vw, 210px);
  height: auto;
  opacity: 0.82;
  transform: translateY(-50%);
}

.cases-showcase__heading :deep(.section-title__english) {
  font-size: clamp(24px, 2vw, 38px);
  letter-spacing: 0.12em;
}

.cases-showcase__heading :deep(.section-title__line) {
  width: clamp(46px, 3.2vw, 64px);
  height: 3px;
  margin-block: 15px 13px;
}

.cases-showcase__heading :deep(.section-title__chinese) {
  font-size: clamp(24px, 1.8vw, 34px);
  letter-spacing: 0.14em;
  text-indent: 0.14em;
}

.cases-showcase__controls {
  position: absolute;
  z-index: 5;
  right: 6%;
  bottom: 40px;
  left: 0;
  display: grid;
  height: 200px;
  grid-template-columns: 38% 62%;
  align-items: end;
}

.cases-showcase__copy {
  display: flex;
  width: 100%;
  min-height: 200px;
  max-width: none;
  flex-direction: column;
  justify-content: center;
  padding: 24px 12% 24px 16%;
  background: linear-gradient(
    90deg,
    rgb(188 148 128 / 72%) 0%,
    rgb(75 50 41 / 84%) 62%,
    rgb(35 24 21 / 28%) 100%
  );
}

.cases-showcase__copy h3 {
  margin: 0 0 13px;
  font-size: clamp(20px, 1.65vw, 25px);
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: 0.08em;
}

.cases-showcase__copy p {
  display: -webkit-box;
  overflow: hidden;
  margin: 0;
  font-size: clamp(13px, 0.9vw, 16px);
  line-height: 1.9;
  opacity: 0.82;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.cases-showcase__detail {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  font-size: 13px;
  letter-spacing: 0.12em;
  transition: color 0.3s ease;
}

.cases-showcase__detail span {
  font-size: 17px;
  transition: transform 0.3s ease;
}

.cases-showcase__detail:hover,
.cases-showcase__detail:focus-visible {
  color: var(--nydk-rosewood);
  outline: none;
}

.cases-showcase__detail:hover span,
.cases-showcase__detail:focus-visible span {
  transform: rotate(90deg);
}

.cases-showcase__rail {
  display: grid;
  min-width: 0;
  grid-template-columns: 38px minmax(0, 1fr) 38px;
  align-items: center;
  gap: 12px;
}

.cases-showcase__swiper {
  width: 100%;
  min-width: 0;
}

.cases-showcase__thumb {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  padding: 0;
  border: 2px solid transparent;
  background: #231815;
  cursor: pointer;
  opacity: 0.28;
  transition:
    opacity 0.35s ease,
    border-color 0.35s ease;
}

.cases-showcase__thumb:hover,
.cases-showcase__thumb:focus-visible,
.cases-showcase__thumb.is-active {
  border-color: var(--nydk-rosewood);
  opacity: 1;
  outline: none;
}

.cases-showcase__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s ease;
}

.cases-showcase__thumb:hover img,
.cases-showcase__thumb:focus-visible img {
  transform: scale(1.04);
}

.cases-showcase__arrow {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  padding: 0;
  border: 1px solid rgb(255 255 255 / 42%);
  background: rgb(35 24 21 / 28%);
  color: #fff;
  cursor: pointer;
  transition:
    color 0.3s ease,
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.cases-showcase__arrow svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.4;
}

.cases-showcase__arrow:hover,
.cases-showcase__arrow:focus-visible {
  border-color: var(--nydk-rosewood);
  background: var(--nydk-rosewood);
  outline: none;
}

@media (max-width: 998px) {
  .cases-showcase {
    display: flex;
    min-height: 443px;
    aspect-ratio: auto;
    flex-direction: column;
    margin-top: 44px;
    overflow: hidden;
  }

  .cases-showcase__media {
    position: relative;
    flex: 0 0 auto;
    width: 100%;
    aspect-ratio: 16 / 9;
  }

  .cases-showcase__shade {
    background:
      linear-gradient(90deg, rgb(35 24 21 / 55%) 0%, transparent 65%),
      linear-gradient(0deg, rgb(35 24 21 / 38%) 0%, transparent 50%);
  }

  .cases-showcase__heading {
    top: 18%;
    left: 5%;
    width: 190px;
  }

  .cases-showcase__heading :deep(.section-title__watermark--image) {
    width: 100px;
  }

  .cases-showcase__heading :deep(.section-title__english) {
    font-size: 16px;
  }

  .cases-showcase__heading :deep(.section-title__line) {
    width: 32px;
    margin-block: 7px 6px;
  }

  .cases-showcase__heading :deep(.section-title__chinese) {
    font-size: 13px;
  }

  .cases-showcase__controls {
    position: relative;
    right: auto;
    bottom: auto;
    left: auto;
    display: flex;
    height: auto;
    flex: 1;
    flex-direction: column;
    align-items: stretch;
  }

  .cases-showcase__copy {
    min-height: 132px;
    max-width: none;
    padding: 16px 5% 12px;
    background:
      linear-gradient(100deg, rgb(188 148 128 / 64%), rgb(35 24 21 / 38%)),
      var(--nydk-brown);
  }

  .cases-showcase__copy h3 {
    margin-bottom: 7px;
    font-size: 16px;
  }

  .cases-showcase__copy p {
    font-size: 11px;
    line-height: 1.65;
    -webkit-line-clamp: 2;
  }

  .cases-showcase__detail {
    gap: 8px;
    margin-top: 8px;
    font-size: 11px;
  }

  .cases-showcase__rail {
    grid-template-columns: 30px minmax(0, 1fr) 30px;
    gap: 7px;
    min-height: 86px;
    padding: 10px 3%;
    background: #302725;
  }

  .cases-showcase__arrow {
    width: 30px;
    height: 30px;
  }

  .cases-showcase__arrow svg {
    width: 15px;
    height: 15px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cases-showcase__image,
  .cases-showcase__detail,
  .cases-showcase__detail span,
  .cases-showcase__thumb,
  .cases-showcase__thumb img,
  .cases-showcase__arrow {
    transition: none;
  }
}
</style>
