import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  user={
  email:"",
  password:""};

  constructor(private router:Router) { }

  ngOnInit() {
  }

  signup(){
  	console.log(this.user.email+"  "+this.user.password)
  	var email=this.user.email;
  	var password=this.user.password;
  	var self=this;

  	firebase.auth().createUserWithEmailAndPassword(email, password).catch(
  		function(error) {
	  // Handle Errors here.
	  console.log(error);
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  console.log(error.message);
	  if(errorCode.length > 0){
	  	console.log("Failed");
	  }
	  else{
	  	console.log("signup ok")
	  }
	  // ...
	}).then(function(user){
		  	console.log("finished creating account")
		  	// self.router.navigate(["/login"]);
		  	self.router.navigate(["/home"]);
	});


  }

}
