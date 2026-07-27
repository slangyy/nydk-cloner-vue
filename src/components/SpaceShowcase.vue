<script setup lang="ts">
import { ref, type ComponentPublicInstance } from "vue";
import { RouterLink } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

import { useReveal } from "@/composables/useReveal";
import { spaceSlides } from "@/data/home";
import SectionTitle from "@/components/SectionTitle.vue";

const activeIndex = ref(0);
const { target, isVisible } = useReveal();

const selectSlide = (index: number): void => {
  activeIndex.value = index;
};

const setRevealTarget = (element: Element | ComponentPublicInstance | null): void => {
  target.value = element instanceof HTMLElement ? element : null;
};
</script>

<template>
  <section
    :ref="setRevealTarget"
    class="space-showcase reveal"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="space-showcase-title"
  >
    <div class="space-showcase__media">
      <RouterLink
        v-for="(slide, index) in spaceSlides"
        :key="slide.id"
        :to="slide.href"
        class="space-showcase__layer"
        :class="{ 'is-active': activeIndex === index }"
        :aria-hidden="activeIndex !== index"
        :tabindex="activeIndex === index ? 0 : -1"
      >
        <img
          :src="slide.image"
          :alt="slide.title"
          width="1920"
          height="1080"
          :loading="index === 0 ? 'eager' : 'lazy'"
        />
      </RouterLink>
    </div>

    <div id="space-showcase-title" class="space-showcase__heading">
      <SectionTitle
        english="SPACE TO SHOW"
        chinese="空间展示"
        theme="dark"
        align="left"
      />
    </div>

    <div class="space-showcase__navigation">
      <Swiper
        class="space-showcase__swiper"
        :slides-per-view="3"
        :breakpoints="{
          768: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
          1366: { slidesPerView: 5 },
          1440: { slidesPerView: 6 },
        }"
        :watch-slides-progress="true"
      >
        <SwiperSlide v-for="(slide, index) in spaceSlides" :key="slide.id">
          <button
            type="button"
            class="space-showcase__tab"
            :class="{ 'is-active': activeIndex === index }"
            :aria-label="`切换至${slide.title}`"
            :aria-pressed="activeIndex === index"
            @mouseenter="selectSlide(index)"
            @focus="selectSlide(index)"
            @click="selectSlide(index)"
          >
            <span class="space-showcase__tab-english bank">{{ slide.english }}</span>
            <span class="space-showcase__tab-title">{{ slide.title }}</span>
          </button>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<style scoped>
.space-showcase {
  position: relative;
  width: 100%;
  aspect-ratio: 1.77 / 1;
  overflow: hidden;
  background: var(--nydk-brown);
  color: #fff;
}

.space-showcase__media,
.space-showcase__layer {
  position: absolute;
  inset: 0;
}

.space-showcase__layer {
  z-index: 1;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.8s ease-in-out;
}

.space-showcase__layer.is-active {
  z-index: 2;
  opacity: 1;
  pointer-events: auto;
}

.space-showcase__layer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.space-showcase::after {
  position: absolute;
  z-index: 3;
  inset: 0;
  background:
    linear-gradient(90deg, rgb(35 24 21 / 28%) 0%, transparent 44%),
    linear-gradient(0deg, rgb(35 24 21 / 52%) 0%, transparent 32%);
  content: "";
  pointer-events: none;
}

.space-showcase__heading {
  position: absolute;
  z-index: 4;
  top: 8%;
  left: 6%;
  width: min(410px, 34vw);
}

.space-showcase__heading :deep(.section-title) {
  min-height: 0;
  overflow: visible;
  padding: 0;
}

.space-showcase__heading :deep(.section-title__watermark) {
  left: -4px;
}

.space-showcase__navigation {
  position: absolute;
  z-index: 5;
  right: 6%;
  bottom: 40px;
  left: 6%;
  height: 99px;
}

.space-showcase__swiper {
  width: 100%;
  height: 100%;
}

.space-showcase__tab {
  position: relative;
  display: flex;
  width: calc(100% - 8px);
  height: 100%;
  margin-inline: 4px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 22%);
  background: rgb(35 24 21 / 26%);
  color: rgb(255 255 255 / 72%);
  cursor: pointer;
  transition:
    color 0.45s ease,
    background-color 0.45s ease,
    border-color 0.45s ease;
}

.space-showcase__tab::after {
  position: absolute;
  right: 18%;
  bottom: 0;
  left: 18%;
  height: 2px;
  background: #fff;
  content: "";
  opacity: 0;
  transform: scaleX(0);
  transition:
    opacity 0.45s ease,
    transform 0.45s ease;
}

.space-showcase__tab:hover,
.space-showcase__tab:focus-visible,
.space-showcase__tab.is-active {
  border-color: rgb(255 255 255 / 48%);
  background: rgb(188 148 128 / 74%);
  color: #fff;
  outline: none;
}

.space-showcase__tab.is-active::after {
  opacity: 1;
  transform: scaleX(1);
}

.space-showcase__tab-english {
  font-size: clamp(13px, 1.05vw, 17px);
  line-height: 1;
  letter-spacing: 0.035em;
  white-space: nowrap;
}

.space-showcase__tab-title {
  margin-top: 11px;
  font-size: 15px;
  line-height: 1;
  letter-spacing: 0.22em;
  text-indent: 0.22em;
  white-space: nowrap;
}

@media (max-width: 998px) {
  .space-showcase {
    min-height: 318px;
    aspect-ratio: auto;
  }

  .space-showcase__media {
    height: 100%;
  }

  .space-showcase__heading {
    top: 24px;
    left: 5%;
    width: 240px;
  }

  .space-showcase__heading :deep(.section-title__watermark) {
    font-size: 68px;
  }

  .space-showcase__heading :deep(.section-title__english) {
    font-size: 16px;
  }

  .space-showcase__heading :deep(.section-title__line) {
    width: 34px;
    margin-block: 8px 7px;
  }

  .space-showcase__heading :deep(.section-title__chinese) {
    font-size: 13px;
  }

  .space-showcase__navigation {
    right: 0;
    bottom: 15px;
    left: 0;
    height: 72px;
  }

  .space-showcase__tab {
    width: calc(100% - 6px);
    margin-inline: 3px;
    background: rgb(35 24 21 / 32%);
  }

  .space-showcase__tab-english {
    font-size: 10px;
  }

  .space-showcase__tab-title {
    margin-top: 8px;
    font-size: 12px;
  }
}

@media (max-width: 520px) {
  .space-showcase__layer img {
    object-position: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .space-showcase__layer,
  .space-showcase__tab,
  .space-showcase__tab::after {
    transition: none;
  }
}
</style>
