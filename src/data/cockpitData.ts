import { ChapterId } from '../types/learning';

export interface ExplorerNode {
  id: string;
  label: string;
  region: string;
  chapterId: ChapterId;
  x: number;
  y: number;
  summary: string;
  funFact: string;
}

export const DIGITAL_WORLD_NODES: ExplorerNode[] = [
  {
    id: 'node-algo',
    label: 'Pusat Logika & Scratch',
    region: 'Zona Algoritma (Bab 1)',
    chapterId: 1,
    x: 68,
    y: 78,
    summary:
      'Semua aplikasi dan game modern berawal dari urutan langkah logis, percabangan, dan perulangan.',
    funFact: 'Pembuat game memakai blok logika seperti Scratch sebelum menulis kode profesional!',
  },
  {
    id: 'node-sheet',
    label: 'Menara Data Spreadsheet',
    region: 'Zona Angka (Bab 2)',
    chapterId: 2,
    x: 138,
    y: 52,
    summary:
      'Ribuan data nilai dan keuangan kelas dihitung otomatis menggunakan SUM, AVERAGE, MAX, dan MIN.',
    funFact: 'Satu fungsi =SUM(B2:B100) menghemat puluhan menit hitung manual!',
  },
  {
    id: 'node-net',
    label: 'Jaringan Kabel Bawah Laut',
    region: 'Zona Internet (Bab 3)',
    chapterId: 3,
    x: 206,
    y: 86,
    summary:
      'Router dan kabel serat optik menghubungkan LAN sekolah ke jaringan WAN global dalam hitungan milidetik.',
    funFact: 'Lebih dari 95% lalu lintas internet antar benua melewati kabel fiber optik bawah laut!',
  },
  {
    id: 'node-info',
    label: 'Observatorium Grafik',
    region: 'Zona Informasi (Bab 4)',
    chapterId: 4,
    x: 262,
    y: 58,
    summary:
      'Data mentah diolah lewat sort dan filter menjadi grafik batang, garis, dan lingkaran yang mudah dibaca.',
    funFact: 'Visualisasi data yang tepat membantu pemimpin mengambil keputusan 5x lebih cepat.',
  },
  {
    id: 'node-cpu',
    label: 'Reaktor Hardware & CPU',
    region: 'Zona Sistem (Bab 5)',
    chapterId: 5,
    x: 184,
    y: 126,
    summary:
      'Input, CPU (CU & ALU), RAM, Output, dan SSD bekerja serempak memakai sinyal biner 0 dan 1.',
    funFact: 'Prosesor modern menjalankan miliaran operasi biner setiap satu detik!',
  },
  {
    id: 'node-ethics',
    label: 'Perisai Warga Digital',
    region: 'Zona Etika (Bab 6)',
    chapterId: 6,
    x: 288,
    y: 118,
    summary:
      'Menjaga privasi OTP, menyaring berita hoaks, dan membangun jejak digital positif setiap hari.',
    funFact: 'Mengaktifkan 2FA dapat mencegah sebagian besar upaya peretasan akun.',
  },
];

export interface CuriosityQA {
  id: string;
  question: string;
  answer: string;
  chapterId: ChapterId;
}

export const BIG_QUESTIONS: CuriosityQA[] = [
  {
    id: 'bq-1',
    question: 'Bagaimana internet mengirim pesan dalam 1 detik?',
    answer:
      'Pesan dipecah menjadi paket data kecil lalu diarahkan oleh Router melewati jalur tercepat kabel fiber optik dan gelombang nirkabel menuju alamat IP tujuan.',
    chapterId: 3,
  },
  {
    id: 'bq-2',
    question: 'Mengapa rumus spreadsheet harus diawali tanda "="?',
    answer:
      'Tanda sama dengan (=) memberi sinyal ke aplikasi bahwa isi sel adalah perintah hitung/fungsi (seperti =SUM), bukan teks biasa.',
    chapterId: 2,
  },
  {
    id: 'bq-3',
    question: 'Apa bedanya RAM dan SSD pada laptop atau HP?',
    answer:
      'RAM menyimpan data aplikasi yang sedang aktif secara sementara (hilang saat mati), sedangkan SSD menyimpan file permanen walau perangkat dimatikan.',
    chapterId: 5,
  },
  {
    id: 'bq-4',
    question: 'Bagaimana membedakan link resmi vs web Phishing?',
    answer:
      'Cek protokol HTTPS (gembok aman), pastikan ejaan domain benar tanpa huruf aneh (misal g00gle), dan jangan pernah masukkan kode OTP di tautan mencurigakan.',
    chapterId: 3,
  },
];

export const CURIOSITY_CORNER: CuriosityQA[] = [
  {
    id: 'cc-1',
    question: 'Kenapa komputer hanya mengerti angka 0 dan 1?',
    answer:
      'Di tingkat sirkuit listrik, transistor hanya mengenal dua kondisi stabil: arus mati (0) dan arus menyala (1), yang disebut sistem bilangan Biner.',
    chapterId: 5,
  },
  {
    id: 'cc-2',
    question: 'Kapan harus memakai Line Chart dibanding Pie Chart?',
    answer:
      'Gunakan Line Chart untuk melihat perubahan dari waktu ke waktu (tren), sedangkan Pie Chart dipakai untuk menunjukkan porsi persentase dari total 100%.',
    chapterId: 4,
  },
  {
    id: 'cc-3',
    question: 'Apa itu Jejak Digital dan kenapa penting?',
    answer:
      'Jejak digital adalah rekam komentar, foto, dan pencarian kita di internet. Postingan positif membangun reputasi baik untuk masa depan sekolah maupun karier!',
    chapterId: 6,
  },
  {
    id: 'cc-4',
    question: 'Apa fungsi simbol Belah Ketupat pada Flowchart?',
    answer:
      'Belah ketupat (Decision) dipakai untuk menguji kondisi Ya/Tidak (percabangan), misalnya mengecek apakah nilai ujian >= 75.',
    chapterId: 1,
  },
];

export interface SpotlightWord {
  word: string;
  chapterLabel: string;
  definition: string;
  example: string;
}

export const SPOTLIGHT_WORDS: SpotlightWord[] = [
  {
    word: 'ALGORITMA',
    chapterLabel: 'Bab 1 · Pemrograman',
    definition: 'Urutan langkah-langkah logis dan sistematis untuk menyelesaikan masalah hingga tuntas.',
    example: 'Langkah berurutan login aplikasi atau resep membuat minuman hangat.',
  },
  {
    word: 'SPREADSHEET',
    chapterLabel: 'Bab 2 · Pengolahan Data',
    definition: 'Aplikasi pengolah angka berbentuk tabel kolom dan baris untuk menghitung rumus otomatis.',
    example: 'Menghitung rata-rata nilai kelas dengan rumus =AVERAGE(B2:B30).',
  },
  {
    word: 'ROUTER',
    chapterLabel: 'Bab 3 · Jaringan',
    definition: 'Perangkat jaringan yang menghubungkan LAN ke Internet serta menentukan rute paket data.',
    example: 'Router Wi-Fi di sekolah mengarahkan data siswa ke server belajar online.',
  },
  {
    word: 'INFORMASI',
    chapterLabel: 'Bab 4 · Data & Info',
    definition: 'Data mentah yang telah diolah, dikelompokkan, atau divisualkan sehingga memiliki makna.',
    example: 'Grafik persentase peminat ekskul kelas VIII hasil rekap formulir.',
  },
  {
    word: 'BINER',
    chapterLabel: 'Bab 5 · Sistem Komputer',
    definition: 'Sistem bilangan berbasis 2 yang hanya menggunakan digit 0 dan 1 sebagai bahasa mesin.',
    example: 'Huruf A diterjemahkan CPU menjadi susunan bit 01000001.',
  },
  {
    word: 'NETIKET',
    chapterLabel: 'Bab 6 · Etika Digital',
    definition: 'Tata krama dan etika berkomunikasi secara sopan, aman, dan bertanggung jawab di internet.',
    example: 'Menghargai karya orang lain dan menyaring berita sebelum dibagikan.',
  },
];

export interface QuickChallenge {
  id: string;
  chapterId: ChapterId;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  tip: string;
}

export const MINI_SURVIVAL_CHALLENGES: QuickChallenge[] = [
  {
    id: 'ms-1',
    chapterId: 2,
    question:
      'Di sel B2:B6 ada nilai 70, 80, 90, 85, 75. Fungsi spreadsheet mana yang menghasilkan nilai terbesar (90)?',
    options: ['=MIN(B2:B6)', '=MAX(B2:B6)', '=SUM(B2:B6)', '=AVERAGE(B2:B6)'],
    correctIndex: 1,
    tip: 'MAX mencari angka paling besar dalam rentang sel!',
  },
  {
    id: 'ms-2',
    chapterId: 3,
    question:
      'Jaringan komputer yang menghubungkan 25 PC di dalam satu ruang lab sekolah termasuk jenis...',
    options: ['WAN', 'MAN', 'LAN', 'Satelit'],
    correctIndex: 2,
    tip: 'LAN (Local Area Network) mencakup area lokal seperti ruang kelas atau satu gedung.',
  },
  {
    id: 'ms-3',
    chapterId: 6,
    question:
      'Jika ada teman mengirim pesan berantai heboh tanpa sumber jelas, sikap paling bijak adalah...',
    options: [
      'Langsung teruskan ke semua grup',
      'Periksa kebenarannya terlebih dahulu sebelum menyebarkan',
      'Ubah judulnya agar makin viral',
      'Kirim data pribadimu untuk konfirmasi',
    ],
    correctIndex: 1,
    tip: 'Selalu terapkan prinsip Saring Sebelum Sharing untuk mencegah hoaks!',
  },
];

export const QUICK_QUIZ_DECK: QuickChallenge[] = [
  {
    id: 'qq-1',
    chapterId: 1,
    question: 'Simbol Flowchart untuk menyatakan keputusan Ya/Tidak adalah?',
    options: ['Oval', 'Belah Ketupat', 'Persegi Panjang', 'Jajar Genjang'],
    correctIndex: 1,
    tip: 'Belah ketupat (Decision) selalu bercabang dua arah (Ya / Tidak).',
  },
  {
    id: 'qq-2',
    chapterId: 5,
    question: 'Manakah yang merupakan perangkat Output komputer?',
    options: ['Keyboard', 'Mouse', 'Monitor', 'Microphone'],
    correctIndex: 2,
    tip: 'Monitor menampilkan hasil pemrosesan visual kepada pengguna (Output).',
  },
  {
    id: 'qq-3',
    chapterId: 4,
    question: 'Tinggi badan 160 cm dan nilai 92 termasuk jenis data?',
    options: ['Kuantitatif', 'Kualitatif', 'Fiktif', 'Acak'],
    correctIndex: 0,
    tip: 'Data kuantitatif berbentuk angka hasil pengukuran atau perhitungan.',
  },
];
