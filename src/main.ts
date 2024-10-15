import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { store } from "@/store";
import { init } from "@/init";

import "./style/reset.scss";
// 导入公共样式
import "./style/index.scss";

import "element-plus/dist/index.css";
// 导入字体图标
import "./assets/iconfont/iconfont.js";
import "./assets/iconfont/iconfont.css";

const app = createApp(App);
app.use(init).use(store).mount("#app");
