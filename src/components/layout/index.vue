<template>
  <el-container>
    <Sidebar />
    <el-container>
      <el-header height="50px">
        <Header v-model:sidebar-collapse="sidebarCollapse" />
      </el-header>
      <el-main>
        <!-- ↓layout路由视图 -->
        <router-view></router-view>
      </el-main>
      <Footer />
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, provide } from 'vue'
import Sidebar from './sidebar/index.vue'
import Header from './header/index.vue'
import Footer from './footer/index.vue'

export default defineComponent({
  name: 'Layout',
   components: { Sidebar, Header, Footer },

  setup() {
    // ↓侧边栏折叠
    const sidebarCollapse = ref(false)
    // ↓提供给sidebar注入
    provide('sidebarCollapse', sidebarCollapse)

    return {
      sidebarCollapse,
    }
  },
})
</script>
