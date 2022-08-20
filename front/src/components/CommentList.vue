<script setup lang='ts'>
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
interface IReplyHandle {
    (replyId: number, isReplySubComment: boolean, nickname: string, replySubId?: number): void
}
interface IProps {
    totalComment: ITotalComment,
    onReplyHandle: IReplyHandle
}
const { totalComment } = defineProps<IProps>()


</script>

<template>
    <div class="commentWrapper">
        <h1 class="commentListTitle">评论列表 ({{ totalComment.countAll }})</h1>
        <div class="commentList">
            <TransitionGroup name="comment">
                <div class="commentItem" v-for="comment in totalComment.rows" :key="comment.id">
                    <div class="parentCommentItem">
                        <div class="info">
                            <div class="left">
                                <div class="avatar">
                                    <img :src="comment.avatar" alt="">
                                </div>
                                <p class="nickname">{{ comment.nickname }}</p>
                            </div>
                            <div class="right">
                                <p class="reply" @click="() => {
                                    onReplyHandle(comment.id as number, false, comment.nickname);
                                }">回复</p>
                                <p class="time">{{ $dateFormat(new Date(comment.time)) }}</p>
                            </div>
                        </div>
                        <div class="content">{{ comment.content }}</div>
                    </div>
                    <div class="subCommentList">
                        <TransitionGroup name="comment">

                            <div class="subCommentItem" v-for="subComment in comment.SubComments" :key="subComment.id">
                                <div class="info">
                                    <div class="left">
                                        <div class="avatar">
                                            <img :src="subComment.avatar" alt="">
                                        </div>
                                        <p class="nickname">{{ subComment.nickname }}</p>
                                    </div>
                                    <div class="right">
                                        <p class="reply" @click="() => {
                                            onReplyHandle(comment.id as number, true, subComment.nickname, subComment.id);
                                        }">回复</p>
                                        <p class="time">{{ $dateFormat(new Date(subComment.time)) }}</p>
                                    </div>
                                </div>
                                <div class="content">
                                    <span class="replyInfo" v-if="subComment.isReplySubComment">
                                        @{{ comment.SubComments?.find(c => c.id === subComment.replySubId)?.nickname }}
                                    </span>
                                    {{ subComment.content }}
                                </div>
                            </div>
                        </TransitionGroup>

                    </div>
                </div>
            </TransitionGroup>
        </div>
    </div>
</template>

<style  scoped>
.commentWrapper {
    padding: 15px 0px;
    color: #999;
}

.commentListTitle {
    font-size: 23px;
    margin-bottom: 20px;
    text-decoration: underline;
    font-style: oblique;
}

.info {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.info .left {
    display: flex;
    align-items: center;
}

.info .left .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    box-sizing: border-box;
}

.info .left .nickname {
    color: #ef6d57;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.info .reply {
    color: #ef6d57;
    margin-right: 5px;
    opacity: 0;
    transition: opacity 0.3s;
    cursor: pointer;
}

.parentCommentItem:hover .reply {
    opacity: 1;
}

.subCommentItem:hover .reply {
    opacity: 1;
}

.commentItem {
    padding-top: 10px;
    border-bottom: 1px solid rgb(241, 236, 236);
}

.parentCommentItem {
    padding-bottom: 15px;
}

.subCommentList {
    padding-left: 50px;
}

.subCommentItem {
    position: relative;
    padding: 10px 0 15px;
}

.subCommentItem::before {
    width: calc(100% - 50px);
    content: "";
    display: block;
    border-top: 1px solid rgb(241, 236, 236);
    position: absolute;
    top: 0;
    left: 50px;
}

.info .right {
    display: flex;
    font-size: 12px;
}

.content {
    padding: 5px 0 0 50px;
    line-height: 1.5;
}

.replyInfo {
    background-color: rgb(71, 210, 210);
    color: #fff;
    padding: 0px 4px;
    border-radius: 10px;
    margin-right: 4px;
}

.comment-enter-to {
    opacity: 1;

}

.comment-enter-active {
    transition: opacity 2s ease;
}

.comment-enter-from {
    opacity: 0;
}
</style>