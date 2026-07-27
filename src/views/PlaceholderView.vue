<script setup lang="ts">
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";

import { pageNames } from "@/data/home";

const route = useRoute();
const pageName = computed(() => pageNames[route.path] ?? "内容页面");
</script>

<template>
  <main class="placeholder">
    <img src="/assets/svg/inline-02.svg" alt="南洋迪克" class="placeholder__logo" />
    <p class="placeholder__eyebrow bank">NEODKO</p>
    <h1>{{ pageName }}</h1>
    <p>该页面将在后续阶段继续还原。</p>
    <RouterLink to="/">返回首页</RouterLink>
  </main>
</template>

<style scoped>
.placeholder {
  display: grid;
  min-height: 100vh;
  place-content: center;
  justify-items: center;
  padding: 24px;
  background: #f4f2f1;
  color: var(--nydk-ink);
  text-align: center;
}

.placeholder__logo {
  width: 80px;
  margin-bottom: 38px;
}

.placeholder__eyebrow {
  margin: 0 0 8px;
  color: var(--nydk-walnut);
  letter-spacing: 0.16em;
}

h1 {
  margin: 0;
  font-size: clamp(32px, 5vw, 64px);
  font-weight: 300;
}

p {
  margin: 18px 0 30px;
  color: rgb(35 24 21 / 55%);
}

a {
  border: 1px solid var(--nydk-walnut);
  padding: 12px 28px;
  transition: 0.3s;
}

a:hover {
  background: var(--nydk-walnut);
  color: white;
}
</style>
