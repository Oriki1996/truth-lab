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
    <div className="p-8 bg-green-50 rounded-3xl text-center border-2 border-green-200">
      <h2 className="text-3xl font-black text-green-800 mb-2">סיכום מעבדה</h2>
      <p className="text-xl text-green-700">הציון הסופי שלך: {score} מתוך {questions.length}</p>
    </div>
  );

  return (
    <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-xl">
      <div className="flex justify-between items-center mb-6 text-sm font-bold text-blue-600 uppercase">
        <span>שאלה {current + 1} מתוך {questions.length}</span>
      </div>
      <h3 className="text-2xl font-black text-slate-800 mb-8">{questions[current].question}</h3>
      <div className="grid gap-4">
        {questions[current].options.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(i)} className="p-5 text-right border-2 border-slate-100 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all font-bold text-slate-700">
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
