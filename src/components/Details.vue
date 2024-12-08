<script setup>
import { defineProps, ref, onMounted } from 'vue';

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

// Ref for the canvas element
const canvasRef = ref(null);

// Function to draw the configured shoe on the canvas
const drawShoe = () => {
    const canvas = canvasRef.value;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the shoe based on the model type and layers
        if (props.order.modelType === 'heel') {
            drawHeel(ctx, props.order.heelLayers);
        } else if (props.order.modelType === 'sneaker') {
            drawSneaker(ctx, props.order.sneakerLayers);
        }
    }
};

// Function to draw a heel model
const drawHeel = (ctx, layers) => {
    // Assuming layers are structured as an object with different parts
    ctx.fillStyle = layers.Object_2.color; // Example for color of a specific part
    ctx.fillRect(20, 50, 60, 30); // Drawing a rectangle for demo

    // Draw other parts similarly...
    ctx.fillStyle = layers.Object_3.color; // Change color for another part
    ctx.fillRect(20, 20, 60, 30);
};

// Function to draw a sneaker model
const drawSneaker = (ctx, layers) => {
    if (!layers) return; // Safety check for layers

    console.log(layers); // Debugging to check sneaker layer data
    
    // Drawing sole part
    if (layers.sole1) {
        ctx.fillStyle = layers.sole1.color;
        ctx.fillRect(20, 70, 160, 20); // Sole rectangle (adjust coordinates as needed)
    }
    
    // Drawing outside1 part
    if (layers.outside1) {
        ctx.fillStyle = layers.outside1.color;
        ctx.fillRect(20, 40, 160, 30); // Outside part (adjust coordinates as needed)
    }

    // Drawing outside2 part
    if (layers.outside2) {
        ctx.fillStyle = layers.outside2.color;
        ctx.fillRect(20, 10, 160, 30); // Another outside part (adjust coordinates as needed)
    }

    // Drawing inside part
    if (layers.inside) {
        ctx.fillStyle = layers.inside.color;
        ctx.fillRect(40, 50, 120, 20); // Inside part (adjust coordinates as needed)
    }

    // Drawing laces part
    if (layers.laces) {
        ctx.fillStyle = layers.laces.color;
        ctx.fillRect(40, 35, 120, 10); // Laces position (adjust coordinates as needed)
    }
};

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
                <button @click="remove" class="btn cancel">Remove / Cancel</button>
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
    /* Ensure it's on top of other elements */
}

.card {
    background: white;
    border-radius: 12px;
    /* Rounded corners */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    padding: 20px;
    max-width: 600px;
    /* Adjust the width as needed */
    width: 90%;
    /* Responsive width */
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;
    /* Smooth animation */
}

.card:hover {
    transform: scale(1.02);
    /* Slightly enlarge on hover */
}

.details {
    flex-grow: 1;
    /* Allow details to grow */
}

.canvas-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    /* Optional border for the canvas */
    padding: 10px;
    /* Padding around the canvas */
    border-radius: 6px;
    /* Rounded corners for the canvas container */
    background: #f9f9f9;
    /* Light background for contrast */
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
    /* Rounded button corners */
    cursor: pointer;
    font-size: 1em;
    /* Button text size */
    transition: background-color 0.3s, transform 0.2s;
    /* Smooth transition */
}

.btn:hover {
    transform: translateY(-2px);
    /* Slight lift effect on hover */
}

.cancel {
    background-color: #ff4d4d;
    /* Red background for cancel */
    color: white;
}

.cancel:hover {
    background-color: #ff1a1a;
    /* Darker red on hover */
}

.ship {
    background-color: #4caf50;
    /* Green background for shipped */
    color: white;
}

.ship:hover {
    background-color: #388e3c;
    /* Darker green on hover */
}
</style>