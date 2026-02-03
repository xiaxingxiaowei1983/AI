const { sequelize } = require('../config/database');
const { Op } = require('sequelize');
const { testConnection } = require('../config/database');
const User = require('../models/User');
const PointsLog = require('../models/PointsLog');
require('dotenv').config();

// 连接数据库
async function connectDB() {
  try {
    await testConnection();
    console.log('PostgreSQL连接成功');
  } catch (error) {
    console.error('PostgreSQL连接失败:', error);
    process.exit(1);
  }
}

// 处理过期积分
async function processExpiredPoints() {
  try {
    console.log('开始处理过期积分...');
    
    // 查找过期的积分记录
    const expiredLogs = await PointsLog.findAll({
      where: {
        status: 'valid',
        expire_time: { [Op.lte]: new Date() }
      },
      include: [{ model: User }]
    });
    
    console.log(`找到 ${expiredLogs.length} 条过期积分记录`);
    
    // 按用户分组处理
    const userUpdates = new Map();
    
    for (const log of expiredLogs) {
      if (!userUpdates.has(log.user_id)) {
        userUpdates.set(log.user_id, {
          recharge_points: 0,
          gift_points: 0,
          logs: []
        });
      }
      
      const userUpdate = userUpdates.get(log.user_id);
      if (log.source_type === 1) {
        userUpdate.recharge_points += log.points;
      } else {
        userUpdate.gift_points += log.points;
      }
      userUpdate.logs.push(log);
    }
    
    // 开始事务
    const transaction = await sequelize.transaction();
    
    try {
      // 更新用户积分和积分记录状态
      for (const [userId, update] of userUpdates.entries()) {
        // 更新用户积分
        const user = await User.findByPk(userId, { transaction });
        await user.update({
          recharge_points: Math.max(0, user.recharge_points - update.recharge_points),
          gift_points: Math.max(0, user.gift_points - update.gift_points)
        }, { transaction });
        console.log(`更新用户 ${userId} 积分: 扣除充值积分 ${update.recharge_points}, 扣除赠送积分 ${update.gift_points}`);
        
        // 更新积分记录状态
        for (const log of update.logs) {
          await log.update({ status: 'expired' }, { transaction });
        }
      }
      
      // 提交事务
      await transaction.commit();
      console.log(`更新 ${expiredLogs.length} 条积分记录状态为过期`);
      console.log('过期积分处理完成');
    } catch (error) {
      // 回滚事务
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error('处理过期积分失败:', error);
  } finally {
    console.log('过期积分任务执行完成');
  }
}

// 执行任务
if (require.main === module) {
  connectDB().then(processExpiredPoints);
}

module.exports = processExpiredPoints;