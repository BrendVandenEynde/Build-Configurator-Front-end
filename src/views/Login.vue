<template>
  <div class="login-container">
      <video autoplay muted loop class="background-video">
          <source src="../assets/background-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
      </video>
      <div class="login-form">
          <h1>Login</h1>
          <input type="text" placeholder="Username" v-model="username" />
          <input type="password" placeholder="Password" v-model="password" />
          <button @click="handleLogin">Login</button>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const handleLogin = () => {
  console.log('Login attempted with:', username.value, password.value);
};
</script>

<style scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.login-form {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
  text-align: center;
}

input {
  margin: 10px 0;
  padding: 10px;
  width: 200px;
  border: none;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>