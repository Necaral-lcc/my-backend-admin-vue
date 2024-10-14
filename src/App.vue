<script setup lang="ts">
import { defineCustomElement } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

const num = 1;

console.log(num + 1);

defineCustomElement(HelloWorld);
</script>

<template>
  <div>
    <HelloWorld msg="Vite + Vue" />
  </div>
</template>

<style scoped>
.logo {
  font-size: 20px;
}
</style>
