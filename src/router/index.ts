import { createRouter, createWebHistory } from "vue-router";
import { publicRoutes, homeRouter, homeRouterName } from "./public";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { isLogin, removeToken } from "@/utils/auth";
import { useUserStore } from "@/store/user";
import { addToHomeRouter } from "@/utils/route";

const router = createRouter({
  history: createWebHistory(),
  routes: publicRoutes,
  strict: true
});

router.beforeEach(async (to, _from) => {
  NProgress.start();
  const userStore = useUserStore();

  if (to.meta.title && typeof to.meta.title === "string") {
    document.title = to.meta.title as string;
  }

  console.log("router", userStore.getLoginState, isLogin());

  if (userStore.getLoginState) {
    if (to.name === "login") {
      NProgress.done();
      return { path: "/" };
    }

    if (!to.name) {
      NProgress.done();
      return { path: "/404" };
    }

    NProgress.done();
  } else if (isLogin()) {
    if (!to.name) {
      NProgress.done();
      return { name: "404" };
    }

    const result = await userStore.getUser();
    if (Array.isArray(result) && result.length > 0) {
      userStore.login();
      router.removeRoute(homeRouterName);
      router.addRoute(addToHomeRouter(homeRouter, result));

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
  } else {
    if (to.name === "login") {
      NProgress.done();
      return;
    }

    if (to.meta.needLogin) {
      NProgress.done();
      return { name: "login" };
    }

    NProgress.done();
    return;
  }

  NProgress.done();
});

router.afterEach((to, from, failure) => {
  if (failure) {
    console.log("failure", to, from, failure);
  }
});

export default router;
