import { addComment } from "@/api/comment";
import { addSubComment } from "@/api/subComment";
import { ref, type Ref } from "vue";
import type { IAritcleData } from "../article/usearticleListData";

interface IUserCommentInfo {
    nickname: string;
    content: string;
    avater: string;
}

interface ICommentInfo extends IUserCommentInfo {
    time: number;
    articleId?: number;
}

interface IReplySubInfo {
    replyId: number;
    isReplySubComment: boolean;
    replySubId?: number;
    nickname:string;
}

interface ISubCommentInfo extends ICommentInfo {
    replyId: number;
    isReplySubComment: boolean;
    replySubId?: number;
}



export default function usePublishComment(articleDate: Ref<IAritcleData | undefined>) {
    // 是否添加评论或者回复评论
    const isReply = ref(false);
    // 如果是回复评论，填入子评论信息
    const replySubInfo = ref<IReplySubInfo>()

    // 添加评论信息
    const commentInfo = ref<ICommentInfo>()
    // 回复子评论信息
    const subCommentInfo = ref<ISubCommentInfo>()
    // 添加评论函数
    async function emitComm(info: IUserCommentInfo) {
        commentInfo.value = {
            ...info,
            time: new Date().valueOf(),
            articleId: articleDate.value!.id
        }
        return await addComment(commentInfo.value);
    }

    // 添加子评论函数
    async function emitSubComm(info: IUserCommentInfo) {
        subCommentInfo.value = {
            ...info,
            time: new Date().valueOf(),
            replyId: replySubInfo.value!.replyId,
            isReplySubComment: replySubInfo.value!.isReplySubComment,
            replySubId: replySubInfo.value?.replySubId
        }
        return await addSubComment(subCommentInfo.value)
    }

    return {
        isReply,
        replySubInfo,
        commentInfo,
        subCommentInfo,
        emitComm,
        emitSubComm
    }

}