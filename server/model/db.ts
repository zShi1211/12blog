import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';
import { mysql } from '../secret'
const sequelize = new Sequelize('blog', 'root', mysql, {
  host: 'localhost',
  dialect: 'mysql',
  dialectModule: mysql2,
});

export default sequelize;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('连接成功');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

