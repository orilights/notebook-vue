import { RequestResult, UserData, UserProfile } from "@/core/types"
import { get, http_delete, patch, post, post_email } from "@/utils/requests"
import { passwordHash } from "../utils"

const apiUrl = 'https://db-api.amarea.cn/users/'
// const apiUrl = 'http://192.168.31.100:3000/users/'

export async function UserLogin(userId: string, userPwd: string): Promise<RequestResult> {
    // 定义返回数据
    let result: RequestResult = {
        code: -1,
        msg: ''
    }

    // 请求
    const res = await get(apiUrl + userId)
    if (res.code == 0) {
        const data = JSON.parse(res.msg)
        if (data['password'] == passwordHash(userPwd, userId)) {
            result.code = 0
            result.msg = '登录成功'
        } else {
            result.code = 3
            result.msg = '密码错误'
        }
    } else {
        switch (res.code) {
            case -1:
                result.code = 3
                result.msg = '网络或服务器错误'
                break
            case 404:
                result.code = 2
                result.msg = '用户不存在'
                break
            default:
                result.code = 3
                result.msg = '未知错误：' + res.code
        }
    }
    return result
}

export async function UserRegister(userId: string, userName: string, userPwd: string, userSex: string, userPhone: string, userEmail: string): Promise<RequestResult> {
    // 定义返回数据
    let result: RequestResult = {
        code: -1,
        msg: ''
    }

    // 请求
    const res = await post(apiUrl, { id: userId, name: userName, password: passwordHash(userPwd, userId), sex: userSex, phone: userPhone, email: userEmail })
    if (res.code == 0) {
        result.code = 0
        result.msg = '注册成功'
    } else {
        switch (res.code) {
            case -1:
                result.code = 3
                result.msg = '网络或服务器错误'
                break
            case 500:
                result.code = 2
                result.msg = '用户已存在'
                break
            default:
                result.code = 3
                result.msg = '未知错误：' + res.code
        }
    }
    return result
}

export async function UserChangePassword(userId: string, userPwd: string, newUserPwd: string): Promise<RequestResult> {
    let result: RequestResult = {
        code: -1,
        msg: ''
    }
    let verifyResult = await UserLogin(userId, userPwd)
    if (verifyResult.code != 0) {
        result.code = verifyResult.code
        result.msg = verifyResult.msg
        return result
    }
    let response: Response
    try {
        response = await fetch(apiUrl + userId, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify({ password: passwordHash(newUserPwd, userId) })
        })
    } catch (err) {
        result.code = 3
        result.msg = '网络错误'
        return result
    }
    if (!response.ok || response.status != 200) {
        result.code = 3
        result.msg = '服务器错误'
    } else {
        result.code = 0
        result.msg = '密码修改成功'
    }
    return result
}

export async function UserChangePasswordWithoutVerify(userId: string, newUserPwd: string): Promise<RequestResult> {
    let result: RequestResult = {
        code: -1,
        msg: ''
    }
    let response: Response
    try {
        response = await fetch(apiUrl + userId, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify({ password: passwordHash(newUserPwd, userId) })
        })
    } catch (err) {
        result.code = 3
        result.msg = '网络错误'
        return result
    }
    if (!response.ok || response.status != 200) {
        result.code = 3
        result.msg = '服务器错误'
    } else {
        result.code = 0
        result.msg = '密码修改成功'
    }
    return result
}

export async function UserProfileUpdate(userId: string, userProfile: UserProfile): Promise<RequestResult> {
    // 定义返回数据
    let result: RequestResult = {
        code: -1,
        msg: ''
    }

    // 请求
    const res = await patch(apiUrl + userId, { ...userProfile })
    if (res.code == 0) {
        result.code = 0
        result.msg = '更新成功'
    } else {
        switch (res.code) {
            case -1:
                result.code = 3
                result.msg = '网络或服务器错误'
                break
            case 404:
                result.code = 2
                result.msg = '用户不存在'
                break
            default:
                result.code = 3
                result.msg = '未知错误：' + res.code
        }
    }
    return result
}

export async function UserDataGet(userId: string): Promise<RequestResult> {
    // 定义返回数据
    let result: RequestResult = {
        code: -1,
        msg: ''
    }

    // 请求
    const res = await get(apiUrl + userId)
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
                result.msg = '用户不存在'
                break
            default:
                result.code = 3
                result.msg = '未知错误：' + res.code
        }
    }
    return result
}

export async function UserDataUpdate(userId: string, data: UserData): Promise<RequestResult> {
    // 定义返回数据
    let result: RequestResult = {
        code: -1,
        msg: ''
    }

    // 请求
    const res = await patch(apiUrl + userId, { data })
    if (res.code == 0) {
        result.code = 0
        result.msg = '更新成功'
    } else {
        switch (res.code) {
            case -1:
                result.code = 3
                result.msg = '网络或服务器错误'
                break
            case 404:
                result.code = 2
                result.msg = '用户不存在'
                break
            default:
                result.code = 3
                result.msg = '未知错误：' + res.code
        }
    }
    return result
}

export async function UserEmailVerify(email: string, verifyCode: string, userName: string): Promise<RequestResult>{
    const emailApi = 'https://email.api.orght.cn/send.php'
    // 定义返回数据
    let result: RequestResult = {
        code: -1,
        msg: ''
    }

    // 请求
    const body = new URLSearchParams()
    body.append('target', email)
    body.append('username', userName)
    body.append('code', verifyCode)

    const res = await post_email(emailApi, body)
    if (res.code == 0) {
        result.code = 0
        result.msg = '邮件发送成功'
    } else {
        switch (res.code) {
            case -1:
                result.code = 3
                result.msg = '网络或服务器错误'
                break
            case 500:
                result.code = 3
                result.msg = '服务器错误'
                break
            default:
                result.code = 3
                result.msg = '未知错误：' + res.code
        }
    }
    return result
}

export async function UserDeleteAccount(userId: string): Promise<RequestResult>{
    // 定义返回数据
    let result: RequestResult = {
        code: -1,
        msg: ''
    }

    // 请求
    const res = await http_delete(apiUrl + userId)
    if (res.code == 0) {
        const data = JSON.parse(res.msg)
        result.code = 0
        result.msg = '用户删除成功'
    } else {
        switch (res.code) {
            case -1:
                result.code = 3
                result.msg = '网络或服务器错误'
                break
            case 404:
                result.code = 2
                result.msg = '用户不存在'
                break
            default:
                result.code = 3
                result.msg = '未知错误：' + res.code
        }
    }
    return result
}