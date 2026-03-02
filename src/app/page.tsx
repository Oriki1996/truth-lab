import Link from 'next/link';
import { courseData } from '@/data/lessons';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-900" dir="rtl">
      <header className="bg-gradient-to-r from-blue-900 to-slate-900 text-white py-20 px-6 text-center shadow-2xl">
        <h1 className="text-6xl font-black mb-6">מעבדת האמת</h1>
        <p className="text-2xl text-blue-100 max-w-3xl mx-auto font-light leading-relaxed">
          גלו את המנגנונים שמאחורי הדיסאינפורמציה, הבוטים והמניפולציה הפוליטית. 
          11 מודולים של ידע אקדמי וכלים מעשיים.
        </p>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courseData.lessons.map((lesson) => (
            <Link 
              key={lesson.id} 
              href={'/lesson/' + lesson.id}
              className="group bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-blue-600 font-bold tracking-widest text-sm uppercase">שיעור {lesson.id}</span>
                <div className="flex gap-1 text-slate-200 group-hover:text-yellow-400 transition-colors">
                  ★ ★ ★
                </div>
              </div>
              <h3 className="text-2xl font-black mb-3 group-hover:text-blue-700">{lesson.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">{lesson.description}</p>
              <div className="flex items-center text-blue-600 font-bold">
                התחל ללמוד <span className="mr-2 group-hover:mr-4 transition-all">←</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
