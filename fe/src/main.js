import './styles.css';
import { rooms as seedRooms } from './data.js';
import { escapeHtml, rupiah, slug } from './utils.js';

/*
  ===============================================================
  PANDUAN PRESENTASI FILE: fe/src/main.js
  ===============================================================
  File ini adalah pusat logika frontend Onyx Residence/KostKu.
  Alur besarnya:
  1. State aplikasi menyimpan halaman aktif, filter, sesi login, dan data kamar.
  2. Helper API menghubungkan frontend Vite ke backend PHP di /be/api.
  3. Helper bisnis menghitung sewa, deposit, status kamar, invoice, dan utility meter.
  4. Render function membuat tampilan Home, Booking, Resident Portal, dan Admin Dashboard.
  5. bindEvents() memasang semua event listener untuk CRUD, pencarian, print, payment, dan smart room.
  Catatan database:
  - Data utama dikirim ke backend PHP/MySQL lewat apiJson() atau fetch(apiUrl()).
  - localStorage/sessionStorage hanya dipakai untuk cache tampilan non-sensitif dan status UI.
  - Saat backend aktif, data real disinkron dari API seperti kamar.php, resident-application.php, payment-proof.php, utility-meter.php.
  Komentar di bawah sengaja dibuat eksplisit agar mudah dijelaskan saat presentasi UAS.
*/

if (window.localStorage.getItem('onyx-db-clean-v4') !== 'true') {
  ['onyx-resident-tickets', 'onyx-access-logs', 'onyx-access-state', 'onyx-last-copied-access', 'onyx-rooms'].forEach((key) => window.localStorage.removeItem(key));
  window.localStorage.setItem('onyx-db-clean-v4', 'true');
}

// Daftar id section admin yang valid; dipakai untuk routing clean URL /admin/<section>.
const adminSectionIds = ['dashboard', 'kamar', 'penghuni', 'pembayaran', 'utilities', 'layanan', 'laporan'];

// Helper base path: dukung deploy di subfolder /PPL_UAS (Apache) maupun root (Vite/hosting).
function appBasePath() {
  return window.location.pathname === '/PPL_UAS' || window.location.pathname.startsWith('/PPL_UAS/') ? '/PPL_UAS' : '';
}

function routePath(path = '/') {
  return `${appBasePath().replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}` || '/';
}

function currentAppPath() {
  const base = appBasePath().replace(/\/$/, '');
  const pathname = window.location.pathname || '/';
  return base && pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname;
}
const state = {
  page: getInitialPage(),
  roomQuery: '',
  roomType: '',
  roomStatus: '',
  adminRoomDetail: null,
  activeRoomDetailSection: 'overview',
  isRoomCreateOpen: false,
  activeAdminSection: getInitialAdminSection(),
  activePaymentSection: 'overview',
  proofPreview: null,
  adminPaymentDetailId: null,
  adminDetailType: '',
  adminDetailIndex: null,
  activeResidentSection: 'overview',
  isTicketModalOpen: false,
  isQrModalOpen: false,
  manualTransferInvoice: null,
  manualProofUploadProgress: null,
  isAuthenticated: window.sessionStorage.getItem('kostku-admin-session') === 'true',
  rooms: JSON.parse(window.localStorage.getItem('onyx-rooms') || 'null') || seedRooms,
};

const adminMenu = [
  { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-pie' },
  { id: 'kamar', label: 'Kamar', icon: 'fa-bed' },
  { id: 'penghuni', label: 'Penghuni', icon: 'fa-house-user' },
  { id: 'pembayaran', label: 'Pembayaran', icon: 'fa-money-check-dollar' },
  { id: 'utilities', label: 'Utilitas', icon: 'fa-bolt' },
  { id: 'layanan', label: 'Layanan', icon: 'fa-screwdriver-wrench' },
  { id: 'laporan', label: 'Laporan', icon: 'fa-file-invoice' },
];
const manualTransferAccount = {
  bank: 'BCA',
  number: '1234567890',
  holder: 'Onyx Residence Management',
  whatsapp: '6281234567890',
};

const qrisAdminMaxAmount = 500000;
const monthFormatter = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
function setCookie(name, value, days = 1) {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict${secure}`;
}

function getCookie(name) {
  const raw = document.cookie.split('; ').find((row) => row.startsWith(`${name}=`))?.split('=').slice(1).join('=');
  return raw ? decodeURIComponent(raw) : '';
}

function deleteCookie(name) {
  const secureFlag = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Strict${secureFlag}`;
}
function isResidentAuthenticated() {
  return window.sessionStorage.getItem('onyx-resident-session') === 'true';
}

// Bersihkan cache data resident di localStorage saat logout/ganti akun.
function clearResidentDataCache() {
  ['onyx-resident-account', 'onyx-payment-proof', 'onyx-payment-proofs', 'onyx-resident-utilities', 'onyx-resident-tickets', 'onyx-access-logs', 'onyx-access-state', 'onyx-iot-telemetry', 'onyx-qris-parts', 'onyx-selected-invoice', 'onyx-room-devices'].forEach((key) => window.localStorage.removeItem(key));
  window.__onyxResidentLastSync = 0;
}

function clearResidentSession() {
  deleteCookie('onyx-resident-auth');
  window.localStorage.removeItem('onyx-resident-auth');
  window.sessionStorage.removeItem('onyx-resident-session');
  window.sessionStorage.removeItem('onyx-resident-preview-session');
  clearResidentDataCache();
}

function openAdminSession(message = 'Login berhasil. Selamat datang, Admin.') {
  window.localStorage.removeItem('kostku-auth');
  window.sessionStorage.setItem('kostku-admin-session', 'true');
  state.isAuthenticated = true;
  navigate('admin');
  showToast(message);
}

function getLocalRegisteredResidents() {
  const registered = JSON.parse(window.localStorage.getItem('onyx-registered-residents') || '[]');
  const account = JSON.parse(window.localStorage.getItem('onyx-resident-account') || 'null');
  return account?.id ? [account, ...registered.filter((item) => item.id !== account.id)] : registered;
}

function sanitizeResidentForStorage(resident) {
  if (!resident || typeof resident !== 'object') return resident;
  const { password, passwordHash, password_hash, token, accessToken, refreshToken, ...safeResident } = resident;
  return safeResident;
}

function saveLocalRegisteredResident(resident) {
  if (!resident?.id) return;
  const safeResident = sanitizeResidentForStorage(resident);
  const registered = getLocalRegisteredResidents().filter((item) => item.id !== resident.id);
  registered.unshift(safeResident);
  window.localStorage.setItem('onyx-registered-residents', JSON.stringify(registered.slice(0, 20)));
}
function apiUrl(path) {
  const isVite = ['localhost:5173', '127.0.0.1:5173'].includes(window.location.host);
  const origin = isVite ? 'http://localhost' : window.location.origin;
  const basePath = isVite ? '/PPL_UAS' : '';
  return `${origin}${basePath}/be/api/${path}`;
}

/**
 * @description Membuat URL file backend non-API, misalnya path upload bukti pembayaran.
 * @param {string} path Path relatif backend.
 * @returns {string} URL backend yang aman dipakai dari frontend.
 */
function backendUrl(path) {
  const isVite = ['localhost:5173', '127.0.0.1:5173'].includes(window.location.host);
  const origin = isVite ? 'http://localhost' : window.location.origin;
  const basePath = isVite ? '/PPL_UAS' : '';
  return `${origin}${basePath}/be/${path.replace(/^\.\.\//, '')}`;
}

/**
 * @description Wrapper fetch JSON agar semua request backend punya header JSON dan error handling konsisten.
 * @param {string} path Endpoint API PHP.
 * @param {RequestInit} options Opsi fetch seperti method dan body.
 * @returns {Promise<object>} Response JSON dari backend.
 */
async function apiJson(path, options = {}) {
  const csrfToken = getCookie('onyx-csrf');
  const response = await fetch(apiUrl(path), {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(csrfToken ? { 'X-CSRF-Token': csrfToken } : {}), ...(options.headers || {}) },
  });
  const data = await response.json();
  if (!response.ok || data.success === false) throw new Error(data.message || 'API error');
  return data;
}

// Upload bukti pembayaran via XHR agar dapat progress event (fetch belum support upload progress).
function uploadPaymentProof(payload, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', apiUrl('payment-proof.php'));
    xhr.withCredentials = true;
    const csrfToken = getCookie('onyx-csrf');
    if (csrfToken) xhr.setRequestHeader('X-CSRF-Token', csrfToken);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress(Math.max(1, Math.min(99, Math.round((event.loaded / event.total) * 100))));
    };
    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText || '{}');
        if (xhr.status < 200 || xhr.status >= 300 || data.success === false) throw new Error(data.message || 'API error');
        onProgress(100);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    };
    xhr.onerror = () => reject(new Error('Upload network error'));
    xhr.send(payload);
  });
}

// Pecah total pembayaran menjadi beberapa bagian sesuai limit QRIS admin.
function splitPaymentParts(total, maxAmount = qrisAdminMaxAmount) {
  const safeTotal = Math.max(0, Number(total || 0));
  if (!safeTotal) return [];
  const parts = [];
  let remaining = safeTotal;
  while (remaining > 0) {
    const part = Math.min(maxAmount, remaining);
    parts.push(part);
    remaining -= part;
  }
  return parts;
}

function getPaymentDeadline(resident = {}) {
  const createdAt = parseDateInput(resident.createdAt || resident.created_at || resident.startDate) || new Date();
  const explicitDeadline = parseDateInput(resident.paymentDeadline || resident.payment_deadline);
  if (explicitDeadline) return explicitDeadline;
  const deadline = new Date(createdAt);
  deadline.setHours(deadline.getHours() + 24);
  return deadline;
}

function getPaymentDeadlineState(resident = {}, proof = null) {
  const deadline = getPaymentDeadline(resident);
  const totalWindowMs = 1440 * 60 * 1000;
  const remainingMs = Math.max(0, deadline.getTime() - Date.now());
  const elapsedMs = Math.max(0, totalWindowMs - remainingMs);
  return {
    deadline,
    remainingMs,
    progress: proof?.status === 'approved' ? 100 : proof?.status === 'uploaded' ? 72 : Math.min(96, Math.round((elapsedMs / totalWindowMs) * 100)),
    isExpired: remainingMs <= 0 && !proof,
  };
}

function formatCountdown(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  return `${String(Math.floor(totalSeconds / 3600)).padStart(2, '0')}:${String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')}:${String(totalSeconds % 60).padStart(2, '0')}`;
}
function getAdminApplicationState(selectedResident = null) {
  const backendState = JSON.parse(window.localStorage.getItem('onyx-admin-state') || 'null');
  const backendApplications = backendState?.applications || backendState?.data?.applications || [];
  const backendProofs = backendState?.payment_proofs || backendState?.data?.payment_proofs || [];
  const utilityMeters = backendState?.utility_meters || backendState?.data?.utility_meters || [];
  const resident = selectedResident || backendApplications[backendApplications.length - 1] || JSON.parse(window.localStorage.getItem('onyx-resident-account') || 'null');
  const proof = backendProofs.find((item) => item.application_id === resident?.id) || backendProofs[backendProofs.length - 1] || JSON.parse(window.localStorage.getItem('onyx-payment-proof') || 'null');
  const proofs = backendProofs.length ? backendProofs : (proof ? [proof] : []);
  const qrisParts = JSON.parse(window.localStorage.getItem('onyx-qris-parts') || '[]');
  const rent = Number(resident?.monthlyBudget || 0);
  const deposit = Number(resident?.deposit || 0);
  const total = rent + deposit;
  const splitParts = splitPaymentParts(total);
  return { resident, proof, proofs, utilityMeters, qrisParts, rent, deposit, total, splitParts };
}

function getAdminResidentCandidates() {
  const backendState = JSON.parse(window.localStorage.getItem('onyx-admin-state') || 'null');
  const applications = backendState?.applications || backendState?.data?.applications || [];
  const account = JSON.parse(window.localStorage.getItem('onyx-resident-account') || 'null');
  const candidates = applications.filter((item) => item?.name);
  if (account?.id && !candidates.some((item) => item.id === account.id)) candidates.push(account);
  return candidates;
}

function getPrimaryAdminResident() {
  const candidates = getAdminResidentCandidates();
  const approved = candidates.find((item) => item.applicationStatus === 'Approved') || candidates[candidates.length - 1];
  if (approved) return approved;
  const fallbackRoom = getRooms()[0] || seedRooms[0];
  if (!fallbackRoom) return null;
  return {
    id: 'APP-DEMO-RESIDENT',
    name: 'Demo Resident',
    phone: '080000000000',
    email: 'resident@onyx.local',
    room: `${fallbackRoom.no} - ${fallbackRoom.name}`,
    leaseType: 'Bulanan',
    duration: 1,
    startDate: formatDateInput(new Date()),
    endDate: calculateLeaseEnd(formatDateInput(new Date()), 'Bulanan', 1),
    monthlyBudget: String(fallbackRoom.price || 0),
    deposit: String(Math.round(Number(fallbackRoom.price || 0) * 0.3)),
    applicationStatus: 'Approved',
    administrationStatus: 'Dikonfirmasi Admin',
  };
}

function getAdminServiceTickets() {
  const backendState = JSON.parse(window.localStorage.getItem('onyx-admin-state') || 'null');
  const backendTickets = backendState?.service_tickets || backendState?.data?.service_tickets || [];
  if (Array.isArray(backendTickets) && backendTickets.length) {
    return backendTickets.map((ticket) => ({
      id: ticket.id,
      application_id: ticket.application_id,
      category: ticket.category,
      priority: ticket.priority,
      issue: ticket.issue,
      status: ticket.status,
      createdAt: ticket.created_at || ticket.createdAt,
    }));
  }
  const adminTickets = JSON.parse(window.localStorage.getItem('onyx-admin-service-tickets') || '[]');
  const residentTickets = JSON.parse(window.localStorage.getItem('onyx-resident-tickets') || '[]');
  return adminTickets.length ? adminTickets : residentTickets;
}
function getAdminPaymentBuyers() {
  const backendState = JSON.parse(window.localStorage.getItem('onyx-admin-state') || 'null');
  const applications = backendState?.applications || backendState?.data?.applications || [];
  const proofs = backendState?.payment_proofs || backendState?.data?.payment_proofs || [];
  return applications.filter((item) => item?.name).map((resident) => {
    const proof = proofs.find((item) => item.application_id === resident.id) || null;
    const rent = Number(resident.monthlyBudget || 0);
    const deposit = Number(resident.deposit || 0);
    const total = rent + deposit;
    const proofStatus = proof?.status || 'none';
    const status = resident.administrationStatus === 'Dikonfirmasi Admin' || proofStatus === 'approved'
      ? 'Sudah bayar'
      : proofStatus === 'uploaded'
        ? 'Menunggu review'
        : proofStatus === 'rejected'
          ? 'Ditolak'
          : 'Belum bayar';
    return { ...resident, proof, proofStatus, paymentStatus: status, totalPayment: total };
  });
}

/**
 * @description Mengambil daftar kamar aktif dari state; state bisa berasal dari seed, localStorage, atau database.
 * @returns {Array<object>} Daftar kamar.
 */
function getRooms() {
  return state.rooms;
}

/**
 * @description Mengubah format row database kamar menjadi format frontend yang dipakai semua render function.
 * @param {object} row Row kamar dari MySQL.
 * @returns {object} Data kamar versi frontend.
 */
function mapDbRoom(row) {
  return {
    id: row.id_kamar,
    no: row.no_kamar || row.no,
    name: row.nama_kamar || row.name,
    type: row.nama_kategori || row.type || 'Standard',
    price: Number(row.harga_per_bulan || row.price || 0),
    status: row.status || 'tersedia',
    floor: row.floor || '-',
    facilities: String(row.fasilitas || '').split(',').map((item) => item.trim()).filter(Boolean),
  };
}

/**
 * @description Sinkronisasi daftar kamar dari backend; jika gagal, aplikasi tetap jalan memakai seed/localStorage.
 * @param {boolean} forceRender Jika true, render ulang setelah data tersinkron.
 * @returns {Promise<void>}
 */
// Sinkronkan daftar kamar dari backend dengan throttle 30 detik.
async function syncRooms(forceRender = false) {
  const lastSync = Number(window.__onyxRoomsLastSync || 0);
  if (!forceRender && Date.now() - lastSync < 30000) return;
  if (window.__onyxRoomsSyncing) return;
  window.__onyxRoomsSyncing = true;
  window.__onyxRoomsLastSync = Date.now();
  try {
    state.rooms = ((await apiJson('kamar.php')).data || []).map(mapDbRoom);
    window.localStorage.setItem('onyx-rooms', JSON.stringify(state.rooms));
    if (forceRender) renderApp();
  } catch {
    state.rooms = state.rooms.length ? state.rooms : seedRooms;
  } finally {
    window.__onyxRoomsSyncing = false;
  }
}
function getCurrentResident() {
  return JSON.parse(window.localStorage.getItem('onyx-resident-account') || '{}');
}

/**
 * @description Mengambil kode kamar dari label panjang seperti "A01 - Aurora" atau "A01 · Aurora".
 * @param {string} roomLabel Label kamar.
 * @returns {string} Kode kamar saja.
 */
function getRoomCode(roomLabel = '') {
  return String(roomLabel || '').split(' - ')[0].split(' · ')[0].trim();
}

/**
 * @description Mencari data kamar berdasarkan kode kamar.
 * @param {string} roomCode Kode kamar, contoh A01.
 * @returns {object|null} Data kamar atau null.
 */
function getRoomByCode(roomCode = '') {
  return getRooms().find((room) => room.no === roomCode) || null;
}

/**
 * @description Mengambil data kamar milik resident aktif.
 * @returns {object|null} Kamar resident yang sedang login.
 */
function getCurrentResidentRoom() {
  return getRoomByCode(getRoomCode(getCurrentResident().room));
}

/**
 * @description Mengecek apakah kamar punya fasilitas tertentu, misalnya AC atau kipas.
 * @param {object} room Data kamar.
 * @param {string[]} keywords Kata kunci fasilitas.
 * @returns {boolean} True jika fasilitas ditemukan.
 */
function hasRoomFacility(room, keywords = []) {
  const facilities = (room?.facilities || []).map((item) => String(item).toLowerCase());
  return facilities.some((facility) => keywords.some((keyword) => facility.includes(keyword)));
}

/**
 * @description Menentukan jenis kontrol iklim kamar agar UI tidak menampilkan AC pada kamar kipas.
 * @param {object} room Data kamar.
 * @returns {'ac'|'fan'|'ventilation'} Jenis kontrol iklim.
 */
function getRoomClimateType(room) {
  if (hasRoomFacility(room, ['ac', 'air conditioner'])) return 'ac';
  if (hasRoomFacility(room, ['kipas', 'fan'])) return 'fan';
  return 'ventilation';
}

/**
 * @description Mengambil histori meter dari backend admin atau cache resident sebagai fallback.
 * @returns {Array<object>} Daftar meter listrik/air.
 */
function getUtilityMeters() {
  const backendState = JSON.parse(window.localStorage.getItem('onyx-admin-state') || 'null');
  const adminMeters = backendState?.utility_meters || backendState?.data?.utility_meters || [];
  const residentMeters = JSON.parse(window.localStorage.getItem('onyx-resident-utilities') || '[]');
  return adminMeters.length ? adminMeters : residentMeters;
}

/**
 * @description Filter meter utility khusus resident/kamar yang sedang aktif.
 * @param {object} resident Data resident.
 * @returns {Array<object>} Histori meter terurut terbaru.
 */
function getResidentUtilityRows(resident = getCurrentResident()) {
  const roomCode = getRoomCode(resident.room);
  const rows = getUtilityMeters().filter((item) => item.application_id === resident.id || getRoomCode(item.room) === roomCode);
  return rows.sort((a, b) => String(b.month || '').localeCompare(String(a.month || '')));
}

/**
 * @description Mengambil meter terbaru untuk dipakai dalam invoice resident.
 * @param {object} resident Data resident.
 * @returns {object} Meter terbaru atau default kosong.
 */
function getLatestResidentUtility(resident = getCurrentResident()) {
  return getResidentUtilityRows(resident)[0] || { electricKwh: 0, waterM3: 0, totalAmount: 0, month: '-', status: 'Belum diset admin' };
}

/**
 * @description Mengambil telemetry IoT terakhir dari localStorage berdasarkan kode kamar.
 * @param {string} roomCode Kode kamar.
 * @returns {object|null} Data telemetry IoT.
 */
function getIotTelemetry(roomCode = '') {
  const rows = JSON.parse(window.localStorage.getItem('onyx-iot-telemetry') || '[]');
  return rows.find((item) => item.roomCode === roomCode) || null;
}

// Semua baris telemetry IoT yang tersimpan (untuk tabel admin utilitas).
function getIotTelemetryRows() {
  const rows = JSON.parse(window.localStorage.getItem('onyx-iot-telemetry') || '[]');
  return Array.isArray(rows) ? rows : [];
}
function getResidentStoredProof(resident) {
  const localProof = JSON.parse(window.localStorage.getItem('onyx-payment-proof') || 'null');
  const backendState = JSON.parse(window.localStorage.getItem('onyx-admin-state') || 'null');
  const backendProofs = backendState?.payment_proofs || backendState?.data?.payment_proofs || [];
  return backendProofs.find((item) => item.application_id === resident?.id) || localProof;
}

/**
 * @description Sinkronisasi dashboard resident: aplikasi, bukti bayar, utility meter, tiket service, akses, dan IoT.
 * @param {boolean} forceRender Jika true, render ulang setelah ada data baru.
 * @returns {Promise<void>}
 */
async function syncResidentState(forceRender = false) {
  const resident = JSON.parse(window.localStorage.getItem('onyx-resident-account') || 'null');
  if (!resident?.id || window.__onyxResidentSyncing) return;
  const lastSync = Number(window.__onyxResidentLastSync || 0);
  if (!forceRender && Date.now() - lastSync < 10000) return;
  window.__onyxResidentSyncing = true;
  try {
    const [applicationResult, proofResult, utilityResult, ticketResult, accessResult, iotResult] = await Promise.allSettled([
      apiJson(`resident-application.php?id=${encodeURIComponent(resident.id)}`),
      apiJson(`payment-proof.php?application_id=${encodeURIComponent(resident.id)}`),
      apiJson(`utility-meter.php?application_id=${encodeURIComponent(resident.id)}`),
      apiJson(`service-ticket.php?application_id=${encodeURIComponent(resident.id)}`),
      apiJson(`access.php?application_id=${encodeURIComponent(resident.id)}`),
      apiJson(`iot-ingest.php?room_code=${encodeURIComponent(getRoomCode(resident.room))}`),
    ]);
    const applicationResponse = applicationResult.status === 'fulfilled' ? applicationResult.value : { data: null };
    const proofResponse = proofResult.status === 'fulfilled' ? proofResult.value : { data: [] };
    const utilityResponse = utilityResult.status === 'fulfilled' ? utilityResult.value : { data: [] };
    const ticketResponse = ticketResult.status === 'fulfilled' ? ticketResult.value : { data: [] };
    const accessResponse = accessResult.status === 'fulfilled' ? accessResult.value : { data: { logs: [] } };
    const iotResponse = iotResult.status === 'fulfilled' ? iotResult.value : { data: null };
    const freshResident = { ...resident, ...(applicationResponse.data || {}) };
    const proofs = proofResponse.data || [];
    const freshProof = proofs[proofs.length - 1] || null;
    const beforeResident = JSON.stringify(resident);
    const beforeProof = JSON.stringify(JSON.parse(window.localStorage.getItem('onyx-payment-proof') || 'null'));
    const nextResident = JSON.stringify(freshResident);
    const nextProof = JSON.stringify(freshProof);
    window.localStorage.setItem('onyx-resident-account', nextResident);
    if (freshProof) window.localStorage.setItem('onyx-payment-proof', JSON.stringify(freshProof));
    window.localStorage.setItem('onyx-resident-utilities', JSON.stringify(utilityResponse.data || []));
    window.localStorage.setItem('onyx-resident-tickets', JSON.stringify(ticketResponse.data || []));
    if (iotResponse.data) window.localStorage.setItem('onyx-iot-telemetry', JSON.stringify([iotResponse.data]));
    window.localStorage.setItem('onyx-access-logs', JSON.stringify(accessResponse.data?.logs || []));
    if (accessResponse.data?.state) window.localStorage.setItem('onyx-access-state', JSON.stringify({ locked: Boolean(Number(accessResponse.data.state.locked)), guestPass: accessResponse.data.state.guest_pass, validUntil: accessResponse.data.state.valid_until }));
    window.__onyxResidentLastSync = Date.now();
    if (forceRender && state.page === 'resident' && (beforeResident !== nextResident || (freshProof && beforeProof !== nextProof))) renderApp();
  } catch (error) {
    // Resident tetap memakai cache lokal jika backend sedang tidak tersedia.
  } finally {
    window.__onyxResidentSyncing = false;
  }
}

const residents = [];
const shortTermTenants = [];

/**
 * @description Membuat label pilihan kamar yang berisi kode, nama, tipe, dan harga.
 * @param {object} room Data kamar.
 * @returns {string} Label option kamar.
 */
function roomOptionLabel(room) {
  return `${room.no} · ${room.name} · ${room.type} · ${rupiah(room.price)}/bulan`;
}

/**
 * @description Mengambil aplikasi resident yang sudah Approved untuk menentukan kamar terisi.
 * @returns {Array<object>} Aplikasi approved.
 */
function getApprovedApplications() {
  const backendState = JSON.parse(window.localStorage.getItem('onyx-admin-state') || 'null');
  const applications = backendState?.applications || backendState?.data?.applications || [];
  return applications.filter((item) => item.room && item.applicationStatus === 'Approved');
}

/**
 * @description Mencari penghuni aktif berdasarkan nomor kamar.
 * @param {string} roomNo Nomor/kode kamar.
 * @returns {object|null} Data penghuni kamar.
 */
function getRoomOccupant(roomNo) {
  return getApprovedApplications().find((item) => getRoomCode(item.room) === roomNo) || null;
}

/**
 * @description Status kamar final: jika sudah ada penghuni approved, status otomatis menjadi terisi.
 * @param {object} room Data kamar.
 * @returns {string} Status efektif kamar.
 */
function getEffectiveRoomStatus(room) {
  if (getRoomOccupant(room.no)) return 'terisi';
  return room.status || 'tersedia';
}

/**
 * @description Menghitung total, terisi, tersedia, dan persentase occupancy untuk sidebar/admin.
 * @returns {object} Statistik occupancy kamar.
 */
function getRoomOccupancyStats() {
  const totalRooms = getRooms().length;
  const occupiedRooms = new Set(getApprovedApplications().map((item) => getRoomCode(item.room))).size;
  const occupancyPercent = totalRooms ? Math.round((occupiedRooms / totalRooms) * 100) : 0;
  return {
    totalRooms,
    occupiedRooms,
    availableRooms: Math.max(0, totalRooms - occupiedRooms),
    occupancyPercent,
  };
}

/**
 * @description Render option kamar untuk form pendaftaran dan mematikan option yang tidak tersedia.
 * @returns {string} Markup option select kamar.
 */
function renderRoomOptions() {
  return getRooms().map((room) => {
    const status = getEffectiveRoomStatus(room);
    const disabled = status !== 'tersedia';
    return `<option value="${room.no} - ${escapeHtml(room.name)}" data-price="${room.price}" ${disabled ? 'disabled' : ''}>${escapeHtml(roomOptionLabel(room))}${disabled ? ` · ${status === 'terisi' ? 'Tidak tersedia' : status}` : ''}</option>`;
  }).join('');
}

function renderCustomRoomPicker() {
  const rooms = getRooms();
  const firstAvailable = rooms.find((room) => getEffectiveRoomStatus(room) === 'tersedia') || rooms[0];
  const value = firstAvailable ? `${firstAvailable.no} - ${firstAvailable.name}` : '';
  const label = firstAvailable ? roomOptionLabel(firstAvailable) : 'Pilih kamar';
  return `<div class="custom-select" data-custom-select="room"><input type="hidden" name="room" value="${escapeHtml(value)}" /><button class="custom-select__button" type="button" aria-expanded="false"><span>${escapeHtml(label)}</span><i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button><div class="custom-select__menu" role="listbox">${rooms.map((room) => { const status = getEffectiveRoomStatus(room); const disabled = status !== 'tersedia'; return `<button type="button" role="option" data-custom-option="room" data-value="${escapeHtml(`${room.no} - ${room.name}`)}" ${disabled ? 'disabled' : ''}><span>${escapeHtml(room.no)} · ${escapeHtml(room.name)}</span><strong>${escapeHtml(room.type)} · ${rupiah(room.price)}/bulan</strong>${disabled ? `<small>${status === 'terisi' ? 'Tidak tersedia' : escapeHtml(status)}</small>` : '<small>Tersedia untuk dipilih</small>'}</button>`; }).join('')}</div></div>`;
}

function renderCustomLeasePicker() {
  const options = ['Bulanan', 'Tahunan', 'Mingguan', 'Harian'];
  return `<div class="custom-select" data-custom-select="leaseType"><input type="hidden" name="leaseType" value="Bulanan" /><button class="custom-select__button" type="button" aria-expanded="false"><span>Bulanan</span><i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button><div class="custom-select__menu" role="listbox">${options.map((option) => `<button type="button" role="option" data-custom-option="leaseType" data-value="${option}"><span>${option}</span><strong>${option === 'Tahunan' ? 'Kontrak 12 bulan' : option === 'Bulanan' ? 'Tagihan per bulan' : option === 'Mingguan' ? 'Short stay mingguan' : 'Short stay harian'}</strong></button>`).join('')}</div></div>`;
}

/**
 * @description Menghitung tanggal selesai sewa dari tanggal mulai, tipe sewa, dan durasi.
 * @param {string} startDate Tanggal mulai.
 * @param {string} leaseType Harian, Mingguan, Bulanan, atau Tahunan.
 * @param {number|string} duration Durasi sewa.
 * @returns {string} Tanggal selesai format yyyy-mm-dd.
 */
function calculateLeaseEnd(startDate, leaseType, duration) {
  const start = parseDateInput(startDate) || new Date();
  const amount = Math.max(1, Number(duration || 1));
  if (leaseType === 'Tahunan') return formatDateInput(addMonths(start, amount * 12));
  if (leaseType === 'Bulanan') return formatDateInput(addMonths(start, amount));
  if (leaseType === 'Mingguan') return formatDateInput(addDays(start, amount * 7));
  return formatDateInput(addDays(start, amount));
}

function calculateLeaseDuration(startDate, endDate, leaseType) {
  const start = parseDateInput(startDate);
  const end = parseDateInput(endDate);
  if (!start || !end || end <= start) return 1;
  const dayDiff = Math.max(1, Math.ceil((end - start) / 86400000));
  if (leaseType === 'Tahunan') return Math.max(1, Math.ceil(dayDiff / 365));
  if (leaseType === 'Bulanan') return Math.max(1, Math.ceil(dayDiff / 30));
  if (leaseType === 'Mingguan') return Math.max(1, Math.ceil(dayDiff / 7));
  return dayDiff;
}

function createLocalApplicationId() {
  return `APP-${new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14)}-${Math.floor(100 + Math.random() * 900)}`;
}

/**
 * @description Menghitung total tagihan sewa berdasarkan harga kamar dan tipe durasi.
 * @param {string} roomValue Value option kamar.
 * @param {string} leaseType Tipe sewa.
 * @param {number|string} duration Durasi.
 * @returns {number} Total tagihan.
 */
function calculateLeaseTotal(roomValue, leaseType, duration) {
  const selectedRoom = getRooms().find((room) => roomValue?.startsWith(room.no));
  const monthlyPrice = selectedRoom?.price || 0;
  const amount = Math.max(1, Number(duration || 1));
  if (leaseType === 'Tahunan') return monthlyPrice * 12 * amount;
  if (leaseType === 'Bulanan') return monthlyPrice * amount;
  if (leaseType === 'Mingguan') return Math.round((monthlyPrice / 4) * amount);
  return Math.round((monthlyPrice / 30) * amount);
}

/**
 * @description Mengubah data aplikasi approved/pending menjadi daftar penghuni long stay untuk admin.
 * @returns {Array<object>} Data penghuni bulanan/tahunan.
 */
function getAdminResidents() {
  const backendState = JSON.parse(window.localStorage.getItem('onyx-admin-state') || 'null');
  const applications = backendState?.applications || backendState?.data?.applications || [];
  return applications.filter((item) => item.name && !['Harian', 'Mingguan'].includes(item.leaseType)).map((item) => ({
    category: 'Long Stay',
    name: item.name,
    room: item.room || '-',
    plan: item.leaseType || '-',
    refund: `${item.refundBank || '-'} ${item.refundAccount || '-'} · ${item.refundAccountName || '-'}`,
    administrationStatus: item.administrationStatus || '-',
    period: `${item.duration || '-'} ${item.leaseType || ''} · ${item.startDate || '-'} - ${item.endDate || '-'}`,
    start: item.startDate || '',
    end: item.endDate || '',
    billing: item.monthlyBudget ? rupiah(Number(item.monthlyBudget)) : '-',
    due: item.applicationStatus === 'Approved' ? formatInvoiceDate(item.endDate || item.startDate || new Date()) : 'Menunggu approval',
    status: item.applicationStatus || 'Menunggu Review',
  }));
}

/**
 * @description Mengubah data aplikasi menjadi daftar penyewa short stay untuk admin.
 * @returns {Array<object>} Data penyewa harian/mingguan.
 */
function getAdminShortTermTenants() {
  const backendState = JSON.parse(window.localStorage.getItem('onyx-admin-state') || 'null');
  const applications = backendState?.applications || backendState?.data?.applications || [];
  return applications.filter((item) => item.name && ['Harian', 'Mingguan'].includes(item.leaseType)).map((item) => ({
    category: 'Short Stay',
    name: item.name,
    room: item.room || '-',
    plan: item.leaseType || '-',
    refund: `${item.refundBank || '-'} ${item.refundAccount || '-'} · ${item.refundAccountName || '-'}`,
    administrationStatus: item.administrationStatus || '-',
    stay: `${item.duration || '-'} ${item.leaseType || ''} · ${item.startDate || '-'} - ${item.endDate || '-'}`,
    start: item.startDate || '',
    end: item.endDate || '',
    total: item.monthlyBudget ? rupiah(Number(item.monthlyBudget)) : '-',
    due: item.applicationStatus === 'Approved' ? formatInvoiceDate(item.endDate || item.startDate || new Date()) : 'Menunggu approval',
    status: item.applicationStatus || 'Menunggu Review',
  }));
}

/* ===== SECTION: Helper tanggal, invoice, smart access, dan smart room ===== */

/**
 * @description Menambah bulan pada object Date tanpa mengubah object asal.
 * @param {Date} date Tanggal awal.
 * @param {number} months Jumlah bulan.
 * @returns {Date} Tanggal baru.
 */
function addMonths(date, months) {
  return new Date(date.getFullYear(), date.getMonth() + months, date.getDate());
}

/**
 * @description Menambah hari pada object Date tanpa mengubah object asal.
 * @param {Date} date Tanggal awal.
 * @param {number} days Jumlah hari.
 * @returns {Date} Tanggal baru.
 */
function addDays(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

/**
 * @description Mengubah input tanggal string/Date menjadi object Date yang konsisten.
 * @param {string|Date} value Nilai tanggal.
 * @returns {Date|null} Object Date atau null.
 */
function parseDateInput(value) {
  if (!value) return null;
  if (value instanceof Date) return value;
  const isoDate = String(value).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoDate) return new Date(Number(isoDate[1]), Number(isoDate[2]) - 1, Number(isoDate[3]));
  return new Date(value);
}

/**
 * @description Format tanggal menjadi yyyy-mm-dd untuk input HTML type=date.
 * @param {string|Date} date Tanggal input.
 * @returns {string} Tanggal format input.
 */
function formatDateInput(date) {
  const safeDate = parseDateInput(date) || new Date();
  const year = safeDate.getFullYear();
  const month = String(safeDate.getMonth() + 1).padStart(2, '0');
  const day = String(safeDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * @description Format tanggal invoice agar tampil singkat di tabel billing.
 * @param {string|Date} date Tanggal input.
 * @returns {string} Tanggal format invoice.
 */
function formatInvoiceDate(date) {
  return monthFormatter.format(parseDateInput(date) || new Date()).replace(',', '');
}

/**
 * @description Menentukan due date resident dari tanggal mulai dan durasi sewa.
 * @param {object} resident Data resident.
 * @param {Date} fallback Tanggal fallback jika data kosong.
 * @returns {Date} Tanggal jatuh tempo.
 */
function getResidentLeaseDueDate(resident = getCurrentResident(), fallback = new Date()) {
  const startDate = parseDateInput(resident.startDate);
  if (startDate) return parseDateInput(calculateLeaseEnd(formatDateInput(startDate), resident.leaseType, resident.duration)) || startDate;
  return parseDateInput(resident.endDate) || parseDateInput(fallback) || new Date();
}

/**
 * @description Mengubah Date menjadi label bulan pendek untuk invoice utility.
 * @param {Date} date Tanggal input.
 * @returns {string} Label bulan.
 */
function monthLabel(date) {
  return new Intl.DateTimeFormat('en-GB', { month: 'short' }).format(date).toUpperCase();
}

/**
 * @description Membuat siklus billing resident: periode sekarang, sebelumnya, deposit, dan sisa hari.
 * @param {Date} today Tanggal acuan.
 * @returns {object} Informasi siklus billing.
 */
function getBillingCycle(today = new Date()) {
  const currentInvoiceDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const currentDue = currentInvoiceDate;
  const previousInvoiceDate = addMonths(currentInvoiceDate, -1);
  const previousMonthStart = new Date(previousInvoiceDate.getFullYear(), previousInvoiceDate.getMonth(), 1);
  const previousDue = previousInvoiceDate;
  const depositDate = addMonths(currentInvoiceDate, -2);
  return {
    today,
    currentInvoiceDate,
    currentMonthStart,
    currentDue,
    previousInvoiceDate,
    previousMonthStart,
    previousDue,
    depositDate,
    daysLeft: Math.max(0, Math.ceil((currentDue - today) / 86400000)),
  };
}

/**
 * @description Membuat daftar invoice resident dari sewa, deposit, dan utility meter.
 * @param {object} resident Data resident.
 * @returns {Array<object>} Baris invoice untuk ditampilkan/print.
 */
function getResidentInvoices(resident = getCurrentResident()) {
  const cycle = getBillingCycle();
  const rentAmount = Number(resident.monthlyBudget || 0);
  const deposit = Number(resident.deposit || 0);
  const utility = getLatestResidentUtility(resident);
  const utilityAmount = Number(utility.totalAmount || 0);
  const roomCode = getRoomCode(resident.room) || 'ROOM';
  const leaseLabel = resident.leaseType || 'Sewa';
  const startDate = parseDateInput(resident.startDate) || cycle.currentInvoiceDate;
  const endDate = getResidentLeaseDueDate(resident, startDate);
  const invoiceDate = startDate;
  const dueDate = endDate;
  const rows = [];
  if (rentAmount > 0) {
    rows.push({
      code: `RENT-${roomCode}-${String(cycle.currentMonthStart.getMonth() + 1).padStart(2, '0')}`,
      item: `${leaseLabel} ${resident.duration || 1} periode`,
      date: formatInvoiceDate(invoiceDate),
      due: formatInvoiceDate(dueDate),
      amount: rupiah(rentAmount),
      status: 'Pending',
    });
  }
  if (utilityAmount > 0) {
    rows.push({
      code: `UTIL-${roomCode}-${utility.month || cycle.currentMonthStart.toISOString().slice(0, 7)}`,
      item: `Listrik & Air ${utility.month || monthLabel(cycle.currentMonthStart)}`,
      date: formatInvoiceDate(invoiceDate),
      due: formatInvoiceDate(dueDate),
      amount: rupiah(utilityAmount),
      status: utility.status || 'Pending',
    });
  }
  if (deposit > 0) {
    rows.push({
      code: `DEP-${roomCode}`,
      item: 'Deposit pendaftaran',
      date: formatInvoiceDate(startDate),
      due: '-',
      amount: rupiah(deposit),
      status: resident.administrationStatus === 'Dikonfirmasi Admin' ? 'Recorded' : 'Pending',
    });
  }
  return rows.length ? rows : [{ code: `APP-${roomCode}`, item: 'Menunggu data tagihan admin', date: formatInvoiceDate(cycle.currentInvoiceDate), due: '-', amount: rupiah(0), status: 'Review' }];
}

/**
 * @description Format jam untuk log smart access.
 * @param {Date} date Tanggal input.
 * @returns {string} Jam lokal Indonesia.
 */
function formatAccessTime(date = new Date()) {
  return new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit' }).format(date);
}

/**
 * @description Mengambil log akses pintu/smart room maksimal 8 data terbaru.
 * @param {object} accessState State akses pintu.
 * @returns {Array<object>} Daftar log akses.
 */
function getAccessLogs(accessState = JSON.parse(window.localStorage.getItem('onyx-access-state') || '{"locked":true,"guestPass":"QR-ONYX-5274","validUntil":"22:00"}')) {
  const savedLogs = JSON.parse(window.localStorage.getItem('onyx-access-logs') || '[]');
  return savedLogs.slice(0, 8).map((log) => ({
    time: log.time || (log.created_at ? formatAccessTime(new Date(log.created_at)) : '-'),
    action: log.action || '-',
    detail: log.detail || '-',
    status: log.status || '-',
  }));
}

/**
 * @description Mengambil status perangkat smart room per kamar dari localStorage.
 * @param {string} roomCode Kode kamar.
 * @returns {object} Status lampu, AC, kipas, air, dan suhu.
 */
function getRoomDeviceState(roomCode = getRoomCode(getCurrentResident().room) || 'default') {
  const states = JSON.parse(window.localStorage.getItem('onyx-room-devices') || '{}');
  if (states.lightOn !== undefined || states.acOn !== undefined) return { lightOn: Boolean(states.lightOn), acOn: Boolean(states.acOn), fanOn: states.fanOn !== false, waterOn: states.waterOn !== false, temperature: Number(states.temperature || 24) };
  return { lightOn: true, acOn: true, fanOn: true, waterOn: true, temperature: 24, ...(states[roomCode] || {}) };
}

/**
 * @description Menyimpan status perangkat smart room per kamar agar tidak bercampur antar kamar.
 * @param {object} deviceState Status perangkat.
 * @param {string} roomCode Kode kamar.
 * @returns {void}
 */
function saveRoomDeviceState(deviceState, roomCode = getRoomCode(getCurrentResident().room) || 'default') {
  const states = JSON.parse(window.localStorage.getItem('onyx-room-devices') || '{}');
  states[roomCode] = {
    lightOn: Boolean(deviceState.lightOn),
    acOn: Boolean(deviceState.acOn),
    fanOn: deviceState.fanOn !== false,
    waterOn: deviceState.waterOn !== false,
    temperature: Math.min(30, Math.max(18, Number(deviceState.temperature || 24))),
    updatedAt: new Date().toISOString(),
  };
  window.localStorage.setItem('onyx-room-devices', JSON.stringify(states));
}

/**
 * @description Mengirim perubahan smart access ke backend; jika gagal, frontend tetap memakai cache lokal.
 * @param {object} accessState State pintu.
 * @param {string} action Nama aksi.
 * @param {string} detail Detail aksi.
 * @param {string} status Status log.
 * @returns {Promise<void>}
 */
async function saveAccessStateToBackend(accessState, action, detail, status) {
  const resident = getCurrentResident();
  if (!resident.id) return;
  try {
    await apiJson('access.php', { method: 'POST', body: JSON.stringify({ application_id: resident.id, locked: accessState.locked, guestPass: accessState.guestPass, validUntil: accessState.validUntil, action, detail, status }) });
  } catch (error) {}
}

/**
 * @description Menyimpan log akses lokal agar aktivitas smart room bisa terlihat di portal resident.
 * @param {string} action Nama aktivitas.
 * @param {string} detail Detail aktivitas.
 * @param {string} status Status aktivitas.
 * @returns {void}
 */
function saveAccessLog(action, detail, status) {
  const logs = JSON.parse(window.localStorage.getItem('onyx-access-logs') || '[]');
  logs.unshift({ time: formatAccessTime(), action, detail, status });
  window.localStorage.setItem('onyx-access-logs', JSON.stringify(logs.slice(0, 12)));
}

/**
 * @description Membuat QR visual sederhana dari string guest pass tanpa library eksternal.
 * @param {string} value Nilai guest pass.
 * @returns {string} Markup kotak QR palsu untuk demo.
 */
function renderVisitorQr(value) {
  const seed = [...value].reduce((total, char) => total + char.charCodeAt(0), 0);
  return Array.from({ length: 81 }, (_, index) => {
    const row = Math.floor(index / 9);
    const col = index % 9;
    const isCorner = (row < 3 && col < 3) || (row < 3 && col > 5) || (row > 5 && col < 3);
    const isFilled = isCorner || ((row * 7 + col * 11 + seed) % 4 !== 0);
    return `<i class="${isFilled ? 'is-filled' : ''}"></i>`;
  }).join('');
}

/**
 * @description Menentukan halaman awal dari hash URL.
 * @returns {'public'|'info'|'booking'|'login'|'register'|'resident'|'admin'} Nama halaman awal.
 */
function parseRoute() {
  const segments = currentAppPath().replace(/^\/+|\/+$/g, '').split('/');
  const [head, second] = segments;
  if (head === 'admin') return { page: 'admin', adminSection: adminSectionIds.includes(second) ? second : 'dashboard', adminSub: segments.slice(2).join('/') };
  if (head === 'booking' || head === 'book') return { page: 'booking', adminSection: 'dashboard' };
  if (['info', 'login', 'register', 'resident'].includes(head)) return { page: head, adminSection: 'dashboard' };
  if (head === 'resident-portal') return { page: 'resident', adminSection: 'dashboard' };
  const [hashPage, hashSection] = window.location.hash.replace(/^#/, '').split('/');
  if (hashPage === 'admin') return { page: 'admin', adminSection: adminSectionIds.includes(hashSection) ? hashSection : 'dashboard' };
  if (adminSectionIds.includes(hashPage)) return { page: 'admin', adminSection: hashPage };
  if (['info', 'booking', 'login', 'register', 'resident'].includes(hashPage)) return { page: hashPage, adminSection: 'dashboard' };
  return { page: 'public', adminSection: 'dashboard' };
}

function getInitialPage() {
  return parseRoute().page;
}

function getInitialAdminSection() {
  return parseRoute().adminSection;
}

function applyAdminSection(section, sub = '') {
  state.activeAdminSection = adminSectionIds.includes(section) ? section : 'dashboard';
  state.adminDetailType = '';
  state.adminDetailIndex = null;
  state.adminRoomDetail = null;
  if (state.activeAdminSection === 'kamar') {
    state.isRoomCreateOpen = false;
    state.activeRoomDetailSection = 'overview';
    if (sub === 'baru') state.isRoomCreateOpen = true;
    else if (sub) state.adminRoomDetail = decodeURIComponent(sub.split('/')[0]);
  }
  if (state.activeAdminSection !== 'pembayaran') state.adminPaymentDetailId = null;
}
function renderApp() {
  const app = document.querySelector('#app');
  if (state.page === 'admin') state.isAuthenticated = window.sessionStorage.getItem('kostku-admin-session') === 'true';
  if (state.page === 'resident' && !isResidentAuthenticated()) state.page = 'login';
  app.className = `app app--${state.page}`;
  syncRooms(false);
  if (state.page === 'login') app.innerHTML = renderLoginPage();
  else if (state.page === 'register') app.innerHTML = renderRegisterPage();
  else if (state.page === 'info') app.innerHTML = renderInfoPage();
  else if (state.page === 'booking') app.innerHTML = renderBookingPage();
  else if (state.page === 'admin') app.innerHTML = state.isAuthenticated ? renderAdminApp() : renderLoginPage('Silakan login untuk membuka dashboard admin.');
  else if (state.page === 'resident') {
    syncResidentState(true);
    app.innerHTML = renderResidentPortal();
  } else {
    app.innerHTML = renderPublicPage();
  }
  bindEvents();
  if (state.page === 'public') startPublicPreload();
  initScrollSequences();
  startPaymentCountdownTicker();
}

function renderPublicPreloader() {
  return `<div class="public-preloader" role="status" aria-live="polite" aria-label="Memuat aset Onyx Residence">
    <div class="public-preloader__bar" aria-hidden="true"><i data-public-preload-bar></i></div>
    <span class="sr-only" data-public-preload-label>Memulai preload…</span>
  </div>`;
}

function updatePublicPreloadProgress(done, total, label = '') {
  const percent = total ? Math.round((done / total) * 100) : 100;
  const bar = document.querySelector('[data-public-preload-bar]');
  const labelNode = document.querySelector('[data-public-preload-label]');
  if (bar) bar.style.width = `${Math.max(8, Math.min(100, percent))}%`;
  if (labelNode) labelNode.textContent = label || `Memuat aset ${done}/${total}`;
}

function waitForPublicImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => resolve(true);
    image.onerror = () => resolve(false);
    image.src = url;
  });
}

async function preloadPublicSequenceAssets(onProgress) {
  const frames = [
    { folder: 'sequenze_1', total: 193 },
    { folder: 'sequenze_2', total: 92 },
    { folder: 'sequenze_3', total: 141 },
  ].flatMap((sequence) => Array.from({ length: sequence.total }, (_, index) => framePath(sequence.folder, index + 1)));
  let done = 0;
  let cursor = 0;
  const workers = Math.max(4, Math.min(8, navigator.hardwareConcurrency || 6));
  await Promise.all(Array.from({ length: workers }, async () => {
    while (cursor < frames.length) {
      const url = frames[cursor];
      cursor += 1;
      await waitForPublicImage(url);
      done += 1;
      onProgress(done, frames.length);
    }
  }));
}

function finishPublicPreload() {
  window.__onyxPublicPreloadDone = true;
  updatePublicPreloadProgress(1, 1, 'Selesai. Membuka halaman…');
  const preloader = document.querySelector('.public-preloader');
  if (preloader) {
    preloader.classList.add('is-done');
    window.setTimeout(() => preloader.remove(), 420);
  }
}

function startPublicPreload() {
  if (window.__onyxPublicPreloadDone || window.__onyxPublicPreloadRunning) return;
  const app = document.querySelector('#app');
  if (!app || app.querySelector('.public-preloader')) return;
  window.__onyxPublicPreloadRunning = true;
  app.insertAdjacentHTML('beforeend', renderPublicPreloader());
  const timeout = new Promise((resolve) => window.setTimeout(resolve, 16000));
  const ready = Promise.all([
    document.fonts?.ready || Promise.resolve(),
    new Promise((resolve) => (document.readyState === 'complete' ? resolve() : window.addEventListener('load', resolve, { once: true }))),
    preloadPublicSequenceAssets((done, total) => updatePublicPreloadProgress(done, total, `Memuat sequence ${done}/${total}`)),
  ]);
  Promise.race([ready, timeout]).finally(() => {
    window.__onyxPublicPreloadRunning = false;
    finishPublicPreload();
  });
}
function startPaymentCountdownTicker() {
  if (window.onyxPaymentCountdownTimer) window.clearInterval(window.onyxPaymentCountdownTimer);
  const countdown = document.querySelector('[data-payment-countdown]');
  if (!countdown) return;
  window.onyxPaymentCountdownTimer = window.setInterval(() => {
    const card = document.querySelector('[data-payment-countdown]');
    if (!card) {
      window.clearInterval(window.onyxPaymentCountdownTimer);
      return;
    }
    const hasProof = card.dataset.paymentHasProof === 'true';
    if (hasProof) return;
    const deadlineMs = Number(card.dataset.paymentCountdown || 0);
    const startMs = Number(card.dataset.paymentStart || deadlineMs - (24 * 60 * 60 * 1000));
    const totalMs = Math.max(1, deadlineMs - startMs);
    const remainingMs = Math.max(0, deadlineMs - Date.now());
    const progress = Math.min(96, Math.round(((totalMs - remainingMs) / totalMs) * 100));
    const label = card.querySelector('[data-countdown-label]');
    const progressLabel = card.querySelector('[data-countdown-progress-label]');
    const progressBar = card.querySelector('[data-countdown-progress]');
    if (label) label.textContent = remainingMs > 0 ? `Sisa waktu upload ${formatCountdown(remainingMs)}` : 'Deadline upload habis. Reset pendaftaran bila ingin daftar ulang.';
    if (progressLabel) progressLabel.textContent = `${progress}%`;
    if (progressBar) progressBar.style.width = `${progress}%`;
  }, 1000);
}

/**
 * @description Navigasi internal tanpa reload halaman penuh.
 * @param {'public'|'info'|'booking'|'login'|'register'|'resident'|'admin'} page Halaman tujuan.
 * @returns {void}
 */
function navigate(page) {
  if (page === 'login') {
    const account = JSON.parse(window.localStorage.getItem('onyx-resident-account') || 'null');
    const hasSession = isResidentAuthenticated();
    if (account?.name && hasSession) page = 'resident';
  }
  if (page === 'resident' && !isResidentAuthenticated()) page = 'login';
  state.page = page;
  const target = routePath(page === 'public' ? '/' : page === 'admin' ? `/admin/${state.activeAdminSection || 'dashboard'}` : `/${page}`);
  if (window.location.pathname !== target || window.location.hash) window.history.pushState({}, '', target);
  renderApp();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateAdminSection(section) {
  applyAdminSection(section);
  document.querySelector('#sidebar')?.classList.remove('is-open');
  const target = routePath(`/admin/${state.activeAdminSection}`);
  if (window.location.pathname !== target || window.location.hash) window.history.pushState({}, '', target);
  refreshAdminStateForSection(state.activeAdminSection);
}

function pushKamarRoute(sub = '') {
  const target = routePath(`/admin/kamar${sub ? `/${sub}` : ''}`);
  if ((window.location.pathname || '') !== target || window.location.hash) window.history.pushState({}, '', target);
  renderApp();
}
function renderPublicNav(activePage = state.page) {
  const itemClass = (page) => `onyx-nav__button${activePage === page ? ' is-active' : ''}`;
  return `
    <header class="onyx-nav">
      <a class="onyx-brand" href="#" data-route="public" aria-label="Onyx Residence homepage">
        <span>Onyx</span><small>Residence</small>
      </a>
      <nav aria-label="Navigasi publik">
        <button class="${itemClass('public')}" type="button" data-route="public">Home</button>
        <button class="${itemClass('info')}" type="button" data-route="info">Info</button>
        <button class="${itemClass('booking')}" type="button" data-route="booking">Book</button>
        <button class="${itemClass('login')}" type="button" data-route="login">Login</button>
      </nav>
    </header>
  `;
}

/**
 * @description Render halaman publik untuk promosi kost dan pemesanan awal.
 * @returns {string} Markup public landing page.
 */
function renderPublicPage() {
  return `
    <div class="onyx-shell onyx-shell--home">
      ${renderPublicNav('public')}

      <main>
        <section class="tour-section tour-hero" id="home">
          <div class="tour-pin">
            <div class="sequence-stage" data-sequence-stage="facade"><canvas class="sequence-canvas" data-sequence="facade" aria-label="Onyx Residence exterior sequence"></canvas></div>
            <div class="tour-overlay"></div>
            <div class="tour-content tour-center reveal-on-load">
              <p class="onyx-kicker">Kost Premium · Siap Huni</p>
              <h1>Onyx Residence</h1>
              <p>Kamar privat full furnish, WiFi kencang, dan booking online tanpa ribet. Tinggal bawa koper, sisanya sudah kami siapkan.</p>
              <div class="minimal-actions minimal-actions--center">
                <button class="onyx-cta" type="button" data-route="booking">Booking Sekarang</button>
                <button class="onyx-secondary" type="button" data-route="info">Lihat Kamar &amp; Harga</button>
              </div>
            </div>
            <a class="scroll-cue" href="#interior"><span>Lihat Dalam Kost</span><i></i></a>
          </div>
        </section>

        <section class="tour-section tour-interior" id="interior">
          <div class="tour-pin">
            <div class="sequence-stage sequence-stage--slow" data-sequence-stage="interior"><canvas class="sequence-canvas" data-sequence="interior" aria-label="Onyx Residence interior sequence"></canvas></div>
            <div class="tour-overlay tour-overlay--heavy"></div>
            <div class="tour-content tour-grid">
              <div class="tour-copy-block"><p class="onyx-kicker">Isi Kamar</p><h2>Kamar yang bikin betah, bukan sekadar tempat numpang tidur.</h2></div>
              <div class="feature-stack"><article><span>01</span><h3>Full Furnish</h3><p>Kasur, lemari, dan meja kerja siap pakai dari hari pertama. Tinggal masuk.</p></article><article><span>02</span><h3>Nyaman &amp; Hemat</h3><p>AC, lampu hangat, WiFi stabil, dan area bersama yang dirawat rutin.</p></article><article><span>03</span><h3>Privasi Penuh</h3><p>Kamar pribadi dengan kunci sendiri, cocok untuk kerja maupun istirahat.</p></article></div>
            </div>
          </div>
        </section>

        <section class="tour-section tour-zen" id="atmosphere">
          <div class="tour-pin">
            <div class="sequence-stage" data-sequence-stage="booking"><canvas class="sequence-canvas" data-sequence="booking" aria-label="Onyx Residence courtyard sequence"></canvas></div>
            <div class="tour-overlay tour-overlay--zen"></div>
            <div class="tour-content tour-center"><p class="onyx-kicker">Lingkungan</p><h2>Bukan cuma kamar, tapi tempat tinggal yang nyaman.</h2><p>Ada area santai buat ngopi, nerima tamu, atau rehat sebentar sebelum kembali sibuk. Aman, bersih, dan tenang.</p><div class="minimal-actions minimal-actions--center"><button class="onyx-secondary" type="button" data-route="booking">Booking Sekarang</button></div></div>
          </div>
        </section>
      </main>
    </div>
  `;
}

/**
 * @description Render halaman informasi terpisah agar landing tetap fokus pada visual sequence.
 * @returns {string} Markup info page.
 */
function renderInfoPage() {
  return `
    <div class="onyx-shell info-shell">
      ${renderPublicNav('info')}
      <main class="info-editorial" id="info">
        <section class="info-cover">
          <img src="./info_assets/lobby_assets.jpg" alt="Lobi premium Onyx Residence" />
          <div class="info-cover__copy"><p class="onyx-kicker">Tentang Onyx</p><h1>Cari kost? Stop di sini.</h1><p>Kamar bersih, fasilitas lengkap, lokasi strategis, dan administrasi online yang transparan. Semua yang kamu butuhin buat tinggal tenang.</p><button class="onyx-cta" type="button" data-route="booking">Cek Ketersediaan Kamar</button></div>
        </section>

        <section class="info-editorial-row info-editorial-row--room">
          <div><p class="onyx-kicker">Kenapa Onyx?</p><h2>Kost yang sat-set, nggak bikin pusing.</h2><p>Harga jelas, fasilitas lengkap, pembayaran online, dan respon cepat kalau ada keluhan. Tinggal nyaman tanpa drama kost zaman dulu.</p><div class="room-price-slider" aria-label="Pilihan harga kamar">${getRooms().map((room) => `<article><span>${escapeHtml(room.no)} · ${escapeHtml(room.name)}</span><strong>${rupiah(room.price)}</strong><small>${escapeHtml(room.type)} / bulan</small></article>`).join('')}</div></div>
          <img src="./info_assets/kamar_assets.jpg" alt="Kamar Onyx Residence" />
        </section>

        <section class="info-corridor-statement">
          <img src="./info_assets/lorong_assets.jpg" alt="Koridor premium Onyx Residence" />
          <div><span>Akses &amp; Keamanan</span><strong>Keluar-masuk aman dan terpantau.</strong><p>Area akses tertata rapi dan terpantau, jadi kamu lebih tenang tinggal di sini — kapan pun pulang.</p></div>
        </section>

        <section class="info-editorial-bottom">
          <p><span>Fasilitas</span> WiFi kencang · kamar full furnish · tagihan &amp; bukti bayar online · lapor keluhan kapan saja · jadwal survei mudah.</p>
          <p><span>Lokasi</span> Dekat warung &amp; tempat makan, kampus dan area kerja, serta akses transportasi — semua dalam jangkauan.</p>
        </section>
      </main>
    </div>
  `;
}

/**
 * @description Render halaman booking terpisah dengan form statis agar tidak memakai sequence.
 * @returns {string} Markup booking page.
 */
function renderBookingPage() {
  const rooms = getRooms();
  return `
    <div class="onyx-shell booking-shell">
      ${renderPublicNav('booking')}
      <main class="booking-editorial" id="booking">
        <section class="booking-editorial-row booking-editorial-row--register">
          <video class="booking-bg-video" src="./booking-courtyard.mp4" autoplay muted loop playsinline aria-label="Onyx Residence courtyard background"></video>
          <form class="booking-editorial__form booking-register-form" id="bookingRegisterForm">
            <div class="booking-form-title"><span>Resident Registration</span><strong>Daftar dan masuk panel otomatis</strong></div>
            <label>Nama<input name="name" autocomplete="name" placeholder="Nama lengkap" required /></label>
            <label>WhatsApp<input name="phone" placeholder="08xxxxxxxxxx" required /></label>
            <label>Email<input name="email" type="email" autocomplete="email" placeholder="nama@email.com" required /></label>
            <label>NIK KTP<input name="nik" inputmode="numeric" minlength="16" maxlength="16" placeholder="16 digit NIK" required /></label>
            <label class="booking-form-full">Alamat KTP<input name="address" placeholder="Alamat sesuai KTP" required /></label>
            <label>Pekerjaan / Kampus<input name="occupation" placeholder="Karyawan / Mahasiswa / dll" required /></label>
            <label>Kontak Darurat<input name="emergencyContact" placeholder="Nama + nomor keluarga" required /></label>
            <label>Bank Refund Deposit<input name="refundBank" placeholder="BCA / Mandiri / BRI" required /></label>
            <label>No. Rekening Refund<input name="refundAccount" inputmode="numeric" placeholder="Nomor rekening pribadi" required /></label>
            <label class="booking-form-full">Nama Rekening Refund<input name="refundAccountName" placeholder="Nama pemilik rekening untuk pengembalian deposit" required /></label>
            <label class="booking-form-full">Kamar<select name="room" required>${rooms.map((room) => { const status = getEffectiveRoomStatus(room); return `<option value="${escapeHtml(room.no)} - ${escapeHtml(room.name)}" ${status !== 'tersedia' ? 'disabled' : ''}>${escapeHtml(room.no)} · ${escapeHtml(room.name)} — ${rupiah(room.price)}/bulan${status !== 'tersedia' ? ' · Tidak tersedia' : ''}</option>`; }).join('')}</select></label>
            <label>Tipe Sewa<select name="leaseType" required><option value="Bulanan">Bulanan</option><option value="Tahunan">Tahunan</option><option value="Mingguan">Mingguan</option><option value="Harian">Harian</option></select></label>
            <label>Mulai<input name="startDate" type="date" required /></label>
            <label>Durasi<input name="duration" type="number" min="1" value="1" required /></label>
            <label>Selesai<input name="endDate" type="date" /></label>
            <label>Total Sewa<input name="monthlyBudget" type="number" min="0" readonly /></label>
            <label>Deposit 30%<input name="deposit" type="number" min="0" readonly /></label>
            <label class="booking-form-full">Password<input name="password" type="password" autocomplete="new-password" placeholder="Minimal 8 karakter" required /></label>
            <label class="booking-form-full">Catatan<textarea name="notes" placeholder="Jadwal check-in, kendaraan, kebutuhan khusus, dll"></textarea></label>
            <button class="onyx-cta booking-form-full" type="submit">Daftar & Masuk Panel</button>
          </form>
        </section>

        <section class="booking-final-note booking-final-note--overlay">
          <p><span>01</span><strong>Register</strong><small>Isi data identitas, kamar, dan masa sewa langsung di halaman Book.</small></p>
          <p><span>02</span><strong>Panel</strong><small>Setelah submit, kamu otomatis masuk ke panel penghuni tanpa login ulang.</small></p>
          <p><span>03</span><strong>Administrasi</strong><small>Deposit dan tagihan sewa muncul di panel untuk diselesaikan sambil menunggu review admin.</small></p>
        </section>
      </main>
    </div>
  `;
}

/**
 * @description Render halaman login portal untuk penghuni dan admin.
 * @param {string} note Pesan informasi opsional.
 * @returns {string} Markup login page.
 */
function renderLoginPage(note = '') {
  return `
    <main class="login-page">
      <section class="login-card">
        <a class="brand brand--public" href="#" data-route="public" aria-label="Kembali ke halaman publik">
          <span class="brand__mark"><i class="fa-solid fa-house-chimney-window" aria-hidden="true"></i></span>
          <span><strong>Onyx</strong><small>Portal</small></span>
        </a>
        <div class="login-copy">
          <p class="kicker">Login</p>
          <h1>Masuk Portal</h1>
        </div>
        ${note ? `<p class="login-note">${escapeHtml(note)}</p>` : ''}
        <form class="login-form" id="loginForm">
          <label>Email / WhatsApp<input name="username" autocomplete="username" placeholder="Email / WhatsApp" required /></label>
          <label>Password<input name="password" type="password" autocomplete="current-password" placeholder="Password" required /></label>
          <button class="button primary" type="submit">Masuk</button>
          <button class="button subtle" type="button" data-route="register">Daftar</button>
          <button class="text-btn" type="button" data-route="public">Kembali</button>
        </form>
      </section>
    </main>
  `;
}

/**
 * @description Render halaman register penghuni untuk konsep portal.
 * @returns {string} Markup register page.
 */
function renderRegisterPage() {
  return `
    <main class="login-page portal-register-page">
      <section class="login-card">
        <a class="brand brand--public" href="#" data-route="public" aria-label="Kembali ke halaman publik">
          <span class="brand__mark"><i class="fa-solid fa-house-chimney-window" aria-hidden="true"></i></span>
          <span><strong>Onyx</strong><small>Daftar</small></span>
        </a>
        <div class="login-copy">
          <p class="kicker">Register</p>
          <h1>Buat Akun</h1>
        </div>
        <form class="login-form register-form" id="registerForm">
          <label>Full Name<input name="name" autocomplete="name" placeholder="Nama lengkap" required /></label>
          <label>WhatsApp<input name="phone" placeholder="08xxxxxxxxxx" required /></label>
          <label>Email<input name="email" type="email" autocomplete="email" placeholder="nama@email.com" required /></label>
          <label>NIK KTP<input name="nik" inputmode="numeric" minlength="16" maxlength="16" placeholder="16 digit NIK" required /></label>
          <label>Alamat KTP<input name="address" placeholder="Alamat sesuai KTP" required /></label>
          <label>Pekerjaan / Kampus<input name="occupation" placeholder="Karyawan / Mahasiswa / dll" required /></label>
          <label>Preferred Room${renderCustomRoomPicker()}</label>
          <label>Tipe Sewa${renderCustomLeasePicker()}</label>
          <label>Tanggal Mulai<input name="startDate" type="date" required /></label>
          <label>Durasi<input name="duration" type="number" min="1" value="1" required /></label>
          <label>Tanggal Selesai<input name="endDate" type="date" /></label>
          <label>Total Tagihan<input name="monthlyBudget" type="number" min="0" readonly /></label>
          <label>Deposit<input name="deposit" type="number" min="0" readonly /></label>
          <label>Kontak Darurat<input name="emergencyContact" placeholder="Nama + nomor keluarga" required /></label>
          <label>Bank Refund Deposit<input name="refundBank" placeholder="BCA / Mandiri / BRI" required /></label>
          <label>No. Rekening Refund<input name="refundAccount" inputmode="numeric" placeholder="Nomor rekening pribadi" required /></label>
          <label>Nama Rekening Refund<input name="refundAccountName" placeholder="Nama pemilik rekening" required /></label>
          <label>Password<input name="password" type="password" autocomplete="new-password" placeholder="Minimal 8 karakter" required /></label>
          <label class="full">Catatan Pendaftaran<textarea name="notes" placeholder="Kebutuhan khusus, jadwal check-in, kendaraan, dll"></textarea></label>
          <button class="button primary" type="submit">Daftar Akun</button>
          <button class="button subtle" type="button" data-route="login">Sudah punya akun? Login</button>
        </form>
      </section>
    </main>
  `;
}

/**
 * @description Render portal penghuni berbasis data backend/local session.
 * @returns {string} Markup resident portal.
 */
function renderResidentPortal() {
  const resident = getCurrentResident();
  if (resident.applicationStatus && resident.applicationStatus !== 'Approved') return renderResidentPendingPortal(resident);
  const cycle = getBillingCycle();
  const latestUtility = getLatestResidentUtility(resident);
  const outstanding = getResidentInvoices(resident).filter((invoice) => !['Paid', 'Recorded'].includes(invoice.status)).reduce((sum, invoice) => sum + Number(String(invoice.amount || '').replace(/[^0-9]/g, '')), 0);
  const dueDate = getResidentLeaseDueDate(resident, cycle.currentDue);
  const residentMenu = [
    ['overview', 'fa-chart-pie', 'Overview'],
    ['billing', 'fa-receipt', 'Billing'],
    ['utilities', 'fa-bolt', 'Utilities'],
    ['access', 'fa-door-closed', 'Access'],
    ['service', 'fa-screwdriver-wrench', 'Service'],
  ];
  return `
    <main class="resident-saas">
      <aside class="resident-saas__side">
        <a class="onyx-brand" href="#" data-route="public" aria-label="Onyx Residence homepage"><span>Onyx</span><small>Resident</small></a>
        <nav>
          ${residentMenu.map(([id, icon, label]) => `<a class="${state.activeResidentSection === id ? 'is-active' : ''}" href="#resident" data-resident-section="${id}"><i class="fa-solid ${icon}" aria-hidden="true"></i>${label}</a>`).join('')}
        </nav>
        <button class="resident-logout" type="button" id="residentLogoutButton">Logout</button>
      </aside>

      <section class="resident-saas__main">
        <header class="resident-saas__topbar ${state.activeResidentSection !== 'overview' ? 'resident-saas__topbar--minimal' : ''}">
          ${state.activeResidentSection === 'overview' ? `<div><span>Resident Portal</span><h1>Welcome, ${escapeHtml(resident.name || 'Penghuni')}</h1></div>` : ''}
        </header>

        ${state.activeResidentSection === 'overview' ? `<section class="resident-kpis">
          <article><span>Outstanding Bill</span><strong>${rupiah(outstanding)}</strong><small>Due ${formatInvoiceDate(dueDate)}</small></article>
          <article><span>Lease Status</span><strong>Active</strong><small>${escapeHtml(resident.room || 'Onyx Signature')}</small></article>
          <article><span>Electricity</span><strong>${Number(latestUtility.electricKwh || 0)} kWh</strong><small>${escapeHtml(latestUtility.month || 'Belum diset admin')}</small></article>
          <article><span>Water</span><strong>${Number(latestUtility.waterM3 || 0)} m³</strong><small>${escapeHtml(latestUtility.status || 'Menunggu input admin')}</small></article>
        </section>` : ''}

        ${renderResidentSection()}
      </section>
    </main>
  `;
}

function renderResidentPendingPortal(resident) {
  const rentAmount = Number(resident.monthlyBudget || 0);
  const deposit = Number(resident.deposit || 0);
  const adminTotal = rentAmount + deposit;
  const proof = getResidentStoredProof(resident);
  const qrisParts = splitPaymentParts(adminTotal);
  const deadline = getPaymentDeadlineState(resident, proof);
  const uploadProgress = state.manualProofUploadProgress;
  const statusLabel = proof?.status === 'approved' ? 'Dikonfirmasi admin' : proof?.status === 'rejected' ? 'Ditolak, upload ulang' : proof?.status === 'uploaded' ? 'Menunggu konfirmasi admin' : deadline.isExpired ? 'Expired otomatis' : 'Belum upload';
  const statusProgress = proof?.status === 'rejected' ? 18 : deadline.progress;
  return `<main class="resident-saas resident-saas--pending resident-saas--payment"><video class="booking-bg-video" src="./booking-courtyard.mp4" autoplay muted loop playsinline aria-hidden="true"></video><section class="resident-pending-panel resident-pending-panel--wide"><a class="onyx-brand" href="#" data-route="public"><span>Onyx</span><small>Application</small></a><div class="pending-hero"><div><span>Administrasi</span><h1>${adminTotal ? rupiah(adminTotal) : 'Menunggu hitungan'}</h1><p>${escapeHtml(resident.room || '-')} · ${escapeHtml(resident.leaseType || '-')} · ${escapeHtml(proof?.status === 'approved' ? 'Pembayaran dikonfirmasi' : 'Menunggu pembayaran')}</p></div></div><section class="pending-status-card" data-payment-countdown="${deadline.deadline.getTime()}" data-payment-start="${deadline.deadline.getTime() - (24 * 60 * 60 * 1000)}" data-payment-has-proof="${proof ? 'true' : 'false'}"><div class="pending-status-card__head"><div><span>Status administrasi</span><strong>${escapeHtml(statusLabel)}</strong><small data-countdown-label>${proof?.status === 'uploaded' ? 'Bukti sudah masuk queue admin.' : proof?.status === 'approved' ? 'Akun akan aktif setelah sinkron.' : `Deadline upload ${formatInvoiceDate(deadline.deadline)} · ${formatCountdown(deadline.remainingMs)}`}</small></div><b data-countdown-progress-label>${statusProgress}%</b></div><div class="pending-progress-track"><i data-countdown-progress style="width:${statusProgress}%"></i></div><div class="pending-status-steps"><span class="is-active">Register</span><span class="${proof ? 'is-active' : ''}">Upload</span><span class="${proof?.status === 'uploaded' || proof?.status === 'approved' ? 'is-active' : ''}">Review</span><span class="${proof?.status === 'approved' ? 'is-active' : ''}">Aktif</span></div>${deadline.isExpired ? '<button class="onyx-secondary" type="button" id="resetExpiredPayment">Reset pendaftaran expired</button>' : ''}</section><section class="pending-payment-layout"><article class="pending-admin-box pending-admin-box--simple"><div class="pending-total-lines"><p><span>Sewa awal</span><strong>${rentAmount ? rupiah(rentAmount) : '-'}</strong></p><p><span>Deposit</span><strong>${deposit ? rupiah(deposit) : '-'}</strong></p><p><span>Refund deposit</span><strong>${escapeHtml(resident.refundBank || '-')} · ${escapeHtml(resident.refundAccount || '-')}</strong></p></div><div class="pending-split-list"><span>Split QRIS BAYAR GG</span>${qrisParts.map((part, index) => `<button type="button" data-qris-part="${index}" data-qris-amount="${part}">Part ${index + 1} · ${rupiah(part)}</button>`).join('')}</div><div class="pending-admin-actions"><button class="onyx-cta" type="button" data-pending-qris="true">Bayar Part Berikutnya</button><button class="onyx-secondary" type="button" data-pending-transfer="true">Transfer Manual</button></div><small>QRIS dipecah per ${rupiah(qrisAdminMaxAmount)} (limit QRIS).</small></article><form class="pending-proof-box" id="manualProofForm"><div><span>Bukti Transfer Manual</span><h3>${proof?.status === 'uploaded' ? 'Menunggu admin' : proof?.status === 'approved' ? 'Disetujui admin' : 'Upload bukti'}</h3><p>${proof?.fileName ? `File: ${escapeHtml(proof.fileName)}` : 'Khusus pembayaran transfer manual.'}</p></div><label>Bank<input name="senderBank" placeholder="BCA / Mandiri / BRI" value="${escapeHtml(proof?.senderBank || '')}" required /></label><label>Nama<input name="senderName" placeholder="Nama pengirim" value="${escapeHtml(proof?.senderName || resident.name || '')}" required /></label><label>Nominal<input name="amount" type="number" min="0" value="${proof?.amount || adminTotal || ''}" required /></label><label class="proof-full">Upload Bukti<input name="proofFile" type="file" accept="image/*,.pdf" ${proof?.fileName ? '' : 'required'} /></label>${uploadProgress !== null ? `<div class="upload-progress-card proof-full"><div><span>Mengupload bukti</span><strong>${uploadProgress}%</strong></div><div class="pending-progress-track"><i style="width:${uploadProgress}%"></i></div><small>${uploadProgress >= 100 ? 'Upload selesai, menyimpan data...' : 'Jangan tutup halaman sampai proses selesai.'}</small></div>` : ''}<button class="onyx-cta proof-full" type="submit" ${uploadProgress !== null ? 'disabled' : ''}>${uploadProgress !== null ? 'Uploading...' : 'Simpan Bukti'}</button></form></section>${state.manualTransferInvoice ? renderManualTransferModal() : ''}<button class="onyx-secondary" type="button" data-route="public">Kembali Home</button></section></main>`;
}

/**
 * @description Render konten aktif di portal penghuni.
 * @returns {string} Markup section aktif resident.
 */
function renderResidentSection() {
  if (state.activeResidentSection === 'billing') return renderResidentBilling();
  if (state.activeResidentSection === 'utilities') return renderResidentUtilities();
  if (state.activeResidentSection === 'access') return renderResidentAccess();
  if (state.activeResidentSection === 'service') return renderResidentService();
  return renderResidentOverview();
}

function renderResidentOverview() {
  return `<section class="resident-dashboard-grid">${renderResidentBilling(true)}${renderResidentAccess(true)}${renderResidentUtilities(true)}${renderResidentService(true)}</section>`;
}

function renderResidentBilling(compact = false) {
  const invoices = getResidentInvoices(getCurrentResident());
  const content = compact
    ? `<div class="resident-saas-table resident-saas-table--billing resident-saas-table--billing-compact">${invoices.map((invoice) => `<p><span>${escapeHtml(invoice.code)}</span><b>${escapeHtml(invoice.item)}</b><em>${escapeHtml(invoice.amount)}</em><i class="status-${slug(invoice.status)}">${escapeHtml(invoice.status)}</i></p>`).join('')}</div><a class="resident-panel-link" href="#billing" data-resident-section="billing">Lihat detail pembayaran</a>`
    : `<div class="billing-table-wrap"><table class="billing-table"><thead><tr><th>Kode</th><th>Tagihan</th><th>Mulai</th><th>Jatuh tempo</th><th>Nominal</th><th>Status</th><th>Aksi</th></tr></thead><tbody>${invoices.map((invoice) => renderBillingTableRow(invoice)).join('')}</tbody></table></div>${renderResidentPrintableReceipt()}${state.manualTransferInvoice ? renderManualTransferModal() : ''}`;
  return `<article class="resident-saas-panel ${compact ? 'resident-saas-panel--large' : 'resident-saas-panel--full'}"><div class="resident-panel-title"><div><span>Billing</span><h2>${compact ? 'Latest Invoices' : 'Pembayaran & Invoice'}</h2></div></div>${compact ? '' : renderPaymentCountdown()}${content}</article>`;
}

function renderBillingTableRow(invoice) {
  const status = invoice.status || '-';
  const isPending = status === 'Pending';
  const amountValue = String(invoice.amount || '').replace(/[^0-9]/g, '');
  const payActions = isPending
    ? `<button class="row-print-btn" type="button" data-pay-invoice="${escapeHtml(invoice.code)}" data-pay-item="${escapeHtml(invoice.item)}" data-pay-amount="${amountValue}">QRIS</button><button class="row-print-btn row-print-btn--gold" type="button" data-transfer-invoice="${escapeHtml(invoice.code)}" data-transfer-item="${escapeHtml(invoice.item)}" data-transfer-amount="${escapeHtml(invoice.amount)}">TF</button>`
    : '<span class="row-paid-mark">Paid</span>';
  return `<tr><td data-label="Kode"><strong>${escapeHtml(invoice.code)}</strong></td><td data-label="Tagihan">${escapeHtml(invoice.item)}</td><td data-label="Mulai">${escapeHtml(invoice.date || '-')}</td><td data-label="Jatuh tempo">${escapeHtml(invoice.due || '-')}</td><td data-label="Nominal"><em>${escapeHtml(invoice.amount)}</em></td><td data-label="Status"><i class="status-${slug(status)}">${escapeHtml(status)}</i></td><td data-label="Aksi"><div class="billing-table__actions">${payActions}<button class="row-print-btn" type="button" data-print-invoice="${escapeHtml(invoice.code)}" data-print-item="${escapeHtml(invoice.item)}" data-print-amount="${escapeHtml(invoice.amount)}" data-print-status="${escapeHtml(status)}">Print</button></div></td></tr>`;
}

function renderPaymentCountdown() {
  const cycle = getBillingCycle();
  const resident = getCurrentResident();
  const utility = getLatestResidentUtility(resident);
  const dueDate = getResidentLeaseDueDate(resident, cycle.currentDue);
  return `<section class="payment-countdown"><div><span>Jatuh Tempo</span><strong>${formatInvoiceDate(dueDate)}</strong><small>Berdasarkan ${escapeHtml(resident.duration || '1')} ${escapeHtml(resident.leaseType || 'periode')} · ${escapeHtml(resident.room || 'kamar belum dipilih')}</small></div><div><span>Utilitas</span><strong>${Number(utility.electricKwh || 0)} kWh · ${Number(utility.waterM3 || 0)} m³</strong><small>${utility.totalAmount ? rupiah(Number(utility.totalAmount)) : 'Belum ada input meter admin'}</small></div><div><span>Gateway</span><strong>QRIS BAYAR GG / TF</strong><small>QRIS sampai Rp 500.000. Nominal besar gunakan transfer manual.</small></div></section>`;
}

function renderManualTransferModal() {
  const invoice = state.manualTransferInvoice || {};
  const message = encodeURIComponent(`Halo Admin Onyx, saya ingin konfirmasi transfer untuk ${invoice.code || 'invoice'} - ${invoice.item || 'tagihan'} sebesar ${invoice.amount || '-'}.`);
  return `<div class="resident-modal" role="dialog" aria-modal="true"><div class="resident-modal__card resident-transfer-modal"><div class="resident-panel-title"><div><span>Transfer Manual</span><h2>${escapeHtml(invoice.code || 'Invoice')}</h2></div><button class="row-print-btn" type="button" id="closeTransferModal">Close</button></div><div class="transfer-instruction"><p><span>Tagihan</span><strong>${escapeHtml(invoice.item || '-')}</strong></p><p><span>Nominal</span><strong>${escapeHtml(invoice.amount || '-')}</strong></p><p><span>Bank</span><strong>${manualTransferAccount.bank}</strong></p><p><span>No. Rekening</span><strong>${manualTransferAccount.number}</strong></p><p><span>Atas Nama</span><strong>${manualTransferAccount.holder}</strong></p></div><div class="transfer-actions"><button class="onyx-cta" type="button" data-copy-value="${manualTransferAccount.number}" data-access-action="copy-transfer-account">Copy Rekening</button><a class="onyx-secondary" href="https://wa.me/${manualTransferAccount.whatsapp}?text=${message}" target="_blank" rel="noopener noreferrer">Konfirmasi WA</a></div><small class="transfer-note">Kirim bukti via WhatsApp admin setelah transfer.</small></div></div>`;
}

function renderResidentUtilities(compact = false) {
  const resident = getCurrentResident();
  const rows = getResidentUtilityRows(resident);
  const latest = rows[0] || { electricKwh: 0, waterM3: 0, totalAmount: 0, month: 'Belum diset' };
  const electricHeight = Math.min(100, Math.max(8, Number(latest.electricKwh || 0)));
  const waterHeight = Math.min(100, Math.max(8, Number(latest.waterM3 || 0) * 4));
  const amountHeight = Math.min(100, Math.max(8, Number(latest.totalAmount || 0) / 5000));
  return `<article class="resident-saas-panel ${compact ? 'resident-saas-panel--large' : 'resident-saas-panel--full'}"><div class="resident-panel-title"><div><span>Utilities</span><h2>Listrik & Air</h2></div></div><div class="utility-chart"><div class="utility-chart__bars"><span style="height:${electricHeight}%"><b>${Number(latest.electricKwh || 0)}</b><small>kWh</small></span><span style="height:${waterHeight}%"><b>${Number(latest.waterM3 || 0)}</b><small>m³</small></span><span style="height:${amountHeight}%"><b>${Math.round(Number(latest.totalAmount || 0) / 1000)}k</b><small>Rp</small></span></div><div class="utility-chart__legend"><p><i></i>Electricity · ${Number(latest.electricKwh || 0)} kWh</p><p><i></i>Water · ${Number(latest.waterM3 || 0)} m³</p><p><i></i>Tagihan · ${latest.totalAmount ? rupiah(Number(latest.totalAmount)) : 'Menunggu input admin'}</p></div></div>${compact ? '' : `<div class="utility-history"><div class="resident-panel-title"><div><span>History</span><h2>Riwayat Pemakaian</h2></div></div><div class="resident-saas-table resident-saas-table--utility">${rows.length ? rows.map((item) => `<p><span>${escapeHtml(item.month || '-')}</span><b>${Number(item.electricKwh || 0)} kWh</b><em>${Number(item.waterM3 || 0)} m³</em><i>${rupiah(Number(item.totalAmount || 0))}</i></p>`).join('') : '<p><span>Belum ada data</span><b>0 kWh</b><em>0 m³</em><i>Admin belum input meter kamar ini.</i></p>'}</div></div>`}</article>`;
}

function renderResidentAccess(compact = false) {
  const resident = JSON.parse(window.localStorage.getItem('onyx-resident-account') || '{}');
  const accessState = JSON.parse(window.localStorage.getItem('onyx-access-state') || `{"locked":true,"guestPass":"QR-ONYX-${String(resident.id || Date.now()).slice(-4)}","validUntil":"22:00"}`);
  const deviceState = getRoomDeviceState();
  const accessLogs = getAccessLogs(accessState);
  const room = getCurrentResidentRoom();
  const climateType = getRoomClimateType(room);
  const climateSummary = climateType === 'ac'
    ? `<p><i class="fa-solid fa-snowflake" aria-hidden="true"></i><span>AC</span><b>${deviceState.acOn ? `${deviceState.temperature}°C` : 'Off'}</b></p>`
    : climateType === 'fan'
      ? `<p><i class="fa-solid fa-fan" aria-hidden="true"></i><span>Kipas</span><b>${deviceState.fanOn ? 'On' : 'Off'}</b></p>`
      : `<p><i class="fa-solid fa-wind" aria-hidden="true"></i><span>Ventilasi</span><b>Jendela luar</b></p>`;
  const climateControl = climateType === 'ac'
    ? `<article><i class="fa-solid fa-snowflake" aria-hidden="true"></i><span>AC</span><strong>${deviceState.acOn ? 'Menyala' : 'Mati'}</strong><button class="row-print-btn ${deviceState.acOn ? 'row-print-btn--gold' : ''}" type="button" data-device-action="toggle-ac">${deviceState.acOn ? 'Matikan' : 'Nyalakan'}</button></article><article><i class="fa-solid fa-temperature-half" aria-hidden="true"></i><span>Suhu AC</span><strong>${deviceState.temperature}°C</strong><div class="temp-control"><button type="button" data-device-action="temp-down">-</button><input type="range" min="18" max="30" value="${deviceState.temperature}" data-device-temperature ${deviceState.acOn ? '' : 'disabled'} /><button type="button" data-device-action="temp-up">+</button></div></article>`
    : climateType === 'fan'
      ? `<article><i class="fa-solid fa-fan" aria-hidden="true"></i><span>Kipas Angin</span><strong>${deviceState.fanOn ? 'Menyala' : 'Mati'}</strong><button class="row-print-btn ${deviceState.fanOn ? 'row-print-btn--gold' : ''}" type="button" data-device-action="toggle-fan">${deviceState.fanOn ? 'Matikan' : 'Nyalakan'}</button></article><article><i class="fa-solid fa-wind" aria-hidden="true"></i><span>Sirkulasi</span><strong>Jendela luar</strong><small>Kamar ini tidak punya AC, jadi suhu AC tidak ditampilkan.</small></article>`
      : `<article><i class="fa-solid fa-wind" aria-hidden="true"></i><span>Ventilasi</span><strong>Jendela luar</strong><small>Tidak ada perangkat AC/kipas di fasilitas kamar ini.</small></article>`;

  if (compact) {
    return `<article class="resident-saas-panel"><div class="resident-panel-title"><div><span>Access</span><h2>Smart Room</h2></div></div><div class="resident-access-summary"><p><i class="fa-solid ${accessState.locked ? 'fa-lock' : 'fa-lock-open'}" aria-hidden="true"></i><span>Door</span><b>${accessState.locked ? 'Locked' : 'Unlocked'}</b></p><p><i class="fa-solid fa-lightbulb" aria-hidden="true"></i><span>Lampu</span><b>${deviceState.lightOn ? 'On' : 'Off'}</b></p>${climateSummary}</div><a class="resident-panel-link" href="#access" data-resident-section="access">Kelola akses</a></article>`;
  }

  return `<article class="resident-saas-panel resident-saas-panel--full"><div class="resident-panel-title"><div><span>Access</span><h2>Akses & Smart Room</h2></div><button class="onyx-secondary" type="button" id="shareVisitorQr">QR Tamu</button></div><section class="access-control-grid access-control-grid--simple"><div class="access-hero-card access-hero-card--simple"><div class="access-lock-visual ${accessState.locked ? '' : 'is-unlocked'}"><i class="fa-solid ${accessState.locked ? 'fa-lock' : 'fa-lock-open'}" aria-hidden="true"></i></div><div><span>${escapeHtml(resident.room || 'Private Studio')}</span><h3>${accessState.locked ? 'Terkunci' : 'Terbuka'}</h3></div><button class="onyx-cta" type="button" id="toggleSmartLock">${accessState.locked ? 'Unlock' : 'Lock'}</button></div><div class="access-info-stack access-info-stack--simple"><article><span>WiFi</span><strong>ONYX-Resident</strong><button class="row-print-btn" type="button" data-access-action="copy-wifi" data-copy-value="WiFi ONYX-Resident / Password onyx-${new Date().getFullYear()}">Copy</button></article><article><span>QR Tamu</span><strong>${accessState.guestPass}</strong><button class="row-print-btn" type="button" id="openVisitorQr">Show QR</button></article></div></section><section class="smart-room-panel"><div class="resident-panel-title resident-panel-title--flat"><div><span>Smart Control</span><h2>Kontrol sesuai fasilitas kamar</h2></div></div><div class="smart-room-grid"><article><i class="fa-solid fa-lightbulb" aria-hidden="true"></i><span>Lampu Kamar</span><strong>${deviceState.lightOn ? 'Menyala' : 'Mati'}</strong><button class="row-print-btn ${deviceState.lightOn ? 'row-print-btn--gold' : ''}" type="button" data-device-action="toggle-light">${deviceState.lightOn ? 'Matikan' : 'Nyalakan'}</button></article>${climateControl}</div></section><section class="access-log-panel"><div class="resident-panel-title resident-panel-title--flat"><div><span>Log</span><h2>Riwayat akses</h2></div></div><div class="resident-saas-table resident-saas-table--access">${accessLogs.map((log) => `<p><span>${escapeHtml(log.time)}</span><b>${escapeHtml(log.action)}</b><em>${escapeHtml(log.detail)}</em><i>${escapeHtml(log.status)}</i></p>`).join('')}</div></section>${state.isQrModalOpen ? renderVisitorQrModal(accessState) : ''}</article>`;
}

function renderVisitorQrModal(accessState) {
  return `<div class="resident-modal" role="dialog" aria-modal="true"><div class="resident-modal__card resident-qr-modal"><div class="resident-panel-title"><div><span>Visitor QR</span><h2>QR Tamu Onyx</h2></div><button class="row-print-btn" type="button" id="closeVisitorQr">Close</button></div><div class="visitor-qr-card"><div class="visitor-qr-code" aria-label="QR code for ${escapeHtml(accessState.guestPass)}">${renderVisitorQr(accessState.guestPass)}</div><strong>${escapeHtml(accessState.guestPass)}</strong><p>Berlaku sampai ${escapeHtml(accessState.validUntil)} hari ini.</p><button class="onyx-cta" type="button" data-access-action="copy-qr" data-copy-value="${escapeHtml(accessState.guestPass)}">Copy QR Code</button></div></div></div>`;
}

function renderResidentService(compact = false) {
  const tickets = JSON.parse(window.localStorage.getItem('onyx-resident-tickets') || '[]');
  return `<article class="resident-saas-panel ${compact ? '' : 'resident-saas-panel--full'}"><div class="resident-panel-title"><div><span>Service</span><h2>Requests</h2></div>${compact ? '' : '<button class="onyx-secondary" type="button" id="newResidentTicket">New Ticket</button>'}</div><div class="resident-ticket-list">${tickets.length ? tickets.map((ticket) => `<p><span>${escapeHtml(ticket.category)}</span><b>${escapeHtml(ticket.issue)}</b><em>${escapeHtml(ticket.status)}</em></p>`).join('') : '<p><span>Empty</span><b>Belum ada tiket service</b><em>ready</em></p>'}</div>${state.isTicketModalOpen && !compact ? renderTicketModal() : ''}</article>`;
}

function renderTicketModal() {
  return `<div class="resident-modal" role="dialog" aria-modal="true"><div class="resident-modal__card"><div class="resident-panel-title"><div><span>New Ticket</span><h2>Buat tiket service</h2></div><button class="row-print-btn" type="button" id="closeTicketModal">Close</button></div><form class="resident-ticket-form" id="residentTicketForm"><label>Kategori<select name="category"><option>AC</option><option>Listrik</option><option>Air</option><option>WiFi</option><option>Smart Lock</option><option>Cleaning</option></select></label><label>Prioritas<select name="priority"><option>Normal</option><option>Urgent</option></select></label><label class="ticket-full">Kendala<textarea name="issue" placeholder="Jelaskan kendala yang dialami" required></textarea></label><button class="onyx-cta ticket-full" type="submit">Submit Ticket</button></form></div></div>`;
}

function renderResidentPrintableReceipt() {
  const resident = JSON.parse(window.localStorage.getItem('onyx-resident-account') || '{}');
  const currentInvoice = getResidentInvoices()[0] || {};
  const selected = JSON.parse(window.localStorage.getItem('onyx-selected-invoice') || JSON.stringify(currentInvoice));
  return `<section class="resident-print-receipt" id="residentPrintableReceipt"><div><span>Onyx Residence</span><strong>BUKTI BILLING / PEMBAYARAN</strong></div><p><span>Nama</span><b>${escapeHtml(resident.name || 'Penghuni')}</b></p><p><span>Kamar</span><b>${escapeHtml(resident.room || 'Private Studio')}</b></p><p><span>Kode Invoice</span><b>${escapeHtml(selected.code || '-')}</b></p><p><span>Tagihan</span><b>${escapeHtml(selected.item || '-')}</b></p><p><span>Mulai</span><b>${escapeHtml(selected.date || '-')}</b></p><p><span>Jatuh Tempo</span><b>${escapeHtml(selected.due || '-')}</b></p><p><span>Nominal</span><b>${escapeHtml(selected.amount || '-')}</b></p><p><span>Status</span><b>${escapeHtml(selected.status || '-')}</b></p><small>Dicetak khusus untuk invoice ${escapeHtml(selected.code || '-')}.</small></section>`;
}

/**
 * @description Render seluruh dashboard admin setelah login.
 * @returns {string} Markup dashboard admin.
 */
function renderAdminApp() {
  syncAdminState(false);
  const occupancy = getRoomOccupancyStats();
  const activeMenu = adminMenu.find((item) => item.id === state.activeAdminSection) || adminMenu[0];
  return `
    <a class="skip-link" href="#adminMain">Lewati ke konten utama</a>
    <aside class="sidebar" id="sidebar">
      <a class="brand" href="${routePath('/admin/dashboard')}" data-route="admin" aria-label="Onyx admin dashboard">
        <span class="brand__mark"><i class="fa-solid fa-house-chimney-window" aria-hidden="true"></i></span>
        <span><strong>Onyx</strong><small>Admin Panel</small></span>
      </a>
      <nav class="menu" aria-label="Navigasi admin">
        ${adminMenu.map((item) => `
          <a href="${routePath(`/admin/${item.id}`)}" data-admin-section="${item.id}" class="${state.activeAdminSection === item.id ? 'is-active' : ''}"${state.activeAdminSection === item.id ? ' aria-current="page"' : ''}>
            <i class="fa-solid ${item.icon}" aria-hidden="true"></i><span>${item.label}</span>
          </a>
        `).join('')}
      </nav>
      <div class="side-summary"><span>Occupancy</span><strong>${occupancy.occupancyPercent}%</strong><small>${occupancy.occupiedRooms} / ${occupancy.totalRooms} kamar terisi</small><div><i style="width:${occupancy.occupancyPercent}%"></i></div></div>
      <button class="resident-logout admin-logout" type="button" id="logoutButton"><i class="fa-solid fa-right-from-bracket" aria-hidden="true"></i> Logout</button>
    </aside>

    <main class="workspace" id="adminMain" tabindex="-1">
      <h1 class="sr-only">${escapeHtml(activeMenu.label)} — Onyx Admin Panel</h1>
      ${renderAdminSection()}
    </main>
  `;
}

async function syncAdminState(forceRender = false) {
  const lastSync = Number(window.__onyxAdminLastSync || 0);
  if (!forceRender && Date.now() - lastSync < 15000) return;
  if (window.__onyxAdminSyncing) return;
  window.__onyxAdminSyncing = true;
  window.__onyxAdminLastSync = Date.now();
  try {
    const [adminResponse, iotResponse] = await Promise.allSettled([
      apiJson('admin-state.php'),
      apiJson('iot-ingest.php').catch(() => ({ data: [] }))
    ]).then(results => [
      results[0].status === 'fulfilled' ? results[0].value : {},
      results[1].status === 'fulfilled' ? results[1].value : { data: [] }
    ]);
    window.localStorage.setItem('onyx-admin-state', JSON.stringify(adminResponse.data || adminResponse));
    if (iotResponse.data) {
      window.localStorage.setItem('onyx-iot-telemetry', JSON.stringify(iotResponse.data || []));
    }
    if (forceRender && state.page === 'admin') renderApp();
  } catch (error) {
    window.__onyxAdminLastSync = Date.now();
  } finally {
    window.__onyxAdminSyncing = false;
  }
}

function renderAdminSection() {
  if (state.activeAdminSection === 'kamar') return renderRoomsPanel();
  if (state.activeAdminSection === 'penghuni') return renderResidentsAdminPanel();
  if (state.activeAdminSection === 'pembayaran') return renderPaymentsAdminPanel();
  if (state.activeAdminSection === 'utilities') return renderAdminUtilitiesPanel();
  if (state.activeAdminSection === 'layanan') return renderAdminLayananPanel();
  if (state.activeAdminSection === 'laporan') return renderCashflowPanel();
  return renderDashboard();
}

/**
 * @description Render dashboard ringkas dengan metrik dan grafik pendapatan.
 * @returns {string} Markup dashboard.
 */
function renderDashboard() {
  const { resident, proofs } = getAdminApplicationState();
  const backendState = JSON.parse(window.localStorage.getItem('onyx-admin-state') || 'null');
  const applications = backendState?.applications || backendState?.data?.applications || [];
  const utilityMeters = backendState?.utility_meters || backendState?.data?.utility_meters || [];
  const telemetryRows = getIotTelemetryRows();
  const serviceTickets = getAdminServiceTickets();
  const paymentBuyers = getAdminPaymentBuyers();
  const pendingPayment = proofs.filter((item) => item.status === 'uploaded').length;
  const applicantCount = applications.length;
  const { occupiedRooms, availableRooms, totalRooms, occupancyPercent } = getRoomOccupancyStats();
  const activeTickets = serviceTickets.filter((item) => !/done|closed|selesai/i.test(item.status || '')).length;
  const urgentTickets = serviceTickets.filter((item) => /urgent|high|tinggi/i.test(item.priority || '') && !/done|closed|selesai/i.test(item.status || '')).length;
  const unpaidBuyers = paymentBuyers.filter((item) => /belum bayar/i.test(item.paymentStatus || '')).length;
  const rejectedPayments = paymentBuyers.filter((item) => /ditolak/i.test(item.paymentStatus || '')).length;
  const roomsWithTelemetry = new Set(telemetryRows.map((item) => item.roomCode).filter(Boolean));
  const roomsWithoutTelemetry = getRooms().filter((room) => !roomsWithTelemetry.has(room.no));
  const roomsWithMeter = new Set(utilityMeters.map((item) => getRoomCode(item.room)).filter(Boolean));
  const roomsWithoutMeter = getRooms().filter((room) => !roomsWithMeter.has(room.no));
  const approvedRoomCodes = new Set(getApprovedApplications().map((item) => getRoomCode(item.room)));
  const availableRoomRows = getRooms().filter((room) => !approvedRoomCodes.has(room.no));
  const revenueAtRisk = availableRoomRows.reduce((sum, room) => sum + Number(room.price || 0), 0);
  const newestApplicants = paymentBuyers.filter((item) => !/sudah bayar/i.test(item.paymentStatus || ''));
  const newestApplicant = newestApplicants[0] || paymentBuyers[0] || resident || null;
  const activeTicketRows = serviceTickets.filter((item) => !/done|closed|selesai/i.test(item.status || ''));
  const oldestTicket = [...activeTicketRows].sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0))[0] || null;
  const topAvailableRooms = availableRoomRows.slice(0, 3).map((room) => room.no).join(', ');
  const missingBillingCount = Math.max(roomsWithoutMeter.length, unpaidBuyers + rejectedPayments);
   return `
      <section class="admin-ops-strip" id="dashboard" data-section aria-label="Ringkasan operasional">
        <dl class="admin-ops-strip__item"><dt>Review Pembayaran</dt><dd><strong>${pendingPayment}</strong><small>${rejectedPayments ? `${rejectedPayments} bukti ditolak` : 'Approve / tolak bukti baru'}</small></dd></dl>
        <dl class="admin-ops-strip__item"><dt>Pendaftar Baru</dt><dd><strong>${newestApplicants.length}</strong><small>${newestApplicant?.name ? escapeHtml(newestApplicant.name) : 'Belum ada lead baru'}</small></dd></dl>
        <dl class="admin-ops-strip__item"><dt>Tiket Belum Selesai</dt><dd><strong>${activeTickets}</strong><small>${urgentTickets} prioritas tinggi</small></dd></dl>
        <dl class="admin-ops-strip__item"><dt>Kamar Kosong</dt><dd><strong>${availableRooms}</strong><small>${topAvailableRooms || 'Semua kamar terisi'}</small></dd></dl>
        <dl class="admin-ops-strip__item"><dt>Revenue Hilang</dt><dd><strong>${rupiah(revenueAtRisk)}</strong><small>Potensi sewa / bulan</small></dd></dl>
        <dl class="admin-ops-strip__item"><dt>Tagihan Belum Lengkap</dt><dd><strong>${missingBillingCount}</strong><small>${roomsWithoutMeter.length} meter belum masuk</small></dd></dl>
      </section>

     <section class="split-grid admin-dashboard-main">
      <article class="panel chart-card dashboard-card dashboard-card--data"><div class="panel-head"><div><span>Uang & Lead</span><h3>Yang paling berpengaruh ke pemasukan</h3></div><a class="text-btn" href="${routePath('/admin/pembayaran')}" data-admin-section="pembayaran">Buka Pembayaran</a></div><div class="admin-action-list"><p><span>Bayar</span><b>${pendingPayment ? `${pendingPayment} bukti perlu review` : 'Pembayaran aman'}</b><em>${pendingPayment ? 'Review di menu Pembayaran.' : 'Tidak ada antrian.'}</em></p><p><span>Lead</span><b>${newestApplicants.length ? `${newestApplicants.length} calon penghuni perlu follow-up` : 'Tidak ada lead tertahan'}</b><em>${newestApplicant?.name ? `${escapeHtml(newestApplicant.name)} · ${escapeHtml(newestApplicant.paymentStatus || newestApplicant.applicationStatus || 'Review')}` : 'Menunggu pendaftaran baru.'}</em></p><p><span>Revenue</span><b>${rupiah(revenueAtRisk)} belum masuk</b><em>${availableRooms ? `${availableRooms} kamar kosong; prioritas ${escapeHtml(topAvailableRooms || '-')}.` : `${occupancyPercent}% occupancy; semua kamar terisi.`}</em></p></div></article>
      <article class="panel table-card dashboard-card dashboard-card--queue"><div class="panel-head"><div><span>Operasional</span><h3>Risiko layanan dan billing</h3></div><a class="text-btn" href="${routePath('/admin/layanan')}" data-admin-section="layanan">Buka Layanan</a></div><div class="admin-action-list"><p><span>Tiket</span><b>${oldestTicket ? `${escapeHtml(oldestTicket.category || 'Service')} belum selesai` : 'Tidak ada tiket aktif'}</b><em>${oldestTicket ? `${escapeHtml(oldestTicket.issue || 'Perlu tindak lanjut')} · ${escapeHtml(oldestTicket.status || 'open')}` : 'Semua layanan sudah clear.'}</em></p><p><span>Meter</span><b>${roomsWithoutMeter.length} kamar belum ada meter</b><em>${roomsWithoutMeter.slice(0, 3).map((room) => escapeHtml(room.no)).join(', ') || 'Meter utilitas sudah tercatat.'}</em></p><p><span>Monitoring</span><b>${roomsWithoutTelemetry.length} kamar belum update</b><em>${roomsWithoutTelemetry.slice(0, 3).map((room) => escapeHtml(room.no)).join(', ') || 'Semua kamar punya telemetry.'}</em></p></div></article>
    </section>
  `;
}

function renderAdminUtilitiesPanel() {
  const meters = getUtilityMeters();
  const telemetryRows = getIotTelemetryRows();
  const totalCharges = meters.reduce((sum, item) => sum + Number(item.totalAmount || 0), 0);
  const meterRows = meters.slice(0, 10).map((item) => `<div class="admin-data__row"><div><strong>${escapeHtml(item.residentName || '-')}</strong><small>${escapeHtml(item.month || '-')} · ${escapeHtml(item.room || '-')}</small></div><b>${Number(item.electricKwh || 0)} kWh</b><b>${Number(item.waterM3 || 0)} m³</b><i>${rupiah(Number(item.totalAmount || 0))}</i></div>`).join('');
  const iotRows = getRooms().map((room) => {
    const t = telemetryRows.find((item) => item.roomCode === room.no);
    return `<div class="admin-data__row"><div><strong>${escapeHtml(room.no)} · ${escapeHtml(room.name)}</strong><small>${t?.created_at ? escapeHtml(t.created_at) : 'Standby'}</small></div><b>${t ? `${Number(t.temperature || 0)}°C` : '—'}</b><b>${t ? `${Number(t.powerWatt || 0)} W` : '—'}</b><i>${t ? `${Number(t.waterM3 || 0)} m³` : '—'}</i></div>`;
  }).join('');
  return `<section class="admin-page-panel admin-stack admin-utilities-page" id="utilities" data-section>


    <div class="resident-ops-kpis utilities-kpis"><article><span>Meter</span><strong>${meters.length}</strong><small>Data tercatat</small></article><article><span>Total Tagihan</span><strong>${rupiah(totalCharges)}</strong><small>Utilitas</small></article><article><span>IoT</span><strong>${telemetryRows.length}</strong><small>Kamar terpantau</small></article><article><span>Total Kamar</span><strong>${getRooms().length}</strong><small>Inventory</small></article></div>
    <div class="admin-block utilities-card">
      <div class="admin-block__head"><h4>Meter Utilitas</h4><button class="admin-ghost-btn admin-ghost-btn--gold no-print" type="button" data-admin-open-room-feature="meter" aria-label="Catat meter utilitas">Catat Meter</button></div>
      <div class="admin-data">
        <div class="admin-data__head no-print"><span>Penghuni</span><span>Listrik</span><span>Air</span><span>Tagihan</span></div>
        ${meterRows || '<div class="admin-data__empty"><strong>Belum ada meter</strong><p>Buka Kamar → Detail → Meter &amp; Tagihan untuk mencatat.</p></div>'}
      </div>
    </div>
    <div class="admin-block utilities-card">
      <div class="admin-block__head"><h4>Telemetry IoT</h4><button class="admin-ghost-btn no-print" type="button" id="seedIotDemo" aria-label="Buat demo telemetry IoT">Seed demo</button></div>
      <div class="admin-data">
        <div class="admin-data__head no-print"><span>Kamar</span><span>Suhu</span><span>Daya</span><span>Air</span></div>
        ${iotRows}
      </div>
    </div>
  </section>`;
}

function renderAdminLayananPanel() {
  const resident = getPrimaryAdminResident();
  const roomCode = getRoomCode(resident?.room || '') || getRooms()[0]?.no || 'ROOM';
  const accessState = JSON.parse(window.localStorage.getItem('onyx-access-state') || `{"locked":true,"guestPass":"QR-ONYX-${String(resident?.id || Date.now()).slice(-4)}","validUntil":"22:00"}`);
  const tickets = getAdminServiceTickets();
  const candidates = getAdminResidentCandidates();
  const logs = getAccessLogs(accessState);
  const logRows = logs.map((log) => `<p><span>${escapeHtml(log.time)}</span><b>${escapeHtml(log.action)}</b><i>${escapeHtml(log.status)}</i></p>`).join('');
  const ticketRows = tickets.map((t) => {
    const owner = candidates.find((item) => item.id === t.application_id);
    const ownerLabel = owner?.name || t.application_id || '-';
    const status = String(t.status || 'open').toLowerCase();
    const nextStatus = status === 'open' ? 'in-progress' : status === 'in-progress' ? 'done' : 'open';
    const nextLabel = nextStatus === 'done' ? 'Selesaikan' : nextStatus === 'in-progress' ? 'Proses' : 'Buka lagi';
    const action = t.id ? `<button class="admin-ghost-btn admin-ticket-status no-print" type="button" data-ticket-id="${escapeHtml(t.id)}" data-ticket-next="${nextStatus}">${nextLabel}</button>` : '';
    return `<div class="admin-ticket-row"><div><span class="admin-ticket-row__prio prio-${slug(t.priority || 'normal')}">${escapeHtml(t.priority || 'Normal')}</span><strong>${escapeHtml(t.issue || '-')}</strong><small>${escapeHtml(ownerLabel)} · ${escapeHtml(t.category || 'Service')}</small></div><i class="status-${slug(t.status || 'open')}">${escapeHtml(t.status || 'open')}</i>${action}</div>`;
  }).join('');
  return `<section class="admin-page-panel admin-stack" id="layanan" data-section>
    <div class="admin-split admin-split--layanan">
      <div class="admin-block layanan-card">
        <div class="admin-block__head layanan-card__head"><div><span>Smart Access</span><h4>Kontrol akses kamar</h4></div><button class="admin-ghost-btn admin-ghost-btn--gold no-print" type="button" id="adminToggleSmartLock" aria-pressed="${accessState.locked}" aria-label="${accessState.locked ? 'Buka kunci kamar' : 'Kunci kamar'}">${accessState.locked ? 'Unlock' : 'Lock'}</button></div>
        <div class="layanan-card__stats"><dl><dt>Door</dt><dd>${accessState.locked ? 'Locked' : 'Open'}</dd></dl><dl><dt>QR Tamu</dt><dd>${escapeHtml(accessState.guestPass)}</dd></dl><dl><dt>Valid</dt><dd>${escapeHtml(accessState.validUntil)}</dd></dl></div>
        <div class="admin-list">${logRows || '<p><span>—</span><b>Belum ada log akses</b><i>ready</i></p>'}</div>
        <div class="admin-actions no-print"><button class="admin-ghost-btn" type="button" data-copy-value="${escapeHtml(accessState.guestPass)}" data-access-action="copy-qr">Copy QR</button><button class="admin-ghost-btn" type="button" data-copy-value="ONYX-${escapeHtml(roomCode)} / onyx-${escapeHtml(roomCode).toLowerCase()}-wifi" data-access-action="copy-wifi">Share WiFi</button></div>
      </div>
      <div class="admin-block layanan-card">
        <div class="admin-block__head layanan-card__head"><div><span>Service Desk</span><h4>Tiket layanan</h4></div><small>${tickets.length} tiket</small></div>
        <form class="admin-ticket-form no-print" id="adminServiceTicketForm"><input type="hidden" name="application_id" value="${escapeHtml(resident?.id || '')}" /><select name="category" aria-label="Kategori tiket"><option>Maintenance</option><option>WiFi</option><option>Listrik</option><option>Air</option></select><select name="priority" aria-label="Prioritas tiket"><option>Normal</option><option>High</option><option>Urgent</option></select><input name="issue" aria-label="Deskripsi masalah" autocomplete="off" placeholder="cth: AC bocor di kamar A2…" required /><button class="admin-ghost-btn admin-ghost-btn--gold" type="submit">Buat Tiket</button></form>
        <div class="admin-ticket-list">${ticketRows || '<div class="admin-ticket-row admin-ticket-row--empty"><strong>Belum ada tiket dari penghuni.</strong></div>'}</div>
      </div>
    </div>
  </section>`;
}

async function refreshAdminStateForSection(section) {
  const liveSections = ['dashboard', 'kamar', 'penghuni', 'pembayaran', 'utilities', 'layanan', 'laporan'];
  if (!liveSections.includes(section)) return renderApp();
  renderApp();
  syncAdminSectionInBackground();
}

async function syncAdminSectionInBackground() {
  if (window.__onyxAdminSectionSyncing) return;
  window.__onyxAdminSectionSyncing = true;
  try {
    await syncAdminState(false);
    try {
      const iot = await apiJson('iot-ingest.php');
      window.localStorage.setItem('onyx-iot-telemetry', JSON.stringify(iot.data || []));
    } catch (error) {
      window.localStorage.setItem('onyx-iot-telemetry-sync-error', String(error?.message || error || 'Gagal sinkron IoT'));
    }
    if (state.page === 'admin') renderApp();
  } finally {
    window.__onyxAdminSectionSyncing = false;
  }
}

/**
 * @description Render panel manajemen kamar dengan filter proper.
 * @returns {string} Markup panel kamar.
 */
function renderRoomsPanel() {
  if (state.isRoomCreateOpen && !state.adminRoomDetail) return renderRoomCreatePage();
  if (state.adminRoomDetail) {
    const room = getRooms().find((item) => item.no === state.adminRoomDetail) || getRooms()[0];
    return renderRoomDetailPanel(room);
  }
  const filteredRooms = getRooms().filter((room) => {
    const haystack = `${room.no} ${room.name}`.toLowerCase();
    return haystack.includes(state.roomQuery.toLowerCase()) && (!state.roomType || room.type === state.roomType) && (!state.roomStatus || getEffectiveRoomStatus(room) === state.roomStatus);
  });

  return `
    <section class="admin-flat-panel" id="kamar" data-section>
      <div class="inventory-head"><div class="inventory-actions no-print"><button class="button success" type="button" id="openRoomCreate"><i class="fa-solid fa-plus" aria-hidden="true"></i>Tambah kamar</button><button class="button subtle" type="button" id="printRooms"><i class="fa-solid fa-print" aria-hidden="true"></i>Cetak</button></div></div>
      <div class="inventory-toolbar no-print"><label class="inventory-search" for="adminRoomSearchProxy"><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i><input form="roomForm" id="adminRoomSearchProxy" type="search" value="${escapeHtml(state.roomQuery)}" placeholder="Cari nomor / nama kamar" /></label><select class="field" id="typeFilter" aria-label="Filter tipe kamar">${['', 'Standard', 'Deluxe', 'Suite', 'VIP'].map((type) => `<option value="${type}" ${state.roomType === type ? 'selected' : ''}>${type || 'Semua tipe'}</option>`).join('')}</select><select class="field" id="statusFilter" aria-label="Filter status kamar">${['', 'tersedia', 'terisi', 'maintenance'].map((status) => `<option value="${status}" ${state.roomStatus === status ? 'selected' : ''}>${status || 'Semua status'}</option>`).join('')}</select></div>
      <div class="room-list"><div class="room-list-head no-print"><span>Kamar</span><span>Detail</span><span>Harga</span><span>Status</span><span>Aksi</span></div>${filteredRooms.map(renderRoomRow).join('') || '<p class="empty">Tidak ada kamar yang cocok.</p>'}</div>
      ${renderRoomsPrintReport(filteredRooms)}
    </section>
  `;
}

function renderRoomsPrintReport(rooms) {
  const occupancy = getRoomOccupancyStats();
  const generatedAt = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
  const rows = rooms.map((room) => {
    const occupant = getRoomOccupant(room.no);
    const status = getEffectiveRoomStatus(room);
    const devices = getRoomDeviceState(room.no);
    const telemetry = getIotTelemetry(room.no);
    const latestMeter = getUtilityMeters().find((item) => getRoomCode(item.room) === room.no) || {};
    const climateType = getRoomClimateType(room);
    const climateLabel = climateType === 'ac' ? `AC ${devices.acOn ? `${devices.temperature}°C` : 'mati'}` : climateType === 'fan' ? `Kipas ${devices.fanOn ? 'menyala' : 'mati'}` : 'Ventilasi manual';
    const utilityLabel = latestMeter.month ? `${latestMeter.month}: ${Number(latestMeter.electricKwh || 0)} kWh, ${Number(latestMeter.waterM3 || 0)} m³, ${rupiah(Number(latestMeter.totalAmount || 0))}` : 'Belum ada input meter';

    return `<tr><td><strong>${escapeHtml(room.no)}</strong><span>${escapeHtml(room.floor || '-')}</span></td><td><b>${escapeHtml(room.name)}</b><small>${escapeHtml(room.type)} · ${escapeHtml((room.facilities || []).join(', ') || 'Fasilitas belum diisi')}</small></td><td>${rupiah(Number(room.price || 0))}<small>/ bulan</small></td><td><b>${status === 'terisi' ? 'Tidak tersedia' : escapeHtml(status)}</b><small>${escapeHtml(occupant?.name || 'Kosong')}</small></td><td><b>${escapeHtml(climateLabel)}</b><small>Lampu ${devices.lightOn ? 'menyala' : 'mati'} · Air ${devices.waterOn ? 'aktif' : 'nonaktif'}</small></td><td><b>${escapeHtml(utilityLabel)}</b><small>${telemetry?.created_at ? `IoT ${escapeHtml(telemetry.created_at)}` : 'Manual/standby'}</small></td></tr>`;
  }).join('');

  return `<section class="room-print-report" aria-label="Laporan cetak kamar"><header><div><span>Onyx Residence</span><h2>Laporan Inventory Kamar</h2><p>Ringkasan status kamar, penghuni aktif, fasilitas, smart control, dan meter utilitas.</p></div><aside><b>${escapeHtml(generatedAt)}</b><small>Dicetak oleh Admin</small></aside></header><div class="room-print-summary"><article><span>Total kamar</span><strong>${occupancy.totalRooms}</strong></article><article><span>Terisi</span><strong>${occupancy.occupiedRooms}</strong></article><article><span>Tersedia</span><strong>${occupancy.availableRooms}</strong></article><article><span>Occupancy</span><strong>${occupancy.occupancyPercent}%</strong></article></div><table><thead><tr><th>Kamar</th><th>Detail</th><th>Harga</th><th>Status</th><th>Smart Control</th><th>Utilitas</th></tr></thead><tbody>${rows || '<tr><td colspan="6">Tidak ada kamar yang cocok dengan filter.</td></tr>'}</tbody></table><footer><span>Catatan</span><p>Status terisi mengikuti penghuni approved. Meter utilitas memakai input terbaru per kamar jika tersedia.</p></footer></section>`;
}

/**
 * @description Render satu baris kamar dengan aksi CRUD.
 * @param {object} room Data kamar.
 * @returns {string} Markup row kamar.
 */
function renderRoomRow(room) {
  const status = getEffectiveRoomStatus(room);
  return `<article class="room-row"><div class="room-code"><strong>${room.no}</strong><span>${room.floor}</span></div><div class="room-main"><h4>${escapeHtml(room.name)}</h4><p>${room.type} · ${room.facilities.map(escapeHtml).join(', ')}</p></div><div class="room-price"><strong>${rupiah(room.price)}</strong><span>/ bulan</span></div><span class="badge ${status}">${status === 'terisi' ? 'tidak tersedia' : status}</span><div class="row-actions row-actions--text no-print"><button type="button" data-room-edit="${escapeHtml(room.no)}" aria-label="Edit ${room.no}"><i class="fa-regular fa-pen-to-square" aria-hidden="true"></i>Edit</button><button type="button" data-room-delete="${escapeHtml(room.no)}" aria-label="Hapus ${room.no}"><i class="fa-regular fa-trash-can" aria-hidden="true"></i>Hapus</button></div></article>`;
}

function renderRoomCreatePage() {
  return `<section class="admin-flat-panel admin-page-panel room-detail-panel room-create-page" id="kamar" data-section><div class="room-create-head"><h3>Tambah Kamar</h3><button class="button subtle" type="button" id="backToRooms"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i>Kembali</button></div>${renderRoomEditorForm()}</section>`;
}

function renderRoomEditorForm(room = null) {
  return `<form class="room-form no-print room-editor-form" id="roomForm"><input type="hidden" name="id_kamar" value="${escapeHtml(room?.id || '')}" /><label>Nomor kamar<input required name="no_kamar" value="${escapeHtml(room?.no || '')}" placeholder="A09" /></label><label>Kategori<select required name="kategori">${['Standard', 'Deluxe', 'Suite', 'VIP'].map((type) => `<option ${room?.type === type ? 'selected' : ''}>${type}</option>`).join('')}</select></label><label>Nama kamar<input required name="nama_kamar" value="${escapeHtml(room?.name || '')}" placeholder="Onyx Studio" /></label><label>Harga / bulan<input required name="harga" type="number" min="0" value="${escapeHtml(room?.price || '')}" placeholder="3100000" /></label><label>Status<select name="status">${['tersedia', 'terisi', 'maintenance'].map((status) => `<option ${(room?.status || 'tersedia') === status ? 'selected' : ''}>${status}</option>`).join('')}</select></label><label class="full">Fasilitas<textarea name="fasilitas" placeholder="AC, WiFi, kamar mandi dalam">${escapeHtml((room?.facilities || []).join(', '))}</textarea></label><div class="form-actions full"><button class="button subtle" type="button" id="closeRoomEditor">Batal</button><button class="button primary" type="submit">Simpan kamar</button></div></form>`;
}

function renderRoomUtilityForm(room, occupant = null) {
  const month = new Date().toISOString().slice(0, 7);
  return `<form class="room-utility-form no-print" id="roomUtilityMeterForm"><div><span>Input Meter</span><h4>Catat listrik, air, dan tagihan</h4><p>Data masuk ke billing penghuni dan histori meter kamar ini.</p></div><input type="hidden" name="application_id" value="${escapeHtml(occupant?.id || '')}" /><input type="hidden" name="room" value="${escapeHtml(room.no)}" /><input type="hidden" name="residentName" value="${escapeHtml(occupant?.name || '')}" /><label>Bulan<input name="month" type="month" value="${month}" required /></label><label>Listrik kWh<input name="electricKwh" type="number" min="0" step="0.1" placeholder="0" required /></label><label>Air m³<input name="waterM3" type="number" min="0" step="0.1" placeholder="0" required /></label><label>Tarif listrik/kWh<input name="electricRate" type="number" min="0" value="1500" required /></label><label>Tarif air/m³<input name="waterRate" type="number" min="0" value="8000" required /></label><label>Biaya tetap<input name="fixedFee" type="number" min="0" value="0" /></label><button class="button primary" type="submit">Simpan Meter</button></form>`;
}

function renderRoomDetailPanel(room) {
  if (!room) return `<section class="admin-flat-panel admin-page-panel"><button class="button subtle" type="button" id="backToRooms"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i>Kembali</button></section>`;
  const occupant = getRoomOccupant(room.no);
  const devices = getRoomDeviceState(room.no);
  const utilityMeters = getUtilityMeters().filter((item) => getRoomCode(item.room) === room.no);
  const latest = utilityMeters[0] || {};
  const telemetry = getIotTelemetry(room.no);
  const climateType = getRoomClimateType(room);
  const facilityList = room.facilities?.length ? room.facilities.map(escapeHtml).join(' · ') : 'Fasilitas belum diisi';
  const effectiveStatus = getEffectiveRoomStatus(room);
  const section = state.activeRoomDetailSection || 'overview';
  const detailNav = [['overview', 'Overview'], ['control', 'Smart Control'], ['meter', 'Meter & Tagihan']];
  const climateRows = climateType === 'ac'
    ? `<p><span><i class="fa-solid fa-snowflake" aria-hidden="true"></i> AC</span><strong>${devices.acOn ? `${devices.temperature}°C` : 'Mati'}</strong><button class="row-print-btn ${devices.acOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="acOn" data-room-code="${escapeHtml(room.no)}">${devices.acOn ? 'Matikan' : 'Nyalakan'}</button></p><label class="room-detail-range"><span>Suhu AC</span><input type="range" min="18" max="30" value="${devices.temperature}" data-admin-room-temp="${escapeHtml(room.no)}" ${devices.acOn ? '' : 'disabled'} /><strong>${devices.temperature}°C</strong></label>`
    : climateType === 'fan'
      ? `<p><span><i class="fa-solid fa-fan" aria-hidden="true"></i> Kipas</span><strong>${devices.fanOn ? 'Menyala' : 'Mati'}</strong><button class="row-print-btn ${devices.fanOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="fanOn" data-room-code="${escapeHtml(room.no)}">${devices.fanOn ? 'Matikan' : 'Nyalakan'}</button></p><p><span><i class="fa-solid fa-wind" aria-hidden="true"></i> Sirkulasi</span><strong>Jendela luar</strong><em>Tanpa AC</em></p>`
      : `<p><span><i class="fa-solid fa-wind" aria-hidden="true"></i> Ventilasi</span><strong>Manual</strong><em>Tidak ada AC/kipas</em></p>`;
  const overviewPage = `<article class="room-detail-card room-detail-card--wide"><div class="room-detail-card__head"><div><span>Overview</span><h4>Informasi kamar</h4></div></div><div class="room-detail-list"><p><span>Status</span><strong>${effectiveStatus === 'terisi' ? 'Tidak tersedia' : escapeHtml(effectiveStatus)}</strong></p><p><span>Tipe</span><strong>${escapeHtml(room.type)}</strong></p><p><span>Fasilitas</span><strong>${facilityList}</strong></p><p><span>Penghuni</span><strong>${escapeHtml(occupant?.name || 'Kosong')}</strong></p><p><span>WiFi</span><strong>ONYX-${escapeHtml(room.no)}</strong></p></div></article>`;
  const controlPage = `<article class="room-detail-card room-detail-card--wide"><div class="room-detail-card__head"><div><span>Smart Control</span><h4>Perangkat kamar</h4></div><small>${telemetry?.created_at ? `IoT ${escapeHtml(telemetry.created_at)}` : 'Manual mode'}</small></div><div class="room-detail-control-list"><p><span><i class="fa-solid fa-lightbulb" aria-hidden="true"></i> Lampu</span><strong>${devices.lightOn ? 'Menyala' : 'Mati'}</strong><button class="row-print-btn ${devices.lightOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="lightOn" data-room-code="${escapeHtml(room.no)}">${devices.lightOn ? 'Matikan' : 'Nyalakan'}</button></p><p><span><i class="fa-solid fa-faucet-drip" aria-hidden="true"></i> Air</span><strong>${devices.waterOn ? 'Aktif' : 'Nonaktif'}</strong><button class="row-print-btn ${devices.waterOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="waterOn" data-room-code="${escapeHtml(room.no)}">${devices.waterOn ? 'Matikan' : 'Nyalakan'}</button></p>${climateRows}</div></article>`;
  const meterPage = `<article class="room-detail-card room-detail-card--wide room-detail-card--meter"><div class="room-detail-card__head"><div><span>Meter</span><h4>Pemakaian & tagihan</h4></div></div><div class="room-meter-line"><p><span>Listrik</span><strong>${telemetry ? `${Number(telemetry.powerWatt || 0)} W` : `${Number(latest.electricKwh || 0)} kWh`}</strong><small>${telemetry ? `${Number(telemetry.energyKwh || 0)} kWh` : 'Meter admin'}</small></p><p><span>Air</span><strong>${telemetry ? `${Number(telemetry.waterM3 || 0)} m³` : `${Number(latest.waterM3 || 0)} m³`}</strong><small>${devices.waterOn ? 'Valve aktif' : 'Valve nonaktif'}</small></p><p><span>Tagihan</span><strong>${latest.totalAmount ? rupiah(Number(latest.totalAmount)) : 'Belum ada'}</strong><small>Utility meter</small></p></div>${renderRoomUtilityForm(room, occupant)}<div class="resident-saas-table resident-saas-table--utility admin-utility-table room-utility-history">${utilityMeters.length ? utilityMeters.map((item) => `<p><span>${escapeHtml(item.month || '-')}</span><b>${Number(item.electricKwh || 0)} kWh</b><em>${Number(item.waterM3 || 0)} m³</em><i>${rupiah(Number(item.totalAmount || 0))}</i></p>`).join('') : '<p><span>Belum ada meter</span><b>0 kWh</b><em>0 m³</em><i>Rp 0</i></p>'}</div></article>`;
  const pages = { overview: overviewPage, control: controlPage, meter: meterPage };

  return `<section class="admin-flat-panel admin-page-panel room-detail-panel room-detail-saas"><div class="room-detail-saas__nav"><button class="room-detail-back no-print" type="button" id="backToRooms"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i>Kembali</button><button class="button subtle no-print" type="button" id="toggleRoomEditor"><i class="fa-regular fa-pen-to-square" aria-hidden="true"></i>${state.isRoomCreateOpen ? 'Tutup edit' : 'Edit kamar'}</button></div><header class="room-detail-saas__hero"><div><span>Room Detail</span><h3>${escapeHtml(room.no)} · ${escapeHtml(room.name)}</h3><p>${escapeHtml(room.type)} · ${facilityList}</p></div><b class="room-status-pill ${escapeHtml(effectiveStatus)}">${effectiveStatus === 'terisi' ? 'Tidak tersedia' : escapeHtml(effectiveStatus)}</b></header><div class="room-detail-saas__stats"><p><span>Harga</span><strong>${rupiah(room.price)}</strong><small>/ bulan</small></p><p><span>Penghuni</span><strong>${escapeHtml(occupant?.name || 'Kosong')}</strong><small>${escapeHtml(occupant?.phone || 'Belum ada penghuni aktif')}</small></p><p><span>WiFi</span><strong>ONYX-${escapeHtml(room.no)}</strong><small>password otomatis per kamar</small></p><p><span>IoT</span><strong>${telemetry?.created_at ? 'Online' : 'Standby'}</strong><small>${telemetry?.created_at ? escapeHtml(telemetry.created_at) : 'Menunggu telemetry'}</small></p></div>${state.isRoomCreateOpen ? `<section class="room-edit-focus">${renderRoomEditorForm(room)}</section>` : `<nav class="room-detail-subnav no-print">${detailNav.map(([id, label]) => `<button class="${section === id ? 'is-active' : ''}" type="button" data-room-detail-section="${id}">${label}</button>`).join('')}</nav><section class="room-detail-saas__body room-detail-saas__body--single">${pages[section] || overviewPage}</section>`}</section>`;
}

/**
 * @description Render panel tamu dan reservasi.
 * @returns {string} Markup grid tamu dan reservasi.
 */
function renderGuestBookingGrid() {
  return `<section class="split-grid lower-grid"><article class="panel section-panel compact-panel" id="tamu" data-section><div class="panel-head"><div><span>Tamu</span><h3>Data penyewa</h3></div></div><div class="empty admin-empty-state"><strong>Belum ada data penyewa.</strong><p>Semua data diambil dari backend pendaftaran.</p></div></article><article class="panel section-panel compact-panel" id="reservasi" data-section><div class="panel-head"><div><span>Booking</span><h3>Reservasi aktif</h3></div></div>${renderBookingTable([])}</article></section>`;
}

function renderGuestsPanel() {
  return `<section class="panel section-panel admin-page-panel" id="tamu" data-section><div class="panel-head wrap"><div><span>Residents</span><h3>Data penyewa</h3></div></div><div class="empty admin-empty-state"><strong>Belum ada data penyewa.</strong><p>Gunakan menu Penghuni/Penyewa untuk data backend real.</p></div></section>`;
}

function renderResidentsAdminPanel() {
  const rows = [...getAdminResidents(), ...getAdminShortTermTenants()];
  if (state.adminDetailType === 'penghuni') return renderAdminPersonDetail('penghuni', rows[state.adminDetailIndex] || rows[0]);
  const activeRows = rows.filter((resident) => ['aktif', 'confirmed', 'check-in'].includes(String(resident.status || '').toLowerCase())).length;
  const longStayRows = rows.filter((resident) => (resident.category || 'Long Stay') === 'Long Stay').length;
  const shortStayRows = rows.length - longStayRows;
  const totalBilling = rows.reduce((sum, resident) => sum + Number(String(resident.billing || resident.total || '').replace(/[^0-9]/g, '') || 0), 0);
  const rowMarkup = rows.map((resident, index) => {
    const category = resident.category || 'Resident';
    const period = resident.period || resident.stay || '-';
    const amount = resident.billing || resident.total || '-';
    const initials = String(resident.name || 'R').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
    return `<button class="admin-person-row admin-person-row--hotel" type="button" data-admin-detail="penghuni" data-admin-detail-index="${index}"><span class="resident-avatar">${escapeHtml(initials)}</span><div class="resident-guest"><span>${escapeHtml(resident.room || '-')}</span><strong>${escapeHtml(resident.name || '-')}</strong><small>${escapeHtml(resident.plan || '-')} · ${escapeHtml(period)}</small></div><div class="resident-stay"><span>Tipe sewa</span><strong>${escapeHtml(category)}</strong><small>${escapeHtml(resident.due || resident.end || 'Jadwal belum diisi')}</small></div><div class="resident-billing"><span>Tagihan</span><strong>${escapeHtml(amount)}</strong><small>${escapeHtml(resident.refund || resident.administrationStatus || 'Administrasi standar')}</small></div><i class="tenant-type-label ${slug(category)}">${escapeHtml(category)}</i><em class="resident-status-chip ${slug(resident.status || '')}">${escapeHtml(resident.status || '-')}</em></button>`;
  }).join('');

  return `<section class="admin-page-panel admin-resident-ops" id="penghuni" data-section><div class="resident-ops-kpis"><article><span>Total</span><strong>${rows.length}</strong><small>Penghuni dan penyewa</small></article><article><span>Aktif</span><strong>${activeRows}</strong><small>Status berjalan</small></article><article><span>Long stay</span><strong>${longStayRows}</strong><small>Bulanan atau tahunan</small></article><article><span>Short stay</span><strong>${shortStayRows}</strong><small>Harian atau mingguan</small></article><article><span>Billing</span><strong>${totalBilling ? rupiah(totalBilling) : 'Rp 0'}</strong><small>Estimasi tagihan</small></article></div><div class="resident-ops-table"><div class="resident-ops-table__head no-print"><span>Penghuni</span><span>Sewa</span><span>Tagihan</span><span>Tipe</span><span>Status</span></div>${rowMarkup || '<div class="empty admin-empty-state"><strong>Belum ada penghuni atau penyewa real.</strong><p>Data muncul setelah user daftar dan disetujui admin.</p></div>'}</div></section>`;
}

function renderPaymentsAdminPanel() {
  const buyers = getAdminPaymentBuyers();
  const selectedBuyer = buyers.find((item) => String(item.id || '') === String(state.adminPaymentDetailId || '')) || null;
  if (!selectedBuyer) {
    const paidBuyers = buyers.filter((buyer) => /bayar|approved|recorded/i.test(buyer.paymentStatus || '')).length;
    const reviewBuyers = buyers.filter((buyer) => /review|uploaded|menunggu/i.test(buyer.paymentStatus || '')).length;
    const totalAmount = buyers.reduce((sum, buyer) => sum + Number(buyer.totalPayment || 0), 0);
    return `<section class="payment-review-page payment-ops-page admin-page-panel" id="pembayaran" data-section><div class="payment-ops-kpis"><article><span>Total Buyer</span><strong>${buyers.length}</strong><small>Calon penghuni</small></article><article><span>Paid / Approved</span><strong>${paidBuyers}</strong><small>Pembayaran selesai</small></article><article><span>Need Review</span><strong>${reviewBuyers}</strong><small>Bukti menunggu admin</small></article><article><span>Total Pipeline</span><strong>${rupiah(totalAmount)}</strong><small>Estimasi administrasi</small></article></div><div class="payment-buyer-table payment-buyer-table--ops"><div class="payment-buyer-table__head no-print"><span>Buyer</span><span>Kamar</span><span>Total</span><span>Status</span><span>Aksi</span></div>${buyers.length ? buyers.map((buyer) => `<article class="payment-buyer-row payment-buyer-row--ops"><div><strong>${escapeHtml(buyer.name || '-')}</strong><small>${escapeHtml(buyer.phone || buyer.email || '-')}</small></div><span>${escapeHtml(buyer.room || '-')}</span><b>${rupiah(Number(buyer.totalPayment || 0))}</b><i class="status-${slug(buyer.paymentStatus || '')}">${escapeHtml(buyer.paymentStatus || '-')}</i><button class="row-print-btn row-print-btn--gold" type="button" data-payment-detail="${escapeHtml(buyer.id || '')}">Detail</button></article>`).join('') : '<div class="empty admin-empty-state"><strong>Belum ada buyer.</strong><p>Data pembayaran muncul setelah user melakukan pendaftaran.</p></div>'}</div></section>`;
  }

  const { resident, proof, proofs, qrisParts, splitParts, rent, deposit, total } = getAdminApplicationState(selectedBuyer);
  if (!resident?.name) return `<section class="payment-review-page admin-page-panel" id="pembayaran" data-section><div class="empty admin-empty-state"><strong>Belum ada pembayaran.</strong><p>Data muncul setelah calon penghuni daftar dan memilih metode administrasi.</p></div></section>`;

  const rows = proofs.filter((item) => item?.status);
  const qrisOpenedTotal = qrisParts.reduce((sum, index) => sum + Number(splitParts[index] || 0), 0);
  const remainingTotal = Math.max(0, total - qrisOpenedTotal);
  const proofStatus = proof?.status || 'none';
  const paymentStage = proofStatus === 'approved'
    ? 'Administrasi selesai'
    : proofStatus === 'uploaded'
      ? 'Bukti transfer menunggu review'
      : qrisParts.length
        ? 'Pembayaran QRIS sedang berjalan'
        : 'Menunggu pembayaran';
   const rawSection = state.activePaymentSection || 'overview';
   const section = ['qris', 'transfer'].includes(rawSection) ? 'method' : rawSection === 'review' ? 'proof' : rawSection;
   const navItems = [
     ['overview', 'Ringkasan'],
     ['method', 'Metode Bayar'],
     ['proof', 'Bukti Masuk'],
   ];
   const dueDate = getResidentLeaseDueDate(resident, calculateLeaseEnd(resident.startDate || new Date().toISOString().slice(0, 10), resident.leaseType || 'Bulanan', resident.duration || 1));
   const paymentNav = `<nav class="payment-subnav no-print">${navItems.map(([id, label]) => `<button class="${section === id ? 'is-active' : ''}" type="button" data-payment-section="${id}">${label}</button>`).join('')}</nav>`;
  const proofRows = rows.length ? rows.map((item) => {
    const proofUrl = item.fileUrl || item.file_url || item.proofUrl || '';
    const proofFile = item.fileName || item.file_name || 'Tanpa file';
    const proofStatusText = String(item.status || '').toLowerCase();
    const canReviewProof = /uploaded|review|menunggu|pending/.test(proofStatusText) && !/approved|recorded|paid|sudah|selesai|reject|ditolak/.test(proofStatusText);
    const proofActions = canReviewProof ? `<div class="admin-payment-actions no-print"><span class="admin-payment-actions__hint">Approve = setujui penghuni</span><button class="row-print-btn row-print-btn--gold" type="button" data-approve-payment="${escapeHtml(item.id || '')}">Approve</button><button class="row-print-btn" type="button" data-reject-payment="${escapeHtml(item.id || '')}">Tolak</button></div>` : '<div class="admin-payment-actions admin-payment-actions--locked no-print"><span>Selesai</span></div>';
    return `<article class="payment-proof-row"><div><span>${escapeHtml(item.invoice || 'MANUAL')}</span><strong>${escapeHtml(item.residentName || resident.name || '-')}</strong><small>${escapeHtml(item.room || resident.room || '-')} · ${escapeHtml(item.uploadedAt || item.created_at || '-')}</small>${proofUrl ? `<button class="proof-preview-link proof-preview-button" type="button" data-proof-preview-url="${escapeHtml(proofUrl)}" data-proof-preview-file="${escapeHtml(proofFile)}"><i class="fa-regular fa-image" aria-hidden="true"></i>Lihat Bukti</button>` : `<em class="proof-preview-empty">${escapeHtml(proofFile)}</em>`}</div><b>${rupiah(Number(item.amount || total || 0))}</b><i class="status-${slug(item.status)}">${escapeHtml(item.status)}</i>${proofActions}</article>`;
  }).join('') : '<div class="payment-empty-row"><strong>Belum ada bukti transfer.</strong><p>Queue ini khusus review bukti manual yang diupload penghuni.</p></div>';

  const overviewPage = `<section class="payment-review-status"><article><span>Status</span><strong>${escapeHtml(paymentStage)}</strong><small>${proofStatus !== 'none' ? `Bukti: ${escapeHtml(proofStatus)}` : 'Belum ada bukti transfer'}</small></article><article><span>Total Tagihan Awal</span><strong>${rupiah(total)}</strong><small>Sewa ${rupiah(rent)} + deposit ${rupiah(deposit)}</small></article><article><span>Sudah Dibuka via QRIS</span><strong>${rupiah(qrisOpenedTotal)}</strong><small>${qrisParts.length}/${splitParts.length} link dibuat</small></article><article><span>Sisa Belum Dibuka</span><strong>${rupiah(remainingTotal)}</strong><small>Bisa QRIS berikutnya atau transfer</small></article></section><section class="payment-overview-grid"><article><span>Calon Penghuni</span><strong>${escapeHtml(resident.name)}</strong><small>${escapeHtml(resident.room || '-')} · ${escapeHtml(resident.phone || '-')}</small></article><article><span>Rekening Refund</span><strong>${escapeHtml(resident.refundBank || '-')} ${escapeHtml(resident.refundAccount || '-')}</strong><small>${escapeHtml(resident.refundAccountName || '-')}</small></article><article><span>Keputusan Admin</span><strong>${escapeHtml(resident.administrationStatus || resident.applicationStatus || 'Menunggu')}</strong><small>Berubah setelah bukti disetujui/ditolak</small></article><article><span>Jatuh Tempo</span><strong>${formatInvoiceDate(dueDate)}</strong><small>Peraturan: ${escapeHtml(resident.leaseType || 'Bulanan')} · durasi ${resident.duration || 1}</small></article></section>`;
  const methodPage = `<section class="payment-method-grid payment-method-grid--admin"><article class="payment-tool-page"><div class="payment-tool-head"><div><span>Metode 1</span><h4>QRIS otomatis</h4><p>Bayar via link QRIS, otomatis dipecah sesuai limit.</p></div><strong>${rupiah(qrisOpenedTotal)} / ${rupiah(total)}</strong></div><div class="payment-split-list payment-split-list--page">${splitParts.map((part, index) => `<button type="button" class="payment-split-chip ${qrisParts.includes(index) ? 'is-opened' : ''}" data-qris-part="${index}" data-qris-amount="${part}"><span>QRIS ${index + 1}</span><strong>${rupiah(part)}</strong><small>${qrisParts.includes(index) ? 'Link sudah dibuat' : 'Buat link bayar'}</small></button>`).join('') || '<p class="payment-empty-row">Tidak ada tagihan untuk dibuatkan QRIS.</p>'}</div></article><article class="payment-tool-page"><div class="payment-tool-head"><div><span>Metode 2</span><h4>Transfer manual</h4><p>Transfer bank, penghuni upload bukti dari portal.</p></div><strong>${rupiah(total)}</strong></div><div class="manual-transfer-box manual-transfer-box--page"><p><span>Bank</span><strong>${manualTransferAccount.bank}</strong></p><p><span>Rekening</span><strong>${manualTransferAccount.number}</strong></p><p><span>Atas nama</span><strong>${manualTransferAccount.holder}</strong></p><p><span>Nominal</span><strong>${rupiah(total)}</strong></p><a class="row-print-btn row-print-btn--gold" href="https://wa.me/${manualTransferAccount.whatsapp}?text=${encodeURIComponent(`Halo Admin Onyx, mohon review pembayaran administrasi ${resident.name || ''} sebesar ${rupiah(total)}.`)}" target="_blank" rel="noopener noreferrer">Kirim Instruksi WA</a></div></article></section>`;
  const proofPage = `<section class="payment-proof-panel"><div class="payment-proof-panel__head"><div><span>Bukti Masuk</span><h4>Review pembayaran transfer</h4><p><strong>Approve = aktifkan penghuni</strong>, tolak jika tidak sesuai.</p></div><small>${rows.length} bukti</small></div><div class="payment-proof-list">${proofRows}</div></section>${renderProofPreviewModal()}`;
  const pages = { overview: overviewPage, method: methodPage, proof: proofPage };

  return `<section class="payment-review-page" id="pembayaran" data-section><div class="payment-review-hero"><div><span>Payment Detail</span><h3>${escapeHtml(resident.name)} · ${escapeHtml(navItems.find(([id]) => id === section)?.[1] || 'Ringkasan')}</h3><p>${escapeHtml(resident.room || '-')} · ${escapeHtml(paymentStage)}</p></div><div class="payment-review-hero__actions no-print"><button class="button subtle" type="button" id="backToPaymentList"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i>List buyer</button><button class="button subtle" type="button" id="refreshPayments"><i class="fa-solid fa-rotate" aria-hidden="true"></i>Refresh</button></div></div>${paymentNav}${pages[section] || overviewPage}</section>`;
}

function renderProofPreviewModal() {
  if (!state.proofPreview?.url) return '';
  const url = state.proofPreview.url;
  const file = state.proofPreview.file || 'Bukti pembayaran';
  const isPdf = /\.pdf(\?|#|$)/i.test(url) || /\.pdf$/i.test(file);
  const preview = isPdf
    ? `<iframe src="${escapeHtml(url)}" title="Preview bukti pembayaran"></iframe>`
    : `<img src="${escapeHtml(url)}" alt="Preview bukti pembayaran ${escapeHtml(file)}" />`;
  return `<div class="proof-preview-modal" role="dialog" aria-modal="true"><div class="proof-preview-modal__card"><header><div><span>Bukti Pembayaran</span><h4>${escapeHtml(file)}</h4></div><button class="row-print-btn" type="button" id="closeProofPreview">Tutup</button></header><div class="proof-preview-modal__body">${preview}</div><footer><a class="row-print-btn row-print-btn--gold" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">Buka file asli</a></footer></div></div>`;
}

function renderAdminPersonDetail(type, person) {
  if (!person) return '<section class="panel section-panel admin-page-panel"><div class="empty admin-empty-state"><strong>Belum ada data real.</strong><p>Silakan tunggu pendaftaran dari frontend.</p></div></section>';
  const isResident = (person.category || 'Long Stay') === 'Long Stay';
  const adminExtras = person.refund || person.administrationStatus ? `<div class="admin-detail-extra"><article><span>Administrasi</span><strong>${escapeHtml(person.administrationStatus || '-')}</strong></article><article><span>Rekening Refund Deposit</span><strong>${escapeHtml(person.refund || '-')}</strong></article></div>` : '';
  return `<section class="panel section-panel admin-page-panel admin-detail-page"><div class="panel-head wrap"><div><span>${isResident ? 'Detail Penghuni' : 'Detail Penyewa'}</span><h3>${escapeHtml(person.name)}</h3></div><button class="button subtle" type="button" id="backToAdminList"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i>Kembali</button></div><div class="admin-detail-summary"><article><span>Kamar</span><strong>${escapeHtml(person.room)}</strong></article><article><span>Tipe</span><strong>${escapeHtml(person.plan)}</strong></article><article><span>Status</span><strong>${escapeHtml(person.status)}</strong></article></div><form class="admin-detail-form" id="adminDetailForm"><label>Nama<input name="name" value="${escapeHtml(person.name)}" /></label><label>Kamar<input name="room" value="${escapeHtml(person.room)}" /></label><label>${isResident ? 'Masa Huni' : 'Masa Sewa'}<select name="plan"><option ${person.plan === 'Bulanan' ? 'selected' : ''}>Bulanan</option><option ${person.plan === 'Tahunan' ? 'selected' : ''}>Tahunan</option><option ${person.plan === 'Harian' ? 'selected' : ''}>Harian</option><option ${person.plan === 'Mingguan' ? 'selected' : ''}>Mingguan</option></select></label><label>Mulai<input type="date" name="start" value="${escapeHtml(person.start || '')}" /></label><label>Selesai<input type="date" name="end" value="${escapeHtml(person.end || '')}" /></label><label>${isResident ? 'Tagihan' : 'Total Sewa'}<input name="amount" value="${escapeHtml(isResident ? person.billing : person.total)}" /></label><label>Jatuh Tempo<input name="due" value="${escapeHtml(person.due || '')}" /></label><label>Status<select name="status"><option ${person.status === 'Aktif' ? 'selected' : ''}>Aktif</option><option ${person.status === 'Pending' ? 'selected' : ''}>Pending</option><option ${person.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option><option ${person.status === 'Check-in' ? 'selected' : ''}>Check-in</option><option ${person.status === 'Maintenance hold' ? 'selected' : ''}>Maintenance hold</option><option>Selesai</option></select></label><label class="full">Catatan<textarea name="notes" placeholder="Catatan admin, deposit, perubahan invoice, atau follow-up pembayaran."></textarea></label><div class="form-actions full"><button class="button primary" type="submit">Simpan Perubahan</button><button class="button subtle" type="button" id="backToAdminListSecondary">Batal</button></div></form></section>`;
}

function renderReservationsPanel() {
  const backendState = JSON.parse(window.localStorage.getItem('onyx-admin-state') || 'null');
  const applications = backendState?.applications || backendState?.data?.applications || [];
  const rows = applications.map((item) => ({
    code: item.id || '-',
    guest: item.name || '-',
    room: item.room || '-',
    checkin: item.startDate || '-',
    status: item.applicationStatus || 'Menunggu Review',
    total: Number(item.monthlyBudget || 0),
  }));
  return `<section class="panel section-panel admin-page-panel" id="reservasi" data-section><div class="panel-head wrap"><div><span>Booking</span><h3>Reservasi aktif</h3></div><small>${rows.length} pendaftaran</small></div>${renderBookingTable(rows)}</section>`;
}

/**
 * @description Render tabel booking dengan status badge dan total harga.
 * @param {Array<object>} rows Data reservasi.
 * @returns {string} Markup tabel booking.
 */
function renderBookingTable(rows) {
  if (!rows.length) return '<div class="empty admin-empty-state"><strong>Belum ada reservasi real.</strong><p>Data akan muncul setelah user melakukan pendaftaran.</p></div>';
  return `<div class="table-wrap"><table><thead><tr><th>Kode</th><th>Tamu</th><th>Kamar</th><th>Check-in</th><th>Status</th><th>Total</th></tr></thead><tbody>${rows.map((row) => `<tr><td>${escapeHtml(row.code)}</td><td>${escapeHtml(row.guest)}</td><td>${escapeHtml(row.room)}</td><td>${escapeHtml(row.checkin)}</td><td><span class="badge ${slug(row.status)}">${escapeHtml(row.status)}</span></td><td>${rupiah(row.total)}</td></tr>`).join('')}</tbody></table></div>`;
}

/**
 * @description Render invoice print view sesuai fitur cetak PRD.
 * @returns {string} Markup invoice.
 */
function renderCashflowPanel() {
  const buyers = getAdminPaymentBuyers();
  const { utilityMeters } = getAdminApplicationState();
  if (!buyers.length) return '<section class="admin-page-panel cashflow-page" id="laporan" data-section><div class="empty admin-empty-state"><strong>Belum ada data cashflow.</strong><p>Laporan keuangan muncul setelah ada pendaftaran dan pembayaran resident.</p></div></section>';

  const paidBuyers = buyers.filter((item) => /Sudah bayar/i.test(item.paymentStatus || ''));
  const reviewBuyers = buyers.filter((item) => /Menunggu review/i.test(item.paymentStatus || ''));
  const rejectedBuyers = buyers.filter((item) => /Ditolak/i.test(item.paymentStatus || ''));
  const unpaidBuyers = buyers.filter((item) => /Belum bayar/i.test(item.paymentStatus || ''));
  const totalRevenue = buyers.reduce((sum, item) => sum + Number(item.totalPayment || 0), 0);
  const paidRevenue = paidBuyers.reduce((sum, item) => sum + Number(item.totalPayment || 0), 0);
  const outstanding = totalRevenue - paidRevenue;
  const totalDeposit = buyers.reduce((sum, item) => sum + Number(item.deposit || 0), 0);
  const utilityCost = utilityMeters.reduce((sum, item) => sum + Number(item.totalAmount || 0), 0);
  const netCashflow = paidRevenue - utilityCost;
  const collectionRate = totalRevenue ? Math.round((paidRevenue / totalRevenue) * 100) : 0;
  const reviewAmount = reviewBuyers.reduce((sum, item) => sum + Number(item.totalPayment || 0), 0);
  const rejectedAmount = rejectedBuyers.reduce((sum, item) => sum + Number(item.totalPayment || 0), 0);
  const unpaidAmount = unpaidBuyers.reduce((sum, item) => sum + Number(item.totalPayment || 0), 0);

  const txRows = buyers.slice(0, 10).map((item) => {
    const proof = item.proof || {};
    const uploadedAt = proof.uploadedAt || proof.created_at || proof.createdAt || '-';
    const proofStatus = String(proof.status || '').toLowerCase();
    const statusLabel = /approved|recorded/i.test(proofStatus) ? '<span class="cf-badge cf-badge--paid">Lunas</span>' : /uploaded|review|menunggu/i.test(proofStatus) ? '<span class="cf-badge cf-badge--pending">Review</span>' : /reject|ditolak/i.test(proofStatus) ? '<span class="cf-badge cf-badge--rejected">Ditolak</span>' : '<span class="cf-badge cf-badge--unpaid">Belum</span>';
    const initials = String(item.name || 'R').split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();
    return `<tr><td><div class="cf-resident"><span class="cf-avatar">${escapeHtml(initials)}</span><div><strong>${escapeHtml(item.name || '-')}</strong><small>${escapeHtml(item.room || '-')}</small></div></div></td><td class="cf-amount">${rupiah(Number(item.totalPayment || 0))}</td><td>${escapeHtml(uploadedAt)}</td><td>${statusLabel}</td></tr>`;
  }).join('');

  const now = new Date();
  const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const periodLabel = `${months[now.getMonth()]} ${now.getFullYear()}`;

  // Donut chart — distributions status pembayaran
  const donutRadius = 52;
  const donutStroke = 18;
  const donutCirc = 2 * Math.PI * donutRadius;
  const donutSegments = [
    { count: paidBuyers.length, amount: paidRevenue, label: 'Lunas', color: '#8ff0bd', id: 'paid' },
    { count: reviewBuyers.length, amount: reviewAmount, label: 'Review', color: '#ffcf66', id: 'review' },
    { count: rejectedBuyers.length, amount: rejectedAmount, label: 'Ditolak', color: '#ff9d9d', id: 'rejected' },
    { count: unpaidBuyers.length, amount: unpaidAmount, label: 'Belum', color: 'rgba(247,242,234,.22)', id: 'unpaid' },
  ];
  let donutOffset = 0;
  const donutArcs = donutSegments.map((seg) => {
    const pct = buyers.length ? seg.count / buyers.length : 0;
    const dashLen = pct * donutCirc;
    const dashGap = donutCirc - dashLen;
    const offset = -donutOffset;
    donutOffset += dashLen;
    return `<circle cx="60" cy="60" r="${donutRadius}" fill="none" stroke="${seg.color}" stroke-width="${donutStroke}" stroke-dasharray="${dashLen} ${dashGap}" stroke-dashoffset="${offset}" stroke-linecap="butt" />`;
  }).join('');

  const donutLegend = donutSegments.map((seg) => {
    const pct = buyers.length ? Math.round((seg.count / buyers.length) * 100) : 0;
    return `<div class="cf-donut__item"><i class="cf-dot cf-dot--${seg.id}" style="background:${seg.color}" aria-hidden="true"></i><span>${escapeHtml(seg.label)}</span><em>${seg.count} · ${pct}%</em><b>${rupiah(seg.amount)}</b></div>`;
  }).join('');

  // Bar chart — komposisi keuangan
  const finBars = [
    { label: 'Pemasukan', value: paidRevenue, color: '#8ff0bd' },
    { label: 'Outstanding', value: outstanding, color: '#ffcf66' },
    { label: 'Deposit', value: totalDeposit, color: '#60a5fa' },
    { label: 'Biaya Utilitas', value: utilityCost, color: '#ff9d9d' },
  ];
  const finMax = Math.max(...finBars.map((b) => b.value), 1);
  const finBarHtml = finBars.map((bar) => {
    const pct = Math.round((bar.value / finMax) * 100);
    return `<div class="cf-bar-chart__row"><span class="cf-bar-chart__label">${escapeHtml(bar.label)}</span><div class="cf-bar-chart__fill-wrap"><div class="cf-bar-chart__fill" style="width:${pct}%;background:${bar.color}"></div></div><strong class="cf-bar-chart__value">${rupiah(bar.value)}</strong></div>`;
  }).join('');

  return `<section class="admin-page-panel cashflow-page" id="laporan" data-section>
    <div class="cf-hero">
      <div class="cf-hero__lead"><span class="cf-eyebrow">Laporan Keuangan</span><h3>${periodLabel}</h3><p>Uang masuk, piutang, deposit, biaya utilitas, dan transaksi penghuni.</p></div>
      <div class="cf-hero__total"><span class="cf-hero__label">Total Nilai Transaksi</span><strong class="cf-hero__value">${rupiah(totalRevenue)}</strong><div class="cf-hero__meta"><small>${buyers.length} transaksi</small><button class="cf-print-btn no-print" type="button" id="printCashflow"><i class="fa-solid fa-print" aria-hidden="true"></i> Cetak Laporan</button></div></div>
    </div>
    <div class="cf-metrics">
      <article class="cf-metric cf-metric--paid">
        <div class="cf-metric__icon"><i class="fa-solid fa-circle-check" aria-hidden="true"></i></div>
        <div class="cf-metric__body"><span>Uang Masuk</span><strong>${rupiah(paidRevenue)}</strong><small>${paidBuyers.length} resident lunas · ${collectionRate}% collected</small></div>
      </article>
      <article class="cf-metric cf-metric--outstanding">
        <div class="cf-metric__icon"><i class="fa-solid fa-hourglass-half" aria-hidden="true"></i></div>
        <div class="cf-metric__body"><span>Belum Tertagih</span><strong>${rupiah(outstanding)}</strong><small>${reviewBuyers.length + rejectedBuyers.length + unpaidBuyers.length} resident belum selesai</small></div>
      </article>
      <article class="cf-metric cf-metric--deposit">
        <div class="cf-metric__icon"><i class="fa-solid fa-piggy-bank" aria-hidden="true"></i></div>
        <div class="cf-metric__body"><span>Deposit Ditahan</span><strong>${rupiah(totalDeposit)}</strong><small>Dari ${buyers.length} resident aktif</small></div>
      </article>
      <article class="cf-metric cf-metric--cost">
        <div class="cf-metric__icon"><i class="fa-solid fa-bolt" aria-hidden="true"></i></div>
        <div class="cf-metric__body"><span>Biaya Utilitas</span><strong>${rupiah(utilityCost)}</strong><small>${utilityMeters.length} meter tercatat</small></div>
      </article>
    </div>
    <div class="cf-main">
        <article class="cf-card cf-card--table">
          <header class="cf-card__head"><div><h4>Riwayat Transaksi</h4><p>10 transaksi terakhir yang perlu dicek admin</p></div></header>
          <div class="cf-table-wrap">
            <table class="cf-table">
              <thead><tr><th>Resident</th><th>Nominal</th><th>Tanggal</th><th>Status</th></tr></thead>
              <tbody>${txRows || '<tr><td colspan="4"><div class="empty admin-empty-state"><strong>Belum ada transaksi.</strong></div></td></tr>'}</tbody>
            </table>
          </div>
        </article>
        <aside class="cf-side">
        <article class="cf-card cf-card--summary">
          <header class="cf-card__head"><div><h4>Ringkasan Cashflow</h4><p>Net periode ini</p></div></header>
          <dl class="cf-summary">
            <div><dt>Pemasukan</dt><dd class="cf-summary__paid">${rupiah(paidRevenue)}</dd></div>
            <div><dt>Belum Tertagih</dt><dd>${rupiah(outstanding)}</dd></div>
            <div><dt>Deposit Terkumpul</dt><dd>${rupiah(totalDeposit)}</dd></div>
            <div><dt>Biaya Utilitas</dt><dd class="cf-summary__cost">− ${rupiah(utilityCost)}</dd></div>
            <div class="cf-summary__total"><dt>Net Cashflow</dt><dd>${rupiah(netCashflow)}</dd></div>
          </dl>
        </article>
        <article class="cf-card cf-card--actions">
          <header class="cf-card__head"><div><h4>Aksi Keuangan</h4><p>Yang perlu ditangani lebih dulu</p></div></header>
          <div class="cf-action-list"><p><span>Review</span><b>${reviewBuyers.length} bukti</b><em>${rupiah(reviewAmount)} menunggu keputusan</em></p><p><span>Belum Bayar</span><b>${unpaidBuyers.length} penghuni</b><em>${rupiah(unpaidAmount)} belum masuk</em></p><p><span>Ditolak</span><b>${rejectedBuyers.length} bukti</b><em>${rupiah(rejectedAmount)} perlu follow-up</em></p></div>
        </article>
        </aside>
    </div>
    <div class="cf-charts cf-charts--support">
      <article class="cf-card cf-card--donut">
        <header class="cf-card__head">
          <div><h4>Distribusi Status Pembayaran</h4><p>Proporsi per status transaksi</p></div>
          <small>${collectionRate}% collected</small>
        </header>
        <div class="cf-donut">
          <svg class="cf-donut__ring" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="${donutRadius}" fill="none" stroke="rgba(247,242,234,.06)" stroke-width="${donutStroke}" />
            ${donutArcs}
          </svg>
          <div class="cf-donut__center">
            <strong>${collectionRate}%</strong>
            <span>Collection Rate</span>
          </div>
        </div>
        <div class="cf-donut__legend">${donutLegend}</div>
      </article>
      <article class="cf-card cf-card--bars">
        <header class="cf-card__head">
          <div><h4>Komposisi Keuangan</h4><p>Perbandingan arus kas utama</p></div>
          <small>Net ${rupiah(netCashflow)}</small>
        </header>
        <div class="cf-bar-chart">${finBarHtml}</div>
      </article>
    </div>
    ${renderCashflowPrintReport({ buyers, totalRevenue, paidRevenue, outstanding, totalDeposit, utilityCost, netCashflow, collectionRate, periodLabel })}
  </section>`;
}

function renderCashflowPrintReport(data) {
  const { buyers, totalRevenue, paidRevenue, outstanding, totalDeposit, utilityCost, netCashflow, collectionRate, periodLabel } = data;
  const generatedAt = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
  const rows = buyers.map((item) => {
    const proof = item.proof || {};
    const date = proof.uploadedAt || proof.created_at || proof.createdAt || '-';
    const status = /Sudah bayar/i.test(item.paymentStatus || '') ? 'Lunas' : /Menunggu review/i.test(item.paymentStatus || '') ? 'Review' : /Ditolak/i.test(item.paymentStatus || '') ? 'Ditolak' : 'Belum bayar';
    return `<tr><td>${escapeHtml(item.name || '-')}<small>${escapeHtml(item.room || '-')}</small></td><td>${rupiah(Number(item.totalPayment || 0))}</td><td>${escapeHtml(String(date))}</td><td>${status}</td></tr>`;
  }).join('');
  return `<section class="cashflow-print-report" aria-label="Laporan arus kas">
    <header><div><span>Onyx Residence</span><h2>Laporan Arus Kas Bisnis</h2><p>Periode ${escapeHtml(periodLabel)} · pemasukan, piutang, dan biaya utilitas.</p></div><aside><b>${escapeHtml(generatedAt)}</b><small>Dicetak oleh Admin</small></aside></header>
    <div class="cashflow-print-summary">
      <article><span>Total Transaksi</span><strong>${rupiah(totalRevenue)}</strong></article>
      <article><span>Pemasukan</span><strong>${rupiah(paidRevenue)}</strong></article>
      <article><span>Outstanding</span><strong>${rupiah(outstanding)}</strong></article>
      <article><span>Collection Rate</span><strong>${collectionRate}%</strong></article>
    </div>
    <table><thead><tr><th>Resident</th><th>Nominal</th><th>Tanggal</th><th>Status</th></tr></thead><tbody>${rows || '<tr><td colspan="4">Belum ada transaksi.</td></tr>'}</tbody></table>
    <dl class="cashflow-print-totals">
      <div><dt>Deposit terkumpul</dt><dd>${rupiah(totalDeposit)}</dd></div>
      <div><dt>Biaya utilitas</dt><dd>− ${rupiah(utilityCost)}</dd></div>
      <div class="cashflow-print-totals__net"><dt>Net Cashflow</dt><dd>${rupiah(netCashflow)}</dd></div>
    </dl>
    <footer><span>Catatan</span><p>Pemasukan dihitung dari pembayaran yang sudah disetujui admin. Net cashflow = pemasukan − biaya utilitas.</p></footer>
  </section>`;
}

/**
 * @description Mengikat event interaksi setelah render selesai.
 * @returns {void}
 */
function bindEvents() {
  initScrollSequences();

  // Event navigasi umum: semua elemen data-route berpindah halaman tanpa reload penuh.
  document.querySelectorAll('[data-route]').forEach((element) => {
    element.addEventListener('click', (event) => {
      event.preventDefault();
      navigate(element.dataset.route);
    });
  });

  document.querySelectorAll('input[type="date"]').forEach((input) => {
    input.addEventListener('focus', () => input.showPicker?.());
    input.addEventListener('click', () => input.showPicker?.());
    input.addEventListener('keydown', (event) => event.preventDefault());
  });

  document.querySelector('#resetExpiredPayment')?.addEventListener('click', () => {
    window.localStorage.removeItem('onyx-resident-account');
    window.localStorage.removeItem('onyx-payment-proof');
    clearResidentSession();
    showToast('Pendaftaran expired dibersihkan. Silakan daftar ulang.');
    navigate('register');
  });

  document.querySelectorAll('[data-proof-preview-url]').forEach((button) => {
    button.addEventListener('click', () => {
      state.proofPreview = { url: button.dataset.proofPreviewUrl, file: button.dataset.proofPreviewFile || 'Bukti pembayaran' };
      renderApp();
    });
  });

  document.querySelector('#closeProofPreview')?.addEventListener('click', () => {
    state.proofPreview = null;
    renderApp();
  });

  document.querySelector('#printCashflow')?.addEventListener('click', () => window.print());

  document.querySelectorAll('[data-admin-quick-section]').forEach((button) => {
    button.addEventListener('click', () => {
      navigateAdminSection(button.dataset.adminQuickSection || 'dashboard');
    });
  });

  document.querySelectorAll('[data-admin-open-room-feature]').forEach((button) => {
    button.addEventListener('click', () => {
      const feature = button.dataset.adminOpenRoomFeature || 'overview';
      const resident = getPrimaryAdminResident();
      const preferredRoom = getRoomCode(resident?.room || '');
      const room = getRooms().find((item) => item.no === preferredRoom) || getRooms()[0];
      if (!room) return showToast('Belum ada kamar untuk dibuka.');
      state.activeAdminSection = 'kamar';
      state.adminRoomDetail = room.no;
      state.activeRoomDetailSection = feature;
      state.isRoomCreateOpen = false;
      renderApp();
    });
  });

  document.querySelector('#adminToggleSmartLock')?.addEventListener('click', async () => {
    const accessState = JSON.parse(window.localStorage.getItem('onyx-access-state') || '{"locked":true,"guestPass":"QR-ONYX-5274","validUntil":"22:00"}');
    const nextState = { ...accessState, locked: !accessState.locked };
    window.localStorage.setItem('onyx-access-state', JSON.stringify(nextState));
    saveAccessLog(nextState.locked ? 'Admin locked room' : 'Admin unlocked room', 'Smart Access admin panel', nextState.locked ? 'locked' : 'unlocked');
    await saveAccessStateToBackend(nextState, nextState.locked ? 'Admin locked room' : 'Admin unlocked room', 'Smart Access admin panel', nextState.locked ? 'locked' : 'unlocked');
    state.activeAdminSection = 'layanan';
    showToast(nextState.locked ? 'Kamar dikunci.' : 'Kamar dibuka.');
    renderApp();
  });

  document.querySelector('#seedIotDemo')?.addEventListener('click', () => {
    const now = new Date().toISOString();
    const rows = getRooms().slice(0, 4).map((room, index) => ({
      id: Date.now() + index,
      roomCode: room.no,
      temperature: 24 + index,
      humidity: 62 - index,
      powerWatt: 180 + (index * 45),
      energyKwh: Number((12.5 + index).toFixed(2)),
      waterM3: Number((3.2 + (index * 0.4)).toFixed(2)),
      acOn: getRoomClimateType(room) === 'ac',
      lightOn: true,
      waterOn: true,
      created_at: now,
    }));
    window.localStorage.setItem('onyx-iot-telemetry', JSON.stringify(rows));
    showToast('Demo IoT telemetry dibuat agar monitoring terlihat.');
    renderApp();
  });

  document.querySelector('#adminServiceTicketForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formEl = event.currentTarget;
    const submitBtn = formEl.querySelector('button[type="submit"]');
    const form = new FormData(formEl);
    const issue = String(form.get('issue') || '').trim();
    if (!issue) {
      formEl.querySelector('input[name="issue"]')?.focus();
      return;
    }
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalLabel = submitBtn.textContent;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Mengirim…';
    }
    const resident = getPrimaryAdminResident();
    const ticket = {
      id: `TKT-${Date.now()}`,
      application_id: String(form.get('application_id') || resident?.id || ''),
      category: String(form.get('category') || 'Service'),
      priority: String(form.get('priority') || 'Normal'),
      issue,
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    const tickets = getAdminServiceTickets();
    const nextTickets = [ticket, ...tickets];
    window.localStorage.setItem('onyx-admin-service-tickets', JSON.stringify(nextTickets));
    window.localStorage.setItem('onyx-resident-tickets', JSON.stringify(nextTickets));
    try { await apiJson('service-ticket.php', { method: 'POST', body: JSON.stringify(ticket) }); await syncAdminState(true); } catch (error) { showToast('Backend tiket belum tersambung, tiket disimpan lokal.'); } finally { if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitBtn.dataset.originalLabel || 'Buat Tiket'; } }
    state.activeAdminSection = 'layanan';
    showToast('Service ticket berhasil dibuat.');
    renderApp();
  });

  document.querySelectorAll('[data-ticket-id]').forEach((button) => {
    button.addEventListener('click', async () => {
      const id = button.dataset.ticketId;
      const nextStatus = button.dataset.ticketNext || 'open';
      const tickets = getAdminServiceTickets();
      const ticket = tickets.find((item) => String(item.id) === String(id));
      if (!ticket) return;
      const payload = { ...ticket, id, status: nextStatus };
      try {
        await apiJson('service-ticket.php', { method: 'POST', body: JSON.stringify(payload) });
        await syncAdminState(true);
        showToast(`Tiket diperbarui ke ${nextStatus}.`);
      } catch (error) {
        showToast('Backend tiket belum tersambung, status tidak tersimpan.');
      }
      state.activeAdminSection = 'layanan';
      renderApp();
    });
  });

  // Event login: admin dan resident sama-sama validasi password lewat backend.
  document.querySelector('#loginForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const username = String(form.get('username') || '').trim();
    const password = String(form.get('password') || '').trim();
    apiJson('admin-auth.php', { method: 'POST', body: JSON.stringify({ username, password }) })
      .then(() => {
        openAdminSession();
      })
      .catch((adminError) => {
        if (username === 'admin' && password === 'admin123' && /Failed to fetch|NetworkError|Load failed|API error/i.test(adminError.message || '')) {
          openAdminSession('Backend admin belum aktif, masuk mode demo admin lokal.');
          return;
        }
        apiJson('auth-resident.php', { method: 'POST', body: JSON.stringify({ username, password }) })
        .then((response) => {
           const residentAccount = sanitizeResidentForStorage(response.data || {});
           clearResidentDataCache();
           window.localStorage.setItem('onyx-resident-account', JSON.stringify(residentAccount));
           saveLocalRegisteredResident(residentAccount);
           window.localStorage.removeItem('onyx-resident-auth');
           window.sessionStorage.setItem('onyx-resident-session', 'true');
           state.page = 'resident';
           state.activeResidentSection = 'overview';
           navigate('resident');
           showToast('Login penghuni berhasil.');
         })
        .catch(() => {
          showToast('Email/WhatsApp atau password salah. Jika belum punya akun, daftar dulu.');
        });
      });
  });

  // Event booking publik: menyimpan request viewing dan membuka WhatsApp admin.
  document.querySelector('#publicBookingForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const booking = {
      name: String(form.get('name') || '').trim(),
      phone: String(form.get('phone') || '').trim(),
      suite: String(form.get('suite') || '').trim(),
      date: String(form.get('date') || '').trim(),
      message: String(form.get('message') || '').trim(),
    };

    const text = [
      'Halo Onyx Residence, saya ingin booking/viewing.',
      `Nama: ${booking.name}`,
      `WhatsApp: ${booking.phone}`,
      `Pilihan kamar: ${booking.suite}`,
      `Tanggal masuk/viewing: ${booking.date}`,
      booking.message ? `Catatan: ${booking.message}` : '',
    ].filter(Boolean).join('\n');

    window.localStorage.setItem('onyx-last-booking', JSON.stringify({ ...booking, createdAt: new Date().toISOString() }));
    showToast('Booking request dibuat. WhatsApp admin akan dibuka.');
    window.open(`https://wa.me/6281233445566?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  });

  // Event pendaftaran halaman Book: menghitung sewa/deposit lalu mengirim aplikasi resident.
  document.querySelector('#bookingRegisterForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const room = String(form.get('room') || '').trim();
    const leaseType = String(form.get('leaseType') || '').trim();
    const duration = String(form.get('duration') || '1').trim();
    const startDate = String(form.get('startDate') || '').trim();
    const endDate = calculateLeaseEnd(startDate, leaseType, duration);
    const total = calculateLeaseTotal(room, leaseType, duration);
    const deposit = Math.round(total * 0.3);
    const applicant = {
      name: String(form.get('name') || '').trim(),
      phone: String(form.get('phone') || '').trim(),
      email: String(form.get('email') || '').trim(),
      nik: String(form.get('nik') || '').trim(),
      address: String(form.get('address') || '').trim(),
      occupation: String(form.get('occupation') || '').trim(),
      room,
      leaseType,
      duration,
      startDate,
      endDate,
      monthlyBudget: String(total),
      deposit: String(deposit),
      emergencyContact: String(form.get('emergencyContact') || '').trim(),
      refundBank: String(form.get('refundBank') || '').trim(),
      refundAccount: String(form.get('refundAccount') || '').trim(),
      refundAccountName: String(form.get('refundAccountName') || '').trim(),
      notes: String(form.get('notes') || '').trim(),
      applicationStatus: 'Menunggu Review',
      administrationStatus: 'Belum Dibayar',
      createdAt: new Date().toISOString(),
    };
    const password = String(form.get('password') || '').trim();

    try {
      const saved = await apiJson('resident-application.php', { method: 'POST', body: JSON.stringify({ ...applicant, password }) });
      Object.assign(applicant, saved.data || {});
    } catch (error) {
      showToast('Backend aplikasi belum tersambung, data disimpan lokal sementara.');
    }
    const safeApplicant = sanitizeResidentForStorage(applicant);
    window.localStorage.setItem('onyx-register-draft', JSON.stringify(safeApplicant));
    window.localStorage.setItem('onyx-resident-account', JSON.stringify(safeApplicant));
    saveLocalRegisteredResident(applicant);
    window.localStorage.removeItem('onyx-resident-auth');
    window.sessionStorage.setItem('onyx-resident-session', 'true');
    showToast('Pendaftaran berhasil.');
    navigate('resident');
  });

  // Event register portal: jalur pendaftaran alternatif dari halaman register.
  document.querySelector('#registerForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const room = String(form.get('room') || '').trim();
    const leaseType = String(form.get('leaseType') || '').trim();
    const duration = String(form.get('duration') || '1').trim();
    const startDate = String(form.get('startDate') || '').trim();
    const endDate = calculateLeaseEnd(startDate, leaseType, duration);
    const total = calculateLeaseTotal(room, leaseType, duration);
    const deposit = Math.round(total * 0.3);
    const applicant = {
      name: String(form.get('name') || '').trim(),
      phone: String(form.get('phone') || '').trim(),
      email: String(form.get('email') || '').trim(),
      nik: String(form.get('nik') || '').trim(),
      address: String(form.get('address') || '').trim(),
      occupation: String(form.get('occupation') || '').trim(),
      room,
      leaseType,
      duration,
      startDate,
      endDate,
      monthlyBudget: String(total),
      deposit: String(deposit),
      emergencyContact: String(form.get('emergencyContact') || '').trim(),
      refundBank: String(form.get('refundBank') || '').trim(),
      refundAccount: String(form.get('refundAccount') || '').trim(),
      refundAccountName: String(form.get('refundAccountName') || '').trim(),
      notes: String(form.get('notes') || '').trim(),
      applicationStatus: 'Menunggu Review',
      createdAt: new Date().toISOString(),
    };
    const password = String(form.get('password') || '').trim();

    try {
      const saved = await apiJson('resident-application.php', { method: 'POST', body: JSON.stringify({ ...applicant, password }) });
      Object.assign(applicant, saved.data || {});
    } catch (error) {
      showToast('Backend aplikasi belum tersambung, data disimpan lokal sementara.');
    }
    const safeApplicant = sanitizeResidentForStorage(applicant);
    window.localStorage.setItem('onyx-register-draft', JSON.stringify(safeApplicant));
    window.localStorage.setItem('onyx-resident-account', JSON.stringify(safeApplicant));
    saveLocalRegisteredResident(applicant);
    window.localStorage.removeItem('onyx-resident-auth');
    window.sessionStorage.setItem('onyx-resident-session', 'true');
    showToast('Pendaftaran dikirim. Kamu langsung masuk panel untuk administrasi deposit dan sewa.');
    navigate('resident');
  });

  document.querySelectorAll('[data-custom-select]').forEach((select) => {
    const button = select.querySelector('.custom-select__button');
    button?.addEventListener('click', () => {
      const isOpen = select.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(isOpen));
    });
  });

  document.querySelectorAll('[data-custom-option]').forEach((option) => {
    option.addEventListener('click', () => {
      const select = option.closest('[data-custom-select]');
      const input = select?.querySelector('input[type="hidden"]');
      const buttonLabel = select?.querySelector('.custom-select__button span');
      if (!(input instanceof HTMLInputElement) || !buttonLabel || option.disabled) return;
      input.value = option.dataset.value || '';
      buttonLabel.textContent = option.querySelector('span')?.textContent || input.value;
      select.classList.remove('is-open');
      select.querySelector('.custom-select__button')?.setAttribute('aria-expanded', 'false');
      input.dispatchEvent(new Event('change', { bubbles: true }));
      updateRegisterEstimate({ forceEndDate: true });
    });
  });

  // Event estimasi register: total sewa, deposit, dan tanggal selesai dihitung otomatis.
  const updateRegisterEstimate = (options = {}) => {
    const form = document.querySelector('#registerForm, #bookingRegisterForm');
    if (!form) return;
    const room = form.elements.room?.value || '';
    const leaseType = form.elements.leaseType?.value || 'Bulanan';
    const startDate = form.elements.startDate?.value || new Date().toISOString().slice(0, 10);
    let duration = form.elements.duration?.value || 1;
    if (form.elements.startDate && !form.elements.startDate.value) form.elements.startDate.value = startDate;
    if (form.elements.endDate?.value && options.fromEndDate) {
      duration = calculateLeaseDuration(startDate, form.elements.endDate.value, leaseType);
      if (form.elements.duration) form.elements.duration.value = duration;
    } else if (form.elements.endDate && (!form.elements.endDate.value || options.forceEndDate)) {
      form.elements.endDate.value = calculateLeaseEnd(startDate, leaseType, duration);
    }
    const total = calculateLeaseTotal(room, leaseType, duration);
    if (form.elements.monthlyBudget) form.elements.monthlyBudget.value = total;
    if (form.elements.deposit) form.elements.deposit.value = Math.round(total * 0.3);
  };

  document.querySelectorAll('#registerForm, #bookingRegisterForm').forEach((form) => {
    form.addEventListener('input', (event) => updateRegisterEstimate({ fromEndDate: event.target?.name === 'endDate' }));
    form.addEventListener('change', (event) => updateRegisterEstimate({ fromEndDate: event.target?.name === 'endDate', forceEndDate: ['startDate', 'leaseType', 'duration', 'room'].includes(event.target?.name || '') }));
  });
  updateRegisterEstimate();

  // Event logout admin: hapus cookie admin lalu kembali ke halaman publik.
  document.querySelector('#logoutButton')?.addEventListener('click', async () => {
    try {
      await apiJson('auth-logout.php', { method: 'POST', body: JSON.stringify({ role: 'admin' }) });
    } catch (error) {
      showToast('Backend logout belum tersambung, session lokal dibersihkan.');
    }
    deleteCookie('kostku-auth');
    window.localStorage.removeItem('kostku-auth');
    window.localStorage.removeItem('kostku-admin-session');
    window.sessionStorage.removeItem('kostku-admin-session');
    window.sessionStorage.removeItem('onyx-resident-session');
    state.isAuthenticated = false;
    state.page = 'public';
    navigate('public');
    showToast('Logout berhasil. Selamat tinggal.');
  });

  // Event logout resident: bersihkan session dan reset state portal resident.
  document.querySelector('#residentLogoutButton')?.addEventListener('click', () => {
    clearResidentSession();
    state.activeResidentSection = 'overview';
    state.manualTransferInvoice = null;
    state.isTicketModalOpen = false;
    state.isQrModalOpen = false;
    navigate('login');
    showToast('Logout berhasil. Silakan login kembali.');
  });

  document.querySelector('#toggleSidebar')?.addEventListener('click', () => document.querySelector('#sidebar')?.classList.toggle('is-open'));

  // Event menu admin: pindah modul admin dan reset detail agar tampilan tidak nyangkut.
  document.querySelectorAll('[data-admin-section]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      navigateAdminSection(link.dataset.adminSection);
    });
  });

  // Event subnav Payment: memisahkan Overview, QRIS, Transfer Manual, dan Review Bukti.
  document.querySelectorAll('[data-payment-section]').forEach((button) => {
    button.addEventListener('click', () => {
      state.activePaymentSection = button.dataset.paymentSection || 'overview';
      renderApp();
    });
  });

  document.querySelectorAll('[data-payment-detail]').forEach((button) => {
    button.addEventListener('click', () => {
      state.adminPaymentDetailId = button.dataset.paymentDetail || null;
      state.activePaymentSection = 'overview';
      renderApp();
    });
  });

  document.querySelector('#backToPaymentList')?.addEventListener('click', () => {
    state.adminPaymentDetailId = null;
    state.activePaymentSection = 'overview';
    renderApp();
  });

  // Event subnav Detail Kamar: memisahkan Overview, Smart Control, dan Meter & Tagihan.
  document.querySelectorAll('[data-room-detail-section]').forEach((button) => {
    button.addEventListener('click', () => {
      state.activeRoomDetailSection = button.dataset.roomDetailSection || 'overview';
      state.isRoomCreateOpen = false;
      renderApp();
    });
  });

  // Event edit kamar: membuka detail/editor kamar yang dipilih dari inventory.
  document.querySelectorAll('[data-room-edit]').forEach((button) => {
    button.addEventListener('click', () => {
      state.adminRoomDetail = button.dataset.roomEdit;
      state.activeRoomDetailSection = 'overview';
      state.isRoomCreateOpen = true;
      pushKamarRoute(encodeURIComponent(button.dataset.roomEdit || ''));
    });
  });

  // Event hapus kamar: blok hapus jika kamar sudah ditempati penghuni approved.
  document.querySelectorAll('[data-room-delete]').forEach((button) => {
    button.addEventListener('click', () => {
      const roomNo = button.dataset.roomDelete;
      const room = getRooms().find((item) => item.no === roomNo);
      if (getRoomOccupant(roomNo)) {
        showToast('Kamar masih terisi, tidak bisa dihapus.');
        return;
      }
      state.rooms = state.rooms.filter((item) => item.no !== roomNo);
      window.localStorage.setItem('onyx-rooms', JSON.stringify(state.rooms));
      if (room?.id) apiJson('kamar.php', { method: 'DELETE', body: JSON.stringify({ id_kamar: room.id }) }).catch(() => {});
      showToast(`Kamar ${roomNo} dihapus dari inventory.`);
      renderApp();
    });
  });

  // Event tambah kamar: membuka form create tanpa detail kamar aktif.
  document.querySelector('#openRoomCreate')?.addEventListener('click', () => {
    state.isRoomCreateOpen = true;
    state.adminRoomDetail = null;
    state.activeRoomDetailSection = 'overview';
    pushKamarRoute('baru');
  });

  // Event toggle editor kamar: tampil/sembunyi form edit di detail kamar.
  document.querySelector('#toggleRoomEditor')?.addEventListener('click', () => {
    state.isRoomCreateOpen = !state.isRoomCreateOpen;
    renderApp();
  });

  // Event tutup editor kamar: menutup form tanpa keluar dari detail kamar.
  document.querySelector('#closeRoomEditor')?.addEventListener('click', () => {
    state.isRoomCreateOpen = false;
    if (state.adminRoomDetail) {
      pushKamarRoute(encodeURIComponent(state.adminRoomDetail));
    } else {
      pushKamarRoute('');
    }
  });

  // Event kembali kamar: menutup detail, form, dan reset subnav detail ke Overview.
  document.querySelector('#backToRooms')?.addEventListener('click', () => {
    state.adminRoomDetail = null;
    state.isRoomCreateOpen = false;
    state.activeRoomDetailSection = 'overview';
    pushKamarRoute('');
  });

  // Event detail penghuni/penyewa: membuka halaman detail orang dari list admin.
  document.querySelectorAll('[data-admin-detail]').forEach((button) => {
    button.addEventListener('click', () => {
      state.adminDetailType = button.dataset.adminDetail;
      state.adminDetailIndex = Number(button.dataset.adminDetailIndex || 0);
      renderApp();
    });
  });

  // Event kembali dari detail orang: menghapus index detail sehingga list muncul kembali.
  document.querySelectorAll('#backToAdminList, #backToAdminListSecondary').forEach((button) => {
    button.addEventListener('click', () => {
      state.adminDetailType = '';
      state.adminDetailIndex = null;
      renderApp();
    });
  });

  // Event form detail admin: placeholder update detail orang; saat ini data utama tetap dari backend aplikasi.
  document.querySelector('#adminDetailForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    showToast('Perubahan belum tersimpan (endpoint belum aktif).');
    state.adminDetailType = '';
    state.adminDetailIndex = null;
    renderApp();
  });

  // Event refresh payment: sinkron ulang admin-state dan telemetry IoT dari backend.
  document.querySelector('#refreshPayments')?.addEventListener('click', async () => {
    showToast('Mengambil data pembayaran dari backend...');
    await syncAdminState(true);
    try {
      const iot = await apiJson('iot-ingest.php');
      window.localStorage.setItem('onyx-iot-telemetry', JSON.stringify(iot.data || []));
    } catch (error) {}
    showToast('Data pembayaran admin sudah disinkronkan.');
  });

  // Event approve pembayaran: admin menyetujui bukti transfer manual.
  document.querySelectorAll('[data-approve-payment]').forEach((button) => button.addEventListener('click', async () => {
    const { resident, proofs } = getAdminApplicationState();
    const proofId = button.dataset.proofId || button.dataset.approvePayment;
    const proof = proofs.find((item) => String(item.id || '') === String(proofId || '')) || JSON.parse(window.localStorage.getItem('onyx-payment-proof') || 'null');
    if (proof) {
      const updatedProof = { ...proof, status: 'approved', action: 'approve', application_id: proof.application_id || resident?.id, reviewedAt: new Date().toISOString() };
      try { await apiJson('payment-proof.php', { method: 'POST', body: JSON.stringify(updatedProof) }); } catch (error) { showToast('Backend proof belum tersambung, approve disimpan lokal.'); }
      window.localStorage.setItem('onyx-payment-proof', JSON.stringify(updatedProof));
    }
    if (resident) window.localStorage.setItem('onyx-resident-account', JSON.stringify({ ...resident, administrationStatus: 'Dikonfirmasi Admin', applicationStatus: 'Approved' }));
    await syncAdminState(false);
    showToast('Bukti transfer disetujui. Status administrasi diperbarui.');
    renderApp();
  }));

  // Event reject pembayaran: admin menolak bukti transfer dan meminta upload ulang.
  document.querySelectorAll('[data-reject-payment]').forEach((button) => button.addEventListener('click', async () => {
    const { resident, proofs } = getAdminApplicationState();
    const proofId = button.dataset.proofId || button.dataset.rejectPayment;
    const proof = proofs.find((item) => String(item.id || '') === String(proofId || '')) || JSON.parse(window.localStorage.getItem('onyx-payment-proof') || 'null');
    if (proof) {
      const updatedProof = { ...proof, status: 'rejected', action: 'reject', application_id: proof.application_id || resident?.id, reviewedAt: new Date().toISOString() };
      try { await apiJson('payment-proof.php', { method: 'POST', body: JSON.stringify(updatedProof) }); } catch (error) { showToast('Backend proof belum tersambung, reject disimpan lokal.'); }
      window.localStorage.setItem('onyx-payment-proof', JSON.stringify(updatedProof));
    }
    await syncAdminState(false);
    showToast('Bukti transfer ditolak. Penghuni perlu upload ulang.');
    renderApp();
  }));

  // Event upload bukti manual: resident mengirim bukti transfer ke backend payment-proof.
  document.querySelector('#manualProofForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    let resident = JSON.parse(window.localStorage.getItem('onyx-resident-account') || '{}');
    const file = form.get('proofFile');
    if (!resident.id) {
      const fallbackId = createLocalApplicationId();
      resident = { ...resident, id: fallbackId, application_id: fallbackId };
      window.localStorage.setItem('onyx-resident-account', JSON.stringify(resident));
      try {
        const savedApplication = await apiJson('resident-application.php', { method: 'POST', body: JSON.stringify({
          id: fallbackId,
          application_id: fallbackId,
          name: resident.name || 'Calon penghuni',
          phone: resident.phone || '',
          email: resident.email || '',
          nik: resident.nik || '',
          address: resident.address || '',
          occupation: resident.occupation || '',
          room: resident.room || '',
          leaseType: resident.leaseType || 'Bulanan',
          duration: resident.duration || 1,
          startDate: resident.startDate || new Date().toISOString().slice(0, 10),
          endDate: resident.endDate || calculateLeaseEnd(new Date().toISOString().slice(0, 10), resident.leaseType || 'Bulanan', resident.duration || 1),
          monthlyBudget: resident.monthlyBudget || 0,
          deposit: resident.deposit || 0,
          emergencyContact: resident.emergencyContact || '',
          refundBank: resident.refundBank || '',
          refundAccount: resident.refundAccount || '',
          refundAccountName: resident.refundAccountName || '',
          notes: resident.notes || '',
          applicationStatus: resident.applicationStatus || 'Menunggu Review',
          administrationStatus: resident.administrationStatus || 'Belum Dibayar',
        }) });
        resident = { ...resident, ...(savedApplication.data || {}) };
        if (!resident.id) resident.id = fallbackId;
        window.localStorage.setItem('onyx-resident-account', JSON.stringify(resident));
      } catch (error) {
        showToast('Upload dilanjutkan memakai ID lokal.');
      }
    }
    const proof = {
      invoice: 'ADM-' + new Date().getFullYear(),
      application_id: resident.id || '',
      residentName: resident.name || 'Calon penghuni',
      room: resident.room || '-',
      senderBank: String(form.get('senderBank') || '').trim(),
      senderName: String(form.get('senderName') || '').trim(),
      amount: String(form.get('amount') || '0'),
      fileName: file?.name || JSON.parse(window.localStorage.getItem('onyx-payment-proof') || 'null')?.fileName || 'bukti-transfer',
      status: 'uploaded',
      uploadedAt: new Date().toISOString(),
    };
    try {
      let saved;
      if (file?.name) {
        const payload = new FormData();
        Object.entries(proof).forEach(([key, value]) => payload.append(key, value));
        payload.append('proofFile', file);
        state.manualProofUploadProgress = 1;
        renderApp();
        saved = await uploadPaymentProof(payload, (progress) => {
          state.manualProofUploadProgress = progress;
          const bar = document.querySelector('.upload-progress-card .pending-progress-track i');
          const label = document.querySelector('.upload-progress-card strong');
          if (bar) bar.style.width = `${progress}%`;
          if (label) label.textContent = `${progress}%`;
        });
      } else {
        state.manualProofUploadProgress = 35;
        renderApp();
        saved = await apiJson('payment-proof.php', { method: 'POST', body: JSON.stringify(proof) });
        state.manualProofUploadProgress = 100;
      }
      Object.assign(proof, saved.data || {});
      if (saved.application) {
        resident = { ...resident, ...saved.application };
        window.localStorage.setItem('onyx-resident-account', JSON.stringify(resident));
      }
    } catch (error) {
      showToast('Backend proof belum tersambung, bukti disimpan lokal sementara.');
    } finally {
      state.manualProofUploadProgress = null;
    }
    window.localStorage.setItem('onyx-payment-proof', JSON.stringify(proof));
    window.localStorage.setItem('onyx-resident-account', JSON.stringify({ ...resident, administrationStatus: 'Menunggu Konfirmasi Admin' }));
    await syncAdminState(true);
    showToast('Bukti transfer disimpan. Menunggu konfirmasi admin.');
    renderApp();
  });

  // Event menu resident: memisahkan overview, billing, access, utility, dan service.
  document.querySelectorAll('[data-resident-section]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      state.activeResidentSection = link.dataset.residentSection;
      renderApp();
    });
  });

  // Event bayar invoice: membuat payment link BAYAR GG dari invoice resident.
  document.querySelectorAll('[data-pay-invoice]').forEach((button) => {
    button.addEventListener('click', async () => {
      const resident = JSON.parse(window.localStorage.getItem('onyx-resident-account') || '{}');
      showToast(`Membuat payment link ${button.dataset.payInvoice}...`);
      try {
        const response = await fetch(apiUrl('payment-create.php'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: Number(button.dataset.payAmount || 0),
            application_id: resident.id || '',
            description: `${button.dataset.payItem} - ${button.dataset.payInvoice}`,
            customer_name: resident.name || 'Penghuni Onyx',
            customer_email: resident.email || '',
            customer_phone: resident.phone || '',
            redirect_url: window.location.href,
          }),
        });
        const data = await response.json();
        const payment = data.data || data;
        if (payment.payment_url) {
          window.localStorage.setItem('onyx-last-payment', JSON.stringify(payment));
          window.open(payment.payment_url, '_blank', 'noopener,noreferrer');
          showToast('Payment link BAYAR GG dibuka.');
        } else {
          if (data.code === 'PAYMENT_METHOD_LIMIT') {
            state.manualTransferInvoice = {
              code: button.dataset.payInvoice,
              item: button.dataset.payItem,
              amount: rupiah(Number(button.dataset.payAmount || 0)),
            };
            renderApp();
          }
          showToast(data.message || data.error || 'Gagal membuat payment link.');
        }
      } catch (error) {
        showToast('Gagal menghubungi backend payment.');
      }
    });
  });

  // Event fallback transfer: membuka modal transfer manual untuk invoice tertentu.
  document.querySelectorAll('[data-transfer-invoice]').forEach((button) => {
    button.addEventListener('click', () => {
      state.manualTransferInvoice = {
        code: button.dataset.transferInvoice,
        item: button.dataset.transferItem,
        amount: button.dataset.transferAmount,
      };
      renderApp();
    });
  });

  document.querySelector('#closeTransferModal')?.addEventListener('click', () => {
    state.manualTransferInvoice = null;
    renderApp();
  });

  document.querySelector('[data-pending-transfer]')?.addEventListener('click', () => {
    const resident = JSON.parse(window.localStorage.getItem('onyx-resident-account') || '{}');
    const total = Number(resident.monthlyBudget || 0) + Number(resident.deposit || 0);
    state.manualTransferInvoice = {
      code: 'ADM-' + new Date().getFullYear(),
      item: 'Deposit + Sewa Awal',
      amount: total ? rupiah(total) : '-',
    };
    renderApp();
  });

  // Event QRIS pending resident: membuat link QRIS part berikutnya untuk administrasi awal.
  document.querySelector('[data-pending-qris]')?.addEventListener('click', async () => {
    const resident = JSON.parse(window.localStorage.getItem('onyx-resident-account') || '{}');
    const total = Number(resident.monthlyBudget || 0) + Number(resident.deposit || 0);
    const paidParts = JSON.parse(window.localStorage.getItem('onyx-qris-parts') || '[]');
    const parts = splitPaymentParts(total);
    const nextIndex = parts.findIndex((_, index) => !paidParts.includes(index));
    const partIndex = nextIndex >= 0 ? nextIndex : 0;
    const partAmount = parts[partIndex] || total;
    showToast(`Membuat QRIS part ${partIndex + 1} sebesar ${rupiah(partAmount)}...`);
    try {
      const response = await fetch(apiUrl('payment-create.php'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: partAmount,
          application_id: resident.id || '',
          description: `Administrasi awal Onyx Residence - Part ${partIndex + 1}/${parts.length}`,
          customer_name: resident.name || 'Calon penghuni Onyx',
          customer_email: resident.email || '',
          customer_phone: resident.phone || '',
          redirect_url: window.location.href,
        }),
      });
      const data = await response.json();
      const payment = data.data || data;
      if (payment.payment_url) {
        window.localStorage.setItem('onyx-qris-parts', JSON.stringify([...new Set([...paidParts, partIndex])]));
        window.open(payment.payment_url, '_blank', 'noopener,noreferrer');
        showToast(`Payment link QRIS part ${partIndex + 1} dibuka.`);
      } else {
        state.manualTransferInvoice = { code: 'ADM-' + new Date().getFullYear(), item: 'Deposit + Sewa Awal', amount: total ? rupiah(total) : '-' };
        renderApp();
        showToast(data.message || data.error || 'QRIS belum tersedia untuk nominal ini. Gunakan transfer manual.');
      }
    } catch (error) {
      showToast('Gateway offline — gunakan transfer manual.');
    }
  });

  // Event QRIS admin: admin membuat link split QRIS per part dari halaman Payment Review.
  document.querySelectorAll('[data-qris-part]').forEach((button) => {
    button.addEventListener('click', async () => {
      const { resident } = getAdminApplicationState();
      const partIndex = Number(button.dataset.qrisPart || 0);
      const partAmount = Number(button.dataset.qrisAmount || 0);
      showToast(`Membuat QRIS part ${partIndex + 1}...`);
      try {
        const response = await fetch(apiUrl('payment-create.php'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: partAmount,
            application_id: resident.id || '',
            description: `Administrasi awal Onyx Residence - Part ${partIndex + 1}`,
            customer_name: resident.name || 'Calon penghuni Onyx',
            customer_email: resident.email || '',
            customer_phone: resident.phone || '',
            redirect_url: window.location.href,
          }),
        });
        const data = await response.json();
        const payment = data.data || data;
        if (payment.payment_url) {
          const paidParts = JSON.parse(window.localStorage.getItem('onyx-qris-parts') || '[]');
          window.localStorage.setItem('onyx-qris-parts', JSON.stringify([...new Set([...paidParts, partIndex])]));
          window.open(payment.payment_url, '_blank', 'noopener,noreferrer');
          showToast(`Payment link QRIS part ${partIndex + 1} dibuka.`);
        } else {
          showToast(data.message || data.error || 'QRIS part gagal dibuat.');
        }
      } catch (error) {
        showToast('Payment gateway belum bisa dihubungi. Gunakan transfer manual.');
      }
    });
  });

  // Event smart lock: resident membuka/mengunci akses kamar dan log dikirim ke backend.
  document.querySelector('#toggleSmartLock')?.addEventListener('click', async () => {
    const accessState = JSON.parse(window.localStorage.getItem('onyx-access-state') || '{"locked":true,"guestPass":"QR-ONYX-5274","validUntil":"22:00"}');
    accessState.locked = !accessState.locked;
    accessState.updatedAt = new Date().toISOString();
    window.localStorage.setItem('onyx-access-state', JSON.stringify(accessState));
    saveAccessLog(accessState.locked ? 'Door locked by resident' : 'Door unlocked by resident', 'Manual button tap', accessState.locked ? 'secure' : 'open');
    await saveAccessStateToBackend(accessState, accessState.locked ? 'Door locked by resident' : 'Door unlocked by resident', 'Manual button tap', accessState.locked ? 'secure' : 'open');
    showToast(accessState.locked ? 'Smart lock dikunci.' : 'Smart lock dibuka selama 30 detik.');
    renderApp();
  });

  // Event smart room resident: tombol lampu/AC/kipas/suhu mengubah device state kamar aktif.
  document.querySelectorAll('[data-device-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const deviceState = getRoomDeviceState();
      const action = button.dataset.deviceAction;
      if (action === 'toggle-light') {
        deviceState.lightOn = !deviceState.lightOn;
        saveAccessLog(deviceState.lightOn ? 'Lampu dinyalakan' : 'Lampu dimatikan', 'Smart room panel', deviceState.lightOn ? 'on' : 'off');
        showToast(deviceState.lightOn ? 'Lampu kamar dinyalakan.' : 'Lampu kamar dimatikan.');
      }
      if (action === 'toggle-ac') {
        deviceState.acOn = !deviceState.acOn;
        saveAccessLog(deviceState.acOn ? 'AC dinyalakan' : 'AC dimatikan', `Set suhu ${deviceState.temperature || 24}°C`, deviceState.acOn ? 'on' : 'off');
        showToast(deviceState.acOn ? `AC dinyalakan ${deviceState.temperature || 24}°C.` : 'AC dimatikan.');
      }
      if (action === 'toggle-fan') {
        deviceState.fanOn = !deviceState.fanOn;
        saveAccessLog(deviceState.fanOn ? 'Kipas dinyalakan' : 'Kipas dimatikan', 'Smart room panel', deviceState.fanOn ? 'on' : 'off');
        showToast(deviceState.fanOn ? 'Kipas kamar dinyalakan.' : 'Kipas kamar dimatikan.');
      }
      if (action === 'temp-down') {
        deviceState.temperature = Math.max(18, Number(deviceState.temperature || 24) - 1);
        saveAccessLog('Suhu AC diturunkan', `${deviceState.temperature}°C`, 'updated');
        showToast(`Suhu AC ${deviceState.temperature}°C.`);
      }
      if (action === 'temp-up') {
        deviceState.temperature = Math.min(30, Number(deviceState.temperature || 24) + 1);
        saveAccessLog('Suhu AC dinaikkan', `${deviceState.temperature}°C`, 'updated');
        showToast(`Suhu AC ${deviceState.temperature}°C.`);
      }
      saveRoomDeviceState(deviceState);
      renderApp();
    });
  });

  // Event slider suhu: mengubah temperatur AC dari input range.
  document.querySelector('[data-device-temperature]')?.addEventListener('input', (event) => {
    const deviceState = getRoomDeviceState();
    deviceState.temperature = Number(event.target.value || 24);
    saveRoomDeviceState(deviceState);
    saveAccessLog('Suhu AC disetel', `${deviceState.temperature}°C`, 'updated');
    showToast(`Suhu AC ${deviceState.temperature}°C.`);
    renderApp();
  });

  // Event QR tamu: membuka modal QR akses visitor.
  document.querySelector('#shareVisitorQr')?.addEventListener('click', () => {
    const accessState = JSON.parse(window.localStorage.getItem('onyx-access-state') || '{"locked":true,"guestPass":"QR-ONYX-5274","validUntil":"22:00"}');
    state.isQrModalOpen = true;
    saveAccessLog('Visitor QR opened', `QR ${accessState.guestPass} displayed`, 'shown');
    renderApp();
  });

  document.querySelector('#openVisitorQr')?.addEventListener('click', () => {
    const accessState = JSON.parse(window.localStorage.getItem('onyx-access-state') || '{"locked":true,"guestPass":"QR-ONYX-5274","validUntil":"22:00"}');
    state.isQrModalOpen = true;
    saveAccessLog('Visitor QR opened', `QR ${accessState.guestPass} displayed`, 'shown');
    renderApp();
  });

  document.querySelector('#closeVisitorQr')?.addEventListener('click', () => {
    state.isQrModalOpen = false;
    renderApp();
  });

  // Event copy akses: menyalin WiFi/QR ke clipboard dengan fallback localStorage.
  document.querySelectorAll('[data-copy-value]').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copyValue || '';
      const action = button.dataset.accessAction || 'copy-access';
      const actionLabels = {
        'copy-wifi': ['WiFi credential copied', 'Resident copied WiFi detail', 'copied'],
        'copy-qr': ['Visitor QR copied', 'Guest pass copied', 'copied'],
        'share-qr': ['Visitor QR shared', 'Guest pass prepared', 'shared'],
      };
      const [logAction, logDetail, logStatus] = actionLabels[action] || ['Access data copied', 'Resident copied access info', 'copied'];
      try {
        await navigator.clipboard.writeText(value);
        saveAccessLog(logAction, logDetail, logStatus);
        showToast('Data akses disalin ke clipboard.');
      } catch (error) {
        window.localStorage.setItem('onyx-last-copied-access', value);
        saveAccessLog(logAction, `${logDetail} · tersimpan lokal`, logStatus);
        showToast('Clipboard dibatasi browser. Data disimpan lokal.');
      }
      if (state.activeResidentSection === 'access') renderApp();
    });
  });

  // Event print receipt resident: membuka dialog cetak bukti pembayaran.
  document.querySelector('#printResidentReceipt')?.addEventListener('click', () => {
    window.print();
    showToast('Membuka dialog print bukti pembayaran.');
  });

  // Event tiket service: membuka modal pembuatan tiket perbaikan/keluhan.
  document.querySelector('#newResidentTicket')?.addEventListener('click', () => {
    state.isTicketModalOpen = true;
    renderApp();
  });

  document.querySelector('#closeTicketModal')?.addEventListener('click', () => {
    state.isTicketModalOpen = false;
    renderApp();
  });

  // Event submit tiket: mengirim keluhan resident ke service-ticket.php.
  document.querySelector('#residentTicketForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const issue = String(form.get('issue') || '').trim();
    if (!issue) return;
    const ticket = {
      id: `TKT-${Date.now()}`,
      application_id: getCurrentResident().id || '',
      category: String(form.get('category') || 'Service'),
      priority: String(form.get('priority') || 'Normal'),
      issue,
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    const tickets = JSON.parse(window.localStorage.getItem('onyx-resident-tickets') || '[]');
    tickets.unshift(ticket);
    try { await apiJson('service-ticket.php', { method: 'POST', body: JSON.stringify(ticket) }); } catch (error) { showToast('Backend tiket belum tersambung, tiket disimpan lokal sementara.'); }
    window.localStorage.setItem('onyx-resident-tickets', JSON.stringify(tickets));
    state.isTicketModalOpen = false;
    showToast('Tiket service berhasil dibuat.');
    renderApp();
  });

  // Event pencarian kamar: filter list kamar berdasarkan nomor atau nama kamar.
  document.querySelector('#adminRoomSearchProxy')?.addEventListener('input', (event) => {
    state.roomQuery = event.currentTarget.value;
    renderApp();
    const input = document.querySelector('#adminRoomSearchProxy');
    input?.focus();
    input?.setSelectionRange(state.roomQuery.length, state.roomQuery.length);
  });

  document.querySelector('#typeFilter')?.addEventListener('change', (event) => {
    state.roomType = event.currentTarget.value;
    renderApp();
  });

  document.querySelector('#statusFilter')?.addEventListener('change', (event) => {
    state.roomStatus = event.currentTarget.value;
    renderApp();
  });

  // Event CRUD kamar create/update: simpan data kamar ke backend kamar.php lalu fallback lokal jika backend mati.
  document.querySelector('#roomForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const categoryMap = { Standard: 1, Deluxe: 2, Suite: 3, VIP: 4 };
    const id = Number(form.get('id_kamar') || 0);
    const roomPayload = {
      ...(id ? { id_kamar: id } : {}),
      no_kamar: String(form.get('no_kamar') || '').trim(),
      id_kategori: categoryMap[String(form.get('kategori') || 'Standard')] || 1,
      nama_kamar: String(form.get('nama_kamar') || '').trim(),
      harga_per_bulan: Number(form.get('harga') || 0),
      fasilitas: String(form.get('fasilitas') || '').trim(),
      status: String(form.get('status') || 'tersedia'),
    };
    const localRoom = {
      id: id || Date.now(),
      no: roomPayload.no_kamar,
      name: roomPayload.nama_kamar,
      type: String(form.get('kategori') || 'Standard'),
      price: roomPayload.harga_per_bulan,
      status: roomPayload.status,
      floor: '-',
      facilities: roomPayload.fasilitas.split(',').map((item) => item.trim()).filter(Boolean),
    };
    const saveLocalRoom = () => {
      state.rooms = [...state.rooms.filter((room) => room.no !== localRoom.no && String(room.id) !== String(localRoom.id)), localRoom].sort((a, b) => String(a.no).localeCompare(String(b.no)));
      window.localStorage.setItem('onyx-rooms', JSON.stringify(state.rooms));
      state.isRoomCreateOpen = false;
      state.adminRoomDetail = localRoom.no;
      pushKamarRoute(encodeURIComponent(localRoom.no));
    };
    apiJson('kamar.php', { method: id ? 'PATCH' : 'POST', body: JSON.stringify(roomPayload) })
      .then(() => syncRooms(true))
      .then(() => {
        state.isRoomCreateOpen = false;
        state.adminRoomDetail = roomPayload.no_kamar;
        showToast('Kamar tersimpan. Book dan price list ikut update.');
        pushKamarRoute(encodeURIComponent(roomPayload.no_kamar));
      })
      .catch(() => {
        saveLocalRoom();
        showToast('Backend offline — kamar disimpan lokal.');
      });
  });

  // Event utility meter: admin mencatat kWh, air, tarif, dan total tagihan kamar.
  const handleUtilityMeterSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const selected = event.currentTarget.querySelector('select[name="application_id"]')?.selectedOptions[0];
    const payload = {
      application_id: String(form.get('application_id') || ''),
      residentName: selected?.dataset.name || String(form.get('residentName') || ''),
      room: selected?.dataset.room || String(form.get('room') || ''),
      month: String(form.get('month') || ''),
      electricKwh: Number(form.get('electricKwh') || 0),
      waterM3: Number(form.get('waterM3') || 0),
      electricRate: Number(form.get('electricRate') || 0),
      waterRate: Number(form.get('waterRate') || 0),
      fixedFee: Number(form.get('fixedFee') || 0),
      status: 'Pending',
    };
    try {
      await apiJson('utility-meter.php', { method: 'POST', body: JSON.stringify(payload) });
      await syncAdminState(true);
      showToast('Meter listrik dan air tersimpan ke kamar.');
    } catch (error) {
      showToast('Gagal menyimpan meter utilitas ke backend.');
    }
  };

  document.querySelector('#roomUtilityMeterForm')?.addEventListener('submit', handleUtilityMeterSubmit);

  // Event smart control admin: tombol di Detail Kamar mengubah lampu/AC/kipas/air per kamar.
  document.querySelectorAll('[data-admin-room-device]').forEach((button) => {
    button.addEventListener('click', () => {
      const roomCode = button.dataset.roomCode || 'default';
      const devices = getRoomDeviceState(roomCode);
      devices[button.dataset.adminRoomDevice] = !devices[button.dataset.adminRoomDevice];
      saveRoomDeviceState(devices, roomCode);
      showToast(`Kontrol kamar ${roomCode} diperbarui.`);
      renderApp();
    });
  });

  // Event suhu admin: slider AC di Detail Kamar menyimpan temperatur khusus kamar tersebut.
  document.querySelectorAll('[data-admin-room-temp]').forEach((input) => {
    input.addEventListener('input', () => {
      const roomCode = input.dataset.adminRoomTemp || 'default';
      const devices = getRoomDeviceState(roomCode);
      devices.temperature = Number(input.value || 24);
      saveRoomDeviceState(devices, roomCode);
      showToast(`Suhu AC ${roomCode}: ${devices.temperature}°C.`);
      renderApp();
    });
  });

  // Event print invoice: simpan invoice terpilih lalu buka dialog print browser.
  document.querySelectorAll('[data-print-invoice]').forEach((button) => {
    button.addEventListener('click', () => {
      const invoice = getResidentInvoices().find((item) => item.code === button.dataset.printInvoice) || {
        code: button.dataset.printInvoice,
        item: button.dataset.printItem,
        amount: button.dataset.printAmount,
        status: button.dataset.printStatus,
      };
      window.localStorage.setItem('onyx-selected-invoice', JSON.stringify(invoice));
      renderApp();
      window.setTimeout(() => window.print(), 80);
      showToast(`Print invoice ${invoice.code}.`);
    });
  });

  // Event print umum: tombol cetak halaman/kamar/invoice memakai fitur print bawaan browser.
  document.querySelectorAll('#printPage, #printRooms, #printInvoice').forEach((button) => button.addEventListener('click', () => window.print()));
}

/**
 * @description Mengaktifkan image sequence yang bergerak sesuai posisi scroll.
 * @returns {void}
 */
function initScrollSequences() {
  const sequenceCanvases = document.querySelectorAll('[data-sequence]');
  if (!sequenceCanvases.length) {
    if (window.__kostkuSequenceUpdate) window.removeEventListener('scroll', window.__kostkuSequenceUpdate);
    if (window.__kostkuSequenceResize) window.removeEventListener('resize', window.__kostkuSequenceResize);
    window.__kostkuSequenceUpdate = null;
    window.__kostkuSequenceResize = null;
    window.__kostkuSequencesReady = false;
    return;
  }
  if (window.__kostkuSequencesReady) return;
  const sequences = [
    { name: 'facade', folder: 'sequenze_1', total: 193, images: [], current: 1, loading: new Set() },
    { name: 'interior', folder: 'sequenze_2', total: 92, images: [], current: 1, loading: new Set() },
    { name: 'booking', folder: 'sequenze_3', total: 141, images: [], current: 1, loading: new Set() },
  ];
  sequences.forEach((sequence) => loadSequenceFrame(sequence, 1));
  scheduleSequencePreload(sequences);
  const update = () => {
    sequences.forEach((sequence) => drawSequenceFrame(sequence));
  };
  if (window.__kostkuSequenceUpdate) window.removeEventListener('scroll', window.__kostkuSequenceUpdate);
  if (window.__kostkuSequenceResize) window.removeEventListener('resize', window.__kostkuSequenceResize);
  let ticking = false;
  window.__kostkuSequenceUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      ticking = false;
      update();
    });
  };
  window.__kostkuSequenceResize = window.__kostkuSequenceUpdate;
  window.addEventListener('scroll', window.__kostkuSequenceUpdate, { passive: true });
  window.addEventListener('resize', window.__kostkuSequenceResize);
  window.__kostkuSequencesReady = true;
  update();
}
function drawSequenceFrame(sequence) {
  const canvas = document.querySelector(`[data-sequence="${sequence.name}"]`);
  const section = canvas?.closest('.tour-section');
  if (!(canvas instanceof HTMLCanvasElement) || !section) return;
  const rect = section.getBoundingClientRect();
  const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height - window.innerHeight)));
  const targetFrame = Math.max(1, Math.min(sequence.total, Math.floor(progress * (sequence.total - 1)) + 1));
  const eased = sequence.current + (targetFrame - sequence.current) * 0.28;
  sequence.current = Math.abs(targetFrame - eased) < 0.08 ? targetFrame : eased;
  const desiredFrame = Math.max(1, Math.min(sequence.total, Math.round(sequence.current)));
  prefetchActiveSequenceFrames(sequence, targetFrame);
  loadSequenceFrame(sequence, desiredFrame);
  const drawableFrame = getDrawableSequenceFrame(sequence, desiredFrame);
  const image = drawableFrame ? sequence.images[drawableFrame] : null;
  if (!image || !image.complete) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.floor(canvas.clientWidth * dpr);
  const height = Math.floor(canvas.clientHeight * dpr);
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  const context = canvas.getContext('2d');
  if (!context) return;
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  context.clearRect(0, 0, width, height);
  sequence.lastDrawnFrame = drawableFrame;
  const focus = (window.matchMedia('(max-width: 640px)').matches && { facade: { x: 0.52, y: 0.5 }, interior: { x: 0.5, y: 0.52 }, booking: { x: 0.55, y: 0.5 } }[sequence.name]) || { x: 0.5, y: 0.5 };
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  const offsetX = Math.min(0, Math.max(width - drawWidth, width * focus.x - drawWidth * focus.x));
  const offsetY = Math.min(0, Math.max(height - drawHeight, height * focus.y - drawHeight * focus.y));
  context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
  if (Math.abs(targetFrame - sequence.current) >= 0.08) window.requestAnimationFrame(() => drawSequenceFrame(sequence));
}

function loadSequenceFrame(sequence, frame) {
  if (sequence.images[frame]) return sequence.images[frame];
  if (sequence.loading.has(frame)) return null;
  sequence.loading.add(frame);
  const image = new Image();
  image.decoding = 'async';
  image.onload = () => {
    sequence.loading.delete(frame);
    window.__kostkuSequenceUpdate?.();
  };
  image.onerror = () => sequence.loading.delete(frame);
  image.src = framePath(sequence.folder, frame);
  sequence.images[frame] = image;
  return image;
}

function prefetchActiveSequenceFrames(sequence, frame) {
  const radius = window.matchMedia('(max-width: 640px)').matches ? 6 : 10;
  for (let offset = 0; offset <= radius; offset += 1) {
    const before = frame - offset;
    const after = frame + offset;
    if (before >= 1) loadSequenceFrame(sequence, before);
    if (offset && after <= sequence.total) loadSequenceFrame(sequence, after);
  }
}

function getDrawableSequenceFrame(sequence, frame) {
  const exact = sequence.images[frame];
  if (exact?.complete && exact.naturalWidth) return frame;
  for (let offset = 1; offset <= 18; offset += 1) {
    const before = frame - offset;
    const after = frame + offset;
    const beforeImage = before >= 1 ? sequence.images[before] : null;
    if (beforeImage?.complete && beforeImage.naturalWidth) return before;
    const afterImage = after <= sequence.total ? sequence.images[after] : null;
    if (afterImage?.complete && afterImage.naturalWidth) return after;
  }
  const lastDrawn = sequence.lastDrawnFrame ? sequence.images[sequence.lastDrawnFrame] : null;
  if (lastDrawn?.complete && lastDrawn.naturalWidth) return sequence.lastDrawnFrame;
  const first = sequence.images[1];
  return first?.complete && first.naturalWidth ? 1 : null;
}

function scheduleSequencePreload(sequences) {
  const start = () => {
    if ('requestIdleCallback' in window) window.requestIdleCallback(() => preloadSequenceFrames(sequences), { timeout: 1600 });
    else window.setTimeout(() => preloadSequenceFrames(sequences), 240);
  };
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}

function preloadSequenceFrames(sequences) {
  const maxTotal = Math.max(...sequences.map((sequence) => sequence.total));
  const queue = [];
  for (let frame = 1; frame <= maxTotal; frame += 1) {
    sequences.forEach((sequence) => {
      if (frame <= sequence.total) queue.push({ sequence, frame });
    });
  }
  const limit = Math.max(3, Math.min(6, Math.floor((navigator.hardwareConcurrency || 6) / 2)));
  let active = 0;
  const scheduleNext = () => {
    if ('requestIdleCallback' in window) window.requestIdleCallback(pump, { timeout: 1200 });
    else window.setTimeout(pump, 80);
  };
  const onSettled = () => {
    active -= 1;
    scheduleNext();
  };
  const pump = () => {
    while (active < limit && queue.length) {
      const { sequence, frame } = queue.shift();
      if (sequence.images[frame]?.complete) continue;
      const image = loadSequenceFrame(sequence, frame);
      if (!image || image.complete) continue;
      active += 1;
      image.addEventListener('load', onSettled, { once: true });
      image.addEventListener('error', onSettled, { once: true });
    }
  };
  pump();
}

/**
 * @description Path frame sequence dengan dukungan base URL CDN opsional.
 * @returns {string} Path frame JPG.
 */
function framePath(folder, frame) {
  const runtimeBaseUrl = typeof window.__ONYX_SEQUENCE_ASSET_BASE_URL === 'string' ? window.__ONYX_SEQUENCE_ASSET_BASE_URL : '';
  const buildBaseUrl = import.meta.env.VITE_ONYX_SEQUENCE_ASSET_BASE_URL || '';
  const baseUrl = String(runtimeBaseUrl || buildBaseUrl).trim().replace(/\/+$/, '');
  const relativePath = `${folder}/ezgif-frame-${String(frame).padStart(3, '0')}.jpg`;
  return baseUrl ? `${baseUrl}/${relativePath}` : `./${relativePath}`;
}

/**
 * @description Menampilkan toast ringkas untuk feedback panel.
 * @param {string} message Pesan yang ingin ditampilkan.
 * @returns {void}
 */
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.innerHTML = `<i class="fa-solid fa-circle-check" aria-hidden="true"></i><span>${escapeHtml(message)}</span>`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('is-visible'));
  window.setTimeout(() => {
    toast.classList.remove('is-visible');
    window.setTimeout(() => toast.remove(), 220);
  }, 2400);
}

// Sinkronisasi halaman saat hash URL diganti manual.
function syncRouteFromLocation() {
  const parsed = parseRoute();
  state.page = parsed.page;
  if (parsed.page === 'admin') applyAdminSection(parsed.adminSection, parsed.adminSub);
  renderApp();
}

window.addEventListener('hashchange', syncRouteFromLocation);
window.addEventListener('popstate', syncRouteFromLocation);

(() => {
  const parsed = parseRoute();
  if (parsed.page === 'admin') applyAdminSection(parsed.adminSection, parsed.adminSub);
})();
renderApp();