# Pseudocode - Sistem Checkout Produk Sederhana

Pseudocode ini mengikuti alur yang sama dengan `flowchart.drawio`.

## Konstanta

```
DISKON_MEMBER       = 0.10
BATAS_GRATIS_ONGKIR = 250000
ONGKIR_NORMAL       = 15000
```

## Fungsi hitungCheckout

```
FUNCTION hitungCheckout(harga, jumlah, isMember)

    // validasi input
    IF harga BUKAN number ATAU harga <= 0 THEN
        RETURN "Input tidak valid: harga produk harus berupa angka positif"
    END IF

    IF jumlah BUKAN bilangan bulat ATAU jumlah <= 0 THEN
        RETURN "Input tidak valid: jumlah produk harus berupa bilangan bulat positif"
    END IF

    IF isMember BUKAN boolean THEN
        RETURN "Input tidak valid: status member harus boolean (true/false)"
    END IF

    // perhitungan subtotal
    subtotal = harga * jumlah

    // keputusan status member
    IF isMember = TRUE THEN
        diskon = DISKON_MEMBER * subtotal
    ELSE
        diskon = 0
    END IF

    setelahDiskon = subtotal - diskon

    // keputusan ongkos kirim
    IF setelahDiskon >= BATAS_GRATIS_ONGKIR THEN
        ongkir = 0
    ELSE
        ongkir = ONGKIR_NORMAL
    END IF

    // total pembayaran
    total = setelahDiskon + ongkir

    RETURN { subtotal, diskon, ongkir, total }

END FUNCTION
```

## Program Utama (terminal)

```
START
    BACA harga, jumlah, isMember

    hasil = hitungCheckout(harga, jumlah, isMember)

    IF hasil adalah pesan error THEN
        PRINT hasil
    ELSE
        PRINT "Subtotal : " + hasil.subtotal
        PRINT "Diskon   : " + hasil.diskon

        IF hasil.ongkir = 0 THEN
            PRINT "Ongkir   : GRATIS"
        ELSE
            PRINT "Ongkir   : " + hasil.ongkir
        END IF

        PRINT "Total    : " + hasil.total
    END IF
END
```

## Korelasi dengan Flowchart dan Kode

| Pseudocode | Flowchart | `checkout.js` |
|---|---|---|
| BACA input | Input: harga, jumlah, isMember | `process.argv[2..4]` |
| Validasi input | keputusan "Validasi input" | `if (typeof harga ...)` |
| Pesan error | Output: "Input tidak valid" | `return "Input tidak valid: ..."` |
| subtotal | subtotal = harga x jumlah | `harga * jumlah` |
| Keputusan member | keputusan "isMember = true ?" | `if (isMember === true)` |
| setelahDiskon | setelahDiskon = subtotal - diskon | `subtotal - diskon` |
| Keputusan ongkir | keputusan "setelahDiskon >= 250000 ?" | `if (setelahDiskon >= BATAS_GRATIS_ONGKIR)` |
| total | total = setelahDiskon + ongkir | `setelahDiskon + ongkir` |
| RETURN hasil | Output: subtotal, diskon, ongkir, total | `return { subtotal, diskon, ongkir, total }` |
