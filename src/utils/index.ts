import cryptojs from 'crypto-js'

export function getRandomString(len: number) {
    let _charStr = 'abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789',
        min = 0,
        max = _charStr.length - 1,
        _str = '';
    // 默认长度 15
    len = len || 15;
    // 循环生成字符串
    for (var i = 0, index; i < len; i++) {
        index = (function (randomIndexFunc, i) {
            return randomIndexFunc(min, max, i, randomIndexFunc);
        })(function (min: number, max: number, i: number, _self: Function) {
            let indexTemp = Math.floor(Math.random() * (max - min + 1) + min),
                numStart = _charStr.length - 10;
            if (i == 0 && indexTemp >= numStart) {
                indexTemp = _self(min, max, i, _self);
            }
            return indexTemp;
        }, i);
        _str += _charStr[index];
    }
    return _str;
}

export function passwordHash(pwd: string, salt: string): string {
    return cryptojs.PBKDF2(pwd, cryptojs.MD5(salt), { keySize: 8, iterations: 5 }).toString()
}

export function timeFormat(timestamp: number) {
    let date = new Date(timestamp);
    let result = ''
    result += date.getFullYear() + '-';
    result += (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    result += (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    result += (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    result += (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    result += (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return result
}

export function copyToClipboard(text: string, callback: Function | null = null) {
    let tmp = document.createElement('input')
    tmp.value = text
    document.body.appendChild(tmp)
    tmp.select()
    document.execCommand("copy")
    document.body.removeChild(tmp)
    callback && callback()
}