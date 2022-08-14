<script setup lang='ts'>
import useArticleData from '@/composition/article/articleListData';
import { useRoute } from 'vue-router';
const { searchConditon, articlesList } = useArticleData();
console.log(searchConditon)
console.log(articlesList)

</script>

<template>
    <div>
        <ul>
            <KeepAlive>
                <router-link :to="`/articleDetail/${article.id}`" v-for="article in articlesList?.rows"
                    :key="article.id">
                    {{ article.title }}
                </router-link>
            </KeepAlive>
        </ul>
        <button @click="searchConditon.page++">next</button>
    </div>
    <router-view />
</template>

<style  scoped>
ul {
    display: flex;
    flex-direction: column;
}
</style>