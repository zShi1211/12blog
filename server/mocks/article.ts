import mockjs from 'mockjs'
import Article from '../model/Article'

const data = mockjs.mock({
    "datas|5": [{
        title: "@cparagraph(5,10)",
        content: '@cparagraph(200,550)',
        time: '@date("yyyy-MM-dd")',
        like: 200,
        words:1000,
        cover:`@image('300x250')`,
        ispublish: "@pick([0,1])",
        mdString:"@cparagraph(5,10)"
    }]
}).datas;

Article.bulkCreate(data).then(data =>{
    console.log('done')
})

