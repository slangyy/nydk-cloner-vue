import { createRouter, createWebHistory } from "vue-router";

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
        title: "南洋迪克全案系统家居",
      },
    },
    {
      path: "/ExtremeSystem.html",
      name: "poseena",
      component: PoseenaView,
      meta: {
        headerOverlay: true,
        title: "POSEENA普西纳-南洋迪克全案系统家居",
      },
    },
    {
      path: "/design",
      name: "design-system",
      component: DesignSystemView,
      meta: {
        headerOverlay: true,
        title: "设计系统-南洋迪克全案系统家居",
      },
    },
    {
      path: "/intelligence",
      name: "production-system",
      component: ProductionSystemView,
      meta: {
        headerOverlay: true,
        title: "生产系统-南洋迪克全案系统家居",
      },
    },
    {
      path: "/technique",
      name: "process-system",
      component: ProcessSystemView,
      meta: {
        headerOverlay: true,
        title: "工艺系统-南洋迪克全案系统家居",
      },
    },
    {
      path: "/Zhijia",
      name: "intelligent-system",
      component: IntelligentSystemView,
      meta: {
        headerOverlay: true,
        title: "智家系统-南洋迪克全案系统家居",
      },
    },
    {
      path: "/home_decoration_p5",
      name: "finished-system",
      component: FinishedSystemView,
      meta: {
        headerOverlay: true,
        title: "POSEENA-南洋迪克全案系统家居",
      },
    },
    {
      path: "/material",
      name: "material-system",
      component: MaterialSystemView,
      meta: {
        headerOverlay: true,
        title: "材料系统-南洋迪克全案系统家居",
      },
    },
    {
      path: "/FixedInstallation_1",
      name: "integrated-system",
      component: IntegratedSystemView,
      meta: {
        headerOverlay: true,
        title: "整装系统-南洋迪克全案系统家居",
      },
    },
    {
      path: "/SaveWorry",
      name: "service-system",
      component: ServiceSystemView,
      meta: {
        headerOverlay: true,
        title: "服务系统-南洋迪克全案系统家居",
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
      : "南洋迪克全案系统家居";
});

export default router;
