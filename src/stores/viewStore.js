import { ref } from 'vue'
import { defineStore } from 'pinia'

const useViewStore = defineStore('Views', () => {
  const showFooter = ref(true)
  
  return { showFooter }
})

export default useViewStore
