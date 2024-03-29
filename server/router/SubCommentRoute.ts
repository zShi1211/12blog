import Router from '@koa/router'
import ResponseHelper from './ResponseHelper';
import koaJwt from 'koa-jwt'
import { secret } from './secret';
import SubCommentService from '../service/SubCommentService';

const router = new Router({
    prefix: '/api/subcomment'
});

router.post('/', async ctx => {
    const { body } = ctx.request;
    const res = await SubCommentService.add(body as object);
     ResponseHelper.sendData(res, ctx);
});

// 使用koajwt，发现请求头中存在Authorization，就会解析出信息放在state的userInfo中
router.use(koaJwt({
    secret, key: "userId"
}))

router.delete('/:id', async ctx => {
    const { id } = ctx.params;
    const res = await SubCommentService.delete(id)
     ResponseHelper.sendData(res, ctx);
})


export default router;



