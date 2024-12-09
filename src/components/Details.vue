<script setup>
import { defineProps, ref, onMounted } from 'vue';
import axios from 'axios';  // Using axios for API calls

// Set the base URL for axios requests globally (you can also do this in a global configuration file)
axios.defaults.baseURL = 'https://build-configurator-back-end.onrender.com/api/v1';

// Define the props
const props = defineProps({
    order: {
        type: Object,
        required: true,
    },
    close: {
        type: Function,
        required: true,
    },
    updateOrderStatus: {
        type: Function,
        required: true, // The method to update order status passed from Dashboard
    }
});

const ship = async () => {
    console.log('Shipped clicked');

    // Retrieve token from localStorage
    const token = localStorage.getItem('authToken');  // Use localStorage to get the token

    if (!token) {
        console.error('Authorization token is missing');
        return;
    }

    try {
        // Make an API call to update the order status to 'shipped' in the backend
        const response = await axios.put(
            `/orders/${props.order._id}`,  // Use base URL set earlier
            { status: 'shipped' },
            {
                headers: {
                    Authorization: `Bearer ${token}`,  // Add the token in the Authorization header
                }
            }
        );

        if (response.status === 200) {
            console.log('Order status updated successfully');
            // Notify the parent (Dashboard) to update the status in the UI
            props.updateOrderStatus(props.order._id, 'shipped');
            // Close the detailed card view after the "Shipped" action
            props.close();
        }
    } catch (error) {
        console.error('Error updating order status:', error.response?.data || error.message);
        // Optionally, you can handle the error here (show a message, etc.)
    }
};

// Function to handle "Cancel" button
const remove = async () => {
    console.log('Remove / Cancel clicked');

    // Retrieve token from localStorage
    const token = localStorage.getItem('authToken');

    if (!token) {
        console.error('Authorization token is missing');
        return;
    }

    try {
        // Make an API call to update the order status to 'cancelled' in the backend
        const response = await axios.put(
            `/orders/${props.order._id}`,  // Use base URL set earlier
            { status: 'cancelled' },
            {
                headers: {
                    Authorization: `Bearer ${token}`,  // Add the token in the Authorization header
                }
            }
        );

        if (response.status === 200) {
            console.log('Order status updated to cancelled successfully');
            // Notify the parent (Dashboard) to update the status in the UI
            props.updateOrderStatus(props.order._id, 'cancelled');
            // Close the detailed card view after the "Cancelled" action
            props.close();
        }
    } catch (error) {
        console.error('Error updating order status:', error.response?.data || error.message);
        // Optionally, you can handle the error here (show a message, etc.)
    }
};

// Canvas reference for the shoe/heel visualization
const canvasRef = ref(null);

// Function to draw the configured shoe on the canvas based on the order's model type
const drawShoe = () => {
    const canvas = canvasRef.value;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        // Clear the canvas before drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the appropriate shoe type (heel or sneaker)
        if (props.order.modelType === 'heel') {
            drawHeel(ctx, props.order.heelLayers);
        } else if (props.order.modelType === 'sneaker') {
            drawSneaker(ctx, props.order.sneakerLayers);
        }
    }
};

// Function to draw the heel model
const drawHeel = (ctx, layers) => {
    if (layers) {
        // Example drawing for heel model (you can extend this logic based on layers structure)
        ctx.fillStyle = layers.Object_2.color;
        ctx.fillRect(20, 50, 60, 30); // Drawing a rectangle for demo
        ctx.fillStyle = layers.Object_3.color;
        ctx.fillRect(20, 20, 60, 30);
    }
};

// Function to draw the sneaker model
const drawSneaker = (ctx, layers) => {
    if (!layers) return; // Safety check for layers

    // Example drawing for sneaker model (you can extend this logic based on layers structure)
    if (layers.sole1) {
        ctx.fillStyle = layers.sole1.color;
        ctx.fillRect(20, 70, 160, 20); // Sole rectangle
    }
    if (layers.outside1) {
        ctx.fillStyle = layers.outside1.color;
        ctx.fillRect(20, 40, 160, 30); // Outside part
    }
    if (layers.outside2) {
        ctx.fillStyle = layers.outside2.color;
        ctx.fillRect(20, 10, 160, 30); // Another outside part
    }
    if (layers.inside) {
        ctx.fillStyle = layers.inside.color;
        ctx.fillRect(40, 50, 120, 20); // Inside part
    }
    if (layers.laces) {
        ctx.fillStyle = layers.laces.color;
        ctx.fillRect(40, 35, 120, 10); // Laces part
    }
};

// Call the draw function when the component is mounted
onMounted(() => {
    drawShoe();
});
</script>

<template>
    <div class="order-card-detailed" @click.self="close">
        <div class="card">
            <div class="details">
                <h2>Order Details</h2>
                <p><strong>Order Number:</strong> {{ order.orderNumber }}</p>
                <p><strong>Customer Name:</strong> {{ order.customerName }}</p>
                <p><strong>Customer Email:</strong> {{ order.customerEmail }}</p>
                <p><strong>Shoe Size:</strong> {{ order.shoeSize }}</p>
                <p><strong>Status:</strong> {{ order.status }}</p>
                <p><strong>Created At:</strong> {{ order.createdAt }}</p>
                <p><strong>Model Type:</strong> {{ order.modelType }}</p>
                <div class="canvas-container">
                    <canvas ref="canvasRef" width="200" height="100"></canvas>
                </div>
            </div>
            <div class="actions">
                <button @click="remove" class="btn cancel">Cancel</button>
                <button @click="ship" class="btn ship">Shipped</button>
            </div>
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
    z-index: 999;
}

.card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    padding: 20px;
    max-width: 600px;
    width: 90%;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;
}

.card:hover {
    transform: scale(1.02);
}

.details {
    flex-grow: 1;
}

.canvas-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 6px;
    background: #f9f9f9;
}

.actions {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s, transform 0.2s;
}

.btn:hover {
    transform: translateY(-2px);
}

.cancel {
    background-color: #ff4d4d;
    color: white;
}

.cancel:hover {
    background-color: #ff1a1a;
}

.ship {
    background-color: #4caf50;
    color: white;
}

.ship:hover {
    background-color: #388e3c;
}
</style>