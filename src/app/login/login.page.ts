import { Component, OnInit } from '@angular/core';
import {PhoneVerificationComponent} from './phone-verification/phone-verification.component';
import {Capacitor} from '@capacitor/core';
import {AuthService} from '../services/auth.service';
import {ModalController} from '@ionic/angular';
import firebase from "firebase/compat";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isNative = Capacitor.isNativePlatform();
  private afAuth: any;

  constructor(public authService: AuthService, private modalController: ModalController) { }

  async showPhoneVerification(): Promise<void> {
    const modal = await this.modalController.create({
      component: PhoneVerificationComponent
    });
    return await modal.present();
  }


  ngOnInit() {
  }
}
