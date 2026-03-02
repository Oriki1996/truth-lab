import RadarClient from "./RadarClient";

export const revalidate = 1800;

export default async function LiveRadar() {
  let articles: any[] = [];
  const API_KEY = process.env.NEXT_PUBLIC_GNEWS_API_KEY || "b982a6147d2ec5ee8a69e5087b9e4a87"; 

  try {
    const query = encodeURIComponent('"deepfake" OR "misinformation"');
    const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&max=20&sortby=publishedAt&apikey=${API_KEY}`;
    const res = await fetch(url, { next: { revalidate: 1800 } });
    if (res.ok) {
      const data = await res.json();
      articles = data.articles || [];
    }
  } catch (error) {
    console.error("Failed to fetch news:", error);
  }

  return <RadarClient initialArticles={articles} />;
}
