# 项目简介

> 使用框架

* 后台: [express4.16.4],
* 前端: [vue2.5], [vue-admin-template], [element-ui]

> 使用数据库

* [mongodb V4.0.2]









>
>
>













   (查看generate裏面註釋的使用方法)執行node generate.js 初始化數據庫
   现在 自动生成数据 出现问题,  病例生成少了 医生的 id

数据库 少一个 医生的个人简介字段



如果后台 异常了,没反应了,启动不了了
kill -15 `lsof -i tcp:3000 | grep node| awk '{print $2}'`

秦楠启动数据库
mongod --dbpath ~/WebstormProjects/mongo --logpath ~/WebstormProjects/mongo/mongo.log --auth --fork



********现存一个 bug ,可以接受 同一段时间 内两个不同企业 的预约


要做排班

注意 ：dialogData:{},


如需 要 暴露在公网
请修改  将已经在域名服务商解析好的域名 修改
web/config/dev.env.js
web/config/index.js
server.js



视频日志

https://drive.google.com/drive/u/2/folders/1RMLnDFYNtceEsNZJoIPSxv5St6bhNf9-






[vue-admin-template]:https://github.com/PanJiaChen/vue-admin-template/tree/master/src
[element-ui]:http://element-cn.eleme.io/#/zh-CN
[vue2.5]:https://cn.vuejs.org/index.html
[express4.16.4]:https://expressjs.com/zh-cn/
[mongodb V4.0.2]:https://www.mongodb.com
