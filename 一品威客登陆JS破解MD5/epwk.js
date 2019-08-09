/*
    破解网站: 一品威客 https://www.epwk.com/login.html
    破解的地方: 该网站的登陆过程 一般登陆过程都有加密 或者验证码
    破解提示:
        1. 抓包找到提交的表单的那个请求资源  然后发现是post请求 并且表单数据中的密码是加密的 初步判定就是md5
        2. 由于密码的键是pwd_password 所以在全局内搜索那些文件中有可能包含这些值 最终发现login_and_reg.js中是需要的资源(283行)
        3. 追踪定位到该函数里面去 返现其实是在md5.js文件里面 该文件所有内容全是核md5相关 所以全部复制即可。

*/



var hexcase = 0;
var b64pad = "";
var chrsz = 8;
function hex_md5(r) {
    return binl2hex(core_md5(str2binl(r), r.length * chrsz))
}
function b64_md5(r) {
    return binl2b64(core_md5(str2binl(r), r.length * chrsz))
}
function str_md5(r) {
    return binl2str(core_md5(str2binl(r), r.length * chrsz))
}
function hex_hmac_md5(r, d) {
    return binl2hex(core_hmac_md5(r, d))
}
function b64_hmac_md5(r, d) {
    return binl2b64(core_hmac_md5(r, d))
}
function str_hmac_md5(r, d) {
    return binl2str(core_hmac_md5(r, d))
}
function md5_vm_test() {
    return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72"
}
function core_md5(r, d) {
    r[d >> 5] |= 128 << d % 32;
    r[(d + 64 >>> 9 << 4) + 14] = d;
    var _ = 1732584193;
    var m = -271733879;
    var n = -1732584194;
    var h = 271733878;
    for (var f = 0; f < r.length; f += 16) {
        var a = _;
        var i = m;
        var t = n;
        var e = h;
        _ = md5_ff(_, m, n, h, r[f + 0], 7, -680876936);
        h = md5_ff(h, _, m, n, r[f + 1], 12, -389564586);
        n = md5_ff(n, h, _, m, r[f + 2], 17, 606105819);
        m = md5_ff(m, n, h, _, r[f + 3], 22, -1044525330);
        _ = md5_ff(_, m, n, h, r[f + 4], 7, -176418897);
        h = md5_ff(h, _, m, n, r[f + 5], 12, 1200080426);
        n = md5_ff(n, h, _, m, r[f + 6], 17, -1473231341);
        m = md5_ff(m, n, h, _, r[f + 7], 22, -45705983);
        _ = md5_ff(_, m, n, h, r[f + 8], 7, 1770035416);
        h = md5_ff(h, _, m, n, r[f + 9], 12, -1958414417);
        n = md5_ff(n, h, _, m, r[f + 10], 17, -42063);
        m = md5_ff(m, n, h, _, r[f + 11], 22, -1990404162);
        _ = md5_ff(_, m, n, h, r[f + 12], 7, 1804603682);
        h = md5_ff(h, _, m, n, r[f + 13], 12, -40341101);
        n = md5_ff(n, h, _, m, r[f + 14], 17, -1502002290);
        m = md5_ff(m, n, h, _, r[f + 15], 22, 1236535329);
        _ = md5_gg(_, m, n, h, r[f + 1], 5, -165796510);
        h = md5_gg(h, _, m, n, r[f + 6], 9, -1069501632);
        n = md5_gg(n, h, _, m, r[f + 11], 14, 643717713);
        m = md5_gg(m, n, h, _, r[f + 0], 20, -373897302);
        _ = md5_gg(_, m, n, h, r[f + 5], 5, -701558691);
        h = md5_gg(h, _, m, n, r[f + 10], 9, 38016083);
        n = md5_gg(n, h, _, m, r[f + 15], 14, -660478335);
        m = md5_gg(m, n, h, _, r[f + 4], 20, -405537848);
        _ = md5_gg(_, m, n, h, r[f + 9], 5, 568446438);
        h = md5_gg(h, _, m, n, r[f + 14], 9, -1019803690);
        n = md5_gg(n, h, _, m, r[f + 3], 14, -187363961);
        m = md5_gg(m, n, h, _, r[f + 8], 20, 1163531501);
        _ = md5_gg(_, m, n, h, r[f + 13], 5, -1444681467);
        h = md5_gg(h, _, m, n, r[f + 2], 9, -51403784);
        n = md5_gg(n, h, _, m, r[f + 7], 14, 1735328473);
        m = md5_gg(m, n, h, _, r[f + 12], 20, -1926607734);
        _ = md5_hh(_, m, n, h, r[f + 5], 4, -378558);
        h = md5_hh(h, _, m, n, r[f + 8], 11, -2022574463);
        n = md5_hh(n, h, _, m, r[f + 11], 16, 1839030562);
        m = md5_hh(m, n, h, _, r[f + 14], 23, -35309556);
        _ = md5_hh(_, m, n, h, r[f + 1], 4, -1530992060);
        h = md5_hh(h, _, m, n, r[f + 4], 11, 1272893353);
        n = md5_hh(n, h, _, m, r[f + 7], 16, -155497632);
        m = md5_hh(m, n, h, _, r[f + 10], 23, -1094730640);
        _ = md5_hh(_, m, n, h, r[f + 13], 4, 681279174);
        h = md5_hh(h, _, m, n, r[f + 0], 11, -358537222);
        n = md5_hh(n, h, _, m, r[f + 3], 16, -722521979);
        m = md5_hh(m, n, h, _, r[f + 6], 23, 76029189);
        _ = md5_hh(_, m, n, h, r[f + 9], 4, -640364487);
        h = md5_hh(h, _, m, n, r[f + 12], 11, -421815835);
        n = md5_hh(n, h, _, m, r[f + 15], 16, 530742520);
        m = md5_hh(m, n, h, _, r[f + 2], 23, -995338651);
        _ = md5_ii(_, m, n, h, r[f + 0], 6, -198630844);
        h = md5_ii(h, _, m, n, r[f + 7], 10, 1126891415);
        n = md5_ii(n, h, _, m, r[f + 14], 15, -1416354905);
        m = md5_ii(m, n, h, _, r[f + 5], 21, -57434055);
        _ = md5_ii(_, m, n, h, r[f + 12], 6, 1700485571);
        h = md5_ii(h, _, m, n, r[f + 3], 10, -1894986606);
        n = md5_ii(n, h, _, m, r[f + 10], 15, -1051523);
        m = md5_ii(m, n, h, _, r[f + 1], 21, -2054922799);
        _ = md5_ii(_, m, n, h, r[f + 8], 6, 1873313359);
        h = md5_ii(h, _, m, n, r[f + 15], 10, -30611744);
        n = md5_ii(n, h, _, m, r[f + 6], 15, -1560198380);
        m = md5_ii(m, n, h, _, r[f + 13], 21, 1309151649);
        _ = md5_ii(_, m, n, h, r[f + 4], 6, -145523070);
        h = md5_ii(h, _, m, n, r[f + 11], 10, -1120210379);
        n = md5_ii(n, h, _, m, r[f + 2], 15, 718787259);
        m = md5_ii(m, n, h, _, r[f + 9], 21, -343485551);
        _ = safe_add(_, a);
        m = safe_add(m, i);
        n = safe_add(n, t);
        h = safe_add(h, e)
    }
    return Array(_, m, n, h)
}
function md5_cmn(r, d, _, m, n, h) {
    return safe_add(bit_rol(safe_add(safe_add(d, r), safe_add(m, h)), n), _)
}
function md5_ff(r, d, _, m, n, h, f) {
    return md5_cmn(d & _ | ~d & m, r, d, n, h, f)
}
function md5_gg(r, d, _, m, n, h, f) {
    return md5_cmn(d & m | _ & ~m, r, d, n, h, f)
}
function md5_hh(r, d, _, m, n, h, f) {
    return md5_cmn(d ^ _ ^ m, r, d, n, h, f)
}
function md5_ii(r, d, _, m, n, h, f) {
    return md5_cmn(_ ^ (d | ~m), r, d, n, h, f)
}
function core_hmac_md5(r, d) {
    var _ = str2binl(r);
    if (_.length > 16)
        _ = core_md5(_, r.length * chrsz);
    var m = Array(16)
      , n = Array(16);
    for (var h = 0; h < 16; h++) {
        m[h] = _[h] ^ 909522486;
        n[h] = _[h] ^ 1549556828
    }
    var f = core_md5(m.concat(str2binl(d)), 512 + d.length * chrsz);
    return core_md5(n.concat(f), 512 + 128)
}
function safe_add(r, d) {
    var _ = (r & 65535) + (d & 65535);
    var m = (r >> 16) + (d >> 16) + (_ >> 16);
    return m << 16 | _ & 65535
}
function bit_rol(r, d) {
    return r << d | r >>> 32 - d
}
function str2binl(r) {
    var d = Array();
    var _ = (1 << chrsz) - 1;
    for (var m = 0; m < r.length * chrsz; m += chrsz)
        d[m >> 5] |= (r.charCodeAt(m / chrsz) & _) << m % 32;
    return d
}
function binl2str(r) {
    var d = "";
    var _ = (1 << chrsz) - 1;
    for (var m = 0; m < r.length * 32; m += chrsz)
        d += String.fromCharCode(r[m >> 5] >>> m % 32 & _);
    return d
}
function binl2hex(r) {
    var d = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var _ = "";
    for (var m = 0; m < r.length * 4; m++) {
        _ += d.charAt(r[m >> 2] >> m % 4 * 8 + 4 & 15) + d.charAt(r[m >> 2] >> m % 4 * 8 & 15)
    }
    return _
}
function binl2b64(r) {
    var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var _ = "";
    for (var m = 0; m < r.length * 4; m += 3) {
        var n = (r[m >> 2] >> 8 * (m % 4) & 255) << 16 | (r[m + 1 >> 2] >> 8 * ((m + 1) % 4) & 255) << 8 | r[m + 2 >> 2] >> 8 * ((m + 2) % 4) & 255;
        for (var h = 0; h < 4; h++) {
            if (m * 8 + h * 6 > r.length * 32)
                _ += b64pad;
            else
                _ += d.charAt(n >> 6 * (3 - h) & 63)
        }
    }
    return _
}
