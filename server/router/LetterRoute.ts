import Router from '@koa/router'
import ResponseHelper from './ResponseHelper';
import koaJwt from 'koa-jwt'
import { secret } from './secret';
import { IPagingCondition, } from '../service/types';
import LetterService from '../service/LetterService';

const router = new Router({
    prefix: '/api/letter'
});





router.get('/public', async ctx => {
    const s: IPagingCondition = ctx.query;
    const res = await LetterService.findPublicAll(s);
    ResponseHelper.sendData(res, ctx);
})

router.get('/:id', async ctx => {
    const { id } = ctx.params;
    const res = await LetterService.findOne(id)
    ResponseHelper.sendData(res, ctx);
})

router.post('/', async ctx => {
    const { body } = ctx.request;
    const res = await LetterService.add(body as any);
    ResponseHelper.sendData(res, ctx);
});

// 使用koajwt，发现请求头中存在Authorization，就会解析出信息放在state的userInfo中
router.use(koaJwt({
    secret, key: "userId"
}))

router.get('/', async ctx => {
    const s: IPagingCondition = ctx.query;
    const res = await LetterService.findAll(s);
    ResponseHelper.sendData(res, ctx);
})
router.delete('/:id', async ctx => {
    const { id } = ctx.params;
    const res = await LetterService.delete(id)
    ResponseHelper.sendData(res, ctx);
})


export default router;


