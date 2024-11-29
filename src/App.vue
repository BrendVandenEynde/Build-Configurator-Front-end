<script setup>

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
            <div class="model-container-model">
                <div class="model-container-model-canvas"></div>
                <div class="model-container-model-info">
                    <h2>Model 1</h2>
                    <p>Price: 100$</p>
                    <p>Size: 37-42</p>
                    <button class="model-container-model-button">Start configuration</button>
                </div>
            </div>
            <div class="model-container-model">
                <div class="model-container-model-canvas"></div>
                <div class="model-container-model-info">
                    <h2>Model 2</h2>
                    <p>Price: 120$</p>
                    <p>Size: 37-45</p>
                    <button class="model-container-model-button">Start configuration</button>
                </div>
            </div>
        </div>
    </div>

</template>

