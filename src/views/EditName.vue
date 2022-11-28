<template>
    <CenterContainer>
        <PopupContainer>
            <div class="my-4">
                <span>新昵称：</span>
                <TextEditbox type="text" v-model="newName" place-holder="请输入新昵称" />
            </div>
            <NormalButton @click="userChangeName">修改</NormalButton>
            <RouterLink to="/home">
                <NormalButton>取消</NormalButton>
            </RouterLink>
        </PopupContainer>
    </CenterContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '@/stores';
import { useToast } from 'vue-toastification';
import { UserChangeName } from '@/api/user';
import router from '@/router';
import Cookies from 'js-cookie';
import TextEditbox from '@/components/TextEditbox.vue';
import PopupContainer from '@/components/Layout/PopupContainer.vue';
import NormalButton from '@/components/Button/NormalButton.vue';
import CenterContainer from '@/components/Layout/CenterContainer.vue';

const store = useStore()
const toast = useToast()

const newName = ref('')

newName.value = store.userName

async function userChangeName() {
    if (newName.value == '') {
        toast.warning('新昵称不可为空')
        return 0
    }
    store.networkLoading = true
    const result = await UserChangeName(store.userId, newName.value)
    if (result.code == 0) {
        toast.success(result.msg)
        store.userName = newName.value
        Cookies.set('username', newName.value)
        router.push('/home')
    } else if (result.code = 3) {
        toast.error(result.msg)
    }
    store.networkLoading = false
}
</script>
