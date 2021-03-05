import { environment } from './../environments/environment';
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
    title: 'MENU.PROVIDER',
    icon: 'car-outline',
    link: environment.FORMULARIO_CRUD_DEL_PROVIDER,
  },
  {
    title: 'MENU.PROFILE',
    icon: 'car-outline',
    link: environment.FORMULARIO_CRUD_DEL_PROFILE,
  },
  {
    title: 'MENU.BRANDS',
    icon: 'car-outline',
    link: environment.FORMULARIO_CRUD_DEL_BRAND,
  },
  {
    title: 'MENU.LINES',
    icon: 'car-outline',
    link: environment.FORMULARIO_CRUD_LINES,
  },
];