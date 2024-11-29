<script setup>
import { onMounted } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const loadModel = (canvas, modelPath) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

  // Set renderer size to match the canvas dimensions
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  camera.position.z = 2;

  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  let model; // To store the loaded model for rotation

  // Load the 3D model
  const loader = new GLTFLoader();
  loader.load(
    modelPath,
    (gltf) => {
      // Scale and position the model
      model = gltf.scene;
      model.scale.set(0.25, 0.25, 0.25);
      model.position.set(0, -0.8, 0);

      //Override materials to remove color
      model.traverse((child) => {
      if (child.isMesh) {
      child.material = new THREE.MeshBasicMaterial({ color: 0xA9A9A9 }); // White material
      child.material.side = THREE.DoubleSide; // Render both sides of the mesh
      }
    });

      scene.add(model);

      animate(); // Start the animation loop once the model is loaded
    },
    undefined,
    (error) => {
      console.error('Error loading the model:', error);
    }
  );

  // Add rotation logic
  const animate = () => {
    requestAnimationFrame(animate);

    if (model) {
      model.rotation.y += 0.001; // Rotate model around the Y-axis
    }

    renderer.render(scene, camera);
  };

  // Add OrbitControls for user interaction
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Smooth the camera movement
  controls.dampingFactor = 0.1;
  controls.rotateSpeed = 0.5;

  controls.update();
};

onMounted(() => {
  // Select the canvas elements
  const canvas1 = document.querySelector('.canvas1');
  const canvas2 = document.querySelector('.canvas2');

  // Load models for each canvas
  if (canvas1) loadModel(canvas1, '/model/shoes_with_heart_heel/scene.gltf');
  if (canvas2) loadModel(canvas2, '/model/nike_shoe/scene.gltf');
});
</script>

<template>
  <header class="headerMainfront">
    <div class="headerMain_logo">
      <img src="https://sneaker-configurator.vercel.app/media/SWEAR_Logo.webp" alt="Swear logo" class="headerLogo">
    </div>
    <a href="/login">
      <button class="headerMain_login">Login</button>
    </a>
  </header>
  
  <div class="models-container">
    <h1>Model we offer to configure.</h1>
    <div class="model-container-flexbox">
      <!-- Model 1 -->
      <div class="model-container-model">
        <canvas class="model-container-model-canvas canvas1"></canvas>
        <div class="model-container-model-info">
          <h2>Heart heel</h2>
          <p>Price: 240$</p>
          <p>Size: 37-42</p>
          <button class="model-container-model-button">Start configuration</button>
        </div>
      </div>
      <!-- Model 2 -->
      <div class="model-container-model">
        <canvas class="model-container-model-canvas canvas2"></canvas>
        <div class="model-container-model-info">
          <h2>Swear Nike</h2>
          <p>Price: 160$</p>
          <p>Size: 37-45</p>
          <button class="model-container-model-button">Start configuration</button>
        </div>
      </div>
    </div>
  </div>
</template>
