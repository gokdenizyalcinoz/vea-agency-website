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
  ];

  return (
    <section id="services" className="py-24 px-8 bg-[#0A0A0A] z-10 relative">
      <div className="max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="border-t border-white/10 pt-6 group"
            >
              <span className="text-[10px] font-mono text-muted mb-4 block">{service.num}</span>
              <h3 className="font-serif text-2xl mb-3 group-hover:text-white transition-colors tracking-tight">
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
