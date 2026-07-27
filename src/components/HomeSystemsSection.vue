<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  type ComponentPublicInstance,
  type ComputedRef,
} from "vue";
import { RouterLink } from "vue-router";

import { systemCards, systemsBrandImage } from "@/data/home";
import { useReveal } from "@/composables/useReveal";
import type { SystemCard } from "@/types/content";

import SectionTitle from "./SectionTitle.vue";

type GridItem =
  | { readonly kind: "system"; readonly card: SystemCard }
  | { readonly kind: "brand"; readonly id: "systems-brand" };

const compactQuery = "(max-width: 998px)";
const activeId = ref<string | null>(null);
const isCompact = ref(false);
const { target, isVisible } = useReveal();

const gridItems: ComputedRef<readonly GridItem[]> = computed(() => [
  ...systemCards.slice(0, 4).map((card) => ({ kind: "system" as const, card })),
  { kind: "brand" as const, id: "systems-brand" as const },
  ...systemCards.slice(4).map((card) => ({ kind: "system" as const, card })),
]);

let mediaQuery: MediaQueryList | null = null;

function updateCompactState(event?: MediaQueryListEvent): void {
  isCompact.value = event?.matches ?? mediaQuery?.matches ?? false;
  if (!isCompact.value) {
    activeId.value = null;
  }
}

function handleBaseClick(event: MouseEvent, cardId: string): void {
  if (!isCompact.value) {
    return;
  }

  event.preventDefault();
  activeId.value = activeId.value === cardId ? null : cardId;
}

function closeActiveCard(): void {
  activeId.value = null;
}

function assignRevealTarget(element: Element | ComponentPublicInstance | null): void {
  target.value = element instanceof HTMLElement ? element : null;
}

function handleDocumentPointerDown(event: PointerEvent): void {
  if (!isCompact.value || !activeId.value) {
    return;
  }

  const targetElement = event.target;
  if (targetElement instanceof Element && targetElement.closest(".systems-card")) {
    return;
  }

  closeActiveCard();
}

function handleDocumentKeydown(event: KeyboardEvent): void {
  if (event.key === "Escape") {
    closeActiveCard();
  }
}

onMounted(() => {
  mediaQuery = window.matchMedia(compactQuery);
  updateCompactState();
  mediaQuery.addEventListener("change", updateCompactState);
  document.addEventListener("pointerdown", handleDocumentPointerDown);
  document.addEventListener("keydown", handleDocumentKeydown);
});

onBeforeUnmount(() => {
  mediaQuery?.removeEventListener("change", updateCompactState);
  document.removeEventListener("pointerdown", handleDocumentPointerDown);
  document.removeEventListener("keydown", handleDocumentKeydown);
});
</script>

<template>
  <section
    :ref="assignRevealTarget"
    class="systems-section reveal"
    :class="{ 'is-visible': isVisible }"
    aria-labelledby="systems-heading"
  >
    <SectionTitle
      id="systems-heading"
      english="HOME IMPROVEMENT SYSTEM"
      chinese="家装系统"
    />

    <div class="systems-section__grid page-container">
      <template v-for="item in gridItems" :key="item.kind === 'brand' ? item.id : item.card.id">
        <figure v-if="item.kind === 'brand'" class="systems-brand">
          <img :src="systemsBrandImage" alt="南洋迪克整装家居系统" />
        </figure>

        <article
          v-else
          class="systems-card"
          :class="[
            `systems-card--${item.card.id}`,
            { 'systems-card--active': activeId === item.card.id },
          ]"
        >
          <RouterLink
            class="systems-card__base"
            :to="item.card.href"
            :aria-expanded="isCompact ? activeId === item.card.id : undefined"
            @click="handleBaseClick($event, item.card.id)"
          >
            <img
              class="systems-card__base-image"
              :src="item.card.image"
              :alt="item.card.title"
              loading="lazy"
            />
            <span
              class="systems-card__icon"
              :class="`systems-card__icon--${item.card.id}`"
              aria-hidden="true"
            ></span>
            <span class="systems-card__base-copy">
              <strong>{{ item.card.title }}</strong>
              <small class="bank">{{ item.card.english }}</small>
            </span>
          </RouterLink>

          <RouterLink class="systems-card__detail" :to="item.card.href" tabindex="-1">
            <img :src="item.card.detailImage" alt="" loading="lazy" />
            <span class="systems-card__detail-shade" aria-hidden="true"></span>
            <span class="systems-card__detail-copy">
              <small class="bank">{{ item.card.english }}</small>
              <strong>{{ item.card.title }}</strong>
              <i aria-hidden="true"></i>
              <em>{{ item.card.description }}</em>
            </span>
            <span class="systems-card__plus" aria-hidden="true">+</span>
          </RouterLink>
        </article>
      </template>
    </div>
  </section>
</template>

<style scoped>
.systems-section {
  position: relative;
  z-index: 1;
  min-height: 1234px;
  padding: 114px 0 82px;
  overflow: hidden;
  background: #fff;
}

.systems-section :deep(.section-title) {
  min-height: 205px;
  padding-top: 0;
}

.systems-section__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  overflow: visible;
}

.systems-card,
.systems-brand {
  position: relative;
  aspect-ratio: 1.528 / 1;
  min-width: 0;
  margin: 0;
}

.systems-brand {
  overflow: hidden;
}

.systems-brand img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.systems-card {
  z-index: 1;
}

.systems-card:hover,
.systems-card:focus-within,
.systems-card--active {
  z-index: 8;
}

.systems-card__base,
.systems-card__detail {
  position: absolute;
  inset: 0;
  display: block;
  overflow: hidden;
}

.systems-card__base {
  background: #f1f1f1;
}

.systems-card__base::after {
  position: absolute;
  inset: 0;
  background: rgb(255 255 255 / 7%);
  content: "";
}

.systems-card__base-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.65s ease;
}

.systems-card__icon {
  position: absolute;
  top: 34.5%;
  left: 50%;
  z-index: 1;
  width: 38px;
  height: 38px;
  background-position: top center;
  background-repeat: no-repeat;
  background-size: 38px 76px;
  transform: translateX(-50%);
  opacity: 0.82;
}

.systems-card__icon--design {
  background-image: url("/assets/backgrounds/2383ae84-5752-433e-8f6a-7679dd04ddb0.png");
}

.systems-card__icon--production {
  background-image: url("/assets/backgrounds/83ebd270-7052-4b22-832a-0833c1c5bc0e.png");
}

.systems-card__icon--process {
  background-image: url("/assets/backgrounds/9e3dd797-dcf4-4132-b53d-112e727b2799.png");
}

.systems-card__icon--smart-home {
  background-image: url("/assets/backgrounds/07f31973-b92a-4e67-a3a0-f41bbf539559.png");
}

.systems-card__icon--product {
  background-image: url("/assets/backgrounds/a48bcd95-4d5e-4c67-8540-8b3e80eab601.png");
}

.systems-card__icon--material {
  background-image: url("/assets/backgrounds/739fa148-7399-4d2c-8d1e-4dd390bb4280.png");
}

.systems-card__icon--integrated {
  background-image: url("/assets/backgrounds/52dc2463-4242-4b86-af7a-32cce16d1583.png");
}

.systems-card__icon--service {
  background-image: url("/assets/backgrounds/470e5913-9f43-4948-87ee-f02322a5b3db.png");
}

.systems-card__base-copy {
  position: absolute;
  bottom: 12.5%;
  left: 0;
  z-index: 1;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  color: #8f8c8a;
  text-align: center;
}

.systems-card__base-copy strong {
  font-size: 17px;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-indent: 0.18em;
}

.systems-card__base-copy small {
  margin-top: 4px;
  font-size: 11px;
  letter-spacing: 0.04em;
}

.systems-card__detail {
  right: auto;
  z-index: 2;
  width: 0;
  background: #3c312f;
  color: #fff;
  pointer-events: none;
  transition: width 0.6s ease-out;
}

.systems-card:nth-child(3n) .systems-card__detail {
  right: 0;
  left: auto;
}

.systems-card__detail > img,
.systems-card__detail-shade {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.systems-card__detail > img {
  max-width: none;
  object-fit: cover;
}

.systems-card__detail-shade {
  background: linear-gradient(90deg, rgb(29 19 15 / 76%), rgb(31 21 17 / 24%) 75%);
}

.systems-card__detail-copy {
  position: absolute;
  top: 50%;
  left: 10%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  transform: translate(30%, -50%);
  opacity: 0;
  transition:
    opacity 0.35s ease 0.14s,
    transform 0.55s ease 0.08s;
}

.systems-card:nth-child(3n) .systems-card__detail-copy {
  left: 8%;
}

.systems-card__detail-copy small {
  order: 2;
  margin-top: 4px;
  font-size: 12px;
  letter-spacing: 0.06em;
}

.systems-card__detail-copy strong {
  order: 1;
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 0.2em;
}

.systems-card__detail-copy i {
  order: 3;
  width: 42px;
  height: 1px;
  margin-block: 17px 15px;
  background: rgb(255 255 255 / 72%);
}

.systems-card__detail-copy em {
  order: 4;
  font-size: 13px;
  font-style: normal;
  font-weight: 300;
  letter-spacing: 0.09em;
  white-space: nowrap;
}

.systems-card__plus {
  position: absolute;
  right: 6.5%;
  bottom: 10%;
  z-index: 1;
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border: 1px solid rgb(255 255 255 / 60%);
  border-radius: 50%;
  font-size: 24px;
  font-weight: 200;
  line-height: 1;
  opacity: 0;
  transition: opacity 0.3s ease 0.2s;
}

.systems-card:hover .systems-card__base-image,
.systems-card:focus-within .systems-card__base-image {
  transform: scale(1.025);
}

.systems-card:hover .systems-card__detail,
.systems-card:focus-within .systems-card__detail,
.systems-card--active .systems-card__detail {
  width: calc(200% + 10px);
  pointer-events: auto;
}

.systems-card:hover .systems-card__detail-copy,
.systems-card:focus-within .systems-card__detail-copy,
.systems-card--active .systems-card__detail-copy {
  transform: translate(0, -50%);
  opacity: 1;
}

.systems-card:hover .systems-card__plus,
.systems-card:focus-within .systems-card__plus,
.systems-card--active .systems-card__plus {
  opacity: 1;
}

@media (max-width: 998px) {
  .systems-section {
    min-height: 663px;
    padding-block: 22px 48px;
  }

  .systems-section :deep(.section-title) {
    min-height: 106px;
  }

  .systems-section__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 5px;
  }

  .systems-brand {
    display: none;
  }

  .systems-card {
    aspect-ratio: 1.58 / 1;
  }

  .systems-card__icon {
    top: 25%;
    width: 26px;
    height: 26px;
    background-size: 26px 52px;
  }

  .systems-card__base-copy {
    bottom: 9%;
  }

  .systems-card__base-copy strong {
    font-size: clamp(11px, 3.3vw, 16px);
  }

  .systems-card__base-copy small {
    margin-top: 1px;
    font-size: clamp(7px, 2vw, 10px);
  }

  .systems-card__detail {
    z-index: 4;
  }

  .systems-card:nth-child(3n) .systems-card__detail {
    right: auto;
    left: 0;
  }

  .systems-card:nth-of-type(even) .systems-card__detail {
    right: 0;
    left: auto;
  }

  .systems-card:not(.systems-card--active) .systems-card__detail {
    width: 0;
    pointer-events: none;
  }

  .systems-card--active .systems-card__detail {
    width: calc(200% + 5px);
  }

  .systems-card__detail-copy {
    left: 7.5%;
  }

  .systems-card__detail-copy strong {
    font-size: clamp(15px, 4.4vw, 21px);
  }

  .systems-card__detail-copy small {
    font-size: clamp(8px, 2.4vw, 11px);
  }

  .systems-card__detail-copy i {
    width: 30px;
    margin-block: 8px 7px;
  }

  .systems-card__detail-copy em {
    max-width: 55vw;
    overflow: hidden;
    font-size: clamp(8px, 2.3vw, 11px);
    text-overflow: ellipsis;
  }

  .systems-card__plus {
    right: 5%;
    bottom: 9%;
    width: 25px;
    height: 25px;
    font-size: 17px;
  }
}

@media (max-width: 520px) {
  .systems-section {
    min-height: 663px;
    padding-top: 18px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .systems-card__detail,
  .systems-card__detail-copy,
  .systems-card__plus,
  .systems-card__base-image {
    transition: none;
  }
}
</style>
