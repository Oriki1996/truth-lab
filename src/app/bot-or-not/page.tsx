"use client";
import { useState } from "react";
import { saveScore } from "./actions";

const profiles = [
  { id: 1, name: "PatriotEagle99", text: "הבחירות זויפו! תתעוררו אנשים! #האמת", isBot: true },
  { id: 2, name: "Sarah Cohen", text: "בדיוק הכנתי את עוגת השוקולד הכי טובה ליום ההולדת של הבת שלי! 🎂", isBot: false },
  { id: 3, name: "CryptoGuru_AI", text: "תרוויחו 5000 דולר ביום מהבית. לחצו כאן כדי לגלות איך!!!", isBot: true },
  { id: 4, name: "Dr. Ben Miller", text: "מחקר חדש מראה ששינה קריטית לגיבוש הזיכרון.", isBot: false },
];

export default function BotOrNot() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleGuess = (guessIsBot) => {
    if (guessIsBot === profiles[currentIndex].isBot) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const nextProfile = async () => {
    setShowResult(false);
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      await saveScore(score);
      setSaved(true);
    }
  };

  if (saved) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center justify-center font-sans">
        <h1 className="text-4xl font-bold mb-4 text-blue-400">כל הכבוד!</h1>
        <p className="text-2xl">הציון שלך ({score} מתוך {profiles.length}) נשמר בהצלחה במסד הנתונים!</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center font-sans">
      <h1 className="text-4xl font-bold mb-8 text-blue-400">מעבדת האמת: בוט או אדם?</h1>
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
            <button onClick={nextProfile} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-lg transition-colors">
              {currentIndex < profiles.length - 1 ? "המשך" : "סיים ושמור ציון"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}