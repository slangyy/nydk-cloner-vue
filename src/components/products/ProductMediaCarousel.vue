<script setup lang="ts">
import { ref } from "vue";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import type { Swiper as SwiperInstance } from "swiper";

import type { ProductCarouselSlide } from "@/types/products";

import "swiper/css";

const props = withDefaults(
  defineProps<{
    readonly slides: readonly ProductCarouselSlide[];
    readonly label: string;
    readonly loop?: boolean;
    readonly imageFit?: "cover" | "contain";
  }>(),
  {
    loop: true,
    imageFit: "cover",
  },
);

const swiper = ref<SwiperInstance | null>(null);

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
  <div class="product-carousel" :aria-label="label">
    <Swiper
      :modules="[A11y]"
      :loop="loop && props.slides.length > 1"
      :speed="800"
      :slides-per-view="1"
      @swiper="setSwiper"
    >
      <SwiperSlide v-for="slide in props.slides" :key="slide.id">
        <figure class="product-carousel__slide">
          <img
            class="product-carousel__image"
            :class="`product-carousel__image--${imageFit}`"
            :src="slide.image"
            :alt="slide.imageAlt"
          />
          <figcaption
            v-if="slide.title || slide.description"
            class="product-carousel__caption"
          >
            <strong v-if="slide.title">{{ slide.title }}</strong>
            <span v-if="slide.description">{{ slide.description }}</span>
          </figcaption>
        </figure>
      </SwiperSlide>
    </Swiper>

    <button
      v-if="props.slides.length > 1"
      class="product-carousel__button product-carousel__button--prev"
      type="button"
      aria-label="上一张"
      @click="previous"
    >
      ‹
    </button>
    <button
      v-if="props.slides.length > 1"
      class="product-carousel__button product-carousel__button--next"
      type="button"
      aria-label="下一张"
      @click="next"
    >
      ›
    </button>
  </div>
</template>

<style scoped>
.product-carousel {
  position: relative;
  width: 100%;
}

.product-carousel__slide {
  position: relative;
  width: 100%;
  margin: 0;
}

.product-carousel__image {
  display: block;
  width: 100%;
  height: 100%;
}

.product-carousel__image--cover {
  object-fit: cover;
}

.product-carousel__image--contain {
  object-fit: contain;
}

.product-carousel__caption {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  gap: 6px;
  padding: 24px 30px;
  background: linear-gradient(0deg, rgb(24 17 14 / 78%), transparent);
  color: #fff;
}

.product-carousel__button {
  position: absolute;
  z-index: 4;
  top: 50%;
  display: grid;
  width: 48px;
  height: 48px;
  padding: 0;
  border: 1px solid #c49a86;
  border-radius: 50%;
  background: rgb(255 255 255 / 88%);
  color: #b7836c;
  cursor: pointer;
  font-size: 32px;
  line-height: 1;
  place-items: center;
  transform: translateY(-50%);
  transition:
    background 0.25s ease,
    color 0.25s ease;
}

.product-carousel__button:hover,
.product-carousel__button:focus-visible {
  background: #c49a86;
  color: #fff;
}

.product-carousel__button--prev {
  left: 24px;
}

.product-carousel__button--next {
  right: 24px;
}

@media (max-width: 998px) {
  .product-carousel__button {
    width: 38px;
    height: 38px;
    font-size: 25px;
  }

  .product-carousel__button--prev {
    left: 10px;
  }

  .product-carousel__button--next {
    right: 10px;
  }
}
</style>
