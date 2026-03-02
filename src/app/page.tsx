"use client";
import Link from "next/link";
import { courseData } from "@/data/lessons";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-8 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 tracking-tight">
            {courseData.title}
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            ברוכים הבאים למרחב הניסויים האינטראקטיבי. כאן נלמד את התאוריה דרך חוויה מעשית ונתנסה בכלים של לוחמת מידע.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* כלי 1 */}
          <Link href="/bot-or-not" className="group p-8 bg-slate-800 rounded-3xl border border-slate-700 hover:border-blue-500 transition-all shadow-xl">
            <div className="text-4xl mb-4">🤖</div>
            <h2 className="text-2xl font-bold mb-3">בוט או אדם?</h2>
            <p className="text-slate-400 text-sm">בחן את יכולתך לזהות פרופילים מזויפים ברשתות החברתיות המנסים להשפיע על דעתך.</p>
          </Link>

          {/* כלי 2 */}
          <Link href="/sift-wizard" className="group p-8 bg-slate-800 rounded-3xl border border-slate-700 hover:border-yellow-500 transition-all shadow-xl">
            <div className="text-4xl mb-4">🛡️</div>
            <h2 className="text-2xl font-bold mb-3">אשף ה-SIFT</h2>
            <p className="text-slate-400 text-sm">תרגל את מודל ה-SIFT לבדיקת עובדות בזמן אמת, מבוסס על מקרה הבוחן של בית החולים בעזה.</p>
          </Link>

          {/* כלי 3 החדש */}
          <Link href="/bot-farm" className="group p-8 bg-slate-800 rounded-3xl border border-slate-700 hover:border-red-500 transition-all shadow-xl">
            <div className="text-4xl mb-4">🏭</div>
            <h2 className="text-2xl font-bold mb-3">מנהל חוות הבוטים</h2>
            <p className="text-slate-400 text-sm">למד את התאוריה מאחורי תעשיית השקרים של מקדוניה, ואז נהל חוות בוטים משלך כדי להרוויח קליקים.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
