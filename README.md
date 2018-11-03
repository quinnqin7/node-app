# 项目简介

  本项目在 [nvm] 安装的 [Nodejs8.12](https://nodejs.org/zh-cn/) 环境下开发, 语言 JavaScript [es6](http://es6.ruanyifeng.com)

> 使用框架

* 后台: [express4.16.4],
* 前端: [vue2.5], [vue-admin-template], [element-ui]

> 使用数据库

* [mongodb V4.0.2]
  * 使用 [mongoose] 进行 后台 与 数据库 的对接

> 开发部署

* 前端使用 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 进行打包发布

# 本地启动项目
1. mongodb 数据库使用验证的方式启动 或者 你可以使用在-> config/keys.js 修改链接 进行无验证 连接数据库

2. ```git clone https://github.com/quinnqin7/node-app.git```
  * 如果这个项目在分支的话,请,(不然直接跳到第3.)
  * ```cd node-app```
  * ```git branch -a``` #查看远程分支
  * ```git checkout -b transplant-node-app origin/transplant-node-app``` # 切换到本分支
  * 如果你是用 zsh 的话就会看到如下
  * ![''](./docs/images/gitcheckout.png)

3. ```cd node-app ; npm install; cd ../web; npm install``` (加载依赖)
4. 在 node-app项目根目录下 ```npm run dev``` (前端和后台一起启动)
5. 默认是在 localhost ,如果要修改  请全局 搜索 localhost 关键字 进行修改, 域名访问请修改 直接 改成域名 不要 用 公网 ip (不然访问首页会爆 [Invalid Host Header](https://tonghuashuo.github.io/blog/webpack-dev-server-invalid-host-header.html) 错误)
6. 最好使用 [pm2](http://pm2.keymetrics.io) 启动项目,而且是 前后端 分开 启动 ,不然 不知道 什么 时候 ,你 的 相关node 进程 就会莫名其妙的消失😁 ,至少我是这样

# 数据库模型

<iframe
    height=450
    width=800
    src="https://www.draw.io/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1#R7Vzbcts2EP0aPapDkaIuj7bqNJ42E0%2BTaZunDkSuKMQkwYCQLeXruyDB%2B0WUda%2FlPIQ8WALLxWLPLkC7Z8y89W%2BcBMtPzAa3p2v2umf82tP1wWhq4H8S2SjEHJkx4nBqKywDvtCfoEBNoStqQ1gQFIy5ggZF0GK%2BD5YoYIRz9loUWzC3OGpAHKgAXyziVtG%2FqS2WCh1oWtbwEaizVENPTNUwJ9azw9nKV%2BP1dGMR%2FcTNHkn6UvLhktjsNQcZDz1jxhkT8ZW3noErjZuYLX7uQ0NrqjcHX3R6YKr0EJvk3cFGU6hbxsWSOcwn7kOG3kfvB7IHDe%2BWwnPxcoCX30GIjZpNshIMoayHPxgLlFw8phyoUW0FhWzFLSWFmhk6LDSdjBdDtHk%2F8QzCHUgeG6RGRO8E5oHgG5Th4BJBX4rjEeUlTiqXWQovlLHqDacP%2F1%2BGm%2B5pt%2BjRO87JJicQMOqLMNfzkwRQQEWKvj5RZlSBwhhopUmIu8ymJNWt2yyZh5wltDHf%2FCPxX7TxKAG%2BxYA2TYAn4BR1BK56OP%2FkDrQ9Z7fzqmhQ5oW4K0gi4shFte5t%2BlKYmNGPlQx693O27of0J%2FWdnnEnIyrjNvA%2BwngTWUl7jUOybI0ispm25MOvbMbwC0P5L5UIiG2nfevBOhsYr5xIMWYJxhM18Y0jTeO2BBVkjmrXqd%2Bs24L5Qr4ZqFbw8mNrFloyVS7XoV6RCgNilaW06nukus4Z8nAZ5BXETpCn33Mvn8FVwX%2BpvCQeOvC9Pw%2BDWMXP8%2B9IyY92aycSrKrQolSCzCsyW5RccPixAt%2Fa1KgaCi4NWelaRPlMUytOEocwbJHAIMeZvbKgRQajxAJ7ocxvEfKJ19bHjkapNboE6zxE4rGXJ3gpkL4AFxRTpjuXOj5CQgaye6LuXFjIpxhKLdwow1lQGTby8bQYaNNUSN5YzKOWunbJHNz7dGXPmMtkaPWZL6M12oY9QwLigtein7Qlyd%2FkgFKFnKTKzBDHpfmBeNSVNPQXcJv4RMEqbg90dV83UGOcliaCdQ6qhuCECY2pVmDC5PY1Sz%2FT7HiZyzwHI23%2FsD0%2BKEuuqYhJ0lR335IZRk4SdzI9R8ByCXq%2FlcAfIu94QzK0Kz3qtTS7b%2BZTSW0Mszifw9I0xfSsHspmatcMaqKZhWHGpXR%2Fi1bjA6db%2BlHSrfTmW%2BpWJ86p9HPmVKNzVBptxj%2BeUSsyk6Mszsm4uAxG4%2BOszqleGkdtgxxsvTWY9JrSbXQZ4E%2BchnBLuTum3JeWYvsrbw788%2BIJWOBW89XDardFlwTBGfMLLhZwhj42IwIcJmND2lteslwjHPNFdjZzGIBFifuRcK%2BlJsjVO%2BecBxs84ttPHLYXOftWW7VF0q0Auq4CqJzI6lrXAmhygAKoQqTD6yNSDugzctG9Yx59c2y9SF5d0lAgVz0eX7VtwZxZz8Br9cheKud%2FjaHa4cQ%2BdoKws5l3fPBGIhdLIn2jVHCZepVFUsIosMjgGCxiXh%2BLrEKsxl7fM4fsWYtlUQQzYFrNbE8auIPXajQ%2BqQKc7VUQ3sLqJYRVfVSMqv1xx6g6PUBQHRz0cOLE%2B8aTmn3jk32h0qDMNbFRgCaRBr%2Bx0d5sdJbwn23ubikethx0O4DLmbcIzCmuYmy3iYBq6xKIK5aPfrjixLfgzrLQLcWbt6T2Y9Ubp10Cp5mTUqVQc%2BBeXymYx6gUUjbZheXqP00ze%2FkDOxndSbiMJn3QYW5zJ%2FQPf8pq%2FnPUgOsvg1H2K%2FtE%2FE33mSx5aeMEHvtYPvuENzmXN0rTGfN55eivQ08dDxEPcc43MGq4fD%2F%2FaZjfRo9od6S3uUXzpyNN%2Fv3270BqPpNsqt%2B3OmU%2BZmh1MSMB9%2FRe0yi6nFGORV2dd1TqSC93dDjfnV5f1hl%2FAfoJwlD%2BmsD7zT13TCIvfTcdQ9e5T6c7baSr4%2BrtSTNxOLRlzRwWq7BNQNAo684nzbe9%2BFuCnZimkk3XsGzzplEpPUo3kU6TYBvXs2uUHD0c8tdxOu%2BuaddKz1%2BAv1ALvkYh7N1S9MG2h6I8%2F%2Bh8sHW7yP56ZhVi58oR71Z%2Bvu0DXTNNDUu%2Fd5FS0klOjAeTK6KpLhXz8FS8dYW%2FWKg%2B55mR26fOXSKxR6g%2Fw7eC1p36cOU4EFYlzksaZ%2FpOq3PlqM7VtkjtlQ7c6O0S6K1f2uhLN%2F620pu%2BO73hbfaXK%2BKtwuzvgxgP%2FwE%3D"
    frameborder=0
    allowfullscreen>
</iframe>

<embed width="100%" height="800" src='https://www.draw.io/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1#R7Vzbcts2EP0aPapDkaIuj7bqNJ42E0%2BTaZunDkSuKMQkwYCQLeXruyDB%2B0WUda%2FlPIQ8WALLxWLPLkC7Z8y89W%2BcBMtPzAa3p2v2umf82tP1wWhq4H8S2SjEHJkx4nBqKywDvtCfoEBNoStqQ1gQFIy5ggZF0GK%2BD5YoYIRz9loUWzC3OGpAHKgAXyziVtG%2FqS2WCh1oWtbwEaizVENPTNUwJ9azw9nKV%2BP1dGMR%2FcTNHkn6UvLhktjsNQcZDz1jxhkT8ZW3noErjZuYLX7uQ0NrqjcHX3R6YKr0EJvk3cFGU6hbxsWSOcwn7kOG3kfvB7IHDe%2BWwnPxcoCX30GIjZpNshIMoayHPxgLlFw8phyoUW0FhWzFLSWFmhk6LDSdjBdDtHk%2F8QzCHUgeG6RGRO8E5oHgG5Th4BJBX4rjEeUlTiqXWQovlLHqDacP%2F1%2BGm%2B5pt%2BjRO87JJicQMOqLMNfzkwRQQEWKvj5RZlSBwhhopUmIu8ymJNWt2yyZh5wltDHf%2FCPxX7TxKAG%2BxYA2TYAn4BR1BK56OP%2FkDrQ9Z7fzqmhQ5oW4K0gi4shFte5t%2BlKYmNGPlQx693O27of0J%2FWdnnEnIyrjNvA%2BwngTWUl7jUOybI0ispm25MOvbMbwC0P5L5UIiG2nfevBOhsYr5xIMWYJxhM18Y0jTeO2BBVkjmrXqd%2Bs24L5Qr4ZqFbw8mNrFloyVS7XoV6RCgNilaW06nukus4Z8nAZ5BXETpCn33Mvn8FVwX%2BpvCQeOvC9Pw%2BDWMXP8%2B9IyY92aycSrKrQolSCzCsyW5RccPixAt%2Fa1KgaCi4NWelaRPlMUytOEocwbJHAIMeZvbKgRQajxAJ7ocxvEfKJ19bHjkapNboE6zxE4rGXJ3gpkL4AFxRTpjuXOj5CQgaye6LuXFjIpxhKLdwow1lQGTby8bQYaNNUSN5YzKOWunbJHNz7dGXPmMtkaPWZL6M12oY9QwLigtein7Qlyd%2FkgFKFnKTKzBDHpfmBeNSVNPQXcJv4RMEqbg90dV83UGOcliaCdQ6qhuCECY2pVmDC5PY1Sz%2FT7HiZyzwHI23%2FsD0%2BKEuuqYhJ0lR335IZRk4SdzI9R8ByCXq%2FlcAfIu94QzK0Kz3qtTS7b%2BZTSW0Mszifw9I0xfSsHspmatcMaqKZhWHGpXR%2Fi1bjA6db%2BlHSrfTmW%2BpWJ86p9HPmVKNzVBptxj%2BeUSsyk6Mszsm4uAxG4%2BOszqleGkdtgxxsvTWY9JrSbXQZ4E%2BchnBLuTum3JeWYvsrbw788%2BIJWOBW89XDardFlwTBGfMLLhZwhj42IwIcJmND2lteslwjHPNFdjZzGIBFifuRcK%2BlJsjVO%2BecBxs84ttPHLYXOftWW7VF0q0Auq4CqJzI6lrXAmhygAKoQqTD6yNSDugzctG9Yx59c2y9SF5d0lAgVz0eX7VtwZxZz8Br9cheKud%2FjaHa4cQ%2BdoKws5l3fPBGIhdLIn2jVHCZepVFUsIosMjgGCxiXh%2BLrEKsxl7fM4fsWYtlUQQzYFrNbE8auIPXajQ%2BqQKc7VUQ3sLqJYRVfVSMqv1xx6g6PUBQHRz0cOLE%2B8aTmn3jk32h0qDMNbFRgCaRBr%2Bx0d5sdJbwn23ubikethx0O4DLmbcIzCmuYmy3iYBq6xKIK5aPfrjixLfgzrLQLcWbt6T2Y9Ubp10Cp5mTUqVQc%2BBeXymYx6gUUjbZheXqP00ze%2FkDOxndSbiMJn3QYW5zJ%2FQPf8pq%2FnPUgOsvg1H2K%2FtE%2FE33mSx5aeMEHvtYPvuENzmXN0rTGfN55eivQ08dDxEPcc43MGq4fD%2F%2FaZjfRo9od6S3uUXzpyNN%2Fv3270BqPpNsqt%2B3OmU%2BZmh1MSMB9%2FRe0yi6nFGORV2dd1TqSC93dDjfnV5f1hl%2FAfoJwlD%2BmsD7zT13TCIvfTcdQ9e5T6c7baSr4%2BrtSTNxOLRlzRwWq7BNQNAo684nzbe9%2BFuCnZimkk3XsGzzplEpPUo3kU6TYBvXs2uUHD0c8tdxOu%2BuaddKz1%2BAv1ALvkYh7N1S9MG2h6I8%2F%2Bh8sHW7yP56ZhVi58oR71Z%2Bvu0DXTNNDUu%2Fd5FS0klOjAeTK6KpLhXz8FS8dYW%2FWKg%2B55mR26fOXSKxR6g%2Fw7eC1p36cOU4EFYlzksaZ%2FpOq3PlqM7VtkjtlQ7c6O0S6K1f2uhLN%2F620pu%2BO73hbfaXK%2BKtwuzvgxgP%2FwE%3D'></embed>







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
[mongoose]:https://mongoosejs.com
[nvm]:https://github.com/creationix/nvm

