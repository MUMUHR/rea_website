# prompt.md — Eksekusi UI/UX Upgrade reacreative.idn Landing Page

Kamu bekerja di project Next.js (App Router) + Tailwind + Supabase yang SUDAH ADA dan SUDAH JALAN — bukan project baru. Ada admin panel yang mengelola sebagian konten landing page lewat Supabase (kemungkinan: client logos, portfolio items, service list, pricing). Baca task ini sampai selesai sebelum mulai eksekusi.

Dokumen rujukan wajib dibaca sebelum menulis kode apapun:
1. `design.md` (di root repo — kalau belum ada di sana, copy dari deliverable ini dulu)
2. `UI-UX-fundamental_V2.md` (design constitution — cek apakah sudah ada di repo, kalau belum, tanya lokasi ke user, jangan asumsi)

---

## FASE 0 — Audit Wajib (Jangan Skip, Jangan Asumsi)

Sebelum mengubah satu baris UI pun, jawab pertanyaan berikut dengan membaca codebase langsung:

1. **Struktur project**: `app/` routing, komponen mana yang render landing page (`page.tsx` di root + komponen section apa saja yang di-import).
2. **Supabase schema untuk konten landing page**: cek tabel apa yang dipakai untuk:
   - Client logos (kolom apa: nama, url gambar, order?)
   - Portfolio/referensi tampilan (kolom apa: title, category, image, link?)
   - Service list (3 card layanan — hardcoded di komponen atau dari DB?)
   - Pricing (hardcoded atau dari DB?)
   Cari file query Supabase (`lib/supabase`, `queries/`, atau di dalam Server Component langsung) untuk konfirmasi mana yang dinamis vs hardcoded.
3. **Admin panel**: cek route admin (`app/admin/...` atau serupa) — form/CRUD apa saja yang sudah ada untuk konten di atas. Ini penting supaya redesign UI publik TIDAK merusak kontrak data yang dipakai admin panel untuk insert/update.
4. **Asset yang tersedia**: list isi `public/` (atau Supabase Storage bucket kalau gambar di-hosting di sana) — foto bangunan, background image untuk section layanan, dsb. JANGAN generate/asumsi nama file gambar — pakai yang benar-benar ada. Kalau asset yang dibutuhkan (foto bangunan untuk hero, background image section layanan) tidak ketemu, STOP dan laporkan ke user, jangan pakai placeholder/stock image tanpa izin.
5. **Global style/token setup saat ini**: cek `tailwind.config.ts` dan `globals.css` — apakah sudah ada CSS variable/theme extend, atau warna masih hardcoded per-komponen (`bg-red-500` dsb).

Laporkan hasil audit ini secara singkat sebelum lanjut ke Fase 1 (list findings, bukan narasi panjang).

---

## ATURAN KERAS (berlaku sepanjang eksekusi)

- **Non-destructive terhadap data layer.** Kalau suatu section datanya dari Supabase, JANGAN ubah struktur data/kontrak props yang dipakai fetching-nya. Kalau upgrade UI butuh field baru (misal: field `logo_grayscale_override` atau semacamnya — kemungkinan kecil dibutuhkan tapi cek dulu), STOP, laporkan ke user dulu sebelum bikin migration. Sama seperti kasus field `kelompok` di project lain — jangan pernah alter schema secara sepihak.
- **Admin panel tidak boleh rusak.** Kalau ada component yang dipakai bareng antara landing page dan admin panel (misal card preview di admin), jangan restyle component itu langsung — buat variant terpisah untuk landing page kalau perlu, supaya admin panel gak ikut ke-affect tanpa sengaja.
- **Section-by-section, bukan big-bang rewrite.** Ikuti urutan Fase 1 di bawah. Setiap section selesai → build harus tetap jalan tanpa error sebelum lanjut ke section berikutnya.
- **Tokens dulu, komponen kemudian.** Setup CSS variables (§1 design.md) di `globals.css` / Tailwind config SEBELUM menyentuh komponen manapun. Semua warna baru di komponen HARUS reference token, bukan hex langsung.
- **CSS-only untuk motion yang disebut di design.md §4.** Jangan install library animasi baru (Framer Motion, GSAP, dll) untuk hover underline, button fill, atau marquee — itu semua achievable dengan CSS murni + 1 IntersectionObserver vanilla untuk scroll-reveal. Kalau di codebase sudah ada Framer Motion terpasang untuk kebutuhan lain, boleh dipakai untuk konsistensi — tapi jangan install baru khusus untuk ini.
- **Assumption di design.md §0 yang belum dikonfirmasi user**: default yang dipakai — (a) full dark theme termasuk hero, (b) `--brand` dan `--text-2` digabung jadi 1 token, (c) ghost button fill ke `--brand`. Kalau saat implementasi ternyata ada bagian yang terasa aneh/kontras buruk karena default ini, laporkan spesifik ke user — jangan diam-diam ubah ke asumsi sendiri.

---

## FASE 1 — Eksekusi Section-by-Section

Urutan ini sengaja: foundation dulu, baru section yang saling gak bergantung, baru section yang paling kompleks (hero, pricing) di tengah setelah pattern dasar (button, card, token) sudah settle.

### 1. Design Tokens & Global Setup
- Tambahkan CSS variables dari design.md §1 ke `globals.css` (atau extend `tailwind.config.ts` `theme.colors` supaya bisa dipakai sebagai utility class `bg-brand`, `text-support`, dll — **pilih pendekatan ini kalau project belum pakai CSS var pattern**, lebih idiomatic buat Tailwind).
- Buat 2 reusable component dulu sebelum sentuh section manapun:
  - `<Button variant="filled" | "ghost">` — dengan fill-effect hover sesuai design.md §3.1
  - `<NavLink>` — dengan underline slide-in sesuai design.md §3.1

### 2. Navbar
- Restyle pakai `<NavLink>` dan `<Button>` yang baru dibuat.
- Background `--dayum`, mobile drawer `--support`.

### 3. Footer
- Ganti warna sesuai token. Struktur 4 kolom dipertahankan.
- **Kalau data footer (kontak, social link) hardcoded**: biarkan hardcoded, itu bukan scope redesign ini. Kalau ternyata sudah dari Supabase (site settings table), jangan ubah cara fetch-nya, cuma restyle.
- WhatsApp floating button: WARNA TETAP HIJAU WA, jangan diganti `--brand` (lihat design.md §3.8).

### 4. Client Logo Marquee
- **Cek dulu (Fase 0.2)**: kalau logo dari Supabase, implementasi marquee harus tetap terima data as props dari server component / fetch existing — jangan hardcode array logo.
- Implementasi CSS marquee sesuai design.md §3.3 (duplicate array data 2x di render, bukan di DB).
- Grayscale-to-color hover per logo.

### 5. Service Cards (3 Card Section)
- Cek dulu apakah 3 card ini hardcoded atau dari DB (Fase 0.2). Kalau hardcoded, tetap hardcoded (bukan scope untuk migrate ke DB) — cuma restyle sesuai design.md §3.4.
- Background image bottom-left: pakai asset yang sudah dikonfirmasi ada di Fase 0.4.

### 6. Hero Section
- Ini paling kompleks — kerjakan setelah pattern button/token sudah stabil.
- Layer composition sesuai design.md §3.2 (shape dayum → shape merah → foto bangunan overlap).
- Foto bangunan: pakai asset asli yang dikonfirmasi Fase 0.4, jangan crop paksa ke aspect ratio yang merusak komposisi foto — sesuaikan container.
- Responsive: sederhanakan ke 1 shape + foto di mobile (design.md §5).

### 7. Pricing Section
- Cek dulu apakah harga/isi pricing dari Supabase (admin panel biasanya butuh update harga tanpa redeploy — kemungkinan besar ini dari DB). Kalau iya, komposisi shape ganda + teks di tengah (design.md §3.5) harus tetap render data dinamis, bukan hardcode ulang angka.
- 2 shape stacked kiri + card detail kanan sesuai spec.

### 8. "Kenapa Memilih Kami" (Feature List)
- Restyle sesuai design.md §3.6 — struktur existing sudah oke, fokus ke token color & border hover state.

### 9. Referensi Tampilan / Portfolio
- Cek Fase 0.2: portfolio items kemungkinan besar dari Supabase + admin panel (perlu upload gambar baru tanpa redeploy). Pertahankan data-fetching, restyle grid/hover sesuai design.md §3.7.

### 10. Final CTA
- Restyle sesuai design.md §3.8.

### 11. Scroll-reveal pass (terakhir, opsional)
- Setelah semua section jadi, tambahkan 1 IntersectionObserver vanilla untuk fade+translateY entrance per section (design.md §4). Ini paling terakhir supaya gak ganggu proses debug section individual.

---

## Definition of Done (per section)
- Build jalan tanpa error/warning baru.
- Tidak ada hardcoded hex color baru — semua lewat token.
- Data-driven section (logo, portfolio, pricing — sesuai temuan Fase 0) tetap fetch dari Supabase seperti semula, cuma tampilan yang berubah.
- Admin panel functionality tidak berubah (test create/update salah satu data kalau memungkinkan).
- Responsive dicek di mobile breakpoint, bukan cuma desktop.
- Swap Test check (design.md §6) untuk section hero & pricing khususnya — pastikan komposisi shape gak collapse jadi generic card.

## Reporting
Setelah tiap section selesai, laporkan singkat: apa yang diubah, apakah section itu data-driven atau hardcoded (dari temuan Fase 0), dan ada blocker/assumption apa yang perlu dikonfirmasi user.