"use client";
import { useState } from "react";
import { saveScore } from "./actions";

const profiles = [
  { id: 1, name: "TruthSeeker_TX", text: "התקשורת הממוסדת מסתירה את זה, אבל ההפגנות אתמול היו מבויימות לחלוטין על ידי שחקנים בתשלום של הדיפ-סטייט. תתעוררו! #DeepState", isBot: true },
  { id: 2, name: "Dr. Elena Rostova", text: "מחקר חדש שפורסם ב-Nature מראה שטיפים פשוטים לאוריינות דיגיטלית יכולים לשפר משמעותית את היכולת של משתמשים לזהות חדשות כזב. צעד קטן אך חשוב.", isBot: false },
  { id: 3, name: "Wellness_Guru_33", text: "חברות התרופות לא רוצות שתדעו את זה, אבל מי חמצן מרפאים את כל המחלות. הם מסתירים את האמת כדי למכור חיסונים. תעשו מחקר בעצמכם! 🧘‍♀️✨", isBot: true },
  { id: 4, name: "David M. Cohen", text: "בדיוק סיימתי לצפות בסרט התיעודי על קיימברידג' אנליטיקה וברקזיט. זה פשוט מדהים ומפחיד לראות איך מניפולציה של נתונים יכולה להכריע בחירות.", isBot: false },
  { id: 5, name: "PatriotEagle1776", text: "דיווחים מהשטח: מכונות ההצבעה בקלפיות מחליפות קולות! ראיתי את זה קורה בעיניים שלי. תשתפו לפני שימחקו את זה! 🚨🚨", isBot: true },
];

export default function BotOrNot() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleGuess = (guessIsBot: boolean) => {
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
      <p className="mb-8 text-lg text-gray-300 text-center max-w-2xl">
        הפרופילים הבאים מבוססים על טקטיקות אמיתיות של דיסאינפורמציה כפי שנלמדו בקורס. בחן את עצמך: האם מדובר באדם אמיתי או בבוט/טרול רשת?
      </p>
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md text-center border border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">@{profiles[currentIndex].name}</h2>
        <p className="text-gray-200 italic mb-8 text-xl">"{profiles[currentIndex].text}"</p>
        
        {!showResult ? (
          <div className="flex justify-center gap-6">
            <button onClick={() => handleGuess(true)} className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">בוט / טרול 🤖</button>
            <button onClick={() => handleGuess(false)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors">אדם אמיתי 🧑</button>
          </div>
        ) : (
          <div>
            <p className={"text-2xl font-bold mb-6 " + (profiles[currentIndex].isBot ? "text-red-400" : "text-green-400")}>
              {profiles[currentIndex].isBot ? "זהו בוט או טרול!" : "זהו אדם אמיתי!"}
            </p>
            <button onClick={nextProfile} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded-lg transition-colors">
              {currentIndex < profiles.length - 1 ? "המשך לפרופיל הבא" : "סיים ושמור ציון"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}