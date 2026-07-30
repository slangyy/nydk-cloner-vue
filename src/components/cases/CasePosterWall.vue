<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";

import type { CaseStudy } from "@/types/content";

defineProps<{
  readonly cases: readonly CaseStudy[];
}>();

const emit = defineEmits<{
  select: [caseStudy: CaseStudy, trigger: HTMLButtonElement];
}>();

const posterWall = ref<HTMLElement | null>(null);
let resizeObserver: ResizeObserver | undefined;

function selectCase(caseStudy: CaseStudy, event: MouseEvent): void {
  if (event.currentTarget instanceof HTMLButtonElement) {
    emit("select", caseStudy, event.currentTarget);
  }
}

function updateCardSpan(card: HTMLElement): void {
  if (!posterWall.value) {
    return;
  }

  const wallStyles = window.getComputedStyle(posterWall.value);
  const rowHeight = Number.parseFloat(wallStyles.gridAutoRows);
  const rowGap = Number.parseFloat(wallStyles.rowGap);

  if (!Number.isFinite(rowHeight) || rowHeight <= 0) {
    return;
  }

  const cardHeight = card.getBoundingClientRect().height;
  const span = Math.ceil((cardHeight + rowGap) / (rowHeight + rowGap));
  card.style.gridRowEnd = `span ${span}`;
}

onMounted(async () => {
  await nextTick();

  if (!posterWall.value) {
    return;
  }

  resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.target instanceof HTMLElement) {
        updateCardSpan(entry.target);
      }
    });
  });

  posterWall.value
    .querySelectorAll<HTMLElement>(".case-card")
    .forEach((card) => {
      updateCardSpan(card);
      resizeObserver?.observe(card);
    });
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
});
</script>

<template>
  <section class="case-poster-wall" aria-labelledby="case-poster-wall-title">
    <header class="case-poster-wall__header">
      <p class="case-poster-wall__eyebrow bank">
        PROJECT STORIES
      </p>
      <h2 id="case-poster-wall-title">
        空间案例
      </h2>
      <i aria-hidden="true" />
      <p>
        从真实居住场景出发，以全案视角呈现空间、产品与生活方式的完整关系。
      </p>
    </header>

    <div ref="posterWall" class="case-poster-wall__columns">
      <article
        v-for="caseStudy in cases"
        :key="caseStudy.id"
        class="case-card"
      >
        <button
          class="case-card__button"
          type="button"
          aria-haspopup="dialog"
          :aria-label="`查看案例图集：${caseStudy.title}`"
          @click="selectCase(caseStudy, $event)"
        >
          <span
            class="case-card__media"
            :class="`case-card__media--${caseStudy.posterRatio}`"
          >
            <img
              :src="caseStudy.cover.src"
              :alt="caseStudy.cover.alt"
              loading="lazy"
            />
            <span
              v-if="caseStudy.location || caseStudy.series"
              class="case-card__badge"
            >
              {{ [caseStudy.location, caseStudy.series].filter(Boolean).join(" · ") }}
            </span>
            <span class="case-card__view">
              查看图集
              <span aria-hidden="true">＋</span>
            </span>
          </span>

          <span class="case-card__copy">
            <span class="case-card__meta">
              <span v-if="caseStudy.series">{{ caseStudy.series }}</span>
              <span>{{ caseStudy.gallery.length + 1 }} 张图片</span>
            </span>
            <strong>{{ caseStudy.title }}</strong>
            <span class="case-card__summary">{{ caseStudy.summary }}</span>
            <span v-if="caseStudy.tags.length" class="case-card__tags">
              <span v-for="tag in caseStudy.tags" :key="tag">{{ tag }}</span>
            </span>
          </span>
        </button>
      </article>
    </div>
  </section>
</template>

<style scoped>
.case-poster-wall {
  padding: clamp(72px, 7.5vw, 120px) 0 clamp(90px, 8vw, 140px);
  background: #f7f5f3;
  color: var(--nydk-ink);
}

.case-poster-wall__header {
  width: var(--nydk-container);
  max-width: 780px;
  margin: 0 auto clamp(42px, 4.5vw, 72px);
  text-align: center;
}

.case-poster-wall__eyebrow {
  margin: 0 0 12px;
  color: var(--nydk-walnut);
  font-size: 12px;
  letter-spacing: 0.2em;
}

.case-poster-wall__header h2 {
  margin: 0;
  font-size: clamp(30px, 3.1vw, 48px);
  font-weight: 300;
  letter-spacing: 0.16em;
  text-indent: 0.16em;
}

.case-poster-wall__header i {
  display: block;
  width: 58px;
  height: 3px;
  margin: 20px auto;
  background: var(--nydk-rosewood);
}

.case-poster-wall__header > p:last-child {
  margin: 0;
  color: rgb(35 24 21 / 58%);
  font-size: 14px;
  letter-spacing: 0.04em;
  line-height: 2;
}

.case-poster-wall__columns {
  display: grid;
  width: var(--nydk-container);
  margin: 0 auto;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-flow: row dense;
  grid-auto-rows: 8px;
  column-gap: clamp(18px, 2vw, 30px);
  row-gap: 8px;
}

.case-card {
  width: 100%;
  align-self: start;
}

.case-card__button {
  display: block;
  width: 100%;
  overflow: hidden;
  padding: 0;
  border: 1px solid rgb(60 49 47 / 9%);
  background: #fff;
  box-shadow: 0 14px 36px rgb(35 24 21 / 7%);
  color: inherit;
  cursor: pointer;
  text-align: left;
  transition:
    border-color 0.35s ease,
    box-shadow 0.35s ease,
    transform 0.35s ease;
}

.case-card__button:hover,
.case-card__button:focus-visible {
  border-color: rgb(188 148 128 / 72%);
  box-shadow: 0 20px 46px rgb(35 24 21 / 13%);
  outline: none;
  transform: translateY(-4px);
}

.case-card__media {
  position: relative;
  display: block;
  overflow: hidden;
  background: var(--nydk-brown);
}

.case-card__media--landscape {
  aspect-ratio: 16 / 10.5;
}

.case-card__media--portrait {
  aspect-ratio: 4 / 5;
}

.case-card__media::after {
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgb(35 24 21 / 48%), transparent 45%);
  content: "";
  opacity: 0.48;
  transition: opacity 0.35s ease;
}

.case-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.65s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.case-card__button:hover .case-card__media img,
.case-card__button:focus-visible .case-card__media img {
  transform: scale(1.045);
}

.case-card__button:hover .case-card__media::after,
.case-card__button:focus-visible .case-card__media::after {
  opacity: 0.72;
}

.case-card__badge {
  position: absolute;
  z-index: 2;
  top: 18px;
  left: 18px;
  max-width: calc(100% - 36px);
  padding: 7px 11px;
  background: rgb(35 24 21 / 72%);
  color: #fff;
  font-size: 11px;
  letter-spacing: 0.06em;
  line-height: 1.4;
}

.case-card__view {
  position: absolute;
  z-index: 2;
  right: 20px;
  bottom: 18px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  font-size: 12px;
  letter-spacing: 0.12em;
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.case-card__view > span {
  font-size: 17px;
}

.case-card__button:hover .case-card__view,
.case-card__button:focus-visible .case-card__view {
  opacity: 1;
  transform: translateY(0);
}

.case-card__copy {
  display: grid;
  gap: 12px;
  padding: clamp(20px, 2vw, 28px);
}

.case-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  color: rgb(99 79 68 / 58%);
  font-size: 10px;
  letter-spacing: 0.08em;
}

.case-card__copy strong {
  color: var(--nydk-ink);
  font-size: clamp(19px, 1.55vw, 24px);
  font-weight: 500;
  letter-spacing: 0.08em;
  line-height: 1.45;
}

.case-card__summary {
  display: -webkit-box;
  overflow: hidden;
  color: rgb(35 24 21 / 58%);
  font-size: 13px;
  line-height: 1.9;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.case-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 3px;
}

.case-card__tags > span {
  padding: 5px 9px;
  background: #f1ece9;
  color: var(--nydk-walnut);
  font-size: 10px;
  letter-spacing: 0.05em;
}

@media (max-width: 998px) {
  .case-poster-wall {
    padding-block: 65px 90px;
  }

  .case-poster-wall__header {
    margin-bottom: 42px;
  }

  .case-poster-wall__header > p:last-child {
    font-size: 12px;
  }

  .case-poster-wall__columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 18px;
  }

  .case-card__view {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 640px) {
  .case-poster-wall {
    padding-block: 54px 72px;
  }

  .case-poster-wall__header {
    margin-bottom: 34px;
  }

  .case-poster-wall__header h2 {
    font-size: 27px;
  }

  .case-poster-wall__header i {
    width: 42px;
    height: 2px;
    margin-block: 15px;
  }

  .case-poster-wall__columns {
    grid-template-columns: minmax(0, 1fr);
  }

  .case-card__media--portrait {
    aspect-ratio: 4 / 4.6;
  }

  .case-card__badge {
    top: 12px;
    left: 12px;
  }

  .case-card__copy {
    gap: 9px;
    padding: 18px;
  }

  .case-card__summary {
    font-size: 12px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .case-card__button,
  .case-card__media::after,
  .case-card__media img,
  .case-card__view {
    transition: none;
  }
}
</style>
