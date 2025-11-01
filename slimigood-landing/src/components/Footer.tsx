export const Footer = () => (
  <footer className="section-container border-t border-white/10 bg-slate-950/80 py-10 text-sm text-white/60" id="footer">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-semibold text-white">SlimiGood</p>
        <p>© {new Date().getFullYear()} SlimiGood. Все права защищены.</p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <a href="#offer" className="hover:text-white">
          Оффер
        </a>
        <a href="#faq" className="hover:text-white">
          FAQ
        </a>
        <a href="mailto:hello@slimigood.ru" className="hover:text-white">
          hello@slimigood.ru
        </a>
        <span>ИНН 7723344556</span>
      </div>
    </div>
  </footer>
);

export default Footer;
