import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';


import { createApp } from 'vue'

import App from './App.vue'

import router from './router/index.js';

const app = createApp(App);

app.use(router);


createApp(App).mount('#app')
