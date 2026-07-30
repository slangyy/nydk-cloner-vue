<script setup lang="ts">
import { ref } from "vue";
import { A11y, Autoplay } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";

import SectionTitle from "@/components/SectionTitle.vue";
import ProductPageShell from "@/components/products/ProductPageShell.vue";
import ProductReveal from "@/components/products/ProductReveal.vue";
import {
  productionCapabilities,
  productionEquipmentDescription,
  productionEquipmentSlides,
  productionPage,
} from "@/data/products/ops";

import "swiper/css";

const equipmentSwiper = ref<SwiperInstance | null>(null);
const equipmentCycleLength = productionEquipmentSlides.length;
const equipmentInitialSlide = equipmentCycleLength;
const equipmentLoopSlides = Array.from({ length: 3 }, (_, cycleIndex) =>
  productionEquipmentSlides.map((slide) => ({
    ...slide,
    loopKey: `${cycleIndex}-${slide.id}`,
  })),
).flat();

const equipmentBreakpoints = {
  999: {
    slidesPerView: 2,
  },
} as const;

function registerEquipmentSwiper(swiper: SwiperInstance) {
  equipmentSwiper.value = swiper;
}

function showPreviousEquipment() {
  equipmentSwiper.value?.slidePrev();
}

function showNextEquipment() {
  equipmentSwiper.value?.slideNext();
}

function normalizeEquipmentLoop(swiper: SwiperInstance) {
  if (swiper.activeIndex >= equipmentCycleLength * 2) {
    swiper.slideTo(equipmentCycleLength, 0, false);
    return;
  }

  if (swiper.activeIndex < equipmentCycleLength) {
    swiper.slideTo(
      swiper.activeIndex + equipmentCycleLength,
      0,
      false,
    );
  }
}
</script>

<template>
  <ProductPageShell :hero="productionPage.hero">
    <section class="capability-section">
      <ProductReveal>
        <SectionTitle
          english="INTELLECTUAL CREATIVITY"
          chinese="智造力"
          watermark-image="/assets/backgrounds/109cddbb-f0ab-4d85-b117-906b3cd928a9.png"
        />
      </ProductReveal>

      <div class="capability-track">
        <ProductReveal
          v-for="(capability, index) in productionCapabilities"
          :key="capability.id"
          :delay-ms="index * 60"
        >
          <article class="capability-card">
            <div class="capability-card__border">
              <h3>{{ capability.title }}</h3>
              <div class="capability-card__icon">
                <img :src="capability.icon" alt="" aria-hidden="true" />
              </div>
              <p>
                <span v-for="line in capability.description" :key="line">
                  {{ line }}
                </span>
              </p>
              <span class="capability-card__plus" aria-hidden="true"></span>
            </div>
          </article>
        </ProductReveal>
      </div>
    </section>

    <section class="equipment-section">
      <ProductReveal>
        <SectionTitle
          class=" production-title--dark"
          english="PLANT EQUIPMENT"
          chinese="工厂 / 设备"
          theme="dark"
          watermark-image="/assets/backgrounds/109cddbb-f0ab-4d85-b117-906b3cd928a9.png"
        />
        <p class="equipment-section__description">
          {{ productionEquipmentDescription }}
        </p>
      </ProductReveal>

      <ProductReveal class="equipment-carousel-viewport">
        <div class="equipment-carousel">
          <button
            class="equipment-carousel__button equipment-carousel__button--previous"
            type="button"
            aria-label="上一个工厂设备"
            @click="showPreviousEquipment"
          >
            <svg viewBox="0 0 1024 1024" aria-hidden="true">
              <path
                d="M256 533.333a21.267 21.267 0 0 0 6.247 15.087l426.666 426.667a21.333 21.333 0 0 0 30.174-30.174L307.5 533.333l411.587-411.58a21.333 21.333 0 1 0-30.174-30.173L262.247 518.247A21.267 21.267 0 0 0 256 533.333z"
              />
            </svg>
          </button>

          <Swiper
            :modules="[A11y, Autoplay]"
            :slides-per-view="1"
            :space-between="20"
            :breakpoints="equipmentBreakpoints"
            :initial-slide="equipmentInitialSlide"
            :speed="800"
            :autoplay="{
              delay: 3000,
              disableOnInteraction: false,
              reverseDirection: false,
            }"
            :a11y="{ enabled: true }"
            @swiper="registerEquipmentSwiper"
            @transition-end="normalizeEquipmentLoop"
          >
            <SwiperSlide
              v-for="slide in equipmentLoopSlides"
              :key="slide.loopKey"
            >
              <figure class="equipment-carousel__slide">
                <img :src="slide.image" :alt="slide.imageAlt" />
              </figure>
            </SwiperSlide>
          </Swiper>

          <button
            class="equipment-carousel__button equipment-carousel__button--next"
            type="button"
            aria-label="下一个工厂设备"
            @click="showNextEquipment"
          >
            <svg viewBox="0 0 1024 1024" aria-hidden="true">
              <path
                d="M768 533.333a21.267 21.267 0 0 1-6.247 15.087L335.087 975.087a21.333 21.333 0 0 1-30.174-30.174L716.5 533.333l-411.587-411.58a21.333 21.333 0 0 1 30.174-30.173l426.666 426.667A21.267 21.267 0 0 1 768 533.333z"
              />
            </svg>
          </button>
        </div>
      </ProductReveal>
    </section>

    <section class="supply-section">
      <ProductReveal>
        <SectionTitle
          english="ENVIRONMENTAL PROTECTION SUPPLY"
          chinese="环保 / 供应"
          watermark-image="/assets/backgrounds/109cddbb-f0ab-4d85-b117-906b3cd928a9.png"
        />
      </ProductReveal>

      <div class="supply-list">
        <ProductReveal class="supply-row">
          <article class="supply-copy">
            <h3>环保</h3>
            <i aria-hidden="true"></i>
            <p>沸石转轮+RTO、有机废气治理设施4/套</p>
          </article>
          <div class="supply-images supply-images--environment">
            <figure>
              <img
                src="/assets/products/production/bc9710f1-aad8-49d0-9576-0101e6fa48d9.jpg"
                alt="有机废气治理设施"
              />
            </figure>
            <figure>
              <img
                src="/assets/products/production/4667c3a2-3f91-417b-b927-5668c1279d60.jpg"
                alt="沸石转轮 RTO 治理设施"
              />
            </figure>
          </div>
        </ProductReveal>

        <ProductReveal class="supply-row supply-row--supply">
          <figure class="supply-images supply-images--supply">
            <img
              src="/assets/products/production/6cf4d1ec-38ec-4f9b-9735-b3168d7cbcca.jpg"
              alt="南洋迪克国际供应链"
            />
          </figure>
          <article class="supply-copy supply-copy--right">
            <h3>供应</h3>
            <i aria-hidden="true"></i>
            <p>强大的国际供应链、企业专属定制原材料</p>
          </article>
        </ProductReveal>
      </div>
    </section>
  </ProductPageShell>
</template>

<style scoped>
.production-title {
  height: 10.55vw;
  min-height: 10.55vw;
  justify-content: flex-start;
  overflow: visible;
  padding: 1.05vw 0 0;
}

.production-title :deep(.section-title__watermark--image) {
  width: 10.5vw;
  height: 10.55vw;
  transform: translate(-50%, -50%);
}

.production-title :deep(.section-title__english) {
  position: relative;
  z-index: 1;
  color: #634f44;
  font-size: clamp(38px, 2.58vw, 40px);
  font-weight: 400;
  line-height: clamp(60px, 4vw, 62px);
  letter-spacing: 0;
}

.production-title :deep(.section-title__line) {
  display: none;
}

.production-title :deep(.section-title__chinese) {
  position: relative;
  z-index: 1;
  color: #231815;
  font-size: clamp(32px, 2.19vw, 34px);
  font-weight: 400;
  line-height: clamp(48px, 3.28vw, 51px);
  letter-spacing: 0;
}

.production-title--dark :deep(.section-title__watermark--image) {
  opacity: 0.1;
}

.production-title--dark :deep(.section-title__english),
.production-title--dark :deep(.section-title__chinese) {
  color: #fff;
}

.capability-section {
  box-sizing: border-box;
  padding: 5vw 0 8vw;
  background:
    url("/assets/products/production/b4ec228d-199d-4e66-86f7-8984b4c7734f.jpg")
    center / cover no-repeat;
}

.capability-track {
  display: grid;
  width: 80vw;
  max-width: 1440px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 35px;
  margin: 2.8vw auto 0;
  overflow: hidden;
}

.capability-card {
  height: clamp(399px, 25.87vw, 402px);
  box-sizing: border-box;
  padding: 10px;
  border-radius: 20px;
  background: #fff;
  color: #bc9480;
  transition: background-color 0.3s;
}

.capability-card__border {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  padding: 45px 0;
  border: 1px dashed rgb(188 148 128 / 30%);
  border-radius: 20px;
  text-align: center;
  transition: border-color 0.3s;
}

.capability-card h3,
.capability-card p {
  margin: 0;
  color: #bc9480;
  font-weight: 400;
}

.capability-card h3 {
  font-size: clamp(26px, 1.8vw, 28px);
  line-height: 1.5;
  transition: color 0.3s;
}

.capability-card__icon {
  position: relative;
  width: 100px;
  height: 100px;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid #e9e7e7;
  border-radius: 50%;
  margin: 40px auto 60px;
  transition: border-color 0.3s;
}

.capability-card__icon img {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: auto;
  transition: top 0.3s;
}

.capability-card p {
  font-size: 16px;
  line-height: 24px;
  transition: color 0.3s;
}

.capability-card p span {
  display: block;
}

.capability-card__plus {
  position: absolute;
  top: 50%;
  right: -42px;
  z-index: 2;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 5px 10px rgb(128 100 87 / 10%);
  transform: translateY(-50%);
}

.capability-card__plus::before,
.capability-card__plus::after {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 24px;
  height: 1px;
  background: #bc9480;
  content: "";
  transform: translate(-50%, -50%);
}

.capability-card__plus::after {
  transform: translate(-50%, -50%) rotate(90deg);
}

.capability-track > :last-child .capability-card__plus {
  display: none;
}

.capability-card:hover {
  background: #bc9480;
}

.capability-card:hover h3,
.capability-card:hover p {
  color: #fff;
}

.capability-card:hover .capability-card__icon {
  border-color: rgb(255 255 255 / 30%);
}

.capability-card:hover .capability-card__icon img {
  top: auto;
  bottom: 0;
}

.equipment-section {
  box-sizing: border-box;
  overflow: hidden;
  padding-top: 5vw;
  background:
    #faf8f7
    url("/assets/products/production/27bcb19a-0d67-49ab-8acb-4f682dfdf21b.jpg")
    center top / contain no-repeat;
  color: #fff;
}

.equipment-section__description {
  width: 90%;
  margin: 2vw auto 3.5vw;
  color: #fff;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
}

.equipment-carousel-viewport {
  width: 100%;
}

.equipment-carousel {
  position: relative;
  width: 100%;
}

.equipment-carousel :deep(.swiper) {
  width: 60vw;
  overflow: visible;
}

.equipment-carousel__slide {
  overflow: hidden;
  margin: 0;
  aspect-ratio: 560 / 350;
}

.equipment-carousel__slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.equipment-carousel__slide:hover img {
  transform: scale(1.05);
}

.equipment-carousel__button {
  position: absolute;
  top: 50%;
  z-index: 3;
  display: grid;
  width: 45px;
  height: 45px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  place-items: center;
  transform: translateY(-50%);
  transition: background-color 0.3s;
}

.equipment-carousel__button--previous {
  left: 10vw;
}

.equipment-carousel__button--next {
  right: 10vw;
}

.equipment-carousel__button svg {
  width: 16px;
  height: 16px;
  fill: #bc9480;
  transition: fill 0.3s;
}

.equipment-carousel__button:hover {
  background: #bc9480;
}

.equipment-carousel__button:hover svg {
  fill: #fff;
}

.supply-section {
  box-sizing: border-box;
  padding: 6vw 0;
  background: #fff;
}

.supply-list {
  width: 80vw;
  max-width: 1440px;
  margin: 3.2vw auto 0;
}

.supply-row {
  display: flex;
  width: 100%;
  align-items: stretch;
}

.supply-row--supply {
  margin-top: 57.4px;
}

.supply-copy {
  display: flex;
  width: 37%;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  padding-left: 5%;
}

.supply-copy h3,
.supply-copy p {
  margin: 0;
  color: #231815;
  font-weight: 400;
}

.supply-copy h3 {
  font-size: 32px;
  line-height: 48px;
}

.supply-copy i {
  display: block;
  width: 60px;
  height: 2px;
  margin: 22px 0 30px;
  background: #bc9480;
}

.supply-copy p {
  font-size: 20px;
  line-height: 30px;
}

.supply-copy--right {
  width: 36%;
  align-items: flex-end;
  padding: 0 5% 0 0;
  text-align: right;
}

.supply-images {
  overflow: hidden;
  margin: 0;
}

.supply-images figure {
  overflow: hidden;
  margin: 0;
}

.supply-images img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.supply-images figure:hover img,
.supply-images--supply:hover img {
  transform: scale(1.05);
}

.supply-images--environment {
  display: flex;
  width: 63%;
  height: auto;
  aspect-ratio: 717.5 / 398.58;
  gap: 16px;
}

.supply-images--environment figure:first-child {
  width: 42.22%;
}

.supply-images--environment figure:last-child {
  width: calc(57.78% - 16px);
}

.supply-images--supply {
  width: 64%;
  aspect-ratio: 920 / 500;
}

@media (max-width: 998px) {
  .production-title {
    height: 97.33px;
    min-height: 97.33px;
    padding-top: 11px;
  }

  .production-title :deep(.section-title__watermark--image) {
    width: 96.86px;
    height: 97.33px;
    transform: translate(-50%, -50%);
  }

  .production-title :deep(.section-title__english) {
    font-size: 20px;
    line-height: 33.5px;
  }

  .production-title :deep(.section-title__chinese) {
    font-size: 18px;
    line-height: 27px;
  }

  .capability-section {
    min-height: 520.5px;
    padding: 19.25px 0 30.8px;
  }

  .capability-track {
    width: 90vw;
    grid-auto-columns: calc((100% - 10px) / 2);
    grid-auto-flow: column;
    grid-template-columns: none;
    gap: 10px;
    margin-top: 12px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
  }

  .capability-track::-webkit-scrollbar {
    display: none;
  }

  .capability-track > * {
    scroll-snap-align: start;
  }

  .capability-card {
    height: 361px;
  }

  .capability-card h3 {
    font-size: 18px;
    line-height: 27px;
  }

  .capability-card__icon {
    width: 80px;
    height: 80px;
    margin: 40px auto 60px;
  }

  .capability-card__icon img {
    width: 100%;
    height: auto;
  }

  .capability-card p {
    font-size: 14px;
    line-height: 21px;
  }

  .capability-card__plus {
    right: -21.5px;
    width: 30px;
    height: 30px;
  }

  .capability-card__plus::before,
  .capability-card__plus::after {
    width: 18px;
  }

  .equipment-section {
    min-height: 354px;
    padding-top: 19.25px;
    background-size: 100% 80%;
  }

  .equipment-section__description {
    width: 90%;
    margin: 7.7px auto 13.5px;
    font-size: 16px;
    line-height: 24px;
  }

  .equipment-carousel__button {
    width: 30px;
    height: 30px;
  }

  .equipment-carousel__button svg {
    width: 10.5px;
    height: 10.5px;
  }

  .supply-section {
    padding: 23.1px 0;
  }

  .supply-list {
    width: 90vw;
    margin-top: 13.9px;
  }

  .supply-row {
    flex-direction: column;
  }

  .supply-row--supply {
    margin-top: 30px;
  }

  .supply-copy,
  .supply-copy--right {
    order: 2;
    width: 100%;
    min-height: 78px;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 20px 5% 0;
    text-align: left;
  }

  .supply-copy h3 {
    font-size: 18px;
    line-height: 27px;
  }

  .supply-copy i {
    width: 40px;
    margin: 8px 0;
  }

  .supply-copy p {
    font-size: 16px;
    line-height: 24px;
  }

  .supply-images {
    order: 1;
  }

  .supply-images--environment {
    width: 100%;
    height: auto;
    aspect-ratio: 346.5 / 192.47;
    gap: 8px;
  }

  .supply-images--environment figure:first-child {
    width: 42.22%;
  }

  .supply-images--environment figure:last-child {
    width: calc(57.78% - 8px);
  }

  .supply-images--supply {
    width: 100%;
    aspect-ratio: 920 / 500;
  }
}

@media (prefers-reduced-motion: reduce) {
  .capability-track {
    scroll-behavior: auto;
  }

  .equipment-carousel__slide img,
  .supply-images img {
    transition: none;
  }

  .equipment-carousel__slide:hover img,
  .supply-images figure:hover img,
  .supply-images--supply:hover img {
    transform: none;
  }
}
</style>
