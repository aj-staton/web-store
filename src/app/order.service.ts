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
  public otherOrders = [];
  database = firebase.firestore();
  ref = firebase.database().ref('menus/');
  private eventSubject = new Subject<any>();
  usertype:string = "visitor";  


  constructor(private router:Router, private productService: ProductService) {
    //this.database.collection("orders");
    var self=this;
    // Load the Cart
    //if (firebase.auth().currentUser == null) {
     // console.log('Please log in to view your orders.');
   // }
    //else{
      this.database.collection("orders")//.where("uid", "==", firebase.auth().currentUser.uid)
      .onSnapshot(function(querySnapshot) {
          //console.log("Showing user: " + firebase.auth().currentUser.uid + " orders");
          self.orders = [];
          querySnapshot.forEach(function(doc) {
            let order = doc.data();
            self.orders.push({name:order.name, quantity:order.quantity, 
              total:order.total, id:doc.id});
           });
            self.publishEvent({
               foo: 'bar'
           });
           console.log("Orders reloaded");
       } );    
  //  }
  
    //if (firebase.auth().currentUser == null) {
     // console.log('Please log in to view your orders.');
   // }
    //else{
    this.database.collection("other-orders")//.where("uid", "==", firebase.auth().currentUser.uid)
    .onSnapshot(function(querySnapshot) {
        //console.log("Showing user: " + firebase.auth().currentUser.uid + " orders");
        self.otherOrders = [];
        querySnapshot.forEach(function(doc) {
        let otherOrder = doc.data();
          self.otherOrders.push(otherOrder);
        });
        self.publishEvent({
          foo: 'bar'
        });
        console.log("Other Orders reloaded");
    });
       

  }
    
  createOrder(name:string, quantity:number,total:number){

    if (firebase.auth().currentUser != null) { // Need to check for a logged in user.
      let uid = firebase.auth().currentUser.uid;
      console.log(uid, " :****** uid");
      var db = firebase.firestore();
      db.collection("other-orders").add({
        'name': name,
        'quantity': quantity,
        'total': total as number
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
  createInCart(name:string, quantity:number,total:number){
      var db = firebase.firestore();
      db.collection("orders").add({
        'name': name,
        'quantity': quantity,
        'total': total as number
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }
  
  getOrders():any {
    var itemsObservable = new Observable(observer => {
      setTimeout(() => {
          observer.next(this.orders);
      }, 1000);
    });
    return itemsObservable;
  }

  getOtherOrders():any {
    var itemsObservable = new Observable(observer => {
      setTimeout(() => {
          observer.next(this.otherOrders);
      }, 1000);
    });
    return itemsObservable;
  }

  makeOrder(product, quantity:number) {
    if (firebase.auth().currentUser == null) {
      console.log("Need Login"); 
    } else {
      // Use product.price, product,name 
      let total:number = product.price*quantity;
      this.createOrder(product.name, quantity, total);
    }
  }

  addToCart(product, quantity:number) {
    // Use product.price, product,name 
    let total:number = product.price*quantity;
    this.createInCart(product.name, quantity, total);
  }

  deleteOrder(id:string){
    var self = this;
    var db = firebase.firestore();
    console.log(id);
    db.collection("orders").doc(<string>id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    
  }

  deleteOtherOrder(id:string){
    var self = this;
    var db = firebase.firestore();
    console.log(id);
    db.collection("other-orders").doc(<string>id).delete().then(function() {
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

  async placeOrder() {
    let numItems = 0;
    let totalPrice:number = 0;
    let itemList:string = "";

    await firebase.firestore().collection('orders').get()
      .then(querySnapshot => {
        querySnapshot.docs.forEach(doc => {
        let order = doc.data();
        numItems += order.quantity;
        totalPrice += <number> order.total;
        itemList = itemList + order.name + ";";
      });
    });
    // Write the array to the REAL orders collection other-orders.
    var db = firebase.firestore();
      db.collection("other-orders").add({
        'numItems':numItems,
        'orderTotal':totalPrice,
        'items':itemList
      })
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });

    // TODO: Clear the cart
  }
}
  