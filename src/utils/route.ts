import type { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/index.vue";
import Webview from "@/views/webview/index.vue";

const modules = import.meta.glob("../views/**/*.vue");

export const convertRouters = (rs: vRoute[]): RouteRecordRaw[] => {
  const modulesKeys = Object.keys(modules);
  function convertR(routes: vRoute[]): RouteRecordRaw[] {
    return routes.reduce((rArr: RouteRecordRaw[], route) => {
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
        r.children = convertR(route.children || []);
      } else if (route.type === "page") {
        if (typeof route.component === "string" && route.component) {
          const component = route.component;
          let index = modulesKeys.findIndex(ev => ev.includes(component));
          if (index === -1) {
            r.component = undefined;
            return rArr;
          } else {
            r.component = modules[modulesKeys[index]];
          }
        }
      } else if (route.type === "iframe") {
        r.component = Webview;
      } else {
        return rArr;
      }
      return [...rArr, r];
    }, []);
  }
  return convertR(rs);
};

export const addToHomeRouter = (
  router: RouteRecordRaw,
  routes: RouteRecordRaw[]
) => ({
  ...router,
  children: [...(router.children || []), ...routes]
});
