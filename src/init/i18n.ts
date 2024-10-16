import { type I18n, createI18n } from "vue-i18n";

// element-plus国际化
import enLocale from "element-plus/es/locale/lang/en";
import zhLocale from "element-plus/es/locale/lang/zh-cn";

import zhCN from "../../local_lang/zh.json";
import en from "../../local_lang/en.json";
import type { App } from "vue";

const i18nMessage = () => {
  return {
    en: {
      ...en,
      ...enLocale
    },
    zh: {
      ...zhCN,
      ...zhLocale
    }
  };
};

export const i18n_init: I18n = createI18n({
  locale: "zh",
  messages: i18nMessage()
});

/** 此函数只是配合i18n Ally插件来进行国际化智能提示，并无实际意义（只对提示起作用），如果不需要国际化可删除 */
export const $t = (key: string) => key;

export const useI18n = (app: App) => {
  app.use(i18n_init);
};
