import { createApp, reactive} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import PrimeVue from 'primevue/config';

import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'prismjs/themes/prism-coy.css';
import './assets/styles/layout.scss';
import './assets/flags/flags.css';

import ToastService from 'primevue/toastservice';
import DataTable from 'primevue/datatable';

axios.defaults.baseURL = 'http://localhost:3000/api/v1/';

const app = createApp(App);

app.config.globalProperties.$appState = reactive({ theme: 'lara-light-indigo', darkTheme: false });

app
.use(store)
.use(router)
.use(VueAxios, axios)
.use(PrimeVue, { ripple: true, inputStyle: 'outlined' })
.use(ToastService)
.component('DataTable', DataTable)
.mount('#app');


<style lang="scss">
@import './App.scss';
</style>
