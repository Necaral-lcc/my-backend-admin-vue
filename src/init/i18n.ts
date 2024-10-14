import { type I18n, createI18n } from "vue-i18n";

const i18n: I18n = createI18n({
  locale: "en",
  messages: {
    en: {
      message: {
        hello: "Hello World"
      }
    },
    zh: {
      message: {
        hello: "你好，世界"
      }
    }
  }
});

export default i18n;
