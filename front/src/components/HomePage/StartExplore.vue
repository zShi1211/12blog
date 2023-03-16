<script setup lang='ts'>
import { onMounted, ref } from "@vue/runtime-dom";
import FullScreenLoading from "@/components/Loading/FullScreenLoading.vue";
import imgsLoadDone from "@/utils/imgsLoadDone";
import coverDarkStar from "@/assets/img/stars.webp";
import coverDarkMoon from "@/assets/img/moon.webp";
import coverDarkMountaintBehind from "@/assets/img/mountains_behind.webp";
import coverDarkMountaintFront from "@/assets/img/mountains_front.webp";

const loading = ref(true);

imgsLoadDone([
  coverDarkStar,
  coverDarkMoon,
  coverDarkMountaintBehind,
  coverDarkMountaintFront,
]).then(() => {
    loading.value = false;
});

const scrollY = ref(0);
onMounted(() => {
  document.querySelector(".container")?.addEventListener("scroll", (e: any) => {
    scrollY.value = e.target.scrollTop;
  });
});
</script>

<template>
  <FullScreenLoading v-if="loading" />
  <div class="coverWrapper" v-else>
    <div class="bg">
      <div class="imgs">
        <img
          :src="coverDarkStar"
          alt=""
          :style="{ transform: `translateX(${scrollY * 0.2}px)` }"
        />
        <img
          :src="coverDarkMoon"
          alt=""
          class="moon"
          :style="{
            transform: `translateY(${scrollY * 0.8}px)` ,
          }"
        />

        <img
          :src="coverDarkMountaintBehind"
          alt=""
          :style="{ transform: `translateY(${scrollY * 0.4}px)` }"
        />

        <img :src="coverDarkMountaintFront" alt="" />
      </div>
    </div>
    <nav
    >
      <router-link to="/articles">Article</router-link>
      <router-link to="/about">About</router-link>
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
  padding: 20px 70px;
  box-sizing: border-box;
  top: 0;
  font-size: 20px;
  width:100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}

@media (max-width: 992px) {
  nav {
    padding: 20px;
  }
}

.bg {
  width: 100%;
  height: 100vh;
  position: relative;
  transition: all 0.5s;
  background: #2b1055;
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
  background: linear-gradient(to top, #1c0522, transparent);
  z-index: 1000;
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