import { createApp } from 'vue';
import App from './App.vue';
import './css/common.less';
import './css/init.css';
import store from './store'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import tool from "@/js/tool";

const app =createApp(App)

app.use(ElementPlus).use(router).use(store).mount('#app')

/**挂载一些工具方法**/
app.config.globalProperties = {
    '$deepCopy': tool.deepCopy,//深度克隆
    '$debounce': tool.debounce,//防抖
}

