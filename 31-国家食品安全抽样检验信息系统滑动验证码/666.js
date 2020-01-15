function mdfive(mdfivestr) {
    var createmdfiveString = function (string) {
        var x = Array()
        var k, AA, BB, CC, DD, a, b, c, d
        var S11 = 7,
            S12 = 12,
            S13 = 17,
            S14 = 22
        var S21 = 5,
            S22 = 9,
            S23 = 14,
            S24 = 20
        var S31 = 4,
            S32 = 11,
            S33 = 16,
            S34 = 23
        var S41 = 6,
            S42 = 10,
            S43 = 15,
            S44 = 21
        string = uTF8Encode(string)
        x = convertToWordArray(string)
        a = 0x67452301
        b = 0xEFCDAB89
        c = 0x98BADCFE
        d = 0x10325476
        for (k = 0; k < x.length; k += 16) {
            AA = a
            BB = b
            CC = c
            DD = d
            a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478)
            d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756)
            c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB)
            b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE)
            a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF)
            d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A)
            c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613)
            b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501)
            a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8)
            d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF)
            c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1)
            b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE)
            a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122)
            d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193)
            c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E)
            b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821)
            a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562)
            d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340)
            c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51)
            b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA)
            a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D)
            d = GG(d, a, b, c, x[k + 10], S22, 0x2441453)
            c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681)
            b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8)
            a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6)
            d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6)
            c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87)
            b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED)
            a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905)
            d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8)
            c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9)
            b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A)
            a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942)
            d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681)
            c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122)
            b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C)
            a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44)
            d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9)
            c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60)
            b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70)
            a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6)
            d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA)
            c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085)
            b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05)
            a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039)
            d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5)
            c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8)
            b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665)
            a = II(a, b, c, d, x[k + 0], S41, 0xF4292244)
            d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97)
            c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7)
            b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039)
            a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3)
            d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92)
            c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D)
            b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1)
            a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F)
            d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0)
            c = II(c, d, a, b, x[k + 6], S43, 0xA3014314)
            b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1)
            a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82)
            d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235)
            c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB)
            b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391)
            a = addUnsigned(a, AA)
            b = addUnsigned(b, BB)
            c = addUnsigned(c, CC)
            d = addUnsigned(d, DD)
        }
        var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)
        return tempValue.toLowerCase()
    }
    var rotateLeft = function (lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits))
    }
    var addUnsigned = function (lX, lY) {
        var lX4, lY4, lX8, lY8, lResult
        lX8 = (lX & 0x80000000)
        lY8 = (lY & 0x80000000)
        lX4 = (lX & 0x40000000)
        lY4 = (lY & 0x40000000)
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF)
        if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8)
        if (lX4 | lY4) {
            if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8)
            else return (lResult ^ 0x40000000 ^ lX8 ^ lY8)
        } else {
            return (lResult ^ lX8 ^ lY8)
        }
    }
    var F = function (x, y, z) {
        return (x & y) | ((~x) & z)
    }
    var G = function (x, y, z) {
        return (x & z) | (y & (~z))
    }
    var H = function (x, y, z) {
        return (x ^ y ^ z)
    }
    var I = function (x, y, z) {
        return (y ^ (x | (~z)))
    }
    var FF = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac))
        return addUnsigned(rotateLeft(a, s), b)
    }
    var GG = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac))
        return addUnsigned(rotateLeft(a, s), b)
    }
    var HH = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac))
        return addUnsigned(rotateLeft(a, s), b)
    }
    var II = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac))
        return addUnsigned(rotateLeft(a, s), b)
    }
    var convertToWordArray = function (string) {
        var lWordCount
        var lMessageLength = string.length
        var lNumberOfWordsTempOne = lMessageLength + 8
        var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64
        var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16
        var lWordArray = Array(lNumberOfWords - 1)
        var lBytePosition = 0
        var lByteCount = 0
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4
            lBytePosition = (lByteCount % 4) * 8
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition))
            lByteCount++
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4
        lBytePosition = (lByteCount % 4) * 8
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition)
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29
        return lWordArray
    }
    var wordToHex = function (lValue) {
        var WordToHexValue = '',
            WordToHexValueTemp = '',
            lByte, lCount
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255
            WordToHexValueTemp = '0' + lByte.toString(16)
            WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2)
        }
        return WordToHexValue
    }
    var uTF8Encode = function (string) {
        string = string.toString().replace(/\x0d\x0a/g, '\x0a')
        var output = ''
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n)
            if (c < 128) {
                output += String.fromCharCode(c)
            } else if ((c > 127) && (c < 2048)) {
                output += String.fromCharCode((c >> 6) | 192)
                output += String.fromCharCode((c & 63) | 128)
            } else {
                output += String.fromCharCode((c >> 12) | 224)
                output += String.fromCharCode(((c >> 6) & 63) | 128)
                output += String.fromCharCode((c & 63) | 128)
            }
        }
        return output
    }
    return createmdfiveString(mdfivestr)
}

var tncode = {
    _obj: null,
    _tncode: null,
    _img: null,
    _img_loaded: false,
    _is_draw_bg: false,
    _is_moving: false,
    _block_start_x: 0,
    _block_start_y: 0,
    _doing: false,
    _mark_w: 50,
    _mark_h: 50,
    _mark_offset: 0,
    _img_w: 240,
    _img_h: 150,
    _result: false,
    _err_c: 0,
    _onsuccess: null,
    _onclose: null,
    _bind: function (elm, evType, fn) {
        //event.preventDefault();
        if (elm.addEventListener) {
            elm.addEventListener(evType, fn);//DOM2.0
            return true;
        } else if (elm.attachEvent) {
            var r = elm.attachEvent(evType, fn);//IE5+
            return r;
        }
    },
    _block_start_move: function (e) {
        if (tncode._doing || !tncode._img_loaded) {
            return;
        }
        e.preventDefault();
        var theEvent = window.event || e;
        if (theEvent.touches) {
            theEvent = theEvent.touches[0];
        }

        console.log("_block_start_move");

        var obj = document.getElementByClassName('slide_block_text');
        obj.style.display = "none";
        tncode._draw_bg();
        tncode._block_start_x = theEvent.clientX;
        tncode._block_start_y = theEvent.clientY;
        tncode._doing = true;
        tncode._is_moving = true;
    },
    _block_on_move: function (e) {
        if (!tncode._doing) return true;
        if (!tncode._is_moving) return true;
        e.preventDefault();
        var theEvent = window.event || e;
        if (theEvent.touches) {
            theEvent = theEvent.touches[0];
        }
        tncode._is_moving = true;
        console.log("_block_on_move");
        //document.getElementById('msg').innerHTML = "move:"+theEvent.clientX+";"+theEvent.clientY;
        var offset = theEvent.clientX - tncode._block_start_x;
        if (offset < 0) {
            offset = 0;
        }
        var max_off = tncode._img_w - tncode._mark_w;
        if (offset > max_off) {
            offset = max_off;
        }
        var obj = document.getElementByClassName('slide_block');

        obj.style.cssText = "transform: translate(" + offset + "px, 0px)";
        tncode._mark_offset = offset / max_off * (tncode._img_w - tncode._mark_w);
        tncode._draw_bg();
        tncode._draw_mark();
    },
    _block_on_end: function (e) {
        if (!tncode._doing) return true;
        e.preventDefault();
        var theEvent = window.event || e;
        if (theEvent.touches) {
            theEvent = theEvent.touches[0];
        }
        console.log("_block_on_end");
        tncode._is_moving = false;
        tncode._send_result();
    },
    _send_result: function () {
        var haddle = {success: tncode._send_result_success, failure: tncode._send_result_failure};
        tncode._result = false;
        var re = new _ajax();
        var arr = ["ch","e","ck","?"];
        var x = tncode._param(1828);
        var y = tncode._param(3228);
        var offset = tncode._param(55528);
        var token = mdfive(tncode._param(77528));
        var user = mdfive(tncode._param(961828));
        re.request('g'+'et', tncode._currentUrl() + arr.join("") +
            "t"+"n_"+"c=" + mdfive(x).slice(0, 6) +
            "&t"+"n_"+"w=" + mdfive(y).slice(0, 6) +
            "&t"+"n_"+"u=" + mdfive(offset).slice(0, 6) +
            "&t"+"n_"+"s=" + mdfive(token).slice(0, 6) +
            "&t"+"n_"+"p=" + mdfive(user).slice(0, 6) +
            "&t"+"n_"+"c=" + mdfive(tncode._mark_w).slice(0, 6) +
            "&t"+"n_"+"r=" + mdfive(tncode._mark_offset).slice(0, 6) +
            "&t"+"n_"+"k=" + mdfive(tncode._mark_h).slice(0, 6) +
            "&x=" + x +
            "&y=" + y +
            "&o"+"f"+"f"+"s"+"e"+"t"+"=" + offset +
            "&t"+"o"+"k"+"e"+"n"+"=" + token +
            "&u=" + user, haddle);
    },
    _bycrept: function () {
        return mdfive(tncode._mark_offset).slice(0, 6)
    },
    _param: function (num) {
        return Math.ceil(Math.random() * num);
    },
    _send_result_success: function (responseText, responseXML) {
        tncode._doing = false;
        // if (responseText == 'ok') {
        if (JSON.parse(responseText).status==0) {
            tncode._tncode.innerHTML = '√验证成功';
            tncode._showmsg('√验证成功', 1);
            tncode._result = true;
            document.getElementByClassName('hgroup').style.display = "block";
            setTimeout(tncode.hide, 1500);
            setTimeout(function () {
                if (tncode._onsuccess) {
                    tncode._onsuccess(JSON.parse(responseText)["data"]);
                }
            }, 2000);

        } else {
            var obj = document.getElementById('tncode_div');
            addClass(obj, 'dd');
            setTimeout(function () {
                removeClass(obj, 'dd');
            }, 200);
            tncode._result = false;
            tncode._showmsg('验证失败');
            tncode._err_c++;
            if (tncode._err_c > 5) {
                tncode.refresh();
            }
        }
    },
    _send_result_failure: function (xhr, status) {
        console.log(435432)
    },
    _draw_fullbg: function () {
        var canvas_bg = document.getElementByClassName('tncode_canvas_bg');
        var ctx_bg = canvas_bg.getContext('2d');
        ctx_bg.drawImage(tncode._img, 0, tncode._img_h * 2, tncode._img_w, tncode._img_h, 0, 0, tncode._img_w, tncode._img_h);
    },
    _draw_bg: function () {
        if (tncode._is_draw_bg) {
            return;
        }
        tncode._is_draw_bg = true;
        var canvas_bg = document.getElementByClassName('tncode_canvas_bg');
        var ctx_bg = canvas_bg.getContext('2d');
        ctx_bg.drawImage(tncode._img, 0, 0, tncode._img_w, tncode._img_h, 0, 0, tncode._img_w, tncode._img_h);
    },
    _draw_mark: function () {
        var canvas_mark = document.getElementByClassName('tncode_canvas_mark');
        var ctx_mark = canvas_mark.getContext('2d');
        //清理画布
        ctx_mark.clearRect(0, 0, canvas_mark.width, canvas_mark.height);
        ctx_mark.drawImage(tncode._img, 0, tncode._img_h, tncode._mark_w, tncode._img_h, tncode._mark_offset, 0, tncode._mark_w, tncode._img_h);
        var imageData = ctx_mark.getImageData(0, 0, tncode._img_w, tncode._img_h);
        // 获取画布的像素信息
        // 是一个一维数组，包含以 RGBA 顺序的数据，数据使用  0 至 255（包含）的整数表示
        // 如：图片由两个像素构成，一个像素是白色，一个像素是黑色，那么 data 为
        // [255,255,255,255,0,0,0,255]
        // 这个一维数组可以看成是两个像素中RBGA通道的数组的集合即:
        // [R,G,B,A].concat([R,G,B,A])
        var data = imageData.data;
        //alert(data.length/4);
        var x = tncode._img_h, y = tncode._img_w;
        for (var j = 0; j < x; j++) {
            var ii = 1, k1 = -1;
            for (var k = 0; k < y && k >= 0 && k > k1;) {
                // 得到 RGBA 通道的值
                var i = (j * y + k) * 4;
                k += ii;
                var r = data[i]
                    , g = data[i + 1]
                    , b = data[i + 2];
                // 我们从最下面那张颜色生成器中可以看到在图片的右上角区域，有一小块在
                // 肉眼的观察下基本都是白色的，所以我在这里把 RGB 值都在 245 以上的
                // 的定义为白色
                // 大家也可以自己定义的更精确，或者更宽泛一些
                if (r + g + b < 200) data[i + 3] = 0;
                else {
                    var arr_pix = [1, -5];
                    var arr_op = [250, 0];
                    for (var i = 1; i < arr_pix[0] - arr_pix[1]; i++) {
                        var iiii = arr_pix[0] - 1 * i;
                        var op = parseInt(arr_op[0] - (arr_op[0] - arr_op[1]) / (arr_pix[0] - arr_pix[1]) * i);
                        var iii = (j * y + k + iiii * ii) * 4;
                        data[iii + 3] = op;
                    }
                    if (ii == -1) {
                        break;
                    }
                    k1 = k;
                    k = y - 1;
                    ii = -1;
                }
                ;
            }
        }
        ctx_mark.putImageData(imageData, 0, 0);
    },
    _reset: function () {
        tncode._mark_offset = 0;
        tncode._draw_bg();
        tncode._draw_mark();
        var obj = document.getElementByClassName('slide_block');
        obj.style.cssText = "transform: translate(0px, 0px)";
    },
    show: function () {
        var obj = document.getElementByClassName('hgroup');
        if (obj) {
            obj.style.display = "none";
        }
        tncode.refresh();
        tncode._tncode = this;
        document.getElementById('tncode_div_bg').style.display = "block";
        document.getElementById('tncode_div').style.display = "block";
    },
    abortHide: function (){
        //console.log(325345)
        tncode.hide()
        if (tncode._onclose) {
            tncode._onclose();
        }
    },
    hide: function () {
        document.getElementById('tncode_div_bg').style.display = "none";
        document.getElementById('tncode_div').style.display = "none";
    },
    _showmsg: function (msg, status) {
        if (!status) {
            status = 0;
            var obj = document.getElementByClassName('tncode_msg_error');
        } else {
            var obj = document.getElementByClassName('tncode_msg_ok');
        }
        obj.innerHTML = msg;
        var setOpacity = function (ele, opacity) {
            if (ele.style.opacity != undefined) {
                ///兼容FF和GG和新版本IE
                ele.style.opacity = opacity / 100;

            } else {
                ///兼容老版本ie
                ele.style.filter = "alpha(opacity=" + opacity + ")";
            }
        };

        function fadeout(ele, opacity, speed) {
            if (ele) {
                var v = ele.style.filter.replace("alpha(opacity=", "").replace(")", "") || ele.style.opacity || 100;
                v < 1 && (v = v * 100);
                var count = speed / 1000;
                var avg = (100 - opacity) / count;
                var timer = null;
                timer = setInterval(function () {
                    if (v - avg > opacity) {
                        v -= avg;
                        setOpacity(ele, v);
                    } else {
                        setOpacity(ele, 0);
                        if (status == 0) {
                            tncode._reset();
                        }
                        clearInterval(timer);
                    }
                }, 100);
            }
        }

        function fadein(ele, opacity, speed) {
            if (ele) {
                var v = ele.style.filter.replace("alpha(opacity=", "").replace(")", "") || ele.style.opacity;
                v < 1 && (v = v * 100);
                var count = speed / 1000;
                var avg = count < 2 ? (opacity / count) : (opacity / count - 1);
                var timer = null;
                timer = setInterval(function () {
                    if (v < opacity) {
                        v += avg;
                        setOpacity(ele, v);
                    } else {
                        clearInterval(timer);
                        setTimeout(function () {
                            fadeout(obj, 0, 6000);
                        }, 1000);
                    }
                }, 100);
            }
        }

        fadein(obj, 80, 4000);
    },
    _html: function () {
        var d = document.getElementById('tncode_div_bg');
        if (d) return;
        var html = '<div class="tncode_div_bg" id="tncode_div_bg"></div><div class="tncode_div" id="tncode_div"><div class="loading">加载中</div><canvas class="tncode_canvas_bg"></canvas><canvas class="tncode_canvas_mark"></canvas><div class="hgroup"></div><div class="tncode_msg_error"></div><div class="tncode_msg_ok"></div><div class="slide"><div class="slide_block"></div><div class="slide_block_text">拖动左边滑块完成上方拼图</div></div><div class="tools"><div class="tncode_close"></div><div class="tncode_refresh"></div><div class="tncode_tips"><a href="http:\/\/www.wochacha.com" target=_blank>wcc</a></div></div></div>';
        var bo = document.getElementsByTagName('body');
        appendHTML(bo[0], html);
    },
    _currentUrl: function () {
        // var list = document.getElementsByTagName('script');
        // for (var i in list) {
        //     var d = list[i];
        //     if (d.src.indexOf('mycaptcha') !== -1) {//js文件名一定要带这个字符
        //         var arr = d.src.split('mycaptcha');
        //         return arr[0];
        //     }
        // }
        return "/Admin/Captcha/";
    },
    refresh: function () {
        var isSupportWebp = !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
        var _this = this;
        tncode._err_c = 0;
        tncode._is_draw_bg = false;
        tncode._result = false;
        tncode._img_loaded = false;
        var obj = document.getElementByClassName('tncode_canvas_bg');
        obj.style.display = "none";
        obj = document.getElementByClassName('tncode_canvas_mark');
        obj.style.display = "none";
        tncode._img = new Image();
        var img_url = tncode._currentUrl() + "getcaptcha?t=" + Math.random();
        if (!isSupportWebp) {//浏览器不支持webp
            img_url += "&nowebp=1";
        }
        tncode._img.src = img_url;
        tncode._img.onload = function () {
            tncode._draw_fullbg();
            var canvas_mark = document.getElementByClassName('tncode_canvas_mark');
            var ctx_mark = canvas_mark.getContext('2d');
            //清理画布
            ctx_mark.clearRect(0, 0, canvas_mark.width, canvas_mark.height);
            tncode._img_loaded = true;
            obj = document.getElementByClassName('tncode_canvas_bg');
            obj.style.display = "";
            obj = document.getElementByClassName('tncode_canvas_mark');
            obj.style.display = "";
        };
        //alert("Hong Kong ForHarvest Technology and Culture Development Co. Limited".length);
        obj = document.getElementByClassName('slide_block');
        obj.style.cssText = "transform: translate(0px, 0px)";
        obj = document.getElementByClassName('slide_block_text');
        obj.style.display = "block";
    },
    init: function () {
        var _this = this;
        if (!tncode._img) {
            tncode._html();
            var obj = document.getElementByClassName('slide_block');

            tncode._bind(obj, 'mousedown', _this._block_start_move);
            tncode._bind(document, 'mousemove', _this._block_on_move);
            tncode._bind(document, 'mouseup', _this._block_on_end);

            tncode._bind(obj, 'touchstart', _this._block_start_move);
            tncode._bind(document, 'touchmove', _this._block_on_move);
            tncode._bind(document, 'touchend', _this._block_on_end);

            var obj = document.getElementByClassName('tncode_close');
            tncode._bind(obj, 'touchstart', _this.abortHide);
            tncode._bind(obj, 'click', _this.abortHide);
            var obj = document.getElementByClassName('tncode_refresh');

            tncode._bind(obj, 'touchstart', _this.refresh);
            tncode._bind(obj, 'click', _this.refresh);


            var objs = document.getElementByClassName('tncode', -1);
            for (var i in objs) {
                var o = objs[i];
                o.innerHTML = '点击按钮进行验证';
                tncode._bind(o, 'touchstart', _this.show);
                tncode._bind(o, 'click', _this.show);
            }
        }
    },
    result: function () {
        return tncode._result;
    },
    onsuccess: function (fn) {
        tncode._onsuccess = fn;
    },
    onclose: function (fn) {
        tncode._onclose = fn;
    }
};

function _param(num) {
    return Math.ceil(Math.random() * num);
}

function parmsData(_mark_offset) {
    var arr = ["ch","e","ck","?"];
    var x = tncode._param(1828);
    var y = tncode._param(3228);
    var offset = tncode._param(55528);
    var token = mdfive(tncode._param(77528));
    var user = mdfive(tncode._param(961828));
    var params = tncode._currentUrl() + arr.join("") +
        "t"+"n_"+"c=" + mdfive(x).slice(0, 6) +
        "&t"+"n_"+"w=" + mdfive(y).slice(0, 6) +
        "&t"+"n_"+"u=" + mdfive(offset).slice(0, 6) +
        "&t"+"n_"+"s=" + mdfive(token).slice(0, 6) +
        "&t"+"n_"+"p=" + mdfive(user).slice(0, 6) +
        "&t"+"n_"+"c=" + mdfive(tncode._mark_w).slice(0, 6) +
        "&t"+"n_"+"r=" + mdfive(_mark_offset).slice(0, 6) +
        "&t"+"n_"+"k=" + mdfive(tncode._mark_h).slice(0, 6) +
        "&x=" + x +
        "&y=" + y +
        "&o"+"f"+"f"+"s"+"e"+"t"+"=" + offset +
        "&t"+"o"+"k"+"e"+"n"+"=" + token +
        "&u=" + user;
    return params
}

console.log(parmsData(50))