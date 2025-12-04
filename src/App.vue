<script setup lang="ts">
import type { RouteLocationNormalized } from "vue-router";
import { useRouter, RouterView } from "vue-router";
import { usePageStackStore } from "@/stores/pageStack";

const router = useRouter();
const store = usePageStackStore();

let historyPosition = window.history.state?.position;

router.beforeEach((to, from, next) => {
  next();
});

router.afterEach((to, from) => {
  setStackAfterEach(to, from);
});

const setStackAfterEach = (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const currentHistoryPosition = window.history.state?.position;
  const currentComponent = to.params.component as string;
  const previousComponent = from.params.component as string;

  if (
    currentHistoryPosition === historyPosition &&
    currentComponent &&
    currentComponent !== previousComponent
  ) {
    store.replace({
      name: currentComponent,
    });
  } else if (currentHistoryPosition === historyPosition - 1) {
    store.pop();
  } else if (currentHistoryPosition < historyPosition) {
    store.pop(historyPosition - currentHistoryPosition);
  } else if (currentHistoryPosition > historyPosition && currentComponent) {
    store.push({
      name: currentComponent,
    });
  }

  historyPosition = currentHistoryPosition;
};
</script>

<template>
  <div class="flex flex-col w-screen h-screen">
    <RouterView />
  </div>
</template>

<style scoped></style>
