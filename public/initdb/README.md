
```npm install``` #安装 mongoose 和 mockjs 依赖 ,还有一个bcrypt 和 node-gyp 不信自己看

``` node generate.js --help``` 查看全部帮助


```node generate.js -a 10 ``` #生成十个随机用户,不管企业或者医师


```node generate.js -a 1 admin``` #生成一个管理员

```node generate.js -g``` (未测试)生成用户数据,以及企业病人数据,默认是100个病人,要改成100个请去Generate.js 文件第34行更改 人数

```node generate.js -d``` (未测试)删除全部数据
