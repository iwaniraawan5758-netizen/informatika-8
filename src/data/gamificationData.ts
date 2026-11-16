import { BadgeInfo, LevelInfo } from '../types/learning';

export const LEVELS: LevelInfo[] = [
  {
    level: 1,
    title: 'Newbie',
    minXp: 0,
    maxXp: 249,
    colorClass: 'from-slate-400 to-cyan-400',
  },
  {
    level: 2,
    title: 'Explorer',
    minXp: 250,
    maxXp: 549,
    colorClass: 'from-cyan-400 to-blue-500',
  },
  {
    level: 3,
    title: 'Smart Learner',
    minXp: 550,
    maxXp: 949,
    colorClass: 'from-blue-500 to-violet-500',
  },
  {
    level: 4,
    title: 'Digital Master',
    minXp: 950,
    maxXp: 1399,
    colorClass: 'from-violet-500 to-pink-500',
  },
  {
    level: 5,
    title: 'Informatics Legend',
    minXp: 1400,
    maxXp: null,
    colorClass: 'from-amber-400 via-pink-500 to-violet-500',
  },
];

export const BADGES: BadgeInfo[] = [
  {
    id: 'first-step',
    name: 'First Step',
    description: 'Menyelesaikan kuis pertamamu di Informatika 8.',
    icon: 'Rocket',
    accentColor: 'text-amber-300 border-amber-400/40 bg-amber-500/15',
  },
  {
    id: 'algorithm-thinker',
    name: 'Algorithm Thinker',
    description: 'Menuntaskan Bab 1: Algoritma dan Pemrograman.',
    chapterId: 1,
    icon: 'Cpu',
    accentColor: 'text-violet-300 border-violet-400/40 bg-violet-500/15',
  },
  {
    id: 'data-explorer',
    name: 'Data Explorer',
    description: 'Menuntaskan Bab 2: Pengolahan Data dengan Spreadsheet.',
    chapterId: 2,
    icon: 'Table2',
    accentColor: 'text-cyan-300 border-cyan-400/40 bg-cyan-500/15',
  },
  {
    id: 'net-surfer',
    name: 'Net Surfer',
    description: 'Menuntaskan Bab 3: Jaringan Komputer dan Internet.',
    chapterId: 3,
    icon: 'Globe',
    accentColor: 'text-blue-300 border-blue-400/40 bg-blue-500/15',
  },
  {
    id: 'information-master',
    name: 'Information Master',
    description: 'Menuntaskan Bab 4: Data dan Informasi.',
    chapterId: 4,
    icon: 'BarChart3',
    accentColor: 'text-pink-300 border-pink-400/40 bg-pink-500/15',
  },
  {
    id: 'computer-expert',
    name: 'Computer Expert',
    description: 'Menuntaskan Bab 5: Sistem Komputer.',
    chapterId: 5,
    icon: 'HardDrive',
    accentColor: 'text-amber-300 border-amber-400/40 bg-amber-500/15',
  },
  {
    id: 'digital-citizen',
    name: 'Digital Citizen',
    description: 'Menuntaskan Bab 6: Dampak Sosial Informatika.',
    chapterId: 6,
    icon: 'ShieldCheck',
    accentColor: 'text-emerald-300 border-emerald-400/40 bg-emerald-500/15',
  },
];

export const AVATAR_OPTIONS = [
  { id: 'cyber-owl', label: 'ByteOwl', bg: 'from-violet-600 to-cyan-500' },
  { id: 'neon-fox', label: 'PixelFox', bg: 'from-pink-600 to-amber-500' },
  { id: 'code-cat', label: 'LogicCat', bg: 'from-blue-600 to-violet-500' },
  { id: 'astro-bot', label: 'AstroBot', bg: 'from-emerald-500 to-cyan-500' },
];

export const XP_REWARDS = {
  MATERIAL_READ: 60,
  ACTIVITY_COMPLETE: 90,
  QUIZ_BASE_COMPLETION: 100, // Awarded once per chapter on first quiz completion
  QUIZ_HIGH_SCORE_BONUS: 50, // Awarded once per chapter when score >= 80
};

export function getLevelForXp(xp: number): LevelInfo {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXp) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

export function getLevelProgressPercent(xp: number): number {
  const current = getLevelForXp(xp);
  if (current.maxXp === null) return 100;
  const span = current.maxXp - current.minXp + 1;
  const earnedInLevel = xp - current.minXp;
  return Math.min(100, Math.max(0, Math.round((earnedInLevel / span) * 100)));
}

export function getScoreFeedback(score: number): {
  headline: string;
  subtext: string;
  tierColor: string;
} {
  if (score >= 90) {
    return {
      headline: 'Excellent! Kamu luar biasa!',
      subtext: 'Penguasaan materimu sudah di level pro. Pertahankan semangat belajarmu!',
      tierColor: 'text-amber-300',
    };
  }
  if (score >= 80) {
    return {
      headline: 'Great Job! Pemahamanmu sangat baik!',
      subtext: 'Hampir sempurna! Sedikit lagi kamu menguasai seluruh konsep bab ini.',
      tierColor: 'text-emerald-300',
    };
  }
  if (score >= 70) {
    return {
      headline: 'Good! Terus tingkatkan kemampuanmu!',
      subtext: 'Dasar pemahamanmu sudah kuat. Cek pembahasan soal agar makin mantap.',
      tierColor: 'text-cyan-300',
    };
  }
  if (score >= 60) {
    return {
      headline: 'Keep Learning! Kamu bisa lebih baik!',
      subtext: 'Coba ulangi bagian rangkuman dan aktivitas interaktif sebelum mencoba lagi.',
      tierColor: 'text-violet-300',
    };
  }
  return {
    headline: "Don't Give Up! Pelajari kembali materinya!",
    subtext: 'Belajar adalah proses naik level. Baca ulang kartu materi pelan-pelan ya!',
    tierColor: 'text-pink-300',
  };
}
