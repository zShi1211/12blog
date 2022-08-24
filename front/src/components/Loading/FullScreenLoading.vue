<script setup lang='ts'>
</script>

<template>
    <div class="fullScreenLoadingWrapper">
        <div class="dot"></div>
    </div>
</template>

<style  scoped>
.fullScreenLoadingWrapper {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    background-color: var(--color6);
}

.dot {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    animation: scale 0.8s infinite linear alternate;
    border-radius: 50%;
    background: var(--color2);
}

@keyframes scale {
    0% {
        transform: scale(0.4);
    }

    100% {
        transform: scale(1);
    }
}
</style>