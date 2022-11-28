<template>
    <CenterContainer>
        <PopupContainer>
            <h2 class="text-2xl mb-4">404 Not Found</h2>
            <NormalButton @click="router.back()">返回上级</NormalButton>
            <NormalButton @click="router.push('/')">返回主页</NormalButton>
        </PopupContainer>
    </CenterContainer>
</template>

<script setup lang="ts">
import NormalButton from '@/components/Button/NormalButton.vue';
import PopupContainer from '@/components/Layout/PopupContainer.vue';
import router from '@/router';
import CenterContainer from '@/components/Layout/CenterContainer.vue';

</script>