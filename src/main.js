import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import { Icon } from "@iconify/vue";
import input from "./components/utilities/input.vue";
import button from "./components/utilities/button.vue";

import { toDate } from './utilities/date';

const app = createApp(App);

app.config.globalProperties.$toDate = (e, type) => toDate(e, type);

app.use(store).use(router)
.component("btn-app", button)
.component("input-app", input)
.component("icon-app", Icon)
.mount('#app')
