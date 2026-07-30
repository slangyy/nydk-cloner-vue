<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

import SectionTitle from "@/components/SectionTitle.vue";
import ProductReveal from "@/components/products/ProductReveal.vue";
import type { ServiceStep } from "@/types/products";

const props = defineProps<{
  readonly steps: readonly ServiceStep[];
}>();

const activeIndex = ref(0);
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let cycleTimer: number | null = null;

function stopCycle(): void {
  if (cycleTimer !== null) {
    window.clearInterval(cycleTimer);
    cycleTimer = null;
  }
}

function startCycle(): void {
  stopCycle();

  if (prefersReducedMotion || props.steps.length < 2) {
    return;
  }

  cycleTimer = window.setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % props.steps.length;
  }, 3000);
}

function activate(index: number): void {
  stopCycle();
  activeIndex.value = index;
}

onMounted(startCycle);
onBeforeUnmount(stopCycle);
</script>

<template>
  <section class="service-process">
    <div class="service-process__title">
      <ProductReveal>
        <SectionTitle
          class="service-process__heading"
          english="SERVICE"
          chinese="服务流程"
          theme="dark"
          watermark-image="/assets/backgrounds/109cddbb-f0ab-4d85-b117-906b3cd928a9.png"
        />
        <span class="service-process__more" aria-hidden="true">
          <i></i>
          <i></i>
        </span>
      </ProductReveal>
    </div>

    <div class="service-process__orbit">
      <img
        class="service-process__orbit-image"
        src="/assets/products/service/fb659dea-a590-4b44-8b42-9be70e1de1aa.png"
        alt=""
        aria-hidden="true"
      />

      <ul class="service-process__steps">
        <li
          v-for="(step, index) in props.steps"
          :key="step.id"
          class="service-process__step"
          :class="{ 'service-process__step--active': activeIndex === index }"
        >
          <button
            type="button"
            :aria-pressed="activeIndex === index"
            :aria-label="`${step.number} ${step.title} ${step.subtitle}`"
            @mouseenter="activate(index)"
            @mouseleave="startCycle"
            @focus="activate(index)"
            @blur="startCycle"
            @click="activate(index)"
          >
            <span v-if="step.icon" class="service-process__step-image">
              <img :src="step.icon" :alt="`${step.title}${step.subtitle}`" />
            </span>
            <span class="service-process__step-number">{{ step.number }}</span>
            <span class="service-process__step-label">
              {{ step.title }}&nbsp; {{ step.subtitle }}
            </span>
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.service-process {
  position: relative;
  box-sizing: border-box;
  padding: 8vw 0;
  background:
    url("/assets/products/service/44b0c0d2-94a4-4c86-a696-9600ab687d34.jpg")
    center / cover no-repeat;
  color: #fff;
}

.service-process__title {
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  width: 30%;
  text-align: center;
  transform: translate(-50%, -50%);
}

.service-process__heading {
  min-height: 160px;
  justify-content: center;
  overflow: visible;
  padding: 0;
}

.service-process__heading :deep(.section-title__watermark--image) {
  width: 160px;
  height: 161px;
  opacity: 0.2;
}

.service-process__heading :deep(.section-title__english) {
  color: #fff;
  font-size: clamp(36px, 2.5vw, 48px);
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.08em;
}

.service-process__heading :deep(.section-title__line) {
  width: 70px;
  height: 2px;
  margin: 0 auto 14px;
  background: #fff;
}

.service-process__heading :deep(.section-title__chinese) {
  color: #fff;
  font-size: clamp(28px, 1.875vw, 36px);
  font-weight: 400;
  line-height: 1.5;
}

.service-process__more {
  position: relative;
  display: block;
  width: 44px;
  height: 44px;
  margin: 0 auto;
  border-radius: 50%;
  background: #bc9480;
  transition: transform 0.5s ease;
}

.service-process__more i {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 22px;
  height: 1px;
  background: #fff;
  transform: translate(-50%, -50%);
}

.service-process__more i:last-child {
  transform: translate(-50%, -50%) rotate(90deg);
}

.service-process__more:hover {
  transform: rotate(180deg);
}

.service-process__orbit {
  position: relative;
  width: 740px;
  height: 740px;
  margin: 0 auto;
}

.service-process__orbit-image {
  display: block;
  width: 100%;
  height: 100%;
}

.service-process__steps {
  padding: 0;
  margin: 0;
  list-style: none;
}

.service-process__step {
  position: absolute;
  width: 500px;
  transition: margin 0.3s ease;
}

.service-process__step button {
  display: flex;
  width: 100%;
  min-height: 100px;
  align-items: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: rgb(255 255 255 / 50%);
  cursor: pointer;
  font: inherit;
  font-size: 20px;
  line-height: 30px;
  text-align: left;
  transition: color 0.3s ease;
}

.service-process__step button:focus-visible {
  outline: 1px solid #bc9480;
  outline-offset: 6px;
}

.service-process__step-image {
  position: relative;
  display: block;
  width: 0;
  height: 100px;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 100px;
  transition:
    width 0.5s ease-in-out,
    height 0.5s ease-in-out,
    margin 0.5s ease-in-out;
}

.service-process__step-image img {
  position: absolute;
  inset: 0;
  display: block;
  width: 220px;
  height: 100%;
  max-width: none;
  object-fit: cover;
}

.service-process__step-number {
  margin: 0 5px 0 10px;
  white-space: nowrap;
}

.service-process__step-label {
  white-space: nowrap;
}

.service-process__step:hover button,
.service-process__step--active button {
  color: #bc9480;
}

.service-process__step:hover .service-process__step-image,
.service-process__step--active .service-process__step-image {
  width: 220px;
}

.service-process__step:nth-child(1) {
  top: -4.5%;
  left: 50%;
  transform: translateX(-50%);
}

.service-process__step:nth-child(1) button {
  flex-direction: column;
  text-align: center;
}

.service-process__step:nth-child(1) .service-process__step-number {
  width: 100%;
  order: 1;
  margin: 0;
}

.service-process__step:nth-child(1) .service-process__step-image {
  height: 10px;
  order: 2;
  margin: 10px 0;
}

.service-process__step:nth-child(1) .service-process__step-label {
  width: 100%;
  order: 3;
}

.service-process__step:nth-child(1):hover,
.service-process__step:nth-child(1).service-process__step--active {
  padding-bottom: 5%;
  margin-top: -5%;
}

.service-process__step:nth-child(1):hover .service-process__step-image,
.service-process__step:nth-child(1).service-process__step--active
  .service-process__step-image {
  height: 100px;
}

.service-process__step:nth-child(2) {
  top: 13.6%;
  left: 92%;
}

.service-process__step:nth-child(3) {
  top: 55%;
  left: 100%;
}

.service-process__step:nth-child(4) {
  top: 87.7%;
  left: 74%;
}

.service-process__step:nth-child(5) {
  top: 87.7%;
  right: 74%;
}

.service-process__step:nth-child(6) {
  top: 55%;
  right: 100%;
}

.service-process__step:nth-child(7) {
  top: 13.6%;
  right: 92%;
}

.service-process__step:nth-child(n + 2):nth-child(-n + 4):hover
  .service-process__step-image,
.service-process__step:nth-child(n + 2):nth-child(-n + 4).service-process__step--active
  .service-process__step-image {
  margin-left: -30%;
}

.service-process__step:nth-child(n + 5) button {
  flex-direction: row-reverse;
}

.service-process__step:nth-child(n + 5):hover .service-process__step-image,
.service-process__step:nth-child(n + 5).service-process__step--active
  .service-process__step-image {
  margin-right: -30%;
}

@media (max-width: 1366px) and (min-width: 999px) {
  .service-process__orbit {
    transform: scale(0.7);
  }

  .service-process__title > :deep(.product-reveal) {
    transform: scale(0.7);
  }
}

@media (max-width: 998px) {
  .service-process {
    padding: 8vw 0;
  }

  .service-process__title {
    position: static;
    width: 100%;
    transform: none;
  }

  .service-process__heading {
    min-height: 119px;
  }

  .service-process__heading :deep(.section-title__watermark--image) {
    width: 100px;
    height: 101px;
  }

  .service-process__heading :deep(.section-title__english),
  .service-process__heading :deep(.section-title__chinese) {
    font-size: 24px;
  }

  .service-process__heading :deep(.section-title__line) {
    width: 54px;
    margin: 16px auto 10px;
  }

  .service-process__more {
    margin-top: 30px;
  }

  .service-process__orbit {
    width: 90%;
    height: auto;
    margin: 0 auto;
  }

  .service-process__orbit-image {
    display: none;
  }

  .service-process__step {
    position: static;
    width: 100%;
    padding: 15px 0;
    margin: 0 !important;
    transform: none !important;
  }

  .service-process__step button,
  .service-process__step:nth-child(n + 5) button {
    min-height: auto;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    color: rgb(255 255 255 / 50%);
    text-align: center;
  }

  .service-process__step-image,
  .service-process__step:nth-child(1) .service-process__step-image {
    width: 0 !important;
    height: 0 !important;
    order: 2;
    margin: 0 !important;
  }

  .service-process__step--active .service-process__step-image,
  .service-process__step:nth-child(1).service-process__step--active
    .service-process__step-image {
    width: 220px !important;
    height: 100px !important;
  }

  .service-process__step-number,
  .service-process__step:nth-child(1) .service-process__step-number {
    width: 100%;
    order: 1;
    margin: 0;
  }

  .service-process__step-label,
  .service-process__step:nth-child(1) .service-process__step-label {
    width: 100%;
    order: 3;
  }
}

@media (prefers-reduced-motion: reduce) {
  .service-process__more,
  .service-process__step,
  .service-process__step button,
  .service-process__step-image {
    transition: none;
  }
}
</style>
