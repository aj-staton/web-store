import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router,ActivatedRoute  } from '@angular/router';
import { ProductService } from '../product.service';
import { storage, initializeApp } from 'firebase';
import * as firebase from 'firebase';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.page.html',
  styleUrls: ['./update-product.page.scss'],
})
export class UpdateProductPage implements OnInit {
  private newprice: number = 0; 
  currentProduct = null;

  constructor(private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute) { }
 
  ngOnInit() {
    this.route.params.subscribe(
      param => {
        this.currentProduct = param;
      }
    );
  }

  updateProduct() {
    var self = this;
    console.log(this.newprice + " is the new price for id: " + this.currentProduct.name + "  JSON" + JSON.stringify(this.currentProduct)  );
    self.productService.updateProductPrice(this.currentProduct.name, this.newprice);
    
    this.router.navigate(['/tabs/product-list']);
  }

}
