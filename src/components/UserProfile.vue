<template>
    <NoteCtrlButton class="absolute top-4 right-4 cursor-pointer" @click="emits('close')">
        <IconClose class="w-4 h-4" />
    </NoteCtrlButton>
    <div>
        账号：{{ userProfile.id }}
    </div>
    <div>
        昵称：
        <TextEditbox v-model="userProfile.name" />
    </div>
    <div>
        性别：<label for="sex_male" class="mr-2"><input type="radio" name="sex" id="sex_male" value="male"
                v-model="userProfile.sex">
            男</label>
        <label for="sex_female" class="mr-2"><input type="radio" name="sex" id="sex_female" value="female"
                v-model="userProfile.sex">
            女</label>
        <label for="sex_secret"><input type="radio" name="sex" id="sex_secret" value="secret" v-model="userProfile.sex">
            保密</label>
    </div>
    <div>
        手机号码：
        <TextEditbox v-model="userProfile.phone" />
    </div>
    <div>
        邮箱：{{ userProfile.email }}
    </div>
    <div class="flex justify-center mt-4">
        <NoteNormalButton @click="updateProfile">保存</NoteNormalButton>
        <RouterLink to="/user/editpassword">
            <NoteNormalButton>修改密码</NoteNormalButton>
        </RouterLink>
        <RouterLink to="/user/deleteaccount">
            <NoteNormalButton>注销账号</NoteNormalButton>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import NoteNormalButton from '@/components/Button/NoteNormalButton.vue';
import NoteCtrlButton from '@/components/Button/NoteCtrlButton.vue';
import TextEditbox from '@/components/TextEditbox.vue';
import { UserProfile } from '@/core/types';
import { UserDataGet, UserProfileUpdate } from '@/api/user';
import { useStore } from '@/stores';
import { IconClose } from './Icon';
import { useToast } from 'vue-toastification';

const emits = defineEmits(['close'])
const store = useStore()
const toast = useToast()

const rePhone = /^[0-9]{11}$/

const userProfile = ref<UserProfile>({
    id: '',
    name: '',
    sex: '',
    phone: '',
    email: ''
})

const vaildPhone = computed(() => rePhone.test(userProfile.value.phone))

onMounted(async () => {
    const result = await UserDataGet(store.userId)
    const json = JSON.parse(result.msg)
    userProfile.value = {
        id: json['id'],
        name: json['name'],
        sex: json['sex'],
        phone: json['phone'],
        email: json['email']
    }
})

async function updateProfile() {
    if (userProfile.value.name.trim() == '') {
        toast.warning('昵称不可为空')
        return 0
    }
    if (!vaildPhone.value) {
        toast.warning('当前手机号码格式非法')
        return 0
    }
    const res = await UserProfileUpdate(store.userId, userProfile.value)
    if (res.code == 0) {
        toast.success('保存成功')
        emits('close')
    } else if (res.code == 2) {
        toast.warning(res.msg)
    } else if (res.code == 3) {
        toast.error(res.msg)
    }
}
</script>