import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../components/Layout.vue';
import Login from '../views/Login.vue'; // Ensure this path is correct

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Layout, // Use the Layout component here
        children: [
            {
                path: '', // Default child route
                component: () => import('../App.vue'), // Lazy load App.vue if needed
            },
            // Other child routes can be added here
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;