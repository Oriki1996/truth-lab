export function analyzeContent(title: string, description: string) {
  const text = `${title} ${description}`.toLowerCase();
  let riskScore = 0;
  const badges: { text: string; color: string }[] = [];

  // 1. איתור מילים המעוררות רגש קיצוני (סנסציה / קליקבייט)
  const emotionalWords = [
    "shocking", "scandal", "secret", "destroy", "hidden", "truth", "lies", "exposed", "outrage", "bombshell", "banned",
    "מזעזע", "שערורייה", "סוד", "הוסתר", "נחשף", "שקרים", "מטורף", "לא יאומן", "אסור"
  ];
  const foundEmotions = emotionalWords.filter(w => text.includes(w));

  if (foundEmotions.length > 0) {
    riskScore += 30 + (foundEmotions.length * 10);
    badges.push({ text: "⚠️ שפה סנסציונית", color: "text-red-400 bg-red-900/30 border-red-500" });
  }

  // 2. איתור "צעקות" (ALL CAPS) - רלוונטי לאנגלית
  const words = `${title} ${description}`.split(" ");
  const allCapsWords = words.filter(w => w === w.toUpperCase() && w.length > 4 && /[A-Z]/.test(w));
  if (allCapsWords.length > 1) {
    riskScore += 20;
    badges.push({ text: "📢 שימוש מוגזם ב-CAPS", color: "text-amber-400 bg-amber-900/30 border-amber-500" });
  }

  // 3. סימני פיסוק דרמטיים (!?)
  if ((text.match(/!/g) || []).length > 1 || text.includes("!?") || text.includes("?!")) {
    riskScore += 15;
    badges.push({ text: "❗ סימני קריאה מרובים", color: "text-amber-400 bg-amber-900/30 border-amber-500" });
  }

  // אם הכתבה נקייה יחסית מסממני פייק/קליקבייט
  if (riskScore < 20) {
    badges.push({ text: "✅ שפה אינפורמטיבית/ניטרלית", color: "text-green-400 bg-green-900/30 border-green-500" });
  }

  return {
    riskScore: Math.min(riskScore, 100),
    badges
  };
}
