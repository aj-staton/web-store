import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { OrderService } from '../order.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  products = [];
  
  constructor(private router:Router,
          public productService: ProductService,
          private orderService: OrderService) { }

  ngOnInit() {
    this.productService.getObservable().subscribe((data) =>
    {
      this.products = this.productService.getProducts();
    });
    this.products = this.productService.getProducts();
  }
  
  toProduct(product) {
    this.router.navigate(['/product-detail', product]);
  }
  // TODO: finish this function. 
  logout() {
    var self=this;
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      console.log("user logged out");
      self.router.navigate(["/tabs/product-list"]);
    }).catch(function(error) {
      // An error happened.
      console.log("A logout error occurred.")
    });

    // Reset usertype to visitor
    this.productService.setUsertype("visitor");
    // Clear the orders so when the user logs out,
    //  they no longer see thier orders.
    this.orderService.orders = [];

  }
}
