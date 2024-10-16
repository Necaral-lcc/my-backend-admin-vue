import { createRouter, createWebHistory } from "vue-router";
import { publicRoutes } from "./public";

const router = createRouter({
  history: createWebHistory(),
  routes: publicRoutes
});

router.beforeEach((to, from, next) => {
  console.log("beforeEach", to, from);

  if (!to.name) {
    next("/404");
    return;
  }
  if (to.meta.needLogin) {
    // check if user is authenticated
    // if not, redirect to login page
    next("/login");
  } else {
    next();
  }
});

router.afterEach((to, from, failure) => {
  if (failure) {
    console.log("failure", to, from, failure);
  }
});

export default router;
