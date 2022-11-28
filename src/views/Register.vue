<template>
    <CenterContainer>
        <PopupContainer>
            <div class="text-center font-semibold text-xl mb-6">用户注册</div>
            <div class="relative my-4">
                <span>账号：</span>
                <TextEditbox type="text" v-model="userId" place-holder="请输入账号" @focusin="showTip" />
                <span v-if="!vaildUserId" class="absolute left-14 top-6 text-red-600 text-sm m-0">当前账号格式非法</span>
            </div>
            <div class="my-4">
                <span>昵称：</span>
                <TextEditbox type="text" v-model="userName" place-holder="请输入昵称" />
            </div>
            <div class="my-4">
                <span>密码：</span>
                <TextEditbox type="password" v-model="userPwd" place-holder="请输入密码" />
            </div>
            <div class="button-group mt-6 flex justify-center">
                <RouterLink to="/login">
                    <NormalButton>&lt;返回登录</NormalButton>
                </RouterLink>
                <NormalButton @click="userRegister">注册</NormalButton>
            </div>
        </PopupContainer>
    </CenterContainer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import router from '@/router';
import { useStore } from '@/stores';
import { useToast } from 'vue-toastification';
import { UserRegister } from '@/api/user';
import PopupContainer from '@/components/Layout/PopupContainer.vue';
import TextEditbox from '@/components/TextEditbox.vue';
import NormalButton from '@/components/Button/NormalButton.vue';
import CenterContainer from '@/components/Layout/CenterContainer.vue';

const store = useStore()
const toast = useToast()

let re = new RegExp('^[a-z0-9-_]{5,15}$')
const vaildUserId = computed(() => re.test(userId.value) || userId.value == '')
const userId = ref('')
const userName = ref('')
const userPwd = ref('')

function showTip() {
    toast.info('用户名仅支持小写字母、数字、横杠、下划线组合，长度5-15字符', { timeout: 10000 })
}

async function userRegister() {
    if (userId.value == '') {
        toast.warning('账号不可为空')
        return 0
    }
    if (userName.value == '') {
        toast.warning('昵称不可为空')
        return 0
    }
    if (userPwd.value == '') {
        toast.warning('密码不可为空')
        return 0
    }
    if (!vaildUserId.value) {
        toast.warning('当前账号格式非法')
        toast.info('用户名仅支持小写字母、数字、横杠、下划线组合，长度5-15字符', { timeout: 10000 })
        return 0
    }
    store.networkLoading = true
    const result = await UserRegister(userId.value, userName.value, userPwd.value)
    if (result.code == 0) {
        toast.success(result.msg)
        router.push('/login')
    } else if (result.code = 3) {
        toast.error(result.msg)
    }
    store.networkLoading = false
}
</script>