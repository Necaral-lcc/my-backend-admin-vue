import type { App } from "vue";
import { useI18n } from "./i18n";
import { elementPlus_init } from "./elementPlus";

export function init(app: App) {
  app.use(useI18n).use(elementPlus_init);
}
