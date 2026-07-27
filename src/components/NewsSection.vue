<script setup lang="ts">
import type { ComponentPublicInstance } from "vue";
import { RouterLink } from "vue-router";

import SectionTitle from "@/components/SectionTitle.vue";
import { useReveal } from "@/composables/useReveal";
import { newsItems } from "@/data/home";

const { target, isVisible } = useReveal();

function setRevealTarget(element: Element | ComponentPublicInstance | null): void {
  target.value = element instanceof HTMLElement ? element : null;
}
</script>

<template>
  <section
    :ref="setRevealTarget"
    class="news-section reveal"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="news-section-title"
  >
    <div class="page-container">
      <SectionTitle id="news-section-title" english="NEWS" chinese="新闻资讯" />

      <div class="news-section__grid">
        <RouterLink
          v-for="item in newsItems"
          :key="item.id"
          :to="item.href"
          class="news-card"
        >
          <p class="news-card__date bank">
            {{ item.date }} <span>- {{ item.year }}</span>
          </p>
          <h3>{{ item.title }}</h3>
          <div class="news-card__media">
            <img :src="item.image" :alt="item.title" loading="lazy" />
          </div>
          <p class="news-card__summary">
            {{ item.summary }}
          </p>
        </RouterLink>
      </div>

      <div class="news-section__more">
        <RouterLink to="/News_updates.html" class="split-button">
          <span>查看详情</span>
          <i aria-hidden="true">＋</i>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.news-section {
  min-height: 918px;
  overflow: hidden;
  background: #fff;
}

.news-section :deep(.section-title) {
  padding-top: 64px;
}

.news-section__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 2.34vw;
  margin-top: 8px;
}

.news-card {
  display: block;
  min-width: 0;
  color: var(--nydk-ink);
}

.news-card:nth-child(2) {
  transform: translateY(20px);
}

.news-card:nth-child(3) {
  transform: translateY(50px);
}

.news-card:nth-child(4) {
  transform: translateY(94px);
}

.news-card__date {
  margin: 0 0 14px;
  color: var(--nydk-walnut);
  font-size: 15px;
  letter-spacing: 0.045em;
}

.news-card__date span {
  color: rgb(35 24 21 / 42%);
  font-family: inherit;
}

.news-card h3 {
  display: -webkit-box;
  height: 60px;
  margin: 0 0 21px;
  overflow: hidden;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.5;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.news-card__media {
  width: 100%;
  height: 194px;
  overflow: hidden;
  background: #e9e5e2;
}

.news-card:first-child .news-card__media,
.news-card:last-child .news-card__media {
  height: 123px;
}

.news-card:nth-child(2) .news-card__media {
  height: 215px;
}

.news-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.news-card:hover .news-card__media img,
.news-card:focus-visible .news-card__media img {
  transform: scale(1.05);
}

.news-card__summary {
  display: -webkit-box;
  margin: 17px 0 0;
  overflow: hidden;
  color: rgb(35 24 21 / 57%);
  font-size: 14px;
  line-height: 1.8;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.news-section__more {
  display: flex;
  justify-content: center;
  margin-top: 62px;
}

.split-button {
  position: relative;
  display: flex;
  width: 176px;
  height: 41px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid var(--nydk-ink);
  background: #fff;
  font-size: 16px;
  letter-spacing: 0.08em;
  isolation: isolate;
}

.split-button::before,
.split-button::after {
  position: absolute;
  z-index: -1;
  width: 0;
  height: 0;
  border-style: solid;
  content: "";
  transition: border-width 0.6s ease;
}

.split-button::before {
  top: 0;
  left: 0;
  border-color: var(--nydk-rosewood) transparent transparent var(--nydk-rosewood);
  border-width: 0;
}

.split-button::after {
  right: 0;
  bottom: 0;
  border-color: transparent var(--nydk-walnut) var(--nydk-walnut) transparent;
  border-width: 0;
}

.split-button:hover,
.split-button:focus-visible {
  color: white;
}

.split-button:hover::before,
.split-button:hover::after,
.split-button:focus-visible::before,
.split-button:focus-visible::after {
  border-width: 42px 89px;
}

.split-button span,
.split-button i {
  position: relative;
  z-index: 1;
}

.split-button i {
  margin-left: 18px;
  font-style: normal;
}

@media (max-width: 998px) {
  .news-section {
    min-height: 764px;
  }

  .news-section :deep(.section-title) {
    padding-top: 28px;
  }

  .news-section__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 25px 12px;
    margin-top: 6px;
  }

  .news-card:nth-child(n) {
    transform: none;
  }

  .news-card:nth-child(even) {
    transform: translateY(22px);
  }

  .news-card__date {
    margin-bottom: 7px;
    font-size: 11px;
  }

  .news-card h3 {
    height: 38px;
    margin-bottom: 9px;
    font-size: 13px;
    line-height: 1.45;
  }

  .news-card__media,
  .news-card:first-child .news-card__media,
  .news-card:last-child .news-card__media,
  .news-card:nth-child(2) .news-card__media {
    height: auto;
    aspect-ratio: 16 / 10;
  }

  .news-card__summary {
    margin-top: 8px;
    font-size: 11px;
    line-height: 1.55;
  }

  .news-section__more {
    margin-top: 48px;
  }

  .split-button {
    width: 126px;
    height: 34px;
    font-size: 12px;
  }

  .split-button i {
    margin-left: 12px;
  }
}
</style>
