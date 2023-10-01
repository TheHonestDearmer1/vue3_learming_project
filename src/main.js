import { createApp } from 'vue';
import App from './App.vue';
import cookies from 'vue-cookies';
import naive from "naive-ui";
const app = createApp(App);
app.config.globalProperties.$cookies = cookies;
app.config.globalProperties.$cookies.config('1d');

app.use(naive);

app.mount('#app');


