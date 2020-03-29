import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherOrderDetailPage } from './other-order-detail.page';

const routes: Routes = [
  {
    path: '',
    component: OtherOrderDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherOrderDetailPageRoutingModule {}
