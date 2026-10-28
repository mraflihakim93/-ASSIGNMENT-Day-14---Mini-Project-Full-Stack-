# Pengujian - Sistem Checkout Produk Sederhana

## Cara Menjalankan

Semua skenario di bawah dijalankan dengan:

```
node checkout.test.js
```

Satu skenario juga bisa dicoba lewat terminal:

```
node checkout.js <harga> <jumlah> <true|false>
```

Lingkungan uji: Node.js v24.21.0.

---

## Skenario 1: Member, subtotal besar

Input: harga 100000, jumlah 3, member true

| Bagian | Perhitungan | Nilai |
|---|---|---|
| Subtotal | 100000 x 3 | 300000 |
| Diskon 10% | 300000 x 0.1 | 30000 |
| Setelah diskon | 300000 - 30000 | 270000 |
| Ongkir | 270000 >= 250000, jadi gratis | 0 |
| **Total** | 270000 + 0 | **270000** |

Hasil program: `Subtotal 300000, Diskon 30000, Ongkir 0, Total 270000`

Status: sesuai. **(Lulus)**

---

## Skenario 2: Non-member, subtotal besar

Input: harga 100000, jumlah 3, member false

| Bagian | Perhitungan | Nilai |
|---|---|---|
| Subtotal | 100000 x 3 | 300000 |
| Diskon | bukan member | 0 |
| Setelah diskon | 300000 - 0 | 300000 |
| Ongkir | 300000 >= 250000, jadi gratis | 0 |
| **Total** | 300000 + 0 | **300000** |

Hasil program: `Subtotal 300000, Diskon 0, Ongkir 0, Total 300000`

Status: sesuai. **(Lulus)**

---

## Skenario 3: Member, total di bawah Rp250.000

Input: harga 100000, jumlah 2, member true

| Bagian | Perhitungan | Nilai |
|---|---|---|
| Subtotal | 100000 x 2 | 200000 |
| Diskon 10% | 200000 x 0.1 | 20000 |
| Setelah diskon | 200000 - 20000 | 180000 |
| Ongkir | 180000 < 250000 | 15000 |
| **Total** | 180000 + 15000 | **195000** |

Hasil program: `Subtotal 200000, Diskon 20000, Ongkir 15000, Total 195000`

Status: sesuai. **(Lulus)**

---

## Skenario 4: Non-member, total di bawah Rp250.000

Input: harga 50000, jumlah 2, member false

| Bagian | Perhitungan | Nilai |
|---|---|---|
| Subtotal | 50000 x 2 | 100000 |
| Diskon | bukan member | 0 |
| Setelah diskon | 100000 - 0 | 100000 |
| Ongkir | 100000 < 250000 | 15000 |
| **Total** | 100000 + 15000 | **115000** |

Hasil program: `Subtotal 100000, Diskon 0, Ongkir 15000, Total 115000`

Status: sesuai. **(Lulus)**

---

## Skenario 5: Non-member, tepat Rp250.000

Input: harga 125000, jumlah 2, member false

| Bagian | Perhitungan | Nilai |
|---|---|---|
| Subtotal | 125000 x 2 | 250000 |
| Diskon | bukan member | 0 |
| Setelah diskon | 250000 - 0 | 250000 |
| Ongkir | 250000 >= 250000, jadi gratis | 0 |
| **Total** | 250000 + 0 | **250000** |

Hasil program: `Subtotal 250000, Diskon 0, Ongkir 0, Total 250000`

Status: sesuai. Batasnya tetap dihitung gratis karena aturannya "minimal".
**(Lulus)**

---

## Skenario 6: Member, subtotal tepat Rp250.000

Input: harga 125000, jumlah 2, member true

| Bagian | Perhitungan | Nilai |
|---|---|---|
| Subtotal | 125000 x 2 | 250000 |
| Diskon 10% | 250000 x 0.1 | 25000 |
| Setelah diskon | 250000 - 25000 | 225000 |
| Ongkir | 225000 < 250000 | 15000 |
| **Total** | 225000 + 15000 | **240000** |

Hasil program: `Subtotal 250000, Diskon 25000, Ongkir 15000, Total 240000`

Status: sesuai. Ongkir dihitung setelah diskon, jadi member ini tetap kena
ongkir. **(Lulus)**

---

## Skenario 7: Non-member, total di atas Rp250.000

Input: harga 300000, jumlah 1, member false

| Bagian | Perhitungan | Nilai |
|---|---|---|
| Subtotal | 300000 x 1 | 300000 |
| Diskon | bukan member | 0 |
| Setelah diskon | 300000 | 300000 |
| Ongkir | 300000 >= 250000, jadi gratis | 0 |
| **Total** | 300000 + 0 | **300000** |

Hasil program: `Subtotal 300000, Diskon 0, Ongkir 0, Total 300000`

Status: sesuai. **(Lulus)**

---

## Skenario 8: Jumlah 0

Input: harga 100000, jumlah 0, member true

Hasil program:

```
Input tidak valid: jumlah produk harus berupa bilangan bulat positif
```

Status: sesuai. Program berhenti dan tidak menghitung. **(Lulus)**

---

## Skenario 9: Jumlah pecahan

Input: harga 100000, jumlah 1.5, member true

Hasil program:

```
Input tidak valid: jumlah produk harus berupa bilangan bulat positif
```

Status: sesuai. **(Lulus)**

---

## Skenario 10: Jumlah negatif

Input: harga 100000, jumlah -2, member false

Hasil program:

```
Input tidak valid: jumlah produk harus berupa bilangan bulat positif
```

Status: sesuai. **(Lulus)**

---

## Skenario 11: Harga berupa huruf

Input: harga "abc", jumlah 2, member true

Hasil program:

```
Input tidak valid: harga produk harus berupa angka positif
```

Status: sesuai. **(Lulus)**

---

## Skenario 12: Harga 0

Input: harga 0, jumlah 2, member false

Hasil program:

```
Input tidak valid: harga produk harus berupa angka positif
```

Status: sesuai. **(Lulus)**

---

## Skenario 13: Harga negatif

Input: harga -5000, jumlah 2, member false

Hasil program:

```
Input tidak valid: harga produk harus berupa angka positif
```

Status: sesuai. **(Lulus)**

---

## Rekap

| No | Skenario | Total / Hasil | Status |
|---|---|---|---|
| 1 | Member, subtotal besar | 270000 | Lulus |
| 2 | Non-member, subtotal besar | 300000 | Lulus |
| 3 | Member, di bawah 250000 | 195000 | Lulus |
| 4 | Non-member, di bawah 250000 | 115000 | Lulus |
| 5 | Non-member, tepat 250000 | 250000 | Lulus |
| 6 | Member, subtotal tepat 250000 | 240000 | Lulus |
| 7 | Non-member, di atas 250000 | 300000 | Lulus |
| 8 | Jumlah 0 | input tidak valid | Lulus |
| 9 | Jumlah pecahan | input tidak valid | Lulus |
| 10 | Jumlah negatif | input tidak valid | Lulus |
| 11 | Harga huruf | input tidak valid | Lulus |
| 12 | Harga 0 | input tidak valid | Lulus |
| 13 | Harga negatif | input tidak valid | Lulus |

Semua skenario yang diminta soal sudah diuji: member, non-member, di bawah
Rp250.000, tepat Rp250.000, di atas Rp250.000, jumlah 0, jumlah pecahan, dan
harga tidak valid. Hasilnya sesuai dengan perhitungan manual.
