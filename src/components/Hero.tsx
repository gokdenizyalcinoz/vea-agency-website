import { motion } from 'motion/react';
import { Language, translations } from '@/src/translations';

interface HeroProps {
  lang: Language;
  onListenNova?: () => void;
}

const CAL_URL = 'https://cal.com/veaagency/tanisma';

export default function Hero({ lang, onListenNova }: HeroProps) {
  const t = translations[lang].hero;

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-8 pt-32 md:pt-20 pb-16 overflow-hidden">
      <div className="max-w-[1000px] mx-auto w-full z-10">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-muted border border-white/10 rounded-full px-4 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 inline-block" />
            {t.badge}
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <h1 className="text-[clamp(2.6rem,7vw,5.5rem)] leading-[1.05] tracking-tight mb-8 font-serif">
            <span className="block">{t.heading1}</span>
            <span className="block italic opacity-80">{t.heading2}</span>
            <span className="block">{t.heading3}</span>
          </h1>
        </motion.div>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-base md:text-lg text-muted max-w-lg font-light leading-relaxed mb-12"
        >
          {t.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          {/* Primary CTA — triggers Retell */}
          <button
            onClick={onListenNova}
            className="group flex items-center gap-3 bg-white text-black text-sm font-medium px-6 py-3 rounded-full hover:bg-white/90 active:scale-[0.98] transition-all duration-200"
          >
            <span className="w-2 h-2 rounded-full bg-black/30 group-hover:bg-black/50 transition-colors" />
            {t.cta1}
          </button>

          {/* Secondary CTA — cal.com */}
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted hover:text-white transition-colors px-2 py-3 group"
          >
            {t.cta2}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="max-w-[1000px] mx-auto w-full mt-16 flex items-center gap-4 text-muted text-[11px] tracking-widest uppercase z-10"
      >
        <div className="w-8 h-px bg-muted/30" />
        <span>↓ {t.scroll}</span>
      </motion.div>
    </section>
  );
}
