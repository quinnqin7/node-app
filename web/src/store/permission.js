import { asyncRouterMap, constantRouterMap } from '../router';
import store from './index'
function hasPermission(roles, route) {
    if (route.meta && route.meta.role) {
        return roles.some(role => route.meta.role.indexOf(role) >= 0)
    } else {
        return true
    }
}

const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers);
        }
    },
    actions: {
        GenerateRoutes({ commit },data) {
            return new Promise(resolve => {
                const {roles} = data;
                //console.log(roles)
                const accessedRouters = asyncRouterMap.filter(v => {
                    //if you want to set admin role in the system you can tkof //and set the res-> roles:['admin']
                    //if (roles.indexOf('admin') >= 0) return true;
                    //这边注释掉 是因为 , 超级管理员会拥有所有 路由 ,但现实 是 根本 不需要,还是 在新建一个角色 然后 ,写不同的服务端
                    if (hasPermission(roles, v)) {
                        if (v.children && v.children.length > 0) {
                            v.children = v.children.filter(child => {
                                if (hasPermission(roles, child)) {
                                    return child
                                }
                                return false;
                            });
                            return v
                        } else {
                            return v
                        }
                    }
                    return false;
                });
                commit('SET_ROUTERS', accessedRouters);
                resolve();
            })
        }
    }
};
export default permission;
