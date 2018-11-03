/*
 api 接口 统一在这里 管理

 */


var base_path = '/api'
exports.path = {
    //在这里直接添加api
    user: {
        'login': base_path + '/user/login'
    }
}

exports.host = {
    ip:"localhost",
    vueport:'9898'
}

// FUNCTION pathFilter 在服务端填写过滤路由的时候使用
/*
    path: 客户端请求的全部路径, 根据 level 返回一个子串
    如果传入 path.user.login     user 算一级路由
    如果在服务端是一级路由 level=1  => '/api/user'
    二级路由 level=2    => '/login'
    11.4 项目写到后面 基本弃用
 */
exports.pathFilter = function (path, level) {
    proPath = '/'
    subPath = path.split('/')
    subPath.splice(0, 2)  //去掉 客户端请求的 "api"
    if (level <= 1) {
        for (var i = 0; i < level; i++) {
            proPath += subPath[i]
        }
    } else {
        return '/' + subPath[level - 1]
    }

    return base_path + proPath
}
