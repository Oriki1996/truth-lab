'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function DeepfakeLab() {
  const [activeTab, setActiveTab] = useState('gan');

  return (
    <main className="min-h-screen bg-slate-50 p-8 text-right" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-100 font-sans">
        <h1 className="text-3xl font-black text-slate-900 mb-6 font-sans">שיעור 7: Deepfakes ומניפולציה דיגיטלית</h1>
        <nav className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('gan')} 
            className={`px-4 py-2 rounded-lg font-bold ${activeTab === 'gan' ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-700'}`}
          >
            איך זה עובד? (GAN)
          </button>
          <button 
            onClick={() => setActiveTab('mcgurk')} 
            className={`px-4 py-2 rounded-lg font-bold ${activeTab === 'mcgurk' ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-700'}`}
          >
            אפקט מקגורק
          </button>
        </nav>
        <div className="min-h-[200px]">
          {activeTab === 'gan' ? (
            <p className="text-slate-700 leading-relaxed">טכנולוגיית ה-Deepfake משתמשת ב-Generative Adversarial Networks (GAN). מדובר במאבק בין ה-Generator (היוצר) ל-Discriminator (המבקר), שמלטש את הזיוף עד לרמה ריאליסטית.</p>
          ) : (
            <p className="text-slate-700 leading-relaxed">אפקט מקגורק מוכיח כיצד המוח שלנו משלב ראייה ושמיעה; אם נראה שפתיים אומרות "fa" אך נשמע "ba", נשמע צליל שונה. זהו המנגנון ש-Deepfakes מנצלים כדי להטעות את חושינו.</p>
          )}
        </div>
        <Link href="/" className="mt-12 inline-block text-blue-600 font-bold font-sans">→ חזרה ללוח הבקרה</Link>
      </div>
    </main>
  );
}
