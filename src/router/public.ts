import type { RouteRecordRaw } from "vue-router";

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      needLogin: false,
      title: "登录"
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/index.vue"),
    meta: {
      needLogin: false,
      title: "404"
    }
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    redirect: "/404"
  }
];
