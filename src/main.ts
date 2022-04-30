import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_APP_URL

import router from '@/router/index'

createApp(App)
    .use(ElementPlus)
    .use(router)
    .mount('#app')
