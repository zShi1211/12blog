import { getAllLetter } from "@/api/letter";
import { reactive, ref, watchEffect } from "vue";

export interface IAritcleData {
    id: number;
    content: string;
    time: number;
    avatar: string;
    nickname: string;
}
interface ITotalLetter {
    count: number;
    rows: IAritcleData[]
}

export default function useLetterListData() {
    const searchConditon = reactive({
        offest: 1,
        limit: 8
    });
    const totalLetter = reactive<ITotalLetter>({
        count: 0,
        rows: []
    })
    const loading = ref(false)
    watchEffect(async () => {
        loading.value = true;
        const res: any = await getAllLetter(searchConditon);
        totalLetter.count = res.data.count;
        totalLetter.rows.push(...res.data.rows)
        loading.value = false;
    })
    return {
        searchConditon,
        totalLetter,
        loading
    }
}