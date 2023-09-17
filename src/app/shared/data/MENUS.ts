export const MENUS: any = [
  {
    title: 'Dashboard',
    path: '/',
    maticon: 'speed',
  },
  {
    title: 'Employee',
    path: '/employee',
    maticon: 'Badge',
    children: [
      {
        title: 'All Employee',
        path: '/employee',
      },
      {
        title: 'New Employee',
        path: '/employee/create',
      },
    ],
  },
  {
    title: 'Article',
    path: '/article',
    maticon: 'newspaper',
    children: [
      {
        title: 'All Article',
        path: '/article',
      },
      {
        title: 'Create Article',
        path: '/article/create',
      }
    ]
  },
  {
    title: 'Interview Schedule',
    path: '/interview-schedule',
    maticon: 'work',
  },
  {
    title: 'Module Management',
    path: '/module-management',
    maticon: 'webhook',
  },
  {
    title: 'Menu Management',
    path: '/menus',
    maticon: 'folder_managed',
  },
  {
    title: 'User Roles',
    path: '/roles',
    maticon: 'group_add',
  },
  {
    title: 'Account Settings',
    path: '/settings',
    maticon: 'manage_accounts',
  },
  {
    title: 'Update Details',
    path: '/update-details',
    maticon: 'badge',
  },
];
