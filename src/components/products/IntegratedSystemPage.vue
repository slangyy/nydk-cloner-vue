<script setup lang="ts">
import { computed } from "vue";

import IntegratedFullBleedCarousel from "@/components/products/IntegratedFullBleedCarousel.vue";
import IntegratedVariantTabs from "@/components/products/IntegratedVariantTabs.vue";
import ProductPageShell from "@/components/products/ProductPageShell.vue";
import ProductReveal from "@/components/products/ProductReveal.vue";
import {
  integratedSystemVariants,
  integratedVariantTabs,
} from "@/data/products/integrated";
import type { IntegratedVariantKey } from "@/types/products";

const props = defineProps<{
  readonly variantKey: IntegratedVariantKey;
}>();

const variant = computed(() => integratedSystemVariants[props.variantKey]);
</script>

<template>
  <ProductPageShell :hero="variant.hero">
    <IntegratedVariantTabs
      :tabs="integratedVariantTabs"
      :active-key="variant.key"
    />

    <section class="integrated-intro" aria-labelledby="integrated-intro-title">
      <div class="integrated-intro__content">
        <ProductReveal>
          <h1 id="integrated-intro-title" class="integrated-intro__title">
            {{ variant.introduction.title }}
          </h1>
        </ProductReveal>

        <ProductReveal :delay-ms="80">
          <p class="integrated-intro__subtitle">
            {{ variant.introduction.subtitle }}
          </p>
        </ProductReveal>

        <ProductReveal :delay-ms="160">
          <p class="integrated-intro__description">
            {{ variant.introduction.description }}
          </p>
        </ProductReveal>

        <ProductReveal :delay-ms="220">
          <p class="integrated-intro__english" lang="en">
            {{ variant.introduction.english }}
          </p>
        </ProductReveal>
      </div>
    </section>

    <ProductReveal>
      <IntegratedFullBleedCarousel
        :slides="variant.slides"
        :label="`${variant.introduction.title}产品展示`"
      />
    </ProductReveal>
  </ProductPageShell>
</template>

<style scoped>
.integrated-intro {
  background:
    url("/assets/products/integrated/a9ecc882-266c-4463-9b0f-9fae0e0c8f5f.jpg")
    center / cover repeat;
}

.integrated-intro__content {
  padding: 120px 0;
  text-align: center;
}

.integrated-intro__title,
.integrated-intro__subtitle,
.integrated-intro__description,
.integrated-intro__english {
  display: block;
  padding: 0;
  margin-right: auto;
  margin-left: auto;
}

.integrated-intro__title {
  margin-top: 0;
  margin-bottom: 0;
  color: #231815;
  font-size: 48px;
  font-weight: 500;
  line-height: 1.5;
}

.integrated-intro__subtitle {
  margin-top: 30px;
  margin-bottom: 0;
  color: #231815;
  font-size: 36px;
  font-weight: 400;
  letter-spacing: 0.5em;
  line-height: 1.5;
}

.integrated-intro__subtitle::after {
  display: block;
  width: 120px;
  height: 2px;
  margin: 30px auto;
  background: #bc9480;
  content: "";
}

.integrated-intro__description {
  width: 62.5%;
  margin-top: 0;
  margin-bottom: 0;
  color: #777;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0.04em;
  line-height: 3;
}

.integrated-intro__english {
  width: 62.5%;
  margin-top: 20px;
  margin-bottom: 0;
  color: #ccc;
  font-size: 16px;
  font-style: italic;
  font-weight: 400;
  letter-spacing: 0.05em;
  line-height: 3;
}

@media (max-width: 1366px) {
  .integrated-intro__content {
    padding: 60px 0;
  }

  .integrated-intro__subtitle {
    margin-top: 20px;
  }

  .integrated-intro__subtitle::after {
    width: 100px;
    margin: 20px auto;
  }

  .integrated-intro__description,
  .integrated-intro__english {
    line-height: 2;
  }
}

@media (max-width: 998px) {
  .integrated-intro__title {
    font-size: 28px;
  }

  .integrated-intro__subtitle {
    font-size: 22px;
    letter-spacing: 0.1em;
  }

  .integrated-intro__description,
  .integrated-intro__english {
    width: 90%;
  }

  .integrated-intro__description {
    font-size: 14px;
  }

  .integrated-intro__english {
    font-size: 12px;
  }
}
</style>
