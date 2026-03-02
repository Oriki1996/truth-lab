"use server";
import { sql } from "@vercel/postgres";

export async function saveScore(score: number) {
  try {
    await sql`CREATE TABLE IF NOT EXISTS bot_scores (id SERIAL PRIMARY KEY, score INT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;
    await sql`INSERT INTO bot_scores (score) VALUES (${score});`;
    return true;
  } catch (error) {
    console.error("DB Error:", error);
    return false;
  }
}
