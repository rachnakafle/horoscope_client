/**
 * Menu Data source
 */
export let mainDataSource: any[] = [
  //  Dashboard
  {
    title: 'Dashboard',
    link: '',
  },
  // Horoscope
  {
    title: 'Horoscope',
    link: 'horoscope',
    submenu: [
      {
        title: 'Your Horoscope',
        link: 'horoscope',
      },
      {
        title: 'Daily Horoscope',
        link: 'horoscope/horoscope-daily',
      },
      {
        title: 'Weekly Horoscope',
        link: 'horoscope/horoscope-weekly',
      },
      {
        title: 'Monthly Horoscope',
        link: 'horoscope/horoscope-monthly',
      },
      {
        title: 'Yearly Horoscope',
        link: 'horoscope/horoscope-yearly',
      },
    ],
  },
  //Money Manager
  {
    title: 'Money Manager',
    link: 'money-manager',
    submenu: [
      {
        title: 'Transactions',
        link: 'transactions',
      },
      {
        title: 'Infographic',
        link: 'infographic',
      },
      {
        title: 'My Budget Plan',
        link: 'my-budget-plan',
      },
      {
        title: 'Remainder',
        link: 'remainder',
      },
    ],
  },
  //  Calender
  {
    title: 'Calender',
    link: 'calender',
  },
  //  Settings
  {
    title: 'Settings',
    link: 'settings',
  },
  //  Need Support
  {
    title: 'Need Support',
    link: 'need-support',
  },
];
