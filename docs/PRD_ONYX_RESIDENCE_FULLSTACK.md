# PRD Fullstack Onyx Residence / KostKu

Dokumen ini disusun dari source code aktif, terutama `fe/src/main.js`, `fe/src/styles.css`, `be/api/*.php`, `be/lib/*.php`, `be/config/*.php`, `be/kostku.sql`, dan `be/migrate_onyx.sql`. README tidak menjadi sumber utama kebutuhan produk.

## 1. Ringkasan Produk

Onyx Residence adalah aplikasi hunian/kost fullstack untuk:

- promosi kamar dan fasilitas hunian;
- booking/registrasi calon penghuni;
- portal penghuni untuk tagihan, bukti bayar, utilitas, smart access, dan tiket layanan;
- admin panel untuk inventory kamar, data penghuni, pembayaran, reservasi, dan laporan cashflow;
- integrasi payment gateway BAYAR GG untuk invoice QRIS/payment link;
- integrasi telemetry IoT/Wokwi ESP32 untuk monitoring kamar;
- penyimpanan image-sequence berat di object storage/CDN Cloudflare R2.

Stack saat ini:

- Frontend: Vite + vanilla JavaScript, `fe/src/main.js`, `fe/src/styles.css`.
- Backend: PHP native API + MySQL via PDO.
- Database: MySQL schema `kostku`, migrasi tambahan Onyx.
- Storage publik sequence: Cloudflare R2 bucket `onyx`, prefix `onyx-sequences/`, public base `https://assets.nawf.dev/onyx-sequences`.

## 2. Tujuan Produk

### 2.1 Tujuan Utama

1. Membuat proses booking kamar kost bisa dilakukan online dari landing page sampai akun penghuni aktif.
2. Memusatkan data administrasi penghuni, kamar, bukti pembayaran, meter utilitas, akses kamar, dan tiket layanan.
3. Memberi admin ringkasan operasional dan cashflow bisnis dalam satu dashboard.
4. Menyediakan pembayaran digital via BAYAR GG, dengan fallback transfer manual dan upload bukti.
5. Mengurangi beban hosting utama dengan memindahkan ratusan frame sequence ke R2/CDN.

### 2.2 Non-Tujuan Saat Ini

- Belum ada sistem role admin/staff dinamis dari tabel `users`.
- Belum ada middleware backend yang memverifikasi cookie auth pada semua endpoint data.
- Belum ada dashboard finansial akuntansi penuh seperti jurnal, ledger, pajak, dan rekonsiliasi bank.
- Belum ada penyimpanan upload bukti transfer di R2; saat ini upload manual disimpan lokal di `be/storage/uploads`.

## 3. Persona

### 3.1 Pengunjung / Calon Penghuni

- Melihat homepage, info fasilitas, harga kamar, dan melakukan booking/registrasi.
- Mengisi data identitas, kontak, pilihan kamar, tipe sewa, tanggal mulai, durasi, deposit, dan data rekening refund.

### 3.2 Penghuni

- Login memakai email atau WhatsApp + password.
- Melihat tagihan sewa/deposit/utilitas.
- Membayar via payment link/QRIS jika tersedia.
- Menggunakan transfer manual jika QRIS tidak tersedia atau nominal melebihi limit.
- Upload bukti transfer.
- Melihat meter utilitas dan telemetry kamar.
- Menggunakan fitur smart access/visitor QR.
- Membuat tiket layanan.

### 3.3 Admin

- Login admin.
- Melihat dashboard operasional.
- Mengelola kamar.
- Melihat dan meninjau penghuni.
- Memeriksa bukti pembayaran, approve/reject, dan membuka detail pembayaran.
- Melihat laporan arus kas bisnis dan mencetak laporan.

## 4. Arsitektur Frontend

### 4.1 Struktur Utama

- `fe/index.html`: shell aplikasi, font, Font Awesome, `window.__ONYX_SEQUENCE_ASSET_BASE_URL`.
- `fe/src/main.js`: state, routing hash, API helper, business helper, render UI, event binding, sequence canvas.
- `fe/src/styles.css`: seluruh styling publik, resident portal, admin dashboard, payment detail, cashflow, print.
- `fe/src/data.js`: seed data kamar awal jika backend/cache belum tersedia.
- `fe/src/utils.js`: `rupiah`, `escapeHtml`, `slug`.
- `fe/vite.config.js`: `base: './'` agar build aman di subfolder/XAMPP.

### 4.2 Routing FE

Aplikasi memakai hash route dan state lokal:

| Route | Halaman | Fungsi |
|---|---|---|
| `#public` atau kosong | Landing/home | Promosi Onyx, sequence tour, CTA booking |
| `#info` | Info | Narasi fasilitas, lokasi, price slider |
| `#booking` | Booking | Form booking awal |
| `#login` | Login | Login admin/resident |
| `#register` | Register | Form akun penghuni |
| `#resident` | Resident portal | Billing, utility, access, service |
| `#admin` | Admin panel | Dashboard, kamar, penghuni, pembayaran, reservasi, laporan |

Guard saat ini:

- `#resident` diarahkan ke login jika `sessionStorage.onyx-resident-session` belum `true`.
- `#admin` menampilkan login jika `state.isAuthenticated` belum `true`.
- Backend menerbitkan cookie HttpOnly, tetapi FE tetap memakai `sessionStorage` sebagai gate UI.

### 4.3 State dan Cache Browser

FE memakai `localStorage`/`sessionStorage` untuk cache non-sensitif dan fallback demo:

- `onyx-rooms`: cache kamar dari `kamar.php`.
- `onyx-admin-state`: cache aggregate `admin-state.php`.
- `onyx-resident-account`: akun penghuni aktif.
- `onyx-payment-proof` dan `onyx-payment-proofs`: bukti transfer lokal/fallback.
- `onyx-utility-meters`: cache meter utilitas.
- `onyx-resident-tickets`: cache tiket layanan.
- `onyx-access-state`, `onyx-access-logs`: cache smart access.
- `onyx-iot-telemetry`: cache telemetry IoT.
- `kostku-admin-session`, `onyx-resident-session`: session UI.

Sinkronisasi dibatasi throttle:

- resident sync kira-kira 10 detik;
- admin sync kira-kira 15 detik;
- switching menu admin render dulu, sync backend di background.

## 5. Modul Frontend Publik

### 5.1 Home / Landing

Fitur aktual:

- brand `Onyx Residence`;
- navigasi Home, Info, Book, Login;
- CTA `Booking Now`;
- canvas image sequence untuk pengalaman tour visual;
- lazy init sequence hanya jika ada elemen `[data-sequence]`;
- preload dan nearest-loaded-frame fallback agar scroll sequence lebih halus.

Requirement:

- Home harus tetap ringan di admin/resident; sequence tidak boleh diinisialisasi di halaman tanpa `[data-sequence]`.
- Frame sequence harus dimuat dari R2/CDN jika `VITE_ONYX_SEQUENCE_ASSET_BASE_URL` atau `window.__ONYX_SEQUENCE_ASSET_BASE_URL` tersedia.

### 5.2 Info

Fitur aktual:

- editorial page Onyx;
- gambar dari `info_assets`;
- room price slider dari data kamar aktif;
- ringkasan fasilitas: WiFi, akses penghuni, tagihan online, tiket service, booking survey.

### 5.3 Booking dan Register

Field aktual:

- nama lengkap;
- WhatsApp;
- email;
- NIK KTP;
- alamat KTP;
- pekerjaan/kampus;
- preferred room;
- tipe sewa: Harian, Mingguan, Bulanan, Tahunan;
- tanggal mulai;
- durasi;
- tanggal selesai;
- total tagihan readonly;
- deposit readonly;
- kontak darurat;
- bank refund deposit;
- nomor rekening refund;
- nama rekening refund;
- password;
- catatan pendaftaran.

Business rule aktual:

- total tagihan dihitung dari harga kamar, tipe sewa, dan durasi;
- tanggal selesai dihitung dari tanggal mulai + tipe/durasi;
- deposit dihitung `30%` dari total tagihan;
- ID aplikasi dibuat dengan format `APP-yyyymmddhhmmss-random` jika belum ada;
- data dikirim ke `resident-application.php` via POST/PATCH;
- password dihash di backend;
- setelah registrasi, user diarahkan ke resident portal.

## 6. Resident Portal

Resident portal memiliki menu:

- Overview;
- Billing;
- Utilities;
- Access;
- Service.

Saat portal dibuka, FE menjalankan sinkronisasi paralel ke:

- `resident-application.php?id=...`;
- `payment-proof.php?application_id=...`;
- `utility-meter.php?application_id=...`;
- `service-ticket.php?application_id=...`;
- `access.php?application_id=...`;
- `iot-ingest.php?room_code=...`.

### 6.1 Billing

Fitur aktual:

- daftar invoice resident;
- invoice sewa/deposit awal;
- invoice utility jika meter tersedia;
- status pembayaran dari `administrationStatus` dan `payment_proofs`;
- countdown batas upload bukti;
- tombol bayar invoice via BAYAR GG;
- fallback transfer manual;
- printable receipt.

Payment rule aktual:

- default payment method adalah QRIS.
- Limit QRIS Admin BAYAR GG saat ini `500000`.
- Jika invoice melebihi limit, backend mengembalikan `PAYMENT_METHOD_LIMIT` dan FE menampilkan transfer manual/split payment.
- Split payment memakai part nominal maksimal sesuai `qris_admin_max_amount`.

### 6.2 Upload Bukti Transfer Manual

Fitur aktual:

- modal transfer manual menampilkan rekening `BCA 1234567890 a.n. Onyx Residence Management` dan WhatsApp admin;
- form upload bukti mengirim `multipart/form-data` ke `payment-proof.php`;
- metadata bukti: invoice, resident, room, sender bank, sender name, amount, file info;
- ekstensi yang diterima backend: `jpg`, `jpeg`, `png`, `webp`, `gif`, `pdf`;
- file disimpan ke `be/storage/uploads`;
- status awal `uploaded`.

### 6.3 Utilities

Fitur aktual:

- menampilkan meter listrik dan air dari `utility_meters`;
- menampilkan telemetry IoT terakhir per kamar dari `iot_room_telemetry`;
- nilai biaya utility berasal dari `electricAmount`, `waterAmount`, `fixedFee`, `totalAmount`.

### 6.4 Access

Fitur aktual:

- status lock kamar;
- guest/visitor QR pass;
- valid until;
- log aktivitas akses;
- copy WiFi/QR/share QR dengan fallback localStorage jika clipboard dibatasi;
- setiap aksi dicatat ke `access_logs` melalui `access.php` jika backend aktif.

### 6.5 Service Ticket

Fitur aktual:

- modal buat tiket;
- field category, priority, issue;
- status default `open`;
- data dikirim ke `service-ticket.php` dan disimpan fallback lokal jika backend gagal.

## 7. Admin Panel

Menu admin aktual:

- Dashboard;
- Kamar;
- Penghuni;
- Pembayaran;
- Reservasi;
- Laporan.

Admin shell memakai sidebar, occupancy summary, logout, dan workspace dinamis.

### 7.1 Dashboard

Fitur aktual:

- sinkronisasi `admin-state.php`;
- ringkasan occupancy kamar;
- jumlah kamar terisi/tersedia/maintenance;
- jumlah penghuni/aplikasi;
- pembayaran pending;
- ringkasan revenue dari data aplikasi dan bukti bayar;
- komponen live section memakai cache backend dan local fallback.

### 7.2 Kamar

Fitur aktual:

- mengambil kamar dari `kamar.php`;
- fallback ke `fe/src/data.js` jika backend gagal;
- filter search nomor/nama;
- filter tipe kamar;
- filter status efektif;
- status efektif mempertimbangkan data penghuni aktif;
- tambah kamar;
- edit/update kamar;
- hapus kamar;
- detail kamar;
- print inventory;
- input/lihat meter utility terkait kamar.

Mapping kamar dari DB:

- `id_kamar` -> `id`;
- `no_kamar` -> `no`;
- `nama_kamar` -> `name`;
- `nama_kategori` -> `type`;
- `harga_per_bulan` -> `price`;
- `fasilitas` -> `facilities`;
- `status` -> `status`.

### 7.3 Penghuni

Fitur aktual:

- daftar penghuni dari `resident_applications` via `admin-state.php`;
- menggabungkan long stay dan short stay tenant dari helper FE;
- KPI: penghuni aktif, long stay, short stay, total billing;
- tabel penghuni;
- detail penghuni;
- form detail admin saat ini belum menyimpan perubahan karena endpoint detail belum diaktifkan.

### 7.4 Pembayaran

Fitur aktual:

- daftar buyer/payment dari `resident_applications` + `payment_proofs`;
- status:
  - `Sudah bayar` jika `administrationStatus === 'Dikonfirmasi Admin'` atau proof `approved`;
  - `Menunggu review` jika proof `uploaded`;
  - `Ditolak` jika proof `rejected`;
  - `Belum bayar` jika belum ada bukti;
- payment detail dengan subnav overview/method/proof;
- bukti transfer bisa dipreview;
- admin bisa approve/reject bukti;
- setelah approved/paid, tombol approve/reject disembunyikan dan diganti badge `Selesai`;
- QRIS split part dapat dibuat dari admin;
- refresh manual menarik ulang admin-state dan IoT.

### 7.5 Reservasi

Fitur aktual:

- menu reservasi tersedia di admin;
- backend legacy `reservasi.php` mendukung GET/POST reservasi;
- panel FE saat ini banyak memakai placeholder/tabel kosong untuk reservasi aktif karena alur utama sudah pindah ke `resident_applications`.

Requirement lanjutan:

- Jika reservasi akan dipakai aktif lagi, hubungkan panel FE ke `reservasi.php` atau konsolidasikan reservasi ke `resident_applications` agar tidak ada dua sumber kebenaran.

### 7.6 Laporan Cashflow

Fitur aktual dari `renderCashflowPanel()`:

- menggantikan invoice panel lama;
- menghitung:
  - `totalRevenue`;
  - `paidRevenue`;
  - `outstanding`;
  - `totalDeposit`;
  - `utilityCost`;
  - `netCashflow`;
  - `collectionRate`;
- hero metric total nilai transaksi;
- KPI cards: pemasukan, outstanding, deposit, biaya utilitas;
- donut chart distribusi paid/outstanding/cost;
- horizontal bar chart kategori transaksi;
- tabel 10 transaksi terakhir;
- ringkasan cashflow;
- tombol `Cetak Laporan` dengan `window.print()`;
- CSS print khusus `@media print`, `.cf-print-btn`, `print-color-adjust`.

Requirement:

- Laporan harus merepresentasikan arus kas bisnis, bukan invoice individual.
- Print view harus bersih dan menyembunyikan elemen non-print.

## 8. Backend API Inventory

Semua endpoint berada di `be/api`. Format response utama memakai `Response::json()` dan error memakai `Response::error()`.

| Endpoint | Method | Fungsi Aktual | Data Utama |
|---|---:|---|---|
| `health.php` | GET | Health check backend | service, version, time |
| `kamar.php` | GET | List kamar dengan filter `q`, `status`, `tipe` | `kamar`, `kategori_kamar` |
| `kamar.php` | POST | Tambah kamar | `kamar` |
| `kamar.php` | PATCH/PUT | Update kamar | `kamar` |
| `kamar.php` | DELETE | Hapus kamar | `kamar` |
| `tamu.php` | GET | List tamu legacy | `tamu` |
| `tamu.php` | POST | Tambah tamu legacy | `tamu` |
| `reservasi.php` | GET | List reservasi legacy join tamu/kamar | `reservasi`, `tamu`, `kamar` |
| `reservasi.php` | POST | Buat reservasi legacy | `reservasi` |
| `admin-auth.php` | POST | Login admin dan issue cookie `kostku-auth` | credential demo backend |
| `auth-resident.php` | POST | Login resident email/phone + password hash | `resident_applications` |
| `auth-logout.php` | POST | Hapus cookie admin/resident | cookie auth |
| `admin-state.php` | GET | Aggregate admin | applications, proofs, utilities |
| `resident-application.php` | GET | List semua aplikasi atau detail by `id` | `resident_applications` |
| `resident-application.php` | POST/PATCH | Upsert aplikasi resident | `resident_applications` |
| `payment-proof.php` | GET | List proof semua/by `application_id` | `payment_proofs` |
| `payment-proof.php` | POST/PATCH | Upload/review proof manual | `payment_proofs`, `resident_applications` |
| `payment-create.php` | POST | Buat invoice BAYAR GG | `payment_invoices`, external API |
| `payment-check.php` | GET | Cek status invoice by `invoice` | `payment_invoices`, external API |
| `payment-webhook.php` | POST | Callback BAYAR GG | `payment_invoices` |
| `utility-meter.php` | GET | Meter by `application_id`, `room`, atau semua | `utility_meters` |
| `utility-meter.php` | POST/PATCH | Upsert meter bulanan dan hitung biaya | `utility_meters` |
| `service-ticket.php` | GET | Tiket by `application_id` atau semua | `service_tickets` |
| `service-ticket.php` | POST/PATCH | Upsert tiket layanan | `service_tickets` |
| `access.php` | GET | State akses + 20 log terbaru by `application_id` | `access_states`, `access_logs` |
| `access.php` | POST/PATCH | Update lock/guest pass + insert log | `access_states`, `access_logs` |
| `iot-ingest.php` | GET | Telemetry terbaru by room/all rooms | `iot_room_telemetry` |
| `iot-ingest.php` | POST | Ingest telemetry ESP32/Wokwi | `iot_room_telemetry` |

## 9. Data Model Aktual

### 9.1 Core KostKu Legacy

- `kategori_kamar`: master kategori Standard/Deluxe/Suite/VIP.
- `kamar`: inventory kamar, harga, fasilitas, foto, status.
- `tamu`: data tamu legacy.
- `reservasi`: booking legacy dengan check-in/check-out dan status.
- `users`: admin/staff legacy, belum dipakai untuk auth admin aktif.

### 9.2 Onyx Resident

`resident_applications` menyimpan akun/aplikasi penghuni:

- identitas: `id`, `name`, `phone`, `email`, `nik`, `address`, `occupation`;
- sewa: `room`, `lease_type`, `duration`, `start_date`, `end_date`;
- finansial: `monthly_budget`, `deposit`;
- emergency/refund: `emergency_contact`, `refund_bank`, `refund_account`, `refund_account_name`;
- auth: `password_hash`;
- status: `application_status`, `administration_status`;
- timestamp: `created_at`, `updated_at`.

### 9.3 Payment

`payment_proofs`:

- `id`, `application_id`, `invoice`;
- `resident_name`, `room`;
- `sender_bank`, `sender_name`, `amount`;
- `file_name`, `file_path`, `file_url`, `mime_type`, `file_size`;
- `status`: `uploaded`, `approved`, `rejected`;
- `reviewed_at`, timestamps.

`payment_invoices`:

- internal ID;
- `application_id`;
- provider `bayar_gg`;
- provider invoice ID;
- `payment_url`;
- `description`, `amount`, `method`, `status`;
- `raw_response`, timestamps.

### 9.4 Utility dan IoT

`utility_meters`:

- `id`, `application_id`, `resident_name`, `room`, `meter_month`;
- `electric_kwh`, `water_m3`;
- `electric_rate`, `water_rate`, `fixed_fee`;
- `electric_amount`, `water_amount`, `total_amount`;
- `status`, timestamps.

`iot_room_telemetry`:

- `id`, `room_code`;
- `temperature`, `humidity`;
- `power_watt`, `energy_kwh`, `water_m3`;
- `ac_on`, `light_on`, `water_on`;
- `raw_payload`, `created_at`.

### 9.5 Service dan Access

`service_tickets`:

- `id`, `application_id`, `category`, `priority`, `issue`, `status`, timestamps.

`access_states`:

- `application_id`, `locked`, `guest_pass`, `valid_until`, `updated_at`.

`access_logs`:

- `id`, `application_id`, `action`, `detail`, `status`, `created_at`.

## 10. Auth, Session, dan Security

### 10.1 Auth Aktual

- Admin login di `admin-auth.php` memakai credential demo `admin` / `admin123` dan menerbitkan cookie HttpOnly `kostku-auth`.
- Resident login di `auth-resident.php` mencari user dari `resident_applications.email` atau `resident_applications.phone`, lalu `password_verify()` terhadap `password_hash`.
- Register/upsert resident memakai `password_hash(..., PASSWORD_DEFAULT)`.
- Logout menghapus `kostku-auth` dan `onyx-resident-auth`.

### 10.2 Risiko dan Requirement Produksi

Wajib sebelum production serius:

1. Ganti hardcoded admin login dengan tabel user + password hash + role.
2. Tambahkan middleware auth backend untuk endpoint admin/resident, bukan hanya gate UI.
3. Set `BAYAR_GG_API_KEY` dari environment; jangan simpan fallback API key di repository. Rotasi key yang pernah tersimpan di source.
4. Set `BAYAR_GG_WEBHOOK_SECRET` agar webhook signature wajib valid.
5. Tambahkan batas ukuran upload bukti, scan MIME server-side, dan auth upload.
6. Tambahkan CSRF protection untuk request yang memakai cookie auth.
7. Update CORS agar memasukkan domain live yang benar dan tidak membuka origin tidak perlu.
8. Hindari menyimpan data sensitif resident di localStorage untuk production.

## 11. Payment Flow

### 11.1 Flow BAYAR GG

1. Resident/admin menekan tombol bayar.
2. FE POST ke `payment-create.php` dengan amount, application ID, description, customer info, redirect URL.
3. Backend memanggil BAYAR GG `create-payment.php`.
4. Jika sukses, response berisi `payment_url`, lalu FE membuka payment link di tab baru.
5. Invoice disimpan di `payment_invoices`.
6. Status dicek via `payment-check.php` atau diperbarui oleh `payment-webhook.php`.

### 11.2 Flow Limit QRIS

1. Backend membaca `qris_admin_max_amount` dari config/env.
2. Jika method `qris` dan amount > limit, backend return HTTP 422 dengan code `PAYMENT_METHOD_LIMIT`.
3. FE menampilkan opsi transfer manual atau split QRIS.

### 11.3 Flow Manual Transfer

1. Resident melihat rekening manual.
2. Resident upload bukti.
3. Backend menyimpan file dan row `payment_proofs` status `uploaded`.
4. Admin melihat bukti di menu Pembayaran.
5. Admin approve atau reject.
6. Approve memperbarui proof menjadi `approved` dan status administrasi resident menjadi terkonfirmasi.
7. Reject memperbarui proof menjadi `rejected` dan resident perlu upload ulang.

## 12. Object Storage dan Asset Strategy

### 12.1 Sequence Assets

Home page memakai ratusan frame JPG di folder sequence. File tersebut berat dan tidak boleh dilayani dari hosting aplikasi utama.

Requirement aktual:

- simpan sequence di Cloudflare R2 bucket `onyx`;
- prefix: `onyx-sequences/`;
- public base URL: `https://assets.nawf.dev/onyx-sequences`;
- FE build production harus memakai `VITE_ONYX_SEQUENCE_ASSET_BASE_URL=https://assets.nawf.dev/onyx-sequences`;
- runtime override dapat memakai `window.__ONYX_SEQUENCE_ASSET_BASE_URL`.

### 12.2 Upload Bukti Pembayaran

Saat ini bukti transfer disimpan lokal:

- folder: `be/storage/uploads`;
- URL relatif: `../storage/uploads/...`.

Roadmap:

- pindahkan upload proof ke R2/S3-compatible storage;
- simpan public/private URL di `payment_proofs.file_url`;
- batasi akses file proof hanya admin/resident terkait.

## 13. Deployment dan Environment

### 13.1 Frontend

Command:

```bash
cd fe
npm install
npm run build
```

Output build: `fe/dist`.

Config penting:

```env
VITE_ONYX_SEQUENCE_ASSET_BASE_URL=https://assets.nawf.dev/onyx-sequences
```

Live target saat ini: `https://onyx.nawf.dev/`.

### 13.2 Backend

Backend dapat dijalankan di XAMPP/shared hosting dengan path `/be/api`.

Database:

1. Import `be/kostku.sql`.
2. Jalankan `be/migrate_onyx.sql` bila tabel Onyx tambahan belum ada.

Environment backend:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=kostku
DB_USERNAME=root
DB_PASSWORD=
BAYAR_GG_BASE_URL=https://www.bayar.gg/api
BAYAR_GG_API_KEY=...
BAYAR_GG_WEBHOOK_SECRET=...
BAYAR_GG_PAYMENT_METHOD=qris
BAYAR_GG_QRIS_ADMIN_MAX_AMOUNT=500000
```

## 14. Non-Functional Requirements

### 14.1 Performance

- Admin/resident tidak boleh memuat image sequence.
- Sequence hanya aktif di halaman yang memiliki `[data-sequence]`.
- Frame sequence dimuat dari R2/CDN.
- Preload sequence harus bertahap dan tidak memblokir UI.
- Admin menu switching harus render instan, backend sync background.
- Cache state FE boleh dipakai sebagai fallback agar UI tetap terbuka saat backend lambat.

### 14.2 Reliability

- Jika backend gagal, kamar fallback ke seed/cache.
- Jika tiket/proof gagal terkirim, FE menyimpan fallback lokal dan memberi toast.
- API harus mengembalikan JSON konsisten: `success`, `data`, `message/error`.

### 14.3 Accessibility dan UX

- Navigasi harus memakai label jelas.
- Tombol aksi utama harus memiliki state jelas.
- Status pembayaran harus dibedakan visual dan teks.
- Print cashflow harus bersih tanpa sidebar/aksi non-print.
- Layout harus responsif untuk desktop dan mobile.

### 14.4 Maintainability

- Logic bisnis utama saat ini terpusat di `main.js`; untuk scale selanjutnya perlu dipisah modul: API client, auth, billing, admin, resident, sequence.
- Endpoint PHP harus tetap memakai prepared statement.
- Mapper DB -> API harus dipusatkan di `ApplicationMapper.php` untuk data resident/proof/utility.

## 15. Acceptance Criteria

### 15.1 Public/Booking

- Pengunjung dapat membuka Home, Info, Booking tanpa login.
- Data kamar tampil dari backend jika tersedia, fallback seed jika backend gagal.
- Form booking menghitung tanggal selesai, total tagihan, dan deposit otomatis.
- Submit booking membuat/menyimpan aplikasi resident.

### 15.2 Resident

- Resident bisa login memakai email/phone + password yang dibuat saat register.
- Resident melihat invoice dan status payment.
- Resident bisa membuka payment link jika gateway sukses.
- Jika QRIS limit, resident melihat opsi transfer manual.
- Upload bukti berhasil tersimpan dan muncul di admin.
- Resident dapat melihat utility, access log, dan membuat service ticket.

### 15.3 Admin

- Admin bisa login.
- Dashboard menampilkan data dari `admin-state.php`.
- Kamar bisa difilter, ditambah, diubah, dihapus.
- Data penghuni berasal dari `resident_applications`.
- Pembayaran menampilkan daftar buyer dan detail bukti.
- Admin bisa approve/reject bukti manual.
- Setelah approved, tombol approve/reject tidak muncul lagi.
- Laporan cashflow menghitung pemasukan, outstanding, deposit, utility cost, net cashflow, dan dapat dicetak.

### 15.4 Backend

- Semua endpoint mengembalikan JSON valid.
- Input wajib divalidasi sesuai endpoint.
- File upload hanya menerima format yang diizinkan.
- Payment webhook menolak signature invalid jika secret diset.
- IoT ingest menolak `roomCode` kosong/tidak valid.

## 16. Known Limitations

- Admin credential masih hardcoded demo.
- Backend endpoint data belum dilindungi middleware auth menyeluruh.
- Role `users` belum dipakai.
- Reservasi legacy belum sepenuhnya tersambung ke panel admin modern.
- Upload bukti masih lokal, belum R2.
- localStorage masih menyimpan beberapa data resident untuk cache/fallback.
- Payment gateway tergantung metode BAYAR GG aktif; QRIS Admin punya limit nominal.
- Tidak ada migration runner otomatis; SQL dijalankan manual.

## 17. Roadmap Rekomendasi

Prioritas tinggi:

1. Auth backend berbasis user table + role + middleware.
2. Rotasi dan pindahkan semua secret ke environment.
3. R2/S3 storage untuk bukti pembayaran.
4. Konsolidasi reservasi legacy dan resident application.
5. Audit keamanan upload + CSRF + endpoint authorization.

Prioritas menengah:

1. Modulasi `main.js` menjadi beberapa file.
2. Admin update detail penghuni.
3. Dashboard service ticket admin.
4. Payment reconciliation dari invoice webhook ke payment proof/resident status.
5. Export laporan cashflow ke CSV/PDF.

Prioritas rendah:

1. Multi-role staff.
2. Notification WhatsApp/email.
3. Public availability calendar.
4. Analytics occupancy bulanan.
