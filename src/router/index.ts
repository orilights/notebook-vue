import { useStore } from '@/stores'
import Cookies from 'js-cookie'
import { createRouter, createWebHashHistory } from 'vue-router'

import routes from './routes'

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from) => {
    const store = useStore()
    const toHome = ['/login', '/register', '/login/forgetpassword'] // 登录后不允许访问
    const whiteList = ['/login', '/register', '/login/forgetpassword', '/404'] // 不检查登录状态
    if (!store.login) {
        if (Cookies.get('login') == '1') {
            store.login = true
            store.userId = Cookies.get('userid') || '获取昵称失败'
        }
    }
    if (toHome.includes(to.path)) {
        if (store.login) {
            return '/home'
        }
    }
    if (!whiteList.includes(to.path)) {
        if (!store.login) {
            return '/login'
        }
    }
})

export default router