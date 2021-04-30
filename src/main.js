import { createApp } from 'vue';
import App from './App.vue';
import './css/common.less';
import './css/init.css';
import store from './store'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

createApp(App).use(ElementPlus).use(router).use(store).mount('#app')
