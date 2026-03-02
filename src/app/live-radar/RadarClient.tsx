"use client";
import { useState } from "react";
import Link from "next/link";

export default function RadarClient({ initialArticles }: { initialArticles: any[] }) {
  const [articles, setArticles] = useState(initialArticles);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [region, setRegion] = useState("any"); // any, us, gb, il
  const [language, setLanguage] = useState("en"); // en, he
  const [topic, setTopic] = useState("disinfo"); // disinfo, politics, tech, health

  const loadMore = () => setVisibleCount(prev => prev + 5);

  const buildQuery = () => {
    let q = "";
    // הוספת הנושא לשאילתה כדי תמיד להישאר בהקשר של לוחמת מידע
    if (topic === "disinfo") q = '("deepfake" OR "misinformation" OR "fake news")';
    else if (topic === "politics") q = '("election" OR "politics" OR "government") AND ("misinformation" OR "fake")';
    else if (topic === "tech") q = '("AI" OR "cyber" OR "social media") AND ("deepfake" OR "bot")';
    else if (topic === "health") q = '("health" OR "vaccine") AND ("conspiracy" OR "misinformation")';

    // אם המשתמש הקליד משהו חופשי, נוסיף אותו
    if (searchQuery.trim()) {
      q = `(${searchQuery}) AND ${q}`;
    }
    return encodeURIComponent(q);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const API_KEY = process.env.NEXT_PUBLIC_GNEWS_API_KEY || "b982a6147d2ec5ee8a69e5087b9e4a87";
      const finalQuery = buildQuery();
      const countryParam = region !== "any" ? `&country=${region}` : "";
      
      const res = await fetch(`https://gnews.io/api/v4/search?q=${finalQuery}&lang=${language}${countryParam}&max=20&sortby=publishedAt&apikey=${API_KEY}`);
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
              רדאר דיסאינפורמציה (מערכת מתקדמת)
            </h1>
            <p className="text-slate-400">סנן דיווחים לפי אזור בעולם, שפה ונושא, ושלח למעבדת ה-SIFT לניתוח.</p>
          </div>
          <Link href="/" className="bg-slate-800 hover:bg-slate-700 text-white py-2 px-6 rounded-lg font-bold transition-all whitespace-nowrap">חזרה ללוח</Link>
        </header>

        {/* Control Panel (מערכת סינון מתקדמת) */}
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-600 mb-10 shadow-lg">
          <form onSubmit={handleSearch} className="flex flex-col gap-4">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" dir="rtl">
              {/* בחירת אזור */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-slate-400">אזור גיאוגרפי:</label>
                <select value={region} onChange={(e) => setRegion(e.target.value)} className="bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-cyan-500 outline-none cursor-pointer">
                  <option value="any">🌍 כל העולם</option>
                  <option value="us">🇺🇸 ארצות הברית</option>
                  <option value="gb">🇪🇺 אירופה (UK)</option>
                  <option value="il">🇮🇱 ישראל</option>
                </select>
              </div>

              {/* בחירת שפה */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-slate-400">שפת הדיווח:</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-cyan-500 outline-none cursor-pointer">
                  <option value="en">אנגלית (English)</option>
                  <option value="he">עברית (Hebrew)</option>
                </select>
              </div>

              {/* בחירת נושא */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-slate-400">זיהוי נושא (Topic):</label>
                <select value={topic} onChange={(e) => setTopic(e.target.value)} className="bg-slate-900 border border-slate-600 rounded-lg p-3 text-white focus:border-cyan-500 outline-none cursor-pointer">
                  <option value="disinfo">כללי (פייק ניוז ודיפ-פייק)</option>
                  <option value="politics">בחירות ופוליטיקה</option>
                  <option value="tech">טכנולוגיה, AI ובוטים</option>
                  <option value="health">בריאות וקונספירציות</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-2">
              <input 
                type="text" 
                placeholder="מיקוד נוסף: הוסף מילת חיפוש (למשל: TikTok, Trump, Gaza)..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder-slate-500"
                dir="rtl"
              />
              <button type="submit" disabled={isLoading} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg flex items-center gap-2">
                {isLoading ? 'סורק...' : 'הפעל רדאר 📡'}
              </button>
            </div>
          </form>
        </div>

        {/* Results Area */}
        {articles.length === 0 ? (
          <div className="bg-slate-800 p-10 rounded-2xl text-center text-slate-400 border border-slate-700">לא נמצאו כתבות העונות על הסינון המדויק. נסה להרחיב את החיפוש.</div>
        ) : (
          <>
            <div className="space-y-8 mb-8">
              {articles.slice(0, visibleCount).map((article: any, index: number) => (
                <article key={index} className="bg-slate-800 rounded-3xl border border-slate-700 hover:border-cyan-500 transition-all shadow-xl overflow-hidden flex flex-col md:flex-row" dir={language === 'he' ? 'rtl' : 'ltr'}>
                  {article.image && (
                    <div className="md:w-1/3 h-48 md:h-auto overflow-hidden bg-slate-900 relative">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-6 md:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-cyan-900/50 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{article.source.name}</span>
                        <span className="text-slate-400 text-xs">{new Date(article.publishedAt).toLocaleDateString('he-IL', { day: 'numeric', month: 'short', hour: '2-digit', minute:'2-digit' })}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-3 hover:text-cyan-400 transition-colors">
                        <a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a>
                      </h2>
                      <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">{article.description}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-700 flex justify-between items-center" dir="rtl">
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 text-sm font-bold hover:underline">לכתבה המקורית &larr;</a>
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
