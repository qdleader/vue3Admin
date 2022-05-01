<template>
  <div>
    <h2>路由</h2>
    <!-- ↓匹配路由path进行跳转 -->
    <router-link to="/sys/user">Go to User</router-link> <br />
    <!-- ↓匹配路由name进行跳转 -->
    <router-link :to="{ name: 'login' }">Go to Login</router-link>


    <button @click="userPage">mock分页查询</button>
    <button @click="addUser">mock新增</button>
    <button @click="modifyUser">mock修改</button>
    <button @click="delUser">mock删除</button>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import userApi from '@/api/sys/user'
import axios from 'axios'

export default defineComponent({
  name: "Home",
setup() {
    // ↓分页
    const userPage = () => {
      userApi.page({}).then((response: any) => {
        console.log(response)
      })
    }
     function Submit(){ 
            axios.get('/api/users/list').then(
                res=>{
                    console.log("返回的数据是：",res.data)
                },
                e=>{
                    console.log("axios返回错误信息：",e.message)
                }
            )
        }
        Submit()
    // ↓新增
    const addUser = () => {
      userApi.add({ username: 'zhangsan', name: '张三', email: 'zhangsan@163.com' }).then((response: any) => {
        console.log(response)
      })
    }
    // ↓修改
    const modifyUser = () => {
      userApi.modify({ id: 2, username: 'lisi', name: '李四', email: 'lisi@163.com' }).then((response: any) => {
        console.log(response)
      })
    }
    // ↓删除
    const delUser = () => {
      userApi.del(2).then((response: any) => {
        console.log(response)
      })
    }

    return {
      userPage,
      addUser,
      modifyUser,
      delUser,
    }
  }
});
</script>
