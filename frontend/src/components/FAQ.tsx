import { Disclosure } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import { faqItems } from '../data/content';

export function FAQ(): JSX.Element {
  return (
    <section className="py-20" id="faq">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-center text-3xl font-semibold">Ответы на популярные вопросы</h2>
        <div className="mt-10 space-y-4">
          {faqItems.map((item) => (
            <Disclosure key={item.question}>
              {({ open }) => (
                <div className="rounded-2xl border border-white/10 bg-slate-900/40">
                  <Disclosure.Button className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium">
                    <span>{item.question}</span>
                    <ChevronDown className={`h-5 w-5 transition ${open ? 'rotate-180 text-accent' : ''}`} />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-6 pb-6 text-sm text-white/70">
                    {item.answer}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
}
