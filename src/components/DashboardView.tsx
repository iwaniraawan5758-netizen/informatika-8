import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Compass,
  FlaskConical,
  HelpCircle,
  Lightbulb,
  MapPin,
  Sparkles,
  Star,
  Trophy,
  Volume2,
} from 'lucide-react';
import { AppView, ChapterId, LearningProgressState } from '../types/learning';
import { CHAPTERS_DATA } from '../data/chaptersData';
import {
  BIG_QUESTIONS,
  CURIOSITY_CORNER,
  DIGITAL_WORLD_NODES,
  MINI_SURVIVAL_CHALLENGES,
  QUICK_QUIZ_DECK,
  SPOTLIGHT_WORDS,
} from '../data/cockpitData';
import { getLevelForXp, getLevelProgressPercent } from '../data/gamificationData';
import { storageService } from '../services/storageService';
import { soundService } from '../services/soundService';
import { Mascot } from './Mascot';
import { ChapterCardArtwork } from './ChapterCardArtwork';

interface DashboardViewProps {
  progress: LearningProgressState;
  onOpenChapter: (chapterId: ChapterId) => void;
  onOpenQuiz: (chapterId: ChapterId) => void;
  onNavigateView: (view: AppView) => void;
}

const CHAPTER_CARD_GLOW: Record<
  ChapterId,
  { border: string; badgeBg: string; ctaBg: string }
> = {
  1: {
    border: 'border-violet-400/60 hover:border-violet-300 shadow-[0_0_24px_-8px_rgba(168,85,247,0.5)]',
    badgeBg: 'bg-violet-500/20 text-violet-200 border-violet-400/40',
    ctaBg: 'from-violet-600 to-fuchsia-600',
  },
  2: {
    border: 'border-cyan-400/60 hover:border-cyan-300 shadow-[0_0_24px_-8px_rgba(34,211,238,0.5)]',
    badgeBg: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/40',
    ctaBg: 'from-cyan-500 to-blue-600',
  },
  3: {
    border: 'border-blue-400/60 hover:border-blue-300 shadow-[0_0_24px_-8px_rgba(59,130,246,0.5)]',
    badgeBg: 'bg-blue-500/20 text-blue-200 border-blue-400/40',
    ctaBg: 'from-blue-600 to-indigo-600',
  },
  4: {
    border: 'border-pink-400/60 hover:border-pink-300 shadow-[0_0_24px_-8px_rgba(236,72,153,0.5)]',
    badgeBg: 'bg-pink-500/20 text-pink-200 border-pink-400/40',
    ctaBg: 'from-pink-600 to-rose-500',
  },
  5: {
    border: 'border-amber-400/60 hover:border-amber-300 shadow-[0_0_24px_-8px_rgba(250,204,21,0.45)]',
    badgeBg: 'bg-amber-500/20 text-amber-200 border-amber-400/40',
    ctaBg: 'from-amber-500 to-orange-600',
  },
  6: {
    border: 'border-emerald-400/60 hover:border-emerald-300 shadow-[0_0_24px_-8px_rgba(16,185,129,0.5)]',
    badgeBg: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
    ctaBg: 'from-emerald-500 to-teal-600',
  },
};

export const DashboardView: React.FC<DashboardViewProps> = ({
  progress,
  onOpenChapter,
  onOpenQuiz,
  onNavigateView,
}) => {
  const levelInfo = getLevelForXp(progress.totalXp);
  const levelPct = getLevelProgressPercent(progress.totalXp);
  const avgScore = storageService.getAverageScore(progress);
  const completedCount = progress.completedQuizChapters.length;
  const nextChapter =
    CHAPTERS_DATA.find((c) => !progress.completedQuizChapters.includes(c.id)) ??
    CHAPTERS_DATA[0];

  // Interactive HUD states
  const [selectedNodeIdx, setSelectedNodeIdx] = useState(0);
  const [openQaId, setOpenQaId] = useState<string>('bq-1');
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const [helperChapterId, setHelperChapterId] = useState<ChapterId>(1);
  const [survivalIdx, setSurvivalIdx] = useState(0);
  const [survivalPick, setSurvivalPick] = useState<number | null>(null);
  const [quickQuizIdx, setQuickQuizIdx] = useState(0);
  const [quickQuizPick, setQuickQuizPick] = useState<number | null>(null);

  const activeNode = DIGITAL_WORLD_NODES[selectedNodeIdx];
  const activeWord = SPOTLIGHT_WORDS[spotlightIdx];
  const activeHelperChapter =
    CHAPTERS_DATA.find((c) => c.id === helperChapterId) ?? CHAPTERS_DATA[0];
  const activeSurvival = MINI_SURVIVAL_CHALLENGES[survivalIdx];
  const activeQuick = QUICK_QUIZ_DECK[quickQuizIdx];

  const handleCycleSpotlight = () => {
    soundService.playCorrect();
    setSpotlightIdx((i) => (i + 1) % SPOTLIGHT_WORDS.length);
  };

  const handleSurvivalAnswer = (idx: number) => {
    if (survivalPick !== null) return;
    setSurvivalPick(idx);
    if (idx === activeSurvival.correctIndex) {
      soundService.playCorrect();
    } else {
      soundService.playWrong();
    }
  };

  const handleQuickAnswer = (idx: number) => {
    if (quickQuizPick !== null) return;
    setQuickQuizPick(idx);
    if (idx === activeQuick.correctIndex) {
      soundService.playCorrect();
    } else {
      soundService.playWrong();
    }
  };

  return (
    <div className="space-y-5 pb-8">
      {/* ============================================================
          3-COLUMN FUTURISTIC CYBER LEARNING COCKPIT
         ============================================================ */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
        {/* ================= LEFT WING (3 Cols) ================= */}
        <div className="xl:col-span-3 space-y-4 order-2 xl:order-1">
          {/* 1. World / Digital Network Explorer */}
          <motion.section
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="hud-frame rounded-2xl p-4 space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-300" />
                <h2 className="font-display text-sm font-extrabold text-white">
                  Peta Dunia Digital
                </h2>
              </div>
              <span className="text-[11px] font-mono text-cyan-300">6 Zona</span>
            </div>

            {/* Interactive SVG Hologram Map */}
            <div className="relative rounded-xl bg-[#050B22] border border-cyan-500/30 p-2 overflow-hidden">
              <svg viewBox="0 0 340 165" className="w-full h-36" fill="none">
                {/* Stylized glowing continents / network mesh */}
                <path
                  d="M25 65 Q58 35 100 50 Q125 62 110 105 Q78 135 45 110 Z"
                  fill="#0E2954"
                  stroke="#38BDF8"
                  strokeOpacity="0.3"
                />
                <path
                  d="M140 35 Q205 22 265 44 Q305 66 285 118 Q242 142 185 130 Q145 100 140 35 Z"
                  fill="#0E2954"
                  stroke="#38BDF8"
                  strokeOpacity="0.3"
                />
                {/* Connections */}
                {DIGITAL_WORLD_NODES.map((n, i) => {
                  const next = DIGITAL_WORLD_NODES[(i + 1) % DIGITAL_WORLD_NODES.length];
                  return (
                    <line
                      key={n.id}
                      x1={n.x}
                      y1={n.y}
                      x2={next.x}
                      y2={next.y}
                      stroke="#22D3EE"
                      strokeOpacity="0.35"
                      strokeDasharray="3 3"
                    />
                  );
                })}
                {/* Interactive Nodes */}
                {DIGITAL_WORLD_NODES.map((node, idx) => {
                  const selected = idx === selectedNodeIdx;
                  return (
                    <g
                      key={node.id}
                      onClick={() => {
                        soundService.playClick();
                        setSelectedNodeIdx(idx);
                      }}
                      className="cursor-pointer"
                    >
                      {selected && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="13"
                          fill="#FACC15"
                          fillOpacity="0.25"
                        />
                      )}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={selected ? 7 : 5}
                        fill={selected ? '#FACC15' : '#22D3EE'}
                        stroke="#050B22"
                        strokeWidth="2"
                      />
                    </g>
                  );
                })}
              </svg>

              <div className="mt-2 rounded-lg bg-slate-900/90 border border-slate-700/80 p-2.5 space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-amber-300">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {activeNode.region}
                  </span>
                </div>
                <div className="text-xs font-bold text-white">{activeNode.label}</div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {activeNode.summary}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    soundService.playClick();
                    onOpenChapter(activeNode.chapterId);
                  }}
                  className="mt-1.5 w-full py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 text-[11px] font-bold cursor-pointer transition"
                >
                  Jelajahi Bab {activeNode.chapterId} →
                </button>
              </div>
            </div>

            {/* Trophy & Badge Progress Bar */}
            <div className="rounded-xl bg-slate-900/75 border border-amber-400/30 p-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-300 inline-flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5" /> Koleksi Badge
                </span>
                <span className="font-mono font-bold text-white tabular-nums">
                  {progress.unlockedBadges.length}/7
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.round((progress.unlockedBadges.length / 7) * 100)}%` }}
                  className="h-full bg-gradient-to-r from-amber-400 to-pink-500"
                />
              </div>
              <p className="text-[11px] text-slate-400">Terus eksplorasi untuk membuka semua badge!</p>
            </div>
          </motion.section>

          {/* 2. Big Questions & Curiosity Corner */}
          <motion.section
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="hud-frame hud-frame-purple rounded-2xl p-4 space-y-3"
          >
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <h3 className="font-display text-xs font-extrabold text-violet-300 mb-2">
                  Pertanyaan Besar
                </h3>
                <div className="space-y-1.5">
                  {BIG_QUESTIONS.map((item) => {
                    const isOpen = openQaId === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          soundService.playClick();
                          setOpenQaId(item.id);
                        }}
                        className={`w-full text-left text-[11px] px-2 py-1.5 rounded-lg border cursor-pointer transition leading-snug ${
                          isOpen
                            ? 'bg-violet-500/25 border-violet-400 text-white font-semibold'
                            : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-violet-400/50'
                        }`}
                      >
                        › {item.question}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-display text-xs font-extrabold text-cyan-300 mb-2">
                  Pojok Penasaran
                </h3>
                <div className="space-y-1.5">
                  {CURIOSITY_CORNER.map((item) => {
                    const isOpen = openQaId === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          soundService.playClick();
                          setOpenQaId(item.id);
                        }}
                        className={`w-full text-left text-[11px] px-2 py-1.5 rounded-lg border cursor-pointer transition leading-snug ${
                          isOpen
                            ? 'bg-cyan-500/25 border-cyan-400 text-white font-semibold'
                            : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-cyan-400/50'
                        }`}
                      >
                        › {item.question}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Active Answer Box */}
            {(() => {
              const found = [...BIG_QUESTIONS, ...CURIOSITY_CORNER].find(
                (q) => q.id === openQaId
              );
              if (!found) return null;
              return (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={found.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="rounded-xl bg-slate-950/90 border border-cyan-500/35 p-3 space-y-1.5"
                  >
                    <div className="text-[11px] font-bold text-amber-300">
                      Jawaban Cepat (Bab {found.chapterId})
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">{found.answer}</p>
                  </motion.div>
                </AnimatePresence>
              );
            })()}
          </motion.section>

          {/* 3. Spotlight · Istilah Hari Ini */}
          <motion.section
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="hud-frame hud-frame-amber rounded-2xl p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
                  Spotlight · Istilah Hari Ini
                </div>
                <div className="font-display text-lg font-extrabold text-white tracking-wide mt-0.5">
                  {activeWord.word}
                </div>
              </div>
              <button
                type="button"
                onClick={handleCycleSpotlight}
                title="Ganti istilah & bunyikan chime"
                className="p-2 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-300 cursor-pointer transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{activeWord.definition}</p>

            {/* Glowing Letter Tiles like GRACIOUS in screenshot */}
            <div className="flex flex-wrap gap-1 pt-1">
              {activeWord.word.split('').map((ch, i) => (
                <motion.span
                  key={`${activeWord.word}-${i}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="w-6 h-7 rounded-md bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 font-mono text-xs font-extrabold flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.25)]"
                >
                  {ch}
                </motion.span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[11px] font-semibold text-emerald-300">
                {activeWord.chapterLabel}
              </span>
              <button
                type="button"
                onClick={handleCycleSpotlight}
                className="text-[11px] font-bold text-amber-300 hover:text-amber-200 cursor-pointer"
              >
                Istilah Lainnya →
              </button>
            </div>
          </motion.section>
        </div>

        {/* ================= CENTER STAGE (6 Cols) ================= */}
        <div className="xl:col-span-6 space-y-4 order-1 xl:order-2">
          {/* 1. Welcome Command Hero Card with Twin Cyber Mascots */}
          <motion.section
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="hud-frame rounded-3xl p-5 sm:p-6 relative overflow-hidden"
          >
            <div
              aria-hidden="true"
              className="absolute -top-20 right-10 w-64 h-64 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none"
            />
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-3 flex-1 w-full">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 p-0.5 shrink-0">
                    <div className="w-full h-full rounded-[14px] bg-[#080D24] flex items-center justify-center font-display font-extrabold text-lg text-cyan-300">
                      {progress.profile.name.slice(0, 1).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                      Selamat Datang Kembali,
                    </span>
                    <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                      {progress.profile.name === 'Digital Explorer'
                        ? 'Digital Explorer!'
                        : `${progress.profile.name}!`}
                    </h1>
                  </div>
                </div>

                {/* Inline Stats Strip */}
                <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700 text-slate-200">
                    Kelas {progress.profile.studentClass}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-cyan-500/15 border border-cyan-400/40 text-cyan-200 font-mono tabular-nums">
                    {progress.totalXp} XP · Lv.{levelInfo.level}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-400/40 text-amber-200 inline-flex items-center gap-1 tabular-nums">
                    <Star className="w-3.5 h-3.5 fill-amber-300" />
                    {completedCount}/6 Bab · Rata-rata {avgScore}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-semibold">
                    <span className="text-slate-300">Progres Level ({levelInfo.title})</span>
                    <span className="font-mono text-cyan-300 tabular-nums">{levelPct}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-900 border border-slate-700 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${levelPct}%` }}
                      transition={{ duration: 0.6 }}
                      className="h-full bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500"
                    />
                  </div>
                </div>

                <div className="pt-1 flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      soundService.playClick();
                      onOpenChapter(nextChapter.id);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white text-xs sm:text-sm font-extrabold shadow-[0_0_20px_rgba(34,211,238,0.45)] cursor-pointer transition active:scale-95"
                  >
                    MULAI BELAJAR ({nextChapter.numberLabel})
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundService.playClick();
                      onOpenQuiz(nextChapter.id);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-violet-400/45 text-violet-200 text-xs sm:text-sm font-bold cursor-pointer transition"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    Kuis {nextChapter.numberLabel}
                  </button>
                </div>
              </div>

              {/* Twin Glowing Mascots */}
              <div className="shrink-0">
                <Mascot
                  twin
                  mood={completedCount === 6 ? 'celebrating' : 'happy'}
                  onClick={() => soundService.playClick()}
                />
              </div>
            </div>
          </motion.section>

          {/* 2. 6-CHAPTER GLOWING NEON GRID (All Unlocked) */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between px-1">
              <h2 className="font-display text-base sm:text-lg font-extrabold text-white">
                Peta Perjalanan Belajar (6 Bab Terbuka)
              </h2>
              <span className="text-xs font-semibold text-emerald-300">
                {completedCount}/6 Selesai
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {CHAPTERS_DATA.map((chap, idx) => {
                const style = CHAPTER_CARD_GLOW[chap.id];
                const isQuizDone = progress.completedQuizChapters.includes(chap.id);
                const best = progress.bestQuizScores[chap.id];
                return (
                  <motion.article
                    key={chap.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -4, scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    className={`rounded-2xl bg-[#070D27]/95 border p-3 flex flex-col justify-between transition-all ${style.border}`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${style.badgeBg}`}
                        >
                          {chap.numberLabel}
                        </span>
                        {isQuizDone ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300">
                            <CheckCircle2 className="w-3 h-3" /> Skor {best ?? 0}
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-slate-400">
                            Terbuka
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          soundService.playClick();
                          onOpenChapter(chap.id);
                        }}
                        className="w-full rounded-xl overflow-hidden cursor-pointer block focus:outline-none"
                      >
                        <ChapterCardArtwork chapterId={chap.id} />
                      </button>

                      <h3 className="font-display text-sm font-extrabold text-white leading-snug">
                        {chap.title}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 pt-3">
                      <button
                        type="button"
                        onClick={() => {
                          soundService.playClick();
                          onOpenChapter(chap.id);
                        }}
                        className="py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-100 cursor-pointer transition"
                      >
                        Materi
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          soundService.playClick();
                          onOpenQuiz(chap.id);
                        }}
                        className={`py-1.5 px-2 rounded-lg bg-gradient-to-r ${style.ctaBg} hover:brightness-110 text-[11px] font-bold text-white cursor-pointer transition`}
                      >
                        Kuis
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </section>

          {/* 3. BOTTOM 5-MODULE ACTION DECK (Like Reference Bottom Center Row) */}
          <section className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {[
              {
                label: 'Pustaka Materi',
                cta: 'Buka Bab',
                view: 'materi' as AppView,
                icon: BookOpen,
                border: 'border-violet-400/50 hover:border-violet-300',
                btn: 'bg-violet-600 hover:bg-violet-500',
              },
              {
                label: 'Lab Aktivitas',
                cta: 'Praktik',
                view: 'aktivitas' as AppView,
                icon: FlaskConical,
                border: 'border-cyan-400/50 hover:border-cyan-300',
                btn: 'bg-cyan-600 hover:bg-cyan-500',
              },
              {
                label: 'Arena Kuis',
                cta: 'Uji Ilmu',
                view: 'kuis' as AppView,
                icon: HelpCircle,
                border: 'border-rose-400/50 hover:border-rose-300',
                btn: 'bg-rose-600 hover:bg-rose-500',
              },
              {
                label: 'Pencapaian',
                cta: 'Lihat Badge',
                view: 'pencapaian' as AppView,
                icon: Award,
                border: 'border-emerald-400/50 hover:border-emerald-300',
                btn: 'bg-emerald-600 hover:bg-emerald-500',
              },
              {
                label: 'Profil Siswa',
                cta: 'Atur Akun',
                view: 'profil' as AppView,
                icon: Sparkles,
                border: 'border-amber-400/50 hover:border-amber-300',
                btn: 'bg-amber-600 hover:bg-amber-500',
              },
            ].map((mod) => {
              const Icon = mod.icon;
              return (
                <motion.button
                  key={mod.label}
                  type="button"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    soundService.playClick();
                    onNavigateView(mod.view);
                  }}
                  className={`rounded-2xl bg-[#070D27]/95 border p-3 flex flex-col items-center justify-between gap-2.5 text-center cursor-pointer transition ${mod.border}`}
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-cyan-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-display text-xs font-extrabold text-white leading-tight">
                    {mod.label}
                  </span>
                  <span
                    className={`w-full py-1 rounded-lg text-[10px] font-extrabold text-white ${mod.btn}`}
                  >
                    {mod.cta} →
                  </span>
                </motion.button>
              );
            })}
          </section>
        </div>

        {/* ================= RIGHT WING (3 Cols) ================= */}
        <div className="xl:col-span-3 space-y-4 order-3">
          {/* 1. Panduan Belajar Bertahap (Concept Helper) */}
          <motion.section
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="hud-frame hud-frame-amber rounded-2xl p-4 space-y-3"
          >
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-300" />
              <h2 className="font-display text-sm font-extrabold text-white">
                Panduan Belajar Cepat
              </h2>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Pilih bab yang ingin dipahami inti konsepnya secara ringkas sebelum mengerjakan latihan:
            </p>

            <div className="grid grid-cols-3 gap-1.5">
              {CHAPTERS_DATA.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    soundService.playClick();
                    setHelperChapterId(c.id);
                  }}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-bold border cursor-pointer transition ${
                    helperChapterId === c.id
                      ? 'bg-amber-400/20 border-amber-400 text-amber-200'
                      : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {c.numberLabel}
                </button>
              ))}
            </div>

            <div className="rounded-xl bg-slate-950/85 border border-cyan-500/30 p-3 space-y-2">
              <div className="text-xs font-bold text-cyan-300">
                Intisari {activeHelperChapter.numberLabel}: {activeHelperChapter.shortTitle}
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {activeHelperChapter.summaryPoints[0]}
              </p>
              <button
                type="button"
                onClick={() => {
                  soundService.playClick();
                  onOpenChapter(activeHelperChapter.id);
                }}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 hover:text-amber-200 cursor-pointer"
              >
                Pelajari Materi Lengkap <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.section>

          {/* 2. Mini Survival Harian */}
          <motion.section
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="hud-frame rounded-2xl p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-extrabold text-white">
                Tantangan Mini Harian
              </span>
              <span className="text-[11px] font-mono text-cyan-300">
                Bab {activeSurvival.chapterId}
              </span>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {activeSurvival.question}
            </p>

            <div className="space-y-1.5">
              {activeSurvival.options.map((opt, idx) => {
                const picked = survivalPick === idx;
                const isAnswer = idx === activeSurvival.correctIndex;
                let cls =
                  'bg-slate-900/85 border-slate-700 text-slate-200 hover:border-cyan-400';
                if (survivalPick !== null) {
                  if (isAnswer) {
                    cls = 'bg-emerald-500/20 border-emerald-400 text-emerald-100';
                  } else if (picked) {
                    cls = 'bg-rose-500/20 border-rose-400 text-rose-100';
                  } else {
                    cls = 'bg-slate-900/50 border-slate-800 text-slate-400';
                  }
                }
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSurvivalAnswer(idx)}
                    className={`w-full text-left px-3 py-2 rounded-xl border text-xs flex items-center gap-2.5 cursor-pointer transition ${cls}`}
                  >
                    <span className="w-5 h-5 rounded-md bg-slate-800 text-cyan-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                      {['A', 'B', 'C', 'D'][idx]}
                    </span>
                    <span className="leading-snug">{opt}</span>
                  </button>
                );
              })}
            </div>

            {survivalPick !== null && (
              <div className="rounded-xl bg-slate-950/90 border border-emerald-400/35 p-2.5 text-[11px] text-slate-200 space-y-1.5">
                <p>{activeSurvival.tip}</p>
                <button
                  type="button"
                  onClick={() => {
                    soundService.playClick();
                    setSurvivalPick(null);
                    setSurvivalIdx((i) => (i + 1) % MINI_SURVIVAL_CHALLENGES.length);
                  }}
                  className="font-bold text-cyan-300 hover:text-cyan-200 cursor-pointer"
                >
                  Soal Tantangan Berikutnya →
                </button>
              </div>
            )}
          </motion.section>

          {/* 3. Kuis Kilat (Quick Quiz HUD) */}
          <motion.section
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="hud-frame hud-frame-pink rounded-2xl p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-extrabold text-white">
                Kuis Kilat
              </span>
              <span className="text-[11px] font-bold text-pink-300">
                Pemanasan · Bab {activeQuick.chapterId}
              </span>
            </div>

            <p className="text-xs font-semibold text-white leading-relaxed">
              {activeQuick.question}
            </p>

            <div className="grid grid-cols-2 gap-2">
              {activeQuick.options.map((opt, idx) => {
                const picked = quickQuizPick === idx;
                const isAnswer = idx === activeQuick.correctIndex;
                let cls =
                  'bg-slate-900/85 border-slate-700 text-slate-200 hover:border-pink-400';
                if (quickQuizPick !== null) {
                  if (isAnswer) {
                    cls = 'bg-emerald-500/20 border-emerald-400 text-emerald-100';
                  } else if (picked) {
                    cls = 'bg-rose-500/20 border-rose-400 text-rose-100';
                  } else {
                    cls = 'bg-slate-900/50 border-slate-800 text-slate-400';
                  }
                }
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleQuickAnswer(idx)}
                    className={`px-2.5 py-2 rounded-xl border text-[11px] font-semibold text-left flex items-center gap-1.5 cursor-pointer transition ${cls}`}
                  >
                    <span className="font-mono font-bold text-pink-300">
                      {['A', 'B', 'C', 'D'][idx]}
                    </span>
                    <span className="truncate">{opt}</span>
                  </button>
                );
              })}
            </div>

            {quickQuizPick !== null && (
              <div className="flex items-center justify-between text-[11px] pt-1">
                <span
                  className={
                    quickQuizPick === activeQuick.correctIndex
                      ? 'text-emerald-300 font-bold'
                      : 'text-amber-300 font-bold'
                  }
                >
                  {quickQuizPick === activeQuick.correctIndex ? 'Benar!' : 'Cek lagi:'}{' '}
                  {activeQuick.tip}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    soundService.playClick();
                    setQuickQuizPick(null);
                    setQuickQuizIdx((i) => (i + 1) % QUICK_QUIZ_DECK.length);
                  }}
                  className="text-cyan-300 font-bold shrink-0 ml-2 cursor-pointer"
                >
                  Lanjut →
                </button>
              </div>
            )}
          </motion.section>
        </div>
      </div>
    </div>
  );
};
