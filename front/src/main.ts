import { createApp } from 'vue'
import plugin from './plugin'

import App from './App.vue'
import router from './router'
import vueLazyLoad from 'vue3-lazyload'
import VueViewer from "v-viewer";
const app = createApp(App)

app.use(() => VueViewer);
app.use(router)
app.use(plugin)
app.use(vueLazyLoad)
app.mount('#app')
