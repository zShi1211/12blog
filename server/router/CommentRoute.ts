import Router from '@koa/router'
import ResponseHelper from './ResponseHelper';
import koaJwt from 'koa-jwt'
import { secret } from './secret';
import { IPagingCondition,  } from '../service/types';
import CommentService from '../service/CommentService';

const router = new Router({
    prefix: '/api/comment'
});

router.get('/:id', async ctx => {
    const { id } = ctx.params;
    const res = await CommentService.findOne(id);
    ResponseHelper.sendData(res, ctx);
})

router.get('/all/:articleId', async ctx => {
    const { articleId } = ctx.params;
    const s: IPagingCondition = ctx.query;
    const res = await CommentService.findAll(articleId, s);
    ResponseHelper.sendData(res, ctx);
})




router.post('/', async ctx => {
    const { body } = ctx.request;
    const res = await CommentService.add(body);
    ResponseHelper.sendData(res, ctx);
});

// 使用koajwt，发现请求头中存在Authorization，就会解析出信息放在state的userInfo中
router.use(koaJwt({
    secret, key: "userId"
}))

router.delete('/:id', async ctx => {
    const { id } = ctx.params;
    const res = await CommentService.delete(id)
    ResponseHelper.sendData(res, ctx);
})



export default router;


