/**
 * Utility functions for consistent currency and number formatting
 * across the EazyChise platform.
 */

export function formatRupiah(angka: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(angka)
}

/**
 * Formats numbers into abbreviated strings (e.g., 1.5M, 500K)
 */
export function formatAngkaSingkat(angka: number): string {
  if (angka >= 1_000_000_000) return `${(angka / 1_000_000_000).toFixed(1)}M`
  if (angka >= 1_000_000) return `${(angka / 1_000_000).toFixed(1)}Jt`
  if (angka >= 1_000) return `${(angka / 1_000).toFixed(0)}rb`
  return angka.toString()
}

/**
 * Formats a number to millions (Juta) specifically for F&B investment context
 */
export function formatJuta(angka: number): string {
  const juta = angka / 1_000_000;
  return `Rp ${juta.toLocaleString('id-ID')} Juta`;
}
