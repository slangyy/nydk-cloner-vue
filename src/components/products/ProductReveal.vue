<script setup lang="ts">
import { computed } from "vue";

import { useReveal } from "@/composables/useReveal";

const props = withDefaults(
  defineProps<{
    readonly direction?: "up" | "left" | "right";
    readonly delayMs?: number;
  }>(),
  {
    direction: "up",
    delayMs: 0,
  },
);

const { target, isVisible } = useReveal();
void target;
const revealStyle = computed(() => ({
  transitionDelay: `${props.delayMs}ms`,
}));
</script>

<template>
  <div
    ref="target"
    class="product-reveal"
    :class="[`product-reveal--${direction}`, { 'product-reveal--visible': isVisible }]"
    :style="revealStyle"
  >
    <slot />
  </div>
</template>

<style scoped>
.product-reveal {
  opacity: 0;
  transition:
    opacity 0.8s ease-out,
    transform 0.8s ease-out;
}

.product-reveal--up {
  transform: translateY(40px);
}

.product-reveal--left {
  transform: translateX(-60px);
}

.product-reveal--right {
  transform: translateX(60px);
}

.product-reveal--visible {
  opacity: 1;
  transform: translate(0);
}

@media (max-width: 998px) {
  .product-reveal--left {
    transform: translateX(-28px);
  }

  .product-reveal--right {
    transform: translateX(28px);
  }

  .product-reveal--visible {
    transform: translate(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .product-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
