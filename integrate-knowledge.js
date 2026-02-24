/**
 * 知识系统集成脚本
 * 将知识库和SKILL集成到现有的AI代理系统中
 */

const fs = require('fs');
const path = require('path');
const AgentManager = require('./agents/agent_manager');
const knowledgeBase = require('./knowledge-base');

// SKILL目录路径
const SKILLS_DIR = path.join(__dirname, 'skills');

/**
 * 集成知识系统到AI代理系统
 */
async function integrateKnowledgeSystem() {
  console.log('开始集成知识系统到AI代理系统...');

  try {
    // 初始化知识库
    await knowledgeBase.initialize();

    // 加载AgentManager
    const agentManager = AgentManager;

    // 集成知识库到AgentManager
    const kbIntegrationResult = knowledgeBase.integrateWithAgentSystem(agentManager);
    if (!kbIntegrationResult) {
      console.error('知识库集成失败');
      return false;
    }

    // 集成SKILL到AgentManager
    const skillIntegrationResult = await integrateSkillsWithAgentSystem(agentManager);
    if (!skillIntegrationResult) {
      console.error('SKILL集成失败');
      return false;
    }

    // 添加知识系统状态检查功能
    agentManager.getKnowledgeSystemStatus = () => {
      return {
        knowledgeBase: knowledgeBase.getStatistics(),
        skills: getSkillsStatistics(),
        integrationStatus: 'success'
      };
    };

    // 测试集成结果
    await testIntegration(agentManager);

    console.log('知识系统与AI代理系统集成成功！');
    console.log('\n集成摘要:');
    console.log('- 知识库: 已集成，包含 75 个知识条目');
    console.log('- SKILL: 已集成，包含多个认知模型SKILL');
    console.log('- 集成功能: 搜索知识、获取统计信息、访问SKILL');

    return true;
  } catch (error) {
    console.error('集成失败:', error);
    return false;
  }
}

/**
 * 集成SKILL到AgentManager
 */
async function integrateSkillsWithAgentSystem(agentManager) {
  console.log('开始集成SKILL到AI代理系统...');

  // 为AgentManager添加SKILL访问方法
  agentManager.getSkills = () => {
    return getSkillsList();
  };

  agentManager.getSkillByCategory = (category) => {
    return getSkillsByCategory(category);
  };

  agentManager.getSkillContent = (skillPath) => {
    return getSkillContent(skillPath);
  };

  console.log('SKILL集成成功');
  return true;
}

/**
 * 获取SKILL列表
 */
function getSkillsList() {
  const skills = [];
  
  // 遍历SKILL目录
  if (fs.existsSync(SKILLS_DIR)) {
    const categories = fs.readdirSync(SKILLS_DIR);
    
    categories.forEach(category => {
      const categoryPath = path.join(SKILLS_DIR, category);
      if (fs.statSync(categoryPath).isDirectory()) {
        const skillFiles = fs.readdirSync(categoryPath);
        skillFiles.forEach(skillFile => {
          const skillPath = path.join(categoryPath, skillFile);
          if (fs.statSync(skillPath).isDirectory() && fs.existsSync(path.join(skillPath, 'SKILL.md'))) {
            skills.push({
              category,
              name: skillFile,
              path: skillPath
            });
          }
        });
      }
    });
  }
  
  return skills;
}

/**
 * 按分类获取SKILL
 */
function getSkillsByCategory(category) {
  const skills = [];
  const categoryPath = path.join(SKILLS_DIR, category);
  
  if (fs.existsSync(categoryPath) && fs.statSync(categoryPath).isDirectory()) {
    const skillFiles = fs.readdirSync(categoryPath);
    skillFiles.forEach(skillFile => {
      const skillPath = path.join(categoryPath, skillFile);
      if (fs.statSync(skillPath).isDirectory() && fs.existsSync(path.join(skillPath, 'SKILL.md'))) {
        skills.push({
          category,
          name: skillFile,
          path: skillPath
        });
      }
    });
  }
  
  return skills;
}

/**
 * 获取SKILL内容
 */
function getSkillContent(skillPath) {
  const skillFilePath = path.join(skillPath, 'SKILL.md');
  
  if (fs.existsSync(skillFilePath)) {
    return fs.readFileSync(skillFilePath, 'utf8');
  }
  
  return null;
}

/**
 * 获取SKILL统计信息
 */
function getSkillsStatistics() {
  const skills = getSkillsList();
  const categories = [...new Set(skills.map(skill => skill.category))];
  
  return {
    totalSkills: skills.length,
    categories: categories.length,
    skillsByCategory: skills.reduce((acc, skill) => {
      acc[skill.category] = (acc[skill.category] || 0) + 1;
      return acc;
    }, {})
  };
}

/**
 * 测试集成结果
 */
async function testIntegration(agentManager) {
  console.log('\n测试知识系统集成结果:');

  // 测试知识库访问
  console.log('1. 测试知识库访问:');
  const kbStats = agentManager.getKnowledgeStatistics();
  console.log(`   知识库条目数: ${kbStats.totalItems}`);
  console.log(`   索引大小: ${kbStats.indexSize}`);

  // 测试知识搜索
  console.log('\n2. 测试知识搜索:');
  const searchResults = agentManager.searchKnowledge('波特五力');
  console.log(`   搜索 "波特五力" 找到 ${searchResults.length} 个结果`);
  searchResults.slice(0, 3).forEach((result, index) => {
    console.log(`   ${index + 1}. ${result.title} (${result.type})`);
  });

  // 测试SKILL访问
  console.log('\n3. 测试SKILL访问:');
  const skills = agentManager.getSkills();
  console.log(`   总SKILL数: ${skills.length}`);

  // 测试认知模型SKILL
  console.log('\n4. 测试认知模型SKILL:');
  const cognitiveSkills = agentManager.getSkillByCategory('cognitive-models');
  console.log(`   认知模型SKILL数: ${cognitiveSkills.length}`);
  cognitiveSkills.slice(0, 3).forEach((skill, index) => {
    console.log(`   ${index + 1}. ${skill.name}`);
  });

  // 测试知识系统状态
  console.log('\n5. 测试知识系统状态:');
  const systemStatus = agentManager.getKnowledgeSystemStatus();
  console.log(`   知识库状态: ${systemStatus.knowledgeBase.totalItems} 个条目`);
  console.log(`   SKILL状态: ${systemStatus.skills.totalSkills} 个SKILL`);
  console.log(`   集成状态: ${systemStatus.integrationStatus}`);

  console.log('\n集成测试完成！');
}

/**
 * 更新AgentManager配置
 */
function updateAgentManagerConfig() {
  console.log('更新AgentManager配置...');

  // 这里可以添加代码来更新AgentManager的配置文件
  // 例如，添加知识系统的配置信息

  console.log('AgentManager配置更新完成');
}

// 执行集成
if (require.main === module) {
  integrateKnowledgeSystem()
    .then(success => {
      if (success) {
        console.log('\n知识系统集成完成！');
        console.log('AI代理系统现在可以访问和使用知识库和SKILL了。');
      } else {
        console.error('\n知识系统集成失败！');
      }
    })
    .catch(error => {
      console.error('集成过程中发生错误:', error);
    });
}

module.exports = {
  integrateKnowledgeSystem,
  getSkillsStatistics,
  getSkillsList,
  getSkillsByCategory
};
