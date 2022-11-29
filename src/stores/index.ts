import { BlockData, NoteData } from '@/core/types'
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => ({
        login: false,
        networkLoading: false,
        userId: '',
        userName: '',
        noteList: { '0': { tag: [], title: '' } } as { [id: string]: NoteData },
        currentNoteId: '0',
        currentNoteData: [{ blkType: 'Markdown', blkContent: '数据加载中', blkAuthor: '', blkCreateTime: 0, blkLastEditTime: 0 }] as BlockData[]
    }),
})