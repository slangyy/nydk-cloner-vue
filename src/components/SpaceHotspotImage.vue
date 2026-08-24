<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  type CSSProperties,
  watch,
} from "vue";

import type { SpaceGalleryHotspot, SpaceGalleryImage } from "@/types/content";

const props = defineProps<{
  readonly image: SpaceGalleryImage;
}>();

const emit = defineEmits<{
  openHotspot: [hotspot: SpaceGalleryHotspot, trigger: HTMLButtonElement];
}>();

const host = ref<HTMLElement | null>(null);
const imageElement = ref<HTMLImageElement | null>(null);
const frameWidth = ref(0);
const frameHeight = ref(0);
let resizeObserver: ResizeObserver | undefined;

const frameStyle = computed<CSSProperties>(() => ({
  width: `${frameWidth.value}px`,
  height: `${frameHeight.value}px`,
  visibility: frameWidth.value > 0 && frameHeight.value > 0 ? "visible" : "hidden",
}));

function updateFrameSize(): void {
  const container = host.value;
  const image = imageElement.value;
  if (!container || !image || image.naturalWidth === 0 || image.naturalHeight === 0) {
    return;
  }

  const availableWidth = container.clientWidth;
  const availableHeight = container.clientHeight;
  if (availableWidth <= 0 || availableHeight <= 0) {
    return;
  }

  const aspectRatio = image.naturalWidth / image.naturalHeight;
  let width = availableWidth;
  let height = width / aspectRatio;
  if (height > availableHeight) {
    height = availableHeight;
    width = height * aspectRatio;
  }

  frameWidth.value = width;
  frameHeight.value = height;
}

function handleImageLoad(): void {
  updateFrameSize();
}

function openHotspot(hotspot: SpaceGalleryHotspot, event: MouseEvent): void {
  if (event.currentTarget instanceof HTMLButtonElement) {
    emit("openHotspot", hotspot, event.currentTarget);
  }
}

watch(
  () => props.image.id,
  async () => {
    frameWidth.value = 0;
    frameHeight.value = 0;
    await nextTick();
    updateFrameSize();
  },
);

onMounted(() => {
  if (host.value) {
    resizeObserver = new ResizeObserver(updateFrameSize);
    resizeObserver.observe(host.value);
  }
  updateFrameSize();
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
});
</script>

<template>
  <div ref="host" class="space-hotspot-image">
    <div class="space-hotspot-image__frame" :style="frameStyle">
      <img
        ref="imageElement"
        class="space-hotspot-image__asset"
        :src="image.src"
        :alt="image.alt"
        decoding="async"
        @load="handleImageLoad"
      />

      <button
        v-for="hotspot in image.children ?? []"
        :key="hotspot.id"
        class="space-hotspot-image__anchor"
        type="button"
        :style="{
          left: `${hotspot.position.x}%`,
          top: `${hotspot.position.y}%`,
        }"
        :aria-label="`${hotspot.label}，查看 ${hotspot.images.length} 张详情图`"
        @click.stop="openHotspot(hotspot, $event)"
      >
        <span class="space-hotspot-image__pulse" aria-hidden="true">
          <i />
        </span>
        <span class="space-hotspot-image__label">{{ hotspot.label }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.space-hotspot-image {
  display: grid;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  place-items: center;
}

.space-hotspot-image__frame {
  position: relative;
  max-width: 100%;
  max-height: 100%;
}

.space-hotspot-image__asset {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  animation: space-hotspot-image-in 0.42s ease both;
}

.space-hotspot-image__anchor {
  position: absolute;
  z-index: 2;
  display: grid;
  min-width: 48px;
  min-height: 62px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #fff;
  cursor: pointer;
  place-items: center;
  transform: translate(-50%, -50%);
}

.space-hotspot-image__pulse {
  position: relative;
  display: grid;
  width: 34px;
  height: 34px;
  border: 1px solid rgb(255 255 255 / 82%);
  border-radius: 50%;
  background: rgb(255 255 255 / 14%);
  box-shadow:
    0 0 8px rgb(255 255 255 / 72%),
    0 0 20px rgb(255 255 255 / 42%);
  place-items: center;
}

.space-hotspot-image__pulse::before,
.space-hotspot-image__pulse::after {
  position: absolute;
  inset: -1px;
  border: 1px solid rgb(255 255 255 / 64%);
  border-radius: 50%;
  animation: space-hotspot-pulse 2.1s ease-out infinite;
  content: "";
}

.space-hotspot-image__pulse::after {
  animation-delay: 0.7s;
}

.space-hotspot-image__pulse i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 8px #fff;
}

.space-hotspot-image__label {
  margin-top: 4px;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.18em;
  line-height: 1;
  text-indent: 0.18em;
  text-shadow: 0 1px 5px rgb(0 0 0 / 82%);
  white-space: nowrap;
}

.space-hotspot-image__anchor:hover,
.space-hotspot-image__anchor:focus-visible {
  outline: none;
}

.space-hotspot-image__anchor:hover .space-hotspot-image__pulse,
.space-hotspot-image__anchor:focus-visible .space-hotspot-image__pulse {
  background: rgb(188 148 128 / 70%);
  box-shadow:
    0 0 10px rgb(255 255 255 / 92%),
    0 0 24px rgb(188 148 128 / 72%);
}

@keyframes space-hotspot-pulse {
  from {
    opacity: 0.8;
    transform: scale(0.75);
  }

  to {
    opacity: 0;
    transform: scale(1.75);
  }
}

@keyframes space-hotspot-image-in {
  from {
    opacity: 0.15;
    transform: scale(0.995);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (max-width: 520px) {
  .space-hotspot-image__anchor {
    min-width: 44px;
    min-height: 56px;
  }

  .space-hotspot-image__pulse {
    width: 30px;
    height: 30px;
  }

  .space-hotspot-image__label {
    font-size: 9px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .space-hotspot-image__asset,
  .space-hotspot-image__pulse::before,
  .space-hotspot-image__pulse::after {
    animation: none;
  }
}
</style>
