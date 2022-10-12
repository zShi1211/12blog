import mockjs from 'mockjs'
import SubComment from '../model/SubComment'

/* 
这里要导入关系
在数据库中存在管理，但在模型中不存在
*/
import "../model/relation"

const data = mockjs.mock({
    "datas|50": [{
        nickname: "user@id",
        content: '@cparagraph(20,50)',
        time: '@date("yyyy-MM-dd")',
        avatar: `@image('300x250')`,
        "replyId|1-15": 0,
        "isReplyIdComment": "@pick([0,1])",
        "replySubId|1-50": 0
    }]
}).datas;
SubComment.bulkCreate(data)

