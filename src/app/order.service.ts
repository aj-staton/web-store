import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';
import { ProductService } from './product.service'; // For usertype.

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public orders = [];
  database = firebase.firestore();
  ref = firebase.database().ref('menus/');
  private eventSubject = new Subject<any>();
  usertype:string = "visitor";  


  constructor(private router:Router, private productService: ProductService) {
    this.database.collection("orders");
    var self=this;

    if (firebase.auth().currentUser == null) {
      console.log('Please log in to view your orders.');
    }
    else{
      this.database.collection("orders").where("uid", "==", firebase.auth().currentUser.uid)
      .onSnapshot(function(querySnapshot) {
          console.log("Showing user: " + firebase.auth().currentUser.uid + " orders");
          self.orders = [];
          querySnapshot.forEach(function(doc) {
            let order = doc.data();
            self.orders.push({uid:order.uid, name:order.name, quantity:order.quantity, 
              total:order.total, date:order.date });
            console.log(order);
           });
            self.publishEvent({
               foo: 'bar'
           });
           console.log("Orders reloaded");
       } );    
    }

  }
    
  createOrder(name:string, quantity:number,total:string,
                  date:string){

    if (firebase.auth().currentUser != null) { // Need to check for a logged in user.
      let uid = firebase.auth().currentUser.uid;
      console.log(uid, " :****** uid");
      var db = firebase.firestore();
      db.collection("orders").add({
        'uid': uid,
        'name': name,
        'quantity': quantity,
        'total': total,
        'date': date
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
    } else{
      console.log(" no user logged in, no order created")
    }
  }
  
  getOrders():any {
    var itemsObservable = new Observable(observer => {
      setTimeout(() => {
          observer.next(this.orders);
      }, 1000);
    });
    return itemsObservable;
  }

  makeOrder(product, quantity:number) {
    if (firebase.auth().currentUser == null) {
      console.log("Need Login"); 
    } else {
      let today = new Date();
      let month:number = today.getMonth() + 1; // This function was zero-indexed.
      let date:string = "" + month + '/' + today.getDate() + '/' + today.getFullYear();
      // Use product.price, product,name 
      let total:number = product.price*quantity;
      let twoDecimalTotal = total.toFixed(2);
      this.createOrder(product.name, quantity, twoDecimalTotal, date);
    }
  }

  deleteOrder(order: any){
    var self = this;
    this.database.collection("orders").doc(order.uid).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    
  }

  getObservable(): Subject<any> {
    return this.eventSubject;
  }

  publishEvent(data: any) {
    this.eventSubject.next(data);
  }
}
  