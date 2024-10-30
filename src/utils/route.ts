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
      if (route.type === 0) {
        r.component = Layout;
        r.children = convertR(route.children || []);
      } else if (route.type === 1) {
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
      } else if (route.type === 2) {
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

export const listToTree = <T extends vSetList>(
  ar: T[],
  parentId: number
): Array<T & { children: T[] }> => {
  return ar
    .filter(item => item.parentId === parentId)
    .map(item => {
      const obj: T & {
        children: T[];
      } = {
        ...item,
        parentId: item.parentId || 0,
        children: listToTree(ar, item.id)
      };
      return obj;
    });
};
