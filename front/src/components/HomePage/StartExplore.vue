<script setup lang='ts'>
import { onMounted, onUnmounted, ref } from '@vue/runtime-dom';
import { useThemeStore } from "@/stores/themte"
import ThemeSwitchVue from '../ThemeSwitch.vue';
const scrollY = ref(0)

const themeStore = useThemeStore();

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
    <div class="cover">
        <div class="bg" :class="[themeStore.theme]">
            <Transition>
                <div v-if="themeStore.theme === 'light'" class="imgs">
                    <img src="@/assets/img/stars.png" alt="" :style="{ transform: `translateX(${scrollY * 0.2}px)` }" />
                    <img src="@/assets/img/moon.png" alt="" class="moon"
                        :style="{ transform: clienWidth > 576 ? `translateY(${scrollY * 0.8}px)` : '0px' }">
                    <img src="@/assets/img/mountains_behind.png" alt=""
                        :style="{ transform: `translateY(${scrollY * 0.4}px)` }">
                    <img src="@/assets/img/mountains_front.png" alt="">
                </div>
                <div v-else class="imgs">
                    <img src="@/assets/img/sun.png" alt="" class="sun"
                        :style="{ transform: clienWidth > 576 ? `translateY(${scrollY * 0.8}px)` : '0px' }">
                    <img src="@/assets/img/1.png" alt="" :style="{ transform: `translateY(${scrollY * 0.4}px)` }">
                    <img src="@/assets/img/2.png" alt="">
                </div>
            </Transition>

        </div>

        <nav>
            <h1 class="logo">
                LOGO
            </h1>
            <ThemeSwitchVue />
        </nav>
    </div>

</template >


            
 <style scoped>
 .cover {
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
 }
 
 .imgs {
     height: 100%;
     width: 100%;
     overflow: hidden;
 }
 
 .bg.dark {
     background: rgb(232, 199, 16);
 }
 
 .bg.light {
     background: #2b1055;
 }
 
 
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