import { useState, useEffect, useRef } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';
import { Language } from '../translations';

type CallStatus = 'idle' | 'connecting' | 'connected' | 'error';

interface TranscriptLine {
  role: 'agent' | 'user';
  content: string;
}

interface RetellWidgetProps {
  lang: Language;
}

const BACKEND_URL = '/api/create-call';
const CAL_URL = 'https://cal.com/veaagency/tanisma';

const retellClient = new RetellWebClient();

export default function RetellWidget({ lang }: RetellWidgetProps) {
  const [status, setStatus] = useState<CallStatus>('idle');
  const [agentTalking, setAgentTalking] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptLine[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPostCall, setShowPostCall] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);

  // URL param parsing for personalized demos
  const urlParams = new URLSearchParams(window.location.search);
  const clinicName = urlParams.get('demo') ?? undefined;
  const doctorName = urlParams.get('doctor') ?? undefined;
  const specialty = urlParams.get('specialty') ?? undefined;

  // Auto-promo popup after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === 'idle') setShowPromo(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, [status]);

  // Auto-scroll transcript
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  // Retell event listeners
  useEffect(() => {
    retellClient.on('call_started', () => {
      setStatus('connected');
      setShowPromo(false);
    });

    retellClient.on('call_ended', () => {
      setStatus('idle');
      setShowPostCall(true);
    });

    retellClient.on('agent_start_talking', () => setAgentTalking(true));
    retellClient.on('agent_stop_talking', () => setAgentTalking(false));

    retellClient.on('update', (update) => {
      if (update.transcript) {
        setTranscript(
          update.transcript.map((t: { role: string; content: string }) => ({
            role: t.role as 'agent' | 'user',
            content: t.content,
          }))
        );
      }
    });

    retellClient.on('error', (err) => {
      console.error('Retell error:', err);
      setStatus('error');
      setErrorMsg(
        lang === 'TR'
          ? 'Bağlantı hatası oluştu. Lütfen tekrar deneyin.'
          : 'Connection error. Please try again.'
      );
    });

    return () => {
      retellClient.off('call_started');
      retellClient.off('call_ended');
      retellClient.off('agent_start_talking');
      retellClient.off('agent_stop_talking');
      retellClient.off('update');
      retellClient.off('error');
    };
  }, [lang]);

  async function startCall() {
    setStatus('connecting');
    setErrorMsg('');
    setTranscript([]);
    setShowPostCall(false);

    try {
      const res = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(clinicName && { clinic_name: clinicName }),
          ...(doctorName && { doctor_name: doctorName }),
          ...(specialty && { specialty }),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Sunucu hatası');
      }

      const { access_token } = await res.json();

      await retellClient.startCall({
        accessToken: access_token,
        sampleRate: 24000,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Bilinmeyen hata';
      setStatus('error');
      setErrorMsg(
        message.includes('Permission') || message.includes('permission') || message.includes('mic')
          ? (lang === 'TR'
              ? 'Mikrofon izni reddedildi. Tarayıcı ayarlarından izin verin.'
              : 'Microphone permission denied. Please allow access in browser settings.')
          : message
      );
    }
  }

  function stopCall() {
    retellClient.stopCall();
    setStatus('idle');
    setShowPostCall(true);
  }

  const isIdle = status === 'idle' || status === 'error';
  const recentTranscript = transcript.slice(-5);

  return (
    <>
      {/* Promo popup */}
      {showPromo && status === 'idle' && (
        <div className="fixed bottom-28 right-6 z-40 bg-white text-black rounded-2xl shadow-2xl p-4 max-w-xs border border-black/10 animate-fade-in">
          <button
            onClick={() => setShowPromo(false)}
            className="absolute top-2 right-3 text-black/40 hover:text-black text-lg leading-none"
          >
            ×
          </button>
          <p className="text-sm font-medium pr-4">
            {lang === 'TR'
              ? 'AI asistanımızı sesli olarak deneyin.'
              : 'Try our AI assistant with your voice.'}
          </p>
          <button
            onClick={() => { setShowPromo(false); startCall(); }}
            className="mt-2 text-xs underline underline-offset-2 text-black/60 hover:text-black"
          >
            {lang === 'TR' ? 'Şimdi dene' : 'Try now'}
          </button>
        </div>
      )}

      {/* Post-call CTA */}
      {showPostCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white text-black rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center mx-auto mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {lang === 'TR' ? 'Nasıl buldunuz?' : 'How was it?'}
            </h3>
            <p className="text-sm text-black/60 mb-6">
              {lang === 'TR'
                ? 'Kliniğinize özel bu sistemi 15 dakikalık görüşmede anlatalım.'
                : 'Let us show you this system for your clinic in a 15-minute call.'}
            </p>
            
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-black text-white text-sm font-medium py-3 rounded-xl hover:bg-black/80 transition-colors mb-3"
            >
              {lang === 'TR' ? 'Ücretsiz görüşme ayarla' : 'Book a free call'}
            </a>
            <button
              onClick={() => setShowPostCall(false)}
              className="text-xs text-black/40 hover:text-black/70 transition-colors"
            >
              {lang === 'TR' ? 'Şimdi değil' : 'Not now'}
            </button>
          </div>
        </div>
      )}

      {/* Active call panel */}
      {status === 'connected' && (
        <div className="fixed bottom-24 right-6 z-40 bg-white text-black rounded-2xl shadow-2xl border border-black/10 w-80 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-black/10">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${agentTalking ? 'bg-black animate-pulse' : 'bg-black/30'}`} />
              <span className="text-sm font-medium">
                {agentTalking
                  ? (lang === 'TR' ? 'Vera konuşuyor...' : 'Vera is talking...')
                  : (lang === 'TR' ? 'Vera dinliyor...' : 'Vera is listening...')}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
              <span className="text-xs text-black/50 uppercase tracking-wide">
                {lang === 'TR' ? 'Canlı' : 'Live'}
              </span>
            </div>
          </div>

          {/* Transcript */}
          {recentTranscript.length > 0 && (
            <div
              ref={transcriptRef}
              className="px-4 py-3 max-h-40 overflow-y-auto space-y-2"
            >
              {recentTranscript.map((line, i) => (
                <div key={i} className={`flex ${line.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <span className={`text-xs px-3 py-1.5 rounded-xl max-w-[90%] leading-relaxed ${
                    line.role === 'user'
                      ? 'bg-black text-white'
                      : 'bg-black/8 text-black'
                  }`}>
                    {line.content}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Hang up */}
          <div className="px-4 py-3 border-t border-black/10">
            <button
              onClick={stopCall}
              className="w-full bg-black text-white text-sm font-medium py-2.5 rounded-xl hover:bg-black/80 transition-colors"
            >
              {lang === 'TR' ? 'Kapat' : 'Hang up'}
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {/* Error message */}
        {status === 'error' && errorMsg && (
          <div className="bg-white text-black text-xs px-3 py-2 rounded-xl shadow-lg border border-black/10 max-w-56 text-right">
            {errorMsg}
          </div>
        )}

        <button
          onClick={isIdle ? startCall : stopCall}
          disabled={status === 'connecting'}
          className={`
            flex items-center gap-2 px-5 py-3 rounded-2xl font-medium text-sm shadow-xl transition-all duration-200
            ${status === 'connecting'
              ? 'bg-black/70 text-white cursor-wait'
              : status === 'connected'
              ? 'bg-white text-black border border-black/20 hover:bg-black/5'
              : 'bg-black text-white hover:bg-black/80 active:scale-95'
            }
          `}
        >
          {status === 'connecting' ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>{lang === 'TR' ? 'Bağlanıyor...' : 'Connecting...'}</span>
            </>
          ) : status === 'connected' ? (
            <>
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span>{lang === 'TR' ? 'Bağlandı' : 'Connected'}</span>
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V23h2v-2.06A9 9 0 0 0 21 12v-2h-2z"/>
              </svg>
              <span>{lang === 'TR' ? 'Asistanla Konuş' : 'Talk to Assistant'}</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
