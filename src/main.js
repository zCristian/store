import { createApp } from 'vue';
import App from './App.vue'
//import store from './store'
import router from './router'
import axios from 'axios';
import Toast from 'vue-toastification';
import "vue-toastification/dist/index.css";
axios.defaults.baseURL = 'http://localhost:3000';


const app = createApp(App)
app.config.compilerOptions.isCustomElement = (tag) => tag.includes('-');




app.use(router);
app.use(Toast);
app.mount('#app')