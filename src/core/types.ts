export interface UserData {
    noteList: {
        [id: string]: NoteData
    },
    currentNoteId: string
}

export interface BlockData {
    blkType: string,
    blkContent: string,
    blkAuthor: string,
    blkCreateTime: number,
    blkLastEditTime: number
}

export interface NoteData {
    tag: string[]
    title: string
}

export interface RequestResult {
    code: number,
    msg: string
}
