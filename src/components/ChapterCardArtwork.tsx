import React from 'react';
import { ChapterId } from '../types/learning';

export const ChapterCardArtwork: React.FC<{ chapterId: ChapterId }> = ({ chapterId }) => {
  switch (chapterId) {
    case 1:
      return (
        <svg viewBox="0 0 220 96" className="w-full h-24" fill="none">
          <rect width="220" height="96" rx="10" fill="#0B0B2A" />
          {/* Code lines background */}
          <text x="14" y="24" fill="#A855F7" fillOpacity="0.65" fontSize="9" fontFamily="monospace">if (skor &gt;= 75)</text>
          <text x="16" y="42" fill="#22D3EE" fillOpacity="0.65" fontSize="9" fontFamily="monospace">repeat (4)</text>
          <text x="162" y="26" fill="#C084FC" fillOpacity="0.65" fontSize="9" fontFamily="monospace">var x = 10;</text>
          <text x="164" y="72" fill="#38BDF8" fillOpacity="0.55" fontSize="9" fontFamily="monospace">{'{ loop }'}</text>
          {/* Center Glowing Bot */}
          <circle cx="110" cy="48" r="32" fill="#7C3AED" fillOpacity="0.22" />
          <rect x="88" y="24" width="44" height="44" rx="16" fill="#1E1B4B" stroke="#C084FC" strokeWidth="2" />
          <rect x="94" y="34" width="32" height="16" rx="8" fill="#05081A" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="103" cy="42" r="3" fill="#22D3EE" />
          <circle cx="117" cy="42" r="3" fill="#22D3EE" />
          <path d="M105 58 L110 62 L115 58" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 220 96" className="w-full h-24" fill="none">
          <rect width="220" height="96" rx="10" fill="#07182E" />
          {/* Grid cells */}
          <rect x="14" y="14" width="60" height="68" rx="6" stroke="#22D3EE" strokeOpacity="0.45" fill="#0C2A4D" fillOpacity="0.5" />
          <line x1="14" y1="34" x2="74" y2="34" stroke="#22D3EE" strokeOpacity="0.4" />
          <line x1="14" y1="54" x2="74" y2="54" stroke="#22D3EE" strokeOpacity="0.4" />
          <line x1="44" y1="14" x2="44" y2="82" stroke="#22D3EE" strokeOpacity="0.4" />
          <text x="19" y="28" fill="#67E8F9" fontSize="8" fontWeight="700">SUM</text>
          <text x="49" y="28" fill="#A5F3FC" fontSize="8">95</text>
          <text x="19" y="47" fill="#67E8F9" fontSize="8" fontWeight="700">AVG</text>
          <text x="49" y="47" fill="#FACC15" fontSize="8">86</text>
          {/* Mini bars */}
          <rect x="150" y="54" width="12" height="28" rx="3" fill="#22D3EE" />
          <rect x="168" y="38" width="12" height="44" rx="3" fill="#38BDF8" />
          <rect x="186" y="24" width="12" height="58" rx="3" fill="#818CF8" />
          {/* Bot */}
          <rect x="90" y="24" width="42" height="44" rx="16" fill="#0F172A" stroke="#22D3EE" strokeWidth="2" />
          <rect x="96" y="34" width="30" height="16" rx="8" fill="#040B1A" stroke="#67E8F9" strokeWidth="1.5" />
          <circle cx="104" cy="42" r="3" fill="#22D3EE" />
          <circle cx="118" cy="42" r="3" fill="#22D3EE" />
        </svg>
      );
    case 3:
      return (
        <svg viewBox="0 0 220 96" className="w-full h-24" fill="none">
          <rect width="220" height="96" rx="10" fill="#091538" />
          {/* Orbit lines */}
          <circle cx="110" cy="48" r="36" stroke="#60A5FA" strokeOpacity="0.35" strokeDasharray="4 4" />
          <circle cx="44" cy="30" r="10" fill="#1E3A8A" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="176" cy="30" r="10" fill="#1E3A8A" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="44" cy="70" r="10" fill="#1E3A8A" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="176" cy="70" r="10" fill="#1E3A8A" stroke="#38BDF8" strokeWidth="1.5" />
          <line x1="54" y1="32" x2="88" y2="44" stroke="#38BDF8" strokeWidth="1.5" />
          <line x1="166" y1="32" x2="132" y2="44" stroke="#38BDF8" strokeWidth="1.5" />
          <line x1="54" y1="68" x2="88" y2="54" stroke="#38BDF8" strokeWidth="1.5" />
          <line x1="166" y1="68" x2="132" y2="54" stroke="#38BDF8" strokeWidth="1.5" />
          {/* Globe center */}
          <circle cx="110" cy="48" r="22" fill="#172554" stroke="#60A5FA" strokeWidth="2" />
          <ellipse cx="110" cy="48" rx="10" ry="22" stroke="#38BDF8" strokeWidth="1.5" />
          <line x1="88" y1="48" x2="132" y2="48" stroke="#38BDF8" strokeWidth="1.5" />
        </svg>
      );
    case 4:
      return (
        <svg viewBox="0 0 220 96" className="w-full h-24" fill="none">
          <rect width="220" height="96" rx="10" fill="#230A2B" />
          {/* Pie Chart */}
          <circle cx="52" cy="48" r="24" fill="#831843" stroke="#F472B6" strokeWidth="2" />
          <path d="M52 48 L52 24 A24 24 0 0 1 76 48 Z" fill="#EC4899" />
          <path d="M52 48 L76 48 A24 24 0 0 1 40 69 Z" fill="#22D3EE" />
          {/* Trend Line */}
          <polyline
            points="96,68 122,52 146,58 172,30 198,22"
            stroke="#F472B6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="122" cy="52" r="4" fill="#FACC15" />
          <circle cx="172" cy="30" r="4" fill="#22D3EE" />
          <circle cx="198" cy="22" r="4" fill="#FACC15" />
        </svg>
      );
    case 5:
      return (
        <svg viewBox="0 0 220 96" className="w-full h-24" fill="none">
          <rect width="220" height="96" rx="10" fill="#221409" />
          {/* CPU Pins */}
          <rect x="78" y="20" width="64" height="56" rx="10" fill="#451A03" stroke="#FBBF24" strokeWidth="2" />
          <line x1="68" y1="34" x2="78" y2="34" stroke="#F59E0B" strokeWidth="2.5" />
          <line x1="68" y1="48" x2="78" y2="48" stroke="#F59E0B" strokeWidth="2.5" />
          <line x1="68" y1="62" x2="78" y2="62" stroke="#F59E0B" strokeWidth="2.5" />
          <line x1="142" y1="34" x2="152" y2="34" stroke="#F59E0B" strokeWidth="2.5" />
          <line x1="142" y1="48" x2="152" y2="48" stroke="#F59E0B" strokeWidth="2.5" />
          <line x1="142" y1="62" x2="152" y2="62" stroke="#F59E0B" strokeWidth="2.5" />
          <text x="95" y="45" fill="#FDE68A" fontSize="12" fontWeight="800">CPU</text>
          <text x="89" y="61" fill="#F59E0B" fontSize="9" fontFamily="monospace">010110</text>
          {/* Binary accents */}
          <text x="16" y="46" fill="#FBBF24" fillOpacity="0.6" fontSize="9" fontFamily="monospace">INPUT</text>
          <text x="164" y="46" fill="#34D399" fillOpacity="0.8" fontSize="9" fontFamily="monospace">OUTPUT</text>
        </svg>
      );
    case 6:
      return (
        <svg viewBox="0 0 220 96" className="w-full h-24" fill="none">
          <rect width="220" height="96" rx="10" fill="#06221E" />
          <path
            d="M110 14 L144 26 V48 C144 68 128 80 110 86 C92 80 76 68 76 48 V26 L110 14 Z"
            fill="#065F46"
            fillOpacity="0.55"
            stroke="#34D399"
            strokeWidth="2.5"
          />
          <path d="M98 48 L106 56 L124 38" stroke="#FACC15" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <text x="16" y="34" fill="#6EE7B7" fontSize="8" fontWeight="700">2FA ON</text>
          <text x="16" y="68" fill="#38BDF8" fontSize="8" fontWeight="700">PRIVASI</text>
          <text x="158" y="34" fill="#FDE047" fontSize="8" fontWeight="700">ANTI-HOAKS</text>
          <text x="162" y="68" fill="#F472B6" fontSize="8" fontWeight="700">NETIKET</text>
        </svg>
      );
  }
};
