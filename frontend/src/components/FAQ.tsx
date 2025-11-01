import { useState } from 'react';

import { faqItems } from '../data/content';

type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/40">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-4 text-left text-slate-100"
      >
        <span className="text-base font-semibold">{question}</span>
        <span className="text-2xl text-brand">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen ? <p className="px-6 pb-6 text-sm text-slate-300">{answer}</p> : null}
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="section-title">FAQ</h2>
        <p className="mt-4 text-center text-slate-300">
          Ответы на частые вопросы о программе, оплате и гарантиях.
        </p>
        <div className="mt-10 space-y-4">
          {faqItems.map((item, index) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
