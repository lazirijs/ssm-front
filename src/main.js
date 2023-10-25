import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import { Icon } from "@iconify/vue";
import input from "./utilities/input.vue";
import button from "./utilities/button.vue";

createApp(App).use(store).use(router)
.component("btn-app", button)
.component("input-app", input)
.component("icon-app", Icon)
.mount('#app')
