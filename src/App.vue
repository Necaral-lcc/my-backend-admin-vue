<script setup lang="ts">
import { reactive, onMounted, watch } from "vue";

import { useThemes } from "@/init/color";
import { themes } from "@/style/config";
import { useAppStore } from "@/store/app";
import { useUserStore } from "./store/user";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const appStore = useAppStore();

const userStore = useUserStore();

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
  <router-view v-slot="{ Component, route }">
    <transition name="slide-fade">
      <KeepAlive :include="userStore.cacheViews">
        <component :is="Component" :key="route.fullPath" />
      </KeepAlive>
    </transition>
  </router-view>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
