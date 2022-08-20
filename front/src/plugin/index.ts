import type { App } from "vue";

const m = ["一", "二", "三", "四", "五", "六", '七', '八', '九', '十', '十一', "十二"];


export default {
    install: (app: App) => {
        /**
         * 
         * @param date 时间对象
         * @returns 格式化字符串
         */
        app.config.globalProperties.$dateFormat = (date: Date) => {
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            return `${m[month]}月 ${day}日, ${year}`
        }

      
    }
}



