import Router from '@koa/router'
import ResponseHelper from './ResponseHelper';
import koaJwt from 'koa-jwt'
import { secret } from './secret';
import ArticleService from '../service/ArticleService';
import { ISeartchCondition } from '../service/types';

const router = new Router({
    prefix: '/api/article'
});


router.get('/:id', async ctx => {
    const { id } = ctx.params;
    const res = await ArticleService.findOne(id);
    ResponseHelper.sendData(res, ctx);
})


router.get('/', async ctx => {
    const s: ISeartchCondition = ctx.query;
    console.log(s);
    const res = await ArticleService.findAll(s);
    ResponseHelper.sendData(res, ctx);
})

router.put('/:id/like', async ctx => {
    const { id } = ctx.params;
    const { body: { like } } = ctx.request;
    const res = await ArticleService.update(id, { like })
    ResponseHelper.sendData(res, ctx);

})


// 使用koajwt，发现请求头中存在Authorization，就会解析出信息放在state的userInfo中
router.use(koaJwt({
    secret, key: "userId"
}))


router.post('/', async ctx => {
    const { body } = ctx.request;
    console.log(body)
    const res = await ArticleService.add(body);
    ResponseHelper.sendData(res, ctx);
});


router.delete('/:id', async ctx => {
    const { id } = ctx.params;
    const res = await ArticleService.delete(id)
    ResponseHelper.sendData(res, ctx);
})

router.put('/:id', async ctx => {
    const { id } = ctx.params;
    const { body } = ctx.request
    const res = await ArticleService.update(id, body)
    ResponseHelper.sendData(res, ctx);

})
export default router;



