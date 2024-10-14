import { defineStore } from "pinia";
import { getUtc } from "@/utils";

export type vLanguage = "cn" | "en";

const language = (): vLanguage => "cn";

export const useAppStore = defineStore("app", {
  state() {
    return {
      title: "My Backend Admin Vue",
      i18n: language(),
      utc: getUtc()
    };
  },
  actions: {
    setEN() {
      this.i18n = "en";
    },
    resetLanguage() {
      this.i18n = "cn";
    },
    setUtc(utc?: number) {
      this.utc = utc ? Math.floor(utc) : getUtc();
    },
    setTitle(title: string) {
      this.title = title;
    }
  }
});
