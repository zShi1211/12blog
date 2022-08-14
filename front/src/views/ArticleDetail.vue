<script setup lang='ts'>
import useArticleDetailData from '@/composition/article/articleDetailData';
import { useRoute } from 'vue-router';

const route = useRoute();
const { articleDate } = useArticleDetailData(route.params.id as string)
console.log(articleDate)
</script>

<template>
    <div class="articleWrapper">
        <h1 class="title">{{ articleDate?.title }}</h1>
        <div class="infomation">
            <p>{{ $dateFormat(new Date(articleDate?.time!)) }}</p>
            <p>{{ articleDate?.words }}</p>
            <p>{{ articleDate?.like }}</p>
        </div>
        <div class="content">
            <div v-html="articleDate?.content" id="md-editor-rt-preview" class="md-preview default-theme">
            </div>
        </div>

    </div>
</template>
<style>
@import "@/assets/style.css";
</style>
<style  scoped>
.articleWrapper {
    width: 60%;
    margin: 0 auto;
    padding: 100px 0;
}

.title {
    font-size: 30px;
    padding: 0 0 22px;
    letter-spacing: .4px;
    font-weight: 800;
}

.infomation {
    font-size: 13px;
}
</style>