export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
      {
        name: 'register-result',
        path: '/user/register-result',
        component: './user/register-result',
      },
      {
        name: 'register',
        path: '/user/register',
        component: './user/register',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      {
        path: '/',
        redirect: '/welcome',
      },
      {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
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
];
