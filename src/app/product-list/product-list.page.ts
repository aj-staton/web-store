import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {
  products = [];
  
  constructor(private router:Router,
          public productService: ProductService) { }

  ngOnInit() {
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

      //reset usertype to visitor
    this.productService.setUsertype("visitor");
  }
}
