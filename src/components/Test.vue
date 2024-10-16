<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useUserStore } from "@/store/user";
import { useAppStore } from "@/store/app";
import { ElButton } from "element-plus";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const userStore = useUserStore();
const appStore = useAppStore();

onMounted(() => {
  setTimeout(() => {
    appStore.setTitle("Hello Lcc");
  }, 5000);
});

defineProps<{ msg: string }>();

const count = ref(0);

const addStr = () => {
  appStore.setTitle(appStore.title + "新增字符");
};
</script>

<template>
  <div>
    <h1>{{ msg }}</h1>
    <h2>{{ t("home.title") }}</h2>
    <h2>{{ t("home.description") }}</h2>
    <div class="card">
      <button type="button" @click="count++">count is {{ count }}</button>
      <p>
        Edit
        <code>components/HelloWorld.vue</code> to test HMR
      </p>
    </div>
    <el-button type="primary" @click="addStr">新增字符</el-button>

    <div class="read-the-docs">user:{{ userStore.userInfo.id }}</div>
    <div class="read-the-docs">appStore:{{ appStore.title }}</div>
  </div>
</template>

<style lang="scss" scoped>
.read-the-docs {
  color: #888;
}
</style>
