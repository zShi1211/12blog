<script setup lang='ts'>
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const dateBack = ref(false);

const deg = 6;
const hour = ref();
const minuteute = ref();
const secondond = ref();
let timer: any;
onMounted(() => {
    timer = setInterval(() => {
        let day = new Date()
        let hh = day.getHours() * 30
        let mm = day.getMinutes() * deg
        let ss = day.getSeconds() * deg
        hour.value.style.transform = `rotateZ(${hh + (mm / 12)}deg)`
        minuteute.value.style.transform = `rotateZ(${mm}deg)`
        secondond.value.style.transform = `rotateZ(${ss}deg)`
    }, 1000)
})

onUnmounted(() => {
    clearInterval(timer);
})

function dateBackHandle() {
    dateBack.value = true;
    clearInterval(timer);
    setTimeout(() => {
        router.push('/share');
    }, 800)
}

</script>

<template>
    <div class="ClockWrapper">
        <div class="container" :class="{ back: dateBack }">
            <div class="box" @click="dateBackHandle">
                <div class="clock">
                    <div class="hour" ref="hour">
                    </div>
                    <div class="minute" ref="minuteute">
                    </div>
                    <div class="second" ref="secondond">
                    </div>
                </div>
            </div>

        </div>
        <p class="link" @click="dateBackHandle">回到过去</p>
    </div>
</template>

<style  scoped>
.ClockWrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--color7);
    position: relative;
    overflow: hidden;
}

.ClockWrapper::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, var(--color9), var(--color9) 50%, var(--color8) 50%, var(--color8));
    clip-path: polygon(100% 0%, 100% 100%, 0% 100%, 0% 80%);
    animation: animate 5s ease-in-out infinite;
}


@keyframes animate {

    0%,
    100% {
        transform: translateY(10px);
    }

    50% {
        transform: translateY(-10px);
    }
}


.container {
    position: relative;
    width: 300px;
    height: 300px;
}

.container::before {
    content: '';
    position: absolute;
    bottom: -35%;
    width: 100%;
    height: 60px;
    background: radial-gradient(rgba(0, 0, 0, 0.2), transparent, transparent);
    border-radius: 50%;
}

.box {
    position: relative;
    backdrop-filter: blur(50px);
    -webkit-backdrop-filter: blur(50px);
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.5);
    animation: animate 5s ease-in-out infinite;
    animation-delay: -2.5s;
    z-index: 1;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.clock {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    background: radial-gradient(transparent, rgba(255, 255, 255, 0.2)), url('@/assets/img/clock.png');
    background: url('@/assets/img/clock.png');
    background-size: cover;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-bottom: none;
    border-right: none;
    box-shadow: -10px -10px 20px rgba(255, 255, 255, 0.1), 10px 10px 20px rgba(0, 0, 0, 0.1), 0px 40px 50px rgba(0, 0, 0, 0.2);
}

.clock::before {
    content: '';
    position: absolute;
    width: 15px;
    height: 15px;
    background-color: #fff;
    border-radius: 50%;
    z-index: 10000;
}

.hour,
.minute,
.second {
    position: absolute;
    display: flex;
    justify-content: center;
    position: absolute;
    border-radius: 50%;
}

.hour {
    width: 35%;
    height: 35%;
}

.minute {
    width: 45%;
    height: 45%;
}

.second {
    width: 60%;
    height: 60%;
}

.hour::before {
    content: "";
    position: absolute;
    width: 8px;
    height: 50%;
    background-color: #ff105e;
    border-radius: 6px;
    z-index: 11;
}

.minute::before {
    content: "";
    position: absolute;
    width: 4px;
    height: 50%;
    background-color: #fff;
    border-radius: 6px;
    z-index: 12;
}

.second::before {
    content: "";
    position: absolute;
    width: 2px;
    height: 65%;
    background-color: rgb(71, 87, 205);
    border-radius: 6px;
    z-index: 13;
}

@keyframes animate {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(20px);
    }
}

.back .hour {
    animation: back 7s;
}

.back .minute {
    animation: back 4s;
}

.back .second {
    animation: back 2s;
}

@keyframes back {
    100% {
        transform: rotateZ(-1500deg);
    }
}
.link{
    position: absolute;
    bottom:35px;
    color:#ff105e;
    text-decoration:underline;
    cursor: pointer;
}
</style>