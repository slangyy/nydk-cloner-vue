<script setup lang="ts">
import { computed, ref } from "vue";
import { A11y, Autoplay } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import SectionTitle from "@/components/SectionTitle.vue";
import ProductReveal from "@/components/products/ProductReveal.vue";
import type { ProductCarouselSlide } from "@/types/products";

import "swiper/css";

const props = defineProps<{
  readonly slides: readonly ProductCarouselSlide[];
}>();

const swiper = ref<SwiperInstance | null>(null);
const reducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const breakpoints = {
  0: {
    slidesPerView: 1.1,
    spaceBetween: 10,
  },
  769: {
    slidesPerView: 1.6,
    spaceBetween: 90,
  },
  1367: {
    slidesPerView: 1.6,
    spaceBetween: 120,
  },
};

const loopSlides = computed(() => {
  const copyCount = props.slides.length > 1 ? 3 : 1;

  return Array.from({ length: copyCount }, (_, copyIndex) =>
    props.slides.map((slide) => ({
      key: `${copyIndex}-${slide.id}`,
      slide,
    })),
  ).flat();
});

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
  <section class="service-power">
    <div class="service-power__title">
      <ProductReveal>
        <SectionTitle
          english="SERVICE POWER"
          chinese="服务力"
          watermark-image="/assets/backgrounds/109cddbb-f0ab-4d85-b117-906b3cd928a9.png"
        />
      </ProductReveal>
    </div>

    <ProductReveal class="service-power__reveal">
      <div class="service-power-carousel" aria-label="南洋迪克服务力">
        <Swiper
          :modules="[A11y, Autoplay]"
          :slides-per-view="1.6"
          :space-between="120"
          :centered-slides="true"
          :loop="loopSlides.length > 1"
          :loop-additional-slides="3"
          :initial-slide="props.slides.length"
          :speed="300"
          :breakpoints="breakpoints"
          :autoplay="
            reducedMotion
              ? false
              : {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
          "
          @swiper="setSwiper"
        >
          <SwiperSlide
            v-for="item in loopSlides"
            :key="item.key"
            :data-service-id="item.slide.id"
          >
            <article class="service-power-slide">
              <div class="service-power-slide__image">
                <img :src="item.slide.image" :alt="item.slide.imageAlt" />
              </div>

              <div class="service-power-slide__caption">
                <div class="service-power-slide__copy">
                  <h3>{{ item.slide.title }}</h3>
                  <p>{{ item.slide.description }}</p>
                </div>
                <span class="service-power-slide__heart" aria-hidden="true">
                  <img
                    src="/assets/products/service/1fdfe489-2382-4558-9a23-93ac3b5d3c5b.png"
                    alt=""
                  />
                </span>
              </div>
            </article>
          </SwiperSlide>
        </Swiper>

        <button
          class="service-power-carousel__button service-power-carousel__button--prev"
          type="button"
          aria-label="上一个服务"
          @click="previous"
        >
          <svg viewBox="0 0 1024 1024" aria-hidden="true">
            <path
              d="M256 533.333a21.267 21.267 0 0 0 6.247 15.087l426.666 426.667a21.333 21.333 0 0 0 30.174-30.174L307.5 533.333l411.587-411.58a21.333 21.333 0 1 0-30.174-30.173L262.247 518.247A21.267 21.267 0 0 0 256 533.333Z"
            />
          </svg>
        </button>
        <button
          class="service-power-carousel__button service-power-carousel__button--next"
          type="button"
          aria-label="下一个服务"
          @click="next"
        >
          <svg viewBox="0 0 1024 1024" aria-hidden="true">
            <path
              d="M768 533.333a21.267 21.267 0 0 1-6.247 15.087L335.087 975.087a21.333 21.333 0 0 1-30.174-30.174L716.5 533.333l-411.587-411.58a21.333 21.333 0 0 1 30.174-30.173l426.666 426.667A21.267 21.267 0 0 1 768 533.333Z"
            />
          </svg>
        </button>
      </div>
    </ProductReveal>
  </section>
</template>

<style scoped>
.service-power {
  margin-top: 8vw;
  background: #fff;
}

.service-power__title {
  width: min(80%, 1440px);
  margin: 0 auto;
}

.service-power__reveal {
  margin-top: 2vw;
}

.service-power-carousel {
  position: relative;
  width: 100%;
}

.service-power-carousel :deep(.swiper) {
  width: 100%;
  overflow: hidden;
}

.service-power-carousel :deep(.swiper-wrapper) {
  align-items: stretch;
}

.service-power-carousel :deep(.swiper-slide) {
  height: auto;
}

.service-power-slide {
  width: 100%;
}

.service-power-slide__image {
  position: relative;
  height: auto;
  overflow: hidden;
  padding-top: 62%;
}

.service-power-slide__image::after {
  position: absolute;
  z-index: 1;
  inset: 0;
  background: rgb(35 24 21 / 70%);
  content: "";
  transition: opacity 0.5s ease;
}

.service-power-slide__image img {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
  transform: translate(-50%, -50%);
  transition: transform 0.5s ease;
}

.service-power-slide:hover .service-power-slide__image img {
  transform: translate(-50%, -50%) scale(1.05);
}

.service-power-carousel
  :deep(.swiper-slide-active)
  .service-power-slide__image::after {
  opacity: 0;
  pointer-events: none;
}

.service-power-slide__caption {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-top: 2%;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.service-power-carousel
  :deep(.swiper-slide-active)
  .service-power-slide__caption {
  opacity: 1;
}

.service-power-slide__copy {
  width: calc(100% - 80px);
}

.service-power-slide__copy h3,
.service-power-slide__copy p {
  margin: 0;
  font-weight: 400;
}

.service-power-slide__copy h3 {
  color: #231815;
  font-size: 30px;
  line-height: 45px;
}

.service-power-slide__copy p {
  margin-top: 1%;
  color: #aaa;
  font-size: 16px;
  line-height: 24px;
}

.service-power-slide__heart {
  display: flex;
  width: 80px;
  height: 80px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid #d3d1d0;
  border-radius: 50%;
}

.service-power-slide__heart img {
  display: block;
  width: 37px;
  height: auto;
}

.service-power-carousel__button {
  position: absolute;
  z-index: 4;
  top: 45%;
  display: grid;
  width: 3.125%;
  aspect-ratio: 1;
  padding: 0;
  overflow: hidden;
  border: 1px solid #bc9480;
  border-radius: 50%;
  background: rgb(255 255 255 / 90%);
  cursor: pointer;
  place-items: center;
  transform: translateY(-50%);
  transition: background-color 0.3s ease;
}

.service-power-carousel__button svg {
  width: 50%;
  height: auto;
}

.service-power-carousel__button path {
  fill: #bc9480;
  transition: fill 0.3s ease;
}

.service-power-carousel__button:hover,
.service-power-carousel__button:focus-visible {
  background: #bc9480;
}

.service-power-carousel__button:hover path,
.service-power-carousel__button:focus-visible path {
  fill: #fff;
}

.service-power-carousel__button--prev {
  left: 15%;
}

.service-power-carousel__button--next {
  right: 15%;
}

@media (max-width: 1366px) {
  .service-power-carousel__button {
    width: 4%;
  }

  .service-power-slide__copy {
    width: calc(100% - 60px);
  }

  .service-power-slide__heart {
    width: 60px;
    height: 60px;
  }

  .service-power-slide__heart img {
    width: 26px;
  }
}

@media (max-width: 998px) {
  .service-power__title {
    width: 90%;
  }

  .service-power__reveal {
    margin-top: 20px;
  }

  .service-power-slide__copy h3 {
    font-size: 22px;
    line-height: 1.5;
  }

  .service-power-slide__copy p {
    font-size: 14px;
    line-height: 1.6;
  }
}

@media (max-width: 768px) {
  .service-power-carousel__button {
    width: 30px;
  }

  .service-power-carousel__button--prev {
    left: 7%;
  }

  .service-power-carousel__button--next {
    right: 7%;
  }

  .service-power-slide__caption {
    align-items: flex-start;
  }

  .service-power-slide__copy {
    width: calc(100% - 48px);
  }

  .service-power-slide__heart {
    width: 44px;
    height: 44px;
  }

  .service-power-slide__heart img {
    width: 22px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .service-power-slide__image::after,
  .service-power-slide__image img,
  .service-power-slide__caption,
  .service-power-carousel__button,
  .service-power-carousel__button path {
    transition: none;
  }

  .service-power-slide:hover .service-power-slide__image img {
    transform: translate(-50%, -50%);
  }
}
</style>
