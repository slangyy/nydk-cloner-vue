<script setup lang="ts">
import { RouterLink } from "vue-router";

import {
  aboutNavItems,
  footerBrandLogo,
  footerContacts,
  footerQrCode,
  productNavItems,
} from "@/data/home";
import type { FooterContact, NavItem } from "@/types/content";

interface FooterColumn {
  readonly title: string;
  readonly english: string;
  readonly href?: string;
  readonly external?: boolean;
  readonly links: readonly NavItem[];
}

const footerColumns: readonly FooterColumn[] = [
  {
    title: "普西纳",
    english: "Poseena",
    href: "/ExtremeSystem.html",
    links: [],
  },
  {
    title: "联系",
    english: "Contact",
    href: "/ContactUs.html",
    links: [],
  },
  {
    title: "产品",
    english: "Product",
    links: productNavItems,
  },
  {
    title: "案例",
    english: "Case",
    href:
      "https://www.kujiale.com/pub/site/design-zone/Window_of_design/scenes?kpm=qkWL.b53388404e567714.c112e63.1705731598528",
    external: true,
    links: [],
  },
  {
    title: "商业",
    english: "Cooperate",
    href: "/BusinessModel.html",
    links: [],
  },
  {
    title: "关于",
    english: "Neodko",
    links: aboutNavItems,
  },
] as const;

const contactIcons: Readonly<Record<FooterContact["icon"], string>> = {
  phone: "☎",
  location: "⌖",
  join: "◇",
  mail: "✉",
};
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <!-- <div class="site-footer__top">
        <section class="site-footer__brand" aria-label="南洋迪克品牌信息">
          <img class="site-footer__wordmark" :src="footerBrandLogo" alt="南洋迪克" />
          <div class="site-footer__social" aria-label="社交媒体">
            <button type="button" aria-label="微信">
              微
            </button>
            <button type="button" aria-label="抖音">
              抖
            </button>
            <button type="button" aria-label="小红书">
              书
            </button>
          </div>
          <div class="site-footer__qr">
            <img :src="footerQrCode" alt="南洋迪克官方二维码" />
            <p>关注南洋迪克</p>
          </div>
        </section>

        <nav class="site-footer__navigation" aria-label="页脚导航">
          <section
            v-for="column in footerColumns"
            :key="column.english"
            class="site-footer__column"
          >
            <h2 v-if="column.external">
              <a
                :href="column.href"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ column.title }}
                <small class="bank">{{ column.english }}</small>
              </a>
            </h2>
            <h2 v-else-if="column.href">
              <RouterLink :to="column.href">
                {{ column.title }}
                <small class="bank">{{ column.english }}</small>
              </RouterLink>
            </h2>
            <h2 v-else>
              {{ column.title }}
              <small class="bank">{{ column.english }}</small>
            </h2>
            <ul>
              <li v-for="link in column.links" :key="`${column.english}-${link.english}`">
                <a
                  v-if="link.external"
                  :href="link.href"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ link.label }}
                </a>
                <RouterLink v-else :to="link.href">
                  {{ link.label }}
                </RouterLink>
              </li>
            </ul>
          </section>
        </nav>
      </div> -->

      <address class="site-footer__contacts">
        <div
          v-for="contact in footerContacts"
          :key="`${contact.icon}-${contact.label}`"
          class="site-footer__contact"
        >
          <span class="site-footer__contact-icon" aria-hidden="true">
            {{ contactIcons[contact.icon] }}
          </span>
          <span class="site-footer__contact-copy">
            <small>{{ contact.label }}</small>
            <a v-if="contact.href" :href="contact.href">{{ contact.value }}</a>
            <strong v-else>{{ contact.value }}</strong>
          </span>
        </div>
      </address>

      <!-- <div class="site-footer__legal">
        <p>Copyright © 南洋迪克家居有限公司</p>
        <div class="site-footer__legal-links">
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            陕ICP备19021075号
          </a>
          <a
            href="http://www.cebest.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            技术支持：中企高呈
          </a>
          <RouterLink to="/term/1749259714752299008.html">
            法律声明
          </RouterLink>
          <RouterLink to="/term/1749259636859879424.html">
            隐私条款
          </RouterLink>
        </div>
      </div> -->
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  min-height: 134px;
  padding: 68px 0 26px;
  background: #f4f2f1;
  color: #3c312f;
}

.site-footer__inner {
  width: 88%;
  max-width: 1264px;
  margin: 0 auto;
}

.site-footer__top {
  display: grid;
  min-height: 245px;
  grid-template-columns: 220px 1fr;
  gap: 7%;
}

.site-footer__brand {
  display: grid;
  align-content: start;
  grid-template-columns: 1fr 94px;
  grid-template-rows: auto auto;
  column-gap: 22px;
}

.site-footer__wordmark {
  width: 125px;
  max-height: 45px;
  object-fit: contain;
  object-position: left center;
}

.site-footer__social {
  display: flex;
  grid-column: 1;
  gap: 9px;
  margin-top: 23px;
}

.site-footer__social button {
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  padding: 0;
  border: 1px solid rgb(60 49 47 / 45%);
  border-radius: 50%;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-size: 10px;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.site-footer__social button:hover,
.site-footer__social button:focus-visible {
  background: #634f44;
  color: #fff;
}

.site-footer__qr {
  grid-column: 2;
  grid-row: 1 / span 2;
  text-align: center;
}

.site-footer__qr img {
  width: 92px;
  height: 92px;
  object-fit: cover;
}

.site-footer__qr p {
  margin: 9px 0 0;
  font-size: 11px;
  letter-spacing: 0.08em;
}

.site-footer__navigation {
  display: grid;
  grid-template-columns: 0.75fr 0.8fr 1.7fr 0.85fr 0.8fr 1.2fr;
  gap: clamp(16px, 2.6vw, 44px);
}

.site-footer__column h2 {
  margin: 0 0 22px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.08em;
  white-space: nowrap;
}

.site-footer__column h2 small {
  display: block;
  margin-top: 4px;
  color: rgb(60 49 47 / 42%);
  font-size: 8px;
  font-weight: 400;
  letter-spacing: 0.05em;
}

.site-footer__column ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.site-footer__column li {
  margin-bottom: 10px;
  color: rgb(60 49 47 / 64%);
  font-size: 11px;
  line-height: 1.45;
}

.site-footer__column a {
  transition: color 0.25s ease;
}

.site-footer__column a:hover,
.site-footer__column a:focus-visible {
  color: #bc9480;
}

.site-footer__contacts {
  display: grid;
  padding: 28px 0 29px;
  border-top: 1px solid rgb(60 49 47 / 14%);
  border-bottom: 1px solid rgb(60 49 47 / 14%);
  font-style: normal;
  grid-template-columns: 1fr 1.75fr 1.2fr 1.4fr;
}

.site-footer__contact {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 13px;
  padding-right: 24px;
}

.site-footer__contact + .site-footer__contact {
  padding-left: 24px;
  border-left: 1px solid rgb(60 49 47 / 14%);
}

.site-footer__contact-icon {
  display: grid;
  width: 30px;
  height: 30px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid rgb(60 49 47 / 38%);
  border-radius: 50%;
  font-size: 13px;
}

.site-footer__contact-copy {
  display: grid;
  min-width: 0;
  gap: 6px;
}

.site-footer__contact-copy small {
  color: rgb(60 49 47 / 46%);
  font-size: 9px;
}

.site-footer__contact-copy a,
.site-footer__contact-copy strong {
  overflow: hidden;
  font-size: 11px;
  font-weight: 400;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.site-footer__legal {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 24px;
  color: rgb(60 49 47 / 48%);
  font-size: 9px;
}

.site-footer__legal p {
  margin: 0;
}

.site-footer__legal-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 9px 20px;
}

.site-footer__legal a:hover,
.site-footer__legal a:focus-visible {
  color: #634f44;
}

@media (max-width: 1180px) {
  .site-footer__top {
    grid-template-columns: 190px 1fr;
    gap: 4%;
  }

  .site-footer__navigation {
    gap: 16px;
  }

  .site-footer__contact {
    gap: 8px;
    padding-right: 12px;
  }

  .site-footer__contact + .site-footer__contact {
    padding-left: 12px;
  }
}

@media (max-width: 998px) {
  .site-footer {
    min-height: 590px;
    padding: 49px 0 22px;
  }

  .site-footer__inner {
    width: 90%;
  }

  .site-footer__top {
    display: block;
    min-height: auto;
  }

  .site-footer__brand {
    width: min(310px, 100%);
    grid-template-columns: 1fr 104px;
    margin: 0 auto 40px;
  }

  .site-footer__wordmark {
    width: 132px;
  }

  .site-footer__social {
    margin-top: 21px;
  }

  .site-footer__qr img {
    width: 101px;
    height: 101px;
  }

  .site-footer__navigation {
    display: none;
  }

  .site-footer__contacts {
    display: grid;
    padding: 25px 0 20px;
    grid-template-columns: 1fr 1fr;
    row-gap: 24px;
  }

  .site-footer__contact {
    align-items: flex-start;
    gap: 9px;
    padding: 0 10px 0 0;
  }

  .site-footer__contact + .site-footer__contact {
    padding-left: 0;
    border-left: 0;
  }

  .site-footer__contact:nth-child(even) {
    padding-left: 12px;
    border-left: 1px solid rgb(60 49 47 / 14%);
  }

  .site-footer__contact-icon {
    width: 26px;
    height: 26px;
    font-size: 11px;
  }

  .site-footer__contact-copy {
    gap: 4px;
  }

  .site-footer__contact-copy a,
  .site-footer__contact-copy strong {
    font-size: 9px;
    white-space: normal;
  }

  .site-footer__legal {
    display: grid;
    justify-content: stretch;
    gap: 13px;
    padding-top: 18px;
    font-size: 8px;
    text-align: center;
  }

  .site-footer__legal-links {
    justify-content: center;
    gap: 7px 14px;
  }
}

@media (max-width: 420px) {
  .site-footer__contacts {
    row-gap: 20px;
  }

  .site-footer__contact {
    gap: 6px;
  }

  .site-footer__contact:nth-child(even) {
    padding-left: 8px;
  }

  .site-footer__contact-copy small {
    font-size: 8px;
  }

  .site-footer__contact-copy a,
  .site-footer__contact-copy strong {
    font-size: 8px;
  }
}
</style>
