<template>
  <div>
    <div>header</div>
    <router-view v-slot="{ Component, route }">
      <transition name="slide-fade">
        <KeepAlive :include="userStore.cacheViews">
          <component :is="Component" :key="route.fullPath" />
        </KeepAlive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
</script>
