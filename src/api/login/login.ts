import http from '@/utils/http/index'
 export const loginApi = (data?: any) => {
    return http.post('/api/users/userInfo', data)
}
export default {
  // ↓分页查询
  page: (params?: any) => {
    return http.get('/api/users/list', params)
  },
  // ↓新增
  add: (data?: any) => {
    return http.post('/api/users/list', data)
  },
  // ↓修改
  modify: (data?: any) => {
    return http.put('/api/users/list', data)
  },
  // ↓删除
  del: (id: number | string, data?: any) => {
    return http.delete('/api/users/list', data)
  },
}
