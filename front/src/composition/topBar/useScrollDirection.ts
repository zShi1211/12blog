import throttle from "@/utils/throttle";
import { ref } from "vue";
export default function useScrollDirection() {
    // 滚动方向
    const direction = ref<'low' | 'up'>("up");
    // 滚动到顶部附近
    const topNear = ref(true);
    let prevPoint = 0;
    const handle = throttle((e: any) => {
        const currentScroll = window.scrollY;
        if (currentScroll > prevPoint) {
            // 标题还没掩盖就不触发
            if (currentScroll < 150) return;
            topNear.value = false;
            direction.value = "low"
        } else {
            if (currentScroll < 150) topNear.value = true;

            direction.value = "up"
        }
        prevPoint = window.scrollY;
    }, 100)
    document.addEventListener("scroll", handle)
    return {
        direction,
        topNear
    }
}