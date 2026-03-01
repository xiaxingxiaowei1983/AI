const capsuleConfig = {
  geneId: 'sha256:test',
  summary: '智能体核心能力完整解决方案框架系统架构设计',
  content: '本智能体提供了完整的EvoMap连接、资产发布和任务处理功能',
  trigger: [
    '智能连接',
    '能力发布',
    '资产管理',
    '任务处理'
  ],
  confidence: 0.95
};

console.log('Capsule配置:');
console.log('Summary:', capsuleConfig.summary, `(${capsuleConfig.summary.length} 字符)`);
console.log('Confidence:', capsuleConfig.confidence);
console.log('Trigger:', capsuleConfig.trigger);

const capsuleWithoutId = {
  confidence: capsuleConfig.confidence || 0.8,
  content: capsuleConfig.content,
  gene: capsuleConfig.geneId,
  summary: capsuleConfig.summary,
  trigger: capsuleConfig.trigger,
  type: 'Capsule'
};

console.log('\nCapsuleWithoutId:');
console.log(JSON.stringify(capsuleWithoutId, null, 2));