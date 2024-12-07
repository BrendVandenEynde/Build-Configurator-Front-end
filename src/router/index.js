import { createRouter, createWebHistory } from 'vue-router';
import HeartHeelConfig from '../pages/HeartHeelConfig.vue';
import SneakerConfig from '../pages/SneakerConfig.vue';

const routes = [
    { path: '/', component: () => import('../App.vue') }, 
    { path: '/heart-heel-config', component: HeartHeelConfig },
    { path: '/sneaker-config', component: SneakerConfig },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;