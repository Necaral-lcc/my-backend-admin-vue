<template>
  <div class="menu">
    <div class="logo" title="返回首页" @click="jumpUrl('/')">
      {{ name }}
    </div>
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="fold"
      :default-active="menuActive"
      @open="handleOpen"
      @close="handleClose"
    >
      <template v-for="item in routes">
        <el-sub-menu
          v-if="item.type === 'folder'"
          :key="item.id"
          :index="item.name"
          :title="item.title"
        >
          <template #title>
            <el-icon><location /></el-icon>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item
            v-for="child in item.children"
            :key="child.name"
            :index="child.name"
            @click="toPage(child.name)"
          >
            <el-icon><document /></el-icon>
            <span>{{ child.title }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :key="item.name" :index="item.name">{{
          item.title
        }}</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts" name="Menu">
import { computed, onBeforeMount, ref } from "vue";
import { ElMenu, ElMenuItem, ElSubMenu, ElIcon } from "element-plus";
import { Location, Document } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();

const name = ref(import.meta.env.VITE_APP_TITLE);
const router = useRouter();
const route = useRoute();
const routes = computed<vRoute[]>(() => list as vRoute[]);
const menuActive = computed(() => {
  if (typeof route.name === "string" && route.name) {
    return route.name;
  } else {
    return "";
  }
});

const { list, fold } = defineProps({
  list: {
    default: (): vRoute[] => [],
    type: Array
  },
  fold: {
    default: () => false,
    type: Boolean
  }
});

const $emit = defineEmits(["jump"]);

onBeforeMount(() => {});

const handleOpen = (key: string) => {
  console.log(key);
};

const handleClose = () => {};

const jumpUrl = (url: string) => {
  router.push(url);
  $emit("jump");
};

const toPage = (name: string) => {
  // router.push({ name });
  const routerExits = router.getRoutes();
  const tarRouter = routerExits.find(item => item.name === name);
  if (tarRouter) {
    userStore.addCacheView(tarRouter);
    router.push(tarRouter.path);
  }
  $emit("jump");
};
</script>

<style lang="scss" scoped>
.menu {
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    font-size: var(--custom-font-size-title);
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
