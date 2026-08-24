<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  ref,
  type CSSProperties,
  type ComponentPublicInstance,
} from "vue";

import FinishedCatalogGalleryDialog from "@/components/products/FinishedCatalogGalleryDialog.vue";
import { useReveal } from "@/composables/useReveal";
import type {
  FinishedCatalogGroup,
  FinishedCatalogImage,
} from "@/types/products";

const props = defineProps<{
  readonly groups: readonly FinishedCatalogGroup[];
}>();

const activeIndex = ref(0);
const productPage = ref(0);
const openGroup = ref<FinishedCatalogGroup | null>(null);
const openImageIndex = ref(0);
const galleryTrigger = ref<HTMLButtonElement | null>(null);
const navigationViewport = ref<HTMLElement | null>(null);
const { target, isVisible } = useReveal();
let navigationSettleTimer: number | undefined;
let isNavigationSettling = false;

const activeGroup = computed<FinishedCatalogGroup>(
  () => props.groups[activeIndex.value] ?? props.groups[0]!,
);
const isProductGroup = computed(() => activeGroup.value.mediaFit === "contain");
const productPageCount = computed(() =>
  Math.max(1, Math.ceil(activeGroup.value.gallery.length / 6)),
);
const visibleProducts = computed<readonly {
  readonly image: FinishedCatalogImage;
  readonly index: number;
}[]>(() => {
  if (!isProductGroup.value) {
    return [];
  }
  const start = productPage.value * 6;
  return activeGroup.value.gallery.slice(start, start + 6).map((image, offset) => ({
    image,
    index: start + offset,
  }));
});
const stageStyle = computed<CSSProperties>(() => {
  const group = activeGroup.value;
  const image = `url("${group.coverImage}")`;
  if (group.mediaFit === "cover") {
    return {
      backgroundImage: [
        "linear-gradient(90deg, rgb(24 15 12 / 56%) 0%, rgb(24 15 12 / 10%) 52%)",
        "linear-gradient(0deg, rgb(24 15 12 / 72%) 0%, rgb(24 15 12 / 12%) 40%)",
        image,
      ].join(", "),
    };
  }
  return {
    backgroundImage: [
      "radial-gradient(circle at 72% 36%, rgb(153 126 112 / 30%), transparent 33%)",
      "linear-gradient(135deg, #554841 0%, #251e1b 58%, #181310 100%)",
    ].join(", "),
  };
});

function setRevealTarget(element: Element | ComponentPublicInstance | null): void {
  target.value = element instanceof HTMLElement ? element : null;
}

async function centerTab(index: number): Promise<void> {
  isNavigationSettling = true;
  if (navigationSettleTimer !== undefined) {
    window.clearTimeout(navigationSettleTimer);
  }
  await nextTick();
  navigationViewport.value
    ?.querySelector<HTMLElement>(`[data-catalog-index="${index}"]`)
    ?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  navigationSettleTimer = window.setTimeout(() => {
    isNavigationSettling = false;
    navigationSettleTimer = undefined;
  }, 650);
}

function selectGroup(index: number, reveal = false): void {
  activeIndex.value = index;
  productPage.value = 0;
  if (reveal) {
    void centerTab(index);
  }
}

function selectProductPage(offset: number): void {
  productPage.value = (
    productPage.value + offset + productPageCount.value
  ) % productPageCount.value;
}

function handleTabPointerEnter(index: number): void {
  if (
    !isNavigationSettling
    && window.matchMedia("(hover: hover) and (pointer: fine)").matches
  ) {
    selectGroup(index);
  }
}

function selectAdjacentGroup(offset: number): void {
  const nextIndex = (activeIndex.value + offset + props.groups.length)
    % props.groups.length;
  selectGroup(nextIndex, true);
}

function showGallery(
  event: MouseEvent,
  group: FinishedCatalogGroup = activeGroup.value,
  initialIndex = 0,
): void {
  galleryTrigger.value = event.currentTarget instanceof HTMLButtonElement
    ? event.currentTarget
    : null;
  openGroup.value = group;
  openImageIndex.value = initialIndex;
}

function handleStageClick(event: MouseEvent): void {
  if (!isProductGroup.value) {
    showGallery(event);
  }
}

function closeGallery(): void {
  openGroup.value = null;
}

onBeforeUnmount(() => {
  if (navigationSettleTimer !== undefined) {
    window.clearTimeout(navigationSettleTimer);
  }
});
</script>

<template>
  <section
    :ref="setRevealTarget"
    class="finished-catalog-showcase reveal"
    :class="{
      'is-visible': isVisible,
      'is-product-group': isProductGroup,
    }"
    aria-labelledby="finished-catalog-showcase-title"
  >
    <div
      class="finished-catalog-showcase__stage"
      :class="`finished-catalog-showcase__stage--${activeGroup.mediaFit}`"
      :style="stageStyle"
      :aria-label="`${activeGroup.title} ${activeGroup.titleRu}`"
      @click.self="handleStageClick"
    >
      <div id="finished-catalog-showcase-title" class="finished-catalog-showcase__heading">
        <img
          class="finished-catalog-showcase__watermark"
          src="/assets/backgrounds/109cddbb-f0ab-4d85-b117-906b3cd928a9.png"
          alt=""
          aria-hidden="true"
          width="200"
          height="201"
        />
        <Transition name="finished-catalog-copy" mode="out-in">
          <div :key="activeGroup.id" class="finished-catalog-showcase__copy">
            <p class="finished-catalog-showcase__russian bank" lang="ru">
              {{ activeGroup.titleRu }}
            </p>
            <i class="finished-catalog-showcase__line" aria-hidden="true" />
            <h2 class="finished-catalog-showcase__title">
              {{ activeGroup.title }}
            </h2>
            <!-- <p class="finished-catalog-showcase__summary">
              {{ activeGroup.summary }}
            </p> -->
            <!-- <button
              class="finished-catalog-showcase__more"
              type="button"
              :aria-label="`打开${activeGroup.title}图库`"
              @click="showGallery($event, activeGroup, productPage * 6)"
            >
              <span aria-hidden="true">＋</span>
            </button> -->
          </div>
        </Transition>
      </div>

      <Transition name="finished-product-grid" mode="out-in">
        <div
          v-if="isProductGroup"
          :key="`${activeGroup.id}-${productPage}`"
          class="finished-catalog-showcase__product-area"
        >
          <div class="finished-catalog-showcase__product-grid">
            <button
              v-for="item in visibleProducts"
              :key="item.image.id"
              class="finished-catalog-showcase__product-card"
              type="button"
              :aria-label="`查看${item.image.alt}`"
              @click="showGallery($event, activeGroup, item.index)"
            >
              <img
                :src="item.image.thumbnail"
                :alt="item.image.alt"
                width="360"
                height="220"
                loading="lazy"
              />
            </button>
          </div>

          <div
            v-if="productPageCount > 1"
            class="finished-catalog-showcase__product-pagination"
            aria-label="产品分页"
          >
            <button
              type="button"
              :aria-label="`查看${activeGroup.title}上一页产品`"
              @click="selectProductPage(-1)"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m15 5-7 7 7 7" />
              </svg>
            </button>
            <span class="bank">{{ productPage + 1 }} / {{ productPageCount }}</span>
            <button
              type="button"
              :aria-label="`查看${activeGroup.title}下一页产品`"
              @click="selectProductPage(1)"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m9 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </Transition>

      <nav class="finished-catalog-showcase__navigation" aria-label="成品目录切换">
        <button
          type="button"
          class="finished-catalog-showcase__rail-button finished-catalog-showcase__rail-button--previous"
          aria-label="上一个成品目录"
          @click="selectAdjacentGroup(-1)"
        >
          <svg viewBox="0 0 24 40" aria-hidden="true">
            <path d="M18 3 4 20l14 17" />
          </svg>
        </button>

        <div ref="navigationViewport" class="finished-catalog-showcase__viewport">
          <div class="finished-catalog-showcase__track">
            <button
              v-for="(group, index) in groups"
              :key="group.id"
              type="button"
              class="finished-catalog-showcase__tab"
              :class="{ 'is-active': activeIndex === index }"
              :data-catalog-index="index"
              :aria-label="`切换至${group.title} ${group.titleRu}`"
              :aria-pressed="activeIndex === index"
              @mouseenter="handleTabPointerEnter(index)"
              @focus="selectGroup(index, true)"
              @click="selectGroup(index, true)"
            >
              <img
                class="finished-catalog-showcase__tab-icon"
                :src="group.icon"
                alt=""
                aria-hidden="true"
                width="80"
                height="56"
                loading="lazy"
              />
              <span class="finished-catalog-showcase__tab-title">
                {{ group.titleRu }}
              </span>
              <!-- <small class="finished-catalog-showcase__tab-russian bank" lang="ru">
                {{ group.titleRu }}
              </small> -->
            </button>
          </div>
        </div>

        <button
          type="button"
          class="finished-catalog-showcase__rail-button finished-catalog-showcase__rail-button--next"
          aria-label="下一个成品目录"
          @click="selectAdjacentGroup(1)"
        >
          <svg viewBox="0 0 24 40" aria-hidden="true">
            <path d="m6 3 14 17L6 37" />
          </svg>
        </button>
      </nav>
    </div>

    <FinishedCatalogGalleryDialog
      :group="openGroup"
      :initial-index="openImageIndex"
      :return-focus-to="galleryTrigger"
      @close="closeGallery"
    />
  </section>
</template>

<style scoped>
.finished-catalog-showcase {
  position: relative;
  width: 100%;
  aspect-ratio: 1.77 / 1;
  overflow: hidden;
  background: #251e1b;
  color: #fff;
}

.finished-catalog-showcase__stage {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
  cursor: zoom-in;
  background-color: #251e1b;
  background-repeat: no-repeat;
  background-position: center, center, center, center, center;
}

.finished-catalog-showcase__stage--contain {
  background-position: center, center;
  background-size: cover, cover;
}

.finished-catalog-showcase__stage--cover {
  background-size: cover, cover, cover;
}

.finished-catalog-showcase__heading {
  position: relative;
  z-index: 4;
  width: min(620px, 46vw);
  min-height: 300px;
  margin: 10% 0 0 5%;
  pointer-events: none;
}

.finished-catalog-showcase__stage--contain .finished-catalog-showcase__heading {
  width: min(430px, 29vw);
  margin-top: 12%;
}

.finished-catalog-showcase__watermark {
  position: absolute;
  z-index: -1;
  top: -50px;
  left: -2px;
  width: clamp(140px, 10.5vw, 215px);
  height: auto;
  object-fit: contain;
  opacity: 0.82;
}

.finished-catalog-showcase__copy {
  position: relative;
  z-index: 1;
}

.finished-catalog-showcase__russian {
  margin: 0;
  font-size: clamp(26px, 2.35vw, 42px);
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: 0.05em;
}

.finished-catalog-showcase__line {
  display: block;
  width: clamp(46px, 4.2vw, 66px);
  height: 3px;
  margin-block: 16px 15px;
  background: #fff;
}

.finished-catalog-showcase__title {
  margin: 0;
  font-size: clamp(26px, 2.25vw, 38px);
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.24em;
}

.finished-catalog-showcase__summary {
  max-width: 480px;
  margin: 16px 0 0;
  color: rgb(255 255 255 / 66%);
  font-size: clamp(11px, 0.8vw, 14px);
  line-height: 1.7;
}

.finished-catalog-showcase__more {
  display: grid;
  width: clamp(38px, 2.75vw, 56px);
  height: clamp(38px, 2.75vw, 56px);
  margin-top: clamp(24px, 2.5vw, 46px);
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: var(--nydk-rosewood);
  color: rgb(255 255 255 / 78%);
  cursor: pointer;
  pointer-events: auto;
  place-items: center;
  transition: background-color 0.35s ease, transform 0.35s ease;
}

.finished-catalog-showcase__more span {
  font-size: clamp(22px, 1.6vw, 30px);
  font-weight: 200;
  line-height: 1;
}

.finished-catalog-showcase__more:hover,
.finished-catalog-showcase__more:focus-visible {
  background: #c9a18e;
  outline: none;
  transform: rotate(90deg);
}

.finished-catalog-showcase__product-area {
  position: absolute;
  z-index: 3;
  top: 7%;
  right: 4.8%;
  bottom: calc(clamp(98px, 9.2vw, 142px) + 6%);
  display: grid;
  width: 63%;
  min-width: 0;
  min-height: 0;
  gap: clamp(8px, 1vw, 16px);
  grid-template-rows: minmax(0, 1fr) 36px;
}

.finished-catalog-showcase__product-grid {
  display: grid;
  min-width: 0;
  min-height: 0;
  gap: clamp(8px, 1.1vw, 18px);
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
}

.finished-catalog-showcase__product-card {
  position: relative;
  display: grid;
  min-width: 0;
  min-height: 0;
  padding: clamp(4px, 0.65vw, 10px);
  border: 0;
  background: transparent;
  color: #fff;
  cursor: zoom-in;
  place-items: center;
  transition: transform 0.3s ease;
}

.finished-catalog-showcase__product-card:hover,
.finished-catalog-showcase__product-card:focus-visible {
  outline: none;
  transform: translateY(-2px);
}

.finished-catalog-showcase__product-card img {
  display: block;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  object-fit: contain;
  filter: drop-shadow(0 14px 18px rgb(0 0 0 / 18%));
  transition: filter 0.3s ease, transform 0.3s ease;
}

.finished-catalog-showcase__product-card:hover img,
.finished-catalog-showcase__product-card:focus-visible img {
  filter: drop-shadow(0 18px 22px rgb(0 0 0 / 34%));
  transform: scale(1.02);
}

.finished-catalog-showcase__product-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  color: rgb(255 255 255 / 62%);
  font-size: 11px;
  letter-spacing: 0.12em;
}

.finished-catalog-showcase__product-pagination button {
  display: grid;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 50%;
  background: rgb(35 24 21 / 54%);
  color: #fff;
  cursor: pointer;
  place-items: center;
}

.finished-catalog-showcase__product-pagination button:hover,
.finished-catalog-showcase__product-pagination button:focus-visible {
  border-color: var(--nydk-rosewood);
  background: var(--nydk-rosewood);
  outline: none;
}

.finished-catalog-showcase__product-pagination svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentcolor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.5;
}

.finished-product-grid-enter-active,
.finished-product-grid-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.finished-product-grid-enter-from,
.finished-product-grid-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.finished-catalog-copy-enter-active,
.finished-catalog-copy-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.finished-catalog-copy-enter-from,
.finished-catalog-copy-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.finished-catalog-showcase__navigation {
  position: relative;
  z-index: 5;
  display: grid;
  height: clamp(98px, 9.2vw, 142px);
  flex: 0 0 auto;
  align-items: stretch;
  column-gap: clamp(12px, 1.5vw, 30px);
  margin: auto 3.6% 2.6%;
  grid-template-columns: 34px minmax(0, 1fr) 34px;
}

.finished-catalog-showcase__viewport {
  min-width: 0;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
}

.finished-catalog-showcase__viewport::-webkit-scrollbar {
  display: none;
}

.finished-catalog-showcase__track {
  --visible-catalog-count: 6;

  display: grid;
  width: calc(100% * 10 / var(--visible-catalog-count));
  min-width: calc(100% * 10 / var(--visible-catalog-count));
  height: 100%;
  grid-template-columns: repeat(10, minmax(0, 1fr));
}

.finished-catalog-showcase__tab {
  position: relative;
  display: flex;
  min-width: 0;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 7px 6px;
  border: 0;
  background: transparent;
  color: rgb(255 255 255 / 54%);
  cursor: pointer;
  isolation: isolate;
  scroll-snap-align: center;
  transition: color 0.45s ease;
}

.finished-catalog-showcase__tab::before {
  position: absolute;
  z-index: -1;
  inset: 0;
  border-radius: 999px;
  background: rgb(188 148 128 / 58%);
  content: "";
  opacity: 0;
  transform: scale(0.92);
  transition: opacity 0.45s ease, transform 0.45s ease;
}

.finished-catalog-showcase__tab:hover,
.finished-catalog-showcase__tab:focus-visible,
.finished-catalog-showcase__tab.is-active {
  color: #fff;
  outline: none;
}

.finished-catalog-showcase__tab.is-active::before {
  opacity: 1;
  transform: scale(1);
}

.finished-catalog-showcase__tab-icon {
  width: clamp(48px, 3.7vw, 66px);
  height: clamp(34px, 3vw, 50px);
  object-fit: contain;
  opacity: 0.72;
  transition: opacity 0.45s ease, transform 0.45s ease;
}

.finished-catalog-showcase__tab:hover .finished-catalog-showcase__tab-icon,
.finished-catalog-showcase__tab:focus-visible .finished-catalog-showcase__tab-icon,
.finished-catalog-showcase__tab.is-active .finished-catalog-showcase__tab-icon {
  opacity: 1;
  transform: translateY(-2px);
}

.finished-catalog-showcase__tab-title {
  margin-top: 4px;
  font-size: clamp(10px, 0.68vw, 13px);
  letter-spacing: 0.1em;
}

.finished-catalog-showcase__tab-russian {
  max-width: 100%;
  overflow: hidden;
  margin-top: 3px;
  font-size: clamp(7px, 0.52vw, 10px);
  font-weight: 400;
  letter-spacing: 0.02em;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.finished-catalog-showcase__rail-button {
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
  transition: color 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
}

.finished-catalog-showcase__rail-button:hover,
.finished-catalog-showcase__rail-button:focus-visible {
  color: #e2b9a4;
  outline: none;
  opacity: 1;
}

.finished-catalog-showcase__rail-button--previous:hover,
.finished-catalog-showcase__rail-button--previous:focus-visible {
  transform: translateX(-3px);
}

.finished-catalog-showcase__rail-button--next:hover,
.finished-catalog-showcase__rail-button--next:focus-visible {
  transform: translateX(3px);
}

.finished-catalog-showcase__rail-button svg {
  width: 16px;
  height: 30px;
  fill: none;
  stroke: currentcolor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.35;
}

@media (max-width: 998px) {
  .finished-catalog-showcase {
    min-height: clamp(440px, 76vw, 620px);
    aspect-ratio: auto;
  }

  .finished-catalog-showcase.is-product-group {
    min-height: 760px;
  }

  .finished-catalog-showcase__stage {
    min-height: inherit;
  }

  .finished-catalog-showcase__stage--contain {
    background-position: center, center;
    background-size: cover, cover;
  }

  .finished-catalog-showcase__heading {
    width: min(420px, 78vw);
    min-height: 220px;
    margin: 30px 0 0 5%;
  }

  .finished-catalog-showcase__stage--contain .finished-catalog-showcase__heading {
    width: min(580px, 88vw);
    min-height: 160px;
    margin-top: 26px;
  }

  .finished-catalog-showcase__product-area {
    top: 180px;
    right: 4%;
    bottom: 112px;
    left: 4%;
    width: auto;
  }

  .finished-catalog-showcase__watermark {
    top: -10px;
    width: clamp(92px, 18vw, 138px);
  }

  .finished-catalog-showcase__russian {
    font-size: clamp(18px, 3.8vw, 27px);
  }

  .finished-catalog-showcase__line {
    width: 42px;
    height: 2px;
    margin-block: 11px 10px;
  }

  .finished-catalog-showcase__title {
    font-size: clamp(19px, 3.7vw, 26px);
  }

  .finished-catalog-showcase__summary {
    max-width: min(430px, 72vw);
    margin-top: 11px;
    font-size: 10px;
  }

  .finished-catalog-showcase__more {
    width: 40px;
    height: 40px;
    margin-top: 18px;
  }

  .finished-catalog-showcase__navigation {
    height: 98px;
    column-gap: 4px;
    margin: auto 0 10px;
    grid-template-columns: 34px minmax(0, 1fr) 34px;
  }

  .finished-catalog-showcase__track {
    --visible-catalog-count: 4;
  }

  .finished-catalog-showcase__rail-button {
    width: 28px;
    height: 50px;
  }

  .finished-catalog-showcase__rail-button svg {
    width: 13px;
    height: 26px;
  }

  .finished-catalog-showcase__tab-icon {
    width: 50px;
    height: 38px;
  }

  .finished-catalog-showcase__tab-title {
    font-size: 10px;
  }

  .finished-catalog-showcase__tab-russian {
    font-size: clamp(7px, 1.2vw, 9px);
  }
}

@media (max-width: 520px) {
  .finished-catalog-showcase {
    min-height: 500px;
  }

  .finished-catalog-showcase.is-product-group {
    min-height: 680px;
  }

  .finished-catalog-showcase__heading {
    width: min(360px, 88vw);
  }

  .finished-catalog-showcase__stage--contain .finished-catalog-showcase__heading {
    min-height: 146px;
    margin: 18px 0 0 4%;
  }

  .finished-catalog-showcase__russian {
    max-width: 82vw;
    overflow: hidden;
    font-size: clamp(17px, 5vw, 22px);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .finished-catalog-showcase__title {
    font-size: clamp(19px, 5vw, 24px);
  }

  .finished-catalog-showcase__stage--contain {
    background-position: center, center;
    background-size: cover, cover;
  }

  .finished-catalog-showcase__stage--contain .finished-catalog-showcase__summary {
    max-width: 88vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .finished-catalog-showcase__stage--contain .finished-catalog-showcase__more {
    position: absolute;
    top: 50px;
    right: 0;
    margin-top: 0;
  }

  .finished-catalog-showcase__product-area {
    top: 170px;
    right: 3%;
    bottom: 106px;
    left: 3%;
    gap: 5px;
    grid-template-rows: minmax(0, 1fr) 32px;
  }

  .finished-catalog-showcase__product-grid {
    gap: 6px;
  }

  .finished-catalog-showcase__product-card {
    padding: 5px;
  }

  .finished-catalog-showcase__track {
    --visible-catalog-count: 3;
  }

  .finished-catalog-showcase__tab-icon {
    width: 46px;
    height: 34px;
  }

  .finished-catalog-showcase__tab-russian {
    font-size: 7px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .finished-catalog-showcase__stage,
  .finished-catalog-showcase__product-card,
  .finished-catalog-showcase__tab,
  .finished-catalog-showcase__tab::before,
  .finished-catalog-showcase__tab-icon,
  .finished-catalog-showcase__more,
  .finished-catalog-showcase__rail-button,
  .finished-product-grid-enter-active,
  .finished-product-grid-leave-active,
  .finished-catalog-copy-enter-active,
  .finished-catalog-copy-leave-active {
    transition: none;
  }

  .finished-catalog-showcase__viewport {
    scroll-behavior: auto;
  }
}
</style>
