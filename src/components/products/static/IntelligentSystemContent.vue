<script setup lang="ts">
import ProductReveal from "@/components/products/ProductReveal.vue";
import {
  intelligentClosingImage,
  intelligentSections,
} from "@/data/products/static";
</script>

<template>
  <div class="intelligent-content">
    <div class="intelligent-content__inner">
      <article
        v-for="(section, index) in intelligentSections"
        :key="section.id"
        class="intelligent-feature"
        :class="`intelligent-feature--${index + 1}`"
      >
        <ProductReveal
          class="intelligent-feature__copy"
          :direction="index === 1 ? 'right' : 'left'"
        >
          <h2>
            {{ section.title }}
            <span v-if="section.subtitle">{{ section.subtitle }}</span>
          </h2>
          <span class="intelligent-feature__divider" aria-hidden="true"></span>
          <p>{{ section.description }}</p>
        </ProductReveal>

        <ProductReveal
          class="intelligent-feature__media"
          :direction="index === 1 ? 'left' : 'right'"
        >
          <div class="intelligent-feature__image-frame">
            <img :src="section.image" :alt="section.imageAlt" loading="lazy" />
          </div>
        </ProductReveal>
      </article>
    </div>

    <ProductReveal class="intelligent-content__closing">
      <img
        :src="intelligentClosingImage"
        alt="南洋迪克智能影音家居空间"
        loading="lazy"
      />
    </ProductReveal>
  </div>
</template>

<style scoped>
.intelligent-content {
  overflow: hidden;
  padding-top: min(7vw, 134px);
  background: #fff;
}

.intelligent-content__inner {
  width: min(1440px, 75.2vw);
  margin-inline: auto;
}

.intelligent-feature {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: min(7.52vw, 144px);
}

.intelligent-feature:last-child {
  margin-bottom: 0;
}

.intelligent-feature__copy {
  box-sizing: border-box;
  color: #231815;
}

.intelligent-feature__copy h2,
.intelligent-feature__copy p {
  margin: 0;
}

.intelligent-feature__copy h2 {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.5;
  white-space: nowrap;
}

.intelligent-feature__copy h2 span {
  margin-left: 0.22em;
}

.intelligent-feature__divider {
  display: block;
  width: 120px;
  height: 2px;
  margin-top: 34px;
  background: #c49a86;
}

.intelligent-feature__copy p {
  margin-top: 54px;
  color: #777;
  font-size: 18px;
  font-style: normal;
  letter-spacing: 1px;
  line-height: 2.6;
}

.intelligent-feature__media {
  overflow: visible;
}

.intelligent-feature__image-frame {
  overflow: hidden;
}

.intelligent-feature__media img {
  display: block;
  width: 100%;
  height: auto;
  transition: transform 0.65s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.intelligent-feature__image-frame:hover img {
  transform: scale(1.04);
}

.intelligent-feature--1 .intelligent-feature__copy {
  width: 46%;
  padding-left: 6%;
  text-align: right;
}

.intelligent-feature--1 .intelligent-feature__divider,
.intelligent-feature--3 .intelligent-feature__divider {
  margin-left: auto;
}

.intelligent-feature--1 .intelligent-feature__media {
  width: 46%;
}

.intelligent-feature--1 .intelligent-feature__image-frame {
  width: 136%;
}

.intelligent-feature--2 .intelligent-feature__copy {
  width: 45%;
  order: 2;
  padding-right: 5%;
  text-align: left;
}

.intelligent-feature--2 .intelligent-feature__media {
  width: 46%;
  order: 1;
}

.intelligent-feature--2 .intelligent-feature__image-frame {
  width: 100%;
}

.intelligent-feature--3 .intelligent-feature__copy {
  width: 46%;
  margin-top: -8%;
  padding-left: 6%;
  text-align: right;
}

.intelligent-feature--3 .intelligent-feature__media {
  width: 45%;
}

.intelligent-feature--3 .intelligent-feature__image-frame {
  width: 120%;
}

.intelligent-content__closing {
  width: min(50vw, 960px);
  margin-top: 5vw;
}

.intelligent-content__closing img {
  display: block;
  width: 100%;
  height: auto;
}

@media (max-width: 998px) {
  .intelligent-content {
    padding-top: 64px;
  }

  .intelligent-content__inner {
    width: 90vw;
  }

  .intelligent-feature,
  .intelligent-feature:last-child {
    display: grid;
    gap: 32px;
    margin-bottom: 76px;
  }

  .intelligent-feature__copy,
  .intelligent-feature--1 .intelligent-feature__copy,
  .intelligent-feature--2 .intelligent-feature__copy,
  .intelligent-feature--3 .intelligent-feature__copy {
    width: 100%;
    margin-top: 0;
    order: 2;
    padding: 0;
    text-align: left;
  }

  .intelligent-feature__media,
  .intelligent-feature--1 .intelligent-feature__media,
  .intelligent-feature--2 .intelligent-feature__media,
  .intelligent-feature--3 .intelligent-feature__media {
    width: 100%;
    order: 1;
    overflow: hidden;
  }

  .intelligent-feature__media img,
  .intelligent-feature--1 .intelligent-feature__image-frame,
  .intelligent-feature--2 .intelligent-feature__image-frame,
  .intelligent-feature--3 .intelligent-feature__image-frame {
    width: 100%;
  }

  .intelligent-feature__copy h2 {
    font-size: 32px;
    white-space: normal;
  }

  .intelligent-feature__copy p {
    margin-top: 32px;
    font-size: 15px;
    line-height: 2.1;
  }

  .intelligent-feature__divider,
  .intelligent-feature--1 .intelligent-feature__divider,
  .intelligent-feature--3 .intelligent-feature__divider {
    width: 64px;
    margin-top: 22px;
    margin-left: 0;
  }

  .intelligent-content__closing {
    width: 90vw;
    margin-top: 0;
  }
}

@media (max-width: 560px) {
  .intelligent-content {
    padding-top: 48px;
  }

  .intelligent-content__inner {
    width: 92vw;
  }

  .intelligent-feature__copy h2 {
    font-size: 27px;
  }

  .intelligent-feature__copy p {
    font-size: 14px;
    line-height: 2;
  }

  .intelligent-content__closing {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .intelligent-feature__media img {
    transition: none;
  }

  .intelligent-feature__image-frame:hover img {
    transform: none;
  }
}
</style>
