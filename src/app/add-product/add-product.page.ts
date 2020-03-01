import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  add_product_form: FormGroup;

  constructor( 
    private router: Router,
    public formBuilder: FormBuilder,
    private productService: ProductService) {
  }

  ngOnInit() {
    this.add_product_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      image:new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  addProduct(value) {
    if (firebase.auth().currentUser != null) {
      this.productService.createProduct(value.name, value.price, value.category, value.image, value.description);
    }
    this.router.navigate(['/tabs/product-list']);
  }
}
