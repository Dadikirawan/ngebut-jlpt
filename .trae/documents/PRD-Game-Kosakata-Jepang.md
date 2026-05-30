## 1. Gambaran Produk
Game kuis interaktif untuk anak usia 5–10 tahun belajar kosakata Jepang (Indonesia + Jepang).
Fokus pada interaksi sederhana, visual cerah, umpan balik instan, dan sesi pendek (10 soal) agar terasa seperti “main sambil belajar”.

## 2. Fitur Inti

### 2.1 Peran Pengguna
| Peran | Cara Mulai | Hak Akses Inti |
|------|------------|----------------|
| Pemain (Anak) | Klik tombol “Mulai” | Bermain kuis, melihat skor, mengulang permainan |

### 2.2 Modul Fitur
1. **Layar Mulai (Level 1)**: judul game, label level, tombol mulai, petunjuk singkat.
2. **Layar Kuis**: tampil kosakata Jepang (hiragana + romaji), pertanyaan dalam Bahasa Indonesia, 3 pilihan jawaban (Indonesia + Jepang), skor, indikator progres (1/10), umpan balik.
3. **Layar Hasil**: skor akhir, pesan penyemangat, tombol main lagi.

### 2.3 Detail Halaman
| Nama Halaman | Nama Modul | Deskripsi Fitur |
|---|---|---|
| Layar Mulai | Judul & Maskot | Tampilan ramah anak dengan ilustrasi/ikon hewan; ringkas dan jelas |
| Layar Mulai | Tombol Mulai | Memulai sesi 10 soal (Level 1) |
| Layar Kuis | Kartu Kata Jepang | Menampilkan hiragana + romaji dengan ukuran besar dan kontras tinggi |
| Layar Kuis | Pertanyaan | Kalimat tanya sederhana dalam Bahasa Indonesia |
| Layar Kuis | Pilihan Jawaban | 3 tombol besar; masing-masing menampilkan Indonesia + Jepang (kana + romaji) |
| Layar Kuis | Umpan Balik Instan | Benar: tambah skor + efek positif; Salah: tampil jawaban benar + kalimat penyemangat |
| Layar Kuis | Progres & Skor | “Soal X/10” + skor berjalan; label “Level 1” |
| Layar Hasil | Ringkasan Skor | Skor akhir + evaluasi ringan (mis. “Hebat!”) |
| Layar Hasil | Main Lagi | Mengulang sesi dari awal dengan urutan soal diacak |

## 3. Proses Inti
Pemain menekan “Mulai”, lalu mengerjakan 10 soal pilihan ganda. Setiap soal memberi umpan balik instan (benar/salah). Setelah soal ke-10, pemain melihat skor akhir dan bisa main lagi.

```mermaid
flowchart TD
  A["Layar Mulai"] --> B["Mulai Level 1"]
  B --> C["Soal (1 dari 10)"]
  C --> D["Pemain pilih jawaban"]
  D --> E["Benar: +Skor +Efek Positif"]
  D --> F["Salah: Tunjuk jawaban benar +Semangat"]
  E --> G["Lanjut soal berikutnya"]
  F --> G["Lanjut soal berikutnya"]
  G --> H["Soal ke-10 selesai?"]
  H -->| "Tidak" | C
  H -->| "Ya" | I["Layar Hasil"]
  I --> J["Main Lagi"]
  J --> B
```

## 4. Desain Antarmuka

### 4.1 Gaya Visual
- Arah gaya: “Playful Classroom” (ceria, seperti kartu belajar).
- Palet warna utama: kuning lemon (#FFD84D), biru langit (#4DC3FF), hijau mint (#45E6B6), aksen merah muda (#FF5DA2), netral putih gading (#FFF8E6).
- Tipografi: font besar, bulat, mudah dibaca (fallback sistem jika font khusus tidak tersedia).
- Tombol: besar, rounded, efek bayangan lembut; state hover/active terasa seperti “dipencet”.
- Ilustrasi: ikon hewan lucu (emoji/asset lokal), bintang, konfeti.
- Animasi: transisi ringan saat pindah soal; shake halus saat salah; pop saat benar.

### 4.2 Gambaran UI per Halaman
| Nama Halaman | Modul | Elemen UI |
|---|---|---|
| Layar Mulai | Hero | Judul besar, badge “Level 1”, maskot, latar pola ringan |
| Layar Mulai | CTA | Tombol “Mulai” sangat jelas, satu aksi utama |
| Layar Kuis | Header | Level, progres “Soal X/10”, skor |
| Layar Kuis | Konten | Kartu kata (kana + romaji), teks pertanyaan Indonesia |
| Layar Kuis | Jawaban | 3 tombol jawaban warna-warni dengan teks besar |
| Layar Kuis | Feedback | Panel/overlay singkat: benar/salah + jawaban benar + tombol “Lanjut” |
| Layar Hasil | Ringkasan | Skor akhir + pesan sesuai performa + tombol main lagi |

### 4.3 Responsif
- Desktop-first, tetapi tombol dan jarak dibuat ramah sentuh.
- Ukuran tombol minimal nyaman untuk anak, jarak antar tombol cukup agar tidak salah klik.

## 5. Rencana Aset Dasar
- Ikon/ilustrasi: gunakan emoji (🐶🐱🐦⭐) sebagai default; opsional ganti ke PNG/SVG lokal di folder `assets/`.
- Pola latar: dibuat dari CSS gradient + bentuk sederhana (tanpa gambar eksternal).
- SFX (opsional): file audio lokal kecil (`assets/sfx/correct.mp3`, `wrong.mp3`) jika ingin ditambahkan.
