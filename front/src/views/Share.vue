<script setup lang='ts'>
import SpinTwoBallsVue from '@/components/Loading/SpinTwoBalls.vue';
import useShareListData from '@/composition/share/useShareListData';
import type { NumericLiteral } from '@babel/types';
import { computed } from '@vue/reactivity';
import { defineComponent, watch } from 'vue'
import { reactive, ref } from 'vue';
const { totalShare, searchConditon, loading } = useShareListData()

const currentPage = ref(0);

const allDataLoadDone = computed(() => {
    return totalShare.count <= totalShare.rows.length
})

const stop = watch(currentPage, () => {
    if (allDataLoadDone.value) {
        //  如果全部数据加载完毕就取消监听
        stop();
        return;
    }
    // 将查看到当前已加载数据的最后2个
    if (currentPage.value >= totalShare.rows.length - 2) {
        searchConditon.offest++;
    }
})

function changePageHandle(newPage: number) {
    if (newPage < 0) {
        newPage = 0
    }
    if (newPage > totalShare.count + 2) {
        newPage = totalShare.count + 2
    }
    currentPage.value = newPage;
}

</script>

<template>
    <div class="ShareWrapper" v-if="totalShare.count > 0">
        <div class="book "
            :class="{ open: currentPage > 0 && currentPage < totalShare.count + 2, done: currentPage > totalShare.count + 1 }">
            <div class="frontCover bookItem " :class="{ pass: currentPage > 0 }"
                :style="{ '--p': totalShare.count + 2 }">
            </div>
            <div class="pageItem bookItem" v-for="(share, index) in totalShare.rows" :key="share.id"
                :class="{ pass: currentPage > index + 1 }"
                :style="{ '--p': totalShare.count - index + (currentPage > index + 1 ? index + 2 : 1) }">
                <div class="content">
                    <p class="time">{{ $dateFormat(new Date(share.time)) }}</p>
                    <div class="picture">
                        <img :src="share.pictureUrl" alt="">
                    </div>
                    <div class="description">
                        {{ share.description }}
                    </div>
                </div>
            </div>
            <SpinTwoBallsVue :style="{ position: 'absolute', zIndex: 1 }" v-if="loading" />
            <div class="backCover bookItem"
                :style="{ '--p': 0 + (currentPage > totalShare.count + 1 ? totalShare.count + 2 : 0) }"
                :class="{ pass: currentPage > totalShare.count + 1 }"></div>
        </div>
        <div class="operate">
            <button @click="changePageHandle(currentPage - 1)">Prev</button>
            <button @click="changePageHandle(currentPage + 1)">Next</button>
        </div>
    </div>
</template>

<style  scoped>
@import 'viewerjs/dist/viewer.css';

.ShareWrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    height: 100vh;

}

img {
    width: 100%;
}

.book {
    position: relative;
    height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-style: preserve-3d;
    transition: all 1.5s;
    width: 500px;
    color: #e7feff;
}

.book.open {
    transform: translateX(50%);
}

.book.done {
    transform: translateX(100%);
}

.bookItem {
    position: absolute;
    z-index: var(--p);
    transition: all 1.5s;
}

.frontCover,
.backCover {
    width: 100%;
    height: 100%;
    transform-origin: 0px;
    background: url('@/assets/img/cover.jpg') right bottom / cover;

    box-shadow: -10px -10px 20px rgba(255, 255, 255, 0.1),
        10px 10px 20px rgba(0, 0, 0, 0.1),
        0px 40px 50px rgba(0, 0, 0, 0.2);
}


.frontCover.pass,
.backCover.pass {
    transform: rotateY(-180deg);
}


.pageItem {
    transform-origin: -5%;
    padding: 20px;
    height: 90%;
    width: 90%;
    box-sizing: border-box;
    background: #5d8aa8;
}



.pageItem.pass {
    transform: rotateY(-180deg);
    filter: blur(5px);
}

.pageItem .content {
    opacity: 1;
    transition: all 0.6s 0.35s;
}

.pageItem.pass .content {
    opacity: 0;
    transition: all 0.6s;
}

.content {

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.time {
    font-size: 12px;
    margin-bottom: 10px;
    text-align: right;
    opacity: 0.6;
}

.picture {
    flex-grow: 1;
    margin-bottom: 20px;
    overflow: hidden;
}

.picture img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.content .description {
    min-height: 80px;
    max-height: 120px;
    overflow-y: auto;
}

.operate {
    width: 500px;
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.operate button {
    width: 50%;
    cursor: pointer;
    padding: 15px 0;
    transition: 0.5s;
    outline: none;
    border: none;
    user-select: none;
    color: #456;
}

.operate button:hover {
    background: #0084ff;
    color: #fff;
}
</style>