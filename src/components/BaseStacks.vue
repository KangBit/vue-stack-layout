<script setup lang="ts">
import type { Component } from "vue";
import { usePageStackStore } from "@/stores/pageStack";

const store = usePageStackStore();

defineProps<{
  components: Record<string, Component>;
}>();
</script>

<template>
  <div class="fixed w-screen h-screen top-0 left-0">
    <TransitionGroup tag="div" class="relative" appear>
      <component
        v-for="page in store.stack"
        :key="page.name"
        :is="components[page.name as keyof typeof components]"
        class="absolute top-0 left-0 w-screen h-screen"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: transform 0.5s ease;
  position: absolute;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(100%);
}
</style>
