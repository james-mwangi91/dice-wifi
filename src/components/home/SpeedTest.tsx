import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowDown, ArrowUp, Gauge, Loader2, RefreshCw, TriangleAlert } from 'lucide-react';
import CountUpNumber from '../ui/CountUp';
import Button from '../ui/Button';
import { cn } from '../../utils/cn';

type Phase = 'idle' | 'testing' | 'done' | 'error';

interface SpeedResult {
  download: number | null;
  upload: number | null;
  ping: number | null;
}

const GAUGE_RADIUS = 82;
const CIRCUMFERENCE = Math.PI * GAUGE_RADIUS;

/* Real test targets — Cloudflare's public speed-test endpoints (CORS-enabled) */
const ENDPOINT = 'https://speed.cloudflare.com';
const DOWNLOAD_BYTES = 10 * 1024 * 1024; // 10 MB
const UPLOAD_BYTES = 8 * 1024 * 1024; // 8 MB
const TIMEOUT_MS = 30_000;

/* Fallback download source (CORS-enabled CDN, real files) */
const FALLBACK_URL = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';
const FALLBACK_ROUNDS = 4;
const FALLBACK_FILE_BYTES = 640_000;

const EMPTY_RESULTS: SpeedResult = { download: null, upload: null, ping: null };

/** Round-trip latency — min of several small requests */
async function measurePing(signal: AbortSignal): Promise<number> {
  const sources = [`${ENDPOINT}/__down?bytes=0`, FALLBACK_URL];
  const samples: number[] = [];
  for (const url of sources) {
    for (let i = 0; i < 3; i++) {
      if (signal.aborted) throw new Error('Cancelled');
      const start = performance.now();
      try {
        await fetch(url, { cache: 'no-store', signal });
        samples.push(performance.now() - start);
      } catch {
        /* skip failed sample */
      }
    }
    if (samples.length >= 3) break;
  }
  if (samples.length === 0) throw new Error('Ping test failed');
  return Math.min(...samples);
}

/** Download a streamed payload and report aggregate throughput */
async function measureFromStream(url: string, signal: AbortSignal, onProgress: (received: number, mbps: number) => void): Promise<number> {
  const start = performance.now();
  const res = await fetch(url, { cache: 'no-store', signal });
  if (!res.ok || !res.body) throw new Error('Download test failed');

  const reader = res.body.getReader();
  let received = 0;
  let lastUpdate = performance.now();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    const mbps = (received * 8) / ((performance.now() - start) / 1000) / 1_000_000;
    if (performance.now() - lastUpdate > 350) {
      lastUpdate = performance.now();
      onProgress(received, mbps);
    }
  }
  return (received * 8) / ((performance.now() - start) / 1000) / 1_000_000;
}

/** Primary download — Cloudflare edge network */
async function measureDownload(signal: AbortSignal, onProgress: (pct: number, mbps: number) => void): Promise<number> {
  const mbps = await measureFromStream(`${ENDPOINT}/__down?bytes=${DOWNLOAD_BYTES}`, signal, (received, live) => {
    onProgress(Math.min(100, (received / DOWNLOAD_BYTES) * 100), live);
  });
  return mbps;
}

/** Fallback download — real files from a public CDN (aggregate rounds) */
async function measureFallbackDownload(signal: AbortSignal, onProgress: (pct: number, mbps: number) => void): Promise<number> {
  let received = 0;
  const start = performance.now();
  for (let i = 0; i < FALLBACK_ROUNDS; i++) {
    if (signal.aborted) throw new Error('Cancelled');
    await measureFromStream(`${FALLBACK_URL}?cb=${i}`, signal, (bytes, live) => {
      received = bytes;
      onProgress(Math.min(100, (received / (FALLBACK_FILE_BYTES * FALLBACK_ROUNDS)) * 100), live);
    });
  }
  return (received * 8) / ((performance.now() - start) / 1000) / 1_000_000;
}

/** Upload — CORS-safelisted content type avoids preflight entirely */
function measureUpload(signal: AbortSignal, onProgress: (pct: number) => void): Promise<number> {
  return new Promise((resolve, reject) => {
    const payload = new Uint8Array(UPLOAD_BYTES);
    crypto.getRandomValues(payload);
    const blob = new Blob([payload], { type: 'text/plain;charset=UTF-8' });

    const xhr = new XMLHttpRequest();
    const onAbort = () => xhr.abort();
    signal.addEventListener('abort', onAbort, { once: true });
    const start = performance.now();
    const timer = window.setTimeout(() => xhr.abort(), TIMEOUT_MS);

    xhr.open('POST', `${ENDPOINT}/__up`);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress((e.loaded / e.total) * 100);
    };
    xhr.onload = () => {
      signal.removeEventListener('abort', onAbort);
      window.clearTimeout(timer);
      if (xhr.status >= 400) {
        reject(new Error('Upload test failed'));
        return;
      }
      resolve((blob.size * 8) / ((performance.now() - start) / 1000) / 1_000_000);
    };
    xhr.onerror = () => {
      signal.removeEventListener('abort', onAbort);
      window.clearTimeout(timer);
      reject(new Error('Upload test failed'));
    };
    xhr.onabort = () => {
      signal.removeEventListener('abort', onAbort);
      window.clearTimeout(timer);
      reject(new Error('Upload cancelled or timed out'));
    };
    xhr.send(blob);
  });
}

/** Real browser-based speed test widget with a live gauge and needle */
export default function SpeedTest() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [progress, setProgress] = useState(0);
  const [liveSpeed, setLiveSpeed] = useState(0);
  const [results, setResults] = useState<SpeedResult>(EMPTY_RESULTS);
  const controllerRef = useRef<AbortController | null>(null);
  const runId = useRef(0);

  useEffect(() => () => controllerRef.current?.abort(), []);

  const run = async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    const id = ++runId.current;

    const apply = (fn: (prev: SpeedResult) => SpeedResult) => {
      if (runId.current === id && !controller.signal.aborted) setResults(fn);
    };

    setResults(EMPTY_RESULTS);
    setLiveSpeed(0);
    setProgress(0);
    setPhase('testing');

    try {
      setProgress(5);
      try {
        const ping = await measurePing(controller.signal);
        apply((r) => ({ ...r, ping }));
      } catch {
        /* ping is optional */
      }
      setProgress(10);

      let download: number | null = null;
      try {
        download = await measureDownload(controller.signal, (pct, mbps) => {
          setProgress(10 + pct * 0.65);
          setLiveSpeed(mbps);
        });
      } catch {
        download = await measureFallbackDownload(controller.signal, (pct, mbps) => {
          setProgress(10 + pct * 0.65);
          setLiveSpeed(mbps);
        });
      }
      apply((r) => ({ ...r, download }));
      setProgress(75);

      let upload: number | null = null;
      try {
        upload = await measureUpload(controller.signal, (pct) => setProgress(75 + pct * 0.25));
      } catch {
        upload = null; /* upload is optional */
      }
      apply((r) => ({ ...r, upload }));
      setProgress(100);
      setPhase('done');
    } catch {
      if (runId.current === id) {
        setProgress(0);
        setPhase('error');
      }
    }
  };

  const retest = () => {
    setResults(EMPTY_RESULTS);
    setProgress(0);
    setLiveSpeed(0);
    void run();
  };

  const isDone = phase === 'done';
  const isError = phase === 'error';
  const isTesting = phase === 'testing';
  const isUploading = isTesting && progress >= 75;
  const needleAngle = -90 + (progress / 100) * 178;

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative mx-auto max-w-4xl">
          {/* Ambient glow */}
          <div className="absolute left-1/2 top-1/2 -z-10 h-96 w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-brand opacity-10 blur-[100px]" />

          <div className="glass-strong overflow-hidden rounded-[2.5rem] p-8 shadow-soft sm:p-12">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-primary dark:bg-brand-accent/10 dark:text-brand-accent">
                <Gauge className="h-4 w-4" /> Speed Test
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-brand-dark dark:text-white sm:text-4xl">
                How fast is your internet <span className="text-gradient">right now?</span>
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
                Run a real test against our edge network to measure your true download, upload and ping.
              </p>
            </div>

            {/* Gauge */}
            <div className="relative mx-auto mt-10 max-w-sm">
              <svg viewBox="0 0 200 110" className="w-full" aria-hidden="true">
                <defs>
                  <linearGradient id="gauge-grad" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2563EB" />
                    <stop offset="0.55" stopColor="#0EA5E9" />
                    <stop offset="1" stopColor="#38BDF8" />
                  </linearGradient>
                </defs>
                {/* Track */}
                <path
                  d="M 18 100 A 82 82 0 0 1 182 100"
                  fill="none"
                  strokeWidth="12"
                  strokeLinecap="round"
                  className="stroke-slate-200 dark:stroke-slate-800"
                />
                {/* Progress */}
                <path
                  d="M 18 100 A 82 82 0 0 1 182 100"
                  fill="none"
                  stroke="url(#gauge-grad)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  style={{
                    strokeDashoffset: CIRCUMFERENCE * (1 - progress / 100),
                    transition: 'stroke-dashoffset 0.35s linear',
                  }}
                />
                {/* Needle */}
                <line
                  x1="100"
                  y1="100"
                  x2="100"
                  y2="34"
                  stroke="#0F172A"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="dark:stroke-white"
                  style={{
                    transform: `rotate(${needleAngle}deg)`,
                    transformOrigin: '100px 100px',
                    transition: 'transform 0.35s linear',
                  }}
                />
                <circle cx="100" cy="100" r="7" className="fill-brand-primary" />
                <circle cx="100" cy="100" r="3" className="fill-white" />
              </svg>

              {/* Readout — sits below the meter */}
              <div className="mt-3 text-center" aria-live="polite">
                {isDone ? (
                  <motion.div key="result" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                    <p className="font-display text-5xl font-extrabold tracking-tight text-gradient">
                      <CountUpNumber end={results.download ?? 0} decimals={1} duration={1.2} />
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">Mbps Download</p>
                  </motion.div>
                ) : isTesting ? (
                  <motion.div key="live" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="font-display text-5xl font-extrabold tracking-tight text-gradient">
                      {isUploading ? '…' : Math.round(liveSpeed)}
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-widest text-slate-400">
                      {isUploading ? 'Mbps Upload' : 'Mbps Download'}
                    </p>
                  </motion.div>
                ) : (
                  <motion.p
                    key="hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={cn('font-display text-lg font-bold', isError ? 'text-rose-500' : 'text-slate-400 dark:text-slate-500')}
                  >
                    {isError ? 'Test Failed' : 'Ready'}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Metrics */}
            <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-8">
              {[
                {
                  icon: ArrowDown,
                  label: 'Download',
                  value: isDone ? results.download : isTesting && liveSpeed > 0 ? liveSpeed : null,
                  suffix: ' Mbps',
                  decimals: 1,
                  tone: 'text-brand-primary',
                },
                {
                  icon: ArrowUp,
                  label: 'Upload',
                  value: isDone ? results.upload : null,
                  suffix: ' Mbps',
                  decimals: 1,
                  tone: 'text-brand-secondary',
                },
                {
                  icon: Activity,
                  label: 'Ping',
                  value: isDone ? results.ping : null,
                  suffix: ' ms',
                  decimals: 0,
                  tone: 'text-emerald-500',
                },
              ].map((m) => (
                <div key={m.label} className="rounded-3xl border border-slate-900/5 bg-white p-4 text-center dark:border-white/10 dark:bg-slate-900/50 sm:p-6">
                  <m.icon className={`mx-auto h-5 w-5 ${m.tone}`} />
                  <p className="mt-2 font-display text-xl font-extrabold text-brand-dark dark:text-white sm:text-3xl">
                    {m.value !== null ? (
                      isDone ? (
                        <CountUpNumber end={m.value} decimals={m.decimals} suffix={m.suffix} duration={1} />
                      ) : (
                        <span>{m.value.toFixed(m.decimals)}{m.suffix}</span>
                      )
                    ) : (
                      <span className="text-slate-300 dark:text-slate-600">—{m.suffix}</span>
                    )}
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:text-xs">{m.label}</p>
                </div>
              ))}
            </div>

            {/* Error notice */}
            {isError && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex items-center justify-center gap-2 text-center text-sm font-semibold text-rose-500"
              >
                <TriangleAlert className="h-4 w-4" />
                Could not reach the test server. Check your connection and try again.
              </motion.p>
            )}

            {/* Action */}
            <div className="mt-10 text-center">
              {isDone || isError ? (
                <Button variant="glass" onClick={retest} icon={<RefreshCw className="h-4 w-4" />}>
                  Test Again
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={() => void run()}
                  disabled={isTesting}
                  icon={isTesting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Gauge className="h-5 w-5" />}
                >
                  {isTesting ? 'Running Speed Test…' : 'Run Speed Test'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}