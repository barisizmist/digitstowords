/*not script dosyasını  body kapatma etikeninin hemen üzerine yazınız.*/
var sayi = document.getElementById("input"); // input kutusunu 

var btnWrite = document.getElementsByClassName('btn-write')[0];
btnWrite.addEventListener('click', function () {
    var str = document.getElementById("str");
    var islem = SayiDonustur(sayi.value);
    str.innerHTML = islem;
})

var btnReset = document.getElementsByClassName('btn-reset')[0];
btnReset.addEventListener('click', function () {
    var str = document.getElementById("str").innerHTML = "";
    sayi.value = "";
})



function SayiDonustur(r) {

    var rakamlarim = String(r);


    let bolum1 = ["", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz"];
    let bolum2 = ["", "on", "yirmi", "otuz", "kırk", "elli", "altmış", "yetmiş", "seksen", "doksan"];
    let bolum3 = ["", "yüz", "bin", "milyon", "milyar", "trilyon", "katrilyon"];

    var sonuc = ""; // SONUÇ değişkenime Yazıyı ekleyerek Yazıyorum.

    var son;
    var basamak = 1; // işlenen basamak
    var kac = rakamlarim.length; // kaç rakam var?
    var sonRakam; // işlenen basamağın rakamsal değeri

    for (i = 0; i < kac; i++) {
        son = rakamlarim[kac - 1 - i]; // son karakterden başlayarak çözümleme yapıyoruz.
        sonRakam = parseInt(son); // İşleme giren Rakam

        if (basamak == 1) { // birinci basamak bulunuyor
            sonuc = bolum1[sonRakam] + sonuc;
        }

        else if (basamak == 2) { // ikinci basamak
            sonuc = bolum2[sonRakam] + sonuc;
        }

        else if (basamak == 3) { // 3. basamak
            if (sonRakam == 1) {
                sonuc = bolum3[1] + sonuc;
            }
            else if (sonRakam > 1) {
                sonuc = bolum1[sonRakam] + bolum3[1] + sonuc;
            }
        }

        else if (basamak == 4) { // 4. basamak
            if (sonRakam == 1) {
                sonuc = bolum3[2] + sonuc;
            }
            else if (sonRakam > 1) {
                sonuc = bolum1[sonRakam] + bolum3[2] + sonuc;
            }
        }
        else if (basamak == 5) { // 5. basamak
            if (sonRakam == 1) {
                sonuc = bolum3[2] + sonuc;
            }
            else if (sonRakam > 1) {
                sonuc = bolum1[sonRakam] + bolum3[2] + sonuc;
            }
        }

        basamak++; // Basamak değerini arttır
    }

    return sonuc;
}

    ///////////////////////// SAYI DÖNÜŞTÜRME FONKSİYONU —— BİTİŞ