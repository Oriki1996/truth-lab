import Quiz from "@/app/components/Quiz";
import { courseData } from "@/data/lessons";
import Link from "next/link";

export default function LessonPage() {
  const lessonId = 10; // שנה את זה לכל דף
  const lesson = courseData.lessons.find(l => l.id === lessonId);
  
  if (!lesson) return <div className="p-10 text-center">שיעור לא נמצא</div>;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 p-6 md:p-12 font-sans" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8 text-blue-600">
          <Link href="/" className="hover:underline">→ חזרה למעבדה</Link>
        </nav>
        
        <header className="mb-12">
          <h1 className="text-5xl font-black mb-4 text-slate-900 leading-tight">{lesson.title}</h1>
          <p className="text-xl text-slate-600 border-r-4 border-blue-500 pr-4">{lesson.description}</p>
        </header>

        <section className="prose prose-lg max-w-none mb-12 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <h2 className="text-2xl font-bold mb-6 text-blue-800">מה נלמד בשיעור זה?</h2>
          <p className="leading-relaxed text-slate-700 whitespace-pre-wrap">{lesson.content}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {lesson.topics.map(t => (
              <span key={t} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">#{t}</span>
            ))}
          </div>
        </section>

        <section className="bg-slate-900 text-white p-8 rounded-2xl shadow-2xl overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <span className="text-yellow-400">★</span> בוחן מהיר: צבור כוכבים
            </h2>
            <Quiz questions={lesson.quiz} />
          </div>
        </section>
      </div>
    </main>
  );
}
