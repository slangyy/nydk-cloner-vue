<script setup lang="ts">
import FinishedSystemPage from "@/components/products/FinishedSystemPage.vue";
import type { FinishedSeriesKey } from "@/types/products";

defineProps<{
  readonly variantKey: FinishedSeriesKey;
}>();
</script>

<template>
  <FinishedSystemPage :key="variantKey" :variant-key="variantKey" />
</template>

