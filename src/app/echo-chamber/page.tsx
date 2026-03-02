"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Article {
  id: number;
  headline: string;
  bias: "Blue" | "Red" | "Fact";
  content: string;
}

const FEED: Article[] = [
  { id: 1, headline: "הממשלה מקדמת רפורמה שתהרוס את הכלכלה לחלוטין", bias: "Blue", content: "מומחים מזהירים כי הצעדים האחרונים יובילו לקריסה..." },
  { id: 2, headline: "התקשורת שוב משקרת: הרפורמה תוזיל את יוקר המחיה", bias: "Red", content: "נתונים חדשים חושפים את קמפיין ההפחדה של השמאל..." },
  { id: 3, headline: "בדיקת עובדות: השפעת הרפורמה - נתונים בלבד", bias: "Fact", content: "ניתוח אובייקטיבי מראה יתרונות וחסרונות בשני הצדדים..." },
  { id: 4, headline: "האליטות מנסות לגנוב את הבחירות בתירוצים משפטיים", bias: "Red", content: "פקידים לא נבחרים מנסים לבטל את רצון העם..." },
  { id: 5, headline: "סכנה לדמוקרטיה: צעדים דיקטטוריים בחסות החוק", bias: "Blue", content: "החקיקה החדשה תרסק את זכויות האדם הבסיסיות..." },
  { id: 6, headline: "הקצנה משני הצדדים: איך הפוליטיקאים מרוויחים מהפילוג", bias: "Fact", content: "תחקיר חושף את המנגנון הכלכלי מאחורי זריעת השנאה..." }
];

export default function EchoChamber() {
  const [readingDone, setReadingDone] = useState(false);
  const [readHistory, setReadHistory] = useState<string[]>([]);
  const [echoLevel, setEchoLevel] = useState(0); // 0 = Open, 100 = Total Echo Chamber
  const [escaped, setEscaped] = useState(false);

  useEffect(() => {
    // Calculate echo chamber depth
    if (readHistory.length === 0) return;
    
    const blueCount = readHistory.filter(b => b === "Blue").length;
    const redCount = readHistory.filter(b => b === "Red").length;
    const factCount = readHistory.filter(b => b === "Fact").length;

    // If consuming only one side without facts, echo chamber grows heavily
    const maxBias = Math.max(blueCount, redCount);
    const minBias = Math.min(blueCount, redCount);
    
    let newEchoLevel = (maxBias * 20) - (minBias * 20) - (factCount * 30);
    newEchoLevel = Math.max(0, Math.min(100, newEchoLevel));
    
    setEchoLevel(newEchoLevel);

    if (readHistory.length > 3 && factCount >= 2 && minBias >= 1) {
      setEscaped(true);
    }
  }, [readHistory]);

  const readArticle = (bias: "Blue" | "Red" | "Fact") => {
    setReadHistory([...readHistory, bias]);
  };

  // ---------------- PART 1: THEORY (Reading) ----------------
  if (!readingDone) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 p-8 font-sans" dir="rtl">
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-slate-200">
          <h1 className="text-4xl font-black text-teal-700 mb-6">לחיות בתוך בועה: איך התקשורת מפצלת אותנו</h1>
          
          <div className="prose prose-lg text-slate-700 space-y-6">
            <p>
              בעבר, רוב הציבור צרך חדשות מאותם מקורות מרכזיים. היום, בעקבות עליית ערוצי החדשות הכבלים (כמו פוקס ניוז בארה"ב או ערוץ 14 בישראל) והרשתות החברתיות, הקהל התפצל לקבוצות אידיאולוגיות סגורות.
            </p>
            
            <div className="bg-teal-50 p-6 rounded-2xl border-r-4 border-teal-500">
              <h3 className="text-xl font-bold text-teal-800 mb-2">תיבת התהודה (Echo Chamber)</h3>
              <p>
                מחקרים, כמו זה של פיטרסון (2020), מראים שאנשים מחפשים באופן אקטיבי מידע שמאשר את אמונותיהם (Motivated Reasoning) ונמנעים ממידע שסותר אותן. האלגוריתמים של הרשתות החברתיות מזהים את הנטייה הזו, ומזינים אותנו בעוד ועוד מאותו דבר. 
              </p>
            </div>

            <p>
              התוצאה היא "תיבת תהודה": חלל וירטואלי שבו אנחנו שומעים רק את ההד של הקולות שלנו. בתוך תיבת תהודה, כעס כלפי הצד השני הופך לנורמה, ופייק ניוז מתפשט ללא שום ביקורת כי "כולם מסביבי חושבים ככה".
            </p>
            
            <p className="font-bold text-xl mt-8">
              במשחק הבא, אתה נכנס לרשת חברתית. המטרה שלך היא לברוח מהאלגוריתם שרוצה לסגור אותך בתוך תיבת תהודה רווחית.
            </p>
          </div>

          <button 
            onClick={() => setReadingDone(true)}
            className="mt-10 w-full py-4 bg-teal-600 hover:bg-teal-700 text-white text-2xl font-black rounded-xl transition-all shadow-lg hover:shadow-teal-500/50"
          >
            אני מוכן לאתגר הבועה 🫧
          </button>
        </div>
      </div>
    );
  }

  // ---------------- PART 2: THE GAME ----------------
  const vignetteStyle = {
    boxShadow: `inset 0 0 ${echoLevel}vmax ${echoLevel / 2}vmin rgba(0, 0, 0, ${echoLevel / 100})`,
    transition: 'box-shadow 0.8s ease-in-out'
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans relative overflow-hidden flex flex-col items-center p-8" dir="rtl">
      {/* Dynamic Echo Chamber Shadow */}
      <div className="absolute inset-0 pointer-events-none z-10" style={vignetteStyle}></div>

      <div className="max-w-2xl w-full relative z-20">
        <header className="mb-8 text-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h1 className="text-3xl font-black text-slate-800 mb-2">הפיד שלך</h1>
          <p className="text-slate-500">קרא כתבות מגוונות כדי לפרוץ את תיבת התהודה. <br/>רמת הבועה כרגע: <strong className={echoLevel > 60 ? 'text-red-500' : 'text-teal-600'}>{echoLevel}%</strong></p>
        </header>

        {escaped ? (
          <div className="bg-green-100 border-2 border-green-500 p-10 rounded-3xl text-center shadow-2xl animate-in zoom-in duration-500">
            <div className="text-6xl mb-4">🔓</div>
            <h2 className="text-4xl font-black text-green-800 mb-4">פרצת את הבועה!</h2>
            <p className="text-lg text-green-700 mb-8">
              הצלחת לאזן את צריכת המידע שלך ולשלב עובדות אובייקטיביות במקום רק כותרות זועמות. זוהי הדרך היחידה להגן על עצמך מקיטוב פוליטי.
            </p>
            <Link href="/" className="bg-green-600 hover:bg-green-700 text-white font-black py-4 px-10 rounded-full transition-all inline-block">
              חזרה ללוח הראשי
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {echoLevel >= 100 && (
              <div className="bg-red-600 text-white p-6 rounded-2xl text-center font-bold mb-6 shadow-red-500/50 shadow-lg animate-pulse">
                אזהרה: ננעלת בתוך תיבת התהודה. אתה קורא רק צד אחד של המציאות. האלגוריתם מבודד אותך משאר החברה! קרא משהו אחר מהר!
              </div>
            )}
            
            {FEED.map(article => (
              <button 
                key={article.id} 
                onClick={() => readArticle(article.bias)}
                className="w-full text-right bg-white p-6 rounded-2xl border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all block group"
              >
                <div className="text-xs text-slate-400 mb-2">פורסם כעת • קריאה מהירה</div>
                <h3 className="text-xl font-bold text-slate-800 group-hover:text-teal-600 transition-colors mb-2">{article.headline}</h3>
                <p className="text-slate-500 text-sm">{article.content}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
