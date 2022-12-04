<template>
    <CenterContainer>
        <PopupContainer class="w-[350px]">
            <RouterLink to="/login">
                <a class="absolute text-sm top-4 left-4">返回</a>
            </RouterLink>
            <div class="text-center font-semibold text-xl mb-6">忘记密码</div>
            <div class="my-4 flex">
                <span>账号：</span>
                <TextEditbox class="flex-1" type="email" v-model="userId" place-holder="请输入账号" />
            </div>
            <div class="my-4 flex">
                <span>新密码：</span>
                <TextEditbox class="flex-1" type="password" v-model="userNewPwd" place-holder="请输入新密码" />
            </div>
            <div>
                <span v-if="!vaildUserPwd" class="text-red-600 text-sm">密码需要包含至少一个英文字符、数字和特殊符号，长度最少为8位</span>
            </div>
            <div class="my-4 flex">
                <span>重复密码：</span>
                <TextEditbox class="flex-1" type="password" v-model="userNewPwdRep" place-holder="请重复输入新密码" />
            </div>
            <div class="my-4 flex justify-center">
                <NoteNormalButton @click="sendVerifyEmail" :disabled="emailSend">发送验证邮件</NoteNormalButton>
            </div>
            <div v-if="emailSend" class="my-4 flex">
                <span>验证码：</span>
                <TextEditbox class="flex-1" type="text" v-model="verifyCode" place-holder="请输入验证码" />
            </div>
            <div class="mt-6 flex justify-center">
                <NormalButton @click="userChangePassword">修改密码</NormalButton>
            </div>
        </PopupContainer>
    </CenterContainer>
</template>

<script setup lang="ts">
import { UserChangePasswordWithoutVerify, UserDataGet, UserEmailVerify } from '@/api/user';
import NormalButton from '@/components/Button/NormalButton.vue';
import NoteNormalButton from '@/components/Button/NoteNormalButton.vue';
import CenterContainer from '@/components/Layout/CenterContainer.vue';
import PopupContainer from '@/components/Layout/PopupContainer.vue';
import TextEditbox from '@/components/TextEditbox.vue';
import router from '@/router';
import { useStore } from '@/stores';
import { computed, ref } from 'vue';
import { useToast } from 'vue-toastification';

const store = useStore()
const toast = useToast()

const reUserPwd = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
const vaildUserPwd = computed(() => reUserPwd.test(userNewPwd.value) || userNewPwd.value == '')
const userId = ref('')
const userNewPwd = ref('')
const userNewPwdRep = ref('')
const emailSend = ref(false)
const verifyCode = ref('')
let code = ''

async function sendVerifyEmail() {
    if (userId.value == '') {
        toast.warning('账号不可为空')
        return 0
    }
    store.networkLoading = true
    const result = await UserDataGet(userId.value)
    if (result.code == 0) {
        const userdata = JSON.parse(result.msg)
        while (code.length < 6) {
            code += Math.floor(Math.random() * 10)
        }
        console.log(code);
        let res = await UserEmailVerify(userdata['email'], code, userdata['name'])
        if (res.code == 0) {
            toast.info('验证邮件已发送')
            emailSend.value = true
        } else {
            toast.error(res.msg)
        }
    } else if (result.code = 3) {
        toast.error(result.msg)
    }
    store.networkLoading = false
}

async function userChangePassword() {
    if (userId.value == '') {
        toast.warning('账号不可为空')
        return 0
    }
    if (userNewPwd.value.trim() == '') {
        toast.warning('密码不可为空')
        return 0
    }
    if (!vaildUserPwd.value) {
        toast.warning('当前密码格式非法')
        toast.info('密码需要包含至少一个英文字符、数字和特殊符号，长度最少为8位', { timeout: 10000 })
        return 0
    }
    if (userNewPwd.value.trim() != userNewPwdRep.value.trim()) {
        toast.warning('两次输入的密码不同')
        return 0
    }
    if (!emailSend.value) {
        toast.warning('请先发送验证邮件')
        return 0
    }
    if (verifyCode.value.trim() == '') {
        toast.warning('请输入验证码')
        return 0
    }
    if (verifyCode.value.trim() != code) {
        toast.warning('验证码错误')
        return 0
    }
    store.networkLoading = true
    const result = await UserChangePasswordWithoutVerify(userId.value, userNewPwd.value)
    if (result.code == 0) {
        toast.success(result.msg)
        router.push('/login')
    } else if (result.code = 3) {
        toast.error(result.msg)
    }
    store.networkLoading = false
}
</script>