import Router from '@koa/router'
import AdminService from '../service/AdminService';
import ResponseHelper from './ResponseHelper';
import JWT from 'jsonwebtoken'
import koaJwt from 'koa-jwt'
import { secret } from './secret';
import ArticleService from '../service/ArticleService';
import { ISeartchCondition } from '../service/types';
import ShareService from '../service/ShareService';

const router = new Router({
    prefix: '/api/share'
});


router.get('/:id', async ctx => {
    const { id } = ctx.params;
    const res = await ShareService.findOne(id);
     ResponseHelper.sendData(res, ctx);
})


router.get('/', async ctx => {
    const s: ISeartchCondition = ctx.query;
    const res = await ShareService.findAll(s);
     ResponseHelper.sendData(res, ctx);
})


// 使用koajwt，发现请求头中存在Authorization，就会解析出信息放在state的userInfo中
router.use(koaJwt({
    secret, key: "userId"
}))


router.post('/', async ctx => {
    const { body } = ctx.request;
    const res = await ShareService.add(body);
     ResponseHelper.sendData(res, ctx);
});


router.delete('/:id', async ctx => {
    const { id } = ctx.params;
    const res = await ShareService.delete(id)
     ResponseHelper.sendData(res, ctx);
})

router.put('/:id', async ctx => {
    const { id } = ctx.params;
    const { body } = ctx.request
    const res = await ShareService.update(id, body)
     ResponseHelper.sendData(res, ctx);

})

export default router;


