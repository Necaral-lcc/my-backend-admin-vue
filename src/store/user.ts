import { defineStore } from "pinia";
import { getUserInfo } from "@/api";
import { convertRouters } from "@/utils/route";
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from "vue-router";
import { removeToken } from "@/utils/auth";
import router from "@/router";
import { homeRouter, homeRouterName } from "@/router/public";

const userInfo_default: vUserInfo = {
  id: 0,
  name: "",
  email: "",
  nickname: "",
  deptId: null
};

const routers_default: vRoute[] = [];

const permission_default: string[] = [];

const viewArr: RouteLocationNormalizedLoaded[] = [];

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
      // 重置首页路由
      router.removeRoute(homeRouterName);
      router.addRoute(homeRouter);
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
    hasPermission(permission: string[]) {
      if (this.permission.includes("*:*:*")) {
        return true;
      }
      return this.permission.some(item => permission.includes(item));
    },
    reset() {
      this.userInfo = userInfo_default;
      this.jwt = "";
      this.routers = routers_default;
      this.permission = permission_default;
    },
    addCacheView(view: RouteLocationNormalizedLoaded) {
      const index = this.cacheViews.findIndex(item => item.name === view.name);
      if (index >= 0) {
        return;
      }
      this.cacheViews.push(view);
    },
    removeCacheView(view: RouteLocationNormalizedLoaded) {
      this.cacheViews = this.cacheViews.filter(item => item.name !== view.name);
    },
    clearCacheViews() {
      this.cacheViews = [];
    },
    async getUser(): Promise<RouteRecordRaw[]> {
      const result = await getUserInfo<vUserInfoResponse>();
      if (result.code === 200) {
        const routes = result.data.routes;
        this.routers = routes;
        this.permission = result.data.permission;
        return convertRouters(routes);
      } else {
        return [];
      }
    }
  }
});
