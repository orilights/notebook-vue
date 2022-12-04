<template>
    <CenterContainer>
        <PopupContainer class="w-[350px]">
            <div class="text-center font-semibold text-xl mb-6">用户注销</div>
            <div class="my-4 flex">
                <span>验证密码：</span>
                <TextEditbox class="flex-1" type="password" v-model="userPwd" place-holder="请输入密码" />
            </div>
            <div class="text-red-500">这将删除用户所有数据以及创建的所有笔记，请谨慎操作</div>
            <div class="flex justify-center mt-6">
                <NormalButton @click="userDeleteAccount">注销</NormalButton>
                <NormalButton @click="router.back">取消</NormalButton>
            </div>
        </PopupContainer>
    </CenterContainer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NormalButton from '@/components/Button/NormalButton.vue';
import CenterContainer from '@/components/Layout/CenterContainer.vue';
import PopupContainer from '@/components/Layout/PopupContainer.vue';
import TextEditbox from '@/components/TextEditbox.vue';
import { UserDeleteAccount, UserLogin } from '@/api/user';
import router from '@/router';
import { useStore } from '@/stores';
import { useToast } from 'vue-toastification';
import Cookies from 'js-cookie';
import { NoteDelete } from '@/api/note';

const store = useStore()
const toast = useToast()

const userPwd = ref('')

async function userDeleteAccount() {
    if(userPwd.value.trim() == ''){
        toast.warning('密码不能为空')
        return 0
    }
    store.networkLoading = true
    const res_verify = await UserLogin(store.userId,userPwd.value)
    if(res_verify.code == 0){
        toast.success('验证成功，正在删除用户数据')
        Object.keys(store.noteList).forEach(async(value)=>{
            await NoteDelete(value)
            toast.info('删除笔记：'+value)
        })
        await UserDeleteAccount(store.userId)
        toast.info('删除用户：' + store.userId)
        store.login = false
        store.userId = ''
        Cookies.remove('login')
        Cookies.remove('userid')
        toast.success('注销完成')
        router.push('/login')
    } else if (res_verify.code = 2) {
        toast.warning(res_verify.msg)
    } else if (res_verify.code = 3) {
        toast.error(res_verify.msg)
    }
    store.networkLoading = false
} 
</script>