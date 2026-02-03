const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const RechargeOrder = sequelize.define('RechargeOrder', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  order_no: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [1, 32]
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  points_granted: {
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
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      isIn: [0, 1, 2, 3]
    }
  },
  pay_channel: {
    type: DataTypes.STRING,
    validate: {
      isIn: ['wechat', 'alipay']
    }
  },
  transaction_id: {
    type: DataTypes.STRING,
    validate: {
      len: [1, 64]
    }
  },
  paid_time: {
    type: DataTypes.DATE
  },
  expire_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  create_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  update_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'recharge_orders',
  indexes: [
    { fields: ['user_id', 'status'] },
    { fields: ['order_no'], unique: true }
  ]
});

// 关联关系
RechargeOrder.belongsTo(User, { foreignKey: 'user_id' });

module.exports = RechargeOrder;