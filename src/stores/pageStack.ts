import { ref } from "vue";
import { defineStore } from "pinia";
import { useRouter, useRoute } from "vue-router";

const TRANSITION_DURATION = 500;

type Page = {
  name: string;
};

let uuid = 0;

export const usePageStackStore = defineStore("pageStack", () => {
  const router = useRouter();
  const route = useRoute();
  const stack = ref<Page[]>([]);

  const push = (page: Page) => {
    uuid++;

    stack.value.push(page);
    router.replace({
      query: {
        ...route.query,
        uuid: uuid.toString(),
      },
    });
  };

  const pop = (count: number = 1) => {
    stack.value = stack.value.slice(0, stack.value.length - count);
  };

  const replace = (page: Page) => {
    pop();
    setTimeout(() => {
      push(page);
    }, TRANSITION_DURATION);
  };

  const popTo = (index: number) => {
    if (index >= stack.value.length) {
      return;
    }
    const count = stack.value.length - index;
    router.go(-count);
  };

  return {
    stack,
    push,
    pop,
    popTo,
    replace,
  };
});
