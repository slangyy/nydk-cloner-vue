<script setup lang="ts">
import { type ComponentPublicInstance } from "vue";

import { useReveal } from "@/composables/useReveal";

const { target, isVisible } = useReveal();

const setRevealTarget = (element: Element | ComponentPublicInstance | null): void => {
  target.value = element instanceof HTMLElement ? element : null;
};
</script>

<template>
  <section
    :ref="setRevealTarget"
    class="poseena-pursuit"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="poseena-pursuit-title"
  >
    <div class="poseena-pursuit__inner">
      <div class="poseena-pursuit__copy">
        <h2 id="poseena-pursuit-title">
          Ломая традиции Бросая вызов обыденности
        </h2>
        <p class="poseena-pursuit__subtitle">
          Пять вершин совершенства, определяющих систему идеального домашнего интерьера
        </p>
        <i class="poseena-pursuit__divider" aria-hidden="true"></i>
        <!-- <p class="poseena-pursuit__body">
          所谓极致艺术就是以
          <strong>极致设计</strong> /
          <strong>极致工艺</strong> /
          <strong>极致用材</strong> /
          <strong>极致体系</strong> /
          <strong>极致应用</strong>
          5个核心去设计落地 / POSEENA品牌定位 | 极致艺术家+ | 的本质 /
          就是颠覆传统 / 对抗平庸。
        </p> -->
        <p class="poseena-pursuit__body">
          Совершенное искусство воплощается через 5 основ: 
          <strong>безупречный дизайн</strong> / 
          <strong>безупречное мастерство</strong> / 
          <strong>безупречные материалы</strong> / 
          <strong>безупречную систему</strong> / 
          <strong>безупречное применение</strong>.
          В этом суть позиционирования POSEENA как «совершенного художника+»: ломать традиции и противостоять обыденности.
        </p>
      </div>

      <div class="poseena-pursuit__media">
        <img
          src="/assets/poseena/pursuit.jpg"
          alt="POSEENA 极致系统家居空间"
          width="721"
          height="600"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.poseena-pursuit {
  position: relative;
  z-index: 1;
  margin-top: -12%;
  padding-top: 21%;
  background: #fff;
}

.poseena-pursuit__inner {
  display: flex;
  width: min(100%, 1440px);
  margin-inline: auto;
  align-items: center;
  justify-content: space-between;
}

.poseena-pursuit__copy {
  width: 44%;
  color: #231815;
  opacity: 0;
  transform: translateX(-60px);
  transition:
    opacity 1s ease,
    transform 1s ease;
}

.poseena-pursuit__copy h2 {
  margin: 0;
  font-size: clamp(24px, 2.2vw, 36px);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.03em;
}

.poseena-pursuit__subtitle {
  margin: 12px 0 0;
  font-size: clamp(16px, 1.7vw, 28px);
  line-height: 1.3;
  letter-spacing: 0.02em;
}

.poseena-pursuit__divider {
  display: block;
  width: 120px;
  height: 2px;
  margin: 18px 0 30px;
  background: #bc9480;
}

.poseena-pursuit__body {
  margin: 0;
  color: #777;
  font-size: 18px;
  line-height: 2.6;
}

.poseena-pursuit__body strong {
  color: #3c312f;
  font-weight: 700;
}

.poseena-pursuit__media {
  width: 50%;
  overflow: hidden;
  opacity: 0;
  transform: translateX(60px);
  transition:
    opacity 1s ease,
    transform 1s ease;
}

.poseena-pursuit.is-visible .poseena-pursuit__copy,
.poseena-pursuit.is-visible .poseena-pursuit__media {
  opacity: 1;
  transform: translateX(0);
}

.poseena-pursuit__media img {
  width: 100%;
  height: auto;
  transition: transform 0.5s ease;
}

.poseena-pursuit__media:hover img {
  transform: scale(1.02);
}

@media (max-width: 1600px) {
  .poseena-pursuit__inner {
    width: 80%;
  }
}

@media (max-width: 1440px) {
  .poseena-pursuit__divider {
    margin: 16px 0 24px;
  }

  .poseena-pursuit__body {
    font-size: 16px;
    line-height: 2.2;
  }
}

@media (max-width: 1200px) {
  .poseena-pursuit__inner {
    width: 90%;
  }
}

@media (max-width: 998px) {
  .poseena-pursuit {
    margin-top: 0;
    padding-top: 40px;
  }

  .poseena-pursuit__inner {
    flex-direction: column;
    text-align: center;
  }

  .poseena-pursuit__copy,
  .poseena-pursuit__media {
    width: 100%;
  }

  .poseena-pursuit__copy {
    transform: translateX(-36px);
  }

  .poseena-pursuit__copy h2 {
    font-size: clamp(16px, 2.4vw, 18px);
    letter-spacing: 0.02em;
    line-height: 1.2;
  }

  .poseena-pursuit__body {
    font-size: 14px;
  }

  .poseena-pursuit__subtitle {
    margin-top: 8px;
    font-size: clamp(12px, 1.8vw, 13px);
    line-height: 1.3;
    letter-spacing: 0.01em;
  }

  .poseena-pursuit__divider {
    width: 60px;
    margin: 10px auto 16px;
  }

  .poseena-pursuit__body {
    line-height: 2;
  }

  .poseena-pursuit__media {
    margin-top: 20px;
    transform: translateX(36px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .poseena-pursuit__copy,
  .poseena-pursuit__media {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .poseena-pursuit__media img {
    transition: none;
  }
}
</style>
