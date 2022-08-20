<script setup lang='ts'>
import useArticleDetailData from '@/composition/article/useArticleDetailData';
import ArticleBar from '@/components/ArticleBar.vue';
import { useRoute } from 'vue-router';
import useThumbArticle from '@/composition/article/useThumbArticle';
import { computed, reactive, ref } from '@vue/reactivity';
import CommentAreatext from '@/components/CommentAreatext.vue'
import useCommentListData from '@/composition/commentList/useCommentListData';
import CommentList from '@/components/CommentList.vue';
import usePublishComment from '@/composition/commentList/usePublishComment';
import useTouchBottomLoad from '@/composition/utils/useTouchBottomLoad';
import SpinTwoBalls from '@/components/Loading/SpinTwoBalls.vue';
// 获取文章数据
const route = useRoute();
const { articleDate } = useArticleDetailData(route.params.id as string)

// 点赞文章
const { isLike, upThumbHandle } = useThumbArticle(articleDate)

// 获取评论列表
const { searchConditon, totalComment, loading } = useCommentListData(articleDate);
// 回复评论
const { isReply,
    replySubInfo,
    emitComm,
    emitSubComm } = usePublishComment(articleDate);

// 发布评论函数
async function onPublishCommentHandle(info: any) {
    let res: any;
    if (isReply.value) {
        res = await emitSubComm(info);
        // 回复失败
        if (res.err) return false
        const replyComm = totalComment.value.rows.find(i => replySubInfo.value?.replyId === i.id)!
        if (replyComm.SubComments) {
            replyComm.SubComments.push(res.data);
        } else {
            replyComm.SubComments = [res.data]
        }
        replySubInfo.value = undefined;
        isReply.value = false;
    } else {
        res = await emitComm(info);
        // 评论失败
        if (res.err) return false;
        totalComment.value.count++;
        totalComment.value.countAll++;
        totalComment.value.rows.unshift(res.data);
    }
    return true
}

function onReplyHandle(replyId: number, isReplySubComment: boolean, nickname: string, replySubId?: number) {
    // 滚动到输入框
    goCommentText();
    // 设置回复状态
    isReply.value = true;
    // 需要回复用户的信息
    replySubInfo.value = {
        replyId,
        isReplySubComment,
        replySubId,
        nickname
    }
}

// 获取评论框dom，
const commentText = ref()
// 让滚动条滚动到评论框dom
function goCommentText() {
    commentText.value.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    })
}

// 评论是否全部加载完
const isCommentLoadDone = computed(() => {
    return totalComment.value.count <= totalComment.value.rows.length
})


const clearTouchBottom = useTouchBottomLoad(onTouchBottomHandle)

function onTouchBottomHandle() {
    // console.log(isCommentLoadDone.value)
    if (isCommentLoadDone.value) {
        // 当数据加载完毕时清理监听函数
        clearTouchBottom();
    };
    searchConditon.value.offest++;
}


</script>

<template>

    <div class="articleWrapper" v-if="articleDate">
        <ArticleBar :upThumbHandle="upThumbHandle" :isLike="isLike" :goCommentText="goCommentText"
            :articleName="articleDate.title" />
        <h1 class="title">{{ articleDate?.title }}</h1>
        <div class="infomation">
            <p>{{ $dateFormat(new Date(articleDate?.time!)) }}</p>
            <p>字数 {{ articleDate?.words }}</p>
            <p>喜欢 {{ articleDate?.like }} </p>
        </div>
        <div class="content">
            <div v-html="articleDate?.content" id="md-editor-rt-preview" class="md-preview default-theme">
            </div>
        </div>
        <div class="commentText" ref="commentText">
            <CommentAreatext :onEmit="onPublishCommentHandle" :isReply="isReply" :cancelReply="() => {
                isReply = false;
            }" :replyName="replySubInfo?.nickname" />
        </div>
        <div class="commentList" v-if="totalComment.count > 0">
            <CommentList :totalComment="totalComment" :onReplyHandle="onReplyHandle" />
            <div class="loadBottom">
                <SpinTwoBalls v-show="loading && !isCommentLoadDone" />
                <p v-if="isCommentLoadDone">已经加载全部内容啦~</p>
            </div>
        </div>

    </div>
</template>
<style>
@import "@/assets/css/style.css";
</style>
<style  scoped>
.articleWrapper {
    width: 60%;
    margin: 0 auto;
    padding: 100px 0;
}

.title {
    font-size: 35px;
    padding: 0 0 22px;
    letter-spacing: .4px;
    font-weight: 800;
}

.infomation {
    font-size: 13px;
    display: flex;
    position: relative;
    color: #666;
    padding-bottom: 20px;
}

.content {
    overflow: hidden;
}

.infomation::after {
    content: "";
    display: block;
    width: 100px;
    height: 1px;
    position: absolute;
    bottom: 0;
    left: 50%;
    background: #666;
    transform: translateX(-50%);
    opacity: 0.1;
}

.infomation p {
    margin-right: 10px;
}

.content {
    padding: 80px 0 50px;
}

.loadBottom {
    display: flex;
    justify-content: center;
    color: #f58220;
}
</style>