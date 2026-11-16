import {
  ChapterId,
  LearningProgressState,
  QuizAttemptRecord,
  StudentProfile,
  TeacherSyncPayload,
  UserPreferences,
} from '../types/learning';
import {
  BADGES,
  XP_REWARDS,
  getLevelForXp,
} from '../data/gamificationData';

const STORAGE_KEY = 'informatika8_levelup_progress_v2';

export const DEFAULT_PROGRESS_STATE: LearningProgressState = {
  profile: {
    name: 'Digital Explorer',
    studentClass: 'VIII-A',
    avatarId: 'cyber-owl',
  },
  preferences: {
    soundEnabled: true,
    reducedMotion: false,
  },
  totalXp: 0,
  completedMaterialChapters: [],
  completedActivityChapters: [],
  completedQuizChapters: [],
  bestQuizScores: {},
  quizHistory: [],
  unlockedBadges: [],
  awardedXpKeys: [],
};

/**
 * Adapter interface ready for future Google Sheets / Backend Teacher Dashboard integration
 */
export interface ITeacherSyncAdapter {
  buildSyncPayload(state: LearningProgressState): TeacherSyncPayload;
  exportCsv(state: LearningProgressState): string;
}

class LocalStorageService implements ITeacherSyncAdapter {
  public load(): LearningProgressState {
    if (typeof window === 'undefined') return DEFAULT_PROGRESS_STATE;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_PROGRESS_STATE;
      const parsed = JSON.parse(raw) as Partial<LearningProgressState>;
      return {
        ...DEFAULT_PROGRESS_STATE,
        ...parsed,
        profile: {
          ...DEFAULT_PROGRESS_STATE.profile,
          ...(parsed.profile ?? {}),
        },
        preferences: {
          ...DEFAULT_PROGRESS_STATE.preferences,
          ...(parsed.preferences ?? {}),
        },
        completedMaterialChapters: Array.isArray(parsed.completedMaterialChapters)
          ? parsed.completedMaterialChapters
          : [],
        completedActivityChapters: Array.isArray(parsed.completedActivityChapters)
          ? parsed.completedActivityChapters
          : [],
        completedQuizChapters: Array.isArray(parsed.completedQuizChapters)
          ? parsed.completedQuizChapters
          : [],
        bestQuizScores: parsed.bestQuizScores ?? {},
        quizHistory: Array.isArray(parsed.quizHistory) ? parsed.quizHistory : [],
        unlockedBadges: Array.isArray(parsed.unlockedBadges)
          ? parsed.unlockedBadges
          : [],
        awardedXpKeys: Array.isArray(parsed.awardedXpKeys)
          ? parsed.awardedXpKeys
          : [],
      };
    } catch {
      return DEFAULT_PROGRESS_STATE;
    }
  }

  public save(state: LearningProgressState): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors gracefully
    }
  }

  public reset(): LearningProgressState {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Ignore
      }
    }
    return {
      ...DEFAULT_PROGRESS_STATE,
      profile: { ...DEFAULT_PROGRESS_STATE.profile },
      preferences: { ...DEFAULT_PROGRESS_STATE.preferences },
    };
  }

  public updateProfile(
    state: LearningProgressState,
    profile: Partial<StudentProfile>
  ): LearningProgressState {
    const next: LearningProgressState = {
      ...state,
      profile: { ...state.profile, ...profile },
    };
    this.save(next);
    return next;
  }

  public updatePreferences(
    state: LearningProgressState,
    preferences: Partial<UserPreferences>
  ): LearningProgressState {
    const next: LearningProgressState = {
      ...state,
      preferences: { ...state.preferences, ...preferences },
    };
    this.save(next);
    return next;
  }

  public markMaterialRead(
    state: LearningProgressState,
    chapterId: ChapterId
  ): { nextState: LearningProgressState; xpGained: number } {
    const xpKey = `material:${chapterId}`;
    const alreadyAwarded = state.awardedXpKeys.includes(xpKey);
    const xpGained = alreadyAwarded ? 0 : XP_REWARDS.MATERIAL_READ;

    const completedMaterialChapters = state.completedMaterialChapters.includes(chapterId)
      ? state.completedMaterialChapters
      : [...state.completedMaterialChapters, chapterId];

    const awardedXpKeys = alreadyAwarded
      ? state.awardedXpKeys
      : [...state.awardedXpKeys, xpKey];

    const nextState: LearningProgressState = {
      ...state,
      totalXp: state.totalXp + xpGained,
      completedMaterialChapters,
      awardedXpKeys,
    };
    this.save(nextState);
    return { nextState, xpGained };
  }

  public markActivityCompleted(
    state: LearningProgressState,
    chapterId: ChapterId
  ): { nextState: LearningProgressState; xpGained: number } {
    const xpKey = `activity:${chapterId}`;
    const alreadyAwarded = state.awardedXpKeys.includes(xpKey);
    const xpGained = alreadyAwarded ? 0 : XP_REWARDS.ACTIVITY_COMPLETE;

    const completedActivityChapters = state.completedActivityChapters.includes(chapterId)
      ? state.completedActivityChapters
      : [...state.completedActivityChapters, chapterId];

    const awardedXpKeys = alreadyAwarded
      ? state.awardedXpKeys
      : [...state.awardedXpKeys, xpKey];

    const nextState: LearningProgressState = {
      ...state,
      totalXp: state.totalXp + xpGained,
      completedActivityChapters,
      awardedXpKeys,
    };
    this.save(nextState);
    return { nextState, xpGained };
  }

  /**
   * Records a quiz attempt.
   * Fair XP rule: Base completion XP & High-score bonus XP are each awarded AT MOST ONCE per chapter.
   * Retaking a quiz updates bestQuizScores & quizHistory without letting students farm infinite XP.
   */
  public recordQuizCompletion(
    state: LearningProgressState,
    chapterId: ChapterId,
    correctCount: number,
    totalQuestions: number
  ): {
    nextState: LearningProgressState;
    score: number;
    xpGained: number;
    newlyUnlockedBadges: string[];
    leveledUpTo: number | null;
  } {
    const score = Math.round((correctCount / totalQuestions) * 100);
    const prevLevel = getLevelForXp(state.totalXp).level;

    let xpGained = 0;
    const nextAwardedKeys = [...state.awardedXpKeys];

    const baseKey = `quiz-base:${chapterId}`;
    if (!nextAwardedKeys.includes(baseKey)) {
      nextAwardedKeys.push(baseKey);
      xpGained += XP_REWARDS.QUIZ_BASE_COMPLETION;
    }

    const bonusKey = `quiz-bonus:${chapterId}`;
    if (score >= 80 && !nextAwardedKeys.includes(bonusKey)) {
      nextAwardedKeys.push(bonusKey);
      xpGained += XP_REWARDS.QUIZ_HIGH_SCORE_BONUS;
    }

    const completedQuizChapters = state.completedQuizChapters.includes(chapterId)
      ? state.completedQuizChapters
      : [...state.completedQuizChapters, chapterId];

    const prevBest = state.bestQuizScores[chapterId] ?? 0;
    const bestQuizScores: Partial<Record<ChapterId, number>> = {
      ...state.bestQuizScores,
      [chapterId]: Math.max(prevBest, score),
    };

    const record: QuizAttemptRecord = {
      chapterId,
      score,
      correctCount,
      totalQuestions,
      timestamp: new Date().toISOString(),
    };

    // Determine newly unlocked badges
    const nextBadges = [...state.unlockedBadges];
    const newlyUnlockedBadges: string[] = [];

    if (!nextBadges.includes('first-step')) {
      nextBadges.push('first-step');
      newlyUnlockedBadges.push('first-step');
    }

    const chapterBadge = BADGES.find((b) => b.chapterId === chapterId);
    if (chapterBadge && !nextBadges.includes(chapterBadge.id)) {
      nextBadges.push(chapterBadge.id);
      newlyUnlockedBadges.push(chapterBadge.id);
    }

    const nextTotalXp = state.totalXp + xpGained;
    const nextLevel = getLevelForXp(nextTotalXp).level;

    const nextState: LearningProgressState = {
      ...state,
      totalXp: nextTotalXp,
      completedQuizChapters,
      bestQuizScores,
      quizHistory: [record, ...state.quizHistory].slice(0, 30),
      unlockedBadges: nextBadges,
      awardedXpKeys: nextAwardedKeys,
    };

    this.save(nextState);

    return {
      nextState,
      score,
      xpGained,
      newlyUnlockedBadges,
      leveledUpTo: nextLevel > prevLevel ? nextLevel : null,
    };
  }

  public getAverageScore(state: LearningProgressState): number {
    const scores = Object.values(state.bestQuizScores).filter(
      (v): v is number => typeof v === 'number'
    );
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length);
  }

  public buildSyncPayload(state: LearningProgressState): TeacherSyncPayload {
    const levelInfo = getLevelForXp(state.totalXp);
    const chapterScores: Record<string, number | null> = {};
    ([1, 2, 3, 4, 5, 6] as ChapterId[]).forEach((id) => {
      chapterScores[`bab_${id}`] = state.bestQuizScores[id] ?? null;
    });

    return {
      exportedAt: new Date().toISOString(),
      appVersion: '2.0.0',
      studentName: state.profile.name,
      studentClass: state.profile.studentClass,
      level: levelInfo.level,
      levelTitle: levelInfo.title,
      totalXp: state.totalXp,
      completedChaptersCount: state.completedQuizChapters.length,
      averageQuizScore: this.getAverageScore(state),
      chapterScores,
      badges: state.unlockedBadges,
    };
  }

  public exportCsv(state: LearningProgressState): string {
    const payload = this.buildSyncPayload(state);
    const headers = [
      'Nama Siswa',
      'Kelas',
      'Level',
      'Total XP',
      'Bab Selesai',
      'Rata-Rata Nilai',
      'Bab 1',
      'Bab 2',
      'Bab 3',
      'Bab 4',
      'Bab 5',
      'Bab 6',
      'Waktu Ekspor',
    ];
    const row = [
      `"${payload.studentName.replace(/"/g, '""')}"`,
      `"${payload.studentClass.replace(/"/g, '""')}"`,
      `${payload.level} (${payload.levelTitle})`,
      payload.totalXp,
      `${payload.completedChaptersCount}/6`,
      payload.averageQuizScore,
      payload.chapterScores.bab_1 ?? '-',
      payload.chapterScores.bab_2 ?? '-',
      payload.chapterScores.bab_3 ?? '-',
      payload.chapterScores.bab_4 ?? '-',
      payload.chapterScores.bab_5 ?? '-',
      payload.chapterScores.bab_6 ?? '-',
      payload.exportedAt,
    ];
    return `${headers.join(',')}\n${row.join(',')}`;
  }
}

export const storageService = new LocalStorageService();
