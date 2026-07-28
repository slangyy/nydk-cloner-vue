<script setup lang="ts">
import { ref, type ComponentPublicInstance } from "vue";

import { useReveal } from "@/composables/useReveal";
import { poseenaMentors } from "@/data/poseena";

const activeId = ref(poseenaMentors[0]?.id ?? "");
const { target, isVisible } = useReveal();

function activateMentor(id: string): void {
  activeId.value = id;
}

function setRevealTarget(element: Element | ComponentPublicInstance | null): void {
  target.value = element instanceof HTMLElement ? element : null;
}
</script>

<template>
  <section
    class="poseena-mentors"
    aria-labelledby="poseena-mentors-title"
  >
    <div
      :ref="setRevealTarget"
      class="poseena-mentors__container reveal"
      :class="{ 'is-visible': isVisible }"
    >
      <header class="poseena-mentors__header">
        <h2 id="poseena-mentors-title">
          品牌有依 落地有声
        </h2>
        <span aria-hidden="true" />
      </header>

      <ul class="poseena-mentors__list">
        <li
          v-for="mentor in poseenaMentors"
          :key="mentor.id"
          class="mentor-card"
          :class="{ 'mentor-card--active': activeId === mentor.id }"
          tabindex="0"
          @pointerenter="activateMentor(mentor.id)"
          @focusin="activateMentor(mentor.id)"
        >
          <div class="mentor-card__copy">
            <h3>
              {{ mentor.role }} <span>|</span> {{ mentor.name }}
            </h3>
            <p class="mentor-card__position">
              {{ mentor.position }}
            </p>
            <p class="mentor-card__english bank">
              {{ mentor.english }}
            </p>
            <ul class="mentor-card__achievements">
              <li
                v-for="achievement in mentor.achievements"
                :key="achievement"
              >
                <template v-if="achievement.includes('+')">
                  {{ achievement.split("+")[0] }}<i>+</i>{{ achievement.split("+")[1] }}
                </template>
                <template v-else>
                  {{ achievement }}
                </template>
              </li>
            </ul>
          </div>
          <img
            class="mentor-card__portrait"
            :src="mentor.image"
            :alt="`${mentor.role}${mentor.name}`"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.poseena-mentors {
  position: relative;
  padding: 110px 0 0;
  background: #a85b52 url("/assets/poseena/pattern-rose.jpg") center / cover no-repeat;
}

.poseena-mentors__container {
  position: relative;
  z-index: 2;
  width: 80%;
  max-width: 1440px;
  margin: 0 auto;
  overflow: visible;
}

.poseena-mentors__header {
  color: #fff;
  text-align: center;
}

.poseena-mentors__header h2 {
  margin: 0;
  font-size: 48px;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1.35;
}

.poseena-mentors__header > span {
  display: block;
  width: 120px;
  height: 2px;
  margin: 25px auto 0;
  background: #fff;
}

.poseena-mentors__list {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  padding: 0;
  margin: 70px 0 0;
  list-style: none;
}

.mentor-card {
  position: relative;
  width: 32%;
  height: 540px;
  overflow: hidden;
  background: #000000;
  color: #fff;
  outline: none;
  transition: width 0.5s ease;
}

.mentor-card--active {
  width: 66.6%;
}

.mentor-card:focus-visible {
  box-shadow: inset 0 0 0 2px rgb(255 255 255 / 80%);
}

.mentor-card__portrait {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 392px;
  height: 540px;
  object-fit: cover;
  object-position: center bottom;
}

.mentor-card__copy {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 0;
  width: calc(100% - 392px);
  padding-left: 10%;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-50%);
  transition: opacity 0.2s ease;
}

.mentor-card--active .mentor-card__copy {
  opacity: 1;
}

.mentor-card__copy h3 {
  margin: 0;
  font-size: 48px;
  font-weight: 600;
  letter-spacing: 0.03em;
  line-height: 1.2;
  white-space: nowrap;
}

.mentor-card__copy h3 span {
  font-weight: 400;
}

.mentor-card__position {
  margin: 20px 0 0;
  font-size: 18px;
  line-height: 1.7;
}

.mentor-card__english {
  margin: 7px 0 0;
  color: rgb(255 255 255 / 70%);
  font-size: 14px;
  line-height: 1.5;
}

.mentor-card__achievements {
  padding: 0;
  margin: 15% 0 0;
  list-style: none;
}

.mentor-card__achievements li {
  font-size: 24px;
  line-height: 1.65;
  white-space: nowrap;
}

.mentor-card__achievements i {
  color: #d7282f;
  font-family: Arial, sans-serif;
  font-style: normal;
  font-weight: 700;
}

@media (min-width: 1601px) {
  .poseena-mentors__container {
    width: min(90%, 1440px);
  }
}

@media (max-width: 1440px) {
  .mentor-card {
    height: 480px;
  }

  .mentor-card__portrait {
    width: 350px;
    height: 480px;
  }

  .mentor-card__copy {
    width: calc(100% - 350px);
    padding-left: 7%;
  }

  .mentor-card__copy h3 {
    font-size: 38px;
  }

  .mentor-card__position {
    font-size: 16px;
  }

  .mentor-card__achievements li {
    font-size: 19px;
  }
}

@media (max-width: 1200px) {
  .poseena-mentors__container {
    width: 90%;
  }
}

@media (max-width: 998px) {
  .poseena-mentors {
    padding-top: 40px;
  }

  .poseena-mentors__header h2 {
    font-size: 20px;
  }

  .poseena-mentors__header > span {
    width: 60px;
    margin-top: 12px;
  }

  .poseena-mentors__list {
    flex-wrap: wrap;
    margin-top: 20px;
  }

  .mentor-card,
  .mentor-card--active {
    display: flex;
    width: 100%;
    height: auto;
    min-height: 0;
    align-items: stretch;
    margin-bottom: 15px;
  }

  .mentor-card__copy,
  .mentor-card--active .mentor-card__copy {
    position: static;
    display: flex;
    width: 65%;
    flex-direction: column;
    justify-content: center;
    padding: 20px 10px 20px 20px;
    opacity: 1;
    pointer-events: auto;
    transform: none;
  }

  .mentor-card__portrait {
    position: static;
    width: 35%;
    height: auto;
    align-self: flex-end;
    object-fit: cover;
    object-position: center bottom;
  }

  .mentor-card__copy h3 {
    font-size: 16px;
    white-space: normal;
  }

  .mentor-card__position {
    margin-top: 10px;
    font-size: 12px;
    line-height: 1.5;
  }

  .mentor-card__english {
    margin-top: 4px;
    font-size: 12px;
  }

  .mentor-card__achievements {
    margin-top: 10px;
  }

  .mentor-card__achievements li {
    font-size: 12px;
    line-height: 1.6;
    white-space: normal;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mentor-card,
  .mentor-card__copy {
    transition: none;
  }
}
</style>
