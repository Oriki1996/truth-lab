"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function BotFarm() {
  const [readingDone, setReadingDone] = useState(false);
  
  // Game States
  const [budget, setBudget] = useState(1000);
  const [clicks, setClicks] = useState(0);
  const [democracyDamage, setDemocracyDamage] = useState(0);
  
  // Inventory
  const [cheapBots, setCheapBots] = useState(0);
  const [sleeperBots, setSleeperBots] = useState(0);

  // Game Loop (Generates clicks and income over time)
  useEffect(() => {
    if (!readingDone) return;
    
    const interval = setInterval(() => {
      const generatedClicks = (cheapBots * 2) + (sleeperBots * 10);
      setClicks(prev => prev + generatedClicks);
      
      // Every 10 clicks = $1 profit
      setBudget(prev => prev + Math.floor(generatedClicks / 10));
      
      // Sleeper bots do subtle but high damage to democracy
      if (sleeperBots > 0) {
        setDemocracyDamage(prev => Math.min(100, prev + (sleeperBots * 0.5)));
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [readingDone, cheapBots, sleeperBots]);

  const buyCheapBot = () => {
    if (budget >= 100) {
      setBudget(prev => prev - 100);
      setCheapBots(prev => prev + 1);
    }
  };

  const buySleeperBot = () => {
    if (budget >= 500) {
      setBudget(prev => prev - 500);
      setSleeperBots(prev => prev + 1);
    }
  };

  const launchFakeNews = () => {
    if (clicks >= 500) {
      setClicks(prev => prev - 500);
      setBudget(prev => prev + 2000); // Big payday
      setDemocracyDamage(prev => Math.min(100, prev + 15)); // Massive damage
    }
  };

  // ---------------- PART 1: READING MATERIAL ----------------
  if (!readingDone) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 p-8 font-sans" dir="rtl">
        <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-slate-200">
          <h1 className="text-4xl font-black text-blue-900 mb-6">מבוא ללוחמת רשת: המכונה שמאחורי השקרים</h1>
          
          <div className="prose prose-lg text-slate-700 space-y-6">
            <p>
              לקראת בחירות 2016 בארה"ב, תעשייה חדשה ומשגשגת קמה בעיירה קטנה בשם ולס (Veles) במקדוניה. צעירים מקומיים החלו לייצר ולהפיץ חדשות כזב סנסציוניות. המניע שלהם לא היה אידיאולוגי, אלא <strong>כלכלי לחלוטין</strong> – יותר קליקים על כותרות שקריות היו שווים להכנסות מפרסומות.
            </p>
            
            <div className="bg-blue-50 p-6 rounded-2xl border-r-4 border-blue-500">
              <h3 className="text-xl font-bold text-blue-800 mb-2">אילו כלים עומדים לרשות התעשייה?</h3>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>בוטים רגילים (Cheap Bots):</strong> תוכנות פשוטות שעושות לייק ושיתוף באופן אוטומטי. הם מייצרים טראפיק מהיר אך קלים לזיהוי וחסימה על ידי הרשתות.</li>
                <li><strong>בוטים רדומים (Sleeper Bots):</strong> הדור החדש של הבוטים המופעלים על ידי בינה מלאכותית (כמו ChatGPT). הם מחקים התנהגות אנושית, מנהלים דיונים, מגיבים בהקשר ומצליחים להטמיע נרטיבים הרסניים מבלי להיתפס.</li>
              </ul>
            </div>

            <p>
              "מה שנראה כמו אדם אמיתי ברשת עשוי להיות אלגוריתם המכוון בדיוק כדי לעורר בך רגש ולהשפיע על דעתך". השילוב של מניע כלכלי ואוטומציה יצר איום ממשי על הדמוקרטיה.
            </p>
            
            <p className="font-bold text-xl mt-8">
              כדי להבין איך זה עובד, אתה עומד להיכנס לנעליים של מפעיל רשת כזו. המטרה שלך היא להרוויח כסף מקליקים.
            </p>
          </div>

          <button 
            onClick={() => setReadingDone(true)}
            className="mt-10 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white text-2xl font-black rounded-xl transition-all shadow-lg hover:shadow-blue-500/50"
          >
            קראתי והבנתי, בוא נקים חוות בוטים! 🚀
          </button>
        </div>
      </div>
    );
  }

  // ---------------- PART 2: THE SIMULATOR ----------------
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans" dir="rtl">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-800 p-6 rounded-2xl border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
            <h2 className="text-slate-400 font-bold mb-2">תקציב (רווחים)</h2>
            <div className="text-4xl font-mono text-green-400">${budget.toLocaleString()}</div>
          </div>
          <div className="bg-slate-800 p-6 rounded-2xl border border-blue-500/30">
            <h2 className="text-slate-400 font-bold mb-2">קליקים שנצברו</h2>
            <div className="text-4xl font-mono text-blue-400">{clicks.toLocaleString()}</div>
          </div>
          <div className="bg-slate-800 p-6 rounded-2xl border border-red-500/30 relative overflow-hidden">
            <h2 className="text-slate-400 font-bold mb-2">נזק לדמוקרטיה</h2>
            <div className="text-4xl font-mono text-red-400">{democracyDamage.toFixed(1)}%</div>
            <div 
              className="absolute bottom-0 left-0 h-1 bg-red-500 transition-all" 
              style={{ width: `${democracyDamage}%` }}
            ></div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="grid md:grid-cols-2 gap-8">
          
          <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">חנות שרתים (רכישת כוח)</h2>
            <div className="space-y-4">
              <button 
                onClick={buyCheapBot} disabled={budget < 100}
                className={`w-full p-4 rounded-xl flex justify-between items-center transition-all ${budget >= 100 ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-800 opacity-50 cursor-not-allowed'}`}
              >
                <div className="text-right">
                  <div className="font-bold text-lg">בוט זול (Spam Bot)</div>
                  <div className="text-sm text-slate-400">מייצר 2 קליקים בשנייה</div>
                </div>
                <div className="font-mono text-green-400 font-bold">$100</div>
              </button>

              <button 
                onClick={buySleeperBot} disabled={budget < 500}
                className={`w-full p-4 rounded-xl flex justify-between items-center transition-all border border-purple-500/30 ${budget >= 500 ? 'bg-purple-900/30 hover:bg-purple-900/50' : 'bg-slate-800 opacity-50 cursor-not-allowed'}`}
              >
                <div className="text-right">
                  <div className="font-bold text-lg text-purple-300">Sleeper Bot (מופעל AI)</div>
                  <div className="text-sm text-slate-400">מייצר 10 קליקים, נזק גבוה לדמוקרטיה</div>
                </div>
                <div className="font-mono text-green-400 font-bold">$500</div>
              </button>
            </div>
          </div>

          <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-red-400">הפצת דיסאינפורמציה</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                השתמש בקליקים שצברת כדי להפיץ קמפיין שקרים ענק. זה יכניס לך המון כסף מפרסומות, אבל יעלה משמעותית את רמת הקיטוב בחברה.
              </p>
            </div>
            
            <button 
              onClick={launchFakeNews} disabled={clicks < 500}
              className={`w-full py-6 rounded-2xl font-black text-xl transition-all ${clicks >= 500 ? 'bg-red-600 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}
            >
              שגר קמפיין פייק ניוז (-500 קליקים)
            </button>
          </div>

        </div>

        {/* Inventory */}
        <div className="mt-8 bg-slate-800/50 p-6 rounded-2xl flex gap-8 justify-center">
          <div className="text-center">
            <div className="text-3xl mb-2">🤖</div>
            <div className="font-bold">{cheapBots}</div>
            <div className="text-xs text-slate-400">בוטים זולים</div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🧠</div>
            <div className="font-bold text-purple-400">{sleeperBots}</div>
            <div className="text-xs text-slate-400">Sleeper Bots</div>
          </div>
        </div>

        {democracyDamage >= 100 && (
          <div className="fixed inset-0 bg-red-900/90 flex flex-col items-center justify-center z-50 p-8 text-center">
            <h1 className="text-6xl font-black text-white mb-6">הדמוקרטיה קרסה.</h1>
            <p className="text-2xl text-red-200 max-w-2xl mb-10">
              הרווחת ${budget.toLocaleString()}, אבל האלגוריתמים שיצרת פירקו לחלוטין את האמון בחברה, קיטבו את הציבור ויצרו כאוס. המניע הכלכלי שלך הנדס את התודעה של מיליונים.
            </p>
            <Link href="/" className="bg-white text-red-900 font-black py-4 px-10 rounded-full hover:scale-105 transition-transform">
              חזרה ללוח הבקרה
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
