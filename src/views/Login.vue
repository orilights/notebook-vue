<template>
    <CenterContainer>
        <PopupContainer>
            <div class="text-center font-semibold text-xl mb-6">用户登录</div>
            <div class="my-4">
                <span>账号：</span>
                <TextEditbox type="text" v-model="userId" place-holder="请输入账号" />
            </div>
            <div class="my-4">
                <span>密码：</span>
                <TextEditbox type="password" v-model="userPwd" place-holder="请输入密码" />
            </div>
            <div class="mt-6 flex justify-center">
                <NormalButton @click="userLogin">登录</NormalButton>
            </div>
            <div class="mt-4 flex justify-between">
                <RouterLink to="/register">
                    <a>前往注册</a>
                </RouterLink>
                <RouterLink to="/login/forgetpassword">
                    <a>忘记密码</a>
                </RouterLink>
            </div>
        </PopupContainer>
    </CenterContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';
import { useStore } from '@/stores';
import { useToast } from 'vue-toastification';
import Cookies from 'js-cookie';
import { UserLogin } from '@/api/user';
import CenterContainer from '@/components/Layout/CenterContainer.vue';
import PopupContainer from '@/components/Layout/PopupContainer.vue';
import TextEditbox from '@/components/TextEditbox.vue';
import NormalButton from '@/components/Button/NormalButton.vue';

const store = useStore()
const toast = useToast()

const userId = ref('')
const userPwd = ref('')

async function userLogin() {
    if (userId.value.trim() == '') {
        toast.warning('账号不可为空')
        return 0
    }
    if (userPwd.value.trim() == '') {
        toast.warning('密码不可为空')
        return 0
    }
    store.networkLoading = true
    const result = await UserLogin(userId.value, userPwd.value)
    if (result.code == 0) {
        toast.clear()
        toast.success('登录成功')
        store.login = true
        store.userId = userId.value
        Cookies.set('login', '1', { expires: 7 })
        Cookies.set('userid', userId.value, { expires: 7 })
        router.push('/')
    } else if (result.code = 2) {
        toast.warning(result.msg)
    } else if (result.code = 3) {
        toast.error(result.msg)
    }
    store.networkLoading = false
}
</script>