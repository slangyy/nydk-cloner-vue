<script setup lang="ts">
import ProductMediaCarousel from "@/components/products/ProductMediaCarousel.vue";
import ProductPageShell from "@/components/products/ProductPageShell.vue";
import ProductReveal from "@/components/products/ProductReveal.vue";
import ProductSectionHeading from "@/components/products/ProductSectionHeading.vue";
import ProductSpaceGallery from "@/components/products/ProductSpaceGallery.vue";
import {
  integratedDetailSlides,
  integratedIntroduction,
  integratedPage,
  integratedSpaceTabs,
} from "@/data/products/gallery";
</script>

<template>
  <ProductPageShell :hero="integratedPage.hero">
    <section class="integrated-intro" aria-labelledby="integrated-intro-heading">
      <div class="integrated-intro__inner">
        <ProductReveal>
          <ProductSectionHeading
            id="integrated-intro-heading"
            :title="integratedIntroduction.title"
            :subtitle="integratedIntroduction.subtitle"
          />
        </ProductReveal>

        <div class="integrated-intro__copy">
          <ProductReveal direction="left" :delay-ms="100">
            <p>{{ integratedIntroduction.description }}</p>
          </ProductReveal>
          <ProductReveal direction="right" :delay-ms="100">
            <p lang="en">
              {{ integratedIntroduction.english }}
            </p>
          </ProductReveal>
        </div>
      </div>
    </section>

    <section
      class="integrated-details"
      aria-labelledby="integrated-details-heading"
    >
      <h2 id="integrated-details-heading" class="sr-only">
        全屋整装产品细节
      </h2>
      <ProductReveal>
        <ProductMediaCarousel
          :slides="integratedDetailSlides"
          label="全屋整装产品细节"
          image-fit="contain"
        />
      </ProductReveal>
    </section>

    <section
      class="integrated-spaces"
      aria-labelledby="integrated-spaces-heading"
    >
      <ProductReveal>
        <ProductSectionHeading
          id="integrated-spaces-heading"
          english="WHOLE HOUSE"
          title="全屋整装，尊享定制"
        />
      </ProductReveal>
      <ProductSpaceGallery
        :tabs="integratedSpaceTabs"
        v-bind="{ ariaLabel: '整装系统空间展示' }"
      />
    </section>
  </ProductPageShell>
</template>

<style scoped>
.integrated-intro {
  min-height: 720px;
  padding: clamp(90px, 8vw, 150px) 0;
  background:
    linear-gradient(rgb(255 255 255 / 82%), rgb(255 255 255 / 82%)),
    url("/assets/products/integrated/a9ecc882-266c-4463-9b0f-9fae0e0c8f5f.jpg")
      center / cover;
}

.integrated-intro__inner {
  width: min(1180px, 88vw);
  margin: 0 auto;
}

.integrated-intro__copy {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(44px, 6vw, 100px);
  margin-top: clamp(62px, 7vw, 110px);
}

.integrated-intro__copy p {
  margin: 0;
  color: #777;
  font-size: 18px;
  line-height: 3;
  text-align: justify;
}

.integrated-details {
  padding: 0 min(20vw, 390px);
  background: #202020;
}

.integrated-details :deep(.product-carousel__slide) {
  height: min(52vw, 790px);
}

.integrated-details :deep(.product-carousel__image) {
  background: #202020;
}

.integrated-details :deep(.product-carousel__button) {
  border-color: transparent;
  background: rgb(184 142 121 / 55%);
  color: #fff;
}

.integrated-details :deep(.product-carousel__button--prev) {
  left: calc(-20vw + 34px);
}

.integrated-details :deep(.product-carousel__button--next) {
  right: calc(-20vw + 34px);
}

.integrated-spaces {
  padding: clamp(90px, 8vw, 150px) 5vw;
  background: #fff;
}

.integrated-spaces :deep(.space-gallery) {
  max-width: 1440px;
  margin: 70px auto 0;
}

.integrated-spaces :deep(.product-carousel__slide) {
  height: min(62vw, 820px);
}

.integrated-spaces :deep(.space-gallery__thumbs) {
  justify-content: center;
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
  .integrated-intro {
    min-height: auto;
    padding: 70px 0;
  }

  .integrated-intro__inner {
    width: 90vw;
  }

  .integrated-intro__copy {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-top: 42px;
  }

  .integrated-intro__copy p {
    font-size: 14px;
    line-height: 2.2;
  }

  .integrated-details {
    padding: 0;
  }

  .integrated-details :deep(.product-carousel__slide) {
    height: 56.25vw;
    min-height: 260px;
  }

  .integrated-details :deep(.product-carousel__button--prev) {
    left: 10px;
  }

  .integrated-details :deep(.product-carousel__button--next) {
    right: 10px;
  }

  .integrated-spaces {
    padding: 70px 5vw;
  }

  .integrated-spaces :deep(.space-gallery) {
    margin-top: 40px;
  }

  .integrated-spaces :deep(.product-carousel__slide) {
    height: 58vw;
    min-height: 280px;
  }
}
</style>
