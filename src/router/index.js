import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../components/Layout.vue';
import HomeView from '../views/HomeView.vue';
import Login from '../views/Login.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Layout,
        children: [
            {
                path: '', // Default child route
                name: 'HomeDefault',
                component: HomeView, // This should render when accessing '/'
            },
            {
                path: 'login',
                name: 'Login',
                component: Login, // This should render when accessing '/login'
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
