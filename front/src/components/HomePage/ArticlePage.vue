
<script setup lang='ts'>
import LeapBallsVue from '../Loading/LeapBalls.vue';
</script>

<template>
    <div class="articlePageWrapper">
        <div class="articleBox">
            <h1 class="title">Blog.</h1>
            <div class="content">
            <div class="animation">
                <LeapBallsVue />
            </div>
            <div class="description">
                <p>一点点胡言乱语...</p>
            </div>
            <router-link to="/articles" >
                <div class="detail">
                    查看详细
                </div>
            </router-link>
        </div></div>
    </div>
</template>

<style  scoped>
.articlePageWrapper {
    height: 100%;
    background: #361f3b;

}

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

.articleBox {
    padding: 0 10% 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100%;
}


.content {
    color: #fff;
    flex-grow: 1;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    padding: 10% 20%;
    text-align: center;
    position: relative;
    overflow: hidden;
    background: #3d4d5e;
    align-items: center;
}

.detail {
    width: 110px;
    height: 60px;
    background: #000;
    text-align: center;
    line-height: 60px;
    color: #fff;
}


.description {
    line-height: 1.5;
    transition: all 0.3s;
}

.animation {
    transition: all 0.3s;
    display: flex;
    justify-content: center;
    padding-bottom: 15px;
}



.content:hover .animation {
    transform: translateY(-5px);
}

.content:hover .description {
    transform: translateY(10px);
}
</style>