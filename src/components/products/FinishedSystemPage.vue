<script setup lang="ts">
import { computed } from "vue";

import FinishedSeriesTabs from "@/components/products/FinishedSeriesTabs.vue";
import FinishedSpaceShowcase from "@/components/products/FinishedSpaceShowcase.vue";
import ProductPageShell from "@/components/products/ProductPageShell.vue";
import ProductReveal from "@/components/products/ProductReveal.vue";
import {
  finishedSeriesTabs,
  finishedSystemVariants,
} from "@/data/products/finished";
import type { FinishedSeriesKey } from "@/types/products";

const props = defineProps<{
  readonly variantKey: FinishedSeriesKey;
}>();

const variant = computed(() => finishedSystemVariants[props.variantKey]);
</script>

<template>
  <ProductPageShell :hero="variant.hero">
    <FinishedSeriesTabs
      :tabs="finishedSeriesTabs"
      :active-key="variant.key"
    />

    <section
      class="finished-intro"
      :aria-labelledby="`finished-intro-${variant.key}`"
    >
      <div class="finished-intro__content">
        <ProductReveal>
          <h1 :id="`finished-intro-${variant.key}`">
            {{ variant.introduction.title }}
          </h1>
        </ProductReveal>

        <ProductReveal :delay-ms="80">
          <p class="finished-intro__subtitle">
            {{ variant.introduction.subtitle }}
          </p>
          <span class="finished-intro__line" aria-hidden="true" />
        </ProductReveal>

        <ProductReveal :delay-ms="140">
          <p class="finished-intro__description">
            {{ variant.introduction.description }}
          </p>
        </ProductReveal>

        <ProductReveal :delay-ms="200">
          <p class="finished-intro__english" lang="en">
            {{ variant.introduction.english }}
          </p>
        </ProductReveal>
      </div>
    </section>

    <FinishedSpaceShowcase
      :spaces="variant.spaces"
      :series-label="variant.introduction.title"
    />
  </ProductPageShell>
</template>

<style scoped>
.finished-intro {
  min-height: 730px;
  background:
    linear-gradient(rgb(255 255 255 / 14%), rgb(255 255 255 / 14%)),
    url("/assets/products/finished/poseena/954d088f-9daa-4e97-aa81-0a3bafcfa11c.jpg")
      center / cover;
}

.finished-intro__content {
  padding: 120px 0;
  text-align: center;
}

.finished-intro h1 {
  margin: 0;
  color: #231815;
  font-size: 48px;
  font-weight: 500;
  line-height: 1.5;
}

.finished-intro__subtitle {
  margin: 30px 0 0;
  color: #231815;
  font-size: 36px;
  line-height: 1.5;
  letter-spacing: 0.5em;
}

.finished-intro__line {
  display: block;
  width: 120px;
  height: 2px;
  margin: 26px auto 32px;
  background: #bc9480;
}

.finished-intro__description,
.finished-intro__english {
  width: 62.5%;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
}

.finished-intro__description {
  margin-top: 0;
  margin-bottom: 0;
  color: #777;
  font-size: 18px;
  line-height: 3;
  letter-spacing: 0.04em;
}

.finished-intro__english {
  margin-top: 20px;
  margin-bottom: 0;
  color: #ccc;
  font-size: 16px;
  line-height: 3;
  letter-spacing: 0.05em;
}

@media (max-width: 1366px) {
  .finished-intro {
    min-height: 520px;
  }

  .finished-intro__content {
    padding: 60px 0;
  }

  .finished-intro__description,
  .finished-intro__english {
    line-height: 2;
  }
}

@media (max-width: 998px) {
  .finished-intro {
    min-height: auto;
  }

  .finished-intro__content {
    padding: 64px 0 70px;
  }

  .finished-intro h1 {
    font-size: 30px;
  }

  .finished-intro__subtitle {
    padding-left: 0.45em;
    margin-top: 20px;
    font-size: 22px;
    letter-spacing: 0.45em;
  }

  .finished-intro__line {
    width: 70px;
    margin: 22px auto 24px;
  }

  .finished-intro__description,
  .finished-intro__english {
    width: 90%;
    font-size: 14px;
    line-height: 2.1;
  }

  .finished-intro__english {
    margin-top: 14px;
    font-size: 13px;
  }
}
</style>
