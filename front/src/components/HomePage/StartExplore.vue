<script setup lang='ts'>
import { onMounted, ref } from '@vue/runtime-dom';
import ThemeSwitchVue from '../ThemeSwitch.vue';
import FullScreenLoading from '@/components/Loading/FullScreenLoading.vue';
import useTheme from "@/composition/common/useTheme"
import imgsLoadDone from '@/utils/imgsLoadDone';
import coverDarkStar from "@/assets/img/stars.png";
import coverDarkMoon from "@/assets/img/moon.png";
import coverDarkMountaintBehind from "@/assets/img/mountains_behind.png";
import coverDarkMountaintFront from "@/assets/img/mountains_front.png";
import coverLightSun from "@/assets/img/sun.png";
import coverLightMountaintBehind from "@/assets/img/1.png";
import coverLightMountaintFront from "@/assets/img/2.png";


const { theme, switchTheme } = useTheme();
const lightImgsLoadDone = ref(false)
const darkImgsLoadDone = ref(false)
const loading = ref(true)

imgsLoadDone([coverDarkStar, coverDarkMoon, coverDarkMountaintBehind, coverDarkMountaintFront]).then(() => {
    darkImgsLoadDone.value = true;
    if (theme.value === "dark") {
        loading.value = false;
    }
})
imgsLoadDone([coverLightSun, coverLightMountaintBehind, coverLightMountaintFront]).then(() => {
    lightImgsLoadDone.value = true;
    if (theme.value === "light") {
        loading.value = false;
    }
})

const scrollY = ref(0)
// 当屏幕宽度小于576时，就不让月亮动了，因为在手机端动画会抖动
const clienWidth = ref(0);
onMounted(() => {
    document.querySelector('.container')?.addEventListener('scroll', (e: any) => {
        scrollY.value = e.target.scrollTop
    })
    clienWidth.value = document.documentElement.clientWidth;
})
</script>

<template>
    <FullScreenLoading v-if="loading" />
    <div class="coverWrapper " v-else>
        <div class="bg">
            <div v-if="theme === 'dark'" class="imgs">
                <img :src="coverDarkStar" alt="" :style="{ transform: `translateX(${scrollY * 0.2}px)` }" />
                <img :src="coverDarkMoon" alt="" class="moon"
                    :style="{ transform: clienWidth > 576 ? `translateY(${scrollY * 0.8}px)` : '0px' }">
                <img :src="coverDarkMountaintBehind" alt="" :style="{ transform: `translateY(${scrollY * 0.4}px)` }">
                <img :src="coverDarkMountaintFront" alt="">
            </div>
            <div v-else class="imgs">
                <img :src="coverLightSun" alt="" class="sun"
                    :style="{ transform: clienWidth > 576 ? `translateY(${scrollY * 0.8}px)` : '0px' }">
                <img :src="coverLightMountaintBehind" alt="" :style="{ transform: `translateY(${scrollY * 0.4}px)` }">
                <img :src="coverLightMountaintFront" alt="">
            </div>

        </div>

        <nav>
            <h1 class="logo" @click="switchTheme">
                zshishi2
            </h1>
            <ThemeSwitchVue v-if="theme === 'dark' ? lightImgsLoadDone : darkImgsLoadDone" />
        </nav>
    </div>
</template >


            
 <style scoped>
 .coverWrapper {
     position: relative;
     height: 100%;
     scroll-snap-align: end;
 }
 
 nav {
     position: absolute;
     color: #fff;
     width: 100%;
     padding: 20px 70px;
     display: flex;
     justify-content: space-between;
     box-sizing: border-box;
     top: 0;
     font-size: 25px;
 }
 
 @media (max-width: 992px) {
     nav {
         padding: 20px;
     }
 }
 
 nav .iconfont {
     position: absolute;
 }
 
 .bg {
     width: 100%;
     height: 100vh;
     position: relative;
     transition: all 0.5s;
     background: var(--color1);
 }
 
 .imgs {
     height: 100%;
     width: 100%;
     overflow: hidden;
 }
 
 .imgs::before {
     content: "";
     position: absolute;
     bottom: 0;
     width: 100%;
     height: 100px;
     background: linear-gradient(to top, var(--color3), transparent);
     z-index: 1000;
 }
 
 /*  .bg.dark {
                               background: rgb(232, 199, 16);
                           }
                           
                           .bg.light {
                               background: #2b1055;
                           } */
 
 
 .bg img {
     width: 100%;
     height: 100%;
     top: 0;
     left: 0;
     position: absolute;
     object-fit: cover;
     will-change: transform;
 }
 
 img.moon,
 .sun {
     mix-blend-mode: screen;
     will-change: mix-blend-mode;
 
 }
 </style>