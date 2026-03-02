"use client";
import { useState } from 'react';

export default function Quiz({ questions, lessonId }: { questions: any[], lessonId?: number }) {
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
      <div className="p-10 bg-white rounded-[3rem] text-center shadow-2xl" dir="rtl">
        <h2 className="text-4xl font-black text-slate-900 mb-4">השלמת את המעבדה!</h2>
        <p className="text-2xl text-slate-600 font-bold mb-8">הרווחת {starCount} כוכבים!</p>
        <button onClick={() => window.location.href='/'} className="py-4 px-10 bg-blue-600 text-white rounded-2xl font-black">
          חזרה ללוח הבקרה
        </button>
      </div>
    );
  }

  return (
    <div className="w-full" dir="rtl">
      <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl text-right">
        <h3 className="text-3xl font-black text-slate-800 mb-10">{questions[current].question}</h3>
        <div className="grid gap-4">
          {questions[current].options.map((opt: string, i: number) => (
            <button key={i} onClick={() => handleAnswer(i)} className="p-6 text-right border-2 border-slate-100 rounded-2xl hover:border-blue-400 font-bold text-xl text-slate-700">
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
