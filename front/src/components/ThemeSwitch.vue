<script setup lang='ts'>
import { useThemeStore } from "@/stores/themte"
const themeStore = useThemeStore();

</script>

<template>
    <div class="switchTheme" @click="themeStore.switchTheme">
            <i class="iconfont icon-moon-fill" v-if="themeStore.theme === 'light'"></i>
            <i class="iconfont icon-weibiaoti-" v-else></i>
    </div>
</template>

<style  scoped>
</style>