# Problem Decomposition - Sistem Checkout Produk Sederhana

## Gambaran Umum

Kasus : kasir punya tiga data (harga, jumlah, status member) dan
harus menghasilkan total bayar. Supaya program mudah ditulis dan diuji, saya
pecah dulu masalahnya jadi empat bagian: input, proses, output, dan aturan
keputusan. Setelah itu baru dipikirkan pattern dan abstraksinya.

## 1. Input

| Nama | Tipe data | Syarat | Kenapa harus dicek |
|---|---|---|---|
| `harga` | number | angka, tidak boleh 0 atau negatif | harga negatif membuat subtotal tidak masuk akal |
| `jumlah` | number | bilangan bulat, lebih dari 0 | jumlah 1.5 barang tidak mungkin |
| `isMember` | boolean | hanya `true` atau `false` | menentukan ada tidaknya diskon |

Contoh input yang harus ditolak: `"abc"`, `NaN`, `Infinity`, `null`, `0`,
`-5000` untuk harga; `0`, `-2`, `1.5` untuk jumlah.

## 2. Proses

Urutan langkahnya saya tentukan berdasarkan soal:

1. Terima `harga`, `jumlah`, `isMember`.
2. Cek validasi input. Kalau tidak valid, tampilkan pesan dan berhenti.
3. Hitung `subtotal = harga x jumlah`.
4. Cek status member. Member dapat diskon 10% x subtotal, non-member diskon 0.
5. Hitung `setelahDiskon = subtotal - diskon`.
6. Cek `setelahDiskon`. Kalau `>= 250000` maka ongkir 0, kalau tidak ongkir 15000.
7. Hitung `total = setelahDiskon + ongkir`.
8. Tampilkan subtotal, diskon, ongkir, dan total.

Ada dua hal dari soal yang perlu diperhatikan:

- Diskon dihitung dari subtotal, bukan dari total.
- Ongkir dihitung dari total setelah diskon, bukan dari subtotal.

Akibat poin kedua: member dengan subtotal Rp250.000 mendapat diskon Rp25.000
sehingga totalnya Rp225.000 dan tetap kena ongkir Rp15.000.

## 3. Output

Ada dua kemungkinan hasil:

| Kondisi | Output |
|---|---|
| Input valid | `subtotal`, `diskon`, `ongkir`, `total` |
| Input tidak valid | pesan `"Input tidak valid: ..."`, perhitungan tidak dilanjutkan |

Output yang paling penting adalah `total`, karena itu tujuan akhir dari
checkout. Nilai `subtotal`, `diskon`, dan `ongkir` ditampilkan supaya
perhitungannya bisa dicek ulang.

## 4. Aturan Keputusan

| Kode | Kondisi | Yang dilakukan |
|---|---|---|
| K1 | harga bukan angka positif | tampilkan "Input tidak valid", berhenti |
| K2 | jumlah bukan bilangan bulat positif | tampilkan "Input tidak valid", berhenti |
| K3 | `isMember` bernilai `true` | diskon = 10% x subtotal |
| K4 | `isMember` bernilai `false` | diskon = 0 |
| K5 | `setelahDiskon >= 250000` | ongkir = 0 (gratis) |
| K6 | `setelahDiskon < 250000` | ongkir = 15000 |

## 5. Pattern

1. **Urutan proses satu arah (sequential).** Data mengalir dari input ke
   validasi, lalu ke subtotal, diskon, ongkir, total, dan output. Tiap langkah
   hanya memakai hasil langkah sebelumnya, jadi tidak ada perhitungan acak.
2. **Validasi di depan (guard clause).** Semua pengecekan input ditaruh di awal
   fungsi. Kalau gagal langsung `return` pesan error. Cara ini membuat bagian
   perhitungan tidak perlu dibungkus banyak `if` bersarang.
3. **Pemilihan nilai dari kondisi (percabangan if-else biasa).** Diskon (10%
   atau 0) dan ongkir (0 atau 15000) dipilih lewat if. Jadi nilai yang mungkin
   cuma dua dan bisa langsung dilacak di flowchart.
4. **Konstanta bernama.** Angka 10%, 250000, dan 15000 disimpan di variabel
   `DISKON_MEMBER`, `BATAS_GRATIS_ONGKIR`, dan `ONGKIR_NORMAL`. Kalau nanti
   aturannya berubah, cukup ubah satu tempat.

## 6. Abstraction

Kalau dilihat dari jauh, kasus ini sebenarnya hanya punya dua keputusan:

1. Apakah pembeli member? Ini menentukan diskon.
2. Apakah total setelah diskon sudah mencapai batas? Ini menentukan ongkir.

Angka 10%, 250.000, dan 15.000 hanyalah nilai aturan, bukan logika program.
Karena itu saya pisahkan menjadi konstanta.

Dari abstraksi tersebut, fungsi utama `hitungCheckout` saya susun dengan urutan
yang sama seperti proses di atas:

```js
function hitungCheckout(harga, jumlah, isMember) {
  // 1. validasi
  // 2. subtotal
  // 3. diskon (if member)
  // 4. setelahDiskon
  // 5. ongkir (if >= 250000)
  // 6. total
  // 7. return { subtotal, diskon, ongkir, total }
}
```

Fungsi ini juga tidak mengubah nilai input dan tidak memakai variabel global,
jadi hasilnya selalu sama untuk input yang sama (mudah diuji).

## 7. Kasus Batas yang Diperhatikan

| Kasus | Hasil |
|---|---|
| Non-member, total tepat Rp250.000 | gratis ongkir |
| Member, subtotal tepat Rp250.000 | diskon Rp25.000, sisa Rp225.000, kena ongkir Rp15.000 |
| Harga diisi `"abc"` | pesan input tidak valid |
| Jumlah 0 | pesan input tidak valid |
| Jumlah 1.5 | pesan input tidak valid |
| Harga 0 atau negatif | pesan input tidak valid |
