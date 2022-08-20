<script setup lang='ts'>
import StartExplore from '@/components/HomePage/StartExplore.vue'
import ArticlePage from '@/components/HomePage/ArticlePage.vue';
import ClockPage from '@/components/HomePage/ClockPage.vue';
import LetterPage from '@/components/HomePage/LetterPage.vue';
import SayHi from './SayHi.vue';
</script>

<template>
    <div class="container" ref="container">
        <StartExplore />
        <div class="section" style="--i:1">
            <div class="wrapper">
                <ArticlePage />
            </div>
        </div>
        <div class="section" style="--i:2">
            <div class="wrapper">
                <ClockPage />
            </div>
        </div>
        <div class="section" style="--i:3">
            <div class="wrapper">
                <SayHi />
            </div>
        </div>
        <LetterPage />

    </div>
</template>

<style  scoped>
.container {
    position: relative;
    height: 100vh;
    scroll-snap-type: y mandatory;
    overflow-x: hidden;
}


.section {
    width: 100%;
    height: calc(100vh * var(--i));
    position: relative;
    margin-top: calc(calc(var(--i) - 1) * -100vh);
    z-index: calc(calc(var(--i) * -1) + 10);
    scroll-snap-align: end;
}

.wrapper {
    width: 100%;
    height: 100vh;
    position: sticky;
    top: 0;
    overflow: hidden;
}



</style>