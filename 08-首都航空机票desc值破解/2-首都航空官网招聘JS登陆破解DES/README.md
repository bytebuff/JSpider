# 破解提示

## 破解目标

- http://hr.hnagroup.com/Portal/Account/Login?returnUrl=%2F  
- 首都航空招聘网站

## 破解参数

- `Password` 登陆过程的密码加密

## 破解提示

1. 抓包 找到需要的请求
2. 全局搜索 `Password` 参数 具体的代码在 `searchFlight.js` (544行左右)
3. 断点调试 不断找到加密的位置 其实在: `http://hr.hnagroup.com/Portal/Account/Login?returnUrl=%2F` 这个源码里面。这个地方不好找 因为搜索不容易搜到 它也不是能直接搜到的 要一步步断点调试 才能找到这个位置
4. 抠出相关代码 有`CryptoJS`关键字 所以找到`CryptoJS`文件 全部复制即可
5. 注意: 在加密的过程中有两个参数是在上一个请求中获取的 所以需要提前发出一个请求

## 破解时间

- 2019年8月16日17:44:06

## 联系邮箱

- scrapy@qq.com