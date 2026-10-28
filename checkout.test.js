"use strict";

const { hitungCheckout } = require("./checkout");

const daftarSkenario = [
  // [nama skenario, harga, jumlah, isMember]
  ["Member, subtotal besar", 100000, 3, true],
  ["Non-member, subtotal besar", 100000, 3, false],
  ["Member, total di bawah Rp250.000", 100000, 2, true],
  ["Non-member, total di bawah Rp250.000", 50000, 2, false],
  ["Non-member, tepat Rp250.000", 125000, 2, false],
  ["Member, subtotal tepat Rp250.000", 125000, 2, true],
  ["Non-member, total di atas Rp250.000", 300000, 1, false],
  ["Jumlah 0", 100000, 0, true],
  ["Jumlah pecahan", 100000, 1.5, true],
  ["Jumlah negatif", 100000, -2, false],
  ["Harga berupa huruf", "abc", 2, true],
  ["Harga 0", 0, 2, false],
  ["Harga negatif", -5000, 2, false],
];
for (const [nama, harga, jumlah, isMember] of daftarSkenario) {
  const hasil = hitungCheckout(harga, jumlah, isMember);

  console.log("Skenario :", nama);
  console.log("Input    :", harga, jumlah, isMember);

  if (typeof hasil === "string") {
    console.log("Hasil    :", hasil);
  } else {
    console.log("Subtotal :", hasil.subtotal);
    console.log("Diskon   :", hasil.diskon);
    console.log("Ongkir   :", hasil.ongkir);
    console.log("Total    :", hasil.total);
  }

  console.log("");
}
