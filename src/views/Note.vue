<template>
    <div class="flex flex-row h-full">
        <NoteLeftPanel :class="leftPanelShow ? '' : '!w-0'">
            <NoteCtrlButton class="absolute top-5 right-4" @click="leftPanelShow = false">
                <IconDoubleLeft class="w-4 h-4" />
            </NoteCtrlButton>
            <div
                class="mt-[50px] w-full bg-gray-200 dark:bg-[#242424] hover:bg-gray-300 dark:hover:bg-gray-800 p-[8px] rounded-md cursor-text flex items-center space-x-1">
                <IconSearch class="w-4 h-4" />
                <input type="text" class="bg-transparent outline-none text-sm" placeholder="搜索" v-model="searchText"
                    @input="handleSearch">
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
                class="bg-gray-200 dark:bg-[#242424] rounded-md flex-grow overflow-y-scroll  scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 hover:scrollbar-thumb-gray-400 dark:hover:scrollbar-thumb-gray-500 scrollbar-track-gray-200 dark:scrollbar-track-transparent scrollbar-track-rounded-md scrollbar-thumb-rounded-md">
                <div class="px-4 py-2 hover:px-6 hover:bg-gray-300 dark:hover:bg-white/10 transition-all"
                    v-if="!isSearch" v-for="note, index in Object.values(noteList)"
                    :class="Object.keys(noteList)[index] == currentNoteId ? 'px-6 bg-gray-300 dark:bg-white/10' : ''"
                    @click="noteSwitch(index)">
                    <p class="w-full overflow-ellipsis whitespace-nowrap overflow-hidden">
                        {{ note.title }}
                    </p>
                </div>
                <div v-if="isSearch"
                    class="px-4 py-2 hover:px-6 hover:bg-gray-300 dark:hover:bg-white/10 transition-all"
                    v-for="res in searchResult" @click="noteSwitch(res.index); searchText = ''">
                    <p class="w-full overflow-ellipsis whitespace-nowrap overflow-hidden">
                        {{ res.text }}
                    </p>
                </div>
            </div>
        </NoteLeftPanel>
        <div class="w-full h-full flex flex-col">
            <NoteTopMenu>
                <div class="flex flex-shrink-0">
                    <NoteCtrlButton v-if="!leftPanelShow" @click="leftPanelShow = true">
                        <IconDoubleRight class="w-4 h-4" />
                    </NoteCtrlButton>
                    <div class="mr-4 relative flex-shrink-0">
                        <div class="font-bold px-2 min-w-[60px]" style="visibility: hidden;">{{
                                noteList[currentNoteId].title
                        }}</div>
                        <input type="text"
                            class="absolute left-0 top-0 font-bold w-full outline-none px-2 bg-transparent"
                            maxlength="25" v-model="noteList[currentNoteId].title" @focusout="noteSave">
                    </div>
                    <NoteIconButton>
                        <IconExport class="w-4 h-4" @click="noteExport" />
                    </NoteIconButton>
                    <NoteIconButton>
                        <IconImport class="w-4 h-4" @click="noteImport" />
                    </NoteIconButton>
                </div>
                <div class="flex">
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
                </div>
                <div class="flex">
                    <NoteIconButton v-if="!isDarkMode" @click="(isDarkMode = true)">
                        <IconSun class="w-4 h-4" />
                    </NoteIconButton>
                    <NoteIconButton v-if="isDarkMode" @click="(isDarkMode = false)">
                        <IconMoon class="w-4 h-4" />
                    </NoteIconButton>
                    <NoteIconButton @click="infoPanelShow = !infoPanelShow">
                        <IconInfo class="w-4 h-4" />
                    </NoteIconButton>
                    <NoteIconButton v-if="!isFullscreen" @click="enterFullscreen">
                        <IconFullscreen class="w-4 h-4" />
                    </NoteIconButton>
                    <NoteIconButton v-if="isFullscreen" @click="exitFullscreen">
                        <IconFullscreenExit class="w-4 h-4" />
                    </NoteIconButton>
                    <NoteIconButton>
                        <IconUser class="w-4 h-4" />
                    </NoteIconButton>
                    <NoteIconButton @click="userLogout">
                        <IconLogout class="w-4 h-4" />
                    </NoteIconButton>
                </div>
            </NoteTopMenu>
            <NoteInfoPanel v-show="infoPanelShow" class="animation-in">
                <NoteCtrlButton class="absolute top-4 right-4">
                    <IconClose class="w-4 h-4" @click="(infoPanelShow = false)" />
                </NoteCtrlButton>
                <div class="font-bold">笔记信息</div>
                <div class="text-sm">笔记标题：{{ noteList[currentNoteId].title }}</div>
                <div class="text-sm">
                    笔记ID：<span class="hover:text-gray-400"
                        @click="copyToClipboard(currentNoteId, () => { toast.success('已复制到剪贴板') })">{{
                                currentNoteId
                        }}</span>
                </div>
                <div class="font-bold">笔记块信息</div>
                <div class="text-sm">笔记块ID：{{ currentSelectedBlock }}</div>
                <div class="text-sm">创建者ID：{{ currentNoteData[currentSelectedBlock].blkAuthor }}</div>
                <div class="text-sm">创建时间：{{ timeFormat(currentNoteData[currentSelectedBlock].blkCreateTime) }}</div>
                <div class="text-sm">最后编辑：{{ timeFormat(currentNoteData[currentSelectedBlock].blkLastEditTime) }}</div>
            </NoteInfoPanel>
            <NoteContainer>
                <div v-for="block, index in currentNoteData" class="mt-4">
                    <NoteBlock :block="block" @selected="blockSelect(index)" @data-change="noteSave"
                        :class="currentSelectedBlock == index ? 'border-gray-300 dark:border-slate-50/20' : ''" />
                </div>
                <div class="h-10"></div>
            </NoteContainer>
        </div>
    </div>

</template>

<script setup lang="ts">
import {
    IconAdd,
    IconAddUp,
    IconAddDown,
    IconDoubleLeft,
    IconDoubleRight,
    IconUp,
    IconDown,
    IconImport,
    IconExport,
    IconFullscreen,
    IconFullscreenExit,
    IconInfo,
    IconClose,
    IconLogout,
    IconSearch,
    IconTrash,
    IconUser,
    IconSun,
    IconMoon
} from '@/components/Icon';
import { computed, onMounted, ref, toRefs, watch } from 'vue';
import NoteBlock from '@/components/NoteBlock.vue';
import NoteIconButton from '@/components/Button/NoteIconButton.vue';
import NoteCtrlButton from '@/components/Button/NoteCtrlButton.vue';
import NoteContainer from '@/components/Layout/NoteContainer.vue';
import NoteLeftPanel from '@/components/Layout/NoteLeftPanel.vue';
import NoteInfoPanel from '@/components/Layout/NoteInfoPanel.vue';
import Cookies from 'js-cookie';
import { useToast } from 'vue-toastification';
import { v4 as uuid4 } from 'uuid'
import hljs from 'highlight.js/lib/common'
import { marked } from 'marked'
import NProgress from 'nprogress'
import { BlockData } from '@/core/types';
import router from '@/router';
import { useStore } from '@/stores';
import { UserDataGet, UserDataUpdate } from '@/api/user';
import { NoteCreate, NoteDelete, NoteGet, NoteSync } from '@/api/note';
import { copyToClipboard, timeFormat } from '@/utils';
import NoteTopMenu from '@/components/Layout/NoteTopMenu.vue';

const store = useStore()
const toast = useToast()

const { noteList, currentNoteId, currentNoteData, isDarkMode } = toRefs(store)
const currentSelectedBlock = ref(0)
const searchText = ref('')
const searchResult = ref<{
    text: string,
    index: number
}[]>([])


const leftPanelShow = ref(false)
const infoPanelShow = ref(false)

const isFullscreen = ref(false)
const isSearch = computed(() => searchText.value != '')

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

watch(leftPanelShow, () => {
    localStorage.setItem('leftPanelShow', leftPanelShow.value ? 'true' : 'false')
})

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
    currentSelectedBlock.value = 0
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
    currentSelectedBlock.value = 0
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
    currentSelectedBlock.value = 0
    NProgress.done()
}

async function noteSave() {
    NProgress.start()
    await UserDataUpdate(store.userId, { currentNoteId: currentNoteId.value, noteList: noteList.value })
    const result = await NoteSync(currentNoteId.value, currentNoteData.value)
    if (result.code == 0) {
        // 笔记同步成功
    } else if (result.code = 2) {
        toast.warning(result.msg)
    } else if (result.code = 3) {
        toast.error(result.msg)
    }
    NProgress.done()
    console.log('save note ' + currentNoteId.value);
}

function noteImport() {
    let fileInput = document.createElement('input')
    fileInput.style.display = 'none'
    fileInput.type = 'file'
    fileInput.setAttribute('filename', 'note-*.json')
    fileInput.accept = 'application/json'
    document.body.appendChild(fileInput)
    fileInput.addEventListener('change', () => {
        if ((fileInput.files as FileList).length > 0) {
            const reader = new FileReader()
            reader.onload = () => {
                currentNoteData.value = JSON.parse(reader.result as string)
                noteSave()
            }
            reader.readAsText((fileInput.files as FileList)[0], 'utf8')
            document.body.removeChild(fileInput)

        }
    }, false)
    fileInput.click()
}


function noteExport() {
    let noteData = JSON.stringify(currentNoteData.value)
    let blob = new Blob([noteData], { type: "text/plain;charset=utf-8" })
    let tmpLink = document.createElement('a')
    let dataUrl = URL.createObjectURL(blob)
    tmpLink.download = "note-" + Date.now() + ".json"
    tmpLink.href = dataUrl
    document.body.appendChild(tmpLink)
    tmpLink.click()
    document.body.removeChild(tmpLink)
    URL.revokeObjectURL(dataUrl)
}

function enterFullscreen() {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
}

function exitFullscreen() {
    document.exitFullscreen()
    isFullscreen.value = false
}

function handleSearch() {
    searchResult.value = []
    const queryStr = '(.*?)'
    let stringArr = searchText.value.replace(/[^0-9a-z\u4E00-\u9FA5]/ig, '').split('')
    let regString = queryStr + stringArr.join(queryStr) + queryStr
    let reg = RegExp(regString, "i");
    Object.values(noteList.value).forEach((value, index) => {
        if (reg.test(value.title + value.tag.join(''))) {
            searchResult.value.push({ text: value.title, index })
        }
    })
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

<style scoped>
.animation-in {
    animation: show 0.3s;
}

@keyframes show {
    0% {
        opacity: 0;
        transform: translate(0, -50px);
    }

    100% {
        opacity: 1;
        transform: translate(0, 0px);
    }
}
</style>