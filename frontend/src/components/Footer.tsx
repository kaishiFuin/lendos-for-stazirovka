import { useState } from 'react';

const Footer = () => {
  const [modal, setModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="mt-24 bg-black/40 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
        <span>© SlimiGood, 2024. Все права защищены.</span>
        <div className="flex gap-4">
          <button className="underline" type="button" onClick={() => setModal('privacy')}>
            Политика конфиденциальности
          </button>
          <button className="underline" type="button" onClick={() => setModal('terms')}>
            Пользовательское соглашение
          </button>
        </div>
      </div>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="max-w-3xl rounded-3xl border border-white/10 bg-neutral p-8 text-left text-sm text-white/70">
            <div className="flex items-center justify-between text-white">
              <h3 className="text-xl font-semibold">
                {modal === 'privacy' ? 'Политика конфиденциальности SlimiGood' : 'Пользовательское соглашение SlimiGood'}
              </h3>
              <button type="button" onClick={() => setModal(null)} className="rounded border border-white/20 px-3 py-1 text-xs">
                Закрыть
              </button>
            </div>
            <div className="mt-4 space-y-3 leading-relaxed">
              {modal === 'privacy' ? (
                <>
                  <p>Мы используем данные только для обработки заявок, обратной связи и доставки заказа.</p>
                  <p>Контактная информация хранится на защищённых серверах и передаётся партнёрам только с вашего согласия.</p>
                  <p>Вы можете запросить удаление персональных данных, отправив письмо на privacy@slimigood.example.</p>
                </>
              ) : (
                <>
                  <p>Оставляя заявку, вы подтверждаете достоверность информации и согласие на обработку персональных данных.</p>
                  <p>Продукт SlimiGood не является лекарственным средством. Перед применением рекомендуется консультация врача.</p>
                  <p>Все материалы сайта защищены авторским правом. Перепечатка только с письменного разрешения правообладателя.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
