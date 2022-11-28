<template>
    <div class="mb-1 px-5 py-3 rounded-xl box-border border-2 border-transparent transition-all duration-300 hover:shadow-[0_2px_12px_0_rgba(0,0,0,0.2)]"
        @click="$emit('selected')" @dblclick="changeMode">
        <div :class="!editMode ? '' : 'hidden'" class="rendered" v-html="marked.parse(block.blkContent as string)">
        </div>
        <div :class="editMode ? '' : 'hidden'">
            <div class="font-bold">编辑模式 <span class="text-gray-400">(点击编辑框外部或双击退出)</span></div>
            <textarea class="w-full" v-model="(block.blkContent as string)" ref="editbox" @input="resetHeight"
                @focusout="focusOut"></textarea>
        </div>
    </div>
</template>

<script setup lang="ts">
import { BlockData } from '@/core/types';
import hljs from 'highlight.js'
import { marked } from 'marked'
import { BlockList } from 'net';
import { nextTick, ref } from 'vue';

const props = defineProps<{
    block: BlockData,
}>()

const emits = defineEmits(['selected','dataChange'])

const editMode = ref(false)
const editbox = ref<HTMLElement | null>(null)

marked.setOptions({
    highlight: function (code, lang) {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
    },
    langPrefix: 'hljs language-'
})

function changeMode(e: Event) {
    if (editMode.value) {
        // 退出编辑模式
        editMode.value = false
        props.block.blkLastEditTime = Date.now()
        emits('dataChange')
    } else {
        // 进入编辑模式
        editMode.value = true;
        (editbox.value as HTMLElement).style.height = '100px';
        // 确保能正确获取到 textarea 的 scrollHeight https://laracasts.com/discuss/channels/vue/vue-scrollheight-return-always-0
        nextTick(() => {
            (editbox.value as HTMLElement).style.height = (editbox.value as HTMLElement).scrollHeight + 'px';
            editbox.value?.focus()
        });

    }
}

function focusOut() {
    editMode.value = false;
    props.block.blkLastEditTime = Date.now()
    emits('dataChange')
}

function resetHeight() {
    (editbox.value as HTMLElement).style.height = '100px';
    (editbox.value as HTMLElement).style.height = (editbox.value as HTMLElement).scrollHeight + 'px';
}

</script>

<style lang="postcss">
@tailwind utilities;

@layer utilities {
    .link {
        display: block;
        content: ' ';
        position: absolute;
        width: 100%;
        height: 1px;
        position: absolute;
        left: 0;
        bottom: 0;
        background-color: rgb(86, 145, 255);
        transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
        z-index: -1;
    }

    .link-hover {
        height: 100%;
    }
}

img {
    @apply w-full rounded-xl;
}

textarea {
    @apply resize-none border-none outline-none;
}

code {
    @apply inline-block p-[2px] mx-[1px] my-0 bg-yellow-100/70 rounded-md leading-3;
}

code.hljs {
    @apply rounded-xl leading-normal;
}

.rendered a {
    @apply relative px-1 z-10 hover:text-white after:link hover:after:link-hover transition-colors;
}
</style>