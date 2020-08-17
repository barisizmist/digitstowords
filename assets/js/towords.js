var ON = 10;
var YUZ = 100;
var BIN = 1000;
var MILYON = 1000000;
var MILYAR = 1000000000;
var TRILYON = 1000000000000;
var KATRILYON = 1000000000000000;
var MAKSIMUM = 9007199254740992;

var YIRMIYE_KADAR = [
    'sıfır', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz', 'on', 'on bir', 'on iki', 'on üç', 'on dört', 'on beş', 'on altı', 'on yedi', 'on sekiz', 'on dokuz'
];

var YUZE_KADAR = [
    'sıfır', 'on', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan'
];

function toWords(number) {
    var words;
    var num = parseInt(number, 10);
    if (number > MAKSIMUM) {
        alert('Maksimum değer 9007199254740992\'dir. Lütfen daha küçük bir değer giriniz.');
    }
    else {
        words = generateWords(num);
        return words;
    }
}

function generateWords(number) {
    var remainder, word,
        words = arguments[1];

    if (number === 0) {
        return !words ? 'sıfır' : words.join(' ').replace(/,$/, '');
    }

    if (!words) {
        words = [];
    }

    // Negatif ise
    if (number < 0) {
        words.push('eksi');
        number = Math.abs(number);
    }

    if (number < 20) {
        remainder = 0;
        word = YIRMIYE_KADAR[number];

    } else if (number < YUZ) {
        remainder = number % ON;
        word = YUZE_KADAR[Math.floor(number / ON)];

        if (remainder) {
            word += ' ' + YIRMIYE_KADAR[remainder];
            remainder = 0;
        }

    } else if (number < BIN) {
        remainder = number % YUZ;
        word = generateWords(Math.floor(number / YUZ) == 1 ? ' ' : Math.floor(number / YUZ)) + ' yüz';

    } else if (number < MILYON) {
        remainder = number % BIN;
        word = generateWords(Math.floor(number / BIN) == 1 ? ' ' : Math.floor(number / BIN)) + ' bin';

    } else if (number < MILYAR) {
        remainder = number % MILYON;
        word = generateWords(Math.floor(number / MILYON)) + ' milyon';

    } else if (number < TRILYON) {
        remainder = number % MILYAR;
        word = generateWords(Math.floor(number / MILYAR)) + ' milyar';

    } else if (number < KATRILYON) {
        remainder = number % TRILYON;
        word = generateWords(Math.floor(number / TRILYON)) + ' trilyon';

    } else if (number <= MAKSIMUM) {
        remainder = number % KATRILYON;
        word = generateWords(Math.floor(number / KATRILYON)) + ' katrilyon,';
    }

    words.push(word);
    return generateWords(remainder, words);
}

//Rakam kontrolü
var input = document.getElementById("input");
// input.onkeypress = function (evt) {
//     var theEvent = evt || window.event;

//     // Handle paste
//     if (theEvent.type === 'paste') {
//         key = event.clipboardData.getData('text/plain');
//     } else {
//         // Handle key press
//         var key = theEvent.keyCode || theEvent.which;
//         key = String.fromCharCode(key);
//     }
//     var regex = /^[0-9]+$/;
//     if (!regex.test(key)) {
//         theEvent.returnValue = false;
//         if (theEvent.preventDefault) theEvent.preventDefault();
//     }
// }

// Restricts input for the given textbox to the given inputFilter function.
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.addEventListener(event, function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}

setInputFilter(document.getElementById("input"), function (value) {
    return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
});

//Butona tıklama sonrası
var btnWrite = document.getElementsByClassName('btn-write')[0];
btnWrite.addEventListener('click', function () {
    var str = document.getElementById("str");
    if (!input.value) return;
    var islem = toWords(input.value);
    if (islem) {
        str.innerHTML = islem;
    }
})

//Resetleme
var btnReset = document.getElementsByClassName('btn-reset')[0];
btnReset.addEventListener('click', function () {
    document.getElementById("str").innerHTML = "";
    input.value = "";
})