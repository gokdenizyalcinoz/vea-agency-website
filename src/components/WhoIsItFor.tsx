import { motion } from 'motion/react';
import { Language, translations } from '@/src/translations';

interface WhoIsItForProps {
  lang: Language;
}

export default function WhoIsItFor({ lang }: WhoIsItForProps) {
  const t = translations[lang].whoFor;

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

        {/* Heading + sub */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-serif tracking-tight leading-snug"
          >
            {t.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-muted text-base leading-relaxed md:pt-1"
          >
            {t.sub}
          </motion.p>
        </div>

        {/* Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {t.items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="border-t border-white/10 pt-6 pb-10 pr-8 group"
            >
              <h3 className="text-base font-medium mb-2 group-hover:text-white transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
