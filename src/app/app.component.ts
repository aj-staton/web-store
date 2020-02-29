import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { firestore } from 'firebase';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDc3pHU_x6R5vFm9_CEJdrzluraAm3Y8Mo",
  authDomain: "gamecockstore-baca8.firebaseapp.com",
  databaseURL: "https://gamecockstore-baca8.firebaseio.com",
  projectId: "gamecockstore-baca8",
  storageBucket: "gamecockstore-baca8.appspot.com",
  messagingSenderId: "926963855968",
  appId: "1:926963855968:web:57ad500a1720a502bc8905",
  measurementId: "G-XQSL959G6G"
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    firebase.initializeApp(firebaseConfig);
  }
}
