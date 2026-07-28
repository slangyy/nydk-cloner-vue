<script setup lang="ts">
import { type ComponentPublicInstance } from "vue";

import { useReveal } from "@/composables/useReveal";

const { target, isVisible } = useReveal();

const setRevealTarget = (element: Element | ComponentPublicInstance | null): void => {
  target.value = element instanceof HTMLElement ? element : null;
};
</script>

<template>
  <section
    :ref="setRevealTarget"
    class="poseena-product-system"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="poseena-product-system-title"
  >
    <div class="poseena-product-system__media">
      <img
        src="/assets/poseena/product-system.jpg"
        alt="POSEENA 3+1+1 产品系统"
        width="959"
        height="600"
        loading="lazy"
      />
    </div>

    <div class="poseena-product-system__copy">
      <h2 id="poseena-product-system-title">
        穿越灵感 行走世界
      </h2>
      <p class="poseena-product-system__subtitle">
        3+1+1产品系统
      </p>
      <i class="poseena-product-system__divider" aria-hidden="true"></i>
      <p class="poseena-product-system__description">
        3大成品家具 / 1个定制中心 / 1个健美用品
      </p>
    </div>
  </section>
</template>

<style scoped>
.poseena-product-system {
  display: flex;
  width: 100%;
  margin-top: 150px;
  align-items: center;
  background: #fff;
  color: #231815;
}

.poseena-product-system__media,
.poseena-product-system__copy {
  width: 50%;
}

.poseena-product-system__media {
  overflow: hidden;
  aspect-ratio: 959 / 600;
  opacity: 0;
  transform: translateX(-60px);
  transition:
    opacity 1s ease,
    transform 1s ease;
}

.poseena-product-system__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.poseena-product-system__media:hover img {
  transform: scale(1.02);
}

.poseena-product-system__copy {
  padding-left: 5%;
  opacity: 0;
  transform: translateX(60px);
  transition:
    opacity 1s ease,
    transform 1s ease;
}

.poseena-product-system.is-visible .poseena-product-system__media,
.poseena-product-system.is-visible .poseena-product-system__copy {
  opacity: 1;
  transform: translateX(0);
}

.poseena-product-system__copy h2 {
  margin: 0;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: 0.02em;
}

.poseena-product-system__subtitle {
  margin: 12px 0 0;
  font-size: 36px;
  line-height: 1.4;
}

.poseena-product-system__divider {
  display: block;
  width: 120px;
  height: 2px;
  margin: 30px 0 50px;
  background: #bc9480;
}

.poseena-product-system__description {
  margin: 0;
  color: #777;
  font-size: 18px;
  font-weight: 600;
  line-height: 2;
}

@media (max-width: 1440px) {
  .poseena-product-system__copy h2 {
    font-size: 38px;
  }

  .poseena-product-system__subtitle {
    font-size: 32px;
  }

  .poseena-product-system__divider {
    margin: 20px 0 30px;
  }

  .poseena-product-system__description {
    font-size: 16px;
  }
}

@media (max-width: 998px) {
  .poseena-product-system {
    width: 90%;
    margin: 40px auto 0;
    flex-wrap: wrap;
    text-align: center;
  }

  .poseena-product-system__copy {
    order: 1;
    width: 100%;
    padding-left: 0;
    transform: translateX(36px);
  }

  .poseena-product-system__media {
    order: 2;
    width: 100%;
    margin-top: 20px;
    transform: translateX(-36px);
  }

  .poseena-product-system__copy h2 {
    font-size: 20px;
  }

  .poseena-product-system__subtitle,
  .poseena-product-system__description {
    font-size: 14px;
  }

  .poseena-product-system__subtitle {
    margin-top: 8px;
  }

  .poseena-product-system__divider {
    width: 60px;
    margin: 14px auto 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .poseena-product-system__media,
  .poseena-product-system__copy {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .poseena-product-system__media img {
    transition: none;
  }
}
</style>
