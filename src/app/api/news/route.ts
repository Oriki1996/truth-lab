import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "disinformation";
  const lang = searchParams.get("lang") || "en";
  
  // חישוב תאריך של לפני חודש בדיוק
  const date = new Date();
  date.setDate(date.getDate() - 30);
  const fromDate = date.toISOString().split('T')[0];
  
  const API_KEY = "3a9303c3913e4cb2ac7e583d6d5738e6";

  try {
    // הוספנו from=... ו- pageSize=50
    const response = await fetch(`https://newsapi.org/v2/everything?q=${q}&language=${lang}&from=${fromDate}&pageSize=50&sortBy=publishedAt&apiKey=${API_KEY}`);
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch from NewsAPI" }, { status: 500 });
  }
}
