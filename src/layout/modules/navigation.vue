<template>
  <div>
    <div>
      <el-button
        v-if="!menuStatus"
        type="primary"
        :icon="menuShow ? CaretRight : CaretLeft"
        @click="toggleMenu"
        >{{ menuShow ? "收起菜单" : "展开菜单" }}</el-button
      >
    </div>
    <div>navigation</div>
  </div>
</template>

<script setup lang="ts">
import { CaretLeft, CaretRight } from "@element-plus/icons-vue";

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

const emit = defineEmits(["toggleMenu"]);

const toggleMenu = () => {
  emit("toggleMenu");
};
</script>
