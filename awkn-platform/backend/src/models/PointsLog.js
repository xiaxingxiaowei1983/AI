const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const RechargeOrder = require('./RechargeOrder');

const PointsLog = sequelize.define('PointsLog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  source_type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      isIn: [1, 2, 3]
    }
  },
  expire_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  order_no: {
    type: DataTypes.STRING,
    references: {
      model: RechargeOrder,
      key: 'order_no'
    }
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'valid',
    validate: {
      isIn: ['valid', 'expired', 'used']
    }
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  create_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'points_logs',
  indexes: [
    { fields: ['user_id', 'status', 'expire_time'] },
    { fields: ['expire_time', 'status'] },
    { fields: ['order_no'] }
  ]
});

// 关联关系
PointsLog.belongsTo(User, { foreignKey: 'user_id' });
PointsLog.belongsTo(RechargeOrder, { foreignKey: 'order_no', targetKey: 'order_no' });

module.exports = PointsLog;