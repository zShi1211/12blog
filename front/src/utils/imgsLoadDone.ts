/**
 * 
 * @param imgSrc 图片地址数组
 * @returns 当所有图片加载完成返回ture
 */
export default async function imgsLoadDone(imgSrc: string[]): Promise<boolean> {
    const pros = imgSrc.map(item => {
        return new Promise<void>(async resolve => {
            const img = new Image();
            img.onload = () => {
                resolve();
            }
            img.src = item;
        })
    })
    await Promise.all(pros)
    return true;
}


