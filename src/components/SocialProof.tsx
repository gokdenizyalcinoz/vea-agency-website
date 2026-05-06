import { motion } from 'motion/react';
import { Language, translations } from '@/src/translations';

interface SocialProofProps {
  lang: Language;
}

export default function SocialProof({ lang }: SocialProofProps) {
  const t = translations[lang].socialProof;

  return (
    <section className="py-16 md:py-24 px-8 bg-[#0A0A0A] z-10 relative">
      <div className="max-w-[1000px] mx-auto">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted mb-10"
        >
          {t.label}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="border border-white/5 rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8"
        >
          {/* Placeholder quote block */}
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-serif tracking-tight mb-4 opacity-60">
              {t.heading}
            </h3>
            <p className="text-sm text-muted leading-relaxed max-w-md">
              {t.placeholder}
            </p>
          </div>

          {/* Coming soon badge */}
          <div className="shrink-0">
            <span className="inline-block text-[10px] font-mono uppercase tracking-[0.25em] text-muted border border-white/10 rounded-full px-4 py-2">
              {t.coming}
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
