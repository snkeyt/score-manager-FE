import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';

import App from './App.vue'
import { router } from './router'
import '@arco-design/web-vue/dist/arco.css';
import './assets/main.css'
import '@/api/interceptor';

const app = createApp(App)

app.use(router).use(ArcoVue)

app.mount('#app')
