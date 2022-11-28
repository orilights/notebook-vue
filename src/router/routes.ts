import { RouteRecordRaw } from 'vue-router'

// 路由数组
const routes: Array<RouteRecordRaw> = [
    {
        path: '/note',
        name: 'note',
        component: () => import(/* webpackChunkName: "note" */ '@views/Note.vue'),
    }, {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@views/Login.vue'),
    }, {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@views/Register.vue'),
    }, {
        path: '/edit/name',
        name: 'edit-name',
        component: () => import(/* webpackChunkName: "user" */ '@views/EditName.vue'),
    }, {
        path: '/edit/password',
        name: 'edit-password',
        component: () => import(/* webpackChunkName: "user" */ '@views/EditPassword.vue'),
    }, {
        path: '/404',
        name: '404',
        component: () => import(/* webpackChunkName: "page404" */ '@views/Page404.vue'),
    }, {
        path: '/',
        redirect: '/note',
    }, {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
    }
]

// 暴露路由数据
export default routes