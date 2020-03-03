import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { ProductService } from '../product.service';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {

  currentProduct = null;
  quantity:number = 0; // The ion-range 
  productDoc: AngularFirestoreDocument;

  constructor(private route: ActivatedRoute, private router: Router,
    private orderService: OrderService, private productService: ProductService,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.currentProduct = this.route.snapshot.params;
  }

  
  placeOrder() {
    // Write to the DB.
    this.orderService.makeOrder(this.currentProduct, this.quantity);
    this.router.navigate(['/tabs/product-list']);
  }

  deleteProduct(): void {
    if (this.productService.usertype == "owner") {
      console.log(this.currentProduct.uid +" is to be deleted.");
      this.productService.deleteProduct(this.currentProduct.uid);
    } else {
      console.log("You do not have the correct permissions.");
    }
    this.router.navigate(['/tabs/product-list']);
  }
  
  loginAsOwner() {
    this.productService.usertype = "owner";
    console.log("You are now a store " +
      this.productService.usertype);
  }

  async presentConfirm() {
    let alert = await this.alertCtrl.create({
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            this.deleteProduct();
          }
        }
      ]
    });
    await alert.present();
  }
  
}
