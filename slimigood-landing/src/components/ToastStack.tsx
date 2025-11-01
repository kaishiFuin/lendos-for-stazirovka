export interface ToastItem {
  id: string;
  message: string;
}

interface ToastStackProps {
  toasts: ToastItem[];
}

export const ToastStack = ({ toasts }: ToastStackProps) => (
  <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex w-full max-w-xs flex-col gap-3 text-sm">
    {toasts.map((toast) => (
      <div
        key={toast.id}
        className="toast-enter rounded-2xl border border-white/10 bg-slate-900/90 px-5 py-4 text-white/80 shadow-xl backdrop-blur"
      >
        {toast.message}
      </div>
    ))}
  </div>
);

export default ToastStack;
