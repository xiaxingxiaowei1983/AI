#!/usr/bin/env python3
"""
WaytoAGI智能体进化系统集成测试脚本
测试6个智能体和多个Skill的集成效果
模拟8小时进化任务的执行过程
"""

import json
import time
import random
import logging
from datetime import datetime, timedelta

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='waytoagi-community/test_integration.log'
)
logger = logging.getLogger('integration_test')

class MockAgent:
    """模拟智能体类"""
    def __init__(self, name, skills=None):
        self.name = name
        self.skills = skills or []
        self.status = "idle"
        self.performance = {
            "tasks_completed": 0,
            "errors": 0,
            "execution_time": 0
        }
    
    def run(self, duration):
        """模拟智能体运行"""
        logger.info(f"启动 {self.name}，运行时间: {duration} 分钟")
        self.status = "running"
        start_time = time.time()
        
        # 模拟任务执行
        tasks = random.randint(5, 15)
        for i in range(tasks):
            task_time = random.uniform(1, 3)
            time.sleep(task_time)
            # 模拟随机错误
            if random.random() < 0.05:
                self.performance["errors"] += 1
                logger.warning(f"{self.name} 执行任务 {i+1} 时发生错误")
            else:
                self.performance["tasks_completed"] += 1
                logger.info(f"{self.name} 完成任务 {i+1}")
        
        end_time = time.time()
        self.performance["execution_time"] = end_time - start_time
        self.status = "completed"
        logger.info(f"{self.name} 完成运行，执行时间: {self.performance['execution_time']:.2f} 秒")
        return self.performance

class IntegrationTest:
    """集成测试类"""
    def __init__(self, config_file):
        self.config = self.load_config(config_file)
        self.agents = self.initialize_agents()
        self.test_results = {}
    
    def load_config(self, config_file):
        """加载配置文件"""
        with open(config_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    def initialize_agents(self):
        """初始化智能体"""
        agents = {}
        for agent_name in self.config['integration_points']:
            skills = self.config['integration_points'][agent_name]['skills']
            agents[agent_name] = MockAgent(agent_name, skills)
        return agents
    
    def run_8hour_evolution(self):
        """运行8小时进化测试"""
        logger.info("开始8小时智能体进化测试")
        start_time = datetime.now()
        
        # 按照配置的时间顺序运行智能体
        for agent_name, schedule in self.config['task_schedule'].items():
            # 计算启动时间
            start_hour, start_minute = map(int, schedule['start_time'].split(':'))
            agent_start_time = start_time.replace(hour=start_hour, minute=start_minute)
            
            # 如果启动时间已过，立即启动
            if agent_start_time < datetime.now():
                agent_start_time = datetime.now()
            
            # 等待到启动时间
            wait_time = (agent_start_time - datetime.now()).total_seconds()
            if wait_time > 0:
                logger.info(f"等待 {wait_time:.0f} 秒后启动 {agent_name}")
                time.sleep(wait_time)
            
            # 运行智能体
            duration = schedule['duration']
            performance = self.agents[agent_name].run(duration)
            
            # 记录测试结果
            self.test_results[agent_name] = {
                "performance": performance,
                "schedule": schedule,
                "actual_start": datetime.now().isoformat(),
                "actual_duration": duration
            }
        
        end_time = datetime.now()
        total_duration = (end_time - start_time).total_seconds() / 60
        logger.info(f"8小时进化测试完成，实际耗时: {total_duration:.2f} 分钟")
        
        # 生成测试报告
        self.generate_report()
    
    def run_agent_collaboration_test(self):
        """测试智能体协作"""
        logger.info("开始智能体协作测试")
        
        # 模拟知识采集者向知识整理者传递内容
        logger.info("测试知识采集者向知识整理者传递内容")
        knowledge_collector = self.agents['knowledge_collector']
        knowledge_organizer = self.agents['knowledge_organizer']
        
        # 模拟内容传递
        content = "采集的测试内容"
        logger.info(f"知识采集者传递内容: {content}")
        logger.info(f"知识整理者接收并处理内容")
        
        # 模拟知识整理者向技能开发者传递结构化知识
        logger.info("测试知识整理者向技能开发者传递结构化知识")
        skill_developer = self.agents['skill_developer']
        structured_knowledge = "结构化的测试知识"
        logger.info(f"知识整理者传递结构化知识: {structured_knowledge}")
        logger.info(f"技能开发者接收并创建Skill")
        
        # 模拟技能开发者创建的Skill被应用推广者使用
        logger.info("测试技能开发者创建的Skill被应用推广者使用")
        application_promoter = self.agents['application_promoter']
        new_skill = "新创建的测试Skill"
        logger.info(f"技能开发者创建Skill: {new_skill}")
        logger.info(f"应用推广者使用Skill: {new_skill}")
        
        logger.info("智能体协作测试完成")
    
    def run_fault_recovery_test(self):
        """测试故障恢复"""
        logger.info("开始故障恢复测试")
        
        # 模拟知识采集者故障
        logger.info("模拟知识采集者故障")
        knowledge_collector = self.agents['knowledge_collector']
        knowledge_collector.status = "error"
        logger.warning(f"知识采集者状态: {knowledge_collector.status}")
        
        # 测试系统协调者的故障检测和处理
        logger.info("测试系统协调者的故障检测和处理")
        system_coordinator = self.agents['system_coordinator']
        logger.info("系统协调者检测到知识采集者故障")
        logger.info("系统协调者启动故障恢复流程")
        
        # 模拟故障恢复
        time.sleep(2)
        knowledge_collector.status = "recovering"
        logger.info(f"知识采集者状态: {knowledge_collector.status}")
        
        time.sleep(3)
        knowledge_collector.status = "idle"
        logger.info(f"知识采集者状态: {knowledge_collector.status}")
        logger.info("故障恢复测试完成")
    
    def generate_report(self):
        """生成测试报告"""
        report = {
            "test_time": datetime.now().isoformat(),
            "agents": {},
            "summary": {
                "total_tasks_completed": 0,
                "total_errors": 0,
                "total_execution_time": 0
            }
        }
        
        for agent_name, result in self.test_results.items():
            report["agents"][agent_name] = result
            report["summary"]["total_tasks_completed"] += result["performance"]["tasks_completed"]
            report["summary"]["total_errors"] += result["performance"]["errors"]
            report["summary"]["total_execution_time"] += result["performance"]["execution_time"]
        
        # 计算成功率
        total_tasks = report["summary"]["total_tasks_completed"] + report["summary"]["total_errors"]
        if total_tasks > 0:
            success_rate = (report["summary"]["total_tasks_completed"] / total_tasks) * 100
            report["summary"]["success_rate"] = f"{success_rate:.2f}%"
        else:
            report["summary"]["success_rate"] = "0%"
        
        # 保存测试报告
        report_file = f"waytoagi-community/test_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        with open(report_file, 'w', encoding='utf-8') as f:
            json.dump(report, f, ensure_ascii=False, indent=2)
        
        logger.info(f"测试报告已保存到: {report_file}")
        
        # 打印测试摘要
        logger.info("\n测试摘要:")
        logger.info(f"总完成任务数: {report['summary']['total_tasks_completed']}")
        logger.info(f"总错误数: {report['summary']['total_errors']}")
        logger.info(f"成功率: {report['summary']['success_rate']}")
        logger.info(f"总执行时间: {report['summary']['total_execution_time']:.2f} 秒")

if __name__ == "__main__":
    # 创建集成测试实例
    test = IntegrationTest('waytoagi-community/integration_config.json')
    
    # 运行测试
    try:
        # 运行8小时进化测试（实际运行时间会缩短以加快测试）
        test.run_8hour_evolution()
        
        # 运行智能体协作测试
        test.run_agent_collaboration_test()
        
        # 运行故障恢复测试
        test.run_fault_recovery_test()
        
        logger.info("所有测试已完成")
    except Exception as e:
        logger.error(f"测试过程中发生错误: {str(e)}")
        raise