export type Language = 'TR' | 'EN';

export const translations = {
  TR: {
    nav: {
      work: 'Çalışmalar',
      services: 'Hizmetler',
      contact: 'İletişim',
    },
    hero: {
      title: 'Modern web siteleri ve sesli yapay zekâ asistanları.',
      subtitle: 'İşletmenize özel tasarlıyor, kuruyor ve sürdürüyoruz.',
      scroll: 'Hizmetler',
      badge: 'Nova — AI Resepsiyonist',
      heading1: 'Telefonu açar.',
      heading2: 'Randevuyu alır.',
      heading3: 'Takvime işler.',
      sub: 'Nova, işletmenizin sesli yüzüdür. Arayanı karşılar, uygun zamanı ve kişiyi bulur, randevuyu takvime işler — gerektiğinde canlı ekibinize bağlar.',
      cta1: 'Nova\'yı şimdi dinle',
      cta2: '15 dk tanışma planla',
    },
    services: {
      label: 'Neler yapıyor',
      s1: {
        title: '7/24 Aramaları Karşılar',
        desc: 'Mesai saati fark etmeksizin her aramaya anında cevap verir. Aynı anda birden fazla görüşmeyi yönetebilir.',
      },
      s2: {
        title: 'Randevu Alır, Takvime İşler',
        desc: 'Müşterinin uygunluğunu sorar, birden fazla çalışan arasından doğru zamanı bulur ve randevuyu Cal.com takvimineişler.',
      },
      s3: {
        title: 'Canlı Ekibe Bağlar',
        desc: 'Gerektiğinde aramayı doğru kişiye aktarır. Basit bir soru mu, acil bir durum mu — bağlamı anlayarak yönlendirir.',
      },
      s4: {
        title: 'Her Aramadan Sonra Özet İletir',
        desc: 'Arama sonrası müşteri adı, talebi ve randevu detaylarını size iletir. CRM, webhook ve otomasyon araçlarına bağlanabilir.',
      },
      s5: {
        title: 'Mevcut Numaranıza Bağlanır',
        desc: 'Yeni bir hat almak zorunda değilsiniz. Nova, mevcut telefon numaranıza entegre olur ve akışınızı bozmadan çalışır.',
      },
    },
    whoFor: {
      label: 'Kimler için',
      heading: 'Telefon ve randevuyla büyüyen işletmeler için.',
      sub: 'Eğer işletmenizde telefon trafiği varsa ve her aramanın karşılanması gerekiyorsa — Nova bunun için tasarlandı.',
      items: [
        {
          title: 'Diş Klinikleri',
          desc: 'Randevu yoğunluğu yüksek, telefon trafiği kesintisiz. Nova her aramayı karşılar, doğru doktora yönlendirir.',
        },
        {
          title: 'Estetik Klinikler',
          desc: 'İlk izlenim kritik. Nova markanızın tonuyla konuşur, ilgi gören müşteriyi soğutmadan yönlendirir.',
        },
        {
          title: 'Danışmanlık & Hukuk & Muhasebe',
          desc: 'Yoğun günlerde cevapsız kalan aramalar fırsat kaybıdır. Nova mesai dışında da müşteriyi karşılar.',
        },
        {
          title: 'Çoklu Çalışan Yöneten İşletmeler',
          desc: 'Birden fazla doktor, uzman veya danışman varsa Nova uygunluk kontrolü yaparak doğru kişiyle eşleştirir.',
        },
      ],
    },
    howItWorks: {
      label: 'Nasıl çalışır',
      heading: 'Ne olduğu kadar ne olmadığı da önemli.',
      isLabel: 'Nova nedir',
      isNotLabel: 'Nova ne değildir',
      is: [
        '7/24 sesli AI resepsiyonist',
        'Markanızın tonuyla konuşan karşılama katmanı',
        'Randevu ve takvim yöneticisi',
        'Gerektiğinde canlı ekibe bağlanan sistem',
        'İşletmenize göre özelleştirilen akış',
      ],
      isNot: [
        'Robotik IVR tuş menüsü',
        'Tek tip, şablondan çıkmış bot',
        'Sadece mesai saatlerinde çalışan sistem',
        'Karmaşık kurulum gerektiren altyapı',
        'İşletme sahibini devre dışı bırakan araç',
      ],
      pricingLabel: 'Çalışma modeli',
      pricingHeading: 'Kurulum, entegrasyon, sonra aylık yönetim.',
      pricingDesc: 'Nova'yı devreye almak iki aşamadan oluşur: işletmenize özel yapılandırma ve entegrasyon aşaması, ardından aylık yönetim ve geliştirme. Fiyat detayları görüşmede netleşir.',
      pricingCta: 'Görüşme planla',
    },
    socialProof: {
      label: 'Geri bildirimler',
      heading: 'İlk klinik deneyimleri.',
      placeholder: 'Nova\'yı canlıya aldığımız işletmelerden kısa yorumlar ve operasyonel sonuçlar burada paylaşılacak.',
      coming: 'Yakında',
    },
    approach: {
      step1: {
        title: 'Anlama',
        desc: 'Kısa bir görüşmeyle ihtiyacınızı netleştiriyoruz.',
      },
      step2: {
        title: 'Kurma',
        desc: 'Tasarım ve geliştirme sürecini birlikte yürütüyoruz.',
      },
      step3: {
        title: 'Sürdürme',
        desc: 'Yayın sonrası bakım ve iyileştirmeler dahil.',
      },
    },
    work: {
      title: 'Seçili Çalışmalar',
      more: 'İlk projelerimiz hazırlanıyor.',
    },
    contact: {
      title: 'Bir proje konuşalım.',
      novaCtaLabel: 'Nova hakkında görüşelim',
      novaCtaDesc: 'İşletmeniz için nasıl çalışabileceğini 15 dakikada anlatalım.',
      novaCtaButton: '15 dk tanışma planla',
    },
    footer: {
      location: 'İstanbul',
    },
    retell: {
      promoTitle: 'Nova\'yı şimdi duyun.',
      promoDesc: 'Bu düğmeye basın, Nova sizi karşılasın.',
      promoCta: 'Aramayı başlat',
      promoClose: 'Kapat',
      postCallTitle: 'Nova\'yı nasıl buldunuz?',
      postCallDesc: 'İşletmenize özel bu sistemi 15 dakikalık görüşmede anlatalım.',
      postCallCta: 'Ücretsiz görüşme ayarla',
      postCallDismiss: 'Şimdi değil',
      agentTalking: 'Nova konuşuyor...',
      agentListening: 'Nova dinliyor...',
      live: 'Canlı',
      hangUp: 'Kapat',
      connecting: 'Bağlanıyor...',
      connected: 'Bağlandı',
      talkBtn: 'Nova\'yı Dene',
      errorConn: 'Bağlantı hatası. Lütfen tekrar deneyin.',
      errorMic: 'Mikrofon izni reddedildi.',
    },
  },
  EN: {
    nav: {
      work: 'Work',
      services: 'Services',
      contact: 'Contact',
    },
    hero: {
      title: 'Modern websites and voice AI assistants.',
      subtitle: 'We design, build, and maintain specifically for your business.',
      scroll: 'Services',
      badge: 'Nova — AI Receptionist',
      heading1: 'Answers the phone.',
      heading2: 'Books the appointment.',
      heading3: 'Syncs the calendar.',
      sub: 'Nova is the voice of your business. It greets callers, finds the right time and person, books appointments — and transfers to your team when needed.',
      cta1: 'Listen to Nova now',
      cta2: 'Book a 15-min intro call',
    },
    services: {
      label: 'What it does',
      s1: {
        title: 'Answers Calls 24/7',
        desc: 'Responds instantly regardless of business hours. Can handle multiple calls simultaneously.',
      },
      s2: {
        title: 'Books Appointments & Syncs Calendar',
        desc: 'Asks for availability, finds the right slot across multiple staff, and writes the appointment to your Cal.com calendar.',
      },
      s3: {
        title: 'Transfers to Your Team',
        desc: 'Routes calls to the right person when needed. Understands context — whether it\'s a simple question or an urgent matter.',
      },
      s4: {
        title: 'Sends a Summary After Every Call',
        desc: 'Delivers caller name, request, and appointment details after each call. Can connect to CRM, webhooks, and automation tools.',
      },
      s5: {
        title: 'Works With Your Existing Number',
        desc: 'No new phone line needed. Nova integrates with your current number and works without disrupting your flow.',
      },
    },
    whoFor: {
      label: 'Who it\'s for',
      heading: 'For businesses that grow through calls and appointments.',
      sub: 'If your business has phone traffic and every call needs to be answered — Nova was built for this.',
      items: [
        {
          title: 'Dental Clinics',
          desc: 'High appointment volume, constant phone traffic. Nova answers every call and routes to the right dentist.',
        },
        {
          title: 'Aesthetic Clinics',
          desc: 'First impressions matter. Nova speaks in your brand\'s tone and guides interested callers before they lose interest.',
        },
        {
          title: 'Consulting, Law & Accounting',
          desc: 'Missed calls on busy days mean missed opportunities. Nova greets clients even outside business hours.',
        },
        {
          title: 'Businesses with Multiple Staff',
          desc: 'If you have multiple doctors, specialists or consultants, Nova checks availability and matches the right person.',
        },
      ],
    },
    howItWorks: {
      label: 'How it works',
      heading: 'What it is matters as much as what it isn\'t.',
      isLabel: 'Nova is',
      isNotLabel: 'Nova is not',
      is: [
        '24/7 voice AI receptionist',
        'A greeting layer that speaks in your brand\'s tone',
        'Appointment and calendar manager',
        'A system that transfers to your team when needed',
        'A flow customized to your business',
      ],
      isNot: [
        'A robotic IVR button menu',
        'A one-size-fits-all template bot',
        'A system that only works during business hours',
        'Infrastructure requiring complex setup',
        'A tool that removes the business owner from the loop',
      ],
      pricingLabel: 'Pricing model',
      pricingHeading: 'Setup, integration, then monthly management.',
      pricingDesc: 'Deploying Nova involves two phases: a custom configuration and integration phase, followed by monthly management and improvement. Pricing details are finalized during the intro call.',
      pricingCta: 'Book a call',
    },
    socialProof: {
      label: 'Feedback',
      heading: 'First clinic experiences.',
      placeholder: 'Short feedback and operational results from businesses that have gone live with Nova will be shared here.',
      coming: 'Coming soon',
    },
    approach: {
      step1: {
        title: 'Understanding',
        desc: 'We clarify your needs through a brief meeting.',
      },
      step2: {
        title: 'Building',
        desc: 'We handle the design and development process together.',
      },
      step3: {
        title: 'Maintaining',
        desc: 'Includes post-launch maintenance and improvements.',
      },
    },
    work: {
      title: 'Selected Work',
      more: 'Our first projects are being prepared.',
    },
    contact: {
      title: "Let's talk about a project.",
      novaCtaLabel: 'Let\'s talk about Nova',
      novaCtaDesc: 'We\'ll walk you through how it works for your business in 15 minutes.',
      novaCtaButton: 'Book a 15-min intro call',
    },
    footer: {
      location: 'Istanbul',
    },
    retell: {
      promoTitle: 'Hear Nova now.',
      promoDesc: 'Press this button and let Nova greet you.',
      promoCta: 'Start the call',
      promoClose: 'Close',
      postCallTitle: 'How did you find Nova?',
      postCallDesc: 'Let us show you this system for your business in a 15-minute call.',
      postCallCta: 'Book a free call',
      postCallDismiss: 'Not now',
      agentTalking: 'Nova is talking...',
      agentListening: 'Nova is listening...',
      live: 'Live',
      hangUp: 'Hang up',
      connecting: 'Connecting...',
      connected: 'Connected',
      talkBtn: 'Try Nova',
      errorConn: 'Connection error. Please try again.',
      errorMic: 'Mic permission denied.',
    },
  },
};
