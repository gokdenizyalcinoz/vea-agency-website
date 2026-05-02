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

  const urlParams = new URLSearchParams(window.location.search);
  const clinicName = urlParams.get('demo') ?? undefined;
  const doctorName = urlParams.get('doctor') ?? undefined;
  const specialty = urlParams.get('specialty') ?? undefined;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (status === 'idle') setShowPromo(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

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
    retellClient.on('update', (update: { transcript?: { role: string; content: string }[] }) => {
      if (update.transcript) {
        setTranscript(
          update.transcript.map((t) => ({
            role: t.role as 'agent' | 'user',
            content: t.content,
          }))
        );
      }
    });
    retellClient.on('error', () => {
      setStatus('error');
      setErrorMsg(
        lang === 'TR'
          ? 'Baglanti hatasi olustu. Lutfen tekrar deneyin.'
          : 'Connection error. Please try again.'
      );
    });
    return () => {
      retellClient.removeAllListeners();
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
        throw new Error(data.error ?? 'Sunucu hatasi');
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
        message.toLowerCase().includes('permission') || message.toLowerCase().includes('mic')
          ? lang === 'TR'
            ? 'Mikrofon izni reddedildi. Tarayici ayarlarindan izin verin.'
            : 'Microphone permission denied.'
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
      {showPromo && status === 'idle' && (
        <div className="fixed bottom-28 right-6 z-40 bg-white text-black rounded-2xl shadow-2xl p-4 max-w-xs border border-black/10">
          <button
            onClick={() => setShowPromo(false)}
            className="absolute top-2 right-3 text-black/40 hover:text-black text-lg leading-none"
          >
            x
          </button>
          <p className="text-sm font-medium pr-4">
            {lang === 'TR' ? 'AI asistanimizi sesli olarak deneyin.' : 'Try our AI assistant with your voice.'}
          </p>
          <button
            onClick={() => { setShowPromo(false); startCall(); }}
            className="mt-2 text-xs underline underline-offset-2 text-black/60 hover:text-black"
          >
            {lang === 'TR' ? 'Simdi dene' : 'Try now'}
          </button>
        </div>
      )}

      {showPostCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white text-black rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center mx-auto mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {lang === 'TR' ? 'Nasil buldunuz?' : 'How was it?'}
            </h3>
            <p className="text-sm text-black/60 mb-6">
              {lang === 'TR'
                ? 'Klinginize ozel bu sistemi 15 dakikalik gorusmede anlatalim.'
                : 'Let us show you this system for your clinic in a 15-minute call.'}
            </p>
            
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-black text-white text-sm font-medium py-3 rounded-xl hover:bg-black/80 transition-colors mb-3 text-center"
            >
              {lang === 'TR' ? 'Ucretsiz gorusme ayarla' : 'Book a free call'}
            </a>
            <button
              onClick={() => setShowPostCall(false)}
              className="text-xs text-black/40 hover:text-black/70 transition-colors"
            >
              {lang === 'TR' ? 'Simdi degil' : 'Not now'}
            </button>
          </div>
        </div>
      )}

      {status === 'connected' && (
        <div className="fixed bottom-24 right-6 z-40 bg-white text-black rounded-2xl shadow-2xl border border-black/10 w-80 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-black/10">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${agentTalking ? 'bg-black animate-pulse' : 'bg-black/30'}`} />
              <span className="text-sm font-medium">
                {agentTalking
                  ? (lang === 'TR' ? 'Vera konusuyor...' : 'Vera is talking...')
                  : (lang === 'TR' ? 'Vera dinliyor...' : 'Vera is listening...')}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
              <span className="text-xs text-black/50 uppercase tracking-wide">
                {lang === 'TR' ? 'Canli' : 'Live'}
              </span>
            </div>
          </div>

          {recentTranscript.length > 0 && (
            <div ref={transcriptRef} className="px-4 py-3 max-h-40 overflow-y-auto space-y-2">
              {recentTranscript.map((line, i) => (
                <div key={i} className={`flex ${line.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <span className={`text-xs px-3 py-1.5 rounded-xl max-w-xs leading-relaxed ${
                    line.role === 'user' ? 'bg-black text-white' : 'bg-black/10 text-black'
                  }`}>
                    {line.content}
                  </span>
                </div>
              ))}
            </div>
          )}

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

      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {status === 'error' && errorMsg && (
          <div className="bg-white text-black text-xs px-3 py-2 rounded-xl shadow-lg border border-black/10 max-w-56 text-right">
            {errorMsg}
          </div>
        )}
        <button
          onClick={isIdle ? startCall : stopCall}
          disabled={status === 'connecting'}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium text-sm shadow-xl transition-all duration-200 ${
            status === 'connecting'
              ? 'bg-black/70 text-white cursor-wait'
              : status === 'connected'
              ? 'bg-white text-black border border-black/20 hover:bg-black/5'
              : 'bg-black text-white hover:bg-black/80 active:scale-95'
          }`}
        >
          {status === 'connecting' ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>{lang === 'TR' ? 'Baglanıyor...' : 'Connecting...'}</span>
            </>
          ) : status === 'connected' ? (
            <>
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span>{lang === 'TR' ? 'Baglandi' : 'Connected'}</span>
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V23h2v-2.06A9 9 0 0 0 21 12v-2h-2z"/>
              </svg>
              <span>{lang === 'TR' ? 'Asistanla Konus' : 'Talk to Assistant'}</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
