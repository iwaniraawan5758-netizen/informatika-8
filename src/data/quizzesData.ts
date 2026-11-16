import { ChapterId, QuizQuestion } from '../types/learning';

export const QUIZZES_DATA: QuizQuestion[] = [
  // ================= BAB 1: ALGORITMA DAN PEMROGRAMAN =================
  {
    id: 'q1-1',
    chapterId: 1,
    difficulty: 'Mudah',
    question:
      'Urutan langkah-langkah logis dan sistematis yang disusun untuk menyelesaikan suatu permasalahan disebut...',
    options: ['Flowchart', 'Algoritma', 'Variabel', 'Compiler'],
    correctIndex: 1,
    explanation:
      'Algoritma adalah urutan langkah logis, jelas, dan berhingga untuk menyelesaikan masalah, sedangkan flowchart adalah bentuk diagram visualnya.',
  },
  {
    id: 'q1-2',
    chapterId: 1,
    difficulty: 'Mudah',
    question:
      'Pada diagram alir (Flowchart), simbol belah ketupat (diamond) digunakan untuk menggambarkan...',
    options: [
      'Proses perhitungan data',
      'Mulai atau selesainya program',
      'Pengambilan keputusan atau percabangan (Ya/Tidak)',
      'Masukan (Input) dan keluaran (Output)',
    ],
    correctIndex: 2,
    explanation:
      'Belah ketupat melambangkan Decision (keputusan/percabangan) yang menguji suatu kondisi bernilai Benar/Ya atau Salah/Tidak.',
  },
  {
    id: 'q1-3',
    chapterId: 1,
    difficulty: 'Sedang',
    question:
      'Rani ingin membuat program kuis di Scratch yang terus menambah nilai pemain setiap kali jawaban benar dipilih. Fitur yang paling tepat digunakan Rani untuk menyimpan nilai yang berubah-ubah tersebut adalah...',
    options: ['Blok Motion', 'Variabel', 'Terminator', 'Backdrop'],
    correctIndex: 1,
    explanation:
      'Variabel berfungsi sebagai wadah penyimpan nilai di memori komputer yang dapat dibaca dan diubah selama program berjalan (misalnya skor = skor + 10).',
  },
  {
    id: 'q1-4',
    chapterId: 1,
    difficulty: 'Sedang',
    question:
      'Perhatikan potongan pseudocode berikut:\nINPUT suhu\nJIKA suhu > 30 MAKA TAMPILKAN "Panas" SELAIN ITU TAMPILKAN "Sejuk".\nJika pengguna memasukkan nilai suhu = 28, output yang muncul adalah...',
    options: ['Panas', 'Sejuk', 'Error', '28'],
    correctIndex: 1,
    explanation:
      'Karena kondisi suhu > 30 (28 > 30) bernilai SALAH, maka program menjalankan cabang SELAIN ITU, yaitu menampilkan "Sejuk".',
  },
  {
    id: 'q1-5',
    chapterId: 1,
    difficulty: 'Menantang',
    question:
      'Dalam pemrograman Scratch, karakter sprite diminta berjalan 10 langkah lalu berputar 90 derajat secara berulang sebanyak 4 kali hingga membentuk persegi. Struktur algoritma yang digunakan adalah...',
    options: [
      'Hanya Sequence tanpa kontrol',
      'Percabangan bersarang (Nested If)',
      'Perulangan (Loop / Repeat 4)',
      'Input-Output paralel',
    ],
    correctIndex: 2,
    explanation:
      'Mengulang instruksi gerak dan putar 90 derajat sebanyak 4 kali secara otomatis adalah penerapan struktur Perulangan (Repeat/Loop) untuk menggambar 4 sisi persegi.',
  },

  // ================= BAB 2: PENGOLAHAN DATA DENGAN SPREADSHEET =================
  {
    id: 'q2-1',
    chapterId: 2,
    difficulty: 'Mudah',
    question:
      'Pertemuan antara Kolom D dan Baris ke-7 pada lembar kerja spreadsheet disebut sel dengan alamat...',
    options: ['7D', 'D:7', 'D7', 'CD7'],
    correctIndex: 2,
    explanation:
      'Penulisan alamat sel (Cell Address) pada spreadsheet selalu diawali huruf kolom diikuti nomor baris, yaitu D7.',
  },
  {
    id: 'q2-2',
    chapterId: 2,
    difficulty: 'Mudah',
    question:
      'Setiap penulisan rumus atau fungsi di aplikasi spreadsheet (seperti Excel atau Google Sheets) harus selalu diawali dengan tanda...',
    options: ['Tanda tanya (?)', 'Tanda sama dengan (=)', 'Tanda pagar (#)', 'Tanda kutip (")'],
    correctIndex: 1,
    explanation:
      'Tanda sama dengan (=) memberi tahu aplikasi spreadsheet bahwa isi sel tersebut adalah rumus perhitungan, bukan teks biasa.',
  },
  {
    id: 'q2-3',
    chapterId: 2,
    difficulty: 'Sedang',
    question:
      'Di sel B2 hingga B6 tertulis nilai ulangan Informatika berturut-turut: 80, 90, 75, 85, dan 95. Rumus untuk menghitung rata-rata seluruh nilai tersebut adalah...',
    options: [
      '=SUM(B2:B6)',
      '=MAX(B2:B6)',
      '=AVERAGE(B2:B6)',
      '=MIN(B2:B6)',
    ],
    correctIndex: 2,
    explanation:
      'Fungsi AVERAGE menghitung nilai rata-rata dari range B2:B6 ((80+90+75+85+95)/5 = 85). SUM untuk menjumlahkan, MAX nilai tertinggi, MIN nilai terendah.',
  },
  {
    id: 'q2-4',
    chapterId: 2,
    difficulty: 'Sedang',
    question:
      'Bendahara kelas VIII-B ingin mengetahui iuran kas PALING BESAR yang pernah dicatat pada rentang sel C3 sampai C20. Fungsi yang tepat adalah...',
    options: [
      '=MIN(C3:C20)',
      '=COUNT(C3:C20)',
      '=MAX(C3:C20)',
      '=AVERAGE(C3:C20)',
    ],
    correctIndex: 2,
    explanation:
      'Fungsi MAX digunakan untuk menemukan nilai angka terbesar di dalam suatu rentang sel (range).',
  },
  {
    id: 'q2-5',
    chapterId: 2,
    difficulty: 'Menantang',
    question:
      'Jika di sel A2 tertulis angka 12000 (harga buku) dan di sel B2 tertulis angka 4 (jumlah beli), mengapa lebih baik menulis rumus =A2*B2 di sel C2 daripada mengetik =12000*4?',
    options: [
      'Karena tanda bintang (*) hanya berfungsi pada huruf',
      'Agar total harga di C2 otomatis berubah jika nilai di A2 atau B2 diperbarui',
      'Karena hasil =12000*4 akan menghasilkan error #VALUE!',
      'Supaya file workbook berubah menjadi file PDF secara otomatis',
    ],
    correctIndex: 1,
    explanation:
      'Menggunakan referensi alamat sel membuat tabel bersifat dinamis: setiap perubahan harga atau jumlah akan langsung memperbarui hasil perkalian.',
  },

  // ================= BAB 3: JARINGAN KOMPUTER DAN INTERNET =================
  {
    id: 'q3-1',
    chapterId: 3,
    difficulty: 'Mudah',
    question:
      'Jaringan komputer yang menghubungkan seluruh perangkat di dalam satu laboratorium komputer sekolah atau satu gedung disebut...',
    options: ['WAN', 'MAN', 'LAN', 'Internet'],
    correctIndex: 2,
    explanation:
      'LAN (Local Area Network) melayani area lokal terbatas seperti rumah, lab sekolah, atau satu gedung kantor.',
  },
  {
    id: 'q3-2',
    chapterId: 3,
    difficulty: 'Mudah',
    question:
      'Aplikasi yang digunakan di komputer atau ponsel untuk membuka dan menampilkan halaman-halaman situs web adalah...',
    options: ['Spreadsheet', 'Web Browser', 'Compiler', 'Antivirus'],
    correctIndex: 1,
    explanation:
      'Web Browser (seperti Chrome, Firefox, Edge, Safari) menerjemahkan kode web menjadi halaman visual interaktif yang dapat kita baca.',
  },
  {
    id: 'q3-3',
    chapterId: 3,
    difficulty: 'Sedang',
    question:
      'Perangkat jaringan yang bertugas menghubungkan dua atau lebih jaringan berbeda (misalnya jaringan lokal sekolah ke jaringan internet global) serta memilih rute pengiriman data terbaik adalah...',
    options: ['Router', 'Flashdisk', 'Scanner', 'Projector'],
    correctIndex: 0,
    explanation:
      'Router berfungsi merutekan (routing) paket data antar jaringan berbeda, misalnya antara LAN rumah/sekolah dan ISP/Internet.',
  },
  {
    id: 'q3-4',
    chapterId: 3,
    difficulty: 'Sedang',
    question:
      'Manakah urutan jenis jaringan komputer dari jangkauan area TERKECIL ke TERLUAS yang benar?',
    options: [
      'WAN -> MAN -> LAN',
      'MAN -> LAN -> WAN',
      'LAN -> MAN -> WAN',
      'LAN -> WAN -> MAN',
    ],
    correctIndex: 2,
    explanation:
      'LAN mencakup gedung/sekolah, MAN mencakup tingkat kota, dan WAN mencakup wilayah antar kota, negara, hingga seluruh dunia.',
  },
  {
    id: 'q3-5',
    chapterId: 3,
    difficulty: 'Menantang',
    question:
      'Bima menerima tautan hadiah bertuliskan "http://hadiah-kuota-gratis.xyz/login-akun" yang memintanya memasukkan email dan password media sosial. Tindakan paling aman yang harus dilakukan Bima adalah...',
    options: [
      'Segera login memakai akun utama agar tidak kehabisan kuota',
      'Menyebarkan tautan ke grup kelas supaya teman-teman ikut mencoba',
      'Tidak membuka tautan dan tidak mengisi data karena itu indikasi web Phishing',
      'Mematikan Wi-Fi lalu membuka tautan lewat data seluler',
    ],
    correctIndex: 2,
    explanation:
      'Alamat tidak resmi, memakai HTTP tanpa enkripsi HTTPS, dan iming-iming hadiah untuk meminta password adalah ciri khas serangan Phishing.',
  },

  // ================= BAB 4: DATA DAN INFORMASI =================
  {
    id: 'q4-1',
    chapterId: 4,
    difficulty: 'Mudah',
    question:
      'Pernyataan berikut yang paling tepat membedakan Data dan Informasi adalah...',
    options: [
      'Data selalu berupa angka, sedangkan informasi selalu berupa video',
      'Data adalah fakta mentah yang belum diolah, sedangkan informasi adalah hasil pengolahan data yang memiliki makna',
      'Data hanya ada di internet, sedangkan informasi hanya ada di buku cetak',
      'Data dan informasi memiliki arti yang sama persis',
    ],
    correctIndex: 1,
    explanation:
      'Data merupakan bahan mentah tanpa konteks utuh; setelah diolah, disusun, dan dianalisis menjadi bermakna, barulah disebut Informasi.',
  },
  {
    id: 'q4-2',
    chapterId: 4,
    difficulty: 'Mudah',
    question:
      'Contoh data KUANTITATIF dalam kegiatan pendataan siswa di kelas adalah...',
    options: [
      'Warna seragam pramuka',
      'Hobi membaca dan menggambar',
      'Tinggi badan siswa sebesar 162 cm',
      'Pendapat siswa tentang kantin sekolah',
    ],
    correctIndex: 2,
    explanation:
      'Data kuantitatif berbentuk angka hasil pengukuran atau pencacahan yang dapat diolah secara matematis (seperti tinggi badan 162 cm).',
  },
  {
    id: 'q4-3',
    chapterId: 4,
    difficulty: 'Sedang',
    question:
      'Ketua OSIS ingin menampilkan perubahan jumlah pengunjung perpustakaan sekolah setiap bulan dari Januari hingga Juni agar terlihat tren naik atau turunnya. Jenis grafik yang paling tepat digunakan adalah...',
    options: ['Pie Chart (Diagram Lingkaran)', 'Line Chart (Grafik Garis)', 'Scatter Plot acak', 'Tabel tanpa judul'],
    correctIndex: 1,
    explanation:
      'Line Chart sangat efektif memperlihatkan perkembangan atau tren kenaikan dan penurunan data dari waktu ke waktu.',
  },
  {
    id: 'q4-4',
    chapterId: 4,
    difficulty: 'Sedang',
    question:
      'Dari 40 siswa kelas VIII-A yang disurvei: 20 memilih Basket, 10 memilih Futsal, dan 10 memilih Badminton. Jika disajikan sebagai Pie Chart, persentase siswa pemilih Basket adalah...',
    options: ['25%', '40%', '50%', '75%'],
    correctIndex: 2,
    explanation:
      '20 dari 40 siswa sama dengan (20 / 40) × 100% = 50% (setengah lingkaran penuh).',
  },
  {
    id: 'q4-5',
    chapterId: 4,
    difficulty: 'Menantang',
    question:
      'Dalam tabel nilai 100 siswa, kamu hanya ingin menampilkan data siswa yang berasal dari kelas "VIII-C" dan memiliki nilai di atas 85. Fitur pengolahan data yang paling tepat dipakai adalah...',
    options: [
      'Filtering (Penyaringan data)',
      'Merge Cells',
      'Mengubah ukuran font',
      'Menghapus seluruh baris lain secara permanen',
    ],
    correctIndex: 0,
    explanation:
      'Filtering menyaring dan menampilkan baris data yang memenuhi kriteria tertentu saja tanpa menghapus data lainnya.',
  },

  // ================= BAB 5: SISTEM KOMPUTER =================
  {
    id: 'q5-1',
    chapterId: 5,
    difficulty: 'Mudah',
    question:
      'Tiga komponen utama yang membentuk suatu sistem komputer agar dapat bekerja bersama adalah...',
    options: [
      'Monitor, Keyboard, dan Printer',
      'Hardware, Software, dan Brainware',
      'RAM, ROM, dan Flashdisk',
      'Internet, Browser, dan Kabel LAN',
    ],
    correctIndex: 1,
    explanation:
      'Sistem komputer terdiri dari Hardware (perangkat keras), Software (perangkat lunak), dan Brainware (manusia/pengguna).',
  },
  {
    id: 'q5-2',
    chapterId: 5,
    difficulty: 'Mudah',
    question:
      'Manakah kelompok perangkat berikut yang SELURUHNYA berfungsi sebagai perangkat INPUT?',
    options: [
      'Printer, Speaker, Monitor',
      'Keyboard, Mouse, Microphone',
      'SSD, Flashdisk, Proyektor',
      'CPU, RAM, Speaker',
    ],
    correctIndex: 1,
    explanation:
      'Keyboard (teks), Mouse (gerakan pointer), dan Microphone (suara) semuanya memasukkan data ke dalam komputer (Input).',
  },
  {
    id: 'q5-3',
    chapterId: 5,
    difficulty: 'Sedang',
    question:
      'Di dalam CPU terdapat bagian yang bertugas melakukan perhitungan aritmatika (tambah, kurang) dan operasi logika (AND, OR, NOT). Bagian tersebut bernama...',
    options: [
      'ALU (Arithmetic Logic Unit)',
      'BIOS',
      'Hard Disk Drive',
      'Power Supply',
    ],
    correctIndex: 0,
    explanation:
      'ALU (Arithmetic Logic Unit) adalah bagian CPU yang menangani kalkulasi matematis serta perbandingan logika.',
  },
  {
    id: 'q5-4',
    chapterId: 5,
    difficulty: 'Sedang',
    question:
      'Mengapa file dokumen yang belum sempat di-save akan hilang ketika komputer mendadak mati listrik, sedangkan file yang sudah disimpan di SSD tetap aman?',
    options: [
      'Karena SSD tersambung ke printer secara permanen',
      'Karena dokumen yang sedang dibuka berada di RAM yang bersifat sementara (volatile), sedangkan SSD menyimpan data secara permanen (non-volatile)',
      'Karena SSD bekerja memakai sistem bilangan desimal saja',
      'Karena monitor ikut menghapus file saat layar mati',
    ],
    correctIndex: 1,
    explanation:
      'RAM menyimpan data sementara selama arus listrik menyala (volatile). SSD/HDD adalah penyimpanan permanen (non-volatile).',
  },
  {
    id: 'q5-5',
    chapterId: 5,
    difficulty: 'Menantang',
    question:
      'Komputer modern memproses semua teks, gambar, dan suara di tingkat paling dasar menggunakan sinyal listrik ON dan OFF yang direpresentasikan oleh sistem bilangan...',
    options: [
      'Desimal (basis 10: angka 0-9)',
      'Biner (basis 2: angka 0 dan 1)',
      'Romawi (I, V, X)',
      'Persentase (%)',
    ],
    correctIndex: 1,
    explanation:
      'Komputer bekerja secara digital dengan dua keadaan arus listrik (1 = ON, 0 = OFF) yang dikenal sebagai sistem bilangan Biner.',
  },

  // ================= BAB 6: DAMPAK SOSIAL INFORMATIKA =================
  {
    id: 'q6-1',
    chapterId: 6,
    difficulty: 'Mudah',
    question:
      'Rekam jejak dari seluruh aktivitas kita di internet—seperti unggahan foto, komentar, dan riwayat pencarian—disebut...',
    options: [
      'Jejak Digital (Digital Footprint)',
      'Algoritma Pencarian',
      'Hardware Storage',
      'Bandwidth Internet',
    ],
    correctIndex: 0,
    explanation:
      'Jejak digital adalah catatan aktivitas kita di dunia maya yang dapat tersimpan lama dan memengaruhi reputasi pribadi.',
  },
  {
    id: 'q6-2',
    chapterId: 6,
    difficulty: 'Mudah',
    question:
      'Informasi penting berikut yang PALING TIDAK BOLEH diunggah ke media sosial secara publik demi keamanan data adalah...',
    options: [
      'Foto lukisan pemandangan buatan sendiri',
      'Resep makanan favorit keluarga',
      'Foto kartu identitas lengkap dengan alamat rumah dan kode OTP',
      'Poster lomba poster digital sekolah',
    ],
    correctIndex: 2,
    explanation:
      'Data pribadi sensitif seperti alamat lengkap, nomor identitas, dan kode OTP dapat disalahgunakan penjahat siber untuk pencurian akun atau penipuan.',
  },
  {
    id: 'q6-3',
    chapterId: 6,
    difficulty: 'Sedang',
    question:
      'Kamu menerima pesan berantai di grup chat yang judulnya sangat menghebohkan tentang libur sekolah mendadak tanpa sumber resmi. Sikap etika digital yang paling tepat adalah...',
    options: [
      'Langsung meneruskan ke semua grup agar menjadi yang paling update',
      'Memeriksa kebenaran informasi ke situs resmi sekolah/pemerintah atau cek fakta sebelum membagikan',
      'Mengubah judulnya agar makin menarik lalu memposting ulang',
      'Menghapus akun media sosial selamanya',
    ],
    correctIndex: 1,
    explanation:
      'Prinsip "Saring Sebelum Sharing" mencegah kita ikut menyebarkan berita bohong (hoaks) yang meresahkan.',
  },
  {
    id: 'q6-4',
    chapterId: 6,
    difficulty: 'Sedang',
    question:
      'Tindakan sengaja mengejek, mengancam, atau menyebarkan aib teman berulang kali melalui komentar media sosial atau aplikasi chat termasuk pelanggaran...',
    options: [
      'Cyberbullying (Perundungan Siber)',
      'Cloud Computing',
      'Debugging Program',
      'Data Backup',
    ],
    correctIndex: 0,
    explanation:
      'Cyberbullying adalah perundungan menggunakan teknologi digital yang dapat melukai mental korban dan melanggar etika serta hukum.',
  },
  {
    id: 'q6-5',
    chapterId: 6,
    difficulty: 'Menantang',
    question:
      'Jika seorang teman sekelasmu mengalami perundungan siber (cyberbullying) di media sosial, langkah paling bijak yang sebaiknya dilakukan adalah...',
    options: [
      'Ikut menulis komentar balasan yang lebih kasar kepada pelaku',
      'Menyimpan bukti screenshot, tidak menyebarkan ulang ejekan, mendukung korban, memblokir/melaporkan akun pelaku, serta melapor ke guru BK/orang tua',
      'Menyuruh korban membalas dendam dengan membuat akun palsu',
      'Membiarkannya saja dan ikut membagikan postingan ejekan tersebut',
    ],
    correctIndex: 1,
    explanation:
      'Menangani cyberbullying dilakukan dengan mengumpulkan bukti, melaporkan & memblokir pelaku, tidak memperluas penyebaran, mendukung korban, dan melibatkan orang dewasa terpercaya.',
  },
];
