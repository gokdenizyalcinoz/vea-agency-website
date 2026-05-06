import { motion } from 'motion/react';
import { Language, translations } from '@/src/translations';

interface ServicesProps {
  lang: Language;
}

export default function Services({ lang }: ServicesProps) {
  const t = translations[lang].services;

  const services = [
    { num: '01', ...t.s1 },
    { num: '02', ...t.s2 },
    { num: '03', ...t.s3 },
    { num: '04', ...t.s4 },
    { num: '05', ...t.s5 },
  ];

  return (
    <section id="services" className="py-16 md:py-24 px-8 bg-[#0A0A0A] z-10 relative">
      <div className="max-w-[1000px] mx-auto">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted mb-12"
        >
          {t.label}
        </motion.p>

        {/* Cards — 2 col on md, 3 col on lg, first card full-width feel via col-span */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="border-t border-white/10 pt-6 pb-10 pr-8 group"
            >
              <span className="text-[10px] font-mono text-muted/40 mb-4 block">{service.num}</span>
              <h3 className="font-serif text-xl mb-3 group-hover:text-white transition-colors tracking-tight leading-snug">
                {service.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
