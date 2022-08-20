<script setup lang='ts'>

</script>

<template>
      <div class="loading two-balls">
            <div class="pink"></div>
            <div class="blue"></div>
        </div>
</template>

<style  scoped>
.two-balls {
    position: relative;
    width: 44px;
}

.two-balls div {
    position: absolute;
    top: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    animation: two-balls-pink 1.05s ease-in-out infinite;
}

.two-balls .pink {
    background-color: #d71345;
    left: -2px;
}

.two-balls .blue {
    animation-name: two-balls-blue;
    background-color: #2a5caa;
    right: -2px;
}

@keyframes two-balls-pink {
    from {
        z-index: 1;
    }

    50% {
        transform: translateX(calc(20px + 3 * 2px));
    }
}

@keyframes two-balls-blue {
    50% {
        transform: translateX(calc(-20px - 3 * 2px));
    }
}
</style>