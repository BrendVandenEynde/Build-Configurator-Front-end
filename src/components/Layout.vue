<template>
    <header class="headerMainfront">
        <div class="headerMain_logo">
            <img src="https://sneaker-configurator.vercel.app/media/SWEAR_Logo.webp" alt="Swear logo"
                class="headerLogo">
        </div>
        <button class="headerMain_login" @click="navigateToLogin">Login</button>
    </header>

    <main>
        <RouterView /> <!-- Use this to render child routes -->
    </main>

    <footer>
        <!-- Optional footer -->
    </footer>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToLogin = () => {
    console.log("Navigating to login...");
    router.push('/login');
};
</script>

<style scoped>

</style>