import { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { ChevronLeft, FileText, AlertTriangle, CheckCircle, TrendingUp, Brain, Heart, Shield, Loader2 } from 'lucide-react';

export default function ProfessionalReportPage() {
  const { goToLanding, professionalReport, goToCanvas } = useApp();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleBack = () => {
    goToLanding();
  };

  // 如果没有专业报告数据，显示提示信息
  if (!professionalReport || !professionalReport.professional) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <svg className="w-20 h-20 text-amber-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            还没有专业报告
          </h2>
          <p className="text-gray-600 mb-8">
            请先完成房树人绘画分析，生成专业心理分析报告后再查看。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={goToCanvas}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full font-medium hover:shadow-lg transition-all"
            >
              开始绘画分析
            </button>
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-white text-gray-700 rounded-full font-medium border border-gray-200 hover:bg-gray-50 transition-all"
            >
              返回首页
            </button>
          </div>
        </div>
      </div>
    );
  }

  const report = professionalReport.professional;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* 顶部导航 */}
      <div className="relative z-20 flex items-center justify-between px-4 py-6">
        <button
          onClick={handleBack}
          className="p-3 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all shadow-sm"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        
        <h2 className="font-serif text-2xl font-semibold text-gray-800">
          专业心理分析报告
        </h2>
        
        <div className="w-12" />
      </div>

      {/* 报告内容 */}
      <div className="relative z-10 px-5 pb-32 max-w-4xl mx-auto">
        {/* 报告标题 */}
        <div 
          className={`text-center mb-12 pt-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-600">专业分析报告</span>
          </div>
          <h1 className="font-serif text-3xl font-semibold text-gray-800 mb-4">
            房树人心理分析
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            基于绘画心理学的系统性评估
          </p>
        </div>

        {/* 一、视觉特征识别 */}
        <div 
          className={`bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-md transition-all duration-700 mb-8 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
                  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-white">
                  一、视觉特征识别
                </h3>
                <p className="text-sm text-white/80">
                  绘画元素的客观描述与特征提取
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* 整体布局 */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">整体布局</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">画面位置</p>
                  <p className="text-base font-medium text-gray-800">{report.visualFeatures.layout}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">整体构图</p>
                  <p className="text-base font-medium text-gray-800">{report.visualFeatures.composition}</p>
                </div>
              </div>
            </div>

            {/* 绘画元素特征 */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">绘画元素特征</h4>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div>
                  <p className="text-sm text-gray-600 mb-1">房子</p>
                  <p className="text-base text-gray-700">{report.visualFeatures.elements.house}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">树木</p>
                  <p className="text-base text-gray-700">{report.visualFeatures.elements.tree}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">人物</p>
                  <p className="text-base text-gray-700">{report.visualFeatures.elements.person}</p>
                </div>
              </div>
            </div>

            {/* 技术特征 */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">技术特征</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">线条特征</p>
                  <p className="text-base text-gray-700">{report.visualFeatures.techniques.lines}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">涂抹特征</p>
                  <p className="text-base text-gray-700">{report.visualFeatures.techniques.erasures}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">细节程度</p>
                  <p className="text-base text-gray-700">{report.visualFeatures.techniques.details}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">空白空间</p>
                  <p className="text-base text-gray-700">{report.visualFeatures.techniques.space}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 二、多维度心理分析 */}
        <div 
          className={`bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-md transition-all duration-700 mb-8 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="p-6 bg-gradient-to-r from-purple-600 to-pink-500 rounded-t-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-white">
                  二、多维度心理分析
                </h3>
                <p className="text-sm text-white/80">
                  基于心理学理论的深度解读
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* 维度1：整体布局分析 */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">维度1：整体布局分析</h4>
              <div className="bg-purple-50 rounded-lg p-4 space-y-2">
                <div>
                  <p className="text-sm text-gray-600 mb-1">空间定位解读</p>
                  <p className="text-base text-gray-700">{report.psychologicalAnalysis.layoutAnalysis.position}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">大小比例分析</p>
                  <p className="text-base text-gray-700">{report.psychologicalAnalysis.layoutAnalysis.size}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">平衡感评估</p>
                  <p className="text-base text-gray-700">{report.psychologicalAnalysis.layoutAnalysis.balance}</p>
                </div>
              </div>
            </div>

            {/* 维度2：元素特征分析 */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">维度2：元素特征分析</h4>
              <div className="bg-pink-50 rounded-lg p-4 space-y-2">
                <div>
                  <p className="text-sm text-gray-600 mb-1">房子分析</p>
                  <p className="text-base text-gray-700">{report.psychologicalAnalysis.elementAnalysis.house}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">树木分析</p>
                  <p className="text-base text-gray-700">{report.psychologicalAnalysis.elementAnalysis.tree}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">人物分析</p>
                  <p className="text-base text-gray-700">{report.psychologicalAnalysis.elementAnalysis.person}</p>
                </div>
              </div>
            </div>

            {/* 维度3：技术特征分析 */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">维度3：技术特征分析</h4>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div>
                  <p className="text-sm text-gray-600 mb-1">线条分析</p>
                  <p className="text-base text-gray-700">{report.psychologicalAnalysis.technicalAnalysis.lines}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">涂抹分析</p>
                  <p className="text-base text-gray-700">{report.psychologicalAnalysis.technicalAnalysis.erasures}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">细节分析</p>
                  <p className="text-base text-gray-700">{report.psychologicalAnalysis.technicalAnalysis.details}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">空间分析</p>
                  <p className="text-base text-gray-700">{report.psychologicalAnalysis.technicalAnalysis.space}</p>
                </div>
              </div>
            </div>

            {/* 维度4：情绪表达分析 */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">维度4：情绪表达分析</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">整体情绪基调</p>
                  <p className="text-base font-medium text-gray-800">{report.psychologicalAnalysis.emotionalAnalysis.tone}</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">能量水平评估</p>
                  <p className="text-base font-medium text-gray-800">{report.psychologicalAnalysis.emotionalAnalysis.energy}</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">焦虑水平评估</p>
                  <p className="text-base font-medium text-gray-800">{report.psychologicalAnalysis.emotionalAnalysis.anxiety}</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">防御机制识别</p>
                  <p className="text-base font-medium text-gray-800">{report.psychologicalAnalysis.emotionalAnalysis.defense}</p>
                </div>
              </div>
            </div>

            {/* 维度5：发展维度分析 */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">维度5：发展维度分析</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-teal-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">心理发展阶段</p>
                  <p className="text-base font-medium text-gray-800">{report.psychologicalAnalysis.developmentAnalysis.stage}</p>
                </div>
                <div className="bg-teal-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">自我发展水平</p>
                  <p className="text-base font-medium text-gray-800">{report.psychologicalAnalysis.developmentAnalysis.selfDevelopment}</p>
                </div>
                <div className="bg-teal-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">适应能力评估</p>
                  <p className="text-base font-medium text-gray-800">{report.psychologicalAnalysis.developmentAnalysis.adaptability}</p>
                </div>
                <div className="bg-teal-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">成长导向评估</p>
                  <p className="text-base font-medium text-gray-800">{report.psychologicalAnalysis.developmentAnalysis.growthOrientation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 三、综合心理画像 */}
        <div 
          className={`bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-md transition-all duration-700 mb-8 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="p-6 bg-gradient-to-r from-green-500 to-teal-500 rounded-t-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-white">
                  三、综合心理画像
                </h3>
                <p className="text-sm text-white/80">
                  整合各维度分析结果的心理画像
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* 核心人格特质 */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">核心人格特质</h4>
              <div className="bg-green-50 rounded-lg p-4 space-y-2">
                {report.personalityPortrait.coreTraits.map((trait, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 font-semibold">{index + 1}.</span>
                    <p className="text-base text-gray-700">{trait}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 心理状态评估 */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">心理状态评估</h4>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">当前情绪状态</p>
                  <p className="text-base font-medium text-gray-800">{report.personalityPortrait.psychologicalState.emotion}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">自我认知水平</p>
                  <p className="text-base font-medium text-gray-800">{report.personalityPortrait.psychologicalState.selfCognition}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">适应能力</p>
                  <p className="text-base font-medium text-gray-800">{report.personalityPortrait.psychologicalState.adaptability}</p>
                </div>
              </div>
            </div>

            {/* 优势与资源 */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">优势与资源</h4>
              <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                {report.personalityPortrait.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-base text-gray-700">{strength}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 挑战与成长点 */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">挑战与成长点</h4>
              <div className="bg-orange-50 rounded-lg p-4 space-y-2">
                {report.personalityPortrait.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <TrendingUp className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <p className="text-base text-gray-700">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 四、风险评估 */}
        <div 
          className={`bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-md transition-all duration-700 mb-8 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="p-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-t-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-white">
                  四、风险评估
                </h3>
                <p className="text-sm text-white/80">
                  基于风险警示系统的评估
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* 风险等级 */}
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">风险等级</p>
                  <p className="text-2xl font-bold text-green-700">{report.riskAssessment.level}</p>
                </div>
              </div>
            </div>

            {/* 识别到的风险指标 */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">识别到的风险指标</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-base text-gray-700">{report.riskAssessment.indicators}</p>
              </div>
            </div>

            {/* 风险详细分析 */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">风险详细分析</h4>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div>
                  <p className="text-sm text-gray-600 mb-1">整体分析</p>
                  <p className="text-base text-gray-700">{report.riskAssessment.analysis}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">功能性受损程度</p>
                  <p className="text-base text-gray-700">{report.riskAssessment.functionalImpairment}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">风险来源和触发因素</p>
                  <p className="text-base text-gray-700">{report.riskAssessment.riskSources}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 五、专业建议 */}
        <div 
          className={`bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-md transition-all duration-700 mb-8 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-white">
                  五、专业建议
                </h3>
                <p className="text-sm text-white/80">
                  基于分析结果的具体建议
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* 心理咨询建议 */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">心理咨询建议</h4>
              <div className="bg-indigo-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">是否需要心理咨询</p>
                  <p className="text-base font-medium text-gray-800">{report.professionalRecommendations.counseling.needed}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">咨询重点方向</p>
                  <p className="text-base font-medium text-gray-800">{report.professionalRecommendations.counseling.focus}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">推荐咨询方式</p>
                  <p className="text-base font-medium text-gray-800">{report.professionalRecommendations.counseling.approach}</p>
                </div>
              </div>
            </div>

            {/* 治疗技术建议 */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">治疗技术建议</h4>
              <div className="bg-purple-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">推荐的心理治疗技术</p>
                  <p className="text-base font-medium text-gray-800">{report.professionalRecommendations.therapy.recommended}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">治疗重点</p>
                  <p className="text-base font-medium text-gray-800">{report.professionalRecommendations.therapy.focus}</p>
                </div>
              </div>
            </div>

            {/* 发展建议 */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">发展建议</h4>
              <div className="bg-teal-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">个人成长建议</p>
                  <p className="text-base font-medium text-gray-800">{report.professionalRecommendations.development.personal}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">心理调适建议</p>
                  <p className="text-base font-medium text-gray-800">{report.professionalRecommendations.development.psychological}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">后续跟进建议</p>
                  <p className="text-base font-medium text-gray-800">{report.professionalRecommendations.development.followUp}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 六、分析依据与局限性 */}
        <div 
          className={`bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-md transition-all duration-700 mb-8 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1200ms' }}
        >
          <div className="p-6 bg-gradient-to-r from-slate-600 to-gray-700 rounded-t-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-white">
                  六、分析依据与局限性
                </h3>
                <p className="text-sm text-white/80">
                  理论基础和方法说明
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            {/* 理论依据 */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">理论依据</h4>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-base text-gray-700">{report.analysisBasis.theory}</p>
              </div>
            </div>

            {/* 年龄与文化背景考量 */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">年龄与文化背景考量</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-base text-gray-700">{report.analysisBasis.ageFactors}</p>
              </div>
            </div>

            {/* 局限性说明 */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">局限性说明</h4>
              <div className="bg-amber-50 border-l-4 border-amber-300 rounded-lg p-4">
                <p className="text-base text-gray-700 leading-relaxed">{report.analysisBasis.limitations}</p>
              </div>
            </div>

            {/* 记录信息 */}
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">记录信息</h4>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">分析时间</p>
                  <p className="text-base font-medium text-gray-800">{new Date().toLocaleString('zh-CN')}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">分析方法</p>
                  <p className="text-base font-medium text-gray-800">绘画心理分析</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">分析师</p>
                  <p className="text-base font-medium text-gray-800">AI辅助分析</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 免责声明 */}
        <div 
          className={`mt-12 text-center transition-all duration-700 delay-1600 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 max-w-2xl mx-auto">
            <AlertTriangle className="w-6 h-6 text-amber-600 mx-auto mb-3" />
            <p className="text-sm text-gray-600 leading-relaxed">
              本报告基于心理投射理论与 AI 生成，仅供自我探索与娱乐，不构成专业医疗诊断。如遇严重心理困扰，请寻求专业医生帮助。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}