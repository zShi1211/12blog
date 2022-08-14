<script setup lang='ts'>
import StartExplore from '@/components/HomePage/StartExplore.vue'
import ArticlePage from '@/components/HomePage/ArticlePage.vue';

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
            </div>
        </div>
        <div class="section" style="--i:3">
            <div class="wrapper"></div>
        </div>
        <div class="section" style="--i:4">
            <div class="wrapper"></div>
        </div>
    </div>
</template>

<style  scoped>
.container {
    position: relative;
    height: 100%;
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


.section:nth-child(2) .wrapper {
    background: #361f3b;
}

.section:nth-child(3) .wrapper {
    background: #f7fc84;
}

.section:nth-child(4) .wrapper {
    background: #999;
}

.section:nth-child(5) .wrapper {
    background: #e74;
}
</style>