import { motion } from 'motion/react';
import { Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { Language, translations } from '@/src/translations';

interface ContactProps {
  lang: Language;
}

export default function Contact({ lang }: ContactProps) {
  const t = translations[lang].contact;

  return (
    <section id="contact" className="py-24 md:py-64 px-8 bg-[#0A0A0A] z-10 relative">
      <div className="max-w-[1000px] mx-auto text-center md:text-left">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-sm uppercase tracking-[0.4em] font-medium text-muted mb-12"
        >
          {t.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block relative group"
        >
          <a
            href="mailto:hello@veaagency.com"
            className="text-4xl md:text-8xl font-serif tracking-tighter"
          >
            hello@veaagency.com
          </a>
          <div className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-700 ease-in-out group-hover:w-full" />
        </motion.div>

        <div className="mt-24 flex items-center justify-center md:justify-start gap-12 text-muted">
          <a href="#" className="flex items-center gap-2 text-xs uppercase tracking-widest hover:text-white transition-colors group">
            <MessageCircle size={14} className="group-hover:scale-110 transition-transform" /> WhatsApp
          </a>
          <a href="#" className="flex items-center gap-2 text-xs uppercase tracking-widest hover:text-white transition-colors group">
            <Linkedin size={14} className="group-hover:scale-110 transition-transform" /> LinkedIn
          </a>
          <a href="#" className="flex items-center gap-2 text-xs uppercase tracking-widest hover:text-white transition-colors group">
            <Instagram size={14} className="group-hover:scale-110 transition-transform" /> Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
