var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', function (req, res, next) {
  res.json({
    name:'qdleader'
  });
});
router.get('/userInfo', function (req, res, next) {
  res.json({
    data: {
      'adminToken': 
        {
          token: '121212',
        },
      'zhangsanToken': 
        {
          token: '10100',
        },
      'adminInfo': 
        {
          id: 11,
          username: 'admin',
          name: '超级管理员',
          avatar: 'http://mmbiz.qpic.cn/mmbiz_png/DK6SvZT2DibtybJDkp6GSTecs53wffbGo0uIAAJQEpW3yeHrCxhplSL6W3DylATNmaRiabrJY0QicXZAiaqm56CicTw/0?wx_fmt=png',
          menus: [
            {
              id: 1,
              name: '权限管理',
              icon: 'el-icon-menu',
              children: [
                { id: 2, name: '用户管理', routeName: 'sys-user', path: '/sys/user', component: '/sys/User.vue' },
                { id: 3, name: '角色管理', routeName: 'sys-role', path: '/sys/role', component: '/sys/Role.vue' },
                { id: 4, name: '菜单管理', path: '/sys/menu' },
              ],
            },
            {
              id: 5,
              name: '系统管理',
              icon: 'el-icon-setting',
              children: [
                { id: 6, name: '系统字典', path: '/sys/dict' },
                { id: 7, name: '参数配置', path: '/sys/config' },
                { id: 8, name: '通知公告', path: '/sys/notice' },
                { id: 9, name: '日志审计', path: '/sys/log' },
              ],
            },
          ],
        },
      'zhangsanInfo': 
        {
          id: 100,
          username: 'zhangsan',
          name: '张三',
          avatar: 'http://mmbiz.qpic.cn/mmbiz_png/DK6SvZT2DibtybJDkp6GSTecs53wffbGo0uIAAJQEpW3yeHrCxhplSL6W3DylATNmaRiabrJY0QicXZAiaqm56CicTw/0?wx_fmt=png',
          menus: [
            {
              id: 1,
              name: '权限管理',
              icon: 'el-icon-menu',
              children: [{ id: 2, name: '用户管理', routeName: 'sys-user', path: '/sys/user', component: '/sys/User.vue' }],
            },
          ],
        },
      
    }
  });
});
router.post('/userInfo', function (req, res, next) {
  res.json({
    data: {
      'adminToken':
      {
        token: '121212',
      },
      'zhangsanToken':
      {
        token: '10100',
      },
      'adminInfo':
      {
        id: 11,
        username: 'admin',
        name: '超级管理员',
        avatar: 'http://mmbiz.qpic.cn/mmbiz_png/DK6SvZT2DibtybJDkp6GSTecs53wffbGo0uIAAJQEpW3yeHrCxhplSL6W3DylATNmaRiabrJY0QicXZAiaqm56CicTw/0?wx_fmt=png',
        menus: [
          {
            id: 1,
            name: 'homePage',
            path:'/home',
            icon: 'Fold',
            meta: {
              title: '权限管理',
              isShow: true
            },
            children: [
              {
                id: 2, name: 'sys-user',
                icon: 'Fold',
                meta: {
                  title: '用户管理',
                  isShow: true
                },  routeName: '/sys/user', path: '/sys/user', component: '/sys/User.vue'
              },
              {
                id: 3,
                icon: 'Fold',
                meta: {
                  title: '角色管理',
                  isShow: true
                }, name: 'sys-role', routeName: '/sys/role', path: '/sys/role', component: '/sys/Role.vue' },
              {
                id: 4,
                icon: 'Fold',
                meta: {
                  title: '系统管理',
                  isShow: true
                }, name: 'sys-menu', routeName: '/sys/menu', path: '/sys/menu' },
            ],
          },
          // {
          //   id: 5,
          //   path: '/sys/user',
          //   name: 'sys-user',
          //   meta: {
          //     title: '人员管理',
          //     isShow: true
          //   },
          //   icon: 'add-location',
          //   children: [
          //     { id: 6, name: '系统字典', path: '/sys/dict' },
          //     { id: 7, name: '参数配置', path: '/sys/config' },
          //     { id: 8, name: '通知公告', path: '/sys/notice' },
          //     { id: 9, name: '日志审计', path: '/sys/log' },
          //   ],
          // },
        ],
      },
      'zhangsanInfo':
      {
        id: 100,
        username: 'zhangsan',
        name: '张三',
        avatar: 'http://mmbiz.qpic.cn/mmbiz_png/DK6SvZT2DibtybJDkp6GSTecs53wffbGo0uIAAJQEpW3yeHrCxhplSL6W3DylATNmaRiabrJY0QicXZAiaqm56CicTw/0?wx_fmt=png',
        menus: [
          {
            id: 1,
            name: '权限管理',
            icon: 'el-icon-menu',
            children: [{ id: 2, name: '用户管理', routeName: 'sys-user', path: '/sys/user', component: '/sys/User.vue' }],
          },
        ],
      },

    }
  });
});
router.post('/list', function (req, res, next) {
  res.json({
    name:'qdleader'
  });
});
router.put('/list', function (req, res, next) {
  res.json({
    name:'qdleader'
  });
});
router.delete('/list', function (req, res, next) {
  res.json({
    name:'qdleader'
  });
});

module.exports = router;
