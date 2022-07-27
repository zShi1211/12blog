import koaMulter from '@koa/multer'
import Router from '@koa/router'
import path from 'path'
import fs from 'fs'
import ResponseHelper from './ResponseHelper';

const router = new Router({
    prefix: "/api/upload"
});

// 文件上传地址
const uploadPath = path.resolve(__dirname, '../public/upload')
const storage = koaMulter.diskStorage({
    async destination(req, file, cb) {
        try {
            const res = await fs.promises.stat(uploadPath);
        } catch (error) {
            // 如果目录不存在就会报错，创建一个目录
            await fs.promises.mkdir(uploadPath, { recursive: true })
        }
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = koaMulter({
    storage,
    fileFilter(req, file, cb) {
        const whileList = ['.jpg', '.png', 'jpeg', '.gif', '.webp', '.mp3', '.jfif'];
        if (whileList.includes(path.extname(file.originalname))) {
            cb(null, true)
        } else {
            cb(new Error(`不支持${path.extname(file.originalname)}扩展名`), false)
        }
    }
});


router.post(
    '/',
    upload.single('image'),
    ctx => {
        let filename = path.join("/upload",ctx.request.file.filename);
        filename = filename.replace(/\\\\?/g, "\/");
        ResponseHelper.sendData(filename, ctx);
    }
);


export default router;