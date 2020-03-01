import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {

  currentOrder = null;
  database = firebase.firestore();
  ref = firebase.database().ref('menus/');

  constructor(private route: ActivatedRoute, 
    private orderService: OrderService,
    private router:Router,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.currentOrder = this.route.snapshot.params;
  }

  deleteOrder() {
    this.orderService.deleteOrder(this.currentOrder);
    this.router.navigate(["/tabs/product-list"]);
  }

  async presentConfirm() {
    let alert = await this.alertCtrl.create({
      message: 'Are you sure you want to delete this order?',
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
            this.deleteOrder();
          }
        }
      ]
    });
    await alert.present();
  }
  
}
