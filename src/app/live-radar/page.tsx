import RadarClient from "./RadarClient";

// עדכון המטמון של השרת כל 1800 שניות (חצי שעה בדיוק)
export const revalidate = 1800; 

export default async function LiveRadar() {
  let articles: any[] = [];
  
  try {
    // פיצלנו לשתי שאילתות כדי להביא כמות גדולה של תוכן עבור כפתור ה"עוד"
    const query1 = 'deepfake OR "fake news"';
    const query2 = 'misinformation OR propaganda';
    
    const url1 = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`https://news.google.com/rss/search?q=${query1}&hl=en-US&gl=US&ceid=US:en`)}`;
    const url2 = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`https://news.google.com/rss/search?q=${query2}&hl=en-US&gl=US&ceid=US:en`)}`;
    
    // משיכת שתי השאילתות במקביל
    const [res1, res2] = await Promise.all([
      fetch(url1, { next: { revalidate: 1800 } }),
      fetch(url2, { next: { revalidate: 1800 } })
    ]);
    
    if (res1.ok && res2.ok) {
      const data1 = await res1.json();
      const data2 = await res2.json();
      
      // חיבור התוצאות מ-2 השאילתות
      const combined = [...(data1.items || []), ...(data2.items || [])];
      
      // סינון כפילויות (למקרה שכתבה הופיעה בשני החיפושים)
      const unique = Array.from(new Map(combined.map(item => [item.title, item])).values());
      
      // סידור הכתבות לפי תאריך (הכי חדש למעלה)
      articles = unique.sort((a: any, b: any) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    }
  } catch (error) {
    console.error("Failed to fetch news:", error);
  }

  // מעבירים את כל הכתבות שמצאנו לרכיב הלקוח שינהל את ההצגה שלהן
  return <RadarClient articles={articles} />;
}
