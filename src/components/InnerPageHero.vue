<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { RouterLink } from "vue-router";

import type { InnerPageHeroConfig } from "@/types/content";

const props = withDefaults(defineProps<InnerPageHeroConfig>(), {
  overlayHoldMs: 2000,
  overlayFadeMs: 600,
});

const isOverlayVisible = ref(true);
const fadeDuration = computed(() => `${props.overlayFadeMs}ms`);
let hideTimer: number | undefined;

function scheduleOverlayDismissal(): void {
  if (hideTimer !== undefined) {
    window.clearTimeout(hideTimer);
  }

  isOverlayVisible.value = true;
  hideTimer = window.setTimeout(() => {
    isOverlayVisible.value = false;
    hideTimer = undefined;
  }, props.overlayHoldMs);
}

onMounted(scheduleOverlayDismissal);

watch(
  () => [
    props.image,
    props.title,
    props.subtitle,
    props.overlayHoldMs,
  ],
  scheduleOverlayDismissal,
);

onBeforeUnmount(() => {
  if (hideTimer !== undefined) {
    window.clearTimeout(hideTimer);
  }
});
</script>

<template>
  <section
    class="inner-page-hero"
    :aria-label="`${title}页面首屏`"
  >
    <img
      class="inner-page-hero__image"
      :src="image"
      :alt="imageAlt"
    />

    <div
      class="inner-page-hero__overlay"
      :class="{ 'inner-page-hero__overlay--hidden': !isOverlayVisible }"
      aria-live="off"
    >
      <img
        class="inner-page-hero__watermark"
        :src="watermark"
        alt=""
        aria-hidden="true"
      />
      <h1 class="inner-page-hero__title bank">
        {{ title }}
      </h1>
      <span class="inner-page-hero__divider" aria-hidden="true" />
      <p class="inner-page-hero__subtitle">
        {{ subtitle }}
      </p>
    </div>

    <nav
      class="inner-page-hero__breadcrumb-bar"
      aria-label="面包屑导航"
    >
      <ol class="inner-page-hero__breadcrumbs">
        <li
          v-for="(breadcrumb, index) in breadcrumbs"
          :key="`${breadcrumb.label}-${index}`"
          class="inner-page-hero__breadcrumb-item"
        >
          <span
            v-if="index > 0"
            class="inner-page-hero__separator"
            aria-hidden="true"
          >
            /
          </span>

          <RouterLink
            v-if="breadcrumb.to && !breadcrumb.current"
            class="inner-page-hero__breadcrumb-link"
            :to="breadcrumb.to"
          >
            <svg
              v-if="breadcrumb.showHomeIcon"
              class="inner-page-hero__home-icon"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3.5 10.5 12 3.75l8.5 6.75v9.25h-6v-6h-5v6h-6V10.5Z"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span>{{ breadcrumb.label }}</span>
          </RouterLink>

          <span
            v-else
            class="inner-page-hero__breadcrumb-current"
            :aria-current="breadcrumb.current ? 'page' : undefined"
          >
            {{ breadcrumb.label }}
          </span>
        </li>
      </ol>
    </nav>
  </section>
</template>

<style scoped>
.inner-page-hero {
  position: relative;
  width: 100%;
  height: 50vw;
  overflow: hidden;
  background: #18252a;
}

.inner-page-hero__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.inner-page-hero__overlay {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  width: 100%;
  color: #fff;
  opacity: 1;
  pointer-events: none;
  text-align: center;
  text-shadow: 0 2px 8px rgb(0 0 0 / 35%);
  transform: translate(-50%, -50%);
  visibility: visible;
  transition:
    opacity v-bind(fadeDuration) ease,
    visibility 0s linear;
}

.inner-page-hero__overlay--hidden {
  opacity: 0;
  transition:
    opacity v-bind(fadeDuration) ease,
    visibility 0s linear v-bind(fadeDuration);
  visibility: hidden;
}

.inner-page-hero__watermark {
  position: absolute;
  z-index: -1;
  top: 50%;
  left: 50%;
  width: 10.625%;
  opacity: 0.2;
  transform: translate(-50%, -50%);
}

.inner-page-hero__title {
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 48px;
  font-weight: 400;
  letter-spacing: 0.04em;
  line-height: 1;
}

.inner-page-hero__divider {
  position: relative;
  z-index: 1;
  display: block;
  width: 70px;
  height: 4px;
  margin: 15px auto;
  background: #fff;
}

.inner-page-hero__subtitle {
  position: relative;
  z-index: 1;
  margin: 0;
  font-size: 36px;
  font-weight: 400;
  letter-spacing: 0.04em;
  line-height: 1.25;
}

.inner-page-hero__breadcrumb-bar {
  position: absolute;
  z-index: 3;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 18px 0;
  border-top: 1px solid rgb(255 255 255 / 10%);
  color: #fff;
  text-shadow: 0 1px 3px rgb(0 0 0 / 55%);
}

.inner-page-hero__breadcrumbs {
  display: flex;
  width: 80%;
  max-width: 1440px;
  align-items: center;
  padding: 0;
  margin: 0 auto;
  list-style: none;
}

.inner-page-hero__breadcrumb-item,
.inner-page-hero__breadcrumb-link {
  display: inline-flex;
  align-items: center;
}

.inner-page-hero__breadcrumb-item {
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 1.5;
}

.inner-page-hero__breadcrumb-link {
  color: inherit;
  text-decoration: none;
  transition: opacity 0.25s ease;
}

.inner-page-hero__breadcrumb-link:hover,
.inner-page-hero__breadcrumb-link:focus-visible {
  opacity: 0.72;
}

.inner-page-hero__breadcrumb-link:focus-visible {
  outline: 1px solid rgb(255 255 255 / 75%);
  outline-offset: 4px;
}

.inner-page-hero__separator {
  margin: 0 15px;
}

.inner-page-hero__home-icon {
  width: 17px;
  height: 17px;
  flex: 0 0 auto;
  margin-right: 7px;
  filter: drop-shadow(0 1px 2px rgb(0 0 0 / 45%));
}

@media (max-width: 1366px) {
  .inner-page-hero__breadcrumb-bar {
    padding: 10px 0;
  }
}

@media (max-width: 1200px) {
  .inner-page-hero__breadcrumbs {
    width: 90%;
  }
}

@media (max-width: 998px) {
  .inner-page-hero {
    height: 300px;
  }

  .inner-page-hero__watermark {
    width: 19.625%;
  }

  .inner-page-hero__title {
    font-size: 20px;
  }

  .inner-page-hero__divider {
    width: 50px;
    height: 2px;
    margin: 10px auto;
  }

  .inner-page-hero__subtitle {
    font-size: 18px;
  }

  .inner-page-hero__breadcrumb-item {
    font-size: 12px;
  }

  .inner-page-hero__separator {
    margin: 0 12px;
  }

  .inner-page-hero__home-icon {
    width: 15px;
    height: 15px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .inner-page-hero__overlay,
  .inner-page-hero__breadcrumb-link {
    transition: none;
  }
}
</style>
