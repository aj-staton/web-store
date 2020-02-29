import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Router,Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ProductService } from '../product.service';


import * as firebase from 'firebase';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

new_product_form: FormGroup;


  constructor(
  	private router: Router,
 	  public formBuilder: FormBuilder,
 	  public productService: ProductService
 	) { }

  ngOnInit() {

  	this.new_product_form = this.formBuilder.group({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
    });

  }

  signup(){
  	this.router.navigate(["/signup"]);
  }

  login(user){
  	console.log(user.email+"   "+user.password)
  	var self=this;
	  var email=user.email;
	  var password=user.password;
	  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode);

		if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else if (errorCode === 'auth/user-not-found'){
            alert("User does not exist");
          }
          console.log(error);
		}
	).then(function(user){
		  	// self.router.navigate(["/login"]);
		  	self.router.navigate(["/home"]);
	});
  }

  loginFacebook(){
  	//You need to create an facebook develop account and register an app there
  	//to use its login service
  	
  	var self=this;
  	console.log("facebook login")
  	// Sign in using a popup.
		var provider = new firebase.auth.FacebookAuthProvider();
		provider.addScope('user_birthday');
		firebase.auth().signInWithPopup(provider).then(function(result) {
		// This gives you a Facebook Access Token.
		var token = result.credential.providerId;
		console.log(token)
		// The signed-in user info.
		var user = result.user;
		console.log(user);
		self.router.navigate(["/home"]);
		});
  }

  loginGoogle(){
		var self=this;
 		console.log("google login")
 		// Using a popup.
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('profile');
		provider.addScope('email');
		firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token.
		var token = result.credential.providerId;
		// The signed-in user info.
		var user = result.user;
		console.log(user);
		console.log("login succeeded")
		self.router.navigate(["/home"]);
		});
  }
}
