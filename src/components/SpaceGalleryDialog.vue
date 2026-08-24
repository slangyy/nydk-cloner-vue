<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";

import SpaceHotspotDetails from "@/components/SpaceHotspotDetails.vue";
import SpaceHotspotImage from "@/components/SpaceHotspotImage.vue";
import { useWheelNavigation } from "@/composables/useWheelNavigation";
import { spaceSeriesLabels } from "@/data/spaces";
import type {
  SpaceGalleryHotspot,
  SpaceGalleryImage,
  SpaceSlide,
} from "@/types/content";

const props = defineProps<{
  readonly space: SpaceSlide | null;
  readonly returnFocusTo: HTMLButtonElement | null;
}>();

const emit = defineEmits<{
  close: [];
}>();

const dialog = ref<HTMLDialogElement | null>(null);
const stage = ref<HTMLElement | null>(null);
const thumbnailRail = ref<HTMLElement | null>(null);
const activeIndex = ref(0);
const isFullscreen = ref(false);
const touchStartX = ref<number | null>(null);
const activeHotspot = ref<SpaceGalleryHotspot | null>(null);
const hotspotTrigger = ref<HTMLButtonElement | null>(null);
let previousBodyOverflow = "";

const images = computed<readonly SpaceGalleryImage[]>(
  () => props.space?.gallery ?? [],
);
const activeImage = computed<SpaceGalleryImage | undefined>(
  () => images.value[activeIndex.value] ?? images.value[0],
);
const seriesLabel = computed(() =>
  activeImage.value?.series.map((series) => spaceSeriesLabels[series]).join(" / ") ?? "",
);

function restorePageState(): void {
  document.body.style.overflow = previousBodyOverflow;
  window.requestAnimationFrame(() => props.returnFocusTo?.focus());
}

function closeDialog(): void {
  if (stage.value && document.fullscreenElement === stage.value) {
    void document.exitFullscreen()
      .catch(() => undefined)
      .finally(() => {
        if (dialog.value?.open) {
          dialog.value.close();
        }
      });
    return;
  }
  if (dialog.value?.open) {
    dialog.value.close();
  }
}

function syncFullscreenState(): void {
  isFullscreen.value = stage.value !== null && document.fullscreenElement === stage.value;
}

async function toggleFullscreen(): Promise<void> {
  try {
    if (stage.value && document.fullscreenElement === stage.value) {
      await document.exitFullscreen();
    } else if (stage.value?.requestFullscreen) {
      await stage.value.requestFullscreen();
    }
  } catch {
    isFullscreen.value = false;
  }
}

function handleClosed(): void {
  activeHotspot.value = null;
  hotspotTrigger.value = null;
  restorePageState();
  emit("close");
}

function openHotspot(
  hotspot: SpaceGalleryHotspot,
  trigger: HTMLButtonElement,
): void {
  activeHotspot.value = hotspot;
  hotspotTrigger.value = trigger;
}

async function closeHotspot(): Promise<void> {
  const trigger = hotspotTrigger.value;
  activeHotspot.value = null;
  hotspotTrigger.value = null;
  await nextTick();
  trigger?.focus();
}

function showImage(index: number): void {
  if (images.value.length === 0) {
    return;
  }
  activeHotspot.value = null;
  hotspotTrigger.value = null;
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
  if (activeHotspot.value || images.value.length < 2) {
    return;
  }
  navigateWithWheel(event);
}

function handleKeydown(event: KeyboardEvent): void {
  if (activeHotspot.value) {
    if (event.key === "Escape") {
      event.preventDefault();
      void closeHotspot();
    }
    return;
  }
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    showPrevious();
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    showNext();
  } else if (event.key === "Escape") {
    event.preventDefault();
    closeDialog();
  }
}

function handleTouchStart(event: TouchEvent): void {
  if (activeHotspot.value) {
    return;
  }
  touchStartX.value = event.changedTouches[0]?.clientX ?? null;
}

function handleTouchEnd(event: TouchEvent): void {
  if (activeHotspot.value) {
    return;
  }
  const endX = event.changedTouches[0]?.clientX;
  if (touchStartX.value === null || endX === undefined) {
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
  if (total < 2) {
    return;
  }
  const adjacentIndexes = [
    (activeIndex.value - 1 + total) % total,
    (activeIndex.value + 1) % total,
  ];
  adjacentIndexes.forEach((index) => {
    const source = images.value[index]?.src;
    if (source) {
      const preload = new Image();
      preload.src = source;
    }
  });
}

watch(
  () => props.space,
  async (space) => {
    if (!space) {
      closeDialog();
      return;
    }
    activeIndex.value = 0;
    activeHotspot.value = null;
    hotspotTrigger.value = null;
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    await nextTick();
    if (dialog.value && !dialog.value.open) {
      dialog.value.showModal();
    }
    preloadAdjacentImages();
  },
  { immediate: true },
);

watch(activeIndex, async () => {
  activeHotspot.value = null;
  hotspotTrigger.value = null;
  preloadAdjacentImages();
  await nextTick();
  thumbnailRail.value
    ?.querySelector<HTMLElement>(`[data-image-index="${activeIndex.value}"]`)
    ?.scrollIntoView({ behavior: "auto", block: "nearest", inline: "center" });
});

onMounted(() => {
  document.addEventListener("fullscreenchange", syncFullscreenState);
});

onBeforeUnmount(() => {
  document.removeEventListener("fullscreenchange", syncFullscreenState);
  if (dialog.value?.open) {
    dialog.value.close();
  }
  restorePageState();
});
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialog"
      class="space-gallery"
      aria-modal="true"
      :aria-labelledby="space ? `space-gallery-title-${space.id}` : undefined"
      @cancel.prevent="closeDialog"
      @close="handleClosed"
      @keydown="handleKeydown"
    >
      <div v-if="space && activeImage" class="space-gallery__surface">
        <header class="space-gallery__header">
          <div class="space-gallery__heading">
            <p>{{ space.titleZh }}</p>
            <h2 :id="`space-gallery-title-${space.id}`" class="bank">
              {{ space.titleRu }}
            </h2>
          </div>
          <div class="space-gallery__status">
            <span class="space-gallery__series">{{ seriesLabel }}</span>
            <span class="space-gallery__counter bank">
              {{ activeIndex + 1 }} / {{ images.length }}
            </span>
          </div>
          <button
            class="space-gallery__fullscreen"
            type="button"
            :aria-label="isFullscreen ? '退出原图全屏' : '原图全屏显示'"
            :title="isFullscreen ? '退出全屏' : '原图全屏'"
            @click="toggleFullscreen"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                v-if="!isFullscreen"
                d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"
              />
              <path
                v-else
                d="M9 4v5H4M20 9h-5V4M15 20v-5h5M4 15h5v5"
              />
            </svg>
          </button>
          <button
            class="space-gallery__close"
            type="button"
            :aria-label="`关闭${space.titleZh}图片轮播`"
            autofocus
            @click="closeDialog"
          >
            <span />
            <span />
          </button>
        </header>

        <main
          ref="stage"
          class="space-gallery__stage"
          @click.self="closeDialog"
          @wheel="handleWheel"
          @touchstart.passive="handleTouchStart"
          @touchend.passive="handleTouchEnd"
        >
          <SpaceHotspotImage
            :key="activeImage.id"
            :image="activeImage"
            @open-hotspot="openHotspot"
          />

          <template v-if="images.length > 1">
            <button
              class="space-gallery__arrow space-gallery__arrow--previous"
              type="button"
              :aria-label="`查看${space.titleZh}上一张图片`"
              @click="showPrevious"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m15 5-7 7 7 7" />
              </svg>
            </button>
            <button
              class="space-gallery__arrow space-gallery__arrow--next"
              type="button"
              :aria-label="`查看${space.titleZh}下一张图片`"
              @click="showNext"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m9 5 7 7-7 7" />
              </svg>
            </button>
          </template>

          <SpaceHotspotDetails
            v-if="activeHotspot"
            :hotspot="activeHotspot"
            @close="closeHotspot"
          />
        </main>

        <nav
          v-if="images.length > 1"
          ref="thumbnailRail"
          class="space-gallery__thumbnails"
          :aria-label="`${space.titleZh}图片缩略图`"
        >
          <button
            v-for="(image, index) in images"
            :key="image.id"
            class="space-gallery__thumbnail"
            :class="{ 'is-active': activeIndex === index }"
            type="button"
            :data-image-index="index"
            :aria-label="`查看${space.titleZh}第 ${index + 1} 张图片`"
            :aria-pressed="activeIndex === index"
            @click="showImage(index)"
          >
            <img :src="image.thumbnail" :alt="image.alt" loading="lazy" />
          </button>
        </nav>
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped>
.space-gallery {
  box-sizing: border-box;
  width: 100vw;
  max-width: none;
  height: 100dvh;
  max-height: none;
  overflow: hidden;
  padding: 0;
  border: 0;
  margin: 0;
  background: transparent;
  color: #fff;
}

.space-gallery::backdrop {
  background: rgb(13 10 9 / 96%);
  backdrop-filter: blur(6px);
}

.space-gallery__surface {
  display: grid;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 clamp(16px, 2.5vw, 42px) clamp(14px, 2.2vh, 24px);
  background:
    radial-gradient(circle at 18% 12%, rgb(188 148 128 / 12%), transparent 35%),
    #171311;
  grid-template-rows: clamp(82px, 11vh, 112px) minmax(0, 1fr) clamp(82px, 13vh, 122px);
}

.space-gallery__header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  border-bottom: 1px solid rgb(255 255 255 / 10%);
  padding-right: 124px;
}

.space-gallery__heading p,
.space-gallery__heading h2 {
  margin: 0;
  font-weight: 400;
}

.space-gallery__heading p {
  font-size: clamp(19px, 1.55vw, 28px);
  letter-spacing: 0.2em;
}

.space-gallery__heading h2 {
  margin-top: 7px;
  color: rgb(255 255 255 / 54%);
  font-size: clamp(11px, 0.78vw, 14px);
  letter-spacing: 0.14em;
}

.space-gallery__status {
  display: flex;
  align-items: center;
  gap: 22px;
}

.space-gallery__series {
  padding: 7px 12px;
  border: 1px solid rgb(188 148 128 / 46%);
  color: #d4b09e;
  font-size: 11px;
  letter-spacing: 0.12em;
}

.space-gallery__counter {
  color: rgb(255 255 255 / 74%);
  font-size: 14px;
  letter-spacing: 0.14em;
}

.space-gallery__fullscreen,
.space-gallery__close {
  position: absolute;
  top: 50%;
  right: 0;
  width: 48px;
  height: 48px;
  padding: 0;
  background: transparent;
  color: #fff;
  cursor: pointer;
  opacity: 0.72;
  transform: translateY(-50%);
  transition: opacity 0.3s ease;
}

.space-gallery__fullscreen {
  right: 56px;
  display: grid;
  border: 1px solid rgb(255 255 255 / 22%);
  place-items: center;
}

.space-gallery__fullscreen svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: currentcolor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.35;
}

.space-gallery__fullscreen:hover,
.space-gallery__fullscreen:focus-visible,
.space-gallery__close:hover,
.space-gallery__close:focus-visible {
  outline: none;
  opacity: 1;
}

.space-gallery__fullscreen:hover,
.space-gallery__fullscreen:focus-visible {
  border-color: var(--nydk-rosewood);
  rotate: none;
}

.space-gallery__close span {
  position: absolute;
  top: 23px;
  left: 8px;
  width: 32px;
  height: 1px;
  background: currentcolor;
}

.space-gallery__close span:first-child {
  transform: rotate(45deg);
}

.space-gallery__close span:last-child {
  transform: rotate(-45deg);
}

.space-gallery__stage {
  position: relative;
  display: grid;
  box-sizing: border-box;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  place-items: center;
}

.space-gallery__stage:fullscreen {
  width: 100vw;
  height: 100vh;
  padding: max(10px, env(safe-area-inset-top)) max(10px, env(safe-area-inset-right))
    max(10px, env(safe-area-inset-bottom)) max(10px, env(safe-area-inset-left));
  background: #0d0a09;
}

.space-gallery__arrow {
  position: absolute;
  top: 50%;
  display: grid;
  width: 52px;
  height: 52px;
  padding: 0;
  border: 1px solid rgb(255 255 255 / 24%);
  border-radius: 50%;
  background: rgb(35 24 21 / 64%);
  color: #fff;
  cursor: pointer;
  place-items: center;
  transform: translateY(-50%);
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.space-gallery__arrow:hover,
.space-gallery__arrow:focus-visible {
  border-color: var(--nydk-rosewood);
  background: var(--nydk-rosewood);
  outline: none;
}

.space-gallery__arrow svg {
  width: 21px;
  height: 21px;
  fill: none;
  stroke: currentcolor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.5;
}

.space-gallery__arrow--previous {
  left: 8px;
}

.space-gallery__arrow--next {
  right: 8px;
}

.space-gallery__thumbnails {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 10px;
  overflow-x: auto;
  padding: 15px 8px 3px;
  scrollbar-width: none;
}

.space-gallery__thumbnails::-webkit-scrollbar {
  display: none;
}

.space-gallery__thumbnail {
  width: 128px;
  height: 78px;
  flex: 0 0 auto;
  overflow: hidden;
  padding: 0;
  border: 2px solid transparent;
  background: #0f0c0b;
  cursor: pointer;
  opacity: 0.42;
  transition:
    border-color 0.3s ease,
    opacity 0.3s ease;
}

.space-gallery__thumbnail:hover,
.space-gallery__thumbnail:focus-visible,
.space-gallery__thumbnail.is-active {
  border-color: var(--nydk-rosewood);
  outline: none;
  opacity: 1;
}

.space-gallery__thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 998px) {
  .space-gallery__surface {
    padding: 0 14px max(10px, env(safe-area-inset-bottom));
    grid-template-rows: 88px minmax(0, 1fr) 88px;
  }

  .space-gallery__header {
    gap: 10px;
    padding-right: 86px;
  }

  .space-gallery__heading p {
    font-size: 19px;
  }

  .space-gallery__heading h2 {
    max-width: 48vw;
    overflow: hidden;
    font-size: 10px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .space-gallery__status {
    align-items: flex-end;
    flex-direction: column;
    gap: 6px;
  }

  .space-gallery__series {
    padding: 4px 7px;
    font-size: 9px;
  }

  .space-gallery__counter {
    font-size: 11px;
  }

  .space-gallery__fullscreen,
  .space-gallery__close {
    width: 40px;
    height: 40px;
  }

  .space-gallery__fullscreen {
    right: 42px;
  }

  .space-gallery__close span {
    top: 19px;
    width: 24px;
  }

  .space-gallery__arrow {
    width: 40px;
    height: 40px;
  }

  .space-gallery__arrow--previous {
    left: 3px;
  }

  .space-gallery__arrow--next {
    right: 3px;
  }

  .space-gallery__thumbnails {
    gap: 8px;
    padding-inline: 2px;
  }

  .space-gallery__thumbnail {
    width: 98px;
    height: 60px;
  }
}

@media (max-width: 520px) {
  .space-gallery__surface {
    grid-template-rows: 82px minmax(0, 1fr) 80px;
  }

  .space-gallery__heading p {
    font-size: 17px;
  }

  .space-gallery__series {
    max-width: 110px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .space-gallery__arrow {
    width: 36px;
    height: 36px;
  }

  .space-gallery__thumbnail {
    width: 88px;
    height: 54px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .space-gallery__close,
  .space-gallery__fullscreen,
  .space-gallery__arrow,
  .space-gallery__thumbnail {
    transition: none;
  }
}
</style>
