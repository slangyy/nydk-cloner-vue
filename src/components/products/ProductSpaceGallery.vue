<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

import ProductMediaCarousel from "@/components/products/ProductMediaCarousel.vue";
import type { ProductCarouselSlide, ProductSpaceTab } from "@/types/products";

const props = defineProps<{
  readonly tabs: readonly ProductSpaceTab[];
  readonly ariaLabel: string;
}>();

const activeTabId = ref(props.tabs[0]?.id ?? "");
const modalSlide = ref<ProductCarouselSlide | null>(null);
const activeTab = computed(
  () => props.tabs.find((tab) => tab.id === activeTabId.value) ?? props.tabs[0],
);

watch(
  () => props.tabs,
  (tabs) => {
    if (!tabs.some((tab) => tab.id === activeTabId.value)) {
      activeTabId.value = tabs[0]?.id ?? "";
    }
  },
);

function selectTab(id: string): void {
  activeTabId.value = id;
}

function openModal(slide: ProductCarouselSlide): void {
  modalSlide.value = slide;
  document.body.style.overflow = "hidden";
}

function closeModal(): void {
  modalSlide.value = null;
  document.body.style.overflow = "";
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === "Escape" && modalSlide.value) {
    closeModal();
  }
}

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});
</script>

<template>
  <section class="space-gallery" :aria-label="ariaLabel">
    <div class="space-gallery__tabs" role="tablist" :aria-label="ariaLabel">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="space-gallery__tab"
        :class="{ 'space-gallery__tab--active': tab.id === activeTab?.id }"
        type="button"
        role="tab"
        :aria-selected="tab.id === activeTab?.id"
        @click="selectTab(tab.id)"
      >
        <img v-if="tab.icon" :src="tab.icon" alt="" aria-hidden="true" />
        <span class="bank">{{ tab.english }}</span>
        <strong>{{ tab.title }}</strong>
      </button>
    </div>

    <div v-if="activeTab" :key="activeTab.id" class="space-gallery__content">
      <ProductMediaCarousel
        :slides="activeTab.slides"
        :label="`${activeTab.title}图片`"
      />
      <div class="space-gallery__thumbs">
        <button
          v-for="slide in activeTab.slides"
          :key="slide.id"
          type="button"
          :aria-label="`查看${slide.imageAlt}`"
          @click="openModal(slide)"
        >
          <img :src="slide.image" :alt="slide.imageAlt" />
        </button>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="modalSlide"
        class="space-gallery__modal"
        role="dialog"
        aria-modal="true"
        :aria-label="modalSlide.imageAlt"
        @click.self="closeModal"
      >
        <button
          class="space-gallery__close"
          type="button"
          aria-label="关闭图片"
          @click="closeModal"
        >
          ×
        </button>
        <img :src="modalSlide.image" :alt="modalSlide.imageAlt" />
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.space-gallery__tabs {
  display: flex;
  max-width: 1440px;
  justify-content: center;
  gap: 8px;
  padding: 0;
  margin: 0 auto 38px;
  overflow-x: auto;
  scrollbar-width: none;
}

.space-gallery__tabs::-webkit-scrollbar {
  display: none;
}

.space-gallery__tab {
  display: grid;
  min-width: 150px;
  padding: 18px 14px;
  border: 0;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: #766761;
  cursor: pointer;
  gap: 6px;
  place-items: center;
  transition:
    color 0.3s ease,
    border-color 0.3s ease,
    background 0.3s ease;
}

.space-gallery__tab img {
  width: 46px;
  height: 46px;
  object-fit: contain;
}

.space-gallery__tab span {
  font-size: 13px;
  letter-spacing: 0.05em;
}

.space-gallery__tab strong {
  font-size: 17px;
  font-weight: 500;
}

.space-gallery__tab--active {
  border-color: #c49a86;
  background: #f4e7e0;
  color: #3a2a25;
}

.space-gallery__content {
  animation: gallery-fade 0.6s ease both;
}

.space-gallery__thumbs {
  display: flex;
  gap: 12px;
  padding: 18px 0 0;
  overflow-x: auto;
}

.space-gallery__thumbs button {
  width: 150px;
  min-width: 150px;
  height: 92px;
  padding: 0;
  border: 1px solid transparent;
  background: none;
  cursor: zoom-in;
}

.space-gallery__thumbs img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.space-gallery__modal {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: grid;
  padding: 5vw;
  background: rgb(0 0 0 / 88%);
  place-items: center;
}

.space-gallery__modal > img {
  width: min(1400px, 90vw);
  max-height: 86vh;
  object-fit: contain;
}

.space-gallery__close {
  position: absolute;
  top: 24px;
  right: 30px;
  border: 0;
  background: transparent;
  color: #fff;
  cursor: pointer;
  font-size: 46px;
}

@keyframes gallery-fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@media (max-width: 998px) {
  .space-gallery__tabs {
    justify-content: flex-start;
    margin-bottom: 20px;
  }

  .space-gallery__tab {
    min-width: 118px;
    padding: 12px 10px;
  }

  .space-gallery__thumbs button {
    width: 112px;
    min-width: 112px;
    height: 70px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .space-gallery__content {
    animation: none;
  }
}
</style>
