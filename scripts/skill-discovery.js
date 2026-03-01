#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SKILLS_DIR = path.resolve(ROOT_DIR, 'skills');
const METADATA_FILE = path.resolve(SKILLS_DIR, 'metadata.json');

function scanSkillsDir() {
  if (!fs.existsSync(SKILLS_DIR)) {
    console.error('Skills directory not found');
    return [];
  }
  
  const items = fs.readdirSync(SKILLS_DIR, { withFileTypes: true });
  const skills = [];
  
  for (const item of items) {
    if (!item.isDirectory()) continue;
    if (item.name.startsWith('.')) continue;
    if (item.name === 'node_modules') continue;
    
    const skillPath = path.join(SKILLS_DIR, item.name);
    const skill = analyzeSkill(item.name, skillPath);
    if (skill) {
      skills.push(skill);
    }
  }
  
  return skills;
}

function analyzeSkill(name, skillPath) {
  const skill = {
    name,
    path: `skills/${name}`,
    type: detectSkillType(name),
    entryPoints: [],
    dependencies: [],
    metadata: {},
    files: []
  };
  
  const files = fs.readdirSync(skillPath, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile()) {
      skill.files.push(file.name);
      
      if (file.name === 'SKILL.md') {
        try {
          const content = fs.readFileSync(path.join(skillPath, file.name), 'utf8');
          skill.metadata.description = extractDescription(content);
          skill.metadata.category = extractCategory(content);
        } catch (e) {}
      }
      
      if (file.name === '_meta.json' || file.name === 'meta.json') {
        try {
          const meta = JSON.parse(fs.readFileSync(path.join(skillPath, file.name), 'utf8'));
          skill.metadata = { ...skill.metadata, ...meta };
        } catch (e) {}
      }
      
      if (file.name === 'package.json') {
        try {
          const pkg = JSON.parse(fs.readFileSync(path.join(skillPath, file.name), 'utf8'));
          skill.dependencies = Object.keys(pkg.dependencies || {});
          if (pkg.main) {
            skill.entryPoints.push(pkg.main);
          }
        } catch (e) {}
      }
      
      if (file.name === 'index.js' || file.name === 'main.js') {
        skill.entryPoints.push(file.name);
      }
    }
  }
  
  return skill;
}

function detectSkillType(name) {
  const typePatterns = {
    'feishu': 'feishu-integration',
    'github': 'github-integration',
    'notion': 'notion-integration',
    'slack': 'slack-integration',
    'trello': 'trello-integration',
    'evomap': 'evomap-learning',
    'canvas': 'canvas-design',
    'oracle': 'oracle-service',
    'adl-core': 'system-core',
    'capability-evolver': 'evolution-system'
  };
  
  for (const [pattern, type] of Object.entries(typePatterns)) {
    if (name.includes(pattern)) {
      return type;
    }
  }
  
  return 'general';
}

function extractDescription(content) {
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      return trimmed.substring(0, 200);
    }
  }
  return null;
}

function extractCategory(content) {
  const categoryMatch = content.match(/Category[:\s]+(\w+)/i);
  if (categoryMatch) {
    return categoryMatch[1];
  }
  return 'general';
}

function saveMetadata(skills) {
  const metadata = {
    version: '1.0',
    generated: new Date().toISOString(),
    total: skills.length,
    byType: {},
    skills: {}
  };
  
  for (const skill of skills) {
    metadata.skills[skill.name] = skill;
    
    if (!metadata.byType[skill.type]) {
      metadata.byType[skill.type] = [];
    }
    metadata.byType[skill.type].push(skill.name);
  }
  
  fs.writeFileSync(METADATA_FILE, JSON.stringify(metadata, null, 2));
  console.log(`✅ 元数据已保存: ${METADATA_FILE}`);
  console.log(`   共 ${skills.length} 个技能`);
  
  return metadata;
}

function discoverSkills() {
  console.log('🔍 扫描技能库...');
  
  const skills = scanSkillsDir();
  
  console.log(`   发现 ${skills.length} 个技能`);
  
  for (const skill of skills) {
    console.log(`   - ${skill.name} (${skill.type})`);
  }
  
  return saveMetadata(skills);
}

function main() {
  if (require.main === module) {
    discoverSkills();
  }
}

if (require.main === module) {
  discoverSkills();
}

module.exports = { discoverSkills, scanSkillsDir };
