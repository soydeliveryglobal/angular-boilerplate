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
  {
    title: 'MENU.USERS',
    icon: 'car-outline',
    link: environment.FORM_LIST_USERS,
  },
  {
    title: 'MENU.MOVEMENTTYPES',
    icon: 'car-outline',
    link: environment.FORM_LIST_MOVEMENTTYPES,
  },
  {
    title: 'MENU.UNITS',
    icon: 'car-outline',
    link: environment.FORM_LIST_UNITS,
  },
  {
    title: 'MENU.DEPOTS',
    icon: 'car-outline',
    link: environment.FORM_LIST_DEPOTS,
  },
  {
    title: 'MENU.MOVEMENTS',
    icon: 'car-outline',
    link: environment.FORM_LIST_MOVEMENTS,
  },
  {
    title: 'MENU.STATEOFDOCUMENTS',
    icon: 'car-outline',
    link: environment.FORM_LIST_STATEOFDOCUMENTS,
  },
  {
    title: 'MENU.STATEOFACTORS',
    icon: 'car-outline',
    link: environment.FORM_LIST_STATEOFACTORS,
  },
  {
    title: 'MENU.OFFICES',
    icon: 'car-outline',
    link: environment.FORM_LIST_OFFICES,
  },
  {
    title: 'MENU.TYPEOFACTORS',
    icon: 'car-outline',
    link: environment.FORM_LIST_TYPEOFACTORS,
  },
  {
    title: 'MENU.TYPEOFDOCUMENTS',
    icon: 'car-outline',
    link: environment.FORM_LIST_TYPEOFDOCUMENTS,
  }
]

;