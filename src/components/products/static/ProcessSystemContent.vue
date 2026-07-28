<script setup lang="ts">
import ProductReveal from "@/components/products/ProductReveal.vue";
import StaticAlternatingSection from "@/components/products/static/StaticAlternatingSection.vue";
import { processClosingImage, processSections } from "@/data/products/static";
</script>

<template>
  <div class="process-content">
    <div class="process-content__sections page-container">
      <StaticAlternatingSection
        v-for="section in processSections"
        :key="section.id"
        :section="section"
      />
    </div>

    <ProductReveal class="process-content__closing">
      <img
        :src="processClosingImage"
        alt="南洋迪克现代化工艺生产车间"
        loading="lazy"
      />
    </ProductReveal>
  </div>
</template>

<style scoped>
.process-content {
  padding-top: 44px;
  background: #fff;
}

.process-content__sections {
  width: min(1440px, 86vw);
}

.process-content__closing {
  width: min(1440px, 86vw);
  margin: 70px auto 150px;
}

.process-content__closing img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

@media (max-width: 998px) {
  .process-content {
    padding-top: 26px;
  }

  .process-content__sections,
  .process-content__closing {
    width: 90vw;
  }

  .process-content__closing {
    margin: 48px auto 90px;
  }
}
</style>
