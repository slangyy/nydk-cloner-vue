<script setup lang="ts">
import IntegratedSystemPage from "@/components/products/IntegratedSystemPage.vue";
import type { IntegratedVariantKey } from "@/types/products";

defineProps<{
  readonly variantKey: IntegratedVariantKey;
}>();
</script>

<template>
  <IntegratedSystemPage :key="variantKey" :variant-key="variantKey" />
</template>
