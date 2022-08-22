<script setup lang='ts'>
import Section from '@/components/Section.vue';
import useArticleListData from '@/composition/article/useArticleListData';
import useTouchBottomLoad from '@/composition/utils/useTouchBottomLoad';
import { computed } from 'vue';
const { searchConditon, totalArticlesList, loading } = useArticleListData();
const isLetterLoadDone = computed(() => {
    return totalArticlesList.count <= totalArticlesList.rows.length
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
    <div class="articleWrapper" v-if="totalArticlesList.count > 0">
        <Section>
            <router-link :to="`/articleDetail/${article.id}`" v-for="article in totalArticlesList?.rows"
                :key="article.id">
                <div class="articleItem">
                    <div class="cover">
                        <img :src="article.cover" alt="">
                    </div>
                    <div class="content">
                        <p class="title">
                            {{ article.title }}
                        </p>
                        <span class="time">
                            {{ $dateFormat(new Date(article.time)) }}
                        </span>
                    </div>

                </div>
            </router-link>
            <div class="loadBottom">
                <SpinTwoBalls v-show="loading && !isLetterLoadDone" />
                <p v-if="isLetterLoadDone">已经加载全部内容啦~</p>
            </div>
        </Section>
    </div>
</template>

<style  scoped>
.articleWrapper {
    padding: 30px 0;
}

.articleItem {
    padding: 80px 30px;
    margin-bottom: 30px;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    transition: all .5s;
}

.articleItem:hover {
    transform: scale(1.05);
    box-shadow: 2px 1px 20px rgba(0, 0, 0, 0.4);
    will-change: transition, transform;
}

@media (max-width: 576px) {
    .articleItem:hover {
        transform: scale(1);
        box-shadow: 2px 1px 20px rgba(0, 0, 0, 0.4);
    }
}

.cover {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.cover::after {
    content: "";
    background: rgba(0, 0, 0, 0.4);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.content {
    position: relative;
    color: #fff;
    text-align: center;
}

.title {
    font-size: 30px;
    margin-bottom: 20px;
    line-height: 1.3;

}

.time {
    opacity: 0.8;
    font-size: 14px;
}


.loadBottom {
    display: flex;
    justify-content: center;
    color: #f58220;
}
</style>