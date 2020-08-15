/*not script dosyasını  body kapatma etikeninin hemen üzerine yazınız.*/
var sayi = document.getElementById("input"); // input kutusunu 

var btnWrite = document.getElementsByClassName('btn-write')[0];
btnWrite.addEventListener('click', function () {
    var str = document.getElementById("str");
    var islem = new SayiDonustur(sayi.value);
    str.innerHTML = islem.sonuc;
})

var btnReset = document.getElementsByClassName('btn-reset')[0];
btnReset.addEventListener('click', function () {
    var str = document.getElementById("str").innerHTML = "";
    sayi.value = "";
})


/*sayı gösterme işlemini yapacak sınıf*/
function SayiDonustur(sayi) {

    sayi = String(sayi);
    this.sonuc;

    let bolum1 = ["", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz"];
    let bolum2 = ["", "on", "yirmi", "otuz", "kırk", "elli", "altmış", "yetmiş", "seksen", "doksan"];
    let bolum3 = ["", "yüz", "bin", "milyon", "milyar", "trilyon", "katrilyon"];

    let sayi1;      //tam kısım
    let sayi2 = ""; // ondalıklı kısım
    let sonuc = "";


    sayi = sayi.replace(",", "."); //virgül girilirse noktaya dönüştürülüyor

    if (sayi.indexOf(".") > 0) { // nokta varsa (kuruş)

        sayi1 = sayi.substring(0, sayi.indexOf(".")); // tam kısım
        sayi2 = sayi.substring(sayi.indexOf("."), sayi.length); // ondalıklı kısım

    }
    else {
        sayi1 = sayi; // ondalık yok
    }

    var rk = sayi1.split(""); // rakamlara ayırma

    let son;
    let w = 1; // işlenen basamak
    var sonaekle = 0; // binler on binler yüzbinler vs. için sona bin (milyon,trilyon...) eklenecek mi?
    let kac = rk.length; // kaç rakam var?
    let sonint; // işlenen basamağın rakamsal değeri
    let uclubasamak = 0; // hangi basamakta (birler onlar yüzler gibi)
    let artan = 0;  // binler milyonlar milyarlar gibi artışları yapar
    let gecici;

    if (kac > 0) { // virgül öncesinde rakam var mı?

        for (i = 0; i < kac; i++) {
            son = rk[kac - 1 - i]; // son karakterden başlayarak çözümleme yapılır.
            sonint = parseInt(son); // işlenen rakam
            if (w == 1) { // birinci basamak bulunuyor
                sonuc = bolum1[sonint] + sonuc;
            }
            else if (w == 2) { // ikinci basamak
                sonuc = bolum2[sonint] + sonuc;
            }
            else if (w == 3) { // 3. basamak
                if (sonint == 1) {
                    sonuc = bolum3[1] + sonuc;
                }
                else if (sonint > 1) {
                    sonuc = bolum1[sonint] + bolum3[1] + sonuc;
                }
                uclubasamak++;
            }
            if (w > 3) {    // 3. basamaktan sonraki işlemler
                if (uclubasamak == 1) {
                    if (sonint > 0) {
                        sonuc = bolum1[sonint] + bolum3[2 + artan] + sonuc;
                        if (artan == 0) { // birbin yazmasını engelle
                            if (kac - 1 == i) { //
                                sonuc = sonuc.replace(bolum1[1] + bolum3[2], bolum3[2]);
                            }
                        }
                        sonaekle = 1; // sona bin eklendi
                    }
                    else {
                        sonaekle = 0;
                    }
                    uclubasamak++;

                }
                else if (uclubasamak == 2) {
                    if (sonint > 0) {
                        if (sonaekle > 0) {
                            sonuc = b2[sonint] + sonuc;
                            sonaekle++;
                        }
                        else {
                            sonuc = b2[sonint] + b3[2 + artan] + sonuc;
                            sonaekle++;
                        }
                    }
                    uclubasamak++;

                } else if (uclubasamak == 3) {
                    if (sonint > 0) {
                        if (sonint == 1) {
                            gecici = b3[1];
                        }
                        else {
                            gecici = b1[sonint] + b3[1];
                        }
                        if (sonaekle == 0) {
                            gecici = gecici + b3[2 + artan];
                        }
                        sonuc = gecici + sonuc;
                    }
                    uclubasamak = 1;
                    artan++;
                }

            }
            w++; // işlenen basamak
        }

    }

    this.sonuc = sonuc;
}