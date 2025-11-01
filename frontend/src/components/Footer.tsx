type FooterProps = {
  onOpenPolicy: () => void;
  onOpenAgreement: () => void;
};

export function Footer({ onOpenPolicy, onOpenAgreement }: FooterProps) {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} SlimiGood. Все права защищены.</p>
        <div className="flex items-center gap-4">
          <button type="button" className="underline" onClick={onOpenPolicy}>
            Политика конфиденциальности
          </button>
          <button type="button" className="underline" onClick={onOpenAgreement}>
            Пользовательское соглашение
          </button>
          <a href="mailto:hello@slimigood.example" className="underline">
            hello@slimigood.example
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
