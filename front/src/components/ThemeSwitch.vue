<script setup lang='ts'>
import useTheme from "@/composition/common/useTheme"
const { theme,switchTheme } = useTheme();

</script>

<template>
    <div class="switchTheme" @click="switchTheme">
        <i class="iconfont icon-moon-fill" v-if="theme === 'dark'"></i>
        <i class="iconfont icon-weibiaoti-" v-else></i>
    </div>
</template>

<style  scoped>
.switchTheme{
    cursor:pointer;
}
</style>