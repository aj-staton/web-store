import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Events } from '@ionic/angular';

import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  // Access the firebase 
  database = firebase.firestore();
  ref = firebase.database().ref('menus/');
  private eventSubject = new Subject<any>();
  usertype:string = "visitor";

  public products:Array<any>= [];
  
  constructor(private router:Router) {
    this.database.collection("products");
    var storage = firebase.storage();
    var self=this;

    if (this.usertype == "visitor") {
      this.database.collection("products")
      .onSnapshot(function(querySnapshot) {
          console.log("product list changed.......visitor");
          self.products = [];
          querySnapshot.forEach(function(doc) {
            let product = doc.data();
            self.products.push({name:product.name, price:product.price, category:product.category, 
              image:product.image, description:product.description, uid:product.uid});
           });
            self.publishEvent({
               foo: 'bar'
           });
           console.log("products reloaded");
       } );
    }
    else{
      this.database.collection("products")
       .onSnapshot(function(querySnapshot) {
           console.log("items list changed........owner");
           self.products = [];
           querySnapshot.forEach(function(doc) {
               var product = doc.data();
               self.products.push({name:product.name , price:product.price, category:product.category, image:product.image, uid:product.uid})
           });

           self.publishEvent({
               foo: 'bar'
           });
           console.log("Products Reloaded");
       } );
    }
  }
  
  createProduct(name:string, price:number, category:string,
                image:string, description:string){
    /*this.products.push({
      'name': name,
      'price': price,
      'category': category,
      'image' : image,
      'description' : description,
      'uid' : uid
    });*/
    // Only the owner shoulf be able to create products.
    if (this.usertype == "owner") {
      let uid=firebase.auth().currentUser.uid;
      console.log(uid, " :****** uid");
      var db = firebase.firestore();
      db.collection("products").add({
        'name': name,
        'price': price,
        'category': category,
        'image': image,
        'description': description,
        'uid': uid
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);

      //update this products arrays
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
    } else{
      console.log(" no user logged in, no item created")
    }
  }

  deleteProduct(product: any){
    var self = this;
    var db = firebase.firestore();
    var docRef = 
    db.collection("products").doc(product.uid).delete().then(function() {
        console.log("Product successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing Product: ", error);
    });

  }

  getProducts():any {
    var itemsObservable = new Observable(observer => {
      setTimeout(() => {
          observer.next(this.products);
      }, 1000);
    });
    
    return itemsObservable;
  }

  deleteItem(id:any) {
    let newInfo = firebase.database().ref('menus/'+id).remove();
    console.log("Item deleted:"+id)
  }

  getObservable(): Subject<any> {
    return this.eventSubject;
  }

  publishEvent(data: any) {
    this.eventSubject.next(data);
  }

  setUsertype(type:string){

    var self=this;
    this.usertype = type;
    console.log("Usertype set as: " + type);
    if (this.usertype == "visitor"){
       this.database.collection("products")
         .onSnapshot(function(querySnapshot) {
            console.log("product list changed...........");
            self.products = [];
            querySnapshot.forEach(function(doc) {
                var product = doc.data();
                self.products.push({name:product.name , price:product.price, category:product.category, image:product.image, uid:product.uid})
            });
            // self.events.publish('dataloaded',Date.now());
            self.publishEvent({
                  foo: 'bar'
              });
            console.log("items reloaded");
        } );
    }
    else{
     this.database.collection("products").where("uid", "==", firebase.auth().currentUser.uid)
      .onSnapshot(function(querySnapshot) {
        console.log("product list changed...........");
        self.products = [];
        querySnapshot.forEach(function(doc) {
          var product = doc.data();
          self.products.push({name:product.name , price:product.price, category:product.category, image:product.image, uid:product.uid});
        });
        // self.events.publish('dataloaded',Date.now());
        self.publishEvent({
            foo: 'bar'
        });
    });
  }
  }
}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.id = childSnapshot.key;
      // console.log(item);
      returnArr.push(item);
  });

  return returnArr;
}