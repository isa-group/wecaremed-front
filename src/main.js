import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import PrimeVue from 'primevue/config';

axios.defaults.baseURL = 'http://localhost:3000/api';

createApp(App).use(store).use(router).use(VueAxios, axios).use(PrimeVue).mount('#app')
