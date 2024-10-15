<script setup lang="ts">
import { reactive, defineCustomElement, ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import { ElSlider } from "element-plus";

const num = 1;

console.log(num + 1);

const { color, size } = reactive({
  color: "red",
  size: 24
});

const fontSize = ref(24);

defineCustomElement(HelloWorld);
</script>

<template>
  <div>
    <HelloWorld msg="Vite + Vue" />
    <div class="title">home :123123</div>
    <el-slider v-model="fontSize" />
  </div>
</template>

<style scoped>
.logo {
  font-size: 20px;
}
</style>

<style></style>
