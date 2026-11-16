import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  BookCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  Play,
  Sparkles,
  Target,
} from 'lucide-react';
import { ChapterId } from '../types/learning';
import { CHAPTERS_DATA } from '../data/chaptersData';
import { soundService } from '../services/soundService';
import {
  ChapterHeroIllustration,
  ChapterInteractiveDiagram,
} from './ChapterIllustrations';
import { InteractiveActivityWidget } from './InteractiveActivities';

interface ChapterLearningViewProps {
  chapterId: ChapterId;
  isMaterialRead: boolean;
  isActivityDone: boolean;
  isQuizDone: boolean;
  bestScore?: number;
  onMarkMaterialRead: (chapterId: ChapterId) => void;
  onCompleteActivity: (chapterId: ChapterId) => void;
  onGoToQuiz: (chapterId: ChapterId) => void;
  onBack: () => void;
}

export const ChapterLearningView: React.FC<ChapterLearningViewProps> = ({
  chapterId,
  isMaterialRead,
  isActivityDone,
  isQuizDone,
  bestScore,
  onMarkMaterialRead,
  onCompleteActivity,
  onGoToQuiz,
  onBack,
}) => {
  const chapter = useMemo(
    () => CHAPTERS_DATA.find((c) => c.id === chapterId) ?? CHAPTERS_DATA[0],
    [chapterId]
  );

  const [stepIdx, setStepIdx] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setStepIdx(0);
    setShowHint(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [chapterId]);

  const activeSub = chapter.subMaterials[stepIdx];

  const handleStepChange = (nextIdx: number) => {
    soundService.playClick();
    setStepIdx(nextIdx);
    if (nextIdx === chapter.subMaterials.length - 1 && !isMaterialRead) {
      onMarkMaterialRead(chapterId);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      {/* Top Return Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            soundService.playClick();
            onBack();
          }}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-300 hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Peta Belajar
        </button>

        <div className="flex items-center gap-3 text-xs font-semibold">
          {isMaterialRead && (
            <span className="inline-flex items-center gap-1 text-cyan-300">
              <CheckCircle2 className="w-3.5 h-3.5" /> Materi Dibaca
            </span>
          )}
          {isQuizDone && typeof bestScore === 'number' && (
            <span className="inline-flex items-center gap-1 text-amber-300 tabular-nums">
              Skor Terbaik: {bestScore}
            </span>
          )}
        </div>
      </div>

      {/* 1. JUDUL BAB & 2. ILUSTRASI PENDUKUNG */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel-elevated rounded-3xl p-5 sm:p-7 space-y-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div className="md:col-span-7 space-y-2.5">
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-300">
              {chapter.numberLabel} · Informatika Kelas VIII
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white text-balance">
              {chapter.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {chapter.description}
            </p>
          </div>
          <div className="md:col-span-5">
            <ChapterHeroIllustration chapterId={chapterId} />
          </div>
        </div>
      </motion.section>

      {/* 3. TUJUAN PEMBELAJARAN & 4. PERTANYAAN PEMANTIK */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <section className="glass-panel rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-cyan-300 font-display font-bold text-base">
            <Target className="w-5 h-5" />
            <h2>Tujuan Pembelajaran</h2>
          </div>
          <ul className="space-y-2 text-sm text-slate-200">
            {chapter.objectives.map((obj, idx) => (
              <li key={obj} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-md bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{obj}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="glass-panel rounded-2xl p-5 space-y-3 flex flex-col justify-between border border-pink-500/25">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-pink-300 font-display font-bold text-base">
              <Lightbulb className="w-5 h-5 text-amber-300" />
              <h2>Pertanyaan Pemantik</h2>
            </div>
            <p className="text-sm text-slate-100 leading-relaxed">
              {chapter.starterQuestion}
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                soundService.playClick();
                setShowHint((v) => !v);
              }}
              className="text-xs font-bold text-amber-300 hover:text-amber-200 underline underline-offset-4 cursor-pointer"
            >
              {showHint ? 'Sembunyikan Petunjuk' : 'Lihat Petunjuk Singkat'}
            </button>
            {showHint && (
              <div className="mt-2.5 rounded-xl bg-amber-500/10 border border-amber-400/30 p-3 text-xs sm:text-sm text-amber-100">
                {chapter.starterHint}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* 5. PENJELASAN MATERI SECARA BERTAHAP */}
      <section className="glass-panel-elevated rounded-3xl p-5 sm:p-7 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-violet-300">
              Materi Bertahap · Bagian {stepIdx + 1} dari {chapter.subMaterials.length}
            </span>
            <h2 className="font-display text-xl font-bold text-white mt-0.5">
              {activeSub.title}
            </h2>
          </div>

          {!isMaterialRead && (
            <button
              type="button"
              onClick={() => {
                soundService.playCorrect();
                onMarkMaterialRead(chapterId);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-xs font-bold text-cyan-200 cursor-pointer"
            >
              <BookCheck className="w-4 h-4" />
              Tandai Selesai Baca (+60 XP)
            </button>
          )}
        </div>

        {/* Stepper Selector */}
        <div className="flex flex-wrap gap-2">
          {chapter.subMaterials.map((sub, idx) => {
            const active = idx === stepIdx;
            return (
              <button
                key={sub.id}
                type="button"
                onClick={() => handleStepChange(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer transition ${
                  active
                    ? 'bg-violet-600 text-white border-violet-400 shadow-[0_0_14px_rgba(139,92,246,0.45)]'
                    : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:border-slate-500'
                }`}
              >
                {idx + 1}. {sub.tag}
              </button>
            );
          })}
        </div>

        {/* Active Step Content Card */}
        <div className="rounded-2xl bg-slate-900/85 border border-slate-700/80 p-4 sm:p-5 space-y-4">
          <ul className="space-y-2.5 text-sm sm:text-base text-slate-200 leading-relaxed">
            {activeSub.summaryPoints.map((pt) => (
              <li key={pt} className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2 shrink-0" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>

          {activeSub.codeOrFormula && (
            <pre className="rounded-xl bg-slate-950 border border-cyan-500/30 p-3.5 font-mono text-xs sm:text-sm text-cyan-200 overflow-x-auto leading-relaxed">
              {activeSub.codeOrFormula}
            </pre>
          )}

          <div className="rounded-xl bg-violet-500/15 border border-violet-400/35 p-3 text-xs sm:text-sm text-violet-100">
            <strong className="text-amber-300">Tips Cepat: </strong>
            {activeSub.keyTip}
          </div>
        </div>

        {/* Prev / Next Material Step */}
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            disabled={stepIdx === 0}
            onClick={() => handleStepChange(stepIdx - 1)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-35 text-xs sm:text-sm font-semibold text-white cursor-pointer disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" /> Sebelumnya
          </button>

          <button
            type="button"
            disabled={stepIdx === chapter.subMaterials.length - 1}
            onClick={() => handleStepChange(stepIdx + 1)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-35 text-xs sm:text-sm font-bold text-white cursor-pointer disabled:cursor-not-allowed"
          >
            Materi Berikutnya <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 6. CONTOH DALAM KEHIDUPAN SEHARI-HARI */}
      <section className="glass-panel rounded-3xl p-5 sm:p-6 space-y-4">
        <h2 className="font-display text-lg sm:text-xl font-bold text-white">
          Contoh dalam Kehidupan Sehari-hari
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapter.everydayExamples.map((ex) => (
            <div
              key={ex.title}
              className="rounded-2xl bg-slate-900/80 border border-slate-700/80 p-4 space-y-2"
            >
              <h3 className="font-bold text-sm text-cyan-300">{ex.title}</h3>
              <p className="text-sm text-slate-200 leading-relaxed">{ex.scenario}</p>
              <p className="text-xs text-amber-300/95 font-medium pt-1">
                Inti Konsep: {ex.takeaway}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. ILUSTRASI VISUAL ATAU DIAGRAM INTERAKTIF */}
      <section className="glass-panel rounded-3xl p-5 sm:p-6 space-y-3">
        <div>
          <h2 className="font-display text-lg sm:text-xl font-bold text-white">
            {chapter.diagramTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            {chapter.diagramCaption}
          </p>
        </div>
        <ChapterInteractiveDiagram chapterId={chapterId} />
      </section>

      {/* 8. AKTIVITAS INTERAKTIF */}
      <section
        id="chapter-activity-section"
        className="glass-panel-elevated rounded-3xl p-5 sm:p-7 space-y-4 border border-cyan-500/35"
      >
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
            Misi Praktik · +90 XP (Sekali Klaim)
          </span>
          <h2 className="font-display text-xl font-bold text-white mt-0.5">
            {chapter.activityTitle}
          </h2>
          <p className="text-sm text-slate-300 mt-1">{chapter.activityDescription}</p>
        </div>
        <InteractiveActivityWidget
          chapterId={chapterId}
          isCompleted={isActivityDone}
          onComplete={() => onCompleteActivity(chapterId)}
        />
      </section>

      {/* 9. RANGKUMAN MATERI */}
      <section className="glass-panel rounded-3xl p-5 sm:p-6 space-y-3 border border-emerald-500/25">
        <div className="flex items-center gap-2 text-emerald-300 font-display font-bold text-lg">
          <Sparkles className="w-5 h-5" />
          <h2>Rangkuman Materi {chapter.numberLabel}</h2>
        </div>
        <ul className="space-y-2 text-sm text-slate-200">
          {chapter.summaryPoints.map((pt) => (
            <li key={pt} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{pt}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 10. TOMBOL LANJUT KE KUIS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl bg-gradient-to-r from-violet-700/40 via-indigo-700/35 to-cyan-700/40 border border-violet-400/45 p-5 sm:p-6">
        <div>
          <h3 className="font-display text-lg font-bold text-white">
            Sudah siap menguji pemahamanmu di {chapter.numberLabel}?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Jawab 5 soal pilihan ganda dengan pembahasan langsung untuk meraih Badge bab ini!
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            soundService.playClick();
            if (!isMaterialRead) onMarkMaterialRead(chapterId);
            onGoToQuiz(chapterId);
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 hover:brightness-110 text-white font-display font-extrabold text-sm sm:text-base shadow-[0_0_24px_rgba(139,92,246,0.5)] cursor-pointer transition active:scale-95 whitespace-nowrap shrink-0"
        >
          <Play className="w-4 h-4 fill-current" />
          LANJUT KE KUIS
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
