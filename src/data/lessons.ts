export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  topics: string[];
  content: string;
  quiz: Question[];
  bibliography: string;
  materialPath?: string;
}

export const courseData = {
  title: "מעבדת האמת: פוליטיקה ודיסאינפורמציה",
  lessons: [
    { 
      id: 1, 
      title: "אמת, שקר ופוליטיקה", 
      description: "מבוא לקורס: מלחמת עיראק כמשל.", 
      topics: ["מלחמת עיראק", "PhD קורנל"], 
      content: "ב-2003 העולם יצא למלחמה בעיראק על בסיס שקר לגבי נשק להשמדה המונית. השיעור בוחן איך נרטיבים פוליטיים נבנים.", 
      quiz: [{ question: "מה שימש כהצדקה למלחמת עיראק?", options: ["משבר כלכלי", "נשק להשמדה המונית", "הסכמי סחר", "טרור"], correctAnswer: 1 }], 
      bibliography: "Lecture 1.1",
      materialPath: "/course-materials/1.1 Lecture - Introduction to the course - mw26.docx"
    },
    { 
      id: 2, 
      title: "סוגי הונאה", 
      description: "ההבדל בין מיס, דיס ומאלו-אינפורמציה.", 
      topics: ["Pizzagate", "כוונת רווח"], 
      content: "נלמד להבדיל בין מידע שגוי ללא כוונה (Mis), לבין דיסאינפורמציה (Dis) זדונית.", 
      quiz: [{ question: "מהי 'מאלו-אינפורמציה'?", options: ["מידע שקרי", "מידע אמיתי שמופץ כדי להזיק", "טעות בתום לב"], correctAnswer: 1 }], 
      bibliography: "Lecture 2.1",
      materialPath: "/course-materials/2.1 Lecture - Truth Distorted- Understanding Misinformation, Disinformation, Propaganda, and Lies - mw26.docx"
    },
    { 
      id: 3, 
      title: "הפסיכולוגיה של השקר", 
      description: "מדוע המוח שלנו בוגד בנו?", 
      topics: ["Lyons 2021", "פער 22%"], 
      content: "מחקר Lyons מראה שאנחנו בטוחים בעצמנו מדי ב-22 אחוזונים בזיהוי שקרים.", 
      quiz: [{ question: "מהו הפער שמצא Lyons?", options: ["5%", "22%", "50%"], correctAnswer: 1 }], 
      bibliography: "Lyons et al. 2021",
      materialPath: "/course-materials/3.1 Lecture- The human quest to separate truth from deception - mw26.docx"
    },
    { 
      id: 4, 
      title: "פוסט-אמת ופוסט-מודרניזם", 
      description: "כשהרגש גובר על העובדות.", 
      topics: ["Rudy Giuliani", "עובדות אלטרנטיביות"], 
      content: "השיעור סוקר את קריסת האמת האובייקטיבית ועליית ה'עובדות האלטרנטיביות'.", 
      quiz: [{ question: "מהו 'פוסט-אמת'?", options: ["אמת מדעית", "מצב בו רגשות חשובים מעובדות", "סוף השקר"], correctAnswer: 1 }], 
      bibliography: "Wight 2020",
      materialPath: "/course-materials/4.1 Leacture - Why do we believe in God(s) - mw26.docx"
    },
    { 
      id: 5, 
      title: "תעשיית הפייק במקדוניה", 
      description: "איך עיירה קטנה שינתה את העולם.", 
      topics: ["Veles", "Mirko Ceselkoski"], 
      content: "נכיר את מירקו צ'סלקוסקי והמודל הכלכלי של הפייק ניוז במקדוניה.", 
      quiz: [{ question: "מה הניע את הצעירים במקדוניה?", options: ["אידיאולוגיה", "כסף מפרסומות", "שעמום"], correctAnswer: 1 }], 
      bibliography: "Macedonian Case Study",
      materialPath: "/course-materials/5.1 Lecture - What Is Fake News—and How Media Fragmentation Fueled Its Rise - mw26.docx"
    },
    { 
      id: 6, 
      title: "מלכודת האלגוריתם", 
      description: "איך הרשתות החברתיות מעצימות שקרים.", 
      topics: ["Echo Chambers", "קיטוב"], 
      content: "אלגוריתמים מתגמלים תוכן רגשי ומסעיר כי זה מייצר כסף (Engagement).", 
      quiz: [{ question: "למה פייק ניוז ויראלי יותר?", options: ["הוא נכון יותר", "הוא מפעיל רגשות חזקים", "הוא קצר"], correctAnswer: 1 }], 
      bibliography: "Max Fisher Podcast",
      materialPath: "/course-materials/6.1 Lecture - The Social Media Trap- Why Good People Share Bad Information - mw26.docx"
    },
    { 
      id: 7, 
      title: "זיופים עמוקים (Deepfakes)", 
      description: "כשלא ניתן להאמין לעיניים.", 
      topics: ["AI", "מצמוץ"], 
      content: "נלמד לזהות Deepfakes לפי בעיות במצמוץ וסנכרון שפתיים.", 
      quiz: [{ question: "מהו סימן ל-Deepfake?", options: ["דיבור מהיר", "מצמוץ לא טבעי", "איכות נמוכה"], correctAnswer: 1 }], 
      bibliography: "Steven Chia Interview",
      materialPath: "/course-materials/7.7 Lecture - Deepfakes, Democracy, and the Erosion of Trust - mw26.docx"
    },
    { 
      id: 8, 
      title: "קונספירציות וקנאות", 
      description: "הפסיכולוגיה של QAnon.", 
      topics: ["QAnon", "צורך בשליטה"], 
      content: "קונספירציות נותנות תחושת סדר בעולם כאוטי.", 
      quiz: [{ question: "מהי קונספירציה?", options: ["טעות בחדשות", "אמונה בקבוצה חשאית זדונית", "בדיחה"], correctAnswer: 1 }], 
      bibliography: "Enders et al. 2022",
      materialPath: "/course-materials/8.2 Lecture - Why do people believe in conspiracy theories. - mw26.docx"
    },
    { 
      id: 9, 
      title: "שקרים פוליטיים", 
      description: "מהבטחות בחירות ועד George Santos.", 
      topics: ["אתיקה", "שחיקת אמון"], 
      content: "איך שקרים פוליטיים שוחקים את היסודות של הדמוקרטיה.", 
      quiz: [{ question: "מה גורם לשקר פוליטי להצליח?", options: ["הוא חכם", "הוא מאשר את מה שהבוחר רוצה להאמין", "אין עיתונות"], correctAnswer: 1 }], 
      bibliography: "Lecture 9.6",
      materialPath: "/course-materials/9.6 Lecture - Lying Through Their Teeth- Political Falsehoods and the Erosion of Trust - mw26.docx"
    },
    { 
      id: 10, 
      title: "מלחמת הבוטים", 
      description: "איך אוטומציה מעצבת דעת קהל.", 
      topics: ["Team Jorge", "50.3%"], 
      content: "50.3% מהרשת היא בוטים. נחשוף את תוכנת AIMS שמפעילה אלפי פרופילים.", 
      quiz: [{ question: "כמה מהרשת היא בוטים ב-2024?", options: ["10%", "50.3%", "90%"], correctAnswer: 1 }], 
      bibliography: "Bad Bot Report",
      materialPath: "/course-materials/10.4 Lecture - Bots, Trolls, and the Battle for Truth- How Disinformation Hijacks Democracy - mw26.docx"
    },
    { 
      id: 11, 
      title: "מודל SIFT", 
      description: "ארגז הכלים לאזרח הדיגיטלי.", 
      topics: ["Stop", "Investigate", "Trace"], 
      content: "סיכום הקורס: עצור, חקור, מצא כיסוי רחב ועקוב אחרי המקור.", 
      quiz: [{ question: "מה האות S ב-SIFT?", options: ["Search", "Stop", "Share"], correctAnswer: 1 }], 
      bibliography: "Final Lecture 11.9",
      materialPath: "/course-materials/11.9 Lecture - Truth in the Age of Deception- How We Can Make a Difference - mw26.docx"
    }
  ]
};
