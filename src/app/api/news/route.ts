import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "disinformation";
  const lang = searchParams.get("lang") || "en";
  
  // המפתח שלך ל-NewsAPI
  const API_KEY = "3a9303c3913e4cb2ac7e583d6d5738e6";

  try {
    // השרת שלנו פונה ל-NewsAPI ומביא את התוצאות
    const response = await fetch(`https://newsapi.org/v2/everything?q=${q}&language=${lang}&sortBy=publishedAt&apiKey=${API_KEY}`);
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch from NewsAPI" }, { status: 500 });
  }
}
