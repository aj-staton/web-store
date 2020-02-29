import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

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
    console.log("user is logged out");
  }
}
