<script setup lang="ts">
import SectionTitle from "@/components/SectionTitle.vue";
import ProductPageShell from "@/components/products/ProductPageShell.vue";
import ProductReveal from "@/components/products/ProductReveal.vue";
import { materialItems, materialPage } from "@/data/products/ops";
</script>

<template>
  <ProductPageShell :hero="materialPage.hero">
    <section class="supply-intro">
      <ProductReveal>
        <SectionTitle english="SUPPLY" chinese="供应" />
      </ProductReveal>

      <div class="supply-intro__content">
        <ProductReveal direction="left">
          <img
            class="supply-intro__main-image"
            src="/assets/products/material/9ccf65a5-8fbd-4f38-bde9-1c60e784c289.jpg"
            alt="南洋迪克国际材料供应"
          />
        </ProductReveal>
        <ProductReveal direction="right">
          <div class="supply-intro__copy">
            <img
              src="/assets/products/material/a2275f52-13f2-407f-9c5e-9337c2a00f0a.png"
              alt=""
              aria-hidden="true"
            />
            <h3>供应</h3>
            <span aria-hidden="true" />
            <p>强大的国际供应链、企业专属定制原材料</p>
          </div>
        </ProductReveal>
      </div>

      <div class="supply-intro__texture">
        <ProductReveal direction="left">
          <img
            src="/assets/products/material/ffd544d3-d397-4e02-ab99-532b44329103.jpg"
            alt="天然材料细节"
          />
        </ProductReveal>
        <ProductReveal direction="right">
          <img
            src="/assets/products/material/86575e54-1201-430e-bf92-165404773f90.jpg"
            alt="严选原材料细节"
          />
        </ProductReveal>
      </div>
    </section>

    <section class="materials-section">
      <ProductReveal>
        <SectionTitle
          english="Multiple material selection"
          chinese="多元选材"
        />
      </ProductReveal>

      <div class="material-grid">
        <ProductReveal
          v-for="(item, index) in materialItems"
          :key="item.id"
          :delay-ms="(index % 4) * 80"
        >
          <article class="material-card">
            <div class="material-card__image">
              <img :src="item.image" :alt="item.title" />
            </div>
            <h3>{{ item.title }}</h3>
          </article>
        </ProductReveal>
      </div>
    </section>
  </ProductPageShell>
</template>

<style scoped>
.supply-intro {
  padding: 110px 0 100px;
  background: #fff;
}

.supply-intro__content {
  display: grid;
  width: min(90%, 1440px);
  align-items: center;
  margin: 75px auto 0;
  grid-template-columns: 1.45fr 0.8fr;
}

.supply-intro__main-image {
  display: block;
  width: 100%;
}

.supply-intro__copy {
  position: relative;
  min-height: 320px;
  box-sizing: border-box;
  padding: 70px 12%;
  overflow: hidden;
  background: #f7f1ed;
}

.supply-intro__copy > img {
  position: absolute;
  right: -36%;
  bottom: 0;
  width: 120%;
  opacity: 0.13;
}

.supply-intro__copy h3,
.supply-intro__copy p {
  position: relative;
  margin: 0;
}

.supply-intro__copy h3 {
  font-size: 30px;
  font-weight: 400;
}

.supply-intro__copy span {
  position: relative;
  display: block;
  width: 58px;
  height: 2px;
  margin: 24px 0;
  background: #c49a86;
}

.supply-intro__copy p {
  font-size: 17px;
  line-height: 1.9;
}

.supply-intro__texture {
  display: grid;
  width: min(90%, 1440px);
  gap: 24px;
  margin: 24px auto 0;
  grid-template-columns: 1fr 1fr;
}

.supply-intro__texture img {
  display: block;
  width: 100%;
  height: 390px;
  object-fit: cover;
}

.materials-section {
  padding: 110px 0 140px;
  background: #f8f6f4;
}

.material-grid {
  display: grid;
  width: min(90%, 1440px);
  gap: 28px;
  margin: 75px auto 0;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.material-card {
  overflow: hidden;
  background: #fff;
}

.material-card__image {
  height: 310px;
  overflow: hidden;
}

.material-card img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.65s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.material-card:hover img {
  transform: scale(1.045);
}

.material-card h3 {
  padding: 24px 16px 26px;
  margin: 0;
  color: #281e1a;
  font-size: 18px;
  font-weight: 400;
  text-align: center;
}

@media (max-width: 998px) {
  .supply-intro,
  .materials-section {
    padding: 64px 0 76px;
  }

  .supply-intro__content {
    margin-top: 45px;
    grid-template-columns: 1fr;
  }

  .supply-intro__copy {
    min-height: 230px;
    padding: 48px 8%;
  }

  .supply-intro__texture {
    gap: 12px;
    margin-top: 12px;
  }

  .supply-intro__texture img {
    height: 280px;
  }

  .material-grid {
    gap: 18px;
    margin-top: 48px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .material-card__image {
    height: 250px;
  }
}

@media (max-width: 640px) {
  .supply-intro__texture {
    grid-template-columns: 1fr;
  }

  .supply-intro__texture img {
    height: 240px;
  }

  .material-grid {
    gap: 10px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .material-card__image {
    height: 190px;
  }

  .material-card h3 {
    padding: 17px 8px 19px;
    font-size: 15px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .material-card img {
    transition: none;
  }
}
</style>
