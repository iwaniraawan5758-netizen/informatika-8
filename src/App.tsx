import React, { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import {
  Award,
  BookOpen,
  FlaskConical,
  HelpCircle,
  Home,
  Settings,
  Sparkles,
  User,
  Volume2,
  VolumeX,
  Zap,
} from 'lucide-react';
import {
  AppView,
  ChapterId,
  LearningProgressState,
  StudentProfile,
  UserPreferences,
} from './types/learning';
import { getLevelForXp } from './data/gamificationData';
import { storageService } from './services/storageService';
import { soundService } from './services/soundService';
import { SplashLoader } from './components/SplashLoader';
import { ConfettiOverlay } from './components/ConfettiOverlay';
import { DashboardView } from './components/DashboardView';
import { ChapterLearningView } from './components/ChapterLearningView';
import { QuizEngine } from './components/QuizEngine';
import {
  AktivitasHubView,
  KuisHubView,
  MateriHubView,
  PencapaianView,
  ProfilView,
} from './components/HubViews';
import { SettingsModal } from './components/SettingsModal';

interface NavItem {
  id: AppView;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Beranda', icon: Home },
  { id: 'materi', label: 'Materi', icon: BookOpen },
  { id: 'aktivitas', label: 'Aktivitas', icon: FlaskConical },
  { id: 'kuis', label: 'Kuis', icon: HelpCircle },
  { id: 'pencapaian', label: 'Pencapaian', icon: Award },
  { id: 'profil', label: 'Profil', icon: User },
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [progress, setProgress] = useState<LearningProgressState>(() =>
    storageService.load()
  );
  const [activeView, setActiveView] = useState<AppView>('dashboard');
  const [selectedChapterId, setSelectedChapterId] = useState<ChapterId>(1);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    soundService.setEnabled(progress.preferences.soundEnabled);
    if (progress.preferences.reducedMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
  }, [progress.preferences.soundEnabled, progress.preferences.reducedMotion]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const navigateTo = (view: AppView) => {
    soundService.playClick();
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenChapter = (chapterId: ChapterId) => {
    setSelectedChapterId(chapterId);
    setActiveView('chapter');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuiz = (chapterId: ChapterId) => {
    setSelectedChapterId(chapterId);
    setActiveView('quiz-run');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMarkMaterialRead = (chapterId: ChapterId) => {
    const { nextState, xpGained } = storageService.markMaterialRead(progress, chapterId);
    setProgress(nextState);
    if (xpGained > 0) {
      soundService.playCorrect();
      showToast(`Materi Bab ${chapterId} tuntas! +${xpGained} XP`);
    }
  };

  const handleCompleteActivity = (chapterId: ChapterId) => {
    const { nextState, xpGained } = storageService.markActivityCompleted(
      progress,
      chapterId
    );
    setProgress(nextState);
    if (xpGained > 0) {
      soundService.playBadge();
      showToast(`Lab Aktivitas Bab ${chapterId} berhasil! +${xpGained} XP`);
    }
  };

  const handleFinishQuiz = (
    chapterId: ChapterId,
    correctCount: number,
    totalQuestions: number
  ) => {
    const result = storageService.recordQuizCompletion(
      progress,
      chapterId,
      correctCount,
      totalQuestions
    );
    setProgress(result.nextState);

    if (result.score >= 80 || result.newlyUnlockedBadges.length > 0) {
      setShowConfetti(true);
      soundService.playSuccess();
    } else {
      soundService.playClick();
    }

    if (result.leveledUpTo) {
      showToast(`LEVEL UP! Selamat, kamu naik ke Level ${result.leveledUpTo}!`);
    } else if (result.newlyUnlockedBadges.length > 0) {
      showToast(`Badge baru terbuka! +${result.xpGained} XP`);
    }

    return result;
  };

  const handleUpdateProfile = (profile: Partial<StudentProfile>) => {
    const next = storageService.updateProfile(progress, profile);
    setProgress(next);
  };

  const handleUpdatePreferences = (prefs: Partial<UserPreferences>) => {
    const next = storageService.updatePreferences(progress, prefs);
    setProgress(next);
  };

  const handleResetProgress = () => {
    const fresh = storageService.reset();
    setProgress(fresh);
    setActiveView('dashboard');
    showToast('Progres belajar berhasil direset ke awal.');
  };

  const toggleSoundQuick = () => {
    const nextVal = !progress.preferences.soundEnabled;
    soundService.setEnabled(nextVal);
    if (nextVal) soundService.playClick();
    handleUpdatePreferences({ soundEnabled: nextVal });
  };

  const levelInfo = getLevelForXp(progress.totalXp);

  const isNavHighlighted = (id: AppView) => {
    if (id === 'materi' && activeView === 'chapter') return true;
    if (id === 'kuis' && activeView === 'quiz-run') return true;
    return activeView === id;
  };

  return (
    <MotionConfig reducedMotion={progress.preferences.reducedMotion ? 'always' : 'user'}>
      <div className="min-h-screen bg-[#040717] gaming-grid-bg text-slate-100 flex flex-col">
        {showSplash && <SplashLoader onFinish={() => setShowSplash(false)} />}
        <ConfettiOverlay active={showConfetti} onDone={() => setShowConfetti(false)} />

        {/* TOP FUTURISTIC COCKPIT HEADER */}
        <header className="sticky top-0 z-40 border-b border-cyan-500/25 bg-[#05091E]/90 backdrop-blur-xl">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
            {/* Left: Brand */}
            <button
              type="button"
              onClick={() => navigateTo('dashboard')}
              className="flex items-center gap-2.5 cursor-pointer shrink-0 group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-violet-600 flex items-center justify-center shadow-[0_0_18px_rgba(34,211,238,0.5)] group-hover:scale-105 transition">
                <Zap className="w-5 h-5 text-amber-300" />
              </div>
              <div className="text-left leading-tight">
                <span className="font-display font-extrabold text-sm sm:text-base tracking-tight text-white block whitespace-nowrap">
                  INFORMATIKA 8
                </span>
                <span className="hidden sm:block text-[10px] font-semibold tracking-wider text-cyan-300 uppercase">
                  Level Up Your Brain
                </span>
              </div>
            </button>

            {/* Center: Desktop Nav Links */}
            <nav aria-label="Navigasi Utama" className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = isNavHighlighted(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigateTo(item.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer transition ${
                      active
                        ? 'bg-cyan-500/20 text-white border border-cyan-400/50 shadow-[0_0_14px_rgba(34,211,238,0.3)]'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/70 border border-transparent'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-cyan-300' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Right: Student Stats + Sound + Settings */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => navigateTo('profil')}
                className="hidden sm:inline-flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/35 hover:border-cyan-300 cursor-pointer transition whitespace-nowrap"
              >
                <span className="text-xs font-bold text-white max-w-[110px] truncate">
                  {progress.profile.name}
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-xs font-bold text-cyan-300">Lv.{levelInfo.level}</span>
                <span className="text-slate-500">·</span>
                <span className="font-mono text-xs font-extrabold text-amber-300 tabular-nums">
                  {progress.totalXp} XP
                </span>
              </button>

              <button
                type="button"
                onClick={toggleSoundQuick}
                aria-label={
                  progress.preferences.soundEnabled ? 'Matikan suara' : 'Nyalakan suara'
                }
                title={progress.preferences.soundEnabled ? 'Suara: ON' : 'Suara: OFF'}
                className={`p-2 rounded-xl border cursor-pointer transition ${
                  progress.preferences.soundEnabled
                    ? 'bg-cyan-500/15 border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/25'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                {progress.preferences.soundEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  soundService.playClick();
                  setSettingsOpen(true);
                }}
                aria-label="Buka Pengaturan"
                className="p-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 cursor-pointer transition"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* FLOATING TOAST */}
        <AnimatePresence>
          {toastMsg && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="fixed top-20 right-4 z-50 glass-panel-elevated rounded-2xl px-4 py-3 border border-amber-400/50 flex items-center gap-2.5 text-xs sm:text-sm font-bold text-amber-200 shadow-xl"
            >
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span>{toastMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN COMMAND CONTENT */}
        <main className="flex-1 max-w-[1440px] w-full mx-auto px-3 sm:px-5 pt-5 pb-24 lg:pb-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeView}-${selectedChapterId}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {activeView === 'dashboard' && (
                <DashboardView
                  progress={progress}
                  onOpenChapter={handleOpenChapter}
                  onOpenQuiz={handleOpenQuiz}
                  onNavigateView={navigateTo}
                />
              )}
              {activeView === 'materi' && (
                <MateriHubView
                  progress={progress}
                  onOpenChapter={handleOpenChapter}
                />
              )}
              {activeView === 'chapter' && (
                <ChapterLearningView
                  chapterId={selectedChapterId}
                  isMaterialRead={progress.completedMaterialChapters.includes(
                    selectedChapterId
                  )}
                  isActivityDone={progress.completedActivityChapters.includes(
                    selectedChapterId
                  )}
                  isQuizDone={progress.completedQuizChapters.includes(selectedChapterId)}
                  bestScore={progress.bestQuizScores[selectedChapterId]}
                  onMarkMaterialRead={handleMarkMaterialRead}
                  onCompleteActivity={handleCompleteActivity}
                  onGoToQuiz={handleOpenQuiz}
                  onBack={() => navigateTo('dashboard')}
                />
              )}
              {activeView === 'aktivitas' && (
                <AktivitasHubView
                  progress={progress}
                  onCompleteActivity={handleCompleteActivity}
                />
              )}
              {activeView === 'kuis' && (
                <KuisHubView progress={progress} onStartQuiz={handleOpenQuiz} />
              )}
              {activeView === 'quiz-run' && (
                <QuizEngine
                  chapterId={selectedChapterId}
                  onFinishQuiz={handleFinishQuiz}
                  onBackToMaterial={handleOpenChapter}
                  onBackToDashboard={() => navigateTo('dashboard')}
                />
              )}
              {activeView === 'pencapaian' && (
                <PencapaianView progress={progress} />
              )}
              {activeView === 'profil' && (
                <ProfilView
                  progress={progress}
                  onUpdateProfile={handleUpdateProfile}
                  onRequestReset={() => setSettingsOpen(true)}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* FUTURISTIC COCKPIT BOTTOM DOCK (Desktop subtle deck + Mobile nav <= 64px) */}
        <nav
          aria-label="Navigasi Cockpit"
          className="fixed bottom-0 inset-x-0 z-40 h-16 lg:h-14 bg-[#05091E]/95 backdrop-blur-xl border-t border-cyan-500/30 cockpit-console-glow px-2 flex items-center justify-around lg:justify-center lg:gap-4"
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isNavHighlighted(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateTo(item.id)}
                className={`flex flex-col lg:flex-row items-center justify-center gap-0.5 lg:gap-2 px-2.5 lg:px-4 py-1.5 rounded-xl cursor-pointer transition ${
                  active
                    ? 'text-cyan-300 lg:bg-cyan-500/15 lg:border lg:border-cyan-400/40'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px] lg:text-xs font-bold">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* SETTINGS & RESET MODAL */}
        <SettingsModal
          open={settingsOpen}
          progress={progress}
          onClose={() => setSettingsOpen(false)}
          onUpdatePreferences={handleUpdatePreferences}
          onConfirmReset={handleResetProgress}
        />
      </div>
    </MotionConfig>
  );
}
