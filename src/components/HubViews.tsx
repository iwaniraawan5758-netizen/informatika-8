import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  FlaskConical,
  HelpCircle,
  Lock,
  RotateCcw,
  Save,
  Sparkles,
  Star,
  User,
} from 'lucide-react';
import { ChapterId, LearningProgressState, StudentProfile } from '../types/learning';
import { CHAPTERS_DATA } from '../data/chaptersData';
import { AVATAR_OPTIONS, BADGES, LEVELS, getLevelForXp } from '../data/gamificationData';
import { soundService } from '../services/soundService';
import { InteractiveActivityWidget } from './InteractiveActivities';

/* ============================================================
   MATERI HUB VIEW
   ============================================================ */
export const MateriHubView: React.FC<{
  progress: LearningProgressState;
  onOpenChapter: (id: ChapterId) => void;
}> = ({ progress, onOpenChapter }) => (
  <div className="space-y-6 pb-8">
    <div>
      <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
        Pustaka Materi Informatika VIII
      </h1>
      <p className="text-sm text-slate-300 mt-1">
        Pilih bab manapun untuk membaca materi bertahap, melihat diagram interaktif, dan mempelajari contoh sehari-hari.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {CHAPTERS_DATA.map((chap) => {
        const read = progress.completedMaterialChapters.includes(chap.id);
        return (
          <div
            key={chap.id}
            className="glass-panel rounded-2xl p-5 flex flex-col justify-between gap-4 border border-slate-700/80 hover:border-violet-400/60 transition"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-cyan-300">{chap.numberLabel}</span>
                {read ? (
                  <span className="inline-flex items-center gap-1 text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Sudah Dibaca
                  </span>
                ) : (
                  <span className="text-slate-400">{chap.subMaterials.length} Topik</span>
                )}
              </div>
              <h2 className="font-display text-lg font-bold text-white">{chap.title}</h2>
              <p className="text-xs sm:text-sm text-slate-300">{chap.description}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                soundService.playClick();
                onOpenChapter(chap.id);
              }}
              className={`w-full py-2.5 px-4 rounded-xl bg-gradient-to-r ${chap.gradientClass} text-white text-sm font-bold cursor-pointer hover:brightness-110 transition inline-flex items-center justify-center gap-2`}
            >
              <BookOpen className="w-4 h-4" /> Pelajari Bab Ini
            </button>
          </div>
        );
      })}
    </div>
  </div>
);

/* ============================================================
   AKTIVITAS LAB HUB VIEW
   ============================================================ */
export const AktivitasHubView: React.FC<{
  progress: LearningProgressState;
  onCompleteActivity: (id: ChapterId) => void;
}> = ({ progress, onCompleteActivity }) => {
  const [activeChapId, setActiveChapId] = useState<ChapterId>(1);
  const current = CHAPTERS_DATA.find((c) => c.id === activeChapId) ?? CHAPTERS_DATA[0];

  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
          Zona Aktivitas Interaktif
        </h1>
        <p className="text-sm text-slate-300 mt-1">
          Praktik langsung menyusun algoritma, menulis rumus spreadsheet, inspeksi link phishing, mengolah data grafik, hingga klasifikasi perangkat!
        </p>
      </div>

      {/* Chapter Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {CHAPTERS_DATA.map((chap) => {
          const done = progress.completedActivityChapters.includes(chap.id);
          const active = chap.id === activeChapId;
          return (
            <button
              key={chap.id}
              type="button"
              onClick={() => {
                soundService.playClick();
                setActiveChapId(chap.id);
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold border cursor-pointer transition ${
                active
                  ? 'bg-violet-600 text-white border-violet-400'
                  : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:border-cyan-400'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5" />
              {chap.numberLabel}: {chap.shortTitle}
              {done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />}
            </button>
          );
        })}
      </div>

      <div className="glass-panel-elevated rounded-3xl p-5 sm:p-7 space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
            {current.numberLabel} · Lab Praktik
          </span>
          <h2 className="font-display text-xl font-bold text-white mt-0.5">
            {current.activityTitle}
          </h2>
          <p className="text-sm text-slate-300 mt-1">{current.activityDescription}</p>
        </div>

        <InteractiveActivityWidget
          key={activeChapId}
          chapterId={activeChapId}
          isCompleted={progress.completedActivityChapters.includes(activeChapId)}
          onComplete={() => onCompleteActivity(activeChapId)}
        />
      </div>
    </div>
  );
};

/* ============================================================
   KUIS HUB VIEW
   ============================================================ */
export const KuisHubView: React.FC<{
  progress: LearningProgressState;
  onStartQuiz: (id: ChapterId) => void;
}> = ({ progress, onStartQuiz }) => (
  <div className="space-y-6 pb-8">
    <div>
      <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
        Arena Kuis Evaluasi
      </h1>
      <p className="text-sm text-slate-300 mt-1">
        Setiap bab berisi 5 soal pilihan ganda (20 poin/soal) lengkap dengan pembahasan langsung. Raih skor minimal 80 untuk bonus XP!
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {CHAPTERS_DATA.map((chap) => {
        const best = progress.bestQuizScores[chap.id];
        const done = progress.completedQuizChapters.includes(chap.id);
        return (
          <div
            key={chap.id}
            className="glass-panel rounded-2xl p-5 flex flex-col justify-between gap-4 border border-slate-700/80"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-cyan-300">{chap.numberLabel}</span>
                {typeof best === 'number' ? (
                  <span className="inline-flex items-center gap-1 text-amber-300 tabular-nums">
                    <Star className="w-3.5 h-3.5 fill-amber-300" /> Terbaik: {best}
                  </span>
                ) : (
                  <span className="text-slate-400">Belum Dikerjakan</span>
                )}
              </div>
              <h2 className="font-display text-lg font-bold text-white">{chap.title}</h2>
              <p className="text-xs text-slate-400">5 Soal Pilihan Ganda · Pembahasan Otomatis</p>
            </div>

            <button
              type="button"
              onClick={() => {
                soundService.playClick();
                onStartQuiz(chap.id);
              }}
              className={`w-full py-2.5 px-4 rounded-xl bg-gradient-to-r ${chap.gradientClass} text-white text-sm font-bold cursor-pointer hover:brightness-110 transition inline-flex items-center justify-center gap-2`}
            >
              <HelpCircle className="w-4 h-4" />
              {done ? 'Ulangi Kuis Bab Ini' : 'Kerjakan Kuis Sekarang'}
            </button>
          </div>
        );
      })}
    </div>
  </div>
);

/* ============================================================
   PENCAPAIAN (BADGES & LEVEL) VIEW
   ============================================================ */
export const PencapaianView: React.FC<{ progress: LearningProgressState }> = ({ progress }) => {
  const currentLevel = getLevelForXp(progress.totalXp);

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
          Pencapaian & Koleksi Badge
        </h1>
        <p className="text-sm text-slate-300 mt-1">
          Kumpulkan XP dengan membaca materi, menuntaskan aktivitas lab, dan mengerjakan kuis tiap bab!
        </p>
      </div>

      {/* Level Progression Roadmap */}
      <section className="glass-panel rounded-3xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-white">Tangga Level Belajar</h2>
          <span className="text-xs font-bold text-amber-300 font-mono tabular-nums">
            XP Saat Ini: {progress.totalXp} XP
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {LEVELS.map((lvl) => {
            const reached = progress.totalXp >= lvl.minXp;
            const isCurrent = currentLevel.level === lvl.level;
            return (
              <div
                key={lvl.level}
                className={`rounded-2xl p-3.5 border transition ${
                  isCurrent
                    ? 'bg-violet-600/25 border-violet-400 shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                    : reached
                    ? 'bg-emerald-500/10 border-emerald-400/40'
                    : 'bg-slate-900/70 border-slate-800 opacity-75'
                }`}
              >
                <div className="text-xs font-bold text-cyan-300">Level {lvl.level}</div>
                <div className="font-display text-sm font-extrabold text-white mt-0.5">
                  {lvl.title}
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-1.5 tabular-nums">
                  Mulai {lvl.minXp} XP
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Badges Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-white">
            Koleksi Badge ({progress.unlockedBadges.length}/{BADGES.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BADGES.map((badge, idx) => {
            const unlocked = progress.unlockedBadges.includes(badge.id);
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                className={`rounded-2xl p-5 border flex items-start gap-4 transition ${
                  unlocked
                    ? `glass-panel-elevated ${badge.accentColor}`
                    : 'bg-slate-900/60 border-slate-800 text-slate-400'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    unlocked
                      ? 'bg-amber-400/20 border border-amber-300/50 text-amber-300'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {unlocked ? <Award className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className={`font-display font-bold text-base ${unlocked ? 'text-white' : 'text-slate-400'}`}>
                      {badge.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {badge.description}
                  </p>
                  <span
                    className={`inline-block mt-2 text-[11px] font-bold ${
                      unlocked ? 'text-emerald-300' : 'text-slate-500'
                    }`}
                  >
                    {unlocked ? 'Terbuka' : 'Belum Terbuka'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

/* ============================================================
   PROFIL SISWA VIEW
   ============================================================ */
export const ProfilView: React.FC<{
  progress: LearningProgressState;
  onUpdateProfile: (profile: Partial<StudentProfile>) => void;
  onRequestReset: () => void;
}> = ({ progress, onUpdateProfile, onRequestReset }) => {
  const [name, setName] = useState(progress.profile.name);
  const [studentClass, setStudentClass] = useState(progress.profile.studentClass);
  const [avatarId, setAvatarId] = useState(progress.profile.avatarId);
  const [savedNotice, setSavedNotice] = useState(false);

  const levelInfo = getLevelForXp(progress.totalXp);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    soundService.playSuccess();
    onUpdateProfile({
      name: name.trim() || 'Digital Explorer',
      studentClass: studentClass.trim() || 'VIII-A',
      avatarId,
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
          Profil Siswa & Riwayat Nilai
        </h1>
        <p className="text-sm text-slate-300 mt-1">
          Atur identitas belajarmu dan pantau riwayat skor kuis untuk setiap bab.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Edit Profile Form */}
        <form
          onSubmit={handleSave}
          className="lg:col-span-6 glass-panel-elevated rounded-3xl p-5 sm:p-6 space-y-4"
        >
          <div className="flex items-center gap-3 pb-2 border-b border-slate-800">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-display font-bold text-white">{progress.profile.name}</div>
              <div className="text-xs text-cyan-300">
                Level {levelInfo.level} · {levelInfo.title} · {progress.totalXp} XP
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="student-name" className="block text-xs font-semibold text-slate-300">
              Nama Siswa
            </label>
            <input
              id="student-name"
              type="text"
              maxLength={40}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Nadia Putri"
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="student-class" className="block text-xs font-semibold text-slate-300">
              Kelas
            </label>
            <input
              id="student-class"
              type="text"
              maxLength={15}
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              placeholder="Contoh: VIII-A"
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="space-y-2">
            <span className="block text-xs font-semibold text-slate-300">Pilih Karakter Avatar</span>
            <div className="grid grid-cols-2 gap-2">
              {AVATAR_OPTIONS.map((av) => (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => {
                    soundService.playClick();
                    setAvatarId(av.id);
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 cursor-pointer transition ${
                    avatarId === av.id
                      ? 'bg-violet-600/25 border-violet-400 text-white'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full bg-gradient-to-br ${av.bg} shrink-0`} />
                  <span>{av.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:brightness-110 text-white text-sm font-bold cursor-pointer"
            >
              <Save className="w-4 h-4" /> Simpan Profil
            </button>

            <button
              type="button"
              onClick={() => {
                soundService.playClick();
                onRequestReset();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/35 text-rose-300 text-xs font-bold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Progres
            </button>
          </div>

          {savedNotice && (
            <p className="text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Profil berhasil diperbarui dan tersimpan otomatis!
            </p>
          )}
        </form>

        {/* Nilai per Bab & Riwayat */}
        <div className="lg:col-span-6 space-y-4">
          <div className="glass-panel rounded-3xl p-5 sm:p-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white">
              Skor Terbaik per Bab
            </h2>
            <div className="space-y-2.5">
              {CHAPTERS_DATA.map((chap) => {
                const best = progress.bestQuizScores[chap.id];
                return (
                  <div
                    key={chap.id}
                    className="flex items-center justify-between rounded-xl bg-slate-900/80 border border-slate-800 px-3.5 py-2.5 text-sm"
                  >
                    <div>
                      <span className="font-bold text-cyan-300 mr-2">{chap.numberLabel}</span>
                      <span className="text-slate-200">{chap.shortTitle}</span>
                    </div>
                    <span className="font-mono font-bold tabular-nums text-amber-300">
                      {typeof best === 'number' ? `${best} / 100` : '—'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-5 sm:p-6 space-y-3">
            <h2 className="font-display text-lg font-bold text-white">
              Riwayat Kuis Terakhir
            </h2>
            {progress.quizHistory.length === 0 ? (
              <p className="text-xs sm:text-sm text-slate-400">
                Belum ada riwayat kuis. Kerjakan kuis bab mana saja untuk mencatat progresmu!
              </p>
            ) : (
              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {progress.quizHistory.slice(0, 8).map((rec, i) => (
                  <div
                    key={`${rec.timestamp}-${i}`}
                    className="flex items-center justify-between text-xs rounded-xl bg-slate-900/75 border border-slate-800 px-3 py-2"
                  >
                    <span className="text-slate-200 font-semibold">
                      BAB {rec.chapterId} · Benar {rec.correctCount}/{rec.totalQuestions}
                    </span>
                    <span className="font-mono font-bold text-emerald-300 tabular-nums">
                      Skor {rec.score}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
