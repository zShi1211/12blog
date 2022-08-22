import { getAllComment } from "@/api/comment";
import delay from "@/utils/delay";
import { ref, watchEffect, type Ref } from "vue";
import type { IAritcleData } from "../article/useArticleListData";

interface IComment {
    id?: number;
    nickname: string;
    content: string;
    time: number;
    avatar: string;
    SubComments?: ISubComment[]
}

interface ISubComment extends IComment {
    replyId: number;
    isReplySubComment: boolean;
    replySubId?: number | null;
}

interface ITotalComment {
    count: number;
    countAll: number;
    rows: IComment[]
}

export default function useCommentListData(articleDate: Ref<IAritcleData | undefined>) {
    const searchConditon = ref({
        offest: 1,
        limit: 5
    });
    const totalComment = ref<ITotalComment>({
        count: 0,
        countAll: 0,
        rows: []
    })
    const loading = ref(false)
    watchEffect(async () => {
        if (articleDate.value?.id) {
            loading.value = true;
            const res: any = await getAllComment(articleDate.value.id.toString(), searchConditon.value)
            loading.value = false
            totalComment.value.count = res.data.count;
            totalComment.value.countAll = res.data.countAll;
            totalComment.value.rows.push(...res.data.rows);
        }

    })
    return {
        searchConditon,
        totalComment,
        loading
    }

}