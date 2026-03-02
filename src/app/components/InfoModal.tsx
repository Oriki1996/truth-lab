"use client";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export default function InfoModal({ isOpen, onClose, title, content }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative animate-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-4 left-4 text-slate-400 hover:text-slate-600 text-2xl">?</button>
        <h2 className="text-3xl font-black text-slate-900 mb-4">{title}</h2>
        <div className="text-slate-700 leading-relaxed text-lg">
          {content}
        </div>
        <button onClick={onClose} className="mt-8 w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-colors">?????, ????!</button>
      </div>
    </div>
  );
}
