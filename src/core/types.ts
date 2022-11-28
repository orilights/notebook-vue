export interface UserData {
    noteList: String[],
    currentNoteId: String
}

export interface BlockData {
    blkType: String,
    blkContent: String,
    blkAuthor: String,
    blkCreateTime: Number,
    blkLastEditTime: Number
}

export interface NoteData {
    title: String,
    tag: String[],
    blocks: BlockData[]
}

export interface RequestResult {
    code: number,
    msg: string
}
