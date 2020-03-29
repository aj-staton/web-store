import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { OrderService } from '../order.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {
  orders = [];
  
  constructor(private router:Router,
          public orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getObservable().subscribe((data) =>
    {
      this.orders = this.orderService.getOrders();
    });
    this.orders = this.orderService.getOrders();
  }
  
  toOrder(order) {
    this.router.navigate(['/order-detail', order]);
  }

  placeOrder() {
    this.orderService.placeOrder();
  }
}
