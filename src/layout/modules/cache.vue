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
import { RouteRecordNormalized, useRoute, useRouter } from "vue-router";

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

watch(
  () => userStore.cacheViews,
  val => {
    console.log("cache views changed", val);
  }
);

const toPage = (r: RouteRecordNormalized) => {
  router.push({ name: r.name });
};

const closePage = (r: RouteRecordNormalized) => {
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
  r: RouteRecordNormalized,
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
  scroll-snap-type: y mandatory;
  overflow-y: auto;
  height: 32px;

  .el-tag {
    cursor: pointer;
    margin-left: 8px;
  }
}
</style>
