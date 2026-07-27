<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";

import SiteFooter from "@/components/SiteFooter.vue";
import SiteHeader from "@/components/SiteHeader.vue";
import { pageNames } from "@/data/home";

const route = useRoute();
const pageName = computed(() => pageNames[route.path] ?? "页面待还原");
const queryLabel = computed(() => {
  const index = route.query.p;
  return typeof index === "string" ? ` · ${index}` : "";
});
</script>

<template>
  <SiteHeader />
  <main class="placeholder">
    <div class="placeholder__content">
      <img
        src="/assets/svg/inline-02.svg"
        alt="南洋迪克"
        class="placeholder__logo"
      />
      <p class="placeholder__eyebrow bank">
        NEODKO{{ queryLabel }}
      </p>
      <h1>{{ pageName }}</h1>
      <p class="placeholder__message">
        该页面将在后续阶段继续还原，当前可返回首页浏览完整复刻内容。
      </p>
      <RouterLink class="placeholder__back" to="/">
        <span>返回首页</span>
        <span aria-hidden="true">→</span>
      </RouterLink>
      <p class="placeholder__path bank">
        {{ route.fullPath }}
      </p>
    </div>
  </main>
  <SiteFooter />
</template>

<style scoped>
.placeholder {
  display: grid;
  min-height: 72vh;
  place-content: center;
  justify-items: center;
  padding: 180px 24px 120px;
  background: #f4f2f1;
  color: var(--nydk-ink);
  text-align: center;
}

.placeholder__content {
  display: grid;
  max-width: 680px;
  justify-items: center;
}

.placeholder__logo {
  width: 72px;
  height: 54px;
  margin-bottom: 43px;
  object-fit: contain;
}

.placeholder__eyebrow {
  margin: 0 0 8px;
  color: var(--nydk-walnut);
  font-size: 11px;
  letter-spacing: 0.16em;
}

h1 {
  margin: 0;
  font-size: clamp(32px, 5vw, 64px);
  font-weight: 300;
  letter-spacing: 0.06em;
}

.placeholder__message {
  margin: 18px 0 30px;
  color: rgb(35 24 21 / 55%);
  font-size: 14px;
  line-height: 1.9;
}

.placeholder__back {
  display: flex;
  min-width: 150px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--nydk-walnut);
  padding: 13px 21px;
  font-size: 13px;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.placeholder__back:hover,
.placeholder__back:focus-visible {
  background: var(--nydk-walnut);
  color: white;
}

.placeholder__path {
  margin: 32px 0 0;
  color: rgb(35 24 21 / 26%);
  font-size: 9px;
  letter-spacing: 0.08em;
}

@media (max-width: 998px) {
  .placeholder {
    min-height: 68vh;
    padding: 130px 8% 80px;
  }

  .placeholder__logo {
    width: 52px;
    height: 44px;
    margin-bottom: 32px;
  }

  .placeholder__message {
    max-width: 290px;
    font-size: 12px;
  }
}
</style>
