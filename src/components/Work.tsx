import { motion } from 'motion/react';
import { Language, translations } from '@/src/translations';

interface WorkProps {
  lang: Language;
}

export default function Work({ lang }: WorkProps) {
  const t = translations[lang].work;

  const projects = [
    {
      name: 'Lumina Arch',
      client: '—',
      desc: lang === 'TR' ? 'Mimarlık stüdyosu portfolyo sitesi.' : 'Architecture studio portfolio site.',
      year: '2025',
      color: 'bg-zinc-900',
    },
    {
      name: 'Nexa Flow',
      client: '—',
      desc: lang === 'TR' ? 'Fintek girişimi için marka kimliği ve web sitesi.' : 'Brand identity and website for fintech startup.',
      year: '2024',
      color: 'bg-zinc-800',
    },
  ];

  return (
    <section id="work" className="py-24 md:py-48 px-8 bg-[#0A0A0A] z-10 relative">
      <div className="max-w-[1000px] mx-auto">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm uppercase tracking-[0.4em] font-medium text-muted mb-24 text-center md:text-left"
        >
          {t.title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="group cursor-pointer"
            >
              <div className={`aspect-[4/3] w-full ${project.color} mb-8 overflow-hidden relative`}>
                 <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-500" />
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-3xl md:text-4xl font-serif">{project.name}</h3>
                <span className="text-xs font-mono text-muted">{project.year}</span>
              </div>
              <p className="text-sm text-muted">
                {project.client} {project.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-24 text-xs tracking-widest text-muted/50 text-center"
        >
          {t.more}
        </motion.p>
      </div>
    </section>
  );
}
