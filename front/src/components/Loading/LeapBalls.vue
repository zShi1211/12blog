<script setup lang='ts'>
</script>

<template>
        <div class="leap-balls">
            <div class="balls">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
            </div>
            <div class="shadows">
                <div class="shadow"></div>
                <div class="shadow"></div>
                <div class="shadow"></div>
            </div>
        </div>
</template>

<style  scoped>
.leap-balls {
    width: 150px;
    height: 100px;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 50% 50%;
}

.balls,
.shadows {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 100%;
    justify-items: center;
    align-items: end;
}

.circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #fff;
    animation: balls-leap 0.5s alternate-reverse infinite ease;
}

.shadow {
    width: 20px;
    height: 4px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.4);
    animation: balls-shadow 0.5s alternate-reverse infinite ease;
}

.shadow:nth-child(2),
.circle:nth-child(2) {
    animation-delay: 0.2s;
}
.shadow:nth-child(3),
.circle:nth-child(3) {
    animation-delay: 0.3s;
}

@keyframes balls-leap {
    0% {
        border-radius: 50px 50px 25px 25px;
        transform: translateY(45px);
    }

    40% {
        border-radius: 50%;
    }

    100% {
        transform: translateY(0px);
    }
}

@keyframes balls-shadow {
    0% {
        transform: scaleX(1.1);
        opacity: 0.7;
    }

    100% {
        transform: scaleX(0.2);
        opacity: 0.4;
    }
}
</style>