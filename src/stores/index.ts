import { NoteData } from '@/core/types'
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
    state: () => ({
        login: false,
        networkLoading: false,
        userId: '',
        userName: '',
        noteList: [] as string[],
        currentNoteId: '',
        currentNoteTitle: '',
        currentNoteData: {} as NoteData
    }),
})