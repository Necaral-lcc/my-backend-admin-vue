<template>
  <iframe v-if="src" :src="src" frameborder="0" allowfullscreen />
  <div v-else>请输入正确路径</div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const src = ref("");

onBeforeMount(() => {
  const url = route.query.url as string;
  src.value = url ? decodeURIComponent(url) : "";
});
</script>
