/*
    @破解目标: https://www.aqistudy.cn 就是这个页面(首页) 选择城市 会出现不同的数据 注意: 响应是感觉乱码的样子
    @破解时间: 2019年8月17日11:24:19
    @破解参数: 在得到不同城市数据的过程中 有个POST请求 该请求有个表单数据是d 破解d参数
    @破解提示:
        1. XHR抓包 针对POST的请求 一定要XHR调试 否则很难找到加密的具体位置
        2. 断点断下来以后 追寻堆栈 找到d对应的数据 可以看到关键的地方 例如: getParam
        3. 断点调试 不断找到加密的位置
        4. 抠出相关代码 注意: 有的地方在调试的时候会出错 经过多次断点发现其实加密不需要这些代码(注意抠代码的尺度)
        5. 添加 JSON2  对象 不添加也可以 直接转成字符串也行
        6. 打码调试成功以后 响应是乱码的样子 其实不是的 其实是可以被JS的函数decodeData解析出来的！！
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

/********************************/
var CryptoJS = CryptoJS || function (h, r) {
    var k = {},
        l = k.lib = {},
        n = function () {},
        f = l.Base = {
            extend: function (a) {
                    n.prototype = this;
                    var b = new n;
                    a && b.mixIn(a);
                    b.hasOwnProperty("init") || (b.init = function () {
                        b.s.init.apply(this, arguments)
                    });
                    b.init.prototype = b;
                    b.s = this;
                    return b
                },
                create: function () {
                    var a = this.extend();
                    a.init.apply(a, arguments);
                    return a
                },
                init: function () {},
                mixIn: function (a) {
                    for (var b in a)
                        a.hasOwnProperty(b) && (this[b] = a[b]);
                    a.hasOwnProperty("toString") && (this.toString = a.toString)
                },
                clone: function () {
                    return this.init.prototype.extend(this)
                }
        },
        j = l.WordArray = f.extend({
            init: function (a, b) {
                    a = this.words = a || [];
                    this.sigBytes = b != r ? b : 4 * a.length
                },
                toString: function (a) {
                    return (a || s).stringify(this)
                },
                concat: function (a) {
                    var b = this.words,
                        d = a.words,
                        c = this.sigBytes;
                    a = a.sigBytes;
                    this.clamp();
                    if (c % 4)
                        for (var e = 0; e < a; e++)
                            b[c + e >>> 2] |= (d[e >>> 2] >>> 24 - 8 * (e % 4) & 255) << 24 - 8 * ((c + e) % 4);
                    else if (65535 < d.length)
                        for (e = 0; e < a; e += 4)
                            b[c + e >>> 2] = d[e >>> 2];
                    else
                        b.push.apply(b, d);
                    this.sigBytes += a;
                    return this
                },
                clamp: function () {
                    var a = this.words,
                        b = this.sigBytes;
                    a[b >>> 2] &= 4294967295 << 32 - 8 * (b % 4);
                    a.length = h.ceil(b / 4)
                },
                clone: function () {
                    var a = f.clone.call(this);
                    a.words = this.words.slice(0);
                    return a
                },
                random: function (a) {
                    for (var b = [], d = 0; d < a; d += 4)
                        b.push(4294967296 * h.random() | 0);
                    return new j.init(b, a)
                }
        }),
        m = k.enc = {},
        s = m.Hex = {
            stringify: function (a) {
                    var b = a.words;
                    a = a.sigBytes;
                    for (var d = [], c = 0; c < a; c++) {
                        var e = b[c >>> 2] >>> 24 - 8 * (c % 4) & 255;
                        d.push((e >>> 4).toString(16));
                        d.push((e & 15).toString(16))
                    }
                    return d.join("")
                },
                parse: function (a) {
                    for (var b = a.length, d = [], c = 0; c < b; c += 2)
                        d[c >>> 3] |= parseInt(a.substr(c, 2), 16) << 24 - 4 * (c % 8);
                    return new j.init(d, b / 2)
                }
        },
        p = m.Latin1 = {
            stringify: function (a) {
                    var b = a.words;
                    a = a.sigBytes;
                    for (var d = [], c = 0; c < a; c++)
                        d.push(String.fromCharCode(b[c >>> 2] >>> 24 - 8 * (c % 4) & 255));
                    return d.join("")
                },
                parse: function (a) {
                    for (var b = a.length, d = [], c = 0; c < b; c++)
                        d[c >>> 2] |= (a.charCodeAt(c) & 255) << 24 - 8 * (c % 4);
                    return new j.init(d, b)
                }
        },
        t = m.Utf8 = {
            stringify: function (a) {
                    try {
                        return decodeURIComponent(escape(p.stringify(a)))
                    } catch (b) {
                        throw Error("Malformed UTF-8 data")
                    }
                },
                parse: function (a) {
                    return p.parse(unescape(encodeURIComponent(a)))
                }
        },
        q = l.BufferedBlockAlgorithm = f.extend({
            reset: function () {
                    this._3 = new j.init;
                    this._19 = 0
                },
                _11: function (a) {
                    "string" == typeof a && (a = t.parse(a));
                    this._3.concat(a);
                    this._19 += a.sigBytes
                },
                _4: function (a) {
                    var b = this._3,
                        d = b.words,
                        c = b.sigBytes,
                        e = this.blockSize,
                        f = c / (4 * e),
                        f = a ? h.ceil(f) : h.max((f | 0) - this._20, 0);
                    a = f * e;
                    c = h.min(4 * a, c);
                    if (a) {
                        for (var g = 0; g < a; g += e)
                            this._23(d, g);
                        g = d.splice(0, a);
                        b.sigBytes -= c
                    }
                    return new j.init(g, c)
                },
                clone: function () {
                    var a = f.clone.call(this);
                    a._3 = this._3.clone();
                    return a
                },
                _20: 0
        });
    l.Hasher = q.extend({
        cfg: f.extend(),
        init: function (a) {
                this.cfg = this.cfg.extend(a);
                this.reset()
            },
            reset: function () {
                q.reset.call(this);
                this._7()
            },
            update: function (a) {
                this._11(a);
                this._4();
                return this
            },
            finalize: function (a) {
                a && this._11(a);
                return this._10()
            },
            blockSize: 16,
        _5: function (a) {
                return function (b, d) {
                    return (new a.init(d)).finalize(b)
                }
            },
            _30: function (a) {
                return function (b, d) {
                    return (new u.HMAC.init(a, d)).finalize(b)
                }
            }
    });
    var u = k.algo = {};
    return k
}(Math);
(function () {
    var h = CryptoJS,
        j = h.lib.WordArray;
    h.enc.Base64 = {
        stringify: function (b) {
                var e = b.words,
                    f = b.sigBytes,
                    c = this._17;
                b.clamp();
                b = [];
                for (var a = 0; a < f; a += 3)
                    for (var d = (e[a >>> 2] >>> 24 - 8 * (a % 4) & 255) << 16 | (e[a + 1 >>> 2] >>> 24 - 8 * ((a + 1) % 4) & 255) << 8 | e[a + 2 >>> 2] >>> 24 - 8 * ((a + 2) % 4) & 255, g = 0; 4 > g && a + 0.75 * g < f; g++)
                        b.push(c.charAt(d >>> 6 * (3 - g) & 63));
                if (e = c.charAt(64))
                    for (; b.length % 4;)
                        b.push(e);
                return b.join("")
            },
            parse: function (b) {
                var e = b.length,
                    f = this._17,
                    c = f.charAt(64);
                c && (c = b.indexOf(c), -1 != c && (e = c));
                for (var c = [], a = 0, d = 0; d < e; d++)
                    if (d % 4) {
                        var g = f.indexOf(b.charAt(d - 1)) << 2 * (d % 4),
                            h = f.indexOf(b.charAt(d)) >>> 6 - 2 * (d % 4);
                        c[a >>> 2] |= (g | h) << 24 - 8 * (a % 4);
                        a++
                    }
                return j.create(c, a)
            },
            _17: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    }
})();
CryptoJS.lib.Cipher || function (u) {
    var g = CryptoJS,
        f = g.lib,
        k = f.Base,
        l = f.WordArray,
        q = f.BufferedBlockAlgorithm,
        r = g.enc.Base64,
        v = g.algo.EvpKDF,
        n = f.Cipher = q.extend({
            cfg: k.extend(),
            createEncryptor: function (a, b) {
                    return this.create(this._12, a, b)
                },
                createDecryptor: function (a, b) {
                    return this.create(this._33, a, b)
                },
                init: function (a, b, c) {
                    this.cfg = this.cfg.extend(c);
                    this._16 = a;
                    this._13 = b;
                    this.reset()
                },
                reset: function () {
                    q.reset.call(this);
                    this._7()
                },
                process: function (a) {
                    this._11(a);
                    return this._4()
                },
                finalize: function (a) {
                    a && this._11(a);
                    return this._10()
                },
                keySize: 4,
            ivSize: 4,
            _12: 1,
            _33: 2,
            _5: function (a) {
                return {
                    encrypt: function (b, c, d) {
                            return ("string" == typeof c ? s : j).encrypt(a, b, c, d)
                        },
                        decrypt: function (b, c, d) {
                            return ("string" == typeof c ? s : j).decrypt(a, b, c, d)
                        }
                }
            }
        });
    f.StreamCipher = n.extend({
        _10: function () {
                return this._4(!0)
            },
            blockSize: 1
    });
    var m = g.mode = {},
        t = function (a, b, c) {
            var d = this._18;
            d ? this._18 = u : d = this._14;
            for (var e = 0; e < c; e++)
                a[b + e] ^= d[e]
        },
        h = (f.BlockCipherMode = k.extend({
            createEncryptor: function (a, b) {
                    return this.Encryptor.create(a, b)
                },
                createDecryptor: function (a, b) {
                    return this.Decryptor.create(a, b)
                },
                init: function (a, b) {
                    this._8 = a;
                    this._18 = b
                }
        })).extend();
    h.Encryptor = h.extend({
        processBlock: function (a, b) {
            var c = this._8,
                d = c.blockSize;
            t.call(this, a, b, d);
            c.encryptBlock(a, b);
            this._14 = a.slice(b, b + d)
        }
    });
    h.Decryptor = h.extend({
        processBlock: function (a, b) {
            var c = this._8,
                d = c.blockSize,
                e = a.slice(b, b + d);
            c.decryptBlock(a, b);
            t.call(this, a, b, d);
            this._14 = e
        }
    });
    m = m.CBC = h;
    h = (g.pad = {}).Pkcs7 = {
        pad: function (a, b) {
                for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, e = [], f = 0; f < c; f += 4)
                    e.push(d);
                c = l.create(e, c);
                a.concat(c)
            },
            unpad: function (a) {
                a.sigBytes -= a.words[a.sigBytes - 1 >>> 2] & 255
            }
    };
    f.BlockCipher = n.extend({
        cfg: n.cfg.extend({
            mode: m,
            padding: h
        }),
        reset: function () {
                n.reset.call(this);
                var a = this.cfg,
                    b = a.iv,
                    a = a.mode;
                if (this._16 == this._12)
                    var c = a.createEncryptor;
                else
                    c = a.createDecryptor,
                    this._20 = 1;
                this._31 = c.call(a, this, b && b.words)
            },
            _23: function (a, b) {
                this._31.processBlock(a, b)
            },
            _10: function () {
                var a = this.cfg.padding;
                if (this._16 == this._12) {
                    a.pad(this._3, this.blockSize);
                    var b = this._4(!0)
                } else
                    b = this._4(!0),
                    a.unpad(b);
                return b
            },
            blockSize: 4
    });
    var p = f.CipherParams = k.extend({
            init: function (a) {
                    this.mixIn(a)
                },
                toString: function (a) {
                    return (a || this.formatter).stringify(this)
                }
        }),
        m = (g.format = {}).OpenSSL = {
            stringify: function (a) {
                    var b = a.ciphertext;
                    a = a.salt;
                    return (a ? l.create([1398893684, 1701076831]).concat(a).concat(b) : b).toString(r)
                },
                parse: function (a) {
                    a = r.parse(a);
                    var b = a.words;
                    if (1398893684 == b[0] && 1701076831 == b[1]) {
                        var c = l.create(b.slice(2, 4));
                        b.splice(0, 4);
                        a.sigBytes -= 16
                    }
                    return p.create({
                        ciphertext: a,
                        salt: c
                    })
                }
        },
        j = f.SerializableCipher = k.extend({
            cfg: k.extend({
                format: m
            }),
            encrypt: function (a, b, c, d) {
                    d = this.cfg.extend(d);
                    var e = a.createEncryptor(c, d);
                    b = e.finalize(b);
                    e = e.cfg;
                    return p.create({
                        ciphertext: b,
                        key: c,
                        iv: e.iv,
                        algorithm: a,
                        mode: e.mode,
                        padding: e.padding,
                        blockSize: a.blockSize,
                        formatter: d.format
                    })
                },
                decrypt: function (a, b, c, d) {
                    d = this.cfg.extend(d);
                    b = this._15(b, d.format);
                    return a.createDecryptor(c, d).finalize(b.ciphertext)
                },
                _15: function (a, b) {
                    return "string" == typeof a ? b.parse(a, this) : a
                }
        }),
        g = (g.kdf = {}).OpenSSL = {
            execute: function (a, b, c, d) {
                d || (d = l.random(8));
                a = v.create({
                    keySize: b + c
                }).compute(a, d);
                c = l.create(a.words.slice(b), 4 * c);
                a.sigBytes = 4 * b;
                return p.create({
                    key: a,
                    iv: c,
                    salt: d
                })
            }
        },
        s = f.PasswordBasedCipher = j.extend({
            cfg: j.cfg.extend({
                kdf: g
            }),
            encrypt: function (a, b, c, d) {
                    d = this.cfg.extend(d);
                    c = d.kdf.execute(c, a.keySize, a.ivSize);
                    d.iv = c.iv;
                    a = j.encrypt.call(this, a, b, c.key, d);
                    a.mixIn(c);
                    return a
                },
                decrypt: function (a, b, c, d) {
                    d = this.cfg.extend(d);
                    b = this._15(b, d.format);
                    c = d.kdf.execute(c, a.keySize, a.ivSize, b.salt);
                    d.iv = c.iv;
                    return j.decrypt.call(this, a, b, c.key, d)
                }
        })
}();
CryptoJS.mode.ECB = function () {
    var a = CryptoJS.lib.BlockCipherMode.extend();
    a.Encryptor = a.extend({
        processBlock: function (a, b) {
            this._8.encryptBlock(a, b)
        }
    });
    a.Decryptor = a.extend({
        processBlock: function (a, b) {
            this._8.decryptBlock(a, b)
        }
    });
    return a
}();
(function (E) {
    function h(a, f, g, j, p, h, k) {
        a = a + (f & g | ~f & j) + p + k;
        return (a << h | a >>> 32 - h) + f
    }

    function k(a, f, g, j, p, h, k) {
        a = a + (f & j | g & ~j) + p + k;
        return (a << h | a >>> 32 - h) + f
    }

    function l(a, f, g, j, h, k, l) {
        a = a + (f ^ g ^ j) + h + l;
        return (a << k | a >>> 32 - k) + f
    }

    function n(a, f, g, j, h, k, l) {
        a = a + (g ^ (f | ~j)) + h + l;
        return (a << k | a >>> 32 - k) + f
    }
    for (var r = CryptoJS, q = r.lib, F = q.WordArray, s = q.Hasher, q = r.algo, a = [], t = 0; 64 > t; t++)
        a[t] = 4294967296 * E.abs(E.sin(t + 1)) | 0;
    q = q.MD5 = s.extend({
        _7: function () {
                this._9 = new F.init([1732584193, 4023233417, 2562383102, 271733878])
            },
            _23: function (m, f) {
                for (var g = 0; 16 > g; g++) {
                    var j = f + g,
                        p = m[j];
                    m[j] = (p << 8 | p >>> 24) & 16711935 | (p << 24 | p >>> 8) & 4278255360
                }
                var g = this._9.words,
                    j = m[f + 0],
                    p = m[f + 1],
                    q = m[f + 2],
                    r = m[f + 3],
                    s = m[f + 4],
                    t = m[f + 5],
                    u = m[f + 6],
                    v = m[f + 7],
                    w = m[f + 8],
                    x = m[f + 9],
                    y = m[f + 10],
                    z = m[f + 11],
                    A = m[f + 12],
                    B = m[f + 13],
                    C = m[f + 14],
                    D = m[f + 15],
                    b = g[0],
                    c = g[1],
                    d = g[2],
                    e = g[3],
                    b = h(b, c, d, e, j, 7, a[0]),
                    e = h(e, b, c, d, p, 12, a[1]),
                    d = h(d, e, b, c, q, 17, a[2]),
                    c = h(c, d, e, b, r, 22, a[3]),
                    b = h(b, c, d, e, s, 7, a[4]),
                    e = h(e, b, c, d, t, 12, a[5]),
                    d = h(d, e, b, c, u, 17, a[6]),
                    c = h(c, d, e, b, v, 22, a[7]),
                    b = h(b, c, d, e, w, 7, a[8]),
                    e = h(e, b, c, d, x, 12, a[9]),
                    d = h(d, e, b, c, y, 17, a[10]),
                    c = h(c, d, e, b, z, 22, a[11]),
                    b = h(b, c, d, e, A, 7, a[12]),
                    e = h(e, b, c, d, B, 12, a[13]),
                    d = h(d, e, b, c, C, 17, a[14]),
                    c = h(c, d, e, b, D, 22, a[15]),
                    b = k(b, c, d, e, p, 5, a[16]),
                    e = k(e, b, c, d, u, 9, a[17]),
                    d = k(d, e, b, c, z, 14, a[18]),
                    c = k(c, d, e, b, j, 20, a[19]),
                    b = k(b, c, d, e, t, 5, a[20]),
                    e = k(e, b, c, d, y, 9, a[21]),
                    d = k(d, e, b, c, D, 14, a[22]),
                    c = k(c, d, e, b, s, 20, a[23]),
                    b = k(b, c, d, e, x, 5, a[24]),
                    e = k(e, b, c, d, C, 9, a[25]),
                    d = k(d, e, b, c, r, 14, a[26]),
                    c = k(c, d, e, b, w, 20, a[27]),
                    b = k(b, c, d, e, B, 5, a[28]),
                    e = k(e, b, c, d, q, 9, a[29]),
                    d = k(d, e, b, c, v, 14, a[30]),
                    c = k(c, d, e, b, A, 20, a[31]),
                    b = l(b, c, d, e, t, 4, a[32]),
                    e = l(e, b, c, d, w, 11, a[33]),
                    d = l(d, e, b, c, z, 16, a[34]),
                    c = l(c, d, e, b, C, 23, a[35]),
                    b = l(b, c, d, e, p, 4, a[36]),
                    e = l(e, b, c, d, s, 11, a[37]),
                    d = l(d, e, b, c, v, 16, a[38]),
                    c = l(c, d, e, b, y, 23, a[39]),
                    b = l(b, c, d, e, B, 4, a[40]),
                    e = l(e, b, c, d, j, 11, a[41]),
                    d = l(d, e, b, c, r, 16, a[42]),
                    c = l(c, d, e, b, u, 23, a[43]),
                    b = l(b, c, d, e, x, 4, a[44]),
                    e = l(e, b, c, d, A, 11, a[45]),
                    d = l(d, e, b, c, D, 16, a[46]),
                    c = l(c, d, e, b, q, 23, a[47]),
                    b = n(b, c, d, e, j, 6, a[48]),
                    e = n(e, b, c, d, v, 10, a[49]),
                    d = n(d, e, b, c, C, 15, a[50]),
                    c = n(c, d, e, b, t, 21, a[51]),
                    b = n(b, c, d, e, A, 6, a[52]),
                    e = n(e, b, c, d, r, 10, a[53]),
                    d = n(d, e, b, c, y, 15, a[54]),
                    c = n(c, d, e, b, p, 21, a[55]),
                    b = n(b, c, d, e, w, 6, a[56]),
                    e = n(e, b, c, d, D, 10, a[57]),
                    d = n(d, e, b, c, u, 15, a[58]),
                    c = n(c, d, e, b, B, 21, a[59]),
                    b = n(b, c, d, e, s, 6, a[60]),
                    e = n(e, b, c, d, z, 10, a[61]),
                    d = n(d, e, b, c, q, 15, a[62]),
                    c = n(c, d, e, b, x, 21, a[63]);
                g[0] = g[0] + b | 0;
                g[1] = g[1] + c | 0;
                g[2] = g[2] + d | 0;
                g[3] = g[3] + e | 0
            },
            _10: function () {
                var a = this._3,
                    f = a.words,
                    g = 8 * this._19,
                    j = 8 * a.sigBytes;
                f[j >>> 5] |= 128 << 24 - j % 32;
                var h = E.floor(g / 4294967296);
                f[(j + 64 >>> 9 << 4) + 15] = (h << 8 | h >>> 24) & 16711935 | (h << 24 | h >>> 8) & 4278255360;
                f[(j + 64 >>> 9 << 4) + 14] = (g << 8 | g >>> 24) & 16711935 | (g << 24 | g >>> 8) & 4278255360;
                a.sigBytes = 4 * (f.length + 1);
                this._4();
                a = this._9;
                f = a.words;
                for (g = 0; 4 > g; g++)
                    j = f[g],
                    f[g] = (j << 8 | j >>> 24) & 16711935 | (j << 24 | j >>> 8) & 4278255360;
                return a
            },
            clone: function () {
                var a = s.clone.call(this);
                a._9 = this._9.clone();
                return a
            }
    });
    r.MD5 = s._5(q);
    r.HmacMD5 = s._30(q)
})(Math);
(function () {
    for (var q = CryptoJS, x = q.lib.BlockCipher, r = q.algo, j = [], y = [], z = [], A = [], B = [], C = [], s = [], u = [], v = [], w = [], g = [], k = 0; 256 > k; k++)
        g[k] = 128 > k ? k << 1 : k << 1 ^ 283;
    for (var n = 0, l = 0, k = 0; 256 > k; k++) {
        var f = l ^ l << 1 ^ l << 2 ^ l << 3 ^ l << 4,
            f = f >>> 8 ^ f & 255 ^ 99;
        j[n] = f;
        y[f] = n;
        var t = g[n],
            D = g[t],
            E = g[D],
            b = 257 * g[f] ^ 16843008 * f;
        z[n] = b << 24 | b >>> 8;
        A[n] = b << 16 | b >>> 16;
        B[n] = b << 8 | b >>> 24;
        C[n] = b;
        b = 16843009 * E ^ 65537 * D ^ 257 * t ^ 16843008 * n;
        s[f] = b << 24 | b >>> 8;
        u[f] = b << 16 | b >>> 16;
        v[f] = b << 8 | b >>> 24;
        w[f] = b;
        n ? (n = t ^ g[g[g[E ^ t]]],
            l ^= g[g[l]]) : n = l = 1
    }
    var F = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
        r = r.AES = x.extend({
            _7: function () {
                    for (var c = this._13, e = c.words, a = c.sigBytes / 4, c = 4 * ((this._26 = a + 6) + 1), b = this._32 = [], h = 0; h < c; h++)
                        if (h < a)
                            b[h] = e[h];
                        else {
                            var d = b[h - 1];
                            h % a ? 6 < a && 4 == h % a && (d = j[d >>> 24] << 24 | j[d >>> 16 & 255] << 16 | j[d >>> 8 & 255] << 8 | j[d & 255]) : (d = d << 8 | d >>> 24,
                                d = j[d >>> 24] << 24 | j[d >>> 16 & 255] << 16 | j[d >>> 8 & 255] << 8 | j[d & 255],
                                d ^= F[h / a | 0] << 24);
                            b[h] = b[h - a] ^ d
                        }
                    e = this._34 = [];
                    for (a = 0; a < c; a++)
                        h = c - a,
                        d = a % 4 ? b[h] : b[h - 4],
                        e[a] = 4 > a || 4 >= h ? d : s[j[d >>> 24]] ^ u[j[d >>> 16 & 255]] ^ v[j[d >>> 8 & 255]] ^ w[j[d & 255]]
                },
                encryptBlock: function (c, e) {
                    this._6(c, e, this._32, z, A, B, C, j)
                },
                decryptBlock: function (c, e) {
                    var a = c[e + 1];
                    c[e + 1] = c[e + 3];
                    c[e + 3] = a;
                    this._6(c, e, this._34, s, u, v, w, y);
                    a = c[e + 1];
                    c[e + 1] = c[e + 3];
                    c[e + 3] = a
                },
                _6: function (c, e, a, b, h, d, j, m) {
                    for (var n = this._26, f = c[e] ^ a[0], g = c[e + 1] ^ a[1], k = c[e + 2] ^ a[2], p = c[e + 3] ^ a[3], l = 4, t = 1; t < n; t++)
                        var q = b[f >>> 24] ^ h[g >>> 16 & 255] ^ d[k >>> 8 & 255] ^ j[p & 255] ^ a[l++],
                            r = b[g >>> 24] ^ h[k >>> 16 & 255] ^ d[p >>> 8 & 255] ^ j[f & 255] ^ a[l++],
                            s = b[k >>> 24] ^ h[p >>> 16 & 255] ^ d[f >>> 8 & 255] ^ j[g & 255] ^ a[l++],
                            p = b[p >>> 24] ^ h[f >>> 16 & 255] ^ d[g >>> 8 & 255] ^ j[k & 255] ^ a[l++],
                            f = q,
                            g = r,
                            k = s;
                    q = (m[f >>> 24] << 24 | m[g >>> 16 & 255] << 16 | m[k >>> 8 & 255] << 8 | m[p & 255]) ^ a[l++];
                    r = (m[g >>> 24] << 24 | m[k >>> 16 & 255] << 16 | m[p >>> 8 & 255] << 8 | m[f & 255]) ^ a[l++];
                    s = (m[k >>> 24] << 24 | m[p >>> 16 & 255] << 16 | m[f >>> 8 & 255] << 8 | m[g & 255]) ^ a[l++];
                    p = (m[p >>> 24] << 24 | m[f >>> 16 & 255] << 16 | m[g >>> 8 & 255] << 8 | m[k & 255]) ^ a[l++];
                    c[e] = q;
                    c[e + 1] = r;
                    c[e + 2] = s;
                    c[e + 3] = p
                },
                keySize: 8
        });
    q.AES = x._5(r)
})();
(function () {
    function j(b, c) {
        var a = (this._0 >>> b ^ this._1) & c;
        this._1 ^= a;
        this._0 ^= a << b
    }

    function l(b, c) {
        var a = (this._1 >>> b ^ this._0) & c;
        this._0 ^= a;
        this._1 ^= a << b
    }
    var h = CryptoJS,
        e = h.lib,
        n = e.WordArray,
        e = e.BlockCipher,
        g = h.algo,
        q = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4],
        p = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32],
        r = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28],
        s = [{
            "0": 8421888,
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
            "0": 1074282512,
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
            "0": 260,
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
            "0": 2151682048,
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
            "0": 128,
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
            "0": 268435464,
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
            "0": 1048576,
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
            "0": 134219808,
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
        t = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679],
        m = g.DES = e.extend({
            _7: function () {
                    for (var b = this._13.words, c = [], a = 0; 56 > a; a++) {
                        var f = q[a] - 1;
                        c[a] = b[f >>> 5] >>> 31 - f % 32 & 1
                    }
                    b = this._25 = [];
                    for (f = 0; 16 > f; f++) {
                        for (var d = b[f] = [], e = r[f], a = 0; 24 > a; a++)
                            d[a / 6 | 0] |= c[(p[a] - 1 + e) % 28] << 31 - a % 6,
                            d[4 + (a / 6 | 0)] |= c[28 + (p[a + 24] - 1 + e) % 28] << 31 - a % 6;
                        d[0] = d[0] << 1 | d[0] >>> 31;
                        for (a = 1; 7 > a; a++)
                            d[a] >>>= 4 * (a - 1) + 3;
                        d[7] = d[7] << 5 | d[7] >>> 27
                    }
                    c = this._28 = [];
                    for (a = 0; 16 > a; a++)
                        c[a] = b[15 - a]
                },
                encryptBlock: function (b, c) {
                    this._6(b, c, this._25)
                },
                decryptBlock: function (b, c) {
                    this._6(b, c, this._28)
                },
                _6: function (b, c, a) {
                    this._0 = b[c];
                    this._1 = b[c + 1];
                    j.call(this, 4, 252645135);
                    j.call(this, 16, 65535);
                    l.call(this, 2, 858993459);
                    l.call(this, 8, 16711935);
                    j.call(this, 1, 1431655765);
                    for (var f = 0; 16 > f; f++) {
                        for (var d = a[f], e = this._0, h = this._1, g = 0, k = 0; 8 > k; k++)
                            g |= s[k][((h ^ d[k]) & t[k]) >>> 0];
                        this._0 = h;
                        this._1 = e ^ g
                    }
                    a = this._0;
                    this._0 = this._1;
                    this._1 = a;
                    j.call(this, 1, 1431655765);
                    l.call(this, 8, 16711935);
                    l.call(this, 2, 858993459);
                    j.call(this, 16, 65535);
                    j.call(this, 4, 252645135);
                    b[c] = this._0;
                    b[c + 1] = this._1
                },
                keySize: 2,
            ivSize: 2,
            blockSize: 2
        });
    h.DES = e._5(m);
    g = g.TripleDES = e.extend({
        _7: function () {
                var b = this._13.words;
                this._24 = m.createEncryptor(n.create(b.slice(0, 2)));
                this._21 = m.createEncryptor(n.create(b.slice(2, 4)));
                this._22 = m.createEncryptor(n.create(b.slice(4, 6)))
            },
            encryptBlock: function (b, c) {
                this._24.encryptBlock(b, c);
                this._21.decryptBlock(b, c);
                this._22.encryptBlock(b, c)
            },
            decryptBlock: function (b, c) {
                this._22.decryptBlock(b, c);
                this._21.encryptBlock(b, c);
                this._24.decryptBlock(b, c)
            },
            keySize: 6,
        ivSize: 2,
        blockSize: 2
    });
    h.TripleDES = e._5(g)
})();
/********************************/
function Base64() {
    _2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        this.encode = function (a) {
            var c, d, e, f, g, h, i, b = "",
                j = 0;
            for (a = _29(a); j < a.length;)
                c = a.charCodeAt(j++),
                d = a.charCodeAt(j++),
                e = a.charCodeAt(j++),
                f = c >> 2,
                g = (3 & c) << 4 | d >> 4,
                h = (15 & d) << 2 | e >> 6,
                i = 63 & e,
                isNaN(d) ? h = i = 64 : isNaN(e) && (i = 64),
                b = b + _2.charAt(f) + _2.charAt(g) + _2.charAt(h) + _2.charAt(i);
            return b
        },
        this.decode = function (a) {
            var c, d, e, f, g, h, i, b = "",
                j = 0;
            for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); j < a.length;)
                f = _2.indexOf(a.charAt(j++)),
                g = _2.indexOf(a.charAt(j++)),
                h = _2.indexOf(a.charAt(j++)),
                i = _2.indexOf(a.charAt(j++)),
                c = f << 2 | g >> 4,
                d = (15 & g) << 4 | h >> 2,
                e = (3 & h) << 6 | i,
                b += String.fromCharCode(c),
                64 != h && (b += String.fromCharCode(d)),
                64 != i && (b += String.fromCharCode(e));
            return b = _27(b)
        },
        _29 = function (a) {
            var b, c, d;
            for (a = a.replace(/\r\n/g, "\n"),
                b = "",
                c = 0; c < a.length; c++)
                d = a.charCodeAt(c),
                128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(192 | d >> 6),
                    b += String.fromCharCode(128 | 63 & d)) : (b += String.fromCharCode(224 | d >> 12),
                    b += String.fromCharCode(128 | 63 & d >> 6),
                    b += String.fromCharCode(128 | 63 & d));
            return b
        },
        _27 = function (a) {
            for (var b = "", c = 0, d = c1 = c2 = 0; c < a.length;)
                d = a.charCodeAt(c),
                128 > d ? (b += String.fromCharCode(d),
                    c++) : d > 191 && 224 > d ? (c2 = a.charCodeAt(c + 1),
                    b += String.fromCharCode((31 & d) << 6 | 63 & c2),
                    c += 2) : (c2 = a.charCodeAt(c + 1),
                    c3 = a.charCodeAt(c + 2),
                    b += String.fromCharCode((15 & d) << 12 | (63 & c2) << 6 | 63 & c3),
                    c += 3);
            return b
        }
}

function hex_md5(a) {
    return binl2hex(core_md5(str2binl(a), a.length * chrsz))
}

function b64_md5(a) {
    return binl2b64(core_md5(str2binl(a), a.length * chrsz))
}

function str_md5(a) {
    return binl2str(core_md5(str2binl(a), a.length * chrsz))
}

function hex_hmac_md5(a, b) {
    return binl2hex(core_hmac_md5(a, b))
}

function b64_hmac_md5(a, b) {
    return binl2b64(core_hmac_md5(a, b))
}

function str_hmac_md5(a, b) {
    return binl2str(core_hmac_md5(a, b))
}

function md5_vm_test() {
    return "900150983cd24fb0d6963f7d28e17f72" == hex_md5("abc")
}

function core_md5(a, b) {
    var c, d, e, f, g, h, i, j, k;
    for (a[b >> 5] |= 128 << b % 32,
        a[(b + 64 >>> 9 << 4) + 14] = b,
        c = 1732584193,
        d = -271733879,
        e = -1732584194,
        f = 271733878,
        g = 0; g < a.length; g += 16)
        h = c,
        i = d,
        j = e,
        k = f,
        c = md5_ff(c, d, e, f, a[g + 0], 7, -680876936),
        f = md5_ff(f, c, d, e, a[g + 1], 12, -389564586),
        e = md5_ff(e, f, c, d, a[g + 2], 17, 606105819),
        d = md5_ff(d, e, f, c, a[g + 3], 22, -1044525330),
        c = md5_ff(c, d, e, f, a[g + 4], 7, -176418897),
        f = md5_ff(f, c, d, e, a[g + 5], 12, 1200080426),
        e = md5_ff(e, f, c, d, a[g + 6], 17, -1473231341),
        d = md5_ff(d, e, f, c, a[g + 7], 22, -45705983),
        c = md5_ff(c, d, e, f, a[g + 8], 7, 1770035416),
        f = md5_ff(f, c, d, e, a[g + 9], 12, -1958414417),
        e = md5_ff(e, f, c, d, a[g + 10], 17, -42063),
        d = md5_ff(d, e, f, c, a[g + 11], 22, -1990404162),
        c = md5_ff(c, d, e, f, a[g + 12], 7, 1804603682),
        f = md5_ff(f, c, d, e, a[g + 13], 12, -40341101),
        e = md5_ff(e, f, c, d, a[g + 14], 17, -1502002290),
        d = md5_ff(d, e, f, c, a[g + 15], 22, 1236535329),
        c = md5_gg(c, d, e, f, a[g + 1], 5, -165796510),
        f = md5_gg(f, c, d, e, a[g + 6], 9, -1069501632),
        e = md5_gg(e, f, c, d, a[g + 11], 14, 643717713),
        d = md5_gg(d, e, f, c, a[g + 0], 20, -373897302),
        c = md5_gg(c, d, e, f, a[g + 5], 5, -701558691),
        f = md5_gg(f, c, d, e, a[g + 10], 9, 38016083),
        e = md5_gg(e, f, c, d, a[g + 15], 14, -660478335),
        d = md5_gg(d, e, f, c, a[g + 4], 20, -405537848),
        c = md5_gg(c, d, e, f, a[g + 9], 5, 568446438),
        f = md5_gg(f, c, d, e, a[g + 14], 9, -1019803690),
        e = md5_gg(e, f, c, d, a[g + 3], 14, -187363961),
        d = md5_gg(d, e, f, c, a[g + 8], 20, 1163531501),
        c = md5_gg(c, d, e, f, a[g + 13], 5, -1444681467),
        f = md5_gg(f, c, d, e, a[g + 2], 9, -51403784),
        e = md5_gg(e, f, c, d, a[g + 7], 14, 1735328473),
        d = md5_gg(d, e, f, c, a[g + 12], 20, -1926607734),
        c = md5_hh(c, d, e, f, a[g + 5], 4, -378558),
        f = md5_hh(f, c, d, e, a[g + 8], 11, -2022574463),
        e = md5_hh(e, f, c, d, a[g + 11], 16, 1839030562),
        d = md5_hh(d, e, f, c, a[g + 14], 23, -35309556),
        c = md5_hh(c, d, e, f, a[g + 1], 4, -1530992060),
        f = md5_hh(f, c, d, e, a[g + 4], 11, 1272893353),
        e = md5_hh(e, f, c, d, a[g + 7], 16, -155497632),
        d = md5_hh(d, e, f, c, a[g + 10], 23, -1094730640),
        c = md5_hh(c, d, e, f, a[g + 13], 4, 681279174),
        f = md5_hh(f, c, d, e, a[g + 0], 11, -358537222),
        e = md5_hh(e, f, c, d, a[g + 3], 16, -722521979),
        d = md5_hh(d, e, f, c, a[g + 6], 23, 76029189),
        c = md5_hh(c, d, e, f, a[g + 9], 4, -640364487),
        f = md5_hh(f, c, d, e, a[g + 12], 11, -421815835),
        e = md5_hh(e, f, c, d, a[g + 15], 16, 530742520),
        d = md5_hh(d, e, f, c, a[g + 2], 23, -995338651),
        c = md5_ii(c, d, e, f, a[g + 0], 6, -198630844),
        f = md5_ii(f, c, d, e, a[g + 7], 10, 1126891415),
        e = md5_ii(e, f, c, d, a[g + 14], 15, -1416354905),
        d = md5_ii(d, e, f, c, a[g + 5], 21, -57434055),
        c = md5_ii(c, d, e, f, a[g + 12], 6, 1700485571),
        f = md5_ii(f, c, d, e, a[g + 3], 10, -1894986606),
        e = md5_ii(e, f, c, d, a[g + 10], 15, -1051523),
        d = md5_ii(d, e, f, c, a[g + 1], 21, -2054922799),
        c = md5_ii(c, d, e, f, a[g + 8], 6, 1873313359),
        f = md5_ii(f, c, d, e, a[g + 15], 10, -30611744),
        e = md5_ii(e, f, c, d, a[g + 6], 15, -1560198380),
        d = md5_ii(d, e, f, c, a[g + 13], 21, 1309151649),
        c = md5_ii(c, d, e, f, a[g + 4], 6, -145523070),
        f = md5_ii(f, c, d, e, a[g + 11], 10, -1120210379),
        e = md5_ii(e, f, c, d, a[g + 2], 15, 718787259),
        d = md5_ii(d, e, f, c, a[g + 9], 21, -343485551),
        c = safe_add(c, h),
        d = safe_add(d, i),
        e = safe_add(e, j),
        f = safe_add(f, k);
    return Array(c, d, e, f)
}

function md5_cmn(a, b, c, d, e, f) {
    return safe_add(bit_rol(safe_add(safe_add(b, a), safe_add(d, f)), e), c)
}

function md5_ff(a, b, c, d, e, f, g) {
    return md5_cmn(b & c | ~b & d, a, b, e, f, g)
}

function md5_gg(a, b, c, d, e, f, g) {
    return md5_cmn(b & d | c & ~d, a, b, e, f, g)
}

function md5_hh(a, b, c, d, e, f, g) {
    return md5_cmn(b ^ c ^ d, a, b, e, f, g)
}

function md5_ii(a, b, c, d, e, f, g) {
    return md5_cmn(c ^ (b | ~d), a, b, e, f, g)
}

function core_hmac_md5(a, b) {
    var d, e, f, g, c = str2binl(a);
    for (c.length > 16 && (c = core_md5(c, a.length * chrsz)),
        d = Array(16),
        e = Array(16),
        f = 0; 16 > f; f++)
        d[f] = 909522486 ^ c[f],
        e[f] = 1549556828 ^ c[f];
    return g = core_md5(d.concat(str2binl(b)), 512 + b.length * chrsz),
        core_md5(e.concat(g), 640)
}

function safe_add(a, b) {
    var c = (65535 & a) + (65535 & b),
        d = (a >> 16) + (b >> 16) + (c >> 16);
    return d << 16 | 65535 & c
}

function bit_rol(a, b) {
    return a << b | a >>> 32 - b
}

function str2binl(a) {
    var d, b = Array(),
        c = (1 << chrsz) - 1;
    for (d = 0; d < a.length * chrsz; d += chrsz)
        b[d >> 5] |= (a.charCodeAt(d / chrsz) & c) << d % 32;
    return b
}

function binl2str(a) {
    var d, b = "",
        c = (1 << chrsz) - 1;
    for (d = 0; d < 32 * a.length; d += chrsz)
        b += String.fromCharCode(a[d >> 5] >>> d % 32 & c);
    return b
}

function binl2hex(a) {
    var d, b = hexcase ? "0123456789ABCDEF" : "0123456789abcdef",
        c = "";
    for (d = 0; d < 4 * a.length; d++)
        c += b.charAt(15 & a[d >> 2] >> 8 * (d % 4) + 4) + b.charAt(15 & a[d >> 2] >> 8 * (d % 4));
    return c
}

function binl2b64(a) {
    var d, e, f, b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        c = "";
    for (d = 0; d < 4 * a.length; d += 3)
        for (e = (255 & a[d >> 2] >> 8 * (d % 4)) << 16 | (255 & a[d + 1 >> 2] >> 8 * ((d + 1) % 4)) << 8 | 255 & a[d + 2 >> 2] >> 8 * ((d + 2) % 4),
            f = 0; 4 > f; f++)
            c += 8 * d + 6 * f > 32 * a.length ? b64pad : b.charAt(63 & e >> 6 * (3 - f));
    return c
}

function encode_param(a) {
    var b = new Base64;
    return b.encode(a)
}

function encode_secret() {
    var b, a = appId;
    for (b = 0; b < arguments.length; b++)
        a += arguments[b];
    return a = a.replace(/\s/g, ""),
        hex_md5(a)
}

function decode_result(a) {
    var b = new Base64;
    return b.decode(b.decode(b.decode(a)))
}
var hexcase = 0,
    b64pad = "",
    chrsz = 8,
    appId = "a01901d3caba1f362d69474674ce477f";
var hexcase = 0;
var b64pad = "";

function hex_md5(s) {
    return rstr2hex(rstr_md5(str2rstr_utf8(s)))
}

function b64_md5(s) {
    return rstr2b64(rstr_md5(str2rstr_utf8(s)))
}

function any_md5(s, e) {
    return rstr2any(rstr_md5(str2rstr_utf8(s)), e)
}

function hex_hmac_md5(k, d) {
    return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)))
}

function b64_hmac_md5(k, d) {
    return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)))
}

function any_hmac_md5(k, d, e) {
    return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e)
}

function md5_vm_test() {
    return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72"
}

function rstr_md5(s) {
    return binl2rstr(binl_md5(rstr2binl(s), s.length * 8))
}

function rstr_hmac_md5(key, data) {
    var bkey = rstr2binl(key);
    if (bkey.length > 16)
        bkey = binl_md5(bkey, key.length * 8);
    var ipad = Array(16),
        opad = Array(16);
    for (var i = 0; i < 16; i++) {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C
    }
    var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
    return binl2rstr(binl_md5(opad.concat(hash), 512 + 128))
}

function rstr2hex(input) {
    try {
        hexcase
    } catch (e) {
        hexcase = 0
    }
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var output = "";
    var x;
    for (var i = 0; i < input.length; i++) {
        x = input.charCodeAt(i);
        output += hex_tab.charAt((x >>> 4) & 0x0F) + hex_tab.charAt(x & 0x0F)
    }
    return output
}

function rstr2b64(input) {
    try {
        b64pad
    } catch (e) {
        b64pad = ''
    }
    var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var output = "";
    var len = input.length;
    for (var i = 0; i < len; i += 3) {
        var triplet = (input.charCodeAt(i) << 16) | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0) | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
        for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 > input.length * 8)
                output += b64pad;
            else
                output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F)
        }
    }
    return output
}

function rstr2any(input, encoding) {
    var divisor = encoding.length;
    var i, j, q, x, quotient;
    var dividend = Array(Math.ceil(input.length / 2));
    for (i = 0; i < dividend.length; i++) {
        dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1)
    }
    var full_length = Math.ceil(input.length * 8 / (Math.log(encoding.length) / Math.log(2)));
    var remainders = Array(full_length);
    for (j = 0; j < full_length; j++) {
        quotient = Array();
        x = 0;
        for (i = 0; i < dividend.length; i++) {
            x = (x << 16) + dividend[i];
            q = Math.floor(x / divisor);
            x -= q * divisor;
            if (quotient.length > 0 || q > 0)
                quotient[quotient.length] = q
        }
        remainders[j] = x;
        dividend = quotient
    }
    var output = "";
    for (i = remainders.length - 1; i >= 0; i--)
        output += encoding.charAt(remainders[i]);
    return output
}

function str2rstr_utf8(input) {
    var output = "";
    var i = -1;
    var x, y;
    while (++i < input.length) {
        x = input.charCodeAt(i);
        y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
        if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
            x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
            i++
        }
        if (x <= 0x7F)
            output += String.fromCharCode(x);
        else if (x <= 0x7FF)
            output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F), 0x80 | (x & 0x3F));
        else if (x <= 0xFFFF)
            output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
        else if (x <= 0x1FFFFF)
            output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F))
    }
    return output
}

function str2rstr_utf16le(input) {
    var output = "";
    for (var i = 0; i < input.length; i++)
        output += String.fromCharCode(input.charCodeAt(i) & 0xFF, (input.charCodeAt(i) >>> 8) & 0xFF);
    return output
}

function str2rstr_utf16be(input) {
    var output = "";
    for (var i = 0; i < input.length; i++)
        output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF, input.charCodeAt(i) & 0xFF);
    return output
}

function rstr2binl(input) {
    var output = Array(input.length >> 2);
    for (var i = 0; i < output.length; i++)
        output[i] = 0;
    for (var i = 0; i < input.length * 8; i += 8)
        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
    return output
}

function binl2rstr(input) {
    var output = "";
    for (var i = 0; i < input.length * 32; i += 8)
        output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
    return output
}

function binl_md5(x, len) {
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd)
    }
    return Array(a, b, c, d)
}

function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)
}

function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t)
}

function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t)
}

function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t)
}

function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t)
}

function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF)
}

function bit_rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt))
    }
    /**********************************************/
var BASE64 = {
    encrypt: function (text) {
            var b = new Base64();
            return b.encode(text)
        },
        decrypt: function (text) {
            var b = new Base64();
            return b.decode(text)
        }
};
var DES = {
    encrypt: function (text, key, iv) {
            var secretkey = (CryptoJS.MD5(key).toString()).substr(0, 16);
            var secretiv = (CryptoJS.MD5(iv).toString()).substr(24, 8);
            secretkey = CryptoJS.enc.Utf8.parse(secretkey);
            secretiv = CryptoJS.enc.Utf8.parse(secretiv);
            var result = CryptoJS.DES.encrypt(text, secretkey, {
                iv: secretiv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            return result.toString()
        },
        decrypt: function (text, key, iv) {
            var secretkey = (CryptoJS.MD5(key).toString()).substr(0, 16);
            var secretiv = (CryptoJS.MD5(iv).toString()).substr(24, 8);
            secretkey = CryptoJS.enc.Utf8.parse(secretkey);
            secretiv = CryptoJS.enc.Utf8.parse(secretiv);
            var result = CryptoJS.DES.decrypt(text, secretkey, {
                iv: secretiv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            return result.toString(CryptoJS.enc.Utf8)
        }
};
var AES = {
    encrypt: function (text, key, iv) {
            var secretkey = (CryptoJS.MD5(key).toString()).substr(16, 16);
            var secretiv = (CryptoJS.MD5(iv).toString()).substr(0, 16);
            secretkey = CryptoJS.enc.Utf8.parse(secretkey);
            secretiv = CryptoJS.enc.Utf8.parse(secretiv);
            var result = CryptoJS.AES.encrypt(text, secretkey, {
                iv: secretiv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            return result.toString()
        },
        decrypt: function (text, key, iv) {
            var secretkey = (CryptoJS.MD5(key).toString()).substr(16, 16);
            var secretiv = (CryptoJS.MD5(iv).toString()).substr(0, 16);
            secretkey = CryptoJS.enc.Utf8.parse(secretkey);
            secretiv = CryptoJS.enc.Utf8.parse(secretiv);
            var result = CryptoJS.AES.decrypt(text, secretkey, {
                iv: secretiv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            return result.toString(CryptoJS.enc.Utf8)
        }
};
var localStorageUtil = {
    save: function (name, value) {
            var text = JSON.stringify(value);
            text = BASE64.encrypt(text);
            text = AES.encrypt(text, aes_local_key, aes_local_iv);
            try {
                localStorage.setItem(name, text)
            } catch (oException) {
                if (oException.name === 'QuotaExceededError') {
                    console.log('超出本地存储限额！');
                    localStorage.clear();
                    localStorage.setItem(name, text)
                }
            }
        },
        check: function (name) {
            return localStorage.getItem(name)
        },
        getValue: function (name) {
            var text = localStorage.getItem(name);
            var result = null;
            if (text) {
                text = AES.decrypt(text, aes_local_key, aes_local_iv);
                text = BASE64.decrypt(text);
                result = JSON.parse(text)
            }
            return result
        },
        remove: function (name) {
            localStorage.removeItem(name)
        }
};
/*function getDataFromLocalStorage(key, period) {
    if (typeof period === 'undefined') {
        period = 0
    }
    var d = DES.encrypt(key);
    d = BASE64.encrypt(key);
    var data = localStorageUtil.getValue(key);
    if (data) {
        const time = data.time;
        const current = new Date().getTime();
        if (new Date().getHours() >= 0 && new Date().getHours() < 5 && period > 1) {
            period = 1
        }
        if (current - (period * 60 * 60 * 1000) > time) {
            data = null
        }
        if (new Date().getHours() >= 5 && new Date(time).getDate() !== new Date().getDate() && period === 24) {
            data = null
        }
    }
    return data
}*/
/*function ObjectSort(obj) {
    var newObject = {};
    Object.keys(obj).sort().map(function(key) {
        newObject[key] = obj[key]
    });
    return newObject
}*/
function decodeData(data) {
        data = AES.decrypt(data, aes_server_key, aes_server_iv);
        data = DES.decrypt(data, des_key, des_iv);
        data = BASE64.decrypt(data);
        return data
    }
/**********************************************/

/*
    d函数是最终的加密函数 调用d函数即可
*/
function d(obj) {
    var appId = '1a45f75b824b2dc628d5955356b5ef18';
    var method = "GETDATA"
    var clienttype = 'WEB';
    var timestamp = new Date().getTime();
    var param = {
        appId: appId,
        method: method,
        timestamp: timestamp,
        clienttype: clienttype,
        object: obj,
        secret: hex_md5(appId + method + timestamp + clienttype + JSON.stringify(obj))
    };
    param = BASE64.encrypt(JSON.stringify(param));
    var aes_client_key = "WksdsdflFweFZ==";
    var aes_client_iv = "klsfw9nsp=";
    return AES.encrypt(param, aes_client_key, aes_client_iv)
}