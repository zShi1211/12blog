import mockjs from 'mockjs'
import Letter from '../model/Letter'

const data = mockjs.mock({
    "datas|5": [{
        nickname: "@cname",
        content: '@cparagraph(200,550)',
        time: '@date("yyyy-MM-dd")',
        avatar: `@image('300x250')`,
        isPrivate: "@pick([0,1])"
    }]
}).datas;

Letter.bulkCreate(data).then(data =>{
    console.log('done')
})

