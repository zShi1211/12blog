<script lang='ts'>
export default {
    inheritAttrs: false
}
</script>
<script setup lang='ts'>
import { useAttrs } from 'vue';
export interface IProps {
    title: string;
    name: string;
    content: string;
    to: string;
}
const props = defineProps<IProps>();
const attrs = useAttrs()

</script>

<template>
    <div class="box">
        <h1 class="title">{{ props.title }}</h1>
        <router-link :to="props.to" class="content" tag="span" :style="attrs.style">
            <div class="detail">
                detail
            </div> 
            <p class="name">{{ props.name }}</p>
            <div class="animation">
                <slot></slot>
            </div>
            <div class="description">
                {{ props.content }}
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
    color:#fff;
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