import { BlockData, NoteData, RequestResult } from "@/core/types"
import { get, http_delete, patch, post } from "@/utils/requests"

const apiUrl = 'https://db-api.amarea.cn/notes/'
// const apiUrl = 'http://192.168.31.100:3000/notes/'

export async function NoteGet(noteId: string): Promise<RequestResult> {
    // 定义返回数据
    let result: RequestResult = {
        code: -1,
        msg: ''
    }

    // 请求
    const res = await get(apiUrl + noteId)
    if (res.code == 0) {
        const data = JSON.parse(res.msg)
        result.code = 0
        result.msg = res.msg
    } else {
        switch (res.code) {
            case -1:
                result.code = 3
                result.msg = '网络或服务器错误'
                break
            case 404:
                result.code = 2
                result.msg = '笔记不存在'
                break
            default:
                result.code = 3
                result.msg = '未知错误：' + res.code
        }
    }
    return result
}

export async function NoteCreate(noteId: string, noteData: BlockData[]): Promise<RequestResult> {
    // 定义返回数据
    let result: RequestResult = {
        code: -1,
        msg: ''
    }

    // 请求
    const res = await post(apiUrl, { id: noteId, data: noteData })
    if (res.code == 0) {
        result.code = 0
        result.msg = '上传成功'
    } else {
        switch (res.code) {
            case -1:
                result.code = 3
                result.msg = '网络或服务器错误'
                break
            case 500:
                result.code = 2
                result.msg = '笔记已存在'
                break
            default:
                result.code = 3
                result.msg = '未知错误：' + res.code
        }
    }
    return result
}

export async function NoteSync(noteId: string, noteData: BlockData[]): Promise<RequestResult> {
    // 定义返回数据
    let result: RequestResult = {
        code: -1,
        msg: ''
    }

    // 请求
    const res = await patch(apiUrl + noteId, { data: noteData })
    if (res.code == 0) {
        result.code = 0
        result.msg = '同步成功'
    } else {
        switch (res.code) {
            case -1:
                result.code = 3
                result.msg = '网络或服务器错误'
                break
            case 404:
                result.code = 2
                result.msg = '笔记不存在'
                break
            default:
                result.code = 3
                result.msg = '未知错误：' + res.code
        }
    }
    return result
}

export async function NoteDelete(noteId: string) {
    // 定义返回数据
    let result: RequestResult = {
        code: -1,
        msg: ''
    }

    // 请求
    const res = await http_delete(apiUrl + noteId)
    if (res.code == 0) {
        const data = JSON.parse(res.msg)
        result.code = 0
        result.msg = '笔记删除成功'
    } else {
        switch (res.code) {
            case -1:
                result.code = 3
                result.msg = '网络或服务器错误'
                break
            case 404:
                result.code = 2
                result.msg = '笔记不存在'
                break
            default:
                result.code = 3
                result.msg = '未知错误：' + res.code
        }
    }
    return result
}