<script setup lang='ts'>
import SpinTwoBalls from '@/components/Loading/SpinTwoBalls.vue';
import useShareListData from '@/composition/share/useShareListData';
import { component as Viewer } from "v-viewer"
import { computed } from '@vue/reactivity';
import { watch } from 'vue'
import { ref } from 'vue';
import Operation from '@/components/Operation.vue';
import FullScreenLoading from '@/components/Loading/FullScreenLoading.vue';
const { totalShare, searchConditon, loading } = useShareListData()

const currentPage = ref(0);

const isShareLoadDone = computed(() => {
    return totalShare.count <= totalShare.rows.length
})

const stop = watch(currentPage, () => {
    if (isShareLoadDone.value) {
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
    <div class="shareWrapper" v-if="totalShare.count > 0">
        <Viewer>
            <img src="" alt="">
        </Viewer>
        <div class="shareBox">
            <div class="book "
                :class="{ open: currentPage > 0 && currentPage < totalShare.count + 2, done: currentPage > totalShare.count + 1 }">
                <div class="frontCover bookItem " :class="{ pass: currentPage > 0 }"
                    :style="{ 'z-index': totalShare.count + 2 }">
                </div>
                <div class="pageItem bookItem" v-for="(share, index) in totalShare.rows" :key="share.id"
                    :class="{ pass: currentPage > index + 1 }"
                    :style="{ 'z-index': totalShare.count - index + (currentPage > index + 1 ? index * 2 + 2 : 1), 'will-change':currentPage == index || currentPage == index +2 ? 'transform' : 'none'   }">
                    <div class="content">
                        <div class="top">
                            <p class="pageIndex">{{ index + 1 }}</p>
                            <p class="time">{{ $dateFormat(new Date(share.time)) }}</p>
                        </div>
                        <div class="picture">
                            <Viewer :options="{navbar:false,toolbar:false,title:false,movable:false}" :style="{width:'100%',height:'100%'}">
                                <img :src="share.pictureUrl" >
                            </Viewer>
                        </div>
                        <div class="description">
                            {{ share.description }}
                        </div>
                    </div>
                </div>
                <SpinTwoBalls :style="{ position: 'absolute', zIndex: 1 }" v-if="loading && !isShareLoadDone" />
                <div class="backCover bookItem"
                    :style="{ 'z-index': 0 + (currentPage > totalShare.count + 1 ? totalShare.count * 2 + 2 : 0) }"
                    :class="{ pass: currentPage > totalShare.count + 1 }"></div>
            </div>
            <div class="operate">
                <button :disabled="currentPage === 0" @click="changePageHandle(currentPage - 1)">Prev</button>
                <button :disabled="currentPage === totalShare.count + 2"
                    @click="changePageHandle(currentPage + 1)">Next</button>
            </div>
        </div>
        <Operation :exclude="['goTop']" />
    </div>
    <FullScreenLoading v-else />
</template>

<style  scoped>

@import 'viewerjs/dist/viewer.css';

.shareWrapper {
    overflow: hidden;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}



img {
    width: 100%;
}

.shareBox {
    width: 500px;
    height: 90vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

@media (max-width: 992px) {
    .shareBox {
        width: 410px;
    }
}

@media (max-width: 850px) {
    .shareBox {
        width: 350px;
    }
}

@media (max-width: 768px) {
    .shareBox {
        width: 300px;
    }
}


.book {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-style: preserve-3d;
    transition: all 1.5s;
    color: #123;
    width: 100%;
    height: 100%;
}



.book.open {
    transform: translateX(50%);
}

.book.done {
    transform: translateX(100%);
}

@media (max-width: 576px) {
    .shareBox {
        width: 95%;
    }

    .book.open {
        transform: translateX(0px);
    }

    .book.done {
        transform: translateX(100%);
    }
}

.bookItem {
    position: absolute;
    /* z-index: var(--p); */
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
    background: url("@/assets/img/letter_bg.png");
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

.top {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    margin-bottom: 10px;

}

.time {
    opacity: 0.6;
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
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
    line-height: 1.4;
    letter-spacing: 1px;
}

.operate {
    width: 100%;
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