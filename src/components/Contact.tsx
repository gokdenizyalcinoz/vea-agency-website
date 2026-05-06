import { motion } from 'motion/react';
import { Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { Language, translations } from '@/src/translations';

interface ContactProps {
  lang: Language;
}

import { motion } from 'motion/react';
import { Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { Language, translations } from '@/src/translations';

interface ContactProps {
  lang: Language;
}

const CAL_URL = 'https://cal.com/gokdeniz-yalcinoz-0rjbi3/15min';

export default function Contact({ lang }: ContactProps) {
  const t = translations[lang].contact;

  return (
    <section id="contact" className="py-20 md:py-40 px-8 bg-[#0A0A0A] z-10 relative">
      <div className="max-w-[1000px] mx-auto">

        {/* Nova mid-CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="border-t border-white/10 pt-10 mb-20 md:mb-32 grid grid-cols-1 md:grid-cols-2 gap-8 items-end"
        >
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted mb-5">
              {t.novaCtaLabel}
            </p>
            <p className="text-muted text-sm leading-relaxed max-w-sm">
              {t.novaCtaDesc}
            </p>
          </div>
          <div className="flex md:justify-end">
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-6 py-3 rounded-full hover:bg-white/90 active:scale-[0.98] transition-all duration-200"
            >
              {t.novaCtaButton}
            </a>
          </div>
        </motion.div>

        {/* Email */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-sm uppercase tracking-[0.4em] font-medium text-muted mb-12 text-center md:text-left"
        >
          {t.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="inline-block relative group"
        >
          <a
            href="mailto:hello@veaagency.com"
            className="text-3xl sm:text-5xl md:text-8xl font-serif tracking-tighter break-all md:break-normal"
          >
            hello@veaagency.com
          </a>
          <div className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-700 ease-in-out group-hover:w-full" />
        </motion.div>

        {/* Social links */}
        <div className="mt-16 md:mt-20 flex items-center justify-center md:justify-start gap-12 text-muted">
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
export default function Contact({ lang }: ContactProps) {
  const t = translations[lang].contact;

  return (
    <section id="contact" className="py-20 md:py-40 px-8 bg-[#0A0A0A] z-10 relative">
      <div className="max-w-[1000px] mx-auto">

        {/* Nova mid-CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="border-t border-white/10 pt-10 mb-20 md:mb-32 grid grid-cols-1 md:grid-cols-2 gap-8 items-end"
        >
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted mb-5">
              {t.novaCtaLabel}
            </p>
            <p className="text-muted text-sm leading-relaxed max-w-sm">
              {t.novaCtaDesc}
            </p>
          </div>
          <div className="flex md:justify-end">
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-white text-black text-sm font-medium px-6 py-3 rounded-full hover:bg-white/90 active:scale-[0.98] transition-all duration-200"
            >
              {t.novaCtaButton}
            </a>
          </div>
        </motion.div>

        {/* Email */}
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-sm uppercase tracking-[0.4em] font-medium text-muted mb-12 text-center md:text-left"
        >
          {t.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="inline-block relative group"
        >
          <a
            href="mailto:hello@veaagency.com"
            className="text-3xl sm:text-5xl md:text-8xl font-serif tracking-tighter break-all md:break-normal"
          >
            hello@veaagency.com
          </a>
          <div className="absolute -bottom-2 left-0 w-0 h-[1px] bg-white transition-all duration-700 ease-in-out group-hover:w-full" />
        </motion.div>

        {/* Social links */}
        <div className="mt-16 md:mt-20 flex items-center justify-center md:justify-start gap-12 text-muted">
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
