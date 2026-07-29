<script setup lang="ts">
import SectionTitle from "@/components/SectionTitle.vue";
import ProductPageShell from "@/components/products/ProductPageShell.vue";
import ProductReveal from "@/components/products/ProductReveal.vue";
import ProductSpaceGallery from "@/components/products/ProductSpaceGallery.vue";
import {
  finishedIntroduction,
  finishedPage,
  finishedSpaceTabs,
} from "@/data/products/gallery";
</script>

<template>
  <ProductPageShell :hero="finishedPage.hero">
    <section class="finished-intro" aria-labelledby="finished-intro-heading">
      <div class="finished-intro__inner">
        <ProductReveal>
          <SectionTitle
            id="finished-intro-heading"
            :chinese="finishedIntroduction.title"
            :subtitle="finishedIntroduction.subtitle"
          />
        </ProductReveal>

        <div class="finished-intro__copy">
          <ProductReveal direction="left" :delay-ms="100">
            <p>{{ finishedIntroduction.description }}</p>
          </ProductReveal>
          <ProductReveal direction="right" :delay-ms="100">
            <p lang="en">
              {{ finishedIntroduction.english }}
            </p>
          </ProductReveal>
        </div>
      </div>
    </section>

    <section class="finished-gallery" aria-labelledby="finished-gallery-heading">
      <h2 id="finished-gallery-heading" class="sr-only">
        POSEENA普西纳空间展示
      </h2>
      <ProductSpaceGallery
        :tabs="finishedSpaceTabs"
        v-bind="{ ariaLabel: 'POSEENA普西纳空间展示' }"
      />
    </section>
  </ProductPageShell>
</template>

<style scoped>
.finished-intro {
  min-height: 760px;
  padding: clamp(90px, 9vw, 170px) 0;
  background:
    linear-gradient(rgb(255 255 255 / 82%), rgb(255 255 255 / 82%)),
    url("/assets/products/finished/954d088f-9daa-4e97-aa81-0a3bafcfa11c.jpg")
      center / cover;
}

.finished-intro__inner {
  width: min(1180px, 88vw);
  margin: 0 auto;
}

.finished-intro__copy {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(44px, 6vw, 100px);
  margin-top: clamp(62px, 7vw, 110px);
}

.finished-intro__copy p {
  margin: 0;
  color: #777;
  font-size: 18px;
  line-height: 3;
  text-align: justify;
}

.finished-gallery {
  position: relative;
  background: #211814;
}

.finished-gallery :deep(.space-gallery) {
  position: relative;
  min-height: min(100vh, 1080px);
}

.finished-gallery :deep(.space-gallery__tabs) {
  position: absolute;
  z-index: 8;
  right: 5vw;
  bottom: 34px;
  left: 5vw;
  max-width: 1440px;
  margin: 0 auto;
}

.finished-gallery :deep(.space-gallery__tab) {
  flex: 1 0 130px;
  color: rgb(255 255 255 / 55%);
}

.finished-gallery :deep(.space-gallery__tab--active) {
  border-color: transparent;
  border-radius: 60px;
  background: rgb(184 142 121 / 62%);
  color: #fff;
}

.finished-gallery :deep(.space-gallery__tab img) {
  filter: brightness(0) invert(1);
  opacity: 0.72;
}

.finished-gallery :deep(.space-gallery__tab--active img) {
  opacity: 1;
}

.finished-gallery :deep(.space-gallery__content) {
  min-height: min(100vh, 1080px);
}

.finished-gallery :deep(.product-carousel__slide) {
  height: min(100vh, 1080px);
}

.finished-gallery :deep(.product-carousel__slide::after) {
  position: absolute;
  z-index: 1;
  inset: 0;
  background: rgb(20 12 9 / 48%);
  content: "";
  pointer-events: none;
}

.finished-gallery :deep(.product-carousel__caption) {
  z-index: 3;
  top: 50%;
  right: auto;
  bottom: auto;
  left: 50%;
  display: flex;
  padding: 0;
  background: transparent;
  gap: 12px;
  text-align: center;
  transform: translate(-50%, -50%);
  flex-direction: column-reverse;
}

.finished-gallery :deep(.product-carousel__caption strong) {
  font-size: clamp(28px, 2.1vw, 40px);
  font-weight: 400;
  letter-spacing: 0.28em;
}

.finished-gallery :deep(.product-carousel__caption span) {
  font-family: "Bank", Arial, sans-serif;
  font-size: clamp(26px, 2.3vw, 44px);
  letter-spacing: 0.13em;
}

.finished-gallery :deep(.space-gallery__thumbs) {
  position: absolute;
  z-index: 7;
  top: 24px;
  right: 24px;
  max-width: calc(100% - 48px);
  padding: 0;
}

.finished-gallery :deep(.space-gallery__thumbs button) {
  border-color: rgb(255 255 255 / 38%);
}

.finished-gallery :deep(.product-carousel__button) {
  top: 50%;
  border-color: rgb(255 255 255 / 55%);
  background: rgb(51 37 31 / 66%);
  color: #fff;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

@media (max-width: 998px) {
  .finished-intro {
    min-height: auto;
    padding: 70px 0;
  }

  .finished-intro__inner {
    width: 90vw;
  }

  .finished-intro__copy {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 42px;
  }

  .finished-intro__copy p {
    font-size: 14px;
    line-height: 2.2;
  }

  .finished-gallery :deep(.space-gallery),
  .finished-gallery :deep(.space-gallery__content),
  .finished-gallery :deep(.product-carousel__slide) {
    min-height: 620px;
    height: 620px;
  }

  .finished-gallery :deep(.space-gallery__tabs) {
    right: 0;
    bottom: 12px;
    left: 0;
    padding: 0 12px;
  }

  .finished-gallery :deep(.space-gallery__tab) {
    min-width: 110px;
    padding: 10px 8px;
  }

  .finished-gallery :deep(.space-gallery__tab img) {
    width: 38px;
    height: 38px;
  }

  .finished-gallery :deep(.space-gallery__tab span) {
    font-size: 10px;
  }

  .finished-gallery :deep(.space-gallery__tab strong) {
    font-size: 14px;
  }

  .finished-gallery :deep(.space-gallery__thumbs) {
    top: 12px;
    right: 12px;
    max-width: calc(100% - 24px);
  }

  .finished-gallery :deep(.space-gallery__thumbs button) {
    width: 86px;
    min-width: 86px;
    height: 58px;
  }
}
</style>
