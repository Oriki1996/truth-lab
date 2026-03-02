"use client";
import { useState } from 'react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function Quiz({ questions }: { questions: Question[] }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  const handleAnswer = (index: number) => {
    if (index === questions[current].correctAnswer) setScore(score + 1);
    if (current + 1 < questions.length) setCurrent(current + 1);
    else setShowFinal(true);
  };

  if (showFinal) return (
    <div className="p-8 bg-green-50 rounded-3xl text-center border-2 border-green-200 shadow-inner animate-in zoom-in duration-300">
      <h2 className="text-3xl font-black text-green-800 mb-2">????? ?????</h2>
      <p className="text-xl text-green-700 font-sans">????? ????? ???: {score} ???? {questions.length}</p>
    </div>
  );

  return (
    <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-tighter font-sans">???? {current + 1}</span>
        <span className="text-slate-400 text-sm font-sans">{Math.round(((current) / questions.length) * 100)}% ?????</span>
      </div>
      <h3 className="text-2xl font-black text-slate-800 mb-8 leading-tight">{questions[current].question}</h3>
      <div className="grid gap-4">
        {questions[current].options.map((opt, i) => (
          <button 
            key={i} 
            onClick={() => handleAnswer(i)} 
            className="p-5 text-right border-2 border-slate-100 rounded-2xl hover:border-blue-400 hover:bg-blue-50 hover:scale-[1.02] active:scale-[0.98] transition-all font-bold text-slate-700"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
