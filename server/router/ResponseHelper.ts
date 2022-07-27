import { ParameterizedContext } from "koa";

export default class ResponseHelper {
    static sendData(data: any, ctx: ParameterizedContext) {
        ctx.body = {
            data,
            err: ""
        }
    }

    static sendError(msg: any, ctx: ParameterizedContext) {
        ctx.body = {
            data: null,
            err: msg
        }
    }
}