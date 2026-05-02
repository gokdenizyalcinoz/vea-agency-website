import type { VercelRequest, VercelResponse } from '@vercel/node';

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 2;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress ?? 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count++;
  return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const allowedOrigins = [
    'https://veaagency.com',
    'https://www.veaagency.com',
    'https://vea-agency-website.vercel.app',
    'http://localhost:3000',
  ];
  const origin = req.headers.origin ?? '';
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Çok fazla deneme. Lütfen bir saat sonra tekrar deneyin.' });
  }

  const apiKey = process.env.RETELL_API_KEY;
  const defaultAgentId = process.env.RETELL_AGENT_ID;

  if (!apiKey || !defaultAgentId) {
    console.error('Missing env vars');
    return res.status(500).json({ error: 'Sunucu yapılandırma hatası.' });
  }

  const { clinic_name, doctor_name, specialty } = req.body ?? {};

  try {
    const retellRes = await fetch('https://api.retellai.com/v2/create-web-call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        agent_id: defaultAgentId,
        retell_llm_dynamic_variables: {
          ...(clinic_name && { clinic_name }),
          ...(doctor_name && { doctor_name }),
          ...(specialty && { specialty }),
        },
      }),
    });

    if (!retellRes.ok) {
      const errText = await retellRes.text();
      console.error('Retell error:', retellRes.status, errText);
      return res.status(502).json({ error: 'Sesli asistan başlatılamadı.' });
    }

    const data = await retellRes.json() as { access_token: string };
    console.log(JSON.stringify({ event: 'demo_call_started', ip, clinic_name: clinic_name ?? null, timestamp: new Date().toISOString() }));
    return res.status(200).json({ access_token: data.access_token });

  } catch (err) {
    console.error('Fetch error:', err);
    return res.status(500).json({ error: 'Bağlantı hatası.' });
  }
}
