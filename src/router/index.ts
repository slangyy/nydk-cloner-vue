import { createRouter, createWebHistory } from "vue-router";

import CasesView from "@/views/CasesView.vue";
import HomeView from "@/views/HomeView.vue";
import DesignSystemView from "@/views/DesignSystemView.vue";
import FinishedSystemView from "@/views/FinishedSystemView.vue";
import IntegratedSystemView from "@/views/IntegratedSystemView.vue";
import IntelligentSystemView from "@/views/IntelligentSystemView.vue";
import MaterialSystemView from "@/views/MaterialSystemView.vue";
import PlaceholderView from "@/views/PlaceholderView.vue";
import PoseenaView from "@/views/PoseenaView.vue";
import ProcessSystemView from "@/views/ProcessSystemView.vue";
import ProductionSystemView from "@/views/ProductionSystemView.vue";
import ServiceSystemView from "@/views/ServiceSystemView.vue";
import { useUiStore } from "@/stores/ui";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        headerOverlay: true,
        title: "NEWNOBEL",
      },
    },
    {
      path: "/cases",
      name: "cases",
      component: CasesView,
      meta: {
        headerOverlay: true,
        title: "案例-NEWNOBEL",
      },
    },
    {
      path: "/ExtremeSystem",
      name: "poseena",
      component: PoseenaView,
      meta: {
        headerOverlay: true,
        title: "POSEENA普西纳-NEWNOBEL",
      },
    },
    {
      path: "/design",
      name: "design-system",
      component: DesignSystemView,
      meta: {
        headerOverlay: true,
        title: "设计系统-NEWNOBEL",
      },
    },
    {
      path: "/intelligence",
      name: "production-system",
      component: ProductionSystemView,
      meta: {
        headerOverlay: true,
        title: "生产系统-NEWNOBEL",
      },
    },
    {
      path: "/technique",
      name: "process-system",
      component: ProcessSystemView,
      meta: {
        headerOverlay: true,
        title: "工艺系统-NEWNOBEL",
      },
    },
    {
      path: "/Zhijia",
      name: "intelligent-system",
      component: IntelligentSystemView,
      meta: {
        headerOverlay: true,
        title: "智家系统-NEWNOBEL",
      },
    },
    {
      path: "/home_decoration_p5",
      name: "finished-system",
      component: FinishedSystemView,
      alias: ["/home_decoration_p5.html"],
      props: {
        variantKey: "poseena",
      },
      meta: {
        headerOverlay: true,
        title: "POSEENA-NEWNOBEL",
      },
    },
    {
      path: "/home_decoration_p1",
      name: "finished-system-heqi",
      component: FinishedSystemView,
      alias: ["/home_decoration_p1.html"],
      props: {
        variantKey: "heqi",
      },
      meta: {
        headerOverlay: true,
        title: "禾气-NEWNOBEL",
      },
    },
    {
      path: "/home_decoration_p2",
      name: "finished-system-qizhi",
      component: FinishedSystemView,
      alias: ["/home_decoration_p2.html"],
      props: {
        variantKey: "qizhi",
      },
      meta: {
        headerOverlay: true,
        title: "气质-NEWNOBEL",
      },
    },
    {
      path: "/home_decoration_p3",
      name: "finished-system-tianji",
      component: FinishedSystemView,
      alias: ["/home_decoration_p3.html"],
      props: {
        variantKey: "tianji",
      },
      meta: {
        headerOverlay: true,
        title: "天际-NEWNOBEL",
      },
    },
    {
      path: "/home_decoration_p4",
      name: "finished-system-lingjian",
      component: FinishedSystemView,
      alias: ["/home_decoration_p4.html"],
      props: {
        variantKey: "lingjian",
      },
      meta: {
        headerOverlay: true,
        title: "领见-NEWNOBEL",
      },
    },
    {
      path: "/home_decoration_p6",
      name: "finished-system-diko",
      component: FinishedSystemView,
      alias: ["/home_decoration_p6.html"],
      props: {
        variantKey: "diko",
      },
      meta: {
        headerOverlay: true,
        title: "DIKO-NEWNOBEL",
      },
    },
    {
      path: "/material",
      name: "material-system",
      component: MaterialSystemView,
      meta: {
        headerOverlay: true,
        title: "材料系统-NEWNOBEL",
      },
    },
    {
      path: "/FixedInstallation_1",
      name: "integrated-system",
      component: IntegratedSystemView,
      alias: ["/FixedInstallation_1.html"],
      props: {
        variantKey: "door",
      },
      meta: {
        headerOverlay: true,
        title: "门-NEWNOBEL",
      },
    },
    {
      path: "/FixedInstallation_2",
      name: "integrated-system-wall",
      component: IntegratedSystemView,
      alias: ["/FixedInstallation_2.html"],
      props: {
        variantKey: "wall",
      },
      meta: {
        headerOverlay: true,
        title: "墙-NEWNOBEL",
      },
    },
    {
      path: "/FixedInstallation_3",
      name: "integrated-system-cabinet",
      component: IntegratedSystemView,
      alias: ["/FixedInstallation_3.html"],
      props: {
        variantKey: "cabinet",
      },
      meta: {
        headerOverlay: true,
        title: "柜-NEWNOBEL",
      },
    },
    {
      path: "/SaveWorry",
      name: "service-system",
      component: ServiceSystemView,
      meta: {
        headerOverlay: true,
        title: "服务系统-NEWNOBEL",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "placeholder",
      component: PlaceholderView,
    },
  ],
});

router.afterEach((to) => {
  useUiStore().closeMobileMenu();

  document.title =
    typeof to.meta.title === "string"
      ? to.meta.title
      : "NEWNOBEL";
});

export default router;
