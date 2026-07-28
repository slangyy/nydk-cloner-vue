<script setup lang="ts">
import InnerPageHero from "@/components/InnerPageHero.vue";
import { poseenaHero } from "@/data/poseena";
</script>

<template>
  <InnerPageHero v-bind="poseenaHero" />
</template>
