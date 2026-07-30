<script setup lang="ts">
import { RouterLink } from "vue-router";

import type {
  IntegratedVariantKey,
  IntegratedVariantTab,
} from "@/types/products";

defineProps<{
  readonly tabs: readonly IntegratedVariantTab[];
  readonly activeKey: IntegratedVariantKey;
}>();
</script>

<template>
  <nav class="integrated-tabs" aria-label="整装系统分类">
    <ul class="integrated-tabs__list">
      <li
        v-for="tab in tabs"
        :key="tab.key"
        class="integrated-tabs__item"
        :class="{ 'integrated-tabs__item--active': tab.key === activeKey }"
      >
        <RouterLink
          class="integrated-tabs__link"
          :to="tab.route"
          :aria-current="tab.key === activeKey ? 'page' : undefined"
        >
          <img :src="tab.sprite" :alt="tab.label" />
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.integrated-tabs {
  width: 100%;
  background: #fff;
}

.integrated-tabs__list {
  display: flex;
  width: 80%;
  max-width: 1440px;
  justify-content: center;
  padding: 0;
  margin: 0 auto;
  list-style: none;
}

.integrated-tabs__item {
  position: relative;
  width: 20%;
  padding-top: 7.4%;
  overflow: hidden;
}

.integrated-tabs__item::after {
  position: absolute;
  top: 40%;
  right: 0;
  bottom: 40%;
  width: 1px;
  background: #ddd;
  content: "";
}

.integrated-tabs__item:last-child::after,
.integrated-tabs__item--active::after {
  display: none;
}

.integrated-tabs__link {
  position: absolute;
  inset: 0;
  display: block;
  overflow: hidden;
}

.integrated-tabs__link img {
  position: absolute;
  bottom: 0;
  left: 0;
  display: block;
  width: 100%;
  height: auto;
  max-width: none;
  transition:
    top 0.3s ease,
    bottom 0.3s ease;
}

.integrated-tabs__item--active .integrated-tabs__link img {
  top: 0;
  bottom: auto;
}

.integrated-tabs__link:focus-visible {
  outline: 2px solid #bc9480;
  outline-offset: -2px;
}

@media (max-width: 998px) {
  .integrated-tabs__list {
    width: 90%;
    flex-wrap: wrap;
  }

  .integrated-tabs__item {
    width: 50%;
    padding-top: 18.7%;
  }

  .integrated-tabs__item:nth-child(2n)::after {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .integrated-tabs__link img {
    transition: none;
  }
}
</style>
