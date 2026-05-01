import { motion } from 'motion/react';
import { Language, translations } from '@/src/translations';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const t = translations[lang].hero;

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-8 pt-32 md:pt-20 pb-16 overflow-hidden">
      <div className="max-w-[1000px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="md:col-span-9"
        >
          <h1 className="text-4xl sm:text-5xl md:text-[72px] leading-[1.15] md:leading-[1.05] tracking-tight mb-8">
            {lang === 'TR' ? (
              <>
                Modern web siteleri ve <br/>
                <span className="italic opacity-80 font-serif">sesli yapay zekâ</span> asistanları.
              </>
            ) : (
              <>
                Modern websites and <br/>
                <span className="italic opacity-80 font-serif">voice AI</span> assistants.
              </>
            )}
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-xl font-light">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="hidden md:flex md:col-span-3 flex-col items-end">
          <div className="w-px h-48 bg-gradient-to-b from-transparent via-muted/40 to-transparent relative">
            <div className="absolute top-1/2 -left-1 w-2 h-2 rounded-full bg-white/20 blur-[2px]"></div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="max-w-[1000px] mx-auto w-full px-8 mt-16 flex items-center gap-4 text-muted text-[11px] tracking-widest uppercase z-10"
      >
        <div className="w-8 h-px bg-muted/30"></div>
        <span>↓ {t.scroll}</span>
      </motion.div>
    </section>
  );
}
