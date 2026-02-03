const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  type: {
    type: String,
    required: true,
    enum: ['comic', 'ppt', 'infographic', 'architecture'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
  }],
  parameters: {
    type: mongoose.Schema.Types.Mixed,
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  tags: [{
    type: String,
  }],
}, {
  timestamps: true,
});

// 索引
workSchema.index({ userId: 1, createdAt: -1 });
workSchema.index({ type: 1, createdAt: -1 });
workSchema.index({ status: 1 });

module.exports = mongoose.model('Work', workSchema);
