import { createApp } from 'vue'
import App from './App'
import components from "@/components/UI"
import router from '@/router/router'
import directives  from '@/directives'
import store from '@/store'


const app = createApp(App)

components.forEach(component=>{
    app.component(component.name, component)
})

directives.forEach(directiv=>{
    app.directive(directiv.name, directiv)
})
app.use(router).use(store).mount('#app')
