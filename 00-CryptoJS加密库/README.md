# CryptoJS介绍

CryptoJS是一个纯JavaScript写的加密类库，支持常见的多种加密方式：

- MD5
- SHA-1
- SHA-256
- AES
- Rabbit
- MARC4
- HMAC
  - HMAC-MD5
  - HMAC-SHA1
  - HMAC-SHA256
- PBKDF2

# CryptoJS的使用

正常下载解压后会有两个文件夹：`rollups` 和 `components`

- `rollups`下面是整合后的js,每一个可以单独通过js引用使用. 
- `componets`下面包括所有的组件源码，以及各组件压缩后的js文件

```
下面均以MD5为例：
 1). 引用rollups下面的文件：
    <script src="你的文件路径/rollups/md5.js"></script>
    js代码：
    var md5 = CryptoJS.MD5("你想加密的内容");

 2). 引用components下面的文件：
    <script src="你的文件路径/components/core-min.js"></script>
    <script src="你的文件路径/components/md5-min.js"></script>
    js代码：
    var md5 = CryptoJS.MD5("你想加密的内容");
```

其实`rollups`下面的`md5.js` 就是整合了`components`文件夹下`core-min.js` 和`md5-min.js` 。这样方便只使用一种加密方式时，直接引用一个文件即可，如果你在一个页面中使用多个加密算法，则用第二种方式更好一些。

