import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../components/Layout.vue';
import HomeView from '../views/HomeView.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue'; // Import the Dashboard component

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
            {
                path: 'dashboard', // New route for the dashboard
                name: 'Dashboard',
                component: Dashboard, // This should render when accessing '/dashboard'
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;