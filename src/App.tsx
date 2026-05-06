/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { Language } from './translations';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import WhoIsItFor from './components/WhoIsItFor';
import HowItWorks from './components/HowItWorks';
import SocialProof from './components/SocialProof';
import Approach from './components/Approach';
import Work from './components/Work';
import Contact from './components/Contact';
import Footer from './components/Footer';
import RetellWidget from './components/RetellWidget';

export default function App() {
  const [lang, setLang] = useState<Language>('TR');
  const novaCallRef = useRef<(() => void) | null>(null);

  return (
    <div className="relative min-h-screen bg-background selection:bg-white selection:text-black">
      <div className="grain-overlay" />
      <div className="decoration-circle-top" />
      <div className="decoration-circle-bottom" />

      <Navbar lang={lang} setLang={setLang} />

      <main>
        <Hero lang={lang} onListenNova={() => novaCallRef.current?.()} />
        <Services lang={lang} />
        <WhoIsItFor lang={lang} />
        <HowItWorks lang={lang} />
        <SocialProof lang={lang} />
        <Approach lang={lang} />
        <Work lang={lang} />
        <Contact lang={lang} />
      </main>

      <Footer lang={lang} />
      <RetellWidget lang={lang} triggerRef={novaCallRef} />
    </div>
  );
}
