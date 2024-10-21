import { defineStore } from "pinia";
import { getRoute } from "@/api";
import { convertRouters } from "@/utils/route";
import { privateRoutesRes } from "@/router/list";
import type { RouteRecordRaw } from "vue-router";

const userInfo_default: vUserInfo = {
  id: 0,
  name: "",
  email: "",
  phone: "",
  avatar: "",
  role: "",
  permissions: [],
  routers: []
};

const routers_default: vRoute[] = [];

const permission_default: string[] = [];

const strArr: string[] = [];

export const useUserStore = defineStore("user", {
  state() {
    return {
      userInfo: userInfo_default,
      jwt: "",
      routers: routers_default,
      permission: permission_default,
      isLogin: false,
      cacheViews: strArr
    };
  },
  getters: {
    getLoginState(state) {
      return state.isLogin;
    }
  },
  actions: {
    setUserInfo(userInfo: vUserInfo) {
      this.userInfo = userInfo;
    },
    login() {
      this.isLogin = true;
    },
    logout() {
      this.isLogin = false;
    },
    setJwt(jwt: string) {
      this.jwt = jwt;
    },
    setRouter(routers: vRoute[]) {
      this.routers = routers;
    },
    setPermission(permission: vUserPermission[]) {
      this.permission = permission;
    },
    reset() {
      this.userInfo = userInfo_default;
      this.jwt = "";
      this.routers = routers_default;
      this.permission = permission_default;
    },
    addCacheView(view: string) {
      if (this.cacheViews.includes(view)) {
        return;
      }
      this.cacheViews.push(view);
    },
    removeCacheView(view: string) {
      this.cacheViews = this.cacheViews.filter(item => item !== view);
    },
    clearCacheViews() {
      this.cacheViews = [];
    },
    async getRoutes(): Promise<RouteRecordRaw[]> {
      const result = await getRoute(300);
      if (result) {
        this.routers = privateRoutesRes;
        return convertRouters(privateRoutesRes);
      } else {
        return [];
      }
    }
  }
});
