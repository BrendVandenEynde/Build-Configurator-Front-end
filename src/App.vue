<script setup>
import { onMounted } from 'vue';
import ModelCard from './components/ModelCard.vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const loadModel = (canvas, modelPath) => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  camera.position.z = 2;

  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  let model;

  const loader = new GLTFLoader();
  loader.load(
    modelPath,
    (gltf) => {
      model = gltf.scene;
      model.scale.set(0.25, 0.25, 0.25);
      model.position.set(0, -0.8, 0);

      model.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshBasicMaterial({ color: 0xA9A9A9 });
          child.material.side = THREE.DoubleSide;
        }
      });

      scene.add(model);
      animate();
    },
    undefined,
    (error) => {
      console.error('Error loading the model:', error);
    }
  );

  const animate = () => {
    requestAnimationFrame(animate);
    if (model) {
      model.rotation.y += 0.001;
    }
    renderer.render(scene, camera);
  };

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.rotateSpeed = 0.5;

  controls.update();
};

onMounted(() => {
  const canvas1 = document.querySelector('.canvas1');
  const canvas2 = document.querySelector('.canvas2');

  if (canvas1) loadModel(canvas1, '/model/shoes_with_heart_heel/scene.gltf');
  if (canvas2) loadModel(canvas2, '/model/shoe-optimized-arne.glb');
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
    <h1>Models we offer to configure.</h1>
    <div class="model-container-flexbox">
      <!-- Model Card for Heart Heel -->
      <ModelCard title="Heart Heel" price="240$" size="37-42" canvasClass="canvas1" link="/heart-heel-config" />
      <!-- Model Card for Sneaker -->
      <ModelCard title="Sneaker" price="180$" size="38-46" canvasClass="canvas2"
        link="https://build-sneaker-model-config.onrender.com/" />
    </div>
  </div>
</template>

<style>
.models-container {
  text-align: center;
}

.model-container-flexbox {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.headerMainfront {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.headerMain_logo img {
  height: 40px;
}

.headerMain_login {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.headerMain_login:hover {
  background-color: #0056b3;
}
</style>