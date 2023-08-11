import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule} from "@angular/common/http";
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { provideFirebaseApp, initializeApp} from '@angular/fire/app';
import { environment} from '../environments/environment';
import { getAuth, provideAuth} from '@angular/fire/auth';
import {enableMultiTabIndexedDbPersistence,
  getFirestore, provideFirestore} from '@angular/fire/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBn4EbK_xP9naY2x-kg5V7JXDaEnbzQsis",
  authDomain: "moestuin-app-guy-janssen.firebaseapp.com",
  projectId: "moestuin-app-guy-janssen",
  storageBucket: "moestuin-app-guy-janssen.appspot.com",
  messagingSenderId: "646823487710",
  appId: "1:646823487710:web:bfb610d15d891c4e0d7a4f"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents:[],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),provideAuth(() => getAuth())],


  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
