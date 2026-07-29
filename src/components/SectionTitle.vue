<script setup lang="ts">
withDefaults(
  defineProps<{
    readonly english?: string;
    readonly chinese: string;
    readonly subtitle?: string;
    readonly theme?: "light" | "dark";
    readonly align?: "center" | "left";
    readonly variant?: "default" | "feature";
    readonly watermarkImage?: string;
  }>(),
  {
    english: "",
    subtitle: "",
    theme: "light",
    align: "center",
    variant: "default",
    watermarkImage: "",
  },
);
</script>

<template>
  <div
    class="section-title"
    :class="[
      `section-title--${theme}`,
      `section-title--${align}`,
      `section-title--${variant}`,
      { 'section-title--without-english': !english },
    ]"
  >
    <img
      v-if="watermarkImage"
      class="section-title__watermark section-title__watermark--image"
      :src="watermarkImage"
      alt=""
      aria-hidden="true"
    />
    <span v-else class="section-title__watermark" aria-hidden="true">N</span>
    <template v-if="english">
      <p class="section-title__english bank">
        {{ english }}
      </p>
      <i class="section-title__line" aria-hidden="true"></i>
      <h2 class="section-title__chinese">
        {{ chinese }}
      </h2>
      <p v-if="subtitle" class="section-title__subtitle">
        {{ subtitle }}
      </p>
    </template>
    <template v-else>
      <h2 class="section-title__chinese">
        {{ chinese }}
      </h2>
      <p v-if="subtitle" class="section-title__subtitle">
        {{ subtitle }}
      </p>
      <i class="section-title__line" aria-hidden="true"></i>
    </template>
  </div>
</template>

<style scoped>
.section-title {
  position: relative;
  z-index: 1;
  display: flex;
  min-height: 205px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-block: 52px 40px;
  text-align: center;
}

.section-title__watermark {
  position: absolute;
  inset: 50% auto auto 50%;
  z-index: -1;
  color: rgb(99 79 68 / 5%);
  font-family: "Bank", sans-serif;
  font-size: 158px;
  line-height: 0.7;
  transform: translate(-50%, -50%);
}

.section-title__watermark--image {
  width: 160px;
  height: 150px;
  object-fit: contain;
}

.section-title__english {
  margin: 0;
  color: var(--nydk-walnut);
  font-size: clamp(28px, 2.5vw, 48px);
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-title__line {
  display: block;
  width: 70px;
  height: 2px;
  margin: 24px auto 14px;
  background: #c49a86;
}

.section-title__chinese {
  margin: 0;
  color: var(--nydk-ink);
  font-size: clamp(25px, 2vw, 36px);
  font-weight: 500;
  line-height: 1.35;
  letter-spacing: 0.05em;
}

.section-title__subtitle {
  margin: 8px 0 0;
  color: var(--nydk-ink);
  font-size: clamp(18px, 1.4vw, 26px);
  line-height: 1.5;
}

.section-title--without-english .section-title__line {
  margin-block: 24px 0;
}

.section-title--feature {
  min-height: 205px;
  padding-top: 0;
}

.section-title--feature .section-title__watermark--image {
  transform: translate(-50%, -74%);
}

.section-title--dark .section-title__watermark {
  color: rgb(255 255 255 / 5%);
}

.section-title--dark .section-title__english,
.section-title--dark .section-title__chinese,
.section-title--dark .section-title__subtitle {
  color: #fff;
}

.section-title--dark .section-title__line {
  background: #fff;
}

.section-title--left {
  align-items: flex-start;
  text-align: left;
}

.section-title--left .section-title__line {
  margin-left: 0;
}

.section-title--left .section-title__watermark {
  left: 0;
  transform: translateY(-50%);
}

@media (max-width: 998px) {
  .section-title {
    min-height: 119px;
    padding-block: 28px 22px;
  }

  .section-title__watermark {
    font-size: 80px;
  }

  .section-title__watermark--image {
    width: 100px;
    height: 101px;
  }

  .section-title__english {
    font-size: 24px;
  }

  .section-title__line {
    width: 54px;
    height: 2px;
    margin-block: 16px 10px;
  }

  .section-title__chinese {
    font-size: 24px;
  }

  .section-title__subtitle {
    font-size: 18px;
  }

  .section-title--without-english .section-title__line {
    margin-block: 16px 0;
  }

  .section-title--feature {
    min-height: 106px;
  }

  .section-title--feature .section-title__watermark--image {
    transform: translate(-50%, -70%);
  }

}
</style>
