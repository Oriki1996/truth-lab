"use client";
import { useState } from 'react';
import Link from 'next/link';
import { courseData } from '@/data/lessons';
import InfoModal from '@/app/components/InfoModal';
import Quiz from '@/app/components/Quiz';

export default function Lesson1() {
  const [modalData, setModalData] = useState<{title: string, content: string} | null>(null);
  
  // משיכת נתוני שיעור 1 מהקובץ המרכזי
  const lesson = courseData.lessons.find(l => l.id === 1);

  if (!lesson) return <div className="p-8 text-center">השיעור לא נמצא...</div>;

  return (
    <main className="min-h-screen bg-slate-50 p-8" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm font-sans">שיעור {lesson.id}</span>
          <h1 className="text-5xl font-black mb-4 text-slate-900 leading-tight">{lesson.title}</h1>
          <p className="text-xl text-slate-600 leading-relaxed">{lesson.description}</p>
        </header>
        
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {lesson.modals.map((modal, index) => (
            <div 
              key={index}
              onClick={() => setModalData(modal)}
              className="group bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-2 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h2 className="text-2xl font-bold mb-3 text-slate-800">{modal.title}</h2>
              <p className="text-slate-500">לחץ להרחבה ומידע נוסף &larr;</p>
            </div>
          ))}
        </div>

        <section className="bg-slate-100/50 p-8 rounded-[3rem] border border-slate-200 mb-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">?</div>
            <h2 className="text-3xl font-black text-slate-900">בדיקת הבנה</h2>
          </div>
          <Quiz questions={lesson.quiz} />
        </section>

        <footer className="pt-8 border-t border-slate-200">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 font-bold text-lg hover:gap-4 transition-all">
            <span>&rarr;</span>
            <span>חזרה ללוח הבקרה</span>
          </Link>
        </footer>

        <InfoModal 
          isOpen={!!modalData} 
          onClose={() => setModalData(null)} 
          title={modalData?.title || ""} 
          content={modalData?.content || ""} 
        />
      </div>
    </main>
  );
}
