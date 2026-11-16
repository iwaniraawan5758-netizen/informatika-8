import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

export type MascotMood = 'idle' | 'happy' | 'thinking' | 'celebrating';

interface MascotProps {
  mood?: MascotMood;
  message?: string;
  compact?: boolean;
  twin?: boolean;
  onClick?: () => void;
}

const MOTIVATIONAL_QUOTES = [
  'Siap naik level hari ini? Pilih bab favoritmu di panel tengah!',
  'Ingat, setiap programmer hebat mulai dari satu baris algoritma!',
  'Cek Pojok Rasa Ingin Tahu di sebelah kiri buat fakta informatika seru!',
  'Saring sebelum sharing! Jadilah Digital Creator yang cerdas dan beretika.',
  'Selesaikan Kuis Kilat di kanan untuk pemanasan sebelum masuk ke Kuis Bab!',
];

const CyberBotSvg: React.FC<{
  mood: MascotMood;
  primaryStop: string;
  secondaryStop: string;
  accentColor: string;
  className?: string;
}> = ({ mood, primaryStop, secondaryStop, accentColor, className = 'w-full h-full' }) => (
  <svg
    viewBox="0 0 120 120"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id={`bot-${primaryStop}`} x1="20" y1="16" x2="100" y2="112" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor={primaryStop} />
        <stop offset="100%" stopColor={secondaryStop} />
      </linearGradient>
    </defs>

    {/* Antenna */}
    <line x1="60" y1="8" x2="60" y2="21" stroke={accentColor} strokeWidth="4" strokeLinecap="round" />
    <circle cx="60" cy="8" r="5" fill="#FACC15" />

    {/* Side Ear Pods */}
    <rect x="14" y="42" width="10" height="26" rx="5" fill={accentColor} />
    <rect x="96" y="42" width="10" height="26" rx="5" fill={accentColor} />

    {/* Head/Body */}
    <rect
      x="22"
      y="21"
      width="76"
      height="78"
      rx="30"
      fill={`url(#bot-${primaryStop})`}
      stroke={accentColor}
      strokeWidth="2.5"
    />

    {/* Visor */}
    <rect x="30" y="34" width="60" height="34" rx="16" fill="#060B22" stroke="#38BDF8" strokeWidth="2" />

    {/* Eyes */}
    {mood === 'celebrating' ? (
      <>
        <path d="M40 52 Q46 43 52 52" stroke="#22D3EE" strokeWidth="3.8" strokeLinecap="round" />
        <path d="M68 52 Q74 43 80 52" stroke="#22D3EE" strokeWidth="3.8" strokeLinecap="round" />
      </>
    ) : mood === 'thinking' ? (
      <>
        <circle cx="46" cy="51" r="5.5" fill="#22D3EE" />
        <rect x="68" y="49" width="11" height="4" rx="2" fill="#22D3EE" />
      </>
    ) : (
      <>
        <circle cx="46" cy="51" r="6.2" fill="#22D3EE" />
        <circle cx="48" cy="48.5" r="2.2" fill="#FFFFFF" />
        <circle cx="74" cy="51" r="6.2" fill="#22D3EE" />
        <circle cx="76" cy="48.5" r="2.2" fill="#FFFFFF" />
      </>
    )}

    {/* Cute Smile */}
    <path
      d="M53 60 Q60 66 67 60"
      stroke="#38BDF8"
      strokeWidth="3"
      strokeLinecap="round"
    />

    {/* Chest Core */}
    <rect x="42" y="76" width="36" height="14" rx="7" fill="#060B22" fillOpacity="0.8" />
    <circle cx="51" cy="83" r="3" fill="#22D3EE" />
    <circle cx="60" cy="83" r="3" fill="#FACC15" />
    <circle cx="69" cy="83" r="3" fill="#EC4899" />
  </svg>
);

export const Mascot: React.FC<MascotProps> = ({
  mood = 'idle',
  message,
  compact = false,
  twin = false,
  onClick,
}) => {
  const [quoteIdx, setQuoteIdx] = useState(0);

  const handleTap = () => {
    setQuoteIdx((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
    onClick?.();
  };

  const displayMessage = message || MOTIVATIONAL_QUOTES[quoteIdx];

  if (twin) {
    return (
      <motion.button
        type="button"
        onClick={handleTap}
        aria-label="Twin Cyber Mascots - Klik untuk interaksi"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="relative flex items-end justify-center cursor-pointer focus:outline-none select-none"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/30 via-violet-500/25 to-pink-500/30 blur-2xl rounded-full" />
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-20 h-20 sm:w-24 sm:h-24 -mr-3 z-10 drop-shadow-[0_0_16px_rgba(34,211,238,0.5)]"
        >
          <CyberBotSvg mood={mood} primaryStop="#0EA5E9" secondaryStop="#312E81" accentColor="#22D3EE" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          className="relative w-20 h-20 sm:w-24 sm:h-24 -ml-2 drop-shadow-[0_0_16px_rgba(168,85,247,0.5)]"
        >
          <CyberBotSvg mood="celebrating" primaryStop="#8B5CF6" secondaryStop="#1E1B4B" accentColor="#EC4899" />
        </motion.div>
      </motion.button>
    );
  }

  return (
    <div className={`flex items-center gap-4 ${compact ? 'flex-row' : 'flex-col sm:flex-row'}`}>
      <motion.button
        type="button"
        onClick={handleTap}
        aria-label="Maskot ByteBot - Klik untuk motivasi belajar"
        whileHover={{ scale: 1.06, rotate: [0, -2, 2, 0] }}
        whileTap={{ scale: 0.95 }}
        animate={
          mood === 'celebrating'
            ? { y: [0, -10, 0], rotate: [0, -4, 4, 0] }
            : { y: [0, -5, 0] }
        }
        transition={{
          duration: mood === 'celebrating' ? 0.9 : 3.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`relative shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-full ${
          compact ? 'w-16 h-16' : 'w-24 h-24 sm:w-28 sm:h-28'
        }`}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-500/40 via-cyan-400/30 to-pink-500/40 blur-lg" />
        <CyberBotSvg
          mood={mood}
          primaryStop="#8B5CF6"
          secondaryStop="#0EA5E9"
          accentColor="#22D3EE"
          className="relative w-full h-full drop-shadow-[0_8px_18px_rgba(56,189,248,0.45)]"
        />
      </motion.button>

      {!compact && (
        <AnimatePresence mode="wait">
          <motion.div
            key={displayMessage}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="relative glass-panel rounded-2xl px-4 py-3 text-sm text-slate-200 max-w-md border border-cyan-400/30"
          >
            <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>ByteBot · Mentor Digitalmu</span>
            </div>
            <p className="leading-relaxed">{displayMessage}</p>
            <span className="block mt-1.5 text-[11px] text-slate-400">
              Ketuk maskot untuk ganti pesan semangat
            </span>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
