import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import { UserService } from "@/services";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/",
      component: () => import("../views/LoggedLayout.vue"),
      children: [
        {
          path: "/",
          name: "home",
          meta: { requiresAuth: true },
          component: () => import("../views/HomeView.vue"),
        },
        {
          path: "/history",
          name: "history",
          meta: { requiresAuth: true },
          component: () => import("../views/HistoryView.vue"),
        },
        {
          path: "/logout",
          name: "logout",
          component: {
            async beforeRouteEnter(to, from, next) {
              await UserService.logout();
              next({ name: "login" });
            },
          },
        },
      ],
    },
  ],
});
router.beforeEach(async (to, from, next) => {
  const user = await UserService.getUser();
  if (to?.meta?.requiresAuth && user) {
    next();
  } else if (!to?.meta?.requiresAuth) {
    next();
  } else {
    next({ name: "login" });
  }
});

export default router;
