<script setup lang="ts">
import ProductPageShell from "@/components/products/ProductPageShell.vue";
import IntelligentSystemContent from "@/components/products/static/IntelligentSystemContent.vue";
import { intelligentHero } from "@/data/products/static";
</script>

<template>
  <ProductPageShell :hero="intelligentHero">
    <IntelligentSystemContent />
  </ProductPageShell>
</template>
