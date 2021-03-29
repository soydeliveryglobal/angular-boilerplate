import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'provider',
        loadChildren: () => import('./provider/provider.module').then(m => m.ProviderModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'brands',
        loadChildren: () => import('./brand/brand.module').then(m => m.BrandModule)
      },
      {
        path: 'lines',
        loadChildren: () => import('./lines/lines.module').then(m => m.LinesModule)
      },
      {
        path: 'varieties',
        loadChildren: () => import('./varieties/varieties.module').then(m => m.VarietiesModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'families',
        loadChildren: () => import('./families/families.module').then(m => m.FamiliesModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'movementtypes',
        loadChildren: () => import('./movementType/movementType.module').then(m => m.MovementTypeModule)
      },
      {
        path: 'units',
        loadChildren: () => import('./units/units.module').then(m => m.UnitsModule)
      },
      {
        path: 'depots',
        loadChildren: () => import('./depots/depots.module').then(m => m.DepotsModule)
      },
      {
        path: 'movements',
        loadChildren: () => import('./movements/movements.module').then(m => m.MovementsModule)
      },
    ]
  },
  {
    path: '**',
    loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
