"use client";
import { useState } from "react";
import Link from "next/link";
import { analyzeContent } from "@/utils/textAnalyzer";

// פונקציית עזר לדירוג מקורות (Source Trust Index)
const getSourceTrust = (sourceName: string) => {
  const name = sourceName.toLowerCase();
  const reliable = ['reuters', 'ap', 'bbc', 'associated press', 'bloomberg', 'npr', 'pbs', 'the guardian', 'wsj'];
  const userGenerated = ['reddit', 'twitter', 'youtube', 'facebook', 'medium', 'blog', '4chan'];
  const stateSponsored = ['rt', 'al jazeera', 'sputnik', 'xinhua', 'global times', 'presstv', 'tasnim'];

  if (reliable.some(s => name.includes(s))) return { level: 'high', label: '🛡️ מקור רשמי', color: 'text-emerald-400 bg-emerald-900/30 border-emerald-500' };
  if (stateSponsored.some(s => name.includes(s))) return { level: 'low', label: '🚨 מדינה/תעמולה', color: 'text-red-400 bg-red-900/30 border-red-500' };
  if (userGenerated.some(s => name.includes(s))) return { level: 'medium', label: '💬 תוכן גולשים', color: 'text-amber-400 bg-amber-900/30 border-amber-500' };

  return { level: 'unknown', label: '🔍 דורש אימות', color: 'text-slate-400 bg-slate-800 border-slate-600' };
};

export default function RadarClient({ initialArticles }: { initialArticles: any[] }) {
  const [articles, setArticles] = useState(initialArticles);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(50);

  // States לסינון ומיון
  const [searchQuery, setSearchQuery] = useState("");
  const [engine, setEngine] = useState("gnews");
  const [region, setRegion] = useState("any"); 
  const [language, setLanguage] = useState("en"); 
  const [topic, setTopic] = useState("disinfo"); 
  const [sortBy, setSortBy] = useState<'date' | 'risk'>('date'); // מיון חדש!

  const loadMore = () => setVisibleCount(prev => prev + 50);

  const buildQuery = () => {
    let q = "";
    if (topic === "disinfo") q = '"deepfake" OR "misinformation" OR "fake news"';
    else if (topic === "politics") q = 'election OR politics misinformation';
    else if (topic === "tech") q = 'AI OR cyber deepfake';
    else if (topic === "health") q = 'vaccine OR health conspiracy';

    if (searchQuery.trim()) q = `${searchQuery} ${q}`;
    return encodeURIComponent(q);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setArticles([]); 
    
    try {
      const finalQuery = buildQuery();
      let fetchedArticles: any[] = [];

      if (engine === "gnews") {
        const API_KEY = process.env.NEXT_PUBLIC_GNEWS_API_KEY || "b982a6147d2ec5ee8a69e5087b9e4a87";
        const countryParam = region !== "any" ? `&country=${region}` : "";
        const res = await fetch(`https://gnews.io/api/v4/search?q=${finalQuery}&lang=${language}${countryParam}&max=50&sortby=publishedAt&apikey=${API_KEY}`);
        if (res.ok) {
          const data = await res.json();
          fetchedArticles = data.articles || [];
        }
      } 
      else if (engine === "newsapi") {
        const res = await fetch(`/api/news?q=${finalQuery}&lang=${language}`);
        if (res.ok) {
          const data = await res.json();
          if (data.articles) {
            fetchedArticles = data.articles.map((item: any) => ({
              title: item.title,
              description: item.description || "קרא עוד במקור...",
              url: item.url,
              image: item.urlToImage || null,
              publishedAt: item.publishedAt,
              source: { name: item.source?.name || "NewsAPI" }
            })).filter((item: any) => item.title !== "[Removed]"); 
          }
        }
      }
      else if (engine === "reddit") {
        const res = await fetch(`https://www.reddit.com/search.json?q=${finalQuery}&sort=new&limit=50`);
        if (res.ok) {
          const data = await res.json();
          fetchedArticles = data.data.children.map((child: any) => ({
            title: child.data.title,
            description: child.data.selftext.substring(0, 200) + "...",
            url: `https://reddit.com${child.data.permalink}`,
            image: child.data.thumbnail?.startsWith('http') ? child.data.thumbnail : null,
            publishedAt: new Date(child.data.created_utc * 1000).toISOString(),
            source: { name: `Reddit (r/${child.data.subreddit})` }
          }));
        }
      }
      else if (engine === "google") {
        const rssUrl = encodeURIComponent(`https://news.google.com/rss/search?q=${finalQuery}&hl=${language}&gl=${region === 'any' ? 'US' : region.toUpperCase()}`);
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}&count=50`);
        if (res.ok) {
          const data = await res.json();
          fetchedArticles = (data.items || []).map((item: any) => ({
            title: item.title.split(' - ').slice(0, -1).join(' - ') || item.title,
            description: "קרא דיווח מלא במקור...",
            url: item.link,
            image: item.thumbnail || null,
            publishedAt: item.pubDate,
            source: { name: item.title.split(' - ').pop() || "Google News" }
          }));
        }
      }

      setArticles(fetchedArticles);
      setVisibleCount(50);
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

  // עיבוד הכתבות (לפני מיון) - הוספת ניתוח טקסט ודירוג מקור
  const processedArticles = articles.map(article => {
    const analysis = analyzeContent(article.title, article.description || "");
    const sourceTrust = getSourceTrust(article.source.name);
    return { ...article, analysis, sourceTrust };
  });

  // מיון לפי התפריט
  const sortedArticles = [...processedArticles].sort((a, b) => {
    if (sortBy === 'risk') {
      return b.analysis.riskScore - a.analysis.riskScore;
    } else {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }
  });

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black text-cyan-400 mb-2 flex items-center gap-3">
              <span className="relative flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-5 w-5 bg-cyan-500"></span>
              </span>
              רדאר דיסאינפורמציה עולמי
            </h1>
            <p className="text-slate-400">ארבעה מנועי חיפוש, מנתח שפה סמנטי, ומדד דירוג מקורות אוטומטי.</p>
          </div>
          <Link href="/" className="bg-slate-800 hover:bg-slate-700 text-white py-2 px-6 rounded-lg font-bold transition-all border border-slate-600">חזרה ללוח</Link>
        </header>

        {/* תפריט שליטה דביק */}
        <div className="sticky top-4 z-50 bg-slate-800/90 backdrop-blur-md p-6 rounded-2xl border border-cyan-500/50 mb-10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <form onSubmit={handleSearch} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-right">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-cyan-400">מקור סריקה (Engine):</label>
                <select value={engine} onChange={(e) => setEngine(e.target.value)} className="bg-slate-900 border border-cyan-800 rounded-lg p-3 text-white focus:border-cyan-500 outline-none cursor-pointer">
                  <option value="gnews">📰 סוכנויות (GNews)</option>
                  <option value="newsapi">🌐 ארכיון חודשי (NewsAPI)</option>
                  <option value="reddit">💬 רשתות חברתיות (Reddit)</option>
                  <option value="google">🌍 חיפוש חופשי (Google)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-slate-400">אזור גיאוגרפי:</label>
                <select value={region} onChange={(e) => setRegion(e.target.value)} className="bg-slate-900 border border-slate-600 rounded-lg p-3 text-white outline-none cursor-pointer disabled:opacity-50" disabled={engine === 'newsapi' || engine === 'reddit'}>
                  <option value="any">🌍 כל העולם</option>
                  <option value="us">🇺🇸 ארצות הברית</option>
                  <option value="il">🇮🇱 ישראל</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-slate-400">שפת הדיווח:</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-slate-900 border border-slate-600 rounded-lg p-3 text-white outline-none cursor-pointer disabled:opacity-50" disabled={engine === 'reddit'}>
                  <option value="en">אנגלית (English)</option>
                  <option value="he">עברית (Hebrew)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold text-slate-400">זיהוי נושא (Topic):</label>
                <select value={topic} onChange={(e) => setTopic(e.target.value)} className="bg-slate-900 border border-slate-600 rounded-lg p-3 text-white outline-none cursor-pointer">
                  <option value="disinfo">כללי (פייק ניוז)</option>
                  <option value="politics">בחירות ופוליטיקה</option>
                  <option value="tech">טכנולוגיה ובוטים</option>
                  <option value="health">בריאות וקונספירציות</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-2">
              <input 
                type="text" 
                placeholder="מיקוד (למשל: TikTok, Trump)..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-600 rounded-xl px-6 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                dir="ltr"
              />
              <button type="submit" disabled={isLoading} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-10 rounded-xl transition-all shadow-lg flex items-center gap-2 whitespace-nowrap">
                {isLoading ? 'סורק...' : 'הפעל סריקה מורחבת 📡'}
              </button>
            </div>
          </form>
        </div>

        {/* אנימציית טעינה - השלדים החדשים! */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="flex flex-col bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 animate-pulse h-[400px]">
                <div className="h-48 bg-slate-700/50 w-full"></div>
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <div className="h-4 bg-slate-700/50 rounded w-1/3"></div>
                  <div className="h-6 bg-slate-600/50 rounded w-full"></div>
                  <div className="h-6 bg-slate-600/50 rounded w-5/6"></div>
                  <div className="mt-auto flex justify-between">
                     <div className="h-8 bg-slate-700/50 rounded w-1/4"></div>
                     <div className="h-8 bg-slate-700/50 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* תוצאות סופיות */}
        {!isLoading && sortedArticles.length === 0 ? (
          <div className="bg-slate-800 p-20 rounded-3xl text-center text-slate-400 border border-slate-700 text-xl">לא נמצאו כתבות. נסה לשנות מנוע סריקה או להרחיב את החיפוש.</div>
        ) : !isLoading && (
          <>
            {/* כפתורי סינון חכמים */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-center bg-slate-800/50 p-4 rounded-xl border border-slate-700">
              <span className="text-slate-400 font-bold">מציג {Math.min(visibleCount, sortedArticles.length)} מתוך {sortedArticles.length} תוצאות</span>
              
              <div className="flex items-center gap-2 mt-4 sm:mt-0 bg-slate-900 p-1 rounded-lg border border-slate-700">
                <button 
                  onClick={() => setSortBy('date')} 
                  className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${sortBy === 'date' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  ⏳ הכי חדש
                </button>
                <button 
                  onClick={() => setSortBy('risk')} 
                  className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${sortBy === 'risk' ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(220,38,38,0.5)]' : 'text-slate-400 hover:text-white'}`}
                >
                  🔥 סיכון קליקבייט
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {sortedArticles.slice(0, visibleCount).map((article: any, index: number) => {
                const analysis = article.analysis;
                const isHighRisk = analysis.riskScore > 20;
                const sourceTrust = article.sourceTrust;
                
                return (
                  <article key={index} className={`flex flex-col bg-slate-800 rounded-3xl transition-all hover:-translate-y-2 hover:shadow-2xl overflow-hidden border-2 ${isHighRisk ? 'border-red-900/50 hover:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-slate-700 hover:border-cyan-500'}`} dir={language === 'he' ? 'rtl' : 'ltr'}>
                    
                    <div className="h-48 bg-slate-900 relative w-full border-b border-slate-700 overflow-hidden">
                      {article.image ? (
                        <img src={article.image} alt="תמונה" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-700 text-4xl">📰</div>
                      )}
                      
                      {isHighRisk && (
                        <div className="absolute top-3 left-3 bg-red-600/90 text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-md animate-pulse">
                          {analysis.riskScore}% סיכון מניפולציה
                        </div>
                      )}

                      {/* תגית אמינות מקור על התמונה */}
                      <div className={`absolute bottom-3 right-3 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg backdrop-blur-md border ${sourceTrust.color}`}>
                        {sourceTrust.label}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1 justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-4 text-xs font-bold">
                          <span className="bg-slate-700 text-cyan-400 px-3 py-1 rounded-full">{article.source.name}</span>
                          <span className="text-slate-400">{new Date(article.publishedAt).toLocaleDateString('he-IL', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        </div>
                        
                        <h2 className="text-xl font-bold text-white mb-3 leading-snug line-clamp-3">
                          <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">{article.title}</a>
                        </h2>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {analysis.badges.slice(0,2).map((badge: any, bIdx: number) => (
                            <span key={bIdx} className={`text-[10px] font-bold px-2 py-1 rounded border ${badge.color}`}>
                              {badge.text}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-between items-center" dir="rtl">
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white text-sm font-bold transition-colors">מקור &larr;</a>
                        <Link 
                          href={`/sift-wizard?title=${encodeURIComponent(article.title)}&source=${encodeURIComponent(article.source.name)}`}
                          className="text-sm bg-purple-600 hover:bg-purple-500 text-white py-2 px-4 rounded-xl font-bold transition-all shadow-lg"
                        >
                          🛡️ פתח תיק SIFT
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {visibleCount < sortedArticles.length && (
              <div className="text-center pb-10">
                <button onClick={loadMore} className="bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold py-4 px-12 rounded-full transition-all border border-slate-600 shadow-xl text-lg">
                  טען עוד כתבות 👇
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
