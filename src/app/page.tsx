import { courseData } from '@/data/lessons';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 p-8 md:p-16" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <header className="mb-16 border-b border-slate-200 pb-10">
          <div className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-4 font-sans uppercase tracking-widest">
            Learning Lab
          </div>
          <h1 className="text-6xl font-black text-slate-900 leading-tight mb-4">
            {courseData.title}
          </h1>
          <p className="text-slate-500 text-2xl max-w-2xl">
            מרחב למידה אינטראקטיבי המשלב מחקר פסיכולוגי, ניתוח פוליטי וכלים לזיהוי מניפולציות בעידן הדיגיטלי.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {courseData.lessons.map((lesson) => (
            <Link href={`/lesson/${lesson.id}`} key={lesson.id} className="block group">
              <section className="h-full p-10 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
                {/* קישוט גרפי */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="flex justify-between items-start mb-6">
                  <span className="text-lg font-black text-blue-600 font-sans">0{lesson.id}</span>
                  <span className="text-xs font-bold bg-slate-100 px-3 py-1 rounded-full text-slate-500 uppercase">Interactive</span>
                </div>

                <h2 className="text-3xl font-bold text-slate-800 mb-4 group-hover:text-blue-700 transition-colors">
                  {lesson.title}
                </h2>
                
                <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                  {lesson.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {lesson.topics.map((topic, i) => (
                    <span key={i} className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-lg font-medium">
                      #{topic}
                    </span>
                  ))}
                </div>
              </section>
            </Link>
          ))}
        </div>

        <footer className="mt-20 text-center text-slate-400 font-medium">
          <p>© 2026 {courseData.title} | אוניברסיטת חיפה</p>
        </footer>
      </div>
    </main>
  );
}
