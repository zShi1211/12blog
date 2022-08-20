
<script setup lang='ts'>
import useAudio from "@/composition/topBar/useAudio"
import useScrollDirection from "@/composition/topBar/useScrollDirection";
import ThemeSwitchVue from "./ThemeSwitch.vue";
const { audioState, play, puase } = useAudio();
const { direction, topNear } = useScrollDirection();

interface IProps {
    upThumbHandle: () => void
    isLike: boolean;
    goCommentText: () => void
    articleName: string
}



const { upThumbHandle, isLike, goCommentText, articleName } = defineProps<IProps>()

// 移动到顶部
function goTop() {
    document.body.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
}

</script>
<template>
    <Transition name="bar" mode="out-in">
        <div class="topBar" v-if="direction == 'up'" :style="{
            position: topNear ? 'absolute' : 'fixed'
        }">
            <div class="nav">
                <RouterLink to="/" class="logo">Logo</RouterLink>
                <p class="title" :class="{ 'topNear': topNear }">{{ articleName }}</p>
                <div class="operate">

                    <ThemeSwitchVue />

                    <div class="upThumb" :class="{ like: isLike }">
                        <i class="iconfont icon-aixin" @click="upThumbHandle"></i>
                    </div>
                    <div class="play">
                        <i class="iconfont icon-24gf-play" v-if="!audioState.isPlay" @click="play"></i>
                        <i class="iconfont icon-24gf-pause2" v-else @click="puase"></i>
                    </div>
                </div>
            </div>
            <div class="progress" :style="{ width: `${(audioState.currentTime / audioState.duration) * 100}%` }">
            </div>
        </div>


        <div class="bottomBar" v-else>
            <p class="title">{{ articleName }}</p>
            <div class="operate">

                <div class="comment">
                    <i class="iconfont icon-pinglun" @click="goCommentText"></i>
                </div>

                <div class="upThumb" :class="{ like: isLike }">
                    <i class="iconfont icon-aixin" @click="upThumbHandle"></i>
                </div>
                <div class="play">
                    <i class="iconfont icon-24gf-play" v-if="!audioState.isPlay" @click="play"></i>
                    <i class="iconfont icon-24gf-pause2" v-else @click="puase"></i>
                </div>
                <ThemeSwitchVue />

                <div class="goTop">
                    <i class="iconfont icon-dingbu" @click="goTop"></i>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style  scoped>
.topBar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 20px;
    z-index: 1000;
    backdrop-filter: blur(6px);
    box-shadow: 0px -3px 10px #ccc;
}

.logo {
    cursor: pointer;
}

.topBar .nav {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    position: relative;
    z-index: 2;
}


.topBar .nav .title {
    flex-grow: 1;
    text-align: center;
    font-weight: 400;
    opacity: 1;
    transition: opacity 0.5s;
    padding: 0 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
}

.topBar .nav .title.topNear {
    opacity: 0;
}

.topBar .nav .play {
    position: relative;
}


.operate {
    display: flex;
    /* color: #fff; */
}

.topBar .upThumb {
    margin: 0 15px;
}

.upThumb.like {
    color: #f40
}


.progress {
    position: absolute;
    height: 100%;
    /* width: 50%; */
    background: rgba(0, 0, 0, 0.2);
    top: 0;
    z-index: 1;
}

.bottomBar {
    position: fixed;
    bottom: 0;
    background: #fff;
    width: 100%;
    left: 0;
    height: 50px;
    font-size: 20px;
    z-index: 1000;
    box-shadow: 0px 3px 10px #ccc;
    display: flex;
    align-items: center;
    padding: 0 20%;
    box-sizing: border-box;
}

.bottomBar .operate {
    color: #888;
}

.bottomBar .title {
    flex-grow: 1;
    text-align: left;
    font-size: 16px;
    color: #456;
    font-weight: 600;
}

.bottomBar .operate>div {
    margin-left: 20px;
}

.bar-enter-active,
.bar-leave-active {
    transition: transform 0.3s ease;
}

.bar-enter-from.topBar,
.bar-leave-to.topBar {
    transform: translateY(-100%);
}

.bar-enter-from.bottomBar,
.bar-leave-to.bottomBar {
    transform: translateY(100%);
}
</style>