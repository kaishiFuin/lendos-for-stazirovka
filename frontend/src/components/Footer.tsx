import { useState } from 'react';

const privacyText = `Мы обрабатываем персональные данные строго в целях связи и оформления заказа. Данные не передаются третьим лицам без вашего согласия и могут быть удалены по запросу.`;
const termsText = `Оформляя заявку, вы подтверждаете, что ознакомлены с условиями оказания консультационных услуг SlimiGood. Оплата производится после подтверждения заказа менеджером.`;

export function Footer(): JSX.Element {
  const [modal, setModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="border-t border-white/10 bg-slate-950/80 py-10 text-sm text-white/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-white">SlimiGood</p>
          <p className="mt-2 max-w-md text-xs text-white/40">
            SlimiGood — нутрициологическая программа. Перед началом курса рекомендуем проконсультироваться с врачом. Не является лекарственным средством.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 text-xs text-white/50 md:items-end">
          <button type="button" className="hover:text-white" onClick={() => setModal('privacy')}>
            Политика конфиденциальности
          </button>
          <button type="button" className="hover:text-white" onClick={() => setModal('terms')}>
            Пользовательское соглашение
          </button>
          <span>© {new Date().getFullYear()} SlimiGood. Все права защищены.</span>
        </div>
      </div>
      {modal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4">
          <div className="max-w-lg rounded-3xl border border-white/10 bg-slate-900/90 p-8 text-left text-xs leading-relaxed text-white/70">
            <div className="mb-4 flex items-center justify-between text-sm text-white">
              <span>{modal === 'privacy' ? 'Политика конфиденциальности' : 'Пользовательское соглашение'}</span>
              <button type="button" className="text-white/50 hover:text-white" onClick={() => setModal(null)}>
                Закрыть
              </button>
            </div>
            <p>{modal === 'privacy' ? privacyText : termsText}</p>
          </div>
        </div>
      ) : null}
    </footer>
  );
}
