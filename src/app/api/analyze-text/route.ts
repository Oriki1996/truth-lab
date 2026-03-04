import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    // שימוש במודל gemini-pro המוכר והיציב יותר לגרסאות v1
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      אתה מומחה לניתוח דיסאינפורמציה ותעמולה המבוסס על "הקורס של ישראל". 
      נתח את הטקסט הבא וזהה בו טכניקות מניפולטיביות, דיסאינפורמציה (Disinformation), מיסאינפורמציה (Misinformation), 
      מאלו-אינפורמציה (Mal-information), תיאוריות קשר, או שימוש בתיבות תהודה (Echo Chambers).
      
      החזר תשובה בפורמט JSON בלבד הכולל:
      1. score: ציון אמינות מ-1 עד 100 (100 = אמין ביותר).
      2. findings: רשימה של ממצאים (מה זוהה בטקסט).
      3. techniques: טכניקות התעמולה שזוהו.
      4. recommendations: מה הקורא צריך לעשות לפי מודל SIFT כדי לאמת את המידע.

      הטקסט לניתוח:
      "${text}"
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let analysisText = response.text();
    
    analysisText = analysisText.replace(/```json|```/g, "").trim();

    return NextResponse.json(JSON.parse(analysisText));
  } catch (error) {
    console.error("Analysis Error:", error);
    return NextResponse.json({ error: "Failed to analyze text" }, { status: 500 });
  }
}
