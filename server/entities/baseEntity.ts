import { validate } from 'class-validator'
import { plainToClass } from "class-transformer"

export default abstract class BaseEntity {
    // 默认不允许出现未给的属性
    async validate(skipMissingProperties: boolean = false) {
        const res = await validate(this, { skipMissingProperties });
        if (res.length == 0) return null;
        return res;
    }
    // 将平面对象转成class<T>对象
    static plainToClass<T>(cla: new () => T, obj: object): T {
        return plainToClass(cla, obj);
    }
}
