import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import  { reactive } from 'vue'

export const store = reactive({

    query: String,
    BACKEND_API_URL: "http://localhost:3000/api/"
})

createApp(App).use(router).mount('#app')
