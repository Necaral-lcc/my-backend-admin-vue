import type { App } from "vue";
import { i18n_init } from "./i18n";

export function init(app: App) {
  app.use(i18n_init);
}
