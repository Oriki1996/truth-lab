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
            ברוכים הבאים למרחב הניסויים. עברו בין הנושאים, קראו את התיאוריה, והתנסו במעבדות כדי להפוך ל"תא חיסוני" שמגן על החברה מנגיף השקרים.
          </p>
        </header>

        {/* מד החסינות החדש! */}
        <ImmunityScore />

        <div className="space-y-16 mt-12">
          
          {/* אזור חם - רדאר בזמן אמת */}
          <section className="bg-gradient-to-r from-slate-900 to-cyan-900/20 p-8 rounded-3xl border border-cyan-900/50 shadow-[0_0_30px_rgba(6,182,212,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full"></div>
            <h2 className="text-3xl font-black text-cyan-400 mb-6 flex items-center gap-3">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500"></span>
              </span>
              זירת התרחשויות (Live) 📡
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <Link href="/live-radar" className="group p-6 bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-cyan-800 hover:border-cyan-400 transition-all shadow-lg flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white">רדאר דיסאינפורמציה עולמי</h3>
                  <p className="text-cyan-100/70 text-sm">מושך דיווחים בזמן אמת מ-4 מנועים שונים, עם ניתוח קליקבייט ודירוג מקורות.</p>
                </div>
                <div className="text-4xl group-hover:scale-110 transition-transform">🌍</div>
              </Link>
            </div>
          </section>

          {/* מודולי הלימוד קושרו כאן (ללא שינוי, השארתי לטובת שלמות הקוד) */}
          <section>
            <h2 className="text-3xl font-black text-amber-500 mb-6 border-b border-gray-800 pb-2">נושא 1: הפסיכולוגיה של השקר 🧠</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/lesson/1" className="group p-6 bg-slate-800 rounded-2xl border border-slate-700 hover:border-amber-500 transition-all shadow-lg">
                <h3 className="text-xl font-bold mb-2 text-amber-400">שיעור: מלכודת הרשת</h3>
                <p className="text-slate-400 text-sm">קרא על ההטיות הפסיכולוגיות ואז בצע את "מעבדת ההטיות".</p>
              </Link>
              <Link href="/sift-wizard" className="group p-6 bg-slate-800 rounded-2xl border border-slate-700 hover:border-amber-500 transition-all shadow-lg">
                <h3 className="text-xl font-bold mb-2">אשף ה-SIFT</h3>
                <p className="text-slate-400 text-sm">תרגול מודל הבדיקה לבלימת הפצת מידע כוזב.</p>
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black text-blue-400 mb-6 border-b border-gray-800 pb-2">נושא 2: מכונת התעמולה 🤖</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Link href="/lesson/10" className="group p-6 bg-slate-800 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all shadow-lg">
                <h3 className="text-xl font-bold mb-2 text-blue-400">שיעור: בוטים וטרולים</h3>
                <p className="text-slate-400 text-sm">למד על חוות הבוטים והמשך ל"סימולטור חוות הבוטים".</p>
              </Link>
              <Link href="/bot-or-not" className="group p-6 bg-slate-800 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all shadow-lg">
                <h3 className="text-xl font-bold mb-2">בוט או אדם?</h3>
                <p className="text-slate-400 text-sm">האם תצליח לזהות מתי אלגוריתם מנסה להשפיע על דעתך?</p>
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black text-purple-400 mb-6 border-b border-gray-800 pb-2">נושא 3: עידן ה-Deepfake 👁️</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/lesson/7" className="group p-6 bg-slate-800 rounded-2xl border border-slate-700 hover:border-purple-500 transition-all shadow-lg">
                <h3 className="text-xl font-bold mb-2 text-purple-400">שיעור: סכנת הדיפ-פייק</h3>
                <p className="text-slate-400 text-sm">למד כיצד AI חוטף את החושים והמשך למעבדת הזיהוי הפלילי.</p>
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black text-teal-400 mb-6 border-b border-gray-800 pb-2">נושא 4: הקרב על המציאות 🛡️</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/lesson/3" className="group p-6 bg-slate-800 rounded-2xl border border-slate-700 hover:border-teal-500 transition-all shadow-lg">
                <h3 className="text-xl font-bold mb-2 text-teal-400">שיעור: תיבות תהודה</h3>
                <p className="text-slate-400 text-sm">למד על הפילוג ברשת ונסה לשרוד במשחק "הבריחה מחדר התהודה".</p>
              </Link>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
