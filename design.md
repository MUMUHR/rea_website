# design.md — reacreative.idn Landing Page (UI/UX Upgrade v2)

> Scope: redesign landing page pada project Next.js (App Router) + Tailwind + Supabase yang sudah ada.
> Ini BUKAN rebuild dari nol — struktur konten/copy existing tetap dipakai, yang diupgrade adalah visual system, komposisi, dan interaksi.
> Reference: layout & copy existing site (reacreative.web.id) + 3 screenshot yang diberikan user.
> Governed by: `UI-UX-fundamental_V2.md` (khususnya §8 Anti-Template, §18 Anti-Generic Detection, §23 Advanced Composition).

---

## 0. Assumptions & Open Decisions

Confirm atau revisi sebelum lanjut ke prompt.md:

1. **Full dark theme.** Token yang dikasih tidak punya pasangan light-bg/dark-text, jadi hero section ikut jadi dark (bukan putih seperti sekarang). Kalau hero mau tetap putih, butuh tambahan token (mis. `--bg-light: #FFFEFF`, `--text-dark: #121115`).
2. `--brand` dan `--text-2` sama-sama `#E11D2E` — redundant. Di bawah aku treat sebagai satu token (`brand`) supaya gak ada 2 nama untuk 1 nilai. Kalau memang sengaja dipisah untuk future-proofing (misal nanti text-2 mau beda dari brand), bilang aja, tinggal split lagi.
3. Struktur section ikuti urutan existing site + revisi sesuai brief kamu (lihat §3). Section "Referensi Tampilan" dan "Kenapa Memilih Kami" tetap dipertahankan posisinya dari screenshot 2.
4. Asset gambar (foto bangunan, logo klien, background image) diasumsikan sudah ada di `public/` project kamu — prompt.md nanti akan minta Antigravity untuk **audit folder asset dulu** sebelum hardcode path, bukan menebak nama file.
5. Bahasa konten tetap Bahasa Indonesia, tone tetap sama seperti existing (professional-approachable, bukan korporat kaku).

---

## 1. Design Tokens

```css
:root {
  /* Brand */
  --brand: #E11D2E;        /* satu-satunya warna CTA & accent. Section 6 rule: no secondary CTA color. */

  /* Text */
  --text: #FFFEFF;         /* primary text di atas dark bg */
  --text-muted: rgba(255, 254, 255, 0.64);   /* body/paragraph, turunan --text, bukan token baru */
  --text-subtle: rgba(255, 254, 255, 0.40);  /* caption, meta, footer fine print */

  /* Surface */
  --support: #121115;      /* base page background (paling gelap) */
  --dayum: #232323;        /* elevated surface: card, navbar solid, section band kedua */
  --dayum-hover: #2C2C2C;  /* hover state untuk card/interactive surface, turunan --dayum */

  /* Radius */
  --radius-sm: 6px;   /* shape kotak hero, badge */
  --radius-md: 10px;  /* button, input */
  --radius-lg: 16px;  /* pricing shape kiri, card besar */

  /* Spacing scale (4px base) */
  --space-section-y: 120px;  /* desktop, 64px di mobile */
}
```

**Semantic rule (non-negotiable, ikut §6 UI-UX doc):**
- `--brand` HANYA untuk: CTA primer, active/hover state pada nav link, angka statistik penting, accent shape. Jangan dipakai untuk body text, jangan untuk >1 elemen dekoratif per section.
- `--support` = base canvas. `--dayum` = apapun yang "duduk di atas" canvas (card, navbar, band section).
- Semantic state (error/success/warning) TIDAK dibuat dari palette ini — kalau nanti butuh (form validation di admin panel misalnya), pakai token terpisah, jangan reuse `--brand` untuk error.

---

## 2. Typography

- Font: pertahankan yang sudah dipakai di project existing (cek `tailwind.config` / `layout.tsx` — jangan ganti tanpa alasan, ikuti §5 legibility-first).
- Modular scale: **1.333 (perfect fourth)** untuk hero H1 & section heading (editorial, sesuai §23) — body text tetap base 16px, jangan ikut scale dramatis.
- H1 hero: bold, size besar (clamp `2.5rem → 4rem`), highlight kata kunci pakai `--brand` seperti existing (contoh: "Naik Level" merah, sisanya `--text`).
- Section eyebrow label (contoh "KLIEN KAMI", "LAYANAN UTAMA"): uppercase, `--brand`, letter-spacing wide, size kecil (12–13px), weight 600–700.

---

## 3. Section-by-Section Spec

### 3.1 Navbar

**Layout:** logo kiri, nav links tengah/kanan, 2 button kanan (ghost + filled) — sama seperti existing.

**Background:** `--dayum`, transparan-to-solid on scroll — 

**Interaksi link (hover underline slide-in):**
- Default: no underline.
- Hover: underline muncul dari kiri ke kanan (`::after`, `width: 0 → 100%`, `transform-origin: left`, warna `--brand`, height 2px, posisi bottom -4px).
- Transition: `width 250ms ease-out`. Vanilla CSS, jangan pakai JS/library untuk ini — terlalu ringan untuk butuh dependency.
- Active page state: underline permanen (width 100%) tanpa perlu hover.

**Button fill effect (2 varian):**
- **Ghost button** (contoh "QR Generator"): border `--text` 1px, background transparent → on hover, background fill `--dayum-hover` atau `--brand` (pilih salah satu, rekomendasi: fill `--brand` supaya konsisten "1 CTA color" rule, teks jadi `--text` tetap kontras).
  - Implementasi: bukan transisi background-color biasa (kesannya generic/flat) — pakai pseudo-element `::before` position absolute, `scale-x(0) → scale-x(1)`, `transform-origin: left`, `transition: transform 300ms cubic-bezier`. Ini yang bikin efek "fill" terasa directional, bukan fade.
- **Primary filled button** (contoh "Konsultasi Gratis"): sudah solid `--brand` dari awal — hover state: sedikit darken (`brightness(0.9)`) + subtle scale (1.02), bukan fill effect (karena sudah filled).

**Mobile:** collapse ke hamburger, drawer dari kanan, background `--support`.

---

### 3.2 Hero Section

**Layout:** 2 kolom desktop (kiri teks ~55%, kanan visual ~45%), stack di mobile (teks dulu, visual di bawah).

**Kolom kiri:**
- Eyebrow tag (contoh: "Custom Website · Sistem · Mobile App")
- H1 dengan highlight kata kunci pakai `--brand`
- Paragraph deskripsi, `--text-muted`
- 2 CTA button (filled + ghost, pakai spec §3.1)
- 2 trust badge kecil (icon + teks 2 baris, border 1px subtle, background `--dayum`)
- Stats row (120+ / 80+ / 3+) — angka pakai `--brand` atau `--text` bold besar, label `--text-subtle`

**Kolom kanan — shape composition (ini bagian paling detail, ikuti §23 Advanced Composition — layered depth tanpa box-shadow generic):**

Layer dari belakang ke depan (z-index naik):
1. **Shape dayum** — kotak besar, `background: var(--dayum)`, `border-radius: var(--radius-sm)`, posisi offset ke kanan-bawah dari shape merah (contoh: `translate(24px, 24px)` relatif terhadap shape merah). Ini yang jadi "bayangan struktural", bukan `box-shadow` dan agar miring beberapa deg gitu.
2. **Shape merah** — kotak `background: var(--brand)`, `border-radius: var(--radius-sm)`, di depan shape dayum, ukuran sedikit lebih kecil/sama, posisi utama dan juga agak miring. 
3. **Gambar bangunan** — grayscale/duotone photo, posisi overlap menimpa KEDUA shape (bukan cuma di dalam satu shape) — ini yang menciptakan "intentional tension" (§23): foto melebihi boundary shape-nya, bukan di-crop rapi di dalam kotak. `object-fit: cover`, boleh sedikit rotate (1–2deg) kalau mau nambah "human, art-directed" feel — tapi maksimal 1 elemen broken-grid per section, jangan dobel sama hal lain.

**Rule:** JANGAN ganti komposisi ini jadi generic "image in rounded card with shadow" — itu exact anti-pattern yang mau dihindari (§8 Swap Test: kalau shape ini bisa ditempel di landing page kompetitor manapun tanpa terasa aneh, berarti gagal).

---

### 3.3 Client Logo Marquee ("Dipercaya Oleh")

- Infinite horizontal scroll, seamless loop.
- **Implementasi: CSS-only**, bukan JS library (Animation-Fundamental.md rule: prefer native CSS untuk motion sederhana/repetitive).
  ```css
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .marquee-track {
    display: flex;
    width: max-content;
    animation: marquee 30s linear infinite;
  }
  ```
  Track berisi logo array di-duplicate 2x (`[...logos, ...logos]`), width otomatis 2x → animate ke `-50%` = seamless loop tanpa jump.
- Pause on hover (`animation-play-state: paused`) — opsional tapi bagus untuk UX (biar user bisa lihat logo tertentu).
- Logo grayscale default, full color on hover per-logo (`filter: grayscale(1) → grayscale(0)`, transition 200ms).
- Background section: `--support` atau `--dayum` (bukan putih, sesuai keputusan full-dark di §0).

---

### 3.4 Layanan (3 Card Section)

- Background: `--dayum`.
- Background image di kiri-bawah: subtle, low opacity (`opacity: 0.15–0.25`), posisi absolute, JANGAN full-bleed (biar gak ganggu readability card di atasnya) — ini "textured surface" per §19, bukan decoration random.
- 3 card: background `--support` (kontras dari section bg `--dayum`), border-radius `--radius-lg`, padding generous.
- Setiap card: nomor urut besar (01/02/03) di pojok kanan-atas, opacity rendah, `--brand` atau `--text-subtle` — jadi elemen dekoratif yang juga fungsi sebagai visual hierarchy marker.
- Icon di top card: background circle kecil `--brand` atau outline, bukan flat icon tanpa container (kesannya lebih "designed").
- CTA di bawah tiap card ("Explore More"): ghost button kecil dengan arrow icon, hover pakai fill-effect §3.1.
- **Card hover state:** subtle lift (`translateY(-4px)`) + border `--brand` 1px muncul (default border transparent) — jangan pakai box-shadow besar generic.

---

### 3.5 Pricing Section

**Layout:** 2 kolom.

**Kiri — 2 shape kotak stacked:**
- Shape atas: `background: var(--brand)`, `border-radius: var(--radius-lg)`, isi bisa kosong/pattern subtle.
- Shape bawah: `background: var(--dayum)`, `border-radius: var(--radius-lg)`.
- **Teks di tengah, di antara 2 shape** (bukan di dalam salah satu shape) — ini yang bikin komposisi unik dibanding "text inside card" biasa. Teks pakai heading besar ("Mulai Dari Rp 800.000") + deskripsi singkat, positioned absolute atau via negative margin overlap kedua shape.
- Kedua shape harus punya sedikit overlap/gap konsisten (bukan nempel rata) supaya teks di tengah punya "napas".

**Kanan — detail card:**
- Background `--support` atau `--dayum` (kontras dari section bg).
- Badge "Penawaran Terbatas" pojok kanan-atas, `--brand`, rounded-full, size kecil.
- Harga besar + "mulai dari" kecil di sampingnya.
- Checklist item (4 poin: domain, hosting, SSL, konsultasi) — icon check pakai `--brand`, bukan generic green checkmark (checkmark hijau akan konflik sama semantic state, dan gak sesuai brand yang cuma 1 accent color).
- CTA button filled, full-width di dalam card.

---

### 3.6 "Kenapa Memilih Kami" (Feature List + Code Visual)

Referensi: screenshot 2 (sudah dark, struktur udah oke) — upgrade yang perlu:
- Ganti warna accent icon container dari merah generic ke `--brand` konsisten dengan token baru.
- Card feature (4 item list): background `--dayum`, border-radius `--radius-md`, hover state border `--brand` muncul.
- Badge "Real / Project Focused" di gambar kiri: `--brand` solid, posisi overlap ke gambar (bottom-right, seperti existing) — pertahankan, ini contoh "intentional tension" yang sudah bagus.
- Garis L-shape merah di pojok gambar (existing di screenshot): pertahankan sebagai framing element (§23 negative space as shape).

---

### 3.7 Referensi Tampilan / Portfolio

- Grid: 1 besar + 2 kecil (existing layout sudah bagus — asymmetric grid, jangan diseragamkan jadi 3 kotak sama besar, itu generic).
- Overlay gradient bawah tiap gambar untuk readability label teks di atasnya (`--support` gradient, bukan solid dark overlay flat).
- Hover: image scale subtle (`scale(1.05)`, `overflow: hidden` di container), transition 400ms.

---

### 3.8 Final CTA + Footer

Referensi: screenshot 3 (struktur sudah oke). Upgrade:
- Background `--support`.
- Badge "MULAI SEKARANG" di atas heading: rounded-full, `--brand`, uppercase kecil.
- 2 CTA button (filled WhatsApp + ghost Hubungi Kami) — spec sama §3.1.
- Footer: 4 kolom (brand+desc, layanan, tautan bisnis, kontak) — pertahankan struktur, ganti warna sesuai token baru. Social icon: circle outline `--text-subtle`, hover jadi `--brand` solid fill.
- WhatsApp floating button (pojok kanan-bawah, sudah ada di existing) — pertahankan, warna tetap hijau WhatsApp (JANGAN diganti ke `--brand` — ini exception, karena WA green adalah recognized affordance/mental model, bukan brand color territory. §2 Mental Models rule berlaku di sini).

---

## 4. Interaction/Motion Summary (untuk referensi Antigravity)

| Element | Trigger | Effect | Duration |
|---|---|---|---|
| Nav link | hover | underline slide-in left→right | 250ms ease-out |
| Ghost button | hover | fill slide `scale-x` left→right | 300ms cubic-bezier |
| Filled button | hover | brightness dim + scale 1.02 | 200ms |
| Logo marquee | auto | infinite translateX loop | 30s linear infinite |
| Logo item | hover | grayscale → color | 200ms |
| Service card | hover | translateY(-4px) + border reveal | 250ms |
| Portfolio image | hover | scale(1.05) | 400ms |
| Section entrance | scroll into view | fade + translateY(20px) | single vanilla IntersectionObserver, stagger per section — TIDAK per-element (avoid jank, konsisten sama pola Jinoe) |

**Library policy:** CSS-only untuk semua di atas. Kalau nanti butuh scroll-driven parallax (bukan bagian brief ini), baru pertimbangkan Framer Motion — jangan install dependency animasi untuk hover state sederhana.

---

## 5. Responsive Notes

- Breakpoint utama: mobile (<768px), tablet (768–1024px), desktop (>1024px).
- Hero shape composition (§3.2): di mobile, sederhanakan — 1 shape + gambar (bukan 2 layer shape), supaya gak berantakan di layar sempit. Teks selalu di atas visual di mobile.
- Marquee: tetap jalan di mobile, tapi kurangi jumlah logo visible / perbesar gap biar gak terlalu padat.
- Pricing section: 2 kolom → stack, shape-kiri jadi lebih pendek (bukan proporsi desktop).

---

## 6. Anti-Generic Check (§18 Swap Test)

Sebelum eksekusi, tanya: kalau logo & copy diganti brand lain, apakah section ini masih terasa "reacreative"?
- Hero shape composition (shape ganda + foto overlap) → **pass**, cukup distinctive.
- Pricing dual-shape-with-text-between → **pass**, bukan pola pricing card generic.
- Marquee logo, 3-card service, footer 4-kolom → **generic secara struktur** (itu wajar, semua service company pakai pola ini), tapi diselamatkan oleh consistent token system (1 accent color, dayum/support hierarchy) dan detail interaksi (fill-effect button, underline nav). Jangan overthink bagian ini — struktur boleh konvensional selama detail eksekusinya distinctive.

---

## Next: prompt.md

Setelah kamu confirm/revisi assumption di §0, aku lanjut buatkan `prompt.md` — isinya instruksi untuk Antigravity: audit project structure & asset yang sudah ada dulu, lalu implementasi section-by-section sesuai spec di atas, dengan urutan eksekusi yang aku susun supaya gak ada breaking change ke bagian yang belum disentuh.