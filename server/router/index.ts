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
import koaStatic from "koa-static";
import koaConnect from 'koa-connect';
import historyFallback from 'connect-history-api-fallback'
import fallback from './utils/fallback';


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
const middleware = historyFallback({
    rewrites: [
        {
            from: /^\/admin.*$/,
            to: function (context) {
                return fallback(context, '/admin/index.html')
            }
        },
        {
            from: /^\/.*$/,
            to: function (context) {
                return fallback(context, '/client/index.html')
            }
        }
    ]
})
app.use(koaConnect(middleware as any))




// 静态资源托管
const staticPath = process.env.NODE_ENV === 'production' ? path.resolve(__dirname, "./public") : path.resolve(__dirname, "../public")
app.use(koaStaticCache(staticPath, {
    maxAge: 60 * 60 * 24 * 365,
    preload: true,
    dynamic: true
}));

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

