import '@/assets/main.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './routers/index';
import App from './App.vue';

const app = createApp(App)

app.use(createPinia())

app.use(router)

app.config.errorHandler = (error, vm, info) => {
    console.log(`Error: ${error.toString()}\nInfo: ${info}`);
};

app.mount('#app')
