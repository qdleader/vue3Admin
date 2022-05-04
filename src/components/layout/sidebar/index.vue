<template>
  <div class="sidebar">
    <el-menu :default-openeds="userInfo.deafaultArr" :default-active="userInfo.deafaultActive" :unique-opened="true" class="menu" :collapse="sidebarCollapse">
      <div class="logo">
          <span>qd</span>
        <span v-show="!sidebarCollapse"> 管理系统</span>
      </div>
      <template v-for="(menu,index) in menusStr" :key="menu.id" :index="index+''">
          <template v-if="menu.children && menu.children.length == 0" >
              <el-menu-item  @click="goDetail(menu)" :key="menu.path" :index="menu.path">
                  {{ menu.meta.title }}
              </el-menu-item>
          </template>
          <el-sub-menu v-if="menu.children && menu.children.length > 0" :key="menu.path" :index="menu.path">
              <template #title>
                  <div  class="sub-menu-icon">
                      <component
                      class="sub-menu-icon-box"
                      v-if="menu.icon"
                      :is="menu.icon"
                      />
                  </div>
                  <span>{{ menu.meta.title }}</span>
              </template>
                <el-menu-item v-for="sub in menu.children" @click="goDetail(sub)" :key="sub.path" :index="sub.path">
                    {{ sub.meta.title }}
                </el-menu-item>

            </el-sub-menu>
        </template>  
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, reactive, ref } from 'vue'
import {loginApi} from '@/api/login/login'
import { useRouter } from 'vue-router'
import {routesStatic} from '@/router/index'
import { Interface } from 'readline'
import { useUserInfoStore } from '@/store/user-info'

interface ItemObj {
  name:string
  path:string
};
interface ObjInter {
  name:string,
  path:string,
  children: any[]
};
interface userInfoInterface {
    menus: any [],
    deafaultActive:string | number,
    deafaultArr:any
};

export default defineComponent({

  name: 'Sidebar',
  setup() {
      const router = useRouter()
      const list = router.getRoutes().filter(v => v.meta.isShow)
      console.log(111,list);
    // ↓注入父组件值
    const sidebarCollapse = ref(inject('sidebarCollapse'))
    
    // TODO 用户信息变量，后续改成从store获取变量
    const userInfo: userInfoInterface = reactive({
      menus: [],
      deafaultActive:'',
      deafaultArr:['0']
    })
    const goDetail = (data:any) => {
        console.log(111,data);
        router.push(data.path)
         console.log("router", 111222999999, router.options.routes);
        userInfo.deafaultActive = data.path
    }
     const userInfoStore = useUserInfoStore()
       const menus = useUserInfoStore().menus
       const menusStr = JSON.parse(useUserInfoStore().menusStr)
       console.log("menus 保存了吗看看",menus,menus[0],menusStr);
    onMounted(async () => {
      
      let res = await userInfoStore.setAll()

            const list = router.getRoutes().filter(v => v.meta.isShow)
      console.log(111,list);


      userInfo.deafaultActive = router.currentRoute.value.path

      menus.map((item: any,index:number) => {
          if(userInfo.deafaultActive === item.path) {
              let arr = []
              arr.push(index+'')
              return userInfo.deafaultArr = arr
          }
          item.children && item.children.map((itemIn: any) => {
            if(userInfo.deafaultActive === itemIn.path) {
                let arr = []
                arr.push(index+'')
                return userInfo.deafaultArr = arr
            }
          })
      })
    })

    return {
      sidebarCollapse,
      userInfo,
      goDetail,
      menus,
      menusStr,
      list
    }
  },
})
</script>
<style lang="scss" scoped>
.sidebar {
  height: 100vh;
  box-shadow: 2px 0px 6px 0px rgba(0, 0, 0, 0.1);
  .menu {
    border-right: unset;
    .logo {
      height: 50px;
      line-height: 50px;
      padding: 0 10px;
      overflow: hidden;
      img {
        vertical-align: middle;
        margin-left: 6px;
      }
      span {
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
  .menu:not(.el-menu--collapse) {
    width: 240px;
  }
}
.sub-menu-icon-box {
    display: block;
    width: 20px;
    height: 20px;
}
</style>
