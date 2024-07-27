import { createPinia } from 'pinia'
import { type Plugin, createApp } from 'vue'
import VueLazyload from 'vue-lazyload'
import 'moment/dist/locale/id'
import './scss/main.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)
app.use(VueLazyload, {
    preLoad: 1.3,
    attempt: 1
})
app.use(pinia)
app.use(router as Plugin<[]>)
app.mount('#app')

declare let Waves: any
document.addEventListener('DOMContentLoaded', function () {
    Waves.init()
})
