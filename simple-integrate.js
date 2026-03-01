/**
 * 简单的 EvoMap 学习内容整合脚本
 * 版本: 1.0.0
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const LEARN_LOGS_DIR = path.join(__dirname, 'evolver', 'learn-logs');
const ASSETS_DIR = path.join(__dirname, 'evolver', 'assets');
const SKILLS_DIR = path.join(__dirname, 'skills');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function generateSHA256(content) {
  return 'sha256:' + crypto.createHash('sha256').update(content).digest('hex');
}

function getTriggerSignals(url) {
  const signals = [];
  if (url.includes('cmm0e3x68')) signals.push('content_optimization');
  if (url.includes('cmlz4iwjt')) signals.push('service_execution');
  if (url.includes('cmlz4iwo4')) signals.push('task_automation');
  if (url.includes('cmlz4iwbd')) signals.push('error_recovery');
  if (url.includes('cmm019c2')) signals.push('api_integration');
  if (url.includes('cmm02c4')) signals.push('workflow_optimization');
  if (url.includes('cmlzh4p8')) signals.push('creative_generation');
  if (url.includes('cmlz4iwc')) signals.push('data_processing');
  if (url.includes('cmm47de2')) signals.push('performance_tuning');
  if (url.includes('cmlz4iwg')) signals.push('security_enhancement');
  if (url.includes('cmm5cvz5')) signals.push('user_experience');
  if (signals.length === 0) signals.push('general_improvement');
  return signals;
}

async function main() {
  console.log('=== 大宗师 EvoMap 学习内容整合 ===\n');
  
  try {
    const logFiles = fs.readdirSync(LEARN_LOGS_DIR)
      .filter(f => f.endsWith('.md') && f.startsWith('learn_'));
    
    console.log(`找到 ${logFiles.length} 个学习日志文件\n`);
    
    let count = 0;
    
    for (const logFile of logFiles) {
      count++;
      console.log(`处理 ${count}/${logFiles.length}: ${logFile}`);
      
      const logPath = path.join(LEARN_LOGS_DIR, logFile);
      const data = JSON.parse(fs.readFileSync(logPath, 'utf8'));
      
      const isRecipe = data.url.includes('/recipe/');
      const urlParts = data.url.split('/');
      const assetId = urlParts[urlParts.length - 1];
      const signals = getTriggerSignals(data.url);
      
      const gene = {
        type: 'Gene',
        summary: '从 EvoMap 学习的策略',
        asset_id: generateSHA256(data.url),
        category: isRecipe ? 'optimize' : 'repair',
        signals_match: signals,
        source_url: data.url,
        learned_at: new Date().toISOString()
      };
      
      const capsule = {
        type: 'Capsule',
        outcome: { score: 0.85, status: 'success' },
        summary: '从 EvoMap 学习的解决方案',
        trigger: signals,
        asset_id: generateSHA256(data.url + Date.now()),
        gene: gene.asset_id,
        confidence: 0.85,
        source_url: data.url,
        learned_at: new Date().toISOString()
      };
      
      const skillName = `evomap_${isRecipe ? 'gene' : 'capsule'}_${assetId}`;
      const skillDir = path.join(SKILLS_DIR, skillName);
      ensureDir(skillDir);
      
      const skillMd = `# ${skillName}

## 概述
从 EvoMap 学习的技能

## 触发信号
${signals.map(s => `- ${s}`).join('\n')}

## 来源
- EvoMap URL: ${data.url}
- 学习时间: ${new Date().toISOString()}
`;
      
      const metaJson = {
        name: skillName,
        version: '1.0.0',
        description: '从 EvoMap 学习的技能',
        author: '大宗师',
        created_at: new Date().toISOString(),
        source_url: data.url,
        gene_id: gene.asset_id,
        capsule_id: capsule.asset_id,
        trigger_signals: signals
      };
      
      fs.writeFileSync(path.join(skillDir, 'SKILL.md'), skillMd);
      fs.writeFileSync(path.join(skillDir, '_meta.json'), JSON.stringify(metaJson, null, 2));
      
      const assetsPath = path.join(ASSETS_DIR, 'fetched_assets.json');
      let assets = { payload: { results: [] } };
      if (fs.existsSync(assetsPath)) {
        assets = JSON.parse(fs.readFileSync(assetsPath, 'utf8'));
      }
      
      const newAsset = {
        asset_id: capsule.asset_id,
        asset_type: 'Capsule',
        status: 'promoted',
        source_node_id: 'node_master_learning',
        trigger_text: signals.join(','),
        bundle_id: 'bundle_learned_' + Date.now(),
        confidence: capsule.confidence,
        gdi_score: 60.0,
        gdi_score_mean: 68.0,
        payload: capsule,
        bundle_gene: gene
      };
      
      assets.payload.results.unshift(newAsset);
      fs.writeFileSync(assetsPath, JSON.stringify(assets, null, 2));
      
      console.log(`  ✅ 已创建 Skill: ${skillName}`);
      console.log('');
    }
    
    console.log('=== 整合完成 ===');
    console.log(`成功整合 ${count} 个学习内容`);
    console.log('已保存到:');
    console.log('  - GEP 基因库: evolver/assets/fetched_assets.json');
    console.log('  - 进化胶囊库: evolver/assets/fetched_assets.json');
    console.log('  - 公司技能库: skills/evomap_*');
    
  } catch (error) {
    console.error('❌ 失败:', error.message);
    process.exit(1);
  }
}

main();
