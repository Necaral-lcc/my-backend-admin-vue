<template>
  <div>123123 {{ fold ? "收起" : "展开" }}</div>
</template>

<script setup lang="ts" name="Menu">
import { onBeforeMount } from "vue";

defineProps({
  list: {
    default: (): vRoute[] => [],
    type: Array
  },
  fold: {
    default: () => false,
    type: Boolean
  }
});

onBeforeMount(() => {});
</script>
