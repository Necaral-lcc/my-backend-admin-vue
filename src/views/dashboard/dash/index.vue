<template>
  <div>
    <h1>Dash</h1>
    <el-button type="primary" @click="toPage('/')">home</el-button>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

const toPage = (path: string) => {
  router.push({
    path
  });
};
</script>
