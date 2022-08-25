<script setup lang="ts">
</script>

<template>
    <router-view v-slot="{ Component, route }">
        <Transition :name="`${route.meta.transitionName}`" mode="out-in">
            <component :is="Component" :key="route.path" />
        </Transition>
    </router-view>
</template>

<style >
@import "@/assets/css/base.css";
@import "@/assets/css/reset.css";

.slide-left-enter-from,
.slide-right-leave-to {
    opacity: 0;
    transform: translateX(20px);
}

.slide-left-leave-to,
.slide-right-enter-from {
    opacity: 0;
    transform: translateX(-20px);
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
    transition: all .5s;
    will-change: transition;
}

.slide-left-enter-to,
.slide-left-leave-from,
.slide-right-enter-to,
.slide-right-leave-from {
    opacity: 1;
    transform: translateX(0px);
}
</style>
