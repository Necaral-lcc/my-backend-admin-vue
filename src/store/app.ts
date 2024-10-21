import { defineStore } from "pinia";
import { getUtc } from "@/utils";
import type { ThemeConfig } from "@/style/config";

export type vLanguage = "zh" | "en";

const language_default = (): vLanguage => "zh";

const theme_default = (): keyof ThemeConfig => "light";

export const useAppStore = defineStore("app", {
  state() {
    return {
      title: "My Backend Admin Vue",
      i18n: language_default(),
      utc: getUtc(),
      theme: theme_default(),
      level: 9
    };
  },
  actions: {
    setEN() {
      this.i18n = "en";
    },
    resetLanguage() {
      this.i18n = language_default();
    },
    setUtc(utc?: number) {
      this.utc = utc ? Math.floor(utc) : getUtc();
    },
    setTitle(title: string) {
      this.title = title;
    },
    setTheme(theme: keyof ThemeConfig) {
      this.theme = theme;
    },
    setLevel(level: number) {
      this.level = level;
    }
  }
});
