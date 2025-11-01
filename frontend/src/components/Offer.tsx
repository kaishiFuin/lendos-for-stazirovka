import { Variant } from '../lib/ab';

const Offer = ({ variant }: { variant: Variant }) => (
  <section className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-br from-primary to-accent px-6 py-16 text-neutral">
    <h2 className="text-3xl font-bold">Специальное предложение недели</h2>
    <p className="mt-4 text-lg">
      Только сейчас получите SlimiGood {variant === 'experiment' ? 'в комплексе PRO' : 'с базовой поддержкой'} со скидкой 45% и бесплатной
      консультацией нутрициолога. Оставьте заявку и зафиксируйте цену.
    </p>
    <ul className="mt-8 grid gap-4 md:grid-cols-2">
      <li className="rounded-xl bg-white/80 p-6">
        <p className="text-xl font-semibold">Доставка в день заказа</p>
        <p className="text-sm text-neutral/70">Курьер привезёт набор в удобное время по городу и пригородам.</p>
      </li>
      <li className="rounded-xl bg-white/80 p-6">
        <p className="text-xl font-semibold">Персональная связка нутрициолога</p>
        <p className="text-sm text-neutral/70">Подберём схему применения и питание под ваш график.</p>
      </li>
      <li className="rounded-xl bg-white/80 p-6">
        <p className="text-xl font-semibold">Гарантия возврата</p>
        <p className="text-sm text-neutral/70">Если результат не устроит — вернём деньги в течение 30 дней.</p>
      </li>
      <li className="rounded-xl bg-white/80 p-6">
        <p className="text-xl font-semibold">Контроль прогресса</p>
        <p className="text-sm text-neutral/70">Напоминания в мессенджере и поддержка 24/7 на каждом этапе.</p>
      </li>
    </ul>
  </section>
);

export default Offer;
