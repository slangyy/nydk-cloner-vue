<script setup lang="ts">
import { ref } from "vue";

import CaseGalleryDialog from "@/components/cases/CaseGalleryDialog.vue";
import CasePosterWall from "@/components/cases/CasePosterWall.vue";
import ProductPageShell from "@/components/products/ProductPageShell.vue";
import { casesHero, caseStudies } from "@/data/cases";
import type { CaseStudy } from "@/types/content";

const selectedCase = ref<CaseStudy | null>(null);
const galleryTrigger = ref<HTMLButtonElement | null>(null);

function openGallery(
  caseStudy: CaseStudy,
  trigger: HTMLButtonElement,
): void {
  selectedCase.value = caseStudy;
  galleryTrigger.value = trigger;
}

function closeGallery(): void {
  selectedCase.value = null;
}
</script>

<template>
  <ProductPageShell :hero="casesHero">
    <CasePosterWall :cases="caseStudies" @select="openGallery" />
  </ProductPageShell>

  <CaseGalleryDialog
    :case-study="selectedCase"
    :return-focus-to="galleryTrigger"
    @close="closeGallery"
  />
</template>
