import { createPinia } from 'pinia'
import { type Plugin, createApp } from 'vue'
import './scss/main.scss'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router as Plugin<[]>)
app.mount('#app')
