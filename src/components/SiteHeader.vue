<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onBeforeUnmount, onMounted, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";

import { mainNavItems } from "@/data/home";
import { useUiStore } from "@/stores/ui";
import type { NavItem } from "@/types/content";

const route = useRoute();
const uiStore = useUiStore();
const {
  isHeaderHidden,
  isHeaderSolid,
  isMobileMenuOpen,
  openMobileGroup,
} = storeToRefs(uiStore);

let previousScrollY = 0;

const hasOverlayHeader = computed(() => route.meta.headerOverlay === true);
const useSolidTheme = computed(
  () =>
    !hasOverlayHeader.value || isHeaderSolid.value || isMobileMenuOpen.value,
);

function isInternal(item: NavItem): boolean {
  return !item.external;
}

function updateHeader(): void {
  const currentScrollY = Math.max(window.scrollY, 0);

  if (!hasOverlayHeader.value) {
    uiStore.setHeaderState(false, true);
    previousScrollY = currentScrollY;
    return;
  }

  if (currentScrollY <= 8) {
    uiStore.setHeaderState(false, false);
  } else if (currentScrollY > previousScrollY && currentScrollY > 90) {
    uiStore.setHeaderState(true, true);
  } else if (currentScrollY < previousScrollY) {
    uiStore.setHeaderState(false, true);
  }

  previousScrollY = currentScrollY;
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === "Escape" && isMobileMenuOpen.value) {
    uiStore.closeMobileMenu();
  }
}

watch(
  () => route.fullPath,
  () => {
    previousScrollY = window.scrollY;
    updateHeader();
  },
);

watch(
  () => isMobileMenuOpen.value,
  (isOpen) => {
    document.body.classList.toggle("menu-open", isOpen);
  },
);

onMounted(() => {
  previousScrollY = window.scrollY;
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
  window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  document.body.classList.remove("menu-open");
  window.removeEventListener("scroll", updateHeader);
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <header
    class="site-header"
    :class="{
      'site-header--solid': useSolidTheme,
      'site-header--hidden': isHeaderHidden && !isMobileMenuOpen,
      'site-header--open': isMobileMenuOpen,
    }"
  >
    <div class="site-header__inner">
      <RouterLink class="site-header__brand" to="/" aria-label="南洋迪克首页">
        <img
          class="site-header__logo"
          :src="useSolidTheme ? '/assets/svg/inline-02.svg' : '/assets/svg/inline-01.svg'"
          alt="南洋迪克"
        />
      </RouterLink>

      <nav class="desktop-nav" aria-label="主导航">
        <div
          v-for="item in mainNavItems"
          :key="item.english"
          class="desktop-nav__item"
        >
          <a
            v-if="item.external"
            class="desktop-nav__link"
            :href="item.href"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{{ item.label }}</span>
            <small class="bank">{{ item.english }}</small>
          </a>
          <RouterLink v-else class="desktop-nav__link" :to="item.href">
            <span>{{ item.label }}</span>
            <small class="bank">{{ item.english }}</small>
          </RouterLink>

          <div v-if="item.children?.length" class="desktop-nav__dropdown">
            <template v-for="child in item.children" :key="child.english">
              <a
                v-if="child.external"
                class="desktop-nav__dropdown-link"
                :href="child.href"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{{ child.label }}</span>
                <small class="bank">{{ child.english }}</small>
              </a>
              <RouterLink
                v-else
                class="desktop-nav__dropdown-link"
                :to="child.href"
              >
                <span>{{ child.label }}</span>
                <small class="bank">{{ child.english }}</small>
              </RouterLink>
            </template>
          </div>
        </div>
      </nav>

      <!-- <div class="site-header__actions">
        <RouterLink
          class="site-header__search"
          to="/globalSearch_1.html"
          aria-label="搜索"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 5 5" />
          </svg>
        </RouterLink>
        <button
          class="site-header__menu-button"
          type="button"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-site-navigation"
          :aria-label="isMobileMenuOpen ? '关闭导航菜单' : '打开导航菜单'"
          @click="uiStore.toggleMobileMenu"
        >
          <span />
          <span />
          <span />
        </button>
      </div> -->
    </div>

    <nav
      id="mobile-site-navigation"
      class="mobile-nav"
      :aria-hidden="!isMobileMenuOpen"
      aria-label="移动端主导航"
    >
      <ul class="mobile-nav__list">
        <li v-for="item in mainNavItems" :key="item.english" class="mobile-nav__item">
          <div v-if="item.children?.length">
            <button
              class="mobile-nav__link mobile-nav__group-button"
              type="button"
              :aria-expanded="openMobileGroup === item.english"
              @click="uiStore.toggleMobileGroup(item.english)"
            >
              <span>
                {{ item.label }}
                <small class="bank">{{ item.english }}</small>
              </span>
              <span class="mobile-nav__plus" aria-hidden="true" />
            </button>
            <div
              class="mobile-nav__children"
              :class="{ 'mobile-nav__children--open': openMobileGroup === item.english }"
            >
              <template v-for="child in item.children" :key="child.english">
                <a
                  v-if="child.external"
                  class="mobile-nav__child-link"
                  :href="child.href"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{{ child.label }}</span>
                  <small class="bank">{{ child.english }}</small>
                </a>
                <RouterLink
                  v-else
                  class="mobile-nav__child-link"
                  :to="child.href"
                >
                  <span>{{ child.label }}</span>
                  <small class="bank">{{ child.english }}</small>
                </RouterLink>
              </template>
            </div>
          </div>

          <a
            v-else-if="!isInternal(item)"
            class="mobile-nav__link"
            :href="item.href"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              {{ item.label }}
              <small class="bank">{{ item.english }}</small>
            </span>
            <span class="mobile-nav__arrow" aria-hidden="true">→</span>
          </a>
          <RouterLink v-else class="mobile-nav__link" :to="item.href">
            <span>
              {{ item.label }}
              <small class="bank">{{ item.english }}</small>
            </span>
            <span class="mobile-nav__arrow" aria-hidden="true">→</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid transparent;
  color: #fff;
  transition:
    transform 0.3s ease,
    background-color 0.3s ease,
    border-color 0.3s ease,
    color 0.3s ease;
}

.site-header--solid,
.site-header--open {
  border-bottom-color: rgb(51 44 43 / 18%);
  background: #eee;
  color: #332c2b;
}

.site-header--hidden {
  transform: translateY(-100%);
}

.site-header__inner {
  display: flex;
  width: 88%;
  min-height: 70px;
  margin: 0 auto;
  align-items: center;
  justify-content: space-between;
}

.site-header__logo {
  width: 63px;
  height: 48px;
  object-fit: contain;
}

.desktop-nav {
  display: flex;
  height: 70px;
  align-items: stretch;
  margin-left: auto;
}

.desktop-nav__item {
  position: relative;
  display: flex;
  align-items: stretch;
}

.desktop-nav__link {
  position: relative;
  display: flex;
  min-width: 94px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2px;
  padding: 0 20px;
  font-size: 16px;
  letter-spacing: 0.08em;
  white-space: nowrap;
}

.desktop-nav__link::after {
  position: absolute;
  right: 20px;
  bottom: 9px;
  left: 20px;
  height: 1px;
  background: currentcolor;
  content: "";
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.desktop-nav__link small {
  font-size: 10px;
  letter-spacing: 0.08em;
  opacity: 0.72;
}

.desktop-nav__item:hover > .desktop-nav__link::after,
.desktop-nav__item:focus-within > .desktop-nav__link::after,
.desktop-nav__link.router-link-active::after {
  transform: scaleX(1);
}

.desktop-nav__dropdown {
  position: absolute;
  top: 68px;
  left: 50%;
  display: grid;
  min-width: 230px;
  padding: 14px 20px 18px;
  background: rgb(238 238 238 / 96%);
  box-shadow: 0 14px 28px rgb(35 24 21 / 12%);
  color: #332c2b;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, 12px);
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.desktop-nav__item:hover .desktop-nav__dropdown,
.desktop-nav__item:focus-within .desktop-nav__dropdown {
  opacity: 1;
  pointer-events: auto;
  transform: translate(-50%, 0);
}

.desktop-nav__dropdown-link {
  display: grid;
  grid-template-columns: minmax(70px, auto) 1fr;
  align-items: baseline;
  gap: 16px;
  padding: 9px 0;
  border-bottom: 1px solid rgb(51 44 43 / 13%);
  font-size: 14px;
  white-space: nowrap;
}

.desktop-nav__dropdown-link:last-child {
  border-bottom: 0;
}

.desktop-nav__dropdown-link small {
  color: rgb(51 44 43 / 45%);
  font-size: 9px;
}

.site-header__actions {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.site-header__search {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
}

.site-header__search svg {
  width: 19px;
  height: 19px;
  fill: none;
  stroke: currentcolor;
  stroke-linecap: round;
  stroke-width: 1.5;
}

.site-header__menu-button {
  display: none;
  width: 42px;
  height: 42px;
  align-content: center;
  padding: 10px;
  background: transparent;
  cursor: pointer;
}

.site-header__menu-button span {
  display: block;
  width: 22px;
  height: 1px;
  margin: 5px 0;
  background: currentcolor;
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}

.mobile-nav {
  display: none;
}

@media (max-width: 1180px) {
  .desktop-nav__link {
    min-width: 82px;
    padding-inline: 13px;
    font-size: 15px;
  }

  .desktop-nav__link small {
    font-size: 9px;
  }
}

@media (max-width: 998px) {
  .site-header__inner {
    width: 90%;
    min-height: 40px;
    margin: 10px auto;
  }

  .site-header__logo {
    width: 32px;
    height: 30px;
  }

  .desktop-nav {
    display: none;
  }

  .site-header__actions {
    margin-left: auto;
  }

  .site-header__search {
    width: 36px;
    height: 36px;
    margin-right: 5px;
  }

  .site-header__search svg {
    width: 16px;
    height: 16px;
  }

  .site-header__menu-button {
    display: grid;
  }

  .site-header--open .site-header__menu-button span:nth-child(1) {
    transform: translateY(6px) rotate(45deg);
  }

  .site-header--open .site-header__menu-button span:nth-child(2) {
    opacity: 0;
  }

  .site-header--open .site-header__menu-button span:nth-child(3) {
    transform: translateY(-6px) rotate(-45deg);
  }

  .mobile-nav {
    position: fixed;
    top: 60px;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    overflow-y: auto;
    padding: 6vh 8% 12vh;
    background: #eee;
    color: #332c2b;
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px);
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }

  .site-header--open .mobile-nav {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  .mobile-nav__list {
    max-width: 720px;
    padding: 0;
    margin: 0 auto;
    list-style: none;
  }

  .mobile-nav__item {
    border-bottom: 1px solid rgb(51 44 43 / 17%);
  }

  .mobile-nav__link {
    display: flex;
    width: 100%;
    min-height: 62px;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    background: transparent;
    color: inherit;
    cursor: pointer;
    text-align: left;
  }

  .mobile-nav__link > span:first-child {
    display: flex;
    align-items: baseline;
    gap: 12px;
    font-size: 17px;
    letter-spacing: 0.08em;
  }

  .mobile-nav__link small {
    color: rgb(51 44 43 / 42%);
    font-size: 9px;
    letter-spacing: 0.06em;
  }

  .mobile-nav__arrow {
    font-size: 18px;
    font-weight: 200;
  }

  .mobile-nav__plus {
    position: relative;
    width: 17px;
    height: 17px;
  }

  .mobile-nav__plus::before,
  .mobile-nav__plus::after {
    position: absolute;
    top: 8px;
    left: 0;
    width: 17px;
    height: 1px;
    background: currentcolor;
    content: "";
    transition: transform 0.25s ease;
  }

  .mobile-nav__plus::after {
    transform: rotate(90deg);
  }

  .mobile-nav__group-button[aria-expanded="true"] .mobile-nav__plus::after {
    transform: rotate(0);
  }

  .mobile-nav__children {
    display: grid;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease;
  }

  .mobile-nav__children--open {
    max-height: 500px;
  }

  .mobile-nav__child-link {
    display: grid;
    min-height: 45px;
    grid-template-columns: minmax(86px, auto) 1fr;
    align-items: baseline;
    gap: 15px;
    padding: 0 0 0 8%;
    color: rgb(51 44 43 / 78%);
    font-size: 13px;
  }

  .mobile-nav__child-link small {
    color: rgb(51 44 43 / 40%);
    font-size: 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-header,
  .mobile-nav,
  .desktop-nav__dropdown {
    transition: none;
  }
}
</style>
