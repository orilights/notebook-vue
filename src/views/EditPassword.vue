<template>
    <CenterContainer>
    <PopupContainer>
        <div class="my-4">
            <span>旧密码：</span>
            <TextEditbox type="password" v-model="oldPwd" place-holder="请输入旧密码" />
        </div>
        <div class="my-4">
            <span>新密码：</span>
            <TextEditbox type="password" v-model="newPwd" place-holder="请输入新密码" />
        </div>
        <div class="my-4">
            <span>重复新密码：</span>
            <TextEditbox type="password" v-model="repNewPwd" place-holder="请重复输入新密码" />
        </div>
        <NormalButton @click="userChangePassword">修改</NormalButton>
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
import { UserChangePassword } from '@/api/user';
import router from '@/router';
import PopupContainer from '@/components/Layout/PopupContainer.vue';
import NormalButton from '@/components/Button/NormalButton.vue';
import TextEditbox from '@/components/TextEditbox.vue';
import CenterContainer from '@/components/Layout/CenterContainer.vue';

const store = useStore()
const toast = useToast()

const oldPwd = ref('')
const newPwd = ref('')
const repNewPwd = ref('')

async function userChangePassword() {
    if (newPwd.value != repNewPwd.value || newPwd.value == '') {
        toast.warning('两次输入密码不同或密码为空，请检查输入')
        return 0
    }
    store.networkLoading = true
    const result = await UserChangePassword(store.userId, oldPwd.value, newPwd.value)
    if (result.code == 0) {
        toast.success(result.msg)
        router.push('/home')
    } else if (result.code = 3) {
        toast.error(result.msg)
    }
    store.networkLoading = false
}
</script>