export const Footer = () => (
  <footer className="border-t border-white/10 bg-slate-950/80 py-10">
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="text-lg font-semibold text-white">SlimiGood</div>
        <p>© {new Date().getFullYear()} SlimiGood. Все права защищены.</p>
      </div>
      <nav className="flex flex-wrap gap-4 text-white/70">
        <a href="#how" className="hover:text-white">
          Как работает
        </a>
        <a href="#calc" className="hover:text-white">
          Калькулятор
        </a>
        <a href="#offer" className="hover:text-white">
          Оффер
        </a>
        <a href="#faq" className="hover:text-white">
          FAQ
        </a>
      </nav>
    </div>
  </footer>
);
