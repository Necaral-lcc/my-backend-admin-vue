import type { RouteRecordRaw } from "vue-router";

export const homeRouter: RouteRecordRaw = {
  path: "/",
  name: "home",
  meta: {
    needLogin: true,
    title: "首页"
  },
  children: []
};

export const publicRoutes: RouteRecordRaw[] = [
  homeRouter,
  {
    path: "/login",
    name: "login",
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
  }
];
