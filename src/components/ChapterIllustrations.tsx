import React, { useState } from 'react';
import { ChapterId } from '../types/learning';

interface IllustrationProps {
  chapterId: ChapterId;
}

/**
 * Custom crisp SVG illustration banner for each chapter
 */
export const ChapterHeroIllustration: React.FC<IllustrationProps> = ({ chapterId }) => {
  switch (chapterId) {
    case 1:
      return (
        <svg viewBox="0 0 360 150" className="w-full h-36 sm:h-44" fill="none">
          <rect width="360" height="150" rx="16" fill="#131636" />
          {/* Scratch-style puzzle blocks */}
          <rect x="28" y="24" width="130" height="28" rx="8" fill="#F59E0B" />
          <text x="42" y="42" fill="#0F172A" fontSize="11" fontWeight="700">When Flag Clicked</text>
          <rect x="28" y="56" width="150" height="30" rx="8" fill="#8B5CF6" />
          <text x="42" y="75" fill="#FFFFFF" fontSize="11" fontWeight="600">Repeat (4) times</text>
          <rect x="46" y="90" width="128" height="28" rx="8" fill="#06B6D4" />
          <text x="58" y="108" fill="#0F172A" fontSize="11" fontWeight="700">Move 10 + Turn 90°</text>
          {/* Arrow to output */}
          <path d="M196 74 H234" stroke="#FACC15" strokeWidth="3" strokeDasharray="4 4" />
          <polygon points="234,68 244,74 234,80" fill="#FACC15" />
          {/* Square Drawn */}
          <rect x="256" y="38" width="72" height="72" rx="8" stroke="#EC4899" strokeWidth="3.5" fill="#EC4899" fillOpacity="0.12" />
          <circle cx="256" cy="38" r="5" fill="#22D3EE" />
          <circle cx="328" cy="38" r="5" fill="#22D3EE" />
          <circle cx="328" cy="110" r="5" fill="#22D3EE" />
          <circle cx="256" cy="110" r="5" fill="#22D3EE" />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 360 150" className="w-full h-36 sm:h-44" fill="none">
          <rect width="360" height="150" rx="16" fill="#0E1B33" />
          {/* Grid */}
          <rect x="24" y="22" width="190" height="106" rx="8" fill="#172554" stroke="#38BDF8" strokeOpacity="0.4" />
          <rect x="24" y="22" width="190" height="24" rx="8" fill="#0284C7" fillOpacity="0.35" />
          <text x="44" y="38" fill="#BAE6FD" fontSize="10" fontWeight="700">A (Nama)</text>
          <text x="128" y="38" fill="#BAE6FD" fontSize="10" fontWeight="700">B (Nilai)</text>
          <line x1="115" y1="22" x2="115" y2="128" stroke="#38BDF8" strokeOpacity="0.25" />
          <line x1="24" y1="68" x2="214" y2="68" stroke="#38BDF8" strokeOpacity="0.2" />
          <line x1="24" y1="92" x2="214" y2="92" stroke="#38BDF8" strokeOpacity="0.2" />
          <text x="40" y="61" fill="#E2E8F0" fontSize="10">Nadia</text>
          <text x="140" y="61" fill="#22D3EE" fontSize="10" fontWeight="700">92</text>
          <text x="40" y="84" fill="#E2E8F0" fontSize="10">Rafi</text>
          <text x="140" y="84" fill="#22D3EE" fontSize="10" fontWeight="700">88</text>
          <rect x="115" y="96" width="99" height="32" fill="#10B981" fillOpacity="0.2" stroke="#10B981" />
          <text x="36" y="116" fill="#FACC15" fontSize="10" fontWeight="700">AVERAGE</text>
          <text x="130" y="116" fill="#34D399" fontSize="11" fontWeight="700">=AVG(B2:B3)</text>
          {/* Mini Chart */}
          <rect x="234" y="26" width="102" height="102" rx="10" fill="#0F172A" stroke="#38BDF8" strokeOpacity="0.3" />
          <rect x="252" y="54" width="22" height="58" rx="4" fill="#38BDF8" />
          <rect x="288" y="66" width="22" height="46" rx="4" fill="#8B5CF6" />
          <text x="252" y="42" fill="#94A3B8" fontSize="9" fontWeight="600">CHART LIVE</text>
        </svg>
      );
    case 3:
      return (
        <svg viewBox="0 0 360 150" className="w-full h-36 sm:h-44" fill="none">
          <rect width="360" height="150" rx="16" fill="#0D1936" />
          {/* Nodes */}
          <line x1="70" y1="50" x2="180" y2="75" stroke="#38BDF8" strokeWidth="2.5" />
          <line x1="70" y1="106" x2="180" y2="75" stroke="#38BDF8" strokeWidth="2.5" />
          <line x1="180" y1="75" x2="290" y2="75" stroke="#EC4899" strokeWidth="3" strokeDasharray="5 4" />
          <rect x="34" y="34" width="56" height="32" rx="8" fill="#1E3A8A" stroke="#60A5FA" />
          <text x="48" y="54" fill="#E0F2FE" fontSize="10" fontWeight="700">PC 1</text>
          <rect x="34" y="90" width="56" height="32" rx="8" fill="#1E3A8A" stroke="#60A5FA" />
          <text x="48" y="110" fill="#E0F2FE" fontSize="10" fontWeight="700">PC 2</text>
          {/* Router */}
          <circle cx="180" cy="75" r="26" fill="#312E81" stroke="#22D3EE" strokeWidth="2.5" />
          <text x="159" y="79" fill="#22D3EE" fontSize="10" fontWeight="700">ROUTER</text>
          {/* Internet Cloud */}
          <rect x="254" y="47" width="80" height="56" rx="24" fill="#831843" fillOpacity="0.45" stroke="#EC4899" strokeWidth="2" />
          <text x="268" y="79" fill="#FBCFE8" fontSize="10" fontWeight="700">INTERNET</text>
        </svg>
      );
    case 4:
      return (
        <svg viewBox="0 0 360 150" className="w-full h-36 sm:h-44" fill="none">
          <rect width="360" height="150" rx="16" fill="#23102B" />
          {/* Raw Data */}
          <rect x="24" y="32" width="110" height="86" rx="10" fill="#1F1638" stroke="#F472B6" strokeOpacity="0.4" />
          <text x="38" y="52" fill="#F9A8D4" fontSize="10" fontWeight="700">DATA MENTAH</text>
          <text x="38" y="72" fill="#CBD5E1" fontSize="10">A: 12 · B: 28</text>
          <text x="38" y="90" fill="#CBD5E1" fontSize="10">C: 18 · D: 42</text>
          <path d="M148 75 H188" stroke="#FACC15" strokeWidth="3" />
          <polygon points="188,69 198,75 188,81" fill="#FACC15" />
          {/* Visual Information */}
          <rect x="210" y="26" width="126" height="98" rx="12" fill="#18122B" stroke="#EC4899" />
          <text x="225" y="46" fill="#FDE047" fontSize="10" fontWeight="700">INFORMASI GRAFIK</text>
          <rect x="226" y="88" width="18" height="24" rx="3" fill="#38BDF8" />
          <rect x="252" y="68" width="18" height="44" rx="3" fill="#8B5CF6" />
          <rect x="278" y="78" width="18" height="34" rx="3" fill="#10B981" />
          <rect x="304" y="54" width="18" height="58" rx="3" fill="#EC4899" />
        </svg>
      );
    case 5:
      return (
        <svg viewBox="0 0 360 150" className="w-full h-36 sm:h-44" fill="none">
          <rect width="360" height="150" rx="16" fill="#221712" />
          <rect x="24" y="45" width="76" height="60" rx="10" fill="#292524" stroke="#F59E0B" />
          <text x="42" y="78" fill="#FDE68A" fontSize="11" fontWeight="700">INPUT</text>
          <path d="M104 75 H132" stroke="#FBBF24" strokeWidth="2.5" />
          <rect x="136" y="30" width="92" height="90" rx="12" fill="#451A03" stroke="#FB923C" strokeWidth="2" />
          <text x="167" y="60" fill="#FDBA74" fontSize="12" fontWeight="800">CPU</text>
          <text x="152" y="80" fill="#E2E8F0" fontSize="9">CU · ALU · Reg</text>
          <text x="157" y="100" fill="#22D3EE" fontSize="9" fontWeight="700">01001101</text>
          <path d="M232 75 H260" stroke="#FBBF24" strokeWidth="2.5" />
          <rect x="264" y="45" width="72" height="60" rx="10" fill="#292524" stroke="#10B981" />
          <text x="278" y="78" fill="#6EE7B7" fontSize="11" fontWeight="700">OUTPUT</text>
        </svg>
      );
    case 6:
      return (
        <svg viewBox="0 0 360 150" className="w-full h-36 sm:h-44" fill="none">
          <rect width="360" height="150" rx="16" fill="#0A2220" />
          <path
            d="M180 22 L236 42 V78 C236 108 210 126 180 136 C150 126 124 108 124 78 V42 L180 22 Z"
            fill="#065F46"
            fillOpacity="0.45"
            stroke="#34D399"
            strokeWidth="3"
          />
          <path d="M162 78 L175 91 L202 62" stroke="#FACC15" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="24" y="38" width="84" height="28" rx="8" fill="#0F172A" stroke="#34D399" strokeOpacity="0.5" />
          <text x="36" y="56" fill="#A7F3D0" fontSize="10" fontWeight="700">ANTI-HOAKS</text>
          <rect x="24" y="84" width="84" height="28" rx="8" fill="#0F172A" stroke="#22D3EE" strokeOpacity="0.5" />
          <text x="36" y="102" fill="#BAE6FD" fontSize="10" fontWeight="700">PRIVASI 2FA</text>
          <rect x="252" y="38" width="84" height="28" rx="8" fill="#0F172A" stroke="#FACC15" strokeOpacity="0.5" />
          <text x="262" y="56" fill="#FEF08A" fontSize="10" fontWeight="700">JEJAK POSITIF</text>
          <rect x="252" y="84" width="84" height="28" rx="8" fill="#0F172A" stroke="#EC4899" strokeOpacity="0.5" />
          <text x="262" y="102" fill="#FBCFE8" fontSize="10" fontWeight="700">ETIKA DIGITAL</text>
        </svg>
      );
  }
};

/**
 * Interactive annotated diagram section inside each chapter
 */
export const ChapterInteractiveDiagram: React.FC<IllustrationProps> = ({ chapterId }) => {
  const [selectedPart, setSelectedPart] = useState(0);

  const diagrams: Record<
    ChapterId,
    { label: string; parts: { title: string; badge: string; detail: string }[] }
  > = {
    1: {
      label: 'Klik tiap simbol Flowchart untuk melihat fungsinya:',
      parts: [
        { title: 'Oval (Terminator)', badge: 'Mulai / Selesai', detail: 'Menandai titik awal dan titik berakhirnya sebuah program atau algoritma.' },
        { title: 'Jajar Genjang (I/O)', badge: 'Input / Output', detail: 'Membaca masukan pengguna (misal input nilai) atau menampilkan hasil ke layar.' },
        { title: 'Persegi Panjang', badge: 'Proses', detail: 'Melakukan perhitungan, pengisian variabel, atau pemrosesan data.' },
        { title: 'Belah Ketupat', badge: 'Decision (Ya/Tidak)', detail: 'Menguji syarat percabangan seperti JIKA nilai >= 75 untuk menentukan arah panah.' },
      ],
    },
    2: {
      label: 'Klik bagian Spreadsheet untuk mengenal perannya:',
      parts: [
        { title: 'Formula Bar (=)', badge: 'Baris Rumus', detail: 'Tempat menulis dan mengedit rumus seperti =SUM(B2:B6) atau =AVERAGE(B2:B6).' },
        { title: 'Column Header (A, B, C)', badge: 'Kolom Vertikal', detail: 'Menandai kolom data secara tegak dengan label huruf kapital.' },
        { title: 'Row Header (1, 2, 3)', badge: 'Baris Horizontal', detail: 'Menandai baris data secara mendatar dengan label angka.' },
        { title: 'Active Cell (misal B3)', badge: 'Sel Aktif', detail: 'Titik temu kolom & baris tempat data atau formula dimasukkan.' },
      ],
    },
    3: {
      label: 'Klik node jaringan untuk menelusuri rute paket data:',
      parts: [
        { title: 'Perangkat Klien (PC/HP)', badge: 'Sumber Data', detail: 'Memiliki IP Address lokal dan mengirim permintaan halaman web melalui Browser.' },
        { title: 'Switch (Dalam LAN)', badge: 'Penghubung Lokal', detail: 'Menghubungkan puluhan komputer di satu lab atau gedung agar saling bertukar data.' },
        { title: 'Router', badge: 'Pengarah Rute', detail: 'Menghubungkan LAN ke jaringan luar (WAN/Internet) serta memilih jalur tercepat.' },
        { title: 'Server Web (HTTPS)', badge: 'Tujuan Aman', detail: 'Menyimpan situs web dan mengirimkan halaman terenkripsi kembali ke browser kamu.' },
      ],
    },
    4: {
      label: 'Klik tahapan transformasi Data menjadi Informasi:',
      parts: [
        { title: '1. Data Mentah', badge: 'Belum Diolah', detail: 'Kumpulan angka atau fakta acak dari angket/sensor yang belum punya kesimpulan.' },
        { title: '2. Pembersihan & Sort/Filter', badge: 'Pengolahan', detail: 'Menghapus data ganda, mengurutkan nilai tertinggi, atau menyaring kategori tertentu.' },
        { title: '3. Visualisasi Grafik', badge: 'Penyajian', detail: 'Memilih Column Chart (perbandingan), Line Chart (tren waktu), atau Pie Chart (persentase).' },
        { title: '4. Pengambilan Keputusan', badge: 'Informasi Bermakna', detail: 'Menghasilkan kesimpulan akurat untuk tindakan nyata.' },
      ],
    },
    5: {
      label: 'Klik komponen Sistem Komputer untuk melihat alur kerjanya:',
      parts: [
        { title: 'Input Device', badge: 'Masukan', detail: 'Keyboard, Mouse, Mic, dan Scanner mengubah aksi manusia menjadi sinyal digital.' },
        { title: 'CPU (CU + ALU) & RAM', badge: 'Pemroses', detail: 'RAM menampung data aktif sementara; CPU mengolah logika & hitung dalam biner 0/1.' },
        { title: 'Output Device', badge: 'Keluaran', detail: 'Monitor, Speaker, dan Printer menampilkan hasil proses ke pengguna.' },
        { title: 'Storage (SSD/Cloud)', badge: 'Penyimpanan Tetap', detail: 'Menyimpan file dan aplikasi secara permanen walau perangkat dimatikan.' },
      ],
    },
    6: {
      label: 'Klik pilar Warga Digital untuk membaca prinsip kuncinya:',
      parts: [
        { title: 'Etika & Netiket', badge: 'Sopan Santun', detail: 'Menghargai karya orang lain, berkomentar positif, dan menjaga nada bicara di ruang publik.' },
        { title: 'Cek Fakta Anti-Hoaks', badge: 'Saring Sebelum Sharing', detail: 'Periksa sumber resmi, tanggal berita, dan situs cek fakta sebelum meneruskan pesan.' },
        { title: 'Privasi & 2FA', badge: 'Keamanan Akun', detail: 'Jangan bagikan OTP, alamat rumah, atau password; aktifkan verifikasi dua langkah.' },
        { title: 'Anti-Cyberbullying', badge: 'Upstander', detail: 'Simpan bukti screenshot, blokir & laporkan pelaku, dukung korban, dan lapor ke guru/ortu.' },
      ],
    },
  };

  const current = diagrams[chapterId];

  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-700/80 p-4 sm:p-5 space-y-4">
      <p className="text-xs sm:text-sm font-medium text-cyan-300">{current.label}</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {current.parts.map((part, idx) => {
          const active = idx === selectedPart;
          return (
            <button
              key={part.title}
              type="button"
              onClick={() => setSelectedPart(idx)}
              className={`text-left rounded-xl p-3 border transition-all cursor-pointer ${
                active
                  ? 'bg-violet-600/25 border-violet-400 shadow-[0_0_16px_rgba(139,92,246,0.3)]'
                  : 'bg-slate-800/60 border-slate-700 hover:border-slate-500'
              }`}
            >
              <span className="block text-[11px] font-semibold text-cyan-300">{part.badge}</span>
              <span className="block text-sm font-bold text-white mt-0.5">{part.title}</span>
            </button>
          );
        })}
      </div>
      <div className="rounded-xl bg-slate-950/75 border border-cyan-500/25 p-3.5 text-sm text-slate-200 leading-relaxed">
        <span className="font-bold text-amber-300">{current.parts[selectedPart].title}: </span>
        {current.parts[selectedPart].detail}
      </div>
    </div>
  );
};
