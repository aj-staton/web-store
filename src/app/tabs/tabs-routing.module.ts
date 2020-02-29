import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'product-list',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../product-list/product-list.module').then(m => m.ProductListPageModule)
          }
        ]
      },
      {
        path: 'order-list',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../order-list/order-list.module').then(m => m.OrderListPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/product-list', // Maybe this is /tabs/productlist?
        pathMatch: 'full'
      }
    ]
  },
  // This is the default path.
  {
    path: '',
    redirectTo: '/tabs/product-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
