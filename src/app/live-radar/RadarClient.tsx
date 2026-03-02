"use client";
import { useState } from "react";
import Link from "next/link";

export default function RadarClient({ articles, hasKey }: { articles: any[], hasKey: boolean }) {
  const [visibleCount, setVisibleCount] = useState(5);

  const loadMore = () => setVisibleCount(prev => prev + 5);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans" dir="rtl">
      <div className="max-w-5xl mx-auto">
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
              מנוע מקצועי המושך דיווחים טריים ואיכותיים מסוכנויות מובילות בעולם.
            </p>
          </div>
          <Link href="/" className="bg-slate-800 hover:bg-slate-700 text-white py-2 px-6 rounded-lg font-bold transition-all">חזרה ללוח</Link>
        </header>

        {!hasKey ? (
          <div className="bg-red-900/30 border border-red-500 p-10 rounded-2xl text-center text-red-200">
            <h2 className="text-2xl font-bold mb-4">חסר מפתח API! 🔑</h2>
            <p>הכנסת את הקוד אבל שכחת להחליף את המילה YOUR_API_KEY_HERE במפתח האמיתי שלך בקובץ page.tsx.</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="bg-slate-800 p-10 rounded-2xl text-center text-slate-400 border border-slate-700">
            סורק את הרשתות הבינלאומיות ומנתח מאמרים...
          </div>
        ) : (
          <>
            <div className="space-y-8 mb-8">
              {articles.slice(0, visibleCount).map((article: any, index: number) => (
                <article key={index} className="bg-slate-800 rounded-3xl border border-slate-700 hover:border-cyan-500 transition-all shadow-xl overflow-hidden flex flex-col md:flex-row" dir="ltr">
                  {/* אזור התמונה - חדש! */}
                  {article.image && (
                    <div className="md:w-1/3 h-48 md:h-auto overflow-hidden bg-slate-900">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-6 md:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-cyan-900/50 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {article.source.name}
                        </span>
                        <span className="text-slate-400 text-xs">
                          {new Date(article.publishedAt).toLocaleDateString('he-IL', { hour: '2-digit', minute:'2-digit', day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-3 hover:text-cyan-400 transition-colors">
                        <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
                      </h2>
                      <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">{article.description}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-700 flex justify-between items-center" dir="rtl">
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 text-sm font-bold hover:underline">
                        קרא את הכתבה המלאה &larr;
                      </a>
                      <button className="text-sm bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg transition-all shadow-md">
                        🔍 בחן במודל SIFT
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {visibleCount < articles.length && (
              <div className="text-center">
                <button onClick={loadMore} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 px-12 rounded-full transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] text-lg">
                  הצג עוד דיווחים 👇
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
