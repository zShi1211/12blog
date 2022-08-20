<script setup lang='ts'>
import { onMounted, ref, type Ref } from 'vue';
import useUserInfo from '@/composition/commentTextarea/useUserInfo';
import { addLetter } from '@/api/letter';

const { userInfo, changeAvatarIndex } = useUserInfo();

const message = ref("");
const errMsg = ref("");
const isPrivate = ref(false);
const isEmitting = ref(false);
function validate() {
    if (userInfo.value.nickname.trim() === '') {
        errMsg.value = "你的名字是第一印象!"
        return false
    }
    else if (message.value.trim() === "") {
        errMsg.value = "偷偷告诉我你的作文是不是0分!"
        return false
    } else {
        errMsg.value = ""
        return true
    }
}
async function onSubmitHandle() {
    if (!validate()) return;
    const res: any = await addLetter({
        content: message.value,
        time: new Date().valueOf(),
        ...userInfo.value,
        isPrivate: isPrivate.value
    })
    // 发送成功
    if (!res.err) {
        isEmitting.value = true;
        setTimeout(() => {
            isEmitting.value = false;
            isPrivate.value = false;
            message.value = ""
        }, 2000);
    }
}
</script>

<template>
    <div class="letterPageWrapper">
        <Transition name="emit">
            <div class="box" v-show="!isEmitting">
                <div class="letter">
                    <div class="seal">
                        <img src="@/assets/img/before.png" alt="">
                    </div>
                    <div class="form">
                        <div class="formWrapper">
                            <div class="item content">
                                <div class="avatar" @click="changeAvatarIndex">
                                    <img :src="userInfo.avatar" alt="">
                                </div>
                                <div class="info">
                                    <div class="nickname">
                                        <p>Name:</p>
                                        <input type="text" v-model="userInfo.nickname">
                                    </div>
                                    <div class="message">
                                        <p>Message:</p>
                                        <textarea v-model="message"></textarea>
                                    </div>

                                </div>
                            </div>
                            <div class="item privacy">
                                <input type="checkbox" id="privacyCheck" v-model="isPrivate">
                                <label for="privacyCheck">
                                    仅博主可见
                                </label>

                            </div>
                            <div class="item submit">
                                <span @click="onSubmitHandle">Submit</span>
                            </div>
                            <div class="item err" v-show="errMsg">{{ errMsg }}</div>
                        </div>
                    </div>
                    <div class="body">
                        <img src="@/assets/img/after.png" alt="">
                    </div>
                </div>
            </div>
        </Transition>
        <p class="link">
            <router-link to="/letters"> 看看其他小伙伴说了甚</router-link>
        </p>
    </div>
</template>

<style  scoped>
.letterPageWrapper {
    scroll-snap-align: end;
    height: 100vh;
    width: 100%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    transform-style: preserve-3d;
}

.box {
    overflow: hidden;
    height: 85vh;
    display: flex;
    width: 530px;
    align-items: end;
}

.emit-leave-active {
    animation: emitting 2s infinite;
}


.emit-enter-active {
    opacity: 0;
    transition: all 1s;
}

.emit-enter-to {
    opacity: 1;

}


@keyframes emitting {
    0% {
        transform: translateY(0) scale(1, 1) rotateX(0deg);
    }

    20% {
        transform: translateY(-20%) scale(1) rotateX(0deg);
        opacity: 1;
    }

    80% {
        transform: translateY(-50%) scale(0.4, 0.5) rotateX(50deg);
        opacity: 0.7;
    }

    100% {
        transform: translateY(-60%) scale(0.4, 0.5) rotateX(50deg);
        opacity: 0;
    }
}

.box.emitting .form {
    transform: translateY(50%);
    transition: all 2.4s;
}


.letter {
    position: relative;
    width: 100%;
}


.letter .form {
    width: 90%;
    background: url("@/assets/img/letter_bg.png");
    left: 0;
    right: 0;
    margin: auto;
    bottom: 0;
    position: absolute;
    height: 85vh;
    padding: 20px 20px 37% 20px;
    box-sizing: border-box;
}

.formWrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
}


.body,
.seal {
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    align-items: flex-end;
    box-sizing: border-box;
    pointer-events: none;
}

.seal {
    transform: translateY(-40.5%);
}

.seal img,
.body img {
    width: 100%;
    object-fit: contain;

}

.form .item {
    margin-bottom: 10px;
}

.form .item.content {
    display: flex;
    align-items: center;
    flex-grow: 1;
}

.form .item .info {
    flex-grow: 1;
}

.form .item .info p {
    padding: 10px 0;
}

.form .item.content .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    margin-right: 20px;

}

.form .item.content .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.form .item.content .info {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.form .item.content .info .message {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.form .item.content input {
    color: dimgray;
    background: none;
    padding: 10px;
    border: 1px solid #BDBDBD;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
    outline: none;
}

.form .item.content textarea {
    color: dimgray;
    background: none;
    padding: 10px 10px;
    border: 1px solid #BDBDBD;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
    flex-grow: 1;
    outline: none;
    resize: none;
}

.err {
    text-align: center;
    color: #f76;
    padding-top: 10px;
    position: absolute;
    bottom: 0;
    transform: translateY(30px);
    left: 0;
    right: 0;
    font-size: 12px;
    margin: auto;
}

.submit {
    text-align: center;
    font-size: 20px;
    text-decoration: underline;
    color: #007fff;
    cursor: pointer;
}

.link {
    margin-top: 20px;
    font-size: 15px;
    text-decoration: underline;
    color: #21abcd;
}

.privacy {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #a3bcd5;
}
</style>