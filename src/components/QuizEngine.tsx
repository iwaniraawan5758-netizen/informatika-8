import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Trophy,
  XCircle,
} from 'lucide-react';
import { ChapterId } from '../types/learning';
import { CHAPTERS_DATA } from '../data/chaptersData';
import { QUIZZES_DATA } from '../data/quizzesData';
import { BADGES, getScoreFeedback } from '../data/gamificationData';
import { soundService } from '../services/soundService';
import { Mascot } from './Mascot';

interface QuizEngineProps {
  chapterId: ChapterId;
  onFinishQuiz: (
    chapterId: ChapterId,
    correctCount: number,
    totalQuestions: number
  ) => {
    score: number;
    xpGained: number;
    newlyUnlockedBadges: string[];
    leveledUpTo: number | null;
  };
  onBackToMaterial: (chapterId: ChapterId) => void;
  onBackToDashboard: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

export const QuizEngine: React.FC<QuizEngineProps> = ({
  chapterId,
  onFinishQuiz,
  onBackToMaterial,
  onBackToDashboard,
}) => {
  const chapter = useMemo(
    () => CHAPTERS_DATA.find((c) => c.id === chapterId) ?? CHAPTERS_DATA[0],
    [chapterId]
  );

  const questions = useMemo(
    () => QUIZZES_DATA.filter((q) => q.chapterId === chapterId),
    [chapterId]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [resultSummary, setResultSummary] = useState<{
    score: number;
    xpGained: number;
    newlyUnlockedBadges: string[];
    leveledUpTo: number | null;
  } | null>(null);

  const currentQuestion = questions[currentIndex];
  const hasAnswered = selectedOption !== null;
  const isCorrect = hasAnswered && selectedOption === currentQuestion.correctIndex;

  const handleSelectOption = (optionIdx: number) => {
    if (hasAnswered) return;
    setSelectedOption(optionIdx);
    if (optionIdx === currentQuestion.correctIndex) {
      soundService.playCorrect();
      setCorrectCount((prev) => prev + 1);
    } else {
      soundService.playWrong();
    }
  };

  const handleNext = () => {
    soundService.playClick();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      const outcome = onFinishQuiz(chapterId, correctCount, questions.length);
      setResultSummary(outcome);
    }
  };

  const handleRetry = () => {
    soundService.playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setCorrectCount(0);
    setResultSummary(null);
  };

  if (resultSummary) {
    const feedback = getScoreFeedback(resultSummary.score);
    const unlockedBadgeObjects = BADGES.filter((b) =>
      resultSummary.newlyUnlockedBadges.includes(b.id)
    );

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl mx-auto space-y-6"
      >
        <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 text-center space-y-6">
          <div className="flex justify-center">
            <Mascot
              mood={resultSummary.score >= 70 ? 'celebrating' : 'thinking'}
              compact
            />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              {chapter.numberLabel} · {chapter.title}
            </span>
            <h2 className={`font-display text-2xl sm:text-3xl font-extrabold mt-2 ${feedback.tierColor}`}>
              {feedback.headline}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-1.5 max-w-lg mx-auto">
              {feedback.subtext}
            </p>
          </div>

          {/* Score Ring / Stat Cards */}
          <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
            <div className="rounded-2xl bg-slate-900/85 border border-violet-500/35 p-4">
              <div className="text-xs text-slate-400">Skor Akhir</div>
              <div className="font-display text-3xl font-extrabold text-amber-300 tabular-nums mt-1">
                {resultSummary.score}
              </div>
            </div>
            <div className="rounded-2xl bg-slate-900/85 border border-cyan-500/35 p-4">
              <div className="text-xs text-slate-400">Jawaban Benar</div>
              <div className="font-display text-3xl font-extrabold text-cyan-300 tabular-nums mt-1">
                {correctCount}/{questions.length}
              </div>
            </div>
            <div className="rounded-2xl bg-slate-900/85 border border-pink-500/35 p-4">
              <div className="text-xs text-slate-400">XP Diraih</div>
              <div className="font-display text-3xl font-extrabold text-emerald-300 tabular-nums mt-1">
                +{resultSummary.xpGained}
              </div>
            </div>
          </div>

          {resultSummary.xpGained === 0 && (
            <p className="text-xs text-slate-400">
              XP dasar bab ini sudah pernah kamu klaim sebelumnya—rekor skor terbaikmu tetap tersimpan!
            </p>
          )}

          {/* Level Up or New Badges */}
          {(resultSummary.leveledUpTo || unlockedBadgeObjects.length > 0) && (
            <div className="rounded-2xl bg-gradient-to-r from-violet-600/20 via-pink-500/15 to-amber-500/20 border border-amber-400/40 p-4 space-y-3 text-left">
              {resultSummary.leveledUpTo && (
                <div className="flex items-center gap-2.5 text-amber-300 font-bold text-sm">
                  <Trophy className="w-5 h-5 shrink-0" />
                  <span>LEVEL UP! Kamu naik ke Level {resultSummary.leveledUpTo}!</span>
                </div>
              )}
              {unlockedBadgeObjects.map((badge) => (
                <div key={badge.id} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">
                      Badge Baru Terbuka: {badge.name}
                    </div>
                    <div className="text-xs text-slate-300">{badge.description}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-sm font-bold text-white cursor-pointer transition"
            >
              <RotateCcw className="w-4 h-4" />
              Ulangi Kuis
            </button>
            <button
              type="button"
              onClick={() => {
                soundService.playClick();
                onBackToMaterial(chapterId);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600/25 hover:bg-violet-600/35 border border-violet-400/50 text-sm font-bold text-violet-200 cursor-pointer transition"
            >
              <BookOpen className="w-4 h-4" />
              Baca Materi Bab
            </button>
            <button
              type="button"
              onClick={() => {
                soundService.playClick();
                onBackToDashboard();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:brightness-110 text-sm font-bold text-white cursor-pointer transition"
            >
              <Sparkles className="w-4 h-4" />
              Kembali ke Peta Belajar
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  const progressPct = Math.round(((currentIndex + (hasAnswered ? 1 : 0)) / questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Quiz Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            soundService.playClick();
            onBackToMaterial(chapterId);
          }}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-300 hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Materi
        </button>

        <div className="text-xs sm:text-sm font-semibold text-cyan-300 tabular-nums">
          {chapter.numberLabel} · Soal {currentIndex + 1} dari {questions.length}
        </div>
      </div>

      {/* Animated Progress Bar */}
      <div className="h-2.5 w-full rounded-full bg-slate-800/90 overflow-hidden border border-slate-700/70">
        <motion.div
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-violet-500 via-cyan-400 to-pink-500"
        />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -18 }}
          transition={{ duration: 0.22 }}
          className="glass-panel-elevated rounded-3xl p-5 sm:p-7 space-y-5"
        >
          <div className="flex items-center justify-between gap-2 text-xs font-semibold">
            <span className="text-violet-300">
              Level Kesulitan: {currentQuestion.difficulty}
            </span>
            <span className="text-amber-300 tabular-nums">20 Poin / Soal</span>
          </div>

          <h2 className="font-display text-lg sm:text-xl font-bold text-white leading-relaxed whitespace-pre-line">
            {currentQuestion.question}
          </h2>

          {/* A, B, C, D Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((optionText, idx) => {
              const isPicked = selectedOption === idx;
              const isAnswer = idx === currentQuestion.correctIndex;

              let cardClass =
                'bg-slate-900/80 border-slate-700/90 hover:border-cyan-400/70 hover:bg-slate-800/90 text-slate-100';

              if (hasAnswered) {
                if (isAnswer) {
                  cardClass =
                    'bg-emerald-500/20 border-emerald-400 text-emerald-100 shadow-[0_0_18px_rgba(16,185,129,0.25)]';
                } else if (isPicked && !isAnswer) {
                  cardClass = 'bg-rose-500/20 border-rose-400 text-rose-100';
                } else {
                  cardClass = 'bg-slate-900/50 border-slate-800 text-slate-400 opacity-75';
                }
              }

              return (
                <button
                  key={optionText}
                  type="button"
                  disabled={hasAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left rounded-2xl border p-3.5 sm:p-4 flex items-start gap-3.5 transition-all ${
                    hasAnswered ? 'cursor-default' : 'cursor-pointer active:scale-[0.99]'
                  } ${cardClass}`}
                >
                  <span
                    className={`w-8 h-8 rounded-xl font-mono text-sm font-bold flex items-center justify-center shrink-0 ${
                      hasAnswered && isAnswer
                        ? 'bg-emerald-500 text-slate-950'
                        : hasAnswered && isPicked && !isAnswer
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-800 text-cyan-300 border border-slate-700'
                    }`}
                  >
                    {OPTION_LETTERS[idx]}
                  </span>
                  <span className="text-sm sm:text-base leading-relaxed pt-0.5">
                    {optionText}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Instant Feedback & Explanation */}
          {hasAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl border p-4 space-y-2 ${
                isCorrect
                  ? 'bg-emerald-500/15 border-emerald-400/40'
                  : 'bg-rose-500/15 border-rose-400/40'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                    <span className="text-emerald-200">
                      Benar! +20 Poin · Keren sekali!
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-300" />
                    <span className="text-rose-200">
                      Belum tepat! Jawaban yang benar adalah{' '}
                      {OPTION_LETTERS[currentQuestion.correctIndex]}.
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                <strong className="text-amber-300">Pembahasan: </strong>
                {currentQuestion.explanation}
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:brightness-110 text-white text-sm font-bold cursor-pointer transition active:scale-95"
                >
                  {currentIndex + 1 < questions.length
                    ? 'Soal Berikutnya'
                    : 'Lihat Hasil Kuis'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
