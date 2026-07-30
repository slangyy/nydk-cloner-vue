<script setup lang="ts">
import { ref } from "vue";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

import type { ProductCarouselSlide } from "@/types/products";

import "swiper/css";

const props = defineProps<{
  readonly slides: readonly ProductCarouselSlide[];
  readonly label: string;
}>();

const swiper = ref<SwiperInstance | null>(null);
const reducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setSwiper(instance: SwiperInstance): void {
  swiper.value = instance;
}

function previous(): void {
  swiper.value?.slidePrev();
}

function next(): void {
  swiper.value?.slideNext();
}
</script>

<template>
  <section class="integrated-carousel" :aria-label="label">
    <Swiper
      :modules="[A11y, Autoplay]"
      :slides-per-view="1"
      :loop="props.slides.length > 1"
      :speed="reducedMotion ? 0 : 800"
      :autoplay="
        reducedMotion || props.slides.length < 2
          ? false
          : {
            delay: 3000,
            disableOnInteraction: false,
          }
      "
      @swiper="setSwiper"
    >
      <SwiperSlide v-for="slide in props.slides" :key="slide.id">
        <img
          class="integrated-carousel__image"
          :src="slide.image"
          :alt="slide.imageAlt"
        />
      </SwiperSlide>
    </Swiper>

    <button
      v-if="props.slides.length > 1"
      class="integrated-carousel__button integrated-carousel__button--prev"
      type="button"
      aria-label="上一张"
      @click="previous"
    >
      <span aria-hidden="true">‹</span>
    </button>
    <button
      v-if="props.slides.length > 1"
      class="integrated-carousel__button integrated-carousel__button--next"
      type="button"
      aria-label="下一张"
      @click="next"
    >
      <span aria-hidden="true">›</span>
    </button>
  </section>
</template>

<style scoped>
.integrated-carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #202020;
}

.integrated-carousel__image {
  display: block;
  width: 100%;
  height: auto;
}

.integrated-carousel__button {
  position: absolute;
  z-index: 4;
  top: 50%;
  display: grid;
  width: 50px;
  height: 50px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgb(188 148 128 / 60%);
  color: #fff;
  cursor: pointer;
  font: inherit;
  place-items: center;
  transform: translateY(-50%);
  transition:
    background 0.3s ease,
    transform 0.3s ease;
}

.integrated-carousel__button span {
  display: block;
  font-size: 34px;
  font-weight: 200;
  line-height: 1;
  transform: translateY(-2px);
}

.integrated-carousel__button:hover,
.integrated-carousel__button:focus-visible {
  background: rgb(188 148 128 / 90%);
}

.integrated-carousel__button:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 3px;
}

.integrated-carousel__button--prev {
  left: 35px;
}

.integrated-carousel__button--next {
  right: 35px;
}

@media (max-width: 998px) {
  .integrated-carousel__button {
    width: 30px;
    height: 30px;
  }

  .integrated-carousel__button span {
    font-size: 22px;
  }

  .integrated-carousel__button--prev {
    left: 10px;
  }

  .integrated-carousel__button--next {
    right: 10px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .integrated-carousel__button {
    transition: none;
  }
}
</style>
