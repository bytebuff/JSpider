/*
    @破解目标: http://www.jdair.net/
    @破解时间: 2019年8月16日16:40:41
    @破解参数: 机票价格的请求中的查询字符串 desc -> coBPtm4BZy5Ly7E1arnljx2fxaOTQIVU/6HpTHGDpz0XYl/elXICeY115jwY6dt2
    @破解提示:
        1. 抓包 找到需要的请求
        2. 全局搜索 desc 参数 具体的代码在 searchFlight.js (544行左右)
        3. 断点调试 不断找到加密的位置 在 ex_mouse.js 文件里面
        4. 抠出相关代码 注意: document参数可以不要 screen.colorDepth 在我的电脑上是 24(直接写死) 不同电脑应该不一样
        5. 添加 windows 和 navigator 以及 Json 对象
*/




if (typeof JSON !== "object") {
    JSON = {};
}(function () {
    "use strict";
    var rx_one = /^[\],:{}\s]*$/;
    var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
    var rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

    function f(n) {
        return n < 10 ? "0" + n : n;
    }

    function this_value() {
        return this.valueOf();
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
        };
        Boolean.prototype.toJSON = this_value;
        Number.prototype.toJSON = this_value;
        String.prototype.toJSON = this_value;
    }
    var gap;
    var indent;
    var meta;
    var rep;

    function quote(string) {
        rx_escapable.lastIndex = 0;
        return rx_escapable.test(string) ? "\"" + string.replace(rx_escapable, function (a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        }) + "\"" : "\"" + string + "\"";
    }

    function str(key, holder) {
        var i;
        var k;
        var v;
        var length;
        var mind = gap;
        var partial;
        var value = holder[key];
        if (value && typeof value === "object" && typeof value.toJSON === "function") {
            value = value.toJSON(key);
        }
        if (typeof rep === "function") {
            value = rep.call(holder, key, value);
        }
        switch (typeof value) {
        case "string":
            return quote(value);
        case "number":
            return isFinite(value) ? String(value) : "null";
        case "boolean":
        case "null":
            return String(value);
        case "object":
            if (!value) {
                return "null";
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === "[object Array]") {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || "null";
                }
                v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                gap = mind;
                return v;
            }
            if (rep && typeof rep === "object") {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === "string") {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v);
                        }
                    }
                }
            } else {
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ": " : ":") + v);
                        }
                    }
                }
            }
            v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
            gap = mind;
            return v;
        }
    }
    if (typeof JSON.stringify !== "function") {
        meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            "\"": "\\\"",
            "\\": "\\\\"
        };
        JSON.stringify = function (value, replacer, space) {
            var i;
            gap = "";
            indent = "";
            if (typeof space === "number") {
                for (i = 0; i < space; i += 1) {
                    indent += " ";
                }
            } else if (typeof space === "string") {
                indent = space;
            }
            rep = replacer;
            if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                throw new Error("JSON.stringify");
            }
            return str("", {
                "": value
            });
        };
    }
    if (typeof JSON.parse !== "function") {
        JSON.parse = function (text, reviver) {
            var j;

            function walk(holder, key) {
                var k;
                var v;
                var value = holder[key];
                if (value && typeof value === "object") {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
            text = String(text);
            rx_dangerous.lastIndex = 0;
            if (rx_dangerous.test(text)) {
                text = text.replace(rx_dangerous, function (a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            if (rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) {
                j = eval("(" + text + ")");
                return (typeof reviver === "function") ? walk({
                    "": j
                }, "") : j;
            }
            throw new SyntaxError("JSON.parse");
        };
    }
}());

navigator = {
    // WT-JS_DEBUG
    appCodeName: "Mozilla",
    appMinorVersion: "0",
    appName: "Netscape",
    appVersion: "5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3; rv:11.0) like Gecko",
    browserLanguage: "zh-CN",
    cookieEnabled: true,
    cpuClass: "x86",
    language: "zh-CN",
    maxTouchPoints: 0,
    msManipulationViewsEnabled: true,
    msMaxTouchPoints: 0,
    msPointerEnabled: true,
    onLine: true,
    platform: "Win32",
    pointerEnabled: true,
    product: "Gecko",
    systemLanguage: "zh-CN",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; InfoPath.3; rv:11.0) like Gecko",
    userLanguage: "zh-CN",
    vendor: "",
    vendorSub: "",
    webdriver: false
}, window = this, window.navigator = navigator;

var coypJsDk = coypJsDk || function (e, t) {
    var r = {},
        i = r.lib = {},
        n = function () {},
        o = i.Base = {
            extend: function (e) {
                    n.prototype = this;
                    var t = new n;
                    e && t.mixIn(e);
                    t.hasOwnProperty("init") || (t.init = function () {
                        t.$super.init.apply(this, arguments)
                    });
                    t.init.prototype = t;
                    t.$super = this;
                    return t
                },
                create: function () {
                    var e = this.extend();
                    e.init.apply(e, arguments);
                    return e
                },
                init: function () {},
                mixIn: function (e) {
                    for (var t in e)
                        e.hasOwnProperty(t) && (this[t] = e[t]);
                    e.hasOwnProperty("toString") && (this.toString = e.toString)
                },
                clone: function () {
                    return this.init.prototype.extend(this)
                }
        },
        a = i.WordArray = o.extend({
            init: function (e, r) {
                    e = this.words = e || [];
                    this.sigBytes = r != t ? r : 4 * e.length
                },
                toString: function (e) {
                    return (e || c).stringify(this)
                },
                concat: function (e) {
                    var t = this.words,
                        r = e.words,
                        i = this.sigBytes;
                    e = e.sigBytes;
                    this.clamp();
                    if (i % 4)
                        for (var n = 0; n < e; n++)
                            t[i + n >>> 2] |= (r[n >>> 2] >>> 24 - 8 * (n % 4) & 255) << 24 - 8 * ((i + n) % 4);
                    else if (65535 < r.length)
                        for (n = 0; n < e; n += 4)
                            t[i + n >>> 2] = r[n >>> 2];
                    else
                        t.push.apply(t, r);
                    this.sigBytes += e;
                    return this
                },
                clamp: function () {
                    var t = this.words,
                        r = this.sigBytes;
                    t[r >>> 2] &= 4294967295 << 32 - 8 * (r % 4);
                    t.length = e.ceil(r / 4)
                },
                clone: function () {
                    var e = o.clone.call(this);
                    e.words = this.words.slice(0);
                    return e
                },
                random: function (t) {
                    for (var r = [], i = 0; i < t; i += 4)
                        r.push(4294967296 * e.random() | 0);
                    return new a.init(r, t)
                }
        }),
        s = r.enc = {},
        c = s.Hex = {
            stringify: function (e) {
                    var t = e.words;
                    e = e.sigBytes;
                    for (var r = [], i = 0; i < e; i++) {
                        var n = t[i >>> 2] >>> 24 - 8 * (i % 4) & 255;
                        r.push((n >>> 4).toString(16));
                        r.push((n & 15).toString(16))
                    }
                    return r.join("")
                },
                parse: function (e) {
                    for (var t = e.length, r = [], i = 0; i < t; i += 2)
                        r[i >>> 3] |= parseInt(e.substr(i, 2), 16) << 24 - 4 * (i % 8);
                    return new a.init(r, t / 2)
                }
        },
        l = s.Latin1 = {
            stringify: function (e) {
                    var t = e.words;
                    e = e.sigBytes;
                    for (var r = [], i = 0; i < e; i++)
                        r.push(String.fromCharCode(t[i >>> 2] >>> 24 - 8 * (i % 4) & 255));
                    return r.join("")
                },
                parse: function (e) {
                    for (var t = e.length, r = [], i = 0; i < t; i++)
                        r[i >>> 2] |= (e.charCodeAt(i) & 255) << 24 - 8 * (i % 4);
                    return new a.init(r, t)
                }
        },
        h = s.Utf8 = {
            stringify: function (e) {
                    try {
                        return decodeURIComponent(escape(l.stringify(e)))
                    } catch (t) {
                        throw Error("Malformed UTF-8 data")
                    }
                },
                parse: function (e) {
                    return l.parse(unescape(encodeURIComponent(e)))
                }
        },
        u = i.BufferedBlockAlgorithm = o.extend({
            reset: function () {
                    this._data = new a.init;
                    this._nDataBytes = 0
                },
                _append: function (e) {
                    "string" == typeof e && (e = h.parse(e));
                    this._data.concat(e);
                    this._nDataBytes += e.sigBytes
                },
                _process: function (t) {
                    var r = this._data,
                        i = r.words,
                        n = r.sigBytes,
                        o = this.blockSize,
                        s = n / (4 * o),
                        s = t ? e.ceil(s) : e.max((s | 0) - this._minBufferSize, 0);
                    t = s * o;
                    n = e.min(4 * t, n);
                    if (t) {
                        for (var c = 0; c < t; c += o)
                            this._doProcessBlock(i, c);
                        c = i.splice(0, t);
                        r.sigBytes -= n
                    }
                    return new a.init(c, n)
                },
                clone: function () {
                    var e = o.clone.call(this);
                    e._data = this._data.clone();
                    return e
                },
                _minBufferSize: 0
        });
    i.Hasher = u.extend({
        cfg: o.extend(),
        init: function (e) {
                this.cfg = this.cfg.extend(e);
                this.reset()
            },
            reset: function () {
                u.reset.call(this);
                this._doReset()
            },
            update: function (e) {
                this._append(e);
                this._process();
                return this
            },
            finalize: function (e) {
                e && this._append(e);
                return this._doFinalize()
            },
            blockSize: 16,
        _createHelper: function (e) {
                return function (t, r) {
                    return new e.init(r).finalize(t)
                }
            },
            _createHmacHelper: function (e) {
                return function (t, r) {
                    return new f.HMAC.init(e, r).finalize(t)
                }
            }
    });
    var f = r.algo = {};
    return r
}(Math);
(function () {
    var e = coypJsDk,
        t = e.lib.WordArray;
    e.enc.Base64 = {
        stringify: function (e) {
                var t = e.words,
                    r = e.sigBytes,
                    i = this._map;
                e.clamp();
                e = [];
                for (var n = 0; n < r; n += 3)
                    for (var o = (t[n >>> 2] >>> 24 - 8 * (n % 4) & 255) << 16 | (t[n + 1 >>> 2] >>> 24 - 8 * ((n + 1) % 4) & 255) << 8 | t[n + 2 >>> 2] >>> 24 - 8 * ((n + 2) % 4) & 255, a = 0; 4 > a && n + .75 * a < r; a++)
                        e.push(i.charAt(o >>> 6 * (3 - a) & 63));
                if (t = i.charAt(64))
                    for (; e.length % 4;)
                        e.push(t);
                return e.join("")
            },
            parse: function (e) {
                var r = e.length,
                    i = this._map,
                    n = i.charAt(64);
                n && (n = e.indexOf(n), -1 != n && (r = n));
                for (var n = [], o = 0, a = 0; a < r; a++)
                    if (a % 4) {
                        var s = i.indexOf(e.charAt(a - 1)) << 2 * (a % 4),
                            c = i.indexOf(e.charAt(a)) >>> 6 - 2 * (a % 4);
                        n[o >>> 2] |= (s | c) << 24 - 8 * (o % 4);
                        o++
                    }
                return t.create(n, o)
            },
            _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    }
})();
(function (e) {
    function t(e, t, r, i, n, o, a) {
        e = e + (t & r | ~t & i) + n + a;
        return (e << o | e >>> 32 - o) + t
    }

    function r(e, t, r, i, n, o, a) {
        e = e + (t & i | r & ~i) + n + a;
        return (e << o | e >>> 32 - o) + t
    }

    function i(e, t, r, i, n, o, a) {
        e = e + (t ^ r ^ i) + n + a;
        return (e << o | e >>> 32 - o) + t
    }

    function n(e, t, r, i, n, o, a) {
        e = e + (r ^ (t | ~i)) + n + a;
        return (e << o | e >>> 32 - o) + t
    }
    for (var o = coypJsDk, a = o.lib, s = a.WordArray, c = a.Hasher, a = o.algo, l = [], h = 0; 64 > h; h++)
        l[h] = 4294967296 * e.abs(e.sin(h + 1)) | 0;
    a = a.MD5 = c.extend({
        _doReset: function () {
                this._hash = new s.init([1732584193, 4023233417, 2562383102, 271733878])
            },
            _doProcessBlock: function (e, o) {
                for (var a = 0; 16 > a; a++) {
                    var s = o + a,
                        c = e[s];
                    e[s] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360
                }
                var a = this._hash.words,
                    s = e[o + 0],
                    c = e[o + 1],
                    h = e[o + 2],
                    u = e[o + 3],
                    f = e[o + 4],
                    p = e[o + 5],
                    d = e[o + 6],
                    y = e[o + 7],
                    g = e[o + 8],
                    v = e[o + 9],
                    _ = e[o + 10],
                    m = e[o + 11],
                    k = e[o + 12],
                    w = e[o + 13],
                    S = e[o + 14],
                    B = e[o + 15],
                    C = a[0],
                    A = a[1],
                    x = a[2],
                    b = a[3],
                    C = t(C, A, x, b, s, 7, l[0]),
                    b = t(b, C, A, x, c, 12, l[1]),
                    x = t(x, b, C, A, h, 17, l[2]),
                    A = t(A, x, b, C, u, 22, l[3]),
                    C = t(C, A, x, b, f, 7, l[4]),
                    b = t(b, C, A, x, p, 12, l[5]),
                    x = t(x, b, C, A, d, 17, l[6]),
                    A = t(A, x, b, C, y, 22, l[7]),
                    C = t(C, A, x, b, g, 7, l[8]),
                    b = t(b, C, A, x, v, 12, l[9]),
                    x = t(x, b, C, A, _, 17, l[10]),
                    A = t(A, x, b, C, m, 22, l[11]),
                    C = t(C, A, x, b, k, 7, l[12]),
                    b = t(b, C, A, x, w, 12, l[13]),
                    x = t(x, b, C, A, S, 17, l[14]),
                    A = t(A, x, b, C, B, 22, l[15]),
                    C = r(C, A, x, b, c, 5, l[16]),
                    b = r(b, C, A, x, d, 9, l[17]),
                    x = r(x, b, C, A, m, 14, l[18]),
                    A = r(A, x, b, C, s, 20, l[19]),
                    C = r(C, A, x, b, p, 5, l[20]),
                    b = r(b, C, A, x, _, 9, l[21]),
                    x = r(x, b, C, A, B, 14, l[22]),
                    A = r(A, x, b, C, f, 20, l[23]),
                    C = r(C, A, x, b, v, 5, l[24]),
                    b = r(b, C, A, x, S, 9, l[25]),
                    x = r(x, b, C, A, u, 14, l[26]),
                    A = r(A, x, b, C, g, 20, l[27]),
                    C = r(C, A, x, b, w, 5, l[28]),
                    b = r(b, C, A, x, h, 9, l[29]),
                    x = r(x, b, C, A, y, 14, l[30]),
                    A = r(A, x, b, C, k, 20, l[31]),
                    C = i(C, A, x, b, p, 4, l[32]),
                    b = i(b, C, A, x, g, 11, l[33]),
                    x = i(x, b, C, A, m, 16, l[34]),
                    A = i(A, x, b, C, S, 23, l[35]),
                    C = i(C, A, x, b, c, 4, l[36]),
                    b = i(b, C, A, x, f, 11, l[37]),
                    x = i(x, b, C, A, y, 16, l[38]),
                    A = i(A, x, b, C, _, 23, l[39]),
                    C = i(C, A, x, b, w, 4, l[40]),
                    b = i(b, C, A, x, s, 11, l[41]),
                    x = i(x, b, C, A, u, 16, l[42]),
                    A = i(A, x, b, C, d, 23, l[43]),
                    C = i(C, A, x, b, v, 4, l[44]),
                    b = i(b, C, A, x, k, 11, l[45]),
                    x = i(x, b, C, A, B, 16, l[46]),
                    A = i(A, x, b, C, h, 23, l[47]),
                    C = n(C, A, x, b, s, 6, l[48]),
                    b = n(b, C, A, x, y, 10, l[49]),
                    x = n(x, b, C, A, S, 15, l[50]),
                    A = n(A, x, b, C, p, 21, l[51]),
                    C = n(C, A, x, b, k, 6, l[52]),
                    b = n(b, C, A, x, u, 10, l[53]),
                    x = n(x, b, C, A, _, 15, l[54]),
                    A = n(A, x, b, C, c, 21, l[55]),
                    C = n(C, A, x, b, g, 6, l[56]),
                    b = n(b, C, A, x, B, 10, l[57]),
                    x = n(x, b, C, A, d, 15, l[58]),
                    A = n(A, x, b, C, w, 21, l[59]),
                    C = n(C, A, x, b, f, 6, l[60]),
                    b = n(b, C, A, x, m, 10, l[61]),
                    x = n(x, b, C, A, h, 15, l[62]),
                    A = n(A, x, b, C, v, 21, l[63]);
                a[0] = a[0] + C | 0;
                a[1] = a[1] + A | 0;
                a[2] = a[2] + x | 0;
                a[3] = a[3] + b | 0
            },
            _doFinalize: function () {
                var t = this._data,
                    r = t.words,
                    i = 8 * this._nDataBytes,
                    n = 8 * t.sigBytes;
                r[n >>> 5] |= 128 << 24 - n % 32;
                var o = e.floor(i / 4294967296);
                r[(n + 64 >>> 9 << 4) + 15] = (o << 8 | o >>> 24) & 16711935 | (o << 24 | o >>> 8) & 4278255360;
                r[(n + 64 >>> 9 << 4) + 14] = (i << 8 | i >>> 24) & 16711935 | (i << 24 | i >>> 8) & 4278255360;
                t.sigBytes = 4 * (r.length + 1);
                this._process();
                t = this._hash;
                r = t.words;
                for (i = 0; 4 > i; i++)
                    n = r[i],
                    r[i] = (n << 8 | n >>> 24) & 16711935 | (n << 24 | n >>> 8) & 4278255360;
                return t
            },
            clone: function () {
                var e = c.clone.call(this);
                e._hash = this._hash.clone();
                return e
            }
    });
    o.MD5 = c._createHelper(a);
    o.HmacMD5 = c._createHmacHelper(a)
})(Math);
(function () {
    var e = coypJsDk,
        t = e.lib,
        r = t.Base,
        i = t.WordArray,
        t = e.algo,
        n = t.EvpKDF = r.extend({
            cfg: r.extend({
                keySize: 4,
                hasher: t.MD5,
                iterations: 1
            }),
            init: function (e) {
                    this.cfg = this.cfg.extend(e)
                },
                compute: function (e, t) {
                    for (var r = this.cfg, n = r.hasher.create(), o = i.create(), a = o.words, s = r.keySize, r = r.iterations; a.length < s;) {
                        c && n.update(c);
                        var c = n.update(e).finalize(t);
                        n.reset();
                        for (var l = 1; l < r; l++)
                            c = n.finalize(c),
                            n.reset();
                        o.concat(c)
                    }
                    o.sigBytes = 4 * s;
                    return o
                }
        });
    e.EvpKDF = function (e, t, r) {
        return n.create(r).compute(e, t)
    }
})();
coypJsDk.lib.Cipher || function (e) {
    var t = coypJsDk,
        r = t.lib,
        i = r.Base,
        n = r.WordArray,
        o = r.BufferedBlockAlgorithm,
        a = t.enc.Base64,
        s = t.algo.EvpKDF,
        c = r.Cipher = o.extend({
            cfg: i.extend(),
            createEncryptor: function (e, t) {
                    return this.create(this._ENC_XFORM_MODE, e, t)
                },
                createDecryptor: function (e, t) {
                    return this.create(this._DEC_XFORM_MODE, e, t)
                },
                init: function (e, t, r) {
                    this.cfg = this.cfg.extend(r);
                    this._xformMode = e;
                    this._key = t;
                    this.reset()
                },
                reset: function () {
                    o.reset.call(this);
                    this._doReset()
                },
                process: function (e) {
                    this._append(e);
                    return this._process()
                },
                finalize: function (e) {
                    e && this._append(e);
                    return this._doFinalize()
                },
                keySize: 4,
            ivSize: 4,
            _ENC_XFORM_MODE: 1,
            _DEC_XFORM_MODE: 2,
            _createHelper: function (e) {
                return {
                    encrypt: function (t, r, i) {
                            return ("string" == typeof r ? d : p).encrypt(e, t, r, i)
                        },
                        decrypt: function (t, r, i) {
                            return ("string" == typeof r ? d : p).decrypt(e, t, r, i)
                        }
                }
            }
        });
    r.StreamCipher = c.extend({
        _doFinalize: function () {
                return this._process(!0)
            },
            blockSize: 1
    });
    var l = t.mode = {},
        h = function (t, r, i) {
            var n = this._iv;
            n ? this._iv = e : n = this._prevBlock;
            for (var o = 0; o < i; o++)
                t[r + o] ^= n[o]
        },
        u = (r.BlockCipherMode = i.extend({
            createEncryptor: function (e, t) {
                    return this.Encryptor.create(e, t)
                },
                createDecryptor: function (e, t) {
                    return this.Decryptor.create(e, t)
                },
                init: function (e, t) {
                    this._cipher = e;
                    this._iv = t
                }
        })).extend();
    u.Encryptor = u.extend({
        processBlock: function (e, t) {
            var r = this._cipher,
                i = r.blockSize;
            h.call(this, e, t, i);
            r.encryptBlock(e, t);
            this._prevBlock = e.slice(t, t + i)
        }
    });
    u.Decryptor = u.extend({
        processBlock: function (e, t) {
            var r = this._cipher,
                i = r.blockSize,
                n = e.slice(t, t + i);
            r.decryptBlock(e, t);
            h.call(this, e, t, i);
            this._prevBlock = n
        }
    });
    l = l.CBC = u;
    u = (t.pad = {}).Nopk = {
        pad: function (e, t) {
                for (var r = 4 * t, r = r - e.sigBytes % r, i = r << 24 | r << 16 | r << 8 | r, o = [], a = 0; a < r; a += 4)
                    o.push(i);
                r = n.create(o, r);
                e.concat(r)
            },
            unpad: function (e) {
                e.sigBytes -= e.words[e.sigBytes - 1 >>> 2] & 255
            }
    };
    r.BlockCipher = c.extend({
        cfg: c.cfg.extend({
            mode: l,
            padding: u
        }),
        reset: function () {
                c.reset.call(this);
                var e = this.cfg,
                    t = e.iv,
                    e = e.mode;
                if (this._xformMode == this._ENC_XFORM_MODE)
                    var r = e.createEncryptor;
                else
                    r = e.createDecryptor,
                    this._minBufferSize = 1;
                this._mode = r.call(e, this, t && t.words)
            },
            _doProcessBlock: function (e, t) {
                this._mode.processBlock(e, t)
            },
            _doFinalize: function () {
                var e = this.cfg.padding;
                if (this._xformMode == this._ENC_XFORM_MODE) {
                    e.pad(this._data, this.blockSize);
                    var t = this._process(!0)
                } else
                    t = this._process(!0),
                    e.unpad(t);
                return t
            },
            blockSize: 4
    });
    var f = r.CipherParams = i.extend({
            init: function (e) {
                    this.mixIn(e)
                },
                toString: function (e) {
                    return (e || this.formatter).stringify(this)
                }
        }),
        l = (t.format = {}).OpenSSL = {
            stringify: function (e) {
                    var t = e.ciphertext;
                    e = e.salt;
                    return (e ? n.create([1398893684, 1701076831]).concat(e).concat(t) : t).toString(a)
                },
                parse: function (e) {
                    e = a.parse(e);
                    var t = e.words;
                    if (1398893684 == t[0] && 1701076831 == t[1]) {
                        var r = n.create(t.slice(2, 4));
                        t.splice(0, 4);
                        e.sigBytes -= 16
                    }
                    return f.create({
                        ciphertext: e,
                        salt: r
                    })
                }
        },
        p = r.SerializableCipher = i.extend({
            cfg: i.extend({
                format: l
            }),
            encrypt: function (e, t, r, i) {
                    i = this.cfg.extend(i);
                    var n = e.createEncryptor(r, i);
                    t = n.finalize(t);
                    n = n.cfg;
                    return f.create({
                        ciphertext: t,
                        key: r,
                        iv: n.iv,
                        algorithm: e,
                        mode: n.mode,
                        padding: n.padding,
                        blockSize: e.blockSize,
                        formatter: i.format
                    })
                },
                decrypt: function (e, t, r, i) {
                    i = this.cfg.extend(i);
                    t = this._parse(t, i.format);
                    return e.createDecryptor(r, i).finalize(t.ciphertext)
                },
                _parse: function (e, t) {
                    return "string" == typeof e ? t.parse(e, this) : e
                }
        }),
        t = (t.kdf = {}).OpenSSL = {
            execute: function (e, t, r, i) {
                i || (i = n.random(8));
                e = s.create({
                    keySize: t + r
                }).compute(e, i);
                r = n.create(e.words.slice(t), 4 * r);
                e.sigBytes = 4 * t;
                return f.create({
                    key: e,
                    iv: r,
                    salt: i
                })
            }
        },
        d = r.PasswordBasedCipher = p.extend({
            cfg: p.cfg.extend({
                kdf: t
            }),
            encrypt: function (e, t, r, i) {
                    i = this.cfg.extend(i);
                    r = i.kdf.execute(r, e.keySize, e.ivSize);
                    i.iv = r.iv;
                    e = p.encrypt.call(this, e, t, r.key, i);
                    e.mixIn(r);
                    return e
                },
                decrypt: function (e, t, r, i) {
                    i = this.cfg.extend(i);
                    t = this._parse(t, i.format);
                    r = i.kdf.execute(r, e.keySize, e.ivSize, t.salt);
                    i.iv = r.iv;
                    return p.decrypt.call(this, e, t, r.key, i)
                }
        })
}();
(function () {
    function e(e, t) {
        var r = (this._lBlock >>> e ^ this._rBlock) & t;
        this._rBlock ^= r;
        this._lBlock ^= r << e
    }

    function t(e, t) {
        var r = (this._rBlock >>> e ^ this._lBlock) & t;
        this._lBlock ^= r;
        this._rBlock ^= r << e
    }
    var r = coypJsDk,
        i = r.lib,
        n = i.WordArray,
        i = i.BlockCipher,
        o = r.algo,
        a = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4],
        s = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32],
        c = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28],
        l = [{
            0: 8421888,
            268435456: 32768,
            536870912: 8421378,
            805306368: 2,
            1073741824: 512,
            1342177280: 8421890,
            1610612736: 8389122,
            1879048192: 8388608,
            2147483648: 514,
            2415919104: 8389120,
            2684354560: 33280,
            2952790016: 8421376,
            3221225472: 32770,
            3489660928: 8388610,
            3758096384: 0,
            4026531840: 33282,
            134217728: 0,
            402653184: 8421890,
            671088640: 33282,
            939524096: 32768,
            1207959552: 8421888,
            1476395008: 512,
            1744830464: 8421378,
            2013265920: 2,
            2281701376: 8389120,
            2550136832: 33280,
            2818572288: 8421376,
            3087007744: 8389122,
            3355443200: 8388610,
            3623878656: 32770,
            3892314112: 514,
            4160749568: 8388608,
            1: 32768,
            268435457: 2,
            536870913: 8421888,
            805306369: 8388608,
            1073741825: 8421378,
            1342177281: 33280,
            1610612737: 512,
            1879048193: 8389122,
            2147483649: 8421890,
            2415919105: 8421376,
            2684354561: 8388610,
            2952790017: 33282,
            3221225473: 514,
            3489660929: 8389120,
            3758096385: 32770,
            4026531841: 0,
            134217729: 8421890,
            402653185: 8421376,
            671088641: 8388608,
            939524097: 512,
            1207959553: 32768,
            1476395009: 8388610,
            1744830465: 2,
            2013265921: 33282,
            2281701377: 32770,
            2550136833: 8389122,
            2818572289: 514,
            3087007745: 8421888,
            3355443201: 8389120,
            3623878657: 0,
            3892314113: 33280,
            4160749569: 8421378
        }, {
            0: 1074282512,
            16777216: 16384,
            33554432: 524288,
            50331648: 1074266128,
            67108864: 1073741840,
            83886080: 1074282496,
            100663296: 1073758208,
            117440512: 16,
            134217728: 540672,
            150994944: 1073758224,
            167772160: 1073741824,
            184549376: 540688,
            201326592: 524304,
            218103808: 0,
            234881024: 16400,
            251658240: 1074266112,
            8388608: 1073758208,
            25165824: 540688,
            41943040: 16,
            58720256: 1073758224,
            75497472: 1074282512,
            92274688: 1073741824,
            109051904: 524288,
            125829120: 1074266128,
            142606336: 524304,
            159383552: 0,
            176160768: 16384,
            192937984: 1074266112,
            209715200: 1073741840,
            226492416: 540672,
            243269632: 1074282496,
            260046848: 16400,
            268435456: 0,
            285212672: 1074266128,
            301989888: 1073758224,
            318767104: 1074282496,
            335544320: 1074266112,
            352321536: 16,
            369098752: 540688,
            385875968: 16384,
            402653184: 16400,
            419430400: 524288,
            436207616: 524304,
            452984832: 1073741840,
            469762048: 540672,
            486539264: 1073758208,
            503316480: 1073741824,
            520093696: 1074282512,
            276824064: 540688,
            293601280: 524288,
            310378496: 1074266112,
            327155712: 16384,
            343932928: 1073758208,
            360710144: 1074282512,
            377487360: 16,
            394264576: 1073741824,
            411041792: 1074282496,
            427819008: 1073741840,
            444596224: 1073758224,
            461373440: 524304,
            478150656: 0,
            494927872: 16400,
            511705088: 1074266128,
            528482304: 540672
        }, {
            0: 260,
            1048576: 0,
            2097152: 67109120,
            3145728: 65796,
            4194304: 65540,
            5242880: 67108868,
            6291456: 67174660,
            7340032: 67174400,
            8388608: 67108864,
            9437184: 67174656,
            10485760: 65792,
            11534336: 67174404,
            12582912: 67109124,
            13631488: 65536,
            14680064: 4,
            15728640: 256,
            524288: 67174656,
            1572864: 67174404,
            2621440: 0,
            3670016: 67109120,
            4718592: 67108868,
            5767168: 65536,
            6815744: 65540,
            7864320: 260,
            8912896: 4,
            9961472: 256,
            11010048: 67174400,
            12058624: 65796,
            13107200: 65792,
            14155776: 67109124,
            15204352: 67174660,
            16252928: 67108864,
            16777216: 67174656,
            17825792: 65540,
            18874368: 65536,
            19922944: 67109120,
            20971520: 256,
            22020096: 67174660,
            23068672: 67108868,
            24117248: 0,
            25165824: 67109124,
            26214400: 67108864,
            27262976: 4,
            28311552: 65792,
            29360128: 67174400,
            30408704: 260,
            31457280: 65796,
            32505856: 67174404,
            17301504: 67108864,
            18350080: 260,
            19398656: 67174656,
            20447232: 0,
            21495808: 65540,
            22544384: 67109120,
            23592960: 256,
            24641536: 67174404,
            25690112: 65536,
            26738688: 67174660,
            27787264: 65796,
            28835840: 67108868,
            29884416: 67109124,
            30932992: 67174400,
            31981568: 4,
            33030144: 65792
        }, {
            0: 2151682048,
            65536: 2147487808,
            131072: 4198464,
            196608: 2151677952,
            262144: 0,
            327680: 4198400,
            393216: 2147483712,
            458752: 4194368,
            524288: 2147483648,
            589824: 4194304,
            655360: 64,
            720896: 2147487744,
            786432: 2151678016,
            851968: 4160,
            917504: 4096,
            983040: 2151682112,
            32768: 2147487808,
            98304: 64,
            163840: 2151678016,
            229376: 2147487744,
            294912: 4198400,
            360448: 2151682112,
            425984: 0,
            491520: 2151677952,
            557056: 4096,
            622592: 2151682048,
            688128: 4194304,
            753664: 4160,
            819200: 2147483648,
            884736: 4194368,
            950272: 4198464,
            1015808: 2147483712,
            1048576: 4194368,
            1114112: 4198400,
            1179648: 2147483712,
            1245184: 0,
            1310720: 4160,
            1376256: 2151678016,
            1441792: 2151682048,
            1507328: 2147487808,
            1572864: 2151682112,
            1638400: 2147483648,
            1703936: 2151677952,
            1769472: 4198464,
            1835008: 2147487744,
            1900544: 4194304,
            1966080: 64,
            2031616: 4096,
            1081344: 2151677952,
            1146880: 2151682112,
            1212416: 0,
            1277952: 4198400,
            1343488: 4194368,
            1409024: 2147483648,
            1474560: 2147487808,
            1540096: 64,
            1605632: 2147483712,
            1671168: 4096,
            1736704: 2147487744,
            1802240: 2151678016,
            1867776: 4160,
            1933312: 2151682048,
            1998848: 4194304,
            2064384: 4198464
        }, {
            0: 128,
            4096: 17039360,
            8192: 262144,
            12288: 536870912,
            16384: 537133184,
            20480: 16777344,
            24576: 553648256,
            28672: 262272,
            32768: 16777216,
            36864: 537133056,
            40960: 536871040,
            45056: 553910400,
            49152: 553910272,
            53248: 0,
            57344: 17039488,
            61440: 553648128,
            2048: 17039488,
            6144: 553648256,
            10240: 128,
            14336: 17039360,
            18432: 262144,
            22528: 537133184,
            26624: 553910272,
            30720: 536870912,
            34816: 537133056,
            38912: 0,
            43008: 553910400,
            47104: 16777344,
            51200: 536871040,
            55296: 553648128,
            59392: 16777216,
            63488: 262272,
            65536: 262144,
            69632: 128,
            73728: 536870912,
            77824: 553648256,
            81920: 16777344,
            86016: 553910272,
            90112: 537133184,
            94208: 16777216,
            98304: 553910400,
            102400: 553648128,
            106496: 17039360,
            110592: 537133056,
            114688: 262272,
            118784: 536871040,
            122880: 0,
            126976: 17039488,
            67584: 553648256,
            71680: 16777216,
            75776: 17039360,
            79872: 537133184,
            83968: 536870912,
            88064: 17039488,
            92160: 128,
            96256: 553910272,
            100352: 262272,
            104448: 553910400,
            108544: 0,
            112640: 553648128,
            116736: 16777344,
            120832: 262144,
            124928: 537133056,
            129024: 536871040
        }, {
            0: 268435464,
            256: 8192,
            512: 270532608,
            768: 270540808,
            1024: 268443648,
            1280: 2097152,
            1536: 2097160,
            1792: 268435456,
            2048: 0,
            2304: 268443656,
            2560: 2105344,
            2816: 8,
            3072: 270532616,
            3328: 2105352,
            3584: 8200,
            3840: 270540800,
            128: 270532608,
            384: 270540808,
            640: 8,
            896: 2097152,
            1152: 2105352,
            1408: 268435464,
            1664: 268443648,
            1920: 8200,
            2176: 2097160,
            2432: 8192,
            2688: 268443656,
            2944: 270532616,
            3200: 0,
            3456: 270540800,
            3712: 2105344,
            3968: 268435456,
            4096: 268443648,
            4352: 270532616,
            4608: 270540808,
            4864: 8200,
            5120: 2097152,
            5376: 268435456,
            5632: 268435464,
            5888: 2105344,
            6144: 2105352,
            6400: 0,
            6656: 8,
            6912: 270532608,
            7168: 8192,
            7424: 268443656,
            7680: 270540800,
            7936: 2097160,
            4224: 8,
            4480: 2105344,
            4736: 2097152,
            4992: 268435464,
            5248: 268443648,
            5504: 8200,
            5760: 270540808,
            6016: 270532608,
            6272: 270540800,
            6528: 270532616,
            6784: 8192,
            7040: 2105352,
            7296: 2097160,
            7552: 0,
            7808: 268435456,
            8064: 268443656
        }, {
            0: 1048576,
            16: 33555457,
            32: 1024,
            48: 1049601,
            64: 34604033,
            80: 0,
            96: 1,
            112: 34603009,
            128: 33555456,
            144: 1048577,
            160: 33554433,
            176: 34604032,
            192: 34603008,
            208: 1025,
            224: 1049600,
            240: 33554432,
            8: 34603009,
            24: 0,
            40: 33555457,
            56: 34604032,
            72: 1048576,
            88: 33554433,
            104: 33554432,
            120: 1025,
            136: 1049601,
            152: 33555456,
            168: 34603008,
            184: 1048577,
            200: 1024,
            216: 34604033,
            232: 1,
            248: 1049600,
            256: 33554432,
            272: 1048576,
            288: 33555457,
            304: 34603009,
            320: 1048577,
            336: 33555456,
            352: 34604032,
            368: 1049601,
            384: 1025,
            400: 34604033,
            416: 1049600,
            432: 1,
            448: 0,
            464: 34603008,
            480: 33554433,
            496: 1024,
            264: 1049600,
            280: 33555457,
            296: 34603009,
            312: 1,
            328: 33554432,
            344: 1048576,
            360: 1025,
            376: 34604032,
            392: 33554433,
            408: 34603008,
            424: 0,
            440: 34604033,
            456: 1049601,
            472: 1024,
            488: 33555456,
            504: 1048577
        }, {
            0: 134219808,
            1: 131072,
            2: 134217728,
            3: 32,
            4: 131104,
            5: 134350880,
            6: 134350848,
            7: 2048,
            8: 134348800,
            9: 134219776,
            10: 133120,
            11: 134348832,
            12: 2080,
            13: 0,
            14: 134217760,
            15: 133152,
            2147483648: 2048,
            2147483649: 134350880,
            2147483650: 134219808,
            2147483651: 134217728,
            2147483652: 134348800,
            2147483653: 133120,
            2147483654: 133152,
            2147483655: 32,
            2147483656: 134217760,
            2147483657: 2080,
            2147483658: 131104,
            2147483659: 134350848,
            2147483660: 0,
            2147483661: 134348832,
            2147483662: 134219776,
            2147483663: 131072,
            16: 133152,
            17: 134350848,
            18: 32,
            19: 2048,
            20: 134219776,
            21: 134217760,
            22: 134348832,
            23: 131072,
            24: 0,
            25: 131104,
            26: 134348800,
            27: 134219808,
            28: 134350880,
            29: 133120,
            30: 2080,
            31: 134217728,
            2147483664: 131072,
            2147483665: 2048,
            2147483666: 134348832,
            2147483667: 133152,
            2147483668: 32,
            2147483669: 134348800,
            2147483670: 134217728,
            2147483671: 134219808,
            2147483672: 134350880,
            2147483673: 134217760,
            2147483674: 134219776,
            2147483675: 0,
            2147483676: 133120,
            2147483677: 2080,
            2147483678: 131104,
            2147483679: 134350848
        }],
        h = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679],
        u = o.DES = i.extend({
            _doReset: function () {
                    for (var e = this._key.words, t = [], r = 0; 56 > r; r++) {
                        var i = a[r] - 1;
                        t[r] = e[i >>> 5] >>> 31 - i % 32 & 1
                    }
                    e = this._subKeys = [];
                    for (i = 0; 16 > i; i++) {
                        for (var n = e[i] = [], o = c[i], r = 0; 24 > r; r++)
                            n[r / 6 | 0] |= t[(s[r] - 1 + o) % 28] << 31 - r % 6,
                            n[4 + (r / 6 | 0)] |= t[28 + (s[r + 24] - 1 + o) % 28] << 31 - r % 6;
                        n[0] = n[0] << 1 | n[0] >>> 31;
                        for (r = 1; 7 > r; r++)
                            n[r] >>>= 4 * (r - 1) + 3;
                        n[7] = n[7] << 5 | n[7] >>> 27
                    }
                    t = this._invSubKeys = [];
                    for (r = 0; 16 > r; r++)
                        t[r] = e[15 - r]
                },
                encryptBlock: function (e, t) {
                    this._doCryptBlock(e, t, this._subKeys)
                },
                decryptBlock: function (e, t) {
                    this._doCryptBlock(e, t, this._invSubKeys)
                },
                _doCryptBlock: function (r, i, n) {
                    this._lBlock = r[i];
                    this._rBlock = r[i + 1];
                    e.call(this, 4, 252645135);
                    e.call(this, 16, 65535);
                    t.call(this, 2, 858993459);
                    t.call(this, 8, 16711935);
                    e.call(this, 1, 1431655765);
                    for (var o = 0; 16 > o; o++) {
                        for (var a = n[o], s = this._lBlock, c = this._rBlock, u = 0, f = 0; 8 > f; f++)
                            u |= l[f][((c ^ a[f]) & h[f]) >>> 0];
                        this._lBlock = c;
                        this._rBlock = s ^ u
                    }
                    n = this._lBlock;
                    this._lBlock = this._rBlock;
                    this._rBlock = n;
                    e.call(this, 1, 1431655765);
                    t.call(this, 8, 16711935);
                    t.call(this, 2, 858993459);
                    e.call(this, 16, 65535);
                    e.call(this, 4, 252645135);
                    r[i] = this._lBlock;
                    r[i + 1] = this._rBlock
                },
                keySize: 2,
            ivSize: 2,
            blockSize: 2
        });
    r.DES = i._createHelper(u);
    o = o.TripleDES = i.extend({
        _doReset: function () {
                var e = this._key.words;
                this._des1 = u.createEncryptor(n.create(e.slice(0, 2)));
                this._des2 = u.createEncryptor(n.create(e.slice(2, 4)));
                this._des3 = u.createEncryptor(n.create(e.slice(4, 6)))
            },
            encryptBlock: function (e, t) {
                this._des1.encryptBlock(e, t);
                this._des2.decryptBlock(e, t);
                this._des3.encryptBlock(e, t)
            },
            decryptBlock: function (e, t) {
                this._des3.decryptBlock(e, t);
                this._des2.encryptBlock(e, t);
                this._des1.decryptBlock(e, t)
            },
            keySize: 6,
        ivSize: 2,
        blockSize: 2
    });
    r.TripleDES = i._createHelper(o)
})();
(function () {
    for (var e = coypJsDk, t = e.lib.BlockCipher, r = e.algo, i = [], n = [], o = [], a = [], s = [], c = [], l = [], h = [], u = [], f = [], p = [], d = 0; 256 > d; d++)
        p[d] = 128 > d ? d << 1 : d << 1 ^ 283;
    for (var y = 0, g = 0, d = 0; 256 > d; d++) {
        var v = g ^ g << 1 ^ g << 2 ^ g << 3 ^ g << 4,
            v = v >>> 8 ^ v & 255 ^ 99;
        i[y] = v;
        n[v] = y;
        var _ = p[y],
            m = p[_],
            k = p[m],
            w = 257 * p[v] ^ 16843008 * v;
        o[y] = w << 24 | w >>> 8;
        a[y] = w << 16 | w >>> 16;
        s[y] = w << 8 | w >>> 24;
        c[y] = w;
        w = 16843009 * k ^ 65537 * m ^ 257 * _ ^ 16843008 * y;
        l[v] = w << 24 | w >>> 8;
        h[v] = w << 16 | w >>> 16;
        u[v] = w << 8 | w >>> 24;
        f[v] = w;
        y ? (y = _ ^ p[p[p[k ^ _]]],
            g ^= p[p[g]]) : y = g = 1
    }
    var S = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
        r = r.DES = t.extend({
            _doReset: function () {
                    for (var e = this._key, t = e.words, r = e.sigBytes / 4, e = 4 * ((this._nRounds = r + 6) + 1), n = this._keySchedule = [], o = 0; o < e; o++)
                        if (o < r)
                            n[o] = t[o];
                        else {
                            var a = n[o - 1];
                            o % r ? 6 < r && 4 == o % r && (a = i[a >>> 24] << 24 | i[a >>> 16 & 255] << 16 | i[a >>> 8 & 255] << 8 | i[a & 255]) : (a = a << 8 | a >>> 24,
                                a = i[a >>> 24] << 24 | i[a >>> 16 & 255] << 16 | i[a >>> 8 & 255] << 8 | i[a & 255],
                                a ^= S[o / r | 0] << 24);
                            n[o] = n[o - r] ^ a
                        }
                    t = this._invKeySchedule = [];
                    for (r = 0; r < e; r++)
                        o = e - r,
                        a = r % 4 ? n[o] : n[o - 4],
                        t[r] = 4 > r || 4 >= o ? a : l[i[a >>> 24]] ^ h[i[a >>> 16 & 255]] ^ u[i[a >>> 8 & 255]] ^ f[i[a & 255]]
                },
                encryptBlock: function (e, t) {
                    this._doCryptBlock(e, t, this._keySchedule, o, a, s, c, i)
                },
                decryptBlock: function (e, t) {
                    var r = e[t + 1];
                    e[t + 1] = e[t + 3];
                    e[t + 3] = r;
                    this._doCryptBlock(e, t, this._invKeySchedule, l, h, u, f, n);
                    r = e[t + 1];
                    e[t + 1] = e[t + 3];
                    e[t + 3] = r
                },
                _doCryptBlock: function (e, t, r, i, n, o, a, s) {
                    for (var c = this._nRounds, l = e[t] ^ r[0], h = e[t + 1] ^ r[1], u = e[t + 2] ^ r[2], f = e[t + 3] ^ r[3], p = 4, d = 1; d < c; d++)
                        var y = i[l >>> 24] ^ n[h >>> 16 & 255] ^ o[u >>> 8 & 255] ^ a[f & 255] ^ r[p++],
                            g = i[h >>> 24] ^ n[u >>> 16 & 255] ^ o[f >>> 8 & 255] ^ a[l & 255] ^ r[p++],
                            v = i[u >>> 24] ^ n[f >>> 16 & 255] ^ o[l >>> 8 & 255] ^ a[h & 255] ^ r[p++],
                            f = i[f >>> 24] ^ n[l >>> 16 & 255] ^ o[h >>> 8 & 255] ^ a[u & 255] ^ r[p++],
                            l = y,
                            h = g,
                            u = v;
                    y = (s[l >>> 24] << 24 | s[h >>> 16 & 255] << 16 | s[u >>> 8 & 255] << 8 | s[f & 255]) ^ r[p++];
                    g = (s[h >>> 24] << 24 | s[u >>> 16 & 255] << 16 | s[f >>> 8 & 255] << 8 | s[l & 255]) ^ r[p++];
                    v = (s[u >>> 24] << 24 | s[f >>> 16 & 255] << 16 | s[l >>> 8 & 255] << 8 | s[h & 255]) ^ r[p++];
                    f = (s[f >>> 24] << 24 | s[l >>> 16 & 255] << 16 | s[h >>> 8 & 255] << 8 | s[u & 255]) ^ r[p++];
                    e[t] = y;
                    e[t + 1] = g;
                    e[t + 2] = v;
                    e[t + 3] = f
                },
                keySize: 8
        });
    e.DES = t._createHelper(r)
})();
coypJsDk.mode.CBC = function () {
    var e = coypJsDk.lib.BlockCipherMode.extend();
    e.Encryptor = e.extend({
        processBlock: function (e, t) {
            this._cipher.encryptBlock(e, t)
        }
    });
    e.Decryptor = e.extend({
        processBlock: function (e, t) {
            this._cipher.decryptBlock(e, t)
        }
    });
    return e
}();
var referFingerprint = function (e) {
    var t, r;
    t = Array.prototype.forEach;
    r = Array.prototype.map;
    this.each = function (e, r, i) {
        if (e === null) {
            return
        }
        if (t && e.forEach === t) {
            e.forEach(r, i)
        } else if (e.length === +e.length) {
            for (var n = 0, o = e.length; n < o; n++) {
                if (r.call(i, e[n], n, e) === {})
                    return
            }
        } else {
            for (var a in e) {
                if (e.hasOwnProperty(a)) {
                    if (r.call(i, e[a], a, e) === {})
                        return
                }
            }
        }
    };
    this.map = function (e, t, i) {
        var n = [];
        if (e == null)
            return n;
        if (r && e.map === r)
            return e.map(t, i);
        this.each(e, function (e, r, o) {
            n[n.length] = t.call(i, e, r, o)
        });
        return n
    };
    if (typeof e == "object") {
        this.hasher = e.hasher;
        this.screen_resolution = e.screen_resolution;
        this.canvas = e.canvas;
        this.ie_activex = e.ie_activex
    } else if (typeof e == "function") {
        this.hasher = e
    }
};
referFingerprint.prototype = {
    get: function () {
            var e = [];
            e.push(navigator.userAgent);
            e.push(navigator.language);
            e.push(24); // screen.colorDepth
            if (this.screen_resolution) {
                var t = this.getScreenResolution();
                if (typeof t !== "undefined") {
                    e.push(this.getScreenResolution().join("x"))
                }
            }
            e.push((new Date).getTimezoneOffset());
            e.push(this.hasSessionStorage());
            e.push(this.hasLocalStorage());
            e.push(!!window.indexedDB);
            /*        if (document.body) {
            e.push(typeof document.body.addBehavior)
        } else {
            e.push(typeof undefined)
        }*/
            e.push(typeof window.openDatabase);
            e.push(navigator.cpuClass);
            e.push(navigator.platform);
            e.push(navigator.doNotTrack);
            e.push(this.getPluginsString());
            if (this.canvas && this.isCanvasSupported()) {
                e.push(this.getCanvasFingerprint())
            }
            if (this.hasher) {
                return this.hasher(e.join("###"), 31)
            } else {
                return this.murmurhash3_32_gc(e.join("###"), 31)
            }
        },
        murmurhash3_32_gc: function (e, t) {
            var r, i, n, o, a, s, c, l;
            r = e.length & 3;
            i = e.length - r;
            n = t;
            a = 3432918353;
            s = 461845907;
            l = 0;
            while (l < i) {
                c = e.charCodeAt(l) & 255 | (e.charCodeAt(++l) & 255) << 8 | (e.charCodeAt(++l) & 255) << 16 | (e.charCodeAt(++l) & 255) << 24;
                ++l;
                c = (c & 65535) * a + (((c >>> 16) * a & 65535) << 16) & 4294967295;
                c = c << 15 | c >>> 17;
                c = (c & 65535) * s + (((c >>> 16) * s & 65535) << 16) & 4294967295;
                n ^= c;
                n = n << 13 | n >>> 19;
                o = (n & 65535) * 5 + (((n >>> 16) * 5 & 65535) << 16) & 4294967295;
                n = (o & 65535) + 27492 + (((o >>> 16) + 58964 & 65535) << 16)
            }
            c = 0;
            switch (r) {
            case 3:
                c ^= (e.charCodeAt(l + 2) & 255) << 16;
            case 2:
                c ^= (e.charCodeAt(l + 1) & 255) << 8;
            case 1:
                c ^= e.charCodeAt(l) & 255;
                c = (c & 65535) * a + (((c >>> 16) * a & 65535) << 16) & 4294967295;
                c = c << 15 | c >>> 17;
                c = (c & 65535) * s + (((c >>> 16) * s & 65535) << 16) & 4294967295;
                n ^= c
            }
            n ^= e.length;
            n ^= n >>> 16;
            n = (n & 65535) * 2246822507 + (((n >>> 16) * 2246822507 & 65535) << 16) & 4294967295;
            n ^= n >>> 13;
            n = (n & 65535) * 3266489909 + (((n >>> 16) * 3266489909 & 65535) << 16) & 4294967295;
            n ^= n >>> 16;
            return n >>> 0
        },
        hasLocalStorage: function () {
            try {
                return !!window.localStorage
            } catch (e) {
                return true
            }
        },
        hasSessionStorage: function () {
            try {
                return !!window.sessionStorage
            } catch (e) {
                return true
            }
        },
        isCanvasSupported: function () {
            var e = document.createElement("canvas");
            return !!(e.getContext && e.getContext("2d"))
        },
        isIE: function () {
            if (navigator.appName === "Microsoft Internet Explorer") {
                return true
            } else if (navigator.appName === "Netscape" && /Trident/.test(navigator.userAgent)) {
                return true
            }
            return false
        },
        getPluginsString: function () {
            if (this.isIE() && this.ie_activex) {
                return this.getIEPluginsString()
            } else {
                return this.getRegularPluginsString()
            }
        },
        getRegularPluginsString: function () {
            return this.map(navigator.plugins, function (e) {
                var t = this.map(e, function (e) {
                    return [e.type, e.suffixes].join("~")
                }).join(",");
                return [e.name, e.description, t].join("::")
            }, this).join(";")
        },
        getIEPluginsString: function () {
            if (window.ActiveXObject) {
                var e = ["ShockwaveFlash.ShockwaveFlash", "AcroPDF.PDF", "PDF.PdfCtrl", "QuickTime.QuickTime", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "RealPlayer", "SWCtl.SWCtl", "WMPlayer.OCX", "AgControl.AgControl", "Skype.Detection"];
                return this.map(e, function (e) {
                    try {
                        new ActiveXObject(e);
                        return e
                    } catch (t) {
                        return null
                    }
                }).join(";")
            } else {
                return ""
            }
        },
        getScreenResolution: function () {
            return [screen.height, screen.width]
        },
        getCanvasFingerprint: function () {
            var e = document.createElement("canvas");
            var t = e.getContext("2d");
            var r = "http://valve.github.io";
            t.textBaseline = "top";
            t.font = "14px 'Arial'";
            t.textBaseline = "alphabetic";
            t.fillStyle = "#f60";
            t.fillRect(125, 1, 62, 20);
            t.fillStyle = "#069";
            t.fillText(r, 2, 15);
            t.fillStyle = "rgba(102, 204, 0, 0.7)";
            t.fillText(r, 4, 17);
            return e.toDataURL()
        }
};
window.mcArrs = [];
var m = "000215455";
window.mcArrps = [];

function keypress(e) {
    var t = 0,
        r = 0,
        e = e || event;
    t = e.keyCode || e.which || e.charCode;
    r = t >= 65 && t <= 90;
    z = t >= 97 && t <= 122;
    mcArrps.push(t)
}

function keydown(e) {
        var e = e || event;
        var t = e.keyCode || e.which || e.charCode;
        var r = t;
        if (t > 7 && t < 14 || t == 20 || t == 91 || t == 16 || t == 17 || t == 222 || t > 31 && t < 47 || t > 111 && t < 124) {
            if (e.ctrlKey && t != 17) {
                r = "CTRL+" + r
            } else if (e.altKey && t != 18) {
                r = "ALT+" + r
            } else if (e.shiftKey && t != 16) {
                r = "SHIFT+" + r
            } else if (e.ctrlKey && t != 17 && e.altKey && t != 18) {
                r = "CTRL+ALT+" + r
            } else if (e.ctrlKey && t != 17 && e.altKey && t != 18 && e.shiftKey && t != 16) {
                r = "CTRL+ALT+SHIFT+" + r
            } else if (e.altKey && t != 18 && e.shiftKey && t != 16) {
                r = "ALT+SHIFT+" + r
            } else if (e.altKey && t != 17 && e.shiftKey && t != 16) {
                r = "CTRL+SHIFT+" + r
            }
            if (r != "") {
                mcArrps.push(r)
            }
        } else {
            if (window.ActiveXObject && navigator.appVersion.indexOf("Windows") != -1) {
                r = t;
                if (e.ctrlKey && t != 17) {
                    r = "CTRL+" + r
                } else if (e.altKey && t != 18) {
                    r = "ALT+" + r
                } else if (e.shiftKey && t != 16) {
                    r = "SHIFT+" + r
                } else if (e.ctrlKey && t != 17 && e.altKey && t != 18) {
                    r = "CTRL+ALT+" + r
                } else if (e.ctrlKey && t != 17 && e.altKey && t != 18 && e.shiftKey && t != 16) {
                    r = "CTRL+ALT+SHIFT+" + r
                } else if (e.altKey && t != 18 && e.shiftKey && t != 16) {
                    r = "ALT+SHIFT+" + r
                } else if (e.altKey && t != 17 && e.shiftKey && t != 16) {
                    r = "CTRL+SHIFT+" + r
                }
                if (r != "") {
                    mcArrps.push(r)
                }
            } else {
                if (e.ctrlKey && t != 17) {
                    r = "CTRL+" + r;
                    mcArrps.push(r)
                } else if (e.altKey && t != 18) {
                    r = "ALT+" + r;
                    mcArrps.push(r)
                } else if (e.shiftKey && t != 16) {
                    r = "SHIFT+" + r;
                    mcArrps.push(r)
                } else if (e.ctrlKey && t != 17 && e.altKey && t != 18) {
                    r = "CTRL+ALT+" + r;
                    mcArrps.push(r)
                } else if (e.ctrlKey && t != 17 && e.altKey && t != 18 && e.shiftKey && t != 16) {
                    r = "CTRL+ALT+SHIFT+" + r;
                    mcArrps.push(r)
                } else if (e.altKey && t != 18 && e.shiftKey && t != 16) {
                    r = "ALT+SHIFT+" + r;
                    mcArrps.push(r)
                } else if (e.altKey && t != 17 && e.shiftKey && t != 16) {
                    r = "CTRL+SHIFT+" + r;
                    mcArrps.push(r)
                }
            }
        }
    }
    /*document.onkeypress = keypress;
document.onkeydown = keydown;*/
var mc = function () {
    jQuery && jQuery.mouseCollection.record(function (e) {
        var t = JSON.stringify(e.currentPoint);
        if (mcArrs.length < 5) {
            mcArrs.push(t)
        } else {
            mcArrs.shift();
            mcArrs.push(t)
        }
    })
};
var born = function () {};
var _maq = _maq || [];
_maq.push(["_setAccount", "AIRJDWEBBJ"]);
_maq.push(["_setHnaUserId", ""]);
/*(function() {
    var e = document.createElement("script");
    e.type = "text/javascript";
    e.async = true;
    e.src = getScriptPaths() + "eking_analysis.min.js";
    e.onload = e.onreadystatechange = function() {
        if (!e.readyState || /loaded|complete/.test(e.readyState)) {
            e.onload = e.onreadystatechange = null;
            mc && mc()
        }
    }
    ;
    try {
        var t = document.getElementsByTagName("script")[0];
        t.parentNode.insertBefore(e, t)
    } catch (e) {}
}
)();*/
function getScriptPaths() {
    m = "52D2841A3485DFFBCF2EA6A0515077CD";
    var e = document.scripts;
    e = e[e.length - 1].src.substring(0, e[e.length - 1].src.lastIndexOf("/") + 1);
    return e
}
var broClient = {
    clientUserAgent: function () {
            return window.navigator.userAgent
        },
        screenXY: function () {
            return screen.width + "x " + screen.height + "y"
        },
        officeXY: function () {
            return window.screen.availWidth + "x " + window.screen.availHeight + "y"
        },
        coloriDepth: function (e) {
            var t = e;
            var r = "";
            if (t) {
                try {
                    r = screen.colorDepth
                } catch (e) {}
            } else {
                r = screen.pixelDepth
            }
            return r
        }
};

function getBroClient() {
    var e = new referFingerprint({
        canvas: true
    });
    var t = parseInt((new Date).getTime() / 1e3);
    var r = {};
    if (document) {
        r.dc_domain = document.domain || "";
        r.dc_url = document.URL || "";
        r.dc_title = document.title || "";
        r.dc_referrer = document.referrer || "";
        r.dc_cookies = document.cookie || "";
        r.dc_websign = e.get() || "";
        r.dc_arrtime = t || "";
        r.dc_officeXY = window.screen.availWidth + "x " + window.screen.availHeight + "y" || "";
        r.dc_coloriDepth = broClient.coloriDepth(window.navigator) || ""
    }
    if (window && window.screen) {
        r.sh = window.screen.height || 0;
        r.sw = window.screen.width || 0;
        r.cd = window.screen.colorDepth || 0
    }
    if (navigator) {
        r.na_appcodename = navigator.appCodeName || "";
        r.na_minor = navigator.appMinorVersion || "";
        r.na_appname = navigator.appName || "";
        r.na_appversion = navigator.appVersion || "";
        r.na_bl = navigator.browserLanguage || "";
        r.na_cookiesEnable = navigator.cookieEnabled || "";
        r.na_cpuclass = navigator.cpuClass || "";
        r.na_online = navigator.onLine || "";
        r.na_platform = navigator.platform || "";
        r.na_syslan = navigator.systemLanguage || "";
        r.na_useragent = navigator.userAgent || "";
        r.na_userlang = navigator.userLanguage || ""
    }
    return r
}

function broWidgetIe(e) {
    var t = [];
    for (var r = 0; r < e.length; r++) {
        try {
            widget = new ActiveXObject(e[r])
        } catch (i) {
            continue
        }
        t.push(e[r])
    }
    return t
}
var broWidgetNew = {
    params: function () {
        var e = [];
        if (window.ActiveXObject) {
            var t = ["ShockwaveFlash.ShockwaveFlash", "AcroPDF.PDF", "PDF.PdfCtrl", "QuickTime.QuickTime", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "RealPlayer", "SWCtl.SWCtl", "WMPlayer.OCX", "AgControl.AgControl", "Skype.Detection"];
            e = broWidgetIe(t)
        } else {
            version = navigator.plugins;
            for (var r = 0; r < version.length; r++) {
                e.push(escape(version[r].name))
            }
        }
        return e
    }
};

function getBroWidgetInfo() {
    var e = {
        ShockwaveFlash: broWidget.shockwaveFlash(),
        ReadPlayer: broWidget.readPlayer(),
        AdobeReader: broWidget.adobeReader(),
        QuickTimePlayer: broWidget.quickTimePlayer(),
        ShockwavePlayer: broWidget.shockwavePlayer(),
        WindowsMediaPlayer: broWidget.windowsMediaPlayer()
    };
    return e
}

function getShockwaveFlash() {
    var e = false;
    var t = null;
    if (window.ActiveXObject) {
        var r = null;
        try {
            r = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")
        } catch (i) {
            return
        }
        if (r) {
            e = true;
            t = r.GetVariable("$version").substring(4);
            t = t.split(",");
            t = parseFloat(t[0] + "." + t[1])
        }
    } else {
        t = navigator.plugins["Shockwave Flash"]
    }
    if (t != null || t != undefined) {
        t = 1
    } else
        t = 0;
    return t
}

function getReadPlayer() {
    var e = false;
    var t = null;
    if (window.ActiveXObject) {
        var r = ["rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "RealPlayer"];
        var i = null;
        for (var n = 0; n < r.length; n++) {
            try {
                i = new ActiveXObject(r[n])
            } catch (o) {
                continue
            }
            if (i) {
                break
            }
        }
        if (i) {
            e = true;
            t = i.GetVersionInfo();
            t = parseFloat(t)
        }
    } else {
        t = navigator.plugins["RealPlayer"] == undefined ? navigator.plugins["RealPlayer"] : navigator.plugins["RealPlayer"]
    }
    if (t != null || t != undefined) {
        t = 1
    } else
        t = 0;
    return t
}

function getQuickTimePlayer() {
    var e = false;
    var t = null;
    if (window.ActiveXObject) {
        var r = null;
        try {
            r = new ActiveXObject("QuickTime.QuickTime")
        } catch (i) {}
        if (r) {
            e = true
        }
        try {
            r = new ActiveXObject("QuickTimeCheckObject.QuickTimeCheck")
        } catch (i) {
            return
        }
        if (r) {
            e = true;
            t = r.QuickTimeVersion.toString(16);
            t = t.substring(0, 1) + "." + t.substring(1, 3);
            t = parseFloat(t)
        }
    } else {
        t = navigator.plugins["Adobe QuickTime"]
    }
    if (t != null || t != undefined) {
        t = 1
    } else
        t = 0;
    return t
}

function getClientUserAgent() {
    return window.navigator.userAgent
}

function getScreenXY() {
    return screen.width + "x " + screen.height + "y"
}

function getOfficeXY() {
    return window.screen.availWidth + "x " + window.screen.availHeight + "y"
}
born.prototype = {
    getCiphertext: function () {
        return getParams()
    }
};

function coloriDepth(e) {
    var t = e;
    var r;
    if (t != "Netscape") {
        r = screen.colorDepth
    } else {
        r = screen.pixelDepth
    }
    return r
}

function del_html_tags(e, t, r) {
    var i = new RegExp(t, "g");
    words = e.replace(i, r);
    return words
}

function getParams() {
    var e = {
        xy: mcArrs,
        fingerprint: (new referFingerprint).get()
    };
    mcArrs = [];
    var t = JSON.stringify(e);
    // 该值是在断点调试的时候复制过来的
    var m = "52D2841A3485DFFBCF2EA6A0515077CD";
    var r = eq_u(t, m);
    return del_html_tags(r, "\\+", "%2B")
}

function eq_u(e, t) {
    var r = coypJsDk.enc.Utf8.parse(t);
    var i = coypJsDk.DES.encrypt(e, r, {
        mode: coypJsDk.mode.CBC,
        padding: coypJsDk.pad.Nopk
    });
    return i.toString()
}
this.upMap_ = function (e, t, r) {
    var i = [];
    if (e == null)
        return i;
    if (nativeMap && e.map === nativeMap)
        return e.map(t, r);
    this.each(e, function (e, n, o) {
        i[i.length] = t.call(r, e, n, o)
    });
    return i
};