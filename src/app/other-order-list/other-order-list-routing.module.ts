import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherOrderListPage } from './other-order-list.page';

const routes: Routes = [
  {
    path: '',
    component: OtherOrderListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherOrderListPageRoutingModule {}
