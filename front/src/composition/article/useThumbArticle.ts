import { likeArticle } from "@/api/article";
import { computed, type Ref } from "vue";
import type { IAritcleData } from "./usearticleListData";
import useLikeArticles from "./useLikeArticles";

export default function useThumbArticle(articleDate: Ref<IAritcleData | undefined>) {
    const { artsIdList } = useLikeArticles();
    const isLike = computed(() => {
        return artsIdList.value.includes(articleDate.value!.id)
    })
    async function upThumbHandle() {
        if (isLike.value) {
            artsIdList.value = artsIdList.value.filter(i => i != articleDate.value!.id)
        } else {
            artsIdList.value = [...artsIdList.value, articleDate.value!.id]
        }
        const res = await likeArticle(articleDate.value!.id.toString(), isLike.value ? articleDate.value!.like + 1 : articleDate.value!.like - 1);
        articleDate.value!.like = res.data.like
    }

    return {
        isLike,
        upThumbHandle
    }
}