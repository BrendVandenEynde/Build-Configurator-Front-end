<script setup>
import { defineProps, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const props = defineProps({
    orderNumber: String,
    customerName: String,
    customerEmail: String,
    shoeSize: Number,
    status: String,
    createdAt: String,
    modelType: String, // "sneaker" or "heel"
    canvasClass: String, // CSS class for the canvas element
    layers: Object, // Contains the materials and colors from the API
});

// References for cleanup
let renderer, scene, camera, animationId;
let model = null;

const initializeThreeJS = () => {
    const canvas = document.querySelector(`.${props.canvasClass}`);
    if (!canvas) {
        console.error(`Canvas element not found for: ${props.canvasClass}`);
        return;
    }

    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf9f9f9);

    camera = new THREE.PerspectiveCamera(
        45,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 3);

    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    const gltfLoader = new GLTFLoader();
    const modelPath =
        props.modelType === 'sneaker'
            ? '/model/shoe-optimized-arne.glb'
            : '/model/shoes_with_heart_heel/scene.gltf';

    gltfLoader.load(
        modelPath,
        (gltf) => {
            model = gltf.scene;

            // Scale down the heel model and rotate the sneaker model
            if (props.modelType === 'heel') {
                model.scale.set(0.2, 0.2, 0.2); // Scale down the heel model
            } else if (props.modelType === 'sneaker') {
                model.scale.set(0.5, 0.5, 0.5); // Scale the sneaker model
                model.rotation.y = THREE.MathUtils.degToRad(60); // Rotate the sneaker model
            }

            model.position.set(0, -0.5, 0);
            scene.add(model);

            if (props.layers) {
                applyColors(model, props.layers);
            }

            const animate = () => {
                renderer.render(scene, camera);
                animationId = requestAnimationFrame(animate); // Keep animating
            };
            animate();
        },
        undefined,
        (error) => {
            console.error('Error loading model:', error);
        }
    );
};

const applyColors = (model, layers) => {
    let materialColors = {};

    if (props.modelType === 'sneaker') {
        materialColors = {
            inside: layers.inside?.color || "undefined",
            laces: layers.laces?.color || "undefined",
            outside1: layers.outside1?.color || "undefined",
            outside2: layers.outside2?.color || "undefined",
            sole1: layers.sole1?.color || "undefined",
            sole2: layers.sole2?.color || "undefined",
        };
    } else if (props.modelType === 'heel') {
        materialColors = {
            object_2: layers.Object_2?.color || "undefined",
            object_3: layers.Object_3?.color || "undefined",
            object_4: layers.Object_4?.color || "undefined",
            object_5: layers.Object_5?.color || "undefined",
        };
    }

    // console.log("Material Colors:", materialColors); // Log the colors being applied

    model.traverse((child) => {
        if (child.isMesh && child.material) {
            const layerName = child.name.toLowerCase();
            //   console.log(`Child name: ${layerName}`);

            // Check if the material color is defined
            if (materialColors[layerName]) {
                child.material.dispose(); // Dispose old material
                const colorValue = materialColors[layerName];

                if (typeof colorValue === 'string' || colorValue instanceof String) {
                    child.material = new THREE.MeshStandardMaterial({
                        color: new THREE.Color(colorValue),
                    });
                    //        console.log(`Applied color ${colorValue} to ${layerName}`);
                } else {
                    //       console.log(`Invalid color value for ${layerName}: ${colorValue}`);
                }
            } else {
                // Optionally apply a default color
                //    console.log(`No color defined for layer: ${layerName}, applying default color.`);
                child.material = new THREE.MeshStandardMaterial({ color: new THREE.Color('white') });
            }
        }
    });
};

// Cleanup resources on component unmount
const cleanupThreeJS = () => {
    if (animationId) cancelAnimationFrame(animationId);
    if (renderer) renderer.dispose();
    if (scene) {
        scene.traverse((object) => {
            if (object.isMesh) {
                object.geometry.dispose();
                if (Array.isArray(object.material)) {
                    object.material.forEach((mat) => mat.dispose());
                } else if (object.material) {
                    object.material.dispose();
                }
            }
        });
    }
    scene = null;
    camera = null;
    model = null;
};

onMounted(() => {
    initializeThreeJS();
    window.addEventListener('resize', onResize);
});

onUnmounted(() => {
    cleanupThreeJS();
    window.removeEventListener('resize', onResize);
});

// Handle window resize
const onResize = () => {
    const canvas = document.querySelector(`.${props.canvasClass}`);
    if (canvas && renderer && camera) {
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
};
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