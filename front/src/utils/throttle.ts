
/**
* 
* @param fn 需要节流的函数
* @param time 节流间隔时间
*/
export default function throttle(fn: (...ags: any) => any, time: number) {
    let flag = false;
    return (...ags: any) => {
        if (flag) return;
        flag = true;
        setTimeout(() => {
            fn(...ags)
            flag = false;
        }, time)
    }
}