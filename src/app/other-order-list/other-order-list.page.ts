import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { OrderService } from '../order.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-other-order-list',
  templateUrl: './other-order-list.page.html',
  styleUrls: ['./other-order-list.page.scss'],
})
export class OtherOrderListPage implements OnInit {
  otherOrders = this.orderService.otherOrders;
  constructor(private orderService: OrderService, private router: Router) { 
  }

  ngOnInit() {
    this.orderService.getObservable().subscribe((data) =>
    {
      this.otherOrders = this.orderService.otherOrders;
    });
  }
  seeOrders() {
    console.log(this.otherOrders)
  }
  toOtherOrder(order) {
    this.router.navigate(['/other-order-detail', order]);
  }
}
