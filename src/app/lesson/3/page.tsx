'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function BiasLab() {
  const [step, setStep] = useState(0);
  const [confidence, setConfidence] = useState(50);
  const headline = "מחקר חדש: בוטים ברשת הצליחו לשנות את תוצאות הבחירות ב-15% מהמדינות הדמוקרטיות.";

  return (
    <main className="min-h-screen bg-slate-50 p-8 text-right" dir="rtl">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <h1 className="text-3xl font-black text-slate-900 mb-6">מעבדת שיעור 3: זיהוי הטיות</h1>
        {step === 0 ? (
          <div>
            <p className="text-lg text-slate-700 mb-6 font-bold italic underline">"{headline}"</p>
            <p className="mb-4">לפי מחקרם של Lyons ועמיתיו (2021), רוב האנשים מעריכים את יכולתם לזהות פייק ניוז ב-22 אחוזונים מעל ביצועיהם בפועל.</p>
            <p className="mb-2 text-slate-600">כמה אתה בטוח שהכותרת הזו אמיתית? (0-100%)</p>
            <input type="range" className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer mb-4" onChange={(e) => setConfidence(parseInt(e.target.value))} />
            <div className="text-center text-2xl font-bold text-blue-600 font-mono">{confidence}%</div>
            <button onClick={() => setStep(1)} className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold">בדוק את עצמך</button>
          </div>
        ) : (
          <div className="animate-in fade-in duration-700">
            <h2 className="text-2xl font-bold text-amber-600 mb-4">זהירות: הטיית ביטחון עצמי!</h2>
            <p className="text-slate-600 leading-relaxed">
              הביטחון המופרז שזיהית (בחרת {confidence}%) הוא בדיוק מה שהמחקר מצביע עליו כגורם לביקור באתרים לא אמינים ושיתוף תוכן כוזב.
            </p>
            <button onClick={() => setStep(0)} className="mt-8 text-blue-600 font-bold underline">נסה כותרת אחרת</button>
          </div>
        )}
        <div className="mt-12 border-t pt-6">
          <Link href="/" className="inline-block text-blue-600 font-bold font-sans">→ חזרה ללוח הבקרה</Link>
        </div>
      </div>
    </main>
  );
}
