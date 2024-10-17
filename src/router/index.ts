import { createRouter, createWebHistory } from "vue-router";
import { publicRoutes } from "./public";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getRoute } from "@/api";
import { isLogin, removeToken } from "@/utils/auth";
import { privateRoutes } from "./list";
import { useUserStore } from "@/store/user";

const router = createRouter({
  history: createWebHistory(),
  routes: publicRoutes
});

router.beforeEach(async (to, _from) => {
  NProgress.start();
  const userStore = useUserStore();
  // console.log("beforeEach", to, _from, "isLogin:", userStore.getLoginState);
  if (to.meta.title && typeof to.meta.title === "string") {
    document.title = to.meta.title as string;
  }
  if (isLogin()) {
    if (userStore.getLoginState) {
      if (to.name === "login") {
        NProgress.done();
        return {
          path: "/"
        };
      }
      if (!to.name) {
        NProgress.done();
        return {
          path: "/404"
        };
      }
      NProgress.done();
    } else {
      const result = await getRoute(200);

      if (result) {
        userStore.login();
        router.removeRoute("home");
        router.addRoute(privateRoutes);
        const routeExists = router.getRoutes().some(r => r.path === to.path);

        NProgress.done();
        return {
          path: routeExists ? to.fullPath : "/",
          replace: true
        };
      } else {
        removeToken();
        userStore.logout();
        NProgress.done();
        return {
          path: `/login?redirect=${encodeURIComponent(to.fullPath)}`
        };
      }
    }
  } else {
    if (!to.name) {
      NProgress.done();

      return {
        name: "404"
      };
    }
    if (to.meta.needLogin) {
      NProgress.done();

      return {
        name: "login"
      };
    }
    NProgress.done();
  }
});

router.afterEach((to, from, failure) => {
  if (failure) {
    console.log("failure", to, from, failure);
  }
});

export default router;
