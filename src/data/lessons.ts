export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface InfoModalData {
  title: string;
  content: string;
}

export interface Lesson {
  id: number;
  title: string;
  topics: string[];
  description: string;
  modals: InfoModalData[];
  quiz: Question[];
}

export const courseData: { title: string; lessons: Lesson[] } = {
  title: "פוליטיקה, שקרים ודיסאינפורמציה",
  lessons: [
    {
      id: 1,
      title: "אמת וידע בעידן הדיגיטלי",
      topics: ["אפיסטמולוגיה", "אמת vs אמונה", "טבע השקר"],
      description: "בשיעור זה נחקור כיצד אנחנו מגדירים ידע ומה קורה כשהאמת הופכת למוצר צריכה.",
      modals: [
        {
          title: "אפיסטמולוגיה",
          content: "תורת ההכרה. הענף בפילוסופיה שבודק מהו ידע ואיך אנחנו משיגים אותו. בעידן הפייק ניוז, האפיסטמולוגיה שלנו בסכנה."
        },
        {
          title: "הטיית האישוש",
          content: "הנטייה האנושית לחפש ולפרש מידע בצורה שתחזק את האמונות הקיימות שלנו, תוך התעלמות מעובדות סותרות."
        }
      ],
      quiz: [
        {
          question: "מהי 'הטיית האישוש'?",
          options: ["חיפוש מידע שסותר את דעתנו", "הנטייה לקבל רק מידע שמחזק את מה שאנחנו כבר חושבים", "שיטה טכנולוגית לזיהוי בוטים", "חוסר יכולת לקרוא חדשות"],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 3,
      title: "מעבדת הטיות: מדוע אנו נכשלים?",
      topics: ["ביטחון מופרז", "הטיות קוגניטיביות", "חשיבה מונעת"],
      description: "למה אנשים משכילים נופלים במלכודת של חדשות כזב? ננתח את מחקרם של Lyons ועמיתיו.",
      modals: [
        {
          title: "אפקט דאנינג-קרוגר",
          content: "ככל שאדם יודע פחות על תחום מסוים, כך הוא נוטה להעריך בצורה מוגזמת את המומחיות שלו בו."
        }
      ],
      quiz: [
        {
          question: "לפי מחקרם של Lyons (2021), בכמה אחוזונים מעריכים אנשים את יכולתם מעל הביצוע בפועל?",
          options: ["5 אחוזונים", "10 אחוזונים", "22 אחוזונים", "50 אחוזונים"],
          correctAnswer: 2
        }
      ]
    }
  ]
};
