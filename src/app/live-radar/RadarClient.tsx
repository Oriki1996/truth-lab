"use client";
import { useState } from "react";
import Link from "next/link";

export default function RadarClient({ articles }: { articles: any[] }) {
  const [visibleCount, setVisibleCount] = useState(5);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 flex items-center justify-between border-b border-slate-700 pb-6">
          <div>
            <h1 className="text-4xl font-black text-cyan-400 mb-2 flex items-center gap-3">
              <span className="relative flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-cyan-500"></span>
              </span>
              רדאר האמת: דיווחים בזמן אמת
            </h1>
            <p className="text-slate-400">
              המערכת סורקת סוכנויות ידיעות בעולם כל 30 דקות ומביאה דיווחים טריים.
            </p>
          </div>
          <Link href="/" className="bg-slate-800 hover:bg-slate-700 text-white py-2 px-6 rounded-lg font-bold transition-all">
            חזרה ללוח
          </Link>
        </header>

        {articles.length === 0 ? (
          <div className="bg-slate-800 p-10 rounded-2xl text-center text-slate-400 border border-slate-700">
            טוען נתונים מהרשתות הבינלאומיות...
          </div>
        ) : (
          <>
            <div className="space-y-6 mb-8">
              {articles.slice(0, visibleCount).map((article: any, index: number) => {
                const sourceMatch = article.title.split(' - ');
                const source = sourceMatch.length > 1 ? sourceMatch[sourceMatch.length - 1] : "מקור בינלאומי";
                const cleanTitle = sourceMatch.length > 1 ? sourceMatch.slice(0, -1).join(' - ') : article.title;

                return (
                  <article key={index} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-cyan-500 transition-all shadow-lg flex flex-col md:flex-row gap-6 items-start text-left" dir="ltr">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-cyan-900/50 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {source}
                        </span>
                        <span className="text-slate-400 text-xs">
                          {new Date(article.pubDate).toLocaleDateString('he-IL', { hour: '2-digit', minute:'2-digit', day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 hover:text-cyan-400 transition-colors">
                        <a href={article.link} target="_blank" rel="noopener noreferrer">
                          {cleanTitle}
                        </a>
                      </h2>
                      <div className="flex gap-4 mt-4" dir="rtl">
                        <button className="text-sm bg-slate-700 hover:bg-slate-600 text-white py-1 px-4 rounded transition-all">
                          🔍 הפעל SIFT
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {visibleCount < articles.length && (
              <div className="text-center">
                <button 
                  onClick={loadMore}
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-10 rounded-full transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                >
                  טען עוד כתבות 👇
                </button>
              </div>
            )}
            {visibleCount >= articles.length && (
              <div className="text-center text-slate-500 mt-6">
                אין כתבות נוספות כרגע. המערכת תתעדכן שוב בקרוב.
              </div>
            )}
          </>
        )}

        <div className="mt-10 bg-cyan-900/20 border border-cyan-800 p-6 rounded-2xl">
          <h3 className="text-cyan-400 font-bold mb-2">💡 משימת מעבדה:</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            בחר את אחת הכתבות מעלה ולחץ על הקישור לקריאה. נסה לזהות: האם הכתבה מדווחת על דיסאינפורמציה או שהיא עצמה מעלה חשד כתוכן מוטה? יישם את מודל SIFT.
          </p>
        </div>
      </div>
    </div>
  );
}
