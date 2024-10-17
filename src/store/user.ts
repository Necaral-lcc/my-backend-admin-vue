import { defineStore } from "pinia";

const userInfo_default: vUserInfo = {
  id: 0,
  name: "",
  email: "",
  phone: "",
  avatar: "",
  roles: "",
  permissions: [],
  router: []
};

const router_default: vUserRouter[] = [];

const permission_default: string[] = [];

const strArr: string[] = [];

export const useUserStore = defineStore("user", {
  state() {
    return {
      userInfo: userInfo_default,
      jwt: "",
      router: router_default,
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
    setRouter(router: vUserRouter[]) {
      this.router = router;
    },
    setPermission(permission: vUserPermission[]) {
      this.permission = permission;
    },
    reset() {
      this.userInfo = userInfo_default;
      this.jwt = "";
      this.router = router_default;
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
    }
  }
});
