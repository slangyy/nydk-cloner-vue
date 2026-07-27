import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import PlaceholderView from "@/views/PlaceholderView.vue";
import { useUiStore } from "@/stores/ui";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "placeholder",
      component: PlaceholderView,
    },
  ],
});

router.afterEach(() => {
  useUiStore().closeMobileMenu();
});

export default router;
