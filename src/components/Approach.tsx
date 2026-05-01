import { motion } from 'motion/react';
import { Language, translations } from '@/src/translations';

interface ApproachProps {
  lang: Language;
}

export default function Approach({ lang }: ApproachProps) {
  const t = translations[lang].approach;

  const steps = [
    { num: '01', ...t.step1 },
    { num: '02', ...t.step2 },
    { num: '03', ...t.step3 },
  ];

  return (
    <section className="py-16 md:py-32 px-8 bg-[#0A0A0A] z-10 relative">
      <div className="max-w-[1000px] mx-auto">
        <div className="flex flex-col gap-16 md:gap-20">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8 md:gap-24"
            >
              <span className="text-4xl md:text-5xl font-serif text-muted/20 italic">
                {step.num}
              </span>
              <div className="max-w-[600px]">
                <h3 className="text-3xl md:text-5xl mb-6 tracking-tight italic">
                  {step.title}
                </h3>
                <p className="text-muted text-lg md:text-xl leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
