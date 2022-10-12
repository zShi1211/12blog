import mockjs from 'mockjs'
import Admin from '../model/Admin'

const data = mockjs.mock({
    "datas|5": [{
        "id|+1": 1,
        nickname: "shi@id",
        loginid: 'bbs',
        loginpwd: '123',
        avatar: `@image('300x250')`,
    }]
}).datas;

console.log(Admin.bulkCreate(data))

