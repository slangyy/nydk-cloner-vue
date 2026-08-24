<script setup lang="ts">
import {
  computed,
  nextTick,
  ref,
  type ComponentPublicInstance,
} from "vue";

import SpaceGalleryDialog from "@/components/SpaceGalleryDialog.vue";
import { useReveal } from "@/composables/useReveal";
import { spaceSlides } from "@/data/spaces";
import type { SpaceSlide } from "@/types/content";

const activeIndex = ref(0);
const selectedSpace = ref<SpaceSlide | null>(null);
const galleryTrigger = ref<HTMLButtonElement | null>(null);
const navigationViewport = ref<HTMLElement | null>(null);
const activeSlide = computed(() => spaceSlides[activeIndex.value] ?? spaceSlides[0]!);
const { target, isVisible } = useReveal();

async function revealTab(index: number): Promise<void> {
  await nextTick();
  navigationViewport.value
    ?.querySelector<HTMLElement>(`[data-space-index="${index}"]`)
    ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
}

function selectSlide(index: number, reveal = false): void {
  activeIndex.value = index;
  if (reveal) {
    void revealTab(index);
  }
}

function handleTabPointerEnter(index: number): void {
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    selectSlide(index);
  }
}

function selectAdjacentSlide(offset: number): void {
  const nextIndex = (activeIndex.value + offset + spaceSlides.length) % spaceSlides.length;
  selectSlide(nextIndex, true);
}

function openGallery(event: MouseEvent, space = activeSlide.value): void {
  galleryTrigger.value = event.currentTarget instanceof HTMLButtonElement
    ? event.currentTarget
    : null;
  selectedSpace.value = space;
}

function closeGallery(): void {
  selectedSpace.value = null;
}

function setRevealTarget(element: Element | ComponentPublicInstance | null): void {
  target.value = element instanceof HTMLElement ? element : null;
}

</script>

<template>
  <section
    :ref="setRevealTarget"
    class="space-showcase reveal"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="space-showcase-title"
  >
    <div class="space-showcase__media">
      <button
        v-for="(slide, index) in spaceSlides"
        :key="slide.id"
        type="button"
        class="space-showcase__layer"
        :class="{ 'is-active': activeIndex === index }"
        :aria-hidden="activeIndex !== index"
        :aria-label="`打开${slide.titleZh}图片轮播`"
        :tabindex="activeIndex === index ? 0 : -1"
        @click="openGallery($event, slide)"
      >
        <img
          :src="slide.coverImage"
          :alt="`${slide.titleZh} ${slide.titleRu}`"
          width="1920"
          height="1080"
          :loading="index === 0 ? 'eager' : 'lazy'"
        />
      </button>
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
          <p class="space-showcase__english bank" lang="ru">
            {{ activeSlide.titleRu }}
          </p>
          <i class="space-showcase__line" aria-hidden="true"></i>
          <h2 class="space-showcase__title">
            {{ activeSlide.titleZh }}
          </h2>
          <!-- <button
            class="space-showcase__more"
            type="button"
            :aria-label="`打开${activeSlide.titleZh}图片轮播`"
            @click="openGallery"
          >
            <span aria-hidden="true">＋</span>
          </button> -->
        </div>
      </Transition>
    </div>

    <nav
      class="space-showcase__navigation"
      aria-label="空间切换"
    >
      <button
        class="space-showcase__rail-button space-showcase__rail-button--previous"
        type="button"
        aria-label="上一个空间"
        @click="selectAdjacentSlide(-1)"
      >
        <svg viewBox="0 0 24 40" aria-hidden="true">
          <path d="M18 3 4 20l14 17" />
        </svg>
      </button>

      <div ref="navigationViewport" class="space-showcase__viewport">
        <div class="space-showcase__track">
          <button
            v-for="(slide, index) in spaceSlides"
            :key="slide.id"
            type="button"
            class="space-showcase__tab"
            :class="{ 'is-active': activeIndex === index }"
            :data-space-index="index"
            :aria-label="`切换至${slide.titleZh} ${slide.titleRu}`"
            :aria-pressed="activeIndex === index"
            @mouseenter="handleTabPointerEnter(index)"
            @focus="selectSlide(index, true)"
            @click="selectSlide(index, true)"
          >
            <img
              class="space-showcase__tab-icon"
              :src="slide.icon"
              alt=""
              aria-hidden="true"
              width="300"
              height="300"
            />
            <span class="space-showcase__tab-title bank" lang="ru">
              {{ slide.titleRu }}
            </span>
          </button>
        </div>
      </div>

      <button
        class="space-showcase__rail-button space-showcase__rail-button--next"
        type="button"
        aria-label="下一个空间"
        @click="selectAdjacentSlide(1)"
      >
        <svg viewBox="0 0 24 40" aria-hidden="true">
          <path d="m6 3 14 17L6 37" />
        </svg>
      </button>
    </nav>
  </section>

  <SpaceGalleryDialog
    :space="selectedSpace"
    :return-focus-to="galleryTrigger"
    @close="closeGallery"
  />
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
  padding: 0;
  border: 0;
  background: transparent;
  cursor: zoom-in;
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
  pointer-events: none;
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
  padding: 0;
  border-radius: 50%;
  background: var(--nydk-rosewood);
  color: rgb(255 255 255 / 78%);
  cursor: pointer;
  pointer-events: auto;
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
  right: 3.6%;
  bottom: 2.6%;
  left: 3.6%;
  display: grid;
  height: clamp(88px, 8.2vw, 126px);
  align-items: stretch;
  column-gap: clamp(12px, 1.5vw, 30px);
  grid-template-columns: 34px minmax(0, 1fr) 34px;
}

.space-showcase__viewport {
  min-width: 0;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
}

.space-showcase__viewport::-webkit-scrollbar {
  display: none;
}

.space-showcase__track {
  --visible-space-count: 6;

  display: grid;
  width: calc(100% * 10 / var(--visible-space-count));
  min-width: calc(100% * 10 / var(--visible-space-count));
  height: 100%;
  grid-template-columns: repeat(10, minmax(0, 1fr));
}

.space-showcase__tab {
  position: relative;
  display: flex;
  min-width: 0;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 5px;
  background: transparent;
  color: rgb(255 255 255 / 52%);
  cursor: pointer;
  isolation: isolate;
  scroll-snap-align: center;
  transition: color 0.45s ease;
}

.space-showcase__tab::before {
  position: absolute;
  z-index: -1;
  inset: 0;
  border-radius: 999px;
  background: rgb(188 148 128 / 58%);
  content: "";
  opacity: 0;
  transform: scale(0.92);
  transition:
    opacity 0.45s ease,
    transform 0.45s ease;
}

.space-showcase__tab:hover,
.space-showcase__tab:focus-visible,
.space-showcase__tab.is-active {
  color: #fff;
  outline: none;
}

.space-showcase__tab.is-active::before {
  opacity: 1;
  transform: scale(1);
}

.space-showcase__tab-icon {
  width: clamp(52px, 4vw, 80px);
  height: clamp(42px, 3.8vw, 70px);
  object-fit: contain;
  opacity: 0.7;
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
  max-width: 100%;
  margin-top: 6px;
  overflow: hidden;
  font-size: clamp(10px, 0.72vw, 14px);
  line-height: 1.12;
  letter-spacing: 0.04em;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.space-showcase__rail-button {
  display: grid;
  width: 34px;
  height: 58px;
  place-self: center;
  place-items: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: #c79b84;
  cursor: pointer;
  opacity: 0.9;
  transition:
    color 0.3s ease,
    opacity 0.3s ease,
    transform 0.3s ease;
}

.space-showcase__rail-button:hover,
.space-showcase__rail-button:focus-visible {
  color: #e2b9a4;
  outline: none;
  opacity: 1;
}

.space-showcase__rail-button--previous:hover,
.space-showcase__rail-button--previous:focus-visible {
  transform: translateX(-3px);
}

.space-showcase__rail-button--next:hover,
.space-showcase__rail-button--next:focus-visible {
  transform: translateX(3px);
}

.space-showcase__rail-button svg {
  width: 16px;
  height: 30px;
  fill: none;
  stroke: currentcolor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.35;
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
    width: clamp(92px, 18vw, 138px);
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
    bottom: 10px;
    left: 0;
    height: 88px;
    column-gap: 4px;
    grid-template-columns: 34px minmax(0, 1fr) 34px;
  }

  .space-showcase__track {
    --visible-space-count: 4;
  }

  .space-showcase__rail-button {
    width: 28px;
    height: 50px;
  }

  .space-showcase__rail-button svg {
    width: 13px;
    height: 26px;
  }

  .space-showcase__tab-icon {
    width: 54px;
    height: 48px;
  }

  .space-showcase__tab-title {
    font-size: clamp(9px, 1.65vw, 12px);
  }
}

@media (max-width: 520px) {
  .space-showcase__heading {
    width: min(360px, 88vw);
  }

  .space-showcase__title {
    font-size: clamp(19px, 5vw, 24px);
  }

  .space-showcase__layer img {
    object-position: center;
  }

  .space-showcase__tab-title {
    font-size: 10px;
  }

  .space-showcase__track {
    --visible-space-count: 3;
  }
}

@media (prefers-reduced-motion: reduce) {
  .space-showcase__layer,
  .space-showcase__tab,
  .space-showcase__tab::before,
  .space-showcase__tab-icon,
  .space-showcase__more,
  .space-showcase__rail-button,
  .space-copy-enter-active,
  .space-copy-leave-active {
    transition: none;
  }

  .space-showcase__viewport {
    scroll-behavior: auto;
  }
}
</style>
