# 破解提示

## 破解目标

- https://login.189.cn/web/login  登陆的过程 对密码加密进行破解  
- 首都航空招聘网站

## 破解参数

- `Password` 登陆过程的密码加密

## 破解提示

1. 打开开发者工具抓包 抓取在登陆过程中的资源包  POST请求

2. 加密参数是: Password : ZzV33GlgWGeZDIq1mzJI/A==

3. 在开发者工具中搜索 Password 找到 `js` 文件 `loginNew.min.js` 在这个文件中的第499-500行之间

4. 在第三步找到 `valAesEncryptSet` 这个函数 然后定位进去 找到这个函数所在的文件 `jquery.fn-aes.min.js`

5. 不断的断点调试 可以找到一个新的文件 `aes.min.js` 该文件就是加密的核心 加密库

6. 抠出需要加密的 `js` 代码即可。下面就是扣除相关的代码。

## 破解时间

- 2019年8月11日21:04:32

## 联系邮箱

- scrapy@qq.com