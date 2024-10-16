import { reactive } from "vue";
import type { ThemeConfig } from "@/style/config";
import { toCssNameCase } from "@/utils";

export const useThemes = (
  options: ThemeConfig,
  extra?: Record<string, string | number>
) => {
  const currentTheme = reactive({
    ...options
  });

  return (theme: keyof ThemeConfig = "light", prefix = "--custom-") => {
    const themeSelected = currentTheme[theme];
    Object.entries({ ...themeSelected, ...extra }).forEach(([key, value]) => {
      document.documentElement.style.setProperty(
        `${prefix}${toCssNameCase(key)}`,
        value
      );
    });
  };
};
