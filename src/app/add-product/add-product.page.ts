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
  }
  goBack() {
    this.router.navigate(['/tabs/product-list']);
  }
  
  addProduct(value) {
    var self = this;
    if (this.productService.usertype == "owner") {
      firebase.storage().ref().child(this.imgfile).getDownloadURL().then(function(path){
        self.productService.createProduct(value.name, value.price, value.category, path, value.description, value.id);
      });
      this.router.navigate(['/tabs/product-list']);
    } else {
      console.log("You are not an owner.");
    }
  }

  loginAsOwner() {
    this.productService.usertype = "owner";
    console.log("You are now a store " +
      this.productService.usertype);
  }
  /*
  async takePicture() {
    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    try {
      let cameraInfo = await this.camera.getPicture(options);
      let blobInfo = await this.makeFileIntoBlob(cameraInfo);val
      //let uploadInfo: any = await this.uploadToFirebase(blobInfo);
      //console.log(uploadInfo);
      // let url:any = uploadInfo.ref.getDownloadURL();
      alert("File Upload Success ");// + uploadInfo);
      //this.imgfile = uploadInfo;
      
    } catch (e) {
      console.log(e.message);
      alert("File Upload Error " + e.message);
    }
  }

  makeFileIntoBlob(_imagePath) {
    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
    return new Promise((resolve, reject) => {
      let fileName = "";
      this.file
        .resolveLocalFilesystemUrl(_imagePath)
        .then(fileEntry => {
          let { name, nativeURL } = fileEntry;

          // get the path..
          let path = nativeURL.substring(0, nativeURL.lastIndexOf("/"));
          console.log("path", path);
          console.log("fileName", name);

          fileName = name;

          // we are provided the name, so now read the file into
          // a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          // get the buffer and make a blob to be saved
          let imgBlob = new Blob([buffer], {
            type: "image/jpeg"
          });
          console.log(imgBlob.type, imgBlob.size);
          resolve({
            fileName,
            imgBlob
          });
        })
        .catch(e => reject(e));
    });
  }
  uploadToFirebase(_imageBlobInfo) {
    console.log("uploadToFirebase");
    return new Promise((resolve, reject) => {
      let imageid = (Math.floor(Math.random() * 2000)).toString();
      let filename = "menu_"+imageid
      // filename = _imageBlobInfo.fileName;
      let fileRef = firebase.storage().ref("images/" + filename);

      let uploadTask = fileRef.put(_imageBlobInfo.imgBlob);
      let mydownloadurl="";
      

      uploadTask.on(
        "state_changed",
        (_snapshot: any) => {
          console.log(
            "snapshot progess " +
              (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100
          );
        },
        _error => {
          console.log(_error);
          reject(_error);
        },
        () => {
          // completion...  get the image URL for saving to database
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            mydownloadurl = downloadURL;
            resolve( mydownloadurl);
          });
        }
      );
    });
  }
*/
  async takePicturee() {
    try {
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
