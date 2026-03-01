// 决策分析工具 - 实现引导进化提示词的核心框架
const fs = require('fs');
const path = require('path');

class DecisionAnalyzer {
  constructor() {
    this.analysisSteps = [
      this.stripExcitement.bind(this),
      this.analyzeCosts.bind(this),
      this.judgeProbability.bind(this),
      this.judgeLifeLeverage.bind(this)
    ];
  }

  // 第一步：剥离兴奋感
  stripExcitement(context) {
    console.log('=== 第一步：剥离兴奋感 ===');
    
    const analysis = {
     本质: this.analyzeEssence(context),
     真实回报: this.analyzeRealReturn(context),
     看起来美好但实际平庸的部分: this.analyzeMediocreParts(context)
    };

    console.log('本质:', analysis.本质);
    console.log('真实回报:', analysis.真实回报);
    console.log('看起来美好但实际平庸的部分:', analysis.看起来美好但实际平庸的部分);
    console.log('');
    
    return analysis;
  }

  // 分析事件本质
  analyzeEssence(context) {
    // 基于上下文分析事件的本质
    if (context.includes('创业')) {
      return '创业本质上是一种高风险的商业尝试，需要投入大量时间、精力和资源，追求商业价值和个人价值的实现。';
    } else if (context.includes('学习')) {
      return '学习本质上是一种自我投资，通过获取知识和技能，提升个人能力和竞争力。';
    } else if (context.includes('跳槽')) {
      return '跳槽本质上是职业发展的一种选择，通过改变工作环境和职责，追求更好的职业发展机会和回报。';
    } else {
      return '需要更多背景信息来分析事件本质。';
    }
  }

  // 分析真实回报
  analyzeRealReturn(context) {
    if (context.includes('创业')) {
      return '真实回报包括：潜在的财务收益、个人成长、影响力、自主决策权；但也可能面临财务损失、时间消耗、精神压力。';
    } else if (context.includes('学习')) {
      return '真实回报包括：知识和技能的提升、职业竞争力的增强、个人成长；但需要投入时间和精力，可能暂时影响其他方面。';
    } else if (context.includes('跳槽')) {
      return '真实回报包括：可能的薪资增长、职业发展机会、新的学习环境；但也可能面临适应新环境的挑战、人际关系重建的成本。';
    } else {
      return '需要更多背景信息来分析真实回报。';
    }
  }

  // 分析看起来美好但实际平庸的部分
  analyzeMediocreParts(context) {
    if (context.includes('创业')) {
      return '看起来美好但实际平庸的部分：创业成功的光环、自由的工作时间、成为自己的老板；实际可能面临：长期的工作压力、不确定的收入、巨大的责任负担。';
    } else if (context.includes('学习')) {
      return '看起来美好但实际平庸的部分：获得学位或证书的成就感、知识的积累；实际可能面临：学习过程的枯燥、需要持续投入时间、知识更新的压力。';
    } else if (context.includes('跳槽')) {
      return '看起来美好但实际平庸的部分：更高的薪资、新的工作环境、新的挑战；实际可能面临：适应新环境的困难、人际关系的重建、可能的期望落差。';
    } else {
      return '需要更多背景信息来分析看起来美好但实际平庸的部分。';
    }
  }

  // 第二步：代价分析
  analyzeCosts(context) {
    console.log('=== 第二步：代价分析 ===');
    
    const analysis = {
     必须放弃的东西: this.analyzeTradeoffs(context),
     失去的机会: this.analyzeOpportunityCosts(context),
     生活的结构性变化: this.analyzeStructuralChanges(context)
    };

    console.log('必须放弃的东西:', analysis.必须放弃的东西);
    console.log('失去的机会:', analysis.失去的机会);
    console.log('生活的结构性变化:', analysis.生活的结构性变化);
    console.log('');
    
    return analysis;
  }

  // 分析必须放弃的东西
  analyzeTradeoffs(context) {
    if (context.includes('创业')) {
      return '稳定的收入、固定的工作时间、职业安全感、与家人朋友的相处时间、个人休息时间。';
    } else if (context.includes('学习')) {
      return '娱乐时间、社交时间、可能的收入机会、其他兴趣爱好的投入时间。';
    } else if (context.includes('跳槽')) {
      return '现有的工作稳定性、熟悉的工作环境和同事、已建立的职业网络、可能的晋升机会。';
    } else {
      return '需要更多背景信息来分析必须放弃的东西。';
    }
  }

  // 分析失去的机会
  analyzeOpportunityCosts(context) {
    if (context.includes('创业')) {
      return '在现有公司的晋升机会、稳定的职业发展路径、其他投资机会、个人成长的其他可能性。';
    } else if (context.includes('学习')) {
      return '工作经验的积累、职业晋升的机会、其他技能的学习、赚钱的机会。';
    } else if (context.includes('跳槽')) {
      return '原公司可能的加薪机会、长期发展的潜力、与现有团队的深度合作机会、熟悉领域的专业深化。';
    } else {
      return '需要更多背景信息来分析失去的机会。';
    }
  }

  // 分析生活的结构性变化
  analyzeStructuralChanges(context) {
    if (context.includes('创业')) {
      return '工作时间的不确定性、财务压力的增加、社交圈的变化、生活重心向工作倾斜、风险承受能力的要求提高。';
    } else if (context.includes('学习')) {
      return '时间安排的调整、生活节奏的改变、财务支出的增加、社交活动的减少、压力水平的变化。';
    } else if (context.includes('跳槽')) {
      return '通勤时间的变化、工作内容的调整、人际关系的重建、适应新企业文化的压力、可能的地理搬迁。';
    } else {
      return '需要更多背景信息来分析生活的结构性变化。';
    }
  }

  // 第三步：概率判断
  judgeProbability(context, background) {
    console.log('=== 第三步：概率判断 ===');
    
    const analysis = {
     成功的真实概率: this.analyzeSuccessProbability(context, background),
     失败最可能的方式: this.analyzeFailureModes(context)
    };

    console.log('成功的真实概率:', analysis.成功的真实概率);
    console.log('失败最可能的方式:', analysis.失败最可能的方式);
    console.log('');
    
    return analysis;
  }

  // 分析成功的真实概率
  analyzeSuccessProbability(context, background) {
    if (context.includes('创业')) {
      if (background.includes('有相关经验')) {
        return '基于有相关经验的背景，创业成功的真实概率约为20-30%（参考行业平均水平）。';
      } else {
        return '基于缺乏相关经验的背景，创业成功的真实概率约为5-10%（参考行业平均水平）。';
      }
    } else if (context.includes('学习')) {
      if (background.includes('有学习能力')) {
        return '基于有学习能力的背景，学习成功的真实概率约为80-90%。';
      } else {
        return '基于学习能力有限的背景，学习成功的真实概率约为50-60%。';
      }
    } else if (context.includes('跳槽')) {
      if (background.includes('有相关技能')) {
        return '基于有相关技能的背景，跳槽成功的真实概率约为70-80%。';
      } else {
        return '基于缺乏相关技能的背景，跳槽成功的真实概率约为40-50%。';
      }
    } else {
      return '需要更多背景信息来分析成功的真实概率。';
    }
  }

  // 分析失败最可能的方式
  analyzeFailureModes(context) {
    if (context.includes('创业')) {
      return '资金耗尽、市场需求不足、竞争过于激烈、团队管理问题、产品或服务质量问题、运营能力不足。';
    } else if (context.includes('学习')) {
      return '缺乏持续的动力、时间管理不当、学习方法不正确、外部干扰过多、基础薄弱导致难以跟进。';
    } else if (context.includes('跳槽')) {
      return '新工作与期望不符、适应新环境失败、人际关系问题、技能不匹配、公司文化冲突。';
    } else {
      return '需要更多背景信息来分析失败最可能的方式。';
    }
  }

  // 第四步：人生杠杆判断
  judgeLifeLeverage(context, annualGoals) {
    console.log('=== 第四步：人生杠杆判断 ===');
    
    const analysis = {
     对年度目标的意义: this.analyzeAnnualGoalImpact(context, annualGoals),
     对个人的意义: this.analyzePersonalImpact(context),
     失败的价值: this.analyzeFailureValue(context)
    };

    console.log('对年度目标的意义:', analysis.对年度目标的意义);
    console.log('对个人的意义:', analysis.对个人的意义);
    console.log('失败的价值:', analysis.失败的价值);
    console.log('');
    
    return analysis;
  }

  // 分析对年度目标的意义
  analyzeAnnualGoalImpact(context, annualGoals) {
    if (annualGoals) {
      if (context.includes('创业')) {
        if (annualGoals.includes('财务自由')) {
          return '创业如果成功，将对实现财务自由的年度目标产生重大积极影响；即使失败，也能积累宝贵的经验。';
        } else if (annualGoals.includes('职业发展')) {
          return '创业将为职业发展提供独特的经验和视角，可能加速职业成长，但也存在风险。';
        } else {
          return '需要结合具体的年度目标来分析影响。';
        }
      } else if (context.includes('学习')) {
        if (annualGoals.includes('技能提升')) {
          return '学习将直接有助于实现技能提升的年度目标，是实现目标的重要途径。';
        } else if (annualGoals.includes('职业转型')) {
          return '学习是职业转型的必要准备，对实现职业转型的年度目标至关重要。';
        } else {
          return '需要结合具体的年度目标来分析影响。';
        }
      } else if (context.includes('跳槽')) {
        if (annualGoals.includes('薪资增长')) {
          return '跳槽通常是实现薪资增长的有效途径，对实现薪资增长的年度目标有直接影响。';
        } else if (annualGoals.includes('职业发展')) {
          return '跳槽可以为职业发展提供新的机会和挑战，有助于实现职业发展的年度目标。';
        } else {
          return '需要结合具体的年度目标来分析影响。';
        }
      } else {
        return '需要更多背景信息来分析对年度目标的意义。';
      }
    } else {
      return '未提供年度目标，无法分析对年度目标的意义。';
    }
  }

  // 分析对个人的意义
  analyzePersonalImpact(context) {
    if (context.includes('创业')) {
      return '创业是一种深度的个人挑战和成长机会，无论成功与否，都能培养领导力、决策能力、抗压能力等重要素质，是一种有意义的人生经历。';
    } else if (context.includes('学习')) {
      return '学习是个人成长的持续动力，不仅能提升专业能力，还能培养学习能力、思维能力和适应能力，对个人的长期发展具有重要意义。';
    } else if (context.includes('跳槽')) {
      return '跳槽是职业发展的重要选择，能带来新的学习机会、新的人脉网络和新的挑战，对个人的职业成长和自我认知有积极意义。';
    } else {
      return '需要更多背景信息来分析对个人的意义。';
    }
  }

  // 分析失败的价值
  analyzeFailureValue(context) {
    if (context.includes('创业')) {
      return '创业失败的价值包括：积累宝贵的创业经验、建立行业人脉、了解市场规律、发现自身的优势和不足、培养 resilience（韧性），这些都是未来成功的重要基础。';
    } else if (context.includes('学习')) {
      return '学习失败的价值包括：发现学习方法的问题、了解自身的学习风格、认识到知识的难度和深度、培养坚持不懈的品质，这些都是未来学习成功的重要教训。';
    } else if (context.includes('跳槽')) {
      return '跳槽失败的价值包括：更清楚自己的职业需求、了解不同公司的文化和运作方式、发现自身的优势和不足、积累面试和适应新环境的经验，这些都是未来职业选择的重要参考。';
    } else {
      return '需要更多背景信息来分析失败的价值。';
    }
  }

  // 执行完整的决策分析
  async analyzeDecision(context, background = '', annualGoals = '') {
    console.log('开始决策分析...');
    console.log('分析对象:', context);
    console.log('背景信息:', background || '无');
    console.log('年度目标:', annualGoals || '无');
    console.log('');

    const results = {};

    for (let i = 0; i < this.analysisSteps.length; i++) {
      const step = this.analysisSteps[i];
      switch (i) {
        case 0:
          results.剥离兴奋感 = step(context);
          break;
        case 1:
          results.代价分析 = step(context);
          break;
        case 2:
          results.概率判断 = step(context, background);
          break;
        case 3:
          results.人生杠杆判断 = step(context, annualGoals);
          break;
      }
    }

    console.log('=== 决策分析总结 ===');
    console.log('基于以上分析，这是一个需要认真考虑的决策，建议：');
    
    if (context.includes('创业')) {
      console.log('1. 充分评估自身的风险承受能力和资源准备');
      console.log('2. 制定详细的商业计划和风险应对策略');
      console.log('3. 从小规模开始，逐步验证商业模式');
      console.log('4. 建立支持网络，寻求专业 advice');
    } else if (context.includes('学习')) {
      console.log('1. 明确学习目标和预期成果');
      console.log('2. 制定合理的学习计划和时间安排');
      console.log('3. 选择适合自己的学习方法和资源');
      console.log('4. 建立学习反馈机制，及时调整');
    } else if (context.includes('跳槽')) {
      console.log('1. 充分了解目标公司的文化和发展前景');
      console.log('2. 评估新职位与个人职业规划的匹配度');
      console.log('3. 协商合理的薪资和福利');
      console.log('4. 做好离职和入职的过渡准备');
    }

    console.log('');
    console.log('记住，人生是一个无限游戏，失败往往是成功的垫脚石，重要的是从经历中学习和成长。');

    return results;
  }
}

// 导出模块
module.exports = DecisionAnalyzer;

// 测试代码
if (require.main === module) {
  const analyzer = new DecisionAnalyzer();
  
  // 测试创业决策分析
  console.log('=== 测试创业决策分析 ===');
  analyzer.analyzeDecision('创业开一家咖啡店', '有相关行业经验', '实现财务自由和个人价值');
  
  // 测试学习决策分析
  console.log('\n=== 测试学习决策分析 ===');
  analyzer.analyzeDecision('学习人工智能技术', '有编程基础', '技能提升和职业转型');
  
  // 测试跳槽决策分析
  console.log('\n=== 测试跳槽决策分析 ===');
  analyzer.analyzeDecision('跳槽到一家科技公司', '有相关技能和经验', '薪资增长和职业发展');
}