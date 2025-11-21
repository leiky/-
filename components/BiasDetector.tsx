import React, { useState } from 'react';
import { analyzeSituation } from '../services/geminiService';
import { AIAnalysisResult } from '../types';
import { AlertTriangle, Brain, CheckCircle2, ShieldAlert } from 'lucide-react';

const BiasDetector: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const data = await analyzeSituation(input, 'BELIEF_OR_PLAN');
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-indigo-100 overflow-hidden">
      <div className="bg-indigo-600 p-6 text-white">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Brain className="w-6 h-6" />
          客观性透镜 (Reality Lens)
        </h2>
        <p className="text-indigo-100 mt-2 opacity-90">
          输入一个想法、计划或正在困扰你的事情，AI 将剥离情绪，分析其中的逻辑漏洞与风险。
        </p>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">输入当前的想法 (例如："我觉得我能靠直播月入十万", "有个大师说能帮我做法")</label>
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all h-32"
            placeholder="在这里写下你的想法..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading || !input}
          className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
            loading || !input ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg'
          }`}
        >
          {loading ? '正在进行逻辑运算...' : '开始客观分析'}
        </button>

        {result && (
          <div className="mt-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-50 p-4 rounded-lg text-center border border-slate-200">
                <div className="text-sm text-gray-500 mb-1">逻辑理性分</div>
                <div className={`text-3xl font-bold ${result.rationalityScore > 60 ? 'text-green-600' : 'text-red-500'}`}>
                  {result.rationalityScore}/100
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg text-center border border-slate-200">
                <div className="text-sm text-gray-500 mb-1">情绪/冲动分</div>
                <div className={`text-3xl font-bold ${result.emotionalScore < 50 ? 'text-green-600' : 'text-orange-500'}`}>
                  {result.emotionalScore}/100
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg text-center border border-slate-200">
                <div className="text-sm text-gray-500 mb-1">风险等级</div>
                <div className={`text-3xl font-bold ${
                  result.riskLevel === 'Critical' || result.riskLevel === 'High' ? 'text-red-600' : 'text-blue-600'
                }`}>
                  {result.riskLevel === 'Critical' ? '极高危' : result.riskLevel === 'High' ? '高危' : result.riskLevel === 'Medium' ? '中等' : '低'}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-50 rounded-r-lg">
                <h3 className="font-bold text-red-800 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" /> 检测到的思维误区
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {result.identifiedBiases.map((bias, idx) => (
                    <span key={idx} className="px-2 py-1 bg-white text-red-600 text-xs border border-red-200 rounded-full font-medium">
                      {bias}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-lg">
                <h3 className="font-bold text-blue-800 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5" /> 现实核查 (Reality Check)
                </h3>
                <p className="text-gray-700 mt-1">{result.realityCheck}</p>
              </div>

              <div className="border-l-4 border-emerald-500 pl-4 py-2 bg-emerald-50 rounded-r-lg">
                <h3 className="font-bold text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> 建议方案
                </h3>
                <p className="text-gray-700 mt-1">{result.constructiveAdvice}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BiasDetector;
