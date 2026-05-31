/**
 * @description Format angka menjadi Rupiah tanpa pecahan desimal.
 * @param {number} value Nilai uang yang akan diformat.
 * @returns {string} Nilai dalam format Rupiah.
 */
export function rupiah(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * @description Mengubah string menjadi teks aman untuk atribut HTML sederhana.
 * @param {string} value Teks mentah.
 * @returns {string} Teks yang sudah di-escape.
 */
export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

/**
 * @description Membuat id slug pendek dari teks.
 * @param {string} value Teks input.
 * @returns {string} Slug lowercase.
 */
export function slug(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
