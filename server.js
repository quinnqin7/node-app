const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const passport = require("passport")
const app = express()
const api = require("./web/src/api/path")
const doctor = require("./routes/api/doctor")
// 引入users.js
const users = require("./routes/api/users")
const enterprise = require("./routes/api/enterprise")

//DB config
const db = require("./config/keys").mongoURI

//使用body-parser中间件
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//connect to mongodb
mongoose.connect(db,{ useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))

//passport初始化
app.use(passport.initialize())
require("./config/passport")(passport)

//使用routes
// FIX 和前端 调用一样的接口文件 --> ./vue-admin-template/src/api/login.js
app.use(api.pathFilter(api.path.user.login,1), users)
app.use("/api/enterprise", enterprise)
app.use("/api/doctor", doctor)




const port = process.env.PORT || 3000 //设置端口号

app.listen(port, () => {
    console.log('Server running on port 3000 ')
})
