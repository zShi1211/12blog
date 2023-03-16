
<script setup lang='ts'>
import useAudio from "@/composition/topBar/useAudio"
import useScrollDirection from "@/composition/topBar/useScrollDirection";
import Section from "./Section.vue";
import ThemeSwitchVue from "./ThemeSwitch.vue";
const { audioState, toggle } = useAudio();
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
                <RouterLink to="/" class="logo">12</RouterLink>
                <p class="title" :class="{ 'topNear': topNear }">{{ articleName }}</p>
                <div class="operate">

                    <ThemeSwitchVue />

                    <div class="upThumb" :class="{ like: isLike }">
                        <i class="iconfont icon-aixin" @click="upThumbHandle"></i>
                    </div>
                    <div class="play">
                        <i class="iconfont " :class="[audioState.isPlay ?'icon-24gf-pause2': 'icon-24gf-play' ]"
                            @click="toggle"></i>
                    </div>
                </div>
            </div>
            <div class="progress" :style="{ width: `${(audioState.currentTime / audioState.duration) * 100}%` }">
            </div>
        </div>


        <div class="bottomBar" v-else>
            <Section>
                <div class="bottomBarBox">
                    <p class="title">{{ articleName }}</p>
                    <div class="operate">

                        <div class="comment">
                            <i class="iconfont icon-pinglun" @click="goCommentText"></i>
                        </div>

                        <div class="upThumb" :class="{ like: isLike }">
                            <i class="iconfont icon-aixin" @click="upThumbHandle"></i>
                        </div>
                        <div class="play">
                            <i class="iconfont " :class="[audioState.isPlay ?'icon-24gf-pause2': 'icon-24gf-play' ]"
                                @click="toggle"></i>
                        </div>
                        <ThemeSwitchVue />

                        <div class="goTop">
                            <i class="iconfont icon-dingbu" @click="goTop"></i>
                        </div>
                    </div>
                </div>
            </Section>
            <div class="progress" :style="{ width: `${(audioState.currentTime / audioState.duration) * 100}%` }"></div>
        </div>
    </Transition>
</template>

<style  scoped>
.topBar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    font-size: 20px;
    z-index: 1000;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    box-shadow: 0px -3px 10px #ccc;
    color: var(--color2);
}

.logo {
    cursor: pointer;
    color: #f50514;
    font-weight: bold;
    font-size: 25px;
}

.topBar .nav {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 20px;
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
    font-size: 15px;
    user-select: none;
}

.topBar .nav .title.topNear {
    opacity: 0;
}

.topBar .nav .play {
    position: relative;
}

.play {
    cursor: pointer;
}

.operate {
    display: flex;
    /* color: #fff; */
}

.upThumb {
    cursor: pointer;
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
    background: var(--color2);
    top: 0;
    z-index: -1;
    opacity: 0.2;
}

.bottomBar {
    position: fixed;
    bottom: 0;
    background: var(--color12);
    color: var(--color2);
    width: 100%;
    left: 0;
    height: 50px;
    font-size: 20px;
    z-index: 1000;
    display: flex;
    box-shadow: 0px 3px 10px #ccc;
}

.bottomBarBox {
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: space-between;
}


.bottomBar .operate {}

@media (max-width: 576px) {
    .bottomBarBox .title {
        display: none;
    }

    .bottomBar .operate {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
}

.bottomBar .title {
    text-align: left;
    font-size: 16px;
    color: var(--color13);
    font-weight: 600;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    user-select: none;
}

.bottomBar .operate>div {
    padding: 10px;
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

.comment,
.goTop {
    cursor: pointer;
}
</style>