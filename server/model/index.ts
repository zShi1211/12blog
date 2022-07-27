import sequelize from './db'
import './Admin'
import './Article'
import './Comment'
import './Letter'
import './Share'
import './SubComment'
import "./relation"


// 同步数据库
(async () => {
   const res =  await sequelize.sync();
})();