<template>
  <div class="sidebar">
    <el-menu :default-openeds="userInfo.deafaultArr" :default-active="userInfo.deafaultActive" :unique-opened="true" class="menu" :collapse="sidebarCollapse">
      <div class="logo">
          <span>qd</span>
        <span v-show="!sidebarCollapse"> 管理系统</span>
      </div>
      <el-sub-menu v-for="(menu,index) in userInfo.menus" :key="menu.id" :index="index+''">
        <template #title>
            <div  class="sub-menu-icon">
                <component
                class="sub-menu-icon-box"
                :is="menu.icon"
                />
            </div>
            <span>{{ menu.name }}</span>
        </template>
        <el-menu-item v-for="sub in menu.children" @click="goDetail(sub)" :key="sub.path" :index="sub.path">
            {{ sub.name }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, reactive, ref } from 'vue'
import {loginApi} from '@/api/login/login'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Sidebar',
  setup() {
      const router = useRouter()
    // ↓注入父组件值
    const sidebarCollapse = ref(inject('sidebarCollapse'))
    
    // TODO 用户信息变量，后续改成从store获取变量
    const userInfo = reactive({
      menus: [],
      deafaultActive:'',
      deafaultArr:['0']
    })
    const goDetail = (data:any) => {
        console.log(data);
        router.push(data.path)
        userInfo.deafaultActive = data.path
    }
    onMounted(() => {

      // ↓查询用户信息
      loginApi().then((res: any) => {
        const { menus } = res.data.adminInfo
        userInfo.menus = menus
      })
      console.log("router",router.currentRoute.value.path);
      userInfo.deafaultActive = router.currentRoute.value.path

      userInfo.menus.map((item: any,index:number) => {
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
      goDetail
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
