import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


@Component({
  selector: 'app-other-order-detail',
  templateUrl: './other-order-detail.page.html',
  styleUrls: ['./other-order-detail.page.scss'],
})
export class OtherOrderDetailPage implements OnInit {

  currentOrder = null;
  database = firebase.firestore();

  constructor(private route: ActivatedRoute, 
    private orderService: OrderService,
    private router:Router,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.route.params.subscribe(
      param => {
        this.currentOrder = param;
        console.log(param.id);
      }
    );
  }
  goBack() {
    this.router.navigate(['/tabs/other-order-list']);
  }
  
  deleteOtherOrder() {
    this.orderService.deleteOtherOrder(this.currentOrder.id);
    this.router.navigate(['tabs/other-order-list']);
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
            this.deleteOtherOrder();
            this.router.navigate(['/other-order-list']);
          }
        }
      ]
    });
    await alert.present();
  }
  
}
