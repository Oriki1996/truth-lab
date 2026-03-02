"use client";
import { useState } from "react";

const profiles = [
  { id: 1, name: "PatriotEagle99", text: "The elections were RIGGED! Wake up people! #Truth", isBot: true },
  { id: 2, name: "Sarah Cohen", text: "Just made the best chocolate cake for my daughter's birthday! 🎂", isBot: false },
  { id: 3, name: "CryptoGuru_AI", text: "Earn $5000 a day from home. Click here to learn how!!!", isBot: true },
  { id: 4, name: "Dr. Ben Miller", text: "New research shows that sleep is crucial for memory consolidation.", isBot: false },
];

export default function BotOrNot() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleGuess = (guessIsBot: boolean) => {
    if (guessIsBot === profiles[currentIndex].isBot) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const nextProfile = () => {
    setShowResult(false);
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("סיימת את המשחק! הציון שלך: " + score);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center font-sans">
      <h1 className="text-4xl font-bold mb-8 text-blue-400">מעבדת האמת: בוט או אדם?</h1>
      <p className="mb-8 text-lg text-gray-300 text-center max-w-2xl">
        בעידן של דיסאינפורמציה, קשה לדעת מי עומד מאחורי המסך. בחן את עצמך: האם הפרופיל הבא מופעל על ידי אדם אמיתי או רשת בוטים?
      </p>
      
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md text-center border border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">@{profiles[currentIndex].name}</h2>
        <p className="text-gray-200 italic mb-8 text-xl">"{profiles[currentIndex].text}"</p>
        
        {!showResult ? (
          <div className="flex justify-center gap-6">
            <button onClick={() => handleGuess(true)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">בוט 🤖</button>
            <button onClick={() => handleGuess(false)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">אדם 🧑</button>
          </div>
        ) : (
          <div>
            <p className={"text-2xl font-bold mb-6 " + (profiles[currentIndex].isBot ? "text-red-400" : "text-green-400")}>
              {profiles[currentIndex].isBot ? "זהו בוט!" : "זהו אדם אמיתי!"}
            </p>
            <button onClick={nextProfile} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-lg transition-colors">המשך לפרופיל הבא</button>
          </div>
        )}
      </div>
      <div className="mt-12 text-2xl font-bold bg-gray-800 py-3 px-6 rounded-full border border-gray-700">
        ציון נוכחי: <span className="text-blue-400">{score}</span> / {profiles.length}
      </div>
    </div>
  );
}