/**
 * @破解网站: https://www.wcbchina.com/login/login.html
 * @破解目标: 万创帮登陆过程
 * @破解提示:
 *      1. 抓包找到加密的字段
 *      2. 搜索字段属于的文件
 *      3. 找到加密的位置 打上断点 进行断点调试
 *      4。 找到js的核心加密的位置 然后将代码抠出来进行调试
 *
 */



function c(s) {
    return D(a(B(s), s.length * F)).toUpperCase()
}
function a(x, c) {
    x[c >> 5] |= 128 << c % 32,
        x[(c + 64 >>> 9 << 4) + 14] = c;
    for (var a = 1732584193, h = -271733879, b = -1732584194, d = 271733878, i = 0; i < x.length; i += 16) {
        var B = a
            , D = h
            , E = b
            , F = d;
        a = v(a, h, b, d, x[i + 0], 7, -680876936),
            d = v(d, a, h, b, x[i + 1], 12, -389564586),
            b = v(b, d, a, h, x[i + 2], 17, 606105819),
            h = v(h, b, d, a, x[i + 3], 22, -1044525330),
            a = v(a, h, b, d, x[i + 4], 7, -176418897),
            d = v(d, a, h, b, x[i + 5], 12, 1200080426),
            b = v(b, d, a, h, x[i + 6], 17, -1473231341),
            h = v(h, b, d, a, x[i + 7], 22, -45705983),
            a = v(a, h, b, d, x[i + 8], 7, 1770035416),
            d = v(d, a, h, b, x[i + 9], 12, -1958414417),
            b = v(b, d, a, h, x[i + 10], 17, -42063),
            h = v(h, b, d, a, x[i + 11], 22, -1990404162),
            a = v(a, h, b, d, x[i + 12], 7, 1804603682),
            d = v(d, a, h, b, x[i + 13], 12, -40341101),
            b = v(b, d, a, h, x[i + 14], 17, -1502002290),
            h = v(h, b, d, a, x[i + 15], 22, 1236535329),
            a = A(a, h, b, d, x[i + 1], 5, -165796510),
            d = A(d, a, h, b, x[i + 6], 9, -1069501632),
            b = A(b, d, a, h, x[i + 11], 14, 643717713),
            h = A(h, b, d, a, x[i + 0], 20, -373897302),
            a = A(a, h, b, d, x[i + 5], 5, -701558691),
            d = A(d, a, h, b, x[i + 10], 9, 38016083),
            b = A(b, d, a, h, x[i + 15], 14, -660478335),
            h = A(h, b, d, a, x[i + 4], 20, -405537848),
            a = A(a, h, b, d, x[i + 9], 5, 568446438),
            d = A(d, a, h, b, x[i + 14], 9, -1019803690),
            b = A(b, d, a, h, x[i + 3], 14, -187363961),
            h = A(h, b, d, a, x[i + 8], 20, 1163531501),
            a = A(a, h, b, d, x[i + 13], 5, -1444681467),
            d = A(d, a, h, b, x[i + 2], 9, -51403784),
            b = A(b, d, a, h, x[i + 7], 14, 1735328473),
            h = A(h, b, d, a, x[i + 12], 20, -1926607734),
            a = g(a, h, b, d, x[i + 5], 4, -378558),
            d = g(d, a, h, b, x[i + 8], 11, -2022574463),
            b = g(b, d, a, h, x[i + 11], 16, 1839030562),
            h = g(h, b, d, a, x[i + 14], 23, -35309556),
            a = g(a, h, b, d, x[i + 1], 4, -1530992060),
            d = g(d, a, h, b, x[i + 4], 11, 1272893353),
            b = g(b, d, a, h, x[i + 7], 16, -155497632),
            h = g(h, b, d, a, x[i + 10], 23, -1094730640),
            a = g(a, h, b, d, x[i + 13], 4, 681279174),
            d = g(d, a, h, b, x[i + 0], 11, -358537222),
            b = g(b, d, a, h, x[i + 3], 16, -722521979),
            h = g(h, b, d, a, x[i + 6], 23, 76029189),
            a = g(a, h, b, d, x[i + 9], 4, -640364487),
            d = g(d, a, h, b, x[i + 12], 11, -421815835),
            b = g(b, d, a, h, x[i + 15], 16, 530742520),
            h = g(h, b, d, a, x[i + 2], 23, -995338651),
            a = C(a, h, b, d, x[i + 0], 6, -198630844),
            d = C(d, a, h, b, x[i + 7], 10, 1126891415),
            b = C(b, d, a, h, x[i + 14], 15, -1416354905),
            h = C(h, b, d, a, x[i + 5], 21, -57434055),
            a = C(a, h, b, d, x[i + 12], 6, 1700485571),
            d = C(d, a, h, b, x[i + 3], 10, -1894986606),
            b = C(b, d, a, h, x[i + 10], 15, -1051523),
            h = C(h, b, d, a, x[i + 1], 21, -2054922799),
            a = C(a, h, b, d, x[i + 8], 6, 1873313359),
            d = C(d, a, h, b, x[i + 15], 10, -30611744),
            b = C(b, d, a, h, x[i + 6], 15, -1560198380),
            h = C(h, b, d, a, x[i + 13], 21, 1309151649),
            a = C(a, h, b, d, x[i + 4], 6, -145523070),
            d = C(d, a, h, b, x[i + 11], 10, -1120210379),
            b = C(b, d, a, h, x[i + 2], 15, 718787259),
            h = C(h, b, d, a, x[i + 9], 21, -343485551),
            a = y(a, B),
            h = y(h, D),
            b = y(b, E),
            d = y(d, F)
    }
    return Array(a, h, b, d)
}
function h(q, c, a, x, s, t) {
    return y(b(y(y(c, q), y(x, t)), s), a)
}
function v(c, a, v, d, x, s, t) {
    return h(a & v | ~a & d, c, a, x, s, t)
}
function A(c, a, v, d, x, s, t) {
    return h(a & d | v & ~d, c, a, x, s, t)
}
function g(c, a, v, d, x, s, t) {
    return h(a ^ v ^ d, c, a, x, s, t)
}
function C(c, a, v, d, x, s, t) {
    return h(v ^ (a | ~d), c, a, x, s, t)
}
function y(x, c) {
    var a = (65535 & x) + (65535 & c)
        , h = (x >> 16) + (c >> 16) + (a >> 16);
    return h << 16 | 65535 & a
}
function b(c, a) {
    return c << a | c >>> 32 - a
}
function B(c) {
    for (var a = Array(), h = (1 << F) - 1, i = 0; i < c.length * F; i += F)
        a[i >> 5] |= (c.charCodeAt(i / F) & h) << i % 32;
    return a
}
function D(c) {
    for (var a = E ? "0123456789ABCDEF" : "0123456789abcdef", h = "", i = 0; i < 4 * c.length; i++)
        h += a.charAt(c[i >> 2] >> i % 4 * 8 + 4 & 15) + a.charAt(c[i >> 2] >> i % 4 * 8 & 15);
    return h
}
var E = 0
    , F = 8;




function hex_md5(pwd){
    /**
     *  c 函数是产生加密的函数 直接调用即可
     */

    return c(pwd)
}
