<template>
  <div>
    <div>login</div>
    <el-button type="primary" @click="submit">login</el-button>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from "element-plus";
import { login } from "@/api";
import { setToken } from "@/utils/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const submit = async () => {
  const res = await login(2);
  if (res) {
    setToken("adsasdasd");
    router.push("/");
  }
};
</script>
