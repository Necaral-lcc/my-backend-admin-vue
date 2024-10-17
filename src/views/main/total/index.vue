<template>
  <div>
    <h1>Welcome to my-backend-admin-vue</h1>
    <el-button type="primary" @click="toDashboard">Dash</el-button>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

const toDashboard = () => {
  router.push({
    path: "/dash"
  });
};
</script>
