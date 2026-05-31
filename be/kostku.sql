-- Nama File: be/kostku.sql | Fungsi: Skema database awal KostKu | Author: PPL-UAS

CREATE DATABASE IF NOT EXISTS kostku CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE kostku;

CREATE TABLE IF NOT EXISTS kategori_kamar (
  id_kategori INT AUTO_INCREMENT PRIMARY KEY,
  nama_kategori VARCHAR(50) NOT NULL UNIQUE,
  deskripsi TEXT NULL
);

CREATE TABLE IF NOT EXISTS kamar (
  id_kamar INT AUTO_INCREMENT PRIMARY KEY,
  no_kamar VARCHAR(10) NOT NULL UNIQUE,
  id_kategori INT NOT NULL,
  nama_kamar VARCHAR(100) NOT NULL,
  harga_per_bulan DECIMAL(10,2) NOT NULL,
  fasilitas TEXT NULL,
  foto VARCHAR(255) NULL,
  status ENUM('tersedia','terisi','maintenance') NOT NULL DEFAULT 'tersedia',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_kamar_kategori FOREIGN KEY (id_kategori) REFERENCES kategori_kamar(id_kategori)
);

CREATE TABLE IF NOT EXISTS tamu (
  id_tamu INT AUTO_INCREMENT PRIMARY KEY,
  nama_lengkap VARCHAR(150) NOT NULL,
  nik VARCHAR(20) NOT NULL UNIQUE,
  no_telp VARCHAR(20) NOT NULL,
  email VARCHAR(100) NULL,
  alamat_asal TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reservasi (
  id_reservasi INT AUTO_INCREMENT PRIMARY KEY,
  kode_booking VARCHAR(20) NOT NULL UNIQUE,
  id_tamu INT NOT NULL,
  id_kamar INT NOT NULL,
  tgl_checkin DATE NOT NULL,
  tgl_checkout DATE NOT NULL,
  total_harga DECIMAL(12,2) NOT NULL,
  status ENUM('pending','confirmed','checkin','checkout','cancelled') NOT NULL DEFAULT 'pending',
  keterangan TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_reservasi_tamu FOREIGN KEY (id_tamu) REFERENCES tamu(id_tamu),
  CONSTRAINT fk_reservasi_kamar FOREIGN KEY (id_kamar) REFERENCES kamar(id_kamar)
);

CREATE TABLE IF NOT EXISTS users (
  id_user INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(60) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  nama_lengkap VARCHAR(150) NOT NULL,
  role ENUM('admin','staff') NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT IGNORE INTO kategori_kamar (id_kategori, nama_kategori, deskripsi) VALUES
(1, 'Standard', 'Kamar standar untuk kebutuhan dasar'),
(2, 'Deluxe', 'Kamar nyaman dengan fasilitas tambahan'),
(3, 'Suite', 'Kamar luas dengan fasilitas premium'),
(4, 'VIP', 'Kamar terbaik dengan akses fasilitas lengkap');

INSERT IGNORE INTO kamar (no_kamar, id_kategori, nama_kamar, harga_per_bulan, fasilitas, status) VALUES
('A01', 1, 'Aurora Compact', 850000, 'WiFi, Lemari, Meja belajar', 'tersedia'),
('B07', 2, 'Nebula Deluxe', 1450000, 'AC, KM dalam, Balkon', 'terisi'),
('C12', 3, 'Saffron Suite', 2250000, 'Smart TV, Pantry, Queen bed', 'maintenance'),
('D03', 4, 'Opal Studio', 3100000, 'Mini kitchen, Laundry, Rooftop', 'tersedia');

CREATE TABLE IF NOT EXISTS resident_applications (
  id VARCHAR(40) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  email VARCHAR(120) NULL,
  nik VARCHAR(32) NULL,
  address TEXT NULL,
  occupation VARCHAR(150) NULL,
  room VARCHAR(150) NOT NULL,
  lease_type VARCHAR(30) NOT NULL,
  duration INT NOT NULL DEFAULT 1,
  start_date DATE NULL,
  end_date DATE NULL,
  monthly_budget DECIMAL(12,2) NOT NULL DEFAULT 0,
  deposit DECIMAL(12,2) NOT NULL DEFAULT 0,
  emergency_contact VARCHAR(150) NULL,
  refund_bank VARCHAR(80) NULL,
  refund_account VARCHAR(80) NULL,
  refund_account_name VARCHAR(150) NULL,
  notes TEXT NULL,
  password_hash VARCHAR(255) NULL,
  application_status VARCHAR(60) NOT NULL DEFAULT 'Menunggu Review',
  administration_status VARCHAR(80) NOT NULL DEFAULT 'Belum Dibayar',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS payment_proofs (
  id VARCHAR(40) PRIMARY KEY,
  application_id VARCHAR(40) NOT NULL,
  invoice VARCHAR(60) NULL,
  resident_name VARCHAR(150) NULL,
  room VARCHAR(150) NULL,
  sender_bank VARCHAR(80) NULL,
  sender_name VARCHAR(150) NULL,
  amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  file_name VARCHAR(255) NULL,
  file_path VARCHAR(255) NULL,
  file_url VARCHAR(255) NULL,
  mime_type VARCHAR(100) NULL,
  file_size INT NULL,
  status VARCHAR(40) NOT NULL DEFAULT 'uploaded',
  reviewed_at DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_payment_proofs_application FOREIGN KEY (application_id) REFERENCES resident_applications(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS utility_meters (
  id VARCHAR(80) PRIMARY KEY,
  application_id VARCHAR(40) NULL,
  resident_name VARCHAR(150) NULL,
  room VARCHAR(150) NOT NULL,
  month VARCHAR(7) NOT NULL,
  electric_kwh DECIMAL(10,2) NOT NULL DEFAULT 0,
  water_m3 DECIMAL(10,2) NOT NULL DEFAULT 0,
  electric_rate DECIMAL(10,2) NOT NULL DEFAULT 0,
  water_rate DECIMAL(10,2) NOT NULL DEFAULT 0,
  fixed_fee DECIMAL(12,2) NOT NULL DEFAULT 0,
  electric_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  water_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  total_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  status VARCHAR(40) NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_utility_meters_application FOREIGN KEY (application_id) REFERENCES resident_applications(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS payment_invoices (
  id VARCHAR(60) PRIMARY KEY,
  application_id VARCHAR(40) NULL,
  provider VARCHAR(40) NOT NULL DEFAULT 'bayar_gg',
  provider_invoice_id VARCHAR(120) NULL,
  payment_url TEXT NULL,
  description VARCHAR(255) NULL,
  amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  method VARCHAR(60) NULL,
  status VARCHAR(40) NOT NULL DEFAULT 'created',
  raw_response JSON NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_payment_invoices_application FOREIGN KEY (application_id) REFERENCES resident_applications(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS iot_room_telemetry (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  room_code VARCHAR(20) NOT NULL,
  temperature DECIMAL(6,2) NOT NULL DEFAULT 0,
  humidity DECIMAL(6,2) NOT NULL DEFAULT 0,
  power_watt DECIMAL(10,2) NOT NULL DEFAULT 0,
  energy_kwh DECIMAL(10,3) NOT NULL DEFAULT 0,
  water_m3 DECIMAL(10,3) NOT NULL DEFAULT 0,
  ac_on TINYINT(1) NOT NULL DEFAULT 0,
  light_on TINYINT(1) NOT NULL DEFAULT 0,
  water_on TINYINT(1) NOT NULL DEFAULT 0,
  raw_payload JSON NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_iot_room_created (room_code, created_at)
);
