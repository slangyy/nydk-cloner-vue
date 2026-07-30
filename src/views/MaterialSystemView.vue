<script setup lang="ts">
import SectionTitle from "@/components/SectionTitle.vue";
import ProductPageShell from "@/components/products/ProductPageShell.vue";
import ProductReveal from "@/components/products/ProductReveal.vue";
import { materialItems, materialPage } from "@/data/products/ops";

const materialGroups = [
  {
    id: "p1",
    items: materialItems.slice(0, 3),
  },
  {
    id: "p2",
    items: materialItems.slice(3, 6),
  },
  {
    id: "p3",
    items: materialItems.slice(6, 9),
  },
  {
    id: "p4",
    items: materialItems.slice(9, 12),
  },
] as const;
</script>

<template>
  <ProductPageShell :hero="materialPage.hero">
    <section class="supply-section">
      <div class="supply-section__background" aria-hidden="true"></div>

      <div class="supply-section__inner">
        <ProductReveal>
          <SectionTitle
            class="material-title"
            english="SUPPLY"
            chinese="供应"
            watermark-image="/assets/backgrounds/109cddbb-f0ab-4d85-b117-906b3cd928a9.png"
          />
        </ProductReveal>

        <ProductReveal class="supply-composition">
          <figure class="supply-composition__main">
            <img
              src="/assets/products/material/9ccf65a5-8fbd-4f38-bde9-1c60e784c289.jpg"
              alt="南洋迪克国际原材料供应"
            />
          </figure>

          <div class="supply-composition__copy">
            <h3>供应</h3>
            <p>强大的国际供应链、企业专属定制原材料</p>
            <img
              class="supply-composition__logo"
              src="/assets/products/material/a2275f52-13f2-407f-9c5e-9337c2a00f0a.png"
              alt="南洋迪克国际供应品牌"
            />
          </div>
        </ProductReveal>

        <ProductReveal class="supply-storey">
          <figure>
            <img
              src="/assets/products/material/ffd544d3-d397-4e02-ab99-532b44329103.jpg"
              alt="南洋迪克五金供应品牌"
            />
          </figure>
          <figure>
            <img
              src="/assets/products/material/86575e54-1201-430e-bf92-165404773f90.jpg"
              alt="南洋迪克国际材料供应品牌"
            />
          </figure>
        </ProductReveal>
      </div>
    </section>

    <section class="materials-section">
      <div class="materials-section__inner">
        <ProductReveal>
          <SectionTitle
            class="material-title"
            english="Multiple material selection"
            chinese="多元选材"
            watermark-image="/assets/backgrounds/109cddbb-f0ab-4d85-b117-906b3cd928a9.png"
          />
        </ProductReveal>

        <div class="material-mosaic">
          <ProductReveal
            v-for="group in materialGroups"
            :key="group.id"
            class="material-group"
            :class="`material-group--${group.id}`"
          >
            <ul>
              <li v-for="item in group.items" :key="item.id">
                <img :src="item.image" :alt="item.title" />
                <p>{{ item.title }}</p>
              </li>
            </ul>
          </ProductReveal>
        </div>
      </div>
    </section>
  </ProductPageShell>
</template>

<style scoped>
.material-title {
  height: min(10.48vw, 201px);
  min-height: min(10.48vw, 201px);
  justify-content: flex-start;
  overflow: visible;
  padding: min(1.05vw, 20px) 0 0;
}

.material-title :deep(.section-title__watermark--image) {
  width: min(10.45vw, 200px);
  height: min(10.48vw, 201px);
  transform: translate(-50%, -50%);
}

.material-title :deep(.section-title__english) {
  position: relative;
  z-index: 1;
  color: #634f44;
  font-size: clamp(38px, 2.5vw, 48px);
  font-weight: 400;
  line-height: clamp(60px, 3.23vw, 62px);
  letter-spacing: 0;
  text-transform: none;
}

.material-title :deep(.section-title__line) {
  display: none;
}

.material-title :deep(.section-title__chinese) {
  position: relative;
  z-index: 1;
  color: #231815;
  font-size: clamp(32px, 1.875vw, 36px);
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0;
}

.supply-section {
  position: relative;
  box-sizing: border-box;
  padding-top: 5.5vw;
  background: #fff;
}

.supply-section__background {
  position: absolute;
  inset: 0 0 auto;
  width: 100%;
  height: 82%;
  background: #faf8f7;
}

.supply-section__inner,
.materials-section__inner {
  position: relative;
  width: min(80%, 1440px);
  margin: 0 auto;
}

.supply-composition {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  margin-top: 4%;
}

.supply-composition__main {
  width: 64%;
  overflow: hidden;
  margin: 0;
}

.supply-composition__main img,
.supply-storey img {
  display: block;
  width: 100%;
  height: auto;
  transition: transform 0.5s ease;
}

.supply-composition__main:hover img,
.supply-storey figure:hover img {
  transform: scale(1.05);
}

.supply-composition__copy {
  width: 35%;
  box-sizing: border-box;
  margin-top: 4%;
}

.supply-composition__copy h3,
.supply-composition__copy p {
  margin: 0;
  color: #231815;
  font-weight: 400;
}

.supply-composition__copy h3 {
  display: flex;
  flex-flow: column wrap;
  align-items: flex-end;
  font-size: clamp(32px, 1.875vw, 36px);
  line-height: 1.5;
}

.supply-composition__copy h3::after {
  display: block;
  width: 70px;
  height: 1px;
  margin: 3% 0 6%;
  background: #bc9480;
  content: "";
}

.supply-composition__copy p {
  font-size: 20px;
  line-height: 1.5;
  text-align: right;
}

.supply-composition__logo {
  display: block;
  width: 59.2%;
  height: auto;
  margin-top: 7%;
  margin-left: auto;
}

.supply-storey {
  position: absolute;
  top: 80%;
  right: 0;
  display: flex;
  width: 100%;
  justify-content: flex-end;
}

.supply-storey figure {
  display: block;
  overflow: hidden;
  margin: 0;
}

.supply-storey figure:first-child {
  width: 26.388%;
  margin-right: 1%;
}

.supply-storey figure:last-child {
  width: 35%;
}

.materials-section {
  margin-top: 13.5vw;
  background: #fff;
}

.material-mosaic {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 5%;
}

.material-group {
  width: 49.51%;
}

.material-group ul {
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
}

.material-group li {
  position: relative;
  overflow: hidden;
  margin-bottom: 1.84%;
}

.material-group li img {
  display: block;
  width: 100%;
  height: auto;
  transition: transform 0.5s ease;
}

.material-group li:hover img {
  transform: scale(1.05);
}

.material-group li p {
  position: absolute;
  bottom: 3%;
  left: 5%;
  z-index: 1;
  margin: 0;
  color: #fff;
  font-size: clamp(16px, 1.25vw, 24px);
  font-weight: 400;
  line-height: 1.5;
}

.material-group--p1 ul,
.material-group--p4 ul {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
}

.material-group--p1 li:first-child,
.material-group--p4 li:first-child {
  width: 100%;
}

.material-group--p1 li:nth-child(2),
.material-group--p1 li:nth-child(3),
.material-group--p4 li:nth-child(2),
.material-group--p4 li:nth-child(3) {
  width: 49.08%;
}

.material-group--p2 ul,
.material-group--p3 ul {
  display: flow-root;
}

.material-group--p2 li,
.material-group--p3 li {
  width: 49.08%;
}

.material-group--p2 li:first-child,
.material-group--p2 li:nth-child(3),
.material-group--p3 li:first-child {
  float: left;
}

.material-group--p2 li:nth-child(2),
.material-group--p3 li:nth-child(2),
.material-group--p3 li:nth-child(3) {
  float: right;
}

@media (max-width: 998px) {
  .material-title {
    height: 105px;
    min-height: 105px;
    padding-top: 11px;
  }

  .material-title :deep(.section-title__watermark--image) {
    width: 104.5px;
    height: 105px;
    transform: translate(-50%, -50%);
  }

  .material-title :deep(.section-title__english) {
    font-size: 20px;
    line-height: 42px;
  }

  .material-title :deep(.section-title__chinese) {
    font-size: 18px;
    line-height: 27px;
  }

  .supply-section {
    padding-top: 5.5%;
  }

  .supply-section__background {
    height: 82%;
  }

  .supply-section__inner,
  .materials-section__inner {
    width: 90%;
  }

  .supply-composition {
    flex-wrap: wrap;
    margin-top: 4%;
  }

  .supply-composition__main {
    width: 100%;
  }

  .supply-composition__copy {
    width: 100%;
    padding: 30px 0;
    margin-top: 1%;
  }

  .supply-composition__copy h3 {
    align-items: center;
    font-size: 18px;
    line-height: 27px;
  }

  .supply-composition__copy p {
    font-size: 16px;
    line-height: 24px;
    text-align: center;
  }

  .supply-composition__logo {
    width: 59.2%;
    margin: 4% auto 0;
  }

  .supply-storey {
    position: static;
  }

  .supply-storey figure:first-child {
    width: 43%;
    margin-right: 1%;
  }

  .supply-storey figure:last-child {
    width: 56%;
  }

  .materials-section {
    margin-top: 13.5%;
  }

  .material-group {
    width: 100%;
  }

  .material-group li p {
    font-size: 16px;
    line-height: 24px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .supply-composition__main img,
  .supply-storey img,
  .material-group li img {
    transition: none;
  }

  .supply-composition__main:hover img,
  .supply-storey figure:hover img,
  .material-group li:hover img {
    transform: none;
  }
}
</style>
