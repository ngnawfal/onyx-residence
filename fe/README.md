# KostKu FE

Frontend panel ini dipisah dari PHP menggunakan Vite vanilla JavaScript.

## Perintah

```bash
npm install
npm run dev
npm run build
```

## Konsep Pemisahan

- `fe/` menjadi source UI modern.
- `fe/dist/` menjadi hasil build statis untuk XAMPP.
- `be/` menjadi backend PHP native/API, misalnya `be/api/kamar.php`, `be/api/reservasi.php`, dan `be/api/tamu.php`.

Saat ini data masih dummy di `src/data.js`, jadi aman dipakai untuk demo UI sebelum disambungkan ke MySQL.
