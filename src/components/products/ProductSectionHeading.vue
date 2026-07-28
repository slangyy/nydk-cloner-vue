<script setup lang="ts">
withDefaults(
  defineProps<{
    readonly english?: string;
    readonly title: string;
    readonly subtitle?: string;
    readonly light?: boolean;
    readonly align?: "left" | "center";
  }>(),
  {
    english: "",
    subtitle: "",
    light: false,
    align: "center",
  },
);
</script>

<template>
  <header
    class="product-heading"
    :class="[{ 'product-heading--light': light }, `product-heading--${align}`]"
  >
    <p v-if="english" class="product-heading__english bank">
      {{ english }}
    </p>
    <h2 class="product-heading__title">
      {{ title }}
    </h2>
    <p v-if="subtitle" class="product-heading__subtitle">
      {{ subtitle }}
    </p>
    <span class="product-heading__line" aria-hidden="true" />
  </header>
</template>

<style scoped>
.product-heading {
  color: #261d1a;
  text-align: center;
}

.product-heading--left {
  text-align: left;
}

.product-heading--light {
  color: #fff;
}

.product-heading__english,
.product-heading__title,
.product-heading__subtitle {
  margin: 0;
}

.product-heading__english {
  color: #6a554b;
  font-size: clamp(28px, 2.5vw, 48px);
  font-weight: 400;
  letter-spacing: 0.08em;
  line-height: 1.15;
  text-transform: uppercase;
}

.product-heading--light .product-heading__english {
  color: inherit;
}

.product-heading__title {
  margin-top: 14px;
  font-size: clamp(25px, 2vw, 36px);
  font-weight: 500;
  letter-spacing: 0.05em;
  line-height: 1.35;
}

.product-heading__subtitle {
  margin-top: 8px;
  font-size: clamp(18px, 1.4vw, 26px);
  line-height: 1.5;
}

.product-heading__line {
  display: block;
  width: 70px;
  height: 2px;
  margin: 24px auto 0;
  background: #c49a86;
}

.product-heading--left .product-heading__line {
  margin-left: 0;
}

@media (max-width: 998px) {
  .product-heading__english {
    font-size: 24px;
  }

  .product-heading__title {
    margin-top: 8px;
    font-size: 24px;
  }

  .product-heading__line {
    width: 54px;
    margin-top: 16px;
  }
}
</style>
