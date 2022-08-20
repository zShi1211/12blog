import { computed, reactive, ref, watch, watchEffect } from "vue"
import avatarList from '@/utils/avatarList';
const key = "userInfo"
export default function useUserInfo() {
    const userInfoString = localStorage.getItem(key)
    const avatarIndex = ref(0)
    const userInfo = ref({
        avatar: avatarList[avatarIndex.value],
        nickname: ""
    })
    if (userInfoString) {
        userInfo.value = JSON.parse(userInfoString)
    } else {
        localStorage.setItem(key, JSON.stringify(userInfo.value));
    }
    watch(userInfo.value, (state) => {
        localStorage.setItem(key, JSON.stringify(state));
    })
    // 当头像下标改变时改变用户信息头像地址
    watch(avatarIndex, state => {
        userInfo.value.avatar = avatarList[avatarIndex.value]
    })
    function changeAvatarIndex() {
        avatarIndex.value = (avatarIndex.value + 1) % avatarList.length
    }

    return {
        userInfo,
        changeAvatarIndex,
        avatarIndex
    }
}