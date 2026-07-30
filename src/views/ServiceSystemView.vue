<script setup lang="ts">
import ProductPageShell from "@/components/products/ProductPageShell.vue";
import ServicePowerCarousel from "@/components/products/ServicePowerCarousel.vue";
import ServiceProcessSection from "@/components/products/ServiceProcessSection.vue";
import {
  servicePage,
  servicePowerSlides,
  serviceSteps,
} from "@/data/products/ops";
</script>

<template>
  <ProductPageShell :hero="servicePage.hero">
    <ServiceProcessSection :steps="serviceSteps" />
    <ServicePowerCarousel :slides="servicePowerSlides" />
  </ProductPageShell>
</template>
