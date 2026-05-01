import { motion } from 'motion/react';
import { Language, translations } from '@/src/translations';

interface WorkProps {
  lang: Language;
}

export default function Work({ lang }: WorkProps) {
  const t = translations[lang].work;

  return (
    <section id="work" className="py-24 md:py-40 px-8 bg-[#0A0A0A] z-10 relative">
      <div className="max-w-[1000px] mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-sm uppercase tracking-[0.4em] font-medium text-muted mb-16 text-center md:text-left"
        >
          {t.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="border-t border-white/10 pt-16 pb-8 flex flex-col items-center md:items-start gap-4"
        >
          <span className="text-[10px] font-mono text-muted tracking-widest">
            {lang === 'TR' ? 'YAKINDA' : 'COMING SOON'}
          </span>
          <p className="font-serif italic text-3xl md:text-5xl tracking-tight max-w-2xl text-center md:text-left leading-tight">
            {t.more}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
