# KostKu Backend

Backend PHP native untuk KostKu. Folder ini hanya untuk API, database, dan logic server.

## Struktur

```text
be/
├── api/
│   ├── health.php
│   ├── kamar.php
│   ├── tamu.php
│   └── reservasi.php
├── config/
│   ├── cors.php
│   └── database.php
├── lib/
│   ├── Database.php
│   ├── Request.php
│   └── Response.php
└── kostku.sql
```

## Endpoint

```text
GET  /be/api/health.php
GET  /be/api/kamar.php
POST /be/api/kamar.php
GET  /be/api/tamu.php
POST /be/api/tamu.php
GET  /be/api/reservasi.php
POST /be/api/reservasi.php
```

## Setup Database

1. Buka phpMyAdmin.
2. Import `be/kostku.sql`.
3. Sesuaikan koneksi di `be/config/database.php` jika username/password MySQL berbeda.
