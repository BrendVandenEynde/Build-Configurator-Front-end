<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
  price: String,
  size: String,
  canvasClass: String,
  link: String, // The link can be internal (e.g., "/sneaker-config") or external (e.g., full URL)
});

const handleButtonClick = () => {
  // Redirect to the specified link in the same tab
  window.location.href = props.link;
};
</script>

<template>
  <div class="model-container-model">
    <canvas :class="['model-container-model-canvas', canvasClass]"></canvas>
    <div class="model-container-model-info">
      <h2>{{ title }}</h2>
      <p>Price: {{ price }}</p>
      <p>Size: {{ size }}</p>
      <button class="model-container-model-button" @click="handleButtonClick">
        Start configuration
      </button>
    </div>
  </div>
</template>

<style scoped>
.model-container-model {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.model-container-model-canvas {
  width: 300px;
  height: 300px;
}

.model-container-model-info {
  text-align: center;
}

.model-container-model-button {
  font-family: 'Helvetica', sans-serif;
  font-size: 1rem;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #000;
  color: #6af244;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.model-container-model-button:hover {
  background-color: #0056b3;
}
</style>
