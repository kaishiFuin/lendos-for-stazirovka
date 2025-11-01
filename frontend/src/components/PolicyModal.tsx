import { X } from 'lucide-react';

type PolicyModalProps = {
  title: string;
  content: string[];
  onClose: () => void;
};

export function PolicyModal({ title, content, onClose }: PolicyModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4">
      <div className="card-surface relative max-w-2xl p-8 text-left">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-slate-800/70 p-1 text-slate-400 hover:text-slate-200"
          aria-label="Закрыть"
        >
          <X className="h-5 w-5" />
        </button>
        <h3 className="text-2xl font-semibold text-slate-50">{title}</h3>
        <div className="mt-4 space-y-4 text-sm text-slate-300">
          {content.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 rounded-full bg-brand px-6 py-2 text-sm font-semibold text-slate-50"
        >
          Понятно
        </button>
      </div>
    </div>
  );
}

export default PolicyModal;
