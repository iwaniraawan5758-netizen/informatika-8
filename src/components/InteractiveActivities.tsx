import React, { useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  CheckCircle2,
  Play,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { ChapterId } from '../types/learning';
import { soundService } from '../services/soundService';

interface ActivityProps {
  chapterId: ChapterId;
  isCompleted: boolean;
  onComplete: () => void;
}

export const InteractiveActivityWidget: React.FC<ActivityProps> = ({
  chapterId,
  isCompleted,
  onComplete,
}) => {
  switch (chapterId) {
    case 1:
      return <Bab1AlgorithmSorter isCompleted={isCompleted} onComplete={onComplete} />;
    case 2:
      return <Bab2SpreadsheetLab isCompleted={isCompleted} onComplete={onComplete} />;
    case 3:
      return <Bab3NetworkInspector isCompleted={isCompleted} onComplete={onComplete} />;
    case 4:
      return <Bab4DataLab isCompleted={isCompleted} onComplete={onComplete} />;
    case 5:
      return <Bab5ComputerClassifier isCompleted={isCompleted} onComplete={onComplete} />;
    case 6:
      return <Bab6CaseStudyAnalyzer isCompleted={isCompleted} onComplete={onComplete} />;
  }
};

/* ============================================================
   BAB 1: SUSUN LANGKAH ALGORITMA SEHARI-HARI
   ============================================================ */
const BAB1_CORRECT_STEPS = [
  'Siapkan gelas bersih dan masukkan 1 kantong teh celup.',
  'Tuangkan air panas secukupnya ke dalam gelas.',
  'Celupkan teh hingga air berubah warna dan tambahkan gula jika suka.',
  'Aduk merata dengan sendok, lalu sajikan teh hangat.',
];

const BAB1_INITIAL_SHUFFLED = [
  BAB1_CORRECT_STEPS[2],
  BAB1_CORRECT_STEPS[0],
  BAB1_CORRECT_STEPS[3],
  BAB1_CORRECT_STEPS[1],
];

const Bab1AlgorithmSorter: React.FC<{ isCompleted: boolean; onComplete: () => void }> = ({
  isCompleted,
  onComplete,
}) => {
  const [steps, setSteps] = useState<string[]>(BAB1_INITIAL_SHUFFLED);
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);

  const moveStep = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= steps.length) return;
    soundService.playClick();
    const copy = [...steps];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    setSteps(copy);
    setFeedback(null);
  };

  const checkAlgorithm = () => {
    const allMatch = steps.every((s, idx) => s === BAB1_CORRECT_STEPS[idx]);
    if (allMatch) {
      soundService.playSuccess();
      setFeedback({
        ok: true,
        msg: 'Sempurna! Urutan algoritma menyeduh teh sudah logis, runtut, dan bebas bug.',
      });
      onComplete();
    } else {
      soundService.playWrong();
      setFeedback({
        ok: false,
        msg: 'Urutannya masih ada yang tertukar! Pastikan menyiapkan gelas & teh dulu sebelum menuang air panas, lalu diaduk terakhir.',
      });
    }
  };

  const reset = () => {
    soundService.playClick();
    setSteps(BAB1_INITIAL_SHUFFLED);
    setFeedback(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-slate-300">
          Gunakan tombol panah naik/turun untuk menyusun langkah membuat teh hangat dari awal sampai selesai:
        </p>
        {isCompleted && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 px-2.5 py-1 rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5" /> Aktivitas Selesai
          </span>
        )}
      </div>

      <div className="space-y-2.5">
        {steps.map((step, idx) => (
          <div
            key={step}
            className="flex items-center justify-between gap-3 rounded-xl bg-slate-900/85 border border-slate-700/80 px-3.5 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-violet-600/30 border border-violet-400/40 text-violet-200 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <span className="text-sm text-slate-100">{step}</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => moveStep(idx, -1)}
                disabled={idx === 0}
                aria-label="Naikkan langkah"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-200 cursor-pointer disabled:cursor-not-allowed"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => moveStep(idx, 1)}
                disabled={idx === steps.length - 1}
                aria-label="Turunkan langkah"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-200 cursor-pointer disabled:cursor-not-allowed"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={checkAlgorithm}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:brightness-110 text-white text-sm font-bold cursor-pointer transition active:scale-95"
        >
          <Play className="w-4 h-4" />
          Jalankan & Cek Algoritma
        </button>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {feedback && (
        <div
          className={`rounded-xl p-3.5 text-sm flex items-start gap-2.5 border ${
            feedback.ok
              ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200'
              : 'bg-rose-500/15 border-rose-400/40 text-rose-200'
          }`}
        >
          {feedback.ok ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-300" />
          ) : (
            <XCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-300" />
          )}
          <span>{feedback.msg}</span>
        </div>
      )}
    </div>
  );
};

/* ============================================================
   BAB 2: MINI SPREADSHEET SIMULATOR
   ============================================================ */
interface StudentRow {
  name: string;
  score: number;
}

const INITIAL_ROWS: StudentRow[] = [
  { name: 'Alya', score: 85 },
  { name: 'Bagas', score: 78 },
  { name: 'Citra', score: 92 },
  { name: 'Dimas', score: 80 },
  { name: 'Eka', score: 95 },
];

const Bab2SpreadsheetLab: React.FC<{ isCompleted: boolean; onComplete: () => void }> = ({
  isCompleted,
  onComplete,
}) => {
  const [rows, setRows] = useState<StudentRow[]>(INITIAL_ROWS);
  const [formula, setFormula] = useState<string>('=SUM(B2:B6)');
  const [triedFormulas, setTriedFormulas] = useState<string[]>(['SUM']);

  const updateScore = (idx: number, raw: string) => {
    const parsed = Math.max(0, Math.min(100, Number(raw) || 0));
    const next = rows.map((r, i) => (i === idx ? { ...r, score: parsed } : r));
    setRows(next);
  };

  const evalResult = useMemo(() => {
    const clean = formula.trim().toUpperCase().replace(/\s+/g, '');
    const nums = rows.map((r) => r.score);
    const sum = nums.reduce((a, b) => a + b, 0);
    const avg = sum / nums.length;
    const max = Math.max(...nums);
    const min = Math.min(...nums);

    if (clean === '=SUM(B2:B6)') return { valid: true, fn: 'SUM', value: sum.toString() };
    if (clean === '=AVERAGE(B2:B6)')
      return { valid: true, fn: 'AVERAGE', value: avg.toFixed(1) };
    if (clean === '=MAX(B2:B6)') return { valid: true, fn: 'MAX', value: max.toString() };
    if (clean === '=MIN(B2:B6)') return { valid: true, fn: 'MIN', value: min.toString() };

    return {
      valid: false,
      fn: 'INVALID',
      value: 'Gunakan rumus =SUM(B2:B6), =AVERAGE(B2:B6), =MAX(B2:B6), atau =MIN(B2:B6)',
    };
  }, [formula, rows]);

  const applyPreset = (preset: string, fnKey: string) => {
    soundService.playClick();
    setFormula(preset);
    const updated = triedFormulas.includes(fnKey) ? triedFormulas : [...triedFormulas, fnKey];
    setTriedFormulas(updated);
    if (updated.length >= 3) {
      soundService.playSuccess();
      onComplete();
    }
  };

  const handleFormulaChange = (val: string) => {
    setFormula(val);
    const clean = val.trim().toUpperCase().replace(/\s+/g, '');
    const map: Record<string, string> = {
      '=SUM(B2:B6)': 'SUM',
      '=AVERAGE(B2:B6)': 'AVERAGE',
      '=MAX(B2:B6)': 'MAX',
      '=MIN(B2:B6)': 'MIN',
    };
    const matched = map[clean];
    if (matched && !triedFormulas.includes(matched)) {
      const updated = [...triedFormulas, matched];
      setTriedFormulas(updated);
      soundService.playCorrect();
      if (updated.length >= 3) {
        onComplete();
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-slate-300">
          Ubah angka nilai siswa atau uji minimal <strong className="text-cyan-300">3 rumus fungsi</strong> di Formula Bar untuk melihat hasil & grafik otomatis!
        </p>
        {isCompleted && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 px-2.5 py-1 rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5" /> Aktivitas Selesai
          </span>
        )}
      </div>

      {/* Formula Bar */}
      <div className="rounded-xl bg-slate-950/90 border border-cyan-500/40 p-3 space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="font-mono text-xs font-bold text-cyan-300 bg-cyan-500/15 px-2.5 py-1.5 rounded-lg shrink-0">
            fx Formula Bar (Sel B7)
          </span>
          <input
            type="text"
            value={formula}
            onChange={(e) => handleFormulaChange(e.target.value)}
            aria-label="Formula Bar Spreadsheet"
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-1.5 font-mono text-sm text-amber-300 focus:outline-none focus:border-cyan-400"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { label: '=SUM(B2:B6)', key: 'SUM' },
            { label: '=AVERAGE(B2:B6)', key: 'AVERAGE' },
            { label: '=MAX(B2:B6)', key: 'MAX' },
            { label: '=MIN(B2:B6)', key: 'MIN' },
          ].map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => applyPreset(p.label, p.key)}
              className={`font-mono text-xs px-2.5 py-1.5 rounded-lg border cursor-pointer transition ${
                triedFormulas.includes(p.key)
                  ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-200'
                  : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-cyan-400'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid + Live Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900/90">
          <table className="w-full text-sm">
            <thead className="bg-slate-800/90 text-slate-300 font-mono text-xs">
              <tr>
                <th className="py-2 px-3 text-left border-b border-r border-slate-700 w-10">#</th>
                <th className="py-2 px-3 text-left border-b border-r border-slate-700">A · Nama Siswa</th>
                <th className="py-2 px-3 text-left border-b border-slate-700">B · Nilai Ulangan</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-xs text-slate-400 bg-slate-800/40">
                <td className="py-1.5 px-3 border-b border-r border-slate-700 font-mono">1</td>
                <td className="py-1.5 px-3 border-b border-r border-slate-700 font-semibold">Nama</td>
                <td className="py-1.5 px-3 border-b border-slate-700 font-semibold">Nilai</td>
              </tr>
              {rows.map((r, idx) => (
                <tr key={r.name} className="hover:bg-slate-800/40">
                  <td className="py-2 px-3 border-b border-r border-slate-700 font-mono text-xs text-slate-400">
                    {idx + 2}
                  </td>
                  <td className="py-2 px-3 border-b border-r border-slate-700 text-slate-100">
                    {r.name}
                  </td>
                  <td className="py-1.5 px-3 border-b border-slate-700">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={r.score}
                      onChange={(e) => updateScore(idx, e.target.value)}
                      aria-label={`Nilai ${r.name}`}
                      className="w-24 rounded-md bg-slate-950 border border-slate-600 px-2.5 py-1 font-mono text-cyan-300 tabular-nums focus:outline-none focus:border-cyan-400"
                    />
                  </td>
                </tr>
              ))}
              <tr className="bg-cyan-950/35">
                <td className="py-2.5 px-3 border-r border-slate-700 font-mono text-xs text-cyan-300">
                  7
                </td>
                <td className="py-2.5 px-3 border-r border-slate-700 font-bold text-amber-300">
                  Hasil ({evalResult.fn})
                </td>
                <td className="py-2.5 px-3 font-mono font-bold tabular-nums text-emerald-300">
                  {evalResult.valid ? evalResult.value : <span className="text-rose-300 text-xs">#RUMUS?</span>}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Live Chart */}
        <div className="rounded-xl border border-slate-700 bg-slate-900/90 p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              Grafik Batang Otomatis
            </span>
            <span className="text-xs text-slate-400 tabular-nums">
              Fungsi dicoba: {triedFormulas.length}/4
            </span>
          </div>
          <div className="space-y-2.5">
            {rows.map((r) => (
              <div key={r.name} className="flex items-center gap-3">
                <span className="w-14 text-xs text-slate-300 shrink-0">{r.name}</span>
                <div className="flex-1 h-5 rounded-md bg-slate-800 overflow-hidden">
                  <div
                    style={{ width: `${Math.min(100, r.score)}%` }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-300 rounded-md"
                  />
                </div>
                <span className="w-9 text-right font-mono text-xs font-bold text-cyan-200 tabular-nums">
                  {r.score}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-4">
            {evalResult.valid
              ? `Sel B7 mengevaluasi ${formula.toUpperCase()} = ${evalResult.value}`
              : evalResult.value}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   BAB 3: NETWORK DEVICE & PHISHING URL INSPECTOR
   ============================================================ */
const URL_CASES = [
  {
    id: 'u1',
    url: 'https://belajar.kemdikbud.go.id',
    isSafe: true,
    reason: 'Memakai protokol HTTPS terenkripsi dan domain resmi pemerintah/pendidikan (.go.id).',
  },
  {
    id: 'u2',
    url: 'http://login-g00gle-hadiah.xyz/otp',
    isSafe: false,
    reason: 'Waspada Phishing! Memakai HTTP (tidak terenkripsi), domain aneh meniru Google ("g00gle"), dan meminta OTP.',
  },
  {
    id: 'u3',
    url: 'http://klaim-kuota-gratis99.top',
    isSafe: false,
    reason: 'Iming-iming hadiah gratis di domain mencurigakan tanpa HTTPS adalah modus pencurian data.',
  },
];

const Bab3NetworkInspector: React.FC<{ isCompleted: boolean; onComplete: () => void }> = ({
  isCompleted,
  onComplete,
}) => {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [deviceChoice, setDeviceChoice] = useState<string>('');

  const handleSelectUrl = (id: string, choiceSafe: boolean) => {
    soundService.playClick();
    const next = { ...answers, [id]: choiceSafe };
    setAnswers(next);

    const allUrlsRight = URL_CASES.every((u) => next[u.id] === u.isSafe);
    if (allUrlsRight && deviceChoice === 'Router') {
      soundService.playSuccess();
      onComplete();
    }
  };

  const handleDevice = (val: string) => {
    setDeviceChoice(val);
    if (val === 'Router') {
      soundService.playCorrect();
      const allUrlsRight = URL_CASES.every((u) => answers[u.id] === u.isSafe);
      if (allUrlsRight) {
        onComplete();
      }
    } else {
      soundService.playWrong();
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-slate-300">
          Selesaikan 2 misi: pilih perangkat penghubung LAN ke Internet dan periksa keamanan 3 tautan web!
        </p>
        {isCompleted && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 px-2.5 py-1 rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5" /> Aktivitas Selesai
          </span>
        )}
      </div>

      {/* Part 1: Device */}
      <div className="rounded-xl bg-slate-900/85 border border-slate-700 p-4 space-y-3">
        <p className="text-sm font-semibold text-white">
          Misi 1: Lab komputer sekolah (LAN) ingin terhubung ke Internet (WAN). Perangkat apa yang bertugas menghubungkan dua jaringan tersebut dan mengatur rute data?
        </p>
        <div className="flex flex-wrap gap-2.5">
          {['Scanner', 'Router', 'Printer', 'Keyboard'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleDevice(item)}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold border cursor-pointer transition ${
                deviceChoice === item
                  ? item === 'Router'
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                    : 'bg-rose-500/20 border-rose-400 text-rose-200'
                  : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-blue-400'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
        {deviceChoice && (
          <p className={`text-xs ${deviceChoice === 'Router' ? 'text-emerald-300' : 'text-rose-300'}`}>
            {deviceChoice === 'Router'
              ? 'Benar! Router menghubungkan jaringan berbeda (LAN ke Internet) dan memilih rute paket terbaik.'
              : 'Belum tepat. Coba pilih perangkat jaringan yang khusus mengatur rute antar jaringan.'}
          </p>
        )}
      </div>

      {/* Part 2: URL Safety */}
      <div className="space-y-2.5">
        <p className="text-sm font-semibold text-white">Misi 2: Inspeksi Keamanan Tautan Web</p>
        {URL_CASES.map((u) => {
          const picked = answers[u.id];
          const hasPicked = picked !== undefined;
          const isCorrect = picked === u.isSafe;
          return (
            <div
              key={u.id}
              className="rounded-xl bg-slate-900/85 border border-slate-700 p-3.5 space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <code className="font-mono text-xs sm:text-sm text-cyan-300 break-all">
                  {u.url}
                </code>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleSelectUrl(u.id, true)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                      picked === true
                        ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-emerald-400'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" /> Aman
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectUrl(u.id, false)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                      picked === false
                        ? 'bg-rose-500/25 border-rose-400 text-rose-200'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-rose-400'
                    }`}
                  >
                    <ShieldAlert className="w-3.5 h-3.5" /> Phishing
                  </button>
                </div>
              </div>
              {hasPicked && (
                <p className={`text-xs ${isCorrect ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {isCorrect ? 'Tepat! ' : 'Kurang tepat — '}
                  {u.reason}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ============================================================
   BAB 4: DATA TO INFORMATION LAB
   ============================================================ */
const CLUB_DATA = [
  { name: 'Coding & Robotika', members: 18, category: 'Teknologi' },
  { name: 'Futsal', members: 24, category: 'Olahraga' },
  { name: 'Desain Poster', members: 14, category: 'Seni' },
  { name: 'Basket', members: 12, category: 'Olahraga' },
];

const Bab4DataLab: React.FC<{ isCompleted: boolean; onComplete: () => void }> = ({
  isCompleted,
  onComplete,
}) => {
  const [sortDesc, setSortDesc] = useState(false);
  const [chartMode, setChartMode] = useState<'bar' | 'percent'>('bar');
  const [answer, setAnswer] = useState<string>('');

  const displayed = useMemo(() => {
    const copy = [...CLUB_DATA];
    return sortDesc ? copy.sort((a, b) => b.members - a.members) : copy;
  }, [sortDesc]);

  const total = CLUB_DATA.reduce((acc, c) => acc + c.members, 0);

  const checkConclusion = (choice: string) => {
    setAnswer(choice);
    if (choice === 'Futsal') {
      soundService.playSuccess();
      onComplete();
    } else {
      soundService.playWrong();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-slate-300">
          Olah data mentah peminat ekstrakurikuler berikut dengan tombol Sort & Ubah Tampilan Grafik, lalu jawab kesimpulannya:
        </p>
        {isCompleted && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 px-2.5 py-1 rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5" /> Aktivitas Selesai
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            soundService.playClick();
            setSortDesc((v) => !v);
          }}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
            sortDesc
              ? 'bg-pink-500/20 border-pink-400 text-pink-200'
              : 'bg-slate-800 border-slate-700 text-slate-200'
          }`}
        >
          {sortDesc ? 'Urutan: Terbanyak -> Tersedikit' : 'Urutkan dari Terbanyak (Sort)'}
        </button>
        <button
          type="button"
          onClick={() => {
            soundService.playClick();
            setChartMode((m) => (m === 'bar' ? 'percent' : 'bar'));
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 border border-slate-700 hover:border-cyan-400 text-cyan-200 cursor-pointer"
        >
          <BarChart3 className="w-3.5 h-3.5" />
          Mode: {chartMode === 'bar' ? 'Jumlah Siswa' : 'Persentase (%)'}
        </button>
      </div>

      <div className="rounded-xl bg-slate-900/90 border border-slate-700 p-4 space-y-3">
        {displayed.map((c) => {
          const pct = Math.round((c.members / total) * 100);
          return (
            <div key={c.name} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-100">
                  {c.name} <span className="text-slate-400">· {c.category}</span>
                </span>
                <span className="font-mono font-bold text-pink-300 tabular-nums">
                  {chartMode === 'bar' ? `${c.members} siswa` : `${pct}%`}
                </span>
              </div>
              <div className="h-3.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  style={{ width: `${(c.members / 24) * 100}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-pink-500 to-violet-500 transition-all duration-300"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl bg-slate-900/85 border border-slate-700 p-4 space-y-2.5">
        <p className="text-sm font-semibold text-white">
          Berdasarkan informasi grafik di atas, ekstrakurikuler mana yang paling diminati sehingga membutuhkan jadwal lapangan utama terlebih dahulu?
        </p>
        <div className="flex flex-wrap gap-2">
          {CLUB_DATA.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => checkConclusion(c.name)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                answer === c.name
                  ? c.name === 'Futsal'
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                    : 'bg-rose-500/20 border-rose-400 text-rose-200'
                  : 'bg-slate-800 border-slate-700 text-slate-200 hover:border-pink-400'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
        {answer && (
          <p className={`text-xs ${answer === 'Futsal' ? 'text-emerald-300' : 'text-rose-300'}`}>
            {answer === 'Futsal'
              ? 'Tepat! Futsal memiliki 24 peminat (35% dari total), sehingga paling prioritas dijadwalkan.'
              : 'Coba aktifkan tombol Sort di atas untuk melihat peminat tertinggi.'}
          </p>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   BAB 5: KLASIFIKASI PERANGKAT SISTEM KOMPUTER
   ============================================================ */
type DeviceRole = 'Input' | 'Process' | 'Output' | 'Storage';

const DEVICES_TO_SORT: { name: string; role: DeviceRole }[] = [
  { name: 'Keyboard', role: 'Input' },
  { name: 'CPU (Processor)', role: 'Process' },
  { name: 'Monitor', role: 'Output' },
  { name: 'SSD / Flashdisk', role: 'Storage' },
  { name: 'Microphone', role: 'Input' },
  { name: 'Printer', role: 'Output' },
];

const Bab5ComputerClassifier: React.FC<{ isCompleted: boolean; onComplete: () => void }> = ({
  isCompleted,
  onComplete,
}) => {
  const [selectedRoles, setSelectedRoles] = useState<Record<string, DeviceRole>>({});
  const [checked, setChecked] = useState(false);

  const assign = (deviceName: string, role: DeviceRole) => {
    soundService.playClick();
    setSelectedRoles((prev) => ({ ...prev, [deviceName]: role }));
    setChecked(false);
  };

  const verifyAll = () => {
    setChecked(true);
    const correctCount = DEVICES_TO_SORT.filter((d) => selectedRoles[d.name] === d.role).length;
    if (correctCount === DEVICES_TO_SORT.length) {
      soundService.playSuccess();
      onComplete();
    } else {
      soundService.playWrong();
    }
  };

  const correctCount = DEVICES_TO_SORT.filter((d) => selectedRoles[d.name] === d.role).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-slate-300">
          Kelompokkan setiap perangkat keras berikut ke kategori fungsinya (Input, Process, Output, atau Storage):
        </p>
        {isCompleted && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 px-2.5 py-1 rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5" /> Aktivitas Selesai
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {DEVICES_TO_SORT.map((d) => {
          const picked = selectedRoles[d.name];
          const isRight = picked === d.role;
          return (
            <div
              key={d.name}
              className={`rounded-xl p-3.5 border transition ${
                checked
                  ? isRight
                    ? 'bg-emerald-500/10 border-emerald-400/50'
                    : 'bg-rose-500/10 border-rose-400/50'
                  : 'bg-slate-900/85 border-slate-700'
              }`}
            >
              <div className="font-bold text-sm text-white mb-2.5">{d.name}</div>
              <div className="grid grid-cols-2 gap-1.5">
                {(['Input', 'Process', 'Output', 'Storage'] as DeviceRole[]).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => assign(d.name, role)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold border cursor-pointer transition ${
                      picked === role
                        ? 'bg-amber-500/25 border-amber-400 text-amber-200'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={verifyAll}
          disabled={Object.keys(selectedRoles).length < DEVICES_TO_SORT.length}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 disabled:opacity-40 text-white text-sm font-bold cursor-pointer disabled:cursor-not-allowed"
        >
          <Sparkles className="w-4 h-4" />
          Periksa Klasifikasi ({Object.keys(selectedRoles).length}/{DEVICES_TO_SORT.length})
        </button>
      </div>

      {checked && (
        <div
          className={`rounded-xl p-3.5 text-sm border ${
            correctCount === DEVICES_TO_SORT.length
              ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200'
              : 'bg-amber-500/15 border-amber-400/40 text-amber-200'
          }`}
        >
          {correctCount === DEVICES_TO_SORT.length
            ? 'Hebat! Semua perangkat berhasil kamu kelompokkan sesuai fungsinya!'
            : `Benar ${correctCount} dari ${DEVICES_TO_SORT.length}. Periksa ulang perangkat yang ditandai merah!`}
        </div>
      )}
    </div>
  );
};

/* ============================================================
   BAB 6: STUDI KASUS DAMPAK SOSIAL INFORMATIKA
   ============================================================ */
const DIGITAL_CASES = [
  {
    id: 'c1',
    title: 'Kasus 1: Pesan Berantai Libur Sekolah',
    scenario:
      'Di grup chat kelas muncul pesan "Besok sekolah libur mendadak!" tanpa surat resmi dan disertai link mencurigakan.',
    options: [
      'Langsung teruskan ke semua grup agar cepat viral.',
      'Cek kebenarannya ke website/media sosial resmi sekolah atau tanya wali kelas sebelum percaya.',
    ],
    bestIdx: 1,
    feedback: 'Tepat! Prinsip "Saring Sebelum Sharing" mencegah penyebaran hoaks.',
  },
  {
    id: 'c2',
    title: 'Kasus 2: Permintaan Kode OTP',
    scenario:
      'Seseorang mengaku admin game mengirim DM dan meminta 6 digit kode OTP SMS kamu agar hadiah skin dikirim.',
    options: [
      'Tolak dan blokir akun tersebut karena kode OTP bersifat rahasia mutlak.',
      'Berikan saja mumpung gratis.',
    ],
    bestIdx: 0,
    feedback: 'Mantap! Kode OTP adalah kunci akunmu—memberikannya sama dengan menyerahkan akun ke penipu.',
  },
  {
    id: 'c3',
    title: 'Kasus 3: Komentar Jahat pada Karya Teman',
    scenario:
      'Temanmu mengunggah video tugas kreatif, lalu beberapa akun mengejek fisiknya di kolom komentar.',
    options: [
      'Ikut tertawa karena hanya bercanda di internet.',
      'Beri komentar dukungan positif ke teman, simpan bukti jika parah, dan bantu laporkan komentar bullying.',
    ],
    bestIdx: 1,
    feedback: 'Keren! Kamu bersikap sebagai Upstander yang menghentikan rantai cyberbullying.',
  },
];

const Bab6CaseStudyAnalyzer: React.FC<{ isCompleted: boolean; onComplete: () => void }> = ({
  isCompleted,
  onComplete,
}) => {
  const [choices, setChoices] = useState<Record<string, number>>({});

  const pickOption = (caseId: string, idx: number) => {
    const next = { ...choices, [caseId]: idx };
    setChoices(next);
    const currentCase = DIGITAL_CASES.find((c) => c.id === caseId);
    if (currentCase?.bestIdx === idx) {
      soundService.playCorrect();
    } else {
      soundService.playWrong();
    }
    const allSolved = DIGITAL_CASES.every((c) => next[c.id] === c.bestIdx);
    if (allSolved) {
      soundService.playSuccess();
      onComplete();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-slate-300">
          Analisis 3 studi kasus berikut dan pilih keputusan warga digital yang paling bijak:
        </p>
        {isCompleted && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-400/30 px-2.5 py-1 rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5" /> Aktivitas Selesai
          </span>
        )}
      </div>

      <div className="space-y-3">
        {DIGITAL_CASES.map((c) => {
          const picked = choices[c.id];
          const isBest = picked === c.bestIdx;
          return (
            <div
              key={c.id}
              className="rounded-xl bg-slate-900/85 border border-slate-700 p-4 space-y-2.5"
            >
              <h4 className="font-bold text-sm text-emerald-300">{c.title}</h4>
              <p className="text-sm text-slate-200">{c.scenario}</p>
              <div className="grid grid-cols-1 gap-2">
                {c.options.map((opt, idx) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => pickOption(c.id, idx)}
                    className={`text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border cursor-pointer transition ${
                      picked === idx
                        ? idx === c.bestIdx
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-100'
                          : 'bg-rose-500/20 border-rose-400 text-rose-100'
                        : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-emerald-400/60'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {picked !== undefined && (
                <p className={`text-xs ${isBest ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {isBest ? c.feedback : 'Kurang aman! Pikirkan risiko privasi dan dampaknya bagi dirimu atau temanmu.'}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
