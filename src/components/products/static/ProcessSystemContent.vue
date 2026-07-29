<script setup lang="ts">
import ProductReveal from "@/components/products/ProductReveal.vue";
import { processClosingImage, processSections } from "@/data/products/static";
</script>

<template>
  <div class="process-content">
    <div class="process-content__inner">
      <article
        v-for="section in processSections"
        :key="section.id"
        class="process-feature"
        :class="{ 'process-feature--image-right': section.imageSide === 'right' }"
      >
        <ProductReveal
          class="process-feature__media"
          :direction="section.imageSide === 'left' ? 'left' : 'right'"
        >
          <img :src="section.image" :alt="section.imageAlt" loading="lazy" />
        </ProductReveal>

        <ProductReveal
          class="process-feature__copy"
          :direction="section.imageSide === 'left' ? 'right' : 'left'"
        >
          <h2>{{ section.title }}</h2>
          <p>{{ section.description }}</p>
        </ProductReveal>
      </article>

      <ProductReveal class="process-content__closing">
        <img
          :src="processClosingImage"
          alt="南洋迪克现代化工艺生产车间"
          loading="lazy"
        />
      </ProductReveal>
    </div>
  </div>
</template>

<style scoped>
.process-content {
  background: #fff;
}

.process-content__inner {
  width: min(1440px, 75.2vw);
  margin-inline: auto;
  padding: min(7.83vw, 150px) 0;
}

.process-feature {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: min(5.22vw, 100px);
}

.process-feature--image-right {
  margin-bottom: min(7.83vw, 150px);
}

.process-feature__media {
  width: 36.11%;
  flex: 0 0 36.11%;
}

.process-feature__media img {
  display: block;
  width: 100%;
  height: auto;
}

.process-feature__copy {
  width: 57%;
  flex: 0 0 57%;
}

.process-feature__copy h2,
.process-feature__copy p {
  margin: 0;
}

.process-feature__copy h2 {
  display: flex;
  flex-direction: column;
  color: #231815;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.667;
}

.process-feature__copy h2::after {
  width: 120px;
  height: 2px;
  margin: 25px 0 49px;
  background: #bc9480;
  content: "";
}

.process-feature__copy p {
  color: #777;
  font-size: 18px;
  line-height: 2.66;
}

.process-feature--image-right .process-feature__media {
  order: 2;
}

.process-feature--image-right .process-feature__copy {
  order: 1;
  text-align: right;
}

.process-feature--image-right .process-feature__copy h2 {
  align-items: flex-end;
}

.process-content__closing {
  width: 100%;
}

.process-content__closing img {
  display: block;
  width: 100%;
  height: auto;
}

@media (max-width: 998px) {
  .process-content__inner {
    width: 90vw;
    padding: 72px 0 90px;
  }

  .process-feature,
  .process-feature--image-right {
    display: grid;
    gap: 34px;
    margin-bottom: 76px;
  }

  .process-feature__media,
  .process-feature__copy,
  .process-feature--image-right .process-feature__media,
  .process-feature--image-right .process-feature__copy {
    width: 100%;
    order: initial;
  }

  .process-feature--image-right .process-feature__media {
    order: 1;
  }

  .process-feature--image-right .process-feature__copy {
    order: 2;
    text-align: left;
  }

  .process-feature--image-right .process-feature__copy h2 {
    align-items: flex-start;
  }

  .process-feature__media {
    max-width: 520px;
    margin-inline: auto;
  }

  .process-feature__copy h2 {
    font-size: 32px;
    line-height: 1.45;
  }

  .process-feature__copy h2::after {
    width: 80px;
    margin: 20px 0 28px;
  }

  .process-feature__copy p {
    font-size: 15px;
    line-height: 2.1;
  }
}

@media (max-width: 560px) {
  .process-content__inner {
    width: 92vw;
    padding-top: 52px;
  }

  .process-feature__copy h2 {
    font-size: 27px;
  }

  .process-feature__copy p {
    font-size: 14px;
    line-height: 2;
  }
}
</style>
