<script setup lang="ts">
import ProductReveal from "@/components/products/ProductReveal.vue";
import {
  designMatrixImages,
  designOriginal,
  designPower,
} from "@/data/products/static";
</script>

<template>
  <div class="design-content">
    <section class="design-matrix">
      <ProductReveal class="design-matrix__heading">
        <img
          class="design-matrix__watermark"
          src="/assets/backgrounds/109cddbb-f0ab-4d85-b117-906b3cd928a9.png"
          alt=""
          aria-hidden="true"
        />
        <div class="design-matrix__heading-copy">
          <h2>中国高定整装领导品牌</h2>
          <p>生活的从容&nbsp;&nbsp;从好的设计开始</p>
        </div>
      </ProductReveal>

      <div class="design-matrix__grid">
        <ProductReveal
          v-for="(item, index) in designMatrixImages"
          :key="item.id"
          :delay-ms="(index % 3) * 90"
        >
          <figure class="design-matrix__item">
            <img :src="item.image" :alt="item.imageAlt" loading="lazy" />
          </figure>
        </ProductReveal>
      </div>
    </section>

    <section class="original-design">
      <ProductReveal class="original-design__ornament" direction="up">
        <img :src="designOriginal.ornament" alt="" aria-hidden="true" />
      </ProductReveal>

      <div class="original-design__inner">
        <ProductReveal class="original-design__copy" direction="left">
          <h2>{{ designOriginal.title }}</h2>
          <p class="original-design__subtitle">
            {{ designOriginal.subtitle }}
          </p>
          <span class="original-design__line" aria-hidden="true" />
          <p class="original-design__description">
            {{ designOriginal.description }}
          </p>
        </ProductReveal>

        <ProductReveal class="original-design__visual" direction="right">
          <img
            class="original-design__main"
            :src="designOriginal.mainImage"
            alt="南洋迪克原创卧室空间设计"
            loading="lazy"
          />
          <ProductReveal class="original-design__detail">
            <img
              :src="designOriginal.detailImage"
              alt="南洋迪克家具材质与缝线细节"
              loading="lazy"
            />
          </ProductReveal>
        </ProductReveal>
      </div>
    </section>

    <section
      class="design-power"
      :style="{ backgroundImage: `url(${designPower.image})` }"
    >
      <ProductReveal class="design-power__content">
        <h2>{{ designPower.title }}</h2>
        <p class="design-power__subtitle">
          {{ designPower.subtitle }}
        </p>
        <span class="design-power__line" aria-hidden="true" />
        <p class="design-power__description">
          {{ designPower.description }}
        </p>
      </ProductReveal>
    </section>
  </div>
</template>

<style scoped>
.design-content {
  overflow: hidden;
  background: #fff;
}

.design-matrix {
  width: min(1440px, 75.2vw);
  margin-inline: auto;
}

.design-matrix__heading {
  margin-top: 120px;
  position: relative;
  display: flex;
  height: 143px;
  justify-content: center;
}

.design-matrix__watermark {
  width: auto;
  margin-top: 10px;
  height: 143px;
}

.design-matrix__heading-copy {
  position: absolute;
  top: 68px;
  left: 50%;
  width: 100%;
  color: #231815;
  text-align: center;
  transform: translateX(-50%);
}

.design-matrix__heading-copy h2,
.design-matrix__heading-copy p {
  margin: 0;
  font-weight: 400;
  white-space: nowrap;
}

.design-matrix__heading-copy h2 {
  font-size: 36px;
  letter-spacing: 0.6em;
  line-height: 36px;
}

.design-matrix__heading-copy p {
  margin-top: 29px;
  font-size: 22px;
  letter-spacing: 0.3em;
  line-height: 33px;
}

.design-matrix__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  margin-top: 115px;
  overflow: hidden;
}

.design-matrix__item {
  aspect-ratio: 5 / 3;
  margin: 0;
  overflow: hidden;
  background: #eee;
}

.design-matrix__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.design-matrix__item:hover img {
  transform: scale(1.035);
}

.original-design {
  position: relative;
  height: min(51.42vw, 985px);
  margin-top: 10vw;
}

.original-design__inner {
  display: flex;
  width: min(1440px, 75.2vw);
  height: 100%;
  align-items: center;
  justify-content: space-between;
  margin-inline: auto;
}

.original-design__ornament {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 536px;
  overflow: hidden;
}

.original-design__ornament img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.original-design__copy {
  width: 48%;
}

.original-design__copy h2,
.original-design__copy p {
  margin: 0;
}

.original-design__copy h2 {
  color: #231815;
  font-size: 52px;
  font-weight: 400;
  letter-spacing: 0.1em;
  line-height: 1.3;
}

.original-design__subtitle {
  margin-top: 35px !important;
  color: #231815;
  font-size: 36px;
  letter-spacing: 0.5em;
  line-height: 1.5;
}

.original-design__line {
  display: block;
  width: 120px;
  height: 2px;
  margin: 41px 0 48px;
  background: #bc9480;
}

.original-design__description {
  color: #7d7d7d;
  font-size: 18px;
  letter-spacing: 0.18em;
  line-height: 3.33;
}

.original-design__visual {
  position: relative;
  width: 45%;
  height: 100%;
}

.original-design__main {
  width: 136%;
  height: 100%;
  object-fit: cover;
}

.original-design__detail {
  position: absolute;
  bottom: -18%;
  left: -52.5%;
  width: 52.5%;
  aspect-ratio: 1;
  overflow: hidden;
}

.original-design__detail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.design-power {
  position: relative;
  display: grid;
  height: min(50.61vw, 970px);
  margin-top: min(20vw, 383px);
  place-items: center;
  overflow: hidden;
  background-position: center;
  background-size: cover;
}

.design-power__content {
  position: relative;
  z-index: 1;
  width: 100%;
  color: #fff;
  text-align: center;
}

.design-power__content h2,
.design-power__content p {
  margin: 0;
}

.design-power__content h2 {
  font-size: 52px;
  font-weight: 400;
  letter-spacing: 0.1em;
  line-height: 1.3;
}

.design-power__subtitle {
  margin-top: 33px !important;
  font-size: 36px;
  letter-spacing: 0.5em;
  line-height: 1.5;
}

.design-power__line {
  display: block;
  width: 140px;
  height: 2px;
  margin: 42px auto 38px;
  background: #9a8377;
}

.design-power__description {
  width: 44%;
  margin-inline: auto !important;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0.2em;
  line-height: 3.33;
}

@media (max-width: 998px) {
  .design-matrix {
    width: 90vw;
    padding: 0;
  }

  .design-matrix__heading {
    height: 112px;
  }

  .design-matrix__watermark {
    height: 112px;
  }

  .design-matrix__heading-copy {
    top: 52px;
  }

  .design-matrix__heading-copy h2 {
    font-size: 27px;
    letter-spacing: 0.38em;
    line-height: 30px;
  }

  .design-matrix__heading-copy p {
    margin-top: 20px;
    font-size: 18px;
    letter-spacing: 0.2em;
    line-height: 28px;
  }

  .design-matrix__grid {
    gap: 1px;
    margin-top: 76px;
  }

  .original-design {
    height: auto;
    min-height: 0;
    margin-top: 72px;
    padding: 0 5vw 110px;
  }

  .original-design__inner {
    display: grid;
    width: 100%;
    height: auto;
    gap: 48px;
  }

  .original-design__ornament {
    display: none;
  }

  .original-design__copy,
  .original-design__visual {
    width: 100%;
  }

  .original-design__copy h2 {
    font-size: 34px;
  }

  .original-design__subtitle {
    margin-top: 22px !important;
    font-size: 23px;
    letter-spacing: 0.3em;
  }

  .original-design__line {
    width: 80px;
    margin: 28px 0 30px;
  }

  .original-design__description {
    font-size: 15px;
    letter-spacing: 0.12em;
    line-height: 2.35;
  }

  .original-design__visual {
    height: auto;
    padding-bottom: 18%;
  }

  .original-design__main {
    width: 100%;
    height: auto;
  }

  .original-design__detail {
    bottom: 0;
    left: 0;
    width: 38%;
  }

  .design-power {
    min-height: 620px;
  }

  .design-power__content {
    width: 90%;
  }

  .design-power__content h2 {
    font-size: 34px;
  }

  .design-power__subtitle {
    font-size: 23px;
    letter-spacing: 0.3em;
  }

  .design-power__line {
    width: 90px;
    margin: 30px auto;
  }

  .design-power__description {
    width: min(720px, 92%);
    font-size: 15px;
    letter-spacing: 0.12em;
    line-height: 2.4;
  }
}

@media (max-width: 560px) {
  .design-matrix {
    width: 94vw;
  }

  .design-matrix__heading {
    height: 92px;
  }

  .design-matrix__watermark {
    height: 92px;
  }

  .design-matrix__heading-copy {
    top: 42px;
  }

  .design-matrix__heading-copy h2 {
    font-size: 21px;
    letter-spacing: 0.2em;
  }

  .design-matrix__heading-copy p {
    margin-top: 13px;
    font-size: 14px;
    letter-spacing: 0.08em;
  }

  .design-matrix__grid {
    margin-top: 54px;
    grid-template-columns: repeat(3, 1fr);
  }

  .original-design {
    padding-inline: 4vw;
  }

  .design-power {
    min-height: 520px;
  }

  .design-power__content h2 {
    font-size: 28px;
  }

  .design-power__subtitle {
    font-size: 18px;
    letter-spacing: 0.18em;
  }

  .design-power__description {
    width: 100%;
    font-size: 13px;
    letter-spacing: 0.08em;
    line-height: 2.1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .design-matrix__item img {
    transition: none;
  }
}
</style>
