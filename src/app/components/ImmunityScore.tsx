"use client";
import { useState, useEffect } from "react";

export default function ImmunityScore() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState("נשא פייק ניוז פוטנציאלי");

  useEffect(() => {
    // קריאת הציון מה-localStorage
    const savedScore = localStorage.getItem("immunityScore");
    if (savedScore) {
      const parsedScore = parseInt(savedScore);
      setScore(parsedScore);
      updateLevel(parsedScore);
    }
  }, []);

  const updateLevel = (currentScore: number) => {
    if (currentScore >= 100) setLevel("תא חיסוני חברתי 🛡️");
    else if (currentScore >= 70) setLevel("חוקר מידע מתקדם 🔍");
    else if (currentScore >= 40) setLevel("ספקן בתחילת הדרך 🤔");
    else setLevel("נשא פייק ניוז פוטנציאלי 🦠");
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg mb-10 w-full max-w-4xl mx-auto mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">מדד חסינות (Immunity Score)</h3>
        <span className="text-cyan-400 font-black text-2xl">{score}%</span>
      </div>
      
      <div className="w-full bg-slate-900 rounded-full h-6 mb-4 overflow-hidden border border-slate-600 relative">
        <div 
          className="bg-gradient-to-l from-cyan-400 to-blue-600 h-6 rounded-full transition-all duration-1000 ease-out flex items-center justify-end px-2" 
          style={{ width: `${score}%` }}
        >
            {score > 10 && <span className="text-xs font-bold text-white drop-shadow-md">↑ {score}%</span>}
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm">
        <span className="text-slate-400">דרגה נוכחית:</span>
        <span className={`font-bold ${score >= 100 ? 'text-green-400' : 'text-amber-400'}`}>
          {level}
        </span>
      </div>
      <p className="text-xs text-slate-500 mt-3 text-center">השלם מעבדות ושיעורים כדי להעלות את החסינות שלך לדיסאינפורמציה.</p>
    </div>
  );
}
