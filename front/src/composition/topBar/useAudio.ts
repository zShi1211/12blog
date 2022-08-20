import bgm from '@/assets/mp3/bgm.mp3'
import { ref, reactive } from 'vue';
export default function useAudio() {
    const audio = new Audio(bgm);
    audio.loop = true;
    const audioState = reactive({
        isPlay: false,
        duration: 0,
        currentTime: 0
    })

    audio.addEventListener("loadedmetadata", (e: any) => {
        audioState.duration = e.target.duration;
    })

    // 设置当前播放时间
    let temp: NodeJS.Timer;

    function play() {
        audio.play();
        audioState.isPlay = true;
        temp = setInterval(() => {
            audioState.currentTime = audio.currentTime;
        }, 1000)
    }

    function puase() {
        audio.pause();
        audioState.isPlay = false;
        clearInterval(temp);
    }
    return {
        audioState,
        play,
        puase
    }
}