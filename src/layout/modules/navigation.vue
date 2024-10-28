<template>
  <div class="navigation">
    <div>
      <el-button
        v-if="!menuStatus"
        type="primary"
        :icon="menuShow ? CaretRight : CaretLeft"
        @click="toggleMenus"
        >{{ menuShow ? "收起菜单" : "展开菜单" }}</el-button
      >
      <el-breadcrumb class="breadcrumb">
        <el-breadcrumb-item
          v-for="item in matched.filter(item => item.meta.title)"
          :key="item.name"
          >{{ item.meta.title }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div>
      <el-button text @click="logout">退出登录</el-button>
      <el-switch
        v-model="appStore.i18n"
        active-value="zh"
        inactive-value="en"
        active-text="中"
        inactive-text="英"
        inline-prompt
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CaretLeft, CaretRight } from "@element-plus/icons-vue";
import {
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElSwitch,
  ElButton
} from "element-plus";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAppStore } from "@/store/app";
import { useUserStore } from "@/store/user";

const route = useRoute();
const router = useRouter();

const appStore = useAppStore();
const userStore = useUserStore();

defineProps({
  menuStatus: {
    default: () => true,
    type: Boolean
  },
  menuShow: {
    default: () => false,
    type: Boolean
  }
});

const matched = computed(() => route.matched);

const emit = defineEmits(["toggleMenu"]);

const toggleMenus = () => {
  emit("toggleMenu");
};

const logout = () => {
  userStore.logout();
  router.replace("/login");
};
</script>

<style lang="scss" scoped>
.navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 10px;
  border-bottom: 1px solid var(--custom-border-color);

  > div {
    display: flex;
    align-items: center;
    height: 100%;
  }

  &:first-child {
    .el-button {
      margin-right: 10px;
    }

    .breadcrumb {
      margin-right: 10px;
    }
  }
}
</style>
