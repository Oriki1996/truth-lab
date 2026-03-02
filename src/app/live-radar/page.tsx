
import RadarClient from "./RadarClient";



export const revalidate = 1800; // רענון אוטומטי כל חצי שעה



export default async function LiveRadar() {

  let articles: any[] = [];

  

  // *** הדבק את המפתח שלך כאן במקום המילים באנגלית ***

  const API_KEY = "b982a6147d2ec5ee8a69e5087b9e4a87"; 



  try {

    if (API_KEY !== "YOUR_API_KEY_HERE") {

      const query = encodeURIComponent('"deepfake" OR "misinformation" OR "fake news"');

      // פנייה ישירה למנוע החדשות

      const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&max=20&sortby=publishedAt&apikey=${API_KEY}`;



      const res = await fetch(url, { next: { revalidate: 1800 } });

      if (res.ok) {

        const data = await res.json();

        articles = data.articles || [];

      }

    }

  } catch (error) {

    console.error("Failed to fetch news:", error);

  }



  return <RadarClient articles={articles} hasKey={API_KEY !== "YOUR_API_KEY_HERE"} />;

}

