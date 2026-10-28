# Sistem Checkout Produk

**Nama:** Muhammad Rafli Hakim
**Kelas / Day:** Day 14 - Problem Solving & JavaScript Dasar

## Deskripsi

Program ini menghitung total pembayaran sebuah pesanan. Masukannya tiga: harga
produk, jumlah produk, dan status member. Dari situ program menghitung subtotal,
diskon, ongkos kirim, lalu total pembayaran.

Rules:

1. Harga harus angka positif dan jumlah harus bilangan bulat positif. Kalau tidak,
   program berhenti dan menampilkan pesan input tidak valid.
2. Subtotal = harga x jumlah.
3. Member dapat diskon 10% dari subtotal. Non-member tidak dapat diskon.
4. Kalau total setelah diskon minimal Rp250.000, ongkir gratis. Kalau kurang,
   ongkir Rp15.000.
5. Total pembayaran = total setelah diskon + ongkir.

Tidak memakai UI, API, atau database. Semua logika ada di satu fungsi
`hitungCheckout(harga, jumlah, isMember)`.

## Isi Folder

| File | Keterangan |
|---|---|
| `README.md` | Penjelasan program dan cara menjalankan |
| `analysis.md` | Problem decomposition: input, proses, output, pattern, abstraction |
| `flowchart.drawio` | Flowchart, bisa dibuka dan diedit di draw.io |
| `flowchart.png` | Hasil export flowchart |
| `pseudocode.md` | Pseudocode sesuai alur flowchart |
| `checkout.js` | Kode program |
| `checkout.test.js` | Menjalankan beberapa skenario uji sekaligus |
| `testing.md` | Tabel pengujian beserta hasilnya |

## Cara Menjalankan
**1. Menjalankan program dari terminal**
```
node checkout.js <harga> <jumlah> <true|false>
```
Contoh member dengan 3 barang seharga Rp100.000:
```
node checkout.js 100000 3 true
```
Total:
```
Subtotal      : Rp300.000
Diskon        : Rp30.000
Ongkir        : GRATIS
Total bayar   : Rp270.000
```
Contoh input salah:
```
node checkout.js 100000 0 true
```
Hasilnya:
```
Input tidak valid: jumlah produk harus berupa bilangan bulat positif
```
**2. Menjalankan semua skenario uji**
```
node checkout.test.js
```
Perintah ini mencetak hasil 13 skenario. Hasil yang diharapkan ada di `testing.md`.
**3. Memanggil fungsi langsung dari kode**

```js
const { hitungCheckout } = require("./checkout");

console.log(hitungCheckout(100000, 2, true));
```

Kalau input valid, hasilnya berupa object:

```js
{ subtotal: 200000, diskon: 20000, ongkir: 15000, total: 195000 }
```

Kalau input tidak valid, hasilnya berupa pesan error (string):

```js
"Input tidak valid: jumlah produk harus berupa bilangan bulat positif"
```

## Penggunaan AI

Saya memakai LLM sebagai partner diskusi, bukan untuk menggantikan proses
pengerjaan. Yang saya pakai dari AI:

- Menanyakan apakah urutan hitungnya sudah benar (subtotal, diskon, ongkir,
  total) dan mengecek apakah ada aturan di soal yang terlewat.
- Mendiskusikan kasus batas tepat Rp250.000. Ternyata kalau non-member, tepat
  Rp250.000 tetap gratis ongkir, sedangkan member dengan subtotal yang sama
  kena ongkir karena sudah dipotong diskon.
- Menambah skenario uji untuk input yang tidak valid seperti harga "abc",
  jumlah 0, dan jumlah pecahan.

Validasi akhir tetap saya lakukan sendiri dengan menjalankan program lewat
terminal (`node checkout.js ...`) dan membandingkan hasilnya secara manual.

## Catatan

- Validasi dilakukan paling awal. Kalau input salah, program langsung berhenti
  dan tidak menghitung apa pun.
- Ongkir dihitung dari total setelah diskon. Jadi member dengan subtotal tepat
  Rp250.000 masih kena ongkir Rp15.000.
- Batas gratis ongkir memakai `>=`, artinya tepat Rp250.000 sudah gratis.
