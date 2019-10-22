function s(t, e) {
    var i = (65535 & t) + (65535 & e);
    return (t >> 16) + (e >> 16) + (i >> 16) << 16 | 65535 & i
}

function r(t, e, i, a, r, n) {
    return s(function (t, e) {
        return t << e | t >>> 32 - e
    }(s(s(e, t), s(a, n)), r), i)
}

function n(t, e, i, a, s, n, o) {
    return r(e & i | ~e & a, t, e, s, n, o)
}

function o(t, e, i, a, s, n, o) {
    return r(e & a | i & ~a, t, e, s, n, o)
}

function c(t, e, i, a, s, n, o) {
    return r(e ^ i ^ a, t, e, s, n, o)
}

function l(t, e, i, a, s, n, o) {
    return r(i ^ (e | ~a), t, e, s, n, o)
}

function d(t, e) {
    var i, a, r, d, u;
    t[e >> 5] |= 128 << e % 32,
        t[14 + (e + 64 >>> 9 << 4)] = e;
    var p = 1732584193,
        f = -271733879,
        h = -1732584194,
        m = 271733878;
    for (i = 0; i < t.length; i += 16)
        a = p,
        r = f,
        d = h,
        u = m,
        f = l(f = l(f = l(f = l(f = c(f = c(f = c(f = c(f = o(f = o(f = o(f = o(f = n(f = n(f = n(f = n(f, h = n(h, m = n(m, p = n(p, f, h, m, t[i], 7, -680876936), f, h, t[i + 1], 12, -389564586), p, f, t[i + 2], 17, 606105819), m, p, t[i + 3], 22, -1044525330), h = n(h, m = n(m, p = n(p, f, h, m, t[i + 4], 7, -176418897), f, h, t[i + 5], 12, 1200080426), p, f, t[i + 6], 17, -1473231341), m, p, t[i + 7], 22, -45705983), h = n(h, m = n(m, p = n(p, f, h, m, t[i + 8], 7, 1770035416), f, h, t[i + 9], 12, -1958414417), p, f, t[i + 10], 17, -42063), m, p, t[i + 11], 22, -1990404162), h = n(h, m = n(m, p = n(p, f, h, m, t[i + 12], 7, 1804603682), f, h, t[i + 13], 12, -40341101), p, f, t[i + 14], 17, -1502002290), m, p, t[i + 15], 22, 1236535329), h = o(h, m = o(m, p = o(p, f, h, m, t[i + 1], 5, -165796510), f, h, t[i + 6], 9, -1069501632), p, f, t[i + 11], 14, 643717713), m, p, t[i], 20, -373897302), h = o(h, m = o(m, p = o(p, f, h, m, t[i + 5], 5, -701558691), f, h, t[i + 10], 9, 38016083), p, f, t[i + 15], 14, -660478335), m, p, t[i + 4], 20, -405537848), h = o(h, m = o(m, p = o(p, f, h, m, t[i + 9], 5, 568446438), f, h, t[i + 14], 9, -1019803690), p, f, t[i + 3], 14, -187363961), m, p, t[i + 8], 20, 1163531501), h = o(h, m = o(m, p = o(p, f, h, m, t[i + 13], 5, -1444681467), f, h, t[i + 2], 9, -51403784), p, f, t[i + 7], 14, 1735328473), m, p, t[i + 12], 20, -1926607734), h = c(h, m = c(m, p = c(p, f, h, m, t[i + 5], 4, -378558), f, h, t[i + 8], 11, -2022574463), p, f, t[i + 11], 16, 1839030562), m, p, t[i + 14], 23, -35309556), h = c(h, m = c(m, p = c(p, f, h, m, t[i + 1], 4, -1530992060), f, h, t[i + 4], 11, 1272893353), p, f, t[i + 7], 16, -155497632), m, p, t[i + 10], 23, -1094730640), h = c(h, m = c(m, p = c(p, f, h, m, t[i + 13], 4, 681279174), f, h, t[i], 11, -358537222), p, f, t[i + 3], 16, -722521979), m, p, t[i + 6], 23, 76029189), h = c(h, m = c(m, p = c(p, f, h, m, t[i + 9], 4, -640364487), f, h, t[i + 12], 11, -421815835), p, f, t[i + 15], 16, 530742520), m, p, t[i + 2], 23, -995338651), h = l(h, m = l(m, p = l(p, f, h, m, t[i], 6, -198630844), f, h, t[i + 7], 10, 1126891415), p, f, t[i + 14], 15, -1416354905), m, p, t[i + 5], 21, -57434055), h = l(h, m = l(m, p = l(p, f, h, m, t[i + 12], 6, 1700485571), f, h, t[i + 3], 10, -1894986606), p, f, t[i + 10], 15, -1051523), m, p, t[i + 1], 21, -2054922799), h = l(h, m = l(m, p = l(p, f, h, m, t[i + 8], 6, 1873313359), f, h, t[i + 15], 10, -30611744), p, f, t[i + 6], 15, -1560198380), m, p, t[i + 13], 21, 1309151649), h = l(h, m = l(m, p = l(p, f, h, m, t[i + 4], 6, -145523070), f, h, t[i + 11], 10, -1120210379), p, f, t[i + 2], 15, 718787259), m, p, t[i + 9], 21, -343485551),
        p = s(p, a),
        f = s(f, r),
        h = s(h, d),
        m = s(m, u);
    return [p, f, h, m]
}

function u(t) {
    var e, i = "",
        a = 32 * t.length;
    for (e = 0; e < a; e += 8)
        i += String.fromCharCode(t[e >> 5] >>> e % 32 & 255);
    return i
}

function p(t) {
    var e, i = [];
    for (i[(t.length >> 2) - 1] = void 0,
        e = 0; e < i.length; e += 1)
        i[e] = 0;
    var a = 8 * t.length;
    for (e = 0; e < a; e += 8)
        i[e >> 5] |= (255 & t.charCodeAt(e / 8)) << e % 32;
    return i
}

function f(t) {
    var e, i, a = "";
    for (i = 0; i < t.length; i += 1)
        e = t.charCodeAt(i),
        a += "0123456789abcdef".charAt(e >>> 4 & 15) + "0123456789abcdef".charAt(15 & e);
    return a
}

function h(t) {
    return unescape(encodeURIComponent(t))
}

function m(t) {
    return function (t) {
        return u(d(p(t), 8 * t.length))
    }(h(t))
}

function v(t, e) {
    return function (t, e) {
        var i, a, s = p(t),
            r = [],
            n = [];
        for (r[15] = n[15] = void 0,
            s.length > 16 && (s = d(s, 8 * t.length)),
            i = 0; i < 16; i += 1)
            r[i] = 909522486 ^ s[i],
            n[i] = 1549556828 ^ s[i];
        return a = d(r.concat(p(e)), 512 + 8 * e.length),
            u(d(n.concat(a), 640))
    }(h(t), h(e))
}

function sign(t) {

    return f(m(t))

}

function rkey(t) {
    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "-",
        n = (Math.random().toString(16) + "000000000").substr(2, 8);
    return t ? e + n.substr(0, 4) + e + n.substr(4, 4) : n
}

function signKey() {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "-";
    return rkey(!1, t) + rkey(!0, t) + rkey(!0, t) + rkey(!1, t)
}

function sign_signkey_tfb_req_id(){
    var s = ''
    return {
        sign: sign("BJSCAN19bcd8102e70f596a367cb29deeec2a72019-11-0319bcd8102e70f596a367cb29deeec2a7"),
        signkey: signKey(""),
        tfb_req_id: signKey("")
    }
}