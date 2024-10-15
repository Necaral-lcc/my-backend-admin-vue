import { type I18n, createI18n } from "vue-i18n";

// element-plus国际化
import enLocale from "element-plus/es/locale/lang/en";
import zhLocale from "element-plus/es/locale/lang/zh-cn";

import zhCN from "../../local_lang/zh.json";
import en from "../../local_lang/en.json";

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
  locale: "en",
  messages: i18nMessage()
});
