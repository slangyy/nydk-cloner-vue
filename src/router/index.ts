import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import PlaceholderView from "@/views/PlaceholderView.vue";
import PoseenaView from "@/views/PoseenaView.vue";
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
