<script setup lang="ts">
import ProductReveal from "@/components/products/ProductReveal.vue";
import ProductSectionHeading from "@/components/products/ProductSectionHeading.vue";
import type { StaticFeatureSection } from "@/data/products/static";

defineProps<{
  readonly section: StaticFeatureSection;
}>();
</script>

<template>
  <article
    class="static-feature"
    :class="{ 'static-feature--image-right': section.imageSide === 'right' }"
  >
    <ProductReveal
      class="static-feature__media"
      :direction="section.imageSide === 'left' ? 'left' : 'right'"
    >
      <img :src="section.image" :alt="section.imageAlt" loading="lazy" />
    </ProductReveal>

    <ProductReveal
      class="static-feature__copy"
      :direction="section.imageSide === 'left' ? 'right' : 'left'"
      :delay-ms="80"
    >
      <ProductSectionHeading
        :title="section.title"
        :subtitle="section.subtitle ?? ''"
        align="left"
      />
      <p>{{ section.description }}</p>
    </ProductReveal>
  </article>
</template>

<style scoped>
.static-feature {
  display: grid;
  grid-template-columns: minmax(360px, 520px) minmax(360px, 1fr);
  align-items: center;
  gap: clamp(70px, 9vw, 160px);
  min-height: 760px;
}

.static-feature--image-right {
  grid-template-columns: minmax(360px, 1fr) minmax(360px, 520px);
}

.static-feature--image-right .static-feature__media {
  grid-column: 2;
  grid-row: 1;
}

.static-feature--image-right .static-feature__copy {
  grid-column: 1;
  grid-row: 1;
}

.static-feature__media img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.static-feature__copy {
  max-width: 630px;
}

.static-feature__copy p {
  margin: 42px 0 0;
  color: #5d5652;
  font-size: clamp(15px, 1vw, 18px);
  line-height: 2.15;
  text-align: justify;
}

@media (max-width: 998px) {
  .static-feature,
  .static-feature--image-right {
    grid-template-columns: 1fr;
    gap: 34px;
    min-height: auto;
    padding-block: 56px;
  }

  .static-feature--image-right .static-feature__media,
  .static-feature--image-right .static-feature__copy {
    grid-column: auto;
    grid-row: auto;
  }

  .static-feature__media {
    max-width: 620px;
    margin-inline: auto;
  }

  .static-feature__copy {
    max-width: none;
  }

  .static-feature__copy p {
    margin-top: 26px;
    font-size: 15px;
    line-height: 1.95;
  }
}
</style>
