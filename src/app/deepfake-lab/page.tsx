"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function DeepfakeLab() {
  const [readingDone, setReadingDone] = useState(false);
  const [foundClues, setFoundClues] = useState<number[]>([]);
  const [showError, setShowError] = useState(false);
  const [scoreUpdated, setScoreUpdated] = useState(false);

  const clues = [
    { id: 1, text: "חוסר התאמה בסנכרון שפתיים (Lip-sync)", isFakeSign: true, feedback: "נכון! אלגוריתמים עדיין מתקשים לייצר התאמה מושלמת בין תנועות הפה המורכבות לסאונד." },
    { id: 2, text: "מצמוץ עיניים טבעי ותדיר", isFakeSign: false, feedback: "טעות. מצמוץ טבעי מעיד לרוב על אדם אמיתי." },
    { id: 3, text: "טשטוש או הילות סביב קו הלסת (Blurring)", isFakeSign: true, feedback: "מדויק! זהו 'תפר' קלאסי של הדבקת פנים דיגיטלית שניתן לראות בזכוכית מגדלת." },
    { id: 4, text: "תאורה אחידה המשתנה עם זווית הראש", isFakeSign: false, feedback: "טעות. תאורה שמשתנה באופן טבעי היא סימן לאותנטיות." },
    { id: 5, text: "קול רובוטי ללא הפסקות נשימה", isFakeSign: true, feedback: "נכון מאוד! מערכות Cloning קוליות מתקשות מאוד לחקות הפסקות נשימה." }
  ];

  const handleClueClick = (clue: any) => {
    if (clue.isFakeSign) {
      if (!foundClues.includes(clue.id)) {
        setFoundClues([...foundClues, clue.id]);
        setShowError(false);
      }
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2500);
    }
  };

  // העלאת ציון החסינות כשהמשתמש מנצח!
  useEffect(() => {
    if (foundClues.length === 3 && !scoreUpdated) {
      const currentScore = parseInt(localStorage.getItem("immunityScore") || "0");
      // נוסיף 25 נקודות עד למקסימום 100
      const newScore = Math.min(100, currentScore + 25);
      localStorage.setItem("immunityScore", newScore.toString());
      setScoreUpdated(true);
    }
  }, [foundClues, scoreUpdated]);

  if (!readingDone) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 p-8 font-sans" dir="rtl">
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-slate-200">
          <h1 className="text-4xl font-black text-purple-900 mb-6">עידן ה-Deepfake: כשהעיניים משקרות</h1>
          <div className="prose prose-lg text-slate-700 space-y-6">
            <p>המוח שלנו מתוכנת מלידה לבטוח במה שאנחנו רואים ושומעים. אבל מדיה סינתטית "חוטפת" את מנגנוני האמון הללו.</p>
            <p>במעבדה הבאה, תכנסו לנעליים של חוקרי זיהוי פלילי דיגיטלי. עליכם ללמוד את החולשות הנוכחיות של ה-AI.</p>
          </div>
          <button onClick={() => setReadingDone(true)} className="mt-10 w-full py-4 bg-purple-600 hover:bg-purple-700 text-white text-2xl font-black rounded-xl transition-all shadow-lg hover:shadow-purple-500/50">
            הבנתי, בוא ננתח סרטון חשוד! 🔍
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-black text-purple-400 mb-4">מעבדת זיהוי פלילי חזותי</h1>
          <p className="text-slate-400 text-lg">מצא <strong>3 פגמים טכנולוגיים</strong> המעידים בוודאות שזהו זיוף AI.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="bg-black rounded-3xl border-4 border-slate-700 p-6 flex flex-col items-center justify-center relative h-96 shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="absolute top-4 right-4 bg-red-600 px-3 py-1 rounded text-xs font-bold animate-pulse">BREAKING NEWS</div>
            <div className="text-8xl mb-6 opacity-40">📹</div>
            <div className="text-purple-400 font-mono text-center text-lg">&gt; מנתח פיקסלים...<br/>&gt; ממתין לזיהוי אנושי...</div>
            <div className="absolute bottom-6 left-6 flex gap-3 bg-slate-800/80 p-3 rounded-full">
              {[0, 1, 2].map((idx) => (
                <div key={idx} className={`w-5 h-5 rounded-full transition-all duration-500 ${foundClues.length > idx ? 'bg-green-500 shadow-[0_0_15px_#22c55e]' : 'bg-slate-700'}`}></div>
              ))}
            </div>
          </div>

          <div className="space-y-4 flex flex-col justify-center">
            {showError && <div className="bg-red-900/30 border-2 border-red-500 text-red-200 p-4 rounded-xl text-center font-bold animate-shake">❌ טעות! סימן זה מעיד לרוב על וידאו אותנטי.</div>}
            {clues.map((clue) => {
              const isFound = foundClues.includes(clue.id);
              return (
                <button key={clue.id} onClick={() => handleClueClick(clue)} disabled={isFound} className={`w-full p-5 rounded-xl text-right transition-all border-2 ${isFound ? 'bg-green-900/30 border-green-500 text-green-300' : 'bg-slate-800 border-slate-700 hover:border-purple-500 text-slate-300'}`}>
                  <div className="font-bold text-lg">{clue.text}</div>
                  {isFound && <div className="text-sm mt-2 text-green-400">{clue.feedback}</div>}
                </button>
              )
            })}
          </div>
        </div>

        {foundClues.length === 3 && (
          <div className="mt-12 bg-purple-900/30 border-2 border-purple-500 rounded-3xl p-10 text-center animate-in slide-in-from-bottom-10 fade-in duration-700">
            <h2 className="text-4xl font-black text-purple-300 mb-2">עבודה מצוינת! חשפת את הזיוף.</h2>
            <p className="text-green-400 font-bold text-xl mb-6">+25% נוספו למדד החסינות שלך!</p>
            <p className="text-slate-300 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
              זיהית בהצלחה את הכשלים של הבינה המלאכותית הנוכחית.
            </p>
            <Link href="/" className="bg-white text-purple-900 font-black py-4 px-12 text-xl rounded-full hover:scale-105 transition-transform inline-block shadow-2xl">
              חזרה ללוח הבקרה
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
