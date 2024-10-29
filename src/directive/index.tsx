import type { App } from "vue";
import permission from "./permission";
import localTime from "./local";

const setDirective = (app: App) => {
  app.directive("permission", permission).directive("localTime", localTime);
};

export default setDirective;
