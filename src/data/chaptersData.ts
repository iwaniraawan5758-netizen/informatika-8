import { ChapterData } from '../types/learning';

export const CHAPTERS_DATA: ChapterData[] = [
  {
    id: 1,
    numberLabel: 'BAB 1',
    title: 'Algoritma dan Pemrograman',
    shortTitle: 'Algoritma & Scratch',
    description:
      'Pelajari cara menyusun langkah logis, membaca flowchart, memakai variabel, percabangan, perulangan, dan mengenal blok Scratch.',
    accentColor: 'purple',
    gradientClass: 'from-violet-600 via-purple-600 to-fuchsia-600',
    borderGlowClass: 'border-violet-500/40 hover:border-violet-400',
    iconName: 'Cpu',
    objectives: [
      'Menjelaskan pengertian dan ciri-ciri algoritma yang baik.',
      'Membaca serta menyusun pseudocode dan flowchart sederhana.',
      'Memahami peran variabel, percabangan (IF-ELSE), dan perulangan (LOOP).',
      'Mengenal cara kerja blok pemrograman visual menggunakan Scratch.',
    ],
    starterQuestion:
      'Pernahkah kamu membuat mi instan atau login ke game favoritmu? Jika urutan langkahnya tertukar—misalnya menuang bumbu sebelum merebus air—apa yang terjadi?',
    starterHint:
      'Urutan langkah yang jelas dan tepat sasaran itulah inti dari Algoritma!',
    subMaterials: [
      {
        id: 'bab1-1',
        title: 'Pengertian & Ciri-Ciri Algoritma',
        tag: 'Konsep Dasar',
        summaryPoints: [
          'Algoritma adalah urutan langkah-langkah logis dan sistematis untuk menyelesaikan suatu masalah.',
          'Ciri algoritma yang baik: (1) Input jelas, (2) Output pasti, (3) Setiap langkah terdefinisi tegas (tidak ambigu), (4) Efektif dan efisien, serta (5) Memiliki akhir (berhenti setelah tujuan tercapai).',
        ],
        keyTip: 'Algoritma bukan bahasa pemrograman, melainkan rencana logikanya sebelum ditulis menjadi kode.',
      },
      {
        id: 'bab1-2',
        title: 'Struktur Algoritma & Pseudocode',
        tag: 'Representasi',
        summaryPoints: [
          'Tiga struktur utama algoritma: Urutan (Sequence), Percabangan (Selection), dan Perulangan (Iteration/Loop).',
          'Pseudocode adalah cara menulis algoritma menyerupai bahasa manusia yang terstruktur agar mudah dibaca sebelum diubah ke bahasa pemrograman.',
        ],
        codeOrFormula: `MULAI
  INPUT nilai_kuis
  JIKA nilai_kuis >= 75 MAKA
    TAMPILKAN "Lulus!"
  SELAIN ITU
    TAMPILKAN "Ayo Belajar Lagi"
SELESAI`,
        keyTip: 'Pseudocode tidak terikat aturan sintaks ketat seperti Python atau C++, fokusnya adalah kejelasan alur.',
      },
      {
        id: 'bab1-3',
        title: 'Flowchart (Diagram Alir)',
        tag: 'Visualisasi',
        summaryPoints: [
          'Flowchart menggambarkan alur algoritma memakai simbol standar yang dihubungkan tanda panah.',
          'Simbol wajib hafal: Oval/Terminator (Mulai & Selesai), Jajar Genjang (Input/Output), Persegi Panjang (Proses), Belah Ketupat (Keputusan/Percabangan Ya atau Tidak).',
        ],
        keyTip: 'Selalu gunakan Belah Ketupat (Decision) setiap kali ada kondisi Ya/Tidak atau Benar/Salah.',
      },
      {
        id: 'bab1-4',
        title: 'Variabel, Percabangan & Perulangan',
        tag: 'Logika Program',
        summaryPoints: [
          'Variabel adalah wadah penyimpan nilai sementara di memori yang isinya bisa berubah (contoh: skor = 0, nama = "Rafi").',
          'Percabangan (If-Else) membuat program memilih aksi berbeda berdasarkan syarat tertentu.',
          'Perulangan (Loop seperti Repeat / Forever) menjalankan instruksi yang sama berulang kali tanpa harus menulis blok kode berkali-kali.',
        ],
        keyTip: 'Di game, Variabel dipakai untuk menyimpan Nyawa, Koin, dan Skor pemain!',
      },
      {
        id: 'bab1-5',
        title: 'Pemrograman Visual dengan Scratch',
        tag: 'Visual Coding',
        summaryPoints: [
          'Scratch adalah platform pemrograman visual berbasis blok warna-warni yang disusun seperti puzzle (tanpa khawatir salah ketik/syntax error).',
          'Kategori blok penting: Motion (gerak sprite), Looks (tampilan/dialog), Events (pemicu seperti "When Green Flag Clicked"), Control (Wait, Repeat, If-Then), serta Variables (menyimpan skor).',
        ],
        keyTip: 'Selain Scratch, Blockly juga memakai konsep blok puzzle serupa untuk melatih logika percabangan dan loop.',
      },
    ],
    everydayExamples: [
      {
        title: 'Rute Berangkat ke Sekolah',
        scenario:
          'Bangun tidur -> Cek cuaca: JIKA hujan MAKA bawa jas hujan, SELAIN ITU pakai jaket biasa -> Naik sepeda -> Sampai di gerbang sekolah.',
        takeaway: 'Menggabungkan struktur Sequence (urutan) dan Selection (percabangan kondisi hujan).',
      },
      {
        title: 'Sistem Penalti di Game Sepak Bola',
        scenario:
          'Setiap kali bola masuk gawang lawan, variabel SKOR bertambah +1. Proses menendang diulang sampai waktu habis (Loop).',
        takeaway: 'Memakai Variabel (SKOR) dan Perulangan (Repeat until timer = 0).',
      },
    ],
    diagramTitle: 'Alur Simbol Flowchart & Blok Logika',
    diagramCaption: 'Perhatikan bentuk simbol flowchart dan bagaimana blok Scratch mengeksekusi kondisi.',
    activityTitle: 'Lab Algoritma: Susun Langkah Sehari-hari',
    activityDescription:
      'Urutkan langkah-langkah acak berikut menjadi algoritma yang logis dan bebas bug!',
    summaryPoints: [
      'Algoritma = langkah logis, terstruktur, jelas, dan berakhir untuk memecahkan masalah.',
      'Algoritma dapat ditulis sebagai teks terstruktur (Pseudocode) atau diagram simbol (Flowchart).',
      'Variabel menyimpan data, Percabangan menentukan pilihan, dan Perulangan menghemat penulisan aksi berulang.',
      'Scratch memudahkan pemula membuat game atau animasi dengan menyusun blok visual.',
    ],
  },
  {
    id: 2,
    numberLabel: 'BAB 2',
    title: 'Pengolahan Data dengan Spreadsheet',
    shortTitle: 'Spreadsheet & Rumus',
    description:
      'Kuasai antarmuka spreadsheet, alamat sel, rumus hitung otomatis, fungsi SUM/AVERAGE/MAX/MIN, hingga membuat grafik data.',
    accentColor: 'cyan',
    gradientClass: 'from-cyan-500 via-sky-500 to-blue-600',
    borderGlowClass: 'border-cyan-500/40 hover:border-cyan-400',
    iconName: 'Table2',
    objectives: [
      'Mengenal aplikasi pengolah angka (spreadsheet) beserta bagian antarmukanya.',
      'Membedakan Workbook, Worksheet, Baris (Row), Kolom (Column), dan Sel (Cell).',
      'Menggunakan operator hitung dasar dan fungsi SUM, AVERAGE, MAX, serta MIN.',
      'Menyajikan tabel data terstruktur ke dalam bentuk grafik sederhana.',
    ],
    starterQuestion:
      'Bayangkan kamu menjadi bendahara kelas yang harus menjumlahkan uang kas 35 teman selama 12 bulan. Lebih cepat menghitung satu per satu pakai kalkulator atau memakai satu rumus otomatis?',
    starterHint:
      'Dengan Spreadsheet, 400 data bisa dihitung dalam 1 detik hanya dengan satu formula!',
    subMaterials: [
      {
        id: 'bab2-1',
        title: 'Mengenal Spreadsheet, Workbook & Worksheet',
        tag: 'Antarmuka',
        summaryPoints: [
          'Spreadsheet (contoh: Microsoft Excel, Google Sheets, LibreOffice Calc) adalah aplikasi pengolah angka berbentuk tabel grid.',
          'Workbook adalah satu file spreadsheet utuh (ibarat satu buku tulis).',
          'Worksheet (Sheet) adalah tiap lembar kerja di dalam Workbook tersebut (ibarat halaman di dalam buku).',
        ],
        keyTip: 'Satu Workbook bisa berisi banyak Worksheet, misalnya Sheet1 untuk Kas Masuk dan Sheet2 untuk Pengeluaran.',
      },
      {
        id: 'bab2-2',
        title: 'Baris, Kolom, Sel & Range',
        tag: 'Struktur Grid',
        summaryPoints: [
          'Kolom (Column) tersusun vertikal dan diberi label huruf (A, B, C, ...).',
          'Baris (Row) tersusun horizontal dan diberi label angka (1, 2, 3, ...).',
          'Sel (Cell) adalah perpotongan kolom dan baris, ditulis NamaKolom+NomorBaris, contoh: B3. Sekumpulan sel berdekatan disebut Range, contoh: B2:B6.',
        ],
        keyTip: 'Formula Bar di bagian atas menampilkan isi asli/rumus dari sel yang sedang aktif.',
      },
      {
        id: 'bab2-3',
        title: 'Memasukkan Data & Rumus Sederhana',
        tag: 'Formula Dasar',
        summaryPoints: [
          'Setiap rumus atau fungsi di spreadsheet WAJIB diawali tanda sama dengan (=).',
          'Operator aritmatika: + (tambah), - (kurang), * (kali), / (bagi), dan ^ (pangkat). Contoh: =B2*C2 untuk mengalikan harga dan jumlah barang.',
        ],
        codeOrFormula: `=B2+C2     (Menjumlahkan sel B2 dan C2)
=D2*10%    (Menghitung diskon 10% dari sel D2)`,
        keyTip: 'Gunakan alamat sel (misal B2), bukan mengetik angkanya langsung, agar hasil otomatis berubah jika data diperbarui!',
      },
      {
        id: 'bab2-4',
        title: 'Fungsi SUM, AVERAGE, MAX, dan MIN',
        tag: 'Fungsi Wajib',
        summaryPoints: [
          'SUM(range): Menjumlahkan seluruh angka di dalam range. Contoh: =SUM(B2:B6).',
          'AVERAGE(range): Menghitung nilai rata-rata. Contoh: =AVERAGE(B2:B6).',
          'MAX(range) & MIN(range): Mencari nilai tertinggi (MAX) dan nilai terendah (MIN). Selain itu ada juga VLOOKUP, COUNTIF, dan SUMIF untuk pencarian data lanjutan.',
        ],
        codeOrFormula: `=SUM(C2:C6)     -> Total nilai
=AVERAGE(C2:C6) -> Rata-rata nilai
=MAX(C2:C6)     -> Nilai tertinggi
=MIN(C2:C6)     -> Nilai terendah`,
        keyTip: 'Pastikan penulisan nama fungsi tepat dan tanda kurungnya lengkap agar tidak muncul error #NAME?.',
      },
      {
        id: 'bab2-5',
        title: 'Membuat Tabel Rapi & Grafik Sederhana',
        tag: 'Visualisasi',
        summaryPoints: [
          'Agar tabel mudah dibaca, gunakan header kolom yang jelas, format mata uang/angka sesuai jenis data, dan beri border secukupnya.',
          'Data tabel bisa langsung diubah menjadi Grafik (Chart): Grafik Batang (Column/Bar) untuk membandingkan nilai, Grafik Garis (Line) untuk tren waktu, dan Pie Chart untuk persentase.',
        ],
        keyTip: 'Blok header beserta datanya sebelum klik Insert -> Chart supaya label grafik otomatis muncul.',
      },
    ],
    everydayExamples: [
      {
        title: 'Rekap Nilai Tugas & Ulangan Kelas',
        scenario:
          'Guru atau ketua kelompok mencatat nilai 5 mata pelajaran di kolom B–F, lalu memakai =AVERAGE(B2:F2) untuk mengetahui nilai rata-rata tiap siswa.',
        takeaway: 'Menghemat waktu dan mencegah salah hitung manual.',
      },
      {
        title: 'Perencanaan Anggaran Acara Pentas Seni',
        scenario:
          'Panitia OSIS mencatat daftar perlengkapan, harga satuan, dan jumlah item, lalu memakai =SUM(...) untuk total biaya dan =MAX(...) untuk melihat pos pengeluaran termahal.',
        takeaway: 'Keputusan anggaran jadi transparan dan akurat.',
      },
    ],
    diagramTitle: 'Anatomi Antarmuka Spreadsheet',
    diagramCaption: 'Kenali bagian Kolom, Baris, Cell Aktif, Formula Bar, dan Worksheet Tab.',
    activityTitle: 'Lab Spreadsheet: Simulator Nilai Kelas VIII',
    activityDescription:
      'Ubah angka nilai siswa atau ketik rumus asli seperti =SUM(B2:B6), =AVERAGE(B2:B6), =MAX(B2:B6), =MIN(B2:B6) dan lihat hasil serta grafiknya berubah langsung!',
    summaryPoints: [
      'Workbook berisi kumpulan Worksheet; tiap Worksheet terdiri atas Kolom (huruf), Baris (angka), dan Sel.',
      'Rumus selalu dimulai dengan tanda = dan mereferensikan alamat sel (misal B2).',
      'Fungsi inti: SUM (jumlah), AVERAGE (rata-rata), MAX (tertinggi), MIN (terendah).',
      'Grafik membantu mengubah angka tabel menjadi perbandingan visual yang cepat dipahami.',
    ],
  },
  {
    id: 3,
    numberLabel: 'BAB 3',
    title: 'Jaringan Komputer dan Internet',
    shortTitle: 'Jaringan & Internet',
    description:
      'Pahami cara komputer saling terhubung lewat LAN/MAN/WAN, mengenal router & switch, browser, hingga tips aman berselancar.',
    accentColor: 'blue',
    gradientClass: 'from-blue-600 via-indigo-600 to-cyan-500',
    borderGlowClass: 'border-blue-500/40 hover:border-blue-400',
    iconName: 'Globe',
    objectives: [
      'Menjelaskan pengertian dan manfaat jaringan komputer.',
      'Membedakan cakupan jaringan LAN, MAN, dan WAN.',
      'Mengenal fungsi perangkat jaringan seperti Switch, Router, Modem, dan Access Point.',
      'Memahami cara kerja internet, browser, mesin pencari, dan keamanan berinternet.',
    ],
    starterQuestion:
      'Saat kamu mengirim pesan chat dari kamar di Indonesia ke temanmu yang sedang liburan di luar negeri, pesan itu sampai kurang dari satu detik. Lewat jalur dan alat apa saja data itu berjalan?',
    starterHint:
      'Data dipecah menjadi paket-paket kecil dan diarahkan oleh Router melewati jaringan lokal hingga jaringan global (Internet)!',
    subMaterials: [
      {
        id: 'bab3-1',
        title: 'Pengertian & Manfaat Jaringan Komputer',
        tag: 'Konsep Jaringan',
        summaryPoints: [
          'Jaringan komputer adalah dua atau lebih perangkat komputasi yang saling terhubung melalui media kabel atau nirkabel (Wi-Fi) untuk bertukar data dan berbagi sumber daya.',
          'Manfaat utama: berbagi file lebih cepat, memakai satu printer bersama di lab sekolah, komunikasi real-time, dan akses data terpusat.',
        ],
        keyTip: 'Setiap perangkat yang terhubung ke jaringan memiliki alamat unik bernama IP Address.',
      },
      {
        id: 'bab3-2',
        title: 'Jenis Jaringan: LAN, MAN, dan WAN',
        tag: 'Skala Area',
        summaryPoints: [
          'LAN (Local Area Network): Mencakup area terbatas seperti satu ruangan lab komputer, rumah, atau gedung sekolah.',
          'MAN (Metropolitan Area Network): Menghubungkan beberapa LAN dalam satu kota atau wilayah kampus luas.',
          'WAN (Wide Area Network): Mencakup wilayah sangat luas antar kota, pulau, hingga antar negara. Internet adalah contoh jaringan WAN terbesar di dunia!',
        ],
        keyTip: 'Ingat urutannya dari kecil ke luas: LAN (Gedung) -> MAN (Kota) -> WAN (Negara/Dunia).',
      },
      {
        id: 'bab3-3',
        title: 'Perangkat Jaringan Komputer',
        tag: 'Perangkat Keras',
        summaryPoints: [
          'Switch: Menghubungkan banyak komputer di dalam satu jaringan lokal (LAN) dan meneruskan data tepat ke perangkat tujuan.',
          'Router: Menghubungkan dua atau lebih jaringan berbeda (misal LAN sekolah ke Internet) serta menentukan rute tercepat pengiriman paket data (routing).',
          'Modem & Access Point (Wi-Fi): Modem mengubah sinyal ISP agar bisa dipakai perangkat digital, sedangkan Access Point memancarkan sinyal nirkabel Wi-Fi. Di jaringan seluler, ponsel terhubung melalui menara BTS.',
        ],
        keyTip: 'Router bekerja seperti pengatur lalu lintas antarkota, sedangkan Switch mengatur lalu lintas di dalam satu kompleks.',
      },
      {
        id: 'bab3-4',
        title: 'Internet, Browser & Mesin Pencari',
        tag: 'Akses Informasi',
        summaryPoints: [
          'Internet (Interconnected Network) adalah jaringan global yang menghubungkan miliaran perangkat menggunakan protokol standar TCP/IP.',
          'Web Browser (Chrome, Firefox, Edge, Safari) adalah aplikasi untuk membuka halaman web, sedangkan Mesin Pencari (Google, Bing, DuckDuckGo) membantu menemukan informasi dengan kata kunci.',
        ],
        keyTip: 'Gunakan tanda kutip "..." di mesin pencari untuk mencari frasa persis dan lebih akurat.',
      },
      {
        id: 'bab3-5',
        title: 'Keamanan Saat Menggunakan Internet',
        tag: 'Cyber Safety',
        summaryPoints: [
          'Selalu periksa protokol HTTPS (ikon gembok) dan keaslian nama domain sebelum login agar terhindar dari web Phishing (situs palsu pencuri password).',
          'Aktifkan fitur keamanan browser (blokir pop-up berbahaya, gunakan Safe Browsing), jangan sembarangan memakai Wi-Fi publik tanpa perlindungan untuk transaksi penting, dan gunakan password kuat yang berbeda tiap akun.',
        ],
        keyTip: 'Waspada alamat mirip seperti "g00gle-login.xyz" — itu ciri klasik tautan phishing!',
      },
    ],
    everydayExamples: [
      {
        title: 'Laboratorium Komputer Sekolah',
        scenario:
          '30 PC siswa dihubungkan dengan kabel UTP ke Switch, lalu Switch terhubung ke Router sekolah untuk mengakses internet bersama-sama.',
        takeaway: 'Ini adalah penerapan nyata jaringan LAN yang terhubung ke WAN (Internet).',
      },
      {
        title: 'Deteksi Link Hadiah Palsu di Grup Chat',
        scenario:
          'Ada pesan berantai menawarkan kuota gratis lewat link aneh non-HTTPS yang meminta nomor HP dan kode OTP.',
        takeaway: 'Langsung tolak dan laporkan karena itu modus Phishing pencurian akun.',
      },
    ],
    diagramTitle: 'Topologi Jaringan & Jalur Paket Data',
    diagramCaption: 'Lihat bagaimana PC terhubung ke Switch, Router, hingga ke Internet Global.',
    activityTitle: 'Lab Jaringan: Inspektor Perangkat & URL Aman',
    activityDescription:
      'Identifikasi fungsi perangkat jaringan yang tepat dan periksa mana URL yang aman vs jebakan Phishing!',
    summaryPoints: [
      'Berdasarkan jangkauan: LAN (lokal/sekolah), MAN (kota), WAN (antar negara/global).',
      'Switch menghubungkan perangkat dalam satu LAN; Router menghubungkan jaringan berbeda dan memilih rute terbaik.',
      'Browser membuka halaman web, sedangkan Search Engine mengindeks dan mencari situs sesuai kata kunci.',
      'Cek HTTPS dan domain resmi untuk menghindari penipuan Phishing.',
    ],
  },
  {
    id: 4,
    numberLabel: 'BAB 4',
    title: 'Data dan Informasi',
    shortTitle: 'Data & Informasi',
    description:
      'Bedakan data mentah dan informasi bermakna, pelajari jenis data, cara mengolah, hingga membaca tabel dan grafik dengan tepat.',
    accentColor: 'pink',
    gradientClass: 'from-pink-600 via-rose-500 to-fuchsia-600',
    borderGlowClass: 'border-pink-500/40 hover:border-pink-400',
    iconName: 'BarChart3',
    objectives: [
      'Menjelaskan pengertian data, informasi, serta perbedaan keduanya.',
      'Mengelompokkan jenis-jenis data (kualitatif vs kuantitatif, primer vs sekunder).',
      'Memahami tahapan pengumpulan dan pengolahan data menjadi informasi.',
      'Menyajikan serta menafsirkan informasi dari tabel dan berbagai jenis grafik.',
    ],
    starterQuestion:
      'Jika kamu melihat catatan acak bertuliskan "38, 36, 39, 37", apakah kamu langsung tahu maknanya? Bagaimana jika diberi judul "Suhu Tubuh Siswa UKS Hari Ini (°C)"?',
    starterHint:
      'Angka acak tadi adalah Data mentah; setelah diberi konteks dan diolah menjadi kesimpulan, barulah ia menjadi Informasi!',
    subMaterials: [
      {
        id: 'bab4-1',
        title: 'Perbedaan Data dan Informasi',
        tag: 'Konsep Inti',
        summaryPoints: [
          'Data adalah fakta mentah, angka, teks, gambar, atau catatan kejadian yang belum diolah dan belum memiliki makna utuh.',
          'Informasi adalah hasil pengolahan, pengelompokan, dan analisis data sehingga memiliki arti, konteks, dan berguna untuk mengambil keputusan.',
        ],
        keyTip: 'Data = Bahan mentah (sayur, bumbu, beras). Informasi = Nasi goreng siap santap yang jelas rasanya.',
      },
      {
        id: 'bab4-2',
        title: 'Jenis-Jenis Data',
        tag: 'Klasifikasi',
        summaryPoints: [
          'Berdasarkan bentuk: Data Kuantitatif (berupa angka yang bisa dihitung, misal tinggi badan 158 cm, skor 85) dan Data Kualitatif (berupa deskripsi/kategori bukan angka, misal warna favorit, hobi, tingkat kepuasan).',
          'Berdasarkan sumber: Data Primer (dikumpulkan langsung lewat survei/wawancara) dan Data Sekunder (diambil dari sumber yang sudah ada seperti laporan BPS atau arsip sekolah).',
        ],
        keyTip: 'Nomor absen atau nomor HP tampak seperti angka, tapi sifatnya label kategori (bukan untuk dijumlahkan!).',
      },
      {
        id: 'bab4-3',
        title: 'Pengumpulan & Pengolahan Data',
        tag: 'Siklus Data',
        summaryPoints: [
          'Cara mengumpulkan data: observasi langsung, angket/kuesioner (misal Google Forms), wawancara, dan pengukuran.',
          'Teknik pengolahan data agar bermakna: Sorting (mengurutkan dari terkecil/terbesar), Filtering (menyaring data sesuai syarat), dan Summarizing (meringkas total/rata-rata seperti di Pivot Table).',
        ],
        keyTip: 'Membersihkan data ganda atau salah ketik sebelum dianalisis sangat penting agar kesimpulan tidak meleset.',
      },
      {
        id: 'bab4-4',
        title: 'Penyajian Tabel dan Jenis Grafik',
        tag: 'Visualisasi',
        summaryPoints: [
          'Tabel efektif menampilkan rincian angka pasti tiap baris dan kolom.',
          'Memilih grafik yang tepat: Column/Bar Chart (membandingkan antar kategori), Line Chart (melihat kenaikan/penurunan dari waktu ke waktu), Pie Chart (menunjukkan proporsi/persentase bagian dari keseluruhan 100%).',
        ],
        keyTip: 'Jangan memakai Pie Chart jika kategorinya terlalu banyak atau tidak membentuk total 100%.',
      },
      {
        id: 'bab4-5',
        title: 'Membaca & Menafsirkan Informasi',
        tag: 'Literasi Data',
        summaryPoints: [
          'Membaca grafik bukan hanya menyebut angka tertinggi dan terendah, tetapi juga menemukan pola, selisih, dan mengambil keputusan.',
          'Selalu periksa judul grafik, satuan sumbu X dan Y, serta skala angka agar tidak tertipu visual grafik yang sumbunya dipotong.',
        ],
        keyTip: 'Latih diri bertanya: "Apa tren utamanya?" dan "Keputusan apa yang bisa diambil dari grafik ini?"',
      },
    ],
    everydayExamples: [
      {
        title: 'Voting Ekstrakurikuler Kelas VIII',
        scenario:
          '32 siswa mengisi formulir pilihan ekskul (Data). Setelah direkap dalam grafik batang, terlihat 50% memilih Robotika dan Futsal (Informasi untuk OSIS).',
        takeaway: 'Informasi membantu sekolah menyediakan pembina dan jadwal ruang yang tepat.',
      },
      {
        title: 'Memantau Perkembangan Nilai Ulangan',
        scenario:
          'Nilai Matematika dari Bab 1 ke Bab 4 naik 70 -> 78 -> 84 -> 92 lalu digambar memakai Line Chart.',
        takeaway: 'Line Chart langsung memperlihatkan tren peningkatan positif.',
      },
    ],
    diagramTitle: 'Transformasi Data Mentah menjadi Informasi Visual',
    diagramCaption: 'Siklus pengumpulan, pengolahan (Sort & Filter), hingga pemilihan grafik yang tepat.',
    activityTitle: 'Lab Data: Ubah Data Mentah Jadi Grafik & Kesimpulan',
    activityDescription:
      'Filter kategori data kegiatan siswa, ubah jenis grafiknya (Batang / Garis / Lingkaran), lalu tarik kesimpulan informasi yang akurat!',
    summaryPoints: [
      'Data adalah fakta mentah; Informasi adalah data yang telah diolah sehingga bermakna.',
      'Data Kuantitatif berbentuk angka terukur; Data Kualitatif berbentuk deskripsi atau kategori.',
      'Pengolahan data meliputi pembersihan, pengurutan (Sorting), penyaringan (Filtering), dan peringkasan.',
      'Pilih Column/Bar untuk perbandingan, Line untuk tren waktu, dan Pie untuk persentase.',
    ],
  },
  {
    id: 5,
    numberLabel: 'BAB 5',
    title: 'Sistem Komputer',
    shortTitle: 'Sistem Komputer',
    description:
      'Kenali kolaborasi Hardware, Software, dan Brainware, komponen Input-Proses-Output-Storage, hingga cara kerja CPU & sistem biner.',
    accentColor: 'amber',
    gradientClass: 'from-amber-500 via-orange-500 to-rose-500',
    borderGlowClass: 'border-amber-500/40 hover:border-amber-400',
    iconName: 'HardDrive',
    objectives: [
      'Menjelaskan tiga elemen utama sistem komputer: Hardware, Software, dan Brainware.',
      'Mengelompokkan perangkat keras ke dalam Input, Process, Output, dan Storage.',
      'Memahami cara kerja sistem komputer dalam siklus Input -> Process -> Output (IPO) beserta sistem bilangan biner.',
      'Membedakan jenis perangkat lunak (Sistem Operasi, Aplikasi, dan Pemrograman).',
    ],
    starterQuestion:
      'Saat kamu menekan tombol huruf "A" di keyboard, mengapa huruf "A" bisa langsung tampil di layar monitor dalam sekejap? Komponen apa saja yang bekerja di balik layar?',
    starterHint:
      'Keyboard mengirim sinyal Input -> CPU memprosesnya menjadi kode biner -> Monitor menampilkannya sebagai Output!',
    subMaterials: [
      {
        id: 'bab5-1',
        title: 'Hardware, Software & Brainware',
        tag: '3 Pilar Sistem',
        summaryPoints: [
          'Sistem komputer adalah kesatuan komponen yang saling bekerja sama mengolah data menjadi informasi.',
          'Hardware (Perangkat Keras): Komponen fisik yang dapat dilihat dan disentuh. Software (Perangkat Lunak): Program/instruksi digital penggerak hardware. Brainware: Manusia yang mengoperasikan, merancang, dan memelihara sistem (pengguna, programmer, teknisi).',
        ],
        keyTip: 'Tanpa salah satu dari ketiganya, komputer tidak dapat menjalankan fungsinya dengan baik.',
      },
      {
        id: 'bab5-2',
        title: 'Perangkat Input & Output',
        tag: 'Gerbang Data',
        summaryPoints: [
          'Perangkat Input (Masukan): Alat untuk memasukkan data atau perintah ke komputer, seperti Keyboard, Mouse, Microphone, Scanner, Webcam, dan Layar Sentuh.',
          'Perangkat Output (Keluaran): Alat untuk menampilkan hasil pemrosesan kepada pengguna, seperti Monitor, Printer, Speaker, dan Proyektor.',
        ],
        keyTip: 'Touchscreen termasuk perangkat ganda (Input sekaligus Output) karena menerima sentuhan dan menampilkan gambar!',
      },
      {
        id: 'bab5-3',
        title: 'Perangkat Proses (CPU & Memori Utama)',
        tag: 'Otak Komputer',
        summaryPoints: [
          'CPU (Central Processing Unit) / Processor adalah otak pemroses instruksi yang terdiri dari Control Unit (CU - pengatur alur), ALU (Arithmetic Logic Unit - penghitung matematika & gerbang logika AND/OR/NOT), serta Register.',
          'RAM (Random Access Memory) adalah memori sementara berkecepatan tinggi untuk menyimpan data aplikasi yang sedang berjalan (datanya hilang saat listrik mati / volatile).',
        ],
        keyTip: 'Semakin besar kapasitas RAM, semakin lancar komputer membuka banyak aplikasi sekaligus (multitasking).',
      },
      {
        id: 'bab5-4',
        title: 'Perangkat Penyimpanan (Storage)',
        tag: 'Memori Permanen',
        summaryPoints: [
          'Storage menyimpan file, foto, dan sistem operasi secara permanen meskipun komputer dimatikan (non-volatile).',
          'Contohnya: SSD (Solid State Drive — sangat cepat), HDD (Hard Disk Drive), Flashdisk, Kartu SD, hingga Cloud Storage (Google Drive, OneDrive).',
        ],
        keyTip: 'Bedakan RAM (meja kerja sementara saat aplikasi dibuka) dengan SSD/HDD (lemari arsip jangka panjang).',
      },
      {
        id: 'bab5-5',
        title: 'Jenis Software & Cara Kerja Biner',
        tag: 'Sistem Kerja',
        summaryPoints: [
          'Software terbagi atas: Sistem Operasi (Windows, Linux, macOS, Android), Perangkat Lunak Aplikasi (Browser, Spreadsheet, Editor Video), dan Bahasa Pemrograman.',
          'Komputer memproses seluruh data memakai siklus Input -> Process -> Output -> Storage dalam bentuk sinyal listrik Biner (0 dan 1), yang juga bisa dikonversi ke Oktal atau Heksadesimal.',
        ],
        codeOrFormula: `Siklus Kerja: [Input] -> [CPU + RAM Process] -> [Output]
Bilangan Biner: 1 = ON (Ada arus), 0 = OFF (Tidak ada arus)`,
        keyTip: 'Setiap 1 byte terdiri atas 8 bit (kombinasi delapan angka 0 dan 1).',
      },
    ],
    everydayExamples: [
      {
        title: 'Mencetak Tugas Makalah Sekolah',
        scenario:
          'Siswa (Brainware) mengetik lewat Keyboard (Input), diolah di Aplikasi Pengolah Kata & CPU/RAM (Process), tampil di Monitor lalu dicetak Printer (Output), dan disimpan di SSD (Storage).',
        takeaway: 'Satu kegiatan sederhana melibatkan seluruh ekosistem sistem komputer.',
      },
      {
        title: 'Mengapa Laptop Terasa Lambat Saat Buka 15 Tab?',
        scenario:
          'Banyak aplikasi dan tab browser memenuhi ruang kerja sementara di RAM.',
        takeaway: 'Menutup aplikasi yang tidak dipakai mengosongkan RAM sehingga CPU bekerja lebih lega.',
      },
    ],
    diagramTitle: 'Siklus Kerja Sistem Komputer (IPO + Storage)',
    diagramCaption: 'Aliran data dari Perangkat Input menuju CPU & RAM, lalu ke Output dan Penyimpanan.',
    activityTitle: 'Lab Hardware: Klasifikasi Input, Process, Output & Storage',
    activityDescription:
      'Kelompokkan perangkat komputer berikut ke kategori fungsinya yang benar untuk menuntaskan misi sistem komputer!',
    summaryPoints: [
      'Tiga komponen sistem komputer: Hardware (fisik), Software (program), dan Brainware (pengguna).',
      'Perangkat keras dikelompokkan menjadi Input, Process (CPU/RAM), Output, dan Storage (SSD/HDD/Flashdisk).',
      'CPU memiliki CU (pengendali), ALU (penghitung & logika), dan Register.',
      'Komputer bekerja dalam siklus Input -> Process -> Output dengan bahasa mesin biner (0 dan 1).',
    ],
  },
  {
    id: 6,
    numberLabel: 'BAB 6',
    title: 'Dampak Sosial Informatika',
    shortTitle: 'Etika & Keamanan Digital',
    description:
      'Jadilah warga digital cerdas! Pelajari dampak media sosial, jejak digital, privasi data, anti-hoaks, dan pencegahan cyberbullying.',
    accentColor: 'emerald',
    gradientClass: 'from-emerald-500 via-teal-500 to-cyan-500',
    borderGlowClass: 'border-emerald-500/40 hover:border-emerald-400',
    iconName: 'ShieldCheck',
    objectives: [
      'Mengidentifikasi dampak positif dan negatif perkembangan teknologi digital.',
      'Menerapkan etika digital (netiket) saat berkomunikasi di media sosial.',
      'Menjaga privasi data pribadi serta memahami konsekuensi jejak digital.',
      'Mengkaji berita bohong (hoaks) serta mencegah perundungan siber (cyberbullying).',
    ],
    starterQuestion:
      'Pernahkah kamu melihat komentar kasar di media sosial atau berita heboh yang ternyata palsu? Mengapa satu komentar atau postingan hari ini bisa berdampak pada masa depan kita bertahun-tahun nanti?',
    starterHint:
      'Semua yang kita unggah meninggalkan Jejak Digital yang sulit dihapus dan dapat memengaruhi reputasi kita!',
    subMaterials: [
      {
        id: 'bab6-1',
        title: 'Perkembangan Teknologi & Dampak Positif/Negatif',
        tag: 'Era Digital',
        summaryPoints: [
          'Dampak Positif: akses materi belajar terbuka luas, komunikasi jarak jauh instan, peluang kreativitas konten digital, serta efisiensi transaksi dan layanan publik.',
          'Dampak Negatif: kecanduan gadget & game (kurang tidur/gerak), penyebaran informasi palsu (hoaks), gangguan privasi, hingga menurunnya interaksi tatap muka.',
        ],
        keyTip: 'Teknologi itu netral; kitalah yang menentukan apakah dipakai untuk berkarya atau merugikan diri sendiri.',
      },
      {
        id: 'bab6-2',
        title: 'Etika Digital (Netiket) & Berpikir Kritis terhadap Hoaks',
        tag: 'Literasi Media',
        summaryPoints: [
          'Etika digital berarti menghormati hak cipta (tidak mencuri karya orang lain tanpa izin/kredit), berkomentar sopan, dan tidak menyebarkan ujaran kebencian.',
          'Cara mengkaji berita bohong (hoaks): jangan langsung percaya judul sensasional, cek sumber media terpercaya, periksa tanggal & keaslian gambar, dan verifikasi di situs pemeriksa fakta seperti turnbackhoax.id.',
        ],
        keyTip: 'Terapkan prinsip "Saring Sebelum Sharing" setiap menerima info viral di grup chat.',
      },
      {
        id: 'bab6-3',
        title: 'Privasi & Keamanan Data Pribadi',
        tag: 'Proteksi Akun',
        summaryPoints: [
          'Data pribadi sensitif seperti alamat rumah, nomor NIK/KK, foto KTP/kartu pelajar, password, dan kode OTP TIDAK BOLEH dibagikan ke sembarang orang atau diunggah ke publik.',
          'Gunakan Two-Factor Authentication (2FA / verifikasi dua langkah) serta atur privasi akun media sosial agar tidak sembarang orang bisa mengakses informasi pribadimu.',
        ],
        keyTip: 'Kode OTP itu rahasia mutlak—pihak resmi bank atau platform tidak pernah memintanya.',
      },
      {
        id: 'bab6-4',
        title: 'Jejak Digital (Digital Footprint)',
        tag: 'Reputasi Online',
        summaryPoints: [
          'Jejak digital adalah rekam jejak aktivitas kita di internet: postingan, komentar, foto yang diunggah, riwayat pencarian, dan data yang dibagikan (aktif maupun pasif).',
          'Sekali terunggah ke internet, konten bisa di-screenshot atau disalin orang lain walau postingan aslinya sudah dihapus. Bangun jejak digital positif lewat prestasi, hobi, dan karya kreatif!',
        ],
        keyTip: 'Sebelum memposting sesuatu, bayangkan apakah kamu bangga jika guru atau orang tuamu melihatnya 5 tahun lagi.',
      },
      {
        id: 'bab6-5',
        title: 'Perundungan Siber (Cyberbullying) & Penggunaan Bijak',
        tag: 'Anti-Bullying',
        summaryPoints: [
          'Cyberbullying adalah tindakan mengintimidasi, mempermalukan, menyebar rumor, atau mengancam orang lain melalui media digital (chat, komentar, atau grup).',
          'Cara mencegah & menghadapi cyberbullying: jangan membalas dengan kebencian, simpan bukti (screenshot), blokir/bisukan pelaku, laporkan lewat fitur Report platform, dan ceritakan kepada orang tua atau guru BK.',
        ],
        keyTip: 'Jadilah "Upstander" (pembela yang bijak) dengan mendukung korban dan menolak ikut menyebarkan gosip!',
      },
    ],
    everydayExamples: [
      {
        title: 'Berbagi Foto Tiket atau Kartu Identitas',
        scenario:
          'Seorang siswa memfoto kartu pelajar beserta alamat rumah dan nomor HP lalu mempostingnya ke Story publik.',
        takeaway: 'Berisiko tinggi penyalahgunaan data pribadi (doxxing/penipuan). Tutupi data sensitif sebelum berfoto.',
      },
      {
        title: 'Menemukan Teman Diejek di Grup Kelas',
        scenario:
          'Ada meme mengejek fisik teman disebarkan di grup chat.',
        takeaway: 'Tolak ikut tertawa atau meneruskan meme, beri dukungan ke teman tersebut, dan laporkan ke wali kelas/guru BK.',
      },
    ],
    diagramTitle: 'Perisai Warga Digital Cerdas (Saring, Jaga, Hormati)',
    diagramCaption: 'Empat pilar menghadapi dunia digital: Privasi, Jejak Positif, Anti-Hoaks, dan Anti-Cyberbullying.',
    activityTitle: 'Lab Studi Kasus: Keputusan Warga Digital',
    activityDescription:
      'Analisis 4 situasi nyata yang sering dialami pelajar SMP di internet dan tentukan tindakan paling bijak!',
    summaryPoints: [
      'Gunakan teknologi untuk belajar dan berkarya sambil membatasi waktu layar agar tetap seimbang.',
      'Terapkan "Saring Sebelum Sharing" untuk memutus rantai hoaks.',
      'Lindungi data pribadi (OTP, alamat, password) dengan 2FA dan pengaturan privasi.',
      'Bangun jejak digital positif dan berani melaporkan kasus cyberbullying.',
    ],
  },
];
