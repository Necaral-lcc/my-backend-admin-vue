import { ElButton } from "element-plus";
import type { App } from "vue";

const components = [ElButton];

export const elementPlus_init = (app: App) => {
  components.forEach(component => {
    app.use(component);
  });
};
