"use client";
import { useState } from "react";
import Link from "next/link";

export default function DeepfakeLab() {
  const [readingDone, setReadingDone] = useState(false);
  const [foundClues, setFoundClues] = useState<number[]>([]);
  const [showError, setShowError] = useState(false);

  // Tools/Signs the user needs to find
  const clues = [
    { id: 1, text: "חוסר התאמה בסנכרון שפתיים (Lip-sync)", isFakeSign: true, feedback: "נכון! אלגוריתמים עדיין מתקשים לייצר התאמה מושלמת בין תנועות הפה המורכבות לסאונד." },
    { id: 2, text: "מצמוץ עיניים טבעי ותדיר", isFakeSign: false, feedback: "טעות. מצמוץ טבעי מעיד לרוב על אדם אמיתי. בוטים מפספסים תדירות מצמוץ כי אומנו על תמונות סטילס בהן אנשים מחייכים עם עיניים פקוחות." },
    { id: 3, text: "טשטוש או הילות סביב קו הלסת (Blurring)", isFakeSign: true, feedback: "מדויק! זהו 'תפר' קלאסי של הדבקת פנים דיגיטלית שניתן לראות בזכוכית מגדלת." },
    { id: 4, text: "תאורה אחידה המשתנה עם זווית הראש", isFakeSign: false, feedback: "טעות. תאורה שמשתנה באופן טבעי היא סימן לאותנטיות. ל-AI קשה לחשב תאורה דינמית." },
    { id: 5, text: "קול רובוטי ללא הפסקות נשימה", isFakeSign: true, feedback: "נכון מאוד! מערכות Cloning קוליות מתקשות מאוד לחקות את הפסקות הנשימה הבלתי רצוניות של בני אדם." }
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

  // ---------------- PART 1: THEORY (Reading) ----------------
  if (!readingDone) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 p-8 font-sans" dir="rtl">
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-slate-200">
          <h1 className="text-4xl font-black text-purple-900 mb-6">עידן ה-Deepfake: כשהעיניים משקרות</h1>
          
          <div className="prose prose-lg text-slate-700 space-y-6">
            <p>
              המוח שלנו מתוכנת מלידה לבטוח במה שאנחנו רואים ושומעים. אבל מדיה סינתטית (Synthetic Media), המכונה Deepfake, "חוטפת" את מנגנוני האמון הללו.
            </p>
            
            <div className="bg-purple-50 p-6 rounded-2xl border-r-4 border-purple-500">
              <h3 className="text-xl font-bold text-purple-800 mb-2">הסכנה לדמוקרטיה</h3>
              <p>
                טכנולוגיה זו משתמשת בלמידה עמוקה כדי להלביש פנים של פוליטיקאי על גוף אחר, או לשכפל את קולו כדי שיגיד דברים שמעולם לא אמר (כמו סרטון הזיוף המפורסם של אובמה שהפיק הבמאי ג'ורדן פיל) - mw26.docx, 7.7 Lecture - Deepfakes, Democracy, and the Erosion of Trust - mw26.docx]. 
                האיום הפוליטי הוא עצום: פייק ניוז על ידיעות או טקסט אפשר להפריך, אבל סרטון מזויף מייצר תגובה רגשית מיידית ועוקף את הרציונל שלנו.
              </p>
            </div>

            <p>
              יתרה מכך, עצם קיומם של סרטוני Deepfake מוליד תופעה מסוכנת לא פחות הנקראת <strong>The Liar's Dividend (דיבידנד השקרן)</strong>. פוליטיקאים שנתפסים באמירות פוגעניות יכולים פשוט לטעון שהסרטון המקורי הוא "Deepfake מזויף", ולהטיל ספק בעצם קיומה של אמת אובייקטיבית.
            </p>
            
            <p className="font-bold text-xl mt-8">
              במעבדה הבאה, תכנסו לנעליים של חוקרי זיהוי פלילי דיגיטלי. עליכם ללמוד את החולשות הנוכחיות של ה-AI.
            </p>
          </div>

          <button 
            onClick={() => setReadingDone(true)}
            className="mt-10 w-full py-4 bg-purple-600 hover:bg-purple-700 text-white text-2xl font-black rounded-xl transition-all shadow-lg hover:shadow-purple-500/50"
          >
            הבנתי, בוא ננתח סרטון חשוד! 🔍
          </button>
        </div>
      </div>
    );
  }

  // ---------------- PART 2: THE LAB (Game) ----------------
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-black text-purple-400 mb-4">מעבדת זיהוי פלילי חזותי</h1>
          <p className="text-slate-400 text-lg">
            הגיע אלינו סרטון חשוד של ראש ממשלה מכריז על מלחמה. 
            סרוק את האפשרויות ולחץ על <strong>3 הפגמים הטכנולוגיים</strong> המעידים בוודאות שזהו זיוף AI.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-10">
          
          {/* Fake Video Player area */}
          <div className="bg-black rounded-3xl border-4 border-slate-700 p-6 flex flex-col items-center justify-center relative h-96 shadow-[0_0_30px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="absolute top-4 right-4 bg-red-600 px-3 py-1 rounded text-xs font-bold animate-pulse">BREAKING NEWS</div>
            <div className="text-8xl mb-6 opacity-40">📹</div>
            <div className="text-purple-400 font-mono text-center text-lg">
              &gt; מנתח פיקסלים...<br/>
              &gt; ממתין לזיהוי אנושי...
            </div>
            
            {/* Visual feedback progress */}
            <div className="absolute bottom-6 left-6 flex gap-3 bg-slate-800/80 p-3 rounded-full">
              {[0, 1, 2].map((idx) => (
                <div key={idx} className={`w-5 h-5 rounded-full transition-all duration-500 ${foundClues.length > idx ? 'bg-green-500 shadow-[0_0_15px_#22c55e]' : 'bg-slate-700'}`}></div>
              ))}
            </div>
          </div>

          {/* Tools/Clues Area */}
          <div className="space-y-4 flex flex-col justify-center">
            {showError && (
              <div className="bg-red-900/30 border-2 border-red-500 text-red-200 p-4 rounded-xl text-center font-bold animate-shake">
                ❌ טעות! סימן זה מעיד לרוב על וידאו אותנטי, או שה-AI כבר למד להתגבר עליו.
              </div>
            )}
            
            {clues.map((clue) => {
              const isFound = foundClues.includes(clue.id);
              return (
                <button 
                  key={clue.id}
                  onClick={() => handleClueClick(clue)}
                  disabled={isFound}
                  className={`w-full p-5 rounded-xl text-right transition-all border-2 ${
                    isFound 
                      ? 'bg-green-900/30 border-green-500 text-green-300' 
                      : 'bg-slate-800 border-slate-700 hover:border-purple-500 text-slate-300 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="font-bold text-lg">{clue.text}</div>
                  {isFound && <div className="text-sm mt-2 text-green-400">{clue.feedback}</div>}
                </button>
              )
            })}
          </div>
        </div>

        {/* Victory Screen */}
        {foundClues.length === 3 && (
          <div className="mt-12 bg-purple-900/30 border-2 border-purple-500 rounded-3xl p-10 text-center animate-in slide-in-from-bottom-10 fade-in duration-700">
            <h2 className="text-4xl font-black text-purple-300 mb-6">עבודה מצוינת! חשפת את הזיוף.</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
              זיהית בהצלחה את הכשלים של הבינה המלאכותית הנוכחית. אך זכור: ככל שהטכנולוגיה מתפתחת (כמו שראינו עם הדיפ-פייק של טום קרוז), הסימנים החזותיים הללו הולכים ונעלמים - mw26.docx]. בעתיד הלא רחוק, הדרך היחידה להתגונן תהיה באמצעות <strong>פיתוח אוריינות מדיה וספקנות בריאה</strong> כלפי מקורות המידע שלנו - mw26.docx].
            </p>
            <Link href="/" className="bg-white text-purple-900 font-black py-4 px-12 text-xl rounded-full hover:scale-105 transition-transform inline-block shadow-2xl">
              חזרה ללוח הנושאים
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
