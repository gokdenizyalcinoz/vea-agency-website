import { motion } from 'motion/react';
import { Language, translations } from '@/src/translations';

interface HowItWorksProps {
  lang: Language;
}

const CAL_URL = 'https://cal.com/gokdeniz-yalcinoz-0rjbi3/15min';

export default function HowItWorks({ lang }: HowItWorksProps) {
  const t = translations[lang].howItWorks;

  return (
    <section className="py-16 md:py-28 px-8 bg-[#0A0A0A] z-10 relative">
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

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-3xl md:text-4xl font-serif tracking-tight leading-snug mb-16 max-w-xl"
        >
          {t.heading}
        </motion.h2>

        {/* Is / Is Not grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-20">

          {/* IS */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
            className="border-t border-white/10 pt-6 pr-0 md:pr-16 pb-12"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/50 mb-6">
              {t.isLabel}
            </p>
            <ul className="space-y-4">
              {t.is.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                  <span className="mt-[5px] w-1 h-1 rounded-full bg-white/50 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* IS NOT */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="border-t border-white/10 pt-6 md:pl-8 pb-12"
          >
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/30 mb-6">
              {t.isNotLabel}
            </p>
            <ul className="space-y-4">
              {t.isNot.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted leading-relaxed">
                  <span className="mt-[5px] w-1 h-1 rounded-full bg-white/20 shrink-0" />
                  <span className="line-through decoration-white/20">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* Pricing model */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="border-t border-white/10 pt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-end"
        >
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted mb-5">
              {t.pricingLabel}
            </p>
            <h3 className="text-2xl md:text-3xl font-serif tracking-tight leading-snug mb-4">
              {t.pricingHeading}
            </h3>
            <p className="text-sm text-muted leading-relaxed max-w-sm">
              {t.pricingDesc}
            </p>
          </div>
          <div className="flex md:justify-end">
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm text-muted hover:text-white transition-colors"
            >
              {t.pricingCta}
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
