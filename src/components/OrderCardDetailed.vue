<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    order: {
        type: Object,
        required: true,
    },
    close: {
        type: Function,
        required: true,
    },
});

// Placeholder functions for the buttons
const remove = () => {
    console.log('Remove / Cancel clicked');
};

const ship = () => {
    console.log('Shipped clicked');
};
</script>

<template>
    <div class="order-card-detailed" @click.self="close">
        <div class="details">
            <h2>Order Details</h2>
            <p><strong>Order Number:</strong> {{ order.orderNumber }}</p>
            <p><strong>Customer Name:</strong> {{ order.customerName }}</p>
            <p><strong>Customer Email:</strong> {{ order.customerEmail }}</p>
            <p><strong>Shoe Size:</strong> {{ order.shoeSize }}</p>
            <p><strong>Status:</strong> {{ order.status }}</p>
            <p><strong>Created At:</strong> {{ order.createdAt }}</p>
            <p><strong>Model Type:</strong> {{ order.modelType }}</p>
            <!-- Add other details as needed -->
        </div>
        <div class="actions">
            <button @click="remove">Remove / Cancel</button>
            <button @click="ship">Shipped</button>
        </div>
    </div>
</template>

<style scoped>
.order-card-detailed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
}

.details {
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.actions {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
}

button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>
