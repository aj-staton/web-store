import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { OrderService } from '../order.service';

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
    this.orders = this.orderService.getProducts();
  }
  
  toOrder(order) {
    this.router.navigate(['/order-detail', order]);
  }
}
