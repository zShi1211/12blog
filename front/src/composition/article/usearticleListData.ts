import { getAllArticle } from "@/api/article";
import { ref, watchEffect } from "vue";

export interface IAritcleData {
    id: number;
    title: string;
    content: string;
    time: number;
    description: string;
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
    const searchConditon = ref({
        page: 1,
        limit: 5
    });
    const articlesList = ref<ITotalArticle>({
        count: 0,
        rows: []
    });
    watchEffect(async () => {
        const res = (await getAllArticle(searchConditon.value)).data as any;
        articlesList.value.count = res.count;
        articlesList.value.rows.push(...res.rows);
    })
    return {
        searchConditon,
        articlesList
    }
}