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
            ברוכים הבאים למרחב הניסויים האינטראקטיבי. כאן נהפוך תיאוריה לפרקטיקה ונתנסה בכלים של לוחמת מידע.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* כלי 1: בוט או לא */}
          <Link href="/bot-or-not" className="group p-8 bg-gray-800 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all shadow-xl">
            <h2 className="text-3xl font-bold mb-4">בוט או אדם? 🤖</h2>
            <p className="text-gray-400">זהה את הטקטיקות של "חוות הבוטים" ממקדוניה ונסה להבחין בין פרופיל מזויף לאדם אמיתי.</p>
          </Link>

          {/* כלי 2: אשף SIFT */}
          <Link href="/sift-wizard" className="group p-8 bg-gray-800 rounded-2xl border border-gray-700 hover:border-yellow-500 transition-all shadow-xl">
            <h2 className="text-3xl font-bold mb-4">אשף ה-SIFT 🛡️</h2>
            <p className="text-gray-400">תרגל את מודל ה-SIFT של מייק קולפילד על מקרה הבוחן של בית החולים בעזה.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
