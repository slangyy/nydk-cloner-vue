<script setup lang="ts">
import ProductMediaCarousel from "@/components/products/ProductMediaCarousel.vue";
import ProductPageShell from "@/components/products/ProductPageShell.vue";
import ProductReveal from "@/components/products/ProductReveal.vue";
import ProductSectionHeading from "@/components/products/ProductSectionHeading.vue";
import {
  productionCapabilities,
  productionEquipmentDescription,
  productionEquipmentSlides,
  productionPage,
  productionTeamStats,
} from "@/data/products/ops";
import SectionTitle from "@/components/SectionTitle.vue";
</script>

<template>
  <ProductPageShell :hero="productionPage.hero">
    <section class="capability-section">
      <ProductReveal>
        <ProductSectionHeading
          english="INTELLECTUAL CREATIVITY"
          title="智造力"
        />
      </ProductReveal>

      <div class="capability-strip">
        <ProductReveal
          v-for="(capability, index) in productionCapabilities"
          :key="capability.id"
          :delay-ms="index * 80"
        >
          <article class="capability-card">
            <h3>{{ capability.title }}</h3>
            <img :src="capability.icon" alt="" aria-hidden="true" />
            <p>
              <span v-for="line in capability.description" :key="line">
                {{ line }}
              </span>
            </p>
          </article>
        </ProductReveal>
      </div>
    </section>

    <section class="equipment-section">
      <div class="equipment-section__shade">
        <ProductReveal>
          <ProductSectionHeading
            english="PLANT EQUIPMENT"
            title="工厂 / 设备"
            light
          />
          <p class="equipment-section__description">
            {{ productionEquipmentDescription }}
          </p>
        </ProductReveal>
      </div>
      <ProductMediaCarousel
        class="equipment-carousel"
        :slides="productionEquipmentSlides"
        label="南洋迪克工厂设备"
      />
    </section>



    <section class="supply-section">
      <ProductReveal>
        <ProductSectionHeading
          english="ENVIRONMENTAL PROTECTION SUPPLY"
          title="环保 / 供应"
        />
      </ProductReveal>

      <div class="supply-section__grid">
        <ProductReveal direction="left">
          <article class="supply-copy">
            <h3>环保</h3>
            <span aria-hidden="true" />
            <p>沸石转轮+RTO、有机废气治理设施4/套</p>
          </article>
        </ProductReveal>
        <ProductReveal direction="right">
          <div class="environment-images">
            <img
              src="/assets/products/production/bc9710f1-aad8-49d0-9576-0101e6fa48d9.jpg"
              alt="有机废气治理设施"
            />
            <img
              src="/assets/products/production/4667c3a2-3f91-417b-b927-5668c1279d60.jpg"
              alt="沸石转轮RTO治理设施"
            />
          </div>
        </ProductReveal>

        <ProductReveal direction="left">
          <img
            class="supply-map"
            src="/assets/products/production/6cf4d1ec-38ec-4f9b-9735-b3168d7cbcca.jpg"
            alt="南洋迪克国际供应链"
          />
        </ProductReveal>
        <ProductReveal direction="right">
          <article class="supply-copy supply-copy--right">
            <h3>供应</h3>
            <span aria-hidden="true" />
            <p>强大的国际供应链、企业专属定制原材料</p>
          </article>
        </ProductReveal>
      </div>
    </section>
  </ProductPageShell>
</template>

<style scoped>
.capability-section {
  padding: 100px 0 115px;
  background:
    linear-gradient(rgb(250 245 241 / 82%), rgb(250 245 241 / 82%)),
    url("/assets/products/production/b4ec228d-199d-4e66-86f7-8984b4c7734f.jpg")
      center / cover;
}

.capability-strip {
  display: grid;
  width: min(90%, 1440px);
  grid-template-columns: repeat(5, minmax(220px, 1fr));
  gap: 22px;
  margin: 70px auto 0;
  overflow-x: auto;
  scrollbar-width: none;
}

.capability-strip::-webkit-scrollbar {
  display: none;
}

.capability-card {
  display: grid;
  min-height: 330px;
  box-sizing: border-box;
  padding: 42px 22px 34px;
  border: 1px dashed rgb(196 154 134 / 28%);
  border-radius: 20px;
  background: rgb(255 255 255 / 92%);
  color: #a97d69;
  place-items: center;
  text-align: center;
}

.capability-card h3,
.capability-card p {
  margin: 0;
}

.capability-card h3 {
  font-size: 25px;
  font-weight: 400;
  letter-spacing: 0.2em;
}

.capability-card img {
  width: 74px;
  height: 112px;
  object-fit: contain;
}

.capability-card p {
  color: #a68b80;
  font-size: 15px;
  line-height: 1.7;
}

.capability-card p span {
  display: block;
}

.equipment-section {
  padding-top: 88px;
  background:
    linear-gradient(rgb(27 14 10 / 82%), rgb(27 14 10 / 82%)),
    url("/assets/products/production/27bcb19a-0d67-49ab-8acb-4f682dfdf21b.jpg")
      center top / cover no-repeat;
  color: #fff;
}

.equipment-section__shade {
  width: min(90%, 1440px);
  margin: 0 auto;
}

.equipment-section__description {
  margin: 54px auto 46px;
  font-size: 16px;
  line-height: 1.9;
  text-align: center;
}

.equipment-carousel {
  width: min(100%, 1440px);
  margin: 0 auto;
}

.equipment-carousel :deep(.product-carousel__image) {
  height: clamp(280px, 36vw, 560px);
}

.team-section {
  padding: 115px 0;
  background: #f8f5f2;
}

.team-section__content {
  display: grid;
  width: min(90%, 1440px);
  align-items: center;
  margin: 0 auto;
  grid-template-columns: 0.8fr 1.2fr;
}

.team-section__copy {
  padding: 40px 8%;
}

.team-section__copy > p,
.team-section__copy > h2 {
  margin: 0;
}

.team-section__copy > p {
  color: #6a554b;
  font-size: 45px;
  letter-spacing: 0.12em;
}

.team-section__copy > h2 {
  margin-top: 12px;
  font-size: 34px;
  font-weight: 400;
}

.team-section__copy > span,
.supply-copy > span {
  display: block;
  width: 56px;
  height: 2px;
  margin: 22px 0 32px;
  background: #c49a86;
}

.team-section__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.team-section__stats article {
  padding: 0 12px;
  border-right: 1px solid #d9cbc3;
  text-align: center;
}

.team-section__stats article:last-child {
  border-right: 0;
}

.team-section__stats strong {
  color: #b98974;
  font-size: clamp(28px, 2.4vw, 42px);
  font-weight: 400;
}

.team-section__stats p {
  margin: 10px 0 0;
  font-size: 15px;
}

.team-section__content img {
  display: block;
  width: 100%;
}

.supply-section {
  padding: 120px 0 145px;
  background: #fff;
}

.supply-section__grid {
  display: grid;
  width: min(90%, 1440px);
  align-items: center;
  margin: 90px auto 0;
  grid-template-columns: 0.72fr 1.28fr;
}

.supply-copy {
  padding: 35px 10%;
}

.supply-copy h3,
.supply-copy p {
  margin: 0;
}

.supply-copy h3 {
  font-size: 30px;
  font-weight: 400;
}

.supply-copy p {
  font-size: 17px;
  line-height: 1.8;
}

.supply-copy--right {
  padding-left: 18%;
}

.environment-images {
  display: grid;
  grid-template-columns: 0.76fr 1fr;
  gap: 20px;
}

.environment-images img,
.supply-map {
  display: block;
  width: 100%;
}

.environment-images img {
  height: 450px;
  object-fit: cover;
}

.supply-map {
  margin-top: 80px;
}

@media (max-width: 998px) {
  .capability-section,
  .team-section,
  .supply-section {
    padding: 64px 0;
  }

  .capability-strip {
    grid-template-columns: repeat(5, 240px);
    gap: 14px;
    margin-top: 42px;
    scroll-snap-type: x proximity;
  }

  .capability-strip > * {
    scroll-snap-align: start;
  }

  .capability-card {
    min-height: 300px;
    padding: 30px 18px;
  }

  .equipment-section {
    padding-top: 60px;
  }

  .equipment-section__description {
    margin: 36px auto;
    font-size: 14px;
  }

  .team-section__content,
  .supply-section__grid {
    grid-template-columns: 1fr;
  }

  .team-section__copy {
    padding: 0 0 42px;
  }

  .team-section__copy > p {
    font-size: 32px;
  }

  .team-section__copy > h2 {
    font-size: 26px;
  }

  .supply-section__grid {
    margin-top: 52px;
  }

  .supply-copy,
  .supply-copy--right {
    padding: 38px 0;
  }

  .environment-images img {
    height: auto;
    aspect-ratio: 1 / 1.15;
  }

  .supply-map {
    margin-top: 30px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .capability-strip {
    scroll-behavior: auto;
  }
}
</style>
