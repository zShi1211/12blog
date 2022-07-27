import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('blog', 'root', 'zs001211..', {
  host: 'localhost',
  dialect: 'mysql'
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

