"use client";
import Link from "next/link";
import { courseData } from "@/data/lessons";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-8 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 tracking-tight">
            אקדמיית האמת: לוחמת מידע
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            ברוכים הבאים למרחב הניסויים. עברו בין הנושאים, קראו את התיאוריה, והתנסו במעבדות כדי להפוך ל"תא חיסוני" שמגן על החברה מנגיף השקרים.
          </p>
        </header>

        <div className="space-y-16">
          
          {/* נושא 1 */}
          <section>
            <h2 className="text-3xl font-black text-amber-500 mb-6 border-b border-gray-800 pb-2">נושא 1: הפסיכולוגיה של השקר 🧠</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/bias-lab" className="group p-6 bg-slate-800 rounded-2xl border border-slate-700 hover:border-amber-500 transition-all shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                <h3 className="text-xl font-bold mb-2 text-amber-400">מעבדת הטיות (חדש!)</h3>
                <p className="text-slate-400 text-sm">גלה אילו רגשות גורמים לך לשתף פייק ניוז ללא בדיקה ואיך "ביטחון-יתר" עובד לרעתך.</p>
              </Link>
              <Link href="/sift-wizard" className="group p-6 bg-slate-800 rounded-2xl border border-slate-700 hover:border-amber-500 transition-all shadow-lg">
                <h3 className="text-xl font-bold mb-2">אשף ה-SIFT</h3>
                <p className="text-slate-400 text-sm">תרגול מודל הבדיקה לבלימת הפצת מידע כוזב, מבוסס על מקרה בית החולים בעזה.</p>
              </Link>
            </div>
          </section>

          {/* נושא 2 */}
          <section>
            <h2 className="text-3xl font-black text-blue-400 mb-6 border-b border-gray-800 pb-2">נושא 2: מכונת התעמולה 🤖</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/bot-farm" className="group p-6 bg-slate-800 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all shadow-lg">
                <h3 className="text-xl font-bold mb-2">מנהל חוות הבוטים</h3>
                <p className="text-slate-400 text-sm">הקם חוות בוטים והבן את המניע הכלכלי מאחורי תעשיית השקרים של מקדוניה.</p>
              </Link>
              <Link href="/bot-or-not" className="group p-6 bg-slate-800 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all shadow-lg">
                <h3 className="text-xl font-bold mb-2">בוט או אדם?</h3>
                <p className="text-slate-400 text-sm">האם תצליח לזהות מתי אלגוריתם מנסה להשפיע על דעתך?</p>
              </Link>
            </div>
          </section>

          {/* נושא 3 */}
          <section>
            <h2 className="text-3xl font-black text-purple-400 mb-6 border-b border-gray-800 pb-2">נושא 3: עידן ה-Deepfake 👁️</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/deepfake-lab" className="group p-6 bg-slate-800 rounded-2xl border border-slate-700 hover:border-purple-500 transition-all shadow-lg">
                <h3 className="text-xl font-bold mb-2">מעבדת זיהוי פלילי חזותי</h3>
                <p className="text-slate-400 text-sm">למד כיצד AI חוטף את החושים שלנו ונסה לזהות את הפגמים בוידאו מזויף.</p>
              </Link>
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}
