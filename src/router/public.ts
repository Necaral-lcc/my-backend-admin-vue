import type { RouteRecordRaw } from "vue-router";

export const homeRouter: RouteRecordRaw = {
  path: "/",
  name: "main",
  meta: {
    needLogin: true,
    title: ""
  },
  children: [
    {
      path: "",
      name: "home",
      component: () => import("@/layout/index.vue"),
      meta: {
        title: "",
        needLogin: true,
        KeepAlive: false
      },
      children: [
        {
          path: "",
          name: "homeIndex",
          component: () => import("@/views/home/index.vue"),
          meta: {
            title: "首页",
            needLogin: true,
            KeepAlive: false
          }
        }
      ]
    }
  ]
};

export const publicRoutes: RouteRecordRaw[] = [
  homeRouter,
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      needLogin: false,
      title: "登录",
      KeepAlive: false
    }
  },

  {
    path: "/404",
    name: "404",
    component: () => import("@/views/error/index.vue"),
    meta: {
      needLogin: false,
      title: "404",
      KeepAlive: false
    }
  }
];
