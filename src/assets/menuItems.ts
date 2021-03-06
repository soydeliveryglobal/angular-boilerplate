import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'MENU.LAYOUT',
    icon: 'layout-outline',
    children: [
      {
        title: 'MENU.LAYOUT-STEPPER',
        link: '/pages/layout/stepper',
      },
      {
        title: 'MENU.LAYOUT-LIST',
        link: '/pages/layout/list',
      },
      {
        title: 'MENU.LAYOUT-INFINITE_LIST',
        link: '/pages/layout/infinite-list',
      }
    ],
  },
  {
    title: 'MENU.MYABM',
    icon: 'car-outline',
    link: '/miabm',
  },
  {
    title: 'MENU.RATES',
    icon: 'car-outline',
    link: '/tarifa',
  },
];