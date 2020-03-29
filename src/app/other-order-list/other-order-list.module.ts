import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherOrderListPageRoutingModule } from './other-order-list-routing.module';

import { OtherOrderListPage } from './other-order-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtherOrderListPageRoutingModule
  ],
  declarations: [OtherOrderListPage]
})
export class OtherOrderListPageModule {}
