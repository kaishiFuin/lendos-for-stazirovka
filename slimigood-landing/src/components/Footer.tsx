const Footer = () => (
  <footer className="bg-slate-950 py-12" id="footer">
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-base font-semibold text-white">SlimiGood</p>
        <p className="mt-1">© {new Date().getFullYear()} SlimiGood. Все права защищены.</p>
      </div>
      <div className="flex flex-wrap gap-4">
        <a href="#offer" className="hover:text-accent">
          Оффер
        </a>
        <a href="#faq" className="hover:text-accent">
          FAQ
        </a>
        <a href="#guarantees" className="hover:text-accent">
          Гарантии
        </a>
        <a href="mailto:hello@slimigood.ru" className="hover:text-accent">
          Поддержка
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
