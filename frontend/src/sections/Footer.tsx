import { useEffect, useState } from 'react';
import { Container } from '../components/Container';
import { analytics } from '../lib/analytics';

function Modal({ title, content, onClose }: { title: string; content: string; onClose: () => void }) {
  if (!content) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/70 p-6">
      <div className="max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-dark">{title}</h3>
          <button onClick={onClose} className="text-sm font-semibold text-primary">
            Закрыть
          </button>
        </div>
        <p className="mt-4 whitespace-pre-line text-sm text-dark/70">{content}</p>
      </div>
    </div>
  );
}

const policyText = `Мы обрабатываем персональные данные для связи по заявке и подбора программы. Данные не передаются третьим лицам, кроме платежного провайдера и кураторов SlimiGood. Вы можете запросить удаление данных, написав на privacy@slimigood.ru.`;

const agreementText = `Заполняя заявку, вы подтверждаете, что вам больше 18 лет, вы ознакомлены с программой SlimiGood и согласны соблюдать рекомендации кураторов. SlimiGood не является медицинской услугой. Перед началом программы проконсультируйтесь с врачом.`;

export function Footer() {
  const [modal, setModal] = useState<'policy' | 'agreement' | null>(null);
  useEffect(() => {
    analytics.view('footer');
  }, []);

  return (
    <footer data-section="footer" className="bg-dark py-12 text-white">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold">SlimiGood</p>
            <p className="mt-1 text-sm text-white/70">Контроль веса без стресса и жёстких диет</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-white/70">
            <button onClick={() => setModal('policy')} className="underline-offset-4 hover:underline">
              Политика конфиденциальности
            </button>
            <button onClick={() => setModal('agreement')} className="underline-offset-4 hover:underline">
              Пользовательское соглашение
            </button>
            <span>© {new Date().getFullYear()} SlimiGood</span>
          </div>
        </div>
      </Container>
      {modal === 'policy' && <Modal title="Политика конфиденциальности" content={policyText} onClose={() => setModal(null)} />}
      {modal === 'agreement' && (
        <Modal title="Пользовательское соглашение" content={agreementText} onClose={() => setModal(null)} />
      )}
    </footer>
  );
}
