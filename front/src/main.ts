import { createApp } from 'vue'
import { createPinia } from 'pinia'
import plugin from './plugin'

import App from './App.vue'
import router from './router'
import vueLazyLoad from 'vue3-lazyload'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin)
app.use(vueLazyLoad)
app.mount('#app')
