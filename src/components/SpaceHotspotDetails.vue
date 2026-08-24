<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from "vue";

import { useWheelNavigation } from "@/composables/useWheelNavigation";
import type { SpaceGalleryAsset, SpaceGalleryHotspot } from "@/types/content";

const props = defineProps<{
  readonly hotspot: SpaceGalleryHotspot;
}>();

const emit = defineEmits<{
  close: [];
}>();

const activeIndex = ref(0);
const details = ref<HTMLElement | null>(null);
const closeButton = ref<HTMLButtonElement | null>(null);
const thumbnailRail = ref<HTMLElement | null>(null);
const touchStartX = ref<number | null>(null);

const images = computed<readonly SpaceGalleryAsset[]>(() => props.hotspot.images);
const activeImage = computed<SpaceGalleryAsset | undefined>(
  () => images.value[activeIndex.value] ?? images.value[0],
);
const isCarousel = computed(() => props.hotspot.layout === "carousel");

function showImage(index: number): void {
  if (!isCarousel.value || images.value.length === 0) {
    return;
  }
  activeIndex.value = (index + images.value.length) % images.value.length;
}

function showPrevious(): void {
  showImage(activeIndex.value - 1);
}

function showNext(): void {
  showImage(activeIndex.value + 1);
}

const { handleWheel: navigateWithWheel } = useWheelNavigation(
  showPrevious,
  showNext,
);

function handleWheel(event: WheelEvent): void {
  event.stopPropagation();
  if (!isCarousel.value || images.value.length < 2) {
    return;
  }
  navigateWithWheel(event);
}

function handleKeydown(event: KeyboardEvent): void {
  event.stopPropagation();
  if (event.key === "Tab") {
    const focusable = Array.from(
      details.value?.querySelectorAll<HTMLElement>(
        "button:not(:disabled), [href], [tabindex]:not([tabindex='-1'])",
      ) ?? [],
    ).filter((element) => !element.hidden);
    const first = focusable[0];
    const last = focusable.at(-1);
    if (!first || !last) {
      return;
    }
    if (!details.value?.contains(document.activeElement)) {
      event.preventDefault();
      first.focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  } else if (event.key === "Escape") {
    event.preventDefault();
    emit("close");
  } else if (isCarousel.value && event.key === "ArrowLeft") {
    event.preventDefault();
    showPrevious();
  } else if (isCarousel.value && event.key === "ArrowRight") {
    event.preventDefault();
    showNext();
  }
}

function handleTouchStart(event: TouchEvent): void {
  event.stopPropagation();
  if (isCarousel.value) {
    touchStartX.value = event.changedTouches[0]?.clientX ?? null;
  }
}

function handleTouchEnd(event: TouchEvent): void {
  event.stopPropagation();
  const endX = event.changedTouches[0]?.clientX;
  if (!isCarousel.value || touchStartX.value === null || endX === undefined) {
    touchStartX.value = null;
    return;
  }
  const distance = endX - touchStartX.value;
  touchStartX.value = null;
  if (Math.abs(distance) < 48) {
    return;
  }
  if (distance > 0) {
    showPrevious();
  } else {
    showNext();
  }
}

function preloadAdjacentImages(): void {
  const total = images.value.length;
  if (!isCarousel.value || total < 2) {
    return;
  }
  const indexes = [
    (activeIndex.value - 1 + total) % total,
    (activeIndex.value + 1) % total,
  ];
  indexes.forEach((index) => {
    const source = images.value[index]?.src;
    if (source) {
      const preload = new Image();
      preload.src = source;
    }
  });
}

watch(activeIndex, async () => {
  preloadAdjacentImages();
  await nextTick();
  thumbnailRail.value
    ?.querySelector<HTMLElement>(`[data-detail-index="${activeIndex.value}"]`)
    ?.scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" });
});

onMounted(() => {
  preloadAdjacentImages();
  closeButton.value?.focus();
});
</script>

<template>
  <section
    ref="details"
    class="space-hotspot-details"
    :class="`is-${hotspot.layout}`"
    role="dialog"
    aria-modal="true"
    :aria-label="`${hotspot.label}详情图`"
    @click.stop
    @keydown="handleKeydown"
    @wheel="handleWheel"
    @touchstart.passive="handleTouchStart"
    @touchend.passive="handleTouchEnd"
  >
    <header class="space-hotspot-details__header">
      <div>
        <p>{{ hotspot.label }}</p>
        <span>DETAILS</span>
      </div>
      <span v-if="isCarousel" class="space-hotspot-details__counter bank">
        {{ activeIndex + 1 }} / {{ images.length }}
      </span>
      <button
        ref="closeButton"
        class="space-hotspot-details__close"
        type="button"
        aria-label="关闭详情图"
        @click="emit('close')"
      >
        <span />
        <span />
      </button>
    </header>

    <div v-if="isCarousel && activeImage" class="space-hotspot-details__stage">
      <img
        :key="activeImage.id"
        class="space-hotspot-details__image"
        :src="activeImage.src"
        :alt="activeImage.alt"
        decoding="async"
      />

      <template v-if="images.length > 1">
        <button
          class="space-hotspot-details__arrow space-hotspot-details__arrow--previous"
          type="button"
          aria-label="上一张详情图"
          @click="showPrevious"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m15 5-7 7 7 7" />
          </svg>
        </button>
        <button
          class="space-hotspot-details__arrow space-hotspot-details__arrow--next"
          type="button"
          aria-label="下一张详情图"
          @click="showNext"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </template>
    </div>

    <nav
      v-if="isCarousel && images.length > 1"
      ref="thumbnailRail"
      class="space-hotspot-details__thumbnails"
      aria-label="详情图缩略图"
    >
      <button
        v-for="(image, index) in images"
        :key="image.id"
        class="space-hotspot-details__thumbnail"
        :class="{ 'is-active': activeIndex === index }"
        type="button"
        :data-detail-index="index"
        :aria-label="`查看第 ${index + 1} 张详情图`"
        :aria-pressed="activeIndex === index"
        @click="showImage(index)"
      >
        <img :src="image.thumbnail" :alt="image.alt" loading="lazy" />
      </button>
    </nav>

    <div v-if="!isCarousel" class="space-hotspot-details__grid">
      <figure v-for="image in images" :key="image.id">
        <img :src="image.src" :alt="image.alt" decoding="async" />
        <figcaption>{{ image.alt }}</figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.space-hotspot-details {
  position: absolute;
  z-index: 20;
  inset: 0;
  display: grid;
  overflow: hidden;
  background:
    radial-gradient(circle at 25% 15%, rgb(188 148 128 / 14%), transparent 38%),
    rgb(13 10 9 / 98%);
  color: #fff;
  grid-template-rows: 68px minmax(0, 1fr) 88px;
}

.space-hotspot-details.is-grid {
  grid-template-rows: 68px minmax(0, 1fr);
}

.space-hotspot-details__header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgb(255 255 255 / 12%);
  padding: 0 82px 0 24px;
}

.space-hotspot-details__header p,
.space-hotspot-details__header span {
  margin: 0;
}

.space-hotspot-details__header p {
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-indent: 0.2em;
}

.space-hotspot-details__header div > span {
  display: block;
  margin-top: 5px;
  color: rgb(255 255 255 / 42%);
  font-size: 9px;
  letter-spacing: 0.24em;
}

.space-hotspot-details__counter {
  color: rgb(255 255 255 / 70%);
  font-size: 12px;
  letter-spacing: 0.14em;
}

.space-hotspot-details__close {
  position: absolute;
  top: 50%;
  right: 18px;
  width: 42px;
  height: 42px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #fff;
  cursor: pointer;
  opacity: 0.72;
  transform: translateY(-50%);
  transition: opacity 0.3s ease;
}

.space-hotspot-details__close:hover,
.space-hotspot-details__close:focus-visible {
  outline: none;
  opacity: 1;
}

.space-hotspot-details__close span {
  position: absolute;
  top: 20px;
  left: 7px;
  width: 28px;
  height: 1px;
  background: currentcolor;
}

.space-hotspot-details__close span:first-child {
  transform: rotate(45deg);
}

.space-hotspot-details__close span:last-child {
  transform: rotate(-45deg);
}

.space-hotspot-details__stage {
  position: relative;
  display: grid;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  place-items: center;
}

.space-hotspot-details__image {
  position: absolute;
  inset: 12px 62px;
  display: block;
  width: calc(100% - 124px);
  height: calc(100% - 24px);
  min-width: 0;
  min-height: 0;
  object-fit: contain;
  animation: space-hotspot-detail-in 0.36s ease both;
}

.space-hotspot-details__arrow {
  position: absolute;
  top: 50%;
  display: grid;
  width: 42px;
  height: 42px;
  padding: 0;
  border: 1px solid rgb(255 255 255 / 24%);
  border-radius: 50%;
  background: rgb(35 24 21 / 68%);
  color: #fff;
  cursor: pointer;
  place-items: center;
  transform: translateY(-50%);
}

.space-hotspot-details__arrow:hover,
.space-hotspot-details__arrow:focus-visible {
  border-color: var(--nydk-rosewood);
  background: var(--nydk-rosewood);
  outline: none;
}

.space-hotspot-details__arrow svg {
  width: 19px;
  height: 19px;
  fill: none;
  stroke: currentcolor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.5;
}

.space-hotspot-details__arrow--previous {
  left: 12px;
}

.space-hotspot-details__arrow--next {
  right: 12px;
}

.space-hotspot-details__thumbnails {
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: center;
  gap: 10px;
  overflow-x: auto;
  padding: 10px 16px;
  scrollbar-width: none;
}

.space-hotspot-details__thumbnails::-webkit-scrollbar {
  display: none;
}

.space-hotspot-details__thumbnail {
  width: 104px;
  height: 64px;
  flex: 0 0 auto;
  overflow: hidden;
  padding: 0;
  border: 2px solid transparent;
  background: #0f0c0b;
  cursor: pointer;
  opacity: 0.44;
}

.space-hotspot-details__thumbnail:hover,
.space-hotspot-details__thumbnail:focus-visible,
.space-hotspot-details__thumbnail.is-active {
  border-color: var(--nydk-rosewood);
  outline: none;
  opacity: 1;
}

.space-hotspot-details__thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.space-hotspot-details__grid {
  display: grid;
  min-width: 0;
  min-height: 0;
  align-items: stretch;
  gap: clamp(12px, 1.6vw, 26px);
  grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr));
  overflow: auto;
  padding: clamp(16px, 2.5vw, 40px);
}

.space-hotspot-details__grid figure {
  display: grid;
  min-height: 0;
  margin: 0;
  grid-template-rows: minmax(0, 1fr) auto;
}

.space-hotspot-details__grid img {
  width: 100%;
  height: 100%;
  min-height: 0;
  object-fit: contain;
}

.space-hotspot-details__grid figcaption {
  padding-top: 8px;
  color: rgb(255 255 255 / 58%);
  font-size: 11px;
  line-height: 1.4;
  text-align: center;
}

@keyframes space-hotspot-detail-in {
  from {
    opacity: 0.1;
    transform: scale(0.995);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 520px) {
  .space-hotspot-details {
    grid-template-rows: 60px minmax(0, 1fr) 76px;
  }

  .space-hotspot-details.is-grid {
    grid-template-rows: 60px minmax(0, 1fr);
  }

  .space-hotspot-details__header {
    padding: 0 64px 0 14px;
  }

  .space-hotspot-details__header p {
    font-size: 15px;
  }

  .space-hotspot-details__close {
    right: 8px;
    width: 38px;
    height: 38px;
  }

  .space-hotspot-details__close span {
    top: 18px;
    left: 7px;
    width: 24px;
  }

  .space-hotspot-details__image {
    inset: 8px 42px;
    width: calc(100% - 84px);
    height: calc(100% - 16px);
  }

  .space-hotspot-details__arrow {
    width: 34px;
    height: 34px;
  }

  .space-hotspot-details__arrow--previous {
    left: 3px;
  }

  .space-hotspot-details__arrow--next {
    right: 3px;
  }

  .space-hotspot-details__thumbnail {
    width: 88px;
    height: 54px;
  }

  .space-hotspot-details__grid {
    align-items: start;
    grid-template-columns: 1fr;
    padding: 14px;
  }

  .space-hotspot-details__grid figure {
    min-height: min(62vh, 520px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .space-hotspot-details__image {
    animation: none;
  }

  .space-hotspot-details__close {
    transition: none;
  }
}
</style>
