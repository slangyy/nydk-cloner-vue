<script setup lang="ts">
import { computed, ref, watch } from "vue";

import type { FinishedSpace } from "@/types/products";

const props = defineProps<{
  readonly spaces: readonly FinishedSpace[];
  readonly seriesLabel: string;
}>();

const currentIndex = ref(0);

const currentSpace = computed(() => props.spaces[currentIndex.value]);
const trackStyle = computed(() => ({
  "--space-count": Math.max(props.spaces.length, 1),
}));
const indicatorStyle = computed(() => ({
  transform: `translateX(${currentIndex.value * 100}%)`,
}));

watch(
  () => props.spaces,
  () => {
    currentIndex.value = 0;
  },
);

function selectSpace(index: number): void {
  currentIndex.value = index;
}

function previousSpace(): void {
  if (props.spaces.length === 0) return;
  currentIndex.value =
    (currentIndex.value - 1 + props.spaces.length) % props.spaces.length;
}

function nextSpace(): void {
  if (props.spaces.length === 0) return;
  currentIndex.value = (currentIndex.value + 1) % props.spaces.length;
}
</script>

<template>
  <section class="finished-space" :aria-label="`${seriesLabel}空间展示`">
    <div v-if="currentSpace" class="finished-space__stage">
      <img
        v-for="(space, index) in spaces"
        :key="space.id"
        class="finished-space__image"
        :class="{ 'is-active': index === currentIndex }"
        :src="space.image"
        :alt="`${seriesLabel}${space.title}`"
        :aria-hidden="index === currentIndex ? undefined : 'true'"
      />
      <span class="finished-space__shade" aria-hidden="true" />

      <Transition name="finished-space-copy" mode="out-in">
        <div :key="currentSpace.id" class="finished-space__heading">
          <p class="finished-space__english bank">
            {{ currentSpace.english }}
          </p>
          <h2>{{ currentSpace.title }}</h2>
        </div>
      </Transition>

      <div class="finished-space__rail">
        <button
          class="finished-space__arrow finished-space__arrow--previous"
          type="button"
          aria-label="上一个空间"
          @click="previousSpace"
        >
          <svg viewBox="0 0 24 40" aria-hidden="true">
            <path d="M18 3 4 20l14 17" />
          </svg>
        </button>

        <div class="finished-space__viewport">
          <div class="finished-space__track" :style="trackStyle">
            <span
              class="finished-space__indicator"
              :style="indicatorStyle"
              aria-hidden="true"
            />
            <button
              v-for="(space, index) in spaces"
              :key="space.id"
              class="finished-space__option"
              :class="{ 'is-active': index === currentIndex }"
              type="button"
              :aria-pressed="index === currentIndex"
              :aria-label="`切换到${space.title}`"
              @mouseenter="selectSpace(index)"
              @focus="selectSpace(index)"
              @click="selectSpace(index)"
            >
              <img :src="space.icon" alt="" aria-hidden="true" />
              <span>{{ space.title }}</span>
            </button>
          </div>
        </div>

        <button
          class="finished-space__arrow finished-space__arrow--next"
          type="button"
          aria-label="下一个空间"
          @click="nextSpace"
        >
          <svg viewBox="0 0 24 40" aria-hidden="true">
            <path d="m6 3 14 17L6 37" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.finished-space {
  width: 100%;
  background: #3c312f;
}

.finished-space__stage {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #3c312f;
}

.finished-space__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.8s ease-in-out;
}

.finished-space__image.is-active {
  opacity: 1;
}

.finished-space__shade {
  position: absolute;
  z-index: 2;
  inset: 0;
  background:
    linear-gradient(
      0deg,
      rgb(20 12 9 / 48%) 0%,
      rgb(20 12 9 / 18%) 19%,
      rgb(20 12 9 / 3%) 40%
    ),
    rgb(20 12 9 / 14%);
  pointer-events: none;
}

.finished-space__heading {
  position: absolute;
  z-index: 4;
  top: 39%;
  left: 50%;
  color: #fff;
  text-align: center;
  transform: translate(-50%, -50%);
}

.finished-space__english,
.finished-space__heading h2 {
  margin: 0;
  font-weight: 400;
}

.finished-space__english {
  font-size: clamp(28px, 2.5vw, 48px);
  letter-spacing: 0.12em;
  line-height: 1.2;
  white-space: nowrap;
}

.finished-space__heading h2 {
  margin-top: 16px;
  font-size: clamp(24px, 1.9vw, 36px);
  letter-spacing: 0.22em;
  line-height: 1.35;
  text-indent: 0.22em;
}

.finished-space-copy-enter-active,
.finished-space-copy-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.finished-space-copy-enter-from,
.finished-space-copy-leave-to {
  opacity: 0;
  transform: translate(-50%, calc(-50% + 10px));
}

.finished-space__rail {
  position: absolute;
  z-index: 5;
  right: 3.6%;
  bottom: 2.6%;
  left: 3.6%;
  display: flex;
  height: clamp(90px, 8vw, 126px);
  align-items: center;
  gap: clamp(12px, 1.5vw, 30px);
}

.finished-space__viewport {
  min-width: 0;
  height: 100%;
  flex: 1;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
}

.finished-space__viewport::-webkit-scrollbar {
  display: none;
}

.finished-space__track {
  position: relative;
  display: grid;
  width: 100%;
  min-width: 100%;
  height: 100%;
  grid-template-columns: repeat(var(--space-count), minmax(0, 1fr));
}

.finished-space__indicator {
  position: absolute;
  z-index: 0;
  top: 0;
  bottom: 0;
  left: 0;
  width: calc(100% / var(--space-count));
  border-radius: 999px;
  background: rgb(188 148 128 / 58%);
  pointer-events: none;
  transition: transform 0.7s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.finished-space__option {
  position: relative;
  z-index: 1;
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 8px;
  border: 0;
  background: transparent;
  color: rgb(255 255 255 / 55%);
  cursor: pointer;
  gap: 8px;
  transition: color 0.45s ease;
}

.finished-space__option:hover,
.finished-space__option:focus-visible,
.finished-space__option.is-active {
  color: #fff;
  outline: none;
}

.finished-space__option img {
  width: clamp(50px, 4vw, 78px);
  height: clamp(38px, 3vw, 56px);
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.58;
  transition:
    opacity 0.45s ease,
    transform 0.45s ease;
}

.finished-space__option:hover img,
.finished-space__option:focus-visible img,
.finished-space__option.is-active img {
  opacity: 1;
  transform: translateY(-2px);
}

.finished-space__option span {
  font-size: clamp(13px, 0.9vw, 17px);
  line-height: 1;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.finished-space__arrow {
  display: grid;
  width: 34px;
  height: 58px;
  flex: 0 0 34px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #c79b84;
  cursor: pointer;
  opacity: 0.9;
  place-items: center;
  transition:
    color 0.3s ease,
    opacity 0.3s ease,
    transform 0.3s ease;
}

.finished-space__arrow svg {
  width: 16px;
  height: 30px;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.35;
}

.finished-space__arrow:hover,
.finished-space__arrow:focus-visible {
  color: #e2b9a4;
  opacity: 1;
  outline: none;
}

.finished-space__arrow--previous:hover,
.finished-space__arrow--previous:focus-visible {
  transform: translateX(-3px);
}

.finished-space__arrow--next:hover,
.finished-space__arrow--next:focus-visible {
  transform: translateX(3px);
}

@media (max-width: 998px) {
  .finished-space__stage {
    min-height: 560px;
    aspect-ratio: auto;
  }

  .finished-space__heading {
    top: 39%;
  }

  .finished-space__english {
    font-size: 24px;
  }

  .finished-space__heading h2 {
    margin-top: 12px;
    font-size: 20px;
  }

  .finished-space__rail {
    right: 10px;
    bottom: 12px;
    left: 10px;
    height: 86px;
    gap: 4px;
  }

  .finished-space__track {
    width: calc(var(--space-count) * 110px);
    min-width: calc(var(--space-count) * 110px);
    grid-template-columns: repeat(var(--space-count), 110px);
  }

  .finished-space__option {
    padding: 8px 6px;
  }

  .finished-space__option img {
    width: 48px;
    height: 37px;
  }

  .finished-space__option span {
    font-size: 12px;
  }

  .finished-space__arrow {
    width: 28px;
    height: 50px;
    flex-basis: 28px;
  }

  .finished-space__arrow svg {
    width: 13px;
    height: 26px;
  }
}

@media (max-width: 520px) {
  .finished-space__stage {
    min-height: 520px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .finished-space__image,
  .finished-space__indicator,
  .finished-space__option,
  .finished-space__option img,
  .finished-space__arrow,
  .finished-space-copy-enter-active,
  .finished-space-copy-leave-active {
    transition: none;
  }

  .finished-space__viewport {
    scroll-behavior: auto;
  }
}
</style>
