import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { storage, initializeApp } from 'firebase';
import * as firebase from 'firebase';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  add_product_form: FormGroup;
  imgfile = "";
  image_taken: boolean = false;
  constructor( 
    private router: Router,
    public formBuilder: FormBuilder,
    private productService: ProductService,
    private camera: Camera, private file: File) {
  }

  ngOnInit() {
    this.add_product_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      //image:new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    console.log("User is a: " + this.productService.usertype);
    this.image_taken = false;
  }
  goBack() {
    this.router.navigate(['/tabs/product-list']);
  }
  
  addProduct(value) {
    var self = this;
    if (this.productService.usertype == "owner" && this.image_taken == true) {
      
      firebase.storage().ref().child(this.imgfile).getDownloadURL().then(function(path){
        var url = path;
        url.replace(self.imgfile, "thumb"+self.imgfile);
        self.productService.createProduct(value.name, value.price, value.category, path, value.description, value.id, url);
      });
      this.router.navigate(['/tabs/product-list']);
    } else {
      console.log("You are not an owner or the image has not been taken.");
    }
  }

  loginAsOwner() {
    this.productService.usertype = "owner";
    console.log("You are now a store " +
      this.productService.usertype);
  }

  async takePicturee() {
    try {
      this.image_taken = true;
      const options: CameraOptions = {
        quality: 40,
        targetHeight: 400,
        targetWidth: 400,
        destinationType: this.camera.DestinationType.DATA_URL, // Gets back a Base64 Image
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      const img = await this.camera.getPicture(options);
      const formatted_img = `data:image/jpeg;base64,${img}`;
      this.imgfile = this.getImageReference();
      const picStorage = firebase.storage().ref(this.imgfile);
      // Write to db.
      picStorage.putString(formatted_img, 'data_url');
    } catch(e) {
      console.error(e);
    }
  }
  /*
   * Creates a unique number to retireve the image from in 'addProduct()'
   */
  getImageReference(): string {
    let num = Math.floor((Math.random() * 100000000)+1);
    let ret:string = "i:" + num as string;
    return ret;
  }
}
