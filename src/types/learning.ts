export type AppView =
  | 'dashboard'
  | 'materi'
  | 'chapter'
  | 'aktivitas'
  | 'kuis'
  | 'quiz-run'
  | 'pencapaian'
  | 'profil';

export type ChapterId = 1 | 2 | 3 | 4 | 5 | 6;

export interface SubMaterialStep {
  id: string;
  title: string;
  tag: string;
  summaryPoints: string[];
  codeOrFormula?: string;
  keyTip: string;
}

export interface EverydayExample {
  title: string;
  scenario: string;
  takeaway: string;
}

export interface ChapterData {
  id: ChapterId;
  numberLabel: string;
  title: string;
  shortTitle: string;
  description: string;
  accentColor: 'purple' | 'cyan' | 'blue' | 'pink' | 'amber' | 'emerald';
  gradientClass: string;
  borderGlowClass: string;
  iconName: string;
  objectives: string[];
  starterQuestion: string;
  starterHint: string;
  subMaterials: SubMaterialStep[];
  everydayExamples: EverydayExample[];
  diagramTitle: string;
  diagramCaption: string;
  activityTitle: string;
  activityDescription: string;
  summaryPoints: string[];
}

export type DifficultyLevel = 'Mudah' | 'Sedang' | 'Menantang';

export interface QuizQuestion {
  id: string;
  chapterId: ChapterId;
  difficulty: DifficultyLevel;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface LevelInfo {
  level: number;
  title: string;
  minXp: number;
  maxXp: number | null;
  colorClass: string;
}

export interface BadgeInfo {
  id: string;
  name: string;
  description: string;
  chapterId?: ChapterId;
  icon: string;
  accentColor: string;
}

export interface QuizAttemptRecord {
  chapterId: ChapterId;
  score: number;
  correctCount: number;
  totalQuestions: number;
  timestamp: string;
}

export interface StudentProfile {
  name: string;
  studentClass: string;
  avatarId: string;
}

export interface UserPreferences {
  soundEnabled: boolean;
  reducedMotion: boolean;
}

export interface LearningProgressState {
  profile: StudentProfile;
  preferences: UserPreferences;
  totalXp: number;
  completedMaterialChapters: ChapterId[];
  completedActivityChapters: ChapterId[];
  completedQuizChapters: ChapterId[];
  bestQuizScores: Partial<Record<ChapterId, number>>;
  quizHistory: QuizAttemptRecord[];
  unlockedBadges: string[];
  /** Tracks exact XP sources already awarded so retaking quizzes/activities never farms duplicate XP */
  awardedXpKeys: string[];
}

export interface TeacherSyncPayload {
  exportedAt: string;
  appVersion: string;
  studentName: string;
  studentClass: string;
  level: number;
  levelTitle: string;
  totalXp: number;
  completedChaptersCount: number;
  averageQuizScore: number;
  chapterScores: Record<string, number | null>;
  badges: string[];
}
