import '@/assets/tailwind.css'
import "vue-toastification/dist/index.css"
import "highlight.js/styles/github-dark.css"
import App from '@/App.vue'
import router from '@/router'
import Toast from "vue-toastification";
import { createApp } from 'vue'
import { createPinia } from 'pinia'


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Toast)
app.mount('#app')
