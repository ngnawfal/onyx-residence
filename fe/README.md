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
## Sequence asset storage

Home page image-sequence assets are heavy: `sequenze_1`, `sequenze_2`, and `sequenze_3` contain hundreds of JPG frames. For production, put those folders on object storage/CDN (Cloudflare R2, S3-compatible storage, Bunny Storage, etc.) and build the frontend with:

```bash
VITE_ONYX_SEQUENCE_ASSET_BASE_URL=https://your-assets-domain.example/onyx-sequences npm run build
```

Expected storage layout:

```text
https://your-assets-domain.example/onyx-sequences/sequenze_1/ezgif-frame-001.jpg
https://your-assets-domain.example/onyx-sequences/sequenze_2/ezgif-frame-001.jpg
https://your-assets-domain.example/onyx-sequences/sequenze_3/ezgif-frame-001.jpg
```

If `VITE_ONYX_SEQUENCE_ASSET_BASE_URL` is empty, the app falls back to local relative assets (`./sequenze_*`) for development or simple hosting.

Runtime override is also available in `index.html` before `main.js` loads:

```html
<script>
  window.__ONYX_SEQUENCE_ASSET_BASE_URL = 'https://your-assets-domain.example/onyx-sequences';
</script>
```
