export const EMPLOYEE_MENU= [
    {
      title: 'Dashboard',
      path: '/account/dashboard',
      maticon: 'dashboard'
    },
    {
      title: 'Update Details',
      path: '/account/update-details',
      maticon: 'badge',
    },
  ];
  
  export const EMPLOYER_MENU= [
    {
      title: 'Dashboard',
      path: '/employer/dashboard',
      maticon: 'dashboard'
    },
    {
      title: 'Update Details',
      path: '/employer/update-details',
      maticon: 'badge',
    },
    {
      title: 'Projects',
      path: '/employer/projects',
      maticon: 'file_copy',
      children:[
        {
          title: 'All Projects',
          path: '/employer/projects',
          maticon: 'badge',
        },
        {
          title: 'New Project',
          path: '/employer/projects/create',
          maticon: 'badge',
        },
      ]
    }
   
  ];