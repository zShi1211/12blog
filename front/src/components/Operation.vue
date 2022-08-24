<script setup lang='ts'>
import ThemeSwitch from './ThemeSwitch.vue';

type excludeOperate = "goTop" | "switchTheme" | "goHome"
interface IProps {
    exclude?: excludeOperate[]
}
const { exclude } = defineProps<IProps>()
// 移动到顶部
function goTop() {
    document.body.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
}
</script>

<template>
    <div class="operationWrapper">
        <p>
            <i class="iconfont icon-dingbu" @click="goTop" v-if="!exclude?.includes('goTop')"></i>
        </p>
        <p>
            <ThemeSwitch v-if="!exclude?.includes('switchTheme')" />
        </p>
        <p>
            <RouterLink to="/">
                <i class="iconfont icon-home-fill " v-if="!exclude?.includes('goHome')"></i>
            </RouterLink>
        </p>
    </div>
</template>

<style  scoped>
.operationWrapper {
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 5px;
    bottom: 30px;
    font-size: 25px;
    color: #318ce7;
    z-index: 999;
}

.operationWrapper>p {
    margin-bottom: 5px;
    padding: 2px;
    transition: all 0.4s;
    cursor: pointer;
    opacity: 0.5;
}

.operationWrapper>p:hover {
    opacity: 1;
}
</style>