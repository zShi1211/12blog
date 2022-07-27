import Koa from 'koa';
import ResponseHelper from './ResponseHelper';
import bodyParser from 'koa-bodyparser'
import adminRoute from './AdminRoute'
import articleRoute from './ArticleRoute'
import commentRoute from './CommentRoute'
import letterRoute from './LetterRoute'
import shareRoute from './ShareRoute'
import subCommentRoute from './SubCommentRoute'
import Upload from './Upload'
import koaStaticCache from 'koa-static-cache'
import path from 'path';

const app = new Koa();

// 错误处理
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (error: any) {
        console.log(error)
        if (error instanceof Error) {
            ResponseHelper.sendError(error.message, ctx);
        } else {
            ResponseHelper.sendError(error, ctx);

        }
    }
})

// 静态资源托管
app.use(koaStaticCache(path.resolve(__dirname,"../public")));

// body解析
app.use(bodyParser())


// 路由
app.use(adminRoute.routes());
app.use(articleRoute.routes());
app.use(commentRoute.routes());
app.use(letterRoute.routes());
app.use(shareRoute.routes());
app.use(subCommentRoute.routes());
app.use(Upload.routes());


app.listen(1111, () => {
    console.log('监听端口1111')
});