<script setup lang='ts'>
import { getAllLetter } from '@/api/letter';
import useLetterListData from '@/composition/letter/useLetterListData';
import useTouchBottomLoad from '@/composition/utils/useTouchBottomLoad';
import { computed, watchEffect } from 'vue';
import SpinTwoBalls from '@/components/Loading/SpinTwoBalls.vue';
const { searchConditon, totalLetter, loading } = useLetterListData();
const isLetterLoadDone = computed(() => {
    return totalLetter.count <= totalLetter.rows.length
})
const clearTouchBottom = useTouchBottomLoad(touchBottomHandle);
function touchBottomHandle() {
    if (isLetterLoadDone.value) {
        // 当数据加载完毕时清理监听函数
        clearTouchBottom();
    };
    searchConditon.offest++;
}
</script>

<template>
    <div class="letterWrapper">
        <div class="letterItem" v-for="letter in totalLetter.rows" :key="letter.id">
            <div class="avatar">
                <img :src="letter.avatar" alt="">
            </div>
            <div class="content">
                <div class="box">
                    {{ letter.content }}
                </div>
            </div>
            <div class="nickname">
                {{ letter.nickname }}
            </div>
            <div class="time">
                {{ $dateFormat(new Date(letter.time)) }}
            </div>
        </div>
        <div class="loadBottom">
            <SpinTwoBalls v-show="loading && !isLetterLoadDone" />
            <p v-if="isLetterLoadDone">已经加载全部内容啦~</p>
        </div>
    </div>
</template>

<style  scoped>
.letterWrapper {
    width: 600px;
    margin: 0 auto;
    padding: 20px 0;
}

.letterItem {
    border: 1px solid #000;
    margin-bottom: 20px;
    background: url("@/assets/img/letter_bg.png");
    padding: 20px;
    box-shadow: 4px 3px 5px rgba(0, 0, 0, 0.2);
}


.avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 20px;
}

.avatar img {
    width: 50px;
    height: 50px;
    object-fit: cover;
}

.bottom {
    padding: 20px;
}

.content {
    min-height: 150px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.content .box {
    width: 100%;
    text-align: center;
    line-height: 1.2;
}

.nickname,
.time {
    text-align: right;
    font-size: 18px;
    font-style: oblique;
    font-weight: 600;
    color: #345;
    padding-right: 10%;
    margin-bottom: 10px;
}

.time {
    font-size: 12px;
}

.loadBottom {
    display: flex;
    justify-content: center;
    color: #f58220;
}
</style>