var a = ['', 'bir ', 'iki ', 'üç ', 'dört ', 'beş ', 'altı ', 'yedi ', 'sekiz ', 'dokuz ', 'on ', 'onbir ', 'oniki ', 'onüç ', 'ondört ', 'onbeş ', 'onaltı ', 'onyedi ', 'onsekiz ', 'ondokuz '];
var b = ['', '', 'yirmi', 'otuz', 'kırk', 'elli', 'atmış', 'yetmiş', 'seksen', 'doksan'];

function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (n[1] != 1 ? a[Number(n[1])] : ' ' || b[n[1][0]] + ' ' + a[n[1][1]]) + 'milyar ' : '';
    str += (n[2] != 0) ? (n[2] != 1 ? a[Number(n[2])] : ' ' || b[n[2][0]] + ' ' + a[n[2][1]]) + 'milyon ' : '';
    str += (n[3] != 0) ? (n[3] != 1 ? a[Number(n[3])] : ' ' || b[n[3][0]] + ' ' + a[n[3][1]]) + 'bin ' : '';
    str += (n[4] != 0) ? (n[4] != 1 ? a[Number(n[4])] : ' ' || b[n[4][0]] + ' ' + a[n[4][1]]) + 'yüz ' : '';
    str += (n[5] != 0) ? (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    return str;
}

document.getElementById('number').onkeyup = function () {
    document.getElementById('words').innerHTML = inWords(document.getElementById('number').value);
};
