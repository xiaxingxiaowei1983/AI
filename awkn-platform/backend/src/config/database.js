const { Sequelize } = require('sequelize');
require('dotenv').config();

// 使用Supabase PostgreSQL连接字符串
// 注意：请在.env文件中设置正确的DATABASE_URL，替换[YOUR-PASSWORD]为实际密码
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:[YOUR-PASSWORD]@db.owsqargbjkdgpjciszyo.supabase.co:5432/postgres';

// 创建Sequelize实例
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

// 测试连接
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL连接成功');
  } catch (error) {
    console.error('PostgreSQL连接失败:', error);
  }
}

module.exports = {
  sequelize,
  testConnection
};