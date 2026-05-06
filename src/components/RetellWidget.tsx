import { useState, useEffect, useRef } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';
import { Language, translations } from '../translations';

type CallStatus = 'idle' | 'connecting' | 'connected' | 'error';
interface TranscriptLine { role: 'agent' | 'user'; content: string; }
interface RetellWidgetProps {
  lang: Language;
  /** Call this ref setter from parent so Hero can trigger startCall */
  triggerRef?: React.MutableRefObject<(() => void) | null>;
}

const BACKEND_URL = '/api/create-call';
const CAL_URL = 'https://cal.com/gokdeniz-yalcinoz-0rjbi3/15min';
const retellClient = new RetellWebClient();

export default function RetellWidget({ lang, triggerRef }: RetellWidgetProps) {
  const t = translations[lang].retell;
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

  // Show promo bubble after 10s if still idle
  useEffect(() => {
    const timer = setTimeout(() => { if (status === 'idle') setShowPromo(true); }, 10000);
    return () => clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    if (transcriptRef.current) transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
  }, [transcript]);

  useEffect(() => {
    retellClient.on('call_started', () => { setStatus('connected'); setShowPromo(false); });
    retellClient.on('call_ended', () => { setStatus('idle'); setShowPostCall(true); });
    retellClient.on('agent_start_talking', () => setAgentTalking(true));
    retellClient.on('agent_stop_talking', () => setAgentTalking(false));
    retellClient.on('update', (update: { transcript?: { role: string; content: string }[] }) => {
      if (update.transcript) {
        setTranscript(update.transcript.map(line => ({
          role: line.role as 'agent' | 'user',
          content: line.content,
        })));
      }
    });
    retellClient.on('error', () => {
      setStatus('error');
      setErrorMsg(t.errorConn);
    });
    return () => { retellClient.removeAllListeners(); };
  }, [lang, t.errorConn]);

  async function startCall() {
    setStatus('connecting');
    setErrorMsg('');
    setTranscript([]);
    setShowPostCall(false);
    setShowPromo(false);
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
      if (!res.ok) { const d = await res.json(); throw new Error(d.error ?? 'Sunucu hatası'); }
      const { access_token } = await res.json();
      await retellClient.startCall({ accessToken: access_token, sampleRate: 24000 });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Bilinmeyen hata';
      setStatus('error');
      setErrorMsg(msg.toLowerCase().includes('permission') ? t.errorMic : msg);
    }
  }

  // Expose startCall to parent (Hero CTA)
  useEffect(() => {
    if (triggerRef) triggerRef.current = startCall;
  });

  function stopCall() { retellClient.stopCall(); setStatus('idle'); setShowPostCall(true); }
  function openCal() { window.open(CAL_URL, '_blank', 'noopener,noreferrer'); }

  const isIdle = status === 'idle' || status === 'error';
  const recentTranscript = transcript.slice(-5);

  return (
    <>
      {/* Promo bubble — contextual: explains what the button does */}
      {showPromo && status === 'idle' && (
        <div className="fixed bottom-28 right-6 z-40 bg-white text-black rounded-2xl shadow-2xl p-5 max-w-xs border border-black/10">
          <button
            onClick={() => setShowPromo(false)}
            className="absolute top-3 right-4 text-black/30 hover:text-black text-base leading-none"
            aria-label="Kapat"
          >
            ×
          </button>
          <p className="text-sm font-medium pr-5 mb-1">{t.promoTitle}</p>
          <p className="text-xs text-black/50 mb-3">{t.promoDesc}</p>
          <button
            onClick={() => { setShowPromo(false); startCall(); }}
            className="text-xs font-medium underline underline-offset-2 text-black hover:text-black/70 transition-colors"
          >
            {t.promoCta}
          </button>
        </div>
      )}

      {/* Post-call modal */}
      {showPostCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white text-black rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center mx-auto mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">{t.postCallTitle}</h3>
            <p className="text-sm text-black/60 mb-6">{t.postCallDesc}</p>
            <button
              onClick={openCal}
              className="block w-full bg-black text-white text-sm font-medium py-3 rounded-xl hover:bg-black/80 transition-colors mb-3"
            >
              {t.postCallCta}
            </button>
            <button
              onClick={() => setShowPostCall(false)}
              className="text-xs text-black/40 hover:text-black/70 transition-colors"
            >
              {t.postCallDismiss}
            </button>
          </div>
        </div>
      )}

      {/* Active call transcript panel */}
      {status === 'connected' && (
        <div className="fixed bottom-24 right-6 z-40 bg-white text-black rounded-2xl shadow-2xl border border-black/10 w-80 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-black/10">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${agentTalking ? 'bg-black animate-pulse' : 'bg-black/30'}`} />
              <span className="text-sm font-medium">
                {agentTalking ? t.agentTalking : t.agentListening}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
              <span className="text-xs text-black/50 uppercase tracking-wide">{t.live}</span>
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
              {t.hangUp}
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {status === 'error' && errorMsg && (
          <div className="bg-white text-black text-xs px-3 py-2 rounded-xl shadow-lg border border-black/10 max-w-[14rem] text-right">
            {errorMsg}
          </div>
        )}
        <button
          onClick={isIdle ? startCall : stopCall}
          disabled={status === 'connecting'}
          aria-label={t.talkBtn}
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
              <span>{t.connecting}</span>
            </>
          ) : status === 'connected' ? (
            <>
              <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
              <span>{t.connected}</span>
            </>
          ) : (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V23h2v-2.06A9 9 0 0 0 21 12v-2h-2z"/>
              </svg>
              <span>{t.talkBtn}</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}
