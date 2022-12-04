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
    },{
        path: '/login/forgetpassword',
        name: 'forget-password',
        component: () => import(/* webpackChunkName: "user" */ '@views/ForgetPassword.vue'),
    }, {
        path: '/user/editpassword',
        name: 'edit-password',
        component: () => import(/* webpackChunkName: "user" */ '@views/EditPassword.vue'),
    },{
        path: '/user/deleteaccount',
        name: 'user-delete-account',
        component: () => import(/* webpackChunkName: "user" */ '@views/DeleteAccount.vue')
    }, {
        path: '/404',
        name: '404',
        component: () => import(/* webpackChunkName: "page" */ '@views/Page404.vue'),
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