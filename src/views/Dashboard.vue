<template>
    <div class="dashboard-container">
        <h1>Dashboard</h1>

        <h2>All Orders</h2>
        <ul>
            <li v-for="order in orders" :key="order._id">
                Order Number: {{ order.orderNumber }} - Customer: {{ order.customerName }} - Status: {{ order.status }}
            </li>
        </ul>

        <h2>In Production</h2>
        <ul>
            <li v-for="order in inProductionOrders" :key="order._id">
                Order Number: {{ order.orderNumber }} - Customer: {{ order.customerName }}
            </li>
        </ul>

        <h2>Shipped and Delivered</h2>
        <ul>
            <li v-for="order in shippedDeliveredOrders" :key="order._id">
                Order Number: {{ order.orderNumber }} - Customer: {{ order.customerName }} - Status: {{ order.status }}
            </li>
        </ul>

        <h2>Cancelled</h2>
        <ul>
            <li v-for="order in cancelledOrders" :key="order._id">
                Order Number: {{ order.orderNumber }} - Customer: {{ order.customerName }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const orders = ref([]);
const inProductionOrders = ref([]);
const shippedDeliveredOrders = ref([]);
const cancelledOrders = ref([]);

const fetchOrders = async () => {
    try {
        const response = await axios.get('https://build-configurator-back-end.onrender.com/api/v1/orders'); // Full URL
        console.log('API Response:', response); // Log the full response

        orders.value = response.data?.data?.orders || []; // Use optional chaining
        inProductionOrders.value = orders.value.filter(order => order.status === 'in production');
        shippedDeliveredOrders.value = orders.value.filter(order => ['shipped', 'delivered'].includes(order.status));
        cancelledOrders.value = orders.value.filter(order => order.status === 'cancelled');
    } catch (error) {
        console.error('Error fetching orders:', error.response || error.message || error);
    }
};

onMounted(fetchOrders);
</script>

<style scoped>
.dashboard-container {
    padding: 20px;
}

h2 {
    margin-top: 20px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin: 5px 0;
}
</style>