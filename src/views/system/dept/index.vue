<template>
  <div>
    <el-input v-model="name" placeholder="请输入用户名" />
    <el-button>submit</el-button>
  </div>
</template>

<script setup lang="ts" name="systemDept">
import { ElButton, ElInput } from "element-plus";
import { ref } from "vue";
defineOptions({
  name: "systemDept"
});
const name = ref("");
</script>
