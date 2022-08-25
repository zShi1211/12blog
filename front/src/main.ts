import { createApp } from 'vue'
import { createPinia } from 'pinia'
import plugin from './plugin'

import App from './App.vue'
import router from './router'
import vueLazyLoad from 'vue3-lazyload'
import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";
const app = createApp(App)

app.use(createPinia())
app.use(() => VueViewer);
app.use(router)
app.use(plugin)
app.use(vueLazyLoad)
app.mount('#app')
