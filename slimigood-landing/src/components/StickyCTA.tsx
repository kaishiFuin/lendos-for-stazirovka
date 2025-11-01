interface StickyCTAProps {
  label: string;
  onClick: () => void;
}

const StickyCTA = ({ label, onClick }: StickyCTAProps) => (
  <div className="fixed bottom-4 left-0 right-0 z-40 px-4 sm:hidden">
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center rounded-full bg-brand px-6 py-3 text-base font-semibold text-white shadow-lg"
    >
      {label}
    </button>
  </div>
);

export default StickyCTA;
