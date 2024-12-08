<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import OrderCard from '../components/CardOrder.vue';
import OrderCardDetailed from '../components/Details.vue';

const orders = ref([]);
const inProductionOrders = ref([]);
const shippedDeliveredOrders = ref([]);
const cancelledOrders = ref([]);
const selectedOrder = ref(null);
const showDetails = ref(false);

const fetchOrders = async () => {
    try {
        const response = await axios.get(
            'https://build-configurator-back-end.onrender.com/api/v1/orders'
        );
        orders.value = response.data?.data?.orders || [];

        // Categorize orders
        inProductionOrders.value = orders.value.filter(
            (order) => order.status === 'in production'
        );
        shippedDeliveredOrders.value = orders.value.filter((order) =>
            ['shipped', 'delivered'].includes(order.status)
        );
        cancelledOrders.value = orders.value.filter(
            (order) => order.status === 'cancelled'
        );
    } catch (error) {
        console.error(
            'Error fetching orders:',
            error.response || error.message || error
        );
    }
};

// Function to open detailed view
const openDetailView = (order) => {
    selectedOrder.value = order;
    showDetails.value = true;
};

// Function to close detailed view
const closeDetailView = () => {
    showDetails.value = false;
    selectedOrder.value = null;
};

onMounted(fetchOrders);
</script>

<template>
    <div class="dashboard-container">
        <h1>Dashboard</h1>

        <h2>In Production</h2>
        <div class="order-list">
            <OrderCard v-for="order in inProductionOrders" :key="order._id" :orderNumber="order.orderNumber"
                :customerName="order.customerName" :customerEmail="order.customerEmail" :shoeSize="order.shoeSize"
                :status="order.status" :createdAt="order.createdAt" :modelType="order.modelType"
                :canvasClass="'canvas-' + order._id"
                :layers="order.modelType === 'sneaker' ? order.layers : order.heelLayers"
                @click="openDetailView(order)" />
        </div>

        <h2>Shipped and Delivered</h2>
        <div class="order-list">
            <OrderCard v-for="order in shippedDeliveredOrders" :key="order._id" :orderNumber="order.orderNumber"
                :customerName="order.customerName" :customerEmail="order.customerEmail" :shoeSize="order.shoeSize"
                :status="order.status" :createdAt="order.createdAt" :modelType="order.modelType"
                :canvasClass="'canvas-' + order._id"
                :layers="order.modelType === 'sneaker' ? order.layers : order.heelLayers"
                @click="openDetailView(order)" />
        </div>

        <h2>Cancelled</h2>
        <div class="order-list">
            <OrderCard v-for="order in cancelledOrders" :key="order._id" :orderNumber="order.orderNumber"
                :customerName="order.customerName" :customerEmail="order.customerEmail" :shoeSize="order.shoeSize"
                :status="order.status" :createdAt="order.createdAt" :modelType="order.modelType"
                :canvasClass="'canvas-' + order._id"
                :layers="order.modelType === 'sneaker' ? order.layers : order.heelLayers"
                @click="openDetailView(order)" />
        </div>

        <!-- Conditional rendering of the OrderCardDetailed component -->
        <OrderCardDetailed v-if="showDetails" :order="selectedOrder" :close="closeDetailView" />
    </div>
</template>

<style scoped>
.dashboard-container {
    padding: 20px;
}

h2 {
    margin-top: 20px;
    font-size: 1.5em;
    color: #333;
}

.order-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
</style>