<script setup lang="ts">
import { reactive, onMounted, watch } from "vue";

import { useThemes } from "@/init/color";
import { themes } from "@/style/config";
import { useAppStore } from "@/store/app";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const appStore = useAppStore();

const customStyle = reactive({
  lineColor: "red",
  commitColor: "blue",
  mainTitleFontsize: "32px"
});

const setTheme = useThemes(themes, customStyle);

onMounted(() => {
  setTheme(appStore.theme);
});

watch(
  () => appStore.i18n,
  val => {
    locale.value = val;
  }
);
watch(
  () => appStore.theme,
  val => {
    setTheme(val);
  }
);
</script>

<template>
  <router-view />
</template>

<style scoped>
.title {
  background-color: var(--custom-background-color);
  color: var(--custom-text-color);
  font-size: var(--custom-main-title-fontsize);
}
</style>
