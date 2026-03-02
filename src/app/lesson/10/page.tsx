import Link from 'next/link';

export default function Lesson10() {
  return (
    <main className="min-h-screen bg-slate-50 p-8 text-right" dir="rtl">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <h1 className="text-3xl font-black text-slate-900 mb-6">שיעור 10: מלחמת הבוטים</h1>
        <p className="text-slate-700">תוכן השיעור יתווסף כאן בהמשך...</p>
        <Link href="/" className="mt-8 inline-block text-blue-600 font-bold underline">→ חזרה ללוח הבקרה</Link>
      </div>
    </main>
  );
}
