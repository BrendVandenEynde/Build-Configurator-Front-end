<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const loading = ref(false); // Loading state
const router = useRouter();

const handleLogin = async () => {
  errorMessage.value = ''; // Reset error message
  if (!username.value || !password.value) {
    errorMessage.value = 'Username and password are required.';
    return;
  }

  loading.value = true; // Start loading
  try {
    const response = await axios.post(
      'https://build-configurator-back-end.onrender.com/api/v1/users/login',
      {
        username: username.value,
        password: password.value,
      }
    );

    if (response.status === 200) {
      localStorage.setItem('authToken', response.data.data.token);
      router.push('/dashboard');
    }
  } catch (error) {
    if (error.response) {
      console.error('Error Response:', error.response); // Log the full error response for debugging
      errorMessage.value = error.response.data.message || 'An error occurred. Please try again.';
    } else {
      // Handle errors not related to server response
      console.error('Network Error:', error); // Log network errors for debugging
      errorMessage.value = 'Network error. Please check your connection.';
    }
  } finally {
    loading.value = false; // Stop loading
  }
};
</script>

<template>
  <div class="login-container">
    <video autoplay muted loop class="background-video">
      <source src="../../public/assets/SwearLondonVideo.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div class="login-form">
      <h1>Login</h1>
      <input type="text" placeholder="Username" v-model="username" class="input-field" />
      <input type="password" placeholder="Password" v-model="password" class="input-field" />
      <button class="login-button" @click="handleLogin" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<style scoped>
/* Prevent scrolling on body and html */
html,
body {
  height: 100%;
  margin: 0;
  overflow: hidden;
  font-family: 'Helvetica', sans-serif;
}

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
  background-color: rgba(0, 0, 0, 0.5);
}

.login-form {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #000;
  text-align: center;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 350px;
  height: 250px;
  margin: 0 auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #6af244;
  border: 2px solid #000;
}

.input-field {
  margin: 10px 0;
  padding: 10px;
  width: 200px;
  border: none;
  border-radius: 5px;
}

.login-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #000;
  color: #6af244;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>