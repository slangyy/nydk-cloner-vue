<script setup lang="ts">
import { type ComponentPublicInstance, useId } from "vue";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

import { useReveal } from "@/composables/useReveal";
import { poseenaCases } from "@/data/poseena";

const { target, isVisible } = useReveal();
const instanceId = useId().replaceAll(":", "");
const previousButtonClass = `poseena-cases-prev-${instanceId}`;
const nextButtonClass = `poseena-cases-next-${instanceId}`;

const setRevealTarget = (element: Element | ComponentPublicInstance | null): void => {
  target.value = element instanceof HTMLElement ? element : null;
};
</script>

<template>
  <section
    :ref="setRevealTarget"
    class="poseena-cases reveal"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="poseena-cases-title"
  >
    <header class="poseena-cases__heading">
      <h2 id="poseena-cases-title">
        整装全案 静待品鉴
      </h2>
      <i aria-hidden="true"></i>
    </header>

    <div class="poseena-cases__carousel">
      <Swiper
        class="poseena-cases__swiper"
        :modules="[Navigation]"
        :loop="true"
        :loop-additional-slides="3"
        :centered-slides="true"
        :slides-per-view="1"
        :space-between="20"
        :navigation="{
          prevEl: `.${previousButtonClass}`,
          nextEl: `.${nextButtonClass}`,
        }"
        :breakpoints="{
          999: { slidesPerView: 1.8, spaceBetween: 100 },
          1441: { slidesPerView: 1.8, spaceBetween: 140 },
        }"
      >
        <SwiperSlide v-for="item in poseenaCases" :key="item.id">
          <article class="poseena-cases__card">
            <div class="poseena-cases__media">
              <img
                :src="item.image"
                :alt="item.title"
                width="1000"
                height="505"
                loading="lazy"
              />
            </div>
            <h3>{{ item.title }}</h3>
          </article>
        </SwiperSlide>
      </Swiper>

      <button
        type="button"
        class="poseena-cases__arrow poseena-cases__arrow--previous"
        :class="previousButtonClass"
        aria-label="上一个案例"
      >
        <span aria-hidden="true"></span>
      </button>
      <button
        type="button"
        class="poseena-cases__arrow poseena-cases__arrow--next"
        :class="nextButtonClass"
        aria-label="下一个案例"
      >
        <span aria-hidden="true"></span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.poseena-cases {
  width: 100%;
  margin-top: 140px;
  margin-bottom: 80px;
  overflow: hidden;
  background: #fff;
}

.poseena-cases__heading {
  text-align: center;
}

.poseena-cases__heading h2 {
  margin: 0;
  color: #231815;
  font-size: 48px;
  font-weight: 600;
  line-height: 1.6667;
  letter-spacing: 0.02em;
}

.poseena-cases__heading i {
  display: block;
  width: 120px;
  height: 2px;
  margin: 20px auto 0;
  background: #bc9480;
}

.poseena-cases__carousel {
  position: relative;
  width: 100%;
  margin-top: 80px;
}

.poseena-cases__swiper {
  width: 100%;
  padding-bottom: 60px;
  overflow: hidden;
}

.poseena-cases__card {
  overflow: hidden;
  background: #fff;
  box-shadow: 0 20px 40px rgb(0 0 0 / 6%);
}

.poseena-cases__media {
  width: 100%;
  overflow: hidden;
  aspect-ratio: 1000 / 505;
}

.poseena-cases__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.poseena-cases__media:hover img {
  transform: scale(1.02);
}

.poseena-cases__card h3 {
  margin: 0;
  padding: 30px 20px;
  color: #231815;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.6667;
  text-align: center;
}

.poseena-cases__arrow {
  position: absolute;
  z-index: 5;
  top: 50%;
  display: grid;
  width: 50px;
  height: 50px;
  place-items: center;
  padding: 0;
  border: 2px solid #bc9480;
  border-radius: 50%;
  background: #fff;
  color: #bc9480;
  cursor: pointer;
  margin-top: -22px;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.poseena-cases__arrow--previous {
  left: 19%;
}

.poseena-cases__arrow--next {
  right: 19%;
}

.poseena-cases__arrow span {
  position: relative;
  display: block;
  width: 12px;
  height: 12px;
  border-top: 2px solid currentColor;
  border-right: 2px solid currentColor;
}

.poseena-cases__arrow--previous span {
  margin-left: 4px;
  transform: rotate(-135deg);
}

.poseena-cases__arrow--next span {
  margin-right: 4px;
  transform: rotate(45deg);
}

.poseena-cases__arrow:hover,
.poseena-cases__arrow:focus-visible {
  background: #bc9480;
  color: #fff;
  outline: none;
}

@media (max-width: 1440px) {
  .poseena-cases {
    margin-top: 80px;
  }

  .poseena-cases__heading h2 {
    font-size: 38px;
    line-height: 1.6667;
  }

  .poseena-cases__carousel {
    margin-top: 40px;
  }

  .poseena-cases__card h3 {
    font-size: 24px;
  }
}

@media (max-width: 998px) {
  .poseena-cases {
    width: 90%;
    margin: 40px auto 0;
    overflow: visible;
  }

  .poseena-cases__heading h2 {
    font-size: 20px;
  }

  .poseena-cases__heading i {
    width: 60px;
    margin-top: 14px;
  }

  .poseena-cases__carousel {
    margin-top: 20px;
    overflow: visible;
  }

  .poseena-cases__swiper {
    padding-bottom: 60px;
    overflow: visible;
  }

  .poseena-cases__card h3 {
    font-size: 16px;
    line-height: 1.6667;
  }

  .poseena-cases__arrow {
    width: 30px;
    height: 30px;
    border-width: 1px;
  }

  .poseena-cases__arrow--previous {
    left: 10px;
  }

  .poseena-cases__arrow--next {
    right: 10px;
  }

  .poseena-cases__arrow span {
    width: 8px;
    height: 8px;
    border-top-width: 1px;
    border-right-width: 1px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .poseena-cases__media img,
  .poseena-cases__arrow {
    transition: none;
  }
}
</style>
