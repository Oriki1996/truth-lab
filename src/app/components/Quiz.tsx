"use client";
import { useState } from 'react';

export default function Quiz({ questions }: { questions: any[] }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showFinal, setShowFinal] = useState(false);

  const handleAnswer = (index: number) => {
    if (index === questions[current].correctAnswer) setScore(score + 1);
    if (current + 1 < questions.length) setCurrent(current + 1);
    else setShowFinal(true);
  };

  if (showFinal) {
    const starCount = Math.ceil((score / questions.length) * 3);
    return (
      <div className="p-10 bg-white border-4 border-blue-100 rounded-[3rem] text-center shadow-2xl animate-in zoom-in duration-500">
        <h2 className="text-4xl font-black text-slate-900 mb-4">השלמת את המעבדה!</h2>
        <div className="flex justify-center gap-2 mb-6 text-6xl">
          {[1, 2, 3].map(s => (
            <span key={s} className={s <= starCount ? 'text-yellow-400' : 'text-slate-200'}>
              ★
            </span>
          ))}
        </div>
        <p className="text-2xl text-slate-600 font-bold mb-8">הרווחת {starCount} כוכבים!</p>
        <button onClick={() => window.location.href='/'} className="py-4 px-10 bg-blue-600 text-white rounded-2xl font-black text-xl hover:bg-blue-700 shadow-lg transition-all">
          חזרה ללוח הבקרה
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* מד התקדמות עילי */}
      <div className="w-full bg-slate-200 h-3 rounded-full mb-8 overflow-hidden">
        <div 
          className="bg-blue-600 h-full transition-all duration-500" 
          style={{ width: `${((current) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl">
        <h3 className="text-3xl font-black text-slate-800 mb-10 leading-tight">{questions[current].question}</h3>
        <div className="grid gap-4">
          {questions[current].options.map((opt: string, i: number) => (
            <button key={i} onClick={() => handleAnswer(i)} className="p-6 text-right border-2 border-slate-100 rounded-2xl hover:border-blue-400 hover:bg-blue-50 hover:scale-[1.02] transition-all font-bold text-xl text-slate-700">
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}