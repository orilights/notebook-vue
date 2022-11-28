<template>
  <div class="relative w-[100vw] h-[100vh]">
    <div v-if="networkLoading"
      class="absolute w-full h-full flex items-center justify-center z-40 bg-white bg-opacity-80 select-none back">
      <img class="w-20 h-20" src="./assets/loading_black.svg">
    </div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { useStore } from '@/stores';

const store = useStore()

const { networkLoading } = toRefs(store)

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