# KostKu — Online Booking Engine

Project ini sekarang dipisah jelas menjadi **FE** dan **BE**.

```text
PPL_UAS/
├── fe/   # Frontend Vite + JavaScript
├── be/   # Backend PHP native + MySQL API
└── PRD_KostKu_OnlineBookingEngine (1).docx
```

## Frontend

Folder frontend ada di:

```text
fe/
```

Perintah development:

```bash
cd fe
npm install
npm run dev
```

URL Vite:

```text
http://127.0.0.1:5173/
```

Build production:

```bash
cd fe
npm run build
```

## Backend

Folder backend ada di:

```text
be/
```

Endpoint awal:

```text
GET  /be/api/health.php
GET  /be/api/kamar.php
POST /be/api/kamar.php
GET  /be/api/tamu.php
POST /be/api/tamu.php
GET  /be/api/reservasi.php
POST /be/api/reservasi.php
```

Import database:

```text
be/kostku.sql
```

## XAMPP

Untuk XAMPP, struktur deploy menjadi:

```text
C:\xampp\htdocs\PPL_UAS\fe
C:\xampp\htdocs\PPL_UAS\be
```

URL frontend build:

```text
http://localhost/PPL_UAS/fe/
```

URL health backend:

```text
http://localhost/PPL_UAS/be/api/health.php
```
