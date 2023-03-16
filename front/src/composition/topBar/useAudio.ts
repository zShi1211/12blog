import bgm from '@/assets/mp3/bgm.mp3'
import { reactive } from 'vue';
const audio = new Audio(bgm);
audio.loop = true;
let timer: NodeJS.Timer;
const audioState = reactive({
    isPlay: false,
    duration: 0,
    currentTime: 0,
    loaded: false
})

audio.addEventListener("loadedmetadata", (e: any) => {
    audioState.duration = e.target.duration;
    audioState.loaded = true;
})


function toggle() {
    const status = audio.paused;
    if (status) {
        audio.play();
        audioState.isPlay = status;
        timer = setInterval(() => {
            audioState.currentTime = audio.currentTime;
        })
    } else {
        audio.pause();
        audioState.isPlay = status;
        clearInterval(timer);
    }
}

export default function useAudio() {
    return {
        audioState,
        toggle
    }
}