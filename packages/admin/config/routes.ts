/** fix: cant use es module */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-global-assign */
require = require('esm')(module);
const ROLES = require('@xf/common/src/constants/roles.const');

// umi routes: https://umijs.org/zh/guide/router.html
export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: '用户登录',
        path: '/user/login',
        component: './user/login',
      },
      {
        name: '用户注册',
        path: '/user/register',
        component: './user/register',
      },
      {
        name: '注册结果',
        path: '/user/register-result',
        component: './user/register-result',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        Routes: ['src/pages/Authorized'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: '欢迎',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: '/system',
            name: '系统管理',
            icon: 'apartment',
            authority: [ROLES.SUPER_ADMIN],
            routes: [
              {
                path: '/system/users',
                name: '用户管理',
                icon: 'team',
                component: './users',
              },
              {
                path: '/system/role',
                name: '角色管理',
                icon: 'cluster',
                component: './role',
              },
              {
                path: '/system/permission',
                name: '权限管理',
                icon: 'lock',
                component: './permission',
              },
            ],
          },
          {
            path: '/city',
            name: '城市地铁',
            icon: 'hdd',
            component: './city',
          },
          {
            path: '/exception',
            routes: [
              { path: '/exception/401', component: './exception/401' },
              { path: '/exception/403', component: './exception/403' },
              { path: '/exception/404', component: './exception/404' },
              { path: '/exception/500', component: './exception/500' },
            ],
          },
          {
            component: './exception/404',
          },
        ],
      },
    ],
  },
];
