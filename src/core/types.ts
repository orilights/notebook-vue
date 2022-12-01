export interface UserData {
    noteList: {
        [id: string]: NoteData
    },
    currentNoteId: string
}

export interface NoteData {
    title: string,
    tag: string[],
    author?: string,
    createdAt?: number,
    updatedAt?: number
}

export interface BlockData {
    content: string,
}

export interface RequestResult {
    code: number,
    msg: string
}
