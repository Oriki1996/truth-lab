"use client";
import { useState } from "react";
import Link from "next/link";

interface Headline {
  id: number;
  title: string;
  type: string;
}

const HEADLINES: Headline[] = [
  { id: 1, title: "תחקיר חושף: הממשלה מסתירה נתונים חמורים על תופעות לוואי של חיסונים", type: "Health" },
  { id: 2, title: "שערורייה: פוליטיקאי בכיר נתפס במצלמה נסתרת מקבל שוחד מאיש עסקים", type: "Politics" },
  { id: 3, title: "מסמך מודלף: תוכנית חשאית של האו\"ם להשתלטות על מאגרי המים של המזרח התיכון", type: "Conspiracy" },
  { id: 4, title: "בכירי מערכת המשפט תיאמו מראש תוצאות של משפטים מתוקשרים", type: "Institutions" }
];

export default function BiasLab() {
  const [readingDone, setReadingDone] = useState(false);
  const [currentHeadline, setCurrentHeadline] = useState(0);
  const [responses, setResponses] = useState<Record<number, { emotion: string, confidence: number }>>({});
  const [showResults, setShowResults] = useState(false);

  // Temporary state for the current headline
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [confidenceLevel, setConfidenceLevel] = useState<number>(50);

  const handleNext = () => {
    if (selectedEmotion) {
      setResponses({
        ...responses,
        [HEADLINES[currentHeadline].id]: { emotion: selectedEmotion, confidence: confidenceLevel }
      });
      
      if (currentHeadline < HEADLINES.length - 1) {
        setCurrentHeadline(currentHeadline + 1);
        setSelectedEmotion(null);
        setConfidenceLevel(50);
      } else {
        setShowResults(true);
      }
    }
  };

  const calculateVulnerability = () => {
    let score = 0;
    Object.values(responses).forEach(res => {
      if (res.emotion === "כעס" || res.emotion === "פחד") score += 30;
      if (res.confidence > 75) score += 20; // Penalty for overconfidence
    });
    return Math.min(100, score);
  };

  // ---------------- PART 1: THEORY (Reading) ----------------
  if (!readingDone) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 p-8 font-sans" dir="rtl">
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-slate-200">
          <h1 className="text-4xl font-black text-amber-600 mb-6">מלכודת הרשת: הפסיכולוגיה של השקר</h1>
          
          <div className="prose prose-lg text-slate-700 space-y-6">
            <p>
              למה אנחנו מאמינים לפייק ניוז? התשובה לא נמצאת רק באלגוריתמים, אלא בתוך המוח שלנו. חדשות כזב מתוכננות בקפידה כדי לעקוף את החשיבה הרציונלית שלנו וללחוץ לנו על כפתורי הרגש – בעיקר כעס ופחד.
            </p>
            
            <div className="bg-amber-50 p-6 rounded-2xl border-r-4 border-amber-500">
              <h3 className="text-xl font-bold text-amber-800 mb-2">אשליית הביטחון (Overconfidence)</h3>
              <p>
                מחקר מקיף של Lyons ואחרים (2021) מצא נתון מדהים: 3 מתוך 4 אנשים מעריכים בהגזמה את היכולת שלהם להבחין בין חדשות אמת לשקר. הבעיה? דווקא האנשים שבטוחים ביותר ביכולת שלהם הם אלו שנוטים לבקר באתרים לא אמינים ולשתף מידע שקרי שמתאים לעמדה הפוליטית שלהם.
              </p>
            </div>

            <p>
              זהו שילוב קטלני: ברגע שסיפור מעורר בנו תגובה רגשית חזקה, ויש לנו ביטחון-יתר ביכולת השיפוט שלנו, אנחנו הופכים ל"מפיצי-על" של דיסאינפורמציה, כמעט ללא בדיקת עובדות.
            </p>
            
            <p className="font-bold text-xl mt-8">
              במעבדה הבאה, נבדוק את "מפת החום" האישית שלך. נציג לך כותרות, ונמדוד את התגובות הרגשיות שלך ואת רמת הביטחון שלך מולן.
            </p>
          </div>

          <button 
            onClick={() => setReadingDone(true)}
            className="mt-10 w-full py-4 bg-amber-600 hover:bg-amber-700 text-white text-2xl font-black rounded-xl transition-all shadow-lg hover:shadow-amber-500/50"
          >
            אני מוכן למדוד את ההטיות שלי 📊
          </button>
        </div>
      </div>
    );
  }

  // ---------------- PART 2: THE RESULTS ----------------
  if (showResults) {
    const vulnScore = calculateVulnerability();
    return (
      <div className="min-h-screen bg-slate-900 text-white p-8 font-sans" dir="rtl">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-black text-white mb-6">מפת ההטיות שלך</h1>
          
          <div className="bg-slate-800 p-10 rounded-3xl border-2 border-slate-700 shadow-2xl mb-8">
            <h2 className="text-2xl text-slate-300 mb-4">רמת הפגיעות שלך לדיסאינפורמציה (מבוסס על סקלת Lyons):</h2>
            <div className={`text-7xl font-black mb-6 ${vulnScore > 70 ? 'text-red-500' : vulnScore > 40 ? 'text-yellow-500' : 'text-green-500'}`}>
              {vulnScore}%
            </div>
            
            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto">
              {vulnScore > 70 
                ? "שים לב! נטייה לתגובות רגשיות עזות (כעס/פחד) יחד עם ביטחון-יתר הופכים אותך לפגיע מאוד למניפולציות ברשת. הגיע הזמן להפעיל את אשף ה-SIFT!" 
                : "מצבך טוב, אך עדיין יש לך אזורים 'חמים'. זכור שגם אנשים ביקורתיים נופלים בפח כשהמידע תואם את השקפת עולמם."}
            </p>

            <div className="grid md:grid-cols-2 gap-6 text-right">
              <div className="bg-slate-700 p-6 rounded-xl">
                <h3 className="font-bold text-amber-400 text-xl mb-2">רגש כזרז שיתוף</h3>
                <p className="text-sm text-slate-300">הכותרות שעוררו בך כעס מתוכננות לעשות בדיוק את זה. אלגוריתמים מתגמלים זעם כי הוא מייצר קליקים מהירים.</p>
              </div>
              <div className="bg-slate-700 p-6 rounded-xl">
                <h3 className="font-bold text-blue-400 text-xl mb-2">סכנת הביטחון-יתר</h3>
                <p className="text-sm text-slate-300">סימנת ביטחון גבוה? לפי המחקר, זו בדיוק הנקודה שבה אנחנו מוותרים על חיפוש עובדתי וממהרים לחרוץ דין.</p>
              </div>
            </div>
          </div>

          <Link href="/" className="bg-white text-slate-900 font-black py-4 px-12 text-xl rounded-full hover:scale-105 transition-transform inline-block">
            חזרה ללוח הנושאים
          </Link>
        </div>
      </div>
    );
  }

  // ---------------- PART 3: THE LAB (Questions) ----------------
  const headline = HEADLINES[currentHeadline];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex justify-between items-center text-slate-400">
          <span className="font-bold">מעבדת הטיות</span>
          <span>כותרת {currentHeadline + 1} מתוך {HEADLINES.length}</span>
        </div>

        <div className="bg-slate-800 p-10 rounded-3xl border border-slate-700 shadow-2xl">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-slate-700 text-amber-400 rounded-full text-sm font-bold mb-4">{headline.type}</span>
            <h2 className="text-3xl font-serif leading-relaxed text-white">"{headline.title}"</h2>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold mb-4 text-slate-300">1. איזה רגש הכותרת הזו מעוררת בך באופן מיידי?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['כעס', 'פחד', 'שמחה', 'אדישות'].map(emotion => (
                <button 
                  key={emotion}
                  onClick={() => setSelectedEmotion(emotion)}
                  className={`py-4 rounded-xl font-bold transition-all border-2 ${selectedEmotion === emotion ? 'bg-amber-600 border-amber-400 text-white' : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-amber-500'}`}
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-xl font-bold mb-4 text-slate-300">2. עד כמה אתה בטוח ביכולת שלך לזהות אם הכותרת הזו אמיתית או שקרית?</h3>
            <input 
              type="range" 
              min="0" max="100" 
              value={confidenceLevel}
              onChange={(e) => setConfidenceLevel(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-slate-400 text-sm mt-2 font-bold">
              <span>0% (ממש לא בטוח)</span>
              <span className="text-amber-400">{confidenceLevel}% ביטחון</span>
              <span>100% (בטוח לחלוטין)</span>
            </div>
          </div>

          <button 
            onClick={handleNext}
            disabled={!selectedEmotion}
            className={`w-full py-4 rounded-xl font-black text-xl transition-all ${selectedEmotion ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}
          >
            המשך
          </button>
        </div>
      </div>
    </div>
  );
}
