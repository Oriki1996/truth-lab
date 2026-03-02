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
}

export const courseData = {
  title: "מעבדת האמת: פוליטיקה ודיסאינפורמציה",
  lessons: [
    {
      id: 1,
      title: "אמת, שקר ופוליטיקה",
      description: "מבוא לקורס: מלחמת עיראק כמשל.",
      topics: ["מלחמת עיראק", "PhD קורנל", "תעשיית השקרים"],
      content: "ב-2003 העולם יצא למלחמה בעיראק על בסיס שקר לגבי נשק להשמדה המונית. השיעור בוחן איך נרטיבים פוליטיים נבנים ואיך האמת הופכת למטבע עובר לסוחר. נלמד על הקושי להבחין בין מציאות לבדיה בעידן שבו האמון במוסדות קורס.",
      quiz: [{ question: "מה שימש כהצדקה למלחמת עיראק והתברר כשקר?", options: ["משבר כלכלי", "נשק להשמדה המונית", "הסכמי סחר", "טרור פנימי"], correctAnswer: 1 }],
      bibliography: "Lecture 1.1 - Introduction"
    },
    {
      id: 2,
      title: "סוגי הונאה: מיס, דיס ומאלו",
      description: "ההבדל הדק בין טעות למניפולציה.",
      topics: ["Pizzagate", "כוונת רווח", "תעמולה"],
      content: "ננתח את מקרה 'פיצהגייט' (Pizzagate) כדוגמה למיסאינפורמציה ויראלית. נלמד להבדיל בין מידע שגוי ללא כוונה (Mis), לבין דיסאינפורמציה (Dis) שנועדה להטעות בכוונה תחילה, לבין 'מאלו-אינפורמציה' - מידע אמיתי שמשמש לפגוע (כמו הדלפות פרטיות).",
      quiz: [{ question: "מהי 'מאלו-אינפורמציה' (Mal-information)?", options: ["מידע שקרי לגמרי", "מידע אמיתי שמופץ כדי להזיק", "טעות בתום לב", "שמועה בווטסאפ"], correctAnswer: 1 }],
      bibliography: "Lecture 2.1 & Podcast 2.4"
    },
    {
      id: 3,
      title: "הפסיכולוגיה של השקר",
      description: "מדוע המוח שלנו בוגד בנו?",
      topics: ["Lyons 2021", "גלאי שקר", "הטיית האישור"],
      content: "בני אדם הם גלאי שקר גרועים. מחקר Lyons מראה שאנחנו בטוחים בעצמנו מדי (פער של 22 אחוזונים). בנוסף, נראה את ההיסטוריה של ה'פוליגרף' ואיך הוא הפך למכשיר פסיכולוגי שמטרתו לגרום לאנשים להישבר, יותר מאשר לזהות אמת פיזיולוגית.",
      quiz: [{ question: "מהו הכוח העיקרי של הפוליגרף לפי השיעור?", options: ["דיוק של 100%", "הלחץ הפסיכולוגי שגורם להודאה", "זיהוי גלי מוח", "זיהוי ריח של פחד"], correctAnswer: 1 }],
      bibliography: "Lecture 3.5 & Watch 3.2"
    },
    {
      id: 5,
      title: "תעשיית הפייק של מקדוניה",
      description: "איך עיירה קטנה שינתה את בחירות 2016.",
      topics: ["Mirko Ceselkoski", "Veles", "Facebook Ads"],
      content: "נכיר את מירקו צ'סלקוסקי, ה'מורה' של צעירי העיירה ולס במקדוניה. הם לא היו פוליטיים - הם פשוט גילו שחדשות שקריות על טראמפ מכניסות אלפי דולרים בחודש מפרסומות של גוגל ופייסבוק. זהו מודל כלכלי של שקר.",
      quiz: [{ question: "מי נחשב ל'אבי' תעשיית הפייק ניוז במקדוניה?", options: ["מארק צוקרברג", "מירקו צ'סלקוסקי", "דונלד טראמפ", "אלכס ג'ונס"], correctAnswer: 1 }],
      bibliography: "The Macedonian Fake News Industry (Hughes & Waismel-Manor)"
    },
    {
      id: 10,
      title: "הבוטים של Team Jorge",
      description: "דיסאינפורמציה להשכרה.",
      topics: ["AIMS", "Sleeper Bots", "Bad Bot Report"],
      content: "50.3% מהרשת היא בוטים. נחשוף את 'Team Jorge' - קבוצה ישראלית שמכרה שירותי הטיית בחירות באמצעות תוכנת AIMS, המנהלת 30,000 פרופילים מזויפים עם כרטיסי אשראי וחשבונות Airbnb כדי להיראות אנושיים לגמרי.",
      quiz: [{ question: "מהו השם של התוכנה שניהלה 30,000 פרופילים מזויפים?", options: ["ChatGPT", "AIMS", "BotMaster", "SleeperCell"], correctAnswer: 1 }],
      bibliography: "Lecture 10.4 & 10.9"
    },
    {
      id: 11,
      title: "סיכום: להיות חסין שקרים",
      description: "מממדים של אמת וכלים למלחמה.",
      topics: ["SIFT", "אחריות אישית", "חוסן"],
      content: "המאבק בשקר מתחיל בעצירה (Stop). נסכם את הקורס עם מודל SIFT ונדבר על האחריות של כל אחד מאיתנו לא להיות 'שותף לדבר עבירה' בשיתוף מידע רגשי ולא בדוק. זכרו: האמת היא הבסיס לדמוקרטיה.",
      quiz: [{ question: "מה הצעד הראשון כשרואים ידיעה מרעישה?", options: ["לשתף מיד", "לעצור (Stop)", "לכתוב תגובה כועסת", "למחוק את האפליקציה"], correctAnswer: 1 }],
      bibliography: "Lecture 11.9"
    }
  ]
};
