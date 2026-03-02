"use client";
import Quiz from "@/app/components/Quiz";
import { courseData } from "@/data/lessons";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function LessonPage() {
  const params = useParams();
  const id = parseInt(params.id as string);
  const lessonIndex = courseData.lessons.findIndex(l => l.id === id);
  const lesson = courseData.lessons[lessonIndex];
  const nextLesson = courseData.lessons[lessonIndex + 1];

  if (!lesson) return <div className="p-20 text-center text-2xl">השיעור לא נמצא...</div>;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-12" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-blue-600 mb-8 inline-block hover:underline font-bold">→ חזרה ללוח הבקרה</Link>
        
        <article className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 mb-10">
          <header className="mb-8 border-b border-slate-100 pb-8">
            <h1 className="text-5xl font-black mb-4">{lesson.title}</h1>
            <div className="flex flex-wrap gap-2">
              {lesson.topics.map(t => (
                <span key={t} className="bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-xs font-bold">#{t}</span>
              ))}
            </div>
          </header>
          
          <div className="prose prose-lg text-slate-700 leading-loose mb-10 whitespace-pre-wrap">
            {lesson.content}
          </div>

          <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-400 italic">
            מקורות: {lesson.bibliography}
          </div>
        </article>

        <section className="bg-slate-900 text-white p-10 rounded-3xl shadow-2xl mb-10">
          <h2 className="text-3xl font-bold mb-8 italic underline decoration-blue-500">בוחן המודול ★</h2>
          <Quiz questions={lesson.quiz} lessonId={lesson.id} />
        </section>

        {nextLesson && (
          <div className="text-left">
            <Link 
              href={'/lesson/' + nextLesson.id}
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-lg"
            >
              לשיעור הבא: {nextLesson.title} ←
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
