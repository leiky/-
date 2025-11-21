
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Brain, 
  Activity, 
  ShieldCheck, 
  BarChart3,
  Lightbulb,
  AlertOctagon,
  Anchor,
  Microscope,
  Briefcase,
  Skull,
  BookOpen,
  Gavel,
  XCircle,
  CheckCircle2,
  History,
  ArrowRight,
  Gamepad2,
  Sparkles,
  Scale,
  Link,
  HelpCircle,
  Eye,
  Lock,
  RefreshCw,
  Magnet,
  Smartphone,
  UserX,
  Radar,
  Calculator,
  Users,
  Zap,
  HeartCrack,
  Feather,
  Utensils
} from 'lucide-react';
import BiasDetector from './components/BiasDetector';
import SimulationChart from './components/SimulationChart';
import DunningKruger from './components/DunningKruger';
import LogicGame from './components/LogicGame';
import { SimulationData } from './types';

// Data Generation Logic
const generateSimulationData = (scenario: 'REALITY' | 'HYPOTHETICAL'): SimulationData[] => {
  const data: SimulationData[] = [];
  let currentAge = 36;
  
  // Initial Assets
  let wealthA = 0; // Current path (Starting near zero or debt)
  let wealthB = 0; // Hypothetical path (If she worked steadily)

  if (scenario === 'HYPOTHETICAL') {
    // Back in time simulation (If she didn't become a monk at 24)
    wealthA = 0; 
    wealthB = 20000; // Starting savings at 24
    currentAge = 24;
  } else {
    // Starting NOW (Age 36)
    wealthA = 5000; // Barely any savings
    wealthB = 5000; // Starting fresh as a teacher
  }

  const duration = 15; // Simulate next 15 years

  for (let i = 0; i <= duration; i++) {
    const year = new Date().getFullYear() + (scenario === 'HYPOTHETICAL' ? (i - 12) : i);
    const age = currentAge + i;

    // --- Path A: Metaphysics / Niche Track ---
    // Logic: Extremely high volatility, mostly low income, occasional "perceived" opportunity that fails
    let incomeA = 0;
    let emotionA = 50;

    if (Math.random() > 0.75) {
        // "Manic" phase: Bought a course, feels like a master, potential small income or delusion of wealth
        incomeA = 10000 + Math.random() * 20000; 
        emotionA = 95; // Euphoria / Manic confidence
        wealthA += incomeA;
    } else if (Math.random() < 0.35) {
        // "Depressive" phase or Scam / Course Fees
        incomeA = 0;
        wealthA = wealthA - 5000; // Paying for courses/scams
        emotionA = 20; // Depression / Crash
    } else {
        // Stagnation
        incomeA = 0; // No steady job
        wealthA -= 8000; // Cost of living eats into capital/borrowing
        emotionA = 40;
    }
    // Wealth A implies debt or near zero
    // wealthA can go negative (debt)

    // --- Path B: English Teacher (Steady) ---
    // Logic: Salary grows, savings rate 30%, Investment return 4%
    let salaryB = 0;
    
    if (scenario === 'HYPOTHETICAL') {
        // If she started at 24
        salaryB = 80000 + (i * 5000); // Salary increases with experience
    } else {
        // Starting now at 36 (Entry level again)
        salaryB = 60000 + (i * 3000); 
    }
    
    const savingsB = salaryB * 0.3; // Saving 30%
    wealthB = (wealthB + savingsB) * 1.04; // 4% Compound interest
    const emotionB = 60 + (i * 1.5); // Satisfaction grows with stability

    data.push({
      year: age, // Using Age as X-axis label for better context
      steadyWealth: Math.round(wealthB),
      riskyWealth: Math.round(wealthA),
      steadyHappiness: Math.min(100, Math.round(emotionB)),
      riskyHappiness: Math.min(100, Math.round(emotionA))
    });
  }
  return data;
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analysis' | 'science' | 'traps' | 'career' | 'game' | 'reflection'>('dashboard');
  const [simMode, setSimMode] = useState<'REALITY' | 'HYPOTHETICAL'>('REALITY');
  const [simData, setSimData] = useState<SimulationData[]>([]);

  useEffect(() => {
    setSimData(generateSimulationData(simMode));
  }, [simMode]);

  const NavButton = ({ id, label, icon: Icon }: { id: typeof activeTab, label: string, icon: any }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium transition-colors whitespace-nowrap ${
        activeTab === id 
          ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50' 
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`}
    >
      <Icon className={`w-4 h-4 mr-2 ${activeTab === id ? 'text-indigo-600' : 'text-gray-400'}`} />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-sans pb-12">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center flex-shrink-0">
              <Anchor className="h-8 w-8 text-indigo-600 mr-2" />
              <span className="font-bold text-xl tracking-tight text-gray-900 hidden md:block">归真 Guī Zhēn</span>
            </div>
            <div className="flex space-x-1 overflow-x-auto no-scrollbar ml-4 items-center">
              <NavButton id="dashboard" label="人生推演" icon={BarChart3} />
              <NavButton id="reflection" label="当头棒喝" icon={Gavel} />
              <NavButton id="analysis" label="AI分析" icon={Brain} />
              <NavButton id="game" label="逻辑道场" icon={Gamepad2} />
              <NavButton id="science" label="科学地基" icon={Microscope} />
              <NavButton id="traps" label="避坑指南" icon={Skull} />
              <NavButton id="career" label="职业真相" icon={Briefcase} />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        
        {/* Tab: Dashboard (Simulation) */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
             <div className="lg:col-span-3 bg-white rounded-2xl shadow-md p-6 mb-2 border-l-4 border-indigo-600">
              <h1 className="text-2xl font-bold mb-2 text-gray-800">人生推演：选择的力量</h1>
              <p className="text-gray-600 max-w-4xl text-sm md:text-base">
                人生不是一场赌博，而是一道数学题。这里有两个平行宇宙：一个是你坚持的"玄学小众赛道/投机"，一个是你利用英语技能的"务实赛道"。
              </p>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {/* Controls */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <History className="text-indigo-500" />
                    <span className="font-bold text-gray-700">选择推演模式：</span>
                </div>
                <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                    <button 
                        onClick={() => setSimMode('HYPOTHETICAL')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${simMode === 'HYPOTHETICAL' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        如果当初没出家 (时光倒流)
                    </button>
                    <button 
                        onClick={() => setSimMode('REALITY')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${simMode === 'REALITY' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        如果现在开始工作 (亡羊补牢)
                    </button>
                </div>
              </div>

              {/* The Chart */}
              <SimulationChart data={simData} />

              {/* Algorithm Trap Explanation (NEW) */}
              <div className="bg-purple-50 border-l-4 border-purple-500 p-5 rounded-r-xl shadow-sm animate-pulse-once">
                <h3 className="font-bold text-purple-900 text-lg flex items-center mb-2">
                    <Smartphone className="w-6 h-6 mr-2" />
                    为什么你觉得"玄学/身心灵"赛道很火？
                </h3>
                <div className="text-sm text-purple-900 opacity-90 space-y-2">
                    <p>
                        你可能觉得：<b>"大家都在搞这个，这是未来的风口。"</b>
                        <br/>
                        残酷的真相是：<b>这是算法为你定制的"楚门的世界"。</b>
                    </p>
                    <p className="bg-white/50 p-2 rounded border border-purple-100">
                        <span className="font-bold">🔎 算法回音室 (Echo Chamber)：</span>
                        因为你经常搜索"正念"、"修行"、"神秘学"，抖音/小红书的大数据就把你标记为<b>"特定受众"</b>。
                        它会疯狂给你推送类似的内容，屏蔽掉普通人打工赚钱的真实世界。
                        <br/>
                        <b>你看到的"繁荣"，只是你手机里的幻觉。</b> 现实中99%的人都在做普通工作，只有不到1%的人在搞这些，且大部分都像你一样在亏钱。
                    </p>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center">
                    <Lightbulb className="w-5 h-5 text-amber-500 mr-2" />
                    给你的经济学必修课
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                        <div className="font-bold text-amber-800 text-sm mb-1">机会成本 (Opportunity Cost)</div>
                        <p className="text-xs text-amber-900 opacity-80">
                            当你在这个"小众赛道/投机"空转时，你失去的不仅仅是工资，还有<b>英语老师的职业积累</b>。每过一年，你回归社会的难度就增加一倍。
                        </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div className="font-bold text-blue-800 text-sm mb-1">复利效应 (Compound Interest)</div>
                        <p className="text-xs text-blue-900 opacity-80">
                            大钱不是"赚"来的，是"存"出来的。每个月稳定的工资，通过十年复利，远比那些"暴富梦"来得真实。**慢就是快。**
                        </p>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                        <div className="font-bold text-emerald-800 text-sm mb-1">沉没成本 (Sunk Cost)</div>
                        <p className="text-xs text-emerald-900 opacity-80">
                           出家的那几年已经过去了，无论你怎么不甘心，都回不来了。不要为了"证明自己没选错"而继续错下去。**及时止损才是大智慧。**
                        </p>
                    </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <DunningKruger />
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                    <Activity className="w-5 h-5 text-rose-500 mr-2"/>
                    平淡 vs 混乱
                </h3>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                   你的痛苦来源于对"不凡"的执念。你觉得上班很平庸，出家/修行/做大事才高级。但看看图表，红色线条（玄学赛道）最终是一地鸡毛，绿色线条（工作）才是稳稳的幸福。
                </p>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h4 className="font-bold text-sm text-indigo-700 mb-2">务实生活的红利：</h4>
                    <ul className="space-y-2">
                        <li className="flex items-start text-xs text-gray-700">
                            <CheckCircle2 className="w-3 h-3 text-green-500 mr-2 mt-0.5" />
                            <span>**社会连接：** 工作会强迫你与人交流，这是治疗抑郁最好的药物。</span>
                        </li>
                        <li className="flex items-start text-xs text-gray-700">
                            <CheckCircle2 className="w-3 h-3 text-green-500 mr-2 mt-0.5" />
                            <span>**尊严感：** 花自己挣的钱，和伸手要钱，人格的硬度是完全不一样的。</span>
                        </li>
                    </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Reflection (Poem/Wake Up Call) */}
        {activeTab === 'reflection' && (
            <div className="max-w-3xl mx-auto animate-fade-in space-y-8 pb-12">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 font-serif tracking-wide">给修道者的一封家书</h2>
                    <p className="text-gray-500 mt-2">—— 借这红尘的文字，唤你醒来</p>
                </div>

                {/* Stanza 1: Ambition */}
                <div className="bg-white rounded-xl shadow-lg border-t-4 border-blue-800 overflow-hidden">
                    <div className="p-8 relative">
                        <Feather className="absolute top-6 right-6 text-blue-100 w-24 h-24 rotate-12" />
                        <h3 className="text-xl font-bold text-blue-900 mb-4 font-serif border-b border-blue-100 pb-2 inline-block">一）论“眼界”：心比天高，命如纸薄</h3>
                        <div className="space-y-3 text-lg text-gray-700 font-serif leading-relaxed relative z-10">
                            <p>你也曾笑看凡夫走卒忙，</p>
                            <p>只有七八千文入行囊。</p>
                            <p>笑他们燕雀不知鸿鹄志，</p>
                            <p>却不知鸿鹄折翅在泥塘。</p>
                            <br/>
                            <p>你说你眼中世界多宽广，</p>
                            <p>那是 <span className="font-bold text-blue-700">识神</span> 作祟乱飞扬。</p>
                            <p>真高人，低头肯把厕所扫，</p>
                            <p>假把式，梦里才敢做帝王。</p>
                            <p>莫把那是由于“欲望撑破了本事”的焦虑，</p>
                            <p>当成了“天降大任”的辉煌。</p>
                        </div>
                    </div>
                    <div className="bg-blue-50 p-4 border-t border-blue-100">
                        <div className="flex items-start gap-3">
                            <div className="bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded mt-1">注解</div>
                            <p className="text-sm text-blue-900 opacity-80">
                                <b>识神 (Shí Shén)：</b> 道家语，指后天思维。在这里指你躁狂发作时的<b>“思维奔逸”</b>。你觉得脑子转得快、想法多、觉得自己是天才，这在精神医学上是典型的<b>躁狂症状</b>，而不是“开悟”。
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stanza 2: Delusion (Updated) */}
                <div className="bg-white rounded-xl shadow-lg border-t-4 border-rose-500 overflow-hidden">
                    <div className="p-8 relative">
                        <Eye className="absolute top-6 right-6 text-rose-100 w-24 h-24 -rotate-12" />
                        <h3 className="text-xl font-bold text-rose-900 mb-4 font-serif border-b border-rose-100 pb-2 inline-block">（二）斥“妄见”：坐井观天，反认他乡</h3>
                        <div className="space-y-3 text-lg text-gray-700 font-serif leading-relaxed relative z-10">
                            <p>你说众生皆被蒙，唯你独以此眼亮？</p>
                            <p>信那 <span className="font-bold text-rose-600">“地平天圆”</span> 说，笑人科学是屏障。</p>
                            <p>此乃 <span className="font-bold text-rose-600">“知见障”</span> 中魔，自困愁城作帝王。</p>
                            <br/>
                            <p>修道首重 <span className="font-bold text-rose-600">“格物”</span> 理，万物之理未曾通，</p>
                            <p>却向荒唐纸上望。</p>
                            <p>你以为你跳出了三界思维的墙，</p>
                            <p>其实是把脑子，锁进了偏执的深巷。</p>
                        </div>
                    </div>
                    <div className="bg-rose-50 p-4 border-t border-rose-100">
                        <div className="flex items-start gap-3">
                            <div className="bg-rose-200 text-rose-800 text-xs font-bold px-2 py-1 rounded mt-1">注解</div>
                            <p className="text-sm text-rose-900 opacity-80">
                                <b>知见障 (Zhī Jiàn Zhàng)：</b> 佛教语。指因为错误的知识或偏见，阻碍了对真理的认知。你盲目相信“地平论”、反智阴谋论，这不叫“众人皆醉我独醒”，这叫<b>“认知闭环”</b>。
                                <br/>
                                <b>格物 (Gé Wù)：</b> 儒家语，“格物致知”。指探究事物的原理。连最基本的物理常识都不懂，就去修道，那是空中楼阁。
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stanza 3: Greed (Updated) */}
                <div className="bg-white rounded-xl shadow-lg border-t-4 border-purple-800 overflow-hidden">
                    <div className="p-8 relative">
                        <Magnet className="absolute top-6 right-6 text-purple-100 w-24 h-24" />
                        <h3 className="text-xl font-bold text-purple-900 mb-4 font-serif border-b border-purple-100 pb-2 inline-block">（三）斥“贪念”：点石成金，黄粱一饷</h3>
                        <div className="space-y-3 text-lg text-gray-700 font-serif leading-relaxed relative z-10">
                            <p>网盘课程修秘籍，股市K线画辉煌。</p>
                            <p>想那 <span className="font-bold text-purple-700">“搬运”</span> 千金术，不劳而获入锦囊。</p>
                            <br/>
                            <p><span className="font-bold text-purple-700">“贪嗔痴”</span> 三毒攻心，却道是雄心万丈。</p>
                            <p>真仙若要度红尘，先要把那 <span className="font-bold text-purple-700">“饿鬼”</span> 降。</p>
                            <p>连一份盒饭钱都挣得跌跌撞撞，</p>
                            <p>哪来的底气，要去收割世间的以此以此，彼样彼样？</p>
                        </div>
                    </div>
                    <div className="bg-purple-50 p-4 border-t border-purple-100">
                        <div className="flex items-start gap-3">
                            <div className="bg-purple-200 text-purple-800 text-xs font-bold px-2 py-1 rounded mt-1">注解</div>
                            <p className="text-sm text-purple-900 opacity-80">
                                <b>贪嗔痴 (Tān Chēn Chī)：</b> 佛教三毒。这里指你想“不劳而获”的<b>贪念</b>。你买网盘课、炒股，本质上不是为了学习或投资，而是想<b>走捷径</b>暴富。
                                <br/>
                                <b>饿鬼 (Hungry Ghost)：</b> 指欲望无穷但永远得不到满足的状态。你现在的状态就是“精神饿鬼”，急于求成，结果一无所获。
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stanza 4: Conclusion (Updated) */}
                <div className="bg-white rounded-xl shadow-lg border-t-4 border-emerald-600 overflow-hidden">
                    <div className="p-8 relative">
                        <Utensils className="absolute top-6 right-6 text-emerald-100 w-24 h-24" />
                        <h3 className="text-xl font-bold text-emerald-900 mb-4 font-serif border-b border-emerald-100 pb-2 inline-block">（四）断语：何为真通？</h3>
                        <div className="space-y-3 text-lg text-gray-700 font-serif leading-relaxed relative z-10">
                            <p>莫再夸口能量强，</p>
                            <p>且看你：</p>
                            <p>气浮心躁如野马，</p>
                            <p>志大才疏似荒唐。</p>
                            <br/>
                            <p>若问神通何处是？</p>
                            <p>能吃能睡，不累爹娘！</p>
                            <p>此时即是——无上道场。</p>
                        </div>
                    </div>
                    <div className="bg-emerald-50 p-4 border-t border-emerald-100">
                        <div className="flex items-start gap-3">
                            <div className="bg-emerald-200 text-emerald-800 text-xs font-bold px-2 py-1 rounded mt-1">注解</div>
                            <p className="text-sm text-emerald-900 opacity-80">
                                <b>无上道场：</b> 真正的修行不在深山，而在生活。能把平凡的日子过好，不让父母操心，养活自己，这就是最高的修行。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Tab: AI Analysis */}
        {activeTab === 'analysis' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
             <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-800">AI 绝对理智分析</h2>
                <p className="text-gray-600 mt-2">输入你现在的"宏伟计划"或"困扰"，让 AI 用纯逻辑打分。不带感情，只讲事实。</p>
             </div>
             <BiasDetector />
          </div>
        )}

        {/* Tab: Logic Game */}
        {activeTab === 'game' && (
           <div className="animate-fade-in">
             <div className="mb-8 text-center max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800">迷途知返：逻辑大挑战</h2>
                <p className="text-gray-600 mt-2">看看在面对人生关键路口时，你的大脑是选择了"科学的生路"，还是"迷信的死路"。</p>
             </div>
             <LogicGame />
           </div>
        )}

        {/* Tab: Science (Scientific Foundation) */}
        {activeTab === 'science' && (
          <div className="max-w-5xl mx-auto animate-fade-in space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-slate-800 p-6 text-white">
                    <h2 className="text-2xl font-bold flex items-center">
                        <Microscope className="w-6 h-6 mr-3" />
                        科学地基：为什么"心诚"不能则灵？
                    </h2>
                    <p className="text-slate-300 mt-2">世界是物质的，不是想出来的。唯物主义不是冷酷，而是最大的慈悲，因为它告诉你真相。</p>
                </div>
                
                <div className="p-6 grid md:grid-cols-2 gap-6">
                    {/* Example 1: Double Blind */}
                     <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100 flex flex-col">
                        <h3 className="text-lg font-bold text-indigo-800 mb-2 flex items-center">
                            <Gavel className="w-5 h-5 mr-2"/> 1. 金标准：双盲实验
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed flex-grow">
                            为什么中医偏方不能代替现代医学？因为它们大多经不起<b>双盲随机对照实验</b>。
                            不做双盲，人类会有30%-50%的<b>安慰剂效应</b>——你觉得有效，只是因为你"相信"它有效，身体并没有真正被治愈。
                        </p>
                    </div>

                    {/* Example 2: Russell's Teapot */}
                    <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100 flex flex-col">
                        <h3 className="text-lg font-bold text-indigo-800 mb-2 flex items-center">
                            <AlertOctagon className="w-5 h-5 mr-2"/> 2. 罗素的茶壶：举证责任
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed flex-grow">
                            如果我说"太阳和地球之间有一把茶壶"，你看不见不代表我说的对。
                            <b>谁主张，谁举证。</b> 当大师说"你有业障"、"有鬼神"时，<b>证明的责任在他。</b> 他拿不出证据，就是在撒谎。不要试图去"证伪"玄学，那是徒劳的。
                        </p>
                    </div>

                     {/* Example 3: Occam's Razor */}
                     <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100 flex flex-col">
                        <h3 className="text-lg font-bold text-indigo-800 mb-2 flex items-center">
                            <Scale className="w-5 h-5 mr-2"/> 3. 奥卡姆剃刀：剔除鬼神
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed flex-grow">
                            <b>"如无必要，勿增实体。"</b> 
                            如果你看到天空有光，最简单的解释是"飞机"或"无人机"，而不是"外星人"或"神迹"。
                            如果你感到身体不适，最简单的解释是"你累了"或"生病了"，而不是"冤亲债主找上门"。不要把简单的事情搞得神神叨叨。
                        </p>
                    </div>

                     {/* Example 4: Correlation != Causation */}
                     <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100 flex flex-col">
                        <h3 className="text-lg font-bold text-indigo-800 mb-2 flex items-center">
                            <Link className="w-5 h-5 mr-2"/> 4. 相关性 ≠ 因果性
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed flex-grow">
                            <b>"公鸡打鸣，太阳升起"，但公鸡并没有把太阳叫出来。</b>
                            你喝了符水，病好了，是因为你的免疫系统战胜了病毒，而不是符水起了作用。
                            不要把"先后发生"的两件事强行联系在一起，这是迷信产生的根源。
                        </p>
                    </div>

                     {/* Example 5: Survivor Bias */}
                    <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100 flex flex-col">
                        <h3 className="text-lg font-bold text-indigo-800 mb-2 flex items-center">
                            <Brain className="w-5 h-5 mr-2"/> 5. 幸存者偏差
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed flex-grow">
                            二战加固飞机的例子告诉我们：<b>看不见的才是关键。</b>
                            你看到有人炒股发财，有人信佛病好了。那是因为<b>亏光了跳楼的人、信佛耽误治疗去世的人，发不出声音。</b> 
                            死人是不会说话的，不要被活着的少数幸运儿蒙蔽。
                        </p>
                    </div>

                     {/* Example 6: Barnum Effect */}
                     <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100 flex flex-col">
                        <h3 className="text-lg font-bold text-indigo-800 mb-2 flex items-center">
                            <Sparkles className="w-5 h-5 mr-2"/> 6. 巴纳姆效应 (算命原理)
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed flex-grow">
                            为什么算命觉得准？因为他们说的是"笼统的废话"。
                            比如："你外表坚强但内心渴望被爱"。这几句话放在全人类身上都准。
                            并不是大师懂你，而是人类的大脑会自动把模糊的信息往自己身上套。
                        </p>
                    </div>

                     {/* Example 7: Falsifiability */}
                     <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100 flex flex-col">
                        <h3 className="text-lg font-bold text-indigo-800 mb-2 flex items-center">
                            <HelpCircle className="w-5 h-5 mr-2"/> 7. 可证伪性 (波普尔准则)
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed flex-grow">
                            科学是可以被证明"错"的，而伪科学永远"正确"。
                            如果你吃了药没好，医生会承认药无效；
                            如果你拜佛没灵，大师会说<b>"是你心不诚"</b>。这种怎么说都有理的逻辑，就是典型的<b>流氓逻辑</b>。
                        </p>
                    </div>
                    
                     {/* Example 8: Cognitive Dissonance */}
                     <div className="bg-indigo-50 p-5 rounded-lg border border-indigo-100 flex flex-col">
                        <h3 className="text-lg font-bold text-indigo-800 mb-2 flex items-center">
                            <Lock className="w-5 h-5 mr-2"/> 8. 认知失调 (为什么你不认错)
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed flex-grow">
                            当你发现自己信奉多年的东西是假的时，大脑会极其痛苦。为了保护自尊，你会<b>下意识地拒绝真相</b>，甚至攻击说真话的人。
                            承认自己"被骗了"、"走错了"，是强者的表现。不要为了维护那点可怜的面子，搭上后半生。
                        </p>
                    </div>
                </div>
            </div>
          </div>
        )}

        {/* Tab: Traps (Scams & Escapism) */}
        {activeTab === 'traps' && (
          <div className="max-w-5xl mx-auto animate-fade-in space-y-8">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
                    <Skull className="w-7 h-7 mr-2"/> 避坑指南：为什么骗子最喜欢找你？
                </h2>
                <p className="text-red-900 opacity-80 mb-6">
                    并不是因为你善良，而是因为你的<b>逻辑防线有漏洞</b>。骗子最喜欢筛选出"相信玄学"的人，因为这群人的钱最好骗。
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                    {/* TRAP: SPIRITUAL PONZI SCHEME (NEW) */}
                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-purple-600">
                         <h3 className="font-bold text-purple-800 mb-2 text-lg flex items-center">
                            <Users className="w-5 h-5 mr-2"/> 1. "身心灵"课程的杀猪盘
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            <b>真相：这就是一个击鼓传花的庞氏骗局。</b><br/>
                            你以为你在学正念，其实你在学"如何卖课"。
                            这种培训班的商业模式是：<b>赚想当老师的人的钱。</b>
                            <br/>
                            导师把证书卖给你（第一棒），你拿着证书却找不到学生，因为市场上根本没有那么多需求。
                            于是为了回本，你只能去忽悠下一批人来考证（寻找下一棒）。
                            <b>你是这个骗局的最后一棒韭菜。</b>
                        </p>
                    </div>

                    {/* TRAP: GENETIC SUSCEPTIBILITY (NEW - SENSITIVE) */}
                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-orange-500">
                        <h3 className="font-bold text-orange-800 mb-2 text-lg flex items-center">
                             <Brain className="w-5 h-5 mr-2"/> 2. 警惕"家族易感性" (不是玄学)
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            你的母亲当年信法轮功、相信“红外线”伪科学保健仪器，这不仅仅是环境问题，可能有<b>遗传的心理易感性</b>。
                            心理学研究表明，<b>"高开放性+低批判性思维"</b>的人格特质是可遗传的。
                            这意味着你比常人更容易受到暗示，更容易把幻想当真。
                            这不是命运，而是生理特征（像容易得糖尿病一样）。<b>既然知道自己有这个"体质"，就要比别人更严格地用科学逻辑武装自己，而不是放任大脑"走神"。</b>
                        </p>
                    </div>

                    {/* TRAP: NARCISSISM (NEW) */}
                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-pink-500">
                         <h3 className="font-bold text-pink-800 mb-2 text-lg flex items-center">
                            <UserX className="w-5 h-5 mr-2"/> 3. 厌恶平凡 = 全能自恋受损
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            为什么你瞧不起7-8千的工作？因为你潜意识里觉得自己是"天选之子"，平凡的工作配不上你。
                            <b>这是一种病态的自恋。</b>
                            真正的修行是"挑水砍柴"，是在琐碎的日常工作中磨炼心性。
                            <b>连一份普通工作都做不好的人，根本没有资格谈修行。</b> 只有承认自己是个普通人，才能开始真正的人生。
                        </p>
                    </div>
                    
                    {/* Trap: Monkhood */}
                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-orange-400">
                        <h3 className="font-bold text-gray-800 mb-2 text-lg">4. "出家"是逃避，不是超脱</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            你以为出家是"看破红尘"，其实是<b>人格障碍</b>在作祟。
                            你觉得人生没有意义，内心迷茫，害怕竞争，所以躲进寺庙这个"避难所"。
                            结果发现佛门不清净，又跑回来。这说明<b>问题不在环境，在于你的心。</b>
                            不要再美化那段经历来感动自己了，那只是你人生的一段逃兵史。
                        </p>
                    </div>
                    
                    {/* Trap: PUA */}
                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-red-500">
                        <h3 className="font-bold text-gray-800 mb-2 text-lg">5. 精神控制 (PUA) 套路</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            那个说你怀孕、要做法的大师，用的是经典PUA三步曲：
                            <b>建立权威 -> 制造恐惧 -> 提供解药。</b>
                            凡是让你感到恐惧、并要你掏钱或者发生关系才能消除恐惧的人，100%是骗子。正神不谈钱，谈钱非正神。
                        </p>
                    </div>

                    {/* Trap: Suggestibility */}
                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-blue-400">
                        <h3 className="font-bold text-gray-800 mb-2 text-lg">6. 失去独立思考能力</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            相信地平论、相信极端中医，是因为你的大脑像没有门卫的广场，谁声音大就信谁。
                            这是一种<b>智力上的懒惰</b>。你需要建立科学的过滤器：权威期刊怎么说？数据在哪里？
                        </p>
                    </div>

                    {/* Trap: Echo Chambers */}
                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-purple-500">
                        <h3 className="font-bold text-gray-800 mb-2 text-lg flex items-center">
                             7. 信息茧房：算法的洗脑
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            为什么你觉得全世界都在修行？因为抖音算法把你标记为了"玄学受众"。
                            <b>你被困在了一个全是疯子的井底。</b> 放下手机，去菜市场走走，那才是真实世界。
                        </p>
                    </div>

                     {/* Trap: Pathological Confidence (Optimized) */}
                     <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green-500">
                        <h3 className="font-bold text-gray-800 mb-2 text-lg flex items-center">
                             <Zap className="w-5 h-5 mr-2 text-green-600"/> 8. 莫名其妙的"自信周期"
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            你是否发现，你的自信像过山车？一阵子觉得"我是天才，这事能成"，一阵子又跌入谷底。
                            <b>这不叫自信，这叫情绪躁动。</b><br/>
                            真正的自信是基于<b>过往的成功经验</b>（你真的赚过钱、做成过事）。
                            而你现在的"信心满满"，完全是基于<b>幻想</b>。这是一种心理调节失衡的表现。
                            这种"毫无根据的亢奋"最危险，它会让你在冲动下做错误决定（借钱买课、盲目投资），醒来后只剩一地鸡毛。
                        </p>
                    </div>

                     {/* Trap: External Blame / Victim Mentality (Optimized) */}
                     <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-rose-500">
                        <h3 className="font-bold text-gray-800 mb-2 text-lg flex items-center">
                             <XCircle className="w-5 h-5 mr-2 text-rose-600"/> 9. "怪家里人不给钱"的巨婴逻辑
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            "如果你们支持我资金，我就能成大师。" —— <b>这是最懦弱的借口。</b><br/>
                            真相是：<b>真正的金子，在哪里都会发光。</b> 
                            现在的自媒体是免费的，如果你真的有才华，发抖音早就火了，根本不需要花几万块去上什么"课"。
                            你潜意识里知道自己做不成，但不敢面对失败。所以你必须<b>制造一个障碍</b>（缺钱），把锅甩给家人。这样你就可以心安理得地骗自己："不是我不行，是条件不允许。"
                        </p>
                    </div>
                </div>
            </div>
          </div>
        )}

        {/* Tab: Career Reality */}
        {activeTab === 'career' && (
          <div className="max-w-5xl mx-auto animate-fade-in space-y-8">
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <Briefcase className="w-6 h-6 mr-2 text-indigo-600"/> 职业真相：戳破"轻松赚大钱"的泡沫
                </h2>

                {/* ROI Analysis (NEW) */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
                    <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center">
                        <Calculator className="w-5 h-5 mr-2"/> 商业模式画布推演：这笔账你算过吗？
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-red-500">
                            <div className="font-bold text-red-600 text-lg mb-2">方案 A: 正念/身心灵导师</div>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex justify-between"><span>前期投入(学费):</span> <span className="font-bold text-red-500">-30,000元</span></li>
                                <li className="flex justify-between"><span>时间成本:</span> <span className="font-bold text-red-500">6-12个月无收入</span></li>
                                <li className="flex justify-between"><span>获客成本:</span> <span className="font-bold text-red-500">极高(需做自媒体)</span></li>
                                <li className="flex justify-between"><span>预计月收入:</span> <span className="font-bold text-gray-500">0 - 3,000元 (极不稳定)</span></li>
                                <li className="mt-2 pt-2 border-t border-gray-100 font-bold text-red-700">回本周期：无限期 (大概率亏损)</li>
                            </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border-t-4 border-green-500">
                            <div className="font-bold text-green-600 text-lg mb-2">方案 B: 英语老师/普通职员</div>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li className="flex justify-between"><span>前期投入:</span> <span className="font-bold text-green-500">0元 (已有技能)</span></li>
                                <li className="flex justify-between"><span>时间成本:</span> <span className="font-bold text-green-500">即刻上岗</span></li>
                                <li className="flex justify-between"><span>获客成本:</span> <span className="font-bold text-green-500">0 (公司提供生源)</span></li>
                                <li className="flex justify-between"><span>预计月收入:</span> <span className="font-bold text-green-600">7,000 - 12,000元</span></li>
                                <li className="mt-2 pt-2 border-t border-gray-100 font-bold text-green-700">回本周期：首月即盈利</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                {/* Traffic Funnel (NEW) */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8">
                    <h3 className="font-bold text-lg text-indigo-800 mb-4 flex items-center">
                        <Radar className="w-5 h-5 mr-2"/> 流量漏斗真相：为什么你卖不出课？
                    </h3>
                    <div className="space-y-3">
                        <p className="text-sm text-gray-700">
                            你想"网盘买课，剪辑卖课"，或者"自己当正念老师"。你只看到了最后收钱的那一步，却忽略了前面巨大的<b>流量漏斗</b>：
                        </p>
                        <div className="flex flex-col items-center space-y-2 mt-4">
                            <div className="w-full max-w-md bg-indigo-200 py-2 text-center rounded text-xs text-indigo-900 font-bold">曝光：100,000次观看 (你现在是0)</div>
                            <div className="w-3/4 max-w-xs bg-indigo-300 py-2 text-center rounded text-xs text-indigo-900 font-bold">点击：1,000人进主页</div>
                            <div className="w-1/2 max-w-[150px] bg-indigo-400 py-2 text-center rounded text-xs text-white font-bold">咨询：50人加微信</div>
                            <div className="w-1/4 max-w-[80px] bg-indigo-600 py-2 text-center rounded text-xs text-white font-bold">成交：1单</div>
                        </div>
                        <p className="text-xs text-center text-gray-500 mt-2">
                            <b>没有粉丝基础，你的课就算做得像花一样，也卖不出去。</b> 
                            那些赚到钱的"大师"，本质上是<b>流量高手</b>，而不是修行高手。你连基本的职场能力都没有，凭什么觉得自己能搞定这么复杂的商业闭环？
                        </p>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Scenario 1 */}
                    <div className="flex flex-col md:flex-row gap-6 border-b border-gray-100 pb-8">
                        <div className="md:w-1/3">
                            <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full inline-block text-xs font-bold mb-2">你的幻想</div>
                            <h3 className="font-bold text-lg">"我买点网盘课程，剪剪视频卖课就能发财"</h3>
                        </div>
                        <div className="md:w-2/3">
                            <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full inline-block text-xs font-bold mb-2">残酷现实</div>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                1. <b>版权风险：</b> 这种倒卖行为是违法的，随时会被封号起诉。
                                <br/>
                                2. <b>商业逻辑：</b> 真正的卖课需要巨大的流量（你有吗？）、精细的运营（你会吗？）、完善的售后。
                                <br/>
                                3. <b>眼高手低：</b> 你只看到了结果（别人赚钱），忽略了过程（别人每天工作16小时）。任何轻视"执行细节"的人，都不可能在商业上成功。
                            </p>
                        </div>
                    </div>

                    {/* Scenario 2 */}
                    <div className="flex flex-col md:flex-row gap-6 border-b border-gray-100 pb-8">
                        <div className="md:w-1/3">
                            <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full inline-block text-xs font-bold mb-2">你的幻想</div>
                            <h3 className="font-bold text-lg">"我要做正念老师，哪怕我还没学几天"</h3>
                        </div>
                        <div className="md:w-2/3">
                            <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full inline-block text-xs font-bold mb-2">残酷现实</div>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                <b>这是极度的不负责任。</b> 
                                心理咨询行业有严格的准入门槛。你现在处于逻辑思维能力，人生阅历都比较低的状态，是一个需要被治疗的病人，而不是医生。
                                <br/>
                                就像一个骨折的人要去教别人跑步一样荒谬。<b>先把自己治好，找个普通工作干几年，证明你有回归社会的能力</b>，这才是真正的正念。
                            </p>
                        </div>
                    </div>

                    {/* Scenario 3 */}
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                            <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full inline-block text-xs font-bold mb-2">你的幻想</div>
                            <h3 className="font-bold text-lg">"7-8千的工资太少了，我要赚大钱"</h3>
                        </div>
                        <div className="md:w-2/3">
                            <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full inline-block text-xs font-bold mb-2">残酷现实</div>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                **劳动没有贵贱，但啃老有。**
                                <br/>
                                哪怕是去麦当劳打工，哪怕是做保洁，只要是靠自己的双手创造价值，都比在家空想"年入百万"要高贵一万倍。
                                <br/>
                                <b>7000元是你尊严的底线。</b> 有了这份收入，你就不需要依附于别人，不需要为了钱去相亲，不需要在被骗时无路可走。不要让你的傲慢毁了你的生存根基。
                            </p>
                        </div>
                    </div>
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
