<script setup lang="ts">
import DesignSystemContent from "@/components/products/static/DesignSystemContent.vue";
import ProductPageShell from "@/components/products/ProductPageShell.vue";
import { designHero } from "@/data/products/static";
</script>

<template>
  <ProductPageShell :hero="designHero">
    <DesignSystemContent />
  </ProductPageShell>
</template>
