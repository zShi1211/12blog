<script setup lang='ts'>
import useUserInfo from '@/composition/commentTextarea/useUserInfo';
import { reactive, ref, watch, watchEffect } from 'vue';
// 用户个人信息
const { userInfo, changeAvatarIndex } = useUserInfo();

interface IUserInfo {
    nickname: string;
    avatar: string;
    content: string;
}
// Props
interface IProps {
    onEmit: (info: IUserInfo) => Promise<boolean>;
    isReply: boolean;
    cancelReply: () => void,
    replyName?: string
}
const { onEmit, isReply, cancelReply, replyName } = defineProps<IProps>()
// 评论内容
const commContent = ref("")

// 验证用户评论
const errMsg = ref("")
function validate() {
    if (userInfo.value.nickname.trim() === '') {
        errMsg.value = "你的名字是第一印象!"
        return false
    }
    else if (commContent.value.trim() === "") {
        errMsg.value = "偷偷告诉我你的作文是不是0分!"
        return false
    } else {
        errMsg.value = ""
        return true
    }
}

// 提交处理函数
async function onSubmitHandle() {
    if (!validate()) return;
    // 评论成功
    const res = await onEmit({
        content: commContent.value,
        ...userInfo.value,
    });
    if (res) {
        // 清空文本框
        commContent.value = ""
    }

}

</script>

<template>
    <div class="commentWrapper">
        <div class="top">
            <div class="avatar" @click="changeAvatarIndex">
                <img :src="userInfo.avatar" alt="">
            </div>
            <p class="name">
                <input type="text" placeholder="昵称" v-model="userInfo.nickname">
            </p>
        </div>
        <div class="mid">
            <textarea v-model="commContent" class="content" :placeholder="isReply ? `@${replyName}` : '写点什么吧'"
                rows="10"></textarea>
        </div>
        <div class="bottom">
            <button class="emit" @click="onSubmitHandle">发送评论</button>
            <button v-show="isReply" class="cancelReply" @click="cancelReply">取消回复</button>
        </div>
        <Transition name="errMsg">
            <p class="error" v-show="errMsg">{{ errMsg }}</p>
        </Transition>
    </div>

</template>

<style  scoped>
.commentWrapper {
    border: 1px solid rgba(204, 204, 204, 0.5);
    border-radius: 10px;
    padding: 20px;
    margin: 40px 0;
    position: relative;
}

.error {
    position: absolute;
    top: 5px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 14px;
    color: #e00b4b;
}

.top {
    margin-bottom: 20px;
    display: flex;
    align-items: flex-end;
    /* justify-content: space-between; */
}

.avatar {
    border-radius: 50%;
    overflow: hidden;
    width: 50px;
    height: 50px;
    cursor: pointer;
    margin-right: 20px;
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.name {
    flex-grow: 1;
}

.name input {
    border: none;
    padding: 10px 0;
    outline: none;
    border-bottom: 1px dotted rgba(204, 204, 204, 0.5);
    padding: 3px 3px;
    width: 100%;
    background: transparent;
    box-sizing: border-box;
    font-size: 17px;
    color: #888;

}

.name input::placeholder {
    color: #ccc;
    font-size: 14px;
}

.mid {
    margin-bottom: 20px;
    position: relative;
}

.mid textarea {
    border: none;
    border: 1px dotted rgba(204, 204, 204, 0.4);
    border-radius: 4px;
    background: transparent;
    padding: 5px 10px;
    box-sizing: border-box;
    outline: none;
    font-size: 16px;
    width: 100%;
    color: #888;
    resize: vertical;
}

.mid textarea::placeholder {
    color: #ccc;
    font-size: 14px;
}

.commentWrapper textarea:focus,
.commentWrapper input:focus {
    border-color: #ccc;
}

.bottom button {
    cursor: pointer;
    padding: 7px 25px;
    border-radius: 3px;
    transition: 0.7s;
    outline: none;
    border: none;
    user-select: none;
    color: #eee;
}

.emit {
    background: #0084ffdc;
    margin-right: 20px;
}

.cancelReply {
    background: #df1d57;
}

.emit:hover {
    background: #0084ff;
    color: #fff;
}

.cancelReply:hover {
    background: #e00b4b;
    color: #fff;
}

.errMsg-enter-active,
.errMsg-leave-active {
    transition: opacity 0.5s ease;
}

.errMsg-enter-from,
.errMsg-leave-to {
    opacity: 0;
}
</style>