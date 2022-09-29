import { getAllArticle } from "@/api/article";
import { reactive, ref, watchEffect } from "vue";

export interface IAritcleData {
    id: number;
    title: string;
    content: string;
    time: number;
    cover: string;
    ispublish: boolean;
    mdString: string;
    like: number;
    words: number;
}
interface ITotalArticle {
    count: number;
    rows: IAritcleData[]
}

export default function useArticleListData() {
    const searchConditon = reactive({
        offest: 1,
        limit: 8
    });
    const totalArticlesList = reactive<ITotalArticle>({
        count: 0,
        rows: []
    });
    const loading = ref(false)
    watchEffect(async () => {
        loading.value = true;
        const res = (await getAllArticle(searchConditon)).data as any;
        totalArticlesList.count = res.count;
        totalArticlesList.rows.push(...res.rows);
        loading.value = false;
    })
    return {
        searchConditon,
        totalArticlesList,
        loading
    }
}