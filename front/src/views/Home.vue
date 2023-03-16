<script setup lang='ts'>
import StartExplore from "@/components/HomePage/StartExplore.vue";
import ClockPage from "@/components/HomePage/ClockPage.vue";
import LetterPage from "@/components/HomePage/LetterPage.vue";
</script>

<template>
  <div class="container">
    <StartExplore />
    <LetterPage />
    <ClockPage />
  </div>
</template>

<style  scoped>
.container {
  position: relative;
  height: 100vh;
  overflow-x: hidden;
}






</style>