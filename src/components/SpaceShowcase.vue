<script setup lang="ts">
import { computed, ref, type ComponentPublicInstance } from "vue";
import { RouterLink } from "vue-router";

import { useReveal } from "@/composables/useReveal";
import { spaceSlides } from "@/data/home";

const activeIndex = ref(0);
const activeSlide = computed(() => spaceSlides[activeIndex.value] ?? spaceSlides[0]!);
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
      <img
        class="space-showcase__watermark"
        src="/assets/backgrounds/109cddbb-f0ab-4d85-b117-906b3cd928a9.png"
        alt=""
        aria-hidden="true"
        width="200"
        height="201"
      />
      <Transition name="space-copy" mode="out-in">
        <div :key="activeSlide.id" class="space-showcase__copy">
          <p class="space-showcase__english bank">
            {{ activeSlide.english }}
          </p>
          <i class="space-showcase__line" aria-hidden="true"></i>
          <h2 class="space-showcase__title">
            {{ activeSlide.title }}
          </h2>
          <RouterLink
            class="space-showcase__more"
            :to="activeSlide.href"
            :aria-label="`查看${activeSlide.title}`"
          >
            <span aria-hidden="true">＋</span>
          </RouterLink>
        </div>
      </Transition>
    </div>

    <div class="space-showcase__navigation">
      <div class="space-showcase__track">
        <span
          class="space-showcase__indicator"
          :class="`space-showcase__indicator--${activeIndex}`"
          aria-hidden="true"
        ></span>
        <button
          v-for="(slide, index) in spaceSlides"
          :key="slide.id"
          type="button"
          class="space-showcase__tab"
          :class="{ 'is-active': activeIndex === index }"
          :aria-label="`切换至${slide.title}`"
          :aria-pressed="activeIndex === index"
          @mouseenter="selectSlide(index)"
          @focus="selectSlide(index)"
          @click="selectSlide(index)"
        >
          <img
            class="space-showcase__tab-icon"
            :src="slide.icon"
            :alt="slide.title"
            width="100"
            height="60"
          />
          <span class="space-showcase__tab-title">{{ slide.title }}</span>
        </button>
      </div>
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
    linear-gradient(90deg, rgb(24 15 12 / 42%) 0%, rgb(24 15 12 / 8%) 48%),
    linear-gradient(0deg, rgb(24 15 12 / 64%) 0%, rgb(24 15 12 / 12%) 38%),
    rgb(24 15 12 / 22%);
  content: "";
  pointer-events: none;
}

.space-showcase__heading {
  position: absolute;
  z-index: 4;
  top: 20%;
  left: 5%;
  width: min(560px, 44vw);
  min-height: 250px;
}

.space-showcase__watermark {
  position: absolute;
  z-index: -1;
  top: -50px;
  left: -2px;
  width: clamp(140px, 10.5vw, 215px);
  height: auto;
  object-fit: contain;
  opacity: 0.82;
}

.space-showcase__copy {
  position: relative;
  z-index: 1;
}

.space-showcase__english {
  margin: 0;
  font-size: clamp(28px, 2.55vw, 44px);
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: 0.075em;
  white-space: nowrap;
}

.space-showcase__line {
  display: block;
  width: clamp(46px, 4.2vw, 66px);
  height: 3px;
  margin-block: 16px 15px;
  background: #fff;
}

.space-showcase__title {
  margin: 0;
  font-size: clamp(26px, 2.25vw, 38px);
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.24em;
  text-indent: 0.24em;
}

.space-showcase__more {
  display: grid;
  width: clamp(38px, 2.75vw, 56px);
  height: clamp(38px, 2.75vw, 56px);
  margin-top: clamp(32px, 3.6vw, 72px);
  border-radius: 50%;
  background: var(--nydk-rosewood);
  color: rgb(255 255 255 / 78%);
  place-items: center;
  transition:
    background-color 0.35s ease,
    transform 0.35s ease;
}

.space-showcase__more span {
  font-size: clamp(22px, 1.6vw, 30px);
  font-weight: 200;
  line-height: 1;
}

.space-showcase__more:hover,
.space-showcase__more:focus-visible {
  background: #c9a18e;
  outline: none;
  transform: rotate(90deg);
}

.space-copy-enter-active,
.space-copy-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.space-copy-enter-from,
.space-copy-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.space-showcase__navigation {
  position: absolute;
  z-index: 5;
  right: 5%;
  bottom: 2.6%;
  left: 5%;
  height: clamp(88px, 8.2vw, 126px);
}

.space-showcase__track {
  position: relative;
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(6, minmax(0, 1fr));
}

.space-showcase__indicator {
  position: absolute;
  z-index: 0;
  top: 0;
  bottom: 0;
  left: 0;
  width: calc(100% / 6);
  border-radius: 999px;
  background: rgb(188 148 128 / 58%);
  pointer-events: none;
  transition: transform 0.7s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.space-showcase__indicator--0 {
  transform: translateX(0);
}

.space-showcase__indicator--1 {
  transform: translateX(100%);
}

.space-showcase__indicator--2 {
  transform: translateX(200%);
}

.space-showcase__indicator--3 {
  transform: translateX(300%);
}

.space-showcase__indicator--4 {
  transform: translateX(400%);
}

.space-showcase__indicator--5 {
  transform: translateX(500%);
}

.space-showcase__tab {
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  color: rgb(255 255 255 / 52%);
  cursor: pointer;
  transition: color 0.45s ease;
}

.space-showcase__tab:hover,
.space-showcase__tab:focus-visible,
.space-showcase__tab.is-active {
  color: #fff;
  outline: none;
}

.space-showcase__tab-icon {
  width: clamp(54px, 4.15vw, 84px);
  height: auto;
  object-fit: contain;
  opacity: 0.72;
  transition:
    opacity 0.45s ease,
    transform 0.45s ease;
}

.space-showcase__tab:hover .space-showcase__tab-icon,
.space-showcase__tab:focus-visible .space-showcase__tab-icon,
.space-showcase__tab.is-active .space-showcase__tab-icon {
  opacity: 1;
  transform: translateY(-2px);
}

.space-showcase__tab-title {
  margin-top: 8px;
  font-size: clamp(13px, 0.95vw, 18px);
  line-height: 1;
  letter-spacing: 0.08em;
  text-indent: 0.08em;
  white-space: nowrap;
}

@media (max-width: 998px) {
  .space-showcase {
    min-height: clamp(420px, 76vw, 620px);
    aspect-ratio: auto;
  }

  .space-showcase__media {
    height: 100%;
  }

  .space-showcase__heading {
    top: 30px;
    left: 5%;
    width: min(360px, 70vw);
    min-height: 190px;
  }

  .space-showcase__watermark {
    top: -10px;
    font-size: clamp(92px, 18vw, 138px);
  }

  .space-showcase__english {
    font-size: clamp(19px, 4vw, 28px);
  }

  .space-showcase__line {
    width: 42px;
    height: 2px;
    margin-block: 11px 10px;
  }

  .space-showcase__title {
    font-size: clamp(19px, 3.7vw, 26px);
  }

  .space-showcase__more {
    width: 40px;
    height: 40px;
    margin-top: 26px;
  }

  .space-showcase__more span {
    font-size: 24px;
  }

  .space-showcase__navigation {
    right: 0;
    bottom: 12px;
    left: 0;
    height: 84px;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .space-showcase__navigation::-webkit-scrollbar {
    display: none;
  }

  .space-showcase__track {
    width: 672px;
    grid-template-columns: repeat(6, 112px);
  }

  .space-showcase__indicator {
    width: 112px;
  }

  .space-showcase__tab-icon {
    width: 58px;
  }

  .space-showcase__tab-title {
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
  .space-showcase__indicator,
  .space-showcase__tab,
  .space-showcase__tab-icon,
  .space-showcase__more,
  .space-copy-enter-active,
  .space-copy-leave-active {
    transition: none;
  }
}
</style>
