<template>
  <div>
    {{ name }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const name = ref("home");
</script>
