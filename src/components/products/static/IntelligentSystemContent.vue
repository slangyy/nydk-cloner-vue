<script setup lang="ts">
import ProductReveal from "@/components/products/ProductReveal.vue";
import StaticAlternatingSection from "@/components/products/static/StaticAlternatingSection.vue";
import {
  intelligentClosingImage,
  intelligentSections,
} from "@/data/products/static";
</script>

<template>
  <div class="intelligent-content">
    <div class="intelligent-content__sections page-container">
      <StaticAlternatingSection
        v-for="section in intelligentSections"
        :key="section.id"
        :section="section"
      />
    </div>

    <ProductReveal class="intelligent-content__closing">
      <img
        :src="intelligentClosingImage"
        alt="南洋迪克智能影音家居空间"
        loading="lazy"
      />
    </ProductReveal>
  </div>
</template>

<style scoped>
.intelligent-content {
  padding-top: 54px;
  background: #fff;
}

.intelligent-content__sections {
  width: min(1440px, 86vw);
}

.intelligent-content :deep(.static-feature) {
  min-height: 830px;
}

.intelligent-content :deep(.static-feature__media img) {
  max-height: 600px;
  object-fit: cover;
}

.intelligent-content__closing {
  width: 100%;
  margin-top: 35px;
}

.intelligent-content__closing img {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
}

@media (max-width: 998px) {
  .intelligent-content {
    padding-top: 22px;
  }

  .intelligent-content__sections {
    width: 90vw;
  }

  .intelligent-content :deep(.static-feature) {
    min-height: auto;
  }

  .intelligent-content__closing {
    margin-top: 25px;
  }

  .intelligent-content__closing img {
    min-height: 220px;
  }
}
</style>
