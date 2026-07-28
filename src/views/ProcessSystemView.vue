<script setup lang="ts">
import ProductPageShell from "@/components/products/ProductPageShell.vue";
import ProcessSystemContent from "@/components/products/static/ProcessSystemContent.vue";
import { processHero } from "@/data/products/static";
</script>

<template>
  <ProductPageShell :hero="processHero">
    <ProcessSystemContent />
  </ProductPageShell>
</template>
