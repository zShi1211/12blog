import { ref, watch, watchEffect } from "vue";

/**
 * 
 * @returns 喜欢的文章id
 */
export default function useLikeArticles() {
    const artsString = localStorage.getItem("likeArticles");
    const artsIdList = ref<number[]>([]);
    if (artsString) {
        artsIdList.value = JSON.parse(artsString);
    } else {
        localStorage.setItem("likeArticles", JSON.stringify([]))
    }

    watch(artsIdList, (state) => {
        localStorage.setItem("likeArticles", JSON.stringify(state))
    })
    return { artsIdList }
}