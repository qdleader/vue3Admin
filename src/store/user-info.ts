import { defineStore } from 'pinia'
import {loginApi} from '@/api/login/login'
import { routesStatic } from '@/router/index'
import { useRouter } from 'vue-router'

import router from '../router/index'
interface aboutInfo {
   path: string,
  name: string,
  component: any,
  children:any
}
// 定义用户信息Store
export const useUserInfoStore = defineStore('user-info', {
  state: () => ({
    id: 0,
    username: '',
    name: '',
    avatar: '',
    menus: [1212],
    menusStr:'',
  }),
  actions: {
      setAll() {
      let routesStaticArr = JSON.parse(JSON.stringify(routesStatic))
      loginApi().then((res: any) => {
        const { menus } = res.data.adminInfo
        let arr: any[] = []
        console.log("routesStaticArr", routesStaticArr);
        let newArray: any[] = [];
        routesStaticArr.forEach((item: any) => {
          if (item.meta && item.meta.isShow) {
            newArray.push(item)
          }
          item.children && item.children.forEach((item1: any) => {
            newArray.push(item1)
          })
        })
        console.log(123,newArray,menus);
        newArray.forEach((item: any) => {
          console.log("item有几个",item);
          menus.forEach((item1: any) => {
            if (item.path == item1.path) {
              let about:aboutInfo = {    //接口返回路由信息
                path: item.path,
                name: item.name,
                component: () => import(`..${item.component}`),
                children:[]
              };
              console.log(111111111, about);
              // router.addRoute(about);
              item1.children && item1.children.forEach((item2: any) => {
                item.children && item.children.forEach((item3: any) => {
                  console.log(2221, item3.path, item2.path);
                  if (item3.path == item2.path) {
                    let about1 = {    //接口返回路由信息
                      path: item3.path,
                      name: item3.name,
                      component: () => import(`..${item3.component}`)
                    };
                    about.children.push(about1)
                    console.log(1111111112222,about1);
                  }
                })
              })
              console.log(333333333,about);
               router.addRoute(about);
            }
          })
        })
        console.log(2222222, router.getRoutes());
        console.log("menus11", menus);
        this.menusStr =  JSON.stringify(menus)
        this.menus = menus
        // this.menusStr = menus
      })
    }
  },
}) 
