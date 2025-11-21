import React, { useState, useEffect } from 'react';
import { ComposedChart, Line, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceDot } from 'recharts';
import { getDunningKrugerExplanation } from '../services/geminiService';

// The Curve Data
const data = [
  { stage: '一无所知', competence: 0, confidence: 0, label: '起点' },
  { stage: '新手(高估)', competence: 10, confidence: 65, label: '愚昧之山' },
  { stage: '愚昧之巅', competence: 20, confidence: 100, label: '巅峰' },
  { stage: '受挫', competence: 35, confidence: 40, label: '绝望之谷' },
  { stage: '开悟', competence: 60, confidence: 55, label: '开悟之坡' },
  { stage: '精通', competence: 90, confidence: 85, label: '平稳高原' },
  { stage: '大师', competence: 100, confidence: 95, label: '大师' },
];

const DunningKruger: React.FC = () => {
  const [userConfidence, setUserConfidence] = useState(85);
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [activePoint, setActivePoint] = useState<{x: string | number, y: number}>({ x: '愚昧之巅', y: 100 });

  // Map user confidence slider to a point on the curve
  useEffect(() => {
    // This is a simplified mapping logic to visualize "where you likely are" based on confidence + context
    // If confidence is super high (>80), and competence is low (implied context), map to "愚昧之巅"
    // If confidence drops, map towards "绝望之谷" (Progress)
    
    if (userConfidence > 80) {
        setActivePoint({ x: '愚昧之巅', y: 100 });
    } else if (userConfidence > 60) {
        setActivePoint({ x: '新手(高估)', y: 65 });
    } else if (userConfidence > 40) {
        setActivePoint({ x: '开悟', y: 55 });
    } else {
        setActivePoint({ x: '受挫', y: 40 });
    }
  }, [userConfidence]);

  const handleAnalysis = async () => {
    setAiAnalysis("正在分析...");
    const text = await getDunningKrugerExplanation(userConfidence);
    setAiAnalysis(text);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">认知偏差曲线 (Dunning-Kruger)</h2>
        <p className="text-gray-500 text-sm mt-2">
          为什么越是"半桶水"，越觉得自己是专家？<br/>
          <span className="text-xs text-gray-400">拖动下方滑块，查看你在曲线上的位置。</span>
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorConfidence" x1="0" y1="0" x2="1" y2="0">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="stage" tick={{fontSize: 10}} interval={0} />
            <YAxis label={{ value: '自信程度', angle: -90, position: 'insideLeft' }} hide />
            <Tooltip />
            <Area type="monotone" dataKey="confidence" stroke="#8884d8" fillOpacity={1} fill="url(#colorConfidence)" />
            
            {/* Dynamic Dot based on Interaction */}
            <ReferenceDot 
                x={activePoint.x} 
                y={activePoint.y} 
                r={8} 
                fill="#ef4444" 
                stroke="#fff" 
                strokeWidth={2}
                label={{ position: 'top', value: '你在这里', fill: '#ef4444', fontSize: 12, fontWeight: 'bold' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h3 className="font-bold text-yellow-800 mb-2 text-sm">自我诚实度测试</h3>
        <p className="text-sm text-yellow-700 mb-4">
            你现在对自己"做正念老师/赚大钱"的能力有多自信？(0-100)
        </p>
        <div className="flex items-center gap-4 mb-4">
            <span className="text-xs text-gray-500">没底</span>
            <input 
                type="range" 
                min="0" 
                max="100" 
                value={userConfidence} 
                onChange={(e) => setUserConfidence(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-600"
            />
            <span className="text-xs text-gray-500">爆棚</span>
        </div>
        <div className="text-center font-bold text-2xl text-yellow-700 mb-4">
            自信度: {userConfidence}
        </div>

        <button 
            onClick={handleAnalysis}
            className="w-full text-sm bg-yellow-600 text-white px-4 py-3 rounded hover:bg-yellow-700 transition font-medium shadow-sm"
        >
            点我分析这个自信度是否危险
        </button>
        {aiAnalysis && (
            <div className="mt-4 p-3 bg-white rounded border border-yellow-100 text-sm text-gray-700 animate-fade-in">
                <span className="font-bold text-yellow-600">AI 诊断：</span>
                "{aiAnalysis}"
            </div>
        )}
      </div>
    </div>
  );
};

export default DunningKruger;