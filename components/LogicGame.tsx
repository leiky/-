
import React, { useState } from 'react';
import { CheckCircle2, XCircle, Brain, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

interface Question {
  id: number;
  scenario: string;
  context: string;
  options: {
    type: 'LOGIC' | 'MAGIC';
    text: string;
    feedback: string;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    context: "当你感到诸事不顺，心情低落，甚至想发火时...",
    scenario: "你觉得这是什么原因？",
    options: [
      {
        type: 'MAGIC',
        text: "肯定是最近水逆，或者是冤亲债主来讨债了，得做法事。",
        feedback: "❌ 错误归因。这叫'外归因'，把责任推给不可控的神秘力量，会让你放弃对自己情绪的主动管理。心情不好通常是生理期、睡眠不足或多巴胺分泌减少导致的，或者是具体的困难没解决。"
      },
      {
        type: 'LOGIC',
        text: "可能是最近压力大，或者生理激素水平波动，需要休息和运动。",
        feedback: "✅ 正确。这叫'内归因'和'生理归因'。承认情绪是大脑的化学反应，你就可以通过运动、睡觉、吃药来科学地调节它，而不是被动等待运势好转。"
      }
    ]
  },
  {
    id: 2,
    context: "你在网上看到一个'大师'，他说一眼就能看出你过得不好，还要给你转运...",
    scenario: "你会怎么想？",
    options: [
      {
        type: 'LOGIC',
        text: "他是骗子，利用'巴纳姆效应'说一些模棱两可的废话套路我。",
        feedback: "✅ 满分。'巴纳姆效应'是指人们容易相信笼统的人格描述。大师说你'外表坚强内心脆弱'，这废话放在谁身上都准。他的目的是筛选出好骗的人，然后骗钱。"
      },
      {
        type: 'MAGIC',
        text: "天哪太准了，他可能有神通，我得听听他怎么说，花点钱也行。",
        feedback: "❌ 危险！这是典型的'冷读术'。骗子利用你的焦虑和渴望被理解的心理，先恐吓你（你有灾），再给你希望（给钱能解）。一旦转账，你就被收割了。"
      }
    ]
  },
  {
    id: 3,
    context: "关于赚钱，你想找一份工作...",
    scenario: "你会选择哪一个？",
    options: [
      {
        type: 'MAGIC',
        text: "我要做直播/卖课，听说谁谁谁一个月赚几十万，我觉得我也行。",
        feedback: "❌ 幸存者偏差。你只看到了1个成功的李佳琦，忽略了100万个饿死的主播。没有团队、没有资本、没有长期积累，普通人做这个成功的概率比中彩票还低。这是赌博，不是工作。"
      },
      {
        type: 'LOGIC',
        text: "找个英语老师的工作，月薪虽然只有7000，但有五险一金，很稳定。",
        feedback: "✅ 理性决策。虽然7000不多，但是确定的现金流。稳定的工作能构建你的生活秩序，让你接触真实社会，这比在家空想暴富要高贵得多。"
      }
    ]
  },
  {
    id: 4,
    context: "去医院检查出中度抑郁，医生开了药...",
    scenario: "你会怎么做？",
    options: [
      {
        type: 'LOGIC',
        text: "遵医嘱按时吃药，这是大脑生病了，就像感冒要吃药一样。",
        feedback: "✅ 科学态度。抑郁症本质是神经递质传导异常，是生理病变。现代医学的双盲实验证明药物是目前最有效的手段。"
      },
      {
        type: 'MAGIC',
        text: "西药有副作用，我要靠正念、冥想或者找大师驱邪来治。",
        feedback: "❌ 拿生命开玩笑。正念可以辅助，但不能替代药物。至于驱邪更是封建迷信。拒绝科学治疗会导致病情恶化，最后可能会做出极端的傻事。"
      }
    ]
  },
  {
    id: 5,
    context: "有人告诉你地球是平的，或者美国登月是假的...",
    scenario: "你的反应是？",
    options: [
      {
        type: 'MAGIC',
        text: "好像挺有道理的，现在的科学可能是政府的阴谋。",
        feedback: "❌ 阴谋论中毒。这是缺乏基础科学素养的表现。相信阴谋论会让你与现实社会脱节，变得偏激、无法沟通，最后被社会边缘化。"
      },
      {
        type: 'LOGIC',
        text: "这违背基本的物理常识和天文观测证据，是无稽之谈。",
        feedback: "✅ 智商在线。科学讲究证据和数据，而不是凭空想象。保持批判性思维，才能不被洗脑。"
      }
    ]
  }
];

const LogicGame: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [gameFinished, setGameFinished] = useState(false);

  const handleChoice = (index: number, type: 'LOGIC' | 'MAGIC') => {
    setSelectedOptionIndex(index);
    setShowFeedback(true);
    if (type === 'LOGIC') {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setShowFeedback(false);
      setSelectedOptionIndex(null);
    } else {
      setGameFinished(true);
    }
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowFeedback(false);
    setSelectedOptionIndex(null);
    setGameFinished(false);
  };

  if (gameFinished) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-2xl mx-auto mt-10 border-2 border-indigo-100">
        <Brain className="w-20 h-20 mx-auto text-indigo-600 mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-4">挑战结束！</h2>
        <div className="text-6xl font-black text-indigo-600 mb-6">{score * 20} <span className="text-2xl text-gray-400">/ 100分</span></div>
        
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8 text-left">
          {score === questions.length ? (
            <div>
              <h3 className="text-xl font-bold text-green-600 mb-2 flex items-center"><CheckCircle2 className="mr-2"/> 人间清醒！</h3>
              <p className="text-gray-700">你的逻辑非常清晰，科学素养很高。只要在生活中坚持这种思维，骗子根本近不了你的身，你的人生也会越来越顺。</p>
            </div>
          ) : score >= questions.length / 2 ? (
            <div>
              <h3 className="text-xl font-bold text-yellow-600 mb-2 flex items-center"><Sparkles className="mr-2"/> 还在摇摆</h3>
              <p className="text-gray-700">你有时能保持理智，但有时还是容易被情绪和神秘主义带偏。记住：感觉不一定是真的，数据和逻辑才是真的。</p>
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-bold text-red-600 mb-2 flex items-center"><XCircle className="mr-2"/> 警报拉响</h3>
              <p className="text-gray-700">你现在的思维模式非常危险，很容易成为骗子的猎物。请务必多读科学书籍，少看短视频，遇事多问几个"有什么科学依据"。</p>
            </div>
          )}
        </div>

        <button 
          onClick={resetGame}
          className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          重新挑战
        </button>
      </div>
    );
  }

  const question = questions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Brain className="w-8 h-8 text-indigo-600 mr-3" />
            逻辑道场 (Logic Dojo)
            </h2>
            <p className="text-gray-500 text-sm mt-1">第 {currentIndex + 1} 关 / 共 {questions.length} 关</p>
        </div>
        <div className="text-indigo-600 font-bold text-xl">
            当前得分: {score * 20}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-50">
        {/* Scenario Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <div className="text-indigo-200 text-sm font-bold tracking-wider uppercase mb-2">Scenario</div>
            <p className="text-lg opacity-90 mb-4">{question.context}</p>
            <h3 className="text-2xl font-bold">{question.scenario}</h3>
        </div>

        {/* Options Section */}
        <div className="p-8">
            {!showFeedback ? (
                <div className="grid gap-4">
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleChoice(index, option.type)}
                            className="text-left p-6 rounded-xl border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
                        >
                            <div className="font-bold text-gray-700 group-hover:text-indigo-700 text-lg mb-2">
                                选项 {String.fromCharCode(65 + index)}
                            </div>
                            <div className="text-gray-600">{option.text}</div>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="animate-fade-in">
                    <div className={`p-6 rounded-xl border-l-4 mb-6 ${
                        question.options[selectedOptionIndex!].type === 'LOGIC' 
                            ? 'bg-green-50 border-green-500 text-green-900' 
                            : 'bg-red-50 border-red-500 text-red-900'
                    }`}>
                        <h4 className="font-bold text-lg mb-2 flex items-center">
                            {question.options[selectedOptionIndex!].type === 'LOGIC' 
                                ? <><CheckCircle2 className="w-6 h-6 mr-2"/> 选得漂亮！科学胜利！</>
                                : <><XCircle className="w-6 h-6 mr-2"/> 掉进陷阱了！</>
                            }
                        </h4>
                        <p className="leading-relaxed">
                            {question.options[selectedOptionIndex!].feedback}
                        </p>
                    </div>

                    <button 
                        onClick={nextQuestion}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl flex items-center justify-center transition-colors shadow-md"
                    >
                        下一关 <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default LogicGame;
