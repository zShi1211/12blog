import mockjs from 'mockjs'
import Share from '../model/Share'

const data = mockjs.mock({
    "datas|5": [{
        description: "@cparagraph(1,5)",
        pictureUrl: `@image('300x250')`,
        time: '@date("yyyy-MM-dd")'
    }]
}).datas;

Share.bulkCreate(data)

