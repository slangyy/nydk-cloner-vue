<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";

import { useWheelNavigation } from "@/composables/useWheelNavigation";
import type {
  FinishedCatalogGroup,
  FinishedCatalogImage,
} from "@/types/products";

const props = defineProps<{
  readonly group: FinishedCatalogGroup | null;
  readonly initialIndex: number;
  readonly returnFocusTo: HTMLButtonElement | null;
}>();

const emit = defineEmits<{
  close: [];
}>();

const dialog = ref<HTMLDialogElement | null>(null);
const surface = ref<HTMLElement | null>(null);
const thumbnailRail = ref<HTMLElement | null>(null);
const activeIndex = ref(0);
const isFullscreen = ref(false);
const touchStartX = ref<number | null>(null);
let previousBodyOverflow = "";

const images = computed<readonly FinishedCatalogImage[]>(
  () => props.group?.gallery ?? [],
);
const activeImage = computed<FinishedCatalogImage | undefined>(
  () => images.value[activeIndex.value] ?? images.value[0],
);

function restorePageState(): void {
  document.body.style.overflow = previousBodyOverflow;
  window.requestAnimationFrame(() => props.returnFocusTo?.focus());
}

function closeDialog(): void {
  if (surface.value && document.fullscreenElement === surface.value) {
    void document.exitFullscreen()
      .catch(() => undefined)
      .finally(() => dialog.value?.close());
    return;
  }
  dialog.value?.close();
}

function handleClosed(): void {
  restorePageState();
  emit("close");
}

function showImage(index: number): void {
  if (images.value.length === 0) {
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

const { handleWheel } = useWheelNavigation(showPrevious, showNext);

function handleKeydown(event: KeyboardEvent): void {
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
  touchStartX.value = event.changedTouches[0]?.clientX ?? null;
}

function handleTouchEnd(event: TouchEvent): void {
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
  for (const index of [
    (activeIndex.value - 1 + total) % total,
    (activeIndex.value + 1) % total,
  ]) {
    const source = images.value[index]?.src;
    if (source) {
      const preload = new Image();
      preload.src = source;
    }
  }
}

function syncFullscreenState(): void {
  isFullscreen.value = surface.value !== null
    && document.fullscreenElement === surface.value;
}

async function toggleFullscreen(): Promise<void> {
  try {
    if (surface.value && document.fullscreenElement === surface.value) {
      await document.exitFullscreen();
    } else if (surface.value?.requestFullscreen) {
      await surface.value.requestFullscreen();
    }
  } catch {
    isFullscreen.value = false;
  }
}

watch(
  () => props.group,
  async (group) => {
    if (!group) {
      if (dialog.value?.open) {
        closeDialog();
      }
      return;
    }
    activeIndex.value = Math.min(
      Math.max(0, props.initialIndex),
      Math.max(0, group.gallery.length - 1),
    );
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
      class="finished-catalog-gallery"
      aria-modal="true"
      :aria-labelledby="group ? `finished-catalog-title-${group.id}` : undefined"
      @cancel.prevent="closeDialog"
      @close="handleClosed"
      @keydown="handleKeydown"
      @click.self="closeDialog"
    >
      <section
        v-if="group && activeImage"
        ref="surface"
        class="finished-catalog-gallery__surface"
      >
        <header class="finished-catalog-gallery__header">
          <div class="finished-catalog-gallery__heading">
            <p>成品系统</p>
            <h2 :id="`finished-catalog-title-${group.id}`">
              {{ group.title }}
            </h2>
          </div>
          <div class="finished-catalog-gallery__status">
            <span>{{ activeImage.sourceLabel }}</span>
            <b class="bank">{{ activeIndex + 1 }} / {{ images.length }}</b>
          </div>
          <button
            class="finished-catalog-gallery__fullscreen"
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
            class="finished-catalog-gallery__close"
            type="button"
            :aria-label="`关闭${group.title}图库`"
            autofocus
            @click="closeDialog"
          >
            <span />
            <span />
          </button>
        </header>

        <main
          class="finished-catalog-gallery__stage"
          :class="{
            'finished-catalog-gallery__stage--product': group.mediaFit === 'contain',
          }"
          @click.self="closeDialog"
          @wheel="images.length > 1 && handleWheel($event)"
          @touchstart.passive="handleTouchStart"
          @touchend.passive="handleTouchEnd"
        >
          <Transition name="finished-catalog-fade" mode="out-in">
            <img
              :key="activeImage.id"
              :src="activeImage.src"
              :alt="activeImage.alt"
              draggable="false"
            />
          </Transition>
          <template v-if="images.length > 1">
            <button
              class="finished-catalog-gallery__arrow finished-catalog-gallery__arrow--previous"
              type="button"
              :aria-label="`查看${group.title}上一张图片`"
              @click="showPrevious"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m15 5-7 7 7 7" />
              </svg>
            </button>
            <button
              class="finished-catalog-gallery__arrow finished-catalog-gallery__arrow--next"
              type="button"
              :aria-label="`查看${group.title}下一张图片`"
              @click="showNext"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m9 5 7 7-7 7" />
              </svg>
            </button>
          </template>
        </main>

        <nav
          v-if="images.length > 1"
          ref="thumbnailRail"
          class="finished-catalog-gallery__thumbnails"
          :aria-label="`${group.title}图片缩略图`"
        >
          <button
            v-for="(image, index) in images"
            :key="image.id"
            type="button"
            class="finished-catalog-gallery__thumbnail"
            :class="{ 'is-active': activeIndex === index }"
            :data-image-index="index"
            :aria-label="`查看${group.title}第 ${index + 1} 张图片`"
            :aria-pressed="activeIndex === index"
            @click="showImage(index)"
          >
            <img :src="image.thumbnail" :alt="image.alt" loading="lazy" />
          </button>
        </nav>
      </section>
    </dialog>
  </Teleport>
</template>

<style scoped>
.finished-catalog-gallery {
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

.finished-catalog-gallery::backdrop {
  background: rgb(13 10 9 / 96%);
  backdrop-filter: blur(6px);
}

.finished-catalog-gallery__surface {
  display: grid;
  width: 100%;
  height: 100%;
  padding: 0 clamp(16px, 2.5vw, 42px) clamp(12px, 2vh, 22px);
  background:
    radial-gradient(circle at 16% 10%, rgb(188 148 128 / 12%), transparent 34%),
    #171311;
  grid-template-rows: clamp(82px, 11vh, 112px) minmax(0, 1fr) clamp(82px, 13vh, 122px);
}

.finished-catalog-gallery__surface:fullscreen {
  padding-top: env(safe-area-inset-top);
  padding-right: max(16px, env(safe-area-inset-right));
  padding-bottom: max(12px, env(safe-area-inset-bottom));
  padding-left: max(16px, env(safe-area-inset-left));
}

.finished-catalog-gallery__header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-right: 118px;
  border-bottom: 1px solid rgb(255 255 255 / 10%);
}

.finished-catalog-gallery__heading p,
.finished-catalog-gallery__heading h2 {
  margin: 0;
  font-weight: 400;
}

.finished-catalog-gallery__heading p {
  font-size: clamp(11px, 0.8vw, 14px);
  letter-spacing: 0.18em;
  opacity: 0.52;
}

.finished-catalog-gallery__heading h2 {
  margin-top: 7px;
  font-size: clamp(19px, 1.55vw, 28px);
  letter-spacing: 0.16em;
}

.finished-catalog-gallery__status {
  display: flex;
  align-items: center;
  gap: 20px;
}

.finished-catalog-gallery__status span {
  padding: 7px 12px;
  border: 1px solid rgb(188 148 128 / 46%);
  color: #d4b09e;
  font-size: 11px;
  letter-spacing: 0.1em;
}

.finished-catalog-gallery__status b {
  color: rgb(255 255 255 / 74%);
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.14em;
}

.finished-catalog-gallery__fullscreen,
.finished-catalog-gallery__close {
  position: absolute;
  top: 50%;
  width: 46px;
  height: 46px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #fff;
  cursor: pointer;
  opacity: 0.72;
  transform: translateY(-50%);
  transition: opacity 0.25s ease;
}

.finished-catalog-gallery__fullscreen {
  right: 54px;
  display: grid;
  border: 1px solid rgb(255 255 255 / 22%);
  place-items: center;
}

.finished-catalog-gallery__fullscreen svg {
  width: 21px;
  height: 21px;
  fill: none;
  stroke: currentcolor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.35;
}

.finished-catalog-gallery__close {
  right: 0;
}

.finished-catalog-gallery__close span {
  position: absolute;
  top: 22px;
  left: 7px;
  width: 32px;
  height: 1px;
  background: currentcolor;
}

.finished-catalog-gallery__close span:first-child {
  transform: rotate(45deg);
}

.finished-catalog-gallery__close span:last-child {
  transform: rotate(-45deg);
}

.finished-catalog-gallery__fullscreen:hover,
.finished-catalog-gallery__fullscreen:focus-visible,
.finished-catalog-gallery__close:hover,
.finished-catalog-gallery__close:focus-visible {
  outline: none;
  opacity: 1;
}

.finished-catalog-gallery__stage {
  position: relative;
  display: grid;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  place-items: center;
}

.finished-catalog-gallery__stage > img {
  position: absolute;
  inset: 0;
  display: block;
  width: calc(100% - 120px);
  max-width: none;
  height: 100%;
  max-height: none;
  margin: auto;
  object-fit: contain;
  user-select: none;
}

.finished-catalog-gallery__stage--product > img {
  box-sizing: border-box;
  width: calc(100% - 160px);
  height: calc(100% - 28px);
  padding: clamp(14px, 2.2vw, 34px);
  border: 1px solid rgb(255 255 255 / 82%);
  background: #fff;
  box-shadow: 0 18px 46px rgb(0 0 0 / 28%);
}

.finished-catalog-gallery__arrow {
  position: absolute;
  top: 50%;
  display: grid;
  width: 50px;
  height: 50px;
  padding: 0;
  border: 1px solid rgb(255 255 255 / 24%);
  border-radius: 50%;
  background: rgb(35 24 21 / 68%);
  color: #fff;
  cursor: pointer;
  place-items: center;
  transform: translateY(-50%);
}

.finished-catalog-gallery__arrow--previous {
  left: 8px;
}

.finished-catalog-gallery__arrow--next {
  right: 8px;
}

.finished-catalog-gallery__arrow svg {
  width: 21px;
  height: 21px;
  fill: none;
  stroke: currentcolor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.5;
}

.finished-catalog-gallery__arrow:hover,
.finished-catalog-gallery__arrow:focus-visible {
  border-color: var(--nydk-rosewood);
  background: var(--nydk-rosewood);
  outline: none;
}

.finished-catalog-gallery__thumbnails {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 10px;
  overflow-x: auto;
  padding: 14px 8px 2px;
  scrollbar-width: none;
}

.finished-catalog-gallery__thumbnails::-webkit-scrollbar {
  display: none;
}

.finished-catalog-gallery__thumbnail {
  width: 128px;
  height: 78px;
  flex: 0 0 auto;
  overflow: hidden;
  padding: 0;
  border: 2px solid transparent;
  background: #0f0c0b;
  cursor: pointer;
  opacity: 0.42;
}

.finished-catalog-gallery__thumbnail:hover,
.finished-catalog-gallery__thumbnail:focus-visible,
.finished-catalog-gallery__thumbnail.is-active {
  border-color: var(--nydk-rosewood);
  outline: none;
  opacity: 1;
}

.finished-catalog-gallery__thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.finished-catalog-fade-enter-active,
.finished-catalog-fade-leave-active {
  transition: opacity 0.22s ease;
}

.finished-catalog-fade-enter-from,
.finished-catalog-fade-leave-to {
  opacity: 0;
}

@media (max-width: 998px) {
  .finished-catalog-gallery__surface {
    padding-inline: 14px;
    grid-template-rows: 86px minmax(0, 1fr) 86px;
  }

  .finished-catalog-gallery__header {
    gap: 8px;
    padding-right: 82px;
  }

  .finished-catalog-gallery__heading h2 {
    font-size: 18px;
  }

  .finished-catalog-gallery__status {
    align-items: flex-end;
    flex-direction: column;
    gap: 5px;
  }

  .finished-catalog-gallery__status span {
    max-width: 128px;
    overflow: hidden;
    padding: 4px 7px;
    font-size: 9px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .finished-catalog-gallery__status b {
    font-size: 11px;
  }

  .finished-catalog-gallery__fullscreen,
  .finished-catalog-gallery__close {
    width: 40px;
    height: 40px;
  }

  .finished-catalog-gallery__fullscreen {
    right: 42px;
  }

  .finished-catalog-gallery__close span {
    top: 19px;
    width: 25px;
  }

  .finished-catalog-gallery__stage > img {
    width: calc(100% - 76px);
  }

  .finished-catalog-gallery__stage--product > img {
    width: calc(100% - 88px);
    height: min(calc(100% - 20px), 74vw);
    padding: clamp(10px, 3.5vw, 22px);
  }

  .finished-catalog-gallery__arrow {
    width: 38px;
    height: 38px;
  }

  .finished-catalog-gallery__thumbnail {
    width: 96px;
    height: 60px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .finished-catalog-gallery__fullscreen,
  .finished-catalog-gallery__close,
  .finished-catalog-fade-enter-active,
  .finished-catalog-fade-leave-active {
    transition: none;
  }
}
</style>
