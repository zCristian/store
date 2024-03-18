import { createApp } from 'vue';
import App from './App.vue'
//import store from './store'
import router from './router'

const app = createApp(App)
// Only works if using in-browser compilation.
// If using build tools, see config examples below.
app.config.compilerOptions.isCustomElement = (tag) => tag.includes('-')
app.use(router)
app.mount('#app')