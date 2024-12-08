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
      <button class="login-button" @click="handleLogin">Login</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'; // Import axios for API calls

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    // Send login request to backend (replace with real endpoint)
    const response = await axios.post('https://build-configurator-back-end.onrender.com/api/v1/users/login', {
      username: username.value,
      password: password.value,
    });

    if (response.status === 200) {
      // Store the JWT token in localStorage
      localStorage.setItem('authToken', response.data.token);

      // Redirect to the dashboard
      router.push('/dashboard');
    }
  } catch (error) {
    errorMessage.value = 'Invalid username or password.'; // Show error message
  }
};
</script>

<style scoped>
/* Prevent scrolling on body and html */
html,
body {
  height: 100%;
  margin: 0;
  overflow: hidden;
  /* Prevent scrolling */
  font-family: 'Helvetica', sans-serif;;
}

.login-container {
  position: relative;
  width: 100%;
  height: 100vh;
  /* Full viewport height */
  overflow: hidden;
  /* Prevent scrolling within the container */
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  object-fit: cover;
  /* Cover the entire area without distortion */
  z-index: -1;
  /* Place the video behind the login form */

  
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
  /* Allow form to occupy full height */
  color: #000;
  text-align: center;
  padding: 20px;
  /* Optional padding for aesthetics */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  /* Optional shadow for depth */

  width: 350px;
  height: 250px;
  margin: 0 auto;
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
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
  margin-top: 10;
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