import { courseData } from '@/data/lessons';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white p-8 md:p-16" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b pb-6">
          <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
            {courseData.title}
          </h1>
          <p className="text-slate-500 text-lg mt-2">מעבדת למידה אינטראקטיבית - אוניברסיטת חיפה</p>
        </header>

        <div className="grid gap-6">
          {courseData.lessons.map((lesson) => (
            <Link href={`/lesson/${lesson.id}`} key={lesson.id} className="block">
              <section className="group p-6 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-bold text-blue-600 tracking-wide uppercase">שיעור {lesson.id}</span>
                  <span className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-400">טרם הושלם</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors">
                  {lesson.title}
                </h2>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                  {lesson.topics.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </section>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
