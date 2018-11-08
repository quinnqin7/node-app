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
    {path: '/a', component: () => import('@/views/index'), hidden: true},
    {path: '/login', component: () => import('@/views/login/index'), hidden: true},
    {path: '/patientlogin', component: () => import('@/views/login/patient'), hidden: true},
    {path: '/register', component: () => import('@/views/register/index'), hidden: true},
    {path: '/mailjump/:token', component: () => import('@/views/mail/jump/index'), hidden: false},
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
    //首頁
    {
        path: '/Home',
        component: Layout,
        meta: {
            role:['2']
        },
        children: [
            {
                path: 'Home',
                name: 'Home',
                component: () => import('@/views/dashboard/enterprise'),
                meta: {title: 'router.home', icon: 'home', role:['2']}
            }
        ]
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
                meta: {title: 'router.schedule', icon: 'schedule', role:['2']}
            }
        ]
    },
    {
        path: '/appointment',
        component: Layout,
        meta: {
            title: 'router.appointment',
            role:['2'],
            icon: 'appointment',
        },
        children: [
            {
                path: 'appointment',
                name: 'appointment',
                component: () => import('@/views/appointment/enterprise/index'),
                meta: {title: 'router.appointment', icon: 'appointment', role:['2']}
            },
            {
                path: 'appointmentRefuse',
                name: 'appointmentRefuse',
                component: () => import('@/views/appointment/enterprise/refuse'),
                meta: {title: 'router.appointmentRefuse', icon: 'appointment', role:['2']}
            },
            {
                path: 'appointmentSign',
                name: 'appointmentSign',
                component: () => import('@/views/appointment/enterprise/sign'),
                meta: {title: 'router.appointmentSign', icon: 'appointment', role:['2']}
            },
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
                meta: {title: 'router.analysis', icon: 'chart', role:['2']}
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
                meta: {title: 'router.mine', icon: 'peoples', role:['2']}
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

    //首頁
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
                meta: {title: 'router.home', icon: 'home', role:['1']}
            }
        ]
    },

    //排班
    // {
    //     path: '/Schedule',
    //     component: Layout,
    //     meta: {
    //         role:['1']
    //     },
    //     children: [
    //         {
    //             path: 'Schedule',
    //             name: 'Schedule',
    //             component: () => import('@/views/table/index'),
    //             meta: {title: 'router.schedule', icon: 'schedule', role:['1']}
    //         }
    //     ]
    // },

    //預約
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
                component: () => import('@/views/appointment/doctor/index'),
                meta: {title: 'router.appointment', icon: 'appointment', role:['1']}
            }
        ]
    },

    //問診
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
                meta: {title: 'router.enterpriseInfo', icon: 'form', role:['1']}
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
                component: () => import('@/views/arrange/doctor/index'),
                meta: {title: 'router.schedule', icon: 'table', role:['1']}
            }
        ]
    },


    //統計
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
                component: () => import('@/views/Statistic/totalpatients'),
                meta: {title: 'router.analysis', icon: 'chart', role:['1']}
            }
        ]
    },

    //我的
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
                meta: {title: 'router.mine', icon: 'peoples', role:['1']}
            }
        ]
    },










//    ADMIN









    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        //hidden: true,
        meta: {
            title:'router.home',
            role:['4']
        },
        children: [{
            path: 'dashboard',
            component: () => import('@/views/dashboard/admin'),
            meta: {
                title:'router.home',
                role:['4'],
                icon: 'peoples',
            },
        }]
    },




//journal 公告
    {
        path: '/journal',
        component: Layout,
        meta: {
            title: 'router.journal',
            role:['4'],
            icon: 'peoples',
        },
        children: [
            {
                path: 'journaledit',
                name: 'journaledit',
                component: () => import('@/views/journal/edit'),
                meta: {title: 'router.journaledit', icon: 'chart', role:['4']}
            },
            {
                hidden:'true',
                path: 'journaledit/:journalId',
                name: 'journalUpdate',
                component: () => import('@/views/journal/edit'),
                meta: {title: 'router.journaledit', icon: 'chart', role:['4']}
            },
            {
                path: 'journalList',
                name: 'journalList',
                component: () => import('@/views/journal/journalList/index'),
                meta: {title: 'router.journalList', icon: 'chart', role:['4']}
            }
        ]
    },



    {
        path: '/doctormanager',
        component: Layout,
        meta: {
            role:['4']
        },
        children: [
            {
                path: 'doctormanager',
                name: 'doctormanager',
                component: () => import('@/views/admin/manager/doctor'),
                meta: {title: 'router.doctormanager', icon: 'peoples', role:['4']}
            }
        ]
    },
    {
        path: '/enterprisemanager',
        component: Layout,
        meta: {
            role:['4']
        },
        children: [
            {
                path: 'enterprisemanager',
                name: 'enterprisemanager',
                component: () => import('@/views/admin/manager/enterprise'),
                meta: {title: 'router.enterprisemanager', icon: 'peoples', role:['4']}
            }
        ]
    },
    {
        path: '/analysis',
        component: Layout,
        meta: {
            role:['4']
        },
        children: [
            {
                path: 'analysis',
                name: 'analysis',
                component: () => import('@/views/table/index'),
                meta: {title: 'router.analysis', icon: 'peoples', role:['4']}
            }
        ]
    },
    {
        path: '/feedback',
        component: Layout,
        meta: {
            role:['4']
        },
        children: [
            {
                path: 'feedback',
                name: 'feedback',
                component: () => import('@/views/admin/feedback/index'),
                meta: {title: 'router.feedback', icon: 'peoples', role:['4']}
            }
        ]
    },














    //PATIENT
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        hidden: true,
        meta: {
            role:['3']
        },
        children: [{
            path: 'dashboard',
            component: () => import('@/views/table/index'),
            meta: {
                role:['3']
            },
        }]
    },
    {
        path: '/Home',
        component: Layout,
        meta: {
            role:['3']
        },
        children: [
            {
                path: 'Home',
                name: 'Home',
                component: () => import('@/views/table/index'),
                meta: {title: 'router.home', icon: 'home', role:['3']}
            }
        ]
    },

//COMMMMM

    {
        path: '/map',
        component: Layout,
        meta: {
            title: 'router.map',
            //role:['1']
        },
        children: [
            {
                path: 'map',
                name: 'map',
                component: () => import('@/views/map/index'),
                meta: {title: 'router.map', icon: 'home',}//role:['1']}
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
