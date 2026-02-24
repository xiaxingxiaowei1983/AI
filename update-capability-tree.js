/**
 * 更新能力树脚本
 * 为现有节点添加详细信息，添加新的能力节点
 */

const { capabilityTree } = require('./capabilities/capability-tree');

// 更新现有节点的详细信息
function updateExistingNodes() {
  console.log('Updating existing capability nodes...');
  
  // 获取所有节点
  const allNodes = capabilityTree.getAllNodes();
  
  // 更新基础操作节点
  const basicOpsNode = allNodes.find(node => node.name === '基础操作' && node.level === 1);
  if (basicOpsNode) {
    basicOpsNode.inputs = ['操作指令', '必要参数'];
    basicOpsNode.outputs = ['操作结果', '执行状态'];
    basicOpsNode.prerequisites = ['工具可用', '权限足够'];
    basicOpsNode.failureBoundaries = ['工具不可用', '权限不足', '参数错误'];
    basicOpsNode.updatedAt = Date.now();
  }
  
  // 更新文件操作节点
  const fileOpsNode = allNodes.find(node => node.name === '文件操作' && node.level === 1);
  if (fileOpsNode) {
    fileOpsNode.inputs = ['文件路径', '操作类型', '编码格式'];
    fileOpsNode.outputs = ['文件内容', '操作状态', '错误信息'];
    fileOpsNode.prerequisites = ['文件存在', '可读权限', '路径有效'];
    fileOpsNode.failureBoundaries = ['文件不存在', '权限不足', '文件损坏', '路径无效'];
    fileOpsNode.updatedAt = Date.now();
  }
  
  // 更新网络请求节点
  const networkNode = allNodes.find(node => node.name === '网络请求' && node.level === 1);
  if (networkNode) {
    networkNode.inputs = ['URL', '请求方法', '请求参数', '请求头'];
    networkNode.outputs = ['响应数据', '状态码', '响应头'];
    networkNode.prerequisites = ['网络连接正常', 'URL有效', '权限足够'];
    networkNode.failureBoundaries = ['网络连接失败', 'URL无效', '权限不足', '超时'];
    networkNode.updatedAt = Date.now();
  }
  
  // 更新数据处理节点
  const dataNode = allNodes.find(node => node.name === '数据处理' && node.level === 1);
  if (dataNode) {
    dataNode.inputs = ['原始数据', '处理规则', '目标格式'];
    dataNode.outputs = ['处理后数据', '处理状态', '错误信息'];
    dataNode.prerequisites = ['数据格式正确', '处理规则有效', '内存足够'];
    dataNode.failureBoundaries = ['数据格式错误', '处理规则无效', '内存不足', '处理超时'];
    dataNode.updatedAt = Date.now();
  }
  
  // 更新缓存管理节点
  const cacheNode = allNodes.find(node => node.name === '缓存管理' && node.level === 1);
  if (cacheNode) {
    cacheNode.inputs = ['缓存键', '缓存值', '过期时间'];
    cacheNode.outputs = ['缓存状态', '缓存值', '错误信息'];
    cacheNode.prerequisites = ['缓存系统可用', '内存足够', '键格式有效'];
    cacheNode.failureBoundaries = ['缓存系统不可用', '内存不足', '键格式无效', '写入失败'];
    cacheNode.updatedAt = Date.now();
  }
  
  // 更新可复用流程节点
  const processesNode = allNodes.find(node => node.name === '可复用流程' && node.level === 2);
  if (processesNode) {
    processesNode.inputs = ['流程参数', '上下文信息', '执行条件'];
    processesNode.outputs = ['流程结果', '执行状态', '错误信息'];
    processesNode.prerequisites = ['流程定义存在', '参数完整', '条件满足'];
    processesNode.failureBoundaries = ['流程定义不存在', '参数不完整', '条件不满足', '执行失败'];
    processesNode.updatedAt = Date.now();
  }
  
  // 更新PCEC进化流程节点
  const pcecNode = allNodes.find(node => node.name === 'PCEC进化流程' && node.level === 2);
  if (pcecNode) {
    pcecNode.inputs = ['进化目标', '当前能力', '约束条件'];
    pcecNode.outputs = ['进化结果', '新能力', '回滚点'];
    pcecNode.prerequisites = ['系统稳定', '资源足够', '约束明确'];
    pcecNode.failureBoundaries = ['系统不稳定', '资源不足', '约束冲突', '进化失败'];
    pcecNode.updatedAt = Date.now();
  }
  
  // 更新热点信息管理节点
  const hotInfoNode = allNodes.find(node => node.name === '热点信息管理' && node.level === 2);
  if (hotInfoNode) {
    hotInfoNode.inputs = ['信息类型', '访问频率', '更新周期'];
    hotInfoNode.outputs = ['热点信息', '缓存状态', '访问统计'];
    hotInfoNode.prerequisites = ['缓存系统可用', '数据来源可靠', '访问模式可预测'];
    hotInfoNode.failureBoundaries = ['缓存系统不可用', '数据来源不可靠', '访问模式不可预测', '内存不足'];
    hotInfoNode.updatedAt = Date.now();
  }
  
  // 更新报告生成节点
  const reportNode = allNodes.find(node => node.name === '报告生成' && node.level === 2);
  if (reportNode) {
    reportNode.inputs = ['报告类型', '数据来源', '格式要求'];
    reportNode.outputs = ['报告内容', '生成状态', '错误信息'];
    reportNode.prerequisites = ['数据完整', '格式明确', '模板存在'];
    reportNode.failureBoundaries = ['数据不完整', '格式不明确', '模板不存在', '生成失败'];
    reportNode.updatedAt = Date.now();
  }
  
  // 更新问题分解策略节点
  const strategiesNode = allNodes.find(node => node.name === '问题分解策略' && node.level === 3);
  if (strategiesNode) {
    strategiesNode.inputs = ['问题描述', '约束条件', '目标要求'];
    strategiesNode.outputs = ['分解方案', '执行路径', '资源需求'];
    strategiesNode.prerequisites = ['问题明确', '约束可识别', '目标可量化'];
    strategiesNode.failureBoundaries = ['问题不明确', '约束不可识别', '目标不可量化', '分解失败'];
    strategiesNode.updatedAt = Date.now();
  }
  
  // 更新商业分析节点
  const businessNode = allNodes.find(node => node.name === '商业分析' && node.level === 3);
  if (businessNode) {
    businessNode.inputs = ['业务数据', '分析维度', '目标指标'];
    businessNode.outputs = ['分析结果', '洞察结论', '建议方案'];
    businessNode.prerequisites = ['数据完整', '维度明确', '指标可量化'];
    businessNode.failureBoundaries = ['数据不完整', '维度不明确', '指标不可量化', '分析失败'];
    businessNode.updatedAt = Date.now();
  }
  
  // 更新技术架构设计节点
  const archNode = allNodes.find(node => node.name === '技术架构设计' && node.level === 3);
  if (archNode) {
    archNode.inputs = ['需求文档', '技术约束', '性能要求'];
    archNode.outputs = ['架构方案', '技术选型', '实施计划'];
    archNode.prerequisites = ['需求明确', '约束可识别', '要求可量化'];
    archNode.failureBoundaries = ['需求不明确', '约束不可识别', '要求不可量化', '设计失败'];
    archNode.updatedAt = Date.now();
  }
  
  // 更新资源优化节点
  const resourceNode = allNodes.find(node => node.name === '资源优化' && node.level === 3);
  if (resourceNode) {
    resourceNode.inputs = ['资源现状', '优化目标', '约束条件'];
    resourceNode.outputs = ['优化方案', '预期效果', '实施步骤'];
    resourceNode.prerequisites = ['现状清晰', '目标明确', '约束可识别'];
    resourceNode.failureBoundaries = ['现状不清晰', '目标不明确', '约束不可识别', '优化失败'];
    resourceNode.updatedAt = Date.now();
  }
  
  console.log('Existing nodes updated successfully');
}

// 添加新的能力节点
function addNewNodes() {
  console.log('Adding new capability nodes...');
  
  // 获取基础操作节点
  const basicOpsNode = capabilityTree.getAllNodes().find(node => node.name === '基础操作' && node.level === 1);
  const processesNode = capabilityTree.getAllNodes().find(node => node.name === '可复用流程' && node.level === 2);
  const strategiesNode = capabilityTree.getAllNodes().find(node => node.name === '问题分解策略' && node.level === 3);
  
  if (basicOpsNode) {
    // 添加智能体操作节点（低层）
    capabilityTree.addNode('智能体操作', 1, basicOpsNode.id, {
      inputs: ['智能体ID', '操作指令', '参数列表'],
      outputs: ['操作结果', '执行状态', '错误信息'],
      prerequisites: ['智能体存在', '指令有效', '权限足够'],
      failureBoundaries: ['智能体不存在', '指令无效', '权限不足', '执行失败']
    });
    
    // 添加配置管理节点（低层）
    capabilityTree.addNode('配置管理', 1, basicOpsNode.id, {
      inputs: ['配置路径', '配置内容', '操作类型'],
      outputs: ['操作结果', '配置状态', '错误信息'],
      prerequisites: ['路径有效', '内容格式正确', '权限足够'],
      failureBoundaries: ['路径无效', '内容格式错误', '权限不足', '操作失败']
    });
  }
  
  if (processesNode) {
    // 添加智能体管理流程节点（中层）
    capabilityTree.addNode('智能体管理流程', 2, processesNode.id, {
      inputs: ['智能体信息', '管理操作', '配置参数'],
      outputs: ['管理结果', '智能体状态', '错误信息'],
      prerequisites: ['智能体存在', '操作有效', '参数完整'],
      failureBoundaries: ['智能体不存在', '操作无效', '参数不完整', '管理失败']
    });
    
    // 添加系统状态诊断流程节点（中层）
    capabilityTree.addNode('系统状态诊断流程', 2, processesNode.id, {
      inputs: ['系统组件', '诊断深度', '时间范围'],
      outputs: ['诊断结果', '状态评估', '错误信息'],
      prerequisites: ['组件存在', '权限足够', '参数有效'],
      failureBoundaries: ['组件不存在', '权限不足', '参数无效', '诊断失败']
    });
  }
  
  if (strategiesNode) {
    // 添加智能体生态管理策略节点（高层）
    capabilityTree.addNode('智能体生态管理策略', 3, strategiesNode.id, {
      inputs: ['生态现状', '管理目标', '约束条件'],
      outputs: ['管理策略', '执行计划', '预期效果'],
      prerequisites: ['现状清晰', '目标明确', '约束可识别'],
      failureBoundaries: ['现状不清晰', '目标不明确', '约束不可识别', '策略制定失败']
    });
    
    // 添加能力进化策略节点（高层）
    capabilityTree.addNode('能力进化策略', 3, strategiesNode.id, {
      inputs: ['当前能力', '进化目标', '约束条件'],
      outputs: ['进化路径', '实施计划', '风险评估'],
      prerequisites: ['能力清晰', '目标明确', '约束可识别'],
      failureBoundaries: ['能力不清晰', '目标不明确', '约束不可识别', '策略制定失败']
    });
  }
  
  console.log('New capability nodes added successfully');
}

// 执行能力修剪
function trimCapabilities() {
  console.log('Checking capabilities for trimming...');
  const trimCandidates = capabilityTree.trimCapabilities();
  console.log(`Found ${trimCandidates.length} candidates for trimming:`);
  trimCandidates.forEach(item => {
    console.log(`- ${item.node.name} (${item.node.getPath()})`);
  });
}

// 显示能力树状态
function displayTreeStatus() {
  console.log('\nCapability tree status:');
  const status = capabilityTree.getStatus();
  console.log(JSON.stringify(status, null, 2));
  
  console.log('\nCapability tree structure:');
  const treeStructure = capabilityTree.exportTree();
  console.log(JSON.stringify(treeStructure, null, 2));
}

// 主函数
function main() {
  console.log('Starting capability tree update...');
  
  // 更新现有节点
  updateExistingNodes();
  
  // 添加新节点
  addNewNodes();
  
  // 执行能力修剪
  trimCapabilities();
  
  // 显示状态
  displayTreeStatus();
  
  console.log('Capability tree update completed successfully!');
}

// 运行主函数
if (require.main === module) {
  main();
}

module.exports = { main };
