import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Events } from '@ionic/angular';

import { Observable } from 'rxjs';
import {Subject} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  // Access the firebase 
  database = firebase.firestore();
  ref = firebase.database().ref('menus/');
  private eventSubject = new Subject<any>();
  usertype="visitor";

  public products:Array<any>= [];
  
  constructor(private router:Router) {
    this.database.collection("products");
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
           console.log("items reloaded");
       } );
    }
    else{
      this.database.collection("products").where("uid", "==", firebase.auth().currentUser.uid)
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
                image:string, description:string, uid: string){
    /*this.products.push({
      'name': name,
      'price': price,
      'category': category,
      'image' : image,
      'description' : description,
      'uid' : uid
    });*/
    if (firebase.auth().currentUser !=  null){
      uid=firebase.auth().currentUser.uid
      console.log(uid, " :****** uid");
    }
    else{
      console.log(" no user logged in, no item created")
    }
    // Do we need both??
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
  }

  getProducts():any {
    //return this.products;
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