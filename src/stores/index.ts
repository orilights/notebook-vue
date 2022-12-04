import { BlockData, NoteData, UserProfile } from '@/core/types'
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => ({
        login: false,
        networkLoading: false,
        userId: '',
        noteList: { '0': { tag: [], title: '' } } as { [id: string]: NoteData },
        currentNoteId: '0',
        currentNoteData: [{ content: '加载中' }] as BlockData[],
        isDarkMode: false
    }),
})