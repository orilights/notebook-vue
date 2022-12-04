<template>
    <CenterContainer>
        <PopupContainer class="w-[350px]">
            <RouterLink to="/login">
                <a class="absolute text-sm top-4 left-4">返回</a>
            </RouterLink>
            <div class="text-center font-semibold text-xl mb-6">用户注册</div>
            <div class="my-4 flex">
                <span>账号：</span>
                <TextEditbox class="flex-1" type="text" v-model="userId" place-holder="请输入账号" />
            </div>
            <div>
                <p v-if="!vaildUserId" class="text-red-600 text-sm">用户名仅支持小写字母、数字、横杠、下划线组合，长度5-15字符</p>
            </div>
            <div class="my-4 flex">
                <span>昵称：</span>
                <TextEditbox class="flex-1" type="text" v-model="userName" place-holder="请输入昵称" />
            </div>
            <div class="my-4 flex">
                <span>密码：</span>
                <TextEditbox class="flex-1" type="password" v-model="userPwd" place-holder="请输入密码" />
            </div>
            <div>
                <span v-if="!vaildUserPwd" class="text-red-600 text-sm">密码需要包含至少一个英文字符、数字和特殊符号，长度最少为8位</span>
            </div>
            <div class="my-4 flex">
                <span>重复密码：</span>
                <TextEditbox class="flex-1" type="password" v-model="userPwdRep" place-holder="请重复输入密码" />
            </div>
            <div class="my-4">
                <span>性别：</span>
                <label for="sex_male" class="mr-2"><input type="radio" name="sex" id="sex_male" value="male"
                        v-model="userSex"> 男</label>
                <label for="sex_female" class="mr-2"><input type="radio" name="sex" id="sex_female" value="female"
                        v-model="userSex"> 女</label>
                <label for="sex_secret"><input type="radio" name="sex" id="sex_secret" value="secret" v-model="userSex">
                    保密</label>
            </div>
            <div class="my-4 flex">
                <span>手机号码：</span>
                <TextEditbox class="flex-1" type="text" v-model="userPhone" place-holder="请输入手机号码" />
            </div>
            <div class="my-4 flex">
                <span>邮箱：</span>
                <TextEditbox class="flex-1" type="email" v-model="userEmail" place-holder="请输入邮箱" />
            </div>
            <div class="my-4 flex justify-center">
                <NoteNormalButton @click="sendVerifyEmail" :disabled="emailSend">发送验证邮件</NoteNormalButton>
            </div>
            <div v-if="emailSend" class="my-4">
                <span>验证码：</span>
                <TextEditbox type="text" v-model="verifyCode" place-holder="请输入验证码" />
            </div>
            <div class="mt-6 flex justify-center">
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
import { UserEmailVerify, UserRegister } from '@/api/user';
import PopupContainer from '@/components/Layout/PopupContainer.vue';
import TextEditbox from '@/components/TextEditbox.vue';
import NormalButton from '@/components/Button/NormalButton.vue';
import CenterContainer from '@/components/Layout/CenterContainer.vue';
import NoteNormalButton from '@/components/Button/NoteNormalButton.vue';

const store = useStore()
const toast = useToast()

const reUserId = /^[a-z0-9-_]{5,15}$/
const rePassword = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
const rePhone = /^[0-9]{11}$/
const reEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
const vaildUserId = computed(() => reUserId.test(userId.value) || userId.value == '')
const vaildUserPwd = computed(() => rePassword.test(userPwd.value) || userPwd.value == '')
const vaildPhone = computed(() => rePhone.test(userPhone.value))
const vaildEmail = computed(() => reEmail.test(userEmail.value))

const userId = ref('')
const userName = ref('')
const userPwd = ref('')
const userPwdRep = ref('')
const userSex = ref('male')
const userPhone = ref('')
const userEmail = ref('')
const verifyCode = ref('')
const emailSend = ref(false)
let code = ''

async function sendVerifyEmail() {
    if (vaildEmail.value) {
        if (!emailSend.value) {
            while (code.length < 6) {
                code += Math.floor(Math.random() * 10)
            }
            console.log(code);
            store.networkLoading = true
            let res = await UserEmailVerify(userEmail.value, code, userName.value)
            if (res.code == 0) {
                toast.info('验证邮件已发送')
                emailSend.value = true
            } else {
                toast.error(res.msg)
            }
            store.networkLoading = false

        } else {
            toast.warning('不可重复发送验证邮件')
        }
    } else {
        toast.warning('邮箱地址非法')
    }
}

async function userRegister() {
    console.log(userSex.value);
    if (userId.value.trim() == '') {
        toast.warning('账号不可为空')
        return 0
    }
    if (userName.value.trim() == '') {
        toast.warning('昵称不可为空')
        return 0
    }
    if (userPwd.value.trim() == '') {
        toast.warning('密码不可为空')
        return 0
    }
    if (userPwd.value.trim() != userPwdRep.value.trim()) {
        toast.warning('两次输入的密码不同')
        return 0
    }
    if (userPhone.value.trim() == '') {
        toast.warning('手机号码不可为空')
        return 0
    }
    if (userEmail.value.trim() == '') {
        toast.warning('邮箱不可为空')
        return 0
    }
    if (!vaildUserId.value) {
        toast.warning('当前账号格式非法')
        toast.info('用户名仅支持小写字母、数字、横杠、下划线组合，长度5-15字符', { timeout: 10000 })
        return 0
    }
    if (!vaildUserPwd.value) {
        toast.warning('当前密码格式非法')
        toast.info('密码需要包含至少一个英文字符、数字和特殊符号，长度最少为8位', { timeout: 10000 })
        return 0
    }
    if (!vaildPhone.value) {
        toast.warning('当前手机号码格式非法')
        return 0
    }
    if (!vaildEmail.value) {
        toast.warning('当前邮箱格式非法')
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
    const result = await UserRegister(userId.value, userName.value, userPwd.value, userSex.value, userPhone.value,userEmail.value)
    if (result.code == 0) {
        toast.success(result.msg)
        router.push('/login')
    } else if (result.code = 3) {
        toast.error(result.msg)
    }
    store.networkLoading = false
}
</script>