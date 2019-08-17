# 破解提示

## 破解目标

- http://www.jdair.net/   
- 首都航空机票查询

## 破解参数

- 机票价格的请求中的查询字符串 

  ```tex
  desc -> coBPtm4BZy5Ly7E1arnljx2fxaOTQIVU/6HpTHGDpz0XYl/elXICeY115jwY6dt2 
  ```

- 在抓取机票价格的时候会遇到这个加密字段

## 破解提示

1. 抓包 找到需要的请求  找到加密字段desc     
2. 全局搜索 `desc` 参数 具体的代码在 `searchFlight.js` (544行左右)        
3. 断点调试 不断找到加密的位置 在 `ex_mouse.js` 文件里面        
4. 抠出相关代码 注意: document参数可以不要 `screen.colorDepth` 在我的电脑上是 24(直接写死) 不同电脑应该不一样        
5. 添加 `windows` 和 `navigator` 以及 `Json` 对象

## 破解时间

- 2019年8月16日16:40:41  

## 联系邮箱

- scrapy@qq.com