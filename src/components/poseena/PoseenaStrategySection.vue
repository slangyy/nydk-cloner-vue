<script setup lang="ts">
import type { ComponentPublicInstance } from "vue";

import { useReveal } from "@/composables/useReveal";
import { poseenaStrategies } from "@/data/poseena";

const { target, isVisible } = useReveal();

function setRevealTarget(element: Element | ComponentPublicInstance | null): void {
  target.value = element instanceof HTMLElement ? element : null;
}
</script>

<template>
  <section
    class="poseena-strategy"
    aria-labelledby="poseena-strategy-title"
  >
    <div
      :ref="setRevealTarget"
      class="poseena-strategy__container reveal"
      :class="{ 'is-visible': isVisible }"
    >
      <header class="poseena-strategy__header">
        <h2 id="poseena-strategy-title">
          新中有爱 纵横无边
        </h2>
        <p>1+1+6品牌战略</p>
        <span aria-hidden="true" />
      </header>

      <ul class="poseena-strategy__list">
        <li
          v-for="strategy in poseenaStrategies"
          :key="strategy.id"
          class="strategy-card"
          tabindex="0"
        >
          <div class="strategy-card__content">
            <p class="strategy-card__number" aria-hidden="true">
              {{ strategy.number }}
            </p>
            <h3>{{ strategy.title }}</h3>
            <span class="strategy-card__divider" aria-hidden="true" />
            <p class="strategy-card__body">
              {{ strategy.lines.join(" / ") }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.poseena-strategy {
  position: relative;
  margin-top: -12%;
  padding: 18% 0 0;
  background: #f5f1ee url("/assets/poseena/pattern-light.jpg") center / cover no-repeat;
}

.poseena-strategy__container {
  position: relative;
  z-index: 2;
  width: 80%;
  max-width: 1440px;
  margin: 0 auto;
  overflow: visible;
}

.poseena-strategy__header {
  color: #3c312f;
  text-align: center;
}

.poseena-strategy__header h2 {
  margin: 0;
  font-size: 48px;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1.6667;
}

.poseena-strategy__header p {
  margin: 15px 0 0;
  font-size: 36px;
  font-weight: 400;
  letter-spacing: 0.05em;
  line-height: 1.6667;
}

.poseena-strategy__header > span {
  display: block;
  width: 120px;
  height: 2px;
  margin: 25px auto 0;
  background: #bc9480;
}

.poseena-strategy__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0;
  margin: 80px 0 0;
  list-style: none;
}

.strategy-card {
  position: relative;
  width: 31.33%;
  overflow: hidden;
  padding: 5%;
  background: #fff;
  box-shadow: 0 20px 30px rgb(191 178 172 / 20%);
  outline: none;
}

.strategy-card::after {
  position: absolute;
  z-index: 0;
  inset: 0;
  background: #7b5547 url("/assets/poseena/strategy-hover.jpg") center / cover no-repeat;
  content: "";
  opacity: 0;
  transition: opacity 0.3s ease;
}

.strategy-card__content {
  position: relative;
  z-index: 1;
}

.strategy-card__number {
  display: grid;
  width: 140px;
  height: 140px;
  place-items: center;
  margin: 0 auto;
  border: 1px solid #e9e7e7;
  border-radius: 50%;
  color: #bc9480;
  font-family: Arial, sans-serif;
  font-size: 72px;
  font-weight: 700;
  line-height: 1;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

.strategy-card h3 {
  margin: 30px 0 0;
  color: #3c312f;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 50px;
  text-align: center;
  transition: color 0.3s ease;
}

.strategy-card__divider {
  display: block;
  width: 60px;
  height: 4px;
  margin: 20px auto 30px;
  background: #bc9480;
  transition: background-color 0.3s ease;
}

.strategy-card__body {
  margin: 0;
  color: #231815;
  font-size: 16px;
  line-height: 2.25;
  text-align: center;
  transition: color 0.3s ease;
}

.strategy-card:hover::after,
.strategy-card:focus-within::after {
  opacity: 1;
}

.strategy-card:hover .strategy-card__number,
.strategy-card:focus-within .strategy-card__number {
  border-color: #fff;
  background: #fff;
}

.strategy-card:hover h3,
.strategy-card:focus-within h3,
.strategy-card:hover .strategy-card__body,
.strategy-card:focus-within .strategy-card__body {
  color: #fff;
}

.strategy-card:hover .strategy-card__divider,
.strategy-card:focus-within .strategy-card__divider {
  background: #fff;
}

.strategy-card:focus-visible {
  box-shadow:
    0 20px 30px rgb(191 178 172 / 20%),
    inset 0 0 0 2px #bc9480;
}

@media (min-width: 1601px) {
  .poseena-strategy__container {
    width: min(90%, 1440px);
  }
}

@media (max-width: 1440px) {
  .poseena-strategy__header h2 {
    font-size: 38px;
  }

  .poseena-strategy__header p {
    font-size: 30px;
  }

  .poseena-strategy__header > span {
    margin-top: 20px;
  }

  .strategy-card {
    padding: 3%;
  }

  .strategy-card__number {
    width: 110px;
    height: 110px;
    font-size: 55px;
  }

  .strategy-card h3 {
    margin-top: 20px;
    font-size: 26px;
    line-height: 43.3332px;
  }

  .strategy-card__divider {
    margin: 10px auto 20px;
  }

  .strategy-card__body {
    line-height: 2;
  }
}

@media (max-width: 1200px) {
  .poseena-strategy__container {
    width: 90%;
  }
}

@media (max-width: 998px) {
  .poseena-strategy {
    padding: 16% 0 0;
  }

  .poseena-strategy__header h2 {
    font-size: 20px;
  }

  .poseena-strategy__header p {
    margin-top: 7px;
    font-size: 14px;
  }

  .poseena-strategy__header > span {
    width: 60px;
    margin-top: 12px;
  }

  .poseena-strategy__list {
    margin-top: 20px;
  }

  .strategy-card {
    width: 100%;
    padding: 20px;
    margin-bottom: 20px;
  }

  .strategy-card__number {
    width: 80px;
    height: 80px;
    font-size: 40px;
  }

  .strategy-card h3 {
    margin-top: 10px;
    font-size: 18px;
    line-height: 30px;
  }

  .strategy-card__divider {
    height: 2px;
    margin: 10px auto 15px;
  }

  .strategy-card__body {
    font-size: 14px;
    line-height: 1.8;
  }
}

@media (prefers-reduced-motion: reduce) {
  .strategy-card::after,
  .strategy-card__number,
  .strategy-card h3,
  .strategy-card__divider,
  .strategy-card__body {
    transition: none;
  }
}
</style>
