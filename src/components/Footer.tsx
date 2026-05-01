import { Language, translations } from '@/src/translations';

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const t = translations[lang].footer;

  return (
    <footer className="w-full border-t border-white/5 mt-auto bg-[#080808]/50 backdrop-blur-sm z-10">
      <div className="max-w-[1000px] mx-auto px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-8">
          <span className="text-[11px] text-muted tracking-wider">
            {lang === 'TR' ? 'Bir proje konuşalım.' : "Let's talk about a project."}
          </span>
          <a
            href="mailto:hello@veaagency.com"
            className="text-xl font-serif hover:underline underline-offset-8 decoration-1 transition-all"
          >
            hello@veaagency.com
          </a>
        </div>
        <div className="text-[10px] text-[#444] tracking-widest uppercase">
          VEA Agency · {t.location} · © 2026
        </div>
      </div>
    </footer>
  );
}
