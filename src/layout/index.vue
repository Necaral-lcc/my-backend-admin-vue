<template>
  <div class="layout">
    <div v-if="isNavShow" class="nav">
      <div class="logo">logo</div>
      <div class="menu">
        <Menu :list="userStore.routers" :fold="isNavFold" />
      </div>
    </div>
    <div class="header">
      <div class="header-navigation">
        <Navigation />
      </div>
      <div class="header-cache">
        <Cache />
      </div>
    </div>
    <div class="content">
      <router-view v-slot="{ Component, route }">
        <transition name="slide-fade">
          <KeepAlive :include="userStore.cacheViews">
            <component :is="Component" :key="route.fullPath" />
          </KeepAlive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/user";
import Menu from "./modules/menu.vue";
import Navigation from "./modules/navigation.vue";
import Cache from "./modules/cache.vue";
import { ref } from "vue";

const userStore = useUserStore();
const isNavFold = ref(false);
const isNavShow = ref(false);
</script>

<style scoped lang="scss">
$header-height: 50px;

.layout {
  position: relative;
  display: grid;
  grid-template: "nav header header" auto "nav content content" 1fr "nav content content" 1fr / auto 1fr 1fr;
  width: 100%;
  height: 100%;

  > div {
    transition: all 0.3s ease-in-out;
  }

  .nav {
    grid-area: nav;
    width: 160px;
    height: 100%;
    overflow: hidden;
    background-color: var(--custom-primary-color);

    .logo {
      height: $header-height;
    }
  }

  .header {
    grid-area: header;
    height: $header-height;
    overflow: hidden;
    background-color: var(--custom-background-color);
  }

  .content {
    position: relative;
    grid-area: content;
    overflow: hidden;
    background-color: var(--custom-content-background-color);
  }
}
</style>
