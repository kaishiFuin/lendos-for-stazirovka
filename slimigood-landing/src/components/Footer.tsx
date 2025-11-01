export function Footer() {
  return (
    <footer className="bg-neutral text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold">SlimiGood</p>
          <p className="text-sm text-white/70">© {new Date().getFullYear()} SlimiGood. Все права защищены.</p>
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-white/70">
          <a href="#advantages" className="hover:text-white">
            Преимущества
          </a>
          <a href="#how-it-works" className="hover:text-white">
            Как работает
          </a>
          <a href="#calculator" className="hover:text-white">
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
}
