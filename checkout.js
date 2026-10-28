"use strict";

const DISKON_MEMBER = 0.1;
const BATAS_GRATIS_ONGKIR = 250000;
const ONGKIR_NORMAL = 15000;

function hitungCheckout(harga, jumlah, isMember) {
  // 1. Validasi input. Kalau tidak valid, perhitungan tidak dilanjutkan.
  if (typeof harga !== "number" || !Number.isFinite(harga) || harga <= 0) {
    return "Input tidak valid: harga produk harus berupa angka positif";
  }

  if (typeof jumlah !== "number" || !Number.isInteger(jumlah) || jumlah <= 0) {
    return "Input tidak valid: jumlah produk harus berupa bilangan bulat positif";
  }

  if (typeof isMember !== "boolean") {
    return "Input tidak valid: status member harus boolean (true/false)";
  }

  // 2. Hitung subtotal.
  const subtotal = harga * jumlah;

  // 3. Diskon hanya untuk member.
  let diskon = 0;
  if (isMember === true) {
    diskon = subtotal * DISKON_MEMBER;
  }

  const setelahDiskon = subtotal - diskon;

  // 4. Ongkir dilihat dari total setelah diskon, bukan dari subtotal.
  let ongkir = ONGKIR_NORMAL;
  if (setelahDiskon >= BATAS_GRATIS_ONGKIR) {
    ongkir = 0;
  }

  // 5. Total pembayaran.
  const total = setelahDiskon + ongkir;

  return {
    subtotal: subtotal,
    diskon: diskon,
    ongkir: ongkir,
    total: total,
  };
}

// Bagian di bawah ini hanya dipakai kalau file dijalankan lewat terminal.
function formatRupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

function tampilkanHasil(hasil) {
  if (typeof hasil === "string") {
    console.log(hasil);
    return;
  }

  console.log("Subtotal      :", formatRupiah(hasil.subtotal));
  console.log("Diskon        :", formatRupiah(hasil.diskon));
  console.log("Ongkir        :", hasil.ongkir === 0 ? "GRATIS" : formatRupiah(hasil.ongkir));
  console.log("Total bayar   :", formatRupiah(hasil.total));
}

if (require.main === module) {
  const argHarga = process.argv[2];
  const argJumlah = process.argv[3];
  const argMember = process.argv[4];

  if (argHarga === undefined || argJumlah === undefined || argMember === undefined) {
    console.log("Cara pakai : node checkout.js <harga> <jumlah> <true|false>");
    console.log("Contoh     : node checkout.js 100000 2 true");
  } else {
    // Angka dikonversi dulu supaya input dari terminal bisa dibaca program.
    const harga = Number(argHarga);
    const jumlah = Number(argJumlah);
    const isMember = argMember === "true";

    tampilkanHasil(hitungCheckout(harga, jumlah, isMember));
  }
}

module.exports = { hitungCheckout };
