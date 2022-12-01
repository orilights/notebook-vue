<template>
  <div class="relative w-[100vw] h-[100vh]" :class="isDarkMode ? 'dark' : ''">
    <div v-if="networkLoading"
      class="absolute w-full h-full flex items-center justify-center z-40 bg-white/40 dark:bg-black/40 select-none back">
      <img class="w-20 h-20" :src="isDarkMode ? '/assets/loading_white.svg' : '/assets/loading_black.svg'">
    </div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onMounted, toRefs, watch } from 'vue';
import { useStore } from '@/stores';

const store = useStore()

const { networkLoading, isDarkMode } = toRefs(store)

watch(isDarkMode, () => {
  localStorage.setItem('darkMode', String(isDarkMode.value))
})

onMounted(() => {
  if ((localStorage.getItem('darkMode') || 'false') == 'true') {
    isDarkMode.value = true
  }
})

</script>


<style>
body {
  background-image: url(https://api.amarea.cn/wallpaper/bing/);
}

#app {
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(8px);
}
</style>