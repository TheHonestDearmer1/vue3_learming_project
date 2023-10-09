import { createApp } from 'vue';
import App from './App.vue';
import cookies from 'vue-cookies';
import naive from "naive-ui";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);

app.config.globalProperties.$cookies = cookies;
app.config.globalProperties.$cookies.config('1d');

app.use(naive);
app.use(ElementPlus)

app.mount('#app');


