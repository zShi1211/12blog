
import throttle from '@/utils/throttle';
import { onMounted, onUnmounted } from 'vue';

/**
 * 
 * @param touchBottomHandle 还有100px滚动到底部时触发，返回值表示是否加载完数据
 * @returns 时间清理函数
 */
export default function useTouchBottomLoad(touchBottomHandle: () => any): () => any {
    const scrollHanle = throttle((e) => {
        let scrollHeight = e.target.documentElement.scrollHeight
        let currentHeight = window.scrollY + window.innerHeight;
        // 还有100px触底触发
        if (currentHeight >= scrollHeight - 100) {
             touchBottomHandle();
        }
    }, 100)

    

    onMounted(() => {
        document.addEventListener("scroll", scrollHanle);
    })
    onUnmounted(() => {
        document.removeEventListener("scroll", scrollHanle);
    })
    return () => {
        document.removeEventListener("scroll", scrollHanle);
    }
}



