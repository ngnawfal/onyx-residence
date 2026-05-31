/*
  Onyx Room IoT Monitor - Wokwi ESP32
  Sensor virtual:
  - DHT22: suhu + humidity
  - Potentiometer 1: simulasi daya listrik watt
  - Potentiometer 2: simulasi flow air
  - Switch: status AC, lampu, air
  Kirim JSON ke API: /be/api/iot-ingest.php
*/

// Library WiFi dipakai ESP32 untuk koneksi internet di simulator Wokwi.
#include <WiFi.h>
// HTTPClient dipakai untuk POST data telemetry ke API PHP.
#include <HTTPClient.h>
// ArduinoJson dipakai untuk membuat payload JSON sensor.
#include <ArduinoJson.h>
// DHT dipakai untuk membaca sensor suhu dan kelembapan DHT22.
#include <DHT.h>

// Pin DHT22 sebagai sensor suhu/kelembapan virtual.
#define DHTPIN 15
// Tipe sensor yang digunakan di Wokwi.
#define DHTTYPE DHT22
// Pin analog untuk potensiometer simulasi daya listrik.
#define POWER_PIN 34
// Pin analog untuk potensiometer simulasi debit air.
#define WATER_PIN 35
// Pin switch untuk status AC.
#define AC_SWITCH_PIN 25
// Pin switch untuk status lampu.
#define LIGHT_SWITCH_PIN 26
// Pin switch untuk status valve/air.
#define WATER_SWITCH_PIN 27

// SSID wajib Wokwi agar simulasi bisa terhubung internet tanpa password.
const char* WIFI_SSID = "Wokwi-GUEST";
const char* WIFI_PASSWORD = "";

// Ganti ke URL website kamu. Jika lokal XAMPP tidak public, pakai ngrok/cloudflared.
const char* API_URL = "https://your-domain.com/PPL_UAS/be/api/iot-ingest.php";
const char* ROOM_CODE = "A01";

DHT dht(DHTPIN, DHTTYPE);
// energyKwh menampung akumulasi konsumsi listrik dari powerWatt terhadap waktu.
float energyKwh = 0.0;
// waterM3 menampung akumulasi pemakaian air dari flow liter/menit terhadap waktu.
float waterM3 = 0.0;
// lastMillis dipakai menghitung selisih waktu antar pengiriman telemetry.
unsigned long lastMillis = 0;

// Fungsi ini menghubungkan ESP32 ke WiFi Wokwi sebelum mengirim data.
void connectWifi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(300);
    Serial.print(".");
  }
  Serial.println(" connected");
}

// Fungsi ini membaca potensiometer listrik lalu memetakan nilainya menjadi watt.
float readPowerWatt() {
  int raw = analogRead(POWER_PIN);
  return map(raw, 0, 4095, 0, 1200);
}

// Fungsi ini membaca potensiometer air lalu memetakan nilainya menjadi liter per menit.
float readWaterFlowLiterPerMinute() {
  int raw = analogRead(WATER_PIN);
  return map(raw, 0, 4095, 0, 120) / 10.0;
}

// Fungsi utama pengiriman sensor: baca sensor, hitung akumulasi, buat JSON, lalu POST ke API.
void sendTelemetry() {
  // Membaca suhu dan humidity dari DHT22.
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  // Fallback dipakai supaya payload tetap valid walau DHT gagal membaca data.
  if (isnan(temperature)) temperature = 24.0;
  if (isnan(humidity)) humidity = 60.0;

  // Membaca status switch perangkat kamar.
  bool acOn = digitalRead(AC_SWITCH_PIN) == HIGH;
  bool lightOn = digitalRead(LIGHT_SWITCH_PIN) == HIGH;
  bool waterOn = digitalRead(WATER_SWITCH_PIN) == HIGH;

  // Menghitung durasi jam sejak pengiriman terakhir untuk akumulasi kWh/m3.
  unsigned long now = millis();
  float hours = (now - lastMillis) / 3600000.0;
  lastMillis = now;

  // Menghitung pemakaian listrik dan air berdasarkan sensor virtual.
  float powerWatt = readPowerWatt();
  float waterLpm = readWaterFlowLiterPerMinute();
  energyKwh += (powerWatt / 1000.0) * hours;
  if (waterOn) waterM3 += (waterLpm * (hours * 60.0)) / 1000.0;

  // StaticJsonDocument menyimpan payload JSON yang akan dikirim ke backend.
  StaticJsonDocument<384> doc;
  doc["roomCode"] = ROOM_CODE;
  doc["temperature"] = temperature;
  doc["humidity"] = humidity;
  doc["powerWatt"] = powerWatt;
  doc["energyKwh"] = energyKwh;
  doc["waterM3"] = waterM3;
  doc["acOn"] = acOn;
  doc["lightOn"] = lightOn;
  doc["waterOn"] = waterOn;

  // serializeJson mengubah object JSON menjadi String untuk body HTTP POST.
  String payload;
  serializeJson(doc, payload);

  // HTTP POST mengirim telemetry ke endpoint iot-ingest.php.
  HTTPClient http;
  http.begin(API_URL);
  http.addHeader("Content-Type", "application/json");
  int code = http.POST(payload);
  Serial.print("POST ");
  Serial.print(code);
  Serial.print(" -> ");
  Serial.println(payload);
  http.end();
}

// setup() berjalan sekali saat ESP32 pertama kali menyala.
void setup() {
  // Serial dipakai untuk melihat log POST di monitor Wokwi.
  Serial.begin(115200);
  // Switch diset input pulldown agar default LOW saat tidak ditekan.
  pinMode(AC_SWITCH_PIN, INPUT_PULLDOWN);
  pinMode(LIGHT_SWITCH_PIN, INPUT_PULLDOWN);
  pinMode(WATER_SWITCH_PIN, INPUT_PULLDOWN);
  dht.begin();
  connectWifi();
  lastMillis = millis();
}

// loop() berjalan terus-menerus selama ESP32 aktif.
void loop() {
  // Jika WiFi terputus, ESP32 mencoba konek ulang.
  if (WiFi.status() != WL_CONNECTED) connectWifi();
  // Kirim telemetry setiap siklus.
  sendTelemetry();
  // Delay 5 detik supaya server tidak dibanjiri request.
  delay(5000);
}
