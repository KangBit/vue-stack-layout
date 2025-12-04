<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { useRouter } from "vue-router";

import BaseStacks from "@/components/BaseStacks.vue";
import { usePageStackStore } from "@/stores/pageStack";

const PageAA = defineAsyncComponent(() => import("@/pages/pageAA.vue"));
const PageAB = defineAsyncComponent(() => import("@/pages/pageAB.vue"));

const router = useRouter();
const store = usePageStackStore();

const routeToAA = () => {
  router.push("/page-a/pageAA");
};

const routeToAB = () => {
  router.push("/page-a/pageAB");
};

const reset = () => {
  store.popTo(0);
};
</script>

<template>
  <div class="flex w-screen h-screen items-center justify-center">pageA</div>
  <BaseStacks :components="{ pageAA: PageAA, pageAB: PageAB }" />

  <div class="absolute bottom-10 right-10 w-20 flex flex-col gap-2">
    <button @click="routeToAA" class="w-full h-10 bg-blue-500 rounded-md border-2 border-white">
      AA
    </button>
    <button @click="routeToAB" class="w-full h-10 bg-blue-500 rounded-md border-2 border-white">
      AB
    </button>
    <button @click="reset" class="w-full h-10 bg-blue-500 rounded-md border-2 border-white">
      RESET
    </button>
  </div>
</template>

<style scoped></style>
