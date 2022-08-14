import type { App } from "vue";

// plugins/i18n.js
const m = ["一", "二", "三", "四", "五", "六", '七', '八', '九', '十', '十一', "十二"];

export interface ComponentCustomProperties {
    $dateFormat: (date: Date) => string
  }
export default {
    install: (app: App) => {
        // 日期格式化
        app.config.globalProperties.$dateFormat = (date: Date) => {
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            return `${m[month]}月 ${day}日, ${year}`
        }
    }
}



