<script setup lang="ts">
import { onMounted, ref } from "vue";

import { heroPoster, heroVideo } from "@/data/home";

const videoElement = ref<HTMLVideoElement | null>(null);

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    videoElement.value?.pause();
  }
});
</script>

<template>
  <section class="hero-section" aria-label="南洋迪克整装家居">
    <video
      ref="videoElement"
      class="hero-section__video"
      :poster="heroPoster"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      aria-hidden="true"
    >
      <source :src="heroVideo" type="video/mp4" />
    </video>

    <div class="hero-section__shade" aria-hidden="true"></div>

    <!-- <div class="hero-section__copy">
      <h1>南 洋 迪 克　整 装 家 居</h1>
      <p class="bank">
        NEODKO IS A LEADING BRAND IN CHINA'S HIGH-END HOME FURNISHINGS
      </p>
    </div> -->

    <!-- <span class="hero-section__pagination" aria-hidden="true"></span> -->
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  height: 100vh;
  min-height: 620px;
  overflow: hidden;
  background: #2c211d;
  color: #fff;
}

.hero-section__video,
.hero-section__shade {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.hero-section__video {
  object-fit: cover;
}

.hero-section__shade {
  background:
    linear-gradient(180deg, rgb(18 10 7 / 18%) 0%, transparent 24%),
    linear-gradient(90deg, rgb(19 12 9 / 13%) 0%, transparent 48%);
  pointer-events: none;
}

.hero-section__copy {
  position: absolute;
  top: 45.5%;
  left: 50%;
  width: min(680px, 76vw);
  transform: translate(-50%, -50%);
  text-align: center;
  text-shadow: 0 1px 3px rgb(0 0 0 / 16%);
}

.hero-section__copy h1 {
  margin: 0;
  color: rgb(255 255 255 / 82%);
  font-size: clamp(25px, 2.28vw, 33px);
  font-weight: 300;
  line-height: 1.35;
  letter-spacing: 0.22em;
  text-indent: 0.22em;
  white-space: nowrap;
}

.hero-section__copy p {
  margin: 14px 0 0;
  color: rgb(255 255 255 / 62%);
  font-size: clamp(8px, 0.7vw, 10px);
  font-weight: 400;
  letter-spacing: 0.12em;
  white-space: nowrap;
}

.hero-section__pagination {
  position: absolute;
  bottom: 5.6%;
  left: 50%;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #fff;
  transform: translateX(-50%);
  box-shadow: 0 0 0 1px rgb(0 0 0 / 5%);
}

@media (max-width: 998px) {
  .hero-section {
    height: 200px;
    min-height: 200px;
  }

  .hero-section__video {
    object-position: center center;
  }

  .hero-section__copy {
    top: 55%;
    width: 86vw;
  }

  .hero-section__copy h1 {
    font-size: clamp(14px, 4vw, 20px);
    letter-spacing: 0.15em;
    text-indent: 0.15em;
  }

  .hero-section__copy p {
    margin-top: 5px;
    font-size: clamp(5px, 1.3vw, 8px);
    letter-spacing: 0.06em;
  }

  .hero-section__pagination {
    bottom: 8px;
    width: 8px;
    height: 8px;
  }
}

@media (max-width: 520px) {
  .hero-section__copy h1 {
    font-size: 13px;
  }

  .hero-section__copy p {
    font-size: 5px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-section__video {
    visibility: hidden;
  }

  .hero-section {
    background-image: url("/assets/backgrounds/36304d3c-8931-47bd-996e-e6d8721206da.jpg");
    background-position: center;
    background-size: cover;
  }
}
</style>
