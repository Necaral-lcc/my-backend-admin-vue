<template>
  <div class="layout">
    <div v-if="menuStatus" class="nav">
      <Menu :list="userStore.routers" :fold="appStore.level == 2" />
    </div>
    <div v-else>
      <el-drawer
        v-model="drawer"
        direction="ltr"
        :with-header="false"
        :before-close="handleMenuClose"
        :append-to-body="true"
        class="menu-drawer"
      >
        <Menu :list="userStore.routers" @jump="jumpPage" />
      </el-drawer>
    </div>
    <div class="header">
      <Navigation
        :menuStatus="menuStatus"
        :menuShow="drawer"
        @toggle-menu="toggleMenu"
      />
      <Cache />
    </div>
    <div class="content">
      <router-view v-slot="{ Component, route }">
        <transition name="slide-fade">
          <KeepAlive :include="cacheViews" :max="10">
            <component :is="Component" :key="route.name" />
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
import { useAppStore } from "@/store/app";
import { ElDrawer } from "element-plus";
import { computed, ref, watch } from "vue";

const appStore = useAppStore();

const userStore = useUserStore();
const drawer = ref(false);
const menuStatus = computed<boolean>(() => {
  if (appStore.level >= 2) {
    return true;
  } else {
    return false;
  }
});
watch(
  () => menuStatus,
  val => {
    if (val) {
      drawer.value = false;
    }
  }
);

const cacheViews = computed<string[]>(() =>
  userStore.cacheViews
    .filter(item => item.meta.keepAlive)
    .map(item => {
      console.log("cacheViews", item.name);

      return item.name as string;
    })
);

const handleMenuClose = () => {
  drawer.value = false;
};
const toggleMenu = () => {
  drawer.value = !drawer.value;
};

const jumpPage = (_: string) => {
  drawer.value = false;
};
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
    overflow: hidden;
    transition: width 1s ease-in-out;
  }

  .nav {
    grid-area: nav;
    height: 100%;
    background-color: var(--custom-background-color);

    .logo {
      height: $header-height;
    }
  }

  .header {
    grid-area: header;
    background-color: var(--custom-background-color);
  }

  .content {
    position: relative;
    grid-area: content;
    background-color: var(--custom-content-background-color);
  }
}
</style>

<style>
.menu-drawer {
  width: fit-content !important;
}

.menu-drawer .el-drawer__body {
  padding: 0;
}
</style>
