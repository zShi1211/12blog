import { getAllShare } from "@/api/share";
import { reactive, ref, watchEffect } from "vue";

interface IShareData {
    id: number;
    pictureUrl: string;
    description: string;
    time: number;
}

interface ITotalShare {
    count: number;
    rows: IShareData[]
}

export default function useShareListData() {
    const searchConditon = reactive({
        offest: 1,
        limit: 5
    });
    const totalShare = reactive<ITotalShare>({
        count: 0,
        rows: []
    })
    const loading = ref(false)
    watchEffect(async () => {
        loading.value = true;
        const res: any = await getAllShare(searchConditon);
        totalShare.count = res.data.count;
        totalShare.rows.push(...res.data.rows);
        loading.value = false;
    })
    return {
        searchConditon,
        totalShare,
        loading
    }

}