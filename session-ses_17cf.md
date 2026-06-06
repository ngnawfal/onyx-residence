# New session - 2026-06-01T11:59:12.472Z

**Session ID:** ses_17cf29fa7ffegR8yaEBPmPfsKa
**Created:** 6/1/2026, 6:59:12 PM
**Updated:** 6/2/2026, 6:24:08 PM

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 57.3s)

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src\\styles.css",
  "offset": 6080,
  "limit": 80
}
```

**Output:**
```
<path>C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\styles.css</path>
<type>file</type>
<content>
6080:     min-height: 2.28rem;
6081:     padding: .34rem .52rem;
6082:   }
6083:   .resident-ops-kpis article:last-child { grid-column: 1 / -1; }
6084:   .resident-ops-table__head { display: none; }
6085:   .resident-ops-table {
6086:     overflow: visible;
6087:     border: 0;
6088:     background: transparent;
6089:   }
6090:   .admin-person-row--hotel {
6091:     min-width: 0;
6092:     grid-template-columns: 2.85rem minmax(0, 1fr);
6093:     align-items: start;
6094:     margin-bottom: .8rem;
6095:     padding: .95rem 1rem;
6096:     border: 1px solid rgba(247,242,234,.12);
6097:     border-radius: 1rem;
6098:     background: rgba(10,12,18,.42);
6099:   }
6100:   .admin-person-row--hotel .resident-stay,
6101:   .admin-person-row--hotel .resident-billing,
6102:   .admin-person-row--hotel .tenant-type-label,
6103:   .admin-person-row--hotel .resident-status-chip {
6104:     grid-column: 2;
6105:   }
6106:   .smart-room-grid--detail .smart-room-control--wide { grid-column: auto; }
6107:   .access-hero-card--simple,
6108:   .access-info-stack--simple article { grid-template-columns: 1fr; }
6109:   .access-info-stack--simple .row-print-btn { grid-column: auto; grid-row: auto; }
6110:   .resident-saas-table--access p { grid-template-columns: 1fr; }
6111:   .resident-usage-chart p { grid-template-columns: 1fr; }
6112:   .resident-usage-chart p::before,
6113:   .resident-usage-chart i { grid-column: 1; grid-row: 2; }
6114:   .utility-chart { grid-template-columns: 1fr; }
6115:   .utility-chart__bars { height: 13rem; }
6116:   .workspace { padding: .7rem; }
6117:   .hero,
6118:   .section-panel,
6119:   .split-grid > .panel { padding: .78rem; }
6120:   .metrics,
6121:   .room-form,
6122:   .invoice-grid,
6123:   .admin-person-list article,
6124:   .admin-person-row,
6125:   .admin-detail-summary,
6126:   .admin-detail-form,
6127:   .toolbar,
6128:   .toolbar--filters-only { grid-template-columns: 1fr; justify-content: stretch; }
6129:   .search-field { grid-column: auto; }
6130:   .profile div { display: none; }
6131:   .room-row { grid-template-columns: 1fr; align-items: start; }
6132:   .room-price,
6133:   .room-row .badge,
6134:   .room-row .row-actions { justify-self: start; }
6135:   .room-toolbar-note,
6136:   .hero-actions,
6137:   .actions,
6138:   .form-actions { flex-direction: column; align-items: stretch; }
6139: }

(End of file - total 6139 lines)
</content>
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 61.7s)

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src\\main.js",
  "offset": 1548,
  "limit": 36
}
```

**Output:**
```
<path>C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\main.js</path>
<type>file</type>
<content>
1548:     const latestMeter = getUtilityMeters().find((item) => getRoomCode(item.room) === room.no) || {};
1549:     const climateType = getRoomClimateType(room);
1550:     const climateLabel = climateType === 'ac' ? `AC ${devices.acOn ? `${devices.temperature}°C` : 'mati'}` : climateType === 'fan' ? `Kipas ${devices.fanOn ? 'menyala' : 'mati'}` : 'Ventilasi manual';
1551:     const utilityLabel = latestMeter.month ? `${latestMeter.month}: ${Number(latestMeter.electricKwh || 0)} kWh, ${Number(latestMeter.waterM3 || 0)} m³, ${rupiah(Number(latestMeter.totalAmount || 0))}` : 'Belum ada input meter';
1552: 
1553:     return `<tr><td><strong>${escapeHtml(room.no)}</strong><span>${escapeHtml(room.floor || '-')}</span></td><td><b>${escapeHtml(room.name)}</b><small>${escapeHtml(room.type)} · ${escapeHtml((room.facilities || []).join(', ') || 'Fasilitas belum diisi')}</small></td><td>${rupiah(Number(room.price || 0))}<small>/ bulan</small></td><td><b>${status === 'terisi' ? 'Tidak tersedia' : escapeHtml(status)}</b><small>${escapeHtml(occupant?.name || 'Kosong')}</small></td><td><b>${escapeHtml(climateLabel)}</b><small>Lampu ${devices.lightOn ? 'menyala' : 'mati'} · Air ${devices.waterOn ? 'aktif' : 'nonaktif'}</small></td><td><b>${escapeHtml(utilityLabel)}</b><small>${telemetry?.created_at ? `IoT ${escapeHtml(telemetry.created_at)}` : 'Manual/standby'}</small></td></tr>`;
1554:   }).join('');
1555: 
1556:   return `<section class="room-print-report" aria-label="Laporan cetak kamar"><header><div><span>Onyx Residence</span><h2>Laporan Inventory Kamar</h2><p>Ringkasan status kamar, penghuni aktif, fasilitas, smart control, dan meter utilitas.</p></div><aside><b>${escapeHtml(generatedAt)}</b><small>Dicetak oleh Admin</small></aside></header><div class="room-print-summary"><article><span>Total kamar</span><strong>${occupancy.totalRooms}</strong></article><article><span>Terisi</span><strong>${occupancy.occupiedRooms}</strong></article><article><span>Tersedia</span><strong>${occupancy.availableRooms}</strong></article><article><span>Occupancy</span><strong>${occupancy.occupancyPercent}%</strong></article></div><table><thead><tr><th>Kamar</th><th>Detail</th><th>Harga</th><th>Status</th><th>Smart Control</th><th>Utilitas</th></tr></thead><tbody>${rows || '<tr><td colspan="6">Tidak ada kamar yang cocok dengan filter.</td></tr>'}</tbody></table><footer><span>Catatan</span><p>Status terisi mengikuti penghuni approved. Meter utilitas memakai input terbaru per kamar jika tersedia.</p></footer></section>`;
1557: }
1558: 
1559: /**
1560:  * @description Render satu baris kamar dengan aksi CRUD.
1561:  * @param {object} room Data kamar.
1562:  * @returns {string} Markup row kamar.
1563:  */
1564: function renderRoomRow(room) {
1565:   const status = getEffectiveRoomStatus(room);
1566:   return `<article class="room-row"><div class="room-code"><strong>${room.no}</strong><span>${room.floor}</span></div><div class="room-main"><h4>${escapeHtml(room.name)}</h4><p>${room.type} · ${room.facilities.map(escapeHtml).join(', ')}</p></div><div class="room-price"><strong>${rupiah(room.price)}</strong><span>/ bulan</span></div><span class="badge ${status}">${status === 'terisi' ? 'tidak tersedia' : status}</span><div class="row-actions row-actions--text no-print"><button type="button" data-room-edit="${escapeHtml(room.no)}" aria-label="Edit ${room.no}"><i class="fa-regular fa-pen-to-square"></i>Edit</button><button type="button" data-room-delete="${escapeHtml(room.no)}" aria-label="Hapus ${room.no}"><i class="fa-regular fa-trash-can"></i>Hapus</button></div></article>`;
1567: }
1568: 
1569: function renderRoomCreatePage() {
1570:   return `<section class="admin-flat-panel admin-page-panel room-detail-panel"><div class="panel-head wrap"><div><span>Tambah Kamar</span><h3>Inventory kamar baru</h3></div><button class="button subtle" type="button" id="backToRooms"><i class="fa-solid fa-arrow-left"></i>Kembali</button></div>${renderRoomEditorForm()}</section>`;
1571: }
1572: 
1573: function renderRoomEditorForm(room = null) {
1574:   return `<form class="room-form no-print room-editor-form" id="roomForm"><div class="form-title"><h4>${room ? 'Edit kamar' : 'Tambah kamar'}</h4><span>Data inventory kamar tersimpan tanpa mengacak list utama.</span></div><input type="hidden" name="id_kamar" value="${escapeHtml(room?.id || '')}" /><label>Nomor<input required name="no_kamar" value="${escapeHtml(room?.no || '')}" placeholder="A09" /></label><label>Kategori<select required name="kategori">${['Standard', 'Deluxe', 'Suite', 'VIP'].map((type) => `<option ${room?.type === type ? 'selected' : ''}>${type}</option>`).join('')}</select></label><label>Nama kamar<input required name="nama_kamar" value="${escapeHtml(room?.name || '')}" placeholder="Onyx Studio" /></label><label>Harga<input required name="harga" type="number" min="0" value="${escapeHtml(room?.price || '')}" placeholder="3100000" /></label><label>Status<select name="status">${['tersedia', 'terisi', 'maintenance'].map((status) => `<option ${getEffectiveRoomStatus(room || {}) === status ? 'selected' : ''}>${status}</option>`).join('')}</select></label><label class="full">Fasilitas<textarea name="fasilitas" placeholder="AC, WiFi, kamar mandi dalam">${escapeHtml((room?.facilities || []).join(', '))}</textarea></label><div class="form-actions full"><button class="button primary" type="submit">Simpan</button><button class="button subtle" type="button" id="closeRoomEditor">Batal</button></div></form>`;
1575: }
1576: 
1577: function renderRoomUtilityForm(room, occupant = null) {
1578:   const month = new Date().toISOString().slice(0, 7);
1579:   return `<form class="room-utility-form no-print" id="roomUtilityMeterForm"><div><span>Input Meter</span><h4>Catat listrik, air, dan tagihan</h4><p>Data masuk ke billing penghuni dan histori meter kamar ini.</p></div><input type="hidden" name="application_id" value="${escapeHtml(occupant?.id || '')}" /><input type="hidden" name="room" value="${escapeHtml(room.no)}" /><input type="hidden" name="residentName" value="${escapeHtml(occupant?.name || '')}" /><label>Bulan<input name="month" type="month" value="${month}" required /></label><label>Listrik kWh<input name="electricKwh" type="number" min="0" step="0.1" placeholder="0" required /></label><label>Air m³<input name="waterM3" type="number" min="0" step="0.1" placeholder="0" required /></label><label>Tarif listrik/kWh<input name="electricRate" type="number" min="0" value="1500" required /></label><label>Tarif air/m³<input name="waterRate" type="number" min="0" value="8000" required /></label><label>Biaya tetap<input name="fixedFee" type="number" min="0" value="0" /></label><button class="button primary" type="submit">Simpan Meter</button></form>`;
1580: }
1581: 
1582: function renderRoomDetailPanel(room) {
1583:   if (!room) return `<section class="admin-flat-panel admin-page-panel"><button class="button subtle" type="button" id="backToRooms"><i class="fa-solid fa-arrow-left"></i>Kembali</button></section>`;

(Showing lines 1548-1583 of 3139. Use offset=1584 to continue.)
</content>
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 58.2s)

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src\\main.js",
  "offset": 897,
  "limit": 36
}
```

**Output:**
```
<path>C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\main.js</path>
<type>file</type>
<content>
897:  * @param {string} action Nama aktivitas.
898:  * @param {string} detail Detail aktivitas.
899:  * @param {string} status Status aktivitas.
900:  * @returns {void}
901:  */
902: function saveAccessLog(action, detail, status) {
903:   const logs = JSON.parse(window.localStorage.getItem('onyx-access-logs') || '[]');
904:   logs.unshift({ time: formatAccessTime(), action, detail, status });
905:   window.localStorage.setItem('onyx-access-logs', JSON.stringify(logs.slice(0, 12)));
906: }
907: 
908: /**
909:  * @description Membuat QR visual sederhana dari string guest pass tanpa library eksternal.
910:  * @param {string} value Nilai guest pass.
911:  * @returns {string} Markup kotak QR palsu untuk demo.
912:  */
913: function renderVisitorQr(value) {
914:   const seed = [...value].reduce((total, char) => total + char.charCodeAt(0), 0);
915:   return Array.from({ length: 81 }, (_, index) => {
916:     const row = Math.floor(index / 9);
917:     const col = index % 9;
918:     const isCorner = (row < 3 && col < 3) || (row < 3 && col > 5) || (row > 5 && col < 3);
919:     const isFilled = isCorner || ((row * 7 + col * 11 + seed) % 4 !== 0);
920:     return `<i class="${isFilled ? 'is-filled' : ''}"></i>`;
921:   }).join('');
922: }
923: 
924: /**
925:  * @description Menentukan halaman awal dari hash URL.
926:  * @returns {'public'|'info'|'booking'|'login'|'register'|'resident'|'admin'} Nama halaman awal.
927:  */
928: function getInitialPage() {
929:   const hash = window.location.hash.replace('#', '');
930:   if (hash === 'info') return 'info';
931:   if (hash === 'booking') return 'booking';
932:   if (hash === 'login') return 'login';

(Showing lines 897-932 of 3139. Use offset=933 to continue.)
</content>
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 48.9s)

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src\\main.js",
  "offset": 1599,
  "limit": 32
}
```

**Output:**
```
<path>C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\main.js</path>
<type>file</type>
<content>
1599:   const overviewPage = `<article class="room-detail-card room-detail-card--wide"><div class="room-detail-card__head"><div><span>Overview</span><h4>Informasi kamar</h4></div></div><div class="room-detail-list"><p><span>Status</span><strong>${effectiveStatus === 'terisi' ? 'Tidak tersedia' : escapeHtml(effectiveStatus)}</strong></p><p><span>Tipe</span><strong>${escapeHtml(room.type)}</strong></p><p><span>Fasilitas</span><strong>${facilityList}</strong></p><p><span>Penghuni</span><strong>${escapeHtml(occupant?.name || 'Kosong')}</strong></p><p><span>WiFi</span><strong>ONYX-${escapeHtml(room.no)}</strong></p></div></article>`;
1600:   const controlPage = `<article class="room-detail-card room-detail-card--wide"><div class="room-detail-card__head"><div><span>Smart Control</span><h4>Perangkat kamar</h4></div><small>${telemetry?.created_at ? `IoT ${escapeHtml(telemetry.created_at)}` : 'Manual mode'}</small></div><div class="room-detail-control-list"><p><span><i class="fa-solid fa-lightbulb"></i> Lampu</span><strong>${devices.lightOn ? 'Menyala' : 'Mati'}</strong><button class="row-print-btn ${devices.lightOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="lightOn" data-room-code="${escapeHtml(room.no)}">${devices.lightOn ? 'Matikan' : 'Nyalakan'}</button></p><p><span><i class="fa-solid fa-faucet-drip"></i> Air</span><strong>${devices.waterOn ? 'Aktif' : 'Nonaktif'}</strong><button class="row-print-btn ${devices.waterOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="waterOn" data-room-code="${escapeHtml(room.no)}">${devices.waterOn ? 'Matikan' : 'Nyalakan'}</button></p>${climateRows}</div></article>`;
1601:   const meterPage = `<article class="room-detail-card room-detail-card--wide room-detail-card--meter"><div class="room-detail-card__head"><div><span>Meter</span><h4>Pemakaian & tagihan</h4></div></div><div class="room-meter-line"><p><span>Listrik</span><strong>${telemetry ? `${Number(telemetry.powerWatt || 0)} W` : `${Number(latest.electricKwh || 0)} kWh`}</strong><small>${telemetry ? `${Number(telemetry.energyKwh || 0)} kWh` : 'Meter admin'}</small></p><p><span>Air</span><strong>${telemetry ? `${Number(telemetry.waterM3 || 0)} m³` : `${Number(latest.waterM3 || 0)} m³`}</strong><small>${devices.waterOn ? 'Valve aktif' : 'Valve nonaktif'}</small></p><p><span>Tagihan</span><strong>${latest.totalAmount ? rupiah(Number(latest.totalAmount)) : 'Belum ada'}</strong><small>Utility meter</small></p></div>${renderRoomUtilityForm(room, occupant)}<div class="resident-saas-table resident-saas-table--utility admin-utility-table room-utility-history">${utilityMeters.length ? utilityMeters.map((item) => `<p><span>${escapeHtml(item.month || '-')}</span><b>${Number(item.electricKwh || 0)} kWh</b><em>${Number(item.waterM3 || 0)} m³</em><i>${rupiah(Number(item.totalAmount || 0))}</i></p>`).join('') : '<p><span>Belum ada meter</span><b>0 kWh</b><em>0 m³</em><i>Rp 0</i></p>'}</div></article>`;
1602:   const pages = { overview: overviewPage, control: controlPage, meter: meterPage };
1603: 
1604:   return `<section class="admin-flat-panel admin-page-panel room-detail-panel room-detail-saas"><div class="room-detail-saas__nav"><button class="room-detail-back no-print" type="button" id="backToRooms"><i class="fa-solid fa-arrow-left"></i>Kembali</button><button class="button subtle no-print" type="button" id="toggleRoomEditor"><i class="fa-regular fa-pen-to-square"></i>${state.isRoomCreateOpen ? 'Tutup edit' : 'Edit kamar'}</button></div><header class="room-detail-saas__hero"><div><span>Room Detail</span><h3>${escapeHtml(room.no)} · ${escapeHtml(room.name)}</h3><p>${escapeHtml(room.type)} · ${facilityList}</p></div><b class="room-status-pill ${escapeHtml(effectiveStatus)}">${effectiveStatus === 'terisi' ? 'Tidak tersedia' : escapeHtml(effectiveStatus)}</b></header><div class="room-detail-saas__stats"><p><span>Harga</span><strong>${rupiah(room.price)}</strong><small>/ bulan</small></p><p><span>Penghuni</span><strong>${escapeHtml(occupant?.name || 'Kosong')}</strong><small>${escapeHtml(occupant?.phone || 'Belum ada penghuni aktif')}</small></p><p><span>WiFi</span><strong>ONYX-${escapeHtml(room.no)}</strong><small>password otomatis per kamar</small></p><p><span>IoT</span><strong>${telemetry?.created_at ? 'Online' : 'Standby'}</strong><small>${telemetry?.created_at ? escapeHtml(telemetry.created_at) : 'Menunggu telemetry'}</small></p></div>${state.isRoomCreateOpen ? `<section class="room-edit-focus">${renderRoomEditorForm(room)}</section>` : `<nav class="room-detail-subnav no-print">${detailNav.map(([id, label]) => `<button class="${section === id ? 'is-active' : ''}" type="button" data-room-detail-section="${id}">${label}</button>`).join('')}</nav><section class="room-detail-saas__body room-detail-saas__body--single">${pages[section] || overviewPage}</section>`}</section>`;
1605: }
1606: 
1607: /**
1608:  * @description Render panel tamu dan reservasi.
1609:  * @returns {string} Markup grid tamu dan reservasi.
1610:  */
1611: function renderGuestBookingGrid() {
1612:   return `<section class="split-grid lower-grid"><article class="panel section-panel compact-panel" id="tamu" data-section><div class="panel-head"><div><span>Tamu</span><h3>Data penyewa</h3></div></div><div class="empty admin-empty-state"><strong>Belum ada data penyewa.</strong><p>Semua data diambil dari backend pendaftaran.</p></div></article><article class="panel section-panel compact-panel" id="reservasi" data-section><div class="panel-head"><div><span>Booking</span><h3>Reservasi aktif</h3></div></div>${renderBookingTable([])}</article></section>`;
1613: }
1614: 
1615: function renderGuestsPanel() {
1616:   return `<section class="panel section-panel admin-page-panel" id="tamu" data-section><div class="panel-head wrap"><div><span>Residents</span><h3>Data penyewa</h3></div></div><div class="empty admin-empty-state"><strong>Belum ada data penyewa.</strong><p>Gunakan menu Penghuni/Penyewa untuk data backend real.</p></div></section>`;
1617: }
1618: 
1619: function renderResidentsAdminPanel() {
1620:   const rows = [...getAdminResidents(), ...getAdminShortTermTenants()];
1621:   if (state.adminDetailType === 'penghuni') return renderAdminPersonDetail('penghuni', rows[state.adminDetailIndex] || rows[0]);
1622:   const activeRows = rows.filter((resident) => ['aktif', 'confirmed', 'check-in'].includes(String(resident.status || '').toLowerCase())).length;
1623:   const longStayRows = rows.filter((resident) => (resident.category || 'Long Stay') === 'Long Stay').length;
1624:   const shortStayRows = rows.length - longStayRows;
1625:   const totalBilling = rows.reduce((sum, resident) => sum + Number(String(resident.billing || resident.total || '').replace(/[^0-9]/g, '') || 0), 0);
1626:   const rowMarkup = rows.map((resident, index) => {
1627:     const category = resident.category || 'Resident';
1628:     const period = resident.period || resident.stay || '-';
1629:     const amount = resident.billing || resident.total || '-';
1630:     const initials = String(resident.name || 'R').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();

(Showing lines 1599-1630 of 3139. Use offset=1631 to continue.)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src\\main.js",
  "offset": 2192,
  "limit": 70
}
```

**Output:**
```
<path>C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\main.js</path>
<type>file</type>
<content>
2192:   document.querySelector('#backToPaymentList')?.addEventListener('click', () => {
2193:     state.adminPaymentDetailId = null;
2194:     state.activePaymentSection = 'overview';
2195:     renderApp();
2196:   });
2197: 
2198:   // Event subnav Detail Kamar: memisahkan Overview, Smart Control, dan Meter & Tagihan.
2199:   document.querySelectorAll('[data-room-detail-section]').forEach((button) => {
2200:     button.addEventListener('click', () => {
2201:       state.activeRoomDetailSection = button.dataset.roomDetailSection || 'overview';
2202:       state.isRoomCreateOpen = false;
2203:       renderApp();
2204:     });
2205:   });
2206: 
2207:   // Event edit kamar: membuka detail/editor kamar yang dipilih dari inventory.
2208:   document.querySelectorAll('[data-room-edit]').forEach((button) => {
2209:     button.addEventListener('click', () => {
2210:       state.adminRoomDetail = button.dataset.roomEdit;
2211:       state.activeRoomDetailSection = 'overview';
2212:       state.isRoomCreateOpen = true;
2213:       renderApp();
2214:     });
2215:   });
2216: 
2217:   // Event hapus kamar: blok hapus jika kamar sudah ditempati penghuni approved.
2218:   document.querySelectorAll('[data-room-delete]').forEach((button) => {
2219:     button.addEventListener('click', () => {
2220:       const roomNo = button.dataset.roomDelete;
2221:       const room = getRooms().find((item) => item.no === roomNo);
2222:       if (getRoomOccupant(roomNo)) {
2223:         showToast('Kamar masih terisi, tidak bisa dihapus.');
2224:         return;
2225:       }
2226:       state.rooms = state.rooms.filter((item) => item.no !== roomNo);
2227:       window.localStorage.setItem('onyx-rooms', JSON.stringify(state.rooms));
2228:       if (room?.id) apiJson('kamar.php', { method: 'DELETE', body: JSON.stringify({ id_kamar: room.id }) }).catch(() => {});
2229:       showToast(`Kamar ${roomNo} dihapus dari inventory.`);
2230:       renderApp();
2231:     });
2232:   });
2233: 
2234:   // Event tambah kamar: membuka form create tanpa detail kamar aktif.
2235:   document.querySelector('#openRoomCreate')?.addEventListener('click', () => {
2236:     state.isRoomCreateOpen = true;
2237:     state.adminRoomDetail = null;
2238:     state.activeRoomDetailSection = 'overview';
2239:     renderApp();
2240:   });
2241: 
2242:   // Event toggle editor kamar: tampil/sembunyi form edit di detail kamar.
2243:   document.querySelector('#toggleRoomEditor')?.addEventListener('click', () => {
2244:     state.isRoomCreateOpen = !state.isRoomCreateOpen;
2245:     renderApp();
2246:   });
2247: 
2248:   // Event tutup editor kamar: menutup form tanpa keluar dari detail kamar.
2249:   document.querySelector('#closeRoomEditor')?.addEventListener('click', () => {
2250:     state.isRoomCreateOpen = false;
2251:     renderApp();
2252:   });
2253: 
2254:   // Event kembali kamar: menutup detail, form, dan reset subnav detail ke Overview.
2255:   document.querySelector('#backToRooms')?.addEventListener('click', () => {
2256:     state.adminRoomDetail = null;
2257:     state.isRoomCreateOpen = false;
2258:     state.activeRoomDetailSection = 'overview';
2259:     renderApp();
2260:   });
2261: 

(Showing lines 2192-2261 of 3139. Use offset=2262 to continue.)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src\\main.js",
  "offset": 2826,
  "limit": 120
}
```

**Output:**
```
<path>C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\main.js</path>
<type>file</type>
<content>
2826:   document.querySelector('#roomUtilityMeterForm')?.addEventListener('submit', handleUtilityMeterSubmit);
2827: 
2828:   // Event smart control admin: tombol di Detail Kamar mengubah lampu/AC/kipas/air per kamar.
2829:   document.querySelectorAll('[data-admin-room-device]').forEach((button) => {
2830:     button.addEventListener('click', () => {
2831:       const roomCode = button.dataset.roomCode || 'default';
2832:       const devices = getRoomDeviceState(roomCode);
2833:       devices[button.dataset.adminRoomDevice] = !devices[button.dataset.adminRoomDevice];
2834:       saveRoomDeviceState(devices, roomCode);
2835:       showToast(`Kontrol kamar ${roomCode} diperbarui.`);
2836:       renderApp();
2837:     });
2838:   });
2839: 
2840:   // Event suhu admin: slider AC di Detail Kamar menyimpan temperatur khusus kamar tersebut.
2841:   document.querySelectorAll('[data-admin-room-temp]').forEach((input) => {
2842:     input.addEventListener('input', () => {
2843:       const roomCode = input.dataset.adminRoomTemp || 'default';
2844:       const devices = getRoomDeviceState(roomCode);
2845:       devices.temperature = Number(input.value || 24);
2846:       saveRoomDeviceState(devices, roomCode);
2847:       showToast(`Suhu AC ${roomCode}: ${devices.temperature}°C.`);
2848:       renderApp();
2849:     });
2850:   });
2851: 
2852:   // Event print invoice: simpan invoice terpilih lalu buka dialog print browser.
2853:   document.querySelectorAll('[data-print-invoice]').forEach((button) => {
2854:     button.addEventListener('click', () => {
2855:       const invoice = getResidentInvoices().find((item) => item.code === button.dataset.printInvoice) || {
2856:         code: button.dataset.printInvoice,
2857:         item: button.dataset.printItem,
2858:         amount: button.dataset.printAmount,
2859:         status: button.dataset.printStatus,
2860:       };
2861:       window.localStorage.setItem('onyx-selected-invoice', JSON.stringify(invoice));
2862:       renderApp();
2863:       window.setTimeout(() => window.print(), 80);
2864:       showToast(`Print invoice ${invoice.code}.`);
2865:     });
2866:   });
2867: 
2868:   // Event print umum: tombol cetak halaman/kamar/invoice memakai fitur print bawaan browser.
2869:   document.querySelectorAll('#printPage, #printRooms, #printInvoice').forEach((button) => button.addEventListener('click', () => window.print()));
2870: }
2871: 
2872: /**
2873:  * @description Mengaktifkan image sequence yang bergerak sesuai posisi scroll.
2874:  * @returns {void}
2875:  */
2876: function initScrollSequences() {
2877:   const sequenceCanvases = document.querySelectorAll('[data-sequence]');
2878:   if (!sequenceCanvases.length) {
2879:     if (window.__kostkuSequenceUpdate) window.removeEventListener('scroll', window.__kostkuSequenceUpdate);
2880:     if (window.__kostkuSequenceResize) window.removeEventListener('resize', window.__kostkuSequenceResize);
2881:     window.__kostkuSequenceUpdate = null;
2882:     window.__kostkuSequenceResize = null;
2883:     window.__kostkuSequencesReady = false;
2884:     return;
2885:   }
2886:   if (window.__kostkuSequencesReady) return;
2887: 
2888:   const sequences = [
2889:     { name: 'facade', folder: 'sequenze_1', total: 193, images: [], current: 1, loading: new Set() },
2890:     { name: 'interior', folder: 'sequenze_2', total: 92, images: [], current: 1, loading: new Set() },
2891:     { name: 'booking', folder: 'sequenze_3', total: 141, images: [], current: 1, loading: new Set() },
2892:   ];
2893: 
2894:   sequences.forEach((sequence) => loadSequenceFrame(sequence, 1));
2895:   scheduleSequencePreload(sequences);
2896: 
2897:   const update = () => {
2898:     sequences.forEach((sequence) => drawSequenceFrame(sequence));
2899:   };
2900: 
2901:   if (window.__kostkuSequenceUpdate) window.removeEventListener('scroll', window.__kostkuSequenceUpdate);
2902:   if (window.__kostkuSequenceResize) window.removeEventListener('resize', window.__kostkuSequenceResize);
2903:   let isSequenceFrameQueued = false;
2904:   window.__kostkuSequenceUpdate = () => {
2905:     if (isSequenceFrameQueued) return;
2906:     isSequenceFrameQueued = true;
2907:     window.requestAnimationFrame(() => {
2908:       isSequenceFrameQueued = false;
2909:       update();
2910:     });
2911:   };
2912:   window.__kostkuSequenceResize = window.__kostkuSequenceUpdate;
2913:   window.addEventListener('scroll', window.__kostkuSequenceUpdate, { passive: true });
2914:   window.addEventListener('resize', window.__kostkuSequenceResize);
2915:   window.__kostkuSequencesReady = true;
2916:   update();
2917: }
2918: 
2919: /**
2920:  * @description Menggambar frame sequence ke canvas sesuai posisi scroll.
2921:  * @param {{name:string,folder:string,total:number,images:HTMLImageElement[],current:number}} sequence Konfigurasi sequence.
2922:  * @returns {void}
2923:  */
2924: function drawSequenceFrame(sequence) {
2925:   const canvas = document.querySelector(`[data-sequence="${sequence.name}"]`);
2926:   const section = canvas?.closest('.tour-section');
2927:   if (!(canvas instanceof HTMLCanvasElement) || !section) return;
2928: 
2929:   const rect = section.getBoundingClientRect();
2930:   const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height - window.innerHeight)));
2931:   const targetFrame = Math.max(1, Math.min(sequence.total, Math.floor(progress * (sequence.total - 1)) + 1));
2932:   const currentFrame = sequence.current + (targetFrame - sequence.current) * 0.28;
2933:   sequence.current = Math.abs(targetFrame - currentFrame) < 0.08 ? targetFrame : currentFrame;
2934:   const frame = Math.max(1, Math.min(sequence.total, Math.round(sequence.current)));
2935:   prefetchActiveSequenceFrames(sequence, targetFrame);
2936:   loadSequenceFrame(sequence, frame);
2937:   const drawableFrame = getDrawableSequenceFrame(sequence, frame);
2938:   const image = drawableFrame ? sequence.images[drawableFrame] : null;
2939:   if (!image || !image.complete) return;
2940: 
2941:   const dpr = Math.min(window.devicePixelRatio || 1, 2);
2942:   const width = Math.floor(canvas.clientWidth * dpr);
2943:   const height = Math.floor(canvas.clientHeight * dpr);
2944:   if (canvas.width !== width || canvas.height !== height) {
2945:     canvas.width = width;

(Showing lines 2826-2945 of 3139. Use offset=2946 to continue.)
</content>
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 69.2s)

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src\\main.js",
  "offset": 1357,
  "limit": 90
}
```

**Output:**
```
<path>C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\main.js</path>
<type>file</type>
<content>
1357:   const waterHeight = Math.min(100, Math.max(8, Number(latest.waterM3 || 0) * 4));
1358:   const amountHeight = Math.min(100, Math.max(8, Number(latest.totalAmount || 0) / 5000));
1359:   return `<article class="resident-saas-panel ${compact ? 'resident-saas-panel--large' : 'resident-saas-panel--full'}"><div class="resident-panel-title"><div><span>Utilities</span><h2>Listrik & Air</h2></div></div><div class="utility-chart"><div class="utility-chart__bars"><span style="height:${electricHeight}%"><b>${Number(latest.electricKwh || 0)}</b><small>kWh</small></span><span style="height:${waterHeight}%"><b>${Number(latest.waterM3 || 0)}</b><small>m³</small></span><span style="height:${amountHeight}%"><b>${Math.round(Number(latest.totalAmount || 0) / 1000)}k</b><small>Rp</small></span></div><div class="utility-chart__legend"><p><i></i>Electricity · ${Number(latest.electricKwh || 0)} kWh</p><p><i></i>Water · ${Number(latest.waterM3 || 0)} m³</p><p><i></i>Tagihan · ${latest.totalAmount ? rupiah(Number(latest.totalAmount)) : 'Menunggu input admin'}</p></div></div>${compact ? '' : `<div class="utility-history"><div class="resident-panel-title"><div><span>History</span><h2>Riwayat Pemakaian</h2></div></div><div class="resident-saas-table resident-saas-table--utility">${rows.length ? rows.map((item) => `<p><span>${escapeHtml(item.month || '-')}</span><b>${Number(item.electricKwh || 0)} kWh</b><em>${Number(item.waterM3 || 0)} m³</em><i>${rupiah(Number(item.totalAmount || 0))}</i></p>`).join('') : '<p><span>Belum ada data</span><b>0 kWh</b><em>0 m³</em><i>Admin belum input meter kamar ini.</i></p>'}</div></div>`}</article>`;
1360: }
1361: 
1362: function renderResidentAccess(compact = false) {
1363:   const resident = JSON.parse(window.localStorage.getItem('onyx-resident-account') || '{}');
1364:   const accessState = JSON.parse(window.localStorage.getItem('onyx-access-state') || `{"locked":true,"guestPass":"QR-ONYX-${String(resident.id || Date.now()).slice(-4)}","validUntil":"22:00"}`);
1365:   const deviceState = getRoomDeviceState();
1366:   const accessLogs = getAccessLogs(accessState);
1367:   const room = getCurrentResidentRoom();
1368:   const climateType = getRoomClimateType(room);
1369:   const climateSummary = climateType === 'ac'
1370:     ? `<p><i class="fa-solid fa-snowflake"></i><span>AC</span><b>${deviceState.acOn ? `${deviceState.temperature}°C` : 'Off'}</b></p>`
1371:     : climateType === 'fan'
1372:       ? `<p><i class="fa-solid fa-fan"></i><span>Kipas</span><b>${deviceState.fanOn ? 'On' : 'Off'}</b></p>`
1373:       : `<p><i class="fa-solid fa-wind"></i><span>Ventilasi</span><b>Jendela luar</b></p>`;
1374:   const climateControl = climateType === 'ac'
1375:     ? `<article><i class="fa-solid fa-snowflake"></i><span>AC</span><strong>${deviceState.acOn ? 'Menyala' : 'Mati'}</strong><button class="row-print-btn ${deviceState.acOn ? 'row-print-btn--gold' : ''}" type="button" data-device-action="toggle-ac">${deviceState.acOn ? 'Matikan' : 'Nyalakan'}</button></article><article><i class="fa-solid fa-temperature-half"></i><span>Suhu AC</span><strong>${deviceState.temperature}°C</strong><div class="temp-control"><button type="button" data-device-action="temp-down">-</button><input type="range" min="18" max="30" value="${deviceState.temperature}" data-device-temperature ${deviceState.acOn ? '' : 'disabled'} /><button type="button" data-device-action="temp-up">+</button></div></article>`
1376:     : climateType === 'fan'
1377:       ? `<article><i class="fa-solid fa-fan"></i><span>Kipas Angin</span><strong>${deviceState.fanOn ? 'Menyala' : 'Mati'}</strong><button class="row-print-btn ${deviceState.fanOn ? 'row-print-btn--gold' : ''}" type="button" data-device-action="toggle-fan">${deviceState.fanOn ? 'Matikan' : 'Nyalakan'}</button></article><article><i class="fa-solid fa-wind"></i><span>Sirkulasi</span><strong>Jendela luar</strong><small>Kamar ini tidak punya AC, jadi suhu AC tidak ditampilkan.</small></article>`
1378:       : `<article><i class="fa-solid fa-wind"></i><span>Ventilasi</span><strong>Jendela luar</strong><small>Tidak ada perangkat AC/kipas di fasilitas kamar ini.</small></article>`;
1379: 
1380:   if (compact) {
1381:     return `<article class="resident-saas-panel"><div class="resident-panel-title"><div><span>Access</span><h2>Smart Room</h2></div></div><div class="resident-access-summary"><p><i class="fa-solid ${accessState.locked ? 'fa-lock' : 'fa-lock-open'}"></i><span>Door</span><b>${accessState.locked ? 'Locked' : 'Unlocked'}</b></p><p><i class="fa-solid fa-lightbulb"></i><span>Lampu</span><b>${deviceState.lightOn ? 'On' : 'Off'}</b></p>${climateSummary}</div><a class="resident-panel-link" href="#access" data-resident-section="access">Kelola akses</a></article>`;
1382:   }
1383: 
1384:   return `<article class="resident-saas-panel resident-saas-panel--full"><div class="resident-panel-title"><div><span>Access</span><h2>Akses & Smart Room</h2></div><button class="onyx-secondary" type="button" id="shareVisitorQr">QR Tamu</button></div><section class="access-control-grid access-control-grid--simple"><div class="access-hero-card access-hero-card--simple"><div class="access-lock-visual ${accessState.locked ? '' : 'is-unlocked'}"><i class="fa-solid ${accessState.locked ? 'fa-lock' : 'fa-lock-open'}"></i></div><div><span>${escapeHtml(resident.room || 'Private Studio')}</span><h3>${accessState.locked ? 'Terkunci' : 'Terbuka'}</h3></div><button class="onyx-cta" type="button" id="toggleSmartLock">${accessState.locked ? 'Unlock' : 'Lock'}</button></div><div class="access-info-stack access-info-stack--simple"><article><span>WiFi</span><strong>ONYX-Resident</strong><button class="row-print-btn" type="button" data-access-action="copy-wifi" data-copy-value="WiFi ONYX-Resident / Password onyx-${new Date().getFullYear()}">Copy</button></article><article><span>QR Tamu</span><strong>${accessState.guestPass}</strong><button class="row-print-btn" type="button" id="openVisitorQr">Show QR</button></article></div></section><section class="smart-room-panel"><div class="resident-panel-title resident-panel-title--flat"><div><span>Smart Control</span><h2>Kontrol sesuai fasilitas kamar</h2></div></div><div class="smart-room-grid"><article><i class="fa-solid fa-lightbulb"></i><span>Lampu Kamar</span><strong>${deviceState.lightOn ? 'Menyala' : 'Mati'}</strong><button class="row-print-btn ${deviceState.lightOn ? 'row-print-btn--gold' : ''}" type="button" data-device-action="toggle-light">${deviceState.lightOn ? 'Matikan' : 'Nyalakan'}</button></article>${climateControl}</div></section><section class="access-log-panel"><div class="resident-panel-title resident-panel-title--flat"><div><span>Log</span><h2>Riwayat akses</h2></div></div><div class="resident-saas-table resident-saas-ta... (line truncated to 2000 chars)
1385: }
1386: 
1387: function renderVisitorQrModal(accessState) {
1388:   return `<div class="resident-modal" role="dialog" aria-modal="true"><div class="resident-modal__card resident-qr-modal"><div class="resident-panel-title"><div><span>Visitor QR</span><h2>QR Tamu Onyx</h2></div><button class="row-print-btn" type="button" id="closeVisitorQr">Close</button></div><div class="visitor-qr-card"><div class="visitor-qr-code" aria-label="QR code for ${escapeHtml(accessState.guestPass)}">${renderVisitorQr(accessState.guestPass)}</div><strong>${escapeHtml(accessState.guestPass)}</strong><p>Berlaku sampai ${escapeHtml(accessState.validUntil)} hari ini. Tunjukkan QR ini ke tamu atau front desk lobby.</p><button class="onyx-cta" type="button" data-access-action="copy-qr" data-copy-value="${escapeHtml(accessState.guestPass)}">Copy QR Code</button></div></div></div>`;
1389: }
1390: 
1391: function renderResidentService(compact = false) {
1392:   const tickets = JSON.parse(window.localStorage.getItem('onyx-resident-tickets') || '[]');
1393:   return `<article class="resident-saas-panel ${compact ? '' : 'resident-saas-panel--full'}"><div class="resident-panel-title"><div><span>Service</span><h2>Requests</h2></div>${compact ? '' : '<button class="onyx-secondary" type="button" id="newResidentTicket">New Ticket</button>'}</div><div class="resident-ticket-list">${tickets.length ? tickets.map((ticket) => `<p><span>${escapeHtml(ticket.category)}</span><b>${escapeHtml(ticket.issue)}</b><em>${escapeHtml(ticket.status)}</em></p>`).join('') : '<p><span>Empty</span><b>Belum ada tiket service</b><em>ready</em></p>'}</div>${state.isTicketModalOpen && !compact ? renderTicketModal() : ''}</article>`;
1394: }
1395: 
1396: function renderTicketModal() {
1397:   return `<div class="resident-modal" role="dialog" aria-modal="true"><div class="resident-modal__card"><div class="resident-panel-title"><div><span>New Ticket</span><h2>Buat tiket service</h2></div><button class="row-print-btn" type="button" id="closeTicketModal">Close</button></div><form class="resident-ticket-form" id="residentTicketForm"><label>Kategori<select name="category"><option>AC</option><option>Listrik</option><option>Air</option><option>WiFi</option><option>Smart Lock</option><option>Cleaning</option></select></label><label>Prioritas<select name="priority"><option>Normal</option><option>Urgent</option></select></label><label class="ticket-full">Kendala<textarea name="issue" placeholder="Jelaskan kendala yang dialami" required></textarea></label><button class="onyx-cta ticket-full" type="submit">Submit Ticket</button></form></div></div>`;
1398: }
1399: 
1400: function renderResidentPrintableReceipt() {
1401:   const resident = JSON.parse(window.localStorage.getItem('onyx-resident-account') || '{}');
1402:   const currentInvoice = getResidentInvoices()[0] || {};
1403:   const selected = JSON.parse(window.localStorage.getItem('onyx-selected-invoice') || JSON.stringify(currentInvoice));
1404:   return `<section class="resident-print-receipt" id="residentPrintableReceipt"><div><span>Onyx Residence</span><strong>BUKTI BILLING / PEMBAYARAN</strong></div><p><span>Nama</span><b>${escapeHtml(resident.name || 'Penghuni')}</b></p><p><span>Kamar</span><b>${escapeHtml(resident.room || 'Private Studio')}</b></p><p><span>Kode Invoice</span><b>${escapeHtml(selected.code || '-')}</b></p><p><span>Tagihan</span><b>${escapeHtml(selected.item || '-')}</b></p><p><span>Mulai</span><b>${escapeHtml(selected.date || '-')}</b></p><p><span>Jatuh Tempo</span><b>${escapeHtml(selected.due || '-')}</b></p><p><span>Nominal</span><b>${escapeHtml(selected.amount || '-')}</b></p><p><span>Status</span><b>${escapeHtml(selected.status || '-')}</b></p><small>Dicetak khusus untuk invoice ${escapeHtml(selected.code || '-')}; bukan semua daftar billing.</small></section>`;
1405: }
1406: 
1407: /**
1408:  * @description Render seluruh dashboard admin setelah login.
1409:  * @returns {string} Markup dashboard admin.
1410:  */
1411: function renderAdminApp() {
1412:   syncAdminState(false);
1413:   const occupancy = getRoomOccupancyStats();
1414:   return `
1415:     <aside class="sidebar" id="sidebar">
1416:       <a class="brand" href="#admin" data-route="admin" aria-label="Onyx admin dashboard">
1417:         <span class="brand__mark"><i class="fa-solid fa-house-chimney-window"></i></span>
1418:         <span><strong>Onyx</strong><small>Admin Panel</small></span>
1419:       </a>
1420:       <nav class="menu" aria-label="Navigasi admin">
1421:         ${adminMenu.map((item) => `
1422:           <a href="#${item.id}" data-admin-section="${item.id}" class="${state.activeAdminSection === item.id ? 'is-active' : ''}">
1423:             <i class="fa-solid ${item.icon}"></i><span>${item.label}</span>
1424:           </a>
1425:         `).join('')}
1426:       </nav>
1427:       <div class="side-summary"><span>Occupancy</span><strong>${occupancy.occupancyPercent}%</strong><small>${occupancy.occupiedRooms} / ${occupancy.totalRooms} kamar terisi</small><div><i style="width:${occupancy.occupancyPercent}%"></i></div></div>
1428:       <button class="resident-logout admin-logout" type="button" id="logoutButton"><i class="fa-solid fa-right-from-bracket"></i> Logout</button>
1429:     </aside>
1430: 
1431:     <main class="workspace">
1432:       ${renderAdminSection()}
1433:     </main>
1434:   `;
1435: }
1436: 
1437: async function syncAdminState(forceRender = false) {
1438:   const lastSync = Number(window.__onyxAdminLastSync || 0);
1439:   if (!forceRender && Date.now() - lastSync < 15000) return;
1440:   if (window.__onyxAdminSyncing) return;
1441:   window.__onyxAdminSyncing = true;
1442:   window.__onyxAdminLastSync = Date.now();
1443:   try {
1444:     const response = await apiJson('admin-state.php');
1445:     window.localStorage.setItem('onyx-admin-state', JSON.stringify(response.data || response));
1446:     if (forceRender && state.page === 'admin') renderApp();

(Showing lines 1357-1446 of 3139. Use offset=1447 to continue.)
</content>
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 8.0s)

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src\\main.js",
  "offset": 1362,
  "limit": 45
}
```

**Output:**
```
<path>C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\main.js</path>
<type>file</type>
<content>
1362: function renderResidentAccess(compact = false) {
1363:   const resident = JSON.parse(window.localStorage.getItem('onyx-resident-account') || '{}');
1364:   const accessState = JSON.parse(window.localStorage.getItem('onyx-access-state') || `{"locked":true,"guestPass":"QR-ONYX-${String(resident.id || Date.now()).slice(-4)}","validUntil":"22:00"}`);
1365:   const deviceState = getRoomDeviceState();
1366:   const accessLogs = getAccessLogs(accessState);
1367:   const room = getCurrentResidentRoom();
1368:   const climateType = getRoomClimateType(room);
1369:   const climateSummary = climateType === 'ac'
1370:     ? `<p><i class="fa-solid fa-snowflake"></i><span>AC</span><b>${deviceState.acOn ? `${deviceState.temperature}°C` : 'Off'}</b></p>`
1371:     : climateType === 'fan'
1372:       ? `<p><i class="fa-solid fa-fan"></i><span>Kipas</span><b>${deviceState.fanOn ? 'On' : 'Off'}</b></p>`
1373:       : `<p><i class="fa-solid fa-wind"></i><span>Ventilasi</span><b>Jendela luar</b></p>`;
1374:   const climateControl = climateType === 'ac'
1375:     ? `<article><i class="fa-solid fa-snowflake"></i><span>AC</span><strong>${deviceState.acOn ? 'Menyala' : 'Mati'}</strong><button class="row-print-btn ${deviceState.acOn ? 'row-print-btn--gold' : ''}" type="button" data-device-action="toggle-ac">${deviceState.acOn ? 'Matikan' : 'Nyalakan'}</button></article><article><i class="fa-solid fa-temperature-half"></i><span>Suhu AC</span><strong>${deviceState.temperature}°C</strong><div class="temp-control"><button type="button" data-device-action="temp-down">-</button><input type="range" min="18" max="30" value="${deviceState.temperature}" data-device-temperature ${deviceState.acOn ? '' : 'disabled'} /><button type="button" data-device-action="temp-up">+</button></div></article>`
1376:     : climateType === 'fan'
1377:       ? `<article><i class="fa-solid fa-fan"></i><span>Kipas Angin</span><strong>${deviceState.fanOn ? 'Menyala' : 'Mati'}</strong><button class="row-print-btn ${deviceState.fanOn ? 'row-print-btn--gold' : ''}" type="button" data-device-action="toggle-fan">${deviceState.fanOn ? 'Matikan' : 'Nyalakan'}</button></article><article><i class="fa-solid fa-wind"></i><span>Sirkulasi</span><strong>Jendela luar</strong><small>Kamar ini tidak punya AC, jadi suhu AC tidak ditampilkan.</small></article>`
1378:       : `<article><i class="fa-solid fa-wind"></i><span>Ventilasi</span><strong>Jendela luar</strong><small>Tidak ada perangkat AC/kipas di fasilitas kamar ini.</small></article>`;
1379: 
1380:   if (compact) {
1381:     return `<article class="resident-saas-panel"><div class="resident-panel-title"><div><span>Access</span><h2>Smart Room</h2></div></div><div class="resident-access-summary"><p><i class="fa-solid ${accessState.locked ? 'fa-lock' : 'fa-lock-open'}"></i><span>Door</span><b>${accessState.locked ? 'Locked' : 'Unlocked'}</b></p><p><i class="fa-solid fa-lightbulb"></i><span>Lampu</span><b>${deviceState.lightOn ? 'On' : 'Off'}</b></p>${climateSummary}</div><a class="resident-panel-link" href="#access" data-resident-section="access">Kelola akses</a></article>`;
1382:   }
1383: 
1384:   return `<article class="resident-saas-panel resident-saas-panel--full"><div class="resident-panel-title"><div><span>Access</span><h2>Akses & Smart Room</h2></div><button class="onyx-secondary" type="button" id="shareVisitorQr">QR Tamu</button></div><section class="access-control-grid access-control-grid--simple"><div class="access-hero-card access-hero-card--simple"><div class="access-lock-visual ${accessState.locked ? '' : 'is-unlocked'}"><i class="fa-solid ${accessState.locked ? 'fa-lock' : 'fa-lock-open'}"></i></div><div><span>${escapeHtml(resident.room || 'Private Studio')}</span><h3>${accessState.locked ? 'Terkunci' : 'Terbuka'}</h3></div><button class="onyx-cta" type="button" id="toggleSmartLock">${accessState.locked ? 'Unlock' : 'Lock'}</button></div><div class="access-info-stack access-info-stack--simple"><article><span>WiFi</span><strong>ONYX-Resident</strong><button class="row-print-btn" type="button" data-access-action="copy-wifi" data-copy-value="WiFi ONYX-Resident / Password onyx-${new Date().getFullYear()}">Copy</button></article><article><span>QR Tamu</span><strong>${accessState.guestPass}</strong><button class="row-print-btn" type="button" id="openVisitorQr">Show QR</button></article></div></section><section class="smart-room-panel"><div class="resident-panel-title resident-panel-title--flat"><div><span>Smart Control</span><h2>Kontrol sesuai fasilitas kamar</h2></div></div><div class="smart-room-grid"><article><i class="fa-solid fa-lightbulb"></i><span>Lampu Kamar</span><strong>${deviceState.lightOn ? 'Menyala' : 'Mati'}</strong><button class="row-print-btn ${deviceState.lightOn ? 'row-print-btn--gold' : ''}" type="button" data-device-action="toggle-light">${deviceState.lightOn ? 'Matikan' : 'Nyalakan'}</button></article>${climateControl}</div></section><section class="access-log-panel"><div class="resident-panel-title resident-panel-title--flat"><div><span>Log</span><h2>Riwayat akses</h2></div></div><div class="resident-saas-table resident-saas-ta... (line truncated to 2000 chars)
1385: }
1386: 
1387: function renderVisitorQrModal(accessState) {
1388:   return `<div class="resident-modal" role="dialog" aria-modal="true"><div class="resident-modal__card resident-qr-modal"><div class="resident-panel-title"><div><span>Visitor QR</span><h2>QR Tamu Onyx</h2></div><button class="row-print-btn" type="button" id="closeVisitorQr">Close</button></div><div class="visitor-qr-card"><div class="visitor-qr-code" aria-label="QR code for ${escapeHtml(accessState.guestPass)}">${renderVisitorQr(accessState.guestPass)}</div><strong>${escapeHtml(accessState.guestPass)}</strong><p>Berlaku sampai ${escapeHtml(accessState.validUntil)} hari ini. Tunjukkan QR ini ke tamu atau front desk lobby.</p><button class="onyx-cta" type="button" data-access-action="copy-qr" data-copy-value="${escapeHtml(accessState.guestPass)}">Copy QR Code</button></div></div></div>`;
1389: }
1390: 
1391: function renderResidentService(compact = false) {
1392:   const tickets = JSON.parse(window.localStorage.getItem('onyx-resident-tickets') || '[]');
1393:   return `<article class="resident-saas-panel ${compact ? '' : 'resident-saas-panel--full'}"><div class="resident-panel-title"><div><span>Service</span><h2>Requests</h2></div>${compact ? '' : '<button class="onyx-secondary" type="button" id="newResidentTicket">New Ticket</button>'}</div><div class="resident-ticket-list">${tickets.length ? tickets.map((ticket) => `<p><span>${escapeHtml(ticket.category)}</span><b>${escapeHtml(ticket.issue)}</b><em>${escapeHtml(ticket.status)}</em></p>`).join('') : '<p><span>Empty</span><b>Belum ada tiket service</b><em>ready</em></p>'}</div>${state.isTicketModalOpen && !compact ? renderTicketModal() : ''}</article>`;
1394: }
1395: 
1396: function renderTicketModal() {
1397:   return `<div class="resident-modal" role="dialog" aria-modal="true"><div class="resident-modal__card"><div class="resident-panel-title"><div><span>New Ticket</span><h2>Buat tiket service</h2></div><button class="row-print-btn" type="button" id="closeTicketModal">Close</button></div><form class="resident-ticket-form" id="residentTicketForm"><label>Kategori<select name="category"><option>AC</option><option>Listrik</option><option>Air</option><option>WiFi</option><option>Smart Lock</option><option>Cleaning</option></select></label><label>Prioritas<select name="priority"><option>Normal</option><option>Urgent</option></select></label><label class="ticket-full">Kendala<textarea name="issue" placeholder="Jelaskan kendala yang dialami" required></textarea></label><button class="onyx-cta ticket-full" type="submit">Submit Ticket</button></form></div></div>`;
1398: }
1399: 
1400: function renderResidentPrintableReceipt() {
1401:   const resident = JSON.parse(window.localStorage.getItem('onyx-resident-account') || '{}');
1402:   const currentInvoice = getResidentInvoices()[0] || {};
1403:   const selected = JSON.parse(window.localStorage.getItem('onyx-selected-invoice') || JSON.stringify(currentInvoice));
1404:   return `<section class="resident-print-receipt" id="residentPrintableReceipt"><div><span>Onyx Residence</span><strong>BUKTI BILLING / PEMBAYARAN</strong></div><p><span>Nama</span><b>${escapeHtml(resident.name || 'Penghuni')}</b></p><p><span>Kamar</span><b>${escapeHtml(resident.room || 'Private Studio')}</b></p><p><span>Kode Invoice</span><b>${escapeHtml(selected.code || '-')}</b></p><p><span>Tagihan</span><b>${escapeHtml(selected.item || '-')}</b></p><p><span>Mulai</span><b>${escapeHtml(selected.date || '-')}</b></p><p><span>Jatuh Tempo</span><b>${escapeHtml(selected.due || '-')}</b></p><p><span>Nominal</span><b>${escapeHtml(selected.amount || '-')}</b></p><p><span>Status</span><b>${escapeHtml(selected.status || '-')}</b></p><small>Dicetak khusus untuk invoice ${escapeHtml(selected.code || '-')}; bukan semua daftar billing.</small></section>`;
1405: }
1406: 

(Showing lines 1362-1406 of 3139. Use offset=1407 to continue.)
</content>
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 67.3s)

**Tool: apply_patch**

**Input:**
```json
{
  "patchText": "*** Begin Patch\n*** Update File: fe/src/main.js\n@@\n function getAdminApplicationState(selectedResident = null) {\n   const backendState = JSON.parse(window.localStorage.getItem('onyx-admin-state') || 'null');\n   const backendApplications = backendState?.applications || backendState?.data?.applications || [];\n@@\n   const splitParts = splitPaymentParts(total);\n   return { resident, proof, proofs, utilityMeters, qrisParts, rent, deposit, total, splitParts };\n }\n+\n+function getAdminResidentCandidates() {\n+  const backendState = JSON.parse(window.localStorage.getItem('onyx-admin-state') || 'null');\n+  const backendApplications = backendState?.applications || backendState?.data?.applications || [];\n+  const currentResident = JSON.parse(window.localStorage.getItem('onyx-resident-account') || 'null');\n+  const candidates = backendApplications.filter((item) => item?.name);\n+  if (currentResident?.id && !candidates.some((item) => item.id === currentResident.id)) candidates.push(currentResident);\n+  return candidates;\n+}\n+\n+function getPrimaryAdminResident() {\n+  const candidates = getAdminResidentCandidates();\n+  const approved = candidates.find((item) => item.applicationStatus === 'Approved') || candidates[candidates.length - 1];\n+  if (approved) return approved;\n+  const room = getRooms()[0] || seedRooms[0];\n+  if (!room) return null;\n+  return {\n+    id: 'APP-DEMO-RESIDENT',\n+    name: 'Demo Resident',\n+    phone: '080000000000',\n+    email: 'resident@onyx.local',\n+    room: `${room.no} - ${room.name}`,\n+    leaseType: 'Bulanan',\n+    duration: 1,\n+    startDate: formatDateInput(new Date()),\n+    endDate: calculateLeaseEnd(formatDateInput(new Date()), 'Bulanan', 1),\n+    monthlyBudget: String(room.price || 0),\n+    deposit: String(Math.round(Number(room.price || 0) * 0.3)),\n+    applicationStatus: 'Approved',\n+    administrationStatus: 'Dikonfirmasi Admin',\n+  };\n+}\n+\n+function getAdminServiceTickets() {\n+  const adminTickets = JSON.parse(window.localStorage.getItem('onyx-admin-service-tickets') || '[]');\n+  const residentTickets = JSON.parse(window.localStorage.getItem('onyx-resident-tickets') || '[]');\n+  return adminTickets.length ? adminTickets : residentTickets;\n+}\n+\n+function prepareResidentPortalPreview(section = 'overview', resident = null) {\n+  const selected = resident || getPrimaryAdminResident();\n+  if (!selected?.id) return null;\n+  const room = getRooms().find((item) => selected.room?.startsWith(item.no)) || getRooms()[0] || seedRooms[0];\n+  const previewResident = sanitizeResidentForStorage({\n+    ...selected,\n+    id: selected.id,\n+    name: selected.name || 'Demo Resident',\n+    room: selected.room || (room ? `${room.no} - ${room.name}` : '-'),\n+    leaseType: selected.leaseType || 'Bulanan',\n+    duration: selected.duration || 1,\n+    startDate: selected.startDate || formatDateInput(new Date()),\n+    endDate: selected.endDate || calculateLeaseEnd(formatDateInput(new Date()), selected.leaseType || 'Bulanan', selected.duration || 1),\n+    monthlyBudget: selected.monthlyBudget || String(room?.price || 0),\n+    deposit: selected.deposit || String(Math.round(Number(room?.price || 0) * 0.3)),\n+    applicationStatus: 'Approved',\n+    administrationStatus: selected.administrationStatus || 'Dikonfirmasi Admin',\n+  });\n+  window.localStorage.setItem('onyx-resident-account', JSON.stringify(previewResident));\n+  window.sessionStorage.setItem('onyx-resident-session', 'true');\n+  state.activeResidentSection = section;\n+  state.manualTransferInvoice = null;\n+  state.isTicketModalOpen = false;\n+  state.isQrModalOpen = section === 'access' && state.isQrModalOpen;\n+  return previewResident;\n+}\n+\n+function openResidentPortalFromAdmin(section = 'overview', residentId = '') {\n+  const resident = getAdminResidentCandidates().find((item) => String(item.id || '') === String(residentId || '')) || getPrimaryAdminResident();\n+  const previewResident = prepareResidentPortalPreview(section, resident);\n+  if (!previewResident) {\n+    showToast('Belum ada resident untuk dibuka. Daftarkan penghuni dulu.');\n+    return;\n+  }\n+  navigate('resident');\n+  showToast(`Resident Portal dibuka untuk ${previewResident.name}.`);\n+}\n \n /**\n  * @description Membuat baris table Payment dari semua aplikasi resident agar admin melihat buyer dulu sebelum detail.\n  * @returns {Array<object>} Daftar buyer/payment status untuk admin.\n*** End Patch"
}
```

**Output:**
```
Success. Updated the following files:
M fe/src/main.js
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 11.8s)

**Tool: apply_patch**

**Input:**
```json
{
  "patchText": "*** Begin Patch\n*** Update File: fe/src/main.js\n@@\n function getIotTelemetry(roomCode = '') {\n   const rows = JSON.parse(window.localStorage.getItem('onyx-iot-telemetry') || '[]');\n   return rows.find((item) => item.roomCode === roomCode) || null;\n }\n+\n+function getIotTelemetryRows() {\n+  const rows = JSON.parse(window.localStorage.getItem('onyx-iot-telemetry') || '[]');\n+  return Array.isArray(rows) ? rows : [];\n+}\n*** End Patch"
}
```

**Output:**
```
Success. Updated the following files:
M fe/src/main.js
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 13.0s)

**Tool: apply_patch**

**Input:**
```json
{
  "patchText": "*** Begin Patch\n*** Update File: fe/src/main.js\n@@\n function renderAdminSection() {\n   if (state.activeAdminSection === 'kamar') return renderRoomsPanel();\n     if (state.activeAdminSection === 'penghuni') return renderResidentsAdminPanel();\n+  if (state.activeAdminSection === 'utilities') return renderAdminUtilitiesPanel();\n+  if (state.activeAdminSection === 'iot') return renderAdminIotPanel();\n+  if (state.activeAdminSection === 'access') return renderAdminAccessPanel();\n+  if (state.activeAdminSection === 'tickets') return renderAdminServiceTicketsPanel();\n+  if (state.activeAdminSection === 'resident-portal') return renderAdminResidentPortalPanel();\n   if (state.activeAdminSection === 'pembayaran') return renderPaymentsAdminPanel();\n   if (state.activeAdminSection === 'reservasi') return renderReservationsPanel();\n   if (state.activeAdminSection === 'laporan') return renderCashflowPanel();\n   return renderDashboard();\n }\n*** End Patch"
}
```

**Output:**
```
Success. Updated the following files:
M fe/src/main.js
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 20.9s)

**Tool: apply_patch**

**Input:**
```json
{
  "patchText": "*** Begin Patch\n*** Update File: fe/src/main.js\n@@\n function renderDashboard() {\n   const { resident, proof, proofs, qrisParts, splitParts, total } = getAdminApplicationState();\n   const backendState = JSON.parse(window.localStorage.getItem('onyx-admin-state') || 'null');\n   const applications = backendState?.applications || backendState?.data?.applications || [];\n   const utilityMeters = backendState?.utility_meters || backendState?.data?.utility_meters || [];\n+  const telemetryRows = getIotTelemetryRows();\n+  const serviceTickets = getAdminServiceTickets();\n   const pendingPayment = proofs.filter((item) => item.status === 'uploaded').length;\n   const applicantCount = applications.length;\n   const { occupiedRooms, availableRooms, totalRooms } = getRoomOccupancyStats();\n   const paidQrisTotal = qrisParts.reduce((sum, index) => sum + Number(splitParts[index] || 0), 0);\n@@\n     </section>\n+\n+    <section class=\"admin-discovery-grid no-print\" aria-label=\"Resident Portal, Utilities, IoT Monitoring, Smart Access, Visitor Pass, Service Tickets\">\n+      <article><span>Resident Portal</span><h3>Utilities · Access · Service</h3><p>Buka portal penghuni langsung dari akun admin untuk QA dan operasional.</p><button class=\"row-print-btn row-print-btn--gold\" type=\"button\" data-open-resident-portal=\"overview\">Open Resident Portal</button></article>\n+      <article><span>Utilities</span><h3>Meter Charges</h3><p>${utilityMeters.length} data listrik/air tersimpan untuk billing penghuni.</p><button class=\"row-print-btn\" type=\"button\" data-admin-quick-section=\"utilities\">View utility meter charges</button></article>\n+      <article><span>IoT Monitoring</span><h3>Room Telemetry</h3><p>${telemetryRows.length} kamar memiliki telemetry suhu, daya, dan air.</p><button class=\"row-print-btn\" type=\"button\" data-admin-quick-section=\"iot\">View room telemetry</button></article>\n+      <article><span>Smart Access</span><h3>Visitor Pass</h3><p>Lock state, guest QR, WiFi share, dan access logs resident.</p><button class=\"row-print-btn\" type=\"button\" data-admin-quick-section=\"access\">View access state and visitor pass</button></article>\n+      <article><span>Service Tickets</span><h3>Requests</h3><p>${serviceTickets.length} tiket layanan/cache siap direview.</p><button class=\"row-print-btn\" type=\"button\" data-admin-quick-section=\"tickets\">Create / review service ticket</button></article>\n+    </section>\n \n     <section class=\"split-grid admin-dashboard-main\">\n       <article class=\"panel chart-card\"><div class=\"panel-head\"><div><span>Utility</span><h3>Meter real tersimpan</h3></div></div><div class=\"admin-action-list\"><p><span>Meter rows</span><b>${utilityMeters.length} data utilitas</b><em>Dari backend utility-meter.php</em></p><p><span>Payment proof</span><b>${proofs.length} bukti transfer</b><em>Queue real backend</em></p></div></article>\n*** End Patch"
}
```

**Output:**
```
Success. Updated the following files:
M fe/src/main.js
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 80.8s)

**Tool: apply_patch**

**Input:**
```json
{
  "patchText": "*** Begin Patch\n*** Update File: fe/src/main.js\n@@\n function renderDashboard() {\n@@\n     </section>\n   `;\n }\n+\n+function renderAdminUtilitiesPanel() {\n+  const residents = getAdminResidentCandidates();\n+  const meters = getUtilityMeters();\n+  const totalCharges = meters.reduce((sum, item) => sum + Number(item.totalAmount || 0), 0);\n+  const latestRows = meters.slice(0, 12).map((item) => {\n+    const resident = residents.find((candidate) => candidate.id === item.application_id || getRoomCode(candidate.room) === getRoomCode(item.room));\n+    return `<article class=\"admin-ops-row\"><div><span>${escapeHtml(item.month || '-')}</span><strong>${escapeHtml(item.residentName || resident?.name || 'Resident')}</strong><small>${escapeHtml(item.room || resident?.room || '-')}</small></div><b>${Number(item.electricKwh || 0)} kWh</b><b>${Number(item.waterM3 || 0)} m³</b><i>${rupiah(Number(item.totalAmount || 0))}</i></article>`;\n+  }).join('');\n+  return `<section class=\"admin-page-panel admin-feature-panel\" id=\"utilities\" data-section>\n+    <div class=\"panel-head wrap\"><div><span>Utilities</span><h3>Utility Meter Charges</h3><p>Listrik, air, dan tagihan meter yang masuk ke billing penghuni.</p></div><button class=\"button primary\" type=\"button\" data-open-resident-portal=\"utilities\"><i class=\"fa-solid fa-user-shield\"></i>Open Resident Utilities</button></div>\n+    <div class=\"payment-ops-kpis\"><article><span>Meter Rows</span><strong>${meters.length}</strong><small>Data utility-meter.php</small></article><article><span>Total Charges</span><strong>${rupiah(totalCharges)}</strong><small>Akumulasi tagihan utilitas</small></article><article><span>Residents</span><strong>${residents.length}</strong><small>Calon/penghuni aktif</small></article><article><span>Input Meter</span><strong>Room Detail</strong><small>Menu Kamar → Meter & Tagihan</small></article></div>\n+    <div class=\"admin-feature-actions no-print\"><button class=\"row-print-btn row-print-btn--gold\" type=\"button\" data-admin-open-room-feature=\"meter\">Input Meter & Tagihan</button><button class=\"row-print-btn\" type=\"button\" data-open-resident-portal=\"billing\">View Billing Invoice</button><button class=\"row-print-btn\" type=\"button\" id=\"refreshPayments\">Refresh backend</button></div>\n+    <div class=\"admin-ops-table\"><div class=\"admin-ops-row admin-ops-row--head\"><span>Resident</span><span>Listrik</span><span>Air</span><span>Tagihan</span></div>${latestRows || '<div class=\"empty admin-empty-state\"><strong>Belum ada utility meter.</strong><p>Buka Kamar → Detail → Meter & Tagihan, lalu simpan meter listrik/air.</p></div>'}</div>\n+  </section>`;\n+}\n+\n+function renderAdminIotPanel() {\n+  const telemetryRows = getIotTelemetryRows();\n+  const roomRows = getRooms().map((room) => {\n+    const telemetry = telemetryRows.find((item) => item.roomCode === room.no) || null;\n+    const devices = getRoomDeviceState(room.no);\n+    return `<article class=\"admin-ops-row\"><div><span>${escapeHtml(room.no)}</span><strong>${escapeHtml(room.name)}</strong><small>${telemetry?.created_at ? `Updated ${escapeHtml(telemetry.created_at)}` : 'No telemetry yet'}</small></div><b>${telemetry ? `${Number(telemetry.temperature || 0)}°C` : '-'}</b><b>${telemetry ? `${Number(telemetry.powerWatt || 0)} W` : devices.lightOn ? 'Manual on' : 'Manual off'}</b><i>${telemetry ? `${Number(telemetry.waterM3 || 0)} m³` : devices.waterOn ? 'Water on' : 'Water off'}</i></article>`;\n+  }).join('');\n+  return `<section class=\"admin-page-panel admin-feature-panel\" id=\"iot\" data-section>\n+    <div class=\"panel-head wrap\"><div><span>IoT Monitoring</span><h3>Room Telemetry</h3><p>Monitoring suhu, kelembapan, daya listrik, energi, dan air dari ESP32/Wokwi.</p></div><button class=\"button primary\" type=\"button\" data-admin-open-room-feature=\"control\"><i class=\"fa-solid fa-microchip\"></i>Open Smart Control</button></div>\n+    <div class=\"payment-ops-kpis\"><article><span>Telemetry Rooms</span><strong>${telemetryRows.length}</strong><small>Data iot-ingest.php</small></article><article><span>Total Rooms</span><strong>${getRooms().length}</strong><small>Inventory aktif</small></article><article><span>Mode</span><strong>${telemetryRows.length ? 'Live IoT' : 'Manual'}</strong><small>Fallback smart room aktif</small></article><article><span>Endpoint</span><strong>iot-ingest.php</strong><small>GET/POST telemetry</small></article></div>\n+    <div class=\"admin-feature-actions no-print\"><button class=\"row-print-btn row-print-btn--gold\" type=\"button\" id=\"seedIotDemo\">Seed demo telemetry</button><button class=\"row-print-btn\" type=\"button\" data-open-resident-portal=\"utilities\">Open Resident Utilities</button><button class=\"row-print-btn\" type=\"button\" id=\"refreshPayments\">Refresh IoT</button></div>\n+    <div class=\"admin-ops-table\"><div class=\"admin-ops-row admin-ops-row--head\"><span>Room</span><span>Temperature</span><span>Power</span><span>Water</span></div>${roomRows}</div>\n+  </section>`;\n+}\n+\n+function renderAdminAccessPanel() {\n+  const resident = getPrimaryAdminResident();\n+  const roomCode = getRoomCode(resident?.room || '') || getRooms()[0]?.no || 'ROOM';\n+  const accessState = JSON.parse(window.localStorage.getItem('onyx-access-state') || `{\"locked\":true,\"guestPass\":\"QR-ONYX-${String(resident?.id || Date.now()).slice(-4)}\",\"validUntil\":\"22:00\"}`);\n+  const logs = getAccessLogs(accessState);\n+  const logRows = logs.map((log) => `<p><span>${escapeHtml(log.time)}</span><b>${escapeHtml(log.action)}</b><em>${escapeHtml(log.detail)}</em><i>${escapeHtml(log.status)}</i></p>`).join('');\n+  return `<section class=\"admin-page-panel admin-feature-panel\" id=\"access\" data-section>\n+    <div class=\"panel-head wrap\"><div><span>Smart Access</span><h3>Access State & Visitor Pass</h3><p>Kelola lock state, QR tamu, WiFi share, dan access logs resident.</p></div><button class=\"button primary\" type=\"button\" data-open-resident-portal=\"access\"><i class=\"fa-solid fa-door-closed\"></i>Open Resident Access</button></div>\n+    <div class=\"admin-access-grid\"><article class=\"access-hero-card\"><span>Door Lock</span><strong>${accessState.locked ? 'Locked' : 'Unlocked'}</strong><p>${escapeHtml(resident?.name || 'Resident')} · ${escapeHtml(roomCode)}</p><button class=\"row-print-btn row-print-btn--gold\" type=\"button\" id=\"adminToggleSmartLock\">${accessState.locked ? 'Unlock room' : 'Lock room'}</button></article><article class=\"visitor-qr-card\"><span>Visitor Pass</span><div class=\"visitor-qr-code\" aria-label=\"Visitor QR ${escapeHtml(accessState.guestPass)}\">${renderVisitorQr(accessState.guestPass)}</div><strong>${escapeHtml(accessState.guestPass)}</strong><p>Berlaku sampai ${escapeHtml(accessState.validUntil)} hari ini.</p><button class=\"row-print-btn\" type=\"button\" data-copy-value=\"${escapeHtml(accessState.guestPass)}\" data-access-action=\"copy-qr\">Copy QR Code</button></article><article class=\"access-hero-card\"><span>WiFi Share</span><strong>ONYX-${escapeHtml(roomCode)}</strong><p>Password: onyx-${escapeHtml(roomCode).toLowerCase()}-wifi</p><button class=\"row-print-btn\" type=\"button\" data-copy-value=\"ONYX-${escapeHtml(roomCode)} / onyx-${escapeHtml(roomCode).toLowerCase()}-wifi\" data-access-action=\"copy-wifi\">Share WiFi</button></article></div>\n+    <div class=\"resident-saas-table resident-saas-table--access admin-access-logs\">${logRows || '<p><span>Now</span><b>Belum ada access logs</b><em>Gunakan tombol Visitor Pass/Lock</em><i>ready</i></p>'}</div>\n+  </section>`;\n+}\n+\n+function renderAdminServiceTicketsPanel() {\n+  const tickets = getAdminServiceTickets();\n+  const resident = getPrimaryAdminResident();\n+  const rows = tickets.map((ticket) => `<article class=\"admin-ops-row\"><div><span>${escapeHtml(ticket.category || 'Service')}</span><strong>${escapeHtml(ticket.issue || '-')}</strong><small>${escapeHtml(ticket.application_id || resident?.id || '-')}</small></div><b>${escapeHtml(ticket.priority || 'Normal')}</b><i>${escapeHtml(ticket.status || 'open')}</i></article>`).join('');\n+  return `<section class=\"admin-page-panel admin-feature-panel\" id=\"tickets\" data-section>\n+    <div class=\"panel-head wrap\"><div><span>Service Ticketing</span><h3>Resident Service Tickets</h3><p>Buat dan review request perbaikan, kebersihan, WiFi, AC, air, atau listrik.</p></div><button class=\"button primary\" type=\"button\" data-open-resident-portal=\"service\"><i class=\"fa-solid fa-user-shield\"></i>Open Resident Service</button></div>\n+    <form class=\"admin-ticket-form no-print\" id=\"adminServiceTicketForm\"><input type=\"hidden\" name=\"application_id\" value=\"${escapeHtml(resident?.id || '')}\" /><label>Kategori<select name=\"category\"><option>Maintenance</option><option>WiFi</option><option>Listrik</option><option>Air</option><option>Kebersihan</option></select></label><label>Prioritas<select name=\"priority\"><option>Normal</option><option>High</option><option>Urgent</option></select></label><label class=\"admin-ticket-form__issue\">Issue<input name=\"issue\" placeholder=\"Contoh: AC kurang dingin / lampu mati\" required /></label><button class=\"button primary\" type=\"submit\">Create Service Ticket</button></form>\n+    <div class=\"admin-ops-table\"><div class=\"admin-ops-row admin-ops-row--head\"><span>Ticket</span><span>Priority</span><span>Status</span></div>${rows || '<div class=\"empty admin-empty-state\"><strong>Belum ada service ticket.</strong><p>Buat tiket dari form admin atau Resident Portal → Service.</p></div>'}</div>\n+  </section>`;\n+}\n+\n+function renderAdminResidentPortalPanel() {\n+  const resident = getPrimaryAdminResident();\n+  return `<section class=\"admin-page-panel admin-feature-panel\" id=\"resident-portal\" data-section>\n+    <div class=\"panel-head wrap\"><div><span>Resident Portal</span><h3>Resident-facing Tools</h3><p>Entry point eksplisit untuk QA: Billing, Utilities, Smart Access, Visitor Pass, dan Service Ticketing.</p></div><button class=\"button primary\" type=\"button\" data-open-resident-portal=\"overview\"><i class=\"fa-solid fa-user-shield\"></i>Launch Resident Portal</button></div>\n+    <div class=\"admin-portal-grid\"><article><span>Resident</span><strong>${escapeHtml(resident?.name || 'Demo Resident')}</strong><p>${escapeHtml(resident?.room || '-')}</p></article><button type=\"button\" data-open-resident-portal=\"billing\"><i class=\"fa-solid fa-receipt\"></i><span>Billing</span><small>Invoices, QRIS, manual transfer</small></button><button type=\"button\" data-open-resident-portal=\"utilities\"><i class=\"fa-solid fa-bolt\"></i><span>Utilities</span><small>Meter charges & IoT usage</small></button><button type=\"button\" data-open-resident-portal=\"access\"><i class=\"fa-solid fa-door-closed\"></i><span>Smart Access</span><small>Visitor Pass, WiFi, access logs</small></button><button type=\"button\" data-open-resident-portal=\"service\"><i class=\"fa-solid fa-screwdriver-wrench\"></i><span>Service Tickets</span><small>Create and review requests</small></button></div>\n+  </section>`;\n+}\n \n async function refreshAdminStateForSection(section) {\n-  const liveSections = ['dashboard', 'kamar', 'penghuni', 'pembayaran', 'reservasi', 'laporan'];\n+  const liveSections = ['dashboard', 'kamar', 'penghuni', 'utilities', 'iot', 'access', 'tickets', 'resident-portal', 'pembayaran', 'reservasi', 'laporan'];\n   if (!liveSections.includes(section)) return renderApp();\n   renderApp();\n   syncAdminSectionInBackground();\n }\n*** End Patch"
}
```

**Output:**
```
Success. Updated the following files:
M fe/src/main.js
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 15.8s)

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src\\main.js",
  "offset": 1480,
  "limit": 260
}
```

**Output:**
```
<path>C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\main.js</path>
<type>file</type>
<content>
1480: 
1481: function renderResidentPrintableReceipt() {
1482:   const resident = JSON.parse(window.localStorage.getItem('onyx-resident-account') || '{}');
1483:   const currentInvoice = getResidentInvoices()[0] || {};
1484:   const selected = JSON.parse(window.localStorage.getItem('onyx-selected-invoice') || JSON.stringify(currentInvoice));
1485:   return `<section class="resident-print-receipt" id="residentPrintableReceipt"><div><span>Onyx Residence</span><strong>BUKTI BILLING / PEMBAYARAN</strong></div><p><span>Nama</span><b>${escapeHtml(resident.name || 'Penghuni')}</b></p><p><span>Kamar</span><b>${escapeHtml(resident.room || 'Private Studio')}</b></p><p><span>Kode Invoice</span><b>${escapeHtml(selected.code || '-')}</b></p><p><span>Tagihan</span><b>${escapeHtml(selected.item || '-')}</b></p><p><span>Mulai</span><b>${escapeHtml(selected.date || '-')}</b></p><p><span>Jatuh Tempo</span><b>${escapeHtml(selected.due || '-')}</b></p><p><span>Nominal</span><b>${escapeHtml(selected.amount || '-')}</b></p><p><span>Status</span><b>${escapeHtml(selected.status || '-')}</b></p><small>Dicetak khusus untuk invoice ${escapeHtml(selected.code || '-')}; bukan semua daftar billing.</small></section>`;
1486: }
1487: 
1488: /**
1489:  * @description Render seluruh dashboard admin setelah login.
1490:  * @returns {string} Markup dashboard admin.
1491:  */
1492: function renderAdminApp() {
1493:   syncAdminState(false);
1494:   const occupancy = getRoomOccupancyStats();
1495:   return `
1496:     <aside class="sidebar" id="sidebar">
1497:       <a class="brand" href="#admin" data-route="admin" aria-label="Onyx admin dashboard">
1498:         <span class="brand__mark"><i class="fa-solid fa-house-chimney-window"></i></span>
1499:         <span><strong>Onyx</strong><small>Admin Panel</small></span>
1500:       </a>
1501:       <nav class="menu" aria-label="Navigasi admin">
1502:         ${adminMenu.map((item) => `
1503:           <a href="#${item.id}" data-admin-section="${item.id}" class="${state.activeAdminSection === item.id ? 'is-active' : ''}">
1504:             <i class="fa-solid ${item.icon}"></i><span>${item.label}</span>
1505:           </a>
1506:         `).join('')}
1507:       </nav>
1508:       <div class="side-summary"><span>Occupancy</span><strong>${occupancy.occupancyPercent}%</strong><small>${occupancy.occupiedRooms} / ${occupancy.totalRooms} kamar terisi</small><div><i style="width:${occupancy.occupancyPercent}%"></i></div></div>
1509:       <button class="resident-logout admin-logout" type="button" id="logoutButton"><i class="fa-solid fa-right-from-bracket"></i> Logout</button>
1510:     </aside>
1511: 
1512:     <main class="workspace">
1513:       ${renderAdminSection()}
1514:     </main>
1515:   `;
1516: }
1517: 
1518: async function syncAdminState(forceRender = false) {
1519:   const lastSync = Number(window.__onyxAdminLastSync || 0);
1520:   if (!forceRender && Date.now() - lastSync < 15000) return;
1521:   if (window.__onyxAdminSyncing) return;
1522:   window.__onyxAdminSyncing = true;
1523:   window.__onyxAdminLastSync = Date.now();
1524:   try {
1525:     const response = await apiJson('admin-state.php');
1526:     window.localStorage.setItem('onyx-admin-state', JSON.stringify(response.data || response));
1527:     if (forceRender && state.page === 'admin') renderApp();
1528:   } catch (error) {
1529:     window.__onyxAdminLastSync = Date.now();
1530:   } finally {
1531:     window.__onyxAdminSyncing = false;
1532:   }
1533: }
1534: 
1535: function renderAdminSection() {
1536:   if (state.activeAdminSection === 'kamar') return renderRoomsPanel();
1537:     if (state.activeAdminSection === 'penghuni') return renderResidentsAdminPanel();
1538:   if (state.activeAdminSection === 'utilities') return renderAdminUtilitiesPanel();
1539:   if (state.activeAdminSection === 'iot') return renderAdminIotPanel();
1540:   if (state.activeAdminSection === 'access') return renderAdminAccessPanel();
1541:   if (state.activeAdminSection === 'tickets') return renderAdminServiceTicketsPanel();
1542:   if (state.activeAdminSection === 'resident-portal') return renderAdminResidentPortalPanel();
1543:   if (state.activeAdminSection === 'pembayaran') return renderPaymentsAdminPanel();
1544:   if (state.activeAdminSection === 'reservasi') return renderReservationsPanel();
1545:   if (state.activeAdminSection === 'laporan') return renderCashflowPanel();
1546:   return renderDashboard();
1547: }
1548: 
1549: /**
1550:  * @description Render dashboard ringkas dengan metrik dan grafik pendapatan.
1551:  * @returns {string} Markup dashboard.
1552:  */
1553: function renderDashboard() {
1554:   const { resident, proof, proofs, qrisParts, splitParts, total } = getAdminApplicationState();
1555:   const backendState = JSON.parse(window.localStorage.getItem('onyx-admin-state') || 'null');
1556:   const applications = backendState?.applications || backendState?.data?.applications || [];
1557:   const utilityMeters = backendState?.utility_meters || backendState?.data?.utility_meters || [];
1558:   const telemetryRows = getIotTelemetryRows();
1559:   const serviceTickets = getAdminServiceTickets();
1560:   const pendingPayment = proofs.filter((item) => item.status === 'uploaded').length;
1561:   const applicantCount = applications.length;
1562:   const { occupiedRooms, availableRooms, totalRooms } = getRoomOccupancyStats();
1563:   const paidQrisTotal = qrisParts.reduce((sum, index) => sum + Number(splitParts[index] || 0), 0);
1564:   return `
1565:     <section class="admin-ops-strip" id="dashboard" data-section>
1566:       <article><span>Occupancy</span><strong>${occupiedRooms}</strong><small>${occupiedRooms} / ${totalRooms} kamar real</small></article>
1567:       <article><span>Available</span><strong>${availableRooms}</strong><small>Siap ditempati</small></article>
1568:       <article><span>Aplikasi Baru</span><strong>${applicantCount}</strong><small>${resident?.applicationStatus || 'Tidak ada applicant'}</small></article>
1569:       <article><span>Payment Queue</span><strong>${pendingPayment}</strong><small>${proof?.status === 'uploaded' ? 'Bukti transfer menunggu approve' : resident?.name ? 'Menunggu pembayaran / QRIS split' : 'Tidak ada applicant pending'}</small></article>
1570:     </section>
1571: 
1572:     <section class="admin-discovery-grid no-print" aria-label="Resident Portal, Utilities, IoT Monitoring, Smart Access, Visitor Pass, Service Tickets">
1573:       <article><span>Resident Portal</span><h3>Utilities · Access · Service</h3><p>Buka portal penghuni langsung dari akun admin untuk QA dan operasional.</p><button class="row-print-btn row-print-btn--gold" type="button" data-open-resident-portal="overview">Open Resident Portal</button></article>
1574:       <article><span>Utilities</span><h3>Meter Charges</h3><p>${utilityMeters.length} data listrik/air tersimpan untuk billing penghuni.</p><button class="row-print-btn" type="button" data-admin-quick-section="utilities">View utility meter charges</button></article>
1575:       <article><span>IoT Monitoring</span><h3>Room Telemetry</h3><p>${telemetryRows.length} kamar memiliki telemetry suhu, daya, dan air.</p><button class="row-print-btn" type="button" data-admin-quick-section="iot">View room telemetry</button></article>
1576:       <article><span>Smart Access</span><h3>Visitor Pass</h3><p>Lock state, guest QR, WiFi share, dan access logs resident.</p><button class="row-print-btn" type="button" data-admin-quick-section="access">View access state and visitor pass</button></article>
1577:       <article><span>Service Tickets</span><h3>Requests</h3><p>${serviceTickets.length} tiket layanan/cache siap direview.</p><button class="row-print-btn" type="button" data-admin-quick-section="tickets">Create / review service ticket</button></article>
1578:     </section>
1579: 
1580:     <section class="split-grid admin-dashboard-main">
1581:       <article class="panel chart-card"><div class="panel-head"><div><span>Utility</span><h3>Meter real tersimpan</h3></div></div><div class="admin-action-list"><p><span>Meter rows</span><b>${utilityMeters.length} data utilitas</b><em>Dari backend utility-meter.php</em></p><p><span>Payment proof</span><b>${proofs.length} bukti transfer</b><em>Queue real backend</em></p></div></article>
1582:       <article class="panel table-card"><div class="panel-head"><div><span>Today</span><h3>Action queue</h3></div><a class="text-btn" href="#pembayaran" data-admin-section="pembayaran">Open</a></div><div class="admin-action-list">${resident?.name ? `<p><span>Applicant</span><b>${escapeHtml(resident.name)} · ${escapeHtml(resident.room || '-')}</b><em>${escapeHtml(resident.administrationStatus || resident.applicationStatus || 'Review')}</em></p><p><span>Split QRIS</span><b>${qrisParts.length}/${splitParts.length} part dibuka</b><em>${rupiah(paidQrisTotal)} dari ${rupiah(total)}</em></p><p><span>Refund</span><b>${escapeHtml(resident.refundBank || '-')} · ${escapeHtml(resident.refundAccount || '-')}</b><em>${escapeHtml(resident.refundAccountName || 'Nama rekening belum ada')}</em></p>` : '<p><span>Applicant</span><b>Belum ada pendaftaran baru</b><em>Menunggu data Book</em></p>'}</div></article>
1583:     </section>
1584:   `;
1585: }
1586: 
1587: function renderAdminUtilitiesPanel() {
1588:   const residents = getAdminResidentCandidates();
1589:   const meters = getUtilityMeters();
1590:   const totalCharges = meters.reduce((sum, item) => sum + Number(item.totalAmount || 0), 0);
1591:   const latestRows = meters.slice(0, 12).map((item) => {
1592:     const resident = residents.find((candidate) => candidate.id === item.application_id || getRoomCode(candidate.room) === getRoomCode(item.room));
1593:     return `<article class="admin-ops-row"><div><span>${escapeHtml(item.month || '-')}</span><strong>${escapeHtml(item.residentName || resident?.name || 'Resident')}</strong><small>${escapeHtml(item.room || resident?.room || '-')}</small></div><b>${Number(item.electricKwh || 0)} kWh</b><b>${Number(item.waterM3 || 0)} m³</b><i>${rupiah(Number(item.totalAmount || 0))}</i></article>`;
1594:   }).join('');
1595:   return `<section class="admin-page-panel admin-feature-panel" id="utilities" data-section>
1596:     <div class="panel-head wrap"><div><span>Utilities</span><h3>Utility Meter Charges</h3><p>Listrik, air, dan tagihan meter yang masuk ke billing penghuni.</p></div><button class="button primary" type="button" data-open-resident-portal="utilities"><i class="fa-solid fa-user-shield"></i>Open Resident Utilities</button></div>
1597:     <div class="payment-ops-kpis"><article><span>Meter Rows</span><strong>${meters.length}</strong><small>Data utility-meter.php</small></article><article><span>Total Charges</span><strong>${rupiah(totalCharges)}</strong><small>Akumulasi tagihan utilitas</small></article><article><span>Residents</span><strong>${residents.length}</strong><small>Calon/penghuni aktif</small></article><article><span>Input Meter</span><strong>Room Detail</strong><small>Menu Kamar → Meter & Tagihan</small></article></div>
1598:     <div class="admin-feature-actions no-print"><button class="row-print-btn row-print-btn--gold" type="button" data-admin-open-room-feature="meter">Input Meter & Tagihan</button><button class="row-print-btn" type="button" data-open-resident-portal="billing">View Billing Invoice</button><button class="row-print-btn" type="button" id="refreshPayments">Refresh backend</button></div>
1599:     <div class="admin-ops-table"><div class="admin-ops-row admin-ops-row--head"><span>Resident</span><span>Listrik</span><span>Air</span><span>Tagihan</span></div>${latestRows || '<div class="empty admin-empty-state"><strong>Belum ada utility meter.</strong><p>Buka Kamar → Detail → Meter & Tagihan, lalu simpan meter listrik/air.</p></div>'}</div>
1600:   </section>`;
1601: }
1602: 
1603: function renderAdminIotPanel() {
1604:   const telemetryRows = getIotTelemetryRows();
1605:   const roomRows = getRooms().map((room) => {
1606:     const telemetry = telemetryRows.find((item) => item.roomCode === room.no) || null;
1607:     const devices = getRoomDeviceState(room.no);
1608:     return `<article class="admin-ops-row"><div><span>${escapeHtml(room.no)}</span><strong>${escapeHtml(room.name)}</strong><small>${telemetry?.created_at ? `Updated ${escapeHtml(telemetry.created_at)}` : 'No telemetry yet'}</small></div><b>${telemetry ? `${Number(telemetry.temperature || 0)}°C` : '-'}</b><b>${telemetry ? `${Number(telemetry.powerWatt || 0)} W` : devices.lightOn ? 'Manual on' : 'Manual off'}</b><i>${telemetry ? `${Number(telemetry.waterM3 || 0)} m³` : devices.waterOn ? 'Water on' : 'Water off'}</i></article>`;
1609:   }).join('');
1610:   return `<section class="admin-page-panel admin-feature-panel" id="iot" data-section>
1611:     <div class="panel-head wrap"><div><span>IoT Monitoring</span><h3>Room Telemetry</h3><p>Monitoring suhu, kelembapan, daya listrik, energi, dan air dari ESP32/Wokwi.</p></div><button class="button primary" type="button" data-admin-open-room-feature="control"><i class="fa-solid fa-microchip"></i>Open Smart Control</button></div>
1612:     <div class="payment-ops-kpis"><article><span>Telemetry Rooms</span><strong>${telemetryRows.length}</strong><small>Data iot-ingest.php</small></article><article><span>Total Rooms</span><strong>${getRooms().length}</strong><small>Inventory aktif</small></article><article><span>Mode</span><strong>${telemetryRows.length ? 'Live IoT' : 'Manual'}</strong><small>Fallback smart room aktif</small></article><article><span>Endpoint</span><strong>iot-ingest.php</strong><small>GET/POST telemetry</small></article></div>
1613:     <div class="admin-feature-actions no-print"><button class="row-print-btn row-print-btn--gold" type="button" id="seedIotDemo">Seed demo telemetry</button><button class="row-print-btn" type="button" data-open-resident-portal="utilities">Open Resident Utilities</button><button class="row-print-btn" type="button" id="refreshPayments">Refresh IoT</button></div>
1614:     <div class="admin-ops-table"><div class="admin-ops-row admin-ops-row--head"><span>Room</span><span>Temperature</span><span>Power</span><span>Water</span></div>${roomRows}</div>
1615:   </section>`;
1616: }
1617: 
1618: function renderAdminAccessPanel() {
1619:   const resident = getPrimaryAdminResident();
1620:   const roomCode = getRoomCode(resident?.room || '') || getRooms()[0]?.no || 'ROOM';
1621:   const accessState = JSON.parse(window.localStorage.getItem('onyx-access-state') || `{"locked":true,"guestPass":"QR-ONYX-${String(resident?.id || Date.now()).slice(-4)}","validUntil":"22:00"}`);
1622:   const logs = getAccessLogs(accessState);
1623:   const logRows = logs.map((log) => `<p><span>${escapeHtml(log.time)}</span><b>${escapeHtml(log.action)}</b><em>${escapeHtml(log.detail)}</em><i>${escapeHtml(log.status)}</i></p>`).join('');
1624:   return `<section class="admin-page-panel admin-feature-panel" id="access" data-section>
1625:     <div class="panel-head wrap"><div><span>Smart Access</span><h3>Access State & Visitor Pass</h3><p>Kelola lock state, QR tamu, WiFi share, dan access logs resident.</p></div><button class="button primary" type="button" data-open-resident-portal="access"><i class="fa-solid fa-door-closed"></i>Open Resident Access</button></div>
1626:     <div class="admin-access-grid"><article class="access-hero-card"><span>Door Lock</span><strong>${accessState.locked ? 'Locked' : 'Unlocked'}</strong><p>${escapeHtml(resident?.name || 'Resident')} · ${escapeHtml(roomCode)}</p><button class="row-print-btn row-print-btn--gold" type="button" id="adminToggleSmartLock">${accessState.locked ? 'Unlock room' : 'Lock room'}</button></article><article class="visitor-qr-card"><span>Visitor Pass</span><div class="visitor-qr-code" aria-label="Visitor QR ${escapeHtml(accessState.guestPass)}">${renderVisitorQr(accessState.guestPass)}</div><strong>${escapeHtml(accessState.guestPass)}</strong><p>Berlaku sampai ${escapeHtml(accessState.validUntil)} hari ini.</p><button class="row-print-btn" type="button" data-copy-value="${escapeHtml(accessState.guestPass)}" data-access-action="copy-qr">Copy QR Code</button></article><article class="access-hero-card"><span>WiFi Share</span><strong>ONYX-${escapeHtml(roomCode)}</strong><p>Password: onyx-${escapeHtml(roomCode).toLowerCase()}-wifi</p><button class="row-print-btn" type="button" data-copy-value="ONYX-${escapeHtml(roomCode)} / onyx-${escapeHtml(roomCode).toLowerCase()}-wifi" data-access-action="copy-wifi">Share WiFi</button></article></div>
1627:     <div class="resident-saas-table resident-saas-table--access admin-access-logs">${logRows || '<p><span>Now</span><b>Belum ada access logs</b><em>Gunakan tombol Visitor Pass/Lock</em><i>ready</i></p>'}</div>
1628:   </section>`;
1629: }
1630: 
1631: function renderAdminServiceTicketsPanel() {
1632:   const tickets = getAdminServiceTickets();
1633:   const resident = getPrimaryAdminResident();
1634:   const rows = tickets.map((ticket) => `<article class="admin-ops-row"><div><span>${escapeHtml(ticket.category || 'Service')}</span><strong>${escapeHtml(ticket.issue || '-')}</strong><small>${escapeHtml(ticket.application_id || resident?.id || '-')}</small></div><b>${escapeHtml(ticket.priority || 'Normal')}</b><i>${escapeHtml(ticket.status || 'open')}</i></article>`).join('');
1635:   return `<section class="admin-page-panel admin-feature-panel" id="tickets" data-section>
1636:     <div class="panel-head wrap"><div><span>Service Ticketing</span><h3>Resident Service Tickets</h3><p>Buat dan review request perbaikan, kebersihan, WiFi, AC, air, atau listrik.</p></div><button class="button primary" type="button" data-open-resident-portal="service"><i class="fa-solid fa-user-shield"></i>Open Resident Service</button></div>
1637:     <form class="admin-ticket-form no-print" id="adminServiceTicketForm"><input type="hidden" name="application_id" value="${escapeHtml(resident?.id || '')}" /><label>Kategori<select name="category"><option>Maintenance</option><option>WiFi</option><option>Listrik</option><option>Air</option><option>Kebersihan</option></select></label><label>Prioritas<select name="priority"><option>Normal</option><option>High</option><option>Urgent</option></select></label><label class="admin-ticket-form__issue">Issue<input name="issue" placeholder="Contoh: AC kurang dingin / lampu mati" required /></label><button class="button primary" type="submit">Create Service Ticket</button></form>
1638:     <div class="admin-ops-table"><div class="admin-ops-row admin-ops-row--head"><span>Ticket</span><span>Priority</span><span>Status</span></div>${rows || '<div class="empty admin-empty-state"><strong>Belum ada service ticket.</strong><p>Buat tiket dari form admin atau Resident Portal → Service.</p></div>'}</div>
1639:   </section>`;
1640: }
1641: 
1642: function renderAdminResidentPortalPanel() {
1643:   const resident = getPrimaryAdminResident();
1644:   return `<section class="admin-page-panel admin-feature-panel" id="resident-portal" data-section>
1645:     <div class="panel-head wrap"><div><span>Resident Portal</span><h3>Resident-facing Tools</h3><p>Entry point eksplisit untuk QA: Billing, Utilities, Smart Access, Visitor Pass, dan Service Ticketing.</p></div><button class="button primary" type="button" data-open-resident-portal="overview"><i class="fa-solid fa-user-shield"></i>Launch Resident Portal</button></div>
1646:     <div class="admin-portal-grid"><article><span>Resident</span><strong>${escapeHtml(resident?.name || 'Demo Resident')}</strong><p>${escapeHtml(resident?.room || '-')}</p></article><button type="button" data-open-resident-portal="billing"><i class="fa-solid fa-receipt"></i><span>Billing</span><small>Invoices, QRIS, manual transfer</small></button><button type="button" data-open-resident-portal="utilities"><i class="fa-solid fa-bolt"></i><span>Utilities</span><small>Meter charges & IoT usage</small></button><button type="button" data-open-resident-portal="access"><i class="fa-solid fa-door-closed"></i><span>Smart Access</span><small>Visitor Pass, WiFi, access logs</small></button><button type="button" data-open-resident-portal="service"><i class="fa-solid fa-screwdriver-wrench"></i><span>Service Tickets</span><small>Create and review requests</small></button></div>
1647:   </section>`;
1648: }
1649: 
1650: async function refreshAdminStateForSection(section) {
1651:   const liveSections = ['dashboard', 'kamar', 'penghuni', 'utilities', 'iot', 'access', 'tickets', 'resident-portal', 'pembayaran', 'reservasi', 'laporan'];
1652:   if (!liveSections.includes(section)) return renderApp();
1653:   renderApp();
1654:   syncAdminSectionInBackground();
1655: }
1656: 
1657: async function syncAdminSectionInBackground() {
1658:   if (window.__onyxAdminSectionSyncing) return;
1659:   window.__onyxAdminSectionSyncing = true;
1660:   try {
1661:     await syncAdminState(false);
1662:     try {
1663:       const iot = await apiJson('iot-ingest.php');
1664:       window.localStorage.setItem('onyx-iot-telemetry', JSON.stringify(iot.data || []));
1665:     } catch (error) {
1666:       window.localStorage.setItem('onyx-iot-telemetry-sync-error', String(error?.message || error || 'Gagal sinkron IoT'));
1667:     }
1668:     if (state.page === 'admin') renderApp();
1669:   } finally {
1670:     window.__onyxAdminSectionSyncing = false;
1671:   }
1672: }
1673: 
1674: /**
1675:  * @description Render panel manajemen kamar dengan filter proper.
1676:  * @returns {string} Markup panel kamar.
1677:  */
1678: function renderRoomsPanel() {
1679:   if (state.isRoomCreateOpen && !state.adminRoomDetail) return renderRoomCreatePage();
1680:   if (state.adminRoomDetail) {
1681:     const room = getRooms().find((item) => item.no === state.adminRoomDetail) || getRooms()[0];
1682:     return renderRoomDetailPanel(room);
1683:   }
1684:   const filteredRooms = getRooms().filter((room) => {
1685:     const haystack = `${room.no} ${room.name}`.toLowerCase();
1686:     return haystack.includes(state.roomQuery.toLowerCase()) && (!state.roomType || room.type === state.roomType) && (!state.roomStatus || getEffectiveRoomStatus(room) === state.roomStatus);
1687:   });
1688: 
1689:   return `
1690:     <section class="admin-flat-panel" id="kamar" data-section>
1691:       <div class="inventory-head"><div><span>Inventory</span><h3>Manajemen kamar</h3><p>${filteredRooms.length} kamar ditampilkan · status otomatis mengikuti penghuni aktif.</p></div><div class="inventory-actions no-print"><button class="button success" type="button" id="openRoomCreate"><i class="fa-solid fa-plus"></i>Tambah kamar</button><button class="button subtle" type="button" id="printRooms"><i class="fa-solid fa-print"></i>Cetak</button></div></div>
1692:       <div class="inventory-toolbar no-print"><label class="inventory-search" for="adminRoomSearchProxy"><i class="fa-solid fa-magnifying-glass"></i><input form="roomForm" id="adminRoomSearchProxy" type="search" value="${escapeHtml(state.roomQuery)}" placeholder="Cari nomor / nama kamar" /></label><select class="field" id="typeFilter" aria-label="Filter tipe kamar">${['', 'Standard', 'Deluxe', 'Suite', 'VIP'].map((type) => `<option value="${type}" ${state.roomType === type ? 'selected' : ''}>${type || 'Semua tipe'}</option>`).join('')}</select><select class="field" id="statusFilter" aria-label="Filter status kamar">${['', 'tersedia', 'terisi', 'maintenance'].map((status) => `<option value="${status}" ${state.roomStatus === status ? 'selected' : ''}>${status || 'Semua status'}</option>`).join('')}</select></div>
1693:       <div class="room-list"><div class="room-list-head no-print"><span>Kamar</span><span>Detail</span><span>Harga</span><span>Status</span><span>Aksi</span></div>${filteredRooms.map(renderRoomRow).join('') || '<p class="empty">Tidak ada kamar yang cocok.</p>'}</div>
1694:       ${renderRoomsPrintReport(filteredRooms)}
1695:     </section>
1696:   `;
1697: }
1698: 
1699: function renderRoomsPrintReport(rooms) {
1700:   const occupancy = getRoomOccupancyStats();
1701:   const generatedAt = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
1702:   const rows = rooms.map((room) => {
1703:     const occupant = getRoomOccupant(room.no);
1704:     const status = getEffectiveRoomStatus(room);
1705:     const devices = getRoomDeviceState(room.no);
1706:     const telemetry = getIotTelemetry(room.no);
1707:     const latestMeter = getUtilityMeters().find((item) => getRoomCode(item.room) === room.no) || {};
1708:     const climateType = getRoomClimateType(room);
1709:     const climateLabel = climateType === 'ac' ? `AC ${devices.acOn ? `${devices.temperature}°C` : 'mati'}` : climateType === 'fan' ? `Kipas ${devices.fanOn ? 'menyala' : 'mati'}` : 'Ventilasi manual';
1710:     const utilityLabel = latestMeter.month ? `${latestMeter.month}: ${Number(latestMeter.electricKwh || 0)} kWh, ${Number(latestMeter.waterM3 || 0)} m³, ${rupiah(Number(latestMeter.totalAmount || 0))}` : 'Belum ada input meter';
1711: 
1712:     return `<tr><td><strong>${escapeHtml(room.no)}</strong><span>${escapeHtml(room.floor || '-')}</span></td><td><b>${escapeHtml(room.name)}</b><small>${escapeHtml(room.type)} · ${escapeHtml((room.facilities || []).join(', ') || 'Fasilitas belum diisi')}</small></td><td>${rupiah(Number(room.price || 0))}<small>/ bulan</small></td><td><b>${status === 'terisi' ? 'Tidak tersedia' : escapeHtml(status)}</b><small>${escapeHtml(occupant?.name || 'Kosong')}</small></td><td><b>${escapeHtml(climateLabel)}</b><small>Lampu ${devices.lightOn ? 'menyala' : 'mati'} · Air ${devices.waterOn ? 'aktif' : 'nonaktif'}</small></td><td><b>${escapeHtml(utilityLabel)}</b><small>${telemetry?.created_at ? `IoT ${escapeHtml(telemetry.created_at)}` : 'Manual/standby'}</small></td></tr>`;
1713:   }).join('');
1714: 
1715:   return `<section class="room-print-report" aria-label="Laporan cetak kamar"><header><div><span>Onyx Residence</span><h2>Laporan Inventory Kamar</h2><p>Ringkasan status kamar, penghuni aktif, fasilitas, smart control, dan meter utilitas.</p></div><aside><b>${escapeHtml(generatedAt)}</b><small>Dicetak oleh Admin</small></aside></header><div class="room-print-summary"><article><span>Total kamar</span><strong>${occupancy.totalRooms}</strong></article><article><span>Terisi</span><strong>${occupancy.occupiedRooms}</strong></article><article><span>Tersedia</span><strong>${occupancy.availableRooms}</strong></article><article><span>Occupancy</span><strong>${occupancy.occupancyPercent}%</strong></article></div><table><thead><tr><th>Kamar</th><th>Detail</th><th>Harga</th><th>Status</th><th>Smart Control</th><th>Utilitas</th></tr></thead><tbody>${rows || '<tr><td colspan="6">Tidak ada kamar yang cocok dengan filter.</td></tr>'}</tbody></table><footer><span>Catatan</span><p>Status terisi mengikuti penghuni approved. Meter utilitas memakai input terbaru per kamar jika tersedia.</p></footer></section>`;
1716: }
1717: 
1718: /**
1719:  * @description Render satu baris kamar dengan aksi CRUD.
1720:  * @param {object} room Data kamar.
1721:  * @returns {string} Markup row kamar.
1722:  */
1723: function renderRoomRow(room) {
1724:   const status = getEffectiveRoomStatus(room);
1725:   return `<article class="room-row"><div class="room-code"><strong>${room.no}</strong><span>${room.floor}</span></div><div class="room-main"><h4>${escapeHtml(room.name)}</h4><p>${room.type} · ${room.facilities.map(escapeHtml).join(', ')}</p></div><div class="room-price"><strong>${rupiah(room.price)}</strong><span>/ bulan</span></div><span class="badge ${status}">${status === 'terisi' ? 'tidak tersedia' : status}</span><div class="row-actions row-actions--text no-print"><button type="button" data-room-edit="${escapeHtml(room.no)}" aria-label="Edit ${room.no}"><i class="fa-regular fa-pen-to-square"></i>Edit</button><button type="button" data-room-delete="${escapeHtml(room.no)}" aria-label="Hapus ${room.no}"><i class="fa-regular fa-trash-can"></i>Hapus</button></div></article>`;
1726: }
1727: 
1728: function renderRoomCreatePage() {
1729:   return `<section class="admin-flat-panel admin-page-panel room-detail-panel"><div class="panel-head wrap"><div><span>Tambah Kamar</span><h3>Inventory kamar baru</h3></div><button class="button subtle" type="button" id="backToRooms"><i class="fa-solid fa-arrow-left"></i>Kembali</button></div>${renderRoomEditorForm()}</section>`;
1730: }
1731: 
1732: function renderRoomEditorForm(room = null) {
1733:   return `<form class="room-form no-print room-editor-form" id="roomForm"><div class="form-title"><h4>${room ? 'Edit kamar' : 'Tambah kamar'}</h4><span>Data inventory kamar tersimpan tanpa mengacak list utama.</span></div><input type="hidden" name="id_kamar" value="${escapeHtml(room?.id || '')}" /><label>Nomor<input required name="no_kamar" value="${escapeHtml(room?.no || '')}" placeholder="A09" /></label><label>Kategori<select required name="kategori">${['Standard', 'Deluxe', 'Suite', 'VIP'].map((type) => `<option ${room?.type === type ? 'selected' : ''}>${type}</option>`).join('')}</select></label><label>Nama kamar<input required name="nama_kamar" value="${escapeHtml(room?.name || '')}" placeholder="Onyx Studio" /></label><label>Harga<input required name="harga" type="number" min="0" value="${escapeHtml(room?.price || '')}" placeholder="3100000" /></label><label>Status<select name="status">${['tersedia', 'terisi', 'maintenance'].map((status) => `<option ${getEffectiveRoomStatus(room || {}) === status ? 'selected' : ''}>${status}</option>`).join('')}</select></label><label class="full">Fasilitas<textarea name="fasilitas" placeholder="AC, WiFi, kamar mandi dalam">${escapeHtml((room?.facilities || []).join(', '))}</textarea></label><div class="form-actions full"><button class="button primary" type="submit">Simpan</button><button class="button subtle" type="button" id="closeRoomEditor">Batal</button></div></form>`;
1734: }
1735: 
1736: function renderRoomUtilityForm(room, occupant = null) {
1737:   const month = new Date().toISOString().slice(0, 7);
1738:   return `<form class="room-utility-form no-print" id="roomUtilityMeterForm"><div><span>Input Meter</span><h4>Catat listrik, air, dan tagihan</h4><p>Data masuk ke billing penghuni dan histori meter kamar ini.</p></div><input type="hidden" name="application_id" value="${escapeHtml(occupant?.id || '')}" /><input type="hidden" name="room" value="${escapeHtml(room.no)}" /><input type="hidden" name="residentName" value="${escapeHtml(occupant?.name || '')}" /><label>Bulan<input name="month" type="month" value="${month}" required /></label><label>Listrik kWh<input name="electricKwh" type="number" min="0" step="0.1" placeholder="0" required /></label><label>Air m³<input name="waterM3" type="number" min="0" step="0.1" placeholder="0" required /></label><label>Tarif listrik/kWh<input name="electricRate" type="number" min="0" value="1500" required /></label><label>Tarif air/m³<input name="waterRate" type="number" min="0" value="8000" required /></label><label>Biaya tetap<input name="fixedFee" type="number" min="0" value="0" /></label><button class="button primary" type="submit">Simpan Meter</button></form>`;
1739: }

(Showing lines 1480-1739 of 3298. Use offset=1740 to continue.)
</content>
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 12.8s)

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src\\main.js",
  "offset": 1535,
  "limit": 300
}
```

**Output:**
```
<path>C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\main.js</path>
<type>file</type>
<content>
1535: function renderAdminSection() {
1536:   if (state.activeAdminSection === 'kamar') return renderRoomsPanel();
1537:     if (state.activeAdminSection === 'penghuni') return renderResidentsAdminPanel();
1538:   if (state.activeAdminSection === 'utilities') return renderAdminUtilitiesPanel();
1539:   if (state.activeAdminSection === 'iot') return renderAdminIotPanel();
1540:   if (state.activeAdminSection === 'access') return renderAdminAccessPanel();
1541:   if (state.activeAdminSection === 'tickets') return renderAdminServiceTicketsPanel();
1542:   if (state.activeAdminSection === 'resident-portal') return renderAdminResidentPortalPanel();
1543:   if (state.activeAdminSection === 'pembayaran') return renderPaymentsAdminPanel();
1544:   if (state.activeAdminSection === 'reservasi') return renderReservationsPanel();
1545:   if (state.activeAdminSection === 'laporan') return renderCashflowPanel();
1546:   return renderDashboard();
1547: }
1548: 
1549: /**
1550:  * @description Render dashboard ringkas dengan metrik dan grafik pendapatan.
1551:  * @returns {string} Markup dashboard.
1552:  */
1553: function renderDashboard() {
1554:   const { resident, proof, proofs, qrisParts, splitParts, total } = getAdminApplicationState();
1555:   const backendState = JSON.parse(window.localStorage.getItem('onyx-admin-state') || 'null');
1556:   const applications = backendState?.applications || backendState?.data?.applications || [];
1557:   const utilityMeters = backendState?.utility_meters || backendState?.data?.utility_meters || [];
1558:   const telemetryRows = getIotTelemetryRows();
1559:   const serviceTickets = getAdminServiceTickets();
1560:   const pendingPayment = proofs.filter((item) => item.status === 'uploaded').length;
1561:   const applicantCount = applications.length;
1562:   const { occupiedRooms, availableRooms, totalRooms } = getRoomOccupancyStats();
1563:   const paidQrisTotal = qrisParts.reduce((sum, index) => sum + Number(splitParts[index] || 0), 0);
1564:   return `
1565:     <section class="admin-ops-strip" id="dashboard" data-section>
1566:       <article><span>Occupancy</span><strong>${occupiedRooms}</strong><small>${occupiedRooms} / ${totalRooms} kamar real</small></article>
1567:       <article><span>Available</span><strong>${availableRooms}</strong><small>Siap ditempati</small></article>
1568:       <article><span>Aplikasi Baru</span><strong>${applicantCount}</strong><small>${resident?.applicationStatus || 'Tidak ada applicant'}</small></article>
1569:       <article><span>Payment Queue</span><strong>${pendingPayment}</strong><small>${proof?.status === 'uploaded' ? 'Bukti transfer menunggu approve' : resident?.name ? 'Menunggu pembayaran / QRIS split' : 'Tidak ada applicant pending'}</small></article>
1570:     </section>
1571: 
1572:     <section class="admin-discovery-grid no-print" aria-label="Resident Portal, Utilities, IoT Monitoring, Smart Access, Visitor Pass, Service Tickets">
1573:       <article><span>Resident Portal</span><h3>Utilities · Access · Service</h3><p>Buka portal penghuni langsung dari akun admin untuk QA dan operasional.</p><button class="row-print-btn row-print-btn--gold" type="button" data-open-resident-portal="overview">Open Resident Portal</button></article>
1574:       <article><span>Utilities</span><h3>Meter Charges</h3><p>${utilityMeters.length} data listrik/air tersimpan untuk billing penghuni.</p><button class="row-print-btn" type="button" data-admin-quick-section="utilities">View utility meter charges</button></article>
1575:       <article><span>IoT Monitoring</span><h3>Room Telemetry</h3><p>${telemetryRows.length} kamar memiliki telemetry suhu, daya, dan air.</p><button class="row-print-btn" type="button" data-admin-quick-section="iot">View room telemetry</button></article>
1576:       <article><span>Smart Access</span><h3>Visitor Pass</h3><p>Lock state, guest QR, WiFi share, dan access logs resident.</p><button class="row-print-btn" type="button" data-admin-quick-section="access">View access state and visitor pass</button></article>
1577:       <article><span>Service Tickets</span><h3>Requests</h3><p>${serviceTickets.length} tiket layanan/cache siap direview.</p><button class="row-print-btn" type="button" data-admin-quick-section="tickets">Create / review service ticket</button></article>
1578:     </section>
1579: 
1580:     <section class="split-grid admin-dashboard-main">
1581:       <article class="panel chart-card"><div class="panel-head"><div><span>Utility</span><h3>Meter real tersimpan</h3></div></div><div class="admin-action-list"><p><span>Meter rows</span><b>${utilityMeters.length} data utilitas</b><em>Dari backend utility-meter.php</em></p><p><span>Payment proof</span><b>${proofs.length} bukti transfer</b><em>Queue real backend</em></p></div></article>
1582:       <article class="panel table-card"><div class="panel-head"><div><span>Today</span><h3>Action queue</h3></div><a class="text-btn" href="#pembayaran" data-admin-section="pembayaran">Open</a></div><div class="admin-action-list">${resident?.name ? `<p><span>Applicant</span><b>${escapeHtml(resident.name)} · ${escapeHtml(resident.room || '-')}</b><em>${escapeHtml(resident.administrationStatus || resident.applicationStatus || 'Review')}</em></p><p><span>Split QRIS</span><b>${qrisParts.length}/${splitParts.length} part dibuka</b><em>${rupiah(paidQrisTotal)} dari ${rupiah(total)}</em></p><p><span>Refund</span><b>${escapeHtml(resident.refundBank || '-')} · ${escapeHtml(resident.refundAccount || '-')}</b><em>${escapeHtml(resident.refundAccountName || 'Nama rekening belum ada')}</em></p>` : '<p><span>Applicant</span><b>Belum ada pendaftaran baru</b><em>Menunggu data Book</em></p>'}</div></article>
1583:     </section>
1584:   `;
1585: }
1586: 
1587: function renderAdminUtilitiesPanel() {
1588:   const residents = getAdminResidentCandidates();
1589:   const meters = getUtilityMeters();
1590:   const totalCharges = meters.reduce((sum, item) => sum + Number(item.totalAmount || 0), 0);
1591:   const latestRows = meters.slice(0, 12).map((item) => {
1592:     const resident = residents.find((candidate) => candidate.id === item.application_id || getRoomCode(candidate.room) === getRoomCode(item.room));
1593:     return `<article class="admin-ops-row"><div><span>${escapeHtml(item.month || '-')}</span><strong>${escapeHtml(item.residentName || resident?.name || 'Resident')}</strong><small>${escapeHtml(item.room || resident?.room || '-')}</small></div><b>${Number(item.electricKwh || 0)} kWh</b><b>${Number(item.waterM3 || 0)} m³</b><i>${rupiah(Number(item.totalAmount || 0))}</i></article>`;
1594:   }).join('');
1595:   return `<section class="admin-page-panel admin-feature-panel" id="utilities" data-section>
1596:     <div class="panel-head wrap"><div><span>Utilities</span><h3>Utility Meter Charges</h3><p>Listrik, air, dan tagihan meter yang masuk ke billing penghuni.</p></div><button class="button primary" type="button" data-open-resident-portal="utilities"><i class="fa-solid fa-user-shield"></i>Open Resident Utilities</button></div>
1597:     <div class="payment-ops-kpis"><article><span>Meter Rows</span><strong>${meters.length}</strong><small>Data utility-meter.php</small></article><article><span>Total Charges</span><strong>${rupiah(totalCharges)}</strong><small>Akumulasi tagihan utilitas</small></article><article><span>Residents</span><strong>${residents.length}</strong><small>Calon/penghuni aktif</small></article><article><span>Input Meter</span><strong>Room Detail</strong><small>Menu Kamar → Meter & Tagihan</small></article></div>
1598:     <div class="admin-feature-actions no-print"><button class="row-print-btn row-print-btn--gold" type="button" data-admin-open-room-feature="meter">Input Meter & Tagihan</button><button class="row-print-btn" type="button" data-open-resident-portal="billing">View Billing Invoice</button><button class="row-print-btn" type="button" id="refreshPayments">Refresh backend</button></div>
1599:     <div class="admin-ops-table"><div class="admin-ops-row admin-ops-row--head"><span>Resident</span><span>Listrik</span><span>Air</span><span>Tagihan</span></div>${latestRows || '<div class="empty admin-empty-state"><strong>Belum ada utility meter.</strong><p>Buka Kamar → Detail → Meter & Tagihan, lalu simpan meter listrik/air.</p></div>'}</div>
1600:   </section>`;
1601: }
1602: 
1603: function renderAdminIotPanel() {
1604:   const telemetryRows = getIotTelemetryRows();
1605:   const roomRows = getRooms().map((room) => {
1606:     const telemetry = telemetryRows.find((item) => item.roomCode === room.no) || null;
1607:     const devices = getRoomDeviceState(room.no);
1608:     return `<article class="admin-ops-row"><div><span>${escapeHtml(room.no)}</span><strong>${escapeHtml(room.name)}</strong><small>${telemetry?.created_at ? `Updated ${escapeHtml(telemetry.created_at)}` : 'No telemetry yet'}</small></div><b>${telemetry ? `${Number(telemetry.temperature || 0)}°C` : '-'}</b><b>${telemetry ? `${Number(telemetry.powerWatt || 0)} W` : devices.lightOn ? 'Manual on' : 'Manual off'}</b><i>${telemetry ? `${Number(telemetry.waterM3 || 0)} m³` : devices.waterOn ? 'Water on' : 'Water off'}</i></article>`;
1609:   }).join('');
1610:   return `<section class="admin-page-panel admin-feature-panel" id="iot" data-section>
1611:     <div class="panel-head wrap"><div><span>IoT Monitoring</span><h3>Room Telemetry</h3><p>Monitoring suhu, kelembapan, daya listrik, energi, dan air dari ESP32/Wokwi.</p></div><button class="button primary" type="button" data-admin-open-room-feature="control"><i class="fa-solid fa-microchip"></i>Open Smart Control</button></div>
1612:     <div class="payment-ops-kpis"><article><span>Telemetry Rooms</span><strong>${telemetryRows.length}</strong><small>Data iot-ingest.php</small></article><article><span>Total Rooms</span><strong>${getRooms().length}</strong><small>Inventory aktif</small></article><article><span>Mode</span><strong>${telemetryRows.length ? 'Live IoT' : 'Manual'}</strong><small>Fallback smart room aktif</small></article><article><span>Endpoint</span><strong>iot-ingest.php</strong><small>GET/POST telemetry</small></article></div>
1613:     <div class="admin-feature-actions no-print"><button class="row-print-btn row-print-btn--gold" type="button" id="seedIotDemo">Seed demo telemetry</button><button class="row-print-btn" type="button" data-open-resident-portal="utilities">Open Resident Utilities</button><button class="row-print-btn" type="button" id="refreshPayments">Refresh IoT</button></div>
1614:     <div class="admin-ops-table"><div class="admin-ops-row admin-ops-row--head"><span>Room</span><span>Temperature</span><span>Power</span><span>Water</span></div>${roomRows}</div>
1615:   </section>`;
1616: }
1617: 
1618: function renderAdminAccessPanel() {
1619:   const resident = getPrimaryAdminResident();
1620:   const roomCode = getRoomCode(resident?.room || '') || getRooms()[0]?.no || 'ROOM';
1621:   const accessState = JSON.parse(window.localStorage.getItem('onyx-access-state') || `{"locked":true,"guestPass":"QR-ONYX-${String(resident?.id || Date.now()).slice(-4)}","validUntil":"22:00"}`);
1622:   const logs = getAccessLogs(accessState);
1623:   const logRows = logs.map((log) => `<p><span>${escapeHtml(log.time)}</span><b>${escapeHtml(log.action)}</b><em>${escapeHtml(log.detail)}</em><i>${escapeHtml(log.status)}</i></p>`).join('');
1624:   return `<section class="admin-page-panel admin-feature-panel" id="access" data-section>
1625:     <div class="panel-head wrap"><div><span>Smart Access</span><h3>Access State & Visitor Pass</h3><p>Kelola lock state, QR tamu, WiFi share, dan access logs resident.</p></div><button class="button primary" type="button" data-open-resident-portal="access"><i class="fa-solid fa-door-closed"></i>Open Resident Access</button></div>
1626:     <div class="admin-access-grid"><article class="access-hero-card"><span>Door Lock</span><strong>${accessState.locked ? 'Locked' : 'Unlocked'}</strong><p>${escapeHtml(resident?.name || 'Resident')} · ${escapeHtml(roomCode)}</p><button class="row-print-btn row-print-btn--gold" type="button" id="adminToggleSmartLock">${accessState.locked ? 'Unlock room' : 'Lock room'}</button></article><article class="visitor-qr-card"><span>Visitor Pass</span><div class="visitor-qr-code" aria-label="Visitor QR ${escapeHtml(accessState.guestPass)}">${renderVisitorQr(accessState.guestPass)}</div><strong>${escapeHtml(accessState.guestPass)}</strong><p>Berlaku sampai ${escapeHtml(accessState.validUntil)} hari ini.</p><button class="row-print-btn" type="button" data-copy-value="${escapeHtml(accessState.guestPass)}" data-access-action="copy-qr">Copy QR Code</button></article><article class="access-hero-card"><span>WiFi Share</span><strong>ONYX-${escapeHtml(roomCode)}</strong><p>Password: onyx-${escapeHtml(roomCode).toLowerCase()}-wifi</p><button class="row-print-btn" type="button" data-copy-value="ONYX-${escapeHtml(roomCode)} / onyx-${escapeHtml(roomCode).toLowerCase()}-wifi" data-access-action="copy-wifi">Share WiFi</button></article></div>
1627:     <div class="resident-saas-table resident-saas-table--access admin-access-logs">${logRows || '<p><span>Now</span><b>Belum ada access logs</b><em>Gunakan tombol Visitor Pass/Lock</em><i>ready</i></p>'}</div>
1628:   </section>`;
1629: }
1630: 
1631: function renderAdminServiceTicketsPanel() {
1632:   const tickets = getAdminServiceTickets();
1633:   const resident = getPrimaryAdminResident();
1634:   const rows = tickets.map((ticket) => `<article class="admin-ops-row"><div><span>${escapeHtml(ticket.category || 'Service')}</span><strong>${escapeHtml(ticket.issue || '-')}</strong><small>${escapeHtml(ticket.application_id || resident?.id || '-')}</small></div><b>${escapeHtml(ticket.priority || 'Normal')}</b><i>${escapeHtml(ticket.status || 'open')}</i></article>`).join('');
1635:   return `<section class="admin-page-panel admin-feature-panel" id="tickets" data-section>
1636:     <div class="panel-head wrap"><div><span>Service Ticketing</span><h3>Resident Service Tickets</h3><p>Buat dan review request perbaikan, kebersihan, WiFi, AC, air, atau listrik.</p></div><button class="button primary" type="button" data-open-resident-portal="service"><i class="fa-solid fa-user-shield"></i>Open Resident Service</button></div>
1637:     <form class="admin-ticket-form no-print" id="adminServiceTicketForm"><input type="hidden" name="application_id" value="${escapeHtml(resident?.id || '')}" /><label>Kategori<select name="category"><option>Maintenance</option><option>WiFi</option><option>Listrik</option><option>Air</option><option>Kebersihan</option></select></label><label>Prioritas<select name="priority"><option>Normal</option><option>High</option><option>Urgent</option></select></label><label class="admin-ticket-form__issue">Issue<input name="issue" placeholder="Contoh: AC kurang dingin / lampu mati" required /></label><button class="button primary" type="submit">Create Service Ticket</button></form>
1638:     <div class="admin-ops-table"><div class="admin-ops-row admin-ops-row--head"><span>Ticket</span><span>Priority</span><span>Status</span></div>${rows || '<div class="empty admin-empty-state"><strong>Belum ada service ticket.</strong><p>Buat tiket dari form admin atau Resident Portal → Service.</p></div>'}</div>
1639:   </section>`;
1640: }
1641: 
1642: function renderAdminResidentPortalPanel() {
1643:   const resident = getPrimaryAdminResident();
1644:   return `<section class="admin-page-panel admin-feature-panel" id="resident-portal" data-section>
1645:     <div class="panel-head wrap"><div><span>Resident Portal</span><h3>Resident-facing Tools</h3><p>Entry point eksplisit untuk QA: Billing, Utilities, Smart Access, Visitor Pass, dan Service Ticketing.</p></div><button class="button primary" type="button" data-open-resident-portal="overview"><i class="fa-solid fa-user-shield"></i>Launch Resident Portal</button></div>
1646:     <div class="admin-portal-grid"><article><span>Resident</span><strong>${escapeHtml(resident?.name || 'Demo Resident')}</strong><p>${escapeHtml(resident?.room || '-')}</p></article><button type="button" data-open-resident-portal="billing"><i class="fa-solid fa-receipt"></i><span>Billing</span><small>Invoices, QRIS, manual transfer</small></button><button type="button" data-open-resident-portal="utilities"><i class="fa-solid fa-bolt"></i><span>Utilities</span><small>Meter charges & IoT usage</small></button><button type="button" data-open-resident-portal="access"><i class="fa-solid fa-door-closed"></i><span>Smart Access</span><small>Visitor Pass, WiFi, access logs</small></button><button type="button" data-open-resident-portal="service"><i class="fa-solid fa-screwdriver-wrench"></i><span>Service Tickets</span><small>Create and review requests</small></button></div>
1647:   </section>`;
1648: }
1649: 
1650: async function refreshAdminStateForSection(section) {
1651:   const liveSections = ['dashboard', 'kamar', 'penghuni', 'utilities', 'iot', 'access', 'tickets', 'resident-portal', 'pembayaran', 'reservasi', 'laporan'];
1652:   if (!liveSections.includes(section)) return renderApp();
1653:   renderApp();
1654:   syncAdminSectionInBackground();
1655: }
1656: 
1657: async function syncAdminSectionInBackground() {
1658:   if (window.__onyxAdminSectionSyncing) return;
1659:   window.__onyxAdminSectionSyncing = true;
1660:   try {
1661:     await syncAdminState(false);
1662:     try {
1663:       const iot = await apiJson('iot-ingest.php');
1664:       window.localStorage.setItem('onyx-iot-telemetry', JSON.stringify(iot.data || []));
1665:     } catch (error) {
1666:       window.localStorage.setItem('onyx-iot-telemetry-sync-error', String(error?.message || error || 'Gagal sinkron IoT'));
1667:     }
1668:     if (state.page === 'admin') renderApp();
1669:   } finally {
1670:     window.__onyxAdminSectionSyncing = false;
1671:   }
1672: }
1673: 
1674: /**
1675:  * @description Render panel manajemen kamar dengan filter proper.
1676:  * @returns {string} Markup panel kamar.
1677:  */
1678: function renderRoomsPanel() {
1679:   if (state.isRoomCreateOpen && !state.adminRoomDetail) return renderRoomCreatePage();
1680:   if (state.adminRoomDetail) {
1681:     const room = getRooms().find((item) => item.no === state.adminRoomDetail) || getRooms()[0];
1682:     return renderRoomDetailPanel(room);
1683:   }
1684:   const filteredRooms = getRooms().filter((room) => {
1685:     const haystack = `${room.no} ${room.name}`.toLowerCase();
1686:     return haystack.includes(state.roomQuery.toLowerCase()) && (!state.roomType || room.type === state.roomType) && (!state.roomStatus || getEffectiveRoomStatus(room) === state.roomStatus);
1687:   });
1688: 
1689:   return `
1690:     <section class="admin-flat-panel" id="kamar" data-section>
1691:       <div class="inventory-head"><div><span>Inventory</span><h3>Manajemen kamar</h3><p>${filteredRooms.length} kamar ditampilkan · status otomatis mengikuti penghuni aktif.</p></div><div class="inventory-actions no-print"><button class="button success" type="button" id="openRoomCreate"><i class="fa-solid fa-plus"></i>Tambah kamar</button><button class="button subtle" type="button" id="printRooms"><i class="fa-solid fa-print"></i>Cetak</button></div></div>
1692:       <div class="inventory-toolbar no-print"><label class="inventory-search" for="adminRoomSearchProxy"><i class="fa-solid fa-magnifying-glass"></i><input form="roomForm" id="adminRoomSearchProxy" type="search" value="${escapeHtml(state.roomQuery)}" placeholder="Cari nomor / nama kamar" /></label><select class="field" id="typeFilter" aria-label="Filter tipe kamar">${['', 'Standard', 'Deluxe', 'Suite', 'VIP'].map((type) => `<option value="${type}" ${state.roomType === type ? 'selected' : ''}>${type || 'Semua tipe'}</option>`).join('')}</select><select class="field" id="statusFilter" aria-label="Filter status kamar">${['', 'tersedia', 'terisi', 'maintenance'].map((status) => `<option value="${status}" ${state.roomStatus === status ? 'selected' : ''}>${status || 'Semua status'}</option>`).join('')}</select></div>
1693:       <div class="room-list"><div class="room-list-head no-print"><span>Kamar</span><span>Detail</span><span>Harga</span><span>Status</span><span>Aksi</span></div>${filteredRooms.map(renderRoomRow).join('') || '<p class="empty">Tidak ada kamar yang cocok.</p>'}</div>
1694:       ${renderRoomsPrintReport(filteredRooms)}
1695:     </section>
1696:   `;
1697: }
1698: 
1699: function renderRoomsPrintReport(rooms) {
1700:   const occupancy = getRoomOccupancyStats();
1701:   const generatedAt = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
1702:   const rows = rooms.map((room) => {
1703:     const occupant = getRoomOccupant(room.no);
1704:     const status = getEffectiveRoomStatus(room);
1705:     const devices = getRoomDeviceState(room.no);
1706:     const telemetry = getIotTelemetry(room.no);
1707:     const latestMeter = getUtilityMeters().find((item) => getRoomCode(item.room) === room.no) || {};
1708:     const climateType = getRoomClimateType(room);
1709:     const climateLabel = climateType === 'ac' ? `AC ${devices.acOn ? `${devices.temperature}°C` : 'mati'}` : climateType === 'fan' ? `Kipas ${devices.fanOn ? 'menyala' : 'mati'}` : 'Ventilasi manual';
1710:     const utilityLabel = latestMeter.month ? `${latestMeter.month}: ${Number(latestMeter.electricKwh || 0)} kWh, ${Number(latestMeter.waterM3 || 0)} m³, ${rupiah(Number(latestMeter.totalAmount || 0))}` : 'Belum ada input meter';
1711: 
1712:     return `<tr><td><strong>${escapeHtml(room.no)}</strong><span>${escapeHtml(room.floor || '-')}</span></td><td><b>${escapeHtml(room.name)}</b><small>${escapeHtml(room.type)} · ${escapeHtml((room.facilities || []).join(', ') || 'Fasilitas belum diisi')}</small></td><td>${rupiah(Number(room.price || 0))}<small>/ bulan</small></td><td><b>${status === 'terisi' ? 'Tidak tersedia' : escapeHtml(status)}</b><small>${escapeHtml(occupant?.name || 'Kosong')}</small></td><td><b>${escapeHtml(climateLabel)}</b><small>Lampu ${devices.lightOn ? 'menyala' : 'mati'} · Air ${devices.waterOn ? 'aktif' : 'nonaktif'}</small></td><td><b>${escapeHtml(utilityLabel)}</b><small>${telemetry?.created_at ? `IoT ${escapeHtml(telemetry.created_at)}` : 'Manual/standby'}</small></td></tr>`;
1713:   }).join('');
1714: 
1715:   return `<section class="room-print-report" aria-label="Laporan cetak kamar"><header><div><span>Onyx Residence</span><h2>Laporan Inventory Kamar</h2><p>Ringkasan status kamar, penghuni aktif, fasilitas, smart control, dan meter utilitas.</p></div><aside><b>${escapeHtml(generatedAt)}</b><small>Dicetak oleh Admin</small></aside></header><div class="room-print-summary"><article><span>Total kamar</span><strong>${occupancy.totalRooms}</strong></article><article><span>Terisi</span><strong>${occupancy.occupiedRooms}</strong></article><article><span>Tersedia</span><strong>${occupancy.availableRooms}</strong></article><article><span>Occupancy</span><strong>${occupancy.occupancyPercent}%</strong></article></div><table><thead><tr><th>Kamar</th><th>Detail</th><th>Harga</th><th>Status</th><th>Smart Control</th><th>Utilitas</th></tr></thead><tbody>${rows || '<tr><td colspan="6">Tidak ada kamar yang cocok dengan filter.</td></tr>'}</tbody></table><footer><span>Catatan</span><p>Status terisi mengikuti penghuni approved. Meter utilitas memakai input terbaru per kamar jika tersedia.</p></footer></section>`;
1716: }
1717: 
1718: /**
1719:  * @description Render satu baris kamar dengan aksi CRUD.
1720:  * @param {object} room Data kamar.
1721:  * @returns {string} Markup row kamar.
1722:  */
1723: function renderRoomRow(room) {
1724:   const status = getEffectiveRoomStatus(room);
1725:   return `<article class="room-row"><div class="room-code"><strong>${room.no}</strong><span>${room.floor}</span></div><div class="room-main"><h4>${escapeHtml(room.name)}</h4><p>${room.type} · ${room.facilities.map(escapeHtml).join(', ')}</p></div><div class="room-price"><strong>${rupiah(room.price)}</strong><span>/ bulan</span></div><span class="badge ${status}">${status === 'terisi' ? 'tidak tersedia' : status}</span><div class="row-actions row-actions--text no-print"><button type="button" data-room-edit="${escapeHtml(room.no)}" aria-label="Edit ${room.no}"><i class="fa-regular fa-pen-to-square"></i>Edit</button><button type="button" data-room-delete="${escapeHtml(room.no)}" aria-label="Hapus ${room.no}"><i class="fa-regular fa-trash-can"></i>Hapus</button></div></article>`;
1726: }
1727: 
1728: function renderRoomCreatePage() {
1729:   return `<section class="admin-flat-panel admin-page-panel room-detail-panel"><div class="panel-head wrap"><div><span>Tambah Kamar</span><h3>Inventory kamar baru</h3></div><button class="button subtle" type="button" id="backToRooms"><i class="fa-solid fa-arrow-left"></i>Kembali</button></div>${renderRoomEditorForm()}</section>`;
1730: }
1731: 
1732: function renderRoomEditorForm(room = null) {
1733:   return `<form class="room-form no-print room-editor-form" id="roomForm"><div class="form-title"><h4>${room ? 'Edit kamar' : 'Tambah kamar'}</h4><span>Data inventory kamar tersimpan tanpa mengacak list utama.</span></div><input type="hidden" name="id_kamar" value="${escapeHtml(room?.id || '')}" /><label>Nomor<input required name="no_kamar" value="${escapeHtml(room?.no || '')}" placeholder="A09" /></label><label>Kategori<select required name="kategori">${['Standard', 'Deluxe', 'Suite', 'VIP'].map((type) => `<option ${room?.type === type ? 'selected' : ''}>${type}</option>`).join('')}</select></label><label>Nama kamar<input required name="nama_kamar" value="${escapeHtml(room?.name || '')}" placeholder="Onyx Studio" /></label><label>Harga<input required name="harga" type="number" min="0" value="${escapeHtml(room?.price || '')}" placeholder="3100000" /></label><label>Status<select name="status">${['tersedia', 'terisi', 'maintenance'].map((status) => `<option ${getEffectiveRoomStatus(room || {}) === status ? 'selected' : ''}>${status}</option>`).join('')}</select></label><label class="full">Fasilitas<textarea name="fasilitas" placeholder="AC, WiFi, kamar mandi dalam">${escapeHtml((room?.facilities || []).join(', '))}</textarea></label><div class="form-actions full"><button class="button primary" type="submit">Simpan</button><button class="button subtle" type="button" id="closeRoomEditor">Batal</button></div></form>`;
1734: }
1735: 
1736: function renderRoomUtilityForm(room, occupant = null) {
1737:   const month = new Date().toISOString().slice(0, 7);
1738:   return `<form class="room-utility-form no-print" id="roomUtilityMeterForm"><div><span>Input Meter</span><h4>Catat listrik, air, dan tagihan</h4><p>Data masuk ke billing penghuni dan histori meter kamar ini.</p></div><input type="hidden" name="application_id" value="${escapeHtml(occupant?.id || '')}" /><input type="hidden" name="room" value="${escapeHtml(room.no)}" /><input type="hidden" name="residentName" value="${escapeHtml(occupant?.name || '')}" /><label>Bulan<input name="month" type="month" value="${month}" required /></label><label>Listrik kWh<input name="electricKwh" type="number" min="0" step="0.1" placeholder="0" required /></label><label>Air m³<input name="waterM3" type="number" min="0" step="0.1" placeholder="0" required /></label><label>Tarif listrik/kWh<input name="electricRate" type="number" min="0" value="1500" required /></label><label>Tarif air/m³<input name="waterRate" type="number" min="0" value="8000" required /></label><label>Biaya tetap<input name="fixedFee" type="number" min="0" value="0" /></label><button class="button primary" type="submit">Simpan Meter</button></form>`;
1739: }
1740: 
1741: function renderRoomDetailPanel(room) {
1742:   if (!room) return `<section class="admin-flat-panel admin-page-panel"><button class="button subtle" type="button" id="backToRooms"><i class="fa-solid fa-arrow-left"></i>Kembali</button></section>`;
1743:   const occupant = getRoomOccupant(room.no);
1744:   const devices = getRoomDeviceState(room.no);
1745:   const utilityMeters = getUtilityMeters().filter((item) => getRoomCode(item.room) === room.no);
1746:   const latest = utilityMeters[0] || {};
1747:   const telemetry = getIotTelemetry(room.no);
1748:   const climateType = getRoomClimateType(room);
1749:   const facilityList = room.facilities?.length ? room.facilities.map(escapeHtml).join(' · ') : 'Fasilitas belum diisi';
1750:   const effectiveStatus = getEffectiveRoomStatus(room);
1751:   const section = state.activeRoomDetailSection || 'overview';
1752:   const detailNav = [['overview', 'Overview'], ['control', 'Smart Control'], ['meter', 'Meter & Tagihan']];
1753:   const climateRows = climateType === 'ac'
1754:     ? `<p><span><i class="fa-solid fa-snowflake"></i> AC</span><strong>${devices.acOn ? `${devices.temperature}°C` : 'Mati'}</strong><button class="row-print-btn ${devices.acOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="acOn" data-room-code="${escapeHtml(room.no)}">${devices.acOn ? 'Matikan' : 'Nyalakan'}</button></p><label class="room-detail-range"><span>Suhu AC</span><input type="range" min="18" max="30" value="${devices.temperature}" data-admin-room-temp="${escapeHtml(room.no)}" ${devices.acOn ? '' : 'disabled'} /><strong>${devices.temperature}°C</strong></label>`
1755:     : climateType === 'fan'
1756:       ? `<p><span><i class="fa-solid fa-fan"></i> Kipas</span><strong>${devices.fanOn ? 'Menyala' : 'Mati'}</strong><button class="row-print-btn ${devices.fanOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="fanOn" data-room-code="${escapeHtml(room.no)}">${devices.fanOn ? 'Matikan' : 'Nyalakan'}</button></p><p><span><i class="fa-solid fa-wind"></i> Sirkulasi</span><strong>Jendela luar</strong><em>Tanpa AC</em></p>`
1757:       : `<p><span><i class="fa-solid fa-wind"></i> Ventilasi</span><strong>Manual</strong><em>Tidak ada AC/kipas</em></p>`;
1758:   const overviewPage = `<article class="room-detail-card room-detail-card--wide"><div class="room-detail-card__head"><div><span>Overview</span><h4>Informasi kamar</h4></div></div><div class="room-detail-list"><p><span>Status</span><strong>${effectiveStatus === 'terisi' ? 'Tidak tersedia' : escapeHtml(effectiveStatus)}</strong></p><p><span>Tipe</span><strong>${escapeHtml(room.type)}</strong></p><p><span>Fasilitas</span><strong>${facilityList}</strong></p><p><span>Penghuni</span><strong>${escapeHtml(occupant?.name || 'Kosong')}</strong></p><p><span>WiFi</span><strong>ONYX-${escapeHtml(room.no)}</strong></p></div></article>`;
1759:   const controlPage = `<article class="room-detail-card room-detail-card--wide"><div class="room-detail-card__head"><div><span>Smart Control</span><h4>Perangkat kamar</h4></div><small>${telemetry?.created_at ? `IoT ${escapeHtml(telemetry.created_at)}` : 'Manual mode'}</small></div><div class="room-detail-control-list"><p><span><i class="fa-solid fa-lightbulb"></i> Lampu</span><strong>${devices.lightOn ? 'Menyala' : 'Mati'}</strong><button class="row-print-btn ${devices.lightOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="lightOn" data-room-code="${escapeHtml(room.no)}">${devices.lightOn ? 'Matikan' : 'Nyalakan'}</button></p><p><span><i class="fa-solid fa-faucet-drip"></i> Air</span><strong>${devices.waterOn ? 'Aktif' : 'Nonaktif'}</strong><button class="row-print-btn ${devices.waterOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="waterOn" data-room-code="${escapeHtml(room.no)}">${devices.waterOn ? 'Matikan' : 'Nyalakan'}</button></p>${climateRows}</div></article>`;
1760:   const meterPage = `<article class="room-detail-card room-detail-card--wide room-detail-card--meter"><div class="room-detail-card__head"><div><span>Meter</span><h4>Pemakaian & tagihan</h4></div></div><div class="room-meter-line"><p><span>Listrik</span><strong>${telemetry ? `${Number(telemetry.powerWatt || 0)} W` : `${Number(latest.electricKwh || 0)} kWh`}</strong><small>${telemetry ? `${Number(telemetry.energyKwh || 0)} kWh` : 'Meter admin'}</small></p><p><span>Air</span><strong>${telemetry ? `${Number(telemetry.waterM3 || 0)} m³` : `${Number(latest.waterM3 || 0)} m³`}</strong><small>${devices.waterOn ? 'Valve aktif' : 'Valve nonaktif'}</small></p><p><span>Tagihan</span><strong>${latest.totalAmount ? rupiah(Number(latest.totalAmount)) : 'Belum ada'}</strong><small>Utility meter</small></p></div>${renderRoomUtilityForm(room, occupant)}<div class="resident-saas-table resident-saas-table--utility admin-utility-table room-utility-history">${utilityMeters.length ? utilityMeters.map((item) => `<p><span>${escapeHtml(item.month || '-')}</span><b>${Number(item.electricKwh || 0)} kWh</b><em>${Number(item.waterM3 || 0)} m³</em><i>${rupiah(Number(item.totalAmount || 0))}</i></p>`).join('') : '<p><span>Belum ada meter</span><b>0 kWh</b><em>0 m³</em><i>Rp 0</i></p>'}</div></article>`;
1761:   const pages = { overview: overviewPage, control: controlPage, meter: meterPage };
1762: 
1763:   return `<section class="admin-flat-panel admin-page-panel room-detail-panel room-detail-saas"><div class="room-detail-saas__nav"><button class="room-detail-back no-print" type="button" id="backToRooms"><i class="fa-solid fa-arrow-left"></i>Kembali</button><button class="button subtle no-print" type="button" id="toggleRoomEditor"><i class="fa-regular fa-pen-to-square"></i>${state.isRoomCreateOpen ? 'Tutup edit' : 'Edit kamar'}</button></div><header class="room-detail-saas__hero"><div><span>Room Detail</span><h3>${escapeHtml(room.no)} · ${escapeHtml(room.name)}</h3><p>${escapeHtml(room.type)} · ${facilityList}</p></div><b class="room-status-pill ${escapeHtml(effectiveStatus)}">${effectiveStatus === 'terisi' ? 'Tidak tersedia' : escapeHtml(effectiveStatus)}</b></header><div class="room-detail-saas__stats"><p><span>Harga</span><strong>${rupiah(room.price)}</strong><small>/ bulan</small></p><p><span>Penghuni</span><strong>${escapeHtml(occupant?.name || 'Kosong')}</strong><small>${escapeHtml(occupant?.phone || 'Belum ada penghuni aktif')}</small></p><p><span>WiFi</span><strong>ONYX-${escapeHtml(room.no)}</strong><small>password otomatis per kamar</small></p><p><span>IoT</span><strong>${telemetry?.created_at ? 'Online' : 'Standby'}</strong><small>${telemetry?.created_at ? escapeHtml(telemetry.created_at) : 'Menunggu telemetry'}</small></p></div>${state.isRoomCreateOpen ? `<section class="room-edit-focus">${renderRoomEditorForm(room)}</section>` : `<nav class="room-detail-subnav no-print">${detailNav.map(([id, label]) => `<button class="${section === id ? 'is-active' : ''}" type="button" data-room-detail-section="${id}">${label}</button>`).join('')}</nav><section class="room-detail-saas__body room-detail-saas__body--single">${pages[section] || overviewPage}</section>`}</section>`;
1764: }
1765: 
1766: /**
1767:  * @description Render panel tamu dan reservasi.
1768:  * @returns {string} Markup grid tamu dan reservasi.
1769:  */
1770: function renderGuestBookingGrid() {
1771:   return `<section class="split-grid lower-grid"><article class="panel section-panel compact-panel" id="tamu" data-section><div class="panel-head"><div><span>Tamu</span><h3>Data penyewa</h3></div></div><div class="empty admin-empty-state"><strong>Belum ada data penyewa.</strong><p>Semua data diambil dari backend pendaftaran.</p></div></article><article class="panel section-panel compact-panel" id="reservasi" data-section><div class="panel-head"><div><span>Booking</span><h3>Reservasi aktif</h3></div></div>${renderBookingTable([])}</article></section>`;
1772: }
1773: 
1774: function renderGuestsPanel() {
1775:   return `<section class="panel section-panel admin-page-panel" id="tamu" data-section><div class="panel-head wrap"><div><span>Residents</span><h3>Data penyewa</h3></div></div><div class="empty admin-empty-state"><strong>Belum ada data penyewa.</strong><p>Gunakan menu Penghuni/Penyewa untuk data backend real.</p></div></section>`;
1776: }
1777: 
1778: function renderResidentsAdminPanel() {
1779:   const rows = [...getAdminResidents(), ...getAdminShortTermTenants()];
1780:   if (state.adminDetailType === 'penghuni') return renderAdminPersonDetail('penghuni', rows[state.adminDetailIndex] || rows[0]);
1781:   const activeRows = rows.filter((resident) => ['aktif', 'confirmed', 'check-in'].includes(String(resident.status || '').toLowerCase())).length;
1782:   const longStayRows = rows.filter((resident) => (resident.category || 'Long Stay') === 'Long Stay').length;
1783:   const shortStayRows = rows.length - longStayRows;
1784:   const totalBilling = rows.reduce((sum, resident) => sum + Number(String(resident.billing || resident.total || '').replace(/[^0-9]/g, '') || 0), 0);
1785:   const rowMarkup = rows.map((resident, index) => {
1786:     const category = resident.category || 'Resident';
1787:     const period = resident.period || resident.stay || '-';
1788:     const amount = resident.billing || resident.total || '-';
1789:     const initials = String(resident.name || 'R').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
1790:     return `<button class="admin-person-row admin-person-row--hotel" type="button" data-admin-detail="penghuni" data-admin-detail-index="${index}"><span class="resident-avatar">${escapeHtml(initials)}</span><div class="resident-guest"><span>${escapeHtml(resident.room || '-')}</span><strong>${escapeHtml(resident.name || '-')}</strong><small>${escapeHtml(resident.plan || '-')} · ${escapeHtml(period)}</small></div><div class="resident-stay"><span>Tipe sewa</span><strong>${escapeHtml(category)}</strong><small>${escapeHtml(resident.due || resident.end || 'Jadwal belum diisi')}</small></div><div class="resident-billing"><span>Tagihan</span><strong>${escapeHtml(amount)}</strong><small>${escapeHtml(resident.refund || resident.administrationStatus || 'Administrasi standar')}</small></div><i class="tenant-type-label ${slug(category)}">${escapeHtml(category)}</i><em class="resident-status-chip ${slug(resident.status || '')}">${escapeHtml(resident.status || '-')}</em></button>`;
1791:   }).join('');
1792: 
1793:   return `<section class="admin-page-panel admin-resident-ops" id="penghuni" data-section><div class="resident-ops-kpis"><article><span>Total</span><strong>${rows.length}</strong><small>Penghuni dan penyewa</small></article><article><span>Aktif</span><strong>${activeRows}</strong><small>Status berjalan</small></article><article><span>Long stay</span><strong>${longStayRows}</strong><small>Bulanan atau tahunan</small></article><article><span>Short stay</span><strong>${shortStayRows}</strong><small>Harian atau mingguan</small></article><article><span>Billing</span><strong>${totalBilling ? rupiah(totalBilling) : 'Rp 0'}</strong><small>Estimasi tagihan</small></article></div><div class="resident-ops-table"><div class="resident-ops-table__head no-print"><span>Penghuni</span><span>Sewa</span><span>Tagihan</span><span>Tipe</span><span>Status</span></div>${rowMarkup || '<div class="empty admin-empty-state"><strong>Belum ada penghuni atau penyewa real.</strong><p>Data muncul setelah user daftar dan disetujui admin.</p></div>'}</div></section>`;
1794: }
1795: 
1796: function renderPaymentsAdminPanel() {
1797:   const buyers = getAdminPaymentBuyers();
1798:   const selectedBuyer = buyers.find((item) => String(item.id || '') === String(state.adminPaymentDetailId || '')) || null;
1799:   if (!selectedBuyer) {
1800:     const paidBuyers = buyers.filter((buyer) => /bayar|approved|recorded/i.test(buyer.paymentStatus || '')).length;
1801:     const reviewBuyers = buyers.filter((buyer) => /review|uploaded|menunggu/i.test(buyer.paymentStatus || '')).length;
1802:     const totalAmount = buyers.reduce((sum, buyer) => sum + Number(buyer.totalPayment || 0), 0);
1803:     return `<section class="payment-review-page payment-ops-page admin-page-panel" id="pembayaran" data-section><div class="payment-ops-kpis"><article><span>Total Buyer</span><strong>${buyers.length}</strong><small>Calon penghuni</small></article><article><span>Paid / Approved</span><strong>${paidBuyers}</strong><small>Pembayaran selesai</small></article><article><span>Need Review</span><strong>${reviewBuyers}</strong><small>Bukti menunggu admin</small></article><article><span>Total Pipeline</span><strong>${rupiah(totalAmount)}</strong><small>Estimasi administrasi</small></article></div><div class="payment-buyer-table payment-buyer-table--ops"><div class="payment-buyer-table__head no-print"><span>Buyer</span><span>Kamar</span><span>Total</span><span>Status</span><span>Aksi</span></div>${buyers.length ? buyers.map((buyer) => `<article class="payment-buyer-row payment-buyer-row--ops"><div><strong>${escapeHtml(buyer.name || '-')}</strong><small>${escapeHtml(buyer.phone || buyer.email || '-')}</small></div><span>${escapeHtml(buyer.room || '-')}</span><b>${rupiah(Number(buyer.totalPayment || 0))}</b><i class="status-${slug(buyer.paymentStatus || '')}">${escapeHtml(buyer.paymentStatus || '-')}</i><button class="row-print-btn row-print-btn--gold" type="button" data-payment-detail="${escapeHtml(buyer.id || '')}">Detail</button></article>`).join('') : '<div class="empty admin-empty-state"><strong>Belum ada buyer.</strong><p>Data pembayaran muncul setelah user melakukan pendaftaran.</p></div>'}</div></section>`;
1804:   }
1805: 
1806:   const { resident, proof, proofs, qrisParts, splitParts, rent, deposit, total } = getAdminApplicationState(selectedBuyer);
1807:   if (!resident?.name) return `<section class="payment-review-page admin-page-panel" id="pembayaran" data-section><div class="empty admin-empty-state"><strong>Belum ada pembayaran.</strong><p>Data muncul setelah calon penghuni daftar dan memilih metode administrasi.</p></div></section>`;
1808: 
1809:   const rows = proofs.filter((item) => item?.status);
1810:   const qrisOpenedTotal = qrisParts.reduce((sum, index) => sum + Number(splitParts[index] || 0), 0);
1811:   const remainingTotal = Math.max(0, total - qrisOpenedTotal);
1812:   const proofStatus = proof?.status || 'none';
1813:   const paymentStage = proofStatus === 'approved'
1814:     ? 'Administrasi selesai'
1815:     : proofStatus === 'uploaded'
1816:       ? 'Bukti transfer menunggu review'
1817:       : qrisParts.length
1818:         ? 'Pembayaran QRIS sedang berjalan'
1819:         : 'Menunggu pembayaran';
1820:   const rawSection = state.activePaymentSection || 'overview';
1821:   const section = ['qris', 'transfer'].includes(rawSection) ? 'method' : rawSection === 'review' ? 'proof' : rawSection;
1822:   const navItems = [
1823:     ['overview', 'Ringkasan'],
1824:     ['method', 'Metode Bayar'],
1825:     ['proof', 'Bukti Masuk'],
1826:   ];
1827:   const paymentNav = `<nav class="payment-subnav no-print">${navItems.map(([id, label]) => `<button class="${section === id ? 'is-active' : ''}" type="button" data-payment-section="${id}">${label}</button>`).join('')}</nav>`;
1828:   const proofRows = rows.length ? rows.map((item) => {
1829:     const proofUrl = item.fileUrl || item.file_url || item.proofUrl || '';
1830:     const proofFile = item.fileName || item.file_name || 'Tanpa file';
1831:     const proofStatusText = String(item.status || '').toLowerCase();
1832:     const canReviewProof = /uploaded|review|menunggu|pending/.test(proofStatusText) && !/approved|recorded|paid|sudah|selesai|reject|ditolak/.test(proofStatusText);
1833:     const proofActions = canReviewProof ? `<div class="admin-payment-actions no-print"><button class="row-print-btn row-print-btn--gold" type="button" data-approve-payment="${escapeHtml(item.id || '')}">Approve</button><button class="row-print-btn" type="button" data-reject-payment="${escapeHtml(item.id || '')}">Reject</button></div>` : '<div class="admin-payment-actions admin-payment-actions--locked no-print"><span>Selesai</span></div>';
1834:     return `<article class="payment-proof-row"><div><span>${escapeHtml(item.invoice || 'MANUAL')}</span><strong>${escapeHtml(item.residentName || resident.name || '-')}</strong><small>${escapeHtml(item.room || resident.room || '-')} · ${escapeHtml(item.uploadedAt || item.created_at || '-')}</small>${proofUrl ? `<button class="proof-preview-link proof-preview-button" type="button" data-proof-preview-url="${escapeHtml(proofUrl)}" data-proof-preview-file="${escapeHtml(proofFile)}"><i class="fa-regular fa-image"></i>Lihat Bukti</button>` : `<em class="proof-preview-empty">${escapeHtml(proofFile)}</em>`}</div><b>${rupiah(Number(item.amount || total || 0))}</b><i class="status-${slug(item.status)}">${escapeHtml(item.status)}</i>${proofActions}</article>`;

(Showing lines 1535-1834 of 3298. Use offset=1835 to continue.)
</content>
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 8.6s)

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src\\main.js",
  "offset": 1560,
  "limit": 360
}
```

**Output:**
```
<path>C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\main.js</path>
<type>file</type>
<content>
1560:   const pendingPayment = proofs.filter((item) => item.status === 'uploaded').length;
1561:   const applicantCount = applications.length;
1562:   const { occupiedRooms, availableRooms, totalRooms } = getRoomOccupancyStats();
1563:   const paidQrisTotal = qrisParts.reduce((sum, index) => sum + Number(splitParts[index] || 0), 0);
1564:   return `
1565:     <section class="admin-ops-strip" id="dashboard" data-section>
1566:       <article><span>Occupancy</span><strong>${occupiedRooms}</strong><small>${occupiedRooms} / ${totalRooms} kamar real</small></article>
1567:       <article><span>Available</span><strong>${availableRooms}</strong><small>Siap ditempati</small></article>
1568:       <article><span>Aplikasi Baru</span><strong>${applicantCount}</strong><small>${resident?.applicationStatus || 'Tidak ada applicant'}</small></article>
1569:       <article><span>Payment Queue</span><strong>${pendingPayment}</strong><small>${proof?.status === 'uploaded' ? 'Bukti transfer menunggu approve' : resident?.name ? 'Menunggu pembayaran / QRIS split' : 'Tidak ada applicant pending'}</small></article>
1570:     </section>
1571: 
1572:     <section class="admin-discovery-grid no-print" aria-label="Resident Portal, Utilities, IoT Monitoring, Smart Access, Visitor Pass, Service Tickets">
1573:       <article><span>Resident Portal</span><h3>Utilities · Access · Service</h3><p>Buka portal penghuni langsung dari akun admin untuk QA dan operasional.</p><button class="row-print-btn row-print-btn--gold" type="button" data-open-resident-portal="overview">Open Resident Portal</button></article>
1574:       <article><span>Utilities</span><h3>Meter Charges</h3><p>${utilityMeters.length} data listrik/air tersimpan untuk billing penghuni.</p><button class="row-print-btn" type="button" data-admin-quick-section="utilities">View utility meter charges</button></article>
1575:       <article><span>IoT Monitoring</span><h3>Room Telemetry</h3><p>${telemetryRows.length} kamar memiliki telemetry suhu, daya, dan air.</p><button class="row-print-btn" type="button" data-admin-quick-section="iot">View room telemetry</button></article>
1576:       <article><span>Smart Access</span><h3>Visitor Pass</h3><p>Lock state, guest QR, WiFi share, dan access logs resident.</p><button class="row-print-btn" type="button" data-admin-quick-section="access">View access state and visitor pass</button></article>
1577:       <article><span>Service Tickets</span><h3>Requests</h3><p>${serviceTickets.length} tiket layanan/cache siap direview.</p><button class="row-print-btn" type="button" data-admin-quick-section="tickets">Create / review service ticket</button></article>
1578:     </section>
1579: 
1580:     <section class="split-grid admin-dashboard-main">
1581:       <article class="panel chart-card"><div class="panel-head"><div><span>Utility</span><h3>Meter real tersimpan</h3></div></div><div class="admin-action-list"><p><span>Meter rows</span><b>${utilityMeters.length} data utilitas</b><em>Dari backend utility-meter.php</em></p><p><span>Payment proof</span><b>${proofs.length} bukti transfer</b><em>Queue real backend</em></p></div></article>
1582:       <article class="panel table-card"><div class="panel-head"><div><span>Today</span><h3>Action queue</h3></div><a class="text-btn" href="#pembayaran" data-admin-section="pembayaran">Open</a></div><div class="admin-action-list">${resident?.name ? `<p><span>Applicant</span><b>${escapeHtml(resident.name)} · ${escapeHtml(resident.room || '-')}</b><em>${escapeHtml(resident.administrationStatus || resident.applicationStatus || 'Review')}</em></p><p><span>Split QRIS</span><b>${qrisParts.length}/${splitParts.length} part dibuka</b><em>${rupiah(paidQrisTotal)} dari ${rupiah(total)}</em></p><p><span>Refund</span><b>${escapeHtml(resident.refundBank || '-')} · ${escapeHtml(resident.refundAccount || '-')}</b><em>${escapeHtml(resident.refundAccountName || 'Nama rekening belum ada')}</em></p>` : '<p><span>Applicant</span><b>Belum ada pendaftaran baru</b><em>Menunggu data Book</em></p>'}</div></article>
1583:     </section>
1584:   `;
1585: }
1586: 
1587: function renderAdminUtilitiesPanel() {
1588:   const residents = getAdminResidentCandidates();
1589:   const meters = getUtilityMeters();
1590:   const totalCharges = meters.reduce((sum, item) => sum + Number(item.totalAmount || 0), 0);
1591:   const latestRows = meters.slice(0, 12).map((item) => {
1592:     const resident = residents.find((candidate) => candidate.id === item.application_id || getRoomCode(candidate.room) === getRoomCode(item.room));
1593:     return `<article class="admin-ops-row"><div><span>${escapeHtml(item.month || '-')}</span><strong>${escapeHtml(item.residentName || resident?.name || 'Resident')}</strong><small>${escapeHtml(item.room || resident?.room || '-')}</small></div><b>${Number(item.electricKwh || 0)} kWh</b><b>${Number(item.waterM3 || 0)} m³</b><i>${rupiah(Number(item.totalAmount || 0))}</i></article>`;
1594:   }).join('');
1595:   return `<section class="admin-page-panel admin-feature-panel" id="utilities" data-section>
1596:     <div class="panel-head wrap"><div><span>Utilities</span><h3>Utility Meter Charges</h3><p>Listrik, air, dan tagihan meter yang masuk ke billing penghuni.</p></div><button class="button primary" type="button" data-open-resident-portal="utilities"><i class="fa-solid fa-user-shield"></i>Open Resident Utilities</button></div>
1597:     <div class="payment-ops-kpis"><article><span>Meter Rows</span><strong>${meters.length}</strong><small>Data utility-meter.php</small></article><article><span>Total Charges</span><strong>${rupiah(totalCharges)}</strong><small>Akumulasi tagihan utilitas</small></article><article><span>Residents</span><strong>${residents.length}</strong><small>Calon/penghuni aktif</small></article><article><span>Input Meter</span><strong>Room Detail</strong><small>Menu Kamar → Meter & Tagihan</small></article></div>
1598:     <div class="admin-feature-actions no-print"><button class="row-print-btn row-print-btn--gold" type="button" data-admin-open-room-feature="meter">Input Meter & Tagihan</button><button class="row-print-btn" type="button" data-open-resident-portal="billing">View Billing Invoice</button><button class="row-print-btn" type="button" id="refreshPayments">Refresh backend</button></div>
1599:     <div class="admin-ops-table"><div class="admin-ops-row admin-ops-row--head"><span>Resident</span><span>Listrik</span><span>Air</span><span>Tagihan</span></div>${latestRows || '<div class="empty admin-empty-state"><strong>Belum ada utility meter.</strong><p>Buka Kamar → Detail → Meter & Tagihan, lalu simpan meter listrik/air.</p></div>'}</div>
1600:   </section>`;
1601: }
1602: 
1603: function renderAdminIotPanel() {
1604:   const telemetryRows = getIotTelemetryRows();
1605:   const roomRows = getRooms().map((room) => {
1606:     const telemetry = telemetryRows.find((item) => item.roomCode === room.no) || null;
1607:     const devices = getRoomDeviceState(room.no);
1608:     return `<article class="admin-ops-row"><div><span>${escapeHtml(room.no)}</span><strong>${escapeHtml(room.name)}</strong><small>${telemetry?.created_at ? `Updated ${escapeHtml(telemetry.created_at)}` : 'No telemetry yet'}</small></div><b>${telemetry ? `${Number(telemetry.temperature || 0)}°C` : '-'}</b><b>${telemetry ? `${Number(telemetry.powerWatt || 0)} W` : devices.lightOn ? 'Manual on' : 'Manual off'}</b><i>${telemetry ? `${Number(telemetry.waterM3 || 0)} m³` : devices.waterOn ? 'Water on' : 'Water off'}</i></article>`;
1609:   }).join('');
1610:   return `<section class="admin-page-panel admin-feature-panel" id="iot" data-section>
1611:     <div class="panel-head wrap"><div><span>IoT Monitoring</span><h3>Room Telemetry</h3><p>Monitoring suhu, kelembapan, daya listrik, energi, dan air dari ESP32/Wokwi.</p></div><button class="button primary" type="button" data-admin-open-room-feature="control"><i class="fa-solid fa-microchip"></i>Open Smart Control</button></div>
1612:     <div class="payment-ops-kpis"><article><span>Telemetry Rooms</span><strong>${telemetryRows.length}</strong><small>Data iot-ingest.php</small></article><article><span>Total Rooms</span><strong>${getRooms().length}</strong><small>Inventory aktif</small></article><article><span>Mode</span><strong>${telemetryRows.length ? 'Live IoT' : 'Manual'}</strong><small>Fallback smart room aktif</small></article><article><span>Endpoint</span><strong>iot-ingest.php</strong><small>GET/POST telemetry</small></article></div>
1613:     <div class="admin-feature-actions no-print"><button class="row-print-btn row-print-btn--gold" type="button" id="seedIotDemo">Seed demo telemetry</button><button class="row-print-btn" type="button" data-open-resident-portal="utilities">Open Resident Utilities</button><button class="row-print-btn" type="button" id="refreshPayments">Refresh IoT</button></div>
1614:     <div class="admin-ops-table"><div class="admin-ops-row admin-ops-row--head"><span>Room</span><span>Temperature</span><span>Power</span><span>Water</span></div>${roomRows}</div>
1615:   </section>`;
1616: }
1617: 
1618: function renderAdminAccessPanel() {
1619:   const resident = getPrimaryAdminResident();
1620:   const roomCode = getRoomCode(resident?.room || '') || getRooms()[0]?.no || 'ROOM';
1621:   const accessState = JSON.parse(window.localStorage.getItem('onyx-access-state') || `{"locked":true,"guestPass":"QR-ONYX-${String(resident?.id || Date.now()).slice(-4)}","validUntil":"22:00"}`);
1622:   const logs = getAccessLogs(accessState);
1623:   const logRows = logs.map((log) => `<p><span>${escapeHtml(log.time)}</span><b>${escapeHtml(log.action)}</b><em>${escapeHtml(log.detail)}</em><i>${escapeHtml(log.status)}</i></p>`).join('');
1624:   return `<section class="admin-page-panel admin-feature-panel" id="access" data-section>
1625:     <div class="panel-head wrap"><div><span>Smart Access</span><h3>Access State & Visitor Pass</h3><p>Kelola lock state, QR tamu, WiFi share, dan access logs resident.</p></div><button class="button primary" type="button" data-open-resident-portal="access"><i class="fa-solid fa-door-closed"></i>Open Resident Access</button></div>
1626:     <div class="admin-access-grid"><article class="access-hero-card"><span>Door Lock</span><strong>${accessState.locked ? 'Locked' : 'Unlocked'}</strong><p>${escapeHtml(resident?.name || 'Resident')} · ${escapeHtml(roomCode)}</p><button class="row-print-btn row-print-btn--gold" type="button" id="adminToggleSmartLock">${accessState.locked ? 'Unlock room' : 'Lock room'}</button></article><article class="visitor-qr-card"><span>Visitor Pass</span><div class="visitor-qr-code" aria-label="Visitor QR ${escapeHtml(accessState.guestPass)}">${renderVisitorQr(accessState.guestPass)}</div><strong>${escapeHtml(accessState.guestPass)}</strong><p>Berlaku sampai ${escapeHtml(accessState.validUntil)} hari ini.</p><button class="row-print-btn" type="button" data-copy-value="${escapeHtml(accessState.guestPass)}" data-access-action="copy-qr">Copy QR Code</button></article><article class="access-hero-card"><span>WiFi Share</span><strong>ONYX-${escapeHtml(roomCode)}</strong><p>Password: onyx-${escapeHtml(roomCode).toLowerCase()}-wifi</p><button class="row-print-btn" type="button" data-copy-value="ONYX-${escapeHtml(roomCode)} / onyx-${escapeHtml(roomCode).toLowerCase()}-wifi" data-access-action="copy-wifi">Share WiFi</button></article></div>
1627:     <div class="resident-saas-table resident-saas-table--access admin-access-logs">${logRows || '<p><span>Now</span><b>Belum ada access logs</b><em>Gunakan tombol Visitor Pass/Lock</em><i>ready</i></p>'}</div>
1628:   </section>`;
1629: }
1630: 
1631: function renderAdminServiceTicketsPanel() {
1632:   const tickets = getAdminServiceTickets();
1633:   const resident = getPrimaryAdminResident();
1634:   const rows = tickets.map((ticket) => `<article class="admin-ops-row"><div><span>${escapeHtml(ticket.category || 'Service')}</span><strong>${escapeHtml(ticket.issue || '-')}</strong><small>${escapeHtml(ticket.application_id || resident?.id || '-')}</small></div><b>${escapeHtml(ticket.priority || 'Normal')}</b><i>${escapeHtml(ticket.status || 'open')}</i></article>`).join('');
1635:   return `<section class="admin-page-panel admin-feature-panel" id="tickets" data-section>
1636:     <div class="panel-head wrap"><div><span>Service Ticketing</span><h3>Resident Service Tickets</h3><p>Buat dan review request perbaikan, kebersihan, WiFi, AC, air, atau listrik.</p></div><button class="button primary" type="button" data-open-resident-portal="service"><i class="fa-solid fa-user-shield"></i>Open Resident Service</button></div>
1637:     <form class="admin-ticket-form no-print" id="adminServiceTicketForm"><input type="hidden" name="application_id" value="${escapeHtml(resident?.id || '')}" /><label>Kategori<select name="category"><option>Maintenance</option><option>WiFi</option><option>Listrik</option><option>Air</option><option>Kebersihan</option></select></label><label>Prioritas<select name="priority"><option>Normal</option><option>High</option><option>Urgent</option></select></label><label class="admin-ticket-form__issue">Issue<input name="issue" placeholder="Contoh: AC kurang dingin / lampu mati" required /></label><button class="button primary" type="submit">Create Service Ticket</button></form>
1638:     <div class="admin-ops-table"><div class="admin-ops-row admin-ops-row--head"><span>Ticket</span><span>Priority</span><span>Status</span></div>${rows || '<div class="empty admin-empty-state"><strong>Belum ada service ticket.</strong><p>Buat tiket dari form admin atau Resident Portal → Service.</p></div>'}</div>
1639:   </section>`;
1640: }
1641: 
1642: function renderAdminResidentPortalPanel() {
1643:   const resident = getPrimaryAdminResident();
1644:   return `<section class="admin-page-panel admin-feature-panel" id="resident-portal" data-section>
1645:     <div class="panel-head wrap"><div><span>Resident Portal</span><h3>Resident-facing Tools</h3><p>Entry point eksplisit untuk QA: Billing, Utilities, Smart Access, Visitor Pass, dan Service Ticketing.</p></div><button class="button primary" type="button" data-open-resident-portal="overview"><i class="fa-solid fa-user-shield"></i>Launch Resident Portal</button></div>
1646:     <div class="admin-portal-grid"><article><span>Resident</span><strong>${escapeHtml(resident?.name || 'Demo Resident')}</strong><p>${escapeHtml(resident?.room || '-')}</p></article><button type="button" data-open-resident-portal="billing"><i class="fa-solid fa-receipt"></i><span>Billing</span><small>Invoices, QRIS, manual transfer</small></button><button type="button" data-open-resident-portal="utilities"><i class="fa-solid fa-bolt"></i><span>Utilities</span><small>Meter charges & IoT usage</small></button><button type="button" data-open-resident-portal="access"><i class="fa-solid fa-door-closed"></i><span>Smart Access</span><small>Visitor Pass, WiFi, access logs</small></button><button type="button" data-open-resident-portal="service"><i class="fa-solid fa-screwdriver-wrench"></i><span>Service Tickets</span><small>Create and review requests</small></button></div>
1647:   </section>`;
1648: }
1649: 
1650: async function refreshAdminStateForSection(section) {
1651:   const liveSections = ['dashboard', 'kamar', 'penghuni', 'utilities', 'iot', 'access', 'tickets', 'resident-portal', 'pembayaran', 'reservasi', 'laporan'];
1652:   if (!liveSections.includes(section)) return renderApp();
1653:   renderApp();
1654:   syncAdminSectionInBackground();
1655: }
1656: 
1657: async function syncAdminSectionInBackground() {
1658:   if (window.__onyxAdminSectionSyncing) return;
1659:   window.__onyxAdminSectionSyncing = true;
1660:   try {
1661:     await syncAdminState(false);
1662:     try {
1663:       const iot = await apiJson('iot-ingest.php');
1664:       window.localStorage.setItem('onyx-iot-telemetry', JSON.stringify(iot.data || []));
1665:     } catch (error) {
1666:       window.localStorage.setItem('onyx-iot-telemetry-sync-error', String(error?.message || error || 'Gagal sinkron IoT'));
1667:     }
1668:     if (state.page === 'admin') renderApp();
1669:   } finally {
1670:     window.__onyxAdminSectionSyncing = false;
1671:   }
1672: }
1673: 
1674: /**
1675:  * @description Render panel manajemen kamar dengan filter proper.
1676:  * @returns {string} Markup panel kamar.
1677:  */
1678: function renderRoomsPanel() {
1679:   if (state.isRoomCreateOpen && !state.adminRoomDetail) return renderRoomCreatePage();
1680:   if (state.adminRoomDetail) {
1681:     const room = getRooms().find((item) => item.no === state.adminRoomDetail) || getRooms()[0];
1682:     return renderRoomDetailPanel(room);
1683:   }
1684:   const filteredRooms = getRooms().filter((room) => {
1685:     const haystack = `${room.no} ${room.name}`.toLowerCase();
1686:     return haystack.includes(state.roomQuery.toLowerCase()) && (!state.roomType || room.type === state.roomType) && (!state.roomStatus || getEffectiveRoomStatus(room) === state.roomStatus);
1687:   });
1688: 
1689:   return `
1690:     <section class="admin-flat-panel" id="kamar" data-section>
1691:       <div class="inventory-head"><div><span>Inventory</span><h3>Manajemen kamar</h3><p>${filteredRooms.length} kamar ditampilkan · status otomatis mengikuti penghuni aktif.</p></div><div class="inventory-actions no-print"><button class="button success" type="button" id="openRoomCreate"><i class="fa-solid fa-plus"></i>Tambah kamar</button><button class="button subtle" type="button" id="printRooms"><i class="fa-solid fa-print"></i>Cetak</button></div></div>
1692:       <div class="inventory-toolbar no-print"><label class="inventory-search" for="adminRoomSearchProxy"><i class="fa-solid fa-magnifying-glass"></i><input form="roomForm" id="adminRoomSearchProxy" type="search" value="${escapeHtml(state.roomQuery)}" placeholder="Cari nomor / nama kamar" /></label><select class="field" id="typeFilter" aria-label="Filter tipe kamar">${['', 'Standard', 'Deluxe', 'Suite', 'VIP'].map((type) => `<option value="${type}" ${state.roomType === type ? 'selected' : ''}>${type || 'Semua tipe'}</option>`).join('')}</select><select class="field" id="statusFilter" aria-label="Filter status kamar">${['', 'tersedia', 'terisi', 'maintenance'].map((status) => `<option value="${status}" ${state.roomStatus === status ? 'selected' : ''}>${status || 'Semua status'}</option>`).join('')}</select></div>
1693:       <div class="room-list"><div class="room-list-head no-print"><span>Kamar</span><span>Detail</span><span>Harga</span><span>Status</span><span>Aksi</span></div>${filteredRooms.map(renderRoomRow).join('') || '<p class="empty">Tidak ada kamar yang cocok.</p>'}</div>
1694:       ${renderRoomsPrintReport(filteredRooms)}
1695:     </section>
1696:   `;
1697: }
1698: 
1699: function renderRoomsPrintReport(rooms) {
1700:   const occupancy = getRoomOccupancyStats();
1701:   const generatedAt = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
1702:   const rows = rooms.map((room) => {
1703:     const occupant = getRoomOccupant(room.no);
1704:     const status = getEffectiveRoomStatus(room);
1705:     const devices = getRoomDeviceState(room.no);
1706:     const telemetry = getIotTelemetry(room.no);
1707:     const latestMeter = getUtilityMeters().find((item) => getRoomCode(item.room) === room.no) || {};
1708:     const climateType = getRoomClimateType(room);
1709:     const climateLabel = climateType === 'ac' ? `AC ${devices.acOn ? `${devices.temperature}°C` : 'mati'}` : climateType === 'fan' ? `Kipas ${devices.fanOn ? 'menyala' : 'mati'}` : 'Ventilasi manual';
1710:     const utilityLabel = latestMeter.month ? `${latestMeter.month}: ${Number(latestMeter.electricKwh || 0)} kWh, ${Number(latestMeter.waterM3 || 0)} m³, ${rupiah(Number(latestMeter.totalAmount || 0))}` : 'Belum ada input meter';
1711: 
1712:     return `<tr><td><strong>${escapeHtml(room.no)}</strong><span>${escapeHtml(room.floor || '-')}</span></td><td><b>${escapeHtml(room.name)}</b><small>${escapeHtml(room.type)} · ${escapeHtml((room.facilities || []).join(', ') || 'Fasilitas belum diisi')}</small></td><td>${rupiah(Number(room.price || 0))}<small>/ bulan</small></td><td><b>${status === 'terisi' ? 'Tidak tersedia' : escapeHtml(status)}</b><small>${escapeHtml(occupant?.name || 'Kosong')}</small></td><td><b>${escapeHtml(climateLabel)}</b><small>Lampu ${devices.lightOn ? 'menyala' : 'mati'} · Air ${devices.waterOn ? 'aktif' : 'nonaktif'}</small></td><td><b>${escapeHtml(utilityLabel)}</b><small>${telemetry?.created_at ? `IoT ${escapeHtml(telemetry.created_at)}` : 'Manual/standby'}</small></td></tr>`;
1713:   }).join('');
1714: 
1715:   return `<section class="room-print-report" aria-label="Laporan cetak kamar"><header><div><span>Onyx Residence</span><h2>Laporan Inventory Kamar</h2><p>Ringkasan status kamar, penghuni aktif, fasilitas, smart control, dan meter utilitas.</p></div><aside><b>${escapeHtml(generatedAt)}</b><small>Dicetak oleh Admin</small></aside></header><div class="room-print-summary"><article><span>Total kamar</span><strong>${occupancy.totalRooms}</strong></article><article><span>Terisi</span><strong>${occupancy.occupiedRooms}</strong></article><article><span>Tersedia</span><strong>${occupancy.availableRooms}</strong></article><article><span>Occupancy</span><strong>${occupancy.occupancyPercent}%</strong></article></div><table><thead><tr><th>Kamar</th><th>Detail</th><th>Harga</th><th>Status</th><th>Smart Control</th><th>Utilitas</th></tr></thead><tbody>${rows || '<tr><td colspan="6">Tidak ada kamar yang cocok dengan filter.</td></tr>'}</tbody></table><footer><span>Catatan</span><p>Status terisi mengikuti penghuni approved. Meter utilitas memakai input terbaru per kamar jika tersedia.</p></footer></section>`;
1716: }
1717: 
1718: /**
1719:  * @description Render satu baris kamar dengan aksi CRUD.
1720:  * @param {object} room Data kamar.
1721:  * @returns {string} Markup row kamar.
1722:  */
1723: function renderRoomRow(room) {
1724:   const status = getEffectiveRoomStatus(room);
1725:   return `<article class="room-row"><div class="room-code"><strong>${room.no}</strong><span>${room.floor}</span></div><div class="room-main"><h4>${escapeHtml(room.name)}</h4><p>${room.type} · ${room.facilities.map(escapeHtml).join(', ')}</p></div><div class="room-price"><strong>${rupiah(room.price)}</strong><span>/ bulan</span></div><span class="badge ${status}">${status === 'terisi' ? 'tidak tersedia' : status}</span><div class="row-actions row-actions--text no-print"><button type="button" data-room-edit="${escapeHtml(room.no)}" aria-label="Edit ${room.no}"><i class="fa-regular fa-pen-to-square"></i>Edit</button><button type="button" data-room-delete="${escapeHtml(room.no)}" aria-label="Hapus ${room.no}"><i class="fa-regular fa-trash-can"></i>Hapus</button></div></article>`;
1726: }
1727: 
1728: function renderRoomCreatePage() {
1729:   return `<section class="admin-flat-panel admin-page-panel room-detail-panel"><div class="panel-head wrap"><div><span>Tambah Kamar</span><h3>Inventory kamar baru</h3></div><button class="button subtle" type="button" id="backToRooms"><i class="fa-solid fa-arrow-left"></i>Kembali</button></div>${renderRoomEditorForm()}</section>`;
1730: }
1731: 
1732: function renderRoomEditorForm(room = null) {
1733:   return `<form class="room-form no-print room-editor-form" id="roomForm"><div class="form-title"><h4>${room ? 'Edit kamar' : 'Tambah kamar'}</h4><span>Data inventory kamar tersimpan tanpa mengacak list utama.</span></div><input type="hidden" name="id_kamar" value="${escapeHtml(room?.id || '')}" /><label>Nomor<input required name="no_kamar" value="${escapeHtml(room?.no || '')}" placeholder="A09" /></label><label>Kategori<select required name="kategori">${['Standard', 'Deluxe', 'Suite', 'VIP'].map((type) => `<option ${room?.type === type ? 'selected' : ''}>${type}</option>`).join('')}</select></label><label>Nama kamar<input required name="nama_kamar" value="${escapeHtml(room?.name || '')}" placeholder="Onyx Studio" /></label><label>Harga<input required name="harga" type="number" min="0" value="${escapeHtml(room?.price || '')}" placeholder="3100000" /></label><label>Status<select name="status">${['tersedia', 'terisi', 'maintenance'].map((status) => `<option ${getEffectiveRoomStatus(room || {}) === status ? 'selected' : ''}>${status}</option>`).join('')}</select></label><label class="full">Fasilitas<textarea name="fasilitas" placeholder="AC, WiFi, kamar mandi dalam">${escapeHtml((room?.facilities || []).join(', '))}</textarea></label><div class="form-actions full"><button class="button primary" type="submit">Simpan</button><button class="button subtle" type="button" id="closeRoomEditor">Batal</button></div></form>`;
1734: }
1735: 
1736: function renderRoomUtilityForm(room, occupant = null) {
1737:   const month = new Date().toISOString().slice(0, 7);
1738:   return `<form class="room-utility-form no-print" id="roomUtilityMeterForm"><div><span>Input Meter</span><h4>Catat listrik, air, dan tagihan</h4><p>Data masuk ke billing penghuni dan histori meter kamar ini.</p></div><input type="hidden" name="application_id" value="${escapeHtml(occupant?.id || '')}" /><input type="hidden" name="room" value="${escapeHtml(room.no)}" /><input type="hidden" name="residentName" value="${escapeHtml(occupant?.name || '')}" /><label>Bulan<input name="month" type="month" value="${month}" required /></label><label>Listrik kWh<input name="electricKwh" type="number" min="0" step="0.1" placeholder="0" required /></label><label>Air m³<input name="waterM3" type="number" min="0" step="0.1" placeholder="0" required /></label><label>Tarif listrik/kWh<input name="electricRate" type="number" min="0" value="1500" required /></label><label>Tarif air/m³<input name="waterRate" type="number" min="0" value="8000" required /></label><label>Biaya tetap<input name="fixedFee" type="number" min="0" value="0" /></label><button class="button primary" type="submit">Simpan Meter</button></form>`;
1739: }
1740: 
1741: function renderRoomDetailPanel(room) {
1742:   if (!room) return `<section class="admin-flat-panel admin-page-panel"><button class="button subtle" type="button" id="backToRooms"><i class="fa-solid fa-arrow-left"></i>Kembali</button></section>`;
1743:   const occupant = getRoomOccupant(room.no);
1744:   const devices = getRoomDeviceState(room.no);
1745:   const utilityMeters = getUtilityMeters().filter((item) => getRoomCode(item.room) === room.no);
1746:   const latest = utilityMeters[0] || {};
1747:   const telemetry = getIotTelemetry(room.no);
1748:   const climateType = getRoomClimateType(room);
1749:   const facilityList = room.facilities?.length ? room.facilities.map(escapeHtml).join(' · ') : 'Fasilitas belum diisi';
1750:   const effectiveStatus = getEffectiveRoomStatus(room);
1751:   const section = state.activeRoomDetailSection || 'overview';
1752:   const detailNav = [['overview', 'Overview'], ['control', 'Smart Control'], ['meter', 'Meter & Tagihan']];
1753:   const climateRows = climateType === 'ac'
1754:     ? `<p><span><i class="fa-solid fa-snowflake"></i> AC</span><strong>${devices.acOn ? `${devices.temperature}°C` : 'Mati'}</strong><button class="row-print-btn ${devices.acOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="acOn" data-room-code="${escapeHtml(room.no)}">${devices.acOn ? 'Matikan' : 'Nyalakan'}</button></p><label class="room-detail-range"><span>Suhu AC</span><input type="range" min="18" max="30" value="${devices.temperature}" data-admin-room-temp="${escapeHtml(room.no)}" ${devices.acOn ? '' : 'disabled'} /><strong>${devices.temperature}°C</strong></label>`
1755:     : climateType === 'fan'
1756:       ? `<p><span><i class="fa-solid fa-fan"></i> Kipas</span><strong>${devices.fanOn ? 'Menyala' : 'Mati'}</strong><button class="row-print-btn ${devices.fanOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="fanOn" data-room-code="${escapeHtml(room.no)}">${devices.fanOn ? 'Matikan' : 'Nyalakan'}</button></p><p><span><i class="fa-solid fa-wind"></i> Sirkulasi</span><strong>Jendela luar</strong><em>Tanpa AC</em></p>`
1757:       : `<p><span><i class="fa-solid fa-wind"></i> Ventilasi</span><strong>Manual</strong><em>Tidak ada AC/kipas</em></p>`;
1758:   const overviewPage = `<article class="room-detail-card room-detail-card--wide"><div class="room-detail-card__head"><div><span>Overview</span><h4>Informasi kamar</h4></div></div><div class="room-detail-list"><p><span>Status</span><strong>${effectiveStatus === 'terisi' ? 'Tidak tersedia' : escapeHtml(effectiveStatus)}</strong></p><p><span>Tipe</span><strong>${escapeHtml(room.type)}</strong></p><p><span>Fasilitas</span><strong>${facilityList}</strong></p><p><span>Penghuni</span><strong>${escapeHtml(occupant?.name || 'Kosong')}</strong></p><p><span>WiFi</span><strong>ONYX-${escapeHtml(room.no)}</strong></p></div></article>`;
1759:   const controlPage = `<article class="room-detail-card room-detail-card--wide"><div class="room-detail-card__head"><div><span>Smart Control</span><h4>Perangkat kamar</h4></div><small>${telemetry?.created_at ? `IoT ${escapeHtml(telemetry.created_at)}` : 'Manual mode'}</small></div><div class="room-detail-control-list"><p><span><i class="fa-solid fa-lightbulb"></i> Lampu</span><strong>${devices.lightOn ? 'Menyala' : 'Mati'}</strong><button class="row-print-btn ${devices.lightOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="lightOn" data-room-code="${escapeHtml(room.no)}">${devices.lightOn ? 'Matikan' : 'Nyalakan'}</button></p><p><span><i class="fa-solid fa-faucet-drip"></i> Air</span><strong>${devices.waterOn ? 'Aktif' : 'Nonaktif'}</strong><button class="row-print-btn ${devices.waterOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="waterOn" data-room-code="${escapeHtml(room.no)}">${devices.waterOn ? 'Matikan' : 'Nyalakan'}</button></p>${climateRows}</div></article>`;
1760:   const meterPage = `<article class="room-detail-card room-detail-card--wide room-detail-card--meter"><div class="room-detail-card__head"><div><span>Meter</span><h4>Pemakaian & tagihan</h4></div></div><div class="room-meter-line"><p><span>Listrik</span><strong>${telemetry ? `${Number(telemetry.powerWatt || 0)} W` : `${Number(latest.electricKwh || 0)} kWh`}</strong><small>${telemetry ? `${Number(telemetry.energyKwh || 0)} kWh` : 'Meter admin'}</small></p><p><span>Air</span><strong>${telemetry ? `${Number(telemetry.waterM3 || 0)} m³` : `${Number(latest.waterM3 || 0)} m³`}</strong><small>${devices.waterOn ? 'Valve aktif' : 'Valve nonaktif'}</small></p><p><span>Tagihan</span><strong>${latest.totalAmount ? rupiah(Number(latest.totalAmount)) : 'Belum ada'}</strong><small>Utility meter</small></p></div>${renderRoomUtilityForm(room, occupant)}<div class="resident-saas-table resident-saas-table--utility admin-utility-table room-utility-history">${utilityMeters.length ? utilityMeters.map((item) => `<p><span>${escapeHtml(item.month || '-')}</span><b>${Number(item.electricKwh || 0)} kWh</b><em>${Number(item.waterM3 || 0)} m³</em><i>${rupiah(Number(item.totalAmount || 0))}</i></p>`).join('') : '<p><span>Belum ada meter</span><b>0 kWh</b><em>0 m³</em><i>Rp 0</i></p>'}</div></article>`;
1761:   const pages = { overview: overviewPage, control: controlPage, meter: meterPage };
1762: 
1763:   return `<section class="admin-flat-panel admin-page-panel room-detail-panel room-detail-saas"><div class="room-detail-saas__nav"><button class="room-detail-back no-print" type="button" id="backToRooms"><i class="fa-solid fa-arrow-left"></i>Kembali</button><button class="button subtle no-print" type="button" id="toggleRoomEditor"><i class="fa-regular fa-pen-to-square"></i>${state.isRoomCreateOpen ? 'Tutup edit' : 'Edit kamar'}</button></div><header class="room-detail-saas__hero"><div><span>Room Detail</span><h3>${escapeHtml(room.no)} · ${escapeHtml(room.name)}</h3><p>${escapeHtml(room.type)} · ${facilityList}</p></div><b class="room-status-pill ${escapeHtml(effectiveStatus)}">${effectiveStatus === 'terisi' ? 'Tidak tersedia' : escapeHtml(effectiveStatus)}</b></header><div class="room-detail-saas__stats"><p><span>Harga</span><strong>${rupiah(room.price)}</strong><small>/ bulan</small></p><p><span>Penghuni</span><strong>${escapeHtml(occupant?.name || 'Kosong')}</strong><small>${escapeHtml(occupant?.phone || 'Belum ada penghuni aktif')}</small></p><p><span>WiFi</span><strong>ONYX-${escapeHtml(room.no)}</strong><small>password otomatis per kamar</small></p><p><span>IoT</span><strong>${telemetry?.created_at ? 'Online' : 'Standby'}</strong><small>${telemetry?.created_at ? escapeHtml(telemetry.created_at) : 'Menunggu telemetry'}</small></p></div>${state.isRoomCreateOpen ? `<section class="room-edit-focus">${renderRoomEditorForm(room)}</section>` : `<nav class="room-detail-subnav no-print">${detailNav.map(([id, label]) => `<button class="${section === id ? 'is-active' : ''}" type="button" data-room-detail-section="${id}">${label}</button>`).join('')}</nav><section class="room-detail-saas__body room-detail-saas__body--single">${pages[section] || overviewPage}</section>`}</section>`;
1764: }
1765: 
1766: /**
1767:  * @description Render panel tamu dan reservasi.
1768:  * @returns {string} Markup grid tamu dan reservasi.
1769:  */
1770: function renderGuestBookingGrid() {
1771:   return `<section class="split-grid lower-grid"><article class="panel section-panel compact-panel" id="tamu" data-section><div class="panel-head"><div><span>Tamu</span><h3>Data penyewa</h3></div></div><div class="empty admin-empty-state"><strong>Belum ada data penyewa.</strong><p>Semua data diambil dari backend pendaftaran.</p></div></article><article class="panel section-panel compact-panel" id="reservasi" data-section><div class="panel-head"><div><span>Booking</span><h3>Reservasi aktif</h3></div></div>${renderBookingTable([])}</article></section>`;
1772: }
1773: 
1774: function renderGuestsPanel() {
1775:   return `<section class="panel section-panel admin-page-panel" id="tamu" data-section><div class="panel-head wrap"><div><span>Residents</span><h3>Data penyewa</h3></div></div><div class="empty admin-empty-state"><strong>Belum ada data penyewa.</strong><p>Gunakan menu Penghuni/Penyewa untuk data backend real.</p></div></section>`;
1776: }
1777: 
1778: function renderResidentsAdminPanel() {
1779:   const rows = [...getAdminResidents(), ...getAdminShortTermTenants()];
1780:   if (state.adminDetailType === 'penghuni') return renderAdminPersonDetail('penghuni', rows[state.adminDetailIndex] || rows[0]);
1781:   const activeRows = rows.filter((resident) => ['aktif', 'confirmed', 'check-in'].includes(String(resident.status || '').toLowerCase())).length;
1782:   const longStayRows = rows.filter((resident) => (resident.category || 'Long Stay') === 'Long Stay').length;
1783:   const shortStayRows = rows.length - longStayRows;
1784:   const totalBilling = rows.reduce((sum, resident) => sum + Number(String(resident.billing || resident.total || '').replace(/[^0-9]/g, '') || 0), 0);
1785:   const rowMarkup = rows.map((resident, index) => {
1786:     const category = resident.category || 'Resident';
1787:     const period = resident.period || resident.stay || '-';
1788:     const amount = resident.billing || resident.total || '-';
1789:     const initials = String(resident.name || 'R').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
1790:     return `<button class="admin-person-row admin-person-row--hotel" type="button" data-admin-detail="penghuni" data-admin-detail-index="${index}"><span class="resident-avatar">${escapeHtml(initials)}</span><div class="resident-guest"><span>${escapeHtml(resident.room || '-')}</span><strong>${escapeHtml(resident.name || '-')}</strong><small>${escapeHtml(resident.plan || '-')} · ${escapeHtml(period)}</small></div><div class="resident-stay"><span>Tipe sewa</span><strong>${escapeHtml(category)}</strong><small>${escapeHtml(resident.due || resident.end || 'Jadwal belum diisi')}</small></div><div class="resident-billing"><span>Tagihan</span><strong>${escapeHtml(amount)}</strong><small>${escapeHtml(resident.refund || resident.administrationStatus || 'Administrasi standar')}</small></div><i class="tenant-type-label ${slug(category)}">${escapeHtml(category)}</i><em class="resident-status-chip ${slug(resident.status || '')}">${escapeHtml(resident.status || '-')}</em></button>`;
1791:   }).join('');
1792: 
1793:   return `<section class="admin-page-panel admin-resident-ops" id="penghuni" data-section><div class="resident-ops-kpis"><article><span>Total</span><strong>${rows.length}</strong><small>Penghuni dan penyewa</small></article><article><span>Aktif</span><strong>${activeRows}</strong><small>Status berjalan</small></article><article><span>Long stay</span><strong>${longStayRows}</strong><small>Bulanan atau tahunan</small></article><article><span>Short stay</span><strong>${shortStayRows}</strong><small>Harian atau mingguan</small></article><article><span>Billing</span><strong>${totalBilling ? rupiah(totalBilling) : 'Rp 0'}</strong><small>Estimasi tagihan</small></article></div><div class="resident-ops-table"><div class="resident-ops-table__head no-print"><span>Penghuni</span><span>Sewa</span><span>Tagihan</span><span>Tipe</span><span>Status</span></div>${rowMarkup || '<div class="empty admin-empty-state"><strong>Belum ada penghuni atau penyewa real.</strong><p>Data muncul setelah user daftar dan disetujui admin.</p></div>'}</div></section>`;
1794: }
1795: 
1796: function renderPaymentsAdminPanel() {
1797:   const buyers = getAdminPaymentBuyers();
1798:   const selectedBuyer = buyers.find((item) => String(item.id || '') === String(state.adminPaymentDetailId || '')) || null;
1799:   if (!selectedBuyer) {
1800:     const paidBuyers = buyers.filter((buyer) => /bayar|approved|recorded/i.test(buyer.paymentStatus || '')).length;
1801:     const reviewBuyers = buyers.filter((buyer) => /review|uploaded|menunggu/i.test(buyer.paymentStatus || '')).length;
1802:     const totalAmount = buyers.reduce((sum, buyer) => sum + Number(buyer.totalPayment || 0), 0);
1803:     return `<section class="payment-review-page payment-ops-page admin-page-panel" id="pembayaran" data-section><div class="payment-ops-kpis"><article><span>Total Buyer</span><strong>${buyers.length}</strong><small>Calon penghuni</small></article><article><span>Paid / Approved</span><strong>${paidBuyers}</strong><small>Pembayaran selesai</small></article><article><span>Need Review</span><strong>${reviewBuyers}</strong><small>Bukti menunggu admin</small></article><article><span>Total Pipeline</span><strong>${rupiah(totalAmount)}</strong><small>Estimasi administrasi</small></article></div><div class="payment-buyer-table payment-buyer-table--ops"><div class="payment-buyer-table__head no-print"><span>Buyer</span><span>Kamar</span><span>Total</span><span>Status</span><span>Aksi</span></div>${buyers.length ? buyers.map((buyer) => `<article class="payment-buyer-row payment-buyer-row--ops"><div><strong>${escapeHtml(buyer.name || '-')}</strong><small>${escapeHtml(buyer.phone || buyer.email || '-')}</small></div><span>${escapeHtml(buyer.room || '-')}</span><b>${rupiah(Number(buyer.totalPayment || 0))}</b><i class="status-${slug(buyer.paymentStatus || '')}">${escapeHtml(buyer.paymentStatus || '-')}</i><button class="row-print-btn row-print-btn--gold" type="button" data-payment-detail="${escapeHtml(buyer.id || '')}">Detail</button></article>`).join('') : '<div class="empty admin-empty-state"><strong>Belum ada buyer.</strong><p>Data pembayaran muncul setelah user melakukan pendaftaran.</p></div>'}</div></section>`;
1804:   }
1805: 
1806:   const { resident, proof, proofs, qrisParts, splitParts, rent, deposit, total } = getAdminApplicationState(selectedBuyer);
1807:   if (!resident?.name) return `<section class="payment-review-page admin-page-panel" id="pembayaran" data-section><div class="empty admin-empty-state"><strong>Belum ada pembayaran.</strong><p>Data muncul setelah calon penghuni daftar dan memilih metode administrasi.</p></div></section>`;
1808: 
1809:   const rows = proofs.filter((item) => item?.status);
1810:   const qrisOpenedTotal = qrisParts.reduce((sum, index) => sum + Number(splitParts[index] || 0), 0);
1811:   const remainingTotal = Math.max(0, total - qrisOpenedTotal);
1812:   const proofStatus = proof?.status || 'none';
1813:   const paymentStage = proofStatus === 'approved'
1814:     ? 'Administrasi selesai'
1815:     : proofStatus === 'uploaded'
1816:       ? 'Bukti transfer menunggu review'
1817:       : qrisParts.length
1818:         ? 'Pembayaran QRIS sedang berjalan'
1819:         : 'Menunggu pembayaran';
1820:   const rawSection = state.activePaymentSection || 'overview';
1821:   const section = ['qris', 'transfer'].includes(rawSection) ? 'method' : rawSection === 'review' ? 'proof' : rawSection;
1822:   const navItems = [
1823:     ['overview', 'Ringkasan'],
1824:     ['method', 'Metode Bayar'],
1825:     ['proof', 'Bukti Masuk'],
1826:   ];
1827:   const paymentNav = `<nav class="payment-subnav no-print">${navItems.map(([id, label]) => `<button class="${section === id ? 'is-active' : ''}" type="button" data-payment-section="${id}">${label}</button>`).join('')}</nav>`;
1828:   const proofRows = rows.length ? rows.map((item) => {
1829:     const proofUrl = item.fileUrl || item.file_url || item.proofUrl || '';
1830:     const proofFile = item.fileName || item.file_name || 'Tanpa file';
1831:     const proofStatusText = String(item.status || '').toLowerCase();
1832:     const canReviewProof = /uploaded|review|menunggu|pending/.test(proofStatusText) && !/approved|recorded|paid|sudah|selesai|reject|ditolak/.test(proofStatusText);
1833:     const proofActions = canReviewProof ? `<div class="admin-payment-actions no-print"><button class="row-print-btn row-print-btn--gold" type="button" data-approve-payment="${escapeHtml(item.id || '')}">Approve</button><button class="row-print-btn" type="button" data-reject-payment="${escapeHtml(item.id || '')}">Reject</button></div>` : '<div class="admin-payment-actions admin-payment-actions--locked no-print"><span>Selesai</span></div>';
1834:     return `<article class="payment-proof-row"><div><span>${escapeHtml(item.invoice || 'MANUAL')}</span><strong>${escapeHtml(item.residentName || resident.name || '-')}</strong><small>${escapeHtml(item.room || resident.room || '-')} · ${escapeHtml(item.uploadedAt || item.created_at || '-')}</small>${proofUrl ? `<button class="proof-preview-link proof-preview-button" type="button" data-proof-preview-url="${escapeHtml(proofUrl)}" data-proof-preview-file="${escapeHtml(proofFile)}"><i class="fa-regular fa-image"></i>Lihat Bukti</button>` : `<em class="proof-preview-empty">${escapeHtml(proofFile)}</em>`}</div><b>${rupiah(Number(item.amount || total || 0))}</b><i class="status-${slug(item.status)}">${escapeHtml(item.status)}</i>${proofActions}</article>`;
1835:   }).join('') : '<div class="payment-empty-row"><strong>Belum ada bukti transfer.</strong><p>Queue ini khusus review bukti manual yang diupload penghuni.</p></div>';
1836: 
1837:   const overviewPage = `<section class="payment-review-status"><article><span>Status</span><strong>${escapeHtml(paymentStage)}</strong><small>${proofStatus !== 'none' ? `Bukti: ${escapeHtml(proofStatus)}` : 'Belum ada bukti transfer'}</small></article><article><span>Total Tagihan Awal</span><strong>${rupiah(total)}</strong><small>Sewa ${rupiah(rent)} + deposit ${rupiah(deposit)}</small></article><article><span>Sudah Dibuka via QRIS</span><strong>${rupiah(qrisOpenedTotal)}</strong><small>${qrisParts.length}/${splitParts.length} link dibuat</small></article><article><span>Sisa Belum Dibuka</span><strong>${rupiah(remainingTotal)}</strong><small>Bisa QRIS berikutnya atau transfer</small></article></section><section class="payment-overview-grid"><article><span>Calon Penghuni</span><strong>${escapeHtml(resident.name)}</strong><small>${escapeHtml(resident.room || '-')} · ${escapeHtml(resident.phone || '-')}</small></article><article><span>Rekening Refund</span><strong>${escapeHtml(resident.refundBank || '-')} ${escapeHtml(resident.refundAccount || '-')}</strong><small>${escapeHtml(resident.refundAccountName || '-')}</small></article><article><span>Keputusan Admin</span><strong>${escapeHtml(resident.administrationStatus || resident.applicationStatus || 'Menunggu')}</strong><small>Berubah setelah bukti disetujui/ditolak</small></article></section>`;
1838:   const methodPage = `<section class="payment-method-grid payment-method-grid--admin"><article class="payment-tool-page"><div class="payment-tool-head"><div><span>Metode 1</span><h4>QRIS otomatis</h4><p>Gunakan ini kalau penghuni ingin bayar lewat link QRIS. Nominal besar dibuat bertahap agar tetap masuk limit.</p></div><strong>${rupiah(qrisOpenedTotal)} / ${rupiah(total)}</strong></div><div class="payment-split-list payment-split-list--page">${splitParts.map((part, index) => `<button type="button" class="payment-split-chip ${qrisParts.includes(index) ? 'is-opened' : ''}" data-qris-part="${index}" data-qris-amount="${part}"><span>QRIS ${index + 1}</span><strong>${rupiah(part)}</strong><small>${qrisParts.includes(index) ? 'Link sudah dibuat' : 'Buat link bayar'}</small></button>`).join('') || '<p class="payment-empty-row">Tidak ada tagihan untuk dibuatkan QRIS.</p>'}</div></article><article class="payment-tool-page"><div class="payment-tool-head"><div><span>Metode 2</span><h4>Transfer manual</h4><p>Gunakan ini kalau penghuni transfer bank dan nanti upload bukti pembayaran dari portal resident.</p></div><strong>${rupiah(total)}</strong></div><div class="manual-transfer-box manual-transfer-box--page"><p><span>Bank</span><strong>${manualTransferAccount.bank}</strong></p><p><span>Rekening</span><strong>${manualTransferAccount.number}</strong></p><p><span>Atas nama</span><strong>${manualTransferAccount.holder}</strong></p><p><span>Nominal</span><strong>${rupiah(total)}</strong></p><a class="row-print-btn row-print-btn--gold" href="https://wa.me/${manualTransferAccount.whatsapp}?text=${encodeURIComponent(`Halo Admin Onyx, mohon review pembayaran administrasi ${resident.name || ''} sebesar ${rupiah(total)}.`)}" target="_blank" rel="noopener noreferrer">Kirim Instruksi WA</a></div></article></section>`;
1839:   const proofPage = `<section class="payment-proof-panel"><div class="payment-proof-panel__head"><div><span>Bukti Masuk</span><h4>Review pembayaran transfer</h4><p>Cek bukti yang diupload penghuni. Approve jika valid, reject jika nominal/file tidak sesuai.</p></div><small>${rows.length} bukti</small></div><div class="payment-proof-list">${proofRows}</div></section>${renderProofPreviewModal()}`;
1840:   const pages = { overview: overviewPage, method: methodPage, proof: proofPage };
1841: 
1842:   return `<section class="payment-review-page" id="pembayaran" data-section><div class="payment-review-hero"><div><span>Payment Detail</span><h3>${escapeHtml(resident.name)} · ${escapeHtml(navItems.find(([id]) => id === section)?.[1] || 'Ringkasan')}</h3><p>${escapeHtml(resident.room || '-')} · ${escapeHtml(paymentStage)}</p></div><div class="payment-review-hero__actions no-print"><button class="button subtle" type="button" id="backToPaymentList"><i class="fa-solid fa-arrow-left"></i>List buyer</button><button class="button subtle" type="button" id="refreshPayments"><i class="fa-solid fa-rotate"></i>Refresh</button></div></div>${paymentNav}${pages[section] || overviewPage}</section>`;
1843: }
1844: 
1845: function renderProofPreviewModal() {
1846:   if (!state.proofPreview?.url) return '';
1847:   const url = state.proofPreview.url;
1848:   const file = state.proofPreview.file || 'Bukti pembayaran';
1849:   const isPdf = /\.pdf(\?|#|$)/i.test(url) || /\.pdf$/i.test(file);
1850:   const preview = isPdf
1851:     ? `<iframe src="${escapeHtml(url)}" title="Preview bukti pembayaran"></iframe>`
1852:     : `<img src="${escapeHtml(url)}" alt="Preview bukti pembayaran ${escapeHtml(file)}" />`;
1853:   return `<div class="proof-preview-modal" role="dialog" aria-modal="true"><div class="proof-preview-modal__card"><header><div><span>Bukti Pembayaran</span><h4>${escapeHtml(file)}</h4></div><button class="row-print-btn" type="button" id="closeProofPreview">Tutup</button></header><div class="proof-preview-modal__body">${preview}</div><footer><a class="row-print-btn row-print-btn--gold" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">Buka file asli</a></footer></div></div>`;
1854: }
1855: 
1856: function renderAdminPersonDetail(type, person) {
1857:   if (!person) return '<section class="panel section-panel admin-page-panel"><div class="empty admin-empty-state"><strong>Belum ada data real.</strong><p>Silakan tunggu pendaftaran dari frontend.</p></div></section>';
1858:   const isResident = (person.category || 'Long Stay') === 'Long Stay';
1859:   const adminExtras = person.refund || person.administrationStatus ? `<div class="admin-detail-extra"><article><span>Administrasi</span><strong>${escapeHtml(person.administrationStatus || '-')}</strong></article><article><span>Rekening Refund Deposit</span><strong>${escapeHtml(person.refund || '-')}</strong></article></div>` : '';
1860:   return `<section class="panel section-panel admin-page-panel admin-detail-page"><div class="panel-head wrap"><div><span>${isResident ? 'Detail Penghuni' : 'Detail Penyewa'}</span><h3>${escapeHtml(person.name)}</h3></div><button class="button subtle" type="button" id="backToAdminList"><i class="fa-solid fa-arrow-left"></i>Kembali</button></div><div class="admin-detail-summary"><article><span>Kamar</span><strong>${escapeHtml(person.room)}</strong></article><article><span>Tipe</span><strong>${escapeHtml(person.plan)}</strong></article><article><span>Status</span><strong>${escapeHtml(person.status)}</strong></article></div><form class="admin-detail-form" id="adminDetailForm"><label>Nama<input name="name" value="${escapeHtml(person.name)}" /></label><label>Kamar<input name="room" value="${escapeHtml(person.room)}" /></label><label>${isResident ? 'Masa Huni' : 'Masa Sewa'}<select name="plan"><option ${person.plan === 'Bulanan' ? 'selected' : ''}>Bulanan</option><option ${person.plan === 'Tahunan' ? 'selected' : ''}>Tahunan</option><option ${person.plan === 'Harian' ? 'selected' : ''}>Harian</option><option ${person.plan === 'Mingguan' ? 'selected' : ''}>Mingguan</option></select></label><label>Mulai<input type="date" name="start" value="${escapeHtml(person.start || '')}" /></label><label>Selesai<input type="date" name="end" value="${escapeHtml(person.end || '')}" /></label><label>${isResident ? 'Tagihan' : 'Total Sewa'}<input name="amount" value="${escapeHtml(isResident ? person.billing : person.total)}" /></label><label>Jatuh Tempo<input name="due" value="${escapeHtml(person.due || '')}" /></label><label>Status<select name="status"><option ${person.status === 'Aktif' ? 'selected' : ''}>Aktif</option><option ${person.status === 'Pending' ? 'selected' : ''}>Pending</option><option ${person.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option><option ${person.status === 'Check-in' ? 'selected' : ''}>Check-in</option><option ${person.status === 'Maintenance hold' ? ... (line truncated to 2000 chars)
1861: }
1862: 
1863: function renderReservationsPanel() {
1864:   const backendState = JSON.parse(window.localStorage.getItem('onyx-admin-state') || 'null');
1865:   const applications = backendState?.applications || backendState?.data?.applications || [];
1866:   const rows = applications.map((item) => ({
1867:     code: item.id || '-',
1868:     guest: item.name || '-',
1869:     room: item.room || '-',
1870:     checkin: item.startDate || '-',
1871:     status: item.applicationStatus || 'Menunggu Review',
1872:     total: Number(item.monthlyBudget || 0),
1873:   }));
1874:   return `<section class="panel section-panel admin-page-panel" id="reservasi" data-section><div class="panel-head wrap"><div><span>Booking</span><h3>Reservasi aktif</h3></div><div class="actions no-print"><button class="button success" type="button"><i class="fa-solid fa-plus"></i>Tambah</button><button class="button subtle" type="button"><i class="fa-solid fa-filter"></i>Filter</button></div></div>${renderBookingTable(rows)}</section>`;
1875: }
1876: 
1877: /**
1878:  * @description Render tabel booking dengan status badge dan total harga.
1879:  * @param {Array<object>} rows Data reservasi.
1880:  * @returns {string} Markup tabel booking.
1881:  */
1882: function renderBookingTable(rows) {
1883:   if (!rows.length) return '<div class="empty admin-empty-state"><strong>Belum ada reservasi real.</strong><p>Data akan muncul setelah user melakukan pendaftaran.</p></div>';

(Output capped at 50 KB. Showing lines 1560-1883. Use offset=1884 to continue.)
</content>
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 9.2s)

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src\\main.js",
  "offset": 1570,
  "limit": 520
}
```

**Output:**
```
<path>C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\main.js</path>
<type>file</type>
<content>
1570:     </section>
1571: 
1572:     <section class="admin-discovery-grid no-print" aria-label="Resident Portal, Utilities, IoT Monitoring, Smart Access, Visitor Pass, Service Tickets">
1573:       <article><span>Resident Portal</span><h3>Utilities · Access · Service</h3><p>Buka portal penghuni langsung dari akun admin untuk QA dan operasional.</p><button class="row-print-btn row-print-btn--gold" type="button" data-open-resident-portal="overview">Open Resident Portal</button></article>
1574:       <article><span>Utilities</span><h3>Meter Charges</h3><p>${utilityMeters.length} data listrik/air tersimpan untuk billing penghuni.</p><button class="row-print-btn" type="button" data-admin-quick-section="utilities">View utility meter charges</button></article>
1575:       <article><span>IoT Monitoring</span><h3>Room Telemetry</h3><p>${telemetryRows.length} kamar memiliki telemetry suhu, daya, dan air.</p><button class="row-print-btn" type="button" data-admin-quick-section="iot">View room telemetry</button></article>
1576:       <article><span>Smart Access</span><h3>Visitor Pass</h3><p>Lock state, guest QR, WiFi share, dan access logs resident.</p><button class="row-print-btn" type="button" data-admin-quick-section="access">View access state and visitor pass</button></article>
1577:       <article><span>Service Tickets</span><h3>Requests</h3><p>${serviceTickets.length} tiket layanan/cache siap direview.</p><button class="row-print-btn" type="button" data-admin-quick-section="tickets">Create / review service ticket</button></article>
1578:     </section>
1579: 
1580:     <section class="split-grid admin-dashboard-main">
1581:       <article class="panel chart-card"><div class="panel-head"><div><span>Utility</span><h3>Meter real tersimpan</h3></div></div><div class="admin-action-list"><p><span>Meter rows</span><b>${utilityMeters.length} data utilitas</b><em>Dari backend utility-meter.php</em></p><p><span>Payment proof</span><b>${proofs.length} bukti transfer</b><em>Queue real backend</em></p></div></article>
1582:       <article class="panel table-card"><div class="panel-head"><div><span>Today</span><h3>Action queue</h3></div><a class="text-btn" href="#pembayaran" data-admin-section="pembayaran">Open</a></div><div class="admin-action-list">${resident?.name ? `<p><span>Applicant</span><b>${escapeHtml(resident.name)} · ${escapeHtml(resident.room || '-')}</b><em>${escapeHtml(resident.administrationStatus || resident.applicationStatus || 'Review')}</em></p><p><span>Split QRIS</span><b>${qrisParts.length}/${splitParts.length} part dibuka</b><em>${rupiah(paidQrisTotal)} dari ${rupiah(total)}</em></p><p><span>Refund</span><b>${escapeHtml(resident.refundBank || '-')} · ${escapeHtml(resident.refundAccount || '-')}</b><em>${escapeHtml(resident.refundAccountName || 'Nama rekening belum ada')}</em></p>` : '<p><span>Applicant</span><b>Belum ada pendaftaran baru</b><em>Menunggu data Book</em></p>'}</div></article>
1583:     </section>
1584:   `;
1585: }
1586: 
1587: function renderAdminUtilitiesPanel() {
1588:   const residents = getAdminResidentCandidates();
1589:   const meters = getUtilityMeters();
1590:   const totalCharges = meters.reduce((sum, item) => sum + Number(item.totalAmount || 0), 0);
1591:   const latestRows = meters.slice(0, 12).map((item) => {
1592:     const resident = residents.find((candidate) => candidate.id === item.application_id || getRoomCode(candidate.room) === getRoomCode(item.room));
1593:     return `<article class="admin-ops-row"><div><span>${escapeHtml(item.month || '-')}</span><strong>${escapeHtml(item.residentName || resident?.name || 'Resident')}</strong><small>${escapeHtml(item.room || resident?.room || '-')}</small></div><b>${Number(item.electricKwh || 0)} kWh</b><b>${Number(item.waterM3 || 0)} m³</b><i>${rupiah(Number(item.totalAmount || 0))}</i></article>`;
1594:   }).join('');
1595:   return `<section class="admin-page-panel admin-feature-panel" id="utilities" data-section>
1596:     <div class="panel-head wrap"><div><span>Utilities</span><h3>Utility Meter Charges</h3><p>Listrik, air, dan tagihan meter yang masuk ke billing penghuni.</p></div><button class="button primary" type="button" data-open-resident-portal="utilities"><i class="fa-solid fa-user-shield"></i>Open Resident Utilities</button></div>
1597:     <div class="payment-ops-kpis"><article><span>Meter Rows</span><strong>${meters.length}</strong><small>Data utility-meter.php</small></article><article><span>Total Charges</span><strong>${rupiah(totalCharges)}</strong><small>Akumulasi tagihan utilitas</small></article><article><span>Residents</span><strong>${residents.length}</strong><small>Calon/penghuni aktif</small></article><article><span>Input Meter</span><strong>Room Detail</strong><small>Menu Kamar → Meter & Tagihan</small></article></div>
1598:     <div class="admin-feature-actions no-print"><button class="row-print-btn row-print-btn--gold" type="button" data-admin-open-room-feature="meter">Input Meter & Tagihan</button><button class="row-print-btn" type="button" data-open-resident-portal="billing">View Billing Invoice</button><button class="row-print-btn" type="button" id="refreshPayments">Refresh backend</button></div>
1599:     <div class="admin-ops-table"><div class="admin-ops-row admin-ops-row--head"><span>Resident</span><span>Listrik</span><span>Air</span><span>Tagihan</span></div>${latestRows || '<div class="empty admin-empty-state"><strong>Belum ada utility meter.</strong><p>Buka Kamar → Detail → Meter & Tagihan, lalu simpan meter listrik/air.</p></div>'}</div>
1600:   </section>`;
1601: }
1602: 
1603: function renderAdminIotPanel() {
1604:   const telemetryRows = getIotTelemetryRows();
1605:   const roomRows = getRooms().map((room) => {
1606:     const telemetry = telemetryRows.find((item) => item.roomCode === room.no) || null;
1607:     const devices = getRoomDeviceState(room.no);
1608:     return `<article class="admin-ops-row"><div><span>${escapeHtml(room.no)}</span><strong>${escapeHtml(room.name)}</strong><small>${telemetry?.created_at ? `Updated ${escapeHtml(telemetry.created_at)}` : 'No telemetry yet'}</small></div><b>${telemetry ? `${Number(telemetry.temperature || 0)}°C` : '-'}</b><b>${telemetry ? `${Number(telemetry.powerWatt || 0)} W` : devices.lightOn ? 'Manual on' : 'Manual off'}</b><i>${telemetry ? `${Number(telemetry.waterM3 || 0)} m³` : devices.waterOn ? 'Water on' : 'Water off'}</i></article>`;
1609:   }).join('');
1610:   return `<section class="admin-page-panel admin-feature-panel" id="iot" data-section>
1611:     <div class="panel-head wrap"><div><span>IoT Monitoring</span><h3>Room Telemetry</h3><p>Monitoring suhu, kelembapan, daya listrik, energi, dan air dari ESP32/Wokwi.</p></div><button class="button primary" type="button" data-admin-open-room-feature="control"><i class="fa-solid fa-microchip"></i>Open Smart Control</button></div>
1612:     <div class="payment-ops-kpis"><article><span>Telemetry Rooms</span><strong>${telemetryRows.length}</strong><small>Data iot-ingest.php</small></article><article><span>Total Rooms</span><strong>${getRooms().length}</strong><small>Inventory aktif</small></article><article><span>Mode</span><strong>${telemetryRows.length ? 'Live IoT' : 'Manual'}</strong><small>Fallback smart room aktif</small></article><article><span>Endpoint</span><strong>iot-ingest.php</strong><small>GET/POST telemetry</small></article></div>
1613:     <div class="admin-feature-actions no-print"><button class="row-print-btn row-print-btn--gold" type="button" id="seedIotDemo">Seed demo telemetry</button><button class="row-print-btn" type="button" data-open-resident-portal="utilities">Open Resident Utilities</button><button class="row-print-btn" type="button" id="refreshPayments">Refresh IoT</button></div>
1614:     <div class="admin-ops-table"><div class="admin-ops-row admin-ops-row--head"><span>Room</span><span>Temperature</span><span>Power</span><span>Water</span></div>${roomRows}</div>
1615:   </section>`;
1616: }
1617: 
1618: function renderAdminAccessPanel() {
1619:   const resident = getPrimaryAdminResident();
1620:   const roomCode = getRoomCode(resident?.room || '') || getRooms()[0]?.no || 'ROOM';
1621:   const accessState = JSON.parse(window.localStorage.getItem('onyx-access-state') || `{"locked":true,"guestPass":"QR-ONYX-${String(resident?.id || Date.now()).slice(-4)}","validUntil":"22:00"}`);
1622:   const logs = getAccessLogs(accessState);
1623:   const logRows = logs.map((log) => `<p><span>${escapeHtml(log.time)}</span><b>${escapeHtml(log.action)}</b><em>${escapeHtml(log.detail)}</em><i>${escapeHtml(log.status)}</i></p>`).join('');
1624:   return `<section class="admin-page-panel admin-feature-panel" id="access" data-section>
1625:     <div class="panel-head wrap"><div><span>Smart Access</span><h3>Access State & Visitor Pass</h3><p>Kelola lock state, QR tamu, WiFi share, dan access logs resident.</p></div><button class="button primary" type="button" data-open-resident-portal="access"><i class="fa-solid fa-door-closed"></i>Open Resident Access</button></div>
1626:     <div class="admin-access-grid"><article class="access-hero-card"><span>Door Lock</span><strong>${accessState.locked ? 'Locked' : 'Unlocked'}</strong><p>${escapeHtml(resident?.name || 'Resident')} · ${escapeHtml(roomCode)}</p><button class="row-print-btn row-print-btn--gold" type="button" id="adminToggleSmartLock">${accessState.locked ? 'Unlock room' : 'Lock room'}</button></article><article class="visitor-qr-card"><span>Visitor Pass</span><div class="visitor-qr-code" aria-label="Visitor QR ${escapeHtml(accessState.guestPass)}">${renderVisitorQr(accessState.guestPass)}</div><strong>${escapeHtml(accessState.guestPass)}</strong><p>Berlaku sampai ${escapeHtml(accessState.validUntil)} hari ini.</p><button class="row-print-btn" type="button" data-copy-value="${escapeHtml(accessState.guestPass)}" data-access-action="copy-qr">Copy QR Code</button></article><article class="access-hero-card"><span>WiFi Share</span><strong>ONYX-${escapeHtml(roomCode)}</strong><p>Password: onyx-${escapeHtml(roomCode).toLowerCase()}-wifi</p><button class="row-print-btn" type="button" data-copy-value="ONYX-${escapeHtml(roomCode)} / onyx-${escapeHtml(roomCode).toLowerCase()}-wifi" data-access-action="copy-wifi">Share WiFi</button></article></div>
1627:     <div class="resident-saas-table resident-saas-table--access admin-access-logs">${logRows || '<p><span>Now</span><b>Belum ada access logs</b><em>Gunakan tombol Visitor Pass/Lock</em><i>ready</i></p>'}</div>
1628:   </section>`;
1629: }
1630: 
1631: function renderAdminServiceTicketsPanel() {
1632:   const tickets = getAdminServiceTickets();
1633:   const resident = getPrimaryAdminResident();
1634:   const rows = tickets.map((ticket) => `<article class="admin-ops-row"><div><span>${escapeHtml(ticket.category || 'Service')}</span><strong>${escapeHtml(ticket.issue || '-')}</strong><small>${escapeHtml(ticket.application_id || resident?.id || '-')}</small></div><b>${escapeHtml(ticket.priority || 'Normal')}</b><i>${escapeHtml(ticket.status || 'open')}</i></article>`).join('');
1635:   return `<section class="admin-page-panel admin-feature-panel" id="tickets" data-section>
1636:     <div class="panel-head wrap"><div><span>Service Ticketing</span><h3>Resident Service Tickets</h3><p>Buat dan review request perbaikan, kebersihan, WiFi, AC, air, atau listrik.</p></div><button class="button primary" type="button" data-open-resident-portal="service"><i class="fa-solid fa-user-shield"></i>Open Resident Service</button></div>
1637:     <form class="admin-ticket-form no-print" id="adminServiceTicketForm"><input type="hidden" name="application_id" value="${escapeHtml(resident?.id || '')}" /><label>Kategori<select name="category"><option>Maintenance</option><option>WiFi</option><option>Listrik</option><option>Air</option><option>Kebersihan</option></select></label><label>Prioritas<select name="priority"><option>Normal</option><option>High</option><option>Urgent</option></select></label><label class="admin-ticket-form__issue">Issue<input name="issue" placeholder="Contoh: AC kurang dingin / lampu mati" required /></label><button class="button primary" type="submit">Create Service Ticket</button></form>
1638:     <div class="admin-ops-table"><div class="admin-ops-row admin-ops-row--head"><span>Ticket</span><span>Priority</span><span>Status</span></div>${rows || '<div class="empty admin-empty-state"><strong>Belum ada service ticket.</strong><p>Buat tiket dari form admin atau Resident Portal → Service.</p></div>'}</div>
1639:   </section>`;
1640: }
1641: 
1642: function renderAdminResidentPortalPanel() {
1643:   const resident = getPrimaryAdminResident();
1644:   return `<section class="admin-page-panel admin-feature-panel" id="resident-portal" data-section>
1645:     <div class="panel-head wrap"><div><span>Resident Portal</span><h3>Resident-facing Tools</h3><p>Entry point eksplisit untuk QA: Billing, Utilities, Smart Access, Visitor Pass, dan Service Ticketing.</p></div><button class="button primary" type="button" data-open-resident-portal="overview"><i class="fa-solid fa-user-shield"></i>Launch Resident Portal</button></div>
1646:     <div class="admin-portal-grid"><article><span>Resident</span><strong>${escapeHtml(resident?.name || 'Demo Resident')}</strong><p>${escapeHtml(resident?.room || '-')}</p></article><button type="button" data-open-resident-portal="billing"><i class="fa-solid fa-receipt"></i><span>Billing</span><small>Invoices, QRIS, manual transfer</small></button><button type="button" data-open-resident-portal="utilities"><i class="fa-solid fa-bolt"></i><span>Utilities</span><small>Meter charges & IoT usage</small></button><button type="button" data-open-resident-portal="access"><i class="fa-solid fa-door-closed"></i><span>Smart Access</span><small>Visitor Pass, WiFi, access logs</small></button><button type="button" data-open-resident-portal="service"><i class="fa-solid fa-screwdriver-wrench"></i><span>Service Tickets</span><small>Create and review requests</small></button></div>
1647:   </section>`;
1648: }
1649: 
1650: async function refreshAdminStateForSection(section) {
1651:   const liveSections = ['dashboard', 'kamar', 'penghuni', 'utilities', 'iot', 'access', 'tickets', 'resident-portal', 'pembayaran', 'reservasi', 'laporan'];
1652:   if (!liveSections.includes(section)) return renderApp();
1653:   renderApp();
1654:   syncAdminSectionInBackground();
1655: }
1656: 
1657: async function syncAdminSectionInBackground() {
1658:   if (window.__onyxAdminSectionSyncing) return;
1659:   window.__onyxAdminSectionSyncing = true;
1660:   try {
1661:     await syncAdminState(false);
1662:     try {
1663:       const iot = await apiJson('iot-ingest.php');
1664:       window.localStorage.setItem('onyx-iot-telemetry', JSON.stringify(iot.data || []));
1665:     } catch (error) {
1666:       window.localStorage.setItem('onyx-iot-telemetry-sync-error', String(error?.message || error || 'Gagal sinkron IoT'));
1667:     }
1668:     if (state.page === 'admin') renderApp();
1669:   } finally {
1670:     window.__onyxAdminSectionSyncing = false;
1671:   }
1672: }
1673: 
1674: /**
1675:  * @description Render panel manajemen kamar dengan filter proper.
1676:  * @returns {string} Markup panel kamar.
1677:  */
1678: function renderRoomsPanel() {
1679:   if (state.isRoomCreateOpen && !state.adminRoomDetail) return renderRoomCreatePage();
1680:   if (state.adminRoomDetail) {
1681:     const room = getRooms().find((item) => item.no === state.adminRoomDetail) || getRooms()[0];
1682:     return renderRoomDetailPanel(room);
1683:   }
1684:   const filteredRooms = getRooms().filter((room) => {
1685:     const haystack = `${room.no} ${room.name}`.toLowerCase();
1686:     return haystack.includes(state.roomQuery.toLowerCase()) && (!state.roomType || room.type === state.roomType) && (!state.roomStatus || getEffectiveRoomStatus(room) === state.roomStatus);
1687:   });
1688: 
1689:   return `
1690:     <section class="admin-flat-panel" id="kamar" data-section>
1691:       <div class="inventory-head"><div><span>Inventory</span><h3>Manajemen kamar</h3><p>${filteredRooms.length} kamar ditampilkan · status otomatis mengikuti penghuni aktif.</p></div><div class="inventory-actions no-print"><button class="button success" type="button" id="openRoomCreate"><i class="fa-solid fa-plus"></i>Tambah kamar</button><button class="button subtle" type="button" id="printRooms"><i class="fa-solid fa-print"></i>Cetak</button></div></div>
1692:       <div class="inventory-toolbar no-print"><label class="inventory-search" for="adminRoomSearchProxy"><i class="fa-solid fa-magnifying-glass"></i><input form="roomForm" id="adminRoomSearchProxy" type="search" value="${escapeHtml(state.roomQuery)}" placeholder="Cari nomor / nama kamar" /></label><select class="field" id="typeFilter" aria-label="Filter tipe kamar">${['', 'Standard', 'Deluxe', 'Suite', 'VIP'].map((type) => `<option value="${type}" ${state.roomType === type ? 'selected' : ''}>${type || 'Semua tipe'}</option>`).join('')}</select><select class="field" id="statusFilter" aria-label="Filter status kamar">${['', 'tersedia', 'terisi', 'maintenance'].map((status) => `<option value="${status}" ${state.roomStatus === status ? 'selected' : ''}>${status || 'Semua status'}</option>`).join('')}</select></div>
1693:       <div class="room-list"><div class="room-list-head no-print"><span>Kamar</span><span>Detail</span><span>Harga</span><span>Status</span><span>Aksi</span></div>${filteredRooms.map(renderRoomRow).join('') || '<p class="empty">Tidak ada kamar yang cocok.</p>'}</div>
1694:       ${renderRoomsPrintReport(filteredRooms)}
1695:     </section>
1696:   `;
1697: }
1698: 
1699: function renderRoomsPrintReport(rooms) {
1700:   const occupancy = getRoomOccupancyStats();
1701:   const generatedAt = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
1702:   const rows = rooms.map((room) => {
1703:     const occupant = getRoomOccupant(room.no);
1704:     const status = getEffectiveRoomStatus(room);
1705:     const devices = getRoomDeviceState(room.no);
1706:     const telemetry = getIotTelemetry(room.no);
1707:     const latestMeter = getUtilityMeters().find((item) => getRoomCode(item.room) === room.no) || {};
1708:     const climateType = getRoomClimateType(room);
1709:     const climateLabel = climateType === 'ac' ? `AC ${devices.acOn ? `${devices.temperature}°C` : 'mati'}` : climateType === 'fan' ? `Kipas ${devices.fanOn ? 'menyala' : 'mati'}` : 'Ventilasi manual';
1710:     const utilityLabel = latestMeter.month ? `${latestMeter.month}: ${Number(latestMeter.electricKwh || 0)} kWh, ${Number(latestMeter.waterM3 || 0)} m³, ${rupiah(Number(latestMeter.totalAmount || 0))}` : 'Belum ada input meter';
1711: 
1712:     return `<tr><td><strong>${escapeHtml(room.no)}</strong><span>${escapeHtml(room.floor || '-')}</span></td><td><b>${escapeHtml(room.name)}</b><small>${escapeHtml(room.type)} · ${escapeHtml((room.facilities || []).join(', ') || 'Fasilitas belum diisi')}</small></td><td>${rupiah(Number(room.price || 0))}<small>/ bulan</small></td><td><b>${status === 'terisi' ? 'Tidak tersedia' : escapeHtml(status)}</b><small>${escapeHtml(occupant?.name || 'Kosong')}</small></td><td><b>${escapeHtml(climateLabel)}</b><small>Lampu ${devices.lightOn ? 'menyala' : 'mati'} · Air ${devices.waterOn ? 'aktif' : 'nonaktif'}</small></td><td><b>${escapeHtml(utilityLabel)}</b><small>${telemetry?.created_at ? `IoT ${escapeHtml(telemetry.created_at)}` : 'Manual/standby'}</small></td></tr>`;
1713:   }).join('');
1714: 
1715:   return `<section class="room-print-report" aria-label="Laporan cetak kamar"><header><div><span>Onyx Residence</span><h2>Laporan Inventory Kamar</h2><p>Ringkasan status kamar, penghuni aktif, fasilitas, smart control, dan meter utilitas.</p></div><aside><b>${escapeHtml(generatedAt)}</b><small>Dicetak oleh Admin</small></aside></header><div class="room-print-summary"><article><span>Total kamar</span><strong>${occupancy.totalRooms}</strong></article><article><span>Terisi</span><strong>${occupancy.occupiedRooms}</strong></article><article><span>Tersedia</span><strong>${occupancy.availableRooms}</strong></article><article><span>Occupancy</span><strong>${occupancy.occupancyPercent}%</strong></article></div><table><thead><tr><th>Kamar</th><th>Detail</th><th>Harga</th><th>Status</th><th>Smart Control</th><th>Utilitas</th></tr></thead><tbody>${rows || '<tr><td colspan="6">Tidak ada kamar yang cocok dengan filter.</td></tr>'}</tbody></table><footer><span>Catatan</span><p>Status terisi mengikuti penghuni approved. Meter utilitas memakai input terbaru per kamar jika tersedia.</p></footer></section>`;
1716: }
1717: 
1718: /**
1719:  * @description Render satu baris kamar dengan aksi CRUD.
1720:  * @param {object} room Data kamar.
1721:  * @returns {string} Markup row kamar.
1722:  */
1723: function renderRoomRow(room) {
1724:   const status = getEffectiveRoomStatus(room);
1725:   return `<article class="room-row"><div class="room-code"><strong>${room.no}</strong><span>${room.floor}</span></div><div class="room-main"><h4>${escapeHtml(room.name)}</h4><p>${room.type} · ${room.facilities.map(escapeHtml).join(', ')}</p></div><div class="room-price"><strong>${rupiah(room.price)}</strong><span>/ bulan</span></div><span class="badge ${status}">${status === 'terisi' ? 'tidak tersedia' : status}</span><div class="row-actions row-actions--text no-print"><button type="button" data-room-edit="${escapeHtml(room.no)}" aria-label="Edit ${room.no}"><i class="fa-regular fa-pen-to-square"></i>Edit</button><button type="button" data-room-delete="${escapeHtml(room.no)}" aria-label="Hapus ${room.no}"><i class="fa-regular fa-trash-can"></i>Hapus</button></div></article>`;
1726: }
1727: 
1728: function renderRoomCreatePage() {
1729:   return `<section class="admin-flat-panel admin-page-panel room-detail-panel"><div class="panel-head wrap"><div><span>Tambah Kamar</span><h3>Inventory kamar baru</h3></div><button class="button subtle" type="button" id="backToRooms"><i class="fa-solid fa-arrow-left"></i>Kembali</button></div>${renderRoomEditorForm()}</section>`;
1730: }
1731: 
1732: function renderRoomEditorForm(room = null) {
1733:   return `<form class="room-form no-print room-editor-form" id="roomForm"><div class="form-title"><h4>${room ? 'Edit kamar' : 'Tambah kamar'}</h4><span>Data inventory kamar tersimpan tanpa mengacak list utama.</span></div><input type="hidden" name="id_kamar" value="${escapeHtml(room?.id || '')}" /><label>Nomor<input required name="no_kamar" value="${escapeHtml(room?.no || '')}" placeholder="A09" /></label><label>Kategori<select required name="kategori">${['Standard', 'Deluxe', 'Suite', 'VIP'].map((type) => `<option ${room?.type === type ? 'selected' : ''}>${type}</option>`).join('')}</select></label><label>Nama kamar<input required name="nama_kamar" value="${escapeHtml(room?.name || '')}" placeholder="Onyx Studio" /></label><label>Harga<input required name="harga" type="number" min="0" value="${escapeHtml(room?.price || '')}" placeholder="3100000" /></label><label>Status<select name="status">${['tersedia', 'terisi', 'maintenance'].map((status) => `<option ${getEffectiveRoomStatus(room || {}) === status ? 'selected' : ''}>${status}</option>`).join('')}</select></label><label class="full">Fasilitas<textarea name="fasilitas" placeholder="AC, WiFi, kamar mandi dalam">${escapeHtml((room?.facilities || []).join(', '))}</textarea></label><div class="form-actions full"><button class="button primary" type="submit">Simpan</button><button class="button subtle" type="button" id="closeRoomEditor">Batal</button></div></form>`;
1734: }
1735: 
1736: function renderRoomUtilityForm(room, occupant = null) {
1737:   const month = new Date().toISOString().slice(0, 7);
1738:   return `<form class="room-utility-form no-print" id="roomUtilityMeterForm"><div><span>Input Meter</span><h4>Catat listrik, air, dan tagihan</h4><p>Data masuk ke billing penghuni dan histori meter kamar ini.</p></div><input type="hidden" name="application_id" value="${escapeHtml(occupant?.id || '')}" /><input type="hidden" name="room" value="${escapeHtml(room.no)}" /><input type="hidden" name="residentName" value="${escapeHtml(occupant?.name || '')}" /><label>Bulan<input name="month" type="month" value="${month}" required /></label><label>Listrik kWh<input name="electricKwh" type="number" min="0" step="0.1" placeholder="0" required /></label><label>Air m³<input name="waterM3" type="number" min="0" step="0.1" placeholder="0" required /></label><label>Tarif listrik/kWh<input name="electricRate" type="number" min="0" value="1500" required /></label><label>Tarif air/m³<input name="waterRate" type="number" min="0" value="8000" required /></label><label>Biaya tetap<input name="fixedFee" type="number" min="0" value="0" /></label><button class="button primary" type="submit">Simpan Meter</button></form>`;
1739: }
1740: 
1741: function renderRoomDetailPanel(room) {
1742:   if (!room) return `<section class="admin-flat-panel admin-page-panel"><button class="button subtle" type="button" id="backToRooms"><i class="fa-solid fa-arrow-left"></i>Kembali</button></section>`;
1743:   const occupant = getRoomOccupant(room.no);
1744:   const devices = getRoomDeviceState(room.no);
1745:   const utilityMeters = getUtilityMeters().filter((item) => getRoomCode(item.room) === room.no);
1746:   const latest = utilityMeters[0] || {};
1747:   const telemetry = getIotTelemetry(room.no);
1748:   const climateType = getRoomClimateType(room);
1749:   const facilityList = room.facilities?.length ? room.facilities.map(escapeHtml).join(' · ') : 'Fasilitas belum diisi';
1750:   const effectiveStatus = getEffectiveRoomStatus(room);
1751:   const section = state.activeRoomDetailSection || 'overview';
1752:   const detailNav = [['overview', 'Overview'], ['control', 'Smart Control'], ['meter', 'Meter & Tagihan']];
1753:   const climateRows = climateType === 'ac'
1754:     ? `<p><span><i class="fa-solid fa-snowflake"></i> AC</span><strong>${devices.acOn ? `${devices.temperature}°C` : 'Mati'}</strong><button class="row-print-btn ${devices.acOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="acOn" data-room-code="${escapeHtml(room.no)}">${devices.acOn ? 'Matikan' : 'Nyalakan'}</button></p><label class="room-detail-range"><span>Suhu AC</span><input type="range" min="18" max="30" value="${devices.temperature}" data-admin-room-temp="${escapeHtml(room.no)}" ${devices.acOn ? '' : 'disabled'} /><strong>${devices.temperature}°C</strong></label>`
1755:     : climateType === 'fan'
1756:       ? `<p><span><i class="fa-solid fa-fan"></i> Kipas</span><strong>${devices.fanOn ? 'Menyala' : 'Mati'}</strong><button class="row-print-btn ${devices.fanOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="fanOn" data-room-code="${escapeHtml(room.no)}">${devices.fanOn ? 'Matikan' : 'Nyalakan'}</button></p><p><span><i class="fa-solid fa-wind"></i> Sirkulasi</span><strong>Jendela luar</strong><em>Tanpa AC</em></p>`
1757:       : `<p><span><i class="fa-solid fa-wind"></i> Ventilasi</span><strong>Manual</strong><em>Tidak ada AC/kipas</em></p>`;
1758:   const overviewPage = `<article class="room-detail-card room-detail-card--wide"><div class="room-detail-card__head"><div><span>Overview</span><h4>Informasi kamar</h4></div></div><div class="room-detail-list"><p><span>Status</span><strong>${effectiveStatus === 'terisi' ? 'Tidak tersedia' : escapeHtml(effectiveStatus)}</strong></p><p><span>Tipe</span><strong>${escapeHtml(room.type)}</strong></p><p><span>Fasilitas</span><strong>${facilityList}</strong></p><p><span>Penghuni</span><strong>${escapeHtml(occupant?.name || 'Kosong')}</strong></p><p><span>WiFi</span><strong>ONYX-${escapeHtml(room.no)}</strong></p></div></article>`;
1759:   const controlPage = `<article class="room-detail-card room-detail-card--wide"><div class="room-detail-card__head"><div><span>Smart Control</span><h4>Perangkat kamar</h4></div><small>${telemetry?.created_at ? `IoT ${escapeHtml(telemetry.created_at)}` : 'Manual mode'}</small></div><div class="room-detail-control-list"><p><span><i class="fa-solid fa-lightbulb"></i> Lampu</span><strong>${devices.lightOn ? 'Menyala' : 'Mati'}</strong><button class="row-print-btn ${devices.lightOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="lightOn" data-room-code="${escapeHtml(room.no)}">${devices.lightOn ? 'Matikan' : 'Nyalakan'}</button></p><p><span><i class="fa-solid fa-faucet-drip"></i> Air</span><strong>${devices.waterOn ? 'Aktif' : 'Nonaktif'}</strong><button class="row-print-btn ${devices.waterOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="waterOn" data-room-code="${escapeHtml(room.no)}">${devices.waterOn ? 'Matikan' : 'Nyalakan'}</button></p>${climateRows}</div></article>`;
1760:   const meterPage = `<article class="room-detail-card room-detail-card--wide room-detail-card--meter"><div class="room-detail-card__head"><div><span>Meter</span><h4>Pemakaian & tagihan</h4></div></div><div class="room-meter-line"><p><span>Listrik</span><strong>${telemetry ? `${Number(telemetry.powerWatt || 0)} W` : `${Number(latest.electricKwh || 0)} kWh`}</strong><small>${telemetry ? `${Number(telemetry.energyKwh || 0)} kWh` : 'Meter admin'}</small></p><p><span>Air</span><strong>${telemetry ? `${Number(telemetry.waterM3 || 0)} m³` : `${Number(latest.waterM3 || 0)} m³`}</strong><small>${devices.waterOn ? 'Valve aktif' : 'Valve nonaktif'}</small></p><p><span>Tagihan</span><strong>${latest.totalAmount ? rupiah(Number(latest.totalAmount)) : 'Belum ada'}</strong><small>Utility meter</small></p></div>${renderRoomUtilityForm(room, occupant)}<div class="resident-saas-table resident-saas-table--utility admin-utility-table room-utility-history">${utilityMeters.length ? utilityMeters.map((item) => `<p><span>${escapeHtml(item.month || '-')}</span><b>${Number(item.electricKwh || 0)} kWh</b><em>${Number(item.waterM3 || 0)} m³</em><i>${rupiah(Number(item.totalAmount || 0))}</i></p>`).join('') : '<p><span>Belum ada meter</span><b>0 kWh</b><em>0 m³</em><i>Rp 0</i></p>'}</div></article>`;
1761:   const pages = { overview: overviewPage, control: controlPage, meter: meterPage };
1762: 
1763:   return `<section class="admin-flat-panel admin-page-panel room-detail-panel room-detail-saas"><div class="room-detail-saas__nav"><button class="room-detail-back no-print" type="button" id="backToRooms"><i class="fa-solid fa-arrow-left"></i>Kembali</button><button class="button subtle no-print" type="button" id="toggleRoomEditor"><i class="fa-regular fa-pen-to-square"></i>${state.isRoomCreateOpen ? 'Tutup edit' : 'Edit kamar'}</button></div><header class="room-detail-saas__hero"><div><span>Room Detail</span><h3>${escapeHtml(room.no)} · ${escapeHtml(room.name)}</h3><p>${escapeHtml(room.type)} · ${facilityList}</p></div><b class="room-status-pill ${escapeHtml(effectiveStatus)}">${effectiveStatus === 'terisi' ? 'Tidak tersedia' : escapeHtml(effectiveStatus)}</b></header><div class="room-detail-saas__stats"><p><span>Harga</span><strong>${rupiah(room.price)}</strong><small>/ bulan</small></p><p><span>Penghuni</span><strong>${escapeHtml(occupant?.name || 'Kosong')}</strong><small>${escapeHtml(occupant?.phone || 'Belum ada penghuni aktif')}</small></p><p><span>WiFi</span><strong>ONYX-${escapeHtml(room.no)}</strong><small>password otomatis per kamar</small></p><p><span>IoT</span><strong>${telemetry?.created_at ? 'Online' : 'Standby'}</strong><small>${telemetry?.created_at ? escapeHtml(telemetry.created_at) : 'Menunggu telemetry'}</small></p></div>${state.isRoomCreateOpen ? `<section class="room-edit-focus">${renderRoomEditorForm(room)}</section>` : `<nav class="room-detail-subnav no-print">${detailNav.map(([id, label]) => `<button class="${section === id ? 'is-active' : ''}" type="button" data-room-detail-section="${id}">${label}</button>`).join('')}</nav><section class="room-detail-saas__body room-detail-saas__body--single">${pages[section] || overviewPage}</section>`}</section>`;
1764: }
1765: 
1766: /**
1767:  * @description Render panel tamu dan reservasi.
1768:  * @returns {string} Markup grid tamu dan reservasi.
1769:  */
1770: function renderGuestBookingGrid() {
1771:   return `<section class="split-grid lower-grid"><article class="panel section-panel compact-panel" id="tamu" data-section><div class="panel-head"><div><span>Tamu</span><h3>Data penyewa</h3></div></div><div class="empty admin-empty-state"><strong>Belum ada data penyewa.</strong><p>Semua data diambil dari backend pendaftaran.</p></div></article><article class="panel section-panel compact-panel" id="reservasi" data-section><div class="panel-head"><div><span>Booking</span><h3>Reservasi aktif</h3></div></div>${renderBookingTable([])}</article></section>`;
1772: }
1773: 
1774: function renderGuestsPanel() {
1775:   return `<section class="panel section-panel admin-page-panel" id="tamu" data-section><div class="panel-head wrap"><div><span>Residents</span><h3>Data penyewa</h3></div></div><div class="empty admin-empty-state"><strong>Belum ada data penyewa.</strong><p>Gunakan menu Penghuni/Penyewa untuk data backend real.</p></div></section>`;
1776: }
1777: 
1778: function renderResidentsAdminPanel() {
1779:   const rows = [...getAdminResidents(), ...getAdminShortTermTenants()];
1780:   if (state.adminDetailType === 'penghuni') return renderAdminPersonDetail('penghuni', rows[state.adminDetailIndex] || rows[0]);
1781:   const activeRows = rows.filter((resident) => ['aktif', 'confirmed', 'check-in'].includes(String(resident.status || '').toLowerCase())).length;
1782:   const longStayRows = rows.filter((resident) => (resident.category || 'Long Stay') === 'Long Stay').length;
1783:   const shortStayRows = rows.length - longStayRows;
1784:   const totalBilling = rows.reduce((sum, resident) => sum + Number(String(resident.billing || resident.total || '').replace(/[^0-9]/g, '') || 0), 0);
1785:   const rowMarkup = rows.map((resident, index) => {
1786:     const category = resident.category || 'Resident';
1787:     const period = resident.period || resident.stay || '-';
1788:     const amount = resident.billing || resident.total || '-';
1789:     const initials = String(resident.name || 'R').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
1790:     return `<button class="admin-person-row admin-person-row--hotel" type="button" data-admin-detail="penghuni" data-admin-detail-index="${index}"><span class="resident-avatar">${escapeHtml(initials)}</span><div class="resident-guest"><span>${escapeHtml(resident.room || '-')}</span><strong>${escapeHtml(resident.name || '-')}</strong><small>${escapeHtml(resident.plan || '-')} · ${escapeHtml(period)}</small></div><div class="resident-stay"><span>Tipe sewa</span><strong>${escapeHtml(category)}</strong><small>${escapeHtml(resident.due || resident.end || 'Jadwal belum diisi')}</small></div><div class="resident-billing"><span>Tagihan</span><strong>${escapeHtml(amount)}</strong><small>${escapeHtml(resident.refund || resident.administrationStatus || 'Administrasi standar')}</small></div><i class="tenant-type-label ${slug(category)}">${escapeHtml(category)}</i><em class="resident-status-chip ${slug(resident.status || '')}">${escapeHtml(resident.status || '-')}</em></button>`;
1791:   }).join('');
1792: 
1793:   return `<section class="admin-page-panel admin-resident-ops" id="penghuni" data-section><div class="resident-ops-kpis"><article><span>Total</span><strong>${rows.length}</strong><small>Penghuni dan penyewa</small></article><article><span>Aktif</span><strong>${activeRows}</strong><small>Status berjalan</small></article><article><span>Long stay</span><strong>${longStayRows}</strong><small>Bulanan atau tahunan</small></article><article><span>Short stay</span><strong>${shortStayRows}</strong><small>Harian atau mingguan</small></article><article><span>Billing</span><strong>${totalBilling ? rupiah(totalBilling) : 'Rp 0'}</strong><small>Estimasi tagihan</small></article></div><div class="resident-ops-table"><div class="resident-ops-table__head no-print"><span>Penghuni</span><span>Sewa</span><span>Tagihan</span><span>Tipe</span><span>Status</span></div>${rowMarkup || '<div class="empty admin-empty-state"><strong>Belum ada penghuni atau penyewa real.</strong><p>Data muncul setelah user daftar dan disetujui admin.</p></div>'}</div></section>`;
1794: }
1795: 
1796: function renderPaymentsAdminPanel() {
1797:   const buyers = getAdminPaymentBuyers();
1798:   const selectedBuyer = buyers.find((item) => String(item.id || '') === String(state.adminPaymentDetailId || '')) || null;
1799:   if (!selectedBuyer) {
1800:     const paidBuyers = buyers.filter((buyer) => /bayar|approved|recorded/i.test(buyer.paymentStatus || '')).length;
1801:     const reviewBuyers = buyers.filter((buyer) => /review|uploaded|menunggu/i.test(buyer.paymentStatus || '')).length;
1802:     const totalAmount = buyers.reduce((sum, buyer) => sum + Number(buyer.totalPayment || 0), 0);
1803:     return `<section class="payment-review-page payment-ops-page admin-page-panel" id="pembayaran" data-section><div class="payment-ops-kpis"><article><span>Total Buyer</span><strong>${buyers.length}</strong><small>Calon penghuni</small></article><article><span>Paid / Approved</span><strong>${paidBuyers}</strong><small>Pembayaran selesai</small></article><article><span>Need Review</span><strong>${reviewBuyers}</strong><small>Bukti menunggu admin</small></article><article><span>Total Pipeline</span><strong>${rupiah(totalAmount)}</strong><small>Estimasi administrasi</small></article></div><div class="payment-buyer-table payment-buyer-table--ops"><div class="payment-buyer-table__head no-print"><span>Buyer</span><span>Kamar</span><span>Total</span><span>Status</span><span>Aksi</span></div>${buyers.length ? buyers.map((buyer) => `<article class="payment-buyer-row payment-buyer-row--ops"><div><strong>${escapeHtml(buyer.name || '-')}</strong><small>${escapeHtml(buyer.phone || buyer.email || '-')}</small></div><span>${escapeHtml(buyer.room || '-')}</span><b>${rupiah(Number(buyer.totalPayment || 0))}</b><i class="status-${slug(buyer.paymentStatus || '')}">${escapeHtml(buyer.paymentStatus || '-')}</i><button class="row-print-btn row-print-btn--gold" type="button" data-payment-detail="${escapeHtml(buyer.id || '')}">Detail</button></article>`).join('') : '<div class="empty admin-empty-state"><strong>Belum ada buyer.</strong><p>Data pembayaran muncul setelah user melakukan pendaftaran.</p></div>'}</div></section>`;
1804:   }
1805: 
1806:   const { resident, proof, proofs, qrisParts, splitParts, rent, deposit, total } = getAdminApplicationState(selectedBuyer);
1807:   if (!resident?.name) return `<section class="payment-review-page admin-page-panel" id="pembayaran" data-section><div class="empty admin-empty-state"><strong>Belum ada pembayaran.</strong><p>Data muncul setelah calon penghuni daftar dan memilih metode administrasi.</p></div></section>`;
1808: 
1809:   const rows = proofs.filter((item) => item?.status);
1810:   const qrisOpenedTotal = qrisParts.reduce((sum, index) => sum + Number(splitParts[index] || 0), 0);
1811:   const remainingTotal = Math.max(0, total - qrisOpenedTotal);
1812:   const proofStatus = proof?.status || 'none';
1813:   const paymentStage = proofStatus === 'approved'
1814:     ? 'Administrasi selesai'
1815:     : proofStatus === 'uploaded'
1816:       ? 'Bukti transfer menunggu review'
1817:       : qrisParts.length
1818:         ? 'Pembayaran QRIS sedang berjalan'
1819:         : 'Menunggu pembayaran';
1820:   const rawSection = state.activePaymentSection || 'overview';
1821:   const section = ['qris', 'transfer'].includes(rawSection) ? 'method' : rawSection === 'review' ? 'proof' : rawSection;
1822:   const navItems = [
1823:     ['overview', 'Ringkasan'],
1824:     ['method', 'Metode Bayar'],
1825:     ['proof', 'Bukti Masuk'],
1826:   ];
1827:   const paymentNav = `<nav class="payment-subnav no-print">${navItems.map(([id, label]) => `<button class="${section === id ? 'is-active' : ''}" type="button" data-payment-section="${id}">${label}</button>`).join('')}</nav>`;
1828:   const proofRows = rows.length ? rows.map((item) => {
1829:     const proofUrl = item.fileUrl || item.file_url || item.proofUrl || '';
1830:     const proofFile = item.fileName || item.file_name || 'Tanpa file';
1831:     const proofStatusText = String(item.status || '').toLowerCase();
1832:     const canReviewProof = /uploaded|review|menunggu|pending/.test(proofStatusText) && !/approved|recorded|paid|sudah|selesai|reject|ditolak/.test(proofStatusText);
1833:     const proofActions = canReviewProof ? `<div class="admin-payment-actions no-print"><button class="row-print-btn row-print-btn--gold" type="button" data-approve-payment="${escapeHtml(item.id || '')}">Approve</button><button class="row-print-btn" type="button" data-reject-payment="${escapeHtml(item.id || '')}">Reject</button></div>` : '<div class="admin-payment-actions admin-payment-actions--locked no-print"><span>Selesai</span></div>';
1834:     return `<article class="payment-proof-row"><div><span>${escapeHtml(item.invoice || 'MANUAL')}</span><strong>${escapeHtml(item.residentName || resident.name || '-')}</strong><small>${escapeHtml(item.room || resident.room || '-')} · ${escapeHtml(item.uploadedAt || item.created_at || '-')}</small>${proofUrl ? `<button class="proof-preview-link proof-preview-button" type="button" data-proof-preview-url="${escapeHtml(proofUrl)}" data-proof-preview-file="${escapeHtml(proofFile)}"><i class="fa-regular fa-image"></i>Lihat Bukti</button>` : `<em class="proof-preview-empty">${escapeHtml(proofFile)}</em>`}</div><b>${rupiah(Number(item.amount || total || 0))}</b><i class="status-${slug(item.status)}">${escapeHtml(item.status)}</i>${proofActions}</article>`;
1835:   }).join('') : '<div class="payment-empty-row"><strong>Belum ada bukti transfer.</strong><p>Queue ini khusus review bukti manual yang diupload penghuni.</p></div>';
1836: 
1837:   const overviewPage = `<section class="payment-review-status"><article><span>Status</span><strong>${escapeHtml(paymentStage)}</strong><small>${proofStatus !== 'none' ? `Bukti: ${escapeHtml(proofStatus)}` : 'Belum ada bukti transfer'}</small></article><article><span>Total Tagihan Awal</span><strong>${rupiah(total)}</strong><small>Sewa ${rupiah(rent)} + deposit ${rupiah(deposit)}</small></article><article><span>Sudah Dibuka via QRIS</span><strong>${rupiah(qrisOpenedTotal)}</strong><small>${qrisParts.length}/${splitParts.length} link dibuat</small></article><article><span>Sisa Belum Dibuka</span><strong>${rupiah(remainingTotal)}</strong><small>Bisa QRIS berikutnya atau transfer</small></article></section><section class="payment-overview-grid"><article><span>Calon Penghuni</span><strong>${escapeHtml(resident.name)}</strong><small>${escapeHtml(resident.room || '-')} · ${escapeHtml(resident.phone || '-')}</small></article><article><span>Rekening Refund</span><strong>${escapeHtml(resident.refundBank || '-')} ${escapeHtml(resident.refundAccount || '-')}</strong><small>${escapeHtml(resident.refundAccountName || '-')}</small></article><article><span>Keputusan Admin</span><strong>${escapeHtml(resident.administrationStatus || resident.applicationStatus || 'Menunggu')}</strong><small>Berubah setelah bukti disetujui/ditolak</small></article></section>`;
1838:   const methodPage = `<section class="payment-method-grid payment-method-grid--admin"><article class="payment-tool-page"><div class="payment-tool-head"><div><span>Metode 1</span><h4>QRIS otomatis</h4><p>Gunakan ini kalau penghuni ingin bayar lewat link QRIS. Nominal besar dibuat bertahap agar tetap masuk limit.</p></div><strong>${rupiah(qrisOpenedTotal)} / ${rupiah(total)}</strong></div><div class="payment-split-list payment-split-list--page">${splitParts.map((part, index) => `<button type="button" class="payment-split-chip ${qrisParts.includes(index) ? 'is-opened' : ''}" data-qris-part="${index}" data-qris-amount="${part}"><span>QRIS ${index + 1}</span><strong>${rupiah(part)}</strong><small>${qrisParts.includes(index) ? 'Link sudah dibuat' : 'Buat link bayar'}</small></button>`).join('') || '<p class="payment-empty-row">Tidak ada tagihan untuk dibuatkan QRIS.</p>'}</div></article><article class="payment-tool-page"><div class="payment-tool-head"><div><span>Metode 2</span><h4>Transfer manual</h4><p>Gunakan ini kalau penghuni transfer bank dan nanti upload bukti pembayaran dari portal resident.</p></div><strong>${rupiah(total)}</strong></div><div class="manual-transfer-box manual-transfer-box--page"><p><span>Bank</span><strong>${manualTransferAccount.bank}</strong></p><p><span>Rekening</span><strong>${manualTransferAccount.number}</strong></p><p><span>Atas nama</span><strong>${manualTransferAccount.holder}</strong></p><p><span>Nominal</span><strong>${rupiah(total)}</strong></p><a class="row-print-btn row-print-btn--gold" href="https://wa.me/${manualTransferAccount.whatsapp}?text=${encodeURIComponent(`Halo Admin Onyx, mohon review pembayaran administrasi ${resident.name || ''} sebesar ${rupiah(total)}.`)}" target="_blank" rel="noopener noreferrer">Kirim Instruksi WA</a></div></article></section>`;
1839:   const proofPage = `<section class="payment-proof-panel"><div class="payment-proof-panel__head"><div><span>Bukti Masuk</span><h4>Review pembayaran transfer</h4><p>Cek bukti yang diupload penghuni. Approve jika valid, reject jika nominal/file tidak sesuai.</p></div><small>${rows.length} bukti</small></div><div class="payment-proof-list">${proofRows}</div></section>${renderProofPreviewModal()}`;
1840:   const pages = { overview: overviewPage, method: methodPage, proof: proofPage };
1841: 
1842:   return `<section class="payment-review-page" id="pembayaran" data-section><div class="payment-review-hero"><div><span>Payment Detail</span><h3>${escapeHtml(resident.name)} · ${escapeHtml(navItems.find(([id]) => id === section)?.[1] || 'Ringkasan')}</h3><p>${escapeHtml(resident.room || '-')} · ${escapeHtml(paymentStage)}</p></div><div class="payment-review-hero__actions no-print"><button class="button subtle" type="button" id="backToPaymentList"><i class="fa-solid fa-arrow-left"></i>List buyer</button><button class="button subtle" type="button" id="refreshPayments"><i class="fa-solid fa-rotate"></i>Refresh</button></div></div>${paymentNav}${pages[section] || overviewPage}</section>`;
1843: }
1844: 
1845: function renderProofPreviewModal() {
1846:   if (!state.proofPreview?.url) return '';
1847:   const url = state.proofPreview.url;
1848:   const file = state.proofPreview.file || 'Bukti pembayaran';
1849:   const isPdf = /\.pdf(\?|#|$)/i.test(url) || /\.pdf$/i.test(file);
1850:   const preview = isPdf
1851:     ? `<iframe src="${escapeHtml(url)}" title="Preview bukti pembayaran"></iframe>`
1852:     : `<img src="${escapeHtml(url)}" alt="Preview bukti pembayaran ${escapeHtml(file)}" />`;
1853:   return `<div class="proof-preview-modal" role="dialog" aria-modal="true"><div class="proof-preview-modal__card"><header><div><span>Bukti Pembayaran</span><h4>${escapeHtml(file)}</h4></div><button class="row-print-btn" type="button" id="closeProofPreview">Tutup</button></header><div class="proof-preview-modal__body">${preview}</div><footer><a class="row-print-btn row-print-btn--gold" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">Buka file asli</a></footer></div></div>`;
1854: }
1855: 
1856: function renderAdminPersonDetail(type, person) {
1857:   if (!person) return '<section class="panel section-panel admin-page-panel"><div class="empty admin-empty-state"><strong>Belum ada data real.</strong><p>Silakan tunggu pendaftaran dari frontend.</p></div></section>';
1858:   const isResident = (person.category || 'Long Stay') === 'Long Stay';
1859:   const adminExtras = person.refund || person.administrationStatus ? `<div class="admin-detail-extra"><article><span>Administrasi</span><strong>${escapeHtml(person.administrationStatus || '-')}</strong></article><article><span>Rekening Refund Deposit</span><strong>${escapeHtml(person.refund || '-')}</strong></article></div>` : '';
1860:   return `<section class="panel section-panel admin-page-panel admin-detail-page"><div class="panel-head wrap"><div><span>${isResident ? 'Detail Penghuni' : 'Detail Penyewa'}</span><h3>${escapeHtml(person.name)}</h3></div><button class="button subtle" type="button" id="backToAdminList"><i class="fa-solid fa-arrow-left"></i>Kembali</button></div><div class="admin-detail-summary"><article><span>Kamar</span><strong>${escapeHtml(person.room)}</strong></article><article><span>Tipe</span><strong>${escapeHtml(person.plan)}</strong></article><article><span>Status</span><strong>${escapeHtml(person.status)}</strong></article></div><form class="admin-detail-form" id="adminDetailForm"><label>Nama<input name="name" value="${escapeHtml(person.name)}" /></label><label>Kamar<input name="room" value="${escapeHtml(person.room)}" /></label><label>${isResident ? 'Masa Huni' : 'Masa Sewa'}<select name="plan"><option ${person.plan === 'Bulanan' ? 'selected' : ''}>Bulanan</option><option ${person.plan === 'Tahunan' ? 'selected' : ''}>Tahunan</option><option ${person.plan === 'Harian' ? 'selected' : ''}>Harian</option><option ${person.plan === 'Mingguan' ? 'selected' : ''}>Mingguan</option></select></label><label>Mulai<input type="date" name="start" value="${escapeHtml(person.start || '')}" /></label><label>Selesai<input type="date" name="end" value="${escapeHtml(person.end || '')}" /></label><label>${isResident ? 'Tagihan' : 'Total Sewa'}<input name="amount" value="${escapeHtml(isResident ? person.billing : person.total)}" /></label><label>Jatuh Tempo<input name="due" value="${escapeHtml(person.due || '')}" /></label><label>Status<select name="status"><option ${person.status === 'Aktif' ? 'selected' : ''}>Aktif</option><option ${person.status === 'Pending' ? 'selected' : ''}>Pending</option><option ${person.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option><option ${person.status === 'Check-in' ? 'selected' : ''}>Check-in</option><option ${person.status === 'Maintenance hold' ? ... (line truncated to 2000 chars)
1861: }
1862: 
1863: function renderReservationsPanel() {
1864:   const backendState = JSON.parse(window.localStorage.getItem('onyx-admin-state') || 'null');
1865:   const applications = backendState?.applications || backendState?.data?.applications || [];
1866:   const rows = applications.map((item) => ({
1867:     code: item.id || '-',
1868:     guest: item.name || '-',
1869:     room: item.room || '-',
1870:     checkin: item.startDate || '-',
1871:     status: item.applicationStatus || 'Menunggu Review',
1872:     total: Number(item.monthlyBudget || 0),
1873:   }));
1874:   return `<section class="panel section-panel admin-page-panel" id="reservasi" data-section><div class="panel-head wrap"><div><span>Booking</span><h3>Reservasi aktif</h3></div><div class="actions no-print"><button class="button success" type="button"><i class="fa-solid fa-plus"></i>Tambah</button><button class="button subtle" type="button"><i class="fa-solid fa-filter"></i>Filter</button></div></div>${renderBookingTable(rows)}</section>`;
1875: }
1876: 
1877: /**
1878:  * @description Render tabel booking dengan status badge dan total harga.
1879:  * @param {Array<object>} rows Data reservasi.
1880:  * @returns {string} Markup tabel booking.
1881:  */
1882: function renderBookingTable(rows) {
1883:   if (!rows.length) return '<div class="empty admin-empty-state"><strong>Belum ada reservasi real.</strong><p>Data akan muncul setelah user melakukan pendaftaran.</p></div>';
1884:   return `<div class="table-wrap"><table><thead><tr><th>Kode</th><th>Tamu</th><th>Kamar</th><th>Check-in</th><th>Status</th><th>Total</th></tr></thead><tbody>${rows.map((row) => `<tr><td>${escapeHtml(row.code)}</td><td>${escapeHtml(row.guest)}</td><td>${escapeHtml(row.room)}</td><td>${escapeHtml(row.checkin)}</td><td><span class="badge ${slug(row.status)}">${escapeHtml(row.status)}</span></td><td>${rupiah(row.total)}</td></tr>`).join('')}</tbody></table></div>`;
1885: }
1886: 
1887: /**
1888:  * @description Render invoice print view sesuai fitur cetak PRD.
1889:  * @returns {string} Markup invoice.
1890:  */
1891: function renderCashflowPanel() {
1892:   const buyers = getAdminPaymentBuyers();
1893:   const { utilityMeters } = getAdminApplicationState();
1894:   if (!buyers.length) return '<section class="admin-page-panel cashflow-page" id="laporan" data-section><div class="empty admin-empty-state"><strong>Belum ada data cashflow.</strong><p>Laporan keuangan muncul setelah ada pendaftaran dan pembayaran resident.</p></div></section>';
1895: 
1896:   const paidBuyers = buyers.filter((item) => /Sudah bayar/i.test(item.paymentStatus || ''));
1897:   const reviewBuyers = buyers.filter((item) => /Menunggu review/i.test(item.paymentStatus || ''));
1898:   const rejectedBuyers = buyers.filter((item) => /Ditolak/i.test(item.paymentStatus || ''));

(Output capped at 50 KB. Showing lines 1570-1898. Use offset=1899 to continue.)
</content>
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 9.2s)

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src\\main.js",
  "offset": 1588,
  "limit": 420
}
```

**Output:**
```
<path>C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\main.js</path>
<type>file</type>
<content>
1588:   const residents = getAdminResidentCandidates();
1589:   const meters = getUtilityMeters();
1590:   const totalCharges = meters.reduce((sum, item) => sum + Number(item.totalAmount || 0), 0);
1591:   const latestRows = meters.slice(0, 12).map((item) => {
1592:     const resident = residents.find((candidate) => candidate.id === item.application_id || getRoomCode(candidate.room) === getRoomCode(item.room));
1593:     return `<article class="admin-ops-row"><div><span>${escapeHtml(item.month || '-')}</span><strong>${escapeHtml(item.residentName || resident?.name || 'Resident')}</strong><small>${escapeHtml(item.room || resident?.room || '-')}</small></div><b>${Number(item.electricKwh || 0)} kWh</b><b>${Number(item.waterM3 || 0)} m³</b><i>${rupiah(Number(item.totalAmount || 0))}</i></article>`;
1594:   }).join('');
1595:   return `<section class="admin-page-panel admin-feature-panel" id="utilities" data-section>
1596:     <div class="panel-head wrap"><div><span>Utilities</span><h3>Utility Meter Charges</h3><p>Listrik, air, dan tagihan meter yang masuk ke billing penghuni.</p></div><button class="button primary" type="button" data-open-resident-portal="utilities"><i class="fa-solid fa-user-shield"></i>Open Resident Utilities</button></div>
1597:     <div class="payment-ops-kpis"><article><span>Meter Rows</span><strong>${meters.length}</strong><small>Data utility-meter.php</small></article><article><span>Total Charges</span><strong>${rupiah(totalCharges)}</strong><small>Akumulasi tagihan utilitas</small></article><article><span>Residents</span><strong>${residents.length}</strong><small>Calon/penghuni aktif</small></article><article><span>Input Meter</span><strong>Room Detail</strong><small>Menu Kamar → Meter & Tagihan</small></article></div>
1598:     <div class="admin-feature-actions no-print"><button class="row-print-btn row-print-btn--gold" type="button" data-admin-open-room-feature="meter">Input Meter & Tagihan</button><button class="row-print-btn" type="button" data-open-resident-portal="billing">View Billing Invoice</button><button class="row-print-btn" type="button" id="refreshPayments">Refresh backend</button></div>
1599:     <div class="admin-ops-table"><div class="admin-ops-row admin-ops-row--head"><span>Resident</span><span>Listrik</span><span>Air</span><span>Tagihan</span></div>${latestRows || '<div class="empty admin-empty-state"><strong>Belum ada utility meter.</strong><p>Buka Kamar → Detail → Meter & Tagihan, lalu simpan meter listrik/air.</p></div>'}</div>
1600:   </section>`;
1601: }
1602: 
1603: function renderAdminIotPanel() {
1604:   const telemetryRows = getIotTelemetryRows();
1605:   const roomRows = getRooms().map((room) => {
1606:     const telemetry = telemetryRows.find((item) => item.roomCode === room.no) || null;
1607:     const devices = getRoomDeviceState(room.no);
1608:     return `<article class="admin-ops-row"><div><span>${escapeHtml(room.no)}</span><strong>${escapeHtml(room.name)}</strong><small>${telemetry?.created_at ? `Updated ${escapeHtml(telemetry.created_at)}` : 'No telemetry yet'}</small></div><b>${telemetry ? `${Number(telemetry.temperature || 0)}°C` : '-'}</b><b>${telemetry ? `${Number(telemetry.powerWatt || 0)} W` : devices.lightOn ? 'Manual on' : 'Manual off'}</b><i>${telemetry ? `${Number(telemetry.waterM3 || 0)} m³` : devices.waterOn ? 'Water on' : 'Water off'}</i></article>`;
1609:   }).join('');
1610:   return `<section class="admin-page-panel admin-feature-panel" id="iot" data-section>
1611:     <div class="panel-head wrap"><div><span>IoT Monitoring</span><h3>Room Telemetry</h3><p>Monitoring suhu, kelembapan, daya listrik, energi, dan air dari ESP32/Wokwi.</p></div><button class="button primary" type="button" data-admin-open-room-feature="control"><i class="fa-solid fa-microchip"></i>Open Smart Control</button></div>
1612:     <div class="payment-ops-kpis"><article><span>Telemetry Rooms</span><strong>${telemetryRows.length}</strong><small>Data iot-ingest.php</small></article><article><span>Total Rooms</span><strong>${getRooms().length}</strong><small>Inventory aktif</small></article><article><span>Mode</span><strong>${telemetryRows.length ? 'Live IoT' : 'Manual'}</strong><small>Fallback smart room aktif</small></article><article><span>Endpoint</span><strong>iot-ingest.php</strong><small>GET/POST telemetry</small></article></div>
1613:     <div class="admin-feature-actions no-print"><button class="row-print-btn row-print-btn--gold" type="button" id="seedIotDemo">Seed demo telemetry</button><button class="row-print-btn" type="button" data-open-resident-portal="utilities">Open Resident Utilities</button><button class="row-print-btn" type="button" id="refreshPayments">Refresh IoT</button></div>
1614:     <div class="admin-ops-table"><div class="admin-ops-row admin-ops-row--head"><span>Room</span><span>Temperature</span><span>Power</span><span>Water</span></div>${roomRows}</div>
1615:   </section>`;
1616: }
1617: 
1618: function renderAdminAccessPanel() {
1619:   const resident = getPrimaryAdminResident();
1620:   const roomCode = getRoomCode(resident?.room || '') || getRooms()[0]?.no || 'ROOM';
1621:   const accessState = JSON.parse(window.localStorage.getItem('onyx-access-state') || `{"locked":true,"guestPass":"QR-ONYX-${String(resident?.id || Date.now()).slice(-4)}","validUntil":"22:00"}`);
1622:   const logs = getAccessLogs(accessState);
1623:   const logRows = logs.map((log) => `<p><span>${escapeHtml(log.time)}</span><b>${escapeHtml(log.action)}</b><em>${escapeHtml(log.detail)}</em><i>${escapeHtml(log.status)}</i></p>`).join('');
1624:   return `<section class="admin-page-panel admin-feature-panel" id="access" data-section>
1625:     <div class="panel-head wrap"><div><span>Smart Access</span><h3>Access State & Visitor Pass</h3><p>Kelola lock state, QR tamu, WiFi share, dan access logs resident.</p></div><button class="button primary" type="button" data-open-resident-portal="access"><i class="fa-solid fa-door-closed"></i>Open Resident Access</button></div>
1626:     <div class="admin-access-grid"><article class="access-hero-card"><span>Door Lock</span><strong>${accessState.locked ? 'Locked' : 'Unlocked'}</strong><p>${escapeHtml(resident?.name || 'Resident')} · ${escapeHtml(roomCode)}</p><button class="row-print-btn row-print-btn--gold" type="button" id="adminToggleSmartLock">${accessState.locked ? 'Unlock room' : 'Lock room'}</button></article><article class="visitor-qr-card"><span>Visitor Pass</span><div class="visitor-qr-code" aria-label="Visitor QR ${escapeHtml(accessState.guestPass)}">${renderVisitorQr(accessState.guestPass)}</div><strong>${escapeHtml(accessState.guestPass)}</strong><p>Berlaku sampai ${escapeHtml(accessState.validUntil)} hari ini.</p><button class="row-print-btn" type="button" data-copy-value="${escapeHtml(accessState.guestPass)}" data-access-action="copy-qr">Copy QR Code</button></article><article class="access-hero-card"><span>WiFi Share</span><strong>ONYX-${escapeHtml(roomCode)}</strong><p>Password: onyx-${escapeHtml(roomCode).toLowerCase()}-wifi</p><button class="row-print-btn" type="button" data-copy-value="ONYX-${escapeHtml(roomCode)} / onyx-${escapeHtml(roomCode).toLowerCase()}-wifi" data-access-action="copy-wifi">Share WiFi</button></article></div>
1627:     <div class="resident-saas-table resident-saas-table--access admin-access-logs">${logRows || '<p><span>Now</span><b>Belum ada access logs</b><em>Gunakan tombol Visitor Pass/Lock</em><i>ready</i></p>'}</div>
1628:   </section>`;
1629: }
1630: 
1631: function renderAdminServiceTicketsPanel() {
1632:   const tickets = getAdminServiceTickets();
1633:   const resident = getPrimaryAdminResident();
1634:   const rows = tickets.map((ticket) => `<article class="admin-ops-row"><div><span>${escapeHtml(ticket.category || 'Service')}</span><strong>${escapeHtml(ticket.issue || '-')}</strong><small>${escapeHtml(ticket.application_id || resident?.id || '-')}</small></div><b>${escapeHtml(ticket.priority || 'Normal')}</b><i>${escapeHtml(ticket.status || 'open')}</i></article>`).join('');
1635:   return `<section class="admin-page-panel admin-feature-panel" id="tickets" data-section>
1636:     <div class="panel-head wrap"><div><span>Service Ticketing</span><h3>Resident Service Tickets</h3><p>Buat dan review request perbaikan, kebersihan, WiFi, AC, air, atau listrik.</p></div><button class="button primary" type="button" data-open-resident-portal="service"><i class="fa-solid fa-user-shield"></i>Open Resident Service</button></div>
1637:     <form class="admin-ticket-form no-print" id="adminServiceTicketForm"><input type="hidden" name="application_id" value="${escapeHtml(resident?.id || '')}" /><label>Kategori<select name="category"><option>Maintenance</option><option>WiFi</option><option>Listrik</option><option>Air</option><option>Kebersihan</option></select></label><label>Prioritas<select name="priority"><option>Normal</option><option>High</option><option>Urgent</option></select></label><label class="admin-ticket-form__issue">Issue<input name="issue" placeholder="Contoh: AC kurang dingin / lampu mati" required /></label><button class="button primary" type="submit">Create Service Ticket</button></form>
1638:     <div class="admin-ops-table"><div class="admin-ops-row admin-ops-row--head"><span>Ticket</span><span>Priority</span><span>Status</span></div>${rows || '<div class="empty admin-empty-state"><strong>Belum ada service ticket.</strong><p>Buat tiket dari form admin atau Resident Portal → Service.</p></div>'}</div>
1639:   </section>`;
1640: }
1641: 
1642: function renderAdminResidentPortalPanel() {
1643:   const resident = getPrimaryAdminResident();
1644:   return `<section class="admin-page-panel admin-feature-panel" id="resident-portal" data-section>
1645:     <div class="panel-head wrap"><div><span>Resident Portal</span><h3>Resident-facing Tools</h3><p>Entry point eksplisit untuk QA: Billing, Utilities, Smart Access, Visitor Pass, dan Service Ticketing.</p></div><button class="button primary" type="button" data-open-resident-portal="overview"><i class="fa-solid fa-user-shield"></i>Launch Resident Portal</button></div>
1646:     <div class="admin-portal-grid"><article><span>Resident</span><strong>${escapeHtml(resident?.name || 'Demo Resident')}</strong><p>${escapeHtml(resident?.room || '-')}</p></article><button type="button" data-open-resident-portal="billing"><i class="fa-solid fa-receipt"></i><span>Billing</span><small>Invoices, QRIS, manual transfer</small></button><button type="button" data-open-resident-portal="utilities"><i class="fa-solid fa-bolt"></i><span>Utilities</span><small>Meter charges & IoT usage</small></button><button type="button" data-open-resident-portal="access"><i class="fa-solid fa-door-closed"></i><span>Smart Access</span><small>Visitor Pass, WiFi, access logs</small></button><button type="button" data-open-resident-portal="service"><i class="fa-solid fa-screwdriver-wrench"></i><span>Service Tickets</span><small>Create and review requests</small></button></div>
1647:   </section>`;
1648: }
1649: 
1650: async function refreshAdminStateForSection(section) {
1651:   const liveSections = ['dashboard', 'kamar', 'penghuni', 'utilities', 'iot', 'access', 'tickets', 'resident-portal', 'pembayaran', 'reservasi', 'laporan'];
1652:   if (!liveSections.includes(section)) return renderApp();
1653:   renderApp();
1654:   syncAdminSectionInBackground();
1655: }
1656: 
1657: async function syncAdminSectionInBackground() {
1658:   if (window.__onyxAdminSectionSyncing) return;
1659:   window.__onyxAdminSectionSyncing = true;
1660:   try {
1661:     await syncAdminState(false);
1662:     try {
1663:       const iot = await apiJson('iot-ingest.php');
1664:       window.localStorage.setItem('onyx-iot-telemetry', JSON.stringify(iot.data || []));
1665:     } catch (error) {
1666:       window.localStorage.setItem('onyx-iot-telemetry-sync-error', String(error?.message || error || 'Gagal sinkron IoT'));
1667:     }
1668:     if (state.page === 'admin') renderApp();
1669:   } finally {
1670:     window.__onyxAdminSectionSyncing = false;
1671:   }
1672: }
1673: 
1674: /**
1675:  * @description Render panel manajemen kamar dengan filter proper.
1676:  * @returns {string} Markup panel kamar.
1677:  */
1678: function renderRoomsPanel() {
1679:   if (state.isRoomCreateOpen && !state.adminRoomDetail) return renderRoomCreatePage();
1680:   if (state.adminRoomDetail) {
1681:     const room = getRooms().find((item) => item.no === state.adminRoomDetail) || getRooms()[0];
1682:     return renderRoomDetailPanel(room);
1683:   }
1684:   const filteredRooms = getRooms().filter((room) => {
1685:     const haystack = `${room.no} ${room.name}`.toLowerCase();
1686:     return haystack.includes(state.roomQuery.toLowerCase()) && (!state.roomType || room.type === state.roomType) && (!state.roomStatus || getEffectiveRoomStatus(room) === state.roomStatus);
1687:   });
1688: 
1689:   return `
1690:     <section class="admin-flat-panel" id="kamar" data-section>
1691:       <div class="inventory-head"><div><span>Inventory</span><h3>Manajemen kamar</h3><p>${filteredRooms.length} kamar ditampilkan · status otomatis mengikuti penghuni aktif.</p></div><div class="inventory-actions no-print"><button class="button success" type="button" id="openRoomCreate"><i class="fa-solid fa-plus"></i>Tambah kamar</button><button class="button subtle" type="button" id="printRooms"><i class="fa-solid fa-print"></i>Cetak</button></div></div>
1692:       <div class="inventory-toolbar no-print"><label class="inventory-search" for="adminRoomSearchProxy"><i class="fa-solid fa-magnifying-glass"></i><input form="roomForm" id="adminRoomSearchProxy" type="search" value="${escapeHtml(state.roomQuery)}" placeholder="Cari nomor / nama kamar" /></label><select class="field" id="typeFilter" aria-label="Filter tipe kamar">${['', 'Standard', 'Deluxe', 'Suite', 'VIP'].map((type) => `<option value="${type}" ${state.roomType === type ? 'selected' : ''}>${type || 'Semua tipe'}</option>`).join('')}</select><select class="field" id="statusFilter" aria-label="Filter status kamar">${['', 'tersedia', 'terisi', 'maintenance'].map((status) => `<option value="${status}" ${state.roomStatus === status ? 'selected' : ''}>${status || 'Semua status'}</option>`).join('')}</select></div>
1693:       <div class="room-list"><div class="room-list-head no-print"><span>Kamar</span><span>Detail</span><span>Harga</span><span>Status</span><span>Aksi</span></div>${filteredRooms.map(renderRoomRow).join('') || '<p class="empty">Tidak ada kamar yang cocok.</p>'}</div>
1694:       ${renderRoomsPrintReport(filteredRooms)}
1695:     </section>
1696:   `;
1697: }
1698: 
1699: function renderRoomsPrintReport(rooms) {
1700:   const occupancy = getRoomOccupancyStats();
1701:   const generatedAt = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
1702:   const rows = rooms.map((room) => {
1703:     const occupant = getRoomOccupant(room.no);
1704:     const status = getEffectiveRoomStatus(room);
1705:     const devices = getRoomDeviceState(room.no);
1706:     const telemetry = getIotTelemetry(room.no);
1707:     const latestMeter = getUtilityMeters().find((item) => getRoomCode(item.room) === room.no) || {};
1708:     const climateType = getRoomClimateType(room);
1709:     const climateLabel = climateType === 'ac' ? `AC ${devices.acOn ? `${devices.temperature}°C` : 'mati'}` : climateType === 'fan' ? `Kipas ${devices.fanOn ? 'menyala' : 'mati'}` : 'Ventilasi manual';
1710:     const utilityLabel = latestMeter.month ? `${latestMeter.month}: ${Number(latestMeter.electricKwh || 0)} kWh, ${Number(latestMeter.waterM3 || 0)} m³, ${rupiah(Number(latestMeter.totalAmount || 0))}` : 'Belum ada input meter';
1711: 
1712:     return `<tr><td><strong>${escapeHtml(room.no)}</strong><span>${escapeHtml(room.floor || '-')}</span></td><td><b>${escapeHtml(room.name)}</b><small>${escapeHtml(room.type)} · ${escapeHtml((room.facilities || []).join(', ') || 'Fasilitas belum diisi')}</small></td><td>${rupiah(Number(room.price || 0))}<small>/ bulan</small></td><td><b>${status === 'terisi' ? 'Tidak tersedia' : escapeHtml(status)}</b><small>${escapeHtml(occupant?.name || 'Kosong')}</small></td><td><b>${escapeHtml(climateLabel)}</b><small>Lampu ${devices.lightOn ? 'menyala' : 'mati'} · Air ${devices.waterOn ? 'aktif' : 'nonaktif'}</small></td><td><b>${escapeHtml(utilityLabel)}</b><small>${telemetry?.created_at ? `IoT ${escapeHtml(telemetry.created_at)}` : 'Manual/standby'}</small></td></tr>`;
1713:   }).join('');
1714: 
1715:   return `<section class="room-print-report" aria-label="Laporan cetak kamar"><header><div><span>Onyx Residence</span><h2>Laporan Inventory Kamar</h2><p>Ringkasan status kamar, penghuni aktif, fasilitas, smart control, dan meter utilitas.</p></div><aside><b>${escapeHtml(generatedAt)}</b><small>Dicetak oleh Admin</small></aside></header><div class="room-print-summary"><article><span>Total kamar</span><strong>${occupancy.totalRooms}</strong></article><article><span>Terisi</span><strong>${occupancy.occupiedRooms}</strong></article><article><span>Tersedia</span><strong>${occupancy.availableRooms}</strong></article><article><span>Occupancy</span><strong>${occupancy.occupancyPercent}%</strong></article></div><table><thead><tr><th>Kamar</th><th>Detail</th><th>Harga</th><th>Status</th><th>Smart Control</th><th>Utilitas</th></tr></thead><tbody>${rows || '<tr><td colspan="6">Tidak ada kamar yang cocok dengan filter.</td></tr>'}</tbody></table><footer><span>Catatan</span><p>Status terisi mengikuti penghuni approved. Meter utilitas memakai input terbaru per kamar jika tersedia.</p></footer></section>`;
1716: }
1717: 
1718: /**
1719:  * @description Render satu baris kamar dengan aksi CRUD.
1720:  * @param {object} room Data kamar.
1721:  * @returns {string} Markup row kamar.
1722:  */
1723: function renderRoomRow(room) {
1724:   const status = getEffectiveRoomStatus(room);
1725:   return `<article class="room-row"><div class="room-code"><strong>${room.no}</strong><span>${room.floor}</span></div><div class="room-main"><h4>${escapeHtml(room.name)}</h4><p>${room.type} · ${room.facilities.map(escapeHtml).join(', ')}</p></div><div class="room-price"><strong>${rupiah(room.price)}</strong><span>/ bulan</span></div><span class="badge ${status}">${status === 'terisi' ? 'tidak tersedia' : status}</span><div class="row-actions row-actions--text no-print"><button type="button" data-room-edit="${escapeHtml(room.no)}" aria-label="Edit ${room.no}"><i class="fa-regular fa-pen-to-square"></i>Edit</button><button type="button" data-room-delete="${escapeHtml(room.no)}" aria-label="Hapus ${room.no}"><i class="fa-regular fa-trash-can"></i>Hapus</button></div></article>`;
1726: }
1727: 
1728: function renderRoomCreatePage() {
1729:   return `<section class="admin-flat-panel admin-page-panel room-detail-panel"><div class="panel-head wrap"><div><span>Tambah Kamar</span><h3>Inventory kamar baru</h3></div><button class="button subtle" type="button" id="backToRooms"><i class="fa-solid fa-arrow-left"></i>Kembali</button></div>${renderRoomEditorForm()}</section>`;
1730: }
1731: 
1732: function renderRoomEditorForm(room = null) {
1733:   return `<form class="room-form no-print room-editor-form" id="roomForm"><div class="form-title"><h4>${room ? 'Edit kamar' : 'Tambah kamar'}</h4><span>Data inventory kamar tersimpan tanpa mengacak list utama.</span></div><input type="hidden" name="id_kamar" value="${escapeHtml(room?.id || '')}" /><label>Nomor<input required name="no_kamar" value="${escapeHtml(room?.no || '')}" placeholder="A09" /></label><label>Kategori<select required name="kategori">${['Standard', 'Deluxe', 'Suite', 'VIP'].map((type) => `<option ${room?.type === type ? 'selected' : ''}>${type}</option>`).join('')}</select></label><label>Nama kamar<input required name="nama_kamar" value="${escapeHtml(room?.name || '')}" placeholder="Onyx Studio" /></label><label>Harga<input required name="harga" type="number" min="0" value="${escapeHtml(room?.price || '')}" placeholder="3100000" /></label><label>Status<select name="status">${['tersedia', 'terisi', 'maintenance'].map((status) => `<option ${getEffectiveRoomStatus(room || {}) === status ? 'selected' : ''}>${status}</option>`).join('')}</select></label><label class="full">Fasilitas<textarea name="fasilitas" placeholder="AC, WiFi, kamar mandi dalam">${escapeHtml((room?.facilities || []).join(', '))}</textarea></label><div class="form-actions full"><button class="button primary" type="submit">Simpan</button><button class="button subtle" type="button" id="closeRoomEditor">Batal</button></div></form>`;
1734: }
1735: 
1736: function renderRoomUtilityForm(room, occupant = null) {
1737:   const month = new Date().toISOString().slice(0, 7);
1738:   return `<form class="room-utility-form no-print" id="roomUtilityMeterForm"><div><span>Input Meter</span><h4>Catat listrik, air, dan tagihan</h4><p>Data masuk ke billing penghuni dan histori meter kamar ini.</p></div><input type="hidden" name="application_id" value="${escapeHtml(occupant?.id || '')}" /><input type="hidden" name="room" value="${escapeHtml(room.no)}" /><input type="hidden" name="residentName" value="${escapeHtml(occupant?.name || '')}" /><label>Bulan<input name="month" type="month" value="${month}" required /></label><label>Listrik kWh<input name="electricKwh" type="number" min="0" step="0.1" placeholder="0" required /></label><label>Air m³<input name="waterM3" type="number" min="0" step="0.1" placeholder="0" required /></label><label>Tarif listrik/kWh<input name="electricRate" type="number" min="0" value="1500" required /></label><label>Tarif air/m³<input name="waterRate" type="number" min="0" value="8000" required /></label><label>Biaya tetap<input name="fixedFee" type="number" min="0" value="0" /></label><button class="button primary" type="submit">Simpan Meter</button></form>`;
1739: }
1740: 
1741: function renderRoomDetailPanel(room) {
1742:   if (!room) return `<section class="admin-flat-panel admin-page-panel"><button class="button subtle" type="button" id="backToRooms"><i class="fa-solid fa-arrow-left"></i>Kembali</button></section>`;
1743:   const occupant = getRoomOccupant(room.no);
1744:   const devices = getRoomDeviceState(room.no);
1745:   const utilityMeters = getUtilityMeters().filter((item) => getRoomCode(item.room) === room.no);
1746:   const latest = utilityMeters[0] || {};
1747:   const telemetry = getIotTelemetry(room.no);
1748:   const climateType = getRoomClimateType(room);
1749:   const facilityList = room.facilities?.length ? room.facilities.map(escapeHtml).join(' · ') : 'Fasilitas belum diisi';
1750:   const effectiveStatus = getEffectiveRoomStatus(room);
1751:   const section = state.activeRoomDetailSection || 'overview';
1752:   const detailNav = [['overview', 'Overview'], ['control', 'Smart Control'], ['meter', 'Meter & Tagihan']];
1753:   const climateRows = climateType === 'ac'
1754:     ? `<p><span><i class="fa-solid fa-snowflake"></i> AC</span><strong>${devices.acOn ? `${devices.temperature}°C` : 'Mati'}</strong><button class="row-print-btn ${devices.acOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="acOn" data-room-code="${escapeHtml(room.no)}">${devices.acOn ? 'Matikan' : 'Nyalakan'}</button></p><label class="room-detail-range"><span>Suhu AC</span><input type="range" min="18" max="30" value="${devices.temperature}" data-admin-room-temp="${escapeHtml(room.no)}" ${devices.acOn ? '' : 'disabled'} /><strong>${devices.temperature}°C</strong></label>`
1755:     : climateType === 'fan'
1756:       ? `<p><span><i class="fa-solid fa-fan"></i> Kipas</span><strong>${devices.fanOn ? 'Menyala' : 'Mati'}</strong><button class="row-print-btn ${devices.fanOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="fanOn" data-room-code="${escapeHtml(room.no)}">${devices.fanOn ? 'Matikan' : 'Nyalakan'}</button></p><p><span><i class="fa-solid fa-wind"></i> Sirkulasi</span><strong>Jendela luar</strong><em>Tanpa AC</em></p>`
1757:       : `<p><span><i class="fa-solid fa-wind"></i> Ventilasi</span><strong>Manual</strong><em>Tidak ada AC/kipas</em></p>`;
1758:   const overviewPage = `<article class="room-detail-card room-detail-card--wide"><div class="room-detail-card__head"><div><span>Overview</span><h4>Informasi kamar</h4></div></div><div class="room-detail-list"><p><span>Status</span><strong>${effectiveStatus === 'terisi' ? 'Tidak tersedia' : escapeHtml(effectiveStatus)}</strong></p><p><span>Tipe</span><strong>${escapeHtml(room.type)}</strong></p><p><span>Fasilitas</span><strong>${facilityList}</strong></p><p><span>Penghuni</span><strong>${escapeHtml(occupant?.name || 'Kosong')}</strong></p><p><span>WiFi</span><strong>ONYX-${escapeHtml(room.no)}</strong></p></div></article>`;
1759:   const controlPage = `<article class="room-detail-card room-detail-card--wide"><div class="room-detail-card__head"><div><span>Smart Control</span><h4>Perangkat kamar</h4></div><small>${telemetry?.created_at ? `IoT ${escapeHtml(telemetry.created_at)}` : 'Manual mode'}</small></div><div class="room-detail-control-list"><p><span><i class="fa-solid fa-lightbulb"></i> Lampu</span><strong>${devices.lightOn ? 'Menyala' : 'Mati'}</strong><button class="row-print-btn ${devices.lightOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="lightOn" data-room-code="${escapeHtml(room.no)}">${devices.lightOn ? 'Matikan' : 'Nyalakan'}</button></p><p><span><i class="fa-solid fa-faucet-drip"></i> Air</span><strong>${devices.waterOn ? 'Aktif' : 'Nonaktif'}</strong><button class="row-print-btn ${devices.waterOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="waterOn" data-room-code="${escapeHtml(room.no)}">${devices.waterOn ? 'Matikan' : 'Nyalakan'}</button></p>${climateRows}</div></article>`;
1760:   const meterPage = `<article class="room-detail-card room-detail-card--wide room-detail-card--meter"><div class="room-detail-card__head"><div><span>Meter</span><h4>Pemakaian & tagihan</h4></div></div><div class="room-meter-line"><p><span>Listrik</span><strong>${telemetry ? `${Number(telemetry.powerWatt || 0)} W` : `${Number(latest.electricKwh || 0)} kWh`}</strong><small>${telemetry ? `${Number(telemetry.energyKwh || 0)} kWh` : 'Meter admin'}</small></p><p><span>Air</span><strong>${telemetry ? `${Number(telemetry.waterM3 || 0)} m³` : `${Number(latest.waterM3 || 0)} m³`}</strong><small>${devices.waterOn ? 'Valve aktif' : 'Valve nonaktif'}</small></p><p><span>Tagihan</span><strong>${latest.totalAmount ? rupiah(Number(latest.totalAmount)) : 'Belum ada'}</strong><small>Utility meter</small></p></div>${renderRoomUtilityForm(room, occupant)}<div class="resident-saas-table resident-saas-table--utility admin-utility-table room-utility-history">${utilityMeters.length ? utilityMeters.map((item) => `<p><span>${escapeHtml(item.month || '-')}</span><b>${Number(item.electricKwh || 0)} kWh</b><em>${Number(item.waterM3 || 0)} m³</em><i>${rupiah(Number(item.totalAmount || 0))}</i></p>`).join('') : '<p><span>Belum ada meter</span><b>0 kWh</b><em>0 m³</em><i>Rp 0</i></p>'}</div></article>`;
1761:   const pages = { overview: overviewPage, control: controlPage, meter: meterPage };
1762: 
1763:   return `<section class="admin-flat-panel admin-page-panel room-detail-panel room-detail-saas"><div class="room-detail-saas__nav"><button class="room-detail-back no-print" type="button" id="backToRooms"><i class="fa-solid fa-arrow-left"></i>Kembali</button><button class="button subtle no-print" type="button" id="toggleRoomEditor"><i class="fa-regular fa-pen-to-square"></i>${state.isRoomCreateOpen ? 'Tutup edit' : 'Edit kamar'}</button></div><header class="room-detail-saas__hero"><div><span>Room Detail</span><h3>${escapeHtml(room.no)} · ${escapeHtml(room.name)}</h3><p>${escapeHtml(room.type)} · ${facilityList}</p></div><b class="room-status-pill ${escapeHtml(effectiveStatus)}">${effectiveStatus === 'terisi' ? 'Tidak tersedia' : escapeHtml(effectiveStatus)}</b></header><div class="room-detail-saas__stats"><p><span>Harga</span><strong>${rupiah(room.price)}</strong><small>/ bulan</small></p><p><span>Penghuni</span><strong>${escapeHtml(occupant?.name || 'Kosong')}</strong><small>${escapeHtml(occupant?.phone || 'Belum ada penghuni aktif')}</small></p><p><span>WiFi</span><strong>ONYX-${escapeHtml(room.no)}</strong><small>password otomatis per kamar</small></p><p><span>IoT</span><strong>${telemetry?.created_at ? 'Online' : 'Standby'}</strong><small>${telemetry?.created_at ? escapeHtml(telemetry.created_at) : 'Menunggu telemetry'}</small></p></div>${state.isRoomCreateOpen ? `<section class="room-edit-focus">${renderRoomEditorForm(room)}</section>` : `<nav class="room-detail-subnav no-print">${detailNav.map(([id, label]) => `<button class="${section === id ? 'is-active' : ''}" type="button" data-room-detail-section="${id}">${label}</button>`).join('')}</nav><section class="room-detail-saas__body room-detail-saas__body--single">${pages[section] || overviewPage}</section>`}</section>`;
1764: }
1765: 
1766: /**
1767:  * @description Render panel tamu dan reservasi.
1768:  * @returns {string} Markup grid tamu dan reservasi.
1769:  */
1770: function renderGuestBookingGrid() {
1771:   return `<section class="split-grid lower-grid"><article class="panel section-panel compact-panel" id="tamu" data-section><div class="panel-head"><div><span>Tamu</span><h3>Data penyewa</h3></div></div><div class="empty admin-empty-state"><strong>Belum ada data penyewa.</strong><p>Semua data diambil dari backend pendaftaran.</p></div></article><article class="panel section-panel compact-panel" id="reservasi" data-section><div class="panel-head"><div><span>Booking</span><h3>Reservasi aktif</h3></div></div>${renderBookingTable([])}</article></section>`;
1772: }
1773: 
1774: function renderGuestsPanel() {
1775:   return `<section class="panel section-panel admin-page-panel" id="tamu" data-section><div class="panel-head wrap"><div><span>Residents</span><h3>Data penyewa</h3></div></div><div class="empty admin-empty-state"><strong>Belum ada data penyewa.</strong><p>Gunakan menu Penghuni/Penyewa untuk data backend real.</p></div></section>`;
1776: }
1777: 
1778: function renderResidentsAdminPanel() {
1779:   const rows = [...getAdminResidents(), ...getAdminShortTermTenants()];
1780:   if (state.adminDetailType === 'penghuni') return renderAdminPersonDetail('penghuni', rows[state.adminDetailIndex] || rows[0]);
1781:   const activeRows = rows.filter((resident) => ['aktif', 'confirmed', 'check-in'].includes(String(resident.status || '').toLowerCase())).length;
1782:   const longStayRows = rows.filter((resident) => (resident.category || 'Long Stay') === 'Long Stay').length;
1783:   const shortStayRows = rows.length - longStayRows;
1784:   const totalBilling = rows.reduce((sum, resident) => sum + Number(String(resident.billing || resident.total || '').replace(/[^0-9]/g, '') || 0), 0);
1785:   const rowMarkup = rows.map((resident, index) => {
1786:     const category = resident.category || 'Resident';
1787:     const period = resident.period || resident.stay || '-';
1788:     const amount = resident.billing || resident.total || '-';
1789:     const initials = String(resident.name || 'R').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
1790:     return `<button class="admin-person-row admin-person-row--hotel" type="button" data-admin-detail="penghuni" data-admin-detail-index="${index}"><span class="resident-avatar">${escapeHtml(initials)}</span><div class="resident-guest"><span>${escapeHtml(resident.room || '-')}</span><strong>${escapeHtml(resident.name || '-')}</strong><small>${escapeHtml(resident.plan || '-')} · ${escapeHtml(period)}</small></div><div class="resident-stay"><span>Tipe sewa</span><strong>${escapeHtml(category)}</strong><small>${escapeHtml(resident.due || resident.end || 'Jadwal belum diisi')}</small></div><div class="resident-billing"><span>Tagihan</span><strong>${escapeHtml(amount)}</strong><small>${escapeHtml(resident.refund || resident.administrationStatus || 'Administrasi standar')}</small></div><i class="tenant-type-label ${slug(category)}">${escapeHtml(category)}</i><em class="resident-status-chip ${slug(resident.status || '')}">${escapeHtml(resident.status || '-')}</em></button>`;
1791:   }).join('');
1792: 
1793:   return `<section class="admin-page-panel admin-resident-ops" id="penghuni" data-section><div class="resident-ops-kpis"><article><span>Total</span><strong>${rows.length}</strong><small>Penghuni dan penyewa</small></article><article><span>Aktif</span><strong>${activeRows}</strong><small>Status berjalan</small></article><article><span>Long stay</span><strong>${longStayRows}</strong><small>Bulanan atau tahunan</small></article><article><span>Short stay</span><strong>${shortStayRows}</strong><small>Harian atau mingguan</small></article><article><span>Billing</span><strong>${totalBilling ? rupiah(totalBilling) : 'Rp 0'}</strong><small>Estimasi tagihan</small></article></div><div class="resident-ops-table"><div class="resident-ops-table__head no-print"><span>Penghuni</span><span>Sewa</span><span>Tagihan</span><span>Tipe</span><span>Status</span></div>${rowMarkup || '<div class="empty admin-empty-state"><strong>Belum ada penghuni atau penyewa real.</strong><p>Data muncul setelah user daftar dan disetujui admin.</p></div>'}</div></section>`;
1794: }
1795: 
1796: function renderPaymentsAdminPanel() {
1797:   const buyers = getAdminPaymentBuyers();
1798:   const selectedBuyer = buyers.find((item) => String(item.id || '') === String(state.adminPaymentDetailId || '')) || null;
1799:   if (!selectedBuyer) {
1800:     const paidBuyers = buyers.filter((buyer) => /bayar|approved|recorded/i.test(buyer.paymentStatus || '')).length;
1801:     const reviewBuyers = buyers.filter((buyer) => /review|uploaded|menunggu/i.test(buyer.paymentStatus || '')).length;
1802:     const totalAmount = buyers.reduce((sum, buyer) => sum + Number(buyer.totalPayment || 0), 0);
1803:     return `<section class="payment-review-page payment-ops-page admin-page-panel" id="pembayaran" data-section><div class="payment-ops-kpis"><article><span>Total Buyer</span><strong>${buyers.length}</strong><small>Calon penghuni</small></article><article><span>Paid / Approved</span><strong>${paidBuyers}</strong><small>Pembayaran selesai</small></article><article><span>Need Review</span><strong>${reviewBuyers}</strong><small>Bukti menunggu admin</small></article><article><span>Total Pipeline</span><strong>${rupiah(totalAmount)}</strong><small>Estimasi administrasi</small></article></div><div class="payment-buyer-table payment-buyer-table--ops"><div class="payment-buyer-table__head no-print"><span>Buyer</span><span>Kamar</span><span>Total</span><span>Status</span><span>Aksi</span></div>${buyers.length ? buyers.map((buyer) => `<article class="payment-buyer-row payment-buyer-row--ops"><div><strong>${escapeHtml(buyer.name || '-')}</strong><small>${escapeHtml(buyer.phone || buyer.email || '-')}</small></div><span>${escapeHtml(buyer.room || '-')}</span><b>${rupiah(Number(buyer.totalPayment || 0))}</b><i class="status-${slug(buyer.paymentStatus || '')}">${escapeHtml(buyer.paymentStatus || '-')}</i><button class="row-print-btn row-print-btn--gold" type="button" data-payment-detail="${escapeHtml(buyer.id || '')}">Detail</button></article>`).join('') : '<div class="empty admin-empty-state"><strong>Belum ada buyer.</strong><p>Data pembayaran muncul setelah user melakukan pendaftaran.</p></div>'}</div></section>`;
1804:   }
1805: 
1806:   const { resident, proof, proofs, qrisParts, splitParts, rent, deposit, total } = getAdminApplicationState(selectedBuyer);
1807:   if (!resident?.name) return `<section class="payment-review-page admin-page-panel" id="pembayaran" data-section><div class="empty admin-empty-state"><strong>Belum ada pembayaran.</strong><p>Data muncul setelah calon penghuni daftar dan memilih metode administrasi.</p></div></section>`;
1808: 
1809:   const rows = proofs.filter((item) => item?.status);
1810:   const qrisOpenedTotal = qrisParts.reduce((sum, index) => sum + Number(splitParts[index] || 0), 0);
1811:   const remainingTotal = Math.max(0, total - qrisOpenedTotal);
1812:   const proofStatus = proof?.status || 'none';
1813:   const paymentStage = proofStatus === 'approved'
1814:     ? 'Administrasi selesai'
1815:     : proofStatus === 'uploaded'
1816:       ? 'Bukti transfer menunggu review'
1817:       : qrisParts.length
1818:         ? 'Pembayaran QRIS sedang berjalan'
1819:         : 'Menunggu pembayaran';
1820:   const rawSection = state.activePaymentSection || 'overview';
1821:   const section = ['qris', 'transfer'].includes(rawSection) ? 'method' : rawSection === 'review' ? 'proof' : rawSection;
1822:   const navItems = [
1823:     ['overview', 'Ringkasan'],
1824:     ['method', 'Metode Bayar'],
1825:     ['proof', 'Bukti Masuk'],
1826:   ];
1827:   const paymentNav = `<nav class="payment-subnav no-print">${navItems.map(([id, label]) => `<button class="${section === id ? 'is-active' : ''}" type="button" data-payment-section="${id}">${label}</button>`).join('')}</nav>`;
1828:   const proofRows = rows.length ? rows.map((item) => {
1829:     const proofUrl = item.fileUrl || item.file_url || item.proofUrl || '';
1830:     const proofFile = item.fileName || item.file_name || 'Tanpa file';
1831:     const proofStatusText = String(item.status || '').toLowerCase();
1832:     const canReviewProof = /uploaded|review|menunggu|pending/.test(proofStatusText) && !/approved|recorded|paid|sudah|selesai|reject|ditolak/.test(proofStatusText);
1833:     const proofActions = canReviewProof ? `<div class="admin-payment-actions no-print"><button class="row-print-btn row-print-btn--gold" type="button" data-approve-payment="${escapeHtml(item.id || '')}">Approve</button><button class="row-print-btn" type="button" data-reject-payment="${escapeHtml(item.id || '')}">Reject</button></div>` : '<div class="admin-payment-actions admin-payment-actions--locked no-print"><span>Selesai</span></div>';
1834:     return `<article class="payment-proof-row"><div><span>${escapeHtml(item.invoice || 'MANUAL')}</span><strong>${escapeHtml(item.residentName || resident.name || '-')}</strong><small>${escapeHtml(item.room || resident.room || '-')} · ${escapeHtml(item.uploadedAt || item.created_at || '-')}</small>${proofUrl ? `<button class="proof-preview-link proof-preview-button" type="button" data-proof-preview-url="${escapeHtml(proofUrl)}" data-proof-preview-file="${escapeHtml(proofFile)}"><i class="fa-regular fa-image"></i>Lihat Bukti</button>` : `<em class="proof-preview-empty">${escapeHtml(proofFile)}</em>`}</div><b>${rupiah(Number(item.amount || total || 0))}</b><i class="status-${slug(item.status)}">${escapeHtml(item.status)}</i>${proofActions}</article>`;
1835:   }).join('') : '<div class="payment-empty-row"><strong>Belum ada bukti transfer.</strong><p>Queue ini khusus review bukti manual yang diupload penghuni.</p></div>';
1836: 
1837:   const overviewPage = `<section class="payment-review-status"><article><span>Status</span><strong>${escapeHtml(paymentStage)}</strong><small>${proofStatus !== 'none' ? `Bukti: ${escapeHtml(proofStatus)}` : 'Belum ada bukti transfer'}</small></article><article><span>Total Tagihan Awal</span><strong>${rupiah(total)}</strong><small>Sewa ${rupiah(rent)} + deposit ${rupiah(deposit)}</small></article><article><span>Sudah Dibuka via QRIS</span><strong>${rupiah(qrisOpenedTotal)}</strong><small>${qrisParts.length}/${splitParts.length} link dibuat</small></article><article><span>Sisa Belum Dibuka</span><strong>${rupiah(remainingTotal)}</strong><small>Bisa QRIS berikutnya atau transfer</small></article></section><section class="payment-overview-grid"><article><span>Calon Penghuni</span><strong>${escapeHtml(resident.name)}</strong><small>${escapeHtml(resident.room || '-')} · ${escapeHtml(resident.phone || '-')}</small></article><article><span>Rekening Refund</span><strong>${escapeHtml(resident.refundBank || '-')} ${escapeHtml(resident.refundAccount || '-')}</strong><small>${escapeHtml(resident.refundAccountName || '-')}</small></article><article><span>Keputusan Admin</span><strong>${escapeHtml(resident.administrationStatus || resident.applicationStatus || 'Menunggu')}</strong><small>Berubah setelah bukti disetujui/ditolak</small></article></section>`;
1838:   const methodPage = `<section class="payment-method-grid payment-method-grid--admin"><article class="payment-tool-page"><div class="payment-tool-head"><div><span>Metode 1</span><h4>QRIS otomatis</h4><p>Gunakan ini kalau penghuni ingin bayar lewat link QRIS. Nominal besar dibuat bertahap agar tetap masuk limit.</p></div><strong>${rupiah(qrisOpenedTotal)} / ${rupiah(total)}</strong></div><div class="payment-split-list payment-split-list--page">${splitParts.map((part, index) => `<button type="button" class="payment-split-chip ${qrisParts.includes(index) ? 'is-opened' : ''}" data-qris-part="${index}" data-qris-amount="${part}"><span>QRIS ${index + 1}</span><strong>${rupiah(part)}</strong><small>${qrisParts.includes(index) ? 'Link sudah dibuat' : 'Buat link bayar'}</small></button>`).join('') || '<p class="payment-empty-row">Tidak ada tagihan untuk dibuatkan QRIS.</p>'}</div></article><article class="payment-tool-page"><div class="payment-tool-head"><div><span>Metode 2</span><h4>Transfer manual</h4><p>Gunakan ini kalau penghuni transfer bank dan nanti upload bukti pembayaran dari portal resident.</p></div><strong>${rupiah(total)}</strong></div><div class="manual-transfer-box manual-transfer-box--page"><p><span>Bank</span><strong>${manualTransferAccount.bank}</strong></p><p><span>Rekening</span><strong>${manualTransferAccount.number}</strong></p><p><span>Atas nama</span><strong>${manualTransferAccount.holder}</strong></p><p><span>Nominal</span><strong>${rupiah(total)}</strong></p><a class="row-print-btn row-print-btn--gold" href="https://wa.me/${manualTransferAccount.whatsapp}?text=${encodeURIComponent(`Halo Admin Onyx, mohon review pembayaran administrasi ${resident.name || ''} sebesar ${rupiah(total)}.`)}" target="_blank" rel="noopener noreferrer">Kirim Instruksi WA</a></div></article></section>`;
1839:   const proofPage = `<section class="payment-proof-panel"><div class="payment-proof-panel__head"><div><span>Bukti Masuk</span><h4>Review pembayaran transfer</h4><p>Cek bukti yang diupload penghuni. Approve jika valid, reject jika nominal/file tidak sesuai.</p></div><small>${rows.length} bukti</small></div><div class="payment-proof-list">${proofRows}</div></section>${renderProofPreviewModal()}`;
1840:   const pages = { overview: overviewPage, method: methodPage, proof: proofPage };
1841: 
1842:   return `<section class="payment-review-page" id="pembayaran" data-section><div class="payment-review-hero"><div><span>Payment Detail</span><h3>${escapeHtml(resident.name)} · ${escapeHtml(navItems.find(([id]) => id === section)?.[1] || 'Ringkasan')}</h3><p>${escapeHtml(resident.room || '-')} · ${escapeHtml(paymentStage)}</p></div><div class="payment-review-hero__actions no-print"><button class="button subtle" type="button" id="backToPaymentList"><i class="fa-solid fa-arrow-left"></i>List buyer</button><button class="button subtle" type="button" id="refreshPayments"><i class="fa-solid fa-rotate"></i>Refresh</button></div></div>${paymentNav}${pages[section] || overviewPage}</section>`;
1843: }
1844: 
1845: function renderProofPreviewModal() {
1846:   if (!state.proofPreview?.url) return '';
1847:   const url = state.proofPreview.url;
1848:   const file = state.proofPreview.file || 'Bukti pembayaran';
1849:   const isPdf = /\.pdf(\?|#|$)/i.test(url) || /\.pdf$/i.test(file);
1850:   const preview = isPdf
1851:     ? `<iframe src="${escapeHtml(url)}" title="Preview bukti pembayaran"></iframe>`
1852:     : `<img src="${escapeHtml(url)}" alt="Preview bukti pembayaran ${escapeHtml(file)}" />`;
1853:   return `<div class="proof-preview-modal" role="dialog" aria-modal="true"><div class="proof-preview-modal__card"><header><div><span>Bukti Pembayaran</span><h4>${escapeHtml(file)}</h4></div><button class="row-print-btn" type="button" id="closeProofPreview">Tutup</button></header><div class="proof-preview-modal__body">${preview}</div><footer><a class="row-print-btn row-print-btn--gold" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">Buka file asli</a></footer></div></div>`;
1854: }
1855: 
1856: function renderAdminPersonDetail(type, person) {
1857:   if (!person) return '<section class="panel section-panel admin-page-panel"><div class="empty admin-empty-state"><strong>Belum ada data real.</strong><p>Silakan tunggu pendaftaran dari frontend.</p></div></section>';
1858:   const isResident = (person.category || 'Long Stay') === 'Long Stay';
1859:   const adminExtras = person.refund || person.administrationStatus ? `<div class="admin-detail-extra"><article><span>Administrasi</span><strong>${escapeHtml(person.administrationStatus || '-')}</strong></article><article><span>Rekening Refund Deposit</span><strong>${escapeHtml(person.refund || '-')}</strong></article></div>` : '';
1860:   return `<section class="panel section-panel admin-page-panel admin-detail-page"><div class="panel-head wrap"><div><span>${isResident ? 'Detail Penghuni' : 'Detail Penyewa'}</span><h3>${escapeHtml(person.name)}</h3></div><button class="button subtle" type="button" id="backToAdminList"><i class="fa-solid fa-arrow-left"></i>Kembali</button></div><div class="admin-detail-summary"><article><span>Kamar</span><strong>${escapeHtml(person.room)}</strong></article><article><span>Tipe</span><strong>${escapeHtml(person.plan)}</strong></article><article><span>Status</span><strong>${escapeHtml(person.status)}</strong></article></div><form class="admin-detail-form" id="adminDetailForm"><label>Nama<input name="name" value="${escapeHtml(person.name)}" /></label><label>Kamar<input name="room" value="${escapeHtml(person.room)}" /></label><label>${isResident ? 'Masa Huni' : 'Masa Sewa'}<select name="plan"><option ${person.plan === 'Bulanan' ? 'selected' : ''}>Bulanan</option><option ${person.plan === 'Tahunan' ? 'selected' : ''}>Tahunan</option><option ${person.plan === 'Harian' ? 'selected' : ''}>Harian</option><option ${person.plan === 'Mingguan' ? 'selected' : ''}>Mingguan</option></select></label><label>Mulai<input type="date" name="start" value="${escapeHtml(person.start || '')}" /></label><label>Selesai<input type="date" name="end" value="${escapeHtml(person.end || '')}" /></label><label>${isResident ? 'Tagihan' : 'Total Sewa'}<input name="amount" value="${escapeHtml(isResident ? person.billing : person.total)}" /></label><label>Jatuh Tempo<input name="due" value="${escapeHtml(person.due || '')}" /></label><label>Status<select name="status"><option ${person.status === 'Aktif' ? 'selected' : ''}>Aktif</option><option ${person.status === 'Pending' ? 'selected' : ''}>Pending</option><option ${person.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option><option ${person.status === 'Check-in' ? 'selected' : ''}>Check-in</option><option ${person.status === 'Maintenance hold' ? ... (line truncated to 2000 chars)
1861: }
1862: 
1863: function renderReservationsPanel() {
1864:   const backendState = JSON.parse(window.localStorage.getItem('onyx-admin-state') || 'null');
1865:   const applications = backendState?.applications || backendState?.data?.applications || [];
1866:   const rows = applications.map((item) => ({
1867:     code: item.id || '-',
1868:     guest: item.name || '-',
1869:     room: item.room || '-',
1870:     checkin: item.startDate || '-',
1871:     status: item.applicationStatus || 'Menunggu Review',
1872:     total: Number(item.monthlyBudget || 0),
1873:   }));
1874:   return `<section class="panel section-panel admin-page-panel" id="reservasi" data-section><div class="panel-head wrap"><div><span>Booking</span><h3>Reservasi aktif</h3></div><div class="actions no-print"><button class="button success" type="button"><i class="fa-solid fa-plus"></i>Tambah</button><button class="button subtle" type="button"><i class="fa-solid fa-filter"></i>Filter</button></div></div>${renderBookingTable(rows)}</section>`;
1875: }
1876: 
1877: /**
1878:  * @description Render tabel booking dengan status badge dan total harga.
1879:  * @param {Array<object>} rows Data reservasi.
1880:  * @returns {string} Markup tabel booking.
1881:  */
1882: function renderBookingTable(rows) {
1883:   if (!rows.length) return '<div class="empty admin-empty-state"><strong>Belum ada reservasi real.</strong><p>Data akan muncul setelah user melakukan pendaftaran.</p></div>';
1884:   return `<div class="table-wrap"><table><thead><tr><th>Kode</th><th>Tamu</th><th>Kamar</th><th>Check-in</th><th>Status</th><th>Total</th></tr></thead><tbody>${rows.map((row) => `<tr><td>${escapeHtml(row.code)}</td><td>${escapeHtml(row.guest)}</td><td>${escapeHtml(row.room)}</td><td>${escapeHtml(row.checkin)}</td><td><span class="badge ${slug(row.status)}">${escapeHtml(row.status)}</span></td><td>${rupiah(row.total)}</td></tr>`).join('')}</tbody></table></div>`;
1885: }
1886: 
1887: /**
1888:  * @description Render invoice print view sesuai fitur cetak PRD.
1889:  * @returns {string} Markup invoice.
1890:  */
1891: function renderCashflowPanel() {
1892:   const buyers = getAdminPaymentBuyers();
1893:   const { utilityMeters } = getAdminApplicationState();
1894:   if (!buyers.length) return '<section class="admin-page-panel cashflow-page" id="laporan" data-section><div class="empty admin-empty-state"><strong>Belum ada data cashflow.</strong><p>Laporan keuangan muncul setelah ada pendaftaran dan pembayaran resident.</p></div></section>';
1895: 
1896:   const paidBuyers = buyers.filter((item) => /Sudah bayar/i.test(item.paymentStatus || ''));
1897:   const reviewBuyers = buyers.filter((item) => /Menunggu review/i.test(item.paymentStatus || ''));
1898:   const rejectedBuyers = buyers.filter((item) => /Ditolak/i.test(item.paymentStatus || ''));
1899:   const unpaidBuyers = buyers.filter((item) => /Belum bayar/i.test(item.paymentStatus || ''));
1900:   const totalRevenue = buyers.reduce((sum, item) => sum + Number(item.totalPayment || 0), 0);
1901:   const paidRevenue = paidBuyers.reduce((sum, item) => sum + Number(item.totalPayment || 0), 0);
1902:   const outstanding = totalRevenue - paidRevenue;
1903:   const totalDeposit = buyers.reduce((sum, item) => sum + Number(item.deposit || 0), 0);
1904:   const utilityCost = utilityMeters.reduce((sum, item) => sum + Number(item.totalAmount || 0), 0);
1905:   const netCashflow = paidRevenue - utilityCost;
1906:   const collectionRate = totalRevenue ? Math.round((paidRevenue / totalRevenue) * 100) : 0;
1907:   const reviewAmount = reviewBuyers.reduce((sum, item) => sum + Number(item.totalPayment || 0), 0);
1908:   const rejectedAmount = rejectedBuyers.reduce((sum, item) => sum + Number(item.totalPayment || 0), 0);
1909:   const unpaidAmount = unpaidBuyers.reduce((sum, item) => sum + Number(item.totalPayment || 0), 0);
1910: 
1911:   const txRows = buyers.slice(0, 10).map((item) => {
1912:     const proof = item.proof || {};
1913:     const uploadedAt = proof.uploadedAt || proof.created_at || proof.createdAt || '-';
1914:     const proofStatus = String(proof.status || '').toLowerCase();
1915:     const statusLabel = /approved|recorded/i.test(proofStatus) ? '<i class="cf-badge cf-badge--paid">Lunas</i>' : /uploaded|review|menunggu/i.test(proofStatus) ? '<i class="cf-badge cf-badge--pending">Review</i>' : /reject|ditolak/i.test(proofStatus) ? '<i class="cf-badge cf-badge--rejected">Ditolak</i>' : '<i class="cf-badge cf-badge--unpaid">Belum</i>';
1916:     const initials = String(item.name || 'R').split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();
1917:     return `<tr><td><div class="cf-resident"><span class="cf-avatar">${escapeHtml(initials)}</span><div><strong>${escapeHtml(item.name || '-')}</strong><small>${escapeHtml(item.room || '-')}</small></div></div></td><td class="cf-amount">${rupiah(Number(item.totalPayment || 0))}</td><td>${escapeHtml(uploadedAt)}</td><td>${statusLabel}</td></tr>`;
1918:   }).join('');
1919: 
1920:   const now = new Date();
1921:   const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
1922:   const periodLabel = `${months[now.getMonth()]} ${now.getFullYear()}`;
1923: 
1924:   // Donut chart — distributions status pembayaran
1925:   const donutRadius = 52;
1926:   const donutStroke = 18;
1927:   const donutCirc = 2 * Math.PI * donutRadius;
1928:   const donutSegments = [
1929:     { count: paidBuyers.length, amount: paidRevenue, label: 'Lunas', color: '#8ff0bd', id: 'paid' },
1930:     { count: reviewBuyers.length, amount: reviewAmount, label: 'Review', color: '#ffcf66', id: 'review' },
1931:     { count: rejectedBuyers.length, amount: rejectedAmount, label: 'Ditolak', color: '#ff9d9d', id: 'rejected' },
1932:     { count: unpaidBuyers.length, amount: unpaidAmount, label: 'Belum', color: 'rgba(247,242,234,.22)', id: 'unpaid' },
1933:   ];
1934:   let donutOffset = 0;
1935:   const donutArcs = donutSegments.map((seg) => {

(Output capped at 50 KB. Showing lines 1588-1935. Use offset=1936 to continue.)
</content>
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 7.5s)

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src\\main.js",
  "offset": 1595,
  "limit": 480
}
```

**Output:**
```
<path>C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\main.js</path>
<type>file</type>
<content>
1595:   return `<section class="admin-page-panel admin-feature-panel" id="utilities" data-section>
1596:     <div class="panel-head wrap"><div><span>Utilities</span><h3>Utility Meter Charges</h3><p>Listrik, air, dan tagihan meter yang masuk ke billing penghuni.</p></div><button class="button primary" type="button" data-open-resident-portal="utilities"><i class="fa-solid fa-user-shield"></i>Open Resident Utilities</button></div>
1597:     <div class="payment-ops-kpis"><article><span>Meter Rows</span><strong>${meters.length}</strong><small>Data utility-meter.php</small></article><article><span>Total Charges</span><strong>${rupiah(totalCharges)}</strong><small>Akumulasi tagihan utilitas</small></article><article><span>Residents</span><strong>${residents.length}</strong><small>Calon/penghuni aktif</small></article><article><span>Input Meter</span><strong>Room Detail</strong><small>Menu Kamar → Meter & Tagihan</small></article></div>
1598:     <div class="admin-feature-actions no-print"><button class="row-print-btn row-print-btn--gold" type="button" data-admin-open-room-feature="meter">Input Meter & Tagihan</button><button class="row-print-btn" type="button" data-open-resident-portal="billing">View Billing Invoice</button><button class="row-print-btn" type="button" id="refreshPayments">Refresh backend</button></div>
1599:     <div class="admin-ops-table"><div class="admin-ops-row admin-ops-row--head"><span>Resident</span><span>Listrik</span><span>Air</span><span>Tagihan</span></div>${latestRows || '<div class="empty admin-empty-state"><strong>Belum ada utility meter.</strong><p>Buka Kamar → Detail → Meter & Tagihan, lalu simpan meter listrik/air.</p></div>'}</div>
1600:   </section>`;
1601: }
1602: 
1603: function renderAdminIotPanel() {
1604:   const telemetryRows = getIotTelemetryRows();
1605:   const roomRows = getRooms().map((room) => {
1606:     const telemetry = telemetryRows.find((item) => item.roomCode === room.no) || null;
1607:     const devices = getRoomDeviceState(room.no);
1608:     return `<article class="admin-ops-row"><div><span>${escapeHtml(room.no)}</span><strong>${escapeHtml(room.name)}</strong><small>${telemetry?.created_at ? `Updated ${escapeHtml(telemetry.created_at)}` : 'No telemetry yet'}</small></div><b>${telemetry ? `${Number(telemetry.temperature || 0)}°C` : '-'}</b><b>${telemetry ? `${Number(telemetry.powerWatt || 0)} W` : devices.lightOn ? 'Manual on' : 'Manual off'}</b><i>${telemetry ? `${Number(telemetry.waterM3 || 0)} m³` : devices.waterOn ? 'Water on' : 'Water off'}</i></article>`;
1609:   }).join('');
1610:   return `<section class="admin-page-panel admin-feature-panel" id="iot" data-section>
1611:     <div class="panel-head wrap"><div><span>IoT Monitoring</span><h3>Room Telemetry</h3><p>Monitoring suhu, kelembapan, daya listrik, energi, dan air dari ESP32/Wokwi.</p></div><button class="button primary" type="button" data-admin-open-room-feature="control"><i class="fa-solid fa-microchip"></i>Open Smart Control</button></div>
1612:     <div class="payment-ops-kpis"><article><span>Telemetry Rooms</span><strong>${telemetryRows.length}</strong><small>Data iot-ingest.php</small></article><article><span>Total Rooms</span><strong>${getRooms().length}</strong><small>Inventory aktif</small></article><article><span>Mode</span><strong>${telemetryRows.length ? 'Live IoT' : 'Manual'}</strong><small>Fallback smart room aktif</small></article><article><span>Endpoint</span><strong>iot-ingest.php</strong><small>GET/POST telemetry</small></article></div>
1613:     <div class="admin-feature-actions no-print"><button class="row-print-btn row-print-btn--gold" type="button" id="seedIotDemo">Seed demo telemetry</button><button class="row-print-btn" type="button" data-open-resident-portal="utilities">Open Resident Utilities</button><button class="row-print-btn" type="button" id="refreshPayments">Refresh IoT</button></div>
1614:     <div class="admin-ops-table"><div class="admin-ops-row admin-ops-row--head"><span>Room</span><span>Temperature</span><span>Power</span><span>Water</span></div>${roomRows}</div>
1615:   </section>`;
1616: }
1617: 
1618: function renderAdminAccessPanel() {
1619:   const resident = getPrimaryAdminResident();
1620:   const roomCode = getRoomCode(resident?.room || '') || getRooms()[0]?.no || 'ROOM';
1621:   const accessState = JSON.parse(window.localStorage.getItem('onyx-access-state') || `{"locked":true,"guestPass":"QR-ONYX-${String(resident?.id || Date.now()).slice(-4)}","validUntil":"22:00"}`);
1622:   const logs = getAccessLogs(accessState);
1623:   const logRows = logs.map((log) => `<p><span>${escapeHtml(log.time)}</span><b>${escapeHtml(log.action)}</b><em>${escapeHtml(log.detail)}</em><i>${escapeHtml(log.status)}</i></p>`).join('');
1624:   return `<section class="admin-page-panel admin-feature-panel" id="access" data-section>
1625:     <div class="panel-head wrap"><div><span>Smart Access</span><h3>Access State & Visitor Pass</h3><p>Kelola lock state, QR tamu, WiFi share, dan access logs resident.</p></div><button class="button primary" type="button" data-open-resident-portal="access"><i class="fa-solid fa-door-closed"></i>Open Resident Access</button></div>
1626:     <div class="admin-access-grid"><article class="access-hero-card"><span>Door Lock</span><strong>${accessState.locked ? 'Locked' : 'Unlocked'}</strong><p>${escapeHtml(resident?.name || 'Resident')} · ${escapeHtml(roomCode)}</p><button class="row-print-btn row-print-btn--gold" type="button" id="adminToggleSmartLock">${accessState.locked ? 'Unlock room' : 'Lock room'}</button></article><article class="visitor-qr-card"><span>Visitor Pass</span><div class="visitor-qr-code" aria-label="Visitor QR ${escapeHtml(accessState.guestPass)}">${renderVisitorQr(accessState.guestPass)}</div><strong>${escapeHtml(accessState.guestPass)}</strong><p>Berlaku sampai ${escapeHtml(accessState.validUntil)} hari ini.</p><button class="row-print-btn" type="button" data-copy-value="${escapeHtml(accessState.guestPass)}" data-access-action="copy-qr">Copy QR Code</button></article><article class="access-hero-card"><span>WiFi Share</span><strong>ONYX-${escapeHtml(roomCode)}</strong><p>Password: onyx-${escapeHtml(roomCode).toLowerCase()}-wifi</p><button class="row-print-btn" type="button" data-copy-value="ONYX-${escapeHtml(roomCode)} / onyx-${escapeHtml(roomCode).toLowerCase()}-wifi" data-access-action="copy-wifi">Share WiFi</button></article></div>
1627:     <div class="resident-saas-table resident-saas-table--access admin-access-logs">${logRows || '<p><span>Now</span><b>Belum ada access logs</b><em>Gunakan tombol Visitor Pass/Lock</em><i>ready</i></p>'}</div>
1628:   </section>`;
1629: }
1630: 
1631: function renderAdminServiceTicketsPanel() {
1632:   const tickets = getAdminServiceTickets();
1633:   const resident = getPrimaryAdminResident();
1634:   const rows = tickets.map((ticket) => `<article class="admin-ops-row"><div><span>${escapeHtml(ticket.category || 'Service')}</span><strong>${escapeHtml(ticket.issue || '-')}</strong><small>${escapeHtml(ticket.application_id || resident?.id || '-')}</small></div><b>${escapeHtml(ticket.priority || 'Normal')}</b><i>${escapeHtml(ticket.status || 'open')}</i></article>`).join('');
1635:   return `<section class="admin-page-panel admin-feature-panel" id="tickets" data-section>
1636:     <div class="panel-head wrap"><div><span>Service Ticketing</span><h3>Resident Service Tickets</h3><p>Buat dan review request perbaikan, kebersihan, WiFi, AC, air, atau listrik.</p></div><button class="button primary" type="button" data-open-resident-portal="service"><i class="fa-solid fa-user-shield"></i>Open Resident Service</button></div>
1637:     <form class="admin-ticket-form no-print" id="adminServiceTicketForm"><input type="hidden" name="application_id" value="${escapeHtml(resident?.id || '')}" /><label>Kategori<select name="category"><option>Maintenance</option><option>WiFi</option><option>Listrik</option><option>Air</option><option>Kebersihan</option></select></label><label>Prioritas<select name="priority"><option>Normal</option><option>High</option><option>Urgent</option></select></label><label class="admin-ticket-form__issue">Issue<input name="issue" placeholder="Contoh: AC kurang dingin / lampu mati" required /></label><button class="button primary" type="submit">Create Service Ticket</button></form>
1638:     <div class="admin-ops-table"><div class="admin-ops-row admin-ops-row--head"><span>Ticket</span><span>Priority</span><span>Status</span></div>${rows || '<div class="empty admin-empty-state"><strong>Belum ada service ticket.</strong><p>Buat tiket dari form admin atau Resident Portal → Service.</p></div>'}</div>
1639:   </section>`;
1640: }
1641: 
1642: function renderAdminResidentPortalPanel() {
1643:   const resident = getPrimaryAdminResident();
1644:   return `<section class="admin-page-panel admin-feature-panel" id="resident-portal" data-section>
1645:     <div class="panel-head wrap"><div><span>Resident Portal</span><h3>Resident-facing Tools</h3><p>Entry point eksplisit untuk QA: Billing, Utilities, Smart Access, Visitor Pass, dan Service Ticketing.</p></div><button class="button primary" type="button" data-open-resident-portal="overview"><i class="fa-solid fa-user-shield"></i>Launch Resident Portal</button></div>
1646:     <div class="admin-portal-grid"><article><span>Resident</span><strong>${escapeHtml(resident?.name || 'Demo Resident')}</strong><p>${escapeHtml(resident?.room || '-')}</p></article><button type="button" data-open-resident-portal="billing"><i class="fa-solid fa-receipt"></i><span>Billing</span><small>Invoices, QRIS, manual transfer</small></button><button type="button" data-open-resident-portal="utilities"><i class="fa-solid fa-bolt"></i><span>Utilities</span><small>Meter charges & IoT usage</small></button><button type="button" data-open-resident-portal="access"><i class="fa-solid fa-door-closed"></i><span>Smart Access</span><small>Visitor Pass, WiFi, access logs</small></button><button type="button" data-open-resident-portal="service"><i class="fa-solid fa-screwdriver-wrench"></i><span>Service Tickets</span><small>Create and review requests</small></button></div>
1647:   </section>`;
1648: }
1649: 
1650: async function refreshAdminStateForSection(section) {
1651:   const liveSections = ['dashboard', 'kamar', 'penghuni', 'utilities', 'iot', 'access', 'tickets', 'resident-portal', 'pembayaran', 'reservasi', 'laporan'];
1652:   if (!liveSections.includes(section)) return renderApp();
1653:   renderApp();
1654:   syncAdminSectionInBackground();
1655: }
1656: 
1657: async function syncAdminSectionInBackground() {
1658:   if (window.__onyxAdminSectionSyncing) return;
1659:   window.__onyxAdminSectionSyncing = true;
1660:   try {
1661:     await syncAdminState(false);
1662:     try {
1663:       const iot = await apiJson('iot-ingest.php');
1664:       window.localStorage.setItem('onyx-iot-telemetry', JSON.stringify(iot.data || []));
1665:     } catch (error) {
1666:       window.localStorage.setItem('onyx-iot-telemetry-sync-error', String(error?.message || error || 'Gagal sinkron IoT'));
1667:     }
1668:     if (state.page === 'admin') renderApp();
1669:   } finally {
1670:     window.__onyxAdminSectionSyncing = false;
1671:   }
1672: }
1673: 
1674: /**
1675:  * @description Render panel manajemen kamar dengan filter proper.
1676:  * @returns {string} Markup panel kamar.
1677:  */
1678: function renderRoomsPanel() {
1679:   if (state.isRoomCreateOpen && !state.adminRoomDetail) return renderRoomCreatePage();
1680:   if (state.adminRoomDetail) {
1681:     const room = getRooms().find((item) => item.no === state.adminRoomDetail) || getRooms()[0];
1682:     return renderRoomDetailPanel(room);
1683:   }
1684:   const filteredRooms = getRooms().filter((room) => {
1685:     const haystack = `${room.no} ${room.name}`.toLowerCase();
1686:     return haystack.includes(state.roomQuery.toLowerCase()) && (!state.roomType || room.type === state.roomType) && (!state.roomStatus || getEffectiveRoomStatus(room) === state.roomStatus);
1687:   });
1688: 
1689:   return `
1690:     <section class="admin-flat-panel" id="kamar" data-section>
1691:       <div class="inventory-head"><div><span>Inventory</span><h3>Manajemen kamar</h3><p>${filteredRooms.length} kamar ditampilkan · status otomatis mengikuti penghuni aktif.</p></div><div class="inventory-actions no-print"><button class="button success" type="button" id="openRoomCreate"><i class="fa-solid fa-plus"></i>Tambah kamar</button><button class="button subtle" type="button" id="printRooms"><i class="fa-solid fa-print"></i>Cetak</button></div></div>
1692:       <div class="inventory-toolbar no-print"><label class="inventory-search" for="adminRoomSearchProxy"><i class="fa-solid fa-magnifying-glass"></i><input form="roomForm" id="adminRoomSearchProxy" type="search" value="${escapeHtml(state.roomQuery)}" placeholder="Cari nomor / nama kamar" /></label><select class="field" id="typeFilter" aria-label="Filter tipe kamar">${['', 'Standard', 'Deluxe', 'Suite', 'VIP'].map((type) => `<option value="${type}" ${state.roomType === type ? 'selected' : ''}>${type || 'Semua tipe'}</option>`).join('')}</select><select class="field" id="statusFilter" aria-label="Filter status kamar">${['', 'tersedia', 'terisi', 'maintenance'].map((status) => `<option value="${status}" ${state.roomStatus === status ? 'selected' : ''}>${status || 'Semua status'}</option>`).join('')}</select></div>
1693:       <div class="room-list"><div class="room-list-head no-print"><span>Kamar</span><span>Detail</span><span>Harga</span><span>Status</span><span>Aksi</span></div>${filteredRooms.map(renderRoomRow).join('') || '<p class="empty">Tidak ada kamar yang cocok.</p>'}</div>
1694:       ${renderRoomsPrintReport(filteredRooms)}
1695:     </section>
1696:   `;
1697: }
1698: 
1699: function renderRoomsPrintReport(rooms) {
1700:   const occupancy = getRoomOccupancyStats();
1701:   const generatedAt = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
1702:   const rows = rooms.map((room) => {
1703:     const occupant = getRoomOccupant(room.no);
1704:     const status = getEffectiveRoomStatus(room);
1705:     const devices = getRoomDeviceState(room.no);
1706:     const telemetry = getIotTelemetry(room.no);
1707:     const latestMeter = getUtilityMeters().find((item) => getRoomCode(item.room) === room.no) || {};
1708:     const climateType = getRoomClimateType(room);
1709:     const climateLabel = climateType === 'ac' ? `AC ${devices.acOn ? `${devices.temperature}°C` : 'mati'}` : climateType === 'fan' ? `Kipas ${devices.fanOn ? 'menyala' : 'mati'}` : 'Ventilasi manual';
1710:     const utilityLabel = latestMeter.month ? `${latestMeter.month}: ${Number(latestMeter.electricKwh || 0)} kWh, ${Number(latestMeter.waterM3 || 0)} m³, ${rupiah(Number(latestMeter.totalAmount || 0))}` : 'Belum ada input meter';
1711: 
1712:     return `<tr><td><strong>${escapeHtml(room.no)}</strong><span>${escapeHtml(room.floor || '-')}</span></td><td><b>${escapeHtml(room.name)}</b><small>${escapeHtml(room.type)} · ${escapeHtml((room.facilities || []).join(', ') || 'Fasilitas belum diisi')}</small></td><td>${rupiah(Number(room.price || 0))}<small>/ bulan</small></td><td><b>${status === 'terisi' ? 'Tidak tersedia' : escapeHtml(status)}</b><small>${escapeHtml(occupant?.name || 'Kosong')}</small></td><td><b>${escapeHtml(climateLabel)}</b><small>Lampu ${devices.lightOn ? 'menyala' : 'mati'} · Air ${devices.waterOn ? 'aktif' : 'nonaktif'}</small></td><td><b>${escapeHtml(utilityLabel)}</b><small>${telemetry?.created_at ? `IoT ${escapeHtml(telemetry.created_at)}` : 'Manual/standby'}</small></td></tr>`;
1713:   }).join('');
1714: 
1715:   return `<section class="room-print-report" aria-label="Laporan cetak kamar"><header><div><span>Onyx Residence</span><h2>Laporan Inventory Kamar</h2><p>Ringkasan status kamar, penghuni aktif, fasilitas, smart control, dan meter utilitas.</p></div><aside><b>${escapeHtml(generatedAt)}</b><small>Dicetak oleh Admin</small></aside></header><div class="room-print-summary"><article><span>Total kamar</span><strong>${occupancy.totalRooms}</strong></article><article><span>Terisi</span><strong>${occupancy.occupiedRooms}</strong></article><article><span>Tersedia</span><strong>${occupancy.availableRooms}</strong></article><article><span>Occupancy</span><strong>${occupancy.occupancyPercent}%</strong></article></div><table><thead><tr><th>Kamar</th><th>Detail</th><th>Harga</th><th>Status</th><th>Smart Control</th><th>Utilitas</th></tr></thead><tbody>${rows || '<tr><td colspan="6">Tidak ada kamar yang cocok dengan filter.</td></tr>'}</tbody></table><footer><span>Catatan</span><p>Status terisi mengikuti penghuni approved. Meter utilitas memakai input terbaru per kamar jika tersedia.</p></footer></section>`;
1716: }
1717: 
1718: /**
1719:  * @description Render satu baris kamar dengan aksi CRUD.
1720:  * @param {object} room Data kamar.
1721:  * @returns {string} Markup row kamar.
1722:  */
1723: function renderRoomRow(room) {
1724:   const status = getEffectiveRoomStatus(room);
1725:   return `<article class="room-row"><div class="room-code"><strong>${room.no}</strong><span>${room.floor}</span></div><div class="room-main"><h4>${escapeHtml(room.name)}</h4><p>${room.type} · ${room.facilities.map(escapeHtml).join(', ')}</p></div><div class="room-price"><strong>${rupiah(room.price)}</strong><span>/ bulan</span></div><span class="badge ${status}">${status === 'terisi' ? 'tidak tersedia' : status}</span><div class="row-actions row-actions--text no-print"><button type="button" data-room-edit="${escapeHtml(room.no)}" aria-label="Edit ${room.no}"><i class="fa-regular fa-pen-to-square"></i>Edit</button><button type="button" data-room-delete="${escapeHtml(room.no)}" aria-label="Hapus ${room.no}"><i class="fa-regular fa-trash-can"></i>Hapus</button></div></article>`;
1726: }
1727: 
1728: function renderRoomCreatePage() {
1729:   return `<section class="admin-flat-panel admin-page-panel room-detail-panel"><div class="panel-head wrap"><div><span>Tambah Kamar</span><h3>Inventory kamar baru</h3></div><button class="button subtle" type="button" id="backToRooms"><i class="fa-solid fa-arrow-left"></i>Kembali</button></div>${renderRoomEditorForm()}</section>`;
1730: }
1731: 
1732: function renderRoomEditorForm(room = null) {
1733:   return `<form class="room-form no-print room-editor-form" id="roomForm"><div class="form-title"><h4>${room ? 'Edit kamar' : 'Tambah kamar'}</h4><span>Data inventory kamar tersimpan tanpa mengacak list utama.</span></div><input type="hidden" name="id_kamar" value="${escapeHtml(room?.id || '')}" /><label>Nomor<input required name="no_kamar" value="${escapeHtml(room?.no || '')}" placeholder="A09" /></label><label>Kategori<select required name="kategori">${['Standard', 'Deluxe', 'Suite', 'VIP'].map((type) => `<option ${room?.type === type ? 'selected' : ''}>${type}</option>`).join('')}</select></label><label>Nama kamar<input required name="nama_kamar" value="${escapeHtml(room?.name || '')}" placeholder="Onyx Studio" /></label><label>Harga<input required name="harga" type="number" min="0" value="${escapeHtml(room?.price || '')}" placeholder="3100000" /></label><label>Status<select name="status">${['tersedia', 'terisi', 'maintenance'].map((status) => `<option ${getEffectiveRoomStatus(room || {}) === status ? 'selected' : ''}>${status}</option>`).join('')}</select></label><label class="full">Fasilitas<textarea name="fasilitas" placeholder="AC, WiFi, kamar mandi dalam">${escapeHtml((room?.facilities || []).join(', '))}</textarea></label><div class="form-actions full"><button class="button primary" type="submit">Simpan</button><button class="button subtle" type="button" id="closeRoomEditor">Batal</button></div></form>`;
1734: }
1735: 
1736: function renderRoomUtilityForm(room, occupant = null) {
1737:   const month = new Date().toISOString().slice(0, 7);
1738:   return `<form class="room-utility-form no-print" id="roomUtilityMeterForm"><div><span>Input Meter</span><h4>Catat listrik, air, dan tagihan</h4><p>Data masuk ke billing penghuni dan histori meter kamar ini.</p></div><input type="hidden" name="application_id" value="${escapeHtml(occupant?.id || '')}" /><input type="hidden" name="room" value="${escapeHtml(room.no)}" /><input type="hidden" name="residentName" value="${escapeHtml(occupant?.name || '')}" /><label>Bulan<input name="month" type="month" value="${month}" required /></label><label>Listrik kWh<input name="electricKwh" type="number" min="0" step="0.1" placeholder="0" required /></label><label>Air m³<input name="waterM3" type="number" min="0" step="0.1" placeholder="0" required /></label><label>Tarif listrik/kWh<input name="electricRate" type="number" min="0" value="1500" required /></label><label>Tarif air/m³<input name="waterRate" type="number" min="0" value="8000" required /></label><label>Biaya tetap<input name="fixedFee" type="number" min="0" value="0" /></label><button class="button primary" type="submit">Simpan Meter</button></form>`;
1739: }
1740: 
1741: function renderRoomDetailPanel(room) {
1742:   if (!room) return `<section class="admin-flat-panel admin-page-panel"><button class="button subtle" type="button" id="backToRooms"><i class="fa-solid fa-arrow-left"></i>Kembali</button></section>`;
1743:   const occupant = getRoomOccupant(room.no);
1744:   const devices = getRoomDeviceState(room.no);
1745:   const utilityMeters = getUtilityMeters().filter((item) => getRoomCode(item.room) === room.no);
1746:   const latest = utilityMeters[0] || {};
1747:   const telemetry = getIotTelemetry(room.no);
1748:   const climateType = getRoomClimateType(room);
1749:   const facilityList = room.facilities?.length ? room.facilities.map(escapeHtml).join(' · ') : 'Fasilitas belum diisi';
1750:   const effectiveStatus = getEffectiveRoomStatus(room);
1751:   const section = state.activeRoomDetailSection || 'overview';
1752:   const detailNav = [['overview', 'Overview'], ['control', 'Smart Control'], ['meter', 'Meter & Tagihan']];
1753:   const climateRows = climateType === 'ac'
1754:     ? `<p><span><i class="fa-solid fa-snowflake"></i> AC</span><strong>${devices.acOn ? `${devices.temperature}°C` : 'Mati'}</strong><button class="row-print-btn ${devices.acOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="acOn" data-room-code="${escapeHtml(room.no)}">${devices.acOn ? 'Matikan' : 'Nyalakan'}</button></p><label class="room-detail-range"><span>Suhu AC</span><input type="range" min="18" max="30" value="${devices.temperature}" data-admin-room-temp="${escapeHtml(room.no)}" ${devices.acOn ? '' : 'disabled'} /><strong>${devices.temperature}°C</strong></label>`
1755:     : climateType === 'fan'
1756:       ? `<p><span><i class="fa-solid fa-fan"></i> Kipas</span><strong>${devices.fanOn ? 'Menyala' : 'Mati'}</strong><button class="row-print-btn ${devices.fanOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="fanOn" data-room-code="${escapeHtml(room.no)}">${devices.fanOn ? 'Matikan' : 'Nyalakan'}</button></p><p><span><i class="fa-solid fa-wind"></i> Sirkulasi</span><strong>Jendela luar</strong><em>Tanpa AC</em></p>`
1757:       : `<p><span><i class="fa-solid fa-wind"></i> Ventilasi</span><strong>Manual</strong><em>Tidak ada AC/kipas</em></p>`;
1758:   const overviewPage = `<article class="room-detail-card room-detail-card--wide"><div class="room-detail-card__head"><div><span>Overview</span><h4>Informasi kamar</h4></div></div><div class="room-detail-list"><p><span>Status</span><strong>${effectiveStatus === 'terisi' ? 'Tidak tersedia' : escapeHtml(effectiveStatus)}</strong></p><p><span>Tipe</span><strong>${escapeHtml(room.type)}</strong></p><p><span>Fasilitas</span><strong>${facilityList}</strong></p><p><span>Penghuni</span><strong>${escapeHtml(occupant?.name || 'Kosong')}</strong></p><p><span>WiFi</span><strong>ONYX-${escapeHtml(room.no)}</strong></p></div></article>`;
1759:   const controlPage = `<article class="room-detail-card room-detail-card--wide"><div class="room-detail-card__head"><div><span>Smart Control</span><h4>Perangkat kamar</h4></div><small>${telemetry?.created_at ? `IoT ${escapeHtml(telemetry.created_at)}` : 'Manual mode'}</small></div><div class="room-detail-control-list"><p><span><i class="fa-solid fa-lightbulb"></i> Lampu</span><strong>${devices.lightOn ? 'Menyala' : 'Mati'}</strong><button class="row-print-btn ${devices.lightOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="lightOn" data-room-code="${escapeHtml(room.no)}">${devices.lightOn ? 'Matikan' : 'Nyalakan'}</button></p><p><span><i class="fa-solid fa-faucet-drip"></i> Air</span><strong>${devices.waterOn ? 'Aktif' : 'Nonaktif'}</strong><button class="row-print-btn ${devices.waterOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="waterOn" data-room-code="${escapeHtml(room.no)}">${devices.waterOn ? 'Matikan' : 'Nyalakan'}</button></p>${climateRows}</div></article>`;
1760:   const meterPage = `<article class="room-detail-card room-detail-card--wide room-detail-card--meter"><div class="room-detail-card__head"><div><span>Meter</span><h4>Pemakaian & tagihan</h4></div></div><div class="room-meter-line"><p><span>Listrik</span><strong>${telemetry ? `${Number(telemetry.powerWatt || 0)} W` : `${Number(latest.electricKwh || 0)} kWh`}</strong><small>${telemetry ? `${Number(telemetry.energyKwh || 0)} kWh` : 'Meter admin'}</small></p><p><span>Air</span><strong>${telemetry ? `${Number(telemetry.waterM3 || 0)} m³` : `${Number(latest.waterM3 || 0)} m³`}</strong><small>${devices.waterOn ? 'Valve aktif' : 'Valve nonaktif'}</small></p><p><span>Tagihan</span><strong>${latest.totalAmount ? rupiah(Number(latest.totalAmount)) : 'Belum ada'}</strong><small>Utility meter</small></p></div>${renderRoomUtilityForm(room, occupant)}<div class="resident-saas-table resident-saas-table--utility admin-utility-table room-utility-history">${utilityMeters.length ? utilityMeters.map((item) => `<p><span>${escapeHtml(item.month || '-')}</span><b>${Number(item.electricKwh || 0)} kWh</b><em>${Number(item.waterM3 || 0)} m³</em><i>${rupiah(Number(item.totalAmount || 0))}</i></p>`).join('') : '<p><span>Belum ada meter</span><b>0 kWh</b><em>0 m³</em><i>Rp 0</i></p>'}</div></article>`;
1761:   const pages = { overview: overviewPage, control: controlPage, meter: meterPage };
1762: 
1763:   return `<section class="admin-flat-panel admin-page-panel room-detail-panel room-detail-saas"><div class="room-detail-saas__nav"><button class="room-detail-back no-print" type="button" id="backToRooms"><i class="fa-solid fa-arrow-left"></i>Kembali</button><button class="button subtle no-print" type="button" id="toggleRoomEditor"><i class="fa-regular fa-pen-to-square"></i>${state.isRoomCreateOpen ? 'Tutup edit' : 'Edit kamar'}</button></div><header class="room-detail-saas__hero"><div><span>Room Detail</span><h3>${escapeHtml(room.no)} · ${escapeHtml(room.name)}</h3><p>${escapeHtml(room.type)} · ${facilityList}</p></div><b class="room-status-pill ${escapeHtml(effectiveStatus)}">${effectiveStatus === 'terisi' ? 'Tidak tersedia' : escapeHtml(effectiveStatus)}</b></header><div class="room-detail-saas__stats"><p><span>Harga</span><strong>${rupiah(room.price)}</strong><small>/ bulan</small></p><p><span>Penghuni</span><strong>${escapeHtml(occupant?.name || 'Kosong')}</strong><small>${escapeHtml(occupant?.phone || 'Belum ada penghuni aktif')}</small></p><p><span>WiFi</span><strong>ONYX-${escapeHtml(room.no)}</strong><small>password otomatis per kamar</small></p><p><span>IoT</span><strong>${telemetry?.created_at ? 'Online' : 'Standby'}</strong><small>${telemetry?.created_at ? escapeHtml(telemetry.created_at) : 'Menunggu telemetry'}</small></p></div>${state.isRoomCreateOpen ? `<section class="room-edit-focus">${renderRoomEditorForm(room)}</section>` : `<nav class="room-detail-subnav no-print">${detailNav.map(([id, label]) => `<button class="${section === id ? 'is-active' : ''}" type="button" data-room-detail-section="${id}">${label}</button>`).join('')}</nav><section class="room-detail-saas__body room-detail-saas__body--single">${pages[section] || overviewPage}</section>`}</section>`;
1764: }
1765: 
1766: /**
1767:  * @description Render panel tamu dan reservasi.
1768:  * @returns {string} Markup grid tamu dan reservasi.
1769:  */
1770: function renderGuestBookingGrid() {
1771:   return `<section class="split-grid lower-grid"><article class="panel section-panel compact-panel" id="tamu" data-section><div class="panel-head"><div><span>Tamu</span><h3>Data penyewa</h3></div></div><div class="empty admin-empty-state"><strong>Belum ada data penyewa.</strong><p>Semua data diambil dari backend pendaftaran.</p></div></article><article class="panel section-panel compact-panel" id="reservasi" data-section><div class="panel-head"><div><span>Booking</span><h3>Reservasi aktif</h3></div></div>${renderBookingTable([])}</article></section>`;
1772: }
1773: 
1774: function renderGuestsPanel() {
1775:   return `<section class="panel section-panel admin-page-panel" id="tamu" data-section><div class="panel-head wrap"><div><span>Residents</span><h3>Data penyewa</h3></div></div><div class="empty admin-empty-state"><strong>Belum ada data penyewa.</strong><p>Gunakan menu Penghuni/Penyewa untuk data backend real.</p></div></section>`;
1776: }
1777: 
1778: function renderResidentsAdminPanel() {
1779:   const rows = [...getAdminResidents(), ...getAdminShortTermTenants()];
1780:   if (state.adminDetailType === 'penghuni') return renderAdminPersonDetail('penghuni', rows[state.adminDetailIndex] || rows[0]);
1781:   const activeRows = rows.filter((resident) => ['aktif', 'confirmed', 'check-in'].includes(String(resident.status || '').toLowerCase())).length;
1782:   const longStayRows = rows.filter((resident) => (resident.category || 'Long Stay') === 'Long Stay').length;
1783:   const shortStayRows = rows.length - longStayRows;
1784:   const totalBilling = rows.reduce((sum, resident) => sum + Number(String(resident.billing || resident.total || '').replace(/[^0-9]/g, '') || 0), 0);
1785:   const rowMarkup = rows.map((resident, index) => {
1786:     const category = resident.category || 'Resident';
1787:     const period = resident.period || resident.stay || '-';
1788:     const amount = resident.billing || resident.total || '-';
1789:     const initials = String(resident.name || 'R').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
1790:     return `<button class="admin-person-row admin-person-row--hotel" type="button" data-admin-detail="penghuni" data-admin-detail-index="${index}"><span class="resident-avatar">${escapeHtml(initials)}</span><div class="resident-guest"><span>${escapeHtml(resident.room || '-')}</span><strong>${escapeHtml(resident.name || '-')}</strong><small>${escapeHtml(resident.plan || '-')} · ${escapeHtml(period)}</small></div><div class="resident-stay"><span>Tipe sewa</span><strong>${escapeHtml(category)}</strong><small>${escapeHtml(resident.due || resident.end || 'Jadwal belum diisi')}</small></div><div class="resident-billing"><span>Tagihan</span><strong>${escapeHtml(amount)}</strong><small>${escapeHtml(resident.refund || resident.administrationStatus || 'Administrasi standar')}</small></div><i class="tenant-type-label ${slug(category)}">${escapeHtml(category)}</i><em class="resident-status-chip ${slug(resident.status || '')}">${escapeHtml(resident.status || '-')}</em></button>`;
1791:   }).join('');
1792: 
1793:   return `<section class="admin-page-panel admin-resident-ops" id="penghuni" data-section><div class="resident-ops-kpis"><article><span>Total</span><strong>${rows.length}</strong><small>Penghuni dan penyewa</small></article><article><span>Aktif</span><strong>${activeRows}</strong><small>Status berjalan</small></article><article><span>Long stay</span><strong>${longStayRows}</strong><small>Bulanan atau tahunan</small></article><article><span>Short stay</span><strong>${shortStayRows}</strong><small>Harian atau mingguan</small></article><article><span>Billing</span><strong>${totalBilling ? rupiah(totalBilling) : 'Rp 0'}</strong><small>Estimasi tagihan</small></article></div><div class="resident-ops-table"><div class="resident-ops-table__head no-print"><span>Penghuni</span><span>Sewa</span><span>Tagihan</span><span>Tipe</span><span>Status</span></div>${rowMarkup || '<div class="empty admin-empty-state"><strong>Belum ada penghuni atau penyewa real.</strong><p>Data muncul setelah user daftar dan disetujui admin.</p></div>'}</div></section>`;
1794: }
1795: 
1796: function renderPaymentsAdminPanel() {
1797:   const buyers = getAdminPaymentBuyers();
1798:   const selectedBuyer = buyers.find((item) => String(item.id || '') === String(state.adminPaymentDetailId || '')) || null;
1799:   if (!selectedBuyer) {
1800:     const paidBuyers = buyers.filter((buyer) => /bayar|approved|recorded/i.test(buyer.paymentStatus || '')).length;
1801:     const reviewBuyers = buyers.filter((buyer) => /review|uploaded|menunggu/i.test(buyer.paymentStatus || '')).length;
1802:     const totalAmount = buyers.reduce((sum, buyer) => sum + Number(buyer.totalPayment || 0), 0);
1803:     return `<section class="payment-review-page payment-ops-page admin-page-panel" id="pembayaran" data-section><div class="payment-ops-kpis"><article><span>Total Buyer</span><strong>${buyers.length}</strong><small>Calon penghuni</small></article><article><span>Paid / Approved</span><strong>${paidBuyers}</strong><small>Pembayaran selesai</small></article><article><span>Need Review</span><strong>${reviewBuyers}</strong><small>Bukti menunggu admin</small></article><article><span>Total Pipeline</span><strong>${rupiah(totalAmount)}</strong><small>Estimasi administrasi</small></article></div><div class="payment-buyer-table payment-buyer-table--ops"><div class="payment-buyer-table__head no-print"><span>Buyer</span><span>Kamar</span><span>Total</span><span>Status</span><span>Aksi</span></div>${buyers.length ? buyers.map((buyer) => `<article class="payment-buyer-row payment-buyer-row--ops"><div><strong>${escapeHtml(buyer.name || '-')}</strong><small>${escapeHtml(buyer.phone || buyer.email || '-')}</small></div><span>${escapeHtml(buyer.room || '-')}</span><b>${rupiah(Number(buyer.totalPayment || 0))}</b><i class="status-${slug(buyer.paymentStatus || '')}">${escapeHtml(buyer.paymentStatus || '-')}</i><button class="row-print-btn row-print-btn--gold" type="button" data-payment-detail="${escapeHtml(buyer.id || '')}">Detail</button></article>`).join('') : '<div class="empty admin-empty-state"><strong>Belum ada buyer.</strong><p>Data pembayaran muncul setelah user melakukan pendaftaran.</p></div>'}</div></section>`;
1804:   }
1805: 
1806:   const { resident, proof, proofs, qrisParts, splitParts, rent, deposit, total } = getAdminApplicationState(selectedBuyer);
1807:   if (!resident?.name) return `<section class="payment-review-page admin-page-panel" id="pembayaran" data-section><div class="empty admin-empty-state"><strong>Belum ada pembayaran.</strong><p>Data muncul setelah calon penghuni daftar dan memilih metode administrasi.</p></div></section>`;
1808: 
1809:   const rows = proofs.filter((item) => item?.status);
1810:   const qrisOpenedTotal = qrisParts.reduce((sum, index) => sum + Number(splitParts[index] || 0), 0);
1811:   const remainingTotal = Math.max(0, total - qrisOpenedTotal);
1812:   const proofStatus = proof?.status || 'none';
1813:   const paymentStage = proofStatus === 'approved'
1814:     ? 'Administrasi selesai'
1815:     : proofStatus === 'uploaded'
1816:       ? 'Bukti transfer menunggu review'
1817:       : qrisParts.length
1818:         ? 'Pembayaran QRIS sedang berjalan'
1819:         : 'Menunggu pembayaran';
1820:   const rawSection = state.activePaymentSection || 'overview';
1821:   const section = ['qris', 'transfer'].includes(rawSection) ? 'method' : rawSection === 'review' ? 'proof' : rawSection;
1822:   const navItems = [
1823:     ['overview', 'Ringkasan'],
1824:     ['method', 'Metode Bayar'],
1825:     ['proof', 'Bukti Masuk'],
1826:   ];
1827:   const paymentNav = `<nav class="payment-subnav no-print">${navItems.map(([id, label]) => `<button class="${section === id ? 'is-active' : ''}" type="button" data-payment-section="${id}">${label}</button>`).join('')}</nav>`;
1828:   const proofRows = rows.length ? rows.map((item) => {
1829:     const proofUrl = item.fileUrl || item.file_url || item.proofUrl || '';
1830:     const proofFile = item.fileName || item.file_name || 'Tanpa file';
1831:     const proofStatusText = String(item.status || '').toLowerCase();
1832:     const canReviewProof = /uploaded|review|menunggu|pending/.test(proofStatusText) && !/approved|recorded|paid|sudah|selesai|reject|ditolak/.test(proofStatusText);
1833:     const proofActions = canReviewProof ? `<div class="admin-payment-actions no-print"><button class="row-print-btn row-print-btn--gold" type="button" data-approve-payment="${escapeHtml(item.id || '')}">Approve</button><button class="row-print-btn" type="button" data-reject-payment="${escapeHtml(item.id || '')}">Reject</button></div>` : '<div class="admin-payment-actions admin-payment-actions--locked no-print"><span>Selesai</span></div>';
1834:     return `<article class="payment-proof-row"><div><span>${escapeHtml(item.invoice || 'MANUAL')}</span><strong>${escapeHtml(item.residentName || resident.name || '-')}</strong><small>${escapeHtml(item.room || resident.room || '-')} · ${escapeHtml(item.uploadedAt || item.created_at || '-')}</small>${proofUrl ? `<button class="proof-preview-link proof-preview-button" type="button" data-proof-preview-url="${escapeHtml(proofUrl)}" data-proof-preview-file="${escapeHtml(proofFile)}"><i class="fa-regular fa-image"></i>Lihat Bukti</button>` : `<em class="proof-preview-empty">${escapeHtml(proofFile)}</em>`}</div><b>${rupiah(Number(item.amount || total || 0))}</b><i class="status-${slug(item.status)}">${escapeHtml(item.status)}</i>${proofActions}</article>`;
1835:   }).join('') : '<div class="payment-empty-row"><strong>Belum ada bukti transfer.</strong><p>Queue ini khusus review bukti manual yang diupload penghuni.</p></div>';
1836: 
1837:   const overviewPage = `<section class="payment-review-status"><article><span>Status</span><strong>${escapeHtml(paymentStage)}</strong><small>${proofStatus !== 'none' ? `Bukti: ${escapeHtml(proofStatus)}` : 'Belum ada bukti transfer'}</small></article><article><span>Total Tagihan Awal</span><strong>${rupiah(total)}</strong><small>Sewa ${rupiah(rent)} + deposit ${rupiah(deposit)}</small></article><article><span>Sudah Dibuka via QRIS</span><strong>${rupiah(qrisOpenedTotal)}</strong><small>${qrisParts.length}/${splitParts.length} link dibuat</small></article><article><span>Sisa Belum Dibuka</span><strong>${rupiah(remainingTotal)}</strong><small>Bisa QRIS berikutnya atau transfer</small></article></section><section class="payment-overview-grid"><article><span>Calon Penghuni</span><strong>${escapeHtml(resident.name)}</strong><small>${escapeHtml(resident.room || '-')} · ${escapeHtml(resident.phone || '-')}</small></article><article><span>Rekening Refund</span><strong>${escapeHtml(resident.refundBank || '-')} ${escapeHtml(resident.refundAccount || '-')}</strong><small>${escapeHtml(resident.refundAccountName || '-')}</small></article><article><span>Keputusan Admin</span><strong>${escapeHtml(resident.administrationStatus || resident.applicationStatus || 'Menunggu')}</strong><small>Berubah setelah bukti disetujui/ditolak</small></article></section>`;
1838:   const methodPage = `<section class="payment-method-grid payment-method-grid--admin"><article class="payment-tool-page"><div class="payment-tool-head"><div><span>Metode 1</span><h4>QRIS otomatis</h4><p>Gunakan ini kalau penghuni ingin bayar lewat link QRIS. Nominal besar dibuat bertahap agar tetap masuk limit.</p></div><strong>${rupiah(qrisOpenedTotal)} / ${rupiah(total)}</strong></div><div class="payment-split-list payment-split-list--page">${splitParts.map((part, index) => `<button type="button" class="payment-split-chip ${qrisParts.includes(index) ? 'is-opened' : ''}" data-qris-part="${index}" data-qris-amount="${part}"><span>QRIS ${index + 1}</span><strong>${rupiah(part)}</strong><small>${qrisParts.includes(index) ? 'Link sudah dibuat' : 'Buat link bayar'}</small></button>`).join('') || '<p class="payment-empty-row">Tidak ada tagihan untuk dibuatkan QRIS.</p>'}</div></article><article class="payment-tool-page"><div class="payment-tool-head"><div><span>Metode 2</span><h4>Transfer manual</h4><p>Gunakan ini kalau penghuni transfer bank dan nanti upload bukti pembayaran dari portal resident.</p></div><strong>${rupiah(total)}</strong></div><div class="manual-transfer-box manual-transfer-box--page"><p><span>Bank</span><strong>${manualTransferAccount.bank}</strong></p><p><span>Rekening</span><strong>${manualTransferAccount.number}</strong></p><p><span>Atas nama</span><strong>${manualTransferAccount.holder}</strong></p><p><span>Nominal</span><strong>${rupiah(total)}</strong></p><a class="row-print-btn row-print-btn--gold" href="https://wa.me/${manualTransferAccount.whatsapp}?text=${encodeURIComponent(`Halo Admin Onyx, mohon review pembayaran administrasi ${resident.name || ''} sebesar ${rupiah(total)}.`)}" target="_blank" rel="noopener noreferrer">Kirim Instruksi WA</a></div></article></section>`;
1839:   const proofPage = `<section class="payment-proof-panel"><div class="payment-proof-panel__head"><div><span>Bukti Masuk</span><h4>Review pembayaran transfer</h4><p>Cek bukti yang diupload penghuni. Approve jika valid, reject jika nominal/file tidak sesuai.</p></div><small>${rows.length} bukti</small></div><div class="payment-proof-list">${proofRows}</div></section>${renderProofPreviewModal()}`;
1840:   const pages = { overview: overviewPage, method: methodPage, proof: proofPage };
1841: 
1842:   return `<section class="payment-review-page" id="pembayaran" data-section><div class="payment-review-hero"><div><span>Payment Detail</span><h3>${escapeHtml(resident.name)} · ${escapeHtml(navItems.find(([id]) => id === section)?.[1] || 'Ringkasan')}</h3><p>${escapeHtml(resident.room || '-')} · ${escapeHtml(paymentStage)}</p></div><div class="payment-review-hero__actions no-print"><button class="button subtle" type="button" id="backToPaymentList"><i class="fa-solid fa-arrow-left"></i>List buyer</button><button class="button subtle" type="button" id="refreshPayments"><i class="fa-solid fa-rotate"></i>Refresh</button></div></div>${paymentNav}${pages[section] || overviewPage}</section>`;
1843: }
1844: 
1845: function renderProofPreviewModal() {
1846:   if (!state.proofPreview?.url) return '';
1847:   const url = state.proofPreview.url;
1848:   const file = state.proofPreview.file || 'Bukti pembayaran';
1849:   const isPdf = /\.pdf(\?|#|$)/i.test(url) || /\.pdf$/i.test(file);
1850:   const preview = isPdf
1851:     ? `<iframe src="${escapeHtml(url)}" title="Preview bukti pembayaran"></iframe>`
1852:     : `<img src="${escapeHtml(url)}" alt="Preview bukti pembayaran ${escapeHtml(file)}" />`;
1853:   return `<div class="proof-preview-modal" role="dialog" aria-modal="true"><div class="proof-preview-modal__card"><header><div><span>Bukti Pembayaran</span><h4>${escapeHtml(file)}</h4></div><button class="row-print-btn" type="button" id="closeProofPreview">Tutup</button></header><div class="proof-preview-modal__body">${preview}</div><footer><a class="row-print-btn row-print-btn--gold" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">Buka file asli</a></footer></div></div>`;
1854: }
1855: 
1856: function renderAdminPersonDetail(type, person) {
1857:   if (!person) return '<section class="panel section-panel admin-page-panel"><div class="empty admin-empty-state"><strong>Belum ada data real.</strong><p>Silakan tunggu pendaftaran dari frontend.</p></div></section>';
1858:   const isResident = (person.category || 'Long Stay') === 'Long Stay';
1859:   const adminExtras = person.refund || person.administrationStatus ? `<div class="admin-detail-extra"><article><span>Administrasi</span><strong>${escapeHtml(person.administrationStatus || '-')}</strong></article><article><span>Rekening Refund Deposit</span><strong>${escapeHtml(person.refund || '-')}</strong></article></div>` : '';
1860:   return `<section class="panel section-panel admin-page-panel admin-detail-page"><div class="panel-head wrap"><div><span>${isResident ? 'Detail Penghuni' : 'Detail Penyewa'}</span><h3>${escapeHtml(person.name)}</h3></div><button class="button subtle" type="button" id="backToAdminList"><i class="fa-solid fa-arrow-left"></i>Kembali</button></div><div class="admin-detail-summary"><article><span>Kamar</span><strong>${escapeHtml(person.room)}</strong></article><article><span>Tipe</span><strong>${escapeHtml(person.plan)}</strong></article><article><span>Status</span><strong>${escapeHtml(person.status)}</strong></article></div><form class="admin-detail-form" id="adminDetailForm"><label>Nama<input name="name" value="${escapeHtml(person.name)}" /></label><label>Kamar<input name="room" value="${escapeHtml(person.room)}" /></label><label>${isResident ? 'Masa Huni' : 'Masa Sewa'}<select name="plan"><option ${person.plan === 'Bulanan' ? 'selected' : ''}>Bulanan</option><option ${person.plan === 'Tahunan' ? 'selected' : ''}>Tahunan</option><option ${person.plan === 'Harian' ? 'selected' : ''}>Harian</option><option ${person.plan === 'Mingguan' ? 'selected' : ''}>Mingguan</option></select></label><label>Mulai<input type="date" name="start" value="${escapeHtml(person.start || '')}" /></label><label>Selesai<input type="date" name="end" value="${escapeHtml(person.end || '')}" /></label><label>${isResident ? 'Tagihan' : 'Total Sewa'}<input name="amount" value="${escapeHtml(isResident ? person.billing : person.total)}" /></label><label>Jatuh Tempo<input name="due" value="${escapeHtml(person.due || '')}" /></label><label>Status<select name="status"><option ${person.status === 'Aktif' ? 'selected' : ''}>Aktif</option><option ${person.status === 'Pending' ? 'selected' : ''}>Pending</option><option ${person.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option><option ${person.status === 'Check-in' ? 'selected' : ''}>Check-in</option><option ${person.status === 'Maintenance hold' ? ... (line truncated to 2000 chars)
1861: }
1862: 
1863: function renderReservationsPanel() {
1864:   const backendState = JSON.parse(window.localStorage.getItem('onyx-admin-state') || 'null');
1865:   const applications = backendState?.applications || backendState?.data?.applications || [];
1866:   const rows = applications.map((item) => ({
1867:     code: item.id || '-',
1868:     guest: item.name || '-',
1869:     room: item.room || '-',
1870:     checkin: item.startDate || '-',
1871:     status: item.applicationStatus || 'Menunggu Review',
1872:     total: Number(item.monthlyBudget || 0),
1873:   }));
1874:   return `<section class="panel section-panel admin-page-panel" id="reservasi" data-section><div class="panel-head wrap"><div><span>Booking</span><h3>Reservasi aktif</h3></div><div class="actions no-print"><button class="button success" type="button"><i class="fa-solid fa-plus"></i>Tambah</button><button class="button subtle" type="button"><i class="fa-solid fa-filter"></i>Filter</button></div></div>${renderBookingTable(rows)}</section>`;
1875: }
1876: 
1877: /**
1878:  * @description Render tabel booking dengan status badge dan total harga.
1879:  * @param {Array<object>} rows Data reservasi.
1880:  * @returns {string} Markup tabel booking.
1881:  */
1882: function renderBookingTable(rows) {
1883:   if (!rows.length) return '<div class="empty admin-empty-state"><strong>Belum ada reservasi real.</strong><p>Data akan muncul setelah user melakukan pendaftaran.</p></div>';
1884:   return `<div class="table-wrap"><table><thead><tr><th>Kode</th><th>Tamu</th><th>Kamar</th><th>Check-in</th><th>Status</th><th>Total</th></tr></thead><tbody>${rows.map((row) => `<tr><td>${escapeHtml(row.code)}</td><td>${escapeHtml(row.guest)}</td><td>${escapeHtml(row.room)}</td><td>${escapeHtml(row.checkin)}</td><td><span class="badge ${slug(row.status)}">${escapeHtml(row.status)}</span></td><td>${rupiah(row.total)}</td></tr>`).join('')}</tbody></table></div>`;
1885: }
1886: 
1887: /**
1888:  * @description Render invoice print view sesuai fitur cetak PRD.
1889:  * @returns {string} Markup invoice.
1890:  */
1891: function renderCashflowPanel() {
1892:   const buyers = getAdminPaymentBuyers();
1893:   const { utilityMeters } = getAdminApplicationState();
1894:   if (!buyers.length) return '<section class="admin-page-panel cashflow-page" id="laporan" data-section><div class="empty admin-empty-state"><strong>Belum ada data cashflow.</strong><p>Laporan keuangan muncul setelah ada pendaftaran dan pembayaran resident.</p></div></section>';
1895: 
1896:   const paidBuyers = buyers.filter((item) => /Sudah bayar/i.test(item.paymentStatus || ''));
1897:   const reviewBuyers = buyers.filter((item) => /Menunggu review/i.test(item.paymentStatus || ''));
1898:   const rejectedBuyers = buyers.filter((item) => /Ditolak/i.test(item.paymentStatus || ''));
1899:   const unpaidBuyers = buyers.filter((item) => /Belum bayar/i.test(item.paymentStatus || ''));
1900:   const totalRevenue = buyers.reduce((sum, item) => sum + Number(item.totalPayment || 0), 0);
1901:   const paidRevenue = paidBuyers.reduce((sum, item) => sum + Number(item.totalPayment || 0), 0);
1902:   const outstanding = totalRevenue - paidRevenue;
1903:   const totalDeposit = buyers.reduce((sum, item) => sum + Number(item.deposit || 0), 0);
1904:   const utilityCost = utilityMeters.reduce((sum, item) => sum + Number(item.totalAmount || 0), 0);
1905:   const netCashflow = paidRevenue - utilityCost;
1906:   const collectionRate = totalRevenue ? Math.round((paidRevenue / totalRevenue) * 100) : 0;
1907:   const reviewAmount = reviewBuyers.reduce((sum, item) => sum + Number(item.totalPayment || 0), 0);
1908:   const rejectedAmount = rejectedBuyers.reduce((sum, item) => sum + Number(item.totalPayment || 0), 0);
1909:   const unpaidAmount = unpaidBuyers.reduce((sum, item) => sum + Number(item.totalPayment || 0), 0);
1910: 
1911:   const txRows = buyers.slice(0, 10).map((item) => {
1912:     const proof = item.proof || {};
1913:     const uploadedAt = proof.uploadedAt || proof.created_at || proof.createdAt || '-';
1914:     const proofStatus = String(proof.status || '').toLowerCase();
1915:     const statusLabel = /approved|recorded/i.test(proofStatus) ? '<i class="cf-badge cf-badge--paid">Lunas</i>' : /uploaded|review|menunggu/i.test(proofStatus) ? '<i class="cf-badge cf-badge--pending">Review</i>' : /reject|ditolak/i.test(proofStatus) ? '<i class="cf-badge cf-badge--rejected">Ditolak</i>' : '<i class="cf-badge cf-badge--unpaid">Belum</i>';
1916:     const initials = String(item.name || 'R').split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();
1917:     return `<tr><td><div class="cf-resident"><span class="cf-avatar">${escapeHtml(initials)}</span><div><strong>${escapeHtml(item.name || '-')}</strong><small>${escapeHtml(item.room || '-')}</small></div></div></td><td class="cf-amount">${rupiah(Number(item.totalPayment || 0))}</td><td>${escapeHtml(uploadedAt)}</td><td>${statusLabel}</td></tr>`;
1918:   }).join('');
1919: 
1920:   const now = new Date();
1921:   const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
1922:   const periodLabel = `${months[now.getMonth()]} ${now.getFullYear()}`;
1923: 
1924:   // Donut chart — distributions status pembayaran
1925:   const donutRadius = 52;
1926:   const donutStroke = 18;
1927:   const donutCirc = 2 * Math.PI * donutRadius;
1928:   const donutSegments = [
1929:     { count: paidBuyers.length, amount: paidRevenue, label: 'Lunas', color: '#8ff0bd', id: 'paid' },
1930:     { count: reviewBuyers.length, amount: reviewAmount, label: 'Review', color: '#ffcf66', id: 'review' },
1931:     { count: rejectedBuyers.length, amount: rejectedAmount, label: 'Ditolak', color: '#ff9d9d', id: 'rejected' },
1932:     { count: unpaidBuyers.length, amount: unpaidAmount, label: 'Belum', color: 'rgba(247,242,234,.22)', id: 'unpaid' },
1933:   ];
1934:   let donutOffset = 0;
1935:   const donutArcs = donutSegments.map((seg) => {
1936:     const pct = buyers.length ? seg.count / buyers.length : 0;
1937:     const dashLen = pct * donutCirc;
1938:     const dashGap = donutCirc - dashLen;
1939:     const offset = -donutOffset;
1940:     donutOffset += dashLen;
1941:     return `<circle cx="60" cy="60" r="${donutRadius}" fill="none" stroke="${seg.color}" stroke-width="${donutStroke}" stroke-dasharray="${dashLen} ${dashGap}" stroke-dashoffset="${offset}" stroke-linecap="butt" />`;
1942:   }).join('');
1943: 
1944:   const donutLegend = donutSegments.map((seg) => {
1945:     const pct = buyers.length ? Math.round((seg.count / buyers.length) * 100) : 0;
1946:     return `<div class="cf-donut__item"><i class="cf-dot cf-dot--${seg.id}" style="background:${seg.color}"></i><span>${escapeHtml(seg.label)}</span><em>${seg.count} · ${pct}%</em><b>${rupiah(seg.amount)}</b></div>`;
1947:   }).join('');
1948: 
1949:   // Bar chart — komposisi keuangan

(Output capped at 50 KB. Showing lines 1595-1949. Use offset=1950 to continue.)
</content>
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 9.0s)

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src\\main.js",
  "offset": 1670,
  "limit": 280
}
```

**Output:**
```
<path>C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\main.js</path>
<type>file</type>
<content>
1670:     window.__onyxAdminSectionSyncing = false;
1671:   }
1672: }
1673: 
1674: /**
1675:  * @description Render panel manajemen kamar dengan filter proper.
1676:  * @returns {string} Markup panel kamar.
1677:  */
1678: function renderRoomsPanel() {
1679:   if (state.isRoomCreateOpen && !state.adminRoomDetail) return renderRoomCreatePage();
1680:   if (state.adminRoomDetail) {
1681:     const room = getRooms().find((item) => item.no === state.adminRoomDetail) || getRooms()[0];
1682:     return renderRoomDetailPanel(room);
1683:   }
1684:   const filteredRooms = getRooms().filter((room) => {
1685:     const haystack = `${room.no} ${room.name}`.toLowerCase();
1686:     return haystack.includes(state.roomQuery.toLowerCase()) && (!state.roomType || room.type === state.roomType) && (!state.roomStatus || getEffectiveRoomStatus(room) === state.roomStatus);
1687:   });
1688: 
1689:   return `
1690:     <section class="admin-flat-panel" id="kamar" data-section>
1691:       <div class="inventory-head"><div><span>Inventory</span><h3>Manajemen kamar</h3><p>${filteredRooms.length} kamar ditampilkan · status otomatis mengikuti penghuni aktif.</p></div><div class="inventory-actions no-print"><button class="button success" type="button" id="openRoomCreate"><i class="fa-solid fa-plus"></i>Tambah kamar</button><button class="button subtle" type="button" id="printRooms"><i class="fa-solid fa-print"></i>Cetak</button></div></div>
1692:       <div class="inventory-toolbar no-print"><label class="inventory-search" for="adminRoomSearchProxy"><i class="fa-solid fa-magnifying-glass"></i><input form="roomForm" id="adminRoomSearchProxy" type="search" value="${escapeHtml(state.roomQuery)}" placeholder="Cari nomor / nama kamar" /></label><select class="field" id="typeFilter" aria-label="Filter tipe kamar">${['', 'Standard', 'Deluxe', 'Suite', 'VIP'].map((type) => `<option value="${type}" ${state.roomType === type ? 'selected' : ''}>${type || 'Semua tipe'}</option>`).join('')}</select><select class="field" id="statusFilter" aria-label="Filter status kamar">${['', 'tersedia', 'terisi', 'maintenance'].map((status) => `<option value="${status}" ${state.roomStatus === status ? 'selected' : ''}>${status || 'Semua status'}</option>`).join('')}</select></div>
1693:       <div class="room-list"><div class="room-list-head no-print"><span>Kamar</span><span>Detail</span><span>Harga</span><span>Status</span><span>Aksi</span></div>${filteredRooms.map(renderRoomRow).join('') || '<p class="empty">Tidak ada kamar yang cocok.</p>'}</div>
1694:       ${renderRoomsPrintReport(filteredRooms)}
1695:     </section>
1696:   `;
1697: }
1698: 
1699: function renderRoomsPrintReport(rooms) {
1700:   const occupancy = getRoomOccupancyStats();
1701:   const generatedAt = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
1702:   const rows = rooms.map((room) => {
1703:     const occupant = getRoomOccupant(room.no);
1704:     const status = getEffectiveRoomStatus(room);
1705:     const devices = getRoomDeviceState(room.no);
1706:     const telemetry = getIotTelemetry(room.no);
1707:     const latestMeter = getUtilityMeters().find((item) => getRoomCode(item.room) === room.no) || {};
1708:     const climateType = getRoomClimateType(room);
1709:     const climateLabel = climateType === 'ac' ? `AC ${devices.acOn ? `${devices.temperature}°C` : 'mati'}` : climateType === 'fan' ? `Kipas ${devices.fanOn ? 'menyala' : 'mati'}` : 'Ventilasi manual';
1710:     const utilityLabel = latestMeter.month ? `${latestMeter.month}: ${Number(latestMeter.electricKwh || 0)} kWh, ${Number(latestMeter.waterM3 || 0)} m³, ${rupiah(Number(latestMeter.totalAmount || 0))}` : 'Belum ada input meter';
1711: 
1712:     return `<tr><td><strong>${escapeHtml(room.no)}</strong><span>${escapeHtml(room.floor || '-')}</span></td><td><b>${escapeHtml(room.name)}</b><small>${escapeHtml(room.type)} · ${escapeHtml((room.facilities || []).join(', ') || 'Fasilitas belum diisi')}</small></td><td>${rupiah(Number(room.price || 0))}<small>/ bulan</small></td><td><b>${status === 'terisi' ? 'Tidak tersedia' : escapeHtml(status)}</b><small>${escapeHtml(occupant?.name || 'Kosong')}</small></td><td><b>${escapeHtml(climateLabel)}</b><small>Lampu ${devices.lightOn ? 'menyala' : 'mati'} · Air ${devices.waterOn ? 'aktif' : 'nonaktif'}</small></td><td><b>${escapeHtml(utilityLabel)}</b><small>${telemetry?.created_at ? `IoT ${escapeHtml(telemetry.created_at)}` : 'Manual/standby'}</small></td></tr>`;
1713:   }).join('');
1714: 
1715:   return `<section class="room-print-report" aria-label="Laporan cetak kamar"><header><div><span>Onyx Residence</span><h2>Laporan Inventory Kamar</h2><p>Ringkasan status kamar, penghuni aktif, fasilitas, smart control, dan meter utilitas.</p></div><aside><b>${escapeHtml(generatedAt)}</b><small>Dicetak oleh Admin</small></aside></header><div class="room-print-summary"><article><span>Total kamar</span><strong>${occupancy.totalRooms}</strong></article><article><span>Terisi</span><strong>${occupancy.occupiedRooms}</strong></article><article><span>Tersedia</span><strong>${occupancy.availableRooms}</strong></article><article><span>Occupancy</span><strong>${occupancy.occupancyPercent}%</strong></article></div><table><thead><tr><th>Kamar</th><th>Detail</th><th>Harga</th><th>Status</th><th>Smart Control</th><th>Utilitas</th></tr></thead><tbody>${rows || '<tr><td colspan="6">Tidak ada kamar yang cocok dengan filter.</td></tr>'}</tbody></table><footer><span>Catatan</span><p>Status terisi mengikuti penghuni approved. Meter utilitas memakai input terbaru per kamar jika tersedia.</p></footer></section>`;
1716: }
1717: 
1718: /**
1719:  * @description Render satu baris kamar dengan aksi CRUD.
1720:  * @param {object} room Data kamar.
1721:  * @returns {string} Markup row kamar.
1722:  */
1723: function renderRoomRow(room) {
1724:   const status = getEffectiveRoomStatus(room);
1725:   return `<article class="room-row"><div class="room-code"><strong>${room.no}</strong><span>${room.floor}</span></div><div class="room-main"><h4>${escapeHtml(room.name)}</h4><p>${room.type} · ${room.facilities.map(escapeHtml).join(', ')}</p></div><div class="room-price"><strong>${rupiah(room.price)}</strong><span>/ bulan</span></div><span class="badge ${status}">${status === 'terisi' ? 'tidak tersedia' : status}</span><div class="row-actions row-actions--text no-print"><button type="button" data-room-edit="${escapeHtml(room.no)}" aria-label="Edit ${room.no}"><i class="fa-regular fa-pen-to-square"></i>Edit</button><button type="button" data-room-delete="${escapeHtml(room.no)}" aria-label="Hapus ${room.no}"><i class="fa-regular fa-trash-can"></i>Hapus</button></div></article>`;
1726: }
1727: 
1728: function renderRoomCreatePage() {
1729:   return `<section class="admin-flat-panel admin-page-panel room-detail-panel"><div class="panel-head wrap"><div><span>Tambah Kamar</span><h3>Inventory kamar baru</h3></div><button class="button subtle" type="button" id="backToRooms"><i class="fa-solid fa-arrow-left"></i>Kembali</button></div>${renderRoomEditorForm()}</section>`;
1730: }
1731: 
1732: function renderRoomEditorForm(room = null) {
1733:   return `<form class="room-form no-print room-editor-form" id="roomForm"><div class="form-title"><h4>${room ? 'Edit kamar' : 'Tambah kamar'}</h4><span>Data inventory kamar tersimpan tanpa mengacak list utama.</span></div><input type="hidden" name="id_kamar" value="${escapeHtml(room?.id || '')}" /><label>Nomor<input required name="no_kamar" value="${escapeHtml(room?.no || '')}" placeholder="A09" /></label><label>Kategori<select required name="kategori">${['Standard', 'Deluxe', 'Suite', 'VIP'].map((type) => `<option ${room?.type === type ? 'selected' : ''}>${type}</option>`).join('')}</select></label><label>Nama kamar<input required name="nama_kamar" value="${escapeHtml(room?.name || '')}" placeholder="Onyx Studio" /></label><label>Harga<input required name="harga" type="number" min="0" value="${escapeHtml(room?.price || '')}" placeholder="3100000" /></label><label>Status<select name="status">${['tersedia', 'terisi', 'maintenance'].map((status) => `<option ${getEffectiveRoomStatus(room || {}) === status ? 'selected' : ''}>${status}</option>`).join('')}</select></label><label class="full">Fasilitas<textarea name="fasilitas" placeholder="AC, WiFi, kamar mandi dalam">${escapeHtml((room?.facilities || []).join(', '))}</textarea></label><div class="form-actions full"><button class="button primary" type="submit">Simpan</button><button class="button subtle" type="button" id="closeRoomEditor">Batal</button></div></form>`;
1734: }
1735: 
1736: function renderRoomUtilityForm(room, occupant = null) {
1737:   const month = new Date().toISOString().slice(0, 7);
1738:   return `<form class="room-utility-form no-print" id="roomUtilityMeterForm"><div><span>Input Meter</span><h4>Catat listrik, air, dan tagihan</h4><p>Data masuk ke billing penghuni dan histori meter kamar ini.</p></div><input type="hidden" name="application_id" value="${escapeHtml(occupant?.id || '')}" /><input type="hidden" name="room" value="${escapeHtml(room.no)}" /><input type="hidden" name="residentName" value="${escapeHtml(occupant?.name || '')}" /><label>Bulan<input name="month" type="month" value="${month}" required /></label><label>Listrik kWh<input name="electricKwh" type="number" min="0" step="0.1" placeholder="0" required /></label><label>Air m³<input name="waterM3" type="number" min="0" step="0.1" placeholder="0" required /></label><label>Tarif listrik/kWh<input name="electricRate" type="number" min="0" value="1500" required /></label><label>Tarif air/m³<input name="waterRate" type="number" min="0" value="8000" required /></label><label>Biaya tetap<input name="fixedFee" type="number" min="0" value="0" /></label><button class="button primary" type="submit">Simpan Meter</button></form>`;
1739: }
1740: 
1741: function renderRoomDetailPanel(room) {
1742:   if (!room) return `<section class="admin-flat-panel admin-page-panel"><button class="button subtle" type="button" id="backToRooms"><i class="fa-solid fa-arrow-left"></i>Kembali</button></section>`;
1743:   const occupant = getRoomOccupant(room.no);
1744:   const devices = getRoomDeviceState(room.no);
1745:   const utilityMeters = getUtilityMeters().filter((item) => getRoomCode(item.room) === room.no);
1746:   const latest = utilityMeters[0] || {};
1747:   const telemetry = getIotTelemetry(room.no);
1748:   const climateType = getRoomClimateType(room);
1749:   const facilityList = room.facilities?.length ? room.facilities.map(escapeHtml).join(' · ') : 'Fasilitas belum diisi';
1750:   const effectiveStatus = getEffectiveRoomStatus(room);
1751:   const section = state.activeRoomDetailSection || 'overview';
1752:   const detailNav = [['overview', 'Overview'], ['control', 'Smart Control'], ['meter', 'Meter & Tagihan']];
1753:   const climateRows = climateType === 'ac'
1754:     ? `<p><span><i class="fa-solid fa-snowflake"></i> AC</span><strong>${devices.acOn ? `${devices.temperature}°C` : 'Mati'}</strong><button class="row-print-btn ${devices.acOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="acOn" data-room-code="${escapeHtml(room.no)}">${devices.acOn ? 'Matikan' : 'Nyalakan'}</button></p><label class="room-detail-range"><span>Suhu AC</span><input type="range" min="18" max="30" value="${devices.temperature}" data-admin-room-temp="${escapeHtml(room.no)}" ${devices.acOn ? '' : 'disabled'} /><strong>${devices.temperature}°C</strong></label>`
1755:     : climateType === 'fan'
1756:       ? `<p><span><i class="fa-solid fa-fan"></i> Kipas</span><strong>${devices.fanOn ? 'Menyala' : 'Mati'}</strong><button class="row-print-btn ${devices.fanOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="fanOn" data-room-code="${escapeHtml(room.no)}">${devices.fanOn ? 'Matikan' : 'Nyalakan'}</button></p><p><span><i class="fa-solid fa-wind"></i> Sirkulasi</span><strong>Jendela luar</strong><em>Tanpa AC</em></p>`
1757:       : `<p><span><i class="fa-solid fa-wind"></i> Ventilasi</span><strong>Manual</strong><em>Tidak ada AC/kipas</em></p>`;
1758:   const overviewPage = `<article class="room-detail-card room-detail-card--wide"><div class="room-detail-card__head"><div><span>Overview</span><h4>Informasi kamar</h4></div></div><div class="room-detail-list"><p><span>Status</span><strong>${effectiveStatus === 'terisi' ? 'Tidak tersedia' : escapeHtml(effectiveStatus)}</strong></p><p><span>Tipe</span><strong>${escapeHtml(room.type)}</strong></p><p><span>Fasilitas</span><strong>${facilityList}</strong></p><p><span>Penghuni</span><strong>${escapeHtml(occupant?.name || 'Kosong')}</strong></p><p><span>WiFi</span><strong>ONYX-${escapeHtml(room.no)}</strong></p></div></article>`;
1759:   const controlPage = `<article class="room-detail-card room-detail-card--wide"><div class="room-detail-card__head"><div><span>Smart Control</span><h4>Perangkat kamar</h4></div><small>${telemetry?.created_at ? `IoT ${escapeHtml(telemetry.created_at)}` : 'Manual mode'}</small></div><div class="room-detail-control-list"><p><span><i class="fa-solid fa-lightbulb"></i> Lampu</span><strong>${devices.lightOn ? 'Menyala' : 'Mati'}</strong><button class="row-print-btn ${devices.lightOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="lightOn" data-room-code="${escapeHtml(room.no)}">${devices.lightOn ? 'Matikan' : 'Nyalakan'}</button></p><p><span><i class="fa-solid fa-faucet-drip"></i> Air</span><strong>${devices.waterOn ? 'Aktif' : 'Nonaktif'}</strong><button class="row-print-btn ${devices.waterOn ? 'row-print-btn--gold' : ''}" type="button" data-admin-room-device="waterOn" data-room-code="${escapeHtml(room.no)}">${devices.waterOn ? 'Matikan' : 'Nyalakan'}</button></p>${climateRows}</div></article>`;
1760:   const meterPage = `<article class="room-detail-card room-detail-card--wide room-detail-card--meter"><div class="room-detail-card__head"><div><span>Meter</span><h4>Pemakaian & tagihan</h4></div></div><div class="room-meter-line"><p><span>Listrik</span><strong>${telemetry ? `${Number(telemetry.powerWatt || 0)} W` : `${Number(latest.electricKwh || 0)} kWh`}</strong><small>${telemetry ? `${Number(telemetry.energyKwh || 0)} kWh` : 'Meter admin'}</small></p><p><span>Air</span><strong>${telemetry ? `${Number(telemetry.waterM3 || 0)} m³` : `${Number(latest.waterM3 || 0)} m³`}</strong><small>${devices.waterOn ? 'Valve aktif' : 'Valve nonaktif'}</small></p><p><span>Tagihan</span><strong>${latest.totalAmount ? rupiah(Number(latest.totalAmount)) : 'Belum ada'}</strong><small>Utility meter</small></p></div>${renderRoomUtilityForm(room, occupant)}<div class="resident-saas-table resident-saas-table--utility admin-utility-table room-utility-history">${utilityMeters.length ? utilityMeters.map((item) => `<p><span>${escapeHtml(item.month || '-')}</span><b>${Number(item.electricKwh || 0)} kWh</b><em>${Number(item.waterM3 || 0)} m³</em><i>${rupiah(Number(item.totalAmount || 0))}</i></p>`).join('') : '<p><span>Belum ada meter</span><b>0 kWh</b><em>0 m³</em><i>Rp 0</i></p>'}</div></article>`;
1761:   const pages = { overview: overviewPage, control: controlPage, meter: meterPage };
1762: 
1763:   return `<section class="admin-flat-panel admin-page-panel room-detail-panel room-detail-saas"><div class="room-detail-saas__nav"><button class="room-detail-back no-print" type="button" id="backToRooms"><i class="fa-solid fa-arrow-left"></i>Kembali</button><button class="button subtle no-print" type="button" id="toggleRoomEditor"><i class="fa-regular fa-pen-to-square"></i>${state.isRoomCreateOpen ? 'Tutup edit' : 'Edit kamar'}</button></div><header class="room-detail-saas__hero"><div><span>Room Detail</span><h3>${escapeHtml(room.no)} · ${escapeHtml(room.name)}</h3><p>${escapeHtml(room.type)} · ${facilityList}</p></div><b class="room-status-pill ${escapeHtml(effectiveStatus)}">${effectiveStatus === 'terisi' ? 'Tidak tersedia' : escapeHtml(effectiveStatus)}</b></header><div class="room-detail-saas__stats"><p><span>Harga</span><strong>${rupiah(room.price)}</strong><small>/ bulan</small></p><p><span>Penghuni</span><strong>${escapeHtml(occupant?.name || 'Kosong')}</strong><small>${escapeHtml(occupant?.phone || 'Belum ada penghuni aktif')}</small></p><p><span>WiFi</span><strong>ONYX-${escapeHtml(room.no)}</strong><small>password otomatis per kamar</small></p><p><span>IoT</span><strong>${telemetry?.created_at ? 'Online' : 'Standby'}</strong><small>${telemetry?.created_at ? escapeHtml(telemetry.created_at) : 'Menunggu telemetry'}</small></p></div>${state.isRoomCreateOpen ? `<section class="room-edit-focus">${renderRoomEditorForm(room)}</section>` : `<nav class="room-detail-subnav no-print">${detailNav.map(([id, label]) => `<button class="${section === id ? 'is-active' : ''}" type="button" data-room-detail-section="${id}">${label}</button>`).join('')}</nav><section class="room-detail-saas__body room-detail-saas__body--single">${pages[section] || overviewPage}</section>`}</section>`;
1764: }
1765: 
1766: /**
1767:  * @description Render panel tamu dan reservasi.
1768:  * @returns {string} Markup grid tamu dan reservasi.
1769:  */
1770: function renderGuestBookingGrid() {
1771:   return `<section class="split-grid lower-grid"><article class="panel section-panel compact-panel" id="tamu" data-section><div class="panel-head"><div><span>Tamu</span><h3>Data penyewa</h3></div></div><div class="empty admin-empty-state"><strong>Belum ada data penyewa.</strong><p>Semua data diambil dari backend pendaftaran.</p></div></article><article class="panel section-panel compact-panel" id="reservasi" data-section><div class="panel-head"><div><span>Booking</span><h3>Reservasi aktif</h3></div></div>${renderBookingTable([])}</article></section>`;
1772: }
1773: 
1774: function renderGuestsPanel() {
1775:   return `<section class="panel section-panel admin-page-panel" id="tamu" data-section><div class="panel-head wrap"><div><span>Residents</span><h3>Data penyewa</h3></div></div><div class="empty admin-empty-state"><strong>Belum ada data penyewa.</strong><p>Gunakan menu Penghuni/Penyewa untuk data backend real.</p></div></section>`;
1776: }
1777: 
1778: function renderResidentsAdminPanel() {
1779:   const rows = [...getAdminResidents(), ...getAdminShortTermTenants()];
1780:   if (state.adminDetailType === 'penghuni') return renderAdminPersonDetail('penghuni', rows[state.adminDetailIndex] || rows[0]);
1781:   const activeRows = rows.filter((resident) => ['aktif', 'confirmed', 'check-in'].includes(String(resident.status || '').toLowerCase())).length;
1782:   const longStayRows = rows.filter((resident) => (resident.category || 'Long Stay') === 'Long Stay').length;
1783:   const shortStayRows = rows.length - longStayRows;
1784:   const totalBilling = rows.reduce((sum, resident) => sum + Number(String(resident.billing || resident.total || '').replace(/[^0-9]/g, '') || 0), 0);
1785:   const rowMarkup = rows.map((resident, index) => {
1786:     const category = resident.category || 'Resident';
1787:     const period = resident.period || resident.stay || '-';
1788:     const amount = resident.billing || resident.total || '-';
1789:     const initials = String(resident.name || 'R').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
1790:     return `<button class="admin-person-row admin-person-row--hotel" type="button" data-admin-detail="penghuni" data-admin-detail-index="${index}"><span class="resident-avatar">${escapeHtml(initials)}</span><div class="resident-guest"><span>${escapeHtml(resident.room || '-')}</span><strong>${escapeHtml(resident.name || '-')}</strong><small>${escapeHtml(resident.plan || '-')} · ${escapeHtml(period)}</small></div><div class="resident-stay"><span>Tipe sewa</span><strong>${escapeHtml(category)}</strong><small>${escapeHtml(resident.due || resident.end || 'Jadwal belum diisi')}</small></div><div class="resident-billing"><span>Tagihan</span><strong>${escapeHtml(amount)}</strong><small>${escapeHtml(resident.refund || resident.administrationStatus || 'Administrasi standar')}</small></div><i class="tenant-type-label ${slug(category)}">${escapeHtml(category)}</i><em class="resident-status-chip ${slug(resident.status || '')}">${escapeHtml(resident.status || '-')}</em></button>`;
1791:   }).join('');
1792: 
1793:   return `<section class="admin-page-panel admin-resident-ops" id="penghuni" data-section><div class="resident-ops-kpis"><article><span>Total</span><strong>${rows.length}</strong><small>Penghuni dan penyewa</small></article><article><span>Aktif</span><strong>${activeRows}</strong><small>Status berjalan</small></article><article><span>Long stay</span><strong>${longStayRows}</strong><small>Bulanan atau tahunan</small></article><article><span>Short stay</span><strong>${shortStayRows}</strong><small>Harian atau mingguan</small></article><article><span>Billing</span><strong>${totalBilling ? rupiah(totalBilling) : 'Rp 0'}</strong><small>Estimasi tagihan</small></article></div><div class="resident-ops-table"><div class="resident-ops-table__head no-print"><span>Penghuni</span><span>Sewa</span><span>Tagihan</span><span>Tipe</span><span>Status</span></div>${rowMarkup || '<div class="empty admin-empty-state"><strong>Belum ada penghuni atau penyewa real.</strong><p>Data muncul setelah user daftar dan disetujui admin.</p></div>'}</div></section>`;
1794: }
1795: 
1796: function renderPaymentsAdminPanel() {
1797:   const buyers = getAdminPaymentBuyers();
1798:   const selectedBuyer = buyers.find((item) => String(item.id || '') === String(state.adminPaymentDetailId || '')) || null;
1799:   if (!selectedBuyer) {
1800:     const paidBuyers = buyers.filter((buyer) => /bayar|approved|recorded/i.test(buyer.paymentStatus || '')).length;
1801:     const reviewBuyers = buyers.filter((buyer) => /review|uploaded|menunggu/i.test(buyer.paymentStatus || '')).length;
1802:     const totalAmount = buyers.reduce((sum, buyer) => sum + Number(buyer.totalPayment || 0), 0);
1803:     return `<section class="payment-review-page payment-ops-page admin-page-panel" id="pembayaran" data-section><div class="payment-ops-kpis"><article><span>Total Buyer</span><strong>${buyers.length}</strong><small>Calon penghuni</small></article><article><span>Paid / Approved</span><strong>${paidBuyers}</strong><small>Pembayaran selesai</small></article><article><span>Need Review</span><strong>${reviewBuyers}</strong><small>Bukti menunggu admin</small></article><article><span>Total Pipeline</span><strong>${rupiah(totalAmount)}</strong><small>Estimasi administrasi</small></article></div><div class="payment-buyer-table payment-buyer-table--ops"><div class="payment-buyer-table__head no-print"><span>Buyer</span><span>Kamar</span><span>Total</span><span>Status</span><span>Aksi</span></div>${buyers.length ? buyers.map((buyer) => `<article class="payment-buyer-row payment-buyer-row--ops"><div><strong>${escapeHtml(buyer.name || '-')}</strong><small>${escapeHtml(buyer.phone || buyer.email || '-')}</small></div><span>${escapeHtml(buyer.room || '-')}</span><b>${rupiah(Number(buyer.totalPayment || 0))}</b><i class="status-${slug(buyer.paymentStatus || '')}">${escapeHtml(buyer.paymentStatus || '-')}</i><button class="row-print-btn row-print-btn--gold" type="button" data-payment-detail="${escapeHtml(buyer.id || '')}">Detail</button></article>`).join('') : '<div class="empty admin-empty-state"><strong>Belum ada buyer.</strong><p>Data pembayaran muncul setelah user melakukan pendaftaran.</p></div>'}</div></section>`;
1804:   }
1805: 
1806:   const { resident, proof, proofs, qrisParts, splitParts, rent, deposit, total } = getAdminApplicationState(selectedBuyer);
1807:   if (!resident?.name) return `<section class="payment-review-page admin-page-panel" id="pembayaran" data-section><div class="empty admin-empty-state"><strong>Belum ada pembayaran.</strong><p>Data muncul setelah calon penghuni daftar dan memilih metode administrasi.</p></div></section>`;
1808: 
1809:   const rows = proofs.filter((item) => item?.status);
1810:   const qrisOpenedTotal = qrisParts.reduce((sum, index) => sum + Number(splitParts[index] || 0), 0);
1811:   const remainingTotal = Math.max(0, total - qrisOpenedTotal);
1812:   const proofStatus = proof?.status || 'none';
1813:   const paymentStage = proofStatus === 'approved'
1814:     ? 'Administrasi selesai'
1815:     : proofStatus === 'uploaded'
1816:       ? 'Bukti transfer menunggu review'
1817:       : qrisParts.length
1818:         ? 'Pembayaran QRIS sedang berjalan'
1819:         : 'Menunggu pembayaran';
1820:   const rawSection = state.activePaymentSection || 'overview';
1821:   const section = ['qris', 'transfer'].includes(rawSection) ? 'method' : rawSection === 'review' ? 'proof' : rawSection;
1822:   const navItems = [
1823:     ['overview', 'Ringkasan'],
1824:     ['method', 'Metode Bayar'],
1825:     ['proof', 'Bukti Masuk'],
1826:   ];
1827:   const paymentNav = `<nav class="payment-subnav no-print">${navItems.map(([id, label]) => `<button class="${section === id ? 'is-active' : ''}" type="button" data-payment-section="${id}">${label}</button>`).join('')}</nav>`;
1828:   const proofRows = rows.length ? rows.map((item) => {
1829:     const proofUrl = item.fileUrl || item.file_url || item.proofUrl || '';
1830:     const proofFile = item.fileName || item.file_name || 'Tanpa file';
1831:     const proofStatusText = String(item.status || '').toLowerCase();
1832:     const canReviewProof = /uploaded|review|menunggu|pending/.test(proofStatusText) && !/approved|recorded|paid|sudah|selesai|reject|ditolak/.test(proofStatusText);
1833:     const proofActions = canReviewProof ? `<div class="admin-payment-actions no-print"><button class="row-print-btn row-print-btn--gold" type="button" data-approve-payment="${escapeHtml(item.id || '')}">Approve</button><button class="row-print-btn" type="button" data-reject-payment="${escapeHtml(item.id || '')}">Reject</button></div>` : '<div class="admin-payment-actions admin-payment-actions--locked no-print"><span>Selesai</span></div>';
1834:     return `<article class="payment-proof-row"><div><span>${escapeHtml(item.invoice || 'MANUAL')}</span><strong>${escapeHtml(item.residentName || resident.name || '-')}</strong><small>${escapeHtml(item.room || resident.room || '-')} · ${escapeHtml(item.uploadedAt || item.created_at || '-')}</small>${proofUrl ? `<button class="proof-preview-link proof-preview-button" type="button" data-proof-preview-url="${escapeHtml(proofUrl)}" data-proof-preview-file="${escapeHtml(proofFile)}"><i class="fa-regular fa-image"></i>Lihat Bukti</button>` : `<em class="proof-preview-empty">${escapeHtml(proofFile)}</em>`}</div><b>${rupiah(Number(item.amount || total || 0))}</b><i class="status-${slug(item.status)}">${escapeHtml(item.status)}</i>${proofActions}</article>`;
1835:   }).join('') : '<div class="payment-empty-row"><strong>Belum ada bukti transfer.</strong><p>Queue ini khusus review bukti manual yang diupload penghuni.</p></div>';
1836: 
1837:   const overviewPage = `<section class="payment-review-status"><article><span>Status</span><strong>${escapeHtml(paymentStage)}</strong><small>${proofStatus !== 'none' ? `Bukti: ${escapeHtml(proofStatus)}` : 'Belum ada bukti transfer'}</small></article><article><span>Total Tagihan Awal</span><strong>${rupiah(total)}</strong><small>Sewa ${rupiah(rent)} + deposit ${rupiah(deposit)}</small></article><article><span>Sudah Dibuka via QRIS</span><strong>${rupiah(qrisOpenedTotal)}</strong><small>${qrisParts.length}/${splitParts.length} link dibuat</small></article><article><span>Sisa Belum Dibuka</span><strong>${rupiah(remainingTotal)}</strong><small>Bisa QRIS berikutnya atau transfer</small></article></section><section class="payment-overview-grid"><article><span>Calon Penghuni</span><strong>${escapeHtml(resident.name)}</strong><small>${escapeHtml(resident.room || '-')} · ${escapeHtml(resident.phone || '-')}</small></article><article><span>Rekening Refund</span><strong>${escapeHtml(resident.refundBank || '-')} ${escapeHtml(resident.refundAccount || '-')}</strong><small>${escapeHtml(resident.refundAccountName || '-')}</small></article><article><span>Keputusan Admin</span><strong>${escapeHtml(resident.administrationStatus || resident.applicationStatus || 'Menunggu')}</strong><small>Berubah setelah bukti disetujui/ditolak</small></article></section>`;
1838:   const methodPage = `<section class="payment-method-grid payment-method-grid--admin"><article class="payment-tool-page"><div class="payment-tool-head"><div><span>Metode 1</span><h4>QRIS otomatis</h4><p>Gunakan ini kalau penghuni ingin bayar lewat link QRIS. Nominal besar dibuat bertahap agar tetap masuk limit.</p></div><strong>${rupiah(qrisOpenedTotal)} / ${rupiah(total)}</strong></div><div class="payment-split-list payment-split-list--page">${splitParts.map((part, index) => `<button type="button" class="payment-split-chip ${qrisParts.includes(index) ? 'is-opened' : ''}" data-qris-part="${index}" data-qris-amount="${part}"><span>QRIS ${index + 1}</span><strong>${rupiah(part)}</strong><small>${qrisParts.includes(index) ? 'Link sudah dibuat' : 'Buat link bayar'}</small></button>`).join('') || '<p class="payment-empty-row">Tidak ada tagihan untuk dibuatkan QRIS.</p>'}</div></article><article class="payment-tool-page"><div class="payment-tool-head"><div><span>Metode 2</span><h4>Transfer manual</h4><p>Gunakan ini kalau penghuni transfer bank dan nanti upload bukti pembayaran dari portal resident.</p></div><strong>${rupiah(total)}</strong></div><div class="manual-transfer-box manual-transfer-box--page"><p><span>Bank</span><strong>${manualTransferAccount.bank}</strong></p><p><span>Rekening</span><strong>${manualTransferAccount.number}</strong></p><p><span>Atas nama</span><strong>${manualTransferAccount.holder}</strong></p><p><span>Nominal</span><strong>${rupiah(total)}</strong></p><a class="row-print-btn row-print-btn--gold" href="https://wa.me/${manualTransferAccount.whatsapp}?text=${encodeURIComponent(`Halo Admin Onyx, mohon review pembayaran administrasi ${resident.name || ''} sebesar ${rupiah(total)}.`)}" target="_blank" rel="noopener noreferrer">Kirim Instruksi WA</a></div></article></section>`;
1839:   const proofPage = `<section class="payment-proof-panel"><div class="payment-proof-panel__head"><div><span>Bukti Masuk</span><h4>Review pembayaran transfer</h4><p>Cek bukti yang diupload penghuni. Approve jika valid, reject jika nominal/file tidak sesuai.</p></div><small>${rows.length} bukti</small></div><div class="payment-proof-list">${proofRows}</div></section>${renderProofPreviewModal()}`;
1840:   const pages = { overview: overviewPage, method: methodPage, proof: proofPage };
1841: 
1842:   return `<section class="payment-review-page" id="pembayaran" data-section><div class="payment-review-hero"><div><span>Payment Detail</span><h3>${escapeHtml(resident.name)} · ${escapeHtml(navItems.find(([id]) => id === section)?.[1] || 'Ringkasan')}</h3><p>${escapeHtml(resident.room || '-')} · ${escapeHtml(paymentStage)}</p></div><div class="payment-review-hero__actions no-print"><button class="button subtle" type="button" id="backToPaymentList"><i class="fa-solid fa-arrow-left"></i>List buyer</button><button class="button subtle" type="button" id="refreshPayments"><i class="fa-solid fa-rotate"></i>Refresh</button></div></div>${paymentNav}${pages[section] || overviewPage}</section>`;
1843: }
1844: 
1845: function renderProofPreviewModal() {
1846:   if (!state.proofPreview?.url) return '';
1847:   const url = state.proofPreview.url;
1848:   const file = state.proofPreview.file || 'Bukti pembayaran';
1849:   const isPdf = /\.pdf(\?|#|$)/i.test(url) || /\.pdf$/i.test(file);
1850:   const preview = isPdf
1851:     ? `<iframe src="${escapeHtml(url)}" title="Preview bukti pembayaran"></iframe>`
1852:     : `<img src="${escapeHtml(url)}" alt="Preview bukti pembayaran ${escapeHtml(file)}" />`;
1853:   return `<div class="proof-preview-modal" role="dialog" aria-modal="true"><div class="proof-preview-modal__card"><header><div><span>Bukti Pembayaran</span><h4>${escapeHtml(file)}</h4></div><button class="row-print-btn" type="button" id="closeProofPreview">Tutup</button></header><div class="proof-preview-modal__body">${preview}</div><footer><a class="row-print-btn row-print-btn--gold" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">Buka file asli</a></footer></div></div>`;
1854: }
1855: 
1856: function renderAdminPersonDetail(type, person) {
1857:   if (!person) return '<section class="panel section-panel admin-page-panel"><div class="empty admin-empty-state"><strong>Belum ada data real.</strong><p>Silakan tunggu pendaftaran dari frontend.</p></div></section>';
1858:   const isResident = (person.category || 'Long Stay') === 'Long Stay';
1859:   const adminExtras = person.refund || person.administrationStatus ? `<div class="admin-detail-extra"><article><span>Administrasi</span><strong>${escapeHtml(person.administrationStatus || '-')}</strong></article><article><span>Rekening Refund Deposit</span><strong>${escapeHtml(person.refund || '-')}</strong></article></div>` : '';
1860:   return `<section class="panel section-panel admin-page-panel admin-detail-page"><div class="panel-head wrap"><div><span>${isResident ? 'Detail Penghuni' : 'Detail Penyewa'}</span><h3>${escapeHtml(person.name)}</h3></div><button class="button subtle" type="button" id="backToAdminList"><i class="fa-solid fa-arrow-left"></i>Kembali</button></div><div class="admin-detail-summary"><article><span>Kamar</span><strong>${escapeHtml(person.room)}</strong></article><article><span>Tipe</span><strong>${escapeHtml(person.plan)}</strong></article><article><span>Status</span><strong>${escapeHtml(person.status)}</strong></article></div><form class="admin-detail-form" id="adminDetailForm"><label>Nama<input name="name" value="${escapeHtml(person.name)}" /></label><label>Kamar<input name="room" value="${escapeHtml(person.room)}" /></label><label>${isResident ? 'Masa Huni' : 'Masa Sewa'}<select name="plan"><option ${person.plan === 'Bulanan' ? 'selected' : ''}>Bulanan</option><option ${person.plan === 'Tahunan' ? 'selected' : ''}>Tahunan</option><option ${person.plan === 'Harian' ? 'selected' : ''}>Harian</option><option ${person.plan === 'Mingguan' ? 'selected' : ''}>Mingguan</option></select></label><label>Mulai<input type="date" name="start" value="${escapeHtml(person.start || '')}" /></label><label>Selesai<input type="date" name="end" value="${escapeHtml(person.end || '')}" /></label><label>${isResident ? 'Tagihan' : 'Total Sewa'}<input name="amount" value="${escapeHtml(isResident ? person.billing : person.total)}" /></label><label>Jatuh Tempo<input name="due" value="${escapeHtml(person.due || '')}" /></label><label>Status<select name="status"><option ${person.status === 'Aktif' ? 'selected' : ''}>Aktif</option><option ${person.status === 'Pending' ? 'selected' : ''}>Pending</option><option ${person.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option><option ${person.status === 'Check-in' ? 'selected' : ''}>Check-in</option><option ${person.status === 'Maintenance hold' ? ... (line truncated to 2000 chars)
1861: }
1862: 
1863: function renderReservationsPanel() {
1864:   const backendState = JSON.parse(window.localStorage.getItem('onyx-admin-state') || 'null');
1865:   const applications = backendState?.applications || backendState?.data?.applications || [];
1866:   const rows = applications.map((item) => ({
1867:     code: item.id || '-',
1868:     guest: item.name || '-',
1869:     room: item.room || '-',
1870:     checkin: item.startDate || '-',
1871:     status: item.applicationStatus || 'Menunggu Review',
1872:     total: Number(item.monthlyBudget || 0),
1873:   }));
1874:   return `<section class="panel section-panel admin-page-panel" id="reservasi" data-section><div class="panel-head wrap"><div><span>Booking</span><h3>Reservasi aktif</h3></div><div class="actions no-print"><button class="button success" type="button"><i class="fa-solid fa-plus"></i>Tambah</button><button class="button subtle" type="button"><i class="fa-solid fa-filter"></i>Filter</button></div></div>${renderBookingTable(rows)}</section>`;
1875: }
1876: 
1877: /**
1878:  * @description Render tabel booking dengan status badge dan total harga.
1879:  * @param {Array<object>} rows Data reservasi.
1880:  * @returns {string} Markup tabel booking.
1881:  */
1882: function renderBookingTable(rows) {
1883:   if (!rows.length) return '<div class="empty admin-empty-state"><strong>Belum ada reservasi real.</strong><p>Data akan muncul setelah user melakukan pendaftaran.</p></div>';
1884:   return `<div class="table-wrap"><table><thead><tr><th>Kode</th><th>Tamu</th><th>Kamar</th><th>Check-in</th><th>Status</th><th>Total</th></tr></thead><tbody>${rows.map((row) => `<tr><td>${escapeHtml(row.code)}</td><td>${escapeHtml(row.guest)}</td><td>${escapeHtml(row.room)}</td><td>${escapeHtml(row.checkin)}</td><td><span class="badge ${slug(row.status)}">${escapeHtml(row.status)}</span></td><td>${rupiah(row.total)}</td></tr>`).join('')}</tbody></table></div>`;
1885: }
1886: 
1887: /**
1888:  * @description Render invoice print view sesuai fitur cetak PRD.
1889:  * @returns {string} Markup invoice.
1890:  */
1891: function renderCashflowPanel() {
1892:   const buyers = getAdminPaymentBuyers();
1893:   const { utilityMeters } = getAdminApplicationState();
1894:   if (!buyers.length) return '<section class="admin-page-panel cashflow-page" id="laporan" data-section><div class="empty admin-empty-state"><strong>Belum ada data cashflow.</strong><p>Laporan keuangan muncul setelah ada pendaftaran dan pembayaran resident.</p></div></section>';
1895: 
1896:   const paidBuyers = buyers.filter((item) => /Sudah bayar/i.test(item.paymentStatus || ''));
1897:   const reviewBuyers = buyers.filter((item) => /Menunggu review/i.test(item.paymentStatus || ''));
1898:   const rejectedBuyers = buyers.filter((item) => /Ditolak/i.test(item.paymentStatus || ''));
1899:   const unpaidBuyers = buyers.filter((item) => /Belum bayar/i.test(item.paymentStatus || ''));
1900:   const totalRevenue = buyers.reduce((sum, item) => sum + Number(item.totalPayment || 0), 0);
1901:   const paidRevenue = paidBuyers.reduce((sum, item) => sum + Number(item.totalPayment || 0), 0);
1902:   const outstanding = totalRevenue - paidRevenue;
1903:   const totalDeposit = buyers.reduce((sum, item) => sum + Number(item.deposit || 0), 0);
1904:   const utilityCost = utilityMeters.reduce((sum, item) => sum + Number(item.totalAmount || 0), 0);
1905:   const netCashflow = paidRevenue - utilityCost;
1906:   const collectionRate = totalRevenue ? Math.round((paidRevenue / totalRevenue) * 100) : 0;
1907:   const reviewAmount = reviewBuyers.reduce((sum, item) => sum + Number(item.totalPayment || 0), 0);
1908:   const rejectedAmount = rejectedBuyers.reduce((sum, item) => sum + Number(item.totalPayment || 0), 0);
1909:   const unpaidAmount = unpaidBuyers.reduce((sum, item) => sum + Number(item.totalPayment || 0), 0);
1910: 
1911:   const txRows = buyers.slice(0, 10).map((item) => {
1912:     const proof = item.proof || {};
1913:     const uploadedAt = proof.uploadedAt || proof.created_at || proof.createdAt || '-';
1914:     const proofStatus = String(proof.status || '').toLowerCase();
1915:     const statusLabel = /approved|recorded/i.test(proofStatus) ? '<i class="cf-badge cf-badge--paid">Lunas</i>' : /uploaded|review|menunggu/i.test(proofStatus) ? '<i class="cf-badge cf-badge--pending">Review</i>' : /reject|ditolak/i.test(proofStatus) ? '<i class="cf-badge cf-badge--rejected">Ditolak</i>' : '<i class="cf-badge cf-badge--unpaid">Belum</i>';
1916:     const initials = String(item.name || 'R').split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();
1917:     return `<tr><td><div class="cf-resident"><span class="cf-avatar">${escapeHtml(initials)}</span><div><strong>${escapeHtml(item.name || '-')}</strong><small>${escapeHtml(item.room || '-')}</small></div></div></td><td class="cf-amount">${rupiah(Number(item.totalPayment || 0))}</td><td>${escapeHtml(uploadedAt)}</td><td>${statusLabel}</td></tr>`;
1918:   }).join('');
1919: 
1920:   const now = new Date();
1921:   const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
1922:   const periodLabel = `${months[now.getMonth()]} ${now.getFullYear()}`;
1923: 
1924:   // Donut chart — distributions status pembayaran
1925:   const donutRadius = 52;
1926:   const donutStroke = 18;
1927:   const donutCirc = 2 * Math.PI * donutRadius;
1928:   const donutSegments = [
1929:     { count: paidBuyers.length, amount: paidRevenue, label: 'Lunas', color: '#8ff0bd', id: 'paid' },
1930:     { count: reviewBuyers.length, amount: reviewAmount, label: 'Review', color: '#ffcf66', id: 'review' },
1931:     { count: rejectedBuyers.length, amount: rejectedAmount, label: 'Ditolak', color: '#ff9d9d', id: 'rejected' },
1932:     { count: unpaidBuyers.length, amount: unpaidAmount, label: 'Belum', color: 'rgba(247,242,234,.22)', id: 'unpaid' },
1933:   ];
1934:   let donutOffset = 0;
1935:   const donutArcs = donutSegments.map((seg) => {
1936:     const pct = buyers.length ? seg.count / buyers.length : 0;
1937:     const dashLen = pct * donutCirc;
1938:     const dashGap = donutCirc - dashLen;
1939:     const offset = -donutOffset;
1940:     donutOffset += dashLen;
1941:     return `<circle cx="60" cy="60" r="${donutRadius}" fill="none" stroke="${seg.color}" stroke-width="${donutStroke}" stroke-dasharray="${dashLen} ${dashGap}" stroke-dashoffset="${offset}" stroke-linecap="butt" />`;
1942:   }).join('');
1943: 
1944:   const donutLegend = donutSegments.map((seg) => {
1945:     const pct = buyers.length ? Math.round((seg.count / buyers.length) * 100) : 0;
1946:     return `<div class="cf-donut__item"><i class="cf-dot cf-dot--${seg.id}" style="background:${seg.color}"></i><span>${escapeHtml(seg.label)}</span><em>${seg.count} · ${pct}%</em><b>${rupiah(seg.amount)}</b></div>`;
1947:   }).join('');
1948: 
1949:   // Bar chart — komposisi keuangan

(Showing lines 1670-1949 of 3298. Use offset=1950 to continue.)
</content>
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 50.6s)

**Tool: apply_patch**

**Input:**
```json
{
  "patchText": "*** Begin Patch\n*** Update File: fe/src/main.js\n@@\n   document.querySelector('#printCashflow')?.addEventListener('click', () => window.print());\n+\n+  document.querySelectorAll('[data-admin-quick-section]').forEach((button) => {\n+    button.addEventListener('click', () => {\n+      state.activeAdminSection = button.dataset.adminQuickSection || 'dashboard';\n+      state.adminRoomDetail = null;\n+      state.adminPaymentDetailId = null;\n+      state.adminDetailType = '';\n+      refreshAdminStateForSection(state.activeAdminSection);\n+    });\n+  });\n+\n+  document.querySelectorAll('[data-open-resident-portal]').forEach((button) => {\n+    button.addEventListener('click', () => openResidentPortalFromAdmin(button.dataset.openResidentPortal || 'overview', button.dataset.residentId || ''));\n+  });\n+\n+  document.querySelectorAll('[data-admin-open-room-feature]').forEach((button) => {\n+    button.addEventListener('click', () => {\n+      const feature = button.dataset.adminOpenRoomFeature || 'overview';\n+      const resident = getPrimaryAdminResident();\n+      const preferredRoom = getRoomCode(resident?.room || '');\n+      const room = getRooms().find((item) => item.no === preferredRoom) || getRooms()[0];\n+      if (!room) return showToast('Belum ada kamar untuk dibuka.');\n+      state.activeAdminSection = 'kamar';\n+      state.adminRoomDetail = room.no;\n+      state.activeRoomDetailSection = feature;\n+      state.isRoomCreateOpen = false;\n+      renderApp();\n+    });\n+  });\n+\n+  document.querySelector('#adminToggleSmartLock')?.addEventListener('click', async () => {\n+    const accessState = JSON.parse(window.localStorage.getItem('onyx-access-state') || '{\"locked\":true,\"guestPass\":\"QR-ONYX-5274\",\"validUntil\":\"22:00\"}');\n+    const nextState = { ...accessState, locked: !accessState.locked };\n+    prepareResidentPortalPreview('access');\n+    window.localStorage.setItem('onyx-access-state', JSON.stringify(nextState));\n+    saveAccessLog(nextState.locked ? 'Admin locked room' : 'Admin unlocked room', 'Smart Access admin panel', nextState.locked ? 'locked' : 'unlocked');\n+    await saveAccessStateToBackend(nextState, nextState.locked ? 'Admin locked room' : 'Admin unlocked room', 'Smart Access admin panel', nextState.locked ? 'locked' : 'unlocked');\n+    state.activeAdminSection = 'access';\n+    showToast(nextState.locked ? 'Kamar dikunci.' : 'Kamar dibuka.');\n+    renderApp();\n+  });\n+\n+  document.querySelector('#seedIotDemo')?.addEventListener('click', () => {\n+    const now = new Date().toISOString();\n+    const rows = getRooms().slice(0, 4).map((room, index) => ({\n+      id: Date.now() + index,\n+      roomCode: room.no,\n+      temperature: 24 + index,\n+      humidity: 62 - index,\n+      powerWatt: 180 + (index * 45),\n+      energyKwh: Number((12.5 + index).toFixed(2)),\n+      waterM3: Number((3.2 + (index * 0.4)).toFixed(2)),\n+      acOn: getRoomClimateType(room) === 'ac',\n+      lightOn: true,\n+      waterOn: true,\n+      created_at: now,\n+    }));\n+    window.localStorage.setItem('onyx-iot-telemetry', JSON.stringify(rows));\n+    showToast('Demo IoT telemetry dibuat agar monitoring terlihat.');\n+    renderApp();\n+  });\n+\n+  document.querySelector('#adminServiceTicketForm')?.addEventListener('submit', async (event) => {\n+    event.preventDefault();\n+    const form = new FormData(event.currentTarget);\n+    const issue = String(form.get('issue') || '').trim();\n+    if (!issue) return;\n+    const resident = getPrimaryAdminResident();\n+    const ticket = {\n+      id: `TKT-${Date.now()}`,\n+      application_id: String(form.get('application_id') || resident?.id || ''),\n+      category: String(form.get('category') || 'Service'),\n+      priority: String(form.get('priority') || 'Normal'),\n+      issue,\n+      status: 'open',\n+      createdAt: new Date().toISOString(),\n+    };\n+    const tickets = getAdminServiceTickets();\n+    const nextTickets = [ticket, ...tickets];\n+    window.localStorage.setItem('onyx-admin-service-tickets', JSON.stringify(nextTickets));\n+    window.localStorage.setItem('onyx-resident-tickets', JSON.stringify(nextTickets));\n+    prepareResidentPortalPreview('service', resident);\n+    try { await apiJson('service-ticket.php', { method: 'POST', body: JSON.stringify(ticket) }); } catch (error) { showToast('Backend tiket belum tersambung, tiket disimpan lokal.'); }\n+    state.activeAdminSection = 'tickets';\n+    showToast('Service ticket berhasil dibuat.');\n+    renderApp();\n+  });\n \n   // Event login: admin dan resident sama-sama validasi password lewat backend.\n   document.querySelector('#loginForm')?.addEventListener('submit', (event) => {\n*** End Patch"
}
```

**Output:**
```
Success. Updated the following files:
M fe/src/main.js
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 16.7s)

**Tool: bash**

**Input:**
```json
{
  "command": "node --check \"fe/src/main.js\"",
  "timeout": 120000,
  "workdir": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS",
  "description": "Checks JavaScript syntax"
}
```

**Output:**
```
(no output)
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 10.1s)

**Tool: grep**

**Input:**
```json
{
  "pattern": "admin-discovery|admin-feature|admin-portal|admin-ops-row|admin-access|admin-ticket",
  "include": "styles.css",
  "path": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src",
  "output_mode": "content",
  "head_limit": 120
}
```

**Output:**
```
No matches found
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 23.5s)

**Tool: apply_patch**

**Input:**
```json
{
  "patchText": "*** Begin Patch\n*** Update File: fe/src/styles.css\n@@\n button { cursor: pointer; }\n a { color: inherit; text-decoration: none; }\n+.admin-discovery-grid,\n+.admin-portal-grid,\n+.admin-access-grid {\n+  display: grid;\n+  grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));\n+  gap: 1rem;\n+  margin: 1rem 0;\n+}\n+.admin-discovery-grid article,\n+.admin-portal-grid article,\n+.admin-portal-grid button,\n+.admin-access-grid article,\n+.admin-feature-panel {\n+  border: 1px solid var(--line);\n+  border-radius: var(--radius-lg);\n+  background: var(--surface);\n+  box-shadow: var(--shadow);\n+}\n+.admin-discovery-grid article,\n+.admin-portal-grid article,\n+.admin-portal-grid button,\n+.admin-access-grid article {\n+  padding: 1rem;\n+}\n+.admin-discovery-grid span,\n+.admin-feature-panel .panel-head span,\n+.admin-portal-grid span,\n+.admin-access-grid span {\n+  color: var(--accent);\n+  font-size: .72rem;\n+  font-weight: 800;\n+  letter-spacing: .08em;\n+  text-transform: uppercase;\n+}\n+.admin-discovery-grid h3,\n+.admin-discovery-grid p,\n+.admin-portal-grid p,\n+.admin-access-grid p { margin: .35rem 0 .75rem; }\n+.admin-feature-panel { padding: 1.1rem; }\n+.admin-feature-actions {\n+  display: flex;\n+  flex-wrap: wrap;\n+  gap: .65rem;\n+  margin: 1rem 0;\n+}\n+.admin-ops-table { display: grid; gap: .55rem; }\n+.admin-ops-row {\n+  display: grid;\n+  grid-template-columns: minmax(12rem, 1.5fr) repeat(3, minmax(5rem, .7fr));\n+  gap: .75rem;\n+  align-items: center;\n+  padding: .78rem .9rem;\n+  border: 1px solid var(--line-soft);\n+  border-radius: var(--radius-md);\n+  background: var(--surface-soft);\n+}\n+.admin-ops-row--head {\n+  color: var(--muted);\n+  font-size: .75rem;\n+  font-weight: 800;\n+  text-transform: uppercase;\n+}\n+.admin-ops-row div { display: grid; gap: .16rem; }\n+.admin-ops-row small,\n+.admin-ops-row i { color: var(--muted); font-style: normal; }\n+.admin-ticket-form {\n+  display: grid;\n+  grid-template-columns: repeat(2, minmax(9rem, 1fr)) minmax(14rem, 2fr) auto;\n+  gap: .8rem;\n+  align-items: end;\n+  margin: 1rem 0;\n+}\n+.admin-ticket-form label { display: grid; gap: .32rem; color: var(--muted); font-weight: 700; }\n+.admin-ticket-form input,\n+.admin-ticket-form select {\n+  min-height: 2.6rem;\n+  border: 1px solid var(--line);\n+  border-radius: var(--radius-sm);\n+  padding: .55rem .7rem;\n+  background: #fff;\n+}\n+.admin-portal-grid button {\n+  text-align: left;\n+  display: grid;\n+  gap: .35rem;\n+  color: var(--ink);\n+}\n+.admin-portal-grid button i { color: var(--accent); font-size: 1.2rem; }\n+.admin-portal-grid button small { color: var(--muted); }\n #app {\n*** End Patch"
}
```

**Output:**
```
Success. Updated the following files:
M fe/src/styles.css
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 13.0s)

Found root cause: fitur ada, tapi resident-only + admin nav tak expose. Adding admin entrypoints.

**Tool: todowrite**

**Input:**
```json
{
  "todos": [
    {
      "content": "Audit kode UI/API terkait resident Utilities, Smart Access, Service Ticket, IoT",
      "status": "completed",
      "priority": "high"
    },
    {
      "content": "Rancang perbaikan discoverability supaya use case tester bisa menemukan fitur",
      "status": "completed",
      "priority": "high"
    },
    {
      "content": "Implementasikan UI/admin entrypoint dan handler yang dibutuhkan",
      "status": "in_progress",
      "priority": "high"
    },
    {
      "content": "Build dan verifikasi perubahan frontend",
      "status": "pending",
      "priority": "medium"
    },
    {
      "content": "Laporkan hasil dan langkah deploy",
      "status": "pending",
      "priority": "medium"
    }
  ]
}
```

**Output:**
```
[
  {
    "content": "Audit kode UI/API terkait resident Utilities, Smart Access, Service Ticket, IoT",
    "status": "completed",
    "priority": "high"
  },
  {
    "content": "Rancang perbaikan discoverability supaya use case tester bisa menemukan fitur",
    "status": "completed",
    "priority": "high"
  },
  {
    "content": "Implementasikan UI/admin entrypoint dan handler yang dibutuhkan",
    "status": "in_progress",
    "priority": "high"
  },
  {
    "content": "Build dan verifikasi perubahan frontend",
    "status": "pending",
    "priority": "medium"
  },
  {
    "content": "Laporkan hasil dan langkah deploy",
    "status": "pending",
    "priority": "medium"
  }
]
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 26.9s)

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src\\main.js",
  "offset": 1915,
  "limit": 140
}
```

**Output:**
```
<path>C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\main.js</path>
<type>file</type>
<content>
1915:     const statusLabel = /approved|recorded/i.test(proofStatus) ? '<i class="cf-badge cf-badge--paid">Lunas</i>' : /uploaded|review|menunggu/i.test(proofStatus) ? '<i class="cf-badge cf-badge--pending">Review</i>' : /reject|ditolak/i.test(proofStatus) ? '<i class="cf-badge cf-badge--rejected">Ditolak</i>' : '<i class="cf-badge cf-badge--unpaid">Belum</i>';
1916:     const initials = String(item.name || 'R').split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();
1917:     return `<tr><td><div class="cf-resident"><span class="cf-avatar">${escapeHtml(initials)}</span><div><strong>${escapeHtml(item.name || '-')}</strong><small>${escapeHtml(item.room || '-')}</small></div></div></td><td class="cf-amount">${rupiah(Number(item.totalPayment || 0))}</td><td>${escapeHtml(uploadedAt)}</td><td>${statusLabel}</td></tr>`;
1918:   }).join('');
1919: 
1920:   const now = new Date();
1921:   const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
1922:   const periodLabel = `${months[now.getMonth()]} ${now.getFullYear()}`;
1923: 
1924:   // Donut chart — distributions status pembayaran
1925:   const donutRadius = 52;
1926:   const donutStroke = 18;
1927:   const donutCirc = 2 * Math.PI * donutRadius;
1928:   const donutSegments = [
1929:     { count: paidBuyers.length, amount: paidRevenue, label: 'Lunas', color: '#8ff0bd', id: 'paid' },
1930:     { count: reviewBuyers.length, amount: reviewAmount, label: 'Review', color: '#ffcf66', id: 'review' },
1931:     { count: rejectedBuyers.length, amount: rejectedAmount, label: 'Ditolak', color: '#ff9d9d', id: 'rejected' },
1932:     { count: unpaidBuyers.length, amount: unpaidAmount, label: 'Belum', color: 'rgba(247,242,234,.22)', id: 'unpaid' },
1933:   ];
1934:   let donutOffset = 0;
1935:   const donutArcs = donutSegments.map((seg) => {
1936:     const pct = buyers.length ? seg.count / buyers.length : 0;
1937:     const dashLen = pct * donutCirc;
1938:     const dashGap = donutCirc - dashLen;
1939:     const offset = -donutOffset;
1940:     donutOffset += dashLen;
1941:     return `<circle cx="60" cy="60" r="${donutRadius}" fill="none" stroke="${seg.color}" stroke-width="${donutStroke}" stroke-dasharray="${dashLen} ${dashGap}" stroke-dashoffset="${offset}" stroke-linecap="butt" />`;
1942:   }).join('');
1943: 
1944:   const donutLegend = donutSegments.map((seg) => {
1945:     const pct = buyers.length ? Math.round((seg.count / buyers.length) * 100) : 0;
1946:     return `<div class="cf-donut__item"><i class="cf-dot cf-dot--${seg.id}" style="background:${seg.color}"></i><span>${escapeHtml(seg.label)}</span><em>${seg.count} · ${pct}%</em><b>${rupiah(seg.amount)}</b></div>`;
1947:   }).join('');
1948: 
1949:   // Bar chart — komposisi keuangan
1950:   const finBars = [
1951:     { label: 'Pemasukan', value: paidRevenue, color: '#8ff0bd' },
1952:     { label: 'Outstanding', value: outstanding, color: '#ffcf66' },
1953:     { label: 'Deposit', value: totalDeposit, color: '#60a5fa' },
1954:     { label: 'Biaya Utilitas', value: utilityCost, color: '#ff9d9d' },
1955:   ];
1956:   const finMax = Math.max(...finBars.map((b) => b.value), 1);
1957:   const finBarHtml = finBars.map((bar) => {
1958:     const pct = Math.round((bar.value / finMax) * 100);
1959:     return `<div class="cf-bar-chart__row"><span class="cf-bar-chart__label">${escapeHtml(bar.label)}</span><div class="cf-bar-chart__fill-wrap"><div class="cf-bar-chart__fill" style="width:${pct}%;background:${bar.color}"></div></div><strong class="cf-bar-chart__value">${rupiah(bar.value)}</strong></div>`;
1960:   }).join('');
1961: 
1962:   return `<section class="admin-page-panel cashflow-page" id="laporan" data-section>
1963:     <div class="cf-hero">
1964:       <div class="cf-hero__lead"><span class="cf-eyebrow">Financial Report</span><h3>Arus Kas Bisnis</h3><p>Ringkasan pemasukan, piutang, dan biaya utilitas periode berjalan.</p></div>
1965:       <div class="cf-hero__total"><span class="cf-hero__label">Total Nilai Transaksi</span><strong class="cf-hero__value">${rupiah(totalRevenue)}</strong><div class="cf-hero__meta"><small>${buyers.length} transaksi · ${periodLabel}</small><button class="cf-print-btn no-print" type="button" id="printCashflow"><i class="fa-solid fa-print"></i> Cetak Laporan</button></div></div>
1966:     </div>
1967:     <div class="cf-metrics">
1968:       <article class="cf-metric cf-metric--paid">
1969:         <div class="cf-metric__icon"><i class="fa-solid fa-circle-check"></i></div>
1970:         <div class="cf-metric__body"><span>Pemasukan</span><strong>${rupiah(paidRevenue)}</strong><small>${paidBuyers.length} resident lunas · ${collectionRate}% collected</small></div>
1971:       </article>
1972:       <article class="cf-metric cf-metric--outstanding">
1973:         <div class="cf-metric__icon"><i class="fa-solid fa-hourglass-half"></i></div>
1974:         <div class="cf-metric__body"><span>Outstanding</span><strong>${rupiah(outstanding)}</strong><small>${reviewBuyers.length + rejectedBuyers.length + unpaidBuyers.length} resident belum selesai</small></div>
1975:       </article>
1976:       <article class="cf-metric cf-metric--deposit">
1977:         <div class="cf-metric__icon"><i class="fa-solid fa-piggy-bank"></i></div>
1978:         <div class="cf-metric__body"><span>Deposit</span><strong>${rupiah(totalDeposit)}</strong><small>Dari ${buyers.length} resident aktif</small></div>
1979:       </article>
1980:       <article class="cf-metric cf-metric--cost">
1981:         <div class="cf-metric__icon"><i class="fa-solid fa-bolt"></i></div>
1982:         <div class="cf-metric__body"><span>Biaya Utilitas</span><strong>${rupiah(utilityCost)}</strong><small>${utilityMeters.length} meter tercatat</small></div>
1983:       </article>
1984:     </div>
1985:     <div class="cf-charts">
1986:       <article class="cf-card cf-card--donut">
1987:         <header class="cf-card__head">
1988:           <div><h4>Distribusi Status Pembayaran</h4><p>Proporsi per status transaksi</p></div>
1989:           <small>${collectionRate}% collected</small>
1990:         </header>
1991:         <div class="cf-donut">
1992:           <svg class="cf-donut__ring" viewBox="0 0 120 120">
1993:             <circle cx="60" cy="60" r="${donutRadius}" fill="none" stroke="rgba(247,242,234,.06)" stroke-width="${donutStroke}" />
1994:             ${donutArcs}
1995:           </svg>
1996:           <div class="cf-donut__center">
1997:             <strong>${collectionRate}%</strong>
1998:             <span>Collection Rate</span>
1999:           </div>
2000:         </div>
2001:         <div class="cf-donut__legend">${donutLegend}</div>
2002:       </article>
2003:       <article class="cf-card cf-card--bars">
2004:         <header class="cf-card__head">
2005:           <div><h4>Komposisi Keuangan</h4><p>Perbandingan arus kas utama</p></div>
2006:           <small>Net ${rupiah(netCashflow)}</small>
2007:         </header>
2008:         <div class="cf-bar-chart">${finBarHtml}</div>
2009:       </article>
2010:     </div>
2011:     <div class="cf-stack">
2012:       <div class="cf-split">
2013:         <article class="cf-card cf-card--table">
2014:           <header class="cf-card__head"><div><h4>Riwayat Transaksi</h4><p>10 transaksi terakhir</p></div></header>
2015:           <div class="cf-table-wrap">
2016:             <table class="cf-table">
2017:               <thead><tr><th>Resident</th><th>Nominal</th><th>Tanggal</th><th>Status</th></tr></thead>
2018:               <tbody>${txRows || '<tr><td colspan="4"><div class="empty admin-empty-state"><strong>Belum ada transaksi.</strong></div></td></tr>'}</tbody>
2019:             </table>
2020:           </div>
2021:         </article>
2022:         <article class="cf-card cf-card--summary">
2023:           <header class="cf-card__head"><div><h4>Ringkasan Cashflow</h4><p>Net periode ini</p></div></header>
2024:           <dl class="cf-summary">
2025:             <div><dt>Pemasukan</dt><dd class="cf-summary__paid">${rupiah(paidRevenue)}</dd></div>
2026:             <div><dt>Deposit Terkumpul</dt><dd>${rupiah(totalDeposit)}</dd></div>
2027:             <div><dt>Biaya Utilitas</dt><dd class="cf-summary__cost">− ${rupiah(utilityCost)}</dd></div>
2028:             <div class="cf-summary__total"><dt>Net Cashflow</dt><dd>${rupiah(netCashflow)}</dd></div>
2029:           </dl>
2030:         </article>
2031:       </div>
2032:     </div>
2033:   </section>`;
2034: }
2035: 
2036: /**
2037:  * @description Mengikat event interaksi setelah render selesai.
2038:  * @returns {void}
2039:  */
2040: function bindEvents() {
2041:   initScrollSequences();
2042: 
2043:   // Event navigasi umum: semua elemen data-route berpindah halaman tanpa reload penuh.
2044:   document.querySelectorAll('[data-route]').forEach((element) => {
2045:     element.addEventListener('click', (event) => {
2046:       event.preventDefault();
2047:       navigate(element.dataset.route);
2048:     });
2049:   });
2050: 
2051:   document.querySelectorAll('input[type="date"]').forEach((input) => {
2052:     input.addEventListener('focus', () => input.showPicker?.());
2053:     input.addEventListener('click', () => input.showPicker?.());
2054:     input.addEventListener('keydown', (event) => event.preventDefault());

(Showing lines 1915-2054 of 3385. Use offset=2055 to continue.)
</content>
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 25.6s)

**Tool: bash**

**Input:**
```json
{
  "command": "node --check \"fe/src/main.js\"",
  "timeout": 120000,
  "workdir": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS",
  "description": "Checks updated JavaScript syntax"
}
```

**Output:**
```
(no output)
```

**Tool: grep**

**Input:**
```json
{
  "pattern": "admin-discovery-grid|renderAdminUtilitiesPanel|renderAdminIotPanel|renderAdminAccessPanel|renderAdminServiceTicketsPanel|renderAdminResidentPortalPanel|data-open-resident-portal|adminToggleSmartLock|seedIotDemo|adminServiceTicketForm",
  "include": "main.js",
  "path": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src",
  "output_mode": "content",
  "head_limit": 200
}
```

**Output:**
```
Found 25 match(es) in 1 file(s)

C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\main.js
  1538: if (state.activeAdminSection === 'utilities') return renderAdminUtilitiesPanel();
  1539: if (state.activeAdminSection === 'iot') return renderAdminIotPanel();
  1540: if (state.activeAdminSection === 'access') return renderAdminAccessPanel();
  1541: if (state.activeAdminSection === 'tickets') return renderAdminServiceTicketsPanel();
  1542: if (state.activeAdminSection === 'resident-portal') return renderAdminResidentPortalPanel();
  1572: <section class="admin-discovery-grid no-print" aria-label="Resident Portal, Utilities, IoT Monitoring, Smart Access, Visitor Pass, Service Tickets">
  1573: <article><span>Resident Portal</span><h3>Utilities · Access · Service</h3><p>Buka portal penghuni langsung dari akun admin untuk QA dan operasional.</p><button class="row-print-btn row-print-btn--gold" type="button" data-open-resident-portal="overview">Open Resident Portal</button></article>
  1587: function renderAdminUtilitiesPanel() {
  1596: <div class="panel-head wrap"><div><span>Utilities</span><h3>Utility Meter Charges</h3><p>Listrik, air, dan tagihan meter yang masuk ke billing penghuni.</p></div><button class="button primary" type="button" data-open-resident-portal="utilities"><i class="fa-solid fa-user-shield"></i>Open Resident Utilities</button></div>
  1598: <div class="admin-feature-actions no-print"><button class="row-print-btn row-print-btn--gold" type="button" data-admin-open-room-feature="meter">Input Meter & Tagihan</button><button class="row-print-btn" type="button" data-open-resident-portal="billing">View Billing Invoice</button><button class="row-print-btn" type="button" id="refreshPayments">Refresh backend</button></div>
  1603: function renderAdminIotPanel() {
  1613: <div class="admin-feature-actions no-print"><button class="row-print-btn row-print-btn--gold" type="button" id="seedIotDemo">Seed demo telemetry</button><button class="row-print-btn" type="button" data-open-resident-portal="utilities">Open Resident Utilities</button><button class="row-print-btn" type="button" id="refreshPayments">Refresh IoT</button></div>
  1618: function renderAdminAccessPanel() {
  1625: <div class="panel-head wrap"><div><span>Smart Access</span><h3>Access State & Visitor Pass</h3><p>Kelola lock state, QR tamu, WiFi share, dan access logs resident.</p></div><button class="button primary" type="button" data-open-resident-portal="access"><i class="fa-solid fa-door-closed"></i>Open Resident Access</button></div>
  1626: [Omitted long matching line]
  1631: function renderAdminServiceTicketsPanel() {
  1636: <div class="panel-head wrap"><div><span>Service Ticketing</span><h3>Resident Service Tickets</h3><p>Buat dan review request perbaikan, kebersihan, WiFi, AC, air, atau listrik.</p></div><button class="button primary" type="button" data-open-resident-portal="service"><i class="fa-solid fa-user-shield"></i>Open Resident Service</button></div>
  1637: <form class="admin-ticket-form no-print" id="adminServiceTicketForm"><input type="hidden" name="application_id" value="${escapeHtml(resident?.id || '')}" /><label>Kategori<select name="category"><option>Maintenance</option><option>WiFi</option><option>Listrik</option><option>Air</option><option>Kebersihan</option></select></label><label>Prioritas<select name="priority"><option>Normal</option><option>High</option><option>Urgent</option></select></label><label class="admin-ticket-form__issue">Issue<input name="issue" placeholder="Contoh: AC kurang dingin / lampu mati" required /></label><button class="button primary" type="submit">Create Service Ticket</button></form>
  1642: function renderAdminResidentPortalPanel() {
  1645: <div class="panel-head wrap"><div><span>Resident Portal</span><h3>Resident-facing Tools</h3><p>Entry point eksplisit untuk QA: Billing, Utilities, Smart Access, Visitor Pass, dan Service Ticketing.</p></div><button class="button primary" type="button" data-open-resident-portal="overview"><i class="fa-solid fa-user-shield"></i>Launch Resident Portal</button></div>
  1646: <div class="admin-portal-grid"><article><span>Resident</span><strong>${escapeHtml(resident?.name || 'Demo Resident')}</strong><p>${escapeHtml(resident?.room || '-')}</p></article><button type="button" data-open-resident-portal="billing"><i class="fa-solid fa-receipt"></i><span>Billing</span><small>Invoices, QRIS, manual transfer</small></button><button type="button" data-open-resident-portal="utilities"><i class="fa-solid fa-bolt"></i><span>Utilities</span><small>Meter charges & IoT usage</small></button><button type="button" data-open-resident-portal="access"><i class="fa-solid fa-door-closed"></i><span>Smart Access</span><small>Visitor Pass, WiFi, access logs</small></button><button type="button" data-open-resident-portal="service"><i class="fa-solid fa-screwdriver-wrench"></i><span>Service Tickets</span><small>Create and review requests</small></button></div>
  2089: document.querySelectorAll('[data-open-resident-portal]').forEach((button) => {
  2108: document.querySelector('#adminToggleSmartLock')?.addEventListener('click', async () => {
  2120: document.querySelector('#seedIotDemo')?.addEventListener('click', () => {
  2140: document.querySelector('#adminServiceTicketForm')?.addEventListener('submit', async (event) => {

```

**Tool: grep**

**Input:**
```json
{
  "pattern": "admin-discovery-grid|admin-feature-panel|admin-ops-row|admin-ticket-form|admin-portal-grid|admin-access-grid",
  "include": "styles.css",
  "path": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src",
  "output_mode": "content",
  "head_limit": 120
}
```

**Output:**
```
Found 33 match(es) in 1 file(s)

C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\styles.css
  36: .admin-discovery-grid,
  37: .admin-portal-grid,
  38: .admin-access-grid {
  44: .admin-discovery-grid article,
  45: .admin-portal-grid article,
  46: .admin-portal-grid button,
  47: .admin-access-grid article,
  48: .admin-feature-panel {
  54: .admin-discovery-grid article,
  55: .admin-portal-grid article,
  56: .admin-portal-grid button,
  57: .admin-access-grid article {
  60: .admin-discovery-grid span,
  61: .admin-feature-panel .panel-head span,
  62: .admin-portal-grid span,
  63: .admin-access-grid span {
  70: .admin-discovery-grid h3,
  71: .admin-discovery-grid p,
  72: .admin-portal-grid p,
  73: .admin-access-grid p { margin: .35rem 0 .75rem; }
  74: .admin-feature-panel { padding: 1.1rem; }
  82: .admin-ops-row {
  92: .admin-ops-row--head {
  98: .admin-ops-row div { display: grid; gap: .16rem; }
  99: .admin-ops-row small,
  100: .admin-ops-row i { color: var(--muted); font-style: normal; }
  101: .admin-ticket-form {
  108: .admin-ticket-form label { display: grid; gap: .32rem; color: var(--muted); font-weight: 700; }
  109: .admin-ticket-form input,
  110: .admin-ticket-form select {
  117: .admin-portal-grid button {
  123: .admin-portal-grid button i { color: var(--accent); font-size: 1.2rem; }
  124: .admin-portal-grid button small { color: var(--muted); }

```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 33.0s)

**Tool: apply_patch**

**Input:**
```json
{
  "patchText": "*** Begin Patch\n*** Update File: fe/src/main.js\n@@\n function clearResidentSession() {\n   deleteCookie('onyx-resident-auth');\n   window.localStorage.removeItem('onyx-resident-auth');\n   window.sessionStorage.removeItem('onyx-resident-session');\n+  window.sessionStorage.removeItem('onyx-resident-preview-session');\n }\n@@\n function prepareResidentPortalPreview(section = 'overview', resident = null) {\n@@\n   window.localStorage.setItem('onyx-resident-account', JSON.stringify(previewResident));\n   window.sessionStorage.setItem('onyx-resident-session', 'true');\n+  window.sessionStorage.setItem('onyx-resident-preview-session', 'true');\n   state.activeResidentSection = section;\n*** End Patch"
}
```

**Output:**
```
Success. Updated the following files:
M fe/src/main.js
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 11.1s)

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src\\main.js",
  "offset": 1407,
  "limit": 50
}
```

**Output:**
```
<path>C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\main.js</path>
<type>file</type>
<content>
1407:     : `<div class="billing-table-wrap"><table class="billing-table"><thead><tr><th>Kode</th><th>Tagihan</th><th>Mulai</th><th>Jatuh tempo</th><th>Nominal</th><th>Status</th><th>Aksi</th></tr></thead><tbody>${invoices.map((invoice) => renderBillingTableRow(invoice)).join('')}</tbody></table></div>${renderResidentPrintableReceipt()}${state.manualTransferInvoice ? renderManualTransferModal() : ''}`;
1408:   return `<article class="resident-saas-panel ${compact ? 'resident-saas-panel--large' : 'resident-saas-panel--full'}"><div class="resident-panel-title"><div><span>Billing</span><h2>${compact ? 'Latest Invoices' : 'Pembayaran & Invoice'}</h2></div></div>${compact ? '' : renderPaymentCountdown()}${content}</article>`;
1409: }
1410: 
1411: function renderBillingTableRow(invoice) {
1412:   const status = invoice.status || '-';
1413:   const isPending = status === 'Pending';
1414:   const amountValue = String(invoice.amount || '').replace(/[^0-9]/g, '');
1415:   const payActions = isPending
1416:     ? `<button class="row-print-btn" type="button" data-pay-invoice="${escapeHtml(invoice.code)}" data-pay-item="${escapeHtml(invoice.item)}" data-pay-amount="${amountValue}">QRIS</button><button class="row-print-btn row-print-btn--gold" type="button" data-transfer-invoice="${escapeHtml(invoice.code)}" data-transfer-item="${escapeHtml(invoice.item)}" data-transfer-amount="${escapeHtml(invoice.amount)}">TF</button>`
1417:     : '<span class="row-paid-mark">Paid</span>';
1418:   return `<tr><td data-label="Kode"><strong>${escapeHtml(invoice.code)}</strong></td><td data-label="Tagihan">${escapeHtml(invoice.item)}</td><td data-label="Mulai">${escapeHtml(invoice.date || '-')}</td><td data-label="Jatuh tempo">${escapeHtml(invoice.due || '-')}</td><td data-label="Nominal"><em>${escapeHtml(invoice.amount)}</em></td><td data-label="Status"><i class="status-${slug(status)}">${escapeHtml(status)}</i></td><td data-label="Aksi"><div class="billing-table__actions">${payActions}<button class="row-print-btn" type="button" data-print-invoice="${escapeHtml(invoice.code)}" data-print-item="${escapeHtml(invoice.item)}" data-print-amount="${escapeHtml(invoice.amount)}" data-print-status="${escapeHtml(status)}">Print</button></div></td></tr>`;
1419: }
1420: 
1421: function renderPaymentCountdown() {
1422:   const cycle = getBillingCycle();
1423:   const resident = getCurrentResident();
1424:   const utility = getLatestResidentUtility(resident);
1425:   const dueDate = getResidentLeaseDueDate(resident, cycle.currentDue);
1426:   return `<section class="payment-countdown"><div><span>Jatuh Tempo</span><strong>${formatInvoiceDate(dueDate)}</strong><small>Berdasarkan ${escapeHtml(resident.duration || '1')} ${escapeHtml(resident.leaseType || 'periode')} · ${escapeHtml(resident.room || 'kamar belum dipilih')}</small></div><div><span>Utilitas</span><strong>${Number(utility.electricKwh || 0)} kWh · ${Number(utility.waterM3 || 0)} m³</strong><small>${utility.totalAmount ? rupiah(Number(utility.totalAmount)) : 'Belum ada input meter admin'}</small></div><div><span>Gateway</span><strong>QRIS BAYAR GG / TF</strong><small>QRIS sampai Rp 500.000. Nominal besar gunakan transfer manual.</small></div></section>`;
1427: }
1428: 
1429: function renderManualTransferModal() {
1430:   const invoice = state.manualTransferInvoice || {};
1431:   const message = encodeURIComponent(`Halo Admin Onyx, saya ingin konfirmasi transfer untuk ${invoice.code || 'invoice'} - ${invoice.item || 'tagihan'} sebesar ${invoice.amount || '-'}.`);
1432:   return `<div class="resident-modal" role="dialog" aria-modal="true"><div class="resident-modal__card resident-transfer-modal"><div class="resident-panel-title"><div><span>Transfer Manual</span><h2>${escapeHtml(invoice.code || 'Invoice')}</h2></div><button class="row-print-btn" type="button" id="closeTransferModal">Close</button></div><div class="transfer-instruction"><p><span>Tagihan</span><strong>${escapeHtml(invoice.item || '-')}</strong></p><p><span>Nominal</span><strong>${escapeHtml(invoice.amount || '-')}</strong></p><p><span>Bank</span><strong>${manualTransferAccount.bank}</strong></p><p><span>No. Rekening</span><strong>${manualTransferAccount.number}</strong></p><p><span>Atas Nama</span><strong>${manualTransferAccount.holder}</strong></p></div><div class="transfer-actions"><button class="onyx-cta" type="button" data-copy-value="${manualTransferAccount.number}" data-access-action="copy-transfer-account">Copy Rekening</button><a class="onyx-secondary" href="https://wa.me/${manualTransferAccount.whatsapp}?text=${message}" target="_blank" rel="noopener noreferrer">Konfirmasi WA</a></div><small class="transfer-note">Setelah transfer, kirim bukti pembayaran via WhatsApp admin. Status invoice akan diubah setelah admin verifikasi.</small></div></div>`;
1433: }
1434: 
1435: function renderResidentUtilities(compact = false) {
1436:   const resident = getCurrentResident();
1437:   const rows = getResidentUtilityRows(resident);
1438:   const latest = rows[0] || { electricKwh: 0, waterM3: 0, totalAmount: 0, month: 'Belum diset' };
1439:   const electricHeight = Math.min(100, Math.max(8, Number(latest.electricKwh || 0)));
1440:   const waterHeight = Math.min(100, Math.max(8, Number(latest.waterM3 || 0) * 4));
1441:   const amountHeight = Math.min(100, Math.max(8, Number(latest.totalAmount || 0) / 5000));
1442:   return `<article class="resident-saas-panel ${compact ? 'resident-saas-panel--large' : 'resident-saas-panel--full'}"><div class="resident-panel-title"><div><span>Utilities</span><h2>Listrik & Air</h2></div></div><div class="utility-chart"><div class="utility-chart__bars"><span style="height:${electricHeight}%"><b>${Number(latest.electricKwh || 0)}</b><small>kWh</small></span><span style="height:${waterHeight}%"><b>${Number(latest.waterM3 || 0)}</b><small>m³</small></span><span style="height:${amountHeight}%"><b>${Math.round(Number(latest.totalAmount || 0) / 1000)}k</b><small>Rp</small></span></div><div class="utility-chart__legend"><p><i></i>Electricity · ${Number(latest.electricKwh || 0)} kWh</p><p><i></i>Water · ${Number(latest.waterM3 || 0)} m³</p><p><i></i>Tagihan · ${latest.totalAmount ? rupiah(Number(latest.totalAmount)) : 'Menunggu input admin'}</p></div></div>${compact ? '' : `<div class="utility-history"><div class="resident-panel-title"><div><span>History</span><h2>Riwayat Pemakaian</h2></div></div><div class="resident-saas-table resident-saas-table--utility">${rows.length ? rows.map((item) => `<p><span>${escapeHtml(item.month || '-')}</span><b>${Number(item.electricKwh || 0)} kWh</b><em>${Number(item.waterM3 || 0)} m³</em><i>${rupiah(Number(item.totalAmount || 0))}</i></p>`).join('') : '<p><span>Belum ada data</span><b>0 kWh</b><em>0 m³</em><i>Admin belum input meter kamar ini.</i></p>'}</div></div>`}</article>`;
1443: }
1444: 
1445: function renderResidentAccess(compact = false) {
1446:   const resident = JSON.parse(window.localStorage.getItem('onyx-resident-account') || '{}');
1447:   const accessState = JSON.parse(window.localStorage.getItem('onyx-access-state') || `{"locked":true,"guestPass":"QR-ONYX-${String(resident.id || Date.now()).slice(-4)}","validUntil":"22:00"}`);
1448:   const deviceState = getRoomDeviceState();
1449:   const accessLogs = getAccessLogs(accessState);
1450:   const room = getCurrentResidentRoom();
1451:   const climateType = getRoomClimateType(room);
1452:   const climateSummary = climateType === 'ac'
1453:     ? `<p><i class="fa-solid fa-snowflake"></i><span>AC</span><b>${deviceState.acOn ? `${deviceState.temperature}°C` : 'Off'}</b></p>`
1454:     : climateType === 'fan'
1455:       ? `<p><i class="fa-solid fa-fan"></i><span>Kipas</span><b>${deviceState.fanOn ? 'On' : 'Off'}</b></p>`
1456:       : `<p><i class="fa-solid fa-wind"></i><span>Ventilasi</span><b>Jendela luar</b></p>`;

(Showing lines 1407-1456 of 3387. Use offset=1457 to continue.)
</content>
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 26.4s)

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src\\main.js",
  "offset": 1240,
  "limit": 85
}
```

**Output:**
```
<path>C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\main.js</path>
<type>file</type>
<content>
1240:             <button class="onyx-cta booking-form-full" type="submit">Daftar & Masuk Panel</button>
1241:           </form>
1242:         </section>
1243: 
1244:         <section class="booking-final-note booking-final-note--overlay">
1245:           <p><span>01</span><strong>Register</strong><small>Isi data identitas, kamar, dan masa sewa langsung di halaman Book.</small></p>
1246:           <p><span>02</span><strong>Panel</strong><small>Setelah submit, kamu otomatis masuk ke panel penghuni tanpa login ulang.</small></p>
1247:           <p><span>03</span><strong>Administrasi</strong><small>Deposit dan tagihan sewa muncul di panel untuk diselesaikan sambil menunggu review admin.</small></p>
1248:         </section>
1249:       </main>
1250:     </div>
1251:   `;
1252: }
1253: 
1254: /**
1255:  * @description Render halaman login portal untuk penghuni dan admin.
1256:  * @param {string} note Pesan informasi opsional.
1257:  * @returns {string} Markup login page.
1258:  */
1259: function renderLoginPage(note = '') {
1260:   return `
1261:     <main class="login-page">
1262:       <section class="login-card">
1263:         <a class="brand brand--public" href="#" data-route="public" aria-label="Kembali ke halaman publik">
1264:           <span class="brand__mark"><i class="fa-solid fa-house-chimney-window"></i></span>
1265:           <span><strong>Onyx</strong><small>Portal</small></span>
1266:         </a>
1267:         <div class="login-copy">
1268:           <p class="kicker">Login</p>
1269:           <h1>Masuk Portal</h1>
1270:         </div>
1271:         ${note ? `<p class="login-note">${escapeHtml(note)}</p>` : ''}
1272:         <form class="login-form" id="loginForm">
1273:           <label>Email / WhatsApp<input name="username" autocomplete="username" placeholder="Email / WhatsApp" required /></label>
1274:           <label>Password<input name="password" type="password" autocomplete="current-password" placeholder="Password" required /></label>
1275:           <button class="button primary" type="submit">Masuk</button>
1276:           <button class="button subtle" type="button" data-route="register">Daftar</button>
1277:           <button class="button subtle" type="button" data-route="public">Kembali</button>
1278:         </form>
1279:       </section>
1280:     </main>
1281:   `;
1282: }
1283: 
1284: /**
1285:  * @description Render halaman register penghuni untuk konsep portal.
1286:  * @returns {string} Markup register page.
1287:  */
1288: function renderRegisterPage() {
1289:   return `
1290:     <main class="login-page portal-register-page">
1291:       <section class="login-card">
1292:         <a class="brand brand--public" href="#" data-route="public" aria-label="Kembali ke halaman publik">
1293:           <span class="brand__mark"><i class="fa-solid fa-house-chimney-window"></i></span>
1294:           <span><strong>Onyx</strong><small>Daftar</small></span>
1295:         </a>
1296:         <div class="login-copy">
1297:           <p class="kicker">Register</p>
1298:           <h1>Buat Akun</h1>
1299:         </div>
1300:         <form class="login-form register-form" id="registerForm">
1301:           <label>Full Name<input name="name" autocomplete="name" placeholder="Nama lengkap" required /></label>
1302:           <label>WhatsApp<input name="phone" placeholder="08xxxxxxxxxx" required /></label>
1303:           <label>Email<input name="email" type="email" autocomplete="email" placeholder="nama@email.com" required /></label>
1304:           <label>NIK KTP<input name="nik" inputmode="numeric" minlength="16" maxlength="16" placeholder="16 digit NIK" required /></label>
1305:           <label>Alamat KTP<input name="address" placeholder="Alamat sesuai KTP" required /></label>
1306:           <label>Pekerjaan / Kampus<input name="occupation" placeholder="Karyawan / Mahasiswa / dll" required /></label>
1307:           <label>Preferred Room${renderCustomRoomPicker()}</label>
1308:           <label>Tipe Sewa${renderCustomLeasePicker()}</label>
1309:           <label>Tanggal Mulai<input name="startDate" type="date" required /></label>
1310:           <label>Durasi<input name="duration" type="number" min="1" value="1" required /></label>
1311:           <label>Tanggal Selesai<input name="endDate" type="date" /></label>
1312:           <label>Total Tagihan<input name="monthlyBudget" type="number" min="0" readonly /></label>
1313:           <label>Deposit<input name="deposit" type="number" min="0" readonly /></label>
1314:           <label>Kontak Darurat<input name="emergencyContact" placeholder="Nama + nomor keluarga" required /></label>
1315:           <label>Bank Refund Deposit<input name="refundBank" placeholder="BCA / Mandiri / BRI" required /></label>
1316:           <label>No. Rekening Refund<input name="refundAccount" inputmode="numeric" placeholder="Nomor rekening pribadi" required /></label>
1317:           <label>Nama Rekening Refund<input name="refundAccountName" placeholder="Nama pemilik rekening" required /></label>
1318:           <label>Password<input name="password" type="password" autocomplete="new-password" placeholder="Minimal 8 karakter" required /></label>
1319:           <label class="full">Catatan Pendaftaran<textarea name="notes" placeholder="Kebutuhan khusus, jadwal check-in, kendaraan, dll"></textarea></label>
1320:           <button class="button primary" type="submit">Daftar Akun</button>
1321:           <button class="button subtle" type="button" data-route="login">Sudah punya akun? Login</button>
1322:         </form>
1323:       </section>
1324:     </main>

(Showing lines 1240-1324 of 3387. Use offset=1325 to continue.)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src\\main.js",
  "offset": 1390,
  "limit": 45
}
```

**Output:**
```
<path>C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\main.js</path>
<type>file</type>
<content>
1390:  */
1391: function renderResidentSection() {
1392:   if (state.activeResidentSection === 'billing') return renderResidentBilling();
1393:   if (state.activeResidentSection === 'utilities') return renderResidentUtilities();
1394:   if (state.activeResidentSection === 'access') return renderResidentAccess();
1395:   if (state.activeResidentSection === 'service') return renderResidentService();
1396:   return renderResidentOverview();
1397: }
1398: 
1399: function renderResidentOverview() {
1400:   return `<section class="resident-dashboard-grid">${renderResidentBilling(true)}${renderResidentAccess(true)}${renderResidentUtilities(true)}${renderResidentService(true)}</section>`;
1401: }
1402: 
1403: function renderResidentBilling(compact = false) {
1404:   const invoices = getResidentInvoices(getCurrentResident());
1405:   const content = compact
1406:     ? `<div class="resident-saas-table resident-saas-table--billing resident-saas-table--billing-compact">${invoices.map((invoice) => `<p><span>${escapeHtml(invoice.code)}</span><b>${escapeHtml(invoice.item)}</b><em>${escapeHtml(invoice.amount)}</em><i class="status-${slug(invoice.status)}">${escapeHtml(invoice.status)}</i></p>`).join('')}</div><a class="resident-panel-link" href="#billing" data-resident-section="billing">Lihat detail pembayaran</a>`
1407:     : `<div class="billing-table-wrap"><table class="billing-table"><thead><tr><th>Kode</th><th>Tagihan</th><th>Mulai</th><th>Jatuh tempo</th><th>Nominal</th><th>Status</th><th>Aksi</th></tr></thead><tbody>${invoices.map((invoice) => renderBillingTableRow(invoice)).join('')}</tbody></table></div>${renderResidentPrintableReceipt()}${state.manualTransferInvoice ? renderManualTransferModal() : ''}`;
1408:   return `<article class="resident-saas-panel ${compact ? 'resident-saas-panel--large' : 'resident-saas-panel--full'}"><div class="resident-panel-title"><div><span>Billing</span><h2>${compact ? 'Latest Invoices' : 'Pembayaran & Invoice'}</h2></div></div>${compact ? '' : renderPaymentCountdown()}${content}</article>`;
1409: }
1410: 
1411: function renderBillingTableRow(invoice) {
1412:   const status = invoice.status || '-';
1413:   const isPending = status === 'Pending';
1414:   const amountValue = String(invoice.amount || '').replace(/[^0-9]/g, '');
1415:   const payActions = isPending
1416:     ? `<button class="row-print-btn" type="button" data-pay-invoice="${escapeHtml(invoice.code)}" data-pay-item="${escapeHtml(invoice.item)}" data-pay-amount="${amountValue}">QRIS</button><button class="row-print-btn row-print-btn--gold" type="button" data-transfer-invoice="${escapeHtml(invoice.code)}" data-transfer-item="${escapeHtml(invoice.item)}" data-transfer-amount="${escapeHtml(invoice.amount)}">TF</button>`
1417:     : '<span class="row-paid-mark">Paid</span>';
1418:   return `<tr><td data-label="Kode"><strong>${escapeHtml(invoice.code)}</strong></td><td data-label="Tagihan">${escapeHtml(invoice.item)}</td><td data-label="Mulai">${escapeHtml(invoice.date || '-')}</td><td data-label="Jatuh tempo">${escapeHtml(invoice.due || '-')}</td><td data-label="Nominal"><em>${escapeHtml(invoice.amount)}</em></td><td data-label="Status"><i class="status-${slug(status)}">${escapeHtml(status)}</i></td><td data-label="Aksi"><div class="billing-table__actions">${payActions}<button class="row-print-btn" type="button" data-print-invoice="${escapeHtml(invoice.code)}" data-print-item="${escapeHtml(invoice.item)}" data-print-amount="${escapeHtml(invoice.amount)}" data-print-status="${escapeHtml(status)}">Print</button></div></td></tr>`;
1419: }
1420: 
1421: function renderPaymentCountdown() {
1422:   const cycle = getBillingCycle();
1423:   const resident = getCurrentResident();
1424:   const utility = getLatestResidentUtility(resident);
1425:   const dueDate = getResidentLeaseDueDate(resident, cycle.currentDue);
1426:   return `<section class="payment-countdown"><div><span>Jatuh Tempo</span><strong>${formatInvoiceDate(dueDate)}</strong><small>Berdasarkan ${escapeHtml(resident.duration || '1')} ${escapeHtml(resident.leaseType || 'periode')} · ${escapeHtml(resident.room || 'kamar belum dipilih')}</small></div><div><span>Utilitas</span><strong>${Number(utility.electricKwh || 0)} kWh · ${Number(utility.waterM3 || 0)} m³</strong><small>${utility.totalAmount ? rupiah(Number(utility.totalAmount)) : 'Belum ada input meter admin'}</small></div><div><span>Gateway</span><strong>QRIS BAYAR GG / TF</strong><small>QRIS sampai Rp 500.000. Nominal besar gunakan transfer manual.</small></div></section>`;
1427: }
1428: 
1429: function renderManualTransferModal() {
1430:   const invoice = state.manualTransferInvoice || {};
1431:   const message = encodeURIComponent(`Halo Admin Onyx, saya ingin konfirmasi transfer untuk ${invoice.code || 'invoice'} - ${invoice.item || 'tagihan'} sebesar ${invoice.amount || '-'}.`);
1432:   return `<div class="resident-modal" role="dialog" aria-modal="true"><div class="resident-modal__card resident-transfer-modal"><div class="resident-panel-title"><div><span>Transfer Manual</span><h2>${escapeHtml(invoice.code || 'Invoice')}</h2></div><button class="row-print-btn" type="button" id="closeTransferModal">Close</button></div><div class="transfer-instruction"><p><span>Tagihan</span><strong>${escapeHtml(invoice.item || '-')}</strong></p><p><span>Nominal</span><strong>${escapeHtml(invoice.amount || '-')}</strong></p><p><span>Bank</span><strong>${manualTransferAccount.bank}</strong></p><p><span>No. Rekening</span><strong>${manualTransferAccount.number}</strong></p><p><span>Atas Nama</span><strong>${manualTransferAccount.holder}</strong></p></div><div class="transfer-actions"><button class="onyx-cta" type="button" data-copy-value="${manualTransferAccount.number}" data-access-action="copy-transfer-account">Copy Rekening</button><a class="onyx-secondary" href="https://wa.me/${manualTransferAccount.whatsapp}?text=${message}" target="_blank" rel="noopener noreferrer">Konfirmasi WA</a></div><small class="transfer-note">Setelah transfer, kirim bukti pembayaran via WhatsApp admin. Status invoice akan diubah setelah admin verifikasi.</small></div></div>`;
1433: }
1434: 

(Showing lines 1390-1434 of 3387. Use offset=1435 to continue.)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src\\main.js",
  "offset": 1960,
  "limit": 120
}
```

**Output:**
```
<path>C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\main.js</path>
<type>file</type>
<content>
1960:     const pct = Math.round((bar.value / finMax) * 100);
1961:     return `<div class="cf-bar-chart__row"><span class="cf-bar-chart__label">${escapeHtml(bar.label)}</span><div class="cf-bar-chart__fill-wrap"><div class="cf-bar-chart__fill" style="width:${pct}%;background:${bar.color}"></div></div><strong class="cf-bar-chart__value">${rupiah(bar.value)}</strong></div>`;
1962:   }).join('');
1963: 
1964:   return `<section class="admin-page-panel cashflow-page" id="laporan" data-section>
1965:     <div class="cf-hero">
1966:       <div class="cf-hero__lead"><span class="cf-eyebrow">Financial Report</span><h3>Arus Kas Bisnis</h3><p>Ringkasan pemasukan, piutang, dan biaya utilitas periode berjalan.</p></div>
1967:       <div class="cf-hero__total"><span class="cf-hero__label">Total Nilai Transaksi</span><strong class="cf-hero__value">${rupiah(totalRevenue)}</strong><div class="cf-hero__meta"><small>${buyers.length} transaksi · ${periodLabel}</small><button class="cf-print-btn no-print" type="button" id="printCashflow"><i class="fa-solid fa-print"></i> Cetak Laporan</button></div></div>
1968:     </div>
1969:     <div class="cf-metrics">
1970:       <article class="cf-metric cf-metric--paid">
1971:         <div class="cf-metric__icon"><i class="fa-solid fa-circle-check"></i></div>
1972:         <div class="cf-metric__body"><span>Pemasukan</span><strong>${rupiah(paidRevenue)}</strong><small>${paidBuyers.length} resident lunas · ${collectionRate}% collected</small></div>
1973:       </article>
1974:       <article class="cf-metric cf-metric--outstanding">
1975:         <div class="cf-metric__icon"><i class="fa-solid fa-hourglass-half"></i></div>
1976:         <div class="cf-metric__body"><span>Outstanding</span><strong>${rupiah(outstanding)}</strong><small>${reviewBuyers.length + rejectedBuyers.length + unpaidBuyers.length} resident belum selesai</small></div>
1977:       </article>
1978:       <article class="cf-metric cf-metric--deposit">
1979:         <div class="cf-metric__icon"><i class="fa-solid fa-piggy-bank"></i></div>
1980:         <div class="cf-metric__body"><span>Deposit</span><strong>${rupiah(totalDeposit)}</strong><small>Dari ${buyers.length} resident aktif</small></div>
1981:       </article>
1982:       <article class="cf-metric cf-metric--cost">
1983:         <div class="cf-metric__icon"><i class="fa-solid fa-bolt"></i></div>
1984:         <div class="cf-metric__body"><span>Biaya Utilitas</span><strong>${rupiah(utilityCost)}</strong><small>${utilityMeters.length} meter tercatat</small></div>
1985:       </article>
1986:     </div>
1987:     <div class="cf-charts">
1988:       <article class="cf-card cf-card--donut">
1989:         <header class="cf-card__head">
1990:           <div><h4>Distribusi Status Pembayaran</h4><p>Proporsi per status transaksi</p></div>
1991:           <small>${collectionRate}% collected</small>
1992:         </header>
1993:         <div class="cf-donut">
1994:           <svg class="cf-donut__ring" viewBox="0 0 120 120">
1995:             <circle cx="60" cy="60" r="${donutRadius}" fill="none" stroke="rgba(247,242,234,.06)" stroke-width="${donutStroke}" />
1996:             ${donutArcs}
1997:           </svg>
1998:           <div class="cf-donut__center">
1999:             <strong>${collectionRate}%</strong>
2000:             <span>Collection Rate</span>
2001:           </div>
2002:         </div>
2003:         <div class="cf-donut__legend">${donutLegend}</div>
2004:       </article>
2005:       <article class="cf-card cf-card--bars">
2006:         <header class="cf-card__head">
2007:           <div><h4>Komposisi Keuangan</h4><p>Perbandingan arus kas utama</p></div>
2008:           <small>Net ${rupiah(netCashflow)}</small>
2009:         </header>
2010:         <div class="cf-bar-chart">${finBarHtml}</div>
2011:       </article>
2012:     </div>
2013:     <div class="cf-stack">
2014:       <div class="cf-split">
2015:         <article class="cf-card cf-card--table">
2016:           <header class="cf-card__head"><div><h4>Riwayat Transaksi</h4><p>10 transaksi terakhir</p></div></header>
2017:           <div class="cf-table-wrap">
2018:             <table class="cf-table">
2019:               <thead><tr><th>Resident</th><th>Nominal</th><th>Tanggal</th><th>Status</th></tr></thead>
2020:               <tbody>${txRows || '<tr><td colspan="4"><div class="empty admin-empty-state"><strong>Belum ada transaksi.</strong></div></td></tr>'}</tbody>
2021:             </table>
2022:           </div>
2023:         </article>
2024:         <article class="cf-card cf-card--summary">
2025:           <header class="cf-card__head"><div><h4>Ringkasan Cashflow</h4><p>Net periode ini</p></div></header>
2026:           <dl class="cf-summary">
2027:             <div><dt>Pemasukan</dt><dd class="cf-summary__paid">${rupiah(paidRevenue)}</dd></div>
2028:             <div><dt>Deposit Terkumpul</dt><dd>${rupiah(totalDeposit)}</dd></div>
2029:             <div><dt>Biaya Utilitas</dt><dd class="cf-summary__cost">− ${rupiah(utilityCost)}</dd></div>
2030:             <div class="cf-summary__total"><dt>Net Cashflow</dt><dd>${rupiah(netCashflow)}</dd></div>
2031:           </dl>
2032:         </article>
2033:       </div>
2034:     </div>
2035:   </section>`;
2036: }
2037: 
2038: /**
2039:  * @description Mengikat event interaksi setelah render selesai.
2040:  * @returns {void}
2041:  */
2042: function bindEvents() {
2043:   initScrollSequences();
2044: 
2045:   // Event navigasi umum: semua elemen data-route berpindah halaman tanpa reload penuh.
2046:   document.querySelectorAll('[data-route]').forEach((element) => {
2047:     element.addEventListener('click', (event) => {
2048:       event.preventDefault();
2049:       navigate(element.dataset.route);
2050:     });
2051:   });
2052: 
2053:   document.querySelectorAll('input[type="date"]').forEach((input) => {
2054:     input.addEventListener('focus', () => input.showPicker?.());
2055:     input.addEventListener('click', () => input.showPicker?.());
2056:     input.addEventListener('keydown', (event) => event.preventDefault());
2057:   });
2058: 
2059:   document.querySelector('#resetExpiredPayment')?.addEventListener('click', () => {
2060:     window.localStorage.removeItem('onyx-resident-account');
2061:     window.localStorage.removeItem('onyx-payment-proof');
2062:     clearResidentSession();
2063:     showToast('Pendaftaran expired dibersihkan. Silakan daftar ulang agar sistem tidak menumpuk data spam.');
2064:     navigate('register');
2065:   });
2066: 
2067:   document.querySelectorAll('[data-proof-preview-url]').forEach((button) => {
2068:     button.addEventListener('click', () => {
2069:       state.proofPreview = { url: button.dataset.proofPreviewUrl, file: button.dataset.proofPreviewFile || 'Bukti pembayaran' };
2070:       renderApp();
2071:     });
2072:   });
2073: 
2074:   document.querySelector('#closeProofPreview')?.addEventListener('click', () => {
2075:     state.proofPreview = null;
2076:     renderApp();
2077:   });
2078: 
2079:   document.querySelector('#printCashflow')?.addEventListener('click', () => window.print());

(Showing lines 1960-2079 of 3387. Use offset=2080 to continue.)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src\\main.js",
  "offset": 1460,
  "limit": 50
}
```

**Output:**
```
<path>C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\main.js</path>
<type>file</type>
<content>
1460:       ? `<article><i class="fa-solid fa-fan"></i><span>Kipas Angin</span><strong>${deviceState.fanOn ? 'Menyala' : 'Mati'}</strong><button class="row-print-btn ${deviceState.fanOn ? 'row-print-btn--gold' : ''}" type="button" data-device-action="toggle-fan">${deviceState.fanOn ? 'Matikan' : 'Nyalakan'}</button></article><article><i class="fa-solid fa-wind"></i><span>Sirkulasi</span><strong>Jendela luar</strong><small>Kamar ini tidak punya AC, jadi suhu AC tidak ditampilkan.</small></article>`
1461:       : `<article><i class="fa-solid fa-wind"></i><span>Ventilasi</span><strong>Jendela luar</strong><small>Tidak ada perangkat AC/kipas di fasilitas kamar ini.</small></article>`;
1462: 
1463:   if (compact) {
1464:     return `<article class="resident-saas-panel"><div class="resident-panel-title"><div><span>Access</span><h2>Smart Room</h2></div></div><div class="resident-access-summary"><p><i class="fa-solid ${accessState.locked ? 'fa-lock' : 'fa-lock-open'}"></i><span>Door</span><b>${accessState.locked ? 'Locked' : 'Unlocked'}</b></p><p><i class="fa-solid fa-lightbulb"></i><span>Lampu</span><b>${deviceState.lightOn ? 'On' : 'Off'}</b></p>${climateSummary}</div><a class="resident-panel-link" href="#access" data-resident-section="access">Kelola akses</a></article>`;
1465:   }
1466: 
1467:   return `<article class="resident-saas-panel resident-saas-panel--full"><div class="resident-panel-title"><div><span>Access</span><h2>Akses & Smart Room</h2></div><button class="onyx-secondary" type="button" id="shareVisitorQr">QR Tamu</button></div><section class="access-control-grid access-control-grid--simple"><div class="access-hero-card access-hero-card--simple"><div class="access-lock-visual ${accessState.locked ? '' : 'is-unlocked'}"><i class="fa-solid ${accessState.locked ? 'fa-lock' : 'fa-lock-open'}"></i></div><div><span>${escapeHtml(resident.room || 'Private Studio')}</span><h3>${accessState.locked ? 'Terkunci' : 'Terbuka'}</h3></div><button class="onyx-cta" type="button" id="toggleSmartLock">${accessState.locked ? 'Unlock' : 'Lock'}</button></div><div class="access-info-stack access-info-stack--simple"><article><span>WiFi</span><strong>ONYX-Resident</strong><button class="row-print-btn" type="button" data-access-action="copy-wifi" data-copy-value="WiFi ONYX-Resident / Password onyx-${new Date().getFullYear()}">Copy</button></article><article><span>QR Tamu</span><strong>${accessState.guestPass}</strong><button class="row-print-btn" type="button" id="openVisitorQr">Show QR</button></article></div></section><section class="smart-room-panel"><div class="resident-panel-title resident-panel-title--flat"><div><span>Smart Control</span><h2>Kontrol sesuai fasilitas kamar</h2></div></div><div class="smart-room-grid"><article><i class="fa-solid fa-lightbulb"></i><span>Lampu Kamar</span><strong>${deviceState.lightOn ? 'Menyala' : 'Mati'}</strong><button class="row-print-btn ${deviceState.lightOn ? 'row-print-btn--gold' : ''}" type="button" data-device-action="toggle-light">${deviceState.lightOn ? 'Matikan' : 'Nyalakan'}</button></article>${climateControl}</div></section><section class="access-log-panel"><div class="resident-panel-title resident-panel-title--flat"><div><span>Log</span><h2>Riwayat akses</h2></div></div><div class="resident-saas-table resident-saas-ta... (line truncated to 2000 chars)
1468: }
1469: 
1470: function renderVisitorQrModal(accessState) {
1471:   return `<div class="resident-modal" role="dialog" aria-modal="true"><div class="resident-modal__card resident-qr-modal"><div class="resident-panel-title"><div><span>Visitor QR</span><h2>QR Tamu Onyx</h2></div><button class="row-print-btn" type="button" id="closeVisitorQr">Close</button></div><div class="visitor-qr-card"><div class="visitor-qr-code" aria-label="QR code for ${escapeHtml(accessState.guestPass)}">${renderVisitorQr(accessState.guestPass)}</div><strong>${escapeHtml(accessState.guestPass)}</strong><p>Berlaku sampai ${escapeHtml(accessState.validUntil)} hari ini. Tunjukkan QR ini ke tamu atau front desk lobby.</p><button class="onyx-cta" type="button" data-access-action="copy-qr" data-copy-value="${escapeHtml(accessState.guestPass)}">Copy QR Code</button></div></div></div>`;
1472: }
1473: 
1474: function renderResidentService(compact = false) {
1475:   const tickets = JSON.parse(window.localStorage.getItem('onyx-resident-tickets') || '[]');
1476:   return `<article class="resident-saas-panel ${compact ? '' : 'resident-saas-panel--full'}"><div class="resident-panel-title"><div><span>Service</span><h2>Requests</h2></div>${compact ? '' : '<button class="onyx-secondary" type="button" id="newResidentTicket">New Ticket</button>'}</div><div class="resident-ticket-list">${tickets.length ? tickets.map((ticket) => `<p><span>${escapeHtml(ticket.category)}</span><b>${escapeHtml(ticket.issue)}</b><em>${escapeHtml(ticket.status)}</em></p>`).join('') : '<p><span>Empty</span><b>Belum ada tiket service</b><em>ready</em></p>'}</div>${state.isTicketModalOpen && !compact ? renderTicketModal() : ''}</article>`;
1477: }
1478: 
1479: function renderTicketModal() {
1480:   return `<div class="resident-modal" role="dialog" aria-modal="true"><div class="resident-modal__card"><div class="resident-panel-title"><div><span>New Ticket</span><h2>Buat tiket service</h2></div><button class="row-print-btn" type="button" id="closeTicketModal">Close</button></div><form class="resident-ticket-form" id="residentTicketForm"><label>Kategori<select name="category"><option>AC</option><option>Listrik</option><option>Air</option><option>WiFi</option><option>Smart Lock</option><option>Cleaning</option></select></label><label>Prioritas<select name="priority"><option>Normal</option><option>Urgent</option></select></label><label class="ticket-full">Kendala<textarea name="issue" placeholder="Jelaskan kendala yang dialami" required></textarea></label><button class="onyx-cta ticket-full" type="submit">Submit Ticket</button></form></div></div>`;
1481: }
1482: 
1483: function renderResidentPrintableReceipt() {
1484:   const resident = JSON.parse(window.localStorage.getItem('onyx-resident-account') || '{}');
1485:   const currentInvoice = getResidentInvoices()[0] || {};
1486:   const selected = JSON.parse(window.localStorage.getItem('onyx-selected-invoice') || JSON.stringify(currentInvoice));
1487:   return `<section class="resident-print-receipt" id="residentPrintableReceipt"><div><span>Onyx Residence</span><strong>BUKTI BILLING / PEMBAYARAN</strong></div><p><span>Nama</span><b>${escapeHtml(resident.name || 'Penghuni')}</b></p><p><span>Kamar</span><b>${escapeHtml(resident.room || 'Private Studio')}</b></p><p><span>Kode Invoice</span><b>${escapeHtml(selected.code || '-')}</b></p><p><span>Tagihan</span><b>${escapeHtml(selected.item || '-')}</b></p><p><span>Mulai</span><b>${escapeHtml(selected.date || '-')}</b></p><p><span>Jatuh Tempo</span><b>${escapeHtml(selected.due || '-')}</b></p><p><span>Nominal</span><b>${escapeHtml(selected.amount || '-')}</b></p><p><span>Status</span><b>${escapeHtml(selected.status || '-')}</b></p><small>Dicetak khusus untuk invoice ${escapeHtml(selected.code || '-')}; bukan semua daftar billing.</small></section>`;
1488: }
1489: 
1490: /**
1491:  * @description Render seluruh dashboard admin setelah login.
1492:  * @returns {string} Markup dashboard admin.
1493:  */
1494: function renderAdminApp() {
1495:   syncAdminState(false);
1496:   const occupancy = getRoomOccupancyStats();
1497:   return `
1498:     <aside class="sidebar" id="sidebar">
1499:       <a class="brand" href="#admin" data-route="admin" aria-label="Onyx admin dashboard">
1500:         <span class="brand__mark"><i class="fa-solid fa-house-chimney-window"></i></span>
1501:         <span><strong>Onyx</strong><small>Admin Panel</small></span>
1502:       </a>
1503:       <nav class="menu" aria-label="Navigasi admin">
1504:         ${adminMenu.map((item) => `
1505:           <a href="#${item.id}" data-admin-section="${item.id}" class="${state.activeAdminSection === item.id ? 'is-active' : ''}">
1506:             <i class="fa-solid ${item.icon}"></i><span>${item.label}</span>
1507:           </a>
1508:         `).join('')}
1509:       </nav>

(Showing lines 1460-1509 of 3387. Use offset=1510 to continue.)
</content>
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 36.8s)

**Tool: apply_patch**

**Input:**
```json
{
  "patchText": "*** Begin Patch\n*** Update File: fe/src/main.js\n@@\n function getInitialPage() {\n   const hash = window.location.hash.replace('#', '');\n   if (hash === 'info') return 'info';\n   if (hash === 'booking') return 'booking';\n   if (hash === 'login') return 'login';\n   if (hash === 'register') return 'register';\n   if (hash === 'resident') return 'resident';\n   if (hash === 'admin') return 'admin';\n+  const pathPage = window.location.pathname.replace(/\\/+$/, '').split('/').pop();\n+  if (pathPage === 'info') return 'info';\n+  if (pathPage === 'booking' || pathPage === 'book') return 'booking';\n+  if (pathPage === 'login') return 'login';\n+  if (pathPage === 'register') return 'register';\n+  if (pathPage === 'resident' || pathPage === 'resident-portal') return 'resident';\n+  if (pathPage === 'admin' || pathPage === 'dashboard') return 'admin';\n   return 'public';\n }\n*** End Patch"
}
```

**Output:**
```
Success. Updated the following files:
M fe/src/main.js
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 36.8s)

**Tool: bash**

**Input:**
```json
{
  "command": "node --check \"fe/src/main.js\"",
  "timeout": 120000,
  "workdir": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS",
  "description": "Checks JavaScript syntax after edits"
}
```

**Output:**
```
(no output)
```

**Tool: glob**

**Input:**
```json
{
  "pattern": "**/*wrangler*",
  "path": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS"
}
```

**Output:**
```
No files found
```

**Tool: glob**

**Input:**
```json
{
  "pattern": "**/package.json",
  "path": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS"
}
```

**Output:**
```
Found 1 file(s)

C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\package.json
```

**Tool: grep**

**Input:**
```json
{
  "pattern": "deploy|wrangler|onyx\\.nawf|dist|cloudflare|pages|dashboard",
  "include": "*.{md,json,js,toml}",
  "path": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS",
  "output_mode": "content",
  "head_limit": 200
}
```

**Output:**
```
Found 115 match(es) in 7 file(s)

C:\Users\kaysa\OneDrive\Documents\PPL_UAS\docs\PRD_ONYX_RESIDENCE_FULLSTACK.md
  30: 3. Memberi admin ringkasan operasional dan cashflow bisnis dalam satu dashboard.
  38: - Belum ada dashboard finansial akuntansi penuh seperti jurnal, ledger, pajak, dan rekonsiliasi bank.
  62: - Melihat dashboard operasional.
  74: - `fe/src/styles.css`: seluruh styling publik, resident portal, admin dashboard, payment detail, cashflow, print.
  365: - donut chart distribusi paid/outstanding/cost;
  575: Output build: `fe/dist`.
  583: Live target saat ini: `https://onyx.nawf.dev/`.

C:\Users\kaysa\OneDrive\Documents\PPL_UAS\docs\portal-roadmap.md
  35: - Resident/Admin Portal: same Onyx dark/gold identity, but more dashboard-oriented with clean tables, filters, status badges, print actions.

C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\package-lock.json
  1918: "baseline-browser-mapping": "dist/cli.cjs"

C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\main.js
  54: { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-pie' },
  1025: if (pathPage === 'admin' || pathPage === 'dashboard') return 'admin';
  1589: <section class="split-grid admin-dashboard-main">
  1660: const liveSections = ['dashboard', 'kamar', 'penghuni', 'utilities', 'iot', 'access', 'tickets', 'resident-portal', 'pembayaran', 'reservasi', 'laporan'];
  1772: [Omitted long matching line]
  1851: return `<section class="payment-review-page" id="pembayaran" data-section><div class="payment-review-hero"><div><span>Payment Detail</span><h3>${escapeHtml(resident.name)} · ${escapeHtml(navItems.find(([id]) => id === section)?.[1] || 'Ringkasan')}</h3><p>${escapeHtml(resident.room || '-')} · ${escapeHtml(paymentStage)}</p></div><div class="payment-review-hero__actions no-print"><button class="button subtle" type="button" id="backToPaymentList"><i class="fa-solid fa-arrow-left"></i>List buyer</button><button class="button subtle" type="button" id="refreshPayments"><i class="fa-solid fa-rotate"></i>Refresh</button></div></div>${paymentNav}${pages[section] || overviewPage}</section>`;
  2090: state.activeAdminSection = button.dataset.adminQuickSection || 'dashboard';

C:\Users\kaysa\OneDrive\Documents\PPL_UAS\session-ses_19ba.md
  298: "content": "Build deploy verify live",
  325: "content": "Build deploy verify live",
  411: dist/index.html                   0.97 kB │ gzip:  0.51 kB
  412: dist/assets/index-BWtNCjRo.css  121.32 kB │ gzip: 20.99 kB
  413: dist/assets/index-BhktvuQh.js   117.85 kB │ gzip: 30.25 kB
  444: "content": "Build deploy verify live",
  471: "content": "Build deploy verify live",
  489: "command": "if (Test-Path -LiteralPath \"dist\") { plink -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"nawfdev@server3.hostdata.id\" \"rm -rf domains/onyx.nawf.dev/public_html/assets && mkdir -p domains/onyx.nawf.dev/public_html/assets\"; if ($?) { pscp -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -r -pw \"GASy}TE~})Bq\" \"dist\\index.html\" \"dist\\assets\" \"nawfdev@server3.hostdata.id:domains/onyx.nawf.dev/public_html/\"; if ($?) { pscp -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"..\\be\\api\\payment-proof.php\" \"nawfdev@server3.hostdata.id:domains/onyx.nawf.dev/public_html/be/api/payment-proof.php\" } } } else { Write-Error \"dist not found\" }",
  514: "url": "https://onyx.nawf.dev/",
  532: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
  538: <script defer src="https://static.cloudflareinsights.com/beacon.min.js/v833ccba57c9e4d2798f2e76cebdd09a11778172276447" integrity="sha512-57MDmcccJXYtNnH+ZiBwzC4jb2rvgVCEokYN+L/nLlmO8rfYT/gIpW2A569iJ/3b+0UEasghjuZH/ma3wIs/EQ==" data-cf-beacon='{"version":"2024.11.0","token":"7d6d73839b2a471b87b7214f1ed69bff","r":1,"server_timing":{"name":{"cfCacheStatus":true,"cfEdge":true,"cfExtPri":true,"cfL4":true,"cfOrigin":true,"cfSpeedBrain":true},"location_startswith":null}}' crossorigin="anonymous"></script>
  573: "command": "plink -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"nawfdev@server3.hostdata.id\" \"php -l domains/onyx.nawf.dev/public_html/be/api/payment-proof.php && grep 'index-BhktvuQh\\|index-BWtNCjRo' domains/onyx.nawf.dev/public_html/index.html\"",
  576: "description": "Verifies remote proof fix deploy"
  582: No syntax errors detected in domains/onyx.nawf.dev/public_html/be/api/payment-proof.php
  614: "content": "Build deploy verify live",
  641: "content": "Build deploy verify live",
  935: "command": "plink -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"nawfdev@server3.hostdata.id\" \"tail -n 80 domains/onyx.nawf.dev/logs/error_log 2>/dev/null || tail -n 80 logs/error_log 2>/dev/null || find . -name error_log -type f -maxdepth 4 -print\"",
  1019: "command": "plink -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"nawfdev@server3.hostdata.id\" \"find domains/onyx.nawf.dev -name '*error*' -type f -print 2>/dev/null | head -20\"",
  1121: PHP auto-create simplified; frontend sync now survives 404. Verify/build/deploy.
  1180: dist/index.html                   0.97 kB │ gzip:  0.52 kB
  1181: dist/assets/index-BWtNCjRo.css  121.32 kB │ gzip: 20.99 kB
  1182: dist/assets/index-Chgo9fq9.js   118.12 kB │ gzip: 30.34 kB
  1246: "command": "if (Test-Path -LiteralPath \"dist\") { plink -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"nawfdev@server3.hostdata.id\" \"rm -rf domains/onyx.nawf.dev/public_html/assets && mkdir -p domains/onyx.nawf.dev/public_html/assets\"; if ($?) { pscp -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -r -pw \"GASy}TE~})Bq\" \"dist\\index.html\" \"dist\\assets\" \"nawfdev@server3.hostdata.id:domains/onyx.nawf.dev/public_html/\"; if ($?) { pscp -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"..\\be\\api\\payment-proof.php\" \"nawfdev@server3.hostdata.id:domains/onyx.nawf.dev/public_html/be/api/payment-proof.php\" } } } else { Write-Error \"dist not found\" }",
  1271: "url": "https://onyx.nawf.dev/",
  1289: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
  1295: <script defer src="https://static.cloudflareinsights.com/beacon.min.js/v833ccba57c9e4d2798f2e76cebdd09a11778172276447" integrity="sha512-57MDmcccJXYtNnH+ZiBwzC4jb2rvgVCEokYN+L/nLlmO8rfYT/gIpW2A569iJ/3b+0UEasghjuZH/ma3wIs/EQ==" data-cf-beacon='{"version":"2024.11.0","token":"7d6d73839b2a471b87b7214f1ed69bff","r":1,"server_timing":{"name":{"cfCacheStatus":true,"cfEdge":true,"cfExtPri":true,"cfL4":true,"cfOrigin":true,"cfSpeedBrain":true},"location_startswith":null}}' crossorigin="anonymous"></script>
  1330: "command": "plink -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"nawfdev@server3.hostdata.id\" \"php -l domains/onyx.nawf.dev/public_html/be/api/payment-proof.php && grep 'index-Chgo9fq9\\|index-BWtNCjRo' domains/onyx.nawf.dev/public_html/index.html\"",
  1333: "description": "Verifies deployed safe proof fix"
  1339: No syntax errors detected in domains/onyx.nawf.dev/public_html/be/api/payment-proof.php
  1415: - Live deployed.
  1507: "command": "$body = '{\"application_id\":\"APP-20260531135437-574\",\"residentName\":\"Debug User\",\"room\":\"A01\",\"senderBank\":\"BCA\",\"senderName\":\"Debug User\",\"amount\":\"1000\",\"fileName\":\"debug.txt\",\"status\":\"uploaded\",\"invoice\":\"ADM-2026\"}'; try { Invoke-WebRequest -Uri \"https://onyx.nawf.dev/be/api/payment-proof.php\" -Method POST -ContentType \"application/json\" -Body $body -UseBasicParsing | Select-Object -ExpandProperty Content } catch { $_.Exception.Response.StatusCode.value__; $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream()); $reader.ReadToEnd() }",
  1530: index-Chgo9fq9.js:1  GET https://onyx.nawf.dev/be/api/resident-application.php?id=APP-20260531135437-574 404 (Not Found)
  1535: index-Chgo9fq9.js:1  POST https://onyx.nawf.dev/be/api/payment-proof.php 500 (Internal Server Error)
  1540: index-Chgo9fq9.js:1 Fetch finished loading: GET "https://onyx.nawf.dev/be/api/kamar.php".
  1545: index-Chgo9fq9.js:1 Fetch finished loading: GET "https://onyx.nawf.dev/be/api/utility-meter.php?application_id=APP-20260531135437-574".
  1550: index-Chgo9fq9.js:1 Fetch finished loading: GET "https://onyx.nawf.dev/be/api/service-ticket.php?application_id=APP-20260531135437-574".
  1555: index-Chgo9fq9.js:1 Fetch finished loading: GET "https://onyx.nawf.dev/be/api/access.php?application_id=APP-20260531135437-574".
  1560: index-Chgo9fq9.js:1 Fetch finished loading: GET "https://onyx.nawf.dev/be/api/iot-ingest.php?room_code=A01".
  1565: index-Chgo9fq9.js:1 Fetch finished loading: GET "https://onyx.nawf.dev/be/api/payment-proof.php?application_id=APP-20260531135437-574".
  1570: index-Chgo9fq9.js:1 XHR failed loading: POST "https://onyx.nawf.dev/be/api/payment-proof.php".
  1574: index-Chgo9fq9.js:1 Fetch failed loading: GET "https://onyx.nawf.dev/be/api/resident-application.php?id=APP-20260531135437-574
  1697: "command": "plink -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"nawfdev@server3.hostdata.id\" \"sed -n '1,120p' domains/onyx.nawf.dev/public_html/be/config/database.php 2>/dev/null && find domains/onyx.nawf.dev -type f -name 'error_log' -o -name '*error*.log' 2>/dev/null\"",
  1733: "command": "plink -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"nawfdev@server3.hostdata.id\" \"cd domains/onyx.nawf.dev/public_html && php -r 'require \\\"be/lib/Database.php\\\"; $db=Database::connection(); foreach ([\\\"resident_applications\\\",\\\"payment_proofs\\\"] as $t) { echo \\\"TABLE $t\\\\n\\\"; foreach ($db->query(\\\"DESCRIBE $t\\\") as $r) echo $r[\\\"Field\\\"].\\\" \\\".$r[\\\"Type\\\"].\\\" Null=\\\".$r[\\\"Null\\\"].\\\" Default=\\\".$r[\\\"Default\\\"].\\\"\\\\n\\\"; }'\"",
  1774: "command": "pscp -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"tmp_remote_schema.php\" \"nawfdev@server3.hostdata.id:domains/onyx.nawf.dev/public_html/tmp_remote_schema.php\"; if ($?) { plink -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"nawfdev@server3.hostdata.id\" \"cd domains/onyx.nawf.dev/public_html && php tmp_remote_schema.php; rm -f tmp_remote_schema.php\" }",
  2105: "command": "pscp -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"be\\api\\payment-proof.php\" \"nawfdev@server3.hostdata.id:domains/onyx.nawf.dev/public_html/be/api/payment-proof.php\"; if ($?) { pscp -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"be\\api\\resident-application.php\" \"nawfdev@server3.hostdata.id:domains/onyx.nawf.dev/public_html/be/api/resident-application.php\"; if ($?) { pscp -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"be\\lib\\ApplicationMapper.php\" \"nawfdev@server3.hostdata.id:domains/onyx.nawf.dev/public_html/be/lib/ApplicationMapper.php\" } }",
  2125: index-Chgo9fq9.js:1  GET https://onyx.nawf.dev/be/api/resident-application.php?id=APP-20260531135437-574 404 (Not Found)
  2130: index-Chgo9fq9.js:1  POST https://onyx.nawf.dev/be/api/payment-proof.php 500 (Internal Server Error)
  2135: index-Chgo9fq9.js:1 Fetch finished loading: GET "https://onyx.nawf.dev/be/api/kamar.php".
  2140: index-Chgo9fq9.js:1 Fetch finished loading: GET "https://onyx.nawf.dev/be/api/utility-meter.php?application_id=APP-20260531135437-574".
  2145: index-Chgo9fq9.js:1 Fetch finished loading: GET "https://onyx.nawf.dev/be/api/service-ticket.php?application_id=APP-20260531135437-574".
  2150: index-Chgo9fq9.js:1 Fetch finished loading: GET "https://onyx.nawf.dev/be/api/access.php?application_id=APP-20260531135437-574".
  2155: index-Chgo9fq9.js:1 Fetch finished loading: GET "https://onyx.nawf.dev/be/api/iot-ingest.php?room_code=A01".
  2160: index-Chgo9fq9.js:1 Fetch finished loading: GET "https://onyx.nawf.dev/be/api/payment-proof.php?application_id=APP-20260531135437-574".
  2165: index-Chgo9fq9.js:1 XHR failed loading: POST "https://onyx.nawf.dev/be/api/payment-proof.php".
  2169: index-Chgo9fq9.js:1 Fetch failed loading: GET "https://onyx.nawf.dev/be/api/resident-application.php?id=APP-20260531135437-574
  2182: "command": "$body = '{\"application_id\":\"APP-20260531135437-574\",\"residentName\":\"Debug User\",\"room\":\"A01\",\"senderBank\":\"BCA\",\"senderName\":\"Debug User\",\"amount\":\"1000\",\"fileName\":\"debug.txt\",\"status\":\"uploaded\",\"invoice\":\"ADM-2026\"}'; try { Invoke-WebRequest -Uri \"https://onyx.nawf.dev/be/api/payment-proof.php\" -Method POST -ContentType \"application/json\" -Body $body -UseBasicParsing | Select-Object -ExpandProperty Content } catch { $_.Exception.Response.StatusCode.value__; if ($_.Exception.Response) { $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream()); $reader.ReadToEnd() } }",
  2206: "url": "https://onyx.nawf.dev/be/api/resident-application.php?id=APP-20260531135437-574",
  2246: "url": "https://onyx.nawf.dev/be/api/payment-proof.php?application_id=APP-20260531135437-574",
  2286: "url": "https://onyx.nawf.dev/be/api/admin-state.php",
  2437: "content": "Build deploy verify",
  2459: "content": "Build deploy verify",
  2552: 1571:   const pages = { overview: overviewPage, control: controlPage, meter: meterPage };
  2554: [Omitted long matching line]
  2601: 1647:   const pages = { overview: overviewPage, method: methodPage, proof: proofPage };
  2603: 1649:   return `<section class="payment-review-page" id="pembayaran" data-section><div class="payment-review-hero"><div><span>Payment Detail</span><h3>${escapeHtml(resident.name)} · ${escapeHtml(navItems.find(([id]) => id === section)?.[1] || 'Ringkasan')}</h3><p>${escapeHtml(resident.room || '-')} · ${escapeHtml(paymentStage)}</p></div><div class="payment-review-hero__actions no-print"><button class="button subtle" type="button" id="backToPaymentList"><i class="fa-solid fa-arrow-left"></i>List buyer</button><button class="button subtle" type="button" id="refreshPayments"><i class="fa-solid fa-rotate"></i>Refresh</button></div></div>${paymentNav}${pages[section] || overviewPage}</section>`;
  2747: [Omitted long matching line]
  2869: [Omitted long matching line]
  3207: Proof preview modal patched. Build/deploy now.
  3226: "content": "Build deploy verify",
  3248: "content": "Build deploy verify",
  3333: dist/index.html                   0.97 kB │ gzip:  0.52 kB
  3334: dist/assets/index-CVKGBQaY.css  122.88 kB │ gzip: 21.27 kB
  3335: dist/assets/index-1qWuzeHN.js   119.30 kB │ gzip: 30.67 kB
  3349: [Omitted long matching line]
  3376: "url": "https://onyx.nawf.dev/",
  3394: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
  3400: <script defer src="https://static.cloudflareinsights.com/beacon.min.js/v833ccba57c9e4d2798f2e76cebdd09a11778172276447" integrity="sha512-57MDmcccJXYtNnH+ZiBwzC4jb2rvgVCEokYN+L/nLlmO8rfYT/gIpW2A569iJ/3b+0UEasghjuZH/ma3wIs/EQ==" data-cf-beacon='{"version":"2024.11.0","token":"7d6d73839b2a471b87b7214f1ed69bff","r":1,"server_timing":{"name":{"cfCacheStatus":true,"cfEdge":true,"cfExtPri":true,"cfL4":true,"cfOrigin":true,"cfSpeedBrain":true},"location_startswith":null}}' crossorigin="anonymous"></script>
  3435: "command": "plink -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"nawfdev@server3.hostdata.id\" \"php -l domains/onyx.nawf.dev/public_html/be/api/payment-proof.php && php -l domains/onyx.nawf.dev/public_html/be/api/resident-application.php && php -l domains/onyx.nawf.dev/public_html/be/lib/ApplicationMapper.php && grep 'index-1qWuzeHN\\|index-CVKGBQaY' domains/onyx.nawf.dev/public_html/index.html\"",
  3438: "description": "Verifies remote preview deployment"
  3444: No syntax errors detected in domains/onyx.nawf.dev/public_html/be/api/payment-proof.php
  3445: No syntax errors detected in domains/onyx.nawf.dev/public_html/be/api/resident-application.php
  3446: No syntax errors detected in domains/onyx.nawf.dev/public_html/be/lib/ApplicationMapper.php
  3461: "command": "$body = '{\"application_id\":\"APP-20260531135437-574\",\"residentName\":\"Debug User\",\"room\":\"A01\",\"senderBank\":\"BCA\",\"senderName\":\"Debug User\",\"amount\":\"1000\",\"fileName\":\"debug.txt\",\"status\":\"uploaded\",\"invoice\":\"ADM-2026\"}'; try { Invoke-WebRequest -Uri \"https://onyx.nawf.dev/be/api/payment-proof.php\" -Method POST -ContentType \"application/json\" -Body $body -UseBasicParsing | Select-Object -ExpandProperty Content } catch { $_.Exception.Response.StatusCode.value__ }",
  3495: "content": "Build deploy verify",
  3517: "content": "Build deploy verify",
  3538: Also deployed backend compatibility fix:
  3644: - `dist/`
  3653: I'll prepare a clean repo with only essential project files—no `node_modules`, `dist`, temp scripts, or PRD docs—then push to your GitHub.
  3806: dist/
  3880: - `fe/dist/`
  4032: 1. Create `.gitignore` excluding node_modules, dist, temp files, PRD, etc.
  4049: - `fe/dist/`
  4681: Actually, the user said "file file penting dan yang ga guna tolong jangan di upload juga". The sequence images ARE important - they're the hero scrolling sequence. But `node_modules` and `dist` should be excluded.
  4687: The local `database.php` has default XAMPP creds (root, no password) which is fine for dev. But the remote one has actual hosting credentials. Since we're deploying the local version, the local version is fine - it has `root` / empty password which is the XAMPP default.
  4699: "content": "# Dependencies\nnode_modules/\n\n# Build output\ndist/\n\n# Environment / secrets (credentials di config sudah default dev, aman)\n.env\n.env.local\n.env.*.local\n\n# OS files\n.DS_Store\nThumbs.db\ndesktop.ini\n\n# IDE\n.vscode/\n.idea/\n*.swp\n*.swo\n*~\n\n# Uploads / user-generated content\nbe/storage/uploads/*\n!be/storage/uploads/.gitkeep\n\n# JSON store data (runtime state, bukan source)\nbe/storage/applications.json\nbe/storage/payment-proofs.json\nbe/storage/utility-meters.json\n\n# Temp files\ntmp_*\n*.tmp\n*.log\n\n# Vite cache\n.vite/\n\n# Package manager lock (keep package-lock.json though)\n# yarn.lock\n# pnpm-lock.yaml\n"
  5262: 476 files staged correctly - no `node_modules`, no `dist`, no temp junk. Commit and push.
  5444: - `dist/` (build output)

C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\README.md
  16: - `fe/dist/` menjadi hasil build statis untuk XAMPP.

C:\Users\kaysa\OneDrive\Documents\PPL_UAS\README.md
  69: Untuk XAMPP, struktur deploy menjadi:

```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 34.6s)

**Tool: bash**

**Input:**
```json
{
  "command": "npm run build",
  "timeout": 120000,
  "workdir": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe",
  "description": "Builds frontend production bundle"
}
```

**Output:**
```

> kostku-fe@1.0.0 build
> vite build

[36mvite v8.0.14 [32mbuilding client environment for production...[36m[39m
[2Ktransforming...✓ 7 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   1.09 kB │ gzip:  0.58 kB
dist/assets/index-CldZWyMH.css  138.48 kB │ gzip: 24.02 kB
dist/assets/index-C0yBic1H.js   144.09 kB │ gzip: 36.39 kB

[32m✓ built in 1.30s[39m

```

**Tool: grep**

**Input:**
```json
{
  "pattern": "hashchange|DOMContentLoaded|renderApp\\(\\);|addEventListener\\('hash|addEventListener\\(\"hash",
  "include": "main.js",
  "path": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src",
  "output_mode": "content",
  "head_limit": 120
}
```

**Output:**
```
Found 11 match(es) in 1 file(s)

C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\main.js
  406: if (forceRender) renderApp();
  1104: renderApp();
  1536: if (forceRender && state.page === 'admin') renderApp();
  1661: if (!liveSections.includes(section)) return renderApp();
  1662: renderApp();
  1677: if (state.page === 'admin') renderApp();
  2077: renderApp();
  2113: renderApp();
  2126: renderApp();
  2146: renderApp();
  2172: renderApp();

```

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\dist",
  "offset": 0,
  "limit": 100
}
```

**Output:**
```
<path>C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\dist</path>
<type>directory</type>
<entries>
assets/
booking-courtyard.mp4
index.html
info_assets/
sequenze_1/
sequenze_2/
sequenze_3/

(7 entries)
</entries>
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 17.4s)

**Tool: grep**

**Input:**
```json
{
  "pattern": "scp|ftp|lftp|rsync|deploy|nawf|onyx\\.nawf|fe/dist|npm run build|cloudflare|rclone|wrangler",
  "include": "*.md",
  "path": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS",
  "output_mode": "content",
  "head_limit": 300
}
```

**Output:**
```
Found 98 match(es) in 4 file(s)

C:\Users\kaysa\OneDrive\Documents\PPL_UAS\docs\PRD_ONYX_RESIDENCE_FULLSTACK.md
  22: - Storage publik sequence: Cloudflare R2 bucket `onyx`, prefix `onyx-sequences/`, public base `https://assets.nawf.dev/onyx-sequences`.
  546: - public base URL: `https://assets.nawf.dev/onyx-sequences`;
  547: - FE build production harus memakai `VITE_ONYX_SEQUENCE_ASSET_BASE_URL=https://assets.nawf.dev/onyx-sequences`;
  572: npm run build
  575: Output build: `fe/dist`.
  580: VITE_ONYX_SEQUENCE_ASSET_BASE_URL=https://assets.nawf.dev/onyx-sequences
  583: Live target saat ini: `https://onyx.nawf.dev/`.

C:\Users\kaysa\OneDrive\Documents\PPL_UAS\session-ses_19ba.md
  298: "content": "Build deploy verify live",
  325: "content": "Build deploy verify live",
  396: "command": "rtk npm run build",
  444: "content": "Build deploy verify live",
  471: "content": "Build deploy verify live",
  489: "command": "if (Test-Path -LiteralPath \"dist\") { plink -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"nawfdev@server3.hostdata.id\" \"rm -rf domains/onyx.nawf.dev/public_html/assets && mkdir -p domains/onyx.nawf.dev/public_html/assets\"; if ($?) { pscp -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -r -pw \"GASy}TE~})Bq\" \"dist\\index.html\" \"dist\\assets\" \"nawfdev@server3.hostdata.id:domains/onyx.nawf.dev/public_html/\"; if ($?) { pscp -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"..\\be\\api\\payment-proof.php\" \"nawfdev@server3.hostdata.id:domains/onyx.nawf.dev/public_html/be/api/payment-proof.php\" } } } else { Write-Error \"dist not found\" }",
  514: "url": "https://onyx.nawf.dev/",
  532: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
  538: <script defer src="https://static.cloudflareinsights.com/beacon.min.js/v833ccba57c9e4d2798f2e76cebdd09a11778172276447" integrity="sha512-57MDmcccJXYtNnH+ZiBwzC4jb2rvgVCEokYN+L/nLlmO8rfYT/gIpW2A569iJ/3b+0UEasghjuZH/ma3wIs/EQ==" data-cf-beacon='{"version":"2024.11.0","token":"7d6d73839b2a471b87b7214f1ed69bff","r":1,"server_timing":{"name":{"cfCacheStatus":true,"cfEdge":true,"cfExtPri":true,"cfL4":true,"cfOrigin":true,"cfSpeedBrain":true},"location_startswith":null}}' crossorigin="anonymous"></script>
  573: "command": "plink -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"nawfdev@server3.hostdata.id\" \"php -l domains/onyx.nawf.dev/public_html/be/api/payment-proof.php && grep 'index-BhktvuQh\\|index-BWtNCjRo' domains/onyx.nawf.dev/public_html/index.html\"",
  576: "description": "Verifies remote proof fix deploy"
  582: No syntax errors detected in domains/onyx.nawf.dev/public_html/be/api/payment-proof.php
  614: "content": "Build deploy verify live",
  641: "content": "Build deploy verify live",
  935: "command": "plink -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"nawfdev@server3.hostdata.id\" \"tail -n 80 domains/onyx.nawf.dev/logs/error_log 2>/dev/null || tail -n 80 logs/error_log 2>/dev/null || find . -name error_log -type f -maxdepth 4 -print\"",
  1019: "command": "plink -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"nawfdev@server3.hostdata.id\" \"find domains/onyx.nawf.dev -name '*error*' -type f -print 2>/dev/null | head -20\"",
  1121: PHP auto-create simplified; frontend sync now survives 404. Verify/build/deploy.
  1165: "command": "rtk npm run build",
  1246: "command": "if (Test-Path -LiteralPath \"dist\") { plink -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"nawfdev@server3.hostdata.id\" \"rm -rf domains/onyx.nawf.dev/public_html/assets && mkdir -p domains/onyx.nawf.dev/public_html/assets\"; if ($?) { pscp -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -r -pw \"GASy}TE~})Bq\" \"dist\\index.html\" \"dist\\assets\" \"nawfdev@server3.hostdata.id:domains/onyx.nawf.dev/public_html/\"; if ($?) { pscp -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"..\\be\\api\\payment-proof.php\" \"nawfdev@server3.hostdata.id:domains/onyx.nawf.dev/public_html/be/api/payment-proof.php\" } } } else { Write-Error \"dist not found\" }",
  1271: "url": "https://onyx.nawf.dev/",
  1289: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
  1295: <script defer src="https://static.cloudflareinsights.com/beacon.min.js/v833ccba57c9e4d2798f2e76cebdd09a11778172276447" integrity="sha512-57MDmcccJXYtNnH+ZiBwzC4jb2rvgVCEokYN+L/nLlmO8rfYT/gIpW2A569iJ/3b+0UEasghjuZH/ma3wIs/EQ==" data-cf-beacon='{"version":"2024.11.0","token":"7d6d73839b2a471b87b7214f1ed69bff","r":1,"server_timing":{"name":{"cfCacheStatus":true,"cfEdge":true,"cfExtPri":true,"cfL4":true,"cfOrigin":true,"cfSpeedBrain":true},"location_startswith":null}}' crossorigin="anonymous"></script>
  1330: "command": "plink -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"nawfdev@server3.hostdata.id\" \"php -l domains/onyx.nawf.dev/public_html/be/api/payment-proof.php && grep 'index-Chgo9fq9\\|index-BWtNCjRo' domains/onyx.nawf.dev/public_html/index.html\"",
  1333: "description": "Verifies deployed safe proof fix"
  1339: No syntax errors detected in domains/onyx.nawf.dev/public_html/be/api/payment-proof.php
  1415: - Live deployed.
  1507: "command": "$body = '{\"application_id\":\"APP-20260531135437-574\",\"residentName\":\"Debug User\",\"room\":\"A01\",\"senderBank\":\"BCA\",\"senderName\":\"Debug User\",\"amount\":\"1000\",\"fileName\":\"debug.txt\",\"status\":\"uploaded\",\"invoice\":\"ADM-2026\"}'; try { Invoke-WebRequest -Uri \"https://onyx.nawf.dev/be/api/payment-proof.php\" -Method POST -ContentType \"application/json\" -Body $body -UseBasicParsing | Select-Object -ExpandProperty Content } catch { $_.Exception.Response.StatusCode.value__; $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream()); $reader.ReadToEnd() }",
  1530: index-Chgo9fq9.js:1  GET https://onyx.nawf.dev/be/api/resident-application.php?id=APP-20260531135437-574 404 (Not Found)
  1535: index-Chgo9fq9.js:1  POST https://onyx.nawf.dev/be/api/payment-proof.php 500 (Internal Server Error)
  1540: index-Chgo9fq9.js:1 Fetch finished loading: GET "https://onyx.nawf.dev/be/api/kamar.php".
  1545: index-Chgo9fq9.js:1 Fetch finished loading: GET "https://onyx.nawf.dev/be/api/utility-meter.php?application_id=APP-20260531135437-574".
  1550: index-Chgo9fq9.js:1 Fetch finished loading: GET "https://onyx.nawf.dev/be/api/service-ticket.php?application_id=APP-20260531135437-574".
  1555: index-Chgo9fq9.js:1 Fetch finished loading: GET "https://onyx.nawf.dev/be/api/access.php?application_id=APP-20260531135437-574".
  1560: index-Chgo9fq9.js:1 Fetch finished loading: GET "https://onyx.nawf.dev/be/api/iot-ingest.php?room_code=A01".
  1565: index-Chgo9fq9.js:1 Fetch finished loading: GET "https://onyx.nawf.dev/be/api/payment-proof.php?application_id=APP-20260531135437-574".
  1570: index-Chgo9fq9.js:1 XHR failed loading: POST "https://onyx.nawf.dev/be/api/payment-proof.php".
  1574: index-Chgo9fq9.js:1 Fetch failed loading: GET "https://onyx.nawf.dev/be/api/resident-application.php?id=APP-20260531135437-574
  1697: "command": "plink -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"nawfdev@server3.hostdata.id\" \"sed -n '1,120p' domains/onyx.nawf.dev/public_html/be/config/database.php 2>/dev/null && find domains/onyx.nawf.dev -type f -name 'error_log' -o -name '*error*.log' 2>/dev/null\"",
  1714: 'database' => getenv('DB_DATABASE') ?: 'nawfdev_onyx',
  1715: 'username' => getenv('DB_USERNAME') ?: 'nawfdev_onyx',
  1733: "command": "plink -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"nawfdev@server3.hostdata.id\" \"cd domains/onyx.nawf.dev/public_html && php -r 'require \\\"be/lib/Database.php\\\"; $db=Database::connection(); foreach ([\\\"resident_applications\\\",\\\"payment_proofs\\\"] as $t) { echo \\\"TABLE $t\\\\n\\\"; foreach ($db->query(\\\"DESCRIBE $t\\\") as $r) echo $r[\\\"Field\\\"].\\\" \\\".$r[\\\"Type\\\"].\\\" Null=\\\".$r[\\\"Null\\\"].\\\" Default=\\\".$r[\\\"Default\\\"].\\\"\\\\n\\\"; }'\"",
  1774: "command": "pscp -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"tmp_remote_schema.php\" \"nawfdev@server3.hostdata.id:domains/onyx.nawf.dev/public_html/tmp_remote_schema.php\"; if ($?) { plink -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"nawfdev@server3.hostdata.id\" \"cd domains/onyx.nawf.dev/public_html && php tmp_remote_schema.php; rm -f tmp_remote_schema.php\" }",
  2105: "command": "pscp -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"be\\api\\payment-proof.php\" \"nawfdev@server3.hostdata.id:domains/onyx.nawf.dev/public_html/be/api/payment-proof.php\"; if ($?) { pscp -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"be\\api\\resident-application.php\" \"nawfdev@server3.hostdata.id:domains/onyx.nawf.dev/public_html/be/api/resident-application.php\"; if ($?) { pscp -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"be\\lib\\ApplicationMapper.php\" \"nawfdev@server3.hostdata.id:domains/onyx.nawf.dev/public_html/be/lib/ApplicationMapper.php\" } }",
  2125: index-Chgo9fq9.js:1  GET https://onyx.nawf.dev/be/api/resident-application.php?id=APP-20260531135437-574 404 (Not Found)
  2130: index-Chgo9fq9.js:1  POST https://onyx.nawf.dev/be/api/payment-proof.php 500 (Internal Server Error)
  2135: index-Chgo9fq9.js:1 Fetch finished loading: GET "https://onyx.nawf.dev/be/api/kamar.php".
  2140: index-Chgo9fq9.js:1 Fetch finished loading: GET "https://onyx.nawf.dev/be/api/utility-meter.php?application_id=APP-20260531135437-574".
  2145: index-Chgo9fq9.js:1 Fetch finished loading: GET "https://onyx.nawf.dev/be/api/service-ticket.php?application_id=APP-20260531135437-574".
  2150: index-Chgo9fq9.js:1 Fetch finished loading: GET "https://onyx.nawf.dev/be/api/access.php?application_id=APP-20260531135437-574".
  2155: index-Chgo9fq9.js:1 Fetch finished loading: GET "https://onyx.nawf.dev/be/api/iot-ingest.php?room_code=A01".
  2160: index-Chgo9fq9.js:1 Fetch finished loading: GET "https://onyx.nawf.dev/be/api/payment-proof.php?application_id=APP-20260531135437-574".
  2165: index-Chgo9fq9.js:1 XHR failed loading: POST "https://onyx.nawf.dev/be/api/payment-proof.php".
  2169: index-Chgo9fq9.js:1 Fetch failed loading: GET "https://onyx.nawf.dev/be/api/resident-application.php?id=APP-20260531135437-574
  2182: "command": "$body = '{\"application_id\":\"APP-20260531135437-574\",\"residentName\":\"Debug User\",\"room\":\"A01\",\"senderBank\":\"BCA\",\"senderName\":\"Debug User\",\"amount\":\"1000\",\"fileName\":\"debug.txt\",\"status\":\"uploaded\",\"invoice\":\"ADM-2026\"}'; try { Invoke-WebRequest -Uri \"https://onyx.nawf.dev/be/api/payment-proof.php\" -Method POST -ContentType \"application/json\" -Body $body -UseBasicParsing | Select-Object -ExpandProperty Content } catch { $_.Exception.Response.StatusCode.value__; if ($_.Exception.Response) { $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream()); $reader.ReadToEnd() } }",
  2206: "url": "https://onyx.nawf.dev/be/api/resident-application.php?id=APP-20260531135437-574",
  2246: "url": "https://onyx.nawf.dev/be/api/payment-proof.php?application_id=APP-20260531135437-574",
  2286: "url": "https://onyx.nawf.dev/be/api/admin-state.php",
  2437: "content": "Build deploy verify",
  2459: "content": "Build deploy verify",
  3207: Proof preview modal patched. Build/deploy now.
  3226: "content": "Build deploy verify",
  3248: "content": "Build deploy verify",
  3318: "command": "rtk npm run build",
  3349: [Omitted long matching line]
  3376: "url": "https://onyx.nawf.dev/",
  3394: <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
  3400: <script defer src="https://static.cloudflareinsights.com/beacon.min.js/v833ccba57c9e4d2798f2e76cebdd09a11778172276447" integrity="sha512-57MDmcccJXYtNnH+ZiBwzC4jb2rvgVCEokYN+L/nLlmO8rfYT/gIpW2A569iJ/3b+0UEasghjuZH/ma3wIs/EQ==" data-cf-beacon='{"version":"2024.11.0","token":"7d6d73839b2a471b87b7214f1ed69bff","r":1,"server_timing":{"name":{"cfCacheStatus":true,"cfEdge":true,"cfExtPri":true,"cfL4":true,"cfOrigin":true,"cfSpeedBrain":true},"location_startswith":null}}' crossorigin="anonymous"></script>
  3435: "command": "plink -batch -hostkey \"SHA256:Kvs9lzPSqDbrd41zDTdfgXbdiAzImr7JibZIlR6WZKQ\" -pw \"GASy}TE~})Bq\" \"nawfdev@server3.hostdata.id\" \"php -l domains/onyx.nawf.dev/public_html/be/api/payment-proof.php && php -l domains/onyx.nawf.dev/public_html/be/api/resident-application.php && php -l domains/onyx.nawf.dev/public_html/be/lib/ApplicationMapper.php && grep 'index-1qWuzeHN\\|index-CVKGBQaY' domains/onyx.nawf.dev/public_html/index.html\"",
  3438: "description": "Verifies remote preview deployment"
  3444: No syntax errors detected in domains/onyx.nawf.dev/public_html/be/api/payment-proof.php
  3445: No syntax errors detected in domains/onyx.nawf.dev/public_html/be/api/resident-application.php
  3446: No syntax errors detected in domains/onyx.nawf.dev/public_html/be/lib/ApplicationMapper.php
  3461: "command": "$body = '{\"application_id\":\"APP-20260531135437-574\",\"residentName\":\"Debug User\",\"room\":\"A01\",\"senderBank\":\"BCA\",\"senderName\":\"Debug User\",\"amount\":\"1000\",\"fileName\":\"debug.txt\",\"status\":\"uploaded\",\"invoice\":\"ADM-2026\"}'; try { Invoke-WebRequest -Uri \"https://onyx.nawf.dev/be/api/payment-proof.php\" -Method POST -ContentType \"application/json\" -Body $body -UseBasicParsing | Select-Object -ExpandProperty Content } catch { $_.Exception.Response.StatusCode.value__ }",
  3495: "content": "Build deploy verify",
  3517: "content": "Build deploy verify",
  3538: Also deployed backend compatibility fix:
  3557: upload ke github https://github.com/nawf-dev/onyx-web file file penting dan yang ga guna tolong jangan di upload juga
  3611: upload ke github https://github.com/nawf-dev/onyx-web file file penting dan yang ga guna tolong jangan di upload juga
  3619: The user wants me to upload the important files to their GitHub repo at https://github.com/nawf-dev/onyx-web, and exclude unnecessary files. Let me first understand what we have:
  3622: 2. The repo to push to is `https://github.com/nawf-dev/onyx-web`
  3880: - `fe/dist/`
  4049: - `fe/dist/`
  4687: The local `database.php` has default XAMPP creds (root, no password) which is fine for dev. But the remote one has actual hosting credentials. Since we're deploying the local version, the local version is fine - it has `root` / empty password which is the XAMPP default.
  4721: [Omitted long matching line]
  5319: "command": "$env:CI='true'; $env:DEBIAN_FRONTEND='noninteractive'; $env:GIT_TERMINAL_PROMPT='0'; $env:GCM_INTERACTIVE='never'; $env:HOMEBREW_NO_AUTO_UPDATE='1'; $env:GIT_EDITOR=':'; $env:EDITOR=':'; $env:VISUAL=''; $env:GIT_SEQUENCE_EDITOR=':'; $env:GIT_MERGE_AUTOEDIT='no'; $env:GIT_PAGER='cat'; $env:PAGER='cat'; $env:npm_config_yes='true'; $env:PIP_NO_INPUT='1'; $env:YARN_ENABLE_IMMUTABLE_INSTALLS='false'; rtk git commit -m \"feat: Onyx Residence - full web app (frontend + backend + IoT)\"; if ($LASTEXITCODE -eq 0) { $env:GIT_TERMINAL_PROMPT='0'; $env:GCM_INTERACTIVE='never'; git remote add origin https://github.com/nawf-dev/onyx-web.git 2>$null; rtk git branch -M main; rtk git push -u origin main }",
  5417: Done. Repo live di `https://github.com/nawf-dev/onyx-web`.

C:\Users\kaysa\OneDrive\Documents\PPL_UAS\README.md
  38: npm run build
  69: Untuk XAMPP, struktur deploy menjadi:

C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\README.md
  10: npm run build
  16: - `fe/dist/` menjadi hasil build statis untuk XAMPP.
  25: VITE_ONYX_SEQUENCE_ASSET_BASE_URL=https://your-assets-domain.example/onyx-sequences npm run build

```

**Tool: grep**

**Input:**
```json
{
  "pattern": "renderApp\\(\\)$|window\\.addEventListener\\('hashchange|DOMContentLoaded|document\\.addEventListener\\('DOMContentLoaded|initScrollSequences\\(\\);",
  "include": "main.js",
  "path": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src",
  "output_mode": "content",
  "head_limit": 200
}
```

**Output:**
```
No matches found
```

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\dist\\index.html",
  "offset": 1,
  "limit": 80
}
```

**Output:**
```
<path>C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\dist\index.html</path>
<type>file</type>
<content>
1: <!doctype html>
2: <html lang="id">
3:   <head>
4:     <meta charset="UTF-8" />
5:     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
6:     <meta name="description" content="Onyx Residence portal untuk booking kamar, panel penghuni, administrasi, tagihan, dan layanan hunian." />
7: <title>Onyx Residence</title>
8:     <link rel="preconnect" href="https://fonts.googleapis.com" />
9:     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
10:     <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500;600;700;800&family=Source+Serif+4:opsz,wght@8..60,600;8..60,700&display=swap" rel="stylesheet" />
11:     <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
12:     <script>
13:       window.__ONYX_SEQUENCE_ASSET_BASE_URL = window.__ONYX_SEQUENCE_ASSET_BASE_URL || '';
14:     </script>
15:     <script type="module" crossorigin src="./assets/index-C0yBic1H.js"></script>
16:     <link rel="stylesheet" crossorigin href="./assets/index-CldZWyMH.css">
17:   </head>
18:   <body>
19:     <div id="app"></div>
20:   </body>
21: </html>

(End of file - total 21 lines)
</content>
```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 21.0s)

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src\\main.js",
  "offset": 3200,
  "limit": 200
}
```

**Output:**
```
<path>C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\main.js</path>
<type>file</type>
<content>
3200:     canvas.width = width;
3201:     canvas.height = height;
3202:   }
3203: 
3204:   const context = canvas.getContext('2d');
3205:   if (!context) return;
3206:   context.imageSmoothingEnabled = true;
3207:   context.imageSmoothingQuality = 'high';
3208:   context.clearRect(0, 0, width, height);
3209:   sequence.lastDrawnFrame = drawableFrame;
3210: 
3211:   const isMobileSequence = window.matchMedia('(max-width: 640px)').matches;
3212:   const mobileFocus = {
3213:     facade: { x: 0.52, y: 0.5 },
3214:     interior: { x: 0.5, y: 0.52 },
3215:     booking: { x: 0.55, y: 0.5 },
3216:   };
3217:   const focus = isMobileSequence ? mobileFocus[sequence.name] || { x: 0.5, y: 0.5 } : { x: 0.5, y: 0.5 };
3218:   const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
3219:   const renderWidth = image.naturalWidth * scale;
3220:   const renderHeight = image.naturalHeight * scale;
3221:   const dx = Math.min(0, Math.max(width - renderWidth, width * focus.x - renderWidth * focus.x));
3222:   const dy = Math.min(0, Math.max(height - renderHeight, height * focus.y - renderHeight * focus.y));
3223:   context.drawImage(image, dx, dy, renderWidth, renderHeight);
3224: 
3225:   if (Math.abs(targetFrame - sequence.current) >= 0.08) {
3226:     window.requestAnimationFrame(() => drawSequenceFrame(sequence));
3227:   }
3228: }
3229: 
3230: /**
3231:  * @description Memuat frame sequence ke cache; frame pertama tampil cepat, sisanya dipreload antrean background.
3232:  * @param {{folder:string,total:number,images:HTMLImageElement[],loading:Set<number>}} sequence Konfigurasi sequence.
3233:  * @param {number} frame Nomor frame yang dibutuhkan.
3234:  * @returns {HTMLImageElement|null} Frame image bila tersedia.
3235:  */
3236: function loadSequenceFrame(sequence, frame) {
3237:   if (sequence.images[frame]) return sequence.images[frame];
3238:   if (sequence.loading.has(frame)) return null;
3239:   sequence.loading.add(frame);
3240:   const image = new Image();
3241:   image.decoding = 'async';
3242:   image.onload = () => {
3243:     sequence.loading.delete(frame);
3244:     window.__kostkuSequenceUpdate?.();
3245:   };
3246:   image.onerror = () => sequence.loading.delete(frame);
3247:   image.src = framePath(sequence.folder, frame);
3248:   sequence.images[frame] = image;
3249:   return image;
3250: }
3251: 
3252: /**
3253:  * @description Memprioritaskan frame sekitar scroll aktif supaya animasi tidak menunggu preload linear.
3254:  * @param {{total:number}} sequence Konfigurasi sequence.
3255:  * @param {number} frame Frame target dari posisi scroll.
3256:  * @returns {void}
3257:  */
3258: function prefetchActiveSequenceFrames(sequence, frame) {
3259:   const radius = window.matchMedia('(max-width: 640px)').matches ? 6 : 10;
3260:   for (let offset = 0; offset <= radius; offset += 1) {
3261:     const before = frame - offset;
3262:     const after = frame + offset;
3263:     if (before >= 1) loadSequenceFrame(sequence, before);
3264:     if (offset && after <= sequence.total) loadSequenceFrame(sequence, after);
3265:   }
3266: }
3267: 
3268: /**
3269:  * @description Mengambil frame terdekat yang sudah selesai dimuat agar canvas tetap bergerak walau target belum siap.
3270:  * @param {{total:number,images:HTMLImageElement[],lastDrawnFrame?:number}} sequence Konfigurasi sequence.
3271:  * @param {number} frame Frame ideal yang ingin digambar.
3272:  * @returns {number|null} Nomor frame yang siap digambar.
3273:  */
3274: function getDrawableSequenceFrame(sequence, frame) {
3275:   const exact = sequence.images[frame];
3276:   if (exact?.complete && exact.naturalWidth) return frame;
3277:   const searchRadius = 18;
3278:   for (let offset = 1; offset <= searchRadius; offset += 1) {
3279:     const before = frame - offset;
3280:     const after = frame + offset;
3281:     const beforeImage = before >= 1 ? sequence.images[before] : null;
3282:     if (beforeImage?.complete && beforeImage.naturalWidth) return before;
3283:     const afterImage = after <= sequence.total ? sequence.images[after] : null;
3284:     if (afterImage?.complete && afterImage.naturalWidth) return after;
3285:   }
3286:   const lastImage = sequence.lastDrawnFrame ? sequence.images[sequence.lastDrawnFrame] : null;
3287:   if (lastImage?.complete && lastImage.naturalWidth) return sequence.lastDrawnFrame;
3288:   const firstImage = sequence.images[1];
3289:   return firstImage?.complete && firstImage.naturalWidth ? 1 : null;
3290: }
3291: 
3292: /**
3293:  * @description Menjadwalkan preload semua frame setelah load awal agar browser tidak terlihat macet saat first paint.
3294:  * @param {Array<{folder:string,total:number,images:HTMLImageElement[],loading:Set<number>}>>} sequences Daftar sequence.
3295:  * @returns {void}
3296:  */
3297: function scheduleSequencePreload(sequences) {
3298:   const startPreload = () => {
3299:     if ('requestIdleCallback' in window) {
3300:       window.requestIdleCallback(() => preloadSequenceFrames(sequences), { timeout: 1600 });
3301:     } else {
3302:       window.setTimeout(() => preloadSequenceFrames(sequences), 240);
3303:     }
3304:   };
3305:   if (document.readyState === 'complete') {
3306:     startPreload();
3307:   } else {
3308:     window.addEventListener('load', startPreload, { once: true });
3309:   }
3310: }
3311: 
3312: /**
3313:  * @description Preload semua frame dengan antrean kecil supaya cache penuh tanpa membanjiri network.
3314:  * @param {Array<{folder:string,total:number,images:HTMLImageElement[],loading:Set<number>}>>} sequences Daftar sequence.
3315:  * @returns {void}
3316:  */
3317: function preloadSequenceFrames(sequences) {
3318:   const maxFrames = Math.max(...sequences.map((sequence) => sequence.total));
3319:   const queue = [];
3320:   for (let frame = 1; frame <= maxFrames; frame += 1) {
3321:     sequences.forEach((sequence) => {
3322:       if (frame <= sequence.total) queue.push({ sequence, frame });
3323:     });
3324:   }
3325:   const concurrency = Math.max(3, Math.min(6, Math.floor((navigator.hardwareConcurrency || 6) / 2)));
3326:   let active = 0;
3327: 
3328:   const scheduleNext = () => {
3329:     if ('requestIdleCallback' in window) {
3330:       window.requestIdleCallback(loadNext, { timeout: 1200 });
3331:     } else {
3332:       window.setTimeout(loadNext, 80);
3333:     }
3334:   };
3335: 
3336:   const finish = () => {
3337:     active -= 1;
3338:     scheduleNext();
3339:   };
3340: 
3341:   const loadNext = () => {
3342:     while (active < concurrency && queue.length) {
3343:       const { sequence, frame } = queue.shift();
3344:       const existing = sequence.images[frame];
3345:       if (existing?.complete) continue;
3346:       const image = loadSequenceFrame(sequence, frame);
3347:       if (!image || image.complete) continue;
3348:       active += 1;
3349:       image.addEventListener('load', finish, { once: true });
3350:       image.addEventListener('error', finish, { once: true });
3351:     }
3352:   };
3353: 
3354:   loadNext();
3355: }
3356: 
3357: /**
3358:  * @description Membuat path frame sequence berdasarkan nomor frame.
3359:  * @param {string} folder Nama folder sequence.
3360:  * @param {number} frame Nomor frame.
3361:  * @returns {string} Path frame JPG.
3362:  */
3363: function framePath(folder, frame) {
3364:   const runtimeBaseUrl = typeof window.__ONYX_SEQUENCE_ASSET_BASE_URL === 'string' ? window.__ONYX_SEQUENCE_ASSET_BASE_URL : '';
3365:   const buildBaseUrl = import.meta.env.VITE_ONYX_SEQUENCE_ASSET_BASE_URL || '';
3366:   const baseUrl = String(runtimeBaseUrl || buildBaseUrl).trim().replace(/\/+$/, '');
3367:   const relativePath = `${folder}/ezgif-frame-${String(frame).padStart(3, '0')}.jpg`;
3368:   return baseUrl ? `${baseUrl}/${relativePath}` : `./${relativePath}`;
3369: }
3370: 
3371: /**
3372:  * @description Menampilkan toast ringkas untuk feedback panel.
3373:  * @param {string} message Pesan yang ingin ditampilkan.
3374:  * @returns {void}
3375:  */
3376: function showToast(message) {
3377:   const toast = document.createElement('div');
3378:   toast.className = 'toast';
3379:   toast.innerHTML = `<i class="fa-solid fa-circle-check"></i><span>${escapeHtml(message)}</span>`;
3380:   document.body.appendChild(toast);
3381:   requestAnimationFrame(() => toast.classList.add('is-visible'));
3382:   window.setTimeout(() => {
3383:     toast.classList.remove('is-visible');
3384:     window.setTimeout(() => toast.remove(), 220);
3385:   }, 2400);
3386: }
3387: 
3388: // Sinkronisasi halaman saat hash URL diganti manual.
3389: window.addEventListener('hashchange', () => {
3390:   state.page = getInitialPage();
3391:   renderApp();
3392: });
3393: 
3394: renderApp();

(End of file - total 3394 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src\\main.js",
  "offset": 3000,
  "limit": 180
}
```

**Output:**
```
<path>C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\main.js</path>
<type>file</type>
<content>
3000:     state.roomType = event.currentTarget.value;
3001:     renderApp();
3002:   });
3003: 
3004:   document.querySelector('#statusFilter')?.addEventListener('change', (event) => {
3005:     state.roomStatus = event.currentTarget.value;
3006:     renderApp();
3007:   });
3008: 
3009:   // Event CRUD kamar create/update: simpan data kamar ke backend kamar.php lalu fallback lokal jika backend mati.
3010:   document.querySelector('#roomForm')?.addEventListener('submit', (event) => {
3011:     event.preventDefault();
3012:     const form = new FormData(event.currentTarget);
3013:     const categoryMap = { Standard: 1, Deluxe: 2, Suite: 3, VIP: 4 };
3014:     const id = Number(form.get('id_kamar') || 0);
3015:     const roomPayload = {
3016:       ...(id ? { id_kamar: id } : {}),
3017:       no_kamar: String(form.get('no_kamar') || '').trim(),
3018:       id_kategori: categoryMap[String(form.get('kategori') || 'Standard')] || 1,
3019:       nama_kamar: String(form.get('nama_kamar') || '').trim(),
3020:       harga_per_bulan: Number(form.get('harga') || 0),
3021:       fasilitas: String(form.get('fasilitas') || '').trim(),
3022:       status: String(form.get('status') || 'tersedia'),
3023:     };
3024:     const localRoom = {
3025:       id: id || Date.now(),
3026:       no: roomPayload.no_kamar,
3027:       name: roomPayload.nama_kamar,
3028:       type: String(form.get('kategori') || 'Standard'),
3029:       price: roomPayload.harga_per_bulan,
3030:       status: roomPayload.status,
3031:       floor: '-',
3032:       facilities: roomPayload.fasilitas.split(',').map((item) => item.trim()).filter(Boolean),
3033:     };
3034:     const saveLocalRoom = () => {
3035:       state.rooms = [...state.rooms.filter((room) => room.no !== localRoom.no && String(room.id) !== String(localRoom.id)), localRoom].sort((a, b) => String(a.no).localeCompare(String(b.no)));
3036:       window.localStorage.setItem('onyx-rooms', JSON.stringify(state.rooms));
3037:       state.isRoomCreateOpen = false;
3038:       state.adminRoomDetail = localRoom.no;
3039:       renderApp();
3040:     };
3041:     apiJson('kamar.php', { method: id ? 'PATCH' : 'POST', body: JSON.stringify(roomPayload) })
3042:       .then(() => syncRooms(true))
3043:       .then(() => {
3044:         state.isRoomCreateOpen = false;
3045:         state.adminRoomDetail = roomPayload.no_kamar;
3046:         showToast('Kamar tersimpan. Book dan price list ikut update.');
3047:         renderApp();
3048:       })
3049:       .catch(() => {
3050:         saveLocalRoom();
3051:         showToast('Backend kamar belum tersambung. Kamar disimpan lokal dan tetap muncul di Book/Price List.');
3052:       });
3053:   });
3054: 
3055:   // Event utility meter: admin mencatat kWh, air, tarif, dan total tagihan kamar.
3056:   const handleUtilityMeterSubmit = async (event) => {
3057:     event.preventDefault();
3058:     const form = new FormData(event.currentTarget);
3059:     const selected = event.currentTarget.querySelector('select[name="application_id"]')?.selectedOptions[0];
3060:     const payload = {
3061:       application_id: String(form.get('application_id') || ''),
3062:       residentName: selected?.dataset.name || String(form.get('residentName') || ''),
3063:       room: selected?.dataset.room || String(form.get('room') || ''),
3064:       month: String(form.get('month') || ''),
3065:       electricKwh: Number(form.get('electricKwh') || 0),
3066:       waterM3: Number(form.get('waterM3') || 0),
3067:       electricRate: Number(form.get('electricRate') || 0),
3068:       waterRate: Number(form.get('waterRate') || 0),
3069:       fixedFee: Number(form.get('fixedFee') || 0),
3070:       status: 'Pending',
3071:     };
3072:     try {
3073:       await apiJson('utility-meter.php', { method: 'POST', body: JSON.stringify(payload) });
3074:       await syncAdminState(true);
3075:       showToast('Meter listrik dan air tersimpan ke kamar.');
3076:     } catch (error) {
3077:       showToast('Gagal menyimpan meter utilitas ke backend.');
3078:     }
3079:   };
3080: 
3081:   document.querySelector('#roomUtilityMeterForm')?.addEventListener('submit', handleUtilityMeterSubmit);
3082: 
3083:   // Event smart control admin: tombol di Detail Kamar mengubah lampu/AC/kipas/air per kamar.
3084:   document.querySelectorAll('[data-admin-room-device]').forEach((button) => {
3085:     button.addEventListener('click', () => {
3086:       const roomCode = button.dataset.roomCode || 'default';
3087:       const devices = getRoomDeviceState(roomCode);
3088:       devices[button.dataset.adminRoomDevice] = !devices[button.dataset.adminRoomDevice];
3089:       saveRoomDeviceState(devices, roomCode);
3090:       showToast(`Kontrol kamar ${roomCode} diperbarui.`);
3091:       renderApp();
3092:     });
3093:   });
3094: 
3095:   // Event suhu admin: slider AC di Detail Kamar menyimpan temperatur khusus kamar tersebut.
3096:   document.querySelectorAll('[data-admin-room-temp]').forEach((input) => {
3097:     input.addEventListener('input', () => {
3098:       const roomCode = input.dataset.adminRoomTemp || 'default';
3099:       const devices = getRoomDeviceState(roomCode);
3100:       devices.temperature = Number(input.value || 24);
3101:       saveRoomDeviceState(devices, roomCode);
3102:       showToast(`Suhu AC ${roomCode}: ${devices.temperature}°C.`);
3103:       renderApp();
3104:     });
3105:   });
3106: 
3107:   // Event print invoice: simpan invoice terpilih lalu buka dialog print browser.
3108:   document.querySelectorAll('[data-print-invoice]').forEach((button) => {
3109:     button.addEventListener('click', () => {
3110:       const invoice = getResidentInvoices().find((item) => item.code === button.dataset.printInvoice) || {
3111:         code: button.dataset.printInvoice,
3112:         item: button.dataset.printItem,
3113:         amount: button.dataset.printAmount,
3114:         status: button.dataset.printStatus,
3115:       };
3116:       window.localStorage.setItem('onyx-selected-invoice', JSON.stringify(invoice));
3117:       renderApp();
3118:       window.setTimeout(() => window.print(), 80);
3119:       showToast(`Print invoice ${invoice.code}.`);
3120:     });
3121:   });
3122: 
3123:   // Event print umum: tombol cetak halaman/kamar/invoice memakai fitur print bawaan browser.
3124:   document.querySelectorAll('#printPage, #printRooms, #printInvoice').forEach((button) => button.addEventListener('click', () => window.print()));
3125: }
3126: 
3127: /**
3128:  * @description Mengaktifkan image sequence yang bergerak sesuai posisi scroll.
3129:  * @returns {void}
3130:  */
3131: function initScrollSequences() {
3132:   const sequenceCanvases = document.querySelectorAll('[data-sequence]');
3133:   if (!sequenceCanvases.length) {
3134:     if (window.__kostkuSequenceUpdate) window.removeEventListener('scroll', window.__kostkuSequenceUpdate);
3135:     if (window.__kostkuSequenceResize) window.removeEventListener('resize', window.__kostkuSequenceResize);
3136:     window.__kostkuSequenceUpdate = null;
3137:     window.__kostkuSequenceResize = null;
3138:     window.__kostkuSequencesReady = false;
3139:     return;
3140:   }
3141:   if (window.__kostkuSequencesReady) return;
3142: 
3143:   const sequences = [
3144:     { name: 'facade', folder: 'sequenze_1', total: 193, images: [], current: 1, loading: new Set() },
3145:     { name: 'interior', folder: 'sequenze_2', total: 92, images: [], current: 1, loading: new Set() },
3146:     { name: 'booking', folder: 'sequenze_3', total: 141, images: [], current: 1, loading: new Set() },
3147:   ];
3148: 
3149:   sequences.forEach((sequence) => loadSequenceFrame(sequence, 1));
3150:   scheduleSequencePreload(sequences);
3151: 
3152:   const update = () => {
3153:     sequences.forEach((sequence) => drawSequenceFrame(sequence));
3154:   };
3155: 
3156:   if (window.__kostkuSequenceUpdate) window.removeEventListener('scroll', window.__kostkuSequenceUpdate);
3157:   if (window.__kostkuSequenceResize) window.removeEventListener('resize', window.__kostkuSequenceResize);
3158:   let isSequenceFrameQueued = false;
3159:   window.__kostkuSequenceUpdate = () => {
3160:     if (isSequenceFrameQueued) return;
3161:     isSequenceFrameQueued = true;
3162:     window.requestAnimationFrame(() => {
3163:       isSequenceFrameQueued = false;
3164:       update();
3165:     });
3166:   };
3167:   window.__kostkuSequenceResize = window.__kostkuSequenceUpdate;
3168:   window.addEventListener('scroll', window.__kostkuSequenceUpdate, { passive: true });
3169:   window.addEventListener('resize', window.__kostkuSequenceResize);
3170:   window.__kostkuSequencesReady = true;
3171:   update();
3172: }
3173: 
3174: /**
3175:  * @description Menggambar frame sequence ke canvas sesuai posisi scroll.
3176:  * @param {{name:string,folder:string,total:number,images:HTMLImageElement[],current:number}} sequence Konfigurasi sequence.
3177:  * @returns {void}
3178:  */
3179: function drawSequenceFrame(sequence) {

(Showing lines 3000-3179 of 3394. Use offset=3180 to continue.)
</content>
```

**Tool: glob**

**Input:**
```json
{
  "pattern": "**/.htaccess",
  "path": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS"
}
```

**Output:**
```
No files found
```

**Tool: glob**

**Input:**
```json
{
  "pattern": "**/*.{ps1,bat,cmd,sh}",
  "path": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS"
}
```

**Output:**
```
No files found
```

**Tool: grep**

**Input:**
```json
{
  "pattern": "window\\.addEventListener\\(|renderApp\\(\\)|hashchange|DOMContentLoaded",
  "include": "main.js",
  "path": "C:\\Users\\kaysa\\OneDrive\\Documents\\PPL_UAS\\fe\\src",
  "output_mode": "content",
  "head_limit": 300
}
```

**Output:**
```
Found 14 match(es) in 1 file(s)

C:\Users\kaysa\OneDrive\Documents\PPL_UAS\fe\src\main.js
  406: if (forceRender) renderApp();
  1104: renderApp();
  1536: if (forceRender && state.page === 'admin') renderApp();
  1661: if (!liveSections.includes(section)) return renderApp();
  1662: renderApp();
  1677: if (state.page === 'admin') renderApp();
  2077: renderApp();
  2113: renderApp();
  2126: renderApp();
  2146: renderApp();
  2172: renderApp();
  3168: window.addEventListener('scroll', window.__kostkuSequenceUpdate, { passive: true });
  3169: window.addEventListener('resize', window.__kostkuSequenceResize);
  3308: window.addEventListener('load', startPreload, { once: true });

```

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 4.6s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 4.1s)

---

## User

lanjut

---

## Assistant (Sisyphus (Ultraworker) · opencode-go/qwen3.7-max · 2.6s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Sisyphus (Ultraworker) · opencode-go/qwen3.7-max · 2.1s)

---

## User

lanjut

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 4.4s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 5.4s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 8.3s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 8.3s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 7.2s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 8.5s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 8.2s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 13.5s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 10.7s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 10.8s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 9.5s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 9.4s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 11.0s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 8.5s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 9.7s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 9.0s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 9.0s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 9.2s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 10.5s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 14.4s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 8.8s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 9.2s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 8.5s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 7.9s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 3.8s)

---

## User

lanjut

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 4.7s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 4.4s)

---

## User

lannjut

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 6.1s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh · 5.2s)

---

## User

[SYSTEM DIRECTIVE: OH-MY-OPENCODE - TODO CONTINUATION]

Incomplete tasks remain in your todo list. Continue working on the next pending task.

- Proceed without asking for permission
- Mark each task complete when finished
- Do not stop until all tasks are done
- If you believe all work is already complete, the system is questioning your completion claim. Critically re-examine each todo item from a skeptical perspective, verify the work was actually done correctly, and update the todo list accordingly.

[Status: 2/5 completed, 3 remaining]

Remaining tasks:
- [in_progress] Implementasikan UI/admin entrypoint dan handler yang dibutuhkan
- [pending] Build dan verifikasi perubahan frontend
- [pending] Laporkan hasil dan langkah deploy
<!-- OMO_INTERNAL_INITIATOR -->

---

## Assistant (Hephaestus (Deep Agent) · cx/gpt-5.5-xhigh)

---

