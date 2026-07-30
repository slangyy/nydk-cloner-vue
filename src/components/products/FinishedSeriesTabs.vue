<script setup lang="ts">
import { RouterLink } from "vue-router";

import type {
  FinishedSeriesKey,
  FinishedSeriesTab,
} from "@/types/products";

defineProps<{
  readonly tabs: readonly FinishedSeriesTab[];
  readonly activeKey: FinishedSeriesKey;
}>();
</script>

<template>
  <nav class="series-tabs" aria-label="成品系统系列">
    <div class="series-tabs__inner">
      <RouterLink
        v-for="tab in tabs"
        :key="tab.key"
        class="series-tabs__item"
        :class="{ 'series-tabs__item--active': tab.key === activeKey }"
        :to="tab.route"
        :aria-label="tab.label"
        :aria-current="tab.key === activeKey ? 'page' : undefined"
      >
        <img :src="tab.sprite" alt="" aria-hidden="true" />
        <span class="series-tabs__label">{{ tab.label }}</span>
      </RouterLink>
    </div>
  </nav>
</template>

<style scoped>
.series-tabs {
  width: 100%;
  background: #fff;
}

.series-tabs__inner {
  display: flex;
  width: 80%;
  margin: 0 auto;
}

.series-tabs__item {
  position: relative;
  flex: 1 1 0;
  aspect-ratio: 320 / 120;
  overflow: hidden;
  background: #fff;
}

.series-tabs__item img {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  max-width: none;
  transition: transform 0.3s ease;
}

.series-tabs__item--active img {
  top: 0;
  bottom: auto;
}

.series-tabs__item:hover img,
.series-tabs__item:focus-visible img {
  transform: scale(1.025);
}

.series-tabs__item:focus-visible {
  z-index: 1;
  outline: 2px solid #bc9480;
  outline-offset: -2px;
}

.series-tabs__label {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

@media (max-width: 998px) {
  .series-tabs__inner {
    width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .series-tabs__inner::-webkit-scrollbar {
    display: none;
  }

  .series-tabs__item {
    min-width: 160px;
    flex: 0 0 160px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .series-tabs__item img {
    transition: none;
  }
}
</style>
