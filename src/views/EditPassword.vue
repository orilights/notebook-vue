<template>
    <CenterContainer>
        <PopupContainer class="w-[350px]">
            <div class="my-4 flex">
                <span>旧密码：</span>
                <TextEditbox class="flex-1" type="password" v-model="oldPwd" place-holder="请输入旧密码" />
            </div>
            <div class="my-4 flex">
                <span>新密码：</span>
                <TextEditbox class="flex-1" type="password" v-model="newPwd" place-holder="请输入新密码" />
            </div>
            <div>
                <span v-if="!vaildNewPwd" class="text-red-600 text-sm">密码需要包含至少一个英文字符、数字和特殊符号，长度最少为8位</span>
            </div>
            <div class="my-4 flex">
                <span>重复新密码：</span>
                <TextEditbox class="flex-1" type="password" v-model="newPwdRep" place-holder="请重复输入新密码" />
            </div>
            <NormalButton @click="userChangePassword">修改</NormalButton>
            <NormalButton @click="router.back">取消</NormalButton>
        </PopupContainer>
    </CenterContainer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
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

const reUserPwd = /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
const vaildNewPwd = computed(() => reUserPwd.test(newPwd.value) || newPwd.value == '')
const oldPwd = ref('')
const newPwd = ref('')
const newPwdRep = ref('')

async function userChangePassword() {
    if (newPwd.value.trim() == '') {
        toast.warning('密码不可为空')
        return 0
    }
    if (newPwd.value.trim() != newPwdRep.value.trim()) {
        toast.warning('两次输入的密码不同')
        return 0
    }
    store.networkLoading = true
    const result = await UserChangePassword(store.userId, oldPwd.value, newPwd.value)
    if (result.code == 0) {
        toast.success(result.msg)
        router.back()
    } else if (result.code = 3) {
        toast.error(result.msg)
    }
    store.networkLoading = false
}
</script>