import { ElButton, ElIcon } from "element-plus";
import type { App } from "vue";

const components = [ElButton, ElIcon];

export const elementPlus_init = (app: App) => {
  components.forEach(component => {
    app.use(component);
  });
};
