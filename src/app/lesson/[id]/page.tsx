"use client";
import Quiz from "@/app/components/Quiz";
import { courseData } from "@/data/lessons";
import Link from "next/link";
import { useParams } from "next/navigation";

// מיפוי חכם: חיבור בין מספרי השיעורים התיאורטיים למעבדות המעשיות שבנינו
const LAB_MAPPING: Record<number, { path: string, name: string, icon: string, desc: string, color: string }> = {
  1: { path: "/bias-lab", name: "מעבדת ההטיות", icon: "🧠", desc: "בחן את הפגיעות שלך למידע כוזב מבוסס רגש.", color: "bg-amber-600" },
  3: { path: "/echo-chamber", name: "הבריחה מחדר התהודה", icon: "🫧", desc: "האם תצליח לפרוץ את הבועה האלגוריתמית?", color: "bg-teal-600" },
  7: { path: "/deepfake-lab", name: "מעבדת זיהוי פלילי חזותי", icon: "👁️", desc: "התנסה באיתור זיופי AI בווידאו ובתמונות.", color: "bg-purple-600" },
  10: { path: "/bot-farm", name: "סימולטור חוות הבוטים", icon: "🏭", desc: "הכנס לנעליים של מפעיל רשת דיסאינפורמציה.", color: "bg-blue-600" },
};

export default function LessonPage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const lessonIndex = courseData.lessons.findIndex(l => l.id === id);
  const lesson = courseData.lessons[lessonIndex];
  const nextLesson = courseData.lessons[lessonIndex + 1];

  if (!lesson) return <div className="p-20 text-center text-2xl font-bold text-slate-500">השיעור לא נמצא...</div>;

  // האם לשיעור הזה יש מעבדה אינטראקטיבית מותאמת?
  const mappedLab = LAB_MAPPING[id];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-12 font-sans" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-slate-500 mb-8 inline-block hover:text-blue-600 font-bold transition-colors">
          &rarr; חזרה ללוח הבקרה
        </Link>
        
        <article className="bg-white p-10 md:p-14 rounded-[3rem] shadow-xl border border-slate-100 mb-10">
          <header className="mb-10 border-b border-slate-100 pb-10">
            <div className="text-blue-600 font-bold mb-4 tracking-wider">מודול {lesson.id}</div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">{lesson.title}</h1>
            <div className="flex flex-wrap gap-3">
              {lesson.topics?.map(t => (
                <span key={t} className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-sm font-bold">#{t}</span>
              ))}
            </div>
          </header>
          
          <div className="prose prose-lg md:prose-xl text-slate-700 leading-relaxed mb-10 whitespace-pre-wrap font-serif">
            {lesson.content}
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-sm text-slate-500 italic">
            <strong className="block mb-2 text-slate-700 not-italic">📚 מקורות:</strong>
            {lesson.bibliography}
          </div>
        </article>

        {/* שלב 2: החלפת הבוחן במעבדה */}
        {mappedLab ? (
          <section className="bg-slate-900 text-white p-12 rounded-[3rem] shadow-2xl mb-10 text-center relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-full h-3 ${mappedLab.color}`}></div>
            <div className="absolute -top-10 -right-10 text-9xl opacity-5 group-hover:scale-110 transition-transform duration-500">{mappedLab.icon}</div>
            
            <div className="relative z-10">
              <div className="text-7xl mb-6 drop-shadow-lg">{mappedLab.icon}</div>
              <h2 className="text-4xl font-black mb-4">משימת סיכום אינטראקטיבית</h2>
              <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                במקום מבחן אמריקאי, הגיע הזמן ליישם את התיאוריה שלמדת בשיעור זה בעולם האמיתי. 
                עבור עכשיו ל<strong>{mappedLab.name}</strong> כדי לסיים את המודול בהצלחה.
              </p>
              <Link href={mappedLab.path} className={`inline-block py-5 px-12 rounded-full font-black text-xl transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:scale-105 hover:shadow-xl ${mappedLab.color} text-white`}>
                הפעל את המעבדה 🚀
              </Link>
            </div>
          </section>
        ) : (
          <section className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl mb-10">
            <h2 className="text-3xl font-black mb-8 underline decoration-blue-500 decoration-4 underline-offset-8">בוחן המודול ★</h2>
            <Quiz questions={lesson.quiz} lessonId={lesson.id} />
          </section>
        )}

        {nextLesson && (
          <div className="text-left mt-16">
            <Link 
              href={'/lesson/' + nextLesson.id}
              className="inline-flex items-center gap-4 bg-white border-2 border-slate-200 text-slate-800 px-8 py-5 rounded-2xl font-black text-xl hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm hover:shadow-lg"
            >
              לשיעור הבא: {nextLesson.title} 
              <span className="text-2xl">&larr;</span>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
