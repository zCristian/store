import { createApp } from 'vue';
import App from './App.vue'
//import store from './store'
import router from './router'
import axios from 'axios';
import Toast from 'vue-toastification';
import "vue-toastification/dist/index.css";
axios.defaults.baseURL = 'http://localhost:3000/cliente';

const app = createApp(App)
// Only works if using in-browser compilation.
// If using build tools, see config examples below.
app.config.compilerOptions.isCustomElement = (tag) => tag.includes('-')
app.use(router);
app.use(Toast);
app.mount('#app')