"use client";
import Link from 'next/link';
import { courseData } from '@/data/lessons';
import Quiz from '@/app/components/Quiz';

export default function Lesson1() {
  const lesson = courseData.lessons[0];

  return (
    <main className="min-h-screen bg-slate-50 p-8 md:p-16" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <Link href="/" className="text-blue-600 font-bold flex items-center gap-2 hover:gap-4 transition-all text-lg">
            <span>&rarr;</span> חזרה
          </Link>
          <div className="bg-white px-6 py-2 rounded-full shadow-sm border border-slate-100 font-bold text-slate-500 font-sans">
            MODULE 01
          </div>
        </div>

        <header className="mb-16">
          <h1 className="text-6xl font-black text-slate-900 mb-6 leading-tight">{lesson.title}</h1>
          <p className="text-2xl text-slate-600 leading-relaxed max-w-2xl">{lesson.description}</p>
        </header>

        <section className="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32"></div>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
            <span className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-xl">💡</span>
            משימת הבנה עמוקה
          </h2>
          <Quiz questions={lesson.quiz} />
        </section>
      </div>
    </main>
  );
}