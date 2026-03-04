"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface AIAnalysis {
  score: number;
  findings: string[];
  techniques: string[];
  recommendations: string[];
}

function WizardContent() {
  const searchParams = useSearchParams();
  const customTitle = searchParams.get("title");
  const customSource = searchParams.get("source");

  const isLiveMode = !!customTitle;
  const initialContent = isLiveMode
    ? `דיווח חי מ-${customSource}:\n"${customTitle}"`
    : "כותרת: 'מאות הרוגים בהפצצה ישראלית על בית חולים בעזה. משרד הבריאות הפלסטיני מדווח על לפחות 500 הרוגים.'";

  const STEPS = [
    {
      id: "S",
      title: "S - Stop (עצור)",
      instruction: "אל תשתף או תגיב מיד. במיוחד אם התוכן מעורר בך רגש חזק.",
      task: "האם הידיעה הבאה מעוררת בך רגש חזק? המתן 5 שניות לפני שתמשיך.",
      content: initialContent,
      timer: 5,
    },
    {
      id: "I",
      title: "I - Investigate (חקור את המקור)",
      instruction: "בדוק מי פרסם את המידע. האם המקור מוכר ואמין?",
      task: isLiveMode
        ? `חפש מידע על המקור: ${customSource}. האם הוא נחשב לגוף עיתונאי עם מערכת עריכה מסודרת?`
        : "מי עומד מאחורי הדיווח הראשוני על 500 ההרוגים?",
      options: isLiveMode
        ? ["כן, זהו גוף מוכר עם תקנון אתיקה", "לא, נראה כמו בלוג פרטי או גוף תעמולה", "לא מצאתי מידע על המקור"]
        : ["ארגון ניטרלי", "רשויות הבריאות בעזה (חמאס)", "דובר צה\"ל", "האו\"ם"],
      correctAnswer: isLiveMode ? 0 : 1,
      feedback: isLiveMode 
        ? "מצוין. חקירת המקור (Wikipedia, About Us) היא הצעד הראשון להבנת ההקשר."
        : "נכון. הדיווח הסתמך על טענות חמאס, מה שקריטי להבנת ההטיה."
    },
    {
      id: "F",
      title: "F - Find Better Coverage (מצא כיסוי טוב יותר)",
      instruction: "חפש את הכותרת הזו בגוגל. האם סוכנויות ידיעות אחרות (כמו AP או Reuters) מדווחות על כך?",
      task: "מה קורה כאשר עיתונים אחרים מדווחים על אותו סיפור?",
      options: ["קריאת דיווחים שונים עוזרת לסנן דעות אישיות ולמצוא את עובדות הליבה", "זה מבלבל ועדיף להסתמך רק על מקור אחד", "כל העיתונים מקבלים פקודות מאותו גורם"],
      correctAnswer: 0,
      feedback: "מדויק. השוואת מקורות (Cross-referencing) היא הדרך הבטוחה ביותר לנטרל הטיות."
    }
  ];

  const [stepIndex, setStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const currentStep = STEPS[stepIndex];

  useEffect(() => { if (currentStep?.timer) setTimeLeft(currentStep.timer); }, [stepIndex, currentStep]); 
  useEffect(() => { if (timeLeft > 0) { const t = setTimeout(() => setTimeLeft(timeLeft - 1), 1000); return () => clearTimeout(t); } }, [timeLeft]);

  const runAIAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/analyze-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: initialContent }),
      });
      const data = await res.json();
      setAiAnalysis(data);
    } catch (err) {
      console.error("AI Analysis failed", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (stepIndex >= STEPS.length) return (
    <div className="min-h-screen bg-black text-white p-12 flex flex-col items-center justify-center text-center" dir="rtl">
      <h1 className="text-5xl font-bold text-yellow-400 mb-4">עבודה מעולה!</h1>
      <p className="text-xl text-slate-300 mb-8 max-w-2xl">
        הצלחת ליישם את מתודולוגיית SIFT {isLiveMode ? "על דיווח בזמן אמת!" : "על מקרה הבוחן."} אתה מוכן להילחם בדיסאינפורמציה.
      </p>
      <Link href={isLiveMode ? "/live-radar" : "/"} className="bg-blue-600 hover:bg-blue-700 p-4 px-10 rounded-full font-bold transition-all shadow-lg">
        {isLiveMode ? "חזרה לרדאר דיסאינפורמציה" : "חזרה לדף הבית"}
      </Link>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl mt-10" dir="rtl">
      {isLiveMode && (
        <div className="mb-6 bg-purple-900/30 border border-purple-500 text-purple-200 px-4 py-2 rounded-lg inline-block text-sm font-bold animate-pulse">
          ⚡ מצב ניתוח בזמן אמת (Live Analysis)
        </div>
      )}
      <h1 className="text-3xl font-black text-blue-400 mb-6">{currentStep.title}</h1>
      <p className="mb-6 text-slate-300 italic border-r-4 border-blue-500 pr-4">{currentStep.instruction}</p>

      <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700">
        {currentStep.id === "S" ? (
          <div className="text-center">
            <p className="text-2xl mb-8 font-serif leading-relaxed text-slate-100">"{currentStep.content}"</p>
            
            <div className="flex flex-col gap-4 items-center">
              {!aiAnalysis && (
                <button 
                  onClick={runAIAnalysis} 
                  disabled={isAnalyzing}
                  className="bg-purple-600 hover:bg-purple-500 text-white p-3 px-8 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2"
                >
                  {isAnalyzing ? "Gemini מנתח..." : "✨ נתח בעזרת בינה מלאכותית (Gemini)"}
                </button>
              )}

              {aiAnalysis && (
                <div className="w-full bg-slate-800 border-2 border-purple-500/50 p-6 rounded-2xl text-right animate-in fade-in zoom-in duration-500">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-purple-400 font-bold">ניתוח מעבדת האמת (AI)</span>
                    <div className="bg-purple-900 px-3 py-1 rounded-full text-sm font-bold">ציון אמינות: {aiAnalysis.score}%</div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-yellow-500 font-bold text-sm mb-1">ממצאים עיקריים:</h4>
                      <ul className="list-disc list-inside text-slate-300 text-sm">
                        {aiAnalysis.findings.map((f, i) => <li key={i}>{f}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-red-400 font-bold text-sm mb-1">טכניקות שזוהו:</h4>
                      <div className="flex flex-wrap gap-2">
                        {aiAnalysis.techniques.map((t, i) => <span key={i} className="bg-red-900/30 text-red-200 text-xs px-2 py-1 rounded border border-red-500/30">{t}</span>)}
                      </div>
                    </div>
                    <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-500/30">
                      <h4 className="text-blue-400 font-bold text-sm mb-1">המלצות SIFT:</h4>
                      <p className="text-slate-300 text-xs leading-relaxed">{aiAnalysis.recommendations[0]}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-2xl font-mono text-yellow-500 my-4">{timeLeft > 0 ? `חכה ${timeLeft} שניות...` : "אפשר להמשיך"}</div>
              {timeLeft === 0 && <button onClick={() => setStepIndex(stepIndex + 1)} className="mt-2 bg-blue-600 hover:bg-blue-500 text-white p-3 px-10 rounded-xl font-bold transition-all shadow-lg">המשך ל-Investigate</button>}
            </div>
          </div>
        ) : (
          <div>
            <p className="text-xl mb-6 font-bold text-slate-200">{currentStep.task}</p>
            {currentStep.options?.map((opt: string, i: number) => (
              <button key={i} disabled={selectedOption !== null} onClick={() => setSelectedOption(i)}     
              className={`block w-full text-right p-5 mb-3 rounded-xl border-2 transition-all ${selectedOption === i ? 'bg-blue-900/50 border-blue-500 text-white' : 'bg-slate-800 border-slate-600 hover:border-blue-400 text-slate-300'}`}>{opt}</button>
            ))}
            {selectedOption !== null && (
              <div className="mt-8 p-6 bg-slate-800 rounded-xl border border-slate-600 animate-in fade-in zoom-in duration-300">
                <p className="text-green-400 font-bold mb-2 text-xl">משוב המערכת:</p>
                <p className="text-slate-200 text-lg">{currentStep.feedback}</p>
                <button onClick={() => { setStepIndex(stepIndex + 1); setSelectedOption(null); }} className="mt-6 bg-blue-600 hover:bg-blue-500 text-white p-3 px-10 rounded-xl font-bold shadow-lg">לשלב הבא</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SIFTWizard() {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans pb-20">
      <Suspense fallback={<div className="text-center p-20 text-blue-400">טוען את המעבדה...</div>}>       
        <WizardContent />
      </Suspense>
    </div>
  );
}
