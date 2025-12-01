import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePageStackStore = defineStore('pageStack', () => {
  const stack = ref<string[]>([])

  const push = () => {}

  const pop = () => {}

  const popTo = () => {}

  const replace = () => {}

  const reset = () => {}

  return {
    stack,
  }
})
