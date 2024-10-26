import { defineStore } from "pinia";
import { getRoute } from "@/api";
import { convertRouters } from "@/utils/route";
import { privateRoutesRes } from "@/router/list";
import type { RouteRecordNormalized, RouteRecordRaw } from "vue-router";
import { removeToken } from "@/utils/auth";

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

const viewArr: RouteRecordNormalized[] = [];

export const useUserStore = defineStore("user", {
  state() {
    return {
      userInfo: userInfo_default,
      jwt: "",
      routers: routers_default,
      permission: permission_default,
      isLogin: false,
      cacheViews: viewArr
    };
  },
  getters: {
    getLoginState(state) {
      return state.isLogin;
    },
    getCacheViews(state) {
      return state.cacheViews;
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
      this.userInfo = userInfo_default;
      this.jwt = "";
      this.routers = routers_default;
      this.permission = permission_default;
      removeToken();
      this.clearCacheViews();
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
    addCacheView(view: RouteRecordNormalized) {
      const index = this.cacheViews.findIndex(item => item.name === view.name);
      if (index >= 0) {
        return;
      }
      this.cacheViews.push(view);
      console.log("add cache view", view.name, this.cacheViews);
    },
    removeCacheView(view: RouteRecordNormalized) {
      this.cacheViews = this.cacheViews.filter(item => item.name !== view.name);
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
