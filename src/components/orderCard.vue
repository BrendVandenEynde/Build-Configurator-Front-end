<script setup>
import { defineProps, onMounted } from 'vue';

const props = defineProps({
    orderNumber: String,
    customerName: String,
    customerEmail: String,
    shoeSize: Number,
    status: String,
    createdAt: String,
    modelType: String,
    canvasClass: String, // Optional for custom canvas styles
});

const initializeThreeJS = () => {
    // Add Three.js logic here
    const canvas = document.querySelector(`.${props.canvasClass}`);
    if (canvas) {
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();
    }
};

onMounted(() => {
    initializeThreeJS();
});
</script>

<template>
    <div class="order-card">
        <canvas :class="['order-card-canvas', canvasClass]"></canvas>
        <div class="order-card-info">
            <h3>Order #{{ orderNumber }}</h3>
            <p><strong>Customer:</strong> {{ customerName }}</p>
            <p><strong>Email:</strong> {{ customerEmail }}</p>
            <p><strong>Shoe Size:</strong> {{ shoeSize }}</p>
            <p><strong>Status:</strong> {{ status }}</p>
            <p><strong>Created At:</strong> {{ new Date(createdAt).toLocaleString() }}</p>
            <p><strong>Model Type:</strong> {{ modelType }}</p>
        </div>
    </div>
</template>

<style scoped>
.order-card {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 15px;
    margin: 10px 0;
    background-color: #f9f9f9;
    transition: box-shadow 0.2s ease-in-out;
}

.order-card:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.order-card-canvas {
    width: 150px;
    height: 150px;
    margin-right: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
}

.order-card-info h3 {
    margin: 0 0 10px;
}

.order-card-info p {
    margin: 5px 0;
}
</style>