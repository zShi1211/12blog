import { getOneArticle } from "@/api/article";
import { onMounted, ref } from "vue";
import type { IAritcleData } from "./articleListData";

export default function useArticleDetailData(id: string) {
    const articleDate = ref<IAritcleData>();
    const isLoading = ref(false)
    onMounted(async () => {
        isLoading.value = true;
        articleDate.value = (await getOneArticle(id)).data as any
        isLoading.value = false;
    })
    return {
        articleDate,
        isLoading
    }
}