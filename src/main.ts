import { createApp } from 'vue'
import App from './App.vue'

// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { useElementComponents } from '@/config/element'

import router from '@/router/index'



createApp(App)
    .use(useElementComponents)
    .use(router)
    .mount('#app')
