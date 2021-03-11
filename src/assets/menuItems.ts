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
    title: 'MENU.PRODUCTS',
    icon: 'car-outline',
    link: environment.FORM_LIST_PRODUCTS,
  },
  {
    title: 'MENU.PROVIDER',
    icon: 'car-outline',
    link: environment.FORM_LIST_PROVIDERS,
  },
  {
    title: 'MENU.PROFILE',
    icon: 'car-outline',
    link: environment.FORM_LIST_PROFILES,
  },
  {
    title: 'MENU.BRANDS',
    icon: 'car-outline',
    link: environment.FORM_LIST_BRANDS,
  },
  {
    title: 'MENU.LINES',
    icon: 'car-outline',
    link: environment.FORM_LIST_LINES,
  },
  {
    title: 'MENU.VARIETIES',
    icon: 'car-outline',
    link: environment.FORM_LIST_VARIETIES,
  },
  {
    title: 'MENU.CATEGORIES',
    icon: 'car-outline',
    link: environment.FORM_LIST_CATEGORIES,
  },
  {
    title: 'MENU.FAMILIES',
    icon: 'car-outline',
    link: environment.FORM_LIST_FAMILIES,
  },
];