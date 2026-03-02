"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const SIFT_STEPS = [
  {
    id: "S",
    title: "S - Stop (עצור)",
    instruction: "אל תשתף או תגיב מיד. במיוחד אם התוכן מעורר בך רגש חזק.",
    task: "האם הידיעה הבאה מעוררת בך רגש חזק? המתן 5 שניות לפני שתמשיך.",
    content: "כותרת: 'מאות הרוגים בהפצצה ישראלית על בית חולים בעזה. משרד הבריאות הפלסטיני מדווח על לפחות 500 הרוגים.'",
    timer: 5,
  },
  {
    id: "I",
    title: "I - Investigate (חקור את המקור)",
    instruction: "בדוק מי פרסם את המידע. האם המקור מוטה?",
    task: "מי עומד מאחורי הדיווח הראשוני על 500 ההרוגים?",
    options: ["ארגון ניטרלי", "רשויות הבריאות בעזה (חמאס)", "דובר צה\"ל", "האו\"ם"],
    correctAnswer: 1,
    feedback: "נכון. הדיווח הסתמך על טענות חמאס, מה שקריטי להבנת ההטיה."
  },
  {
    id: "F",
    title: "F - Find Better Coverage (מצא כיסוי טוב יותר)",
    instruction: "חפש מקורות נוספים. האם כלי תקשורת מקצועיים אימתו?",
    task: "אילו ראיות הפריכו את הדיווח הראשוני?",
    options: ["ניתוח סרטונים וצילומי לווין", "הודאה של חמאס", "אין ראיות סותרות"],
    correctAnswer: 0,
    feedback: "מדויק. ניתוח פורנזי הראה שמדובר בשיגור כושל של רקטה."
  },
  {
    id: "T",
    title: "T - Trace (חזור להקשר)",
    instruction: "בדוק את המקור המקורי כדי לראות אם ההקשר שונה.",
    task: "מה הייתה התוצאה של פרסום המידע המוטעה הזה?",
    options: ["המתנה רגועה", "ביטול פסגה מדינית ומחאות אלימות", "שיפור האמון בתקשורת"],
    correctAnswer: 1,
    feedback: "נכון. המהירות שבה המידע הפך לנרטיב עולמי גרמה לנזק ממשי."
  }
];

export default function SIFTWizard() {
  const [stepIndex, setStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const currentStep = SIFT_STEPS[stepIndex];

  useEffect(() => { if (currentStep?.timer) setTimeLeft(currentStep.timer); }, [stepIndex, currentStep]);
  useEffect(() => { if (timeLeft > 0) { const t = setTimeout(() => setTimeLeft(timeLeft - 1), 1000); return () => clearTimeout(t); } }, [timeLeft]);

  const handleOptionClick = (i: number) => {
    setSelectedOption(i);
    setIsCorrect(i === currentStep.correctAnswer);
  };

  if (stepIndex >= SIFT_STEPS.length) return (
    <div className="min-h-screen bg-black text-white p-12 flex flex-col items-center justify-center" dir="rtl">
      <h1 className="text-4xl font-bold text-yellow-400 mb-4">הפכת לצרכן מידע חסין!</h1>
      <Link href="/" className="bg-blue-600 p-4 px-10 rounded-full font-bold">חזרה לדף הבית</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8" dir="rtl">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-2xl">
        <h1 className="text-3xl font-bold text-blue-400 mb-6">{currentStep.title}</h1>
        <p className="mb-4 text-gray-400 italic border-r-4 border-blue-500 pr-4">{currentStep.instruction}</p>
        <div className="bg-gray-700 p-6 rounded-lg">
          {currentStep.id === "S" ? (
            <div className="text-center">
              <p className="text-2xl mb-8">"{currentStep.content}"</p>
              <div className="text-3xl font-mono text-yellow-500">{timeLeft > 0 ? `חכה ${timeLeft} שניות...` : "אפשר להמשיך"}</div>
              {timeLeft === 0 && <button onClick={() => setStepIndex(stepIndex + 1)} className="mt-8 bg-blue-600 p-3 px-8 rounded-lg font-bold">המשך</button>}
            </div>
          ) : (
            <div>
              <p className="text-xl mb-6">{currentStep.task}</p>
              {currentStep.options?.map((opt: string, i: number) => (
                <button key={i} disabled={selectedOption !== null} onClick={() => handleOptionClick(i)} 
                className="block w-full text-right p-4 mb-3 rounded-lg border border-gray-600 hover:border-blue-500 bg-gray-800">{opt}</button>
              ))}
              {isCorrect !== null && (
                <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                  <p className={isCorrect ? "text-green-400 font-bold" : "text-red-400 font-bold"}>{isCorrect ? "נכון מאוד!" : "לא מדויק."}</p>
                  <p className="text-gray-300 mt-2">{currentStep.feedback}</p>
                  <button onClick={() => { setStepIndex(stepIndex + 1); setSelectedOption(null); setIsCorrect(null); }} className="mt-6 bg-blue-600 p-2 px-10 rounded-lg font-bold">לשלב הבא</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
