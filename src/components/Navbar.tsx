import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Language, translations } from '@/src/translations';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export default function Navbar({ lang, setLang }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.work, href: '#work' },
    { name: t.services, href: '#services' },
    { name: t.contact, href: '#contact' },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-8 py-10',
          isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        )}
      >
        <div className="max-w-[1000px] mx-auto flex items-baseline justify-between">
          <a href="#" className="font-serif text-2xl tracking-tighter lowercase leading-none">
            vea
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] text-muted font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setLang(lang === 'TR' ? 'EN' : 'TR')}
              className="text-[10px] font-bold tracking-widest text-muted hover:text-foreground transition-colors uppercase"
            >
              {lang === 'TR' ? 'TR / EN' : 'EN / TR'}
            </button>
            <a
              href="#contact"
              className="px-4 py-2 border border-white/10 text-[11px] uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 text-foreground"
            >
              {t.contact}
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-muted hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="font-serif text-2xl tracking-tighter lowercase">vea</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col gap-8 text-3xl font-serif">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:pl-4 transition-all duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/10">
              <button
                onClick={() => {
                  setLang(lang === 'TR' ? 'EN' : 'TR');
                  setIsMobileMenuOpen(false);
                }}
                className="text-sm font-mono tracking-widest"
              >
                {lang === 'TR' ? 'TÜRKÇE / ENGLISH' : 'ENGLISH / TÜRKÇE'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
