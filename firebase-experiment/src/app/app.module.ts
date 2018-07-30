import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyA-8Y859cZg1jcrle1Sd01SFK7uR0_9Rlk',
      authDomain: 'dummyproject-3406e.firebaseapp.com',
      databaseURL: 'https://dummyproject-3406e.firebaseio.com',
      projectId: 'dummyproject-3406e',
      storageBucket: 'dummyproject-3406e.appspot.com',
      messagingSenderId: '598106517191'
    }),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
