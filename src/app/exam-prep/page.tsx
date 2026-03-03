"use client";
import { useState } from "react";
import Link from "next/link";

// מאגר מושגים מתוך חומרי הקורס שלך לבחינה
const FLASHCARDS = [
  {
    id: 1,
    topic: "פסיכולוגיה",
    term: "Motivated Reasoning (חשיבה מונעת עמדה)",
    definition: "הנטייה הפסיכולוגית של בני אדם לפרש מידע חדש כך שיתאים לאמונות הקיימות שלהם, ולדחות עובדות שסותרות את תפיסת עולמם. סיבה מרכזית מדוע קשה להפריך פייק ניוז (Mattes & Redlawsk, Peterson)."
  },
  {
    id: 2,
    topic: "פסיכולוגיה",
    term: "Overconfidence (ביטחון-יתר)",
    definition: "מצב שבו אנשים מעריכים בהגזמה את יכולתם לזהות חדשות כזב. מחקר (Lyons et al., 2021) מצא שדווקא אנשים בעלי ביטחון-יתר הם אלו שנוטים לבקר באתרים לא אמינים ולשתף מידע שקרי."
  },
  {
    id: 3,
    topic: "מודלים",
    term: "מודל SIFT",
    definition: "שיטה לבדיקת עובדות: S (עצור - Stop), I (חקור את המקור - Investigate), F (מצא סיקור טוב יותר - Find better coverage), T (חזור להקשר המקורי - Trace claims)."
  },
  {
    id: 4,
    topic: "טכנולוגיה",
    term: "The Liar's Dividend (דיבידנד השקרן)",
    definition: "תופעת לוואי של עידן הדיפ-פייק. עצם קיומה של טכנולוגיית זיוף מאפשרת לפוליטיקאים שנתפסו בעבירה אמיתית לטעון שהראיות נגדם הן 'זיוף מבוסס AI', ובכך לחמוק מאחריות."
  },
  {
    id: 5,
    topic: "רשתות חברתיות",
    term: "Echo Chamber (תיבת תהודה)",
    definition: "סביבה תקשורתית שבה אדם נחשף רק למידע ודעות המחזקים את השקפתו הקיימת, בעוד שדעות מנוגדות מוסתרות או מודרות (לעיתים קרובות בשל האלגוריתם). מוביל לקיטוב חברתי."
  },
  {
    id: 6,
    topic: "תעמולה",
    term: "Astroturfing (דשא מלאכותי)",
    definition: "קמפיין שמנסה לייצר אשליה של תנועת מחאה עממית אותנטית וספונטנית (Grassroots), אך בפועל ממומן ומנוהל באופן ריכוזי על ידי גורם בעל אינטרס, לעיתים קרובות באמצעות רשתות בוטים."
  },
  {
    id: 7,
    topic: "קונספירציות",
    term: "הפונקציה החברתית של תיאוריות קשר",
    definition: "תיאוריות קשר אינן רק טעויות עובדתיות, אלא כלים שמחלקים את העולם ל'אנחנו מול הם' (קורבנות מול נוכלים אליטיסטים). הן מספקות הסבר פשוט למציאות כאוטית ולרוב מופצות בזמני משבר."
  }
];

export default function ExamPrep() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<number[]>([]);
  const [needsReview, setNeedsReview] = useState<number[]>([]);
  const [showSummary, setShowSummary] = useState(false);

  const currentCard = FLASHCARDS[currentIndex];
  const progress = Math.round((currentIndex / FLASHCARDS.length) * 100);

  const handleNext = (status: "known" | "review") => {
    if (status === "known") {
      setKnownCards([...knownCards, currentCard.id]);
    } else {
      setNeedsReview([...needsReview, currentCard.id]);
    }

    setIsFlipped(false);

    setTimeout(() => {
      if (currentIndex < FLASHCARDS.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setShowSummary(true);
      }
    }, 150);
  };

  const restart = () => {
    setCurrentIndex(0);
    setKnownCards([]);
    setNeedsReview([]);
    setShowSummary(false);
    setIsFlipped(false);
  };

  if (showSummary) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 p-8 font-sans" dir="rtl">
        <div className="max-w-3xl mx-auto text-center mt-20">
          <h1 className="text-5xl font-black text-blue-900 mb-6">סיכום אימון</h1>
          <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-200">
            <div className="flex justify-center gap-10 mb-10">
              <div className="text-center">
                <div className="text-6xl font-black text-green-500 mb-2">{knownCards.length}</div>
                <div className="text-slate-500 font-bold">מושגים שאני יודע</div>
              </div>
              <div className="text-center">
                <div className="text-6xl font-black text-red-500 mb-2">{needsReview.length}</div>
                <div className="text-slate-500 font-bold">דורשים חזרה</div>
              </div>
            </div>
            
            {needsReview.length === 0 ? (
              <p className="text-2xl text-green-600 font-bold mb-8">אתה מוכן למבחן! 🎉</p>
            ) : (
              <p className="text-lg text-slate-600 mb-8">כדאי לחזור שוב על המושגים שלא זכרת לפני שניגשים לבחינה.</p>
            )}

            <div className="flex justify-center gap-4">
              <button onClick={restart} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg text-lg">
                התחל סיבוב חדש
              </button>
              <Link href="/" className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-4 px-10 rounded-full transition-all text-lg">
                חזרה ללוח
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 font-sans" dir="rtl">
      {/* הוספת CSS פנימי עבור אפקט ההיפוך */}
      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />

      <div className="max-w-3xl mx-auto">
        <header className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black text-slate-800 mb-2">מרכז הכנה למבחן 📚</h1>
            <p className="text-slate-500">שינון אקטיבי של מושגי הליבה בסילבוס.</p>
          </div>
          <Link href="/" className="text-slate-400 hover:text-slate-800 font-bold transition-colors">
            חזרה ללוח &times;
          </Link>
        </header>

        {/* בר התקדמות */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-bold text-slate-400 mb-2">
            <span>כרטיסייה {currentIndex + 1} מתוך {FLASHCARDS.length}</span>
            <span>{progress}% הושלמו</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div className="bg-blue-500 h-3 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* הכרטיסייה (Flashcard) */}
        <div className="relative w-full h-[400px] perspective-1000 cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
          <div className={`w-full h-full absolute transition-transform duration-500 transform-style-3d shadow-2xl rounded-[3rem] ${isFlipped ? 'rotate-y-180' : ''}`}>
            
            {/* צד קדמי (המושג) */}
            <div className="absolute w-full h-full backface-hidden bg-white rounded-[3rem] border-2 border-slate-100 flex flex-col items-center justify-center p-10 text-center">
              <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-bold absolute top-8">{currentCard.topic}</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-800 leading-tight mb-6">{currentCard.term}</h2>
              <div className="text-slate-400 font-bold mt-8 flex items-center gap-2">
                <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
                לחץ כדי לחשוף את ההגדרה
              </div>
            </div>

            {/* צד אחורי (ההגדרה) */}
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-blue-600 rounded-[3rem] text-white flex flex-col items-center justify-center p-10 text-center">
               <h3 className="text-xl font-bold mb-6 opacity-80 border-b border-blue-400 pb-2">{currentCard.term}</h3>
               <p className="text-2xl md:text-3xl font-serif leading-relaxed">{currentCard.definition}</p>
            </div>

          </div>
        </div>

        {/* כפתורי שליטה (מופיעים רק כשקוראים את התשובה) */}
        <div className={`mt-10 flex justify-center gap-6 transition-opacity duration-300 ${isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button 
            onClick={(e) => { e.stopPropagation(); handleNext("review"); }}
            className="flex-1 bg-white border-2 border-red-200 text-red-600 hover:bg-red-50 font-black py-5 rounded-2xl transition-all shadow-sm text-lg"
          >
            ❌ לא ידעתי (לחזור שוב)
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); handleNext("known"); }}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-black py-5 rounded-2xl transition-all shadow-md text-lg"
          >
            ✅ ידעתי!
          </button>
        </div>

      </div>
    </div>
  );
}
