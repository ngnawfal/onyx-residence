# Onyx Residence Portal Roadmap

## Public Navigation

Public navbar should use `Login` instead of `Admin` because the portal will serve both residents and staff.

## Resident Portal Modules

- Dashboard penghuni: status kamar, masa sewa, tagihan berjalan.
- Pemakaian utilitas: listrik, air, estimasi biaya, riwayat pemakaian.
- Pembayaran: invoice bulanan, status lunas/belum lunas, cetak bukti pembayaran.
- Smart access: status smart door lock, log akses kamar.
- Service request: jadwalkan cleaning/maintenance, lapor kendala listrik, air, pintu, WiFi, AC.
- WiFi info: SSID/password aktif, pengumuman maintenance jaringan.
- Notifikasi: jatuh tempo, pembayaran berhasil, kendala diproses.

## Admin Panel Modules

- Dashboard operasional: okupansi, pendapatan, tunggakan, tiket service.
- Manajemen penghuni: data lengkap, pencarian/filter, export/print list penghuni.
- Kamar dan smart lock: status kamar, akses pintu, log masuk, reset akses.
- Billing: tagihan kost, invoice, pembayaran, tunggakan, cetak bukti.
- Utilitas: monitoring listrik/air per kamar, riwayat pemakaian, kontrol listrik kamar.
- Kontrol tunggakan: policy otomatis matikan listrik kamar jika belum membayar, dengan audit log dan override admin.
- CCTV/security: daftar kamera, status online/offline, akses monitoring sesuai izin.
- Service desk: tiket kendala, jadwal service, status pengerjaan, catatan teknisi.
- WiFi/network: informasi WiFi penghuni, status jaringan, pengumuman.
- Search global: cari penghuni, kamar, invoice, tiket, transaksi.

## UI Consistency Direction

- Public Home: cinematic sequence, dark luxury, gold accent.
- Public Info: cinematic detail page, dark hero frame, editorial room/facility/location sections.
- Public Book: cinematic hero plus concierge form.
- Resident/Admin Portal: same Onyx dark/gold identity, but more dashboard-oriented with clean tables, filters, status badges, print actions.

## BAYAR GG Payment Integration

- Base URL: `https://www.bayar.gg/api`.
- Backend config uses environment variables:
  - `BAYAR_GG_API_KEY`
  - `BAYAR_GG_WEBHOOK_SECRET`
  - `BAYAR_GG_PAYMENT_METHOD` default `qris_bayar_gg`
- Backend endpoints prepared:
  - `POST /be/api/payment-create.php` creates payment via `/api/create-payment.php`.
  - `GET /be/api/payment-check.php?invoice=...` checks status via `/api/check-payment.php`.
  - `POST /be/api/payment-webhook.php` receives BAYAR GG callback and verifies signature if secret is configured.
- Resident Billing should call `payment-create.php` from invoice row `Pay` button.
- In production, webhook must update local invoice status from `pending` to `paid` and write audit log.
- For monthly rent above Rp500.000, do not rely on default QRIS Admin. Use `qris_bayar_gg`, `qris_user`, or `gopay_qris` according to account availability.
- Electricity suspension logic must depend on local invoice status updated by webhook, not only frontend state.

## Security Notes

- Smart lock, CCTV, listrik, dan data penghuni harus memakai role-based access control.
- Aksi berisiko seperti mematikan listrik kamar wajib memiliki audit log, konfirmasi admin, dan alasan tindakan.
- Portal penghuni tidak boleh melihat CCTV atau data penghuni lain.
