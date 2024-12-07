import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router/index.js';

// Create the Vue app and use the router
createApp(App)
    .use(router)
    .mount('#app');
    console.log('App is being mounted');

