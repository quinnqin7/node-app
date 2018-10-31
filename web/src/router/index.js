import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */

import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/

export const constantRouterMap = [
    {path: '/login', component: () => import('@/views/login/index'), hidden: true},
    {path: '/register', component: () => import('@/views/register/index'), hidden: true},
    {path: '/404', component: () => import('@/views/404'), hidden: true},



]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})

export const asyncRouterMap = [


    //ENTERPRISE ROUTER


    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        hidden: true,
        meta: {
            role:['2']
        },
        children: [{
            path: 'dashboard',
            component: () => import('@/views/dashboard/enterprise'),
            meta: {
                role:['2']
            },
        }]
    },
    {
        path: '/Patients',
        component: Layout,
        meta: {
            role:['2']
        },
        children: [
            {
                path: 'Patients',
                name: 'Patients',
                component: () => import('@/views/Patients/index'),
                meta: {title: 'router.patients', icon: 'table', role:['2']}
            }
        ]
    },
    {
        path: '/Schedule',
        component: Layout,
        meta: {
            role:['2']
        },
        children: [
            {
                path: 'Schedule',
                name: 'Schedule',
                component: () => import('@/views/table/index'),
                meta: {title: 'router.schedule', icon: 'table', role:['2']}
            }
        ]
    },
    {
        path: '/appointment',
        component: Layout,
        meta: {
            role:['2']
        },
        children: [
            {
                path: 'appointment',
                name: 'appointment',
                component: () => import('@/views/appointment/enterprise/index'),
                meta: {title: 'router.appointment', icon: 'table', role:['2']}
            }
        ]
    },
    {
        path: '/Analysis',
        component: Layout,
        meta: {
            role:['2']
        },
        children: [
            {
                path: 'Analysis',
                name: 'table',
                component: () => import('@/views/table/index'),
                meta: {title: 'router.analysis', icon: 'table', role:['2']}
            }
        ]
    },
    {
        path: '/mine',
        component: Layout,
        meta: {
            role:['2']
        },
        children: [
            {
                path: 'mine',
                name: 'mine',
                component: () => import('@/views/mine/enterprise/index'),
                meta: {title: 'router.mine', icon: 'table', role:['2']}
            }
        ]
    },





    // DOCTOR ROUTER



    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        hidden: true,
        meta: {
            role:['1']
        },
        children: [{
            path: 'dashboard',
            component: () => import('@/views/dashboard/doctor'),
            meta: {
                role:['1']
            },
        }]
    },
    {
        path: '/Home',
        component: Layout,
        meta: {
            role:['1']
        },
        children: [
            {
                path: 'Home',
                name: 'Home',
                component: () => import('@/views/dashboard/doctor'),
                meta: {title: 'router.home', icon: 'table', role:['1']}
            }
        ]
    },
    {
        path: '/Analysis',
        component: Layout,
        meta: {
            role:['1']
        },
        children: [
            {
                path: 'Analysis',
                name: 'Analysis',
                component: () => import('@/views/table/index'),
                meta: {title: 'router.analysis', icon: 'table', role:['1']}
            }
        ]
    },
    {
        path: '/EnterpriseInfo',
        component: Layout,
        meta: {
            role:['1']
        },
        children: [
            {
                path: 'EnterpriseInfo',
                name: 'EnterpriseInfo',
                component: () => import('@/views/enterprise/index'),
                meta: {title: 'router.enterpriseInfo', icon: 'table', role:['1']}
            },
            {
                path: 'enterpriseShowPatient/:enterpriseId',
                name: 'enterpriseShowPatient',
                hidden: true,
                component: () => import('@/views/Patients/index'),
                meta: {title: 'router.enterpriseShowPatient', icon: 'table', role:['1']}
            }
        ]
    },
    {
        path: '/Schedule',
        component: Layout,
        meta: {
            role:['1']
        },
        children: [
            {
                path: 'Schedule',
                name: 'Schedule',
                component: () => import('@/views/table/index'),
                meta: {title: 'router.schedule', icon: 'table', role:['1']}
            }
        ]
    },

    {
        path: '/appointment',
        component: Layout,
        meta: {
            role:['1']
        },
        children: [
            {
                path: 'appointment',
                name: 'appointment',
                component: () => import('@/views/table/index'),
                meta: {title: 'router.appointment', icon: 'table', role:['1']}
            }
        ]
    },
    {
        path: '/mine',
        component: Layout,
        meta: {
            role:['1']
        },
        children: [
            {
                path: 'mine',
                name: 'mine',
                component: () => import('@/views/mine/doctor/index'),
                meta: {title: 'router.mine', icon: 'table', role:['1']}
            }
        ]
    },
    {path: '*', redirect: '/404', hidden: true}
];

// {
//     path: '/nested',
//         component: Layout,
//     redirect: '/nested/menu1',
//     name: 'Nested',
//     meta: {
//     title: 'Nested',
//         icon: 'nested',
//         role:['2']
// },
//     children: [
//         {
//             path: 'menu1',
//             component: () => import('@/views/nested/menu1/index'), // Parent router-view
//             name: 'Menu1',
//             meta: {title: 'Menu1', role:['2']},
//             children: [
//                 {
//                     path: 'menu1-1',
//                     component: () => import('@/views/nested/menu1/menu1-1'),
//                     name: 'Menu1-1',
//                     meta: {title: 'Menu1-1'}, role:['2']
//                 },
//                 {
//                     path: 'menu1-2',
//                     component: () => import('@/views/nested/menu1/menu1-2'),
//                     name: 'Menu1-2',
//                     meta: {title: 'Menu1-2', role:['2']},
//                     children: [
//                         {
//                             path: 'menu1-2-1',
//                             component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
//                             name: 'Menu1-2-1',
//                             meta: {title: 'Menu1-2-1',role:['2']}
//                         },
//                         {
//                             path: 'menu1-2-2',
//                             component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
//                             name: 'Menu1-2-2',
//                             meta: {title: 'Menu1-2-2',role:['2']}
//                         }
//                     ]
//                 },
//                 {
//                     path: 'menu1-3',
//                     component: () => import('@/views/nested/menu1/menu1-3'),
//                     name: 'Menu1-3',
//                     meta: {title: 'Menu1-3',role:['2']}
//                 }
//             ]
//         },
//         {
//             path: 'menu2',
//             component: () => import('@/views/nested/menu2/index'),
//             meta: {title: 'menu2',role:['2']}
//         }
//     ]
// },



// {
//     path: '/example',
//         component: Layout,
//     redirect: '/example/table',
//     name: 'Example',
//     meta: {title: 'Example', icon: 'example', role: ['1']},
//     children: [
//         {
//             path: 'table',
//             name: 'Table',
//             component: () => import('@/views/table/index'),
//             meta: {title: 'Table', icon: 'table',role: ['1']}
//         },
//         {
//             path: 'tree',
//             name: 'Tree',
//             component: () => import('@/views/tree/index'),
//             meta: {title: 'Tree', icon: 'tree',role: ['1']}
//         }
//     ]
// },
//
// {
//     path: 'external-link',
//         component: Layout,
//     children: [
//     {
//         path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
//         meta: {title: 'External Link', icon: 'link'}
//     }
// ]
// },
