<template>
    <div class="flex flex-row h-full">
        <NoteLeftPanel :class="leftPanelShow ? '' : '!w-0'">
            <NoteCtrlButton class="absolute top-5 right-4" @click="leftPanelShow = false">
                <IconDoubleLeft class="w-4 h-4" />
            </NoteCtrlButton>
            <div
                class="mt-[50px] w-full bg-gray-200 hover:bg-gray-300 p-[8px] rounded-md cursor-text flex items-center space-x-1">
                <IconSearch class="w-4 h-4" />
                <input type="text" class="bg-transparent outline-none text-sm" placeholder="搜索">
            </div>
            <div class="my-2 font-bold">
                笔记列表
                <NoteCtrlButton @click="noteAdd">
                    <IconAdd class="w-4 h-4" />
                </NoteCtrlButton>
                <NoteCtrlButton @click="noteDelete">
                    <IconTrash class="w-4 h-4" />
                </NoteCtrlButton>
            </div>
            <div
                class="bg-gray-200 rounded-md flex-grow overflow-y-scroll  scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-track-rounded-md scrollbar-thumb-rounded-md">
                <div class="px-4 py-2 hover:px-6 hover:bg-gray-300 transition-all"
                    v-for="note, index in Object.values(noteList)"
                    :class="Object.keys(noteList)[index] == currentNoteId ? 'px-6 bg-gray-300' : ''"
                    @click="noteSwitch(index)">
                    <p class="w-full overflow-ellipsis whitespace-nowrap overflow-hidden">
                        {{ note.title }}
                    </p>
                </div>
            </div>
        </NoteLeftPanel>
        <div class="w-full h-full flex flex-col">
            <div
                class="h-[60px] flex-shrink-0 px-5 bg-white border-b flex items-center overflow-x-auto overflow-y-hidden">
                <div class="flex flex-row items-center">
                    <NoteCtrlButton v-if="!leftPanelShow" @click="leftPanelShow = true">
                        <IconDoubleRight class="w-4 h-4" />
                    </NoteCtrlButton>
                    <div class="font-bold min-w-[100px] mx-4 outline-none" contenteditable
                        v-html="noteList[currentNoteId].title"
                        @input="noteList[currentNoteId].title = ($event.target as HTMLElement).innerHTML"></div>
                    <!-- 笔记操作 -->
                    <NoteIconButton>
                        <IconExport class="w-4 h-4" />
                    </NoteIconButton>
                    <NoteIconButton>
                        <IconImport class="w-4 h-4" />
                    </NoteIconButton>
                    <!-- <NoteIconButton @click="blockAdd(-1)">
                        <IconAdd class="w-4 h-4" />
                    </NoteIconButton> -->
                    <div class="w-6"></div>
                    <!-- Block操作 -->
                    <NoteIconButton @click="blockAdd(currentSelectedBlock - 1)">
                        <IconAddUp class="w-4 h-4" />
                    </NoteIconButton>
                    <NoteIconButton @click="blockAdd(currentSelectedBlock)">
                        <IconAddDown class="w-4 h-4" />
                    </NoteIconButton>
                    <NoteIconButton @click="blockMove(currentSelectedBlock, -1)">
                        <IconUp class="w-4 h-4" />
                    </NoteIconButton>
                    <NoteIconButton @click="blockMove(currentSelectedBlock, 1)">
                        <IconDown class="w-4 h-4" />
                    </NoteIconButton>
                    <NoteIconButton @click="blockDelete(currentSelectedBlock)">
                        <IconTrash class="w-4 h-4" />
                    </NoteIconButton>
                    <NoteIconButton @click="infoPanelShow = !infoPanelShow">
                        <IconInfo class="w-4 h-4" />
                    </NoteIconButton>
                    <div>Block：{{ currentSelectedBlock }}</div>
                    <div>创建时间：{{ timeFormat(currentNoteData[currentSelectedBlock].blkCreateTime) }}</div>
                    <div>最后编辑：{{ timeFormat(currentNoteData[currentSelectedBlock].blkLastEditTime) }}</div>
                    <NoteNormalButton @click="userLogout">退出登录</NoteNormalButton>
                </div>
            </div>
            <NoteContainer>
                <div v-for="block, index in currentNoteData" class="mt-4">
                    <NoteBlock :block="block" @selected="blockSelect(index)" @data-change="noteSave"
                        :class="currentSelectedBlock == index ? 'border-gray-300' : ''" />
                </div>
                <div class="h-10"></div>
            </NoteContainer>
        </div>
    </div>

</template>

<script setup lang="ts">
import NoteContainer from '@/components/Layout/NoteContainer.vue';
import NoteIconButton from '@/components/Button/NoteIconButton.vue';
import router from '@/router';
import { useStore } from '@/stores';
import Cookies from 'js-cookie';
import { onMounted, ref, toRefs, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { v4 as uuid4 } from 'uuid'
import hljs from 'highlight.js/lib/common'

import { marked } from 'marked'
import { BlockData } from '@/core/types';
import NoteBlock from '@/components/NoteBlock.vue';
import NoteLeftPanel from '@/components/Layout/NoteLeftPanel.vue';
import NoteCtrlButton from '@/components/Button/NoteCtrlButton.vue';
import IconSearch from '@/components/Icon/IconSearch.vue'
import IconAdd from '@/components/Icon/IconAdd.vue'
import IconDoubleLeft from '@/components/Icon/IconDoubleLeft.vue'
import IconDoubleRight from '@/components/Icon/IconDoubleRight.vue'
import IconTrash from '@/components/Icon/IconTrash.vue';
import IconExport from '@/components/Icon/IconExport.vue';
import IconImport from '@/components/Icon/IconImport.vue';
import IconUp from '@/components/Icon/IconUp.vue';
import IconDown from '@/components/Icon/IconDown.vue';
import IconInfo from '@/components/Icon/IconInfo.vue';
import IconAddUp from '@/components/Icon/IconAddUp.vue';
import IconAddDown from '@/components/Icon/IconAddDown.vue';
import { UserDataGet, UserDataUpdate } from '@/api/user';
import { NoteCreate, NoteDelete, NoteGet, NoteSync } from '@/api/note';
import NoteNormalButton from '@/components/Button/NoteNormalButton.vue';
import { timeFormat } from '@/utils';
import NProgress from 'nprogress'

const store = useStore()
const toast = useToast()

const { noteList, currentNoteId, currentNoteData } = toRefs(store)
const currentSelectedBlock = ref(0)
const leftPanelShow = ref(false)
const infoPanelShow = ref(false)

marked.setOptions({
    highlight: function (code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-'
})

onMounted(async () => {
    store.networkLoading = true
    leftPanelShow.value = (localStorage.getItem('leftPanelShow') || 'true') == 'true'
    const result = await UserDataGet(store.userId)
    const json = JSON.parse(result.msg)

    // 判断数据字段是否存在
    if (Object.hasOwn(json, 'data')) {
        noteList.value = json['data']['noteList']
        currentNoteId.value = json['data']['currentNoteId']
    } else {
        noteList.value = {}
    }
    if (Object.keys(noteList.value).length == 0) {
        await noteAdd()
    }
    const result1 = await NoteGet(currentNoteId.value)
    if (result1.code == 0) {
        currentNoteData.value = JSON.parse(result1.msg)['data']
    } else {
        currentNoteData.value = []
    }
    store.networkLoading = false
})

watch(leftPanelShow, () => { localStorage.setItem('leftPanelShow', leftPanelShow.value ? 'true' : 'false') })

function blockSelect(index: number) {
    currentSelectedBlock.value = index
}

function blockMove(index: number, direction: number) {
    if ((index + direction) < 0) {
        toast.warning('当前位置不可上移')
        return
    }
    if ((index + direction) >= currentNoteData.value.length) {
        toast.warning('当前位置不可下移')
        return
    }

    currentSelectedBlock.value = index + direction
    let tmp = currentNoteData.value[index]
    currentNoteData.value[index] = currentNoteData.value[index + direction]
    currentNoteData.value[index + direction] = tmp
    noteSave()
}

function blockAdd(index: number) {
    let newBlockData: BlockData = {
        blkType: 'Markdown',
        blkContent: '写点什么',
        blkAuthor: store.userId,
        blkCreateTime: Date.now(),
        blkLastEditTime: Date.now()
    }
    if (index == -1) {
        currentNoteData.value.splice(0, 0, newBlockData)
        currentSelectedBlock.value = 0
    } else {
        currentNoteData.value.splice(index + 1, 0, newBlockData)
        currentSelectedBlock.value = index + 1
    }
    noteSave()
}

function blockDelete(index: number) {
    if (index <= currentSelectedBlock.value && index != 0) {
        currentSelectedBlock.value--
    }
    currentNoteData.value.splice(index, 1)

    if (currentNoteData.value.length == 0) {
        blockAdd(0)
    }
    noteSave()
}

async function noteAdd() {
    let newNoteId = uuid4()
    noteList.value[newNoteId] = { tag: [], title: '新笔记' }
    currentNoteId.value = newNoteId

    store.networkLoading = true
    let newNoteData: BlockData[] = JSON.parse(await (await fetch('/template/new-note-template.json')).text())
    let time = Date.now()
    newNoteData.forEach((v) => {
        v.blkCreateTime = time
        v.blkLastEditTime = time
    })
    await NoteCreate(currentNoteId.value, newNoteData)
    await UserDataUpdate(store.userId, { currentNoteId: currentNoteId.value, noteList: noteList.value })
    const result = await NoteGet(currentNoteId.value)
    if (result.code == 0) {
        currentNoteData.value = JSON.parse(result.msg)['data']
    } else {
        currentNoteData.value = []
    }
    store.networkLoading = false
}

async function noteDelete() {

    let index = Object.keys(noteList.value).indexOf(currentNoteId.value)
    let toDelNote = currentNoteId.value
    if (index + 1 == Object.keys(noteList.value).length) {
        currentNoteId.value = Object.keys(noteList.value)[index - 1]
    } else {
        currentNoteId.value = Object.keys(noteList.value)[index + 1]
    }
    delete noteList.value[toDelNote]
    if (Object.keys(noteList.value).length == 0) {
        noteAdd()
    }

    store.networkLoading = true
    await NoteDelete(toDelNote)
    await UserDataUpdate(store.userId, { currentNoteId: currentNoteId.value, noteList: noteList.value })
    const result = await NoteGet(currentNoteId.value)
    if (result.code == 0) {
        currentNoteData.value = JSON.parse(result.msg)['data']
    } else {
        currentNoteData.value = []
    }
    store.networkLoading = false
}

async function noteSwitch(index: number) {
    let newNoteId = Object.keys(noteList.value)[index]
    currentNoteId.value = newNoteId
    NProgress.start()
    await UserDataUpdate(store.userId, { currentNoteId: currentNoteId.value, noteList: noteList.value })
    const result = await NoteGet(currentNoteId.value)
    if (result.code == 0) {
        currentNoteData.value = JSON.parse(result.msg)['data']
    } else {
        currentNoteData.value = []
    }
    NProgress.done()
}

async function noteSave() {
    NProgress.start()
    const result = await NoteSync(currentNoteId.value, currentNoteData.value)
    if (result.code == 0) {
        // toast.success('笔记同步成功')
    } else if (result.code = 2) {
        toast.warning(result.msg)
    } else if (result.code = 3) {
        toast.error(result.msg)
    }
    NProgress.done()
    console.log('save note ' + currentNoteId.value);
}

function userLogout() {
    store.login = false
    store.userId = ''
    store.userName = ''
    Cookies.remove('login')
    Cookies.remove('userid')
    Cookies.remove('username')
    toast.success('注销成功')
    router.push('/login')
}

</script>