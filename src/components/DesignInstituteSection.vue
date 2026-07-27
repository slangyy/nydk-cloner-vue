<script setup lang="ts">
import type { ComponentPublicInstance } from "vue";
import { RouterLink } from "vue-router";

import SectionTitle from "@/components/SectionTitle.vue";
import { useReveal } from "@/composables/useReveal";
import { designerCards } from "@/data/home";

const { target, isVisible } = useReveal();

function setRevealTarget(element: Element | ComponentPublicInstance | null): void {
  target.value = element instanceof HTMLElement ? element : null;
}
</script>

<template>
  <section
    :ref="setRevealTarget"
    class="design-institute reveal"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="design-institute-title"
  >
    <div class="page-container design-institute__inner">
      <SectionTitle
        id="design-institute-title"
        english="DESIGN & RESEARCH INSTITUTE"
        chinese="设计研究院"
      />

      <div class="design-institute__grid">
        <template v-for="card in designerCards" :key="card.id">
          <RouterLink
            v-if="card.isBrandCard && card.href"
            :to="card.href"
            class="design-institute__card design-institute__card--brand"
            aria-label="查看更多设计研究院内容"
          >
            <picture>
              <source
                v-if="card.mobileImage"
                media="(max-width: 998px)"
                :srcset="card.mobileImage"
              />
              <img :src="card.image" alt="南洋迪克设计研究院" />
            </picture>
            <span>查看更多</span>
          </RouterLink>

          <figure v-else class="design-institute__card">
            <img :src="card.image" alt="南洋迪克设计研究院设计师" loading="lazy" />
          </figure>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.design-institute {
  min-height: 893px;
  overflow: hidden;
  background: #fff;
}

.design-institute__inner {
  padding-top: 50px;
}

.design-institute__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 34px;
}

.design-institute__card {
  position: relative;
  aspect-ratio: 5 / 3;
  margin: 0;
  overflow: hidden;
  background: #e5e0dd;
}

.design-institute__card img,
.design-institute__card picture {
  width: 100%;
  height: 100%;
}

.design-institute__card img {
  object-fit: cover;
  transition: transform 0.5s ease;
}

.design-institute__card:hover img,
.design-institute__card:focus-visible img {
  transform: scale(1.04);
}

.design-institute__card--brand span {
  position: absolute;
  right: 26px;
  bottom: 20px;
  color: rgb(255 255 255 / 86%);
  font-size: 13px;
  letter-spacing: 0.16em;
}

.design-institute__card--brand span::after {
  content: " +";
}

@media (max-width: 998px) {
  .design-institute {
    min-height: 511px;
  }

  .design-institute__inner {
    padding-top: 8px;
  }

  .design-institute__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-top: 18px;
  }

  .design-institute__card--brand span {
    right: 12px;
    bottom: 9px;
    font-size: 10px;
  }
}
