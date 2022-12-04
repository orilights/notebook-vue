import { RequestResult } from "@/core/types"

export async function get(url: string) {
    let result: RequestResult = {
        code: -1,
        msg: ''
    }

    let response: Response
    let json: any = {}
    try {
        response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Cache-Control': 'no-cache'
            },
        })
    } catch (err) {
        result.code = -1
        result.msg = '服务器或网络错误'
        return result
    }

    try { json = await response.json() } catch (err) { }

    if (!response.ok) {
        result.code = response.status
        result.msg = json['message'] || ''
        return result
    }

    result.code = 0
    result.msg = JSON.stringify(json)

    return result
}

export async function post(url: string, body: any) {
    let result: RequestResult = {
        code: -1,
        msg: ''
    }

    let response: Response
    let json: any = {}
    try {
        response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify(body)
        })
    } catch (err) {
        result.code = -1
        result.msg = '服务器或网络错误'
        return result
    }

    try { json = await response.json() } catch (err) { }

    if (!response.ok) {
        result.code = response.status
        result.msg = json['message'] || ''
        return result
    }

    result.code = 0
    result.msg = JSON.stringify(json)

    return result
}

export async function patch(url: string, body: any) {
    let result: RequestResult = {
        code: -1,
        msg: ''
    }

    let response: Response
    let json: any = {}
    try {
        response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify(body)
        })
    } catch (err) {
        result.code = -1
        result.msg = '服务器或网络错误'
        return result
    }

    try { json = await response.json() } catch (err) { }

    if (!response.ok) {
        result.code = response.status
        result.msg = json['message'] || ''
        return result
    }

    result.code = 0
    result.msg = JSON.stringify(json)

    return result
}

export async function http_delete(url: string) {
    let result: RequestResult = {
        code: -1,
        msg: ''
    }

    let response: Response
    let json: any = {}
    try {
        response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Cache-Control': 'no-cache'
            },
        })
    } catch (err) {
        result.code = -1
        result.msg = '服务器或网络错误'
        return result
    }

    try { json = await response.json() } catch (err) { }

    if (!response.ok) {
        result.code = response.status
        result.msg = json['message'] || ''
        return result
    }

    result.code = 0
    result.msg = JSON.stringify(json)

    return result
}

export async function post_email(url: string, body: any) {
    let result: RequestResult = {
        code: -1,
        msg: ''
    }

    let response: Response
    try {
        response = await fetch(url, {
            method: 'POST',
            headers: {
                'Application-Token': '$dvQRDjeu!P4p8p9P%'
            },
            body: body
        })
    } catch (err) {
        result.code = -1
        result.msg = '服务器或网络错误'
        return result
    }

    if (!response.ok) {
        result.code = response.status
        result.msg = await response.text()
        return result
    }

    result.code = 0
    result.msg = await response.text()

    return result
}