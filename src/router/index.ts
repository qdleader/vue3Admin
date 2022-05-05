import { createRouter, createWebHashHistory } from 'vue-router'
import { useRouter } from 'vue-router'
import { loginApi } from '@/api/login/login'
import { useUserInfoStore } from '@/store/user-info'
export const routesStatic = [
  {
    path: '/',
    name: 'home',
    component:'/components/layout/index.vue',
    redirect: { path: '/home' },
    children: [
      {
        path: '/home',
        name: 'homePage',
        icon: "Fold",
        meta: {
          title: '权限管理',
          isShow:true
        },
        component: '/views/Home.vue',
        children: [
             {
              path: '/sys/user',
              name: 'sys-user',
              icon: "Fold",
              meta: {
                title: '用户管理',
                isShow:true
              },
              component:'/views/sys/User.vue'
            },
            {
              path: '/sys/role',
              name: 'sys-role',
              icon: "Fold",
              meta: {
                title: '角色管理',
                isShow:true
              },
              component:'/views/sys/Role.vue'
            },
            {
              path: '/sys/menu',
              name: 'sys-menu',
              icon: "Fold",
              meta: {
                title: '菜单管理',
                isShow:true
              },
              component:'/views/sys/Menu.vue'
            },
        ]
      },
   
    ]
  },
  // ↓登录页
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      isShow:false
    },
    component:'/views/sys/User.vue'
  },
]

// ↓定义路由
const routes = [
  // ↓layout父路由
  {
    // ↓路由地址
    path: '/',
    name: 'home',
    component: () => import('@/components/layout/index.vue'),
    redirect: { path: '/home' },
    children: [
      {
        path: '/home',
        name: 'homePage',
        title: '首页',
        icon: "Fold",
        meta: {
          title: '首页',
          isShow:true
        },
        component: () => import('@/views/Home.vue')
      },
      {
        path: '/:catchAll(.*)',
        name: '404',
        icon: "Fold",
        meta: {
          title: '404',
          isShow:false
        },
        component: () => import('@/views/Home.vue'),
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      isShow:false
    },
    component: () => import('@/views/login/Login.vue')
  },
]

// ↓创建路由实例并传递routes
const router = createRouter({
  // ↓router内部提供了history模式的实现，使用hash模式
  history: createWebHashHistory(),
  routes,
})
router.beforeEach((to) => {
   const userInfoStore = useUserInfoStore()
  userInfoStore.setAll()
  console.log("router.getRoutes()",router.getRoutes());
})
// 路由守卫
// let registerRouteFresh = true
// router.beforeEach((to, from, next) => {
//   let menusStr = sessionStorage.getItem("menusStr")
//    const userInfoStore = useUserInfoStore()
//   if (!menusStr) { 
//       userInfoStore.setAll()
//   } else {
//     let arr1 = JSON.parse(menusStr)
//      userInfoStore.setAll()
//     console.log("router.getRoutes()",router.getRoutes());
//     console.log("router.hasRoute()to.name",to,to.path,to.name);
//     console.log("router.hasRoute()to.name",router.hasRoute(to.path));
//     console.log("router.getRoutes()",router.getRoutes().length);
//     if (router.getRoutes().length == 2) {
//       userInfoStore.setAll()
//       router.replace(to.path)
//     }
//     if (router.hasRoute(to.path)) {
//       // next()
//     }
//     // next()
//   }

// })

   console.log("router222",2222222,router);


export default router
