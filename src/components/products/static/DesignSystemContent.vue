<script setup lang="ts">
import ProductReveal from "@/components/products/ProductReveal.vue";
import ProductSectionHeading from "@/components/products/ProductSectionHeading.vue";
import {
  designMatrixImages,
  designOriginal,
  designPower,
} from "@/data/products/static";
</script>

<template>
  <div class="design-content">
    <section class="design-matrix">
      <ProductReveal>
        <ProductSectionHeading
          title="中国高定整装领导品牌"
          subtitle="生活的从容 从好的设计开始"
        />
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

    <section class="original-design page-container">
      <ProductReveal class="original-design__visual" direction="left">
        <div class="original-design__composition">
          <img
            class="original-design__main"
            :src="designOriginal.mainImage"
            alt="南洋迪克原创卧室空间设计"
            loading="lazy"
          />
          <img
            class="original-design__detail"
            :src="designOriginal.detailImage"
            alt="南洋迪克家具材质与缝线细节"
            loading="lazy"
          />
          <img
            class="original-design__ornament"
            :src="designOriginal.ornament"
            alt=""
            aria-hidden="true"
          />
        </div>
      </ProductReveal>

      <ProductReveal class="original-design__copy" direction="right" :delay-ms="100">
        <img
          class="original-design__mark"
          :src="designOriginal.mark"
          alt=""
          aria-hidden="true"
        />
        <ProductSectionHeading
          :title="designOriginal.title"
          :subtitle="designOriginal.subtitle"
          align="left"
        />
        <p>{{ designOriginal.description }}</p>
      </ProductReveal>
    </section>

    <section
      class="design-power"
      :style="{ backgroundImage: `url(${designPower.image})` }"
    >
      <div class="design-power__veil" />
      <ProductReveal class="design-power__content">
        <ProductSectionHeading
          :title="designPower.title"
          :subtitle="designPower.subtitle"
          light
        />
        <p>{{ designPower.description }}</p>
      </ProductReveal>
    </section>
  </div>
</template>

<style scoped>
.design-content {
  background: #fff;
}

.design-matrix {
  width: min(1440px, 90vw);
  margin-inline: auto;
  padding: 118px 0 150px;
}

.design-matrix__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  margin-top: 74px;
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
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(340px, 0.88fr);
  align-items: center;
  gap: clamp(60px, 8vw, 135px);
  padding-block: 110px 160px;
}

.original-design__composition {
  position: relative;
  padding: 0 0 11% 11%;
}

.original-design__main {
  width: 86%;
  margin-left: auto;
}

.original-design__detail {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 31%;
  aspect-ratio: 1;
  border: 12px solid #fff;
  object-fit: cover;
}

.original-design__ornament {
  position: absolute;
  top: 9%;
  left: 3%;
  width: 18px;
  height: 56%;
  object-fit: cover;
}

.original-design__copy {
  max-width: 560px;
}

.original-design__mark {
  width: 112px;
  margin-bottom: 28px;
  opacity: 0.8;
}

.original-design__copy p {
  margin: 38px 0 0;
  color: #625b57;
  font-size: clamp(15px, 1vw, 18px);
  line-height: 2.15;
  text-align: justify;
}

.design-power {
  position: relative;
  display: grid;
  min-height: 50vw;
  max-height: 960px;
  place-items: center;
  overflow: hidden;
  background-position: center;
  background-size: cover;
}

.design-power__veil {
  position: absolute;
  inset: 0;
  background: rgb(19 15 14 / 27%);
}

.design-power__content {
  position: relative;
  z-index: 1;
  width: min(760px, 82vw);
  color: #fff;
  text-align: center;
}

.design-power__content p {
  margin: 42px auto 0;
  color: rgb(255 255 255 / 92%);
  font-size: clamp(15px, 1vw, 18px);
  line-height: 2.2;
}

@media (max-width: 998px) {
  .design-matrix {
    padding: 72px 0 88px;
  }

  .design-matrix__grid {
    gap: 1px;
    margin-top: 42px;
  }

  .original-design {
    grid-template-columns: 1fr;
    gap: 44px;
    padding-block: 72px 96px;
  }

  .original-design__copy {
    max-width: none;
  }

  .original-design__copy p {
    margin-top: 28px;
    font-size: 15px;
    line-height: 2;
  }

  .design-power {
    min-height: 620px;
  }
}

@media (max-width: 560px) {
  .design-matrix {
    width: 94vw;
  }

  .design-matrix__grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .original-design__detail {
    border-width: 6px;
  }

  .original-design__mark {
    width: 88px;
  }

  .design-power {
    min-height: 520px;
  }

  .design-power__content p {
    line-height: 1.9;
  }
}

@media (prefers-reduced-motion: reduce) {
  .design-matrix__item img {
    transition: none;
  }
}
</style>
