
<script setup lang='ts'>
import LeapBallsVue from '../LeapBalls.vue';
</script>

<template>
    <div class="box">
        <h1 class="title">Blog.</h1>
        <router-link to="/articles" class="content">
            <div class="detail">
                detail
            </div>
            <p class="name">
                网络日志
            </p>
            <div class="animation">
                <LeapBallsVue />
            </div>
            <div class="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex et velit quia rem aspernatur quibusdam ea voluptate perspiciatis eius? Placeat.
            </div>
        </router-link>
    </div>
</template>

<style  scoped>
.title {
    font-size: 120px;
    font-weight: 800;
    letter-spacing: -0.02em;
    text-align: left;
    transform: translateY(25px);
    position: relative;
    z-index: 10;
    color: #fff;
}



.box {
    padding: 0 10% 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100%;
}


.content {
    background: #fff;
    flex-grow: 1;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    padding: 10% 20%;
    text-align: center;
    position: relative;
    overflow: hidden;
    background: #0066ce;
}

.detail {
    width: 110px;
    height: 60px;
    position: absolute;
    top: 0;
    right: 50px;
    background: #000;
    text-align: center;
    line-height: 60px;
    color: #fff;
    transform: translateY(-100%);
    transition: all 0.4s;
}

.name {
    font-size: 50px;
    font-weight: 500;
    transition: all 0.3s;
}

.description {
    line-height: 1.5;
    transition: all 0.3s;
}

.animation {
    transition: all 0.3s;
    display: flex;
    justify-content: center;
}

.content:hover .detail {
    transform: translateY(0);
}

.content:hover .name {
    transform: translateY(-10px);
}

.content:hover .animation {
    transform: translateY(-5px);
}

.content:hover .description {
    transform: translateY(10px);
    /* line-height: 1.6; */
}
</style>