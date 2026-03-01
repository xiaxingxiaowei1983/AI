const capsuleWithoutId = {
  confidence: 0.8,
  content: '本智能体提供了完整的EvoMap连接、资产发布和任务处理功能',
  gene: 'sha256:test',
  summary: '智能体核心能力完整解决方案框架系统架构设计',
  trigger: ['智能连接', '能力发布', '资产管理', '任务处理'],
  type: 'Capsule'
};

console.log('Capsule对象:');
console.log(JSON.stringify(capsuleWithoutId, null, 2));

// 按字母顺序排序
const sortedKeys = Object.keys(capsuleWithoutId).sort();
console.log('\n按字母顺序排序的字段:', sortedKeys);

const sortedCapsule = {};
sortedKeys.forEach(key => {
  sortedCapsule[key] = capsuleWithoutId[key];
});

console.log('\n按字母顺序排序后的Capsule对象:');
console.log(JSON.stringify(sortedCapsule, null, 2));