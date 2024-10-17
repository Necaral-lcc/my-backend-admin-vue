import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { store } from "@/store";
import { init } from "@/init";
import router from "@/router";

import "./style/reset.scss";
// 导入公共样式
import "./style/index.scss";

import "element-plus/dist/index.css";
// 导入字体图标
import "./assets/iconfont/iconfont.js";
import "./assets/iconfont/iconfont.css";

import "element-plus/theme-chalk/display.css";

const app = createApp(App);
app.use(router);

router
  .isReady()
  .then(res => {
    console.log("路由准备就绪", res);
  })
  .catch(err => {
    console.log("路由未准备就绪", err);
  });

app.use(init).use(store).mount("#app");
