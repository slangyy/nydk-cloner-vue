<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  ref,
  watch,
} from "vue";

import type { CaseImage, CaseStudy } from "@/types/content";

const props = defineProps<{
  readonly caseStudy: CaseStudy | null;
  readonly returnFocusTo: HTMLButtonElement | null;
}>();

const emit = defineEmits<{
  close: [];
}>();

const dialog = ref<HTMLDialogElement | null>(null);
const thumbnailRail = ref<HTMLElement | null>(null);
const activeIndex = ref(0);
const touchStartX = ref<number | null>(null);
let previousBodyOverflow = "";

const images = computed<readonly CaseImage[]>(() => {
  if (!props.caseStudy) {
    return [];
  }

  return [props.caseStudy.cover, ...props.caseStudy.gallery];
});

const activeImage = computed<CaseImage | undefined>(
  () => images.value[activeIndex.value] ?? images.value[0],
);

const activePosition = computed(() =>
  images.value.length > 0 ? activeIndex.value + 1 : 0,
);

function restorePageState(): void {
  document.body.style.overflow = previousBodyOverflow;
  window.requestAnimationFrame(() => {
    props.returnFocusTo?.focus();
  });
}

function closeDialog(): void {
  if (dialog.value?.open) {
    dialog.value.close();
  }
}

function handleClosed(): void {
  restorePageState();
  emit("close");
}

function selectImage(index: number): void {
  activeIndex.value = index;
}

function showPrevious(): void {
  const total = images.value.length;

  if (total > 1) {
    activeIndex.value = (activeIndex.value - 1 + total) % total;
  }
}

function showNext(): void {
  const total = images.value.length;

  if (total > 1) {
    activeIndex.value = (activeIndex.value + 1) % total;
  }
}

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

function handleBackdropClick(event: MouseEvent): void {
  if (event.target === event.currentTarget) {
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

watch(
  () => props.caseStudy,
  async (caseStudy) => {
    if (!caseStudy) {
      closeDialog();
      return;
    }

    activeIndex.value = 0;
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    await nextTick();

    if (dialog.value && !dialog.value.open) {
      dialog.value.showModal();
    }
  },
  { immediate: true },
);

watch(activeIndex, async () => {
  await nextTick();
  const activeThumbnail = thumbnailRail.value?.querySelector<HTMLElement>(
    `[data-image-index="${activeIndex.value}"]`,
  );
  activeThumbnail?.scrollIntoView({
    behavior: "auto",
    block: "nearest",
    inline: "center",
  });
});

onBeforeUnmount(() => {
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
      class="case-gallery"
      aria-modal="true"
      aria-labelledby="case-gallery-title"
      aria-describedby="case-gallery-summary"
      @cancel.prevent="closeDialog"
      @close="handleClosed"
      @click="handleBackdropClick"
      @keydown="handleKeydown"
    >
      <div
        v-if="caseStudy && activeImage"
        class="case-gallery__surface"
      >
        <section class="case-gallery__viewer">
          <div class="case-gallery__topbar">
            <span class="case-gallery__counter bank">
              {{ activePosition }}/{{ images.length }}
            </span>
            <span v-if="activeImage.caption" class="case-gallery__caption">
              {{ activeImage.caption }}
            </span>
          </div>

          <div
            class="case-gallery__stage"
            @click.self="closeDialog"
            @touchstart.passive="handleTouchStart"
            @touchend.passive="handleTouchEnd"
          >
            <img
              :key="activeImage.src"
              class="case-gallery__image"
              :src="activeImage.src"
              :alt="activeImage.alt"
            />

            <template v-if="images.length > 1">
              <button
                class="case-gallery__arrow case-gallery__arrow--previous"
                type="button"
                aria-label="上一张图片"
                @click="showPrevious"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m15 5-7 7 7 7" />
                </svg>
              </button>
              <button
                class="case-gallery__arrow case-gallery__arrow--next"
                type="button"
                aria-label="下一张图片"
                @click="showNext"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m9 5 7 7-7 7" />
                </svg>
              </button>
            </template>
          </div>

          <div
            v-if="images.length > 1"
            ref="thumbnailRail"
            class="case-gallery__thumbnails"
            aria-label="案例图片缩略图"
          >
            <button
              v-for="(imageItem, index) in images"
              :key="imageItem.src"
              class="case-gallery__thumbnail"
              :class="{ 'is-active': activeIndex === index }"
              type="button"
              :data-image-index="index"
              :aria-label="`查看第 ${index + 1} 张图片`"
              :aria-pressed="activeIndex === index"
              @click="selectImage(index)"
            >
              <img :src="imageItem.src" :alt="imageItem.alt" loading="lazy" />
            </button>
          </div>
        </section>

        <aside class="case-gallery__information">
          <button
            class="case-gallery__close"
            type="button"
            aria-label="关闭案例图集"
            autofocus
            @click="closeDialog"
          >
            <span />
            <span />
          </button>

          <div class="case-gallery__information-inner">
            <p class="case-gallery__eyebrow bank">
              PROJECT CASE
            </p>
            <h2 id="case-gallery-title">
              {{ caseStudy.title }}
            </h2>

            <dl
              v-if="caseStudy.location || caseStudy.series"
              class="case-gallery__metadata"
            >
              <div v-if="caseStudy.location">
                <dt>项目地点</dt>
                <dd>{{ caseStudy.location }}</dd>
              </div>
              <div v-if="caseStudy.series">
                <dt>产品系列</dt>
                <dd>{{ caseStudy.series }}</dd>
              </div>
            </dl>

            <p id="case-gallery-summary" class="case-gallery__summary">
              {{ caseStudy.summary }}
            </p>

            <div v-if="caseStudy.tags.length" class="case-gallery__tags">
              <span v-for="tag in caseStudy.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>
        </aside>
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped>
.case-gallery {
  width: 100vw;
  max-width: none;
  height: 100dvh;
  max-height: none;
  padding: 0;
  border: 0;
  margin: 0;
  background: transparent;
  color: #fff;
}

.case-gallery::backdrop {
  background: rgb(20 15 13 / 94%);
  backdrop-filter: blur(5px);
}

.case-gallery__surface {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: minmax(0, 1fr) clamp(310px, 25vw, 430px);
  background: #211c1a;
}

.case-gallery__viewer {
  display: grid;
  min-width: 0;
  min-height: 0;
  padding: 24px 34px 26px;
  grid-template-rows: 44px minmax(0, 1fr) 96px;
}

.case-gallery__topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-inline: 12px;
}

.case-gallery__counter {
  font-size: 20px;
  letter-spacing: 0.08em;
}

.case-gallery__caption {
  overflow: hidden;
  color: rgb(255 255 255 / 58%);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.case-gallery__stage {
  position: relative;
  display: grid;
  min-height: 0;
  place-items: center;
  overflow: hidden;
}

.case-gallery__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  animation: case-image-in 0.45s ease both;
}

.case-gallery__arrow {
  position: absolute;
  top: 50%;
  display: grid;
  width: 52px;
  height: 52px;
  place-items: center;
  padding: 0;
  border: 1px solid rgb(255 255 255 / 24%);
  border-radius: 50%;
  background: rgb(35 24 21 / 66%);
  color: #fff;
  cursor: pointer;
  transform: translateY(-50%);
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.case-gallery__arrow:hover,
.case-gallery__arrow:focus-visible {
  border-color: var(--nydk-rosewood);
  background: var(--nydk-rosewood);
  outline: none;
}

.case-gallery__arrow svg {
  width: 20px;
  height: 20px;
  fill: none;
  stroke: currentcolor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.5;
}

.case-gallery__arrow--previous {
  left: 12px;
}

.case-gallery__arrow--next {
  right: 12px;
}

.case-gallery__thumbnails {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 12px;
  overflow-x: auto;
  padding: 13px 12px 2px;
  scrollbar-color: rgb(188 148 128 / 70%) transparent;
  scrollbar-width: thin;
}

.case-gallery__thumbnail {
  width: 116px;
  height: 67px;
  flex: 0 0 auto;
  overflow: hidden;
  padding: 0;
  border: 2px solid transparent;
  background: #15110f;
  cursor: pointer;
  opacity: 0.42;
  transition:
    border-color 0.3s ease,
    opacity 0.3s ease;
}

.case-gallery__thumbnail:hover,
.case-gallery__thumbnail:focus-visible,
.case-gallery__thumbnail.is-active {
  border-color: var(--nydk-rosewood);
  opacity: 1;
  outline: none;
}

.case-gallery__thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.case-gallery__information {
  position: relative;
  min-height: 0;
  overflow-y: auto;
  padding: clamp(92px, 10vh, 130px) clamp(32px, 3vw, 54px) 60px;
  background:
    linear-gradient(145deg, rgb(188 148 128 / 13%), transparent 48%),
    #302725;
}

.case-gallery__close {
  position: absolute;
  top: 28px;
  right: 30px;
  width: 44px;
  height: 44px;
  padding: 0;
  background: transparent;
  color: #fff;
  cursor: pointer;
  opacity: 0.72;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.case-gallery__close:hover,
.case-gallery__close:focus-visible {
  opacity: 1;
  outline: none;
  transform: rotate(90deg);
}

.case-gallery__close span {
  position: absolute;
  top: 21px;
  left: 8px;
  width: 28px;
  height: 1px;
  background: currentcolor;
}

.case-gallery__close span:first-child {
  transform: rotate(45deg);
}

.case-gallery__close span:last-child {
  transform: rotate(-45deg);
}

.case-gallery__information-inner {
  max-width: 330px;
}

.case-gallery__eyebrow {
  margin: 0 0 16px;
  color: var(--nydk-rosewood);
  font-size: 11px;
  letter-spacing: 0.22em;
}

.case-gallery__information h2 {
  margin: 0;
  font-size: clamp(27px, 2.15vw, 38px);
  font-weight: 400;
  letter-spacing: 0.08em;
  line-height: 1.45;
}

.case-gallery__metadata {
  display: grid;
  gap: 12px;
  padding: 28px 0;
  border-top: 1px solid rgb(255 255 255 / 12%);
  border-bottom: 1px solid rgb(255 255 255 / 12%);
  margin: 30px 0 0;
}

.case-gallery__metadata > div {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 14px;
}

.case-gallery__metadata dt {
  color: rgb(255 255 255 / 40%);
  font-size: 11px;
  letter-spacing: 0.08em;
}

.case-gallery__metadata dd {
  margin: 0;
  font-size: 13px;
  letter-spacing: 0.04em;
}

.case-gallery__summary {
  margin: 28px 0 0;
  color: rgb(255 255 255 / 72%);
  font-size: 13px;
  letter-spacing: 0.04em;
  line-height: 2;
}

.case-gallery__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  padding-top: 27px;
}

.case-gallery__tags span {
  padding: 7px 11px;
  background: rgb(255 255 255 / 8%);
  color: rgb(255 255 255 / 78%);
  font-size: 10px;
  letter-spacing: 0.06em;
}

@keyframes case-image-in {
  from {
    opacity: 0.2;
    transform: scale(0.995);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 998px) {
  .case-gallery__surface {
    display: block;
    overflow-y: auto;
  }

  .case-gallery__viewer {
    height: auto;
    min-height: 72dvh;
    padding: 12px 14px 18px;
    grid-template-rows: 38px minmax(340px, 58dvh) 82px;
  }

  .case-gallery__topbar {
    padding-inline: 4px 54px;
  }

  .case-gallery__counter {
    font-size: 16px;
  }

  .case-gallery__arrow {
    width: 42px;
    height: 42px;
  }

  .case-gallery__arrow--previous {
    left: 5px;
  }

  .case-gallery__arrow--next {
    right: 5px;
  }

  .case-gallery__thumbnails {
    gap: 8px;
    padding-inline: 4px;
  }

  .case-gallery__thumbnail {
    width: 96px;
    height: 57px;
  }

  .case-gallery__information {
    overflow: visible;
    min-height: 28dvh;
    padding: 48px 7% 70px;
  }

  .case-gallery__close {
    position: fixed;
    z-index: 3;
    top: 12px;
    right: 14px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgb(35 24 21 / 66%);
  }

  .case-gallery__close span {
    top: 19px;
    left: 8px;
    width: 24px;
  }

  .case-gallery__information-inner {
    max-width: 680px;
  }

  .case-gallery__information h2 {
    font-size: 27px;
  }
}

@media (max-width: 520px) {
  .case-gallery__viewer {
    min-height: 68dvh;
    grid-template-rows: 36px minmax(300px, 52dvh) 76px;
  }

  .case-gallery__caption {
    font-size: 10px;
  }

  .case-gallery__arrow {
    width: 36px;
    height: 36px;
  }

  .case-gallery__arrow svg {
    width: 17px;
    height: 17px;
  }

  .case-gallery__thumbnail {
    width: 86px;
    height: 51px;
  }

  .case-gallery__information {
    padding-top: 38px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .case-gallery__image {
    animation: none;
  }

  .case-gallery__arrow,
  .case-gallery__thumbnail,
  .case-gallery__close {
    transition: none;
  }
}
</style>
