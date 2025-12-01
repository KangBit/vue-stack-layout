<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex flex-col w-screen h-screen">
    <div class="flex gap-4 items-center justify-center w-full h-20 z-10 border-b border-gray-200">
      <button class="cursor-pointer" @click="$router.push('/page-a')">Page A</button>
      <button class="cursor-pointer" @click="$router.push('/page-b')">Page B</button>
    </div>
    <div class="flex-1 flex items-center justify-center">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
