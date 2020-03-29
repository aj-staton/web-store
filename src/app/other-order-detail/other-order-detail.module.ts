import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherOrderDetailPageRoutingModule } from './other-order-detail-routing.module';

import { OtherOrderDetailPage } from './other-order-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtherOrderDetailPageRoutingModule
  ],
  declarations: [OtherOrderDetailPage]
})
export class OtherOrderDetailPageModule {}
