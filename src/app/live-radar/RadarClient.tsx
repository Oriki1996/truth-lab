"use client";
import { useState } from "react";
import Link from "next/link";

export default function RadarClient({ initialArticles }: { initialArticles: any[] }) {
  const [articles, setArticles] = useState(initialArticles);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

  const loadMore = () => setVisibleCount(prev => prev + 5);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const API_KEY = process.env.NEXT_PUBLIC_GNEWS_API_KEY || "b982a6147d2ec5ee8a69e5087b9e4a87";
      const res = await fetch(`https://gnews.io/api/v4/search?q=${encodeURIComponent(searchQuery)}&lang=en&max=20&sortby=publishedAt&apikey=${API_KEY}`);
      if (res.ok) {
        const data = await res.json();
        setArticles(data.articles || []);
        setVisibleCount(5);
      }
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-700 pb-6 gap-6">
          <div>
            <h1 className="text-4xl font-black text-cyan-400 mb-2 flex items-center gap-3">
              <span className="relative flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-cyan-500"></span>
              </span>
              רדאר דיסאינפורמציה (Live)
            </h1>
            <p className="text-slate-400">חפש נושאים, מצא כתבות בזמן אמת ושלח אותן למעבדת ה-SIFT לניתוח.</p>
          </div>
          <Link href="/" className="bg-slate-800 hover:bg-slate-700 text-white py-2 px-6 rounded-lg font-bold transition-all whitespace-nowrap">חזרה ללוח</Link>
        </header>

        {/* מנוע חיפוש אקטיבי */}
        <form onSubmit={handleSearch} className="mb-10 flex gap-4">
          <input 
            type="text" 
            placeholder="חפש נושא בעולם (למשל: Elections, AI, Trump)..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-cyan-500 transition-colors"
            dir="ltr"
          />
          <button type="submit" disabled={isLoading} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg flex items-center gap-2">
            {isLoading ? 'סורק...' : 'חפש במאגר 🌍'}
          </button>
        </form>

        {articles.length === 0 ? (
          <div className="bg-slate-800 p-10 rounded-2xl text-center text-slate-400 border border-slate-700">לא נמצאו כתבות. נסה לחפש מילה אחרת (באנגלית).</div>
        ) : (
          <>
            <div className="space-y-8 mb-8">
              {articles.slice(0, visibleCount).map((article: any, index: number) => (
                <article key={index} className="bg-slate-800 rounded-3xl border border-slate-700 hover:border-cyan-500 transition-all shadow-xl overflow-hidden flex flex-col md:flex-row" dir="ltr">
                  {article.image && (
                    <div className="md:w-1/3 h-48 md:h-auto overflow-hidden bg-slate-900 relative">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-6 md:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-cyan-900/50 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{article.source.name}</span>
                        <span className="text-slate-400 text-xs">{new Date(article.publishedAt).toLocaleDateString('he-IL', { day: 'numeric', month: 'short' })}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-3 hover:text-cyan-400 transition-colors">
                        <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
                      </h2>
                      <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">{article.description}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-700 flex justify-between items-center" dir="rtl">
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 text-sm font-bold hover:underline">לכתבה המקורית &larr;</a>
                      {/* הזרקת הנתונים למודל ה-SIFT דרך שורת הכתובת */}
                      <Link 
                        href={`/sift-wizard?title=${encodeURIComponent(article.title)}&source=${encodeURIComponent(article.source.name)}`}
                        className="text-sm bg-purple-600 hover:bg-purple-700 text-white py-2 px-5 rounded-lg font-bold transition-all shadow-[0_0_10px_rgba(147,51,234,0.4)]"
                      >
                        🛡️ העבר לניתוח במעבדת SIFT
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            {visibleCount < articles.length && (
              <div className="text-center">
                <button onClick={loadMore} className="bg-cyan-900 hover:bg-cyan-800 text-cyan-100 font-bold py-3 px-10 rounded-full transition-all border border-cyan-700">הצג עוד תוצאות 👇</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
