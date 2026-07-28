<script setup lang="ts">
import InnerPageHero from "@/components/InnerPageHero.vue";
import SiteFooter from "@/components/SiteFooter.vue";
import SiteHeader from "@/components/SiteHeader.vue";
import type { InnerPageHeroConfig } from "@/types/content";

defineProps<{
  readonly hero: InnerPageHeroConfig;
}>();
</script>

<template>
  <div class="product-page-shell">
    <SiteHeader />
    <main>
      <InnerPageHero v-bind="hero" />
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.product-page-shell {
  width: 100%;
  overflow: hidden;
  background: #fff;
  color: #261d1a;
}
</style>
