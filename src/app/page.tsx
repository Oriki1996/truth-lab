"use client";
import Link from "next/link";
import ImmunityScore from "@/app/components/ImmunityScore";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-8 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 tracking-tight">
            אקדמיית האמת: לוחמת מידע
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            מרחב הלמידה המקיף לבחינה. שנן את החומר התיאורטי והתנסה במעבדות הסייבר.
          </p>
        </header>

        <ImmunityScore />

        <div className="space-y-16 mt-12">
          
          {/* אזור הליבה למבחן - חדש! */}
          <section className="bg-gradient-to-br from-blue-900 to-slate-900 p-8 md:p-12 rounded-[3rem] border border-blue-500/30 shadow-[0_0_40px_rgba(37,99,235,0.2)]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-right">
                <span className="bg-blue-500/20 text-blue-300 font-bold px-4 py-1 rounded-full text-sm mb-4 inline-block">מומלץ לפני הבחינה 🎓</span>
                <h2 className="text-4xl font-black text-white mb-4">מרכז ההכנה למבחן</h2>
                <p className="text-blue-100 text-lg leading-relaxed mb-6">
                  עזוב רגע את המשחקים. כאן תוכל לשנן את המושגים התיאורטיים, מחקרים ומודלים מתוך הסילבוס (כגון Overconfidence, מודל SIFT ועוד) באמצעות מערכת כרטיסיות חכמה המבוססת על Active Recall.
                </p>
                <Link href="/exam-prep" className="inline-block bg-blue-500 hover:bg-blue-400 text-white font-black py-4 px-10 rounded-full transition-all shadow-lg hover:scale-105 text-lg">
                  התחל ללמוד למבחן &larr;
                </Link>
              </div>
              <div className="text-9xl drop-shadow-2xl">🧠</div>
            </div>
          </section>

          {/* זירת התרחשויות Live */}
          <section className="bg-slate-900/50 p-8 rounded-3xl border border-cyan-900/50">
            <h2 className="text-3xl font-black text-cyan-400 mb-6 flex items-center gap-3">זירת התרחשויות (Live) 📡</h2>
            <Link href="/live-radar" className="group p-6 bg-slate-800 rounded-2xl border border-cyan-800 hover:border-cyan-400 transition-all shadow-lg flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-white">רדאר דיסאינפורמציה עולמי</h3>
                <p className="text-cyan-100/70 text-sm">מושך דיווחים בזמן אמת מ-4 מנועים שונים לתרגול איתור קליקבייט.</p>
              </div>
            </Link>
          </section>

          {/* שאר המעבדות (ללא שינוי, מאורגן בצורה נקייה) */}
          <section>
            <h2 className="text-2xl font-black text-slate-300 mb-6 border-b border-slate-800 pb-2">מעבדות סימולציה להתנסות</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/bias-lab" className="p-6 bg-slate-800 rounded-2xl border border-slate-700 hover:border-amber-500 transition-all">
                <div className="text-3xl mb-2">🎭</div>
                <h3 className="text-lg font-bold text-white mb-1">מעבדת הטיות</h3>
                <p className="text-slate-400 text-sm">בחן את הפגיעות הפסיכולוגית שלך.</p>
              </Link>
              
              <Link href="/bot-farm" className="p-6 bg-slate-800 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all">
                <div className="text-3xl mb-2">🏭</div>
                <h3 className="text-lg font-bold text-white mb-1">חוות הבוטים</h3>
                <p className="text-slate-400 text-sm">התנסה כמפעיל רשת תעמולה.</p>
              </Link>

              <Link href="/deepfake-lab" className="p-6 bg-slate-800 rounded-2xl border border-slate-700 hover:border-purple-500 transition-all">
                <div className="text-3xl mb-2">👁️</div>
                <h3 className="text-lg font-bold text-white mb-1">מעבדת Deepfake</h3>
                <p className="text-slate-400 text-sm">אתר זיופי וידאו ופנים.</p>
              </Link>

              <Link href="/echo-chamber" className="p-6 bg-slate-800 rounded-2xl border border-slate-700 hover:border-teal-500 transition-all">
                <div className="text-3xl mb-2">🫧</div>
                <h3 className="text-lg font-bold text-white mb-1">חדר התהודה</h3>
                <p className="text-slate-400 text-sm">ברח מהאלגוריתם המקטב.</p>
              </Link>
              
              <Link href="/sift-wizard" className="p-6 bg-slate-800 rounded-2xl border border-slate-700 hover:border-slate-500 transition-all">
                <div className="text-3xl mb-2">🛡️</div>
                <h3 className="text-lg font-bold text-white mb-1">אשף SIFT</h3>
                <p className="text-slate-400 text-sm">תרגל את מודל בדיקת העובדות.</p>
              </Link>

              <Link href="/lesson/1" className="p-6 bg-slate-800 rounded-2xl border border-slate-700 hover:border-slate-500 transition-all">
                <div className="text-3xl mb-2">📖</div>
                <h3 className="text-lg font-bold text-white mb-1">סילבוס קריאה</h3>
                <p className="text-slate-400 text-sm">קרא את ההרצאות המלאות.</p>
              </Link>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
