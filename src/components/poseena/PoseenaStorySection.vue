<script setup lang="ts">
import type { ComponentPublicInstance, ShallowRef } from "vue";

import { useReveal } from "@/composables/useReveal";

function createRevealBinding(
  target: ShallowRef<HTMLElement | null>,
): (element: Element | ComponentPublicInstance | null) => void {
  return (element) => {
    target.value = element instanceof HTMLElement ? element : null;
  };
}

const titleReveal = useReveal();
const descriptionReveal = useReveal();
const louvreReveal = useReveal();
const lightLayoutReveal = useReveal();

const bindTitle = createRevealBinding(titleReveal.target);
const bindDescription = createRevealBinding(descriptionReveal.target);
const bindLouvre = createRevealBinding(louvreReveal.target);
const bindLightLayout = createRevealBinding(lightLayoutReveal.target);
</script>

<template>
  <section class="poseena-story" aria-label="POSEENA品牌故事">
    <div class="poseena-story__page-one poseena-container">
      <header
        :ref="bindTitle"
        class="poseena-story__heading reveal"
        :class="{ 'is-visible': titleReveal.isVisible.value }"
      >
        <h2>致敬经典 成为经典</h2>
        <p>致敬贝聿铭大师 / 行走在世界里的东方</p>
        <i aria-hidden="true"></i>
      </header>

      <div
        :ref="bindDescription"
        class="poseena-story__description reveal"
        :class="{ 'is-visible': descriptionReveal.isVisible.value }"
      >
        <p>
          中国从过去的经济崛起到现在文化自信/从而行走在世界里的东方/因此/如何跨越东方和西方之间的这道“围墙"/我们深度研究贝聿铭大师设计作品/从它
          <strong>经典/极致/艺术</strong>
          的设计精神总结3个核心设计哲学/开始我们品牌的设计溯源。
        </p>
      </div>

      <figure
        :ref="bindLouvre"
        class="poseena-story__louvre reveal"
        :class="{ 'is-visible': louvreReveal.isVisible.value }"
      >
        <img
          src="/assets/poseena/louvre.png"
          alt="贝聿铭大师与卢浮宫建筑设计"
          loading="lazy"
        />
      </figure>
    </div>

    <div class="poseena-story__page-two">
      <div
        :ref="bindLightLayout"
        class="poseena-story__light-layout poseena-container"
        :class="{ 'is-visible': lightLayoutReveal.isVisible.value }"
      >
        <div class="poseena-story__light-copy">
          <h2>意为光芒 成为光芒</h2>
          <i aria-hidden="true"></i>
          <p class="poseena-story__light-description">
            POSEENA意大利语为光芒的意思 / 寓意为POSEENA 是光的使者 /
            它照亮品牌的征程/也照亮您的美好生活；
          </p>
        </div>

        <figure class="poseena-story__light-image">
          <img
            src="/assets/poseena/brand-light.png"
            alt="POSEENA光芒品牌设计理念"
            loading="lazy"
          />
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.poseena-story {
  overflow: hidden;
  background: #fff;
}

.poseena-container {
  width: 1440px;
  max-width: calc(100% - 80px);
  margin-inline: auto;
}

.poseena-story__page-one {
  position: relative;
  z-index: 2;
  padding-top: 130px;
}

.poseena-story__heading {
  color: #231815;
  text-align: center;
}

.poseena-story__heading h2,
.poseena-story__light-copy h2 {
  margin: 0;
  font-size: 48px;
  font-weight: 600;
  letter-spacing: 0.06em;
  line-height: 1.35;
}

.poseena-story__heading p {
  margin: 20px 0 0;
  font-size: 36px;
  font-weight: 400;
  letter-spacing: 0.04em;
  line-height: 1.4;
}

.poseena-story__heading i,
.poseena-story__light-copy > i {
  display: block;
  width: 120px;
  height: 2px;
  margin: 34px auto 0;
  background: #bc9480;
}

.poseena-story__description {
  width: 78%;
  margin: 50px auto 0;
  color: #777;
  font-size: 18px;
  font-weight: 400;
  line-height: 2.6;
  text-align: center;
}

.poseena-story__description p,
.poseena-story__light-copy p {
  margin: 0;
}

.poseena-story__description strong {
  color: #231815;
  font-weight: 600;
}

.poseena-story__louvre {
  position: relative;
  z-index: 2;
  margin: 70px 0 0;
  overflow: hidden;
}

.poseena-story__louvre img,
.poseena-story__light-image img {
  width: 100%;
  transition: transform 0.5s ease;
}

.poseena-story__louvre:hover img,
.poseena-story__light-image:hover img {
  transform: scale(1.02);
}

.poseena-story__page-two {
  position: relative;
  z-index: 1;
  margin-top: -10%;
  padding: 18% 0 130px;
  background: #f5f2ef url("/assets/poseena/pattern-light.jpg") center / cover no-repeat;
}

.poseena-story__light-layout {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.poseena-story__light-copy {
  width: 33%;
  color: #231815;
  opacity: 0;
  transform: translateX(-60px);
  transition:
    opacity 1s ease,
    transform 1s ease;
}

.poseena-story__light-copy h2 {
  font-weight: 700;
}

.poseena-story__light-copy > i {
  margin: 30px 0 50px;
}

.poseena-story__light-description {
  margin: 0;
  color: #777;
  font-size: 18px;
  line-height: 2.6;
}

.poseena-story__light-image {
  width: 57.91%;
  margin: 0;
  overflow: hidden;
  opacity: 0;
  transform: translateX(60px);
  transition:
    opacity 1s ease,
    transform 1s ease;
}

.poseena-story__light-layout.is-visible .poseena-story__light-copy,
.poseena-story__light-layout.is-visible .poseena-story__light-image {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 1600px) {
  .poseena-container {
    width: 80%;
    max-width: 1440px;
  }
}

@media (max-width: 1440px) {
  .poseena-story__page-one {
    padding-top: 80px;
  }

  .poseena-story__heading h2,
  .poseena-story__light-copy h2 {
    font-size: 38px;
  }

  .poseena-story__heading p {
    font-size: 30px;
  }

  .poseena-story__description {
    width: 100%;
  }

  .poseena-story__louvre {
    margin-top: 50px;
  }
}

@media (max-width: 1200px) {
  .poseena-container {
    width: 90%;
  }
}

@media (max-width: 998px) {
  .poseena-story__page-one {
    padding-top: 40px;
  }

  .poseena-story__heading h2,
  .poseena-story__light-copy h2 {
    font-size: 20px;
    letter-spacing: 0.04em;
  }

  .poseena-story__heading p {
    margin-top: 8px;
    font-size: 14px;
  }

  .poseena-story__heading i,
  .poseena-story__light-copy > i {
    width: 60px;
    margin-top: 14px;
  }

  .poseena-story__description {
    margin-top: 20px;
    font-size: 14px;
    line-height: 1.8;
  }

  .poseena-story__louvre {
    margin-top: 30px;
  }

  .poseena-story__page-two {
    margin-top: -10%;
    padding-top: 16%;
    padding-bottom: 40px;
  }

  .poseena-story__light-layout {
    flex-direction: column;
  }

  .poseena-story__light-copy,
  .poseena-story__light-image {
    width: 100%;
  }

  .poseena-story__light-copy {
    text-align: center;
    transform: translateX(-36px);
  }

  .poseena-story__light-copy > i {
    margin: 14px auto 18px;
  }

  .poseena-story__light-description {
    font-size: 14px;
    line-height: 1.8;
  }

  .poseena-story__light-image {
    margin-top: 20px;
    transform: translateX(36px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .poseena-story__light-copy,
  .poseena-story__light-image {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .poseena-story__louvre img,
  .poseena-story__light-image img {
    transition: none;
  }
}
</style>
