import { createPinia } from 'pinia'
import { type Plugin, createApp } from 'vue'
// import 'moment/dist/locale/id'
import './scss/main.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router as Plugin<[]>)
app.mount('#app')

declare let Waves: any
document.addEventListener('DOMContentLoaded', function () {
    Waves.init()
})
