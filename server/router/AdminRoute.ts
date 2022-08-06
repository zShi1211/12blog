import Router from '@koa/router'
import AdminService from '../service/AdminService';
import ResponseHelper from './ResponseHelper';
import JWT from 'jsonwebtoken'
import koaJwt from 'koa-jwt'
import { secret } from './secret';

const router = new Router({
    prefix: '/api/admin'
});

router.post('/login', async ctx => {
    const { body } = ctx.request;
    const res = await AdminService.login(body);
    const token = JWT.sign({ id: res!.id }, secret);
    ctx.set('Authorization', token);
    ResponseHelper.sendData(res, ctx);
});

router.post('/', async ctx => {
    const { body } = ctx.request;
    const res = await AdminService.add(body);
    ResponseHelper.sendData(res, ctx);
});


// 使用koajwt，发现请求头中存在Authorization，就会解析出信息放在state的userInfo中
router.use(koaJwt({
    secret, key: "userId"
}))

router.delete('/', async ctx => {
    const { userId } = ctx.state;
    const res = await AdminService.delete(userId.id)
    ResponseHelper.sendData(res, ctx);
})

router.put('/', async ctx => {
    const { userId } = ctx.state;
    const { body } = ctx.request
    const res = await AdminService.update(userId.id, body);
    ResponseHelper.sendData(res, ctx);
})

router.put('/pwd', async ctx => {
    const { userId } = ctx.state;
    const { body } = ctx.request
    const res = await AdminService.updatePwd(userId.id, body)
    ResponseHelper.sendData(res, ctx);
})

router.get('/', async ctx => {
    const { userId } = ctx.state;
    const res = await AdminService.findOne(userId.id);
    ResponseHelper.sendData(res, ctx);
})

export default router;
