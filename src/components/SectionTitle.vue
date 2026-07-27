<script setup lang="ts">
withDefaults(
  defineProps<{
    english: string;
    chinese: string;
    theme?: "light" | "dark";
    align?: "center" | "left";
  }>(),
  {
    theme: "light",
    align: "center",
  },
);
</script>

<template>
  <div
    class="section-title"
    :class="[`section-title--${theme}`, `section-title--${align}`]"
  >
    <span class="section-title__watermark" aria-hidden="true">N</span>
    <p class="section-title__english bank">{{ english }}</p>
    <i class="section-title__line" aria-hidden="true"></i>
    <h2 class="section-title__chinese">{{ chinese }}</h2>
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

.section-title__english {
  margin: 0;
  color: var(--nydk-walnut);
  font-size: clamp(20px, 2.15vw, 31px);
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.035em;
}

.section-title__line {
  width: 66px;
  height: 4px;
  margin-block: 14px 13px;
  background: var(--nydk-rosewood);
}

.section-title__chinese {
  margin: 0;
  color: var(--nydk-ink);
  font-size: 22px;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.25em;
  text-indent: 0.25em;
}

.section-title--dark .section-title__watermark {
  color: rgb(255 255 255 / 5%);
}

.section-title--dark .section-title__english,
.section-title--dark .section-title__chinese {
  color: #fff;
}

.section-title--dark .section-title__line {
  background: #fff;
}

.section-title--left {
  align-items: flex-start;
  text-align: left;
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

  .section-title__english {
    font-size: 18px;
  }

  .section-title__line {
    width: 35px;
    height: 2px;
    margin-block: 9px 8px;
  }

  .section-title__chinese {
    font-size: 15px;
  }
}
