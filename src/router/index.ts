import { createRouter, createWebHistory } from "vue-router";
import { publicRoutes, homeRouter } from "./public";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { isLogin, removeToken } from "@/utils/auth";
import { useUserStore } from "@/store/user";
import { addToHomeRouter } from "@/utils/route";

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
      const result = await userStore.getRoutes();
      if (Array.isArray(result) && result.length > 0) {
        userStore.login();
        router.removeRoute("home");
        console.log("result", result);

        router.addRoute(addToHomeRouter(homeRouter, result));
        const routesExist = router.getRoutes();
        const routeExists = routesExist.some(r => r.path === to.path);
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
