/*
	闲鱼JS加密 实现翻页的破解 https://2.taobao.com/
    这个JS主要实现的是sign值的破解
    下面的sign函数的参数是这样的:
    'fdfc06fe9f241b4ef50ca6d6a3f836ff&1564497138768&12574478&{"spmPrefix":"a2170.7897990.6803272.","catId":"50025386","recTab":"shouji","trackName":"Feed3","abtag":"style_masonryLayouts_1.0_mamaAD","pageNumber":4}'
*/

function sign(e) {
    function t(e, t) {
        return e << t | e >>> 32 - t
    }

    function n(e, t) {
        var n, i, r, o, s;
        return r = 2147483648 & e,
            o = 2147483648 & t,
            s = (1073741823 & e) + (1073741823 & t), (n = 1073741824 & e) & (i = 1073741824 & t) ? 2147483648 ^ s ^ r ^ o : n | i ? 1073741824 & s ? 3221225472 ^ s ^ r ^ o : 1073741824 ^ s ^ r ^ o : s ^ r ^ o
    }

    function i(e, i, r, o, s, a, l) {
        return n(t(e = n(e, n(n(function (e, t, n) {
            return e & t | ~e & n
        }(i, r, o), s), l)), a), i)
    }

    function r(e, i, r, o, s, a, l) {
        return n(t(e = n(e, n(n(function (e, t, n) {
            return e & n | t & ~n
        }(i, r, o), s), l)), a), i)
    }

    function o(e, i, r, o, s, a, l) {
        return n(t(e = n(e, n(n(function (e, t, n) {
            return e ^ t ^ n
        }(i, r, o), s), l)), a), i)
    }

    function s(e, i, r, o, s, a, l) {
        return n(t(e = n(e, n(n(function (e, t, n) {
            return t ^ (e | ~n)
        }(i, r, o), s), l)), a), i)
    }

    function a(e) {
        var t, n = "",
            i = "";
        for (t = 0; 3 >= t; t++)
            n += (i = "0" + (e >>> 8 * t & 255).toString(16)).substr(i.length - 2, 2);
        return n
    }
    var l, u, c, d, h, f, p, m, v, g;
    for (g = function (e) {
            for (var t, n = e.length, i = n + 8, r = 16 * ((i - i % 64) / 64 + 1), o = new Array(r - 1), s = 0, a = 0; n > a;)
                s = a % 4 * 8,
                o[t = (a - a % 4) / 4] = o[t] | e.charCodeAt(a) << s,
                a++;
            return s = a % 4 * 8,
                o[t = (a - a % 4) / 4] = o[t] | 128 << s,
                o[r - 2] = n << 3,
                o[r - 1] = n >>> 29,
                o
        }(e = function (e) {
            e = e.replace(/\r\n/g, "\n");
            for (var t = "", n = 0; n < e.length; n++) {
                var i = e.charCodeAt(n);
                128 > i ? t += String.fromCharCode(i) : i > 127 && 2048 > i ? (t += String.fromCharCode(i >> 6 | 192),
                    t += String.fromCharCode(63 & i | 128)) : (t += String.fromCharCode(i >> 12 | 224),
                    t += String.fromCharCode(i >> 6 & 63 | 128),
                    t += String.fromCharCode(63 & i | 128))
            }
            return t
        }(e)),
        f = 1732584193,
        p = 4023233417,
        m = 2562383102,
        v = 271733878,
        l = 0; l < g.length; l += 16)
        u = f,
        c = p,
        d = m,
        h = v,
        p = s(p = s(p = s(p = s(p = o(p = o(p = o(p = o(p = r(p = r(p = r(p = r(p = i(p = i(p = i(p = i(p, m = i(m, v = i(v, f = i(f, p, m, v, g[l + 0], 7, 3614090360), p, m, g[l + 1], 12, 3905402710), f, p, g[l + 2], 17, 606105819), v, f, g[l + 3], 22, 3250441966), m = i(m, v = i(v, f = i(f, p, m, v, g[l + 4], 7, 4118548399), p, m, g[l + 5], 12, 1200080426), f, p, g[l + 6], 17, 2821735955), v, f, g[l + 7], 22, 4249261313), m = i(m, v = i(v, f = i(f, p, m, v, g[l + 8], 7, 1770035416), p, m, g[l + 9], 12, 2336552879), f, p, g[l + 10], 17, 4294925233), v, f, g[l + 11], 22, 2304563134), m = i(m, v = i(v, f = i(f, p, m, v, g[l + 12], 7, 1804603682), p, m, g[l + 13], 12, 4254626195), f, p, g[l + 14], 17, 2792965006), v, f, g[l + 15], 22, 1236535329), m = r(m, v = r(v, f = r(f, p, m, v, g[l + 1], 5, 4129170786), p, m, g[l + 6], 9, 3225465664), f, p, g[l + 11], 14, 643717713), v, f, g[l + 0], 20, 3921069994), m = r(m, v = r(v, f = r(f, p, m, v, g[l + 5], 5, 3593408605), p, m, g[l + 10], 9, 38016083), f, p, g[l + 15], 14, 3634488961), v, f, g[l + 4], 20, 3889429448), m = r(m, v = r(v, f = r(f, p, m, v, g[l + 9], 5, 568446438), p, m, g[l + 14], 9, 3275163606), f, p, g[l + 3], 14, 4107603335), v, f, g[l + 8], 20, 1163531501), m = r(m, v = r(v, f = r(f, p, m, v, g[l + 13], 5, 2850285829), p, m, g[l + 2], 9, 4243563512), f, p, g[l + 7], 14, 1735328473), v, f, g[l + 12], 20, 2368359562), m = o(m, v = o(v, f = o(f, p, m, v, g[l + 5], 4, 4294588738), p, m, g[l + 8], 11, 2272392833), f, p, g[l + 11], 16, 1839030562), v, f, g[l + 14], 23, 4259657740), m = o(m, v = o(v, f = o(f, p, m, v, g[l + 1], 4, 2763975236), p, m, g[l + 4], 11, 1272893353), f, p, g[l + 7], 16, 4139469664), v, f, g[l + 10], 23, 3200236656), m = o(m, v = o(v, f = o(f, p, m, v, g[l + 13], 4, 681279174), p, m, g[l + 0], 11, 3936430074), f, p, g[l + 3], 16, 3572445317), v, f, g[l + 6], 23, 76029189), m = o(m, v = o(v, f = o(f, p, m, v, g[l + 9], 4, 3654602809), p, m, g[l + 12], 11, 3873151461), f, p, g[l + 15], 16, 530742520), v, f, g[l + 2], 23, 3299628645), m = s(m, v = s(v, f = s(f, p, m, v, g[l + 0], 6, 4096336452), p, m, g[l + 7], 10, 1126891415), f, p, g[l + 14], 15, 2878612391), v, f, g[l + 5], 21, 4237533241), m = s(m, v = s(v, f = s(f, p, m, v, g[l + 12], 6, 1700485571), p, m, g[l + 3], 10, 2399980690), f, p, g[l + 10], 15, 4293915773), v, f, g[l + 1], 21, 2240044497), m = s(m, v = s(v, f = s(f, p, m, v, g[l + 8], 6, 1873313359), p, m, g[l + 15], 10, 4264355552), f, p, g[l + 6], 15, 2734768916), v, f, g[l + 13], 21, 1309151649), m = s(m, v = s(v, f = s(f, p, m, v, g[l + 4], 6, 4149444226), p, m, g[l + 11], 10, 3174756917), f, p, g[l + 2], 15, 718787259), v, f, g[l + 9], 21, 3951481745),
        f = n(f, u),
        p = n(p, c),
        m = n(m, d),
        v = n(v, h);
    return (a(f) + a(p) + a(m) + a(v)).toLowerCase()
}