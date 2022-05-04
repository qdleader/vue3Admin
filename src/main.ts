import { createApp ,toRaw} from 'vue'
import App from './App.vue'

// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { useElementComponents } from '@/config/element'

import router from '@/router/index'




import { createPinia ,PiniaPluginContext} from 'pinia'
type Options = {
    key?:string
}
const __piniaKey = '__PINIAKEY__'
type OptPinia = Partial<Options>
const setStorage = (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value))
}
const getStorage = (key: string) => {
    return (localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {})
}
const piniaPlugin = (options: OptPinia) => {
    return (context: PiniaPluginContext) => {
        const { store } = context;
        const data = getStorage(`${options?.key ?? __piniaKey}-${store.$id}`)
        store.$subscribe(() => {
            setStorage(`${options?.key ?? __piniaKey}-${store.$id}`, toRaw(store.$state));
        })
        return {
            ...store.$state,
            ...data
        }
    }
}
const pinia = createPinia()
pinia.use(piniaPlugin({
    key: "pinia"
}))

createApp(App)
    .use(useElementComponents)
    .use(router)
    .use(pinia)
    .mount('#app')
