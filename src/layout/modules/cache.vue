<template>
  <div class="cache">
    <el-tag :type="route.path === '/' ? 'success' : 'info'" @click="toHome"
      >首页</el-tag
    >
    <el-tag
      v-for="item in userStore.getCacheViews"
      :key="item.name"
      :type="getTagType(item, route.name)"
      closable
      @click="toPage(item)"
      @close="closePage(item)"
      >{{ item.meta.title }}</el-tag
    >
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/user";
import { ElTag } from "element-plus";
import { watch } from "vue";
import { RouteLocationNormalizedLoaded, useRoute, useRouter } from "vue-router";

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

watch(
  () => route.fullPath,
  val => {
    if (val === "/") {
      return;
    } else {
      const r = JSON.parse(JSON.stringify(route));
      userStore.addCacheView(r);
    }
  }
);

const toPage = (r: RouteLocationNormalizedLoaded) => {
  router.push({ name: r.name });
};

const closePage = (r: RouteLocationNormalizedLoaded) => {
  userStore.removeCacheView(r);
  if (userStore.getCacheViews.length > 0) {
    router.replace({
      name: userStore.getCacheViews[userStore.getCacheViews.length - 1].name
    });
  } else {
    router.push("/");
  }
};

const toHome = () => {
  router.push("/");
};

const getTagType = (
  r: RouteLocationNormalizedLoaded,
  name?: string | symbol
): (typeof ElTag)["type"] => {
  if (r.name === name) {
    return "success";
  }
  if (r.meta.keepAlive) {
    return "primary";
  }
  return "info";
};
</script>

<style lang="scss" scoped>
.cache {
  display: flex;
  align-items: center;
  height: 32px;
  overflow-y: auto;
  scroll-snap-type: y mandatory;

  .el-tag {
    margin-left: 8px;
    cursor: pointer;
  }
}
</style>
