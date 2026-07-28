<script setup lang="ts">
import ProductMediaCarousel from "@/components/products/ProductMediaCarousel.vue";
import ProductPageShell from "@/components/products/ProductPageShell.vue";
import ProductReveal from "@/components/products/ProductReveal.vue";
import ProductSectionHeading from "@/components/products/ProductSectionHeading.vue";
import {
  servicePage,
  servicePowerSlides,
  serviceSteps,
} from "@/data/products/ops";
</script>

<template>
  <ProductPageShell :hero="servicePage.hero">
    <section class="service-process">
      <div class="service-process__shade">
        <ProductReveal>
          <ProductSectionHeading
            english="SERVICE"
            title="服务流程"
            light
          />
        </ProductReveal>

        <div class="service-step-grid">
          <ProductReveal
            v-for="(step, index) in serviceSteps"
            :key="step.id"
            :delay-ms="index * 70"
          >
            <article class="service-step">
              <div class="service-step__image">
                <img :src="step.icon" :alt="`${step.title}${step.subtitle}`" />
              </div>
              <p class="service-step__number">
                {{ step.number }}
              </p>
              <span aria-hidden="true" />
              <h3>{{ step.title }}</h3>
              <p>{{ step.subtitle }}</p>
            </article>
          </ProductReveal>
        </div>
      </div>
    </section>

    <section class="service-power">
      <ProductReveal>
        <ProductSectionHeading
          english="SERVICE POWER"
          title="服务力"
        />
      </ProductReveal>
      <ProductReveal>
        <ProductMediaCarousel
          class="service-power__carousel"
          :slides="servicePowerSlides"
          label="南洋迪克服务力"
        />
      </ProductReveal>
    </section>
  </ProductPageShell>
</template>

<style scoped>
.service-process {
  position: relative;
  background:
    linear-gradient(rgb(29 20 17 / 74%), rgb(29 20 17 / 74%)),
    url("/assets/products/service/44b0c0d2-94a4-4c86-a696-9600ab687d34.jpg")
      center / cover no-repeat;
  color: #fff;
}

.service-process__shade {
  padding: 100px 0 125px;
}

.service-step-grid {
  position: relative;
  z-index: 1;
  display: grid;
  width: min(94%, 1560px);
  gap: 18px;
  margin: 80px auto 0;
  grid-template-columns: repeat(7, minmax(0, 1fr));
}

.service-step {
  position: relative;
  min-height: 350px;
  overflow: hidden;
  border: 1px solid rgb(255 255 255 / 18%);
  background: rgb(33 24 21 / 56%);
  text-align: center;
}

.service-step__image {
  height: 180px;
  overflow: hidden;
}

.service-step__image img {
  display: block;
  width: 100%;
  height: 100%;
  filter: grayscale(0.35);
  object-fit: cover;
  opacity: 0.76;
  transition:
    opacity 0.4s ease,
    transform 0.6s ease;
}

.service-step:hover .service-step__image img {
  opacity: 1;
  transform: scale(1.04);
}

.service-step p,
.service-step h3 {
  margin: 0;
}

.service-step__number {
  margin-top: 22px !important;
  color: #d0ad9c;
  font-size: 20px;
  letter-spacing: 0.1em;
}

.service-step > span {
  display: block;
  width: 9px;
  height: 9px;
  margin: 13px auto;
  border: 1px solid #d8b8a8;
  border-radius: 50%;
}

.service-step h3,
.service-step > p:last-child {
  display: inline;
  font-size: 17px;
  font-weight: 400;
}

.service-step > p:last-child {
  margin-left: 6px;
  color: #d8cbc5;
}

.service-power {
  padding: 110px 0 135px;
  background: #fff;
}

.service-power__carousel {
  width: min(90%, 1440px);
  margin: 75px auto 0;
  box-shadow: 0 20px 55px rgb(43 26 20 / 10%);
}

.service-power__carousel :deep(.product-carousel__image) {
  height: clamp(430px, 52vw, 720px);
}

.service-power__carousel :deep(.product-carousel__caption) {
  min-height: 145px;
  box-sizing: border-box;
  align-content: end;
  padding: 55px 7% 42px;
  background: linear-gradient(0deg, rgb(20 13 11 / 88%), transparent);
}

.service-power__carousel :deep(.product-carousel__caption strong) {
  font-size: clamp(24px, 2vw, 34px);
  font-weight: 400;
}

.service-power__carousel :deep(.product-carousel__caption span) {
  max-width: 760px;
  font-size: 16px;
  line-height: 1.8;
}

@media (max-width: 1200px) {
  .service-step-grid {
    width: 90%;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (max-width: 998px) {
  .service-process__shade,
  .service-power {
    padding: 64px 0 78px;
  }

  .service-step-grid {
    gap: 12px;
    margin-top: 48px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .service-step {
    min-height: 290px;
  }

  .service-step__image {
    height: 150px;
  }

  .service-power__carousel {
    margin-top: 48px;
  }

  .service-power__carousel :deep(.product-carousel__image) {
    height: 430px;
  }

  .service-power__carousel :deep(.product-carousel__caption) {
    min-height: 130px;
    padding: 40px 48px 24px;
  }

  .service-power__carousel :deep(.product-carousel__caption span) {
    font-size: 14px;
  }
}

@media (max-width: 520px) {
  .service-step {
    min-height: 255px;
  }

  .service-step__image {
    height: 120px;
  }

  .service-step h3,
  .service-step > p:last-child {
    display: block;
    font-size: 15px;
  }

  .service-step > p:last-child {
    margin: 4px 0 0;
  }

  .service-power__carousel :deep(.product-carousel__image) {
    height: 390px;
  }

  .service-power__carousel :deep(.product-carousel__caption) {
    padding: 36px 35px 22px;
  }

  .service-power__carousel :deep(.product-carousel__caption strong) {
    font-size: 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .service-step__image img {
    transition: none;
  }
}
</style>
