<script setup lang="ts">
import CasesShowcase from "@/components/CasesShowcase.vue";
import DesignInstituteSection from "@/components/DesignInstituteSection.vue";
import HeroSection from "@/components/HeroSection.vue";
import HomeSystemsSection from "@/components/HomeSystemsSection.vue";
import NewsSection from "@/components/NewsSection.vue";
import SiteFooter from "@/components/SiteFooter.vue";
import SiteHeader from "@/components/SiteHeader.vue";
import SpaceShowcase from "@/components/SpaceShowcase.vue";
</script>

<template>
  <div class="home-view">
    <SiteHeader />
    <main>
      <HeroSection />
      <HomeSystemsSection />
      <SpaceShowcase />
      <DesignInstituteSection />
      <CasesShowcase />
      <NewsSection />
    </main>
    <SiteFooter />
  </div>
</template>
