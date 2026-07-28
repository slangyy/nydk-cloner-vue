<script setup lang="ts">
import PoseenaCasesSection from "@/components/poseena/PoseenaCasesSection.vue";
import PoseenaHero from "@/components/poseena/PoseenaHero.vue";
import PoseenaMentorsSection from "@/components/poseena/PoseenaMentorsSection.vue";
import PoseenaProductSystemSection from "@/components/poseena/PoseenaProductSystemSection.vue";
import PoseenaPursuitSection from "@/components/poseena/PoseenaPursuitSection.vue";
import PoseenaStorySection from "@/components/poseena/PoseenaStorySection.vue";
import PoseenaStrategySection from "@/components/poseena/PoseenaStrategySection.vue";
import SiteFooter from "@/components/SiteFooter.vue";
import SiteHeader from "@/components/SiteHeader.vue";
</script>

<template>
  <div class="poseena-view">
    <SiteHeader />
    <main>
      <PoseenaHero />
      <PoseenaStorySection />
      <PoseenaMentorsSection />
      <PoseenaStrategySection />
      <PoseenaPursuitSection />
      <PoseenaProductSystemSection />
      <PoseenaCasesSection />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.poseena-view {
  overflow: hidden;
  background: #fff;
}
</style>
