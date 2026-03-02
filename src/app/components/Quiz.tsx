"use client";
import React, { useState, useEffect } from 'react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizProps {
  questions: Question[];
  lessonId: number;
}

export default function Quiz({ questions, lessonId }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
    if (index === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  useEffect(() => {
    if (showScore && score === questions.length) {
      // שמירה ב-localStorage כשהשיעור הושלם בציון מושלם
      const progress = JSON.parse(localStorage.getItem('truth_lab_progress') || '{}');
      progress[lessonId] = true;
      localStorage.setItem('truth_lab_progress', JSON.stringify(progress));
      // אירוע לעדכון רכיבים אחרים
      window.dispatchEvent(new Event('storage'));
    }
  }, [showScore, score, questions.length, lessonId]);

  if (showScore) {
    return (
      <div className="text-center p-6 bg-blue-900 rounded-2xl border-2 border-blue-400">
        <h3 className="text-3xl font-bold text-white mb-4">השלמת את המשימה!</h3>
        <p className="text-xl text-blue-200">צברת {score} מתוך {questions.length} כוכבים ★</p>
        {score === questions.length ? (
          <p className="mt-4 text-yellow-400 font-bold">השיעור סומן כהושלם במפת הדרכים!</p>
        ) : (
          <button onClick={() => window.location.reload()} className="mt-4 bg-white text-blue-900 px-4 py-2 rounded-lg font-bold">נסה שוב לציון מושלם</button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 p-4 rounded-lg mb-4">
        <span className="text-blue-400 font-mono text-sm">שאלה {currentQuestion + 1} / {questions.length}</span>
        <h3 className="text-xl font-bold mt-2">{questions[currentQuestion].question}</h3>
      </div>
      <div className="grid gap-3">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(index)}
            disabled={selectedAnswer !== null}
            className={p-4 rounded-xl text-right transition-all border-2 }
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
