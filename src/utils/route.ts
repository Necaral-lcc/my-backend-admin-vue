import type { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";
import { defineAsyncComponent } from "vue";

type vParams = Parameters<typeof defineAsyncComponent>[0];

const modules = import.meta.glob("../views/**/*.vue");

export const convertRoutes = (routes: vRoute[]): RouteRecordRaw[] =>
  routes.reduce((rArr: RouteRecordRaw[], route) => {
    const r: RouteRecordRaw = {
      path: route.path,
      name: route.name,
      component: undefined,
      meta: {
        title: route.title,
        keepAlive: route.keepAlive,
        needLogin: route.needLogin
      },
      children: []
    };
    if (route.type === "folder") {
      r.component = Layout;
      r.children = convertRoutes(route.children || []);
    } else if (route.type === "page") {
      r.component = defineAsyncComponent(
        modules[`../views/${route.component}/index.vue`] as vParams
      );
    } else if (route.type === "iframe") {
      r.component = defineAsyncComponent(
        modules["../views/webview/index.vue"] as vParams
      );
    } else {
      return rArr;
    }
    return [...rArr, r];
  }, []);

export const addToHomeRouter = (
  router: RouteRecordRaw,
  routes: RouteRecordRaw[]
) => ({
  ...router,
  children: [...(router.children || []), ...routes]
});
